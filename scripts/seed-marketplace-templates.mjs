import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { createClient } from '@sanity/client'

const NOW_ISO = new Date().toISOString()
const args = new Set(process.argv.slice(2))
const isWrite = args.has('--write')
const updateExisting = args.has('--update-existing')
const isVerbose = args.has('--verbose')

loadLocalEnv()

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-05'
const token =
  process.env.SANITY_API_TOKEN ||
  process.env.SANITY_WRITE_TOKEN ||
  process.env.SANITY_AUTH_TOKEN ||
  process.env.SANITY_TOKEN ||
  process.env.NEXT_PUBLIC_SANITY_API_TOKEN

if (!projectId || !dataset) {
  throw new Error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET'
  )
}

if (isWrite && !token) {
  throw new Error(
    'Write mode requires SANITY_API_TOKEN (or SANITY_WRITE_TOKEN).'
  )
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

const MAIN_CATEGORIES = [
  {
    key: 'business',
    title: 'Business',
    slug: 'business',
    group: 'business',
    order: 1,
    description:
      'Kurumsal ve hizmet odaklı işletmeler için profesyonel web sitesi şablonları.',
  },
  {
    key: 'restaurant',
    title: 'Restaurant',
    slug: 'restaurant',
    group: 'business',
    order: 2,
    description:
      'Restoran, cafe ve yemek işletmeleri için menü ve rezervasyon odaklı şablonlar.',
  },
  {
    key: 'health',
    title: 'Health',
    slug: 'health',
    group: 'business',
    order: 3,
    description:
      'Klinik, sağlık merkezi ve wellness markaları için güven odaklı şablonlar.',
  },
  {
    key: 'beauty',
    title: 'Beauty',
    slug: 'beauty',
    group: 'business',
    order: 4,
    description:
      'Güzellik ve kişisel bakım işletmeleri için randevu ve vitrin odaklı şablonlar.',
  },
  {
    key: 'real-estate',
    title: 'Real Estate',
    slug: 'real-estate',
    group: 'business',
    order: 5,
    description:
      'Emlak ofisleri ve gayrimenkul danışmanları için ilan odaklı şablonlar.',
  },
  {
    key: 'portfolio',
    title: 'Portfolio',
    slug: 'portfolio',
    group: 'creative',
    order: 6,
    description:
      'Freelancer, yaratıcı profesyonel ve içerik üreticileri için portfolyo şablonları.',
  },
  {
    key: 'ecommerce',
    title: 'Ecommerce',
    slug: 'ecommerce',
    group: 'business',
    order: 7,
    description:
      'Ürün odaklı markalar için dönüşüm ve satış performansı odaklı e-ticaret şablonları.',
  },
]

const SUBCATEGORY_GROUPS = [
  {
    source: 'İşletme',
    parentKey: 'business',
    items: [
      'Kurumsal şirket',
      'Danışmanlık firması',
      'Yazılım şirketi',
      'Dijital ajans',
      'Startup / SaaS',
      'İnsan kaynakları',
      'Lojistik şirketi',
      'B2B şirket sitesi',
    ],
  },
  {
    source: 'Sağlık ve Wellness',
    parentKey: 'health',
    items: [
      'Psikolog',
      'Diş kliniği',
      'Estetik klinik',
      'Diyetisyen',
      'Fizyoterapi merkezi',
      'Özel klinik',
      'Sağlık merkezi',
      'Wellness merkezi',
    ],
  },
  {
    source: 'Güzellik ve Bakım',
    parentKey: 'beauty',
    items: [
      'Berber',
      'Kuaför',
      'Güzellik salonu',
      'Spa merkezi',
      'Masaj salonu',
      'Nail salon',
      'Makyaj stüdyosu',
      'Cilt bakım merkezi',
    ],
  },
  {
    source: 'Restoran ve Yemek',
    parentKey: 'restaurant',
    items: [
      'Restoran',
      'Cafe',
      'Pastane',
      'Fast food',
      'Catering şirketi',
      'Food truck',
      'Bar / pub',
      'QR menü sitesi',
    ],
  },
  {
    source: 'E-Ticaret',
    parentKey: 'ecommerce',
    items: [
      'Moda mağazası',
      'Kozmetik mağazası',
      'Elektronik mağazası',
      'Mobilya mağazası',
      'Takı mağazası',
      'Spor ürünleri',
      'Çok kategorili mağaza',
    ],
  },
  {
    source: 'Emlak',
    parentKey: 'real-estate',
    items: [
      'Emlak ofisi',
      'Emlak danışmanı',
      'Gayrimenkul firması',
      'Kiralık ilan sitesi',
      'Satılık ilan sitesi',
    ],
  },
  {
    source: 'İnşaat ve Mimarlık',
    parentKey: 'business',
    items: [
      'İnşaat şirketi',
      'Müteahhit',
      'Mimarlık ofisi',
      'İç mimarlık',
      'Proje tanıtım sitesi',
    ],
  },
  {
    source: 'Profesyonel Hizmetler',
    parentKey: 'business',
    items: [
      'Avukat',
      'Hukuk bürosu',
      'Muhasebeci',
      'Finans danışmanı',
      'Sigorta acentesi',
    ],
  },
  {
    source: 'Eğitim',
    parentKey: 'business',
    items: [
      'Kurs merkezi',
      'Dil okulu',
      'Online kurs',
      'Eğitim kurumu',
      'Öğretmen / eğitmen sitesi',
    ],
  },
  {
    source: 'Spor ve Fitness',
    parentKey: 'health',
    items: [
      'Spor salonu',
      'Fitness antrenörü',
      'Yoga stüdyosu',
      'Pilates stüdyosu',
      'Crossfit salonu',
    ],
  },
  {
    source: 'Portfolyo',
    parentKey: 'portfolio',
    items: [
      'Grafik tasarımcı',
      'Fotoğrafçı',
      'Video prodüksiyon',
      'UX / UI designer',
      'Freelancer portfolyo',
    ],
  },
  {
    source: 'Blog',
    parentKey: 'portfolio',
    items: [
      'Kişisel blog',
      'Teknoloji blogu',
      'Seyahat blogu',
      'Yemek blogu',
      'Lifestyle blogu',
    ],
  },
  {
    source: 'Etkinlik',
    parentKey: 'business',
    items: [
      'Düğün organizasyonu',
      'Konferans sitesi',
      'Festival sitesi',
      'Etkinlik kayıt sitesi',
    ],
  },
  {
    source: 'Turizm',
    parentKey: 'business',
    items: ['Otel', 'Butik otel', 'Tatil köyü', 'Tur şirketi', 'Araç kiralama'],
  },
  {
    source: 'Yerel Hizmetler',
    parentKey: 'business',
    items: [
      'Temizlik şirketi',
      'Oto servis',
      'Elektrikçi',
      'Tesisatçı',
      'Ev bakım hizmetleri',
    ],
  },
]

const result = {
  categoriesCreated: 0,
  categoriesUpdated: 0,
  templatesCreated: 0,
  templatesUpdated: 0,
  templatesSkipped: 0,
}

const ABBREVIATIONS = new Set([
  'AI',
  'API',
  'B2B',
  'B2C',
  'CTA',
  'CRM',
  'ERP',
  'GEO',
  'HR',
  'QR',
  'SaaS',
  'SEO',
  'UI',
  'UX',
])

const MAIN_CATEGORY_CONTEXT = {
  business: {
    intent: 'lead toplama ve güven oluşturma',
    cta: 'teklif alma ve iletişim',
    audience: 'kurumsal ekipler ve hizmet şirketleri',
  },
  restaurant: {
    intent: 'rezervasyon ve sipariş dönüşümü',
    cta: 'menü görüntüleme ve masa rezervasyonu',
    audience: 'restoran, cafe ve yeme-içme markaları',
  },
  health: {
    intent: 'hasta güveni ve randevu talebi',
    cta: 'randevu alma ve uzmanla iletişim',
    audience: 'klinikler, doktorlar ve wellness merkezleri',
  },
  beauty: {
    intent: 'hizmet vitrini ve randevu dönüşümü',
    cta: 'randevu alma ve hizmet paketi inceleme',
    audience: 'güzellik, bakım ve kişisel hizmet markaları',
  },
  'real-estate': {
    intent: 'ilan keşfi ve portföy talebi',
    cta: 'ilan inceleme ve danışmanla görüşme',
    audience: 'emlak ofisleri ve gayrimenkul danışmanları',
  },
  portfolio: {
    intent: 'referans sunumu ve proje talebi',
    cta: 'portfolyo inceleme ve işbirliği başlatma',
    audience: 'freelancerlar ve yaratıcı profesyoneller',
  },
  ecommerce: {
    intent: 'ürün keşfi ve satış dönüşümü',
    cta: 'sepete ekleme ve satın alma',
    audience: 'e-ticaret markaları ve online mağazalar',
  },
}

async function main() {
  const [existingCategories, existingTemplates] = await Promise.all([
    client.fetch(`*[_type == "category"]{_id, title, "slug": slug.current}`),
    client.fetch(`*[_type == "template"]{_id, title, "slug": slug.current}`),
  ])

  const categoryBySlug = new Map(
    existingCategories
      .filter((item) => item?.slug)
      .reduce((acc, item) => {
        const prev = acc.get(item.slug)
        if (!prev || isPrivateDocumentId(prev._id)) {
          acc.set(item.slug, item)
        }
        return acc
      }, new Map())
  )
  const templateBySlug = new Map(
    existingTemplates
      .filter((item) => item?.slug)
      .reduce((acc, item) => {
        const prev = acc.get(item.slug)
        if (!prev || isPrivateDocumentId(prev._id)) {
          acc.set(item.slug, item)
        }
        return acc
      }, new Map())
  )

  const mainCategoryRefs = new Map()
  const subCategoryRefs = new Map()

  const mainSlugByKey = new Map(
    MAIN_CATEGORIES.map((mainCategory) => [mainCategory.key, mainCategory.slug])
  )

  for (const mainCategory of MAIN_CATEGORIES) {
    const doc = buildMainCategoryDoc(mainCategory)
    const id = await upsertCategory(doc, categoryBySlug, { updateIfExists: true })
    mainCategoryRefs.set(mainCategory.key, id)
  }

  let subOrder = 1
  for (const group of SUBCATEGORY_GROUPS) {
    for (const label of group.items) {
      const subSlug = slugify(label)
      const parentId = mainCategoryRefs.get(group.parentKey)
      const parentSlug = mainSlugByKey.get(group.parentKey)
      if (parentSlug && subSlug === parentSlug) {
        if (isVerbose) {
          console.log(
            `[skip] subcategory equals parent slug (${subSlug}) -> using parent reference`
          )
        }
        subCategoryRefs.set(`${group.parentKey}:${subSlug}`, parentId)
        continue
      }

      const doc = buildSubCategoryDoc({
        title: toTitleCase(label),
        slug: subSlug,
        parentId,
        parentKey: group.parentKey,
        order: subOrder,
        source: group.source,
      })
      const id = await upsertCategory(doc, categoryBySlug, {
        updateIfExists: false,
      })
      subCategoryRefs.set(`${group.parentKey}:${subSlug}`, id)
      subOrder += 1
    }
  }

  const seenTemplateSlugs = new Set()
  for (const group of SUBCATEGORY_GROUPS) {
    const main = MAIN_CATEGORIES.find((item) => item.key === group.parentKey)
    if (!main) continue

    for (const label of group.items) {
      const cleanedBase = cleanTemplateBase(label)
      let templateSlug = `${slugify(cleanedBase)}-web-sitesi`
      if (seenTemplateSlugs.has(templateSlug)) {
        let i = 2
        while (seenTemplateSlugs.has(`${templateSlug}-${i}`)) i += 1
        templateSlug = `${templateSlug}-${i}`
      }
      seenTemplateSlugs.add(templateSlug)

      const subSlug = slugify(label)
      const subRefId = subCategoryRefs.get(`${group.parentKey}:${subSlug}`)
      const mainRefId = mainCategoryRefs.get(group.parentKey)

      const templateDoc = buildTemplateDoc({
        parentCategory: main,
        subcategoryLabel: label,
        source: group.source,
        templateSlug,
        mainRefId,
        subRefId,
      })

      await upsertTemplate(templateDoc, templateBySlug)
    }
  }

  printSummary()
}

function buildMainCategoryDoc(main) {
  const context = MAIN_CATEGORY_CONTEXT[main.key] || MAIN_CATEGORY_CONTEXT.business
  const metaTitle = trimMeta(
    `${main.title} Web Sitesi Şablonları | SEO + GEO | xMoyduz`,
    60
  )
  const metaDescription = trimMeta(
    `${main.description} ${upperFirst(
      context.audience
    )} için ${context.intent} odaklı, programmatic SEO uyumlu şablon koleksiyonu.`,
    155
  )

  return {
    _type: 'category',
    title: main.title,
    slug: asSlug(main.slug),
    group: main.group,
    order: main.order,
    description: `${main.description} ${upperFirst(
      context.cta
    )} akışlarını güçlendiren dönüşüm odaklı düzenlerle hazırlanmıştır.`,
    seo: {
      metaTitle,
      metaDescription,
    },
  }
}

function buildSubCategoryDoc({ title, slug, parentId, parentKey, order, source }) {
  const context =
    MAIN_CATEGORY_CONTEXT[parentKey] ||
    MAIN_CATEGORY_CONTEXT.business
  const keyword = `${normalizeForSentence(title)} web sitesi şablonu`

  return {
    _type: 'category',
    title,
    slug: asSlug(slug),
    parent: { _type: 'reference', _ref: parentId },
    order: 100 + order,
    description: `${source} kapsamında ${normalizeForSentence(
      title
    )} odağında; ${context.intent} hedefleyen, ölçeklenebilir içerik yapısına sahip alt kategori.`,
    seo: {
      metaTitle: trimMeta(`${title} Web Sitesi Şablonları | xMoyduz`, 60),
      metaDescription: trimMeta(
        `${title} için ${keyword} koleksiyonu: ${upperFirst(
          context.cta
        )} odaklı, SEO + GEO uyumlu ve hızlı açılan sayfa yapıları.`,
        155
      ),
    },
  }
}

function buildTemplateDoc({
  parentCategory,
  subcategoryLabel,
  source,
  templateSlug,
  mainRefId,
  subRefId,
}) {
  const title = `${cleanTemplateBase(subcategoryLabel)} Web Sitesi`
  const mainPath = `/marketplace/templates/${parentCategory.slug}/${templateSlug}`
  const legacyPath = `/marketplace/templates/${templateSlug}`
  const categoryPath = `/marketplace/templates/${parentCategory.slug}`
  const context =
    MAIN_CATEGORY_CONTEXT[parentCategory.key] ||
    MAIN_CATEGORY_CONTEXT.business
  const cleanBase = cleanTemplateBase(subcategoryLabel)
  const primaryKeyword = `${normalizeForSentence(
    cleanBase
  )} web sitesi şablonu`
  const geoLine = pickVariant(
    [
      'Soru-cevap odaklı içerik bloklarıyla AI cevap motorlarında alıntılanabilirlik için optimize edilmiştir.',
      'Google AI Overviews, ChatGPT ve Perplexity gibi sistemlerde net çıkarım yapılabilen içerik hiyerarşisi sunar.',
      'Varlık odaklı başlık yapısı sayesinde hem klasik SEO hem GEO süreçlerinde güçlü görünürlük hedefler.',
    ],
    templateSlug
  )
  const conversionLine = pickVariant(
    [
      `${upperFirst(
        context.cta
      )} adımlarını sadeleştiren dönüşüm odaklı section kurgusu içerir.`,
      `${upperFirst(
        context.intent
      )} hedefi için güven öğeleri, kanıt blokları ve güçlü CTA yerleşimi kullanır.`,
      `${upperFirst(
        context.audience
      )} için satın alma/iletişim kararını hızlandıran bilgi mimarisi sağlar.`,
    ],
    `${templateSlug}-conversion`
  )
  const metaTitle = trimMeta(
    `${cleanBase} Web Sitesi Şablonu | ${parentCategory.title} | xMoyduz`,
    60
  )
  const metaDescription = trimMeta(
    `${cleanBase} için ${primaryKeyword}: ${upperFirst(
      context.cta
    )} odaklı, mobil uyumlu, hızlı ve GEO destekli profesyonel şablon.`,
    155
  )

  const categoryRefs = [
    { _type: 'reference', _ref: mainRefId },
    subRefId ? { _type: 'reference', _ref: subRefId } : null,
  ].filter(Boolean)

  const tagSet = new Set([
    'xMoyduz',
    'web sitesi şablonu',
    parentCategory.title,
    subcategoryLabel,
    'seo',
    'geo',
  ])

  return {
    _type: 'template',
    title,
    slug: asSlug(templateSlug),
    published: true,
    featured: false,
    designer: 'xMoyduz',
    primaryCategory: { _type: 'reference', _ref: mainRefId },
    categories: categoryRefs,
    description: `${cleanBase} için hazırlanmış; ${context.intent} odaklı, SEO + GEO uyumlu ve hızlı açılan profesyonel web sitesi şablonu.`,
    about: blockContent([
      `${title} şablonu, ${context.audience} için ${upperFirst(
        context.cta
      )} akışlarını güçlendirecek şekilde tasarlanmıştır.`,
      conversionLine,
      geoLine,
    ]),
    perfectFor: blockContent([
      `${cleanBase} alanında hizmet veren markalar, ekipler ve uzmanlar.`,
      `${upperFirst(
        context.intent
      )} hedefiyle hızlı yayına çıkmak isteyen işletmeler.`,
      `Programmatic SEO ölçeğinde kategori-sayfa yapısı kurmak isteyen projeler.`,
    ]),
    features: blockContent([
      'Hero + güven öğeleri + hizmet detayları + sosyal kanıt + iletişim akışı.',
      'Mobil uyumlu bileşenler, hızlı yükleme yaklaşımı ve içerik ölçekleme için düzenli blok yapısı.',
      'Entity tabanlı başlıklar, soru-cevap bölümleri ve net bilgi bloklarıyla GEO extractability desteği.',
      `Önerilen URL: ${mainPath}`,
      `Legacy Wix URL eşleşmesi: ${legacyPath}`,
      `Kategori URL eşleşmesi: ${categoryPath}`,
    ]),
    tags: [...tagSet],
    demoUrl: `https://xmoyduz.com${mainPath}`,
    purchaseUrl: 'https://app.moyduz.com/',
    price: 'Free',
    pages: 6,
    techStack: [
      { _type: 'object', name: 'Next.js', version: 'v16' },
      { _type: 'object', name: 'Sanity', version: 'v5' },
      { _type: 'object', name: 'Tailwind CSS', version: 'v4' },
    ],
    views: 0,
    updatedAt: NOW_ISO,
    seo: {
      metaTitle,
      metaDescription,
    },
  }
}

async function upsertCategory(doc, categoryBySlug, options) {
  const slug = doc.slug.current
  const existing = categoryBySlug.get(slug)
  const existingIsPrivate = !!existing && isPrivateDocumentId(existing._id)
  const updateIfExists = options?.updateIfExists !== false

  if (!isWrite) {
    if (existing && !existingIsPrivate) {
      if (updateIfExists) {
        result.categoriesUpdated += 1
      }
      if (isVerbose) {
        const action = updateIfExists ? 'update' : 'reuse'
        console.log(`[dry-run] category:${action} ${slug} (${existing._id})`)
      }
      return existing._id
    }

    const newId = `category-${slug}`
    result.categoriesCreated += 1
    if (isVerbose) {
      console.log(`[dry-run] category:create ${slug} (${newId})`)
    }
    categoryBySlug.set(slug, { _id: newId, slug })
    return newId
  }

  if (existing && !existingIsPrivate) {
    if (updateIfExists) {
      await client.patch(existing._id).set(doc).commit()
      result.categoriesUpdated += 1
    }
    if (isVerbose) {
      const action = updateIfExists ? 'update' : 'reuse'
      console.log(`[write] category:${action} ${slug} (${existing._id})`)
    }
    return existing._id
  }

  const newId = `category-${slug}`
  await client.create({ _id: newId, ...doc })
  result.categoriesCreated += 1
  categoryBySlug.set(slug, { _id: newId, slug })
  if (isVerbose) {
    console.log(`[write] category:create ${slug} (${newId})`)
  }
  return newId
}

async function upsertTemplate(doc, templateBySlug) {
  const slug = doc.slug.current
  const existing = templateBySlug.get(slug)
  const existingIsPrivate = !!existing && isPrivateDocumentId(existing._id)

  if (existing && !existingIsPrivate && !updateExisting) {
    result.templatesSkipped += 1
    if (isVerbose) {
      console.log(`[skip] template exists (${slug}) -> ${existing._id}`)
    }
    return existing._id
  }

  if (!isWrite) {
    if (existing && !existingIsPrivate) {
      result.templatesUpdated += 1
      if (isVerbose) {
        console.log(`[dry-run] template:update ${slug} (${existing._id})`)
      }
      return existing._id
    }
    const newId = `template-${slug}`
    result.templatesCreated += 1
    if (isVerbose) {
      console.log(`[dry-run] template:create ${slug} (${newId})`)
    }
    return newId
  }

  if (existing && !existingIsPrivate) {
    await client.patch(existing._id).set(doc).commit()
    result.templatesUpdated += 1
    if (isVerbose) {
      console.log(`[write] template:update ${slug} (${existing._id})`)
    }
    return existing._id
  }

  const newId = `template-${slug}`
  await client.create({ _id: newId, ...doc })
  result.templatesCreated += 1
  templateBySlug.set(slug, { _id: newId, slug })
  if (isVerbose) {
    console.log(`[write] template:create ${slug} (${newId})`)
  }
  return newId
}

function blockContent(lines) {
  return lines.map((line, index) => ({
    _type: 'block',
    _key: `block-${index}-${slugify(line).slice(0, 20)}`,
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: `span-${index}`,
        marks: [],
        text: line,
      },
    ],
  }))
}

