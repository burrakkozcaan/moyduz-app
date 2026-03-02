/**
 * Audio generation script — MDX → Cloudflare AI TTS → R2 → cdn.moyduz.com
 *
 * Usage:
 *   pnpm audio:generate content/blog/some-post.mdx
 *   pnpm audio:generate --all                         # all published posts
 *   pnpm audio:generate --all --force                 # re-generate existing
 *
 * Env vars (.env.local):
 *   AUDIO_WORKER_URL   Worker URL (required)
 *   AUTH_SECRET      Optional bearer token for auth
 *
 * On success, updates MDX frontmatter: audio_src = "https://cdn.moyduz.com/audio/<slug>.mp3"
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// ─── Config ───────────────────────────────────────────────────────────────────

// Load .env.local manually (no dotenv dependency needed)
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const WORKER_URL = process.env.AUDIO_WORKER_URL;
const AUTH_SECRET = process.env.AUTH_SECRET;
const CDN_BASE = "https://cdn.moyduz.com";

if (!WORKER_URL) {
  console.error("❌  AUDIO_WORKER_URL is not set in .env.local");
  console.error("    Set it to your deployed Worker URL, e.g.:");
  console.error("    AUDIO_WORKER_URL=https://moyduz-audio-tts.<account>.workers.dev");
  process.exit(1);
}

// ─── CLI args ─────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const ALL = args.includes("--all");
const FORCE = args.includes("--force");
const target = args.find((a) => !a.startsWith("--"));

if (!ALL && !target) {
  console.error("Usage:");
  console.error("  pnpm audio:generate content/blog/some-post.mdx");
  console.error("  pnpm audio:generate --all [--force]");
  process.exit(1);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function extractText(mdxContent) {
  return mdxContent
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^[-*]\s+/gm, "")
    .replace(/^\|.+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/`[^`]+`/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^-{3,}$/gm, "")
    .replace(/import\s+.+from\s+.+/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\[!\w+\]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function processFile(mdxPath) {
  const fullPath = path.resolve(mdxPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`  ✗ File not found: ${fullPath}`);
    return false;
  }

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data: frontmatter, content } = matter(raw);

  if (frontmatter.draft === true || frontmatter.draft === "true") {
    console.log(`  ⏭  Skipped (draft): ${mdxPath}`);
    return false;
  }

  const slug = frontmatter.slug || path.basename(fullPath, ".mdx");
  const expectedSrc = `${CDN_BASE}/audio/${slug}.mp3`;

  if (!FORCE && frontmatter.audio_src === expectedSrc) {
    console.log(`  ✓  Already done: ${slug}`);
    return false;
  }

  const plainText = extractText(content);
  const words = plainText.split(/\s+/);
  // ~500 words ≈ ~3 min audio; stay within MeloTTS char limit
  const text = words.slice(0, 500).join(" ").slice(0, 3000);

  console.log(`  🎙  ${slug} (${words.length} words → ${text.length} chars)`);

  const headers = { "Content-Type": "application/json" };
  if (AUTH_SECRET) headers["Authorization"] = `Bearer ${AUTH_SECRET}`;

  const res = await fetch(WORKER_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ text, slug, lang: "TR" }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    console.error(`  ✗  Worker error (${res.status}): ${data.error ?? JSON.stringify(data)}`);
    return false;
  }

  console.log(`  ✓  Audio: ${data.url}`);

  // Update frontmatter
  const updated = matter.stringify(content, { ...frontmatter, audio_src: expectedSrc });
  fs.writeFileSync(fullPath, updated, "utf8");
  console.log(`  ✓  Frontmatter updated: audio_src = "${expectedSrc}"`);
  return true;
}

// ─── Collect files ────────────────────────────────────────────────────────────

let files = [];

if (ALL) {
  const dirs = ["content/blog", "content/rehber"];
  for (const dir of dirs) {
    const absDir = path.join(process.cwd(), dir);
    if (!fs.existsSync(absDir)) continue;
    for (const f of fs.readdirSync(absDir)) {
      if (f.endsWith(".mdx")) files.push(path.join(dir, f));
    }
  }
  console.log(`Found ${files.length} MDX files\n`);
} else {
  files = [target];
}

// ─── Process ──────────────────────────────────────────────────────────────────

let done = 0;
let skipped = 0;
let failed = 0;

for (const f of files) {
  const ok = await processFile(f);
  if (ok) done++;
  else if (ok === false) skipped++;
  else failed++;
}

console.log(`\nDone: ${done}, Skipped: ${skipped}, Failed: ${failed}`);
if (done > 0) {
  console.log("\nNext step: commit the MDX frontmatter changes and deploy.");
}
