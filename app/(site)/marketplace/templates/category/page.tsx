import { client, urlFor } from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Şablon Kategorileri | Moyduz',
  description:
    'Kategorilere göre düzenlenmiş web sitesi, e-ticaret ve SaaS şablonlarını keşfedin.',
  keywords: [
    'şablon kategorileri',
    'ui şablonları',
    'e-ticaret şablonları',
    'saas şablonları',
    'hazır web şablonları',
  ],
  alternates: { canonical: 'https://moyduz.com/marketplace/templates/category' },
  openGraph: {
    title: 'Şablon Kategorileri | Moyduz',
    description:
      'Kategorilere göre düzenlenmiş web sitesi, e-ticaret ve SaaS şablonlarını keşfedin.',
    url: 'https://moyduz.com/marketplace/templates/category',
    locale: 'tr_TR',
    siteName: 'Moyduz',
  },
}

export const revalidate = 60

interface Category {
  title: string
  slug: string
  description?: string
  group?: string
  parentSlug?: string | null
  order?: number
  thumbnails?: Array<{ asset?: { url?: string } }>
  templateCount: number
  previewTemplates: Array<{ thumbnails?: Array<{ asset?: { url?: string } }> }>
}

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

async function getCategories(): Promise<Category[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "category"]{
      title,
      "slug": slug.current,
      description,
      group,
      "parentSlug": parent->slug.current,
      order,
      thumbnails,
      "templateCount": count(*[_type == "template" && published == true && (primaryCategory._ref == ^._id || ^._id in categories[]->_ref)]),
      "previewTemplates": *[_type == "template" && published == true && (primaryCategory._ref == ^._id || ^._id in categories[]->_ref)] | order(_createdAt desc)[0...3]{ thumbnails }
    } | order(order asc, title asc)`
  )
}

function includesAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword))
}

function resolveDisplayGroup(category: Category): string {
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

function sortWithinDisplayGroup(items: Category[], groupKey: string) {
  return [...items].sort((a, b) => {
    const aTier =
      a.slug === groupKey ? 0 : a.parentSlug === groupKey ? 1 : 2
    const bTier =
      b.slug === groupKey ? 0 : b.parentSlug === groupKey ? 1 : 2
    if (aTier !== bTier) return aTier - bTier

    const aOrder = Number.isFinite(a.order) ? Number(a.order) : 9999
    const bOrder = Number.isFinite(b.order) ? Number(b.order) : 9999
    if (aOrder !== bOrder) return aOrder - bOrder

    return a.title.localeCompare(b.title, 'tr')
  })
}

export default async function CategoryPage() {
  let categories: Category[] = []
  try {
    categories = await getCategories()
  } catch {
    // Fallback
  }

  const grouped = categories.reduce<Record<string, Category[]>>((acc, c) => {
    const key = resolveDisplayGroup(c)
    if (!acc[key]) acc[key] = []
    acc[key].push(c)
    return acc
  }, {})

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Moyduz Şablon Kategorileri',
    itemListElement: categories.map((category, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: category.title,
      url: `https://moyduz.com/marketplace/templates/category/${category.slug}`,
    })),
  }

  return (
    <main className="min-h-screen bg-[#000000] py-24 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12">
          <h1 className="text-5xl font-550 tracking-tight text-white md:text-6xl">
            Kategoriler
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-white/70">
            Ürün kategorilerine göre gruplanmış şablonları keşfedin. Web sitesi,
            e-ticaret ve SaaS projeleri için ölçeklenebilir, üretime hazır UI
            sistemleriyle daha hızlı yayına çıkın.
          </p>
        </div>

        {DISPLAY_GROUP_ORDER.map((groupKey) => {
          const list = sortWithinDisplayGroup(grouped[groupKey] || [], groupKey)
          if (list.length === 0) return null
          return (
            <div key={groupKey} className="mb-16">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-550 text-white">
                    {displayGroupLabels[groupKey] || groupKey}
                  </h2>
                  <p className="text-sm text-white/70">
                    {list.length} kategori
                  </p>
                </div>
                <Link
                  href={`/marketplace/templates/category/${groupKey}`}
                  className="text-sm font-500 text-white/70 transition hover:text-white"
                >
                  Tümünü Gör →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 xl:grid-cols-5">
                {list.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/marketplace/templates/category/${cat.slug}`}
                    className="group flex flex-col overflow-hidden rounded-lg bg-[#1C1C1C] transition-colors hover:bg-[#262626]"
                  >
                    <div className="grid grid-cols-2 gap-[5px] p-[5px] pb-0">
                      {cat.thumbnails?.[0] ? (
                        <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
                          <Image
                            src={urlFor(cat.thumbnails[0]).width(400).height(300).url()}
                            alt={cat.title}
                            fill
                            className="rounded-[3px] object-cover outline outline-1 outline-white/10 outline-offset-[-1px]"
                          />
                        </div>
                      ) : cat.previewTemplates?.[0]?.thumbnails?.[0] ? (
                        <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
                          <Image
                            src={urlFor(cat.previewTemplates[0].thumbnails[0]).width(400).height(300).url()}
                            alt={cat.title}
                            fill
                            className="rounded-[3px] object-cover outline outline-1 outline-white/10 outline-offset-[-1px]"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[4/3] rounded-[3px] bg-white/10" />
                      )}
                      {cat.thumbnails?.[1] ? (
                        <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
                          <Image
                            src={urlFor(cat.thumbnails[1]).width(400).height(300).url()}
                            alt=""
                            fill
                            className="rounded-[3px] object-cover outline outline-1 outline-white/10 outline-offset-[-1px]"
                          />
                        </div>
                      ) : cat.previewTemplates?.[1]?.thumbnails?.[0] ? (
                        <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
                          <Image
                            src={urlFor(cat.previewTemplates[1].thumbnails[0]).width(400).height(300).url()}
                            alt=""
                            fill
                            className="rounded-[3px] object-cover outline outline-1 outline-white/10 outline-offset-[-1px]"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[4/3] rounded-[3px] bg-white/10" />
                      )}
                    </div>
                    <div className="p-[15px]">
                      <h4 className="truncate text-sm font-550 text-white">
                        {cat.title}
                      </h4>
                      <p className="text-xs text-white/70">
                        {(() => {
                          const n = Number(cat.templateCount) || 0
                          if (n >= 1000)
                            return `${(n / 1000)
                              .toFixed(1)
                              .replace(/\.0$/, '')}K`
                          return n
                        })()}{' '}
                        şablon
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
