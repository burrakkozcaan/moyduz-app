import { client, urlFor } from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { TrendingUp } from 'lucide-react'
import { cache } from 'react'

const DISPLAY_GROUP_ORDER = [
  'business',
  'restaurant',
  'health',
  'beauty',
  'real-estate',
  'portfolio',
  'ecommerce',
]

const displayGroupLabels: Record<string, string> = {
  business: 'İşletme Şablonları',
  restaurant: 'Restoran Şablonları',
  health: 'Sağlık Şablonları',
  beauty: 'Güzellik Şablonları',
  'real-estate': 'Emlak Şablonları',
  portfolio: 'Portfolyo Şablonları',
  ecommerce: 'E-Ticaret Şablonları',
}

const BreadcrumbChevron = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="none" className="text-white/40">
    <path d="M 2.5 7 L 5.5 4 L 2.5 1" fill="transparent" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" />
  </svg>
)

interface Category {
  title: string
  slug: string
  description?: string
  thumbnail?: { asset?: { url?: string } }
  thumbnails?: Array<{ asset?: { url?: string } }>
  parentSlug?: string | null
  order?: number
  parent?: { title: string; slug: string; parent?: { title: string; slug: string } } | null
}

interface Template {
  title: string
  slug: string
  price?: string
  designer?: string
  description?: string
  thumbnails?: Array<{ asset?: { url?: string } }>
  tags?: string[]
  categories: Array<{ title: string; slug: string }>
}

interface Subcategory {
  title: string
  slug: string
  parentSlug?: string | null
  order?: number
  thumbnails?: Array<{ asset?: { url?: string } }>
  previewTemplate?: { thumbnails?: Array<{ asset?: { url?: string } }> }
}

const getCategory = cache(async (slug: string) => {
  if (!client) return null
  return client.fetch<Category | null>(
    `*[_type == "category" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      description,
      thumbnail,
      thumbnails,
      parent->{title, "slug": slug.current, parent->{title, "slug": slug.current}}
    }`,
    { slug }
  )
})

async function getSubcategories(slug: string) {
  if (!client) return []
  return client.fetch<Subcategory[]>(
    `*[_type == "category" && parent->slug.current == $slug] | order(title asc){
      title,
      parent->{title, "slug": slug.current},
      "slug": slug.current,
      thumbnails,
      "previewTemplate": *[_type == "template" && published == true && (primaryCategory._ref == ^._id || ^._id in categories[]->_ref)][0]{ thumbnails }
    }`,
    { slug }
  )
}

const getAllCategoriesForGrouping = cache(async (): Promise<Subcategory[]> => {
  if (!client) return []
  return client.fetch<Subcategory[]>(
    `*[_type == "category"]{
      title,
      "slug": slug.current,
      "parentSlug": parent->slug.current,
      order,
      thumbnails,
    } | order(order asc, title asc)`
  )
})

function includesAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword))
}

function resolveDisplayGroup(category: { slug: string; parentSlug?: string | null; title: string }): string {
  const slug = (category.slug || '').toLowerCase()
  const parentSlug = (category.parentSlug || '').toLowerCase()
  const title = (category.title || '').toLowerCase()
  const combined = `${slug} ${parentSlug} ${title}`

  if (DISPLAY_GROUP_ORDER.includes(slug)) return slug
  if (DISPLAY_GROUP_ORDER.includes(parentSlug)) return parentSlug

  if (
    includesAny(combined, [
      'saglik',
      'wellness',
      'klinik',
      'diyet',
      'fizyoterapi',
      'psikolog',
      'dis',
      'health',
      'medical',
      'doctor',
      'hospital',
    ])
  ) {
    return 'health'
  }

  if (
    includesAny(combined, [
      'restoran',
      'restaurant',
      'cafe',
      'pastane',
      'food',
      'bar',
      'pub',
      'menu',
      'menü',
      'catering',
    ])
  ) {
    return 'restaurant'
  }

  if (
    includesAny(combined, [
      'guzellik',
      'beauty',
      'berber',
      'kuafor',
      'spa',
      'masaj',
      'nail',
      'makyaj',
      'cilt',
    ])
  ) {
    return 'beauty'
  }

  if (
    includesAny(combined, [
      'emlak',
      'real-estate',
      'realestate',
      'gayrimenkul',
      'kiralik',
      'satilik',
      'property',
      'estate',
    ])
  ) {
    return 'real-estate'
  }

  if (
    includesAny(combined, [
      'portfolio',
      'portfolyo',
      'grafik',
      'fotograf',
      'video',
      'designer',
      'freelancer',
      'blog',
      'ux',
      'ui',
    ])
  ) {
    return 'portfolio'
  }

  if (
    includesAny(combined, [
      'eticaret',
      'e-ticaret',
      'ecommerce',
      'magaza',
      'shop',
      'store',
      'takı',
      'taki',
      'kozmetik',
      'elektronik',
      'mobilya',
      'moda',
      'urun',
      'ürün',
      'cart',
      'checkout',
    ])
  ) {
    return 'ecommerce'
  }

  return 'business'
}

