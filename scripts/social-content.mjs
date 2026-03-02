/**
 * Social Content Transformer — Llama 3 ile sosyal medya içeriği üretici
 *
 * Her MDX sayfası için Twitter/X, LinkedIn ve newsletter içeriği üretir,
 * frontmatter'a `social_tweet`, `social_linkedin`, `social_newsletter` olarak yazar.
 *
 * Kullanım:
 *   node scripts/social-content.mjs
 *   node scripts/social-content.mjs --regen           # var olanları da yeniden üret
 *   node scripts/social-content.mjs --slug=iyzico-nedir
 *   node scripts/social-content.mjs --limit=10
 *   node scripts/social-content.mjs --offset=20
 *   node scripts/social-content.mjs --dry-run         # dosyaya yazma
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

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

const args      = process.argv.slice(2);
const REGEN     = args.includes("--regen");
const DRY_RUN   = args.includes("--dry-run");
const slugArg   = args.find(a => a.startsWith("--slug="));
const ONLY_SLUG = slugArg ? slugArg.split("=")[1] : null;
const limArg    = args.find(a => a.startsWith("--limit="));
const LIMIT     = limArg ? parseInt(limArg.split("=")[1]) : Infinity;
const offArg    = args.find(a => a.startsWith("--offset="));
const OFFSET    = offArg ? parseInt(offArg.split("=")[1]) : 0;

const DIRS = [
  ["content/blog",    "/blog"],
  ["content/rehber",  "/rehber"],
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

function setFMField(raw, key, value) {
  const match = raw.match(/^(---\n[\s\S]*?)\n---/);
  if (!match) return raw;
  const fmBlock = match[1];
  const rest    = raw.slice(match[0].length);
  // Escape quotes in value for YAML safety
  const escaped = value.replace(/"/g, "'");
  if (fmBlock.includes(`${key}:`)) {
    return raw.replace(new RegExp(`^${key}:.*$`, "m"), `${key}: "${escaped}"`);
  }
  return `${fmBlock}\n${key}: "${escaped}"\n---${rest}`;
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
    .slice(0, 800);
}

// ─── API ──────────────────────────────────────────────────────────────────────

function authHeaders() {
  const h = { "Content-Type": "application/json" };
  if (AUTH_SECRET) h["Authorization"] = `Bearer ${AUTH_SECRET}`;
  return h;
}

async function generateSocial(title, content, retries = 2) {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(`${CONTENT_WORKER}/social`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ title, content }),
    });
    const d = await res.json();
    if (res.ok && d.success) return d;
    if (i < retries - 1) await new Promise(r => setTimeout(r, 3000));
    else throw new Error(d.error ?? `HTTP ${res.status}`);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

if (!CONTENT_WORKER) {
  console.error("CONTENT_WORKER_URL eksik (.env.local)");
  process.exit(1);
}

let processed = 0, skipped = 0, done = 0, errors = 0;

for (const [dir, prefix] of DIRS) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) continue;

  for (const f of fs.readdirSync(abs).sort()) {
    if (!f.endsWith(".mdx")) continue;
    if (processed >= LIMIT) break;
    if (skipped < OFFSET) { skipped++; continue; }

    const fullPath = path.join(abs, f);
    let raw = fs.readFileSync(fullPath, "utf8");
    const fm = parseFM(raw);

    if (fm.draft === "true") continue;

    const slug  = fm.slug || f.replace(".mdx", "");
    const title = fm.title || slug;

    if (ONLY_SLUG && slug !== ONLY_SLUG) continue;

    const hasSocial = !!(fm.social_tweet && fm.social_linkedin && fm.social_newsletter);
    if (hasSocial && !REGEN) { processed++; continue; }

    console.log(`\n📱 ${prefix}/${slug}`);
    const text = extractText(raw);

    if (DRY_RUN) {
      console.log(`   Başlık: ${title}`);
      console.log(`   İçerik: ${text.slice(0, 100)}...`);
      processed++;
      continue;
    }

    try {
      process.stdout.write("  Üretiliyor... ");
      const result = await generateSocial(title, text);
      raw = setFMField(raw, "social_tweet", result.tweet);
      raw = setFMField(raw, "social_linkedin", result.linkedin);
      raw = setFMField(raw, "social_newsletter", result.newsletter);
      fs.writeFileSync(fullPath, raw, "utf8");
      done++;
      console.log("✓");
      console.log(`   🐦 Tweet: ${result.tweet?.slice(0, 80)}...`);
    } catch (e) {
      errors++;
      console.log(`✗ ${e.message}`);
    }

    processed++;
  }
}

console.log(`\n=== Tamamlandı ===`);
console.log(`Üretilen: ${done} | Hata: ${errors}`);
console.log(`\nSonraki: git add content/ && git commit -m "feat: social content snippets"`);
