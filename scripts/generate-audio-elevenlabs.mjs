/**
 * ElevenLabs TTS — Türkçe Ses Üretimi
 *
 * eleven_multilingual_v2 ile Türkçe MP3 üretir, R2'ye yükler,
 * MDX frontmatter'a audio_src yazar.
 *
 * Kullanım:
 *   node scripts/generate-audio-elevenlabs.mjs              # eksik sesler
 *   node scripts/generate-audio-elevenlabs.mjs --force      # hepsini yeniden üret
 *   node scripts/generate-audio-elevenlabs.mjs --limit=5    # kota tasarrufu
 *   node scripts/generate-audio-elevenlabs.mjs --slug=iyzico-nedir
 *   node scripts/generate-audio-elevenlabs.mjs --dir=blog   # sadece blog
 *
 * .env.local:
 *   AUDIO_WORKER_URL=https://moyduz-audio-tts...workers.dev
 *   AUTH_SECRET=...
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

const WORKER_URL  = process.env.AUDIO_WORKER_URL;
const AUTH_SECRET = process.env.AUTH_SECRET;
const CDN_BASE    = "https://cdn.moyduz.com";

if (!WORKER_URL) {
  console.error("AUDIO_WORKER_URL eksik (.env.local)");
  process.exit(1);
}

const args      = process.argv.slice(2);
const FORCE     = args.includes("--force");
const slugArg   = args.find(a => a.startsWith("--slug="));
const ONLY_SLUG = slugArg ? slugArg.split("=")[1] : null;
const limArg    = args.find(a => a.startsWith("--limit="));
const LIMIT     = limArg ? parseInt(limArg.split("=")[1]) : Infinity;
const dirArg    = args.find(a => a.startsWith("--dir="));
const ONLY_DIR  = dirArg ? dirArg.split("=")[1] : null; // blog | rehber

const ALL_DIRS = [
  ["content/blog",   "blog"],
  ["content/rehber", "rehber"],
];
const DIRS = ONLY_DIR ? ALL_DIRS.filter(d => d[1] === ONLY_DIR) : ALL_DIRS;

// ─── Frontmatter helpers ──────────────────────────────────────────────────────

function parseFM(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
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
  const escaped = value.replace(/"/g, "'");
  if (fmBlock.includes(`${key}:`)) {
    return raw.replace(new RegExp(`^${key}:.*$`, "m"), `${key}: "${escaped}"`);
  }
  return `${fmBlock}\n${key}: "${escaped}"\n---${rest}`;
}

function extractText(raw) {
  return raw
    .replace(/^---[\s\S]*?---\n?/, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`[^`]+`/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// ─── API ──────────────────────────────────────────────────────────────────────

async function generateAudio(text, slug, retries = 2) {
  const headers = { "Content-Type": "application/json" };
  if (AUTH_SECRET) headers["Authorization"] = `Bearer ${AUTH_SECRET}`;

  for (let i = 0; i < retries; i++) {
    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ text: text.slice(0, 5000), slug, provider: "elevenlabs" }),
    });
    const d = await res.json();
    if (res.ok && d.success) return d.url;
    if (i < retries - 1) await new Promise(r => setTimeout(r, 3000));
    else throw new Error(d.error ?? `HTTP ${res.status}`);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

let processed = 0, done = 0, skipped = 0, errors = 0;

for (const [dir, dirKey] of DIRS) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) continue;

  for (const f of fs.readdirSync(abs).sort()) {
    if (!f.endsWith(".mdx")) continue;
    if (processed >= LIMIT) break;

    const fullPath = path.join(abs, f);
    let raw = fs.readFileSync(fullPath, "utf8");
    const fm = parseFM(raw);

    if (fm.draft === "true") continue;

    const slug     = fm.slug || f.replace(".mdx", "");
    const expected = `${CDN_BASE}/audio/${slug}.mp3`;

    if (ONLY_SLUG && slug !== ONLY_SLUG) continue;

    if (!FORCE && fm.audio_src === expected) {
      skipped++;
      continue;
    }

    process.stdout.write(`🎙  ${dirKey}/${slug}... `);
    const text = (fm.title ? fm.title + ".\n\n" : "") + extractText(raw);

    try {
      const url = await generateAudio(text, slug);
      raw = setFMField(raw, "audio_src", url);
      fs.writeFileSync(fullPath, raw, "utf8");
      done++;
      console.log(`✓ ${url}`);
    } catch (e) {
      errors++;
      console.log(`✗ ${e.message}`);
    }

    processed++;
  }
}

console.log(`\n=== Tamamlandı ===`);
console.log(`Üretilen: ${done} | Atlanan: ${skipped} | Hata: ${errors}`);
if (done > 0) {
  console.log(`\nSonraki: git add content/ && git commit -m "feat: ElevenLabs Türkçe ses (${done} yazı)"`);
}
