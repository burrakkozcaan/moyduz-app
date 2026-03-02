/**
 * Translation Engine — M2M-100 ile çok dilli çeviri
 *
 * Money pages ve blog yazıları için başlık + meta açıklama + key_points alanlarını
 * EN, ES ve/veya DE diline çevirir. Sonuçları frontmatter'a yazar:
 *   title_en, meta_description_en
 *   title_es, meta_description_es
 *   title_de, meta_description_de
 *
 * Kullanım:
 *   node scripts/translate-pages.mjs                     # varsayılan: TR→EN
 *   node scripts/translate-pages.mjs --lang=en,es,de     # birden fazla dil
 *   node scripts/translate-pages.mjs --lang=es           # sadece İspanyolca
 *   node scripts/translate-pages.mjs --regen             # var olanları yeniden üret
 *   node scripts/translate-pages.mjs --slug=iyzico-nedir
 *   node scripts/translate-pages.mjs --limit=10
 *   node scripts/translate-pages.mjs --dir=pages         # sadece servis sayfaları
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
const slugArg   = args.find(a => a.startsWith("--slug="));
const ONLY_SLUG = slugArg ? slugArg.split("=")[1] : null;
const limArg    = args.find(a => a.startsWith("--limit="));
const LIMIT     = limArg ? parseInt(limArg.split("=")[1]) : Infinity;
const offArg    = args.find(a => a.startsWith("--offset="));
const OFFSET    = offArg ? parseInt(offArg.split("=")[1]) : 0;
const langArg   = args.find(a => a.startsWith("--lang="));
const LANGS     = langArg ? langArg.split("=")[1].split(",") : ["en"];
const dirArg    = args.find(a => a.startsWith("--dir="));
const ONLY_DIR  = dirArg ? dirArg.split("=")[1] : null; // blog | rehber | pages

const LANG_NAMES = {
  en: "İngilizce",
  es: "İspanyolca",
  de: "Almanca",
  fr: "Fransızca",
};

const ALL_DIRS = [
  ["content/blog",   "/blog",   "blog"],
  ["content/rehber", "/rehber", "rehber"],
  ["content/pages",  "/pages",  "pages"],
];

const DIRS = ONLY_DIR ? ALL_DIRS.filter(d => d[2] === ONLY_DIR) : ALL_DIRS;

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
  const escaped = value.replace(/"/g, "'");
  if (fmBlock.includes(`${key}:`)) {
    return raw.replace(new RegExp(`^${key}:.*$`, "m"), `${key}: "${escaped}"`);
  }
  return `${fmBlock}\n${key}: "${escaped}"\n---${rest}`;
}

// ─── API ──────────────────────────────────────────────────────────────────────

function authHeaders() {
  const h = { "Content-Type": "application/json" };
  if (AUTH_SECRET) h["Authorization"] = `Bearer ${AUTH_SECRET}`;
  return h;
}

async function translateText(text, targetLang, retries = 2) {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(`${CONTENT_WORKER}/translate`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ text, source_lang: "tr", target_lang: targetLang }),
    });
    const d = await res.json();
    if (res.ok && d.translated_text) return d.translated_text;
    if (i < retries - 1) await new Promise(r => setTimeout(r, 2000));
    else throw new Error(d.error ?? `HTTP ${res.status}`);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

if (!CONTENT_WORKER) {
  console.error("CONTENT_WORKER_URL eksik (.env.local)");
  process.exit(1);
}

console.log(`🌍 Çevrilecek diller: ${LANGS.map(l => LANG_NAMES[l] || l).join(", ")}`);

let processed = 0, skipped = 0, done = 0, errors = 0;

for (const [dir, , dirKey] of DIRS) {
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
    const desc  = fm.meta_description || "";

    if (ONLY_SLUG && slug !== ONLY_SLUG) continue;
    if (!title) { processed++; continue; }

    // Check if we need to translate any lang
    const needsWork = LANGS.some(lang => {
      const hasTitle = !!fm[`title_${lang}`];
      const hasDesc  = !!fm[`meta_description_${lang}`];
      return REGEN || !hasTitle || !hasDesc;
    });

    if (!needsWork) { processed++; continue; }

    console.log(`\n🌐 ${dirKey}/${slug}`);
    let changed = false;

    for (const lang of LANGS) {
      const titleKey = `title_${lang}`;
      const descKey  = `meta_description_${lang}`;

      if (!REGEN && fm[titleKey] && fm[descKey]) continue;

      process.stdout.write(`  ${LANG_NAMES[lang] || lang}... `);
      try {
        const [translatedTitle, translatedDesc] = await Promise.all([
          translateText(title, lang),
          desc ? translateText(desc, lang) : Promise.resolve(""),
        ]);

        raw = setFMField(raw, titleKey, translatedTitle);
        if (translatedDesc) raw = setFMField(raw, descKey, translatedDesc);
        changed = true;
        done++;
        console.log(`✓ "${translatedTitle.slice(0, 50)}"`);
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
console.log(`Çevrilen: ${done} | Hata: ${errors}`);
console.log(`\nSonraki: git add content/ && git commit -m "feat: çok dilli çeviri (${LANGS.join(",")} )"`);
