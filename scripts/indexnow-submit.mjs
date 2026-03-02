/**
 * IndexNow submit script
 *
 * Usage:
 *   pnpm run indexnow              # submit URLs modified in last 7 days
 *   pnpm run indexnow --all        # submit all published URLs
 *   pnpm run indexnow --dry-run    # print URLs without submitting
 *   pnpm run indexnow --since=3    # modified in last N days
 *
 * Reads all published (draft: false / no draft field) MDX posts from
 * content/blog, content/rehber, content/compare plus static pages,
 * then submits the list to IndexNow.
 */

import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://www.moyduz.com";
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "c63328e4571f4757b20f5e42079c7734";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

// ─── CLI flags ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const ALL = args.includes("--all");
const DRY_RUN = args.includes("--dry-run");
const sinceArg = args.find((a) => a.startsWith("--since="));
const SINCE_DAYS = sinceArg ? parseInt(sinceArg.split("=")[1], 10) : 7;

// ─── Static pages ─────────────────────────────────────────────────────────────

const STATIC_PATHS = [
  "/",
  "/about",
  "/services",
  "/services/web-design",
  "/services/web-development",
  "/services/ecommerce-website-development",
  "/services/software-company",
  "/pricing",
  "/blog",
  "/contact",
  "/faq",
  "/careers",
  "/customers",
  "/compare",
  "/alternatives",
  "/changelog",
  "/e-ticaret-nasil-yapilir-2026-rehberi",
  "/e-ticaret-paketleri",
  "/ozel-e-ticaret",
  "/b2b-ecommerce",
  "/cok-saticili-e-ticaret-altyapisi",
  "/ecommerce-migration",
  "/partner-programi",
  "/tools",
  "/tools/e-ticaret-kar-hesaplama",
  "/tools/maliyet-hesaplama",
  "/tools/roi-hesaplama",
  "/tools/komisyon-hesaplama",
  "/tools/sanal-pos-hesaplama",
  "/tools/site-saglik-skoru",
  "/marketplace/templates",
  "/rehber",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Parse slug and draft fields from MDX frontmatter (top-level keys only) */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split("\n")) {
    // Skip indented lines (nested YAML objects like category.slug)
    if (/^\s/.test(line)) continue;
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    fm[key] = val;
  }
  return fm;
}

/** Collect published MDX URLs from a content directory */
function collectUrls(dir, urlPrefix) {
  if (!fs.existsSync(dir)) return [];
  const cutoff = ALL ? 0 : Date.now() - SINCE_DAYS * 86400_000;
  const urls = [];

  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".mdx")) continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    const content = fs.readFileSync(filePath, "utf8");
    const fm = parseFrontmatter(content);

    // Skip drafts
    if (fm.draft === "true") continue;

    // Skip if not recently modified (unless --all)
    if (!ALL && stat.mtimeMs < cutoff) continue;

    const slug = fm.slug || file.replace(/\.mdx$/, "");
    urls.push(`${SITE_URL}${urlPrefix}/${slug}`);
  }

  return urls;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const blogUrls = collectUrls(
  path.join(process.cwd(), "content/blog"),
  "/blog"
);
const rehberUrls = collectUrls(
  path.join(process.cwd(), "content/rehber"),
  "/rehber"
);
const compareUrls = collectUrls(
  path.join(process.cwd(), "content/compare"),
  "/compare"
);

// Static pages are always included when --all, otherwise skip
const staticUrls = ALL ? STATIC_PATHS.map((p) => `${SITE_URL}${p}`) : [];

const allUrls = [...staticUrls, ...blogUrls, ...rehberUrls, ...compareUrls];

if (allUrls.length === 0) {
  console.log(
    `✓ No URLs to submit (no content modified in last ${SINCE_DAYS} days).`
  );
  console.log("  Use --all to submit everything, or --since=N for N days.");
  process.exit(0);
}

console.log(`IndexNow submit — ${allUrls.length} URL(s)`);
if (ALL) console.log("  Mode: all published content");
else console.log(`  Mode: modified in last ${SINCE_DAYS} day(s)`);
if (DRY_RUN) console.log("  DRY RUN — nothing will be submitted\n");

for (const url of allUrls) {
  console.log(" ", url);
}
console.log();

if (DRY_RUN) {
  console.log("Dry run complete. Remove --dry-run to submit.");
  process.exit(0);
}

// IndexNow allows max 10,000 URLs per batch; chunk just in case
const BATCH_SIZE = 10_000;
let submitted = 0;
let failed = 0;

for (let i = 0; i < allUrls.length; i += BATCH_SIZE) {
  const batch = allUrls.slice(i, i + BATCH_SIZE);
  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: new URL(SITE_URL).hostname,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: batch,
      }),
    });

    if (res.ok || res.status === 202) {
      submitted += batch.length;
      console.log(`✓ Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} URLs submitted (HTTP ${res.status})`);
    } else {
      const text = await res.text();
      failed += batch.length;
      console.error(`✗ Batch ${Math.floor(i / BATCH_SIZE) + 1}: HTTP ${res.status} — ${text}`);
    }
  } catch (err) {
    failed += batch.length;
    console.error(`✗ Batch ${Math.floor(i / BATCH_SIZE) + 1}: Network error — ${err.message}`);
  }
}

console.log();
console.log(`Done. Submitted: ${submitted}, Failed: ${failed}`);
