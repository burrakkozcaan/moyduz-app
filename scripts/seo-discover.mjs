/**
 * SEO Keyword Discovery — Google Search Console API
 *
 * Kullanım:
 *   pnpm seo:discover                        # varsayılan filtreler
 *   pnpm seo:discover --days=180             # 180 günlük veri (varsayılan: 90)
 *   pnpm seo:discover --min-imp=10           # minimum gösterim (varsayılan: 50)
 *   pnpm seo:discover --max-ctr=10           # max CTR % (varsayılan: 5)
 *   pnpm seo:discover --min-pos=1            # min pozisyon (varsayılan: 1)
 *   pnpm seo:discover --max-pos=50           # max pozisyon (varsayılan: 50)
 *   pnpm seo:discover --limit=50             # max keyword sayısı (varsayılan: 30)
 *   pnpm seo:discover --no-ai               # AI analizi atla
 *   pnpm seo:discover --dump                 # filtresiz tüm satırları göster (debug)
 *
 * .env.local:
 *   GSC_SERVICE_ACCOUNT_PATH=/path/to/service-account.json
 *   GSC_SITE_URL=sc-domain:moyduz.com
 *   CONTENT_WORKER_URL=https://moyduz-content-ai.burhanburakozcaan.workers.dev
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

// ─── Env ──────────────────────────────────────────────────────────────────────

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const SA_PATH = process.env.GSC_SERVICE_ACCOUNT_PATH;
const SITE_URL = process.env.GSC_SITE_URL || "sc-domain:moyduz.com";
const CONTENT_WORKER = process.env.CONTENT_WORKER_URL;
const KEYWORDS_PATH = path.join(process.cwd(), "data/keywords.json");

// ─── CLI ──────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const NO_AI  = args.includes("--no-ai");
const DUMP   = args.includes("--dump");

function getArg(name, fallback) {
  const a = args.find((x) => x.startsWith(`--${name}=`));
  return a ? parseFloat(a.split("=")[1]) : fallback;
}

const DAYS    = getArg("days",    90);
const MIN_IMP = getArg("min-imp", 50);
const MAX_CTR = getArg("max-ctr", 5) / 100;   // kullanıcı % girer, API 0-1 ister
const MIN_POS = getArg("min-pos", 1);
const MAX_POS = getArg("max-pos", 50);
const LIMIT   = getArg("limit",   30);

if (!SA_PATH) {
  console.error("❌  GSC_SERVICE_ACCOUNT_PATH .env.local içinde tanımlı değil.");
  console.error("\n    Kurulum:");
  console.error("    1. console.cloud.google.com → Search Console API etkinleştir");
  console.error("    2. IAM → Hizmet hesabı → JSON key indir");
  console.error("    3. search.google.com/search-console → Ayarlar → hizmet hesabı emailini ekle (Full)");
  console.error("    4. .env.local: GSC_SERVICE_ACCOUNT_PATH=/path/to/key.json");
  process.exit(1);
}

// ─── Google Auth (Service Account JWT) ───────────────────────────────────────

async function getGoogleToken() {
  const sa = JSON.parse(fs.readFileSync(SA_PATH, "utf8"));
  const now = Math.floor(Date.now() / 1000);

  const header  = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify({
    iss:   sa.client_email,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud:   "https://oauth2.googleapis.com/token",
    iat:   now,
    exp:   now + 3600,
  })).toString("base64url");

  const signingInput = `${header}.${payload}`;
  const key = crypto.createPrivateKey(sa.private_key);
  const sig = crypto.sign("sha256", Buffer.from(signingInput), key).toString("base64url");

  const res  = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${signingInput}.${sig}`,
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(`Auth hatası: ${JSON.stringify(data)}`);
  return data.access_token;
}

// ─── Search Console API ───────────────────────────────────────────────────────

async function fetchRows(token) {
  const end   = new Date();
  const start = new Date();
  start.setDate(start.getDate() - DAYS);

  const body = {
    startDate:  start.toISOString().slice(0, 10),
    endDate:    end.toISOString().slice(0, 10),
    dimensions: ["query", "page"],
    rowLimit:   5000,      // max 25000, 5000 çoğu site için yeterli
    startRow:   0,
  };

  const res  = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`,
    {
      method:  "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body:    JSON.stringify(body),
    }
  );
  const data = await res.json();

  if (data.error) throw new Error(`GSC API hatası: ${JSON.stringify(data.error)}`);
  return data.rows ?? [];
}

// ─── Filter ───────────────────────────────────────────────────────────────────

function filterOpportunities(rows) {
  return rows
    .filter(
      (r) =>
        r.impressions >= MIN_IMP &&
        r.ctr         <= MAX_CTR &&
        r.position    >= MIN_POS &&
        r.position    <= MAX_POS
    )
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, LIMIT);
}

// ─── AI Analysis ─────────────────────────────────────────────────────────────

async function analyzeWithAI(query, page, metrics) {
  if (!CONTENT_WORKER || NO_AI) return null;
  try {
    const res = await fetch(`${CONTENT_WORKER}/content`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system: "Sen bir Türkçe SEO uzmanısın. Yalnızca geçerli JSON döndür.",
        prompt: `Keyword: "${query}"
Mevcut sayfa: ${page}
Pozisyon: ${metrics.position.toFixed(1)} | Gösterim: ${metrics.impressions} | CTR: ${(metrics.ctr * 100).toFixed(2)}%

JSON formatında kısa analiz:
{
  "intent":   "informational|transactional|navigational",
  "cluster":  "e_ticaret_baslangic|teknik_seo|ai_seo|is_kurma|performans|trendyol|compare|growth_blog",
  "action":   "yeni-icerik|mevcut-optimize|title-optimize",
  "priority": 3,
  "problem":  "CTR düşük nedeni (tek cümle)"
}`,
        max_tokens: 250,
      }),
    });
    const data  = await res.json();
    const match = data.text?.match(/\{[\s\S]*?\}/);
    return match ? JSON.parse(match[0]) : null;
  } catch {
    return null;
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log(`🔍  Search Console → ${SITE_URL}`);
console.log(`    Son ${DAYS} gün | imp ≥ ${MIN_IMP} | CTR ≤ ${(MAX_CTR * 100).toFixed(1)}% | pos ${MIN_POS}–${MAX_POS}\n`);

const token = await getGoogleToken();
console.log("✓  Google token alındı");

const allRows = await fetchRows(token);
console.log(`✓  ${allRows.length} toplam satır çekildi (filtresiz)`);

// Debug modu: tüm satırları göster
if (DUMP) {
  console.log("\n--- RAW DATA (ilk 30 satır) ---");
  allRows.slice(0, 30).forEach((r, i) => {
    console.log(
      `${String(i + 1).padStart(2)}. "${r.keys[0]}" | pos ${r.position.toFixed(1)} | imp ${r.impressions} | ctr ${(r.ctr * 100).toFixed(2)}%`
    );
  });
  console.log("---");
}

if (allRows.length === 0) {
  console.log("\n⚠  API 0 satır döndürdü. Kontrol et:");
  console.log(`   - GSC_SITE_URL doğru mu? (${SITE_URL})`);
  console.log("   - Search Console'da bu property tanımlı mı?");
  console.log("   - Hizmet hesabının bu property'ye erişimi var mı?");
  console.log("   - Siteye henüz trafik gelmemiş olabilir (yeni site)");
  process.exit(0);
}

const opportunities = filterOpportunities(allRows);
console.log(`✓  ${opportunities.length} fırsat keyword (filtre sonrası)\n`);

// Veri var ama filtre sıfır döndürdüyse istatistik göster
if (opportunities.length === 0 && allRows.length > 0) {
  const sample = allRows.slice(0, 5);
  console.log("⚠  Filtre kriterleri karşılanmadı. Mevcut veri örneği:");
  sample.forEach((r) =>
    console.log(
      `   "${r.keys[0]}" | pos ${r.position.toFixed(1)} | imp ${r.impressions} | ctr ${(r.ctr * 100).toFixed(2)}%`
    )
  );
  console.log(`\n   Öneri: pnpm seo:discover --min-imp=1 --max-ctr=100 --max-pos=100`);
  console.log(`          (tüm keywordleri al, AI fırsatları bulsun)`);
  process.exit(0);
}

const bank     = JSON.parse(fs.readFileSync(KEYWORDS_PATH, "utf8"));
const existing = new Set(bank.items.map((i) => i.keyword.toLowerCase()));

let added = 0, skipped = 0;

for (const row of opportunities) {
  const query = row.keys[0];
  const page  = row.keys[1];

  if (existing.has(query.toLowerCase())) {
    console.log(`  ⏭  Mevcut: "${query}"`);
    skipped++;
    continue;
  }

  process.stdout.write(
    `  📊 "${query}" (pos ${row.position.toFixed(1)}, imp ${row.impressions}) ... `
  );

  const ai = await analyzeWithAI(query, page, row);
  console.log(ai ? `[${ai.cluster}] → ${ai.action}` : "(AI yok)");

  bank.items.push({
    id:              `kw_gsc_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 5)}`,
    keyword:         query,
    cluster:         ai?.cluster  ?? "e_ticaret_baslangic",
    page_type:       ai?.intent === "transactional" ? "landing" : "blog",
    intent:          ai?.intent   ?? "informational",
    priority:        ai?.priority ?? 3,
    status:          "pending",
    source:          "search-console",
    gsc_position:    +row.position.toFixed(1),
    gsc_impressions: row.impressions,
    gsc_ctr:         +row.ctr.toFixed(4),
    gsc_page:        page,
    action:          ai?.action   ?? "yeni-icerik",
    notes:           ai?.problem  ?? "",
  });

  existing.add(query.toLowerCase());
  added++;
}

fs.writeFileSync(KEYWORDS_PATH, JSON.stringify(bank, null, 2) + "\n", "utf8");
console.log(`\n✓  ${added} yeni keyword eklendi, ${skipped} atlandı → data/keywords.json`);
if (added > 0) console.log("   Sonraki adım: pnpm content:pipeline");
