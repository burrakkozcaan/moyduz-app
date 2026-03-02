/**
 * Embedding-based auto internal linking
 *
 * Her MDX sayfası için BGE embeddings üretir, cosine similarity ile
 * en alakalı 5 sayfayı bulur ve `ai_related` frontmatter alanına yazar.
 *
 * Kullanım:
 *   node scripts/auto-internal-links.mjs
 *   node scripts/auto-internal-links.mjs --regen           # tüm embedding'leri yeniden hesapla
 *   node scripts/auto-internal-links.mjs --slug=iyzico-nedir
 *   node scripts/auto-internal-links.mjs --top=5           # kaç link (varsayılan 5)
 *   node scripts/auto-internal-links.mjs --dry-run         # dosyaya yazma, sonuçları ekrana bas
 */

import fs from "node:fs";
import path from "node:path";

const ROOT   = path.resolve(import.meta.dirname, "..");
const CACHE  = path.join(ROOT, "data", "embeddings.json");

// .env.local yükle
const envPath = path.join(ROOT, ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const CONTENT_WORKER = process.env.CONTENT_WORKER_URL;
const AUTH_SECRET    = process.env.AUTH_SECRET;

const args    = process.argv.slice(2);
const REGEN   = args.includes("--regen");
const DRY_RUN = args.includes("--dry-run");
const slugArg = args.find(a => a.startsWith("--slug="));
const ONLY_SLUG = slugArg ? slugArg.split("=")[1] : null;
const topArg  = args.find(a => a.startsWith("--top="));
const TOP_N   = topArg ? parseInt(topArg.split("=")[1]) : 5;

const DIRS = [
  ["content/blog",    "/blog"],
  ["content/rehber",  "/rehber"],
  ["content/compare", "/compare"],
];

// ─── Frontmatter helpers ──────────────────────────────────────────────────────

function parseFM(content) {
  const m = content.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const fm = {};
  for (const line of m[1].split("\n")) {
    if (/^\s/.test(line)) continue;
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    fm[line.slice(0, idx).trim()] = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
  }
  return fm;
}

/** Set or replace a single-line frontmatter field */
function setFMField(raw, key, value) {
  const match = raw.match(/^(---\n[\s\S]*?)\n---/);
  if (!match) return raw;
  const fmBlock = match[1];
  const rest    = raw.slice(match[0].length);
  if (fmBlock.includes(`${key}:`)) {
    return raw.replace(new RegExp(`^${key}:.*$`, "m"), `${key}: "${value}"`);
  }
  return `${fmBlock}\n${key}: "${value}"\n---${rest}`;
}

function extractText(mdxContent) {
  return mdxContent
    .replace(/^---[\s\S]*?---\n/, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`[^`]+`/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, 1500);
}

// ─── API helpers ──────────────────────────────────────────────────────────────

function headers() {
  const h = { "Content-Type": "application/json" };
  if (AUTH_SECRET) h["Authorization"] = `Bearer ${AUTH_SECRET}`;
  return h;
}

async function getEmbedding(texts) {
  const res = await fetch(`${CONTENT_WORKER}/embed`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ text: texts }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Embed ${res.status}: ${t}`);
  }
  const d = await res.json();
  return d.embeddings; // number[][]
}

// ─── Math helpers ─────────────────────────────────────────────────────────────

function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot   += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

if (!CONTENT_WORKER) {
  console.error("CONTENT_WORKER_URL eksik (.env.local)");
  process.exit(1);
}

// Ensure data dir
fs.mkdirSync(path.join(ROOT, "data"), { recursive: true });

// Load embeddings cache
let cache = {};
if (fs.existsSync(CACHE) && !REGEN) {
  cache = JSON.parse(fs.readFileSync(CACHE, "utf8"));
  console.log(`📦 Cache yüklendi: ${Object.keys(cache).length} embedding`);
}