function asSlug(current) {
  return { _type: 'slug', current }
}

function cleanTemplateBase(label) {
  return toTitleCase(
    label
      .replace(/\s*\/\s*/g, ' ')
      .replace(/\b(web\s+)?sitesi\b/gi, '')
      .replace(/\bsite\b/gi, '')
      .replace(/\s+/g, ' ')
      .trim()
  )
}

function normalizeForSentence(value) {
  if (!value) return value
  return value.toLocaleLowerCase('tr-TR')
}

function upperFirst(value) {
  if (!value) return value
  return (
    value.charAt(0).toLocaleUpperCase('tr-TR') +
    value.slice(1)
  )
}

function trimMeta(text, maxLength = 155) {
  if (!text || text.length <= maxLength) return text
  const sliced = text.slice(0, maxLength - 1)
  const safeCut = sliced.lastIndexOf(' ')
  if (safeCut > Math.floor(maxLength * 0.6)) {
    return `${sliced.slice(0, safeCut).trim()}…`
  }
  return `${sliced.trim()}…`
}

function hashSeed(input) {
  let hash = 0
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function pickVariant(variants, seed) {
  if (!Array.isArray(variants) || variants.length === 0) return ''
  const index = hashSeed(seed) % variants.length
  return variants[index]
}

function toTitleCase(value) {
  if (!value) return value
  return value
    .split(' ')
    .filter(Boolean)
    .map((word) => {
      const cleaned = word.replace(/[^\p{L}\p{N}/+-]/gu, '')
      const upper = cleaned.toLocaleUpperCase('tr-TR')
      if (ABBREVIATIONS.has(upper)) return upper
      return (
        word.charAt(0).toLocaleUpperCase('tr-TR') +
        word.slice(1).toLocaleLowerCase('tr-TR')
      )
    })
    .join(' ')
}

function slugify(value) {
  const map = {
    ç: 'c',
    Ç: 'c',
    ğ: 'g',
    Ğ: 'g',
    ı: 'i',
    İ: 'i',
    ö: 'o',
    Ö: 'o',
    ş: 's',
    Ş: 's',
    ü: 'u',
    Ü: 'u',
  }

  return value
    .split('')
    .map((char) => map[char] || char)
    .join('')
    .toLowerCase()
    .replace(/&/g, ' ve ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
}

function loadLocalEnv() {
  const cwd = process.cwd()
  for (const file of ['.env.local', '.env']) {
    const fullPath = path.join(cwd, file)
    if (!fs.existsSync(fullPath)) continue
    const content = fs.readFileSync(fullPath, 'utf8')
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIndex = trimmed.indexOf('=')
      if (eqIndex < 1) continue
      const key = trimmed.slice(0, eqIndex).trim()
      let val = trimmed.slice(eqIndex + 1).trim()
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1)
      }
      if (process.env[key] === undefined) {
        process.env[key] = val
      }
    }
  }
}

