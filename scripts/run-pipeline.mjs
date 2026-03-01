/**
 * Pipeline runner — worker'ları redeploy eder, sonra content pipeline'ı çalıştırır
 * Kullanım: pnpm content:pipeline
 */
import { execSync } from "node:child_process";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

function run(cmd, cwd = ROOT) {
  execSync(cmd, { cwd, stdio: "inherit" });
}

console.log("🔄  Workers redeploy ediliyor...");
run("npx wrangler deploy", path.join(ROOT, "workers/content-ai"));
run("npx wrangler deploy", path.join(ROOT, "workers/audio-tts"));
console.log("✓  Workers hazır\n");

run("node scripts/content-pipeline.mjs", ROOT);
