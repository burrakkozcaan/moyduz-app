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
  order?: number
  thumbnails?: Array<{ asset?: { url?: string } }>
  templateCount: number
  previewTemplates: Array<{ thumbnails?: Array<{ asset?: { url?: string } }> }>
}

const groupLabels: Record<string, string> = {
  business: 'İş Şablonları',
  community: 'Topluluk Şablonları',
  creative: 'Yaratıcı Şablonlar',
  style: 'Stil Şablonları',
}

async function getCategories(): Promise<Category[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "category"]{
      title,
      "slug": slug.current,
      description,
      group,
      order,
      thumbnails,
      "templateCount": count(*[_type == "template" && published == true && (primaryCategory._ref == ^._id || ^._id in categories[]->_ref)]),
      "previewTemplates": *[_type == "template" && published == true && (primaryCategory._ref == ^._id || ^._id in categories[]->_ref)] | order(_createdAt desc)[0...3]{ thumbnails }
    } | order(order asc, title asc)`
  )
}

function inferGroup(title: string, existingGroup?: string | null): string {
  if (
    existingGroup &&
    ['business', 'community', 'creative', 'style'].includes(
      existingGroup.toLowerCase()
    )
  ) {
    return existingGroup.toLowerCase()
  }
  const lower = title.toLowerCase()
  if (
    ['ai', 'saas', 'technology', 'business'].includes(lower) ||
    lower.includes('business')
  )
    return 'business'
  if (['community'].includes(lower) || lower.includes('community'))
    return 'community'
  if (['style'].includes(lower) || lower.includes('style')) return 'style'
  if (['creative'].includes(lower) || lower.includes('creative')) return 'creative'
  return 'other'
}

export default async function CategoryPage() {
  let categories: Category[] = []
  try {
    categories = await getCategories()
  } catch {
    // Fallback
  }

  const grouped = categories.reduce<Record<string, Category[]>>((acc, c) => {
    const group = c.group?.toLowerCase().trim() || inferGroup(c.title, c.group)
    const normalizedGroup = ['business', 'community', 'creative', 'style'].includes(group)
      ? group
      : 'other'

    if (!acc[normalizedGroup]) acc[normalizedGroup] = []
    acc[normalizedGroup].push(c)
    return acc
  }, {})

  const groupOrder = ['business', 'community', 'creative', 'style']

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
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <div className="container">
        <div className="mx-auto max-w-[956px] pt-11 xl:mt-[72px]">
          <h1 className="text-[34px]/[40px] font-550 -tracking-[0.02em] text-ln-gray-800 xl:text-ln-title-h4 xl:text-ln-gray-900">
            Kategoriler
          </h1>
          <p className="mt-5 text-pretty text-ln-paragraph-md text-ln-gray-600 xl:text-ln-paragraph-lg">
            Ürün kategorilerine göre gruplanmış şablonları keşfedin. Web sitesi,
            e-ticaret ve SaaS projeleri için ölçeklenebilir, üretime hazır UI
            sistemleriyle daha hızlı yayına çıkın.
          </p>
        </div>

        {groupOrder.map((groupKey) => {
          const list = grouped[groupKey] || []
          if (list.length === 0) return null
          return (
            <div key={groupKey} className="mt-12">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-550 text-ln-gray-900">
                    {groupLabels[groupKey] || groupKey}
                  </h2>
                  <p className="text-ln-paragraph-sm text-ln-gray-600">
                    {list.length} kategori
                  </p>
                </div>
                <Link
                  href={`/marketplace/templates/category/${groupKey}`}
                  className="text-ln-label-sm text-ln-gray-600 transition hover:text-ln-gray-800"
                >
                  Tümünü Gör →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 xl:grid-cols-5">
                {list.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/marketplace/templates/category/${cat.slug}`}
                    className="group flex flex-col overflow-hidden rounded-lg bg-ln-gray-50 transition hover:bg-ln-gray-100"
                  >
                    <div className="grid grid-cols-2 gap-[5px] p-[5px] pb-0">
                      {cat.thumbnails?.[0] ? (
                        <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
                          <Image
                            src={urlFor(cat.thumbnails[0]).width(400).height(300).url()}
                            alt={cat.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : cat.previewTemplates?.[0]?.thumbnails?.[0] ? (
                        <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
                          <Image
                            src={urlFor(cat.previewTemplates[0].thumbnails[0]).width(400).height(300).url()}
                            alt={cat.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[4/3] rounded-[3px] bg-ln-gray-200" />
                      )}
                      {cat.thumbnails?.[1] ? (
                        <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
                          <Image
                            src={urlFor(cat.thumbnails[1]).width(400).height(300).url()}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : cat.previewTemplates?.[1]?.thumbnails?.[0] ? (
                        <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
                          <Image
                            src={urlFor(cat.previewTemplates[1].thumbnails[0]).width(400).height(300).url()}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[4/3] rounded-[3px] bg-ln-gray-200" />
                      )}
                    </div>
                    <div className="p-[15px]">
                      <h4 className="truncate text-ln-label-sm font-550 text-ln-gray-900">
                        {cat.title}
                      </h4>
                      <p className="text-ln-paragraph-xs text-ln-gray-600">
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

        {grouped.other && grouped.other.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-xl font-550 text-ln-gray-900">
              Diğer Kategoriler
            </h2>
            <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 xl:grid-cols-5">
              {grouped.other.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/marketplace/templates/category/${cat.slug}`}
                  className="group flex flex-col overflow-hidden rounded-lg bg-ln-gray-50 transition hover:bg-ln-gray-100"
                >
                  <div className="grid grid-cols-2 gap-[5px] p-[5px] pb-0">
                    {cat.thumbnails?.[0] ? (
                      <>
                        <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
                          <Image
                            src={urlFor(cat.thumbnails[0]).width(400).height(300).url()}
                            alt={cat.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {cat.thumbnails[1] ? (
                          <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
                            <Image
                              src={urlFor(cat.thumbnails[1]).width(400).height(300).url()}
                              alt=""
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="aspect-[4/3] rounded-[3px] bg-ln-gray-200" />
                        )}
                      </>
                    ) : (
                      <>
                        <div className="aspect-[4/3] rounded-[3px] bg-ln-gray-200" />
                        <div className="aspect-[4/3] rounded-[3px] bg-ln-gray-200" />
                      </>
                    )}
                  </div>
                  <div className="p-[15px]">
                    <h4 className="truncate text-ln-label-sm font-550 text-ln-gray-900">
                      {cat.title}
                    </h4>
                    <p className="text-ln-paragraph-xs text-ln-gray-600">
                      {cat.templateCount || 0} şablon
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
