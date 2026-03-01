/**
 * AI Content Pipeline — keyword → tam MDX + hero görsel + audio
 *
 * Pipeline:
 *   1. keywords.json'dan en yüksek öncelikli "pending" keyword'ü seç
 *   2. Llama ile outline üret (title, bölümler, FAQ, görsel prompt)
 *   3. Llama ile her bölümü ayrı ayrı yaz (spam önlemi: farklı chunk)
 *   4. Flux ile hero görsel üret → cdn.moyduz.com/images/blog/
 *   5. MeloTTS ile audio üret → cdn.moyduz.com/audio/
 *   6. MDX dosyasını yaz (draft: true, insan review bekler)
 *   7. keywords.json güncelle
 *
 * Kullanım:
 *   pnpm content:pipeline                # keywords.json'dan sıradaki keyword
 *   pnpm content:pipeline --no-audio     # audio oluşturma
 *   pnpm content:pipeline --no-image     # görsel oluşturma
 *   pnpm content:pipeline --keyword="e ticaret nasıl kurulur"
 *
 * .env.local:
 *   CONTENT_WORKER_URL=https://moyduz-content-ai.burhanburakozcaan.workers.dev
 *   AUDIO_WORKER_URL=https://moyduz-audio-tts.burhanburakozcaan.workers.dev
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

// ─── Env ──────────────────────────────────────────────────────────────────────

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const CONTENT_WORKER = process.env.CONTENT_WORKER_URL;
const AUDIO_WORKER = process.env.AUDIO_WORKER_URL;
const AUTH_SECRET = process.env.AUTH_SECRET;
const POSTS_DIR = path.join(process.cwd(), "content/blog");
const KEYWORDS_PATH = path.join(process.cwd(), "data/keywords.json");
const CDN_BASE = "https://cdn.moyduz.com";
const SITE_URL = "https://www.moyduz.com";

if (!CONTENT_WORKER) {
  console.error("❌  CONTENT_WORKER_URL .env.local içinde tanımlı değil.");
  process.exit(1);
}

// ─── CLI ──────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const NO_AUDIO = args.includes("--no-audio");
const NO_IMAGE = args.includes("--no-image");
const kwArg = args.find((a) => a.startsWith("--keyword="));
const FORCE_KW = kwArg ? kwArg.split("=").slice(1).join("=") : null;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugifyTR(str) {
  return str
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function dateISO(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

function scheduleDate(days = 7) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return dateISO(d);
}

function ensureUniqueSlug(base) {
  const f = path.join(POSTS_DIR, `${base}.mdx`);
  if (!fs.existsSync(f)) return base;
  return `${base}-${crypto.randomBytes(3).toString("hex")}`;
}

function workerHeaders() {
  const h = { "Content-Type": "application/json" };
  if (AUTH_SECRET) h["Authorization"] = `Bearer ${AUTH_SECRET}`;
  return h;
}

// ─── Worker calls ─────────────────────────────────────────────────────────────

async function llm(prompt, system, max_tokens = 1200, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const res  = await fetch(`${CONTENT_WORKER}/content`, {
      method:  "POST",
      headers: workerHeaders(),
      body:    JSON.stringify({ prompt, system, max_tokens }),
    });
    if (res.ok) {
      const data = await res.json();
      return data.text ?? "";
    }
    const text = await res.text();
    if (i < retries - 1) {
      process.stdout.write(` [retry ${i + 1}] `);
      await new Promise((r) => setTimeout(r, 4000));
    } else {
      throw new Error(`LLM hata (${res.status}): ${text}`);
    }
  }
}

async function generateImage(prompt, slug) {
  const res = await fetch(`${CONTENT_WORKER}/image`, {
    method: "POST",
    headers: workerHeaders(),
    body: JSON.stringify({ prompt, slug, type: "hero" }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(`Görsel hata: ${data.error}`);
  return data.url;
}

async function generateAudio(text, slug, retries = 3) {
  if (!AUDIO_WORKER) return null;
  const trimmed = text.slice(0, 3000);
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(AUDIO_WORKER, {
        method: "POST",
        headers: workerHeaders(),
        body: JSON.stringify({ text: trimmed, slug, lang: "tr" }),
      });
      const data = await res.json();
      if (res.ok && data.success) return data.url;
      if (i < retries - 1) {
        process.stdout.write(`     ↺ Retry ${i + 1}/${retries - 1}... `);
        await new Promise((r) => setTimeout(r, 3000));
      } else {
        throw new Error(`Audio hata: ${data.error}`);
      }
    } catch (e) {
      if (i === retries - 1) throw e;
      process.stdout.write(`     ↺ Retry ${i + 1}/${retries - 1}... `);
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
}

// ─── Content generation (chunked) ────────────────────────────────────────────

const SYSTEM = `Sen profesyonel bir Türkçe SEO içerik yazarısın.
Yazıların:
- Google'da üst sıralarda çıkmak için optimize edilmiş
- Okuyucuya gerçek değer katan, pratik bilgi içeren
- Doğal akan, sohbet dilinde ama uzman bakış açısıyla
- Her zaman Türkçe`;

async function generateOutline(keyword, cluster) {
  const internalLinks = {
    e_ticaret_baslangic: `${SITE_URL}/e-ticaret-nasil-yapilir-2026-rehberi`,
    trendyol: `${SITE_URL}/tools/komisyon-hesaplama`,
    teknik_seo: `${SITE_URL}/tools/site-saglik-skoru`,
    performans: `${SITE_URL}/tools/site-saglik-skoru`,
    ai_seo: `${SITE_URL}/blog/yapay-zeka-e-ticaret-2026`,
    is_kurma: `${SITE_URL}/e-ticaret-paketleri`,
    compare: `${SITE_URL}/compare`,
    growth_blog: `${SITE_URL}/blog`,
  };

  const link = internalLinks[cluster] ?? `${SITE_URL}/contact`;

  const raw = await llm(
    `"${keyword}" keyword'ü için Türkçe SEO blog yazısı outline oluştur.

Sadece JSON döndür (başka hiçbir şey yazma):
{
  "title": "...başlık (60-70 karakter, keyword'ü içermeli)...",
  "meta_description": "...meta açıklaması (140-155 karakter)...",
  "snippet": "...50-80 kelime kısa özet...",
  "sections": ["H2 Bölüm 1", "H2 Bölüm 2", "H2 Bölüm 3", "H2 Bölüm 4", "H2 Bölüm 5"],
  "faq": ["Soru 1?", "Soru 2?", "Soru 3?", "Soru 4?"],
  "image_prompt": "...flux için İngilizce görsel prompt (ultra realistic, professional, clean)...",
  "internal_link": "${link}"
}`,
    SYSTEM,
    800
  );

  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error(`Outline JSON parse hatası:\n${raw}`);
  return JSON.parse(match[0]);
}

async function generateSection(title, keyword, sectionTitle) {
  return llm(
    `"${title}" adlı blog yazısının "${sectionTitle}" bölümünü yaz.

Kurallar:
- 280-380 kelime
- Markdown kullan (bold, liste, alt başlık)
- Keyword: "${keyword}" doğal bir şekilde geçsin
- Pratik, uygulanabilir bilgi ver
- Boş dolgu cümle kullanma

Sadece bölüm içeriğini yaz, başlığı tekrarlama.`,
    SYSTEM,
    900
  );
}

async function generateFAQAnswers(faqs, keyword) {
  return llm(
    `"${keyword}" konusunda şu soruları 2-3 cümle ile kısa ve net yanıtla:

${faqs.map((q, i) => `${i + 1}. ${q}`).join("\n")}

Her soruyu şu formatta yanıtla:
**S: [soru]**
[cevap]`,
    SYSTEM,
    1000
  );
}

// ─── MDX builder ─────────────────────────────────────────────────────────────

function buildMdx({ slug, outline, sections, faqContent, imageUrl, audioUrl, publishedAt, category }) {
  const tags = JSON.stringify(["moyduz", "turkiye", category]);
  const categoryCleaned = JSON.stringify(category.replace(/_/g, " "));

  const sectionMd = outline.sections
    .map((h, i) => `## ${h}\n\n${sections[i] ?? ""}`)
    .join("\n\n");

  const schemaFaqs = outline.faq.map((q) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: "..." },
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: outline.title,
    description: outline.meta_description,
    url: `${SITE_URL}/blog/${slug}`,
    ...(imageUrl ? { image: imageUrl } : {}),
    author: { "@type": "Organization", name: "Moyduz" },
    publisher: { "@type": "Organization", name: "Moyduz", url: SITE_URL },
    datePublished: publishedAt,
    dateModified: publishedAt,
  };

  return `---
title: "${outline.title.replace(/"/g, '\\"')}"
slug: "${slug}"
meta_description: "${outline.meta_description.replace(/"/g, '\\"')}"
snippet: "${(outline.snippet ?? "").replace(/"/g, '\\"')}"
published_at: "${publishedAt}T00:00:00Z"
updated_at: "${dateISO()}T00:00:00Z"
category:
  name: ${categoryCleaned}
  slug: "${category}"
tags: ${tags}
draft: true
${imageUrl ? `hero_image: "${imageUrl}"` : ""}
${audioUrl ? `audio_src: "${audioUrl}"` : ""}
---

# ${outline.title}

${outline.snippet ?? ""}

${sectionMd}

## Sık Sorulan Sorular

${faqContent}

---

**İlgili kaynak:** [${outline.internal_link.replace(/^https?:\/\/[^/]+/, "")} →](${outline.internal_link})

<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>
`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

fs.mkdirSync(POSTS_DIR, { recursive: true });

const bank = JSON.parse(fs.readFileSync(KEYWORDS_PATH, "utf8"));

let item;
if (FORCE_KW) {
  item = {
    keyword: FORCE_KW,
    cluster: "e_ticaret_baslangic",
    priority: 5,
    status: "pending",
    id: `kw_manual_${Date.now().toString(36)}`,
  };
} else {
  item = bank.items
    .filter((x) => x.status === "pending")
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))[0];
}

if (!item) {
  console.log("✓ Bekleyen keyword yok. data/keywords.json'a yeni keyword ekle.");
  process.exit(0);
}

console.log(`\n🚀 Pipeline başlıyor: "${item.keyword}"\n`);

// 1. Outline
console.log("1/5  Outline üretiliyor...");
const outline = await generateOutline(item.keyword, item.cluster ?? "e_ticaret_baslangic");
console.log(`     ✓ Başlık: ${outline.title}`);

const baseSlug = slugifyTR(item.keyword);
const slug = ensureUniqueSlug(baseSlug);
const publishedAt = scheduleDate(7);

// 2. Sections (her biri ayrı LLM çağrısı → doğal farklılık)
console.log(`2/5  ${outline.sections.length} bölüm yazılıyor...`);
const sectionContents = [];
for (let i = 0; i < outline.sections.length; i++) {
  process.stdout.write(`     ${i + 1}/${outline.sections.length} "${outline.sections[i]}"... `);
  const content = await generateSection(outline.title, item.keyword, outline.sections[i]);
  sectionContents.push(content);
  console.log("✓");
}

// 3. FAQ
console.log("3/5  FAQ üretiliyor...");
const faqContent = await generateFAQAnswers(outline.faq, item.keyword);
console.log("     ✓");

// 4. Hero image
let imageUrl = null;
if (!NO_IMAGE) {
  console.log("4/5  Hero görsel üretiliyor (Flux)...");
  try {
    imageUrl = await generateImage(outline.image_prompt, slug);
    console.log(`     ✓ ${imageUrl}`);
  } catch (e) {
    console.warn(`     ⚠  Görsel başarısız: ${e.message}`);
  }
} else {
  console.log("4/5  Görsel atlandı (--no-image)");
}

// 5. Audio
let audioUrl = null;
if (!NO_AUDIO && AUDIO_WORKER) {
  console.log("5/5  Audio üretiliyor (MeloTTS)...");
  try {
    // Use title + first section intro as audio text
    const audioText = `${outline.title}. ${outline.snippet ?? ""}. ${sectionContents[0] ?? ""}`;
    audioUrl = await generateAudio(audioText, slug);
    console.log(`     ✓ ${audioUrl}`);
  } catch (e) {
    console.warn(`     ⚠  Audio başarısız: ${e.message}`);
  }
} else {
  console.log("5/5  Audio atlandı");
}

// 6. Write MDX
const mdx = buildMdx({
  slug,
  outline,
  sections: sectionContents,
  faqContent,
  imageUrl,
  audioUrl,
  publishedAt,
  category: item.cluster ?? "e_ticaret_baslangic",
});

const outPath = path.join(POSTS_DIR, `${slug}.mdx`);
fs.writeFileSync(outPath, mdx, "utf8");
console.log(`\n✓  MDX yazıldı: ${outPath}`);

// 7. Update keywords.json
const bankItem = bank.items.find((x) => x.id === item.id);
if (bankItem) {
  bankItem.status = "done";
  bankItem.last_generated_at = new Date().toISOString();
  fs.writeFileSync(KEYWORDS_PATH, JSON.stringify(bank, null, 2) + "\n", "utf8");
}

console.log(`
📋 Özet:
   Keyword    : ${item.keyword}
   Slug       : ${slug}
   Yayın tarihi: ${publishedAt} (7 gün sonra, draft: true)
   Görsel     : ${imageUrl ?? "—"}
   Audio      : ${audioUrl ?? "—"}

📝 Sonraki adımlar:
   1. ${outPath} dosyasını gözden geçir ve düzenle
   2. draft: false yap
   3. git commit + push ile deploy et
   4. pnpm indexnow  (URL'yi Bing'e bildir)
`);
