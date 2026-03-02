/**
 * Haftalık publish scripti
 * - Pipeline çalıştırır (1 yazı üretir)
 * - draft: false yapıp git commit eder
 * - Push eder (deploy tetiklenir)
 * - IndexNow'a bildirir
 *
 * Kurulum (Mac cron — Pazartesi + Perşembe saat 09:00):
 *   crontab -e
 *   0 9 * * 1,4 cd /Users/burakozcan/Desktop/new-moyduz-app && node scripts/weekly-publish.mjs >> /tmp/moyduz-publish.log 2>&1
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

function run(cmd, opts = {}) {
  return execSync(cmd, { cwd: ROOT, encoding: "utf8", ...opts });
}

function log(msg) {
  const ts = new Date().toISOString();
  console.log(`[${ts}] ${msg}`);
}

log("=== Haftalık publish başlıyor ===");

// 1. Pipeline çalıştır (worker redeploy + içerik üret)
log("Pipeline çalıştırılıyor...");
try {
  run("node scripts/run-pipeline.mjs", { stdio: "inherit" });
} catch (e) {
  log(`Pipeline hatası: ${e.message}`);
  process.exit(1);
}

// 2. Yeni oluşturulan draft dosyaları bul ve yayınla
log("Yeni draft'lar yayınlanıyor...");
const blogDir = path.join(ROOT, "content/blog");
let published = [];

for (const file of fs.readdirSync(blogDir)) {
  if (!file.endsWith(".mdx")) continue;
  const fullPath = path.join(blogDir, file);
  const content = fs.readFileSync(fullPath, "utf8");
  if (content.includes("draft: true")) {
    const updated = content.replace("draft: true", "draft: false");
    fs.writeFileSync(fullPath, updated, "utf8");
    published.push(file);
    log(`  ✓ Yayınlandı: ${file}`);
  }
}

if (published.length === 0) {
  log("Yayınlanacak yeni içerik yok.");
  process.exit(0);
}

// 3. Git commit + push
log("Git commit + push...");
const fileList = published.map((f) => `content/blog/${f}`).join(" ");
run(`git add ${fileList} data/keywords.json`);
run(`git commit -m "content: ${published.length} yeni yazı yayınlandı (otomatik)\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"`);
run("git push");
log("✓ Push tamamlandı — deploy tetiklendi");

// 4. IndexNow
log("IndexNow submit...");
try {
  run("node scripts/indexnow-submit.mjs", { stdio: "inherit" });
} catch {
  log("IndexNow başarısız (kritik değil)");
}

log(`=== Tamamlandı. ${published.length} yazı yayında ===`);
