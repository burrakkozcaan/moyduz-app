#!/usr/bin/env node
/**
 * Upload every file in /public to Cloudflare R2 so cdn.moyduz.com can serve them.
 *
 * Required env vars (.env.local or process env):
 * - CLOUDFLARE_ACCOUNT_ID
 * - R2_ACCESS_KEY_ID
 * - R2_SECRET_ACCESS_KEY
 *
 * Optional env vars:
 * - R2_BUCKET                 defaults to "moyduz"
 * - R2_REGION                 defaults to "auto"
 * - R2_ENDPOINT               overrides generated endpoint
 * - R2_PREFIX                 uploads into a nested prefix
 * - CDN_PUBLIC_DIR            defaults to "public"
 *
 * Usage:
 *   node scripts/upload-public-to-r2.mjs
 *   node scripts/upload-public-to-r2.mjs --dry-run
 *   node scripts/upload-public-to-r2.mjs --only images/hero
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();
loadEnvFile(path.join(cwd, ".env"));
loadEnvFile(path.join(cwd, ".env.local"));

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const onlyArgIndex = args.indexOf("--only");
const onlyPrefix =
  onlyArgIndex >= 0 && args[onlyArgIndex + 1]
    ? normalizeKey(args[onlyArgIndex + 1])
    : "";

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucket = process.env.R2_BUCKET || "moyduz";
const region = process.env.R2_REGION || "auto";
const publicDir = path.join(cwd, process.env.CDN_PUBLIC_DIR || "public");
const keyPrefix = normalizeKey(process.env.R2_PREFIX || "");
const endpoint =
  process.env.R2_ENDPOINT ||
  `https://${accountId}.r2.cloudflarestorage.com`;

if (!accountId || !accessKeyId || !secretAccessKey) {
  console.error("Missing R2 credentials.");
  console.error("Expected: CLOUDFLARE_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY");
  process.exit(1);
}

if (!fs.existsSync(publicDir)) {
  console.error(`Public directory not found: ${publicDir}`);
  process.exit(1);
}

const files = walk(publicDir)
  .map((absolutePath) => {
    const relativePath = path.relative(publicDir, absolutePath).split(path.sep).join("/");
    return {
      absolutePath,
      relativePath,
      key: normalizeKey(path.posix.join(keyPrefix, relativePath)),
    };
  })
  .filter((file) => !path.basename(file.relativePath).startsWith("."))
  .filter((file) => !onlyPrefix || file.key.startsWith(onlyPrefix));

if (files.length === 0) {
  console.log("No files matched.");
  process.exit(0);
}

console.log(
  `${dryRun ? "Dry run" : "Uploading"} ${files.length} file(s) from ${path.relative(
    cwd,
    publicDir,
  )} to bucket "${bucket}"${onlyPrefix ? ` (prefix filter: ${onlyPrefix})` : ""}`,
);

let uploaded = 0;
let failed = 0;

for (const file of files) {
  const body = fs.readFileSync(file.absolutePath);
  const contentType = getContentType(file.relativePath);
  const cacheControl = getCacheControl(file.relativePath);

  if (dryRun) {
    console.log(`[dry-run] ${file.relativePath} -> ${file.key} (${contentType})`);
    uploaded += 1;
    continue;
  }

  try {
    await putObject({
      endpoint,
      bucket,
      region,
      accessKeyId,
      secretAccessKey,
      key: file.key,
      body,
      contentType,
      cacheControl,
    });
    console.log(`uploaded ${file.relativePath} -> ${file.key}`);
    uploaded += 1;
  } catch (error) {
    failed += 1;
    const message = error instanceof Error ? error.message : String(error);
    console.error(`failed   ${file.relativePath}: ${message}`);
  }
}

console.log(`\nUploaded: ${uploaded}`);
if (failed > 0) {
  console.log(`Failed: ${failed}`);
  process.exit(1);
}

function loadEnvFile(envPath) {
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (!match) continue;
    if (Object.prototype.hasOwnProperty.call(process.env, match[1])) continue;
    process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
}

function normalizeKey(value) {
  return value.replace(/^\/+/, "").replace(/\\/g, "/");
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const result = [];

  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...walk(absolutePath));
      continue;
    }
    if (entry.isFile()) {
      result.push(absolutePath);
    }
  }

  return result;
}

function sha256(value, encoding) {
  const hash = crypto.createHash("sha256").update(value).digest();
  return encoding ? hash.toString(encoding) : hash;
}

function hmac(key, value, encoding) {
  const hash = crypto.createHmac("sha256", key).update(value).digest();
  return encoding ? hash.toString(encoding) : hash;
}

function amzDateParts(now = new Date()) {
  const iso = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  return {
    amzDate: iso,
    shortDate: iso.slice(0, 8),
  };
}

async function putObject({
  endpoint,
  bucket,
  region,
  accessKeyId,
  secretAccessKey,
  key,
  body,
  contentType,
  cacheControl,
}) {
  const { amzDate, shortDate } = amzDateParts();
  const objectPath = `/${bucket}/${encodeKey(key)}`;
  const url = `${endpoint.replace(/\/$/, "")}${objectPath}`;
  const payloadHash = sha256(body, "hex");

  const headers = {
    host: new URL(endpoint).host,
    "x-amz-content-sha256": payloadHash,
    "x-amz-date": amzDate,
    "content-type": contentType,
    "content-length": String(body.byteLength),
    "cache-control": cacheControl,
  };

  const signedHeaders = Object.keys(headers).sort().join(";");
  const canonicalHeaders = Object.keys(headers)
    .sort()
    .map((keyName) => `${keyName}:${String(headers[keyName]).trim()}\n`)
    .join("");

  const canonicalRequest = [
    "PUT",
    objectPath,
    "",
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");

  const scope = `${shortDate}/${region}/s3/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    scope,
    sha256(canonicalRequest, "hex"),
  ].join("\n");

  const signingKey = getSigningKey(secretAccessKey, shortDate, region, "s3");
  const signature = hmac(signingKey, stringToSign, "hex");

  const authorization = [
    `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${scope}`,
    `SignedHeaders=${signedHeaders}`,
    `Signature=${signature}`,
  ].join(", ");

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      ...headers,
      Authorization: authorization,
    },
    body,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.status} ${response.statusText} ${text}`.trim());
  }
}

function getSigningKey(secretAccessKey, shortDate, region, service) {
  const kDate = hmac(`AWS4${secretAccessKey}`, shortDate);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, service);
  return hmac(kService, "aws4_request");
}

function encodeKey(key) {
  return key
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".svg":
      return "image/svg+xml";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    case ".avif":
      return "image/avif";
    case ".ico":
      return "image/x-icon";
    case ".mp4":
      return "video/mp4";
    case ".mp3":
      return "audio/mpeg";
    case ".wav":
      return "audio/wav";
    case ".txt":
      return "text/plain; charset=utf-8";
    case ".json":
    case ".webmanifest":
      return "application/manifest+json";
    case ".xml":
      return "application/xml";
    case ".pdf":
      return "application/pdf";
    default:
      return "application/octet-stream";
  }
}

function getCacheControl(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".html" || ext === ".xml" || ext === ".txt" || ext === ".json" || ext === ".webmanifest") {
    return "public, max-age=300";
  }
  return "public, max-age=31536000, immutable";
}
