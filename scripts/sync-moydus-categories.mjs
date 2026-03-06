import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { createClient } from '@sanity/client'

const args = new Set(process.argv.slice(2))
const isWrite = args.has('--write')
const verbose = args.has('--verbose')

loadEnv(path.join(process.cwd(), '.env.local'))
loadEnv(path.join(process.cwd(), '.env'))
loadEnv('/Users/burakozcan/Desktop/moydus/.env', 'SRC_')

const targetProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const targetDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const targetApiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-02-13'
const targetToken =
  process.env.SANITY_API_TOKEN ||
  process.env.SANITY_WRITE_TOKEN ||
  process.env.SANITY_AUTH_TOKEN ||
  process.env.SANITY_TOKEN

const sourceProjectId =
  process.env.SRC_NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.MOYDUS_SANITY_PROJECT_ID || '7w97x9v4'
const sourceDataset =
  process.env.SRC_NEXT_PUBLIC_SANITY_DATASET || process.env.MOYDUS_SANITY_DATASET || 'production'
const sourceApiVersion = '2026-02-13'

if (!targetProjectId || !targetDataset) {
  throw new Error('Missing target NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET')
}
if (isWrite && !targetToken) {
  throw new Error('Write mode requires SANITY_API_TOKEN (or SANITY_WRITE_TOKEN)')
}

const targetClient = createClient({
  projectId: targetProjectId,
  dataset: targetDataset,
  apiVersion: targetApiVersion,
  token: targetToken,
  useCdn: false,
})

const summary = {
  sourceCategories: 0,
  created: 0,
  updated: 0,
  reused: 0,
}

async function main() {
  const sourceCategories = await fetchSourceCategories()
  summary.sourceCategories = sourceCategories.length

  const existing = await targetClient.fetch(
    `*[_type=="category"]{_id,title,"slug":slug.current}`
  )
  const bySlug = new Map(existing.filter((c) => c?.slug).map((c) => [c.slug, c]))

  // First pass: upsert without parent to guarantee all refs exist.
  const idBySlug = new Map()
  for (const cat of sourceCategories) {
    const doc = {
      _type: 'category',
      title: cat.title,
      slug: { _type: 'slug', current: cat.slug },
      group: cat.group ?? '',
      description:
        cat.description ||
        `${cat.title} kategori sayfası (moydus taxonomy sync).`,
      order: typeof cat.order === 'number' ? cat.order : undefined,
      seo: {
        metaTitle: cat.seo?.metaTitle || `${cat.title} Templates | xMoyduz`,
        metaDescription:
          cat.seo?.metaDescription ||
          `${cat.title} için marketplace kategori sayfası.`,
      },
    }

    const id = await upsertCategory(bySlug, doc, cat.slug)
    idBySlug.set(cat.slug, id)
  }

  // Second pass: patch parent refs.
  for (const cat of sourceCategories) {
    if (!cat.parentSlug) continue
    const categoryId = idBySlug.get(cat.slug)
    const parentId = idBySlug.get(cat.parentSlug)
    if (!categoryId || !parentId) continue

    if (!isWrite) {
      if (verbose) {
        console.log(`[dry-run] set parent: ${cat.slug} -> ${cat.parentSlug}`)
      }
      continue
    }
    await targetClient
      .patch(categoryId)
      .set({ parent: { _type: 'reference', _ref: parentId } })
      .commit()
  }

  printSummary()
}

async function fetchSourceCategories() {
  const query = `*[_type=="category"]|order(title asc){
    title,
    "slug": slug.current,
    group,
    description,
    order,
    "parentSlug": parent->slug.current,
    seo
  }`
  const encoded = encodeURIComponent(query)
  const url = `https://${sourceProjectId}.api.sanity.io/v${sourceApiVersion}/data/query/${sourceDataset}?query=${encoded}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed source query: ${response.status}`)
  }
  const json = await response.json()
  if (!Array.isArray(json.result)) {
    throw new Error('Unexpected source response payload')
  }
  return json.result.filter((c) => c?.slug)
}

async function upsertCategory(bySlug, doc, slug) {
  const existing = bySlug.get(slug)
  const existingIsPrivate = !!existing && isPrivateId(existing._id)
  const publicId = `category-${slug}`

  if (!isWrite) {
    if (existing && !existingIsPrivate) {
      summary.updated += 1
      if (verbose) console.log(`[dry-run] update ${slug}`)
      return existing._id
    }
    summary.created += 1
    if (verbose) console.log(`[dry-run] create ${slug} (${publicId})`)
    bySlug.set(slug, { _id: publicId, slug })
    return publicId
  }

  if (existing && !existingIsPrivate) {
    await targetClient.patch(existing._id).set(doc).commit()
    summary.updated += 1
    if (verbose) console.log(`[write] update ${slug}`)
    return existing._id
  }

  // If private or missing, upsert to deterministic public ID.
  const publicExisting = await targetClient.getDocument(publicId)
  if (publicExisting) {
    await targetClient.patch(publicId).set(doc).commit()
    summary.updated += 1
    if (verbose) console.log(`[write] update ${slug} (${publicId})`)
  } else {
    await targetClient.create({
      _id: publicId,
      ...doc,
    })
    summary.created += 1
    if (verbose) console.log(`[write] create ${slug} (${publicId})`)
  }
  bySlug.set(slug, { _id: publicId, slug })
  return publicId
}

function isPrivateId(id) {
  return typeof id === 'string' && id.includes('.')
}

function printSummary() {
  console.log('\n=== Moydus Category Sync Summary ===')
  console.log(`Mode              : ${isWrite ? 'WRITE' : 'DRY-RUN'}`)
  console.log(`Source            : ${sourceProjectId}/${sourceDataset}`)
  console.log(`Target            : ${targetProjectId}/${targetDataset}`)
  console.log(`Source Categories : ${summary.sourceCategories}`)
  console.log(`Created           : ${summary.created}`)
  console.log(`Updated           : ${summary.updated}`)
  console.log(`Reused            : ${summary.reused}`)
  console.log('\nRun:')
  console.log('node scripts/sync-moydus-categories.mjs --write')
}

function loadEnv(filePath, prefix = '') {
  if (!fs.existsSync(filePath)) return
  const content = fs.readFileSync(filePath, 'utf8')
  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq < 1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    const finalKey = prefix ? `${prefix}${key}` : key
    if (process.env[finalKey] === undefined) {
      process.env[finalKey] = value
    }
  }
}

main().catch((err) => {
  console.error('\nCategory sync failed:', err.message)
  process.exit(1)
})
