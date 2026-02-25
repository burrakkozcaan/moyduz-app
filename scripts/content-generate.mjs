/**
 * Content generation script — template + draft mode (human review before publish)
 *
 * Usage:
 *   pnpm run content:generate
 *
 * Picks the highest-priority pending keyword from data/keywords.json,
 * writes a draft MDX file to content/blog/, and marks the keyword as "done".
 *
 * Set draft: true by default → review and set draft: false before merge.
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const KEYWORDS_PATH = path.join(process.cwd(), "data/keywords.json");
const POSTS_DIR = path.join(process.cwd(), "content/blog");

fs.mkdirSync(POSTS_DIR, { recursive: true });

// ─── Helpers ────────────────────────────────────────────────────────────────

function readBank() {
  return JSON.parse(fs.readFileSync(KEYWORDS_PATH, "utf8"));
}

function writeBank(bank) {
  fs.writeFileSync(KEYWORDS_PATH, JSON.stringify(bank, null, 2) + "\n", "utf8");
}

function slugifyTR(str) {
  return str
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function pickKeyword(bank) {
  const pending = bank.items
    .filter((x) => x.status === "pending")
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
  return pending[0] ?? null;
}

function dateISO(d) {
  return d.toISOString().slice(0, 10);
}

/** Schedule publish N days ahead so the post doesn't appear live until reviewed */
function scheduleDate(daysAhead = 7) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return dateISO(d);
}

function titleCase(s) {
  return s
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function ensureUniqueSlug(baseSlug) {
  const file = path.join(POSTS_DIR, `${baseSlug}.mdx`);
  if (!fs.existsSync(file)) return baseSlug;
  const h = crypto.createHash("sha1").update(String(Date.now())).digest("hex").slice(0, 6);
  return `${baseSlug}-${h}`;
}

// ─── Internal link map ───────────────────────────────────────────────────────

const GUIDE_BY_CLUSTER = {
  e_ticaret_baslangic: "/rehber/e-ticaret-altyapisi",
  trendyol: "/rehber/e-ticaret-altyapisi",
  teknik_seo: "/rehber/seo-teknik",
  performans: "/rehber/site-performansi",
  ai_seo: "/rehber/ai-search-geo",
  is_kurma: "/rehber/is-kurma-dijital",
};

const TOOL_BY_CLUSTER = {
  e_ticaret_baslangic: "/tools/e-ticaret-kar-hesaplama",
  trendyol: "/tools/komisyon-hesaplama",
  performans: "/tools/site-saglik-skoru",
  teknik_seo: "/tools/site-saglik-skoru",
  ai_seo: "/tools/site-saglik-skoru",
  is_kurma: "/tools/maliyet-hesaplama",
};

function internalLinksFor(cluster) {
  return {
    guide: GUIDE_BY_CLUSTER[cluster] ?? "/rehber",
    tool: TOOL_BY_CLUSTER[cluster] ?? "/tools",
  };
}

// ─── MDX template ────────────────────────────────────────────────────────────

function buildMdx({ title, slug, published_at, updated_at, category, tags, keyword, guide, tool }) {
  const escapedTitle = title.replace(/"/g, '\\"');
  return `---
title: "${escapedTitle}"
slug: "${slug}"
meta_description: "${escapedTitle} — kapsamlı rehber ve uygulama adımları."
published_at: "${published_at}T00:00:00Z"
updated_at: "${updated_at}T00:00:00Z"
category: "${category}"
tags: ${JSON.stringify(tags)}
draft: true
---

# ${title}

> **Taslak** — Bu içerik otomatik üretildi. Yayınlamadan önce düzenle, draft: false yap.

Bu yazı **"${keyword}"** arayanlar için hazırlanmış kapsamlı bir rehberdir.

## Kısa Özet

- **Ne yapacağız?** ${keyword} konusunda temel adımları ele alacağız.
- **Hangi hataları önleyeceğiz?** Yaygın yanlışları ve maliyetli hataları listeleyeceğiz.
- **Hangi metrikleri izleyeceğiz?** Başarıyı ölçen net KPI'ları belirleyeceğiz.

## 1) Temel Kavramlar

_Bu bölümü ${keyword} özelinde doldur._

## 2) Adım Adım Uygulama

1. Hedefi ve başarı kriterlerini belirle
2. Altyapıyı ve araçları seç
3. Ölçümleme kur (Analytics + Search Console)
4. Optimizasyon döngüsüne gir

## 3) Teknik Notlar

- **Performans:** TTFB, cache stratejisi, CDN
- **SEO:** Sayfa mimarisi, index kontrolü, iç link
- **Operasyon:** Ödeme, kargo, iade yönetimi

## Checklist

- [ ] Ölçümleme kurulumu (GA4 + Search Console)
- [ ] Sayfa hız testi ve Core Web Vitals
- [ ] İç link planı oluştur
- [ ] Dönüşüm odaklı CTA ekle

---

## İlgili Rehber

[${guide.replace("/rehber/", "").replace(/-/g, " ")} →](${guide})

## İlgili Araç

[Hesaplama aracını kullan →](${tool})

## Sık Sorulan Sorular

**Bu adımlar ne kadar sürer?**
MVP için 1–2 hafta, optimizasyon için 30–60 gün.

**En hızlı kazanım ne?**
İç link yapısı + sayfa hızı + net CTA.

**Moyduz nasıl yardımcı olabilir?**
[Ücretsiz görüşme için iletişime geç →](/contact)
`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const bank = readBank();
const item = pickKeyword(bank);

if (!item) {
  console.log("✓ No pending keywords. All done!");
  process.exit(0);
}

const nowISO = dateISO(new Date());
const baseSlug = slugifyTR(item.keyword);
const slug = ensureUniqueSlug(baseSlug);
const title = titleCase(item.keyword);
const links = internalLinksFor(item.cluster);

const mdx = buildMdx({
  title,
  slug,
  published_at: scheduleDate(7),  // 7 days ahead — review window
  updated_at: nowISO,
  category: item.cluster,
  tags: ["moyduz", "turkiye", item.cluster],
  keyword: item.keyword,
  guide: links.guide,
  tool: links.tool,
});

const outPath = path.join(POSTS_DIR, `${slug}.mdx`);
fs.writeFileSync(outPath, mdx, "utf8");

// Update keyword state
item.status = "done";
item.last_generated_at = new Date().toISOString();
writeBank(bank);

console.log(`✓ Generated: ${outPath}`);
console.log(`  keyword: [${item.id}] ${item.keyword}`);
console.log(`  published_at: ${scheduleDate(7)} (7 days ahead, draft: true)`);
console.log(`  Next step: review content, set draft: false, then merge PR.`);
