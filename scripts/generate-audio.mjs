/**
 * Audio generation script — MDX → Türkçe MP3 (Mac say + ffmpeg)
 *
 * Usage:
 *   node scripts/generate-audio.mjs content/rehber/e-ticaret-altyapisi.mdx
 *   node scripts/generate-audio.mjs content/blog/some-post.mdx
 *
 * Output: public/audio/<slug>.mp3
 * Updates MDX frontmatter: audio_src: "/audio/<slug>.mp3"
 *
 * Requirements (Mac): say (built-in) + ffmpeg (brew install ffmpeg)
 * Voice: Yelda (TR) — install via System Preferences > Accessibility > Spoken Content
 */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import matter from "gray-matter";

const AUDIO_DIR = path.join(process.cwd(), "public", "audio");
fs.mkdirSync(AUDIO_DIR, { recursive: true });

// ─── Args ────────────────────────────────────────────────────────────────────

const mdxPath = process.argv[2];
if (!mdxPath) {
  console.error("Usage: node scripts/generate-audio.mjs <path-to-mdx>");
  process.exit(1);
}

const fullMdxPath = path.resolve(mdxPath);
if (!fs.existsSync(fullMdxPath)) {
  console.error("File not found:", fullMdxPath);
  process.exit(1);
}

// ─── Parse MDX ───────────────────────────────────────────────────────────────

const raw = fs.readFileSync(fullMdxPath, "utf8");
const { data: frontmatter, content } = matter(raw);

const slug = frontmatter.slug || path.basename(fullMdxPath, ".mdx");

// ─── Extract plain text ───────────────────────────────────────────────────────

function extractText(mdxContent) {
  return mdxContent
    .replace(/^#{1,6}\s+/gm, "")            // headings
    .replace(/\*\*(.+?)\*\*/g, "$1")        // bold
    .replace(/\*(.+?)\*/g, "$1")            // italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links
    .replace(/^[-*]\s+/gm, "")              // bullets
    .replace(/^\|.+/gm, "")                 // tables
    .replace(/^\d+\.\s+/gm, "")             // numbered list
    .replace(/`[^`]+`/g, "")               // inline code
    .replace(/```[\s\S]*?```/g, "")         // code blocks
    .replace(/^-{3,}$/gm, "")              // hr
    .replace(/import\s+.+from\s+.+/g, "")  // MDX imports
    .replace(/<[^>]+>/g, "")               // JSX/HTML tags
    .replace(/\[!\w+\]/g, "")             // callout markers
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const plainText = extractText(content);
const words = plainText.split(/\s+/);
// Max ~900 words ≈ ~5 min at 175wpm
const trimmedText = words.slice(0, 900).join(" ");

console.log(`Text: ${words.length} words → ${trimmedText.split(/\s+/).length} (trimmed)`);

// ─── Generate audio ───────────────────────────────────────────────────────────

const tmpAiff = `/tmp/${slug}.aiff`;
const outMp3 = path.join(AUDIO_DIR, `${slug}.mp3`);

// Write text to temp file (avoid shell escaping issues)
const tmpTxt = `/tmp/${slug}-tts.txt`;
fs.writeFileSync(tmpTxt, trimmedText, "utf8");

// Check voice availability
let voice = "Yelda";
try {
  const voices = execSync("say -v '?'", { encoding: "utf8" });
  if (!voices.includes("Yelda")) {
    voice = "Samantha"; // English fallback
    console.warn("⚠  Yelda (TR) not found — using Samantha (EN). Install via System Preferences.");
  }
} catch {
  voice = "Samantha";
}

console.log(`🎙  Voice: ${voice}`);
console.log(`📝  Generating AIFF...`);
execSync(`say -v "${voice}" -r 175 -f "${tmpTxt}" -o "${tmpAiff}"`, { stdio: "inherit" });

console.log(`🎵  Converting to MP3...`);
execSync(
  `ffmpeg -y -i "${tmpAiff}" -c:a libmp3lame -q:a 4 -ar 44100 "${outMp3}"`,
  { stdio: "pipe" }
);

// Cleanup
fs.unlinkSync(tmpAiff);
fs.unlinkSync(tmpTxt);

const stat = fs.statSync(outMp3);
const sizeMB = (stat.size / 1024 / 1024).toFixed(1);
console.log(`✓  MP3: ${outMp3} (${sizeMB} MB)`);

// ─── Update MDX frontmatter ───────────────────────────────────────────────────

const audioSrc = `/audio/${slug}.mp3`;
if (frontmatter.audio_src !== audioSrc) {
  const updated = matter.stringify(content, { ...frontmatter, audio_src: audioSrc });
  fs.writeFileSync(fullMdxPath, updated, "utf8");
  console.log(`✓  Updated frontmatter: audio_src = "${audioSrc}"`);
} else {
  console.log(`ℹ  frontmatter already has audio_src — skipped`);
}

console.log(`\n🚀 Done! Add to the page:\n   audio_src: "${audioSrc}"`);
