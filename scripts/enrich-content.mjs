/**
 * Mevcut tüm içeriklere eksik resim ve audio ekler
 * Kullanım: node scripts/enrich-content.mjs
 *           node scripts/enrich-content.mjs --no-audio
 *           node scripts/enrich-content.mjs --no-image
 *           node scripts/enrich-content.mjs --limit=10
 */

import fs from "node:fs";
import path from "node:path";

const ROOT    = path.resolve(import.meta.dirname, "..");
const CDN     = "https://cdn.moyduz.com";
const WORKER_CONTENT = process.env.CONTENT_WORKER_URL;
const WORKER_AUDIO   = process.env.AUDIO_WORKER_URL;
const SECRET  = process.env.AUTH_SECRET;

// Load .env.local
const envPath = path.join(ROOT, ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const CONTENT_WORKER = process.env.CONTENT_WORKER_URL;
const AUDIO_WORKER   = process.env.AUDIO_WORKER_URL;
const AUTH_SECRET    = process.env.AUTH_SECRET;

const args    = process.argv.slice(2);
const NO_IMG  = args.includes("--no-image");
const NO_AUD  = args.includes("--no-audio");
const limArg  = args.find(a => a.startsWith("--limit="));
const LIMIT   = limArg ? parseInt(limArg.split("=")[1]) : Infinity;

const DIRS = [
  ["content/blog",    "/blog"],
  ["content/rehber",  "/rehber"],
  ["content/compare", "/compare"],
  ["content/pages",   "/services"],
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
  // Insert after first --- block, before closing ---
  const match = raw.match(/^(---\n[\s\S]*?)\n---/);
  if (!match) return raw;
  const fmBlock = match[1];
  const rest    = raw.slice(match[0].length);
  if (fmBlock.includes(`${key}:`)) {
    return raw.replace(new RegExp(`^${key}:.*$`, "m"), `${key}: "${value}"`);
  }
  return `${fmBlock}\n${key}: "${value}"\n---${rest}`;
}

// ─── API helpers ──────────────────────────────────────────────────────────────

function headers() {
  const h = { "Content-Type": "application/json" };
  if (AUTH_SECRET) h["Authorization"] = `Bearer ${AUTH_SECRET}`;
  return h;
}

async function imagePromptFor(title, slug, contentSnippet = "") {
  // Ask LLM for a good flux prompt — include content snippet for relevance
  const context = contentSnippet ? `Content excerpt: "${contentSnippet.slice(0, 300)}"` : "";
  const res  = await fetch(`${CONTENT_WORKER}/content`, {
    method: "POST", headers: headers(),
    body: JSON.stringify({
      prompt: `For the article titled "${title}" (slug: ${slug}). ${context}\n\nWrite a specific English image generation prompt for a professional hero image that visually represents THIS specific topic. Be concrete and specific, not generic. Style: clean, modern, SaaS/tech, soft lighting, no text, no words. Max 25 words. Reply with only the prompt.`,
      max_tokens: 80,
    }),
  });
  if (!res.ok) throw new Error(`LLM ${res.status}`);
  const d = await res.json();
  return d.text?.trim() ?? `Professional hero image for ${title}, modern tech style, clean composition`;
}

async function generateImage(prompt, slug) {
  const res  = await fetch(`${CONTENT_WORKER}/image`, {
    method: "POST", headers: headers(),
    body: JSON.stringify({ prompt, slug, type: "hero" }),
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Image ${res.status}: ${t}`); }
  const d = await res.json();
  if (!d.success) throw new Error(d.error);
  return d.url;
}

async function generateAudio(text, slug, retries = 3) {
  const trimmed = text.slice(0, 3000);
  for (let i = 0; i < retries; i++) {
    const res  = await fetch(AUDIO_WORKER, {
      method: "POST", headers: headers(),
      body: JSON.stringify({ text: trimmed, slug, lang: "TR" }),
    });
    const d = await res.json();
    if (res.ok && d.success) return d.url;
    if (i < retries - 1) await new Promise(r => setTimeout(r, 4000));
    else throw new Error(d.error ?? `HTTP ${res.status}`);
  }
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
    .slice(0, 3000);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

let processed = 0, imgDone = 0, audDone = 0, errors = 0;

for (const [dir, prefix] of DIRS) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) continue;

  for (const f of fs.readdirSync(abs).sort()) {
    if (!f.endsWith(".mdx")) continue;
    if (processed >= LIMIT) break;

    const fullPath = path.join(abs, f);
    let raw = fs.readFileSync(fullPath, "utf8");
    const fm = parseFM(raw);

    if (fm.draft === "true") continue;

    const slug      = fm.slug || f.replace(".mdx", "");
    const title     = fm.title || slug;
    const hasImage  = !!fm.hero_image;
    const hasAudio  = !!fm.audio_src;

    if (hasImage && hasAudio) continue;

    console.log(`\n📄 ${prefix}/${slug}`);
    let changed = false;

    // Image
    if (!hasImage && !NO_IMG && CONTENT_WORKER) {
      try {
        process.stdout.write("  🖼  Resim üretiliyor... ");
        const contentSnippet = extractText(raw).slice(0, 400);
        const prompt = await imagePromptFor(title, slug, contentSnippet);
        const url    = await generateImage(prompt, slug);
        raw = setFMField(raw, "hero_image", url);
        changed = true;
        imgDone++;
        console.log(`✓ ${url}`);
      } catch (e) {
        errors++;
        console.log(`✗ ${e.message}`);
      }
    }

    // Audio
    if (!hasAudio && !NO_AUD && AUDIO_WORKER) {
      try {
        process.stdout.write("  🔊 Audio üretiliyor... ");
        const text = extractText(raw);
        const url  = await generateAudio(text, slug);
        raw = setFMField(raw, "audio_src", url);
        changed = true;
        audDone++;
        console.log(`✓ ${url}`);
      } catch (e) {
        errors++;
        console.log(`✗ ${e.message}`);
      }
    }

    if (changed) {
      fs.writeFileSync(fullPath, raw, "utf8");
    }

    processed++;
  }
}

console.log(`\n=== Tamamlandı ===`);
console.log(`Resim: ${imgDone} | Audio: ${audDone} | Hata: ${errors}`);
console.log(`\nSonraki: git add content/ && git commit -m "enrich: resim+audio" && git push`);