function sortWithinDisplayGroup(items: Subcategory[], groupKey: string) {
  return [...items].sort((a, b) => {
    const aTier = a.slug === groupKey ? 0 : a.parentSlug === groupKey ? 1 : 2
    const bTier = b.slug === groupKey ? 0 : b.parentSlug === groupKey ? 1 : 2
    if (aTier !== bTier) return aTier - bTier

    const aOrder = Number.isFinite(a.order) ? Number(a.order) : 9999
    const bOrder = Number.isFinite(b.order) ? Number(b.order) : 9999
    if (aOrder !== bOrder) return aOrder - bOrder

    return a.title.localeCompare(b.title, 'tr')
  })
}

async function getCategoriesByDisplayGroup(group: string) {
  const allCategories = await getAllCategoriesForGrouping()
  const matching = allCategories.filter((category) => resolveDisplayGroup(category) === group)
  return sortWithinDisplayGroup(matching, group)
}

async function getTemplatesByCategory(slug: string, selectedTag?: string | null) {
  if (!client) return []
  const params: Record<string, string> = { slug }
  let filter = `*[_type == "template" && published == true && ($slug in categories[]->slug.current || primaryCategory->slug.current == $slug)`
  if (selectedTag) {
    filter += ` && $selectedTag in tags`
    params.selectedTag = selectedTag
  }
  filter += `] | order(featured desc, _updatedAt desc){
    title,
    "slug": slug.current,
    price,
    designer,
    description,
    thumbnails,
    tags,
    primaryCategory->{title, "slug": slug.current},
    categories[]->{title, "slug": slug.current}
  }`
  return client.fetch<Template[]>(filter, params)
}

async function getTemplatesByGroup(group: string, selectedTag?: string | null) {
  if (!client) return []
  const categories = await getCategoriesByDisplayGroup(group)
  const slugs = categories.map((c) => c.slug)
  if (slugs.length === 0) return []
  const primary = slugs.map((s, i) => `primaryCategory->slug.current == $slug${i}`).join(' || ')
  const cats = slugs.map((s, i) => `$slug${i} in categories[]->slug.current`).join(' || ')
  const params: Record<string, string> = {}
  slugs.forEach((s, i) => { params[`slug${i}`] = s })
  if (selectedTag) { params.selectedTag = selectedTag }
  let filter = `*[_type == "template" && published == true && (${primary} || ${cats})`
  if (selectedTag) filter += ` && $selectedTag in tags`
  filter += `] | order(featured desc, _updatedAt desc){
    title,
    "slug": slug.current,
    price,
    designer,
    description,
    thumbnails,
    tags,
    primaryCategory->{title, "slug": slug.current},
    categories[]->{title, "slug": slug.current}
  }`
  return client.fetch<Template[]>(filter, params)
}

function buildBreadcrumbs(category: Category) {
  const out: Array<{ title: string; slug: string }> = []
  if (category.parent?.parent) out.push({ title: category.parent.parent.title, slug: category.parent.parent.slug })
  if (category.parent) out.push({ title: category.parent.title, slug: category.parent.slug })
  out.push({ title: category.title, slug: category.slug })
  return out
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category: categorySlug } = await params
  const normalizedSlug = categorySlug.toLowerCase()
  if (DISPLAY_GROUP_ORDER.includes(normalizedSlug)) {
    return {
      title: `${displayGroupLabels[normalizedSlug]} | Moyduz`,
      description: `${displayGroupLabels[normalizedSlug]} için profesyonel template koleksiyonunu keşfedin.`,
    }
  }
  const category = await getCategory(categorySlug)
  if (!category) return { title: 'Category Not Found' }
  const title =
    (category as { seo?: { metaTitle?: string } }).seo?.metaTitle ||
    `${category.title} Şablonları | Moyduz`
  const desc =
    (category as { seo?: { metaDescription?: string } }).seo?.metaDescription ||
    category.description ||
    `${category.title} kategorisindeki profesyonel şablonları inceleyin.`
  return { title, description: desc }
}

