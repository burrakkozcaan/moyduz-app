/**
 * ASR Transcript Loop — Whisper ile ses dosyalarını metne çevirir
 *
 * audio_src frontmatter alanı olan her sayfanın ses dosyasını Whisper'a gönderir,
 * dönen metni `transcript` frontmatter alanına yazar.
 * Transcript SEO metni olarak ve sayfa içinde erişilebilirlik özelliği olarak kullanılabilir.
 *
 * Kullanım:
 *   node scripts/transcribe-audio.mjs
 *   node scripts/transcribe-audio.mjs --regen           # var olan transcript'leri de yenile
 *   node scripts/transcribe-audio.mjs --slug=iyzico-nedir
 *   node scripts/transcribe-audio.mjs --limit=10
 *   node scripts/transcribe-audio.mjs --offset=20
 *   node scripts/transcribe-audio.mjs --dry-run         # hangi dosyaların işleneceğini listele
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
  ["content/blog",   "/blog"],
  ["content/rehber", "/rehber"],
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
  // Transcripts can contain quotes/apostrophes — wrap in single quotes
  const escaped = value.replace(/'/g, "''");
  if (fmBlock.includes(`${key}:`)) {
    return raw.replace(new RegExp(`^${key}:.*$`, "m"), `${key}: '${escaped}'`);
  }
  return `${fmBlock}\n${key}: '${escaped}'\n---${rest}`;
}

// ─── API ──────────────────────────────────────────────────────────────────────

function authHeaders() {
  const h = { "Content-Type": "application/json" };
  if (AUTH_SECRET) h["Authorization"] = `Bearer ${AUTH_SECRET}`;
  return h;
}

async function transcribeAudio(audioUrl, retries = 2) {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(`${CONTENT_WORKER}/transcribe`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ audio_url: audioUrl }),
    });
    const d = await res.json();
    if (res.ok && d.success && d.text) return d;
    if (i < retries - 1) await new Promise(r => setTimeout(r, 5000));
    else throw new Error(d.error ?? `HTTP ${res.status}`);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

if (!CONTENT_WORKER) {
  console.error("CONTENT_WORKER_URL eksik (.env.local)");
  process.exit(1);
}

let processed = 0, skipped = 0, done = 0, noAudio = 0, errors = 0;

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

    const slug     = fm.slug || f.replace(".mdx", "");
    const audioSrc = fm.audio_src || "";

    if (ONLY_SLUG && slug !== ONLY_SLUG) continue;

    if (!audioSrc) { noAudio++; continue; }

    const hasTranscript = !!fm.transcript;
    if (hasTranscript && !REGEN) { processed++; continue; }

    if (DRY_RUN) {
      console.log(`📄 ${prefix}/${slug}  →  ${audioSrc}`);
      processed++;
      continue;
    }

    console.log(`\n🎙️  ${prefix}/${slug}`);
    process.stdout.write(`  Transkript alınıyor... `);

    try {
      const result = await transcribeAudio(audioSrc);
      // Trim transcript to ~2000 chars (enough for SEO, avoids huge frontmatter)
      const transcript = result.text.trim().slice(0, 2000);
      raw = setFMField(raw, "transcript", transcript);
      fs.writeFileSync(fullPath, raw, "utf8");
      done++;
      console.log(`✓ (${result.word_count ?? "?"} kelime)`);
      console.log(`   ${transcript.slice(0, 100)}...`);
    } catch (e) {
      errors++;
      console.log(`✗ ${e.message}`);
    }

    processed++;
  }
}

console.log(`\n=== Tamamlandı ===`);
if (DRY_RUN) {
  console.log(`Transkript edilecek: ${processed} dosya (--dry-run)`);
} else {
  console.log(`Transkript: ${done} | Ses yok: ${noAudio} | Hata: ${errors}`);
  console.log(`\nSonraki: git add content/ && git commit -m "feat: whisper audio transcripts"`);
}