// Collect all pages
const pages = [];
for (const [dir, prefix] of DIRS) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) continue;
  for (const f of fs.readdirSync(abs).sort()) {
    if (!f.endsWith(".mdx")) continue;
    const fullPath = path.join(abs, f);
    const raw      = fs.readFileSync(fullPath, "utf8");
    const fm       = parseFM(raw);
    if (fm.draft === "true") continue;
    const slug  = fm.slug || f.replace(".mdx", "");
    const title = fm.title || slug;
    const href  = `${prefix}/${slug}`;
    pages.push({ slug, title, href, prefix, fullPath, raw, fm });
  }
}

console.log(`\n📄 Toplam sayfa: ${pages.length}`);

// Step 1: compute missing embeddings
const toEmbed = pages.filter(p => REGEN || !cache[p.href]);
if (toEmbed.length > 0) {
  console.log(`\n🔢 Embedding üretilecek: ${toEmbed.length} sayfa`);
  const BATCH = 10; // batch calls to /embed
  for (let i = 0; i < toEmbed.length; i += BATCH) {
    const batch = toEmbed.slice(i, i + BATCH);
    const texts = batch.map(p => {
      const text = extractText(p.raw);
      return `${p.title}\n\n${text}`.slice(0, 1500);
    });
    process.stdout.write(`  Batch ${Math.floor(i / BATCH) + 1}/${Math.ceil(toEmbed.length / BATCH)} (${batch.length} sayfa)... `);
    try {
      const embeddings = await getEmbedding(texts);
      batch.forEach((p, j) => {
        cache[p.href] = { embedding: embeddings[j], title: p.title, href: p.href };
      });
      console.log("✓");
    } catch (e) {
      console.log(`✗ ${e.message}`);
    }
    // Save cache after each batch
    fs.writeFileSync(CACHE, JSON.stringify(cache, null, 2));
  }
} else {
  console.log("✓ Tüm embedding'ler cache'de mevcut");
}

// Step 2: compute similarities and write to MDX
let updated = 0, errors = 0;

for (const page of pages) {
  if (ONLY_SLUG && page.slug !== ONLY_SLUG) continue;

  const myEntry = cache[page.href];
  if (!myEntry?.embedding) {
    console.log(`⚠️  ${page.href} — embedding yok, atlanıyor`);
    continue;
  }

  // Compute similarity with all other pages
  const scored = [];
  for (const other of pages) {
    if (other.href === page.href) continue;
    const otherEntry = cache[other.href];
    if (!otherEntry?.embedding) continue;
    const sim = cosineSimilarity(myEntry.embedding, otherEntry.embedding);
    scored.push({ href: other.href, title: other.title, sim });
  }

  // Sort descending, take top N
  scored.sort((a, b) => b.sim - a.sim);
  const topLinks = scored.slice(0, TOP_N).map(s => s.href);

  if (DRY_RUN) {
    console.log(`\n📄 ${page.href}`);
    scored.slice(0, TOP_N).forEach(s => {
      console.log(`   ${(s.sim * 100).toFixed(1)}%  ${s.href}  — ${s.title}`);
    });
    continue;
  }

  // Write to frontmatter as comma-separated string
  const currentRelated = page.fm.ai_related ?? "";
  const newRelated = topLinks.join(",");

  if (currentRelated === newRelated) continue; // no change

  try {
    const newRaw = setFMField(page.raw, "ai_related", newRelated);
    fs.writeFileSync(page.fullPath, newRaw, "utf8");
    updated++;
    console.log(`✓ ${page.href} → ${topLinks.slice(0, 3).join(", ")}...`);
  } catch (e) {
    errors++;
    console.log(`✗ ${page.href}: ${e.message}`);
  }
}

console.log(`\n=== Tamamlandı ===`);
if (DRY_RUN) {
  console.log(`Dry run — dosya değişikliği yok`);
} else {
  console.log(`Güncellenen: ${updated} | Hata: ${errors}`);
  console.log(`\nSonraki: git add content/ && git commit -m "feat: ai internal links"`);
}