export default async function CategoryTemplatesPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category: categorySlug } = await params
  if (!categorySlug) notFound()

  const group = categorySlug.toLowerCase()
  const isGroup = DISPLAY_GROUP_ORDER.includes(group)

  if (isGroup) {
    const groupTitle = displayGroupLabels[group] || group
    let categories: Subcategory[] = []
    let templates: Template[] = []
    try {
      ;[categories, templates] = await Promise.all([
        getCategoriesByDisplayGroup(group),
        getTemplatesByGroup(group),
      ])
    } catch {
      // fallback
    }

    return (
      <main className="min-h-screen bg-ln-gray-250 text-ln-gray-900 dark:text-white py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-ln-gray-700 dark:text-white/60">
            <Link href="/marketplace/templates/category" className="transition hover:text-ln-gray-900 dark:hover:text-white">
              Kategoriler
            </Link>
            <span className="flex items-center gap-2">
              <BreadcrumbChevron />
              <span className="text-ln-gray-900 dark:text-white">{groupTitle}</span>
            </span>
          </div>

          <div className="mb-12">
            <h1 className="text-4xl font-550 tracking-tight md:text-5xl">
              {groupTitle}
            </h1>
            <p className="mt-5 max-w-3xl text-base text-ln-gray-700 dark:text-white/65 md:text-lg">
              Bu grup için öne çıkan, yüksek dönüşüm odaklı şablonları keşfedin.
              Modern ürün ekipleri için hızlıca yayına alınabilecek yapılar.
            </p>
          </div>

          {categories.length > 0 && (
            <div className="mb-12">
              <div className="w-full overflow-x-auto overflow-y-hidden -mx-4 px-4">
                <div className="flex min-w-max gap-[10px]">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/marketplace/templates/category/${cat.slug}`}
                      className="flex h-[50px] shrink-0 items-center gap-[15px] rounded-sm  bg-ln-gray-100 dark:bg-[#1C1C1C] pl-[2px] pr-[14px] py-[2px] transition hover:bg-ln-gray-950 dark:hover:bg-[#262626]"
                    >
                      {cat.thumbnails?.[0] && (
                        <div className="relative h-full aspect-[5/3] shrink-0 overflow-hidden rounded-sm bg-ln-gray-250 dark:bg-[#1C1C1C]">
                          <Image
                            src={urlFor(cat.thumbnails[0]).width(200).height(200).url()}
                            alt={cat.title}
                            fill
                            className="rounded-sm object-cover outline outline-1 outline-white/20"
                          />
                        </div>
                      )}
                      <span className="whitespace-nowrap text-sm font-500 text-ln-gray-900 dark:text-white">
                        {cat.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {templates.map((t) => {
              const fallbackCategory = categories[0]?.slug
              const pc =
                t.categories?.find((c) => categories.some((cat) => cat.slug === c.slug)) ||
                t.categories?.[0]
              return (
                <Link
                  key={t.slug}
                  href={`/marketplace/templates/${pc?.slug || fallbackCategory || group}/${t.slug}`}
                  className="group relative overflow-hidden rounded-[4px] transition-all duration-300"
                >
                  {t.thumbnails?.[0] && (
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px] bg-[#0a0a0a]">
                      <Image
                        src={urlFor(t.thumbnails[0]).width(800).height(600).url()}
                        alt={t.title}
                        fill
                        className="rounded-[3px] object-cover transition-opacity duration-300 group-hover:opacity-0"
                      />
                      {t.thumbnails?.[1] && (
                        <Image
                          src={urlFor(t.thumbnails[1]).width(800).height(600).url()}
                          alt={`${t.title} - Hover`}
                          fill
                          className="rounded-[3px] object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        />
                      )}
                      <div className="absolute right-3 top-3 z-10 rounded-full bg-black/60 p-2 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                        <TrendingUp className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}

                  <div className="p-4">
                    <h3 className="line-clamp-1 text-base font-550 text-white group-hover:text-white/90">
                      {t.title}
                    </h3>
                    {t.designer && <p className="mt-1 text-xs text-white/50">by {t.designer}</p>}
                    {t.tags && t.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {t.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-white/40">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>

          {templates.length === 0 && (
            <div className="py-16 text-center text-lg text-white/60">
              Bu grupta henüz şablon bulunmuyor.
            </div>
          )}
        </div>
      </main>
    )
  }

  const [category, templates, subcategories] = await Promise.all([
    getCategory(categorySlug),
    getTemplatesByCategory(categorySlug),
    getSubcategories(categorySlug),
  ])

  if (!category) notFound()
  const breadcrumbs = buildBreadcrumbs(category)

  return (
    <main className="min-h-screen bg-ln-gray-250 text-ln-gray-900 dark:text-white py-24">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-ln-gray-700 dark:text-white/60">
          <Link href="/marketplace/templates" className="transition hover:text-ln-gray-900 dark:hover:text-white">
            Şablonlar
          </Link>
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.slug} className="flex items-center gap-2">
              <BreadcrumbChevron />
              {i === breadcrumbs.length - 1 ? (
                <span className="text-ln-gray-900 dark:text-white">{crumb.title}</span>
              ) : (
                <Link href={`/marketplace/templates/category/${crumb.slug}`} className="transition hover:text-ln-gray-900 dark:hover:text-white">
                  {crumb.title}
                </Link>
              )}
            </span>
          ))}
        </div>
        <div className="mb-12">
          {category.thumbnail && (
            <div className="relative mb-6 h-64 w-full overflow-hidden rounded-2xl">
              <Image
                src={urlFor(category.thumbnail).width(1200).height(400).url()}
                alt={category.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <h1 className="text-4xl font-550 tracking-tight md:text-5xl">
            {category.title}
          </h1>
          {category.description && (
            <p className="mt-5 max-w-3xl text-base text-ln-gray-700 dark:text-white/65 md:text-lg">
              {category.description}
            </p>
          )}
        </div>

        {subcategories.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-550 text-ln-gray-900 dark:text-white">Alt Kategoriler</h2>
            <div className="w-full overflow-x-auto overflow-y-hidden -mx-4 px-4">
              <div className="flex min-w-max gap-[10px]">
                {subcategories.map((sub) => (
                  <Link
                    key={sub.slug}
                    href={`/marketplace/templates/category/${sub.slug}`}
                    className="flex h-[50px] shrink-0 items-center gap-[15px] rounded-sm bg-ln-gray-100 dark:bg-[#1C1C1C] pl-[2px] pr-[14px] py-[2px] transition hover:bg-ln-gray-950 dark:hover:bg-[#262626]"
                  >
                    {(sub.thumbnails?.[0] || sub.previewTemplate?.thumbnails?.[0]) && (
                        <div className="relative h-full aspect-[5/3] shrink-0 overflow-hidden rounded-sm bg-ln-gray-925 dark:bg-[#1C1C1C]">
                          <Image
                            src={urlFor(sub.thumbnails?.[0] || sub.previewTemplate!.thumbnails![0]).width(200).height(200).url()}
                            alt={sub.title}
                            fill
                            className="rounded-sm object-cover outline outline-1 outline-ln-gray-700 dark:outline-white/20"
                          />
                        </div>
                      )}
                    <span className="whitespace-nowrap text-sm font-500 text-ln-gray-900 dark:text-white">{sub.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {templates.map((t) => (
            <Link
              key={t.slug}
              href={`/marketplace/templates/${categorySlug}/${t.slug}`}
              className="group relative overflow-hidden rounded-[4px] transition-all duration-300"
            >
              {t.thumbnails?.[0] && (
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px] bg-ln-gray-925 dark:bg-[#1C1C1C]">
                  <Image
                    src={urlFor(t.thumbnails[0]).width(800).height(600).url()}
                    alt={t.title}
                    fill
                    className="rounded-[3px] object-cover transition-opacity duration-300 group-hover:opacity-0"
                  />
                  {t.thumbnails?.[1] && (
                    <Image
                      src={urlFor(t.thumbnails[1]).width(800).height(600).url()}
                      alt={`${t.title} - Hover`}
                      fill
                      className="rounded-[3px] object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  )}
                  <div className="absolute right-3 top-3 z-10 rounded-full bg-ln-gray-925 dark:bg-[#1C1C1C] p-2 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}

              <div className="p-4">
                <h3 className="line-clamp-1 text-base font-550 text-ln-gray-900 dark:text-white group-hover:text-white/90">{t.title}</h3>
                {t.designer && <p className="mt-1 text-xs text-ln-gray-700 dark:text-white/50">by {t.designer}</p>}
                {t.tags && t.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {t.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="rounded bg-ln-gray-100 dark:bg-[#1C1C1C] px-2 py-0.5 text-[10px] text-ln-gray-700 dark:text-white/40">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {templates.length === 0 && (
          <div className="py-16 text-center text-lg text-ln-gray-700 dark:text-white/60">
            Bu kategoride henüz şablon bulunmuyor.
          </div>
        )}
      </div>
    </main>
  )
}
