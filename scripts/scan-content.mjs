import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

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

const DIRS = [
  ["content/blog",    "/blog"],
  ["content/rehber",  "/rehber"],
  ["content/compare", "/compare"],
];

const noImage = [], noAudio = [], noBoth = [];

for (const [dir, prefix] of DIRS) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) continue;
  for (const f of fs.readdirSync(abs).sort()) {
    if (!f.endsWith(".mdx")) continue;
    const content = fs.readFileSync(path.join(abs, f), "utf8");
    const fm = parseFM(content);
    if (fm.draft === "true") continue;
    const slug = fm.slug || f.replace(".mdx", "");
    const hasImage = !!fm.hero_image;
    const hasAudio = !!fm.audio_src;
    const entry = { dir, f, slug, prefix };
    if (!hasImage && !hasAudio) noBoth.push(entry);
    else if (!hasImage) noImage.push(entry);
    else if (!hasAudio) noAudio.push(entry);
  }
}

console.log(`\n=== İçerik Taraması ===`);
console.log(`\nResim de Audio da YOK (${noBoth.length}):`);
noBoth.forEach(x => console.log(`  ${x.prefix}/${x.slug}`));
console.log(`\nSadece Resim YOK (${noImage.length}):`);
noImage.forEach(x => console.log(`  ${x.prefix}/${x.slug}`));
console.log(`\nSadece Audio YOK (${noAudio.length}):`);
noAudio.forEach(x => console.log(`  ${x.prefix}/${x.slug}`));
console.log(`\nToplam eksik: ${noBoth.length + noImage.length + noAudio.length} sayfa`);