function printSummary() {
  console.log('\n=== xMoyduz Marketplace Seed Summary ===')
  console.log(`Mode                : ${isWrite ? 'WRITE' : 'DRY-RUN'}`)
  console.log(`Project / Dataset   : ${projectId} / ${dataset}`)
  console.log(`Categories Created  : ${result.categoriesCreated}`)
  console.log(`Categories Updated  : ${result.categoriesUpdated}`)
  console.log(`Templates Created   : ${result.templatesCreated}`)
  console.log(`Templates Updated   : ${result.templatesUpdated}`)
  console.log(`Templates Skipped   : ${result.templatesSkipped}`)
  console.log('\nURL Pattern Notes:')
  console.log('- Current app template URL  : /marketplace/templates/:category/:slug')
  console.log('- Wix legacy template URL   : /marketplace/templates/:slug')
  console.log('- Current app category URL  : /marketplace/templates/category/:category')
  console.log('- Wix legacy category URL   : /marketplace/templates/:category')
  console.log('\nRun with write mode:')
  console.log('node scripts/seed-marketplace-templates.mjs --write')
  console.log(
    'node scripts/seed-marketplace-templates.mjs --write --update-existing'
  )
}

function isPrivateDocumentId(id) {
  // In Sanity, IDs containing dots are treated as private/system-scoped IDs.
  return typeof id === 'string' && id.includes('.')
}

main().catch((err) => {
  console.error('\nSeed failed:', err.message)
  process.exit(1)
})
