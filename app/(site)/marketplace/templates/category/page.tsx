import { client, urlFor } from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Template Categories | Moyduz',
  description:
    'Browse our collection of templates organized by category',
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
  business: 'Business Templates',
  community: 'Community Templates',
  creative: 'Creative Templates',
  style: 'Style Templates',
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
  if (existingGroup && ['business', 'community', 'creative', 'style'].includes(existingGroup.toLowerCase())) {
    return existingGroup.toLowerCase()
  }
  const lower = title.toLowerCase()
  if (['ai', 'saas', 'technology', 'business'].includes(lower) || lower.includes('business')) return 'business'
  if (['community'].includes(lower) || lower.includes('community')) return 'community'
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

  const withGroup = categories.filter((c) => {
    const g = c.group?.trim()
    return g && g !== '' && ['business', 'community', 'creative', 'style'].includes(g.toLowerCase())
  })

  const grouped = withGroup.reduce<Record<string, Category[]>>((acc, c) => {
    const group = c.group?.toLowerCase().trim() || inferGroup(c.title, c.group)
    if (!['business', 'community', 'creative', 'style'].includes(group)) return acc
    if (!acc[group]) acc[group] = []
    acc[group].push(c)
    return acc
  }, {})

  const groupOrder = ['business', 'community', 'creative', 'style']

  return (
    <main className="flex-1">
      <div className="container">
        <div className="mx-auto max-w-[956px] pt-11 xl:mt-[72px]">
          <h1 className="text-[34px]/[40px] font-550 -tracking-[0.02em] text-ln-gray-800 xl:text-ln-title-h4 xl:text-ln-gray-900">
            Categories
          </h1>
          <p className="mt-5 text-pretty text-ln-paragraph-md text-ln-gray-600 xl:text-ln-paragraph-lg">
            Explore templates grouped by product category. Professionally designed UI
            systems for websites, e-commerce stores, and SaaS platforms — built to
            help teams launch faster with scalable, production-ready components.
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
                    {list.length} {list.length === 1 ? 'category' : 'categories'}
                  </p>
                </div>
                <Link
                  href={`/marketplace/templates/category/${groupKey}`}
                  className="text-ln-label-sm text-ln-gray-600 transition hover:text-ln-gray-800"
                >
                  See All →
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
                          if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K`
                          return n
                        })()}{' '}
                        {cat.templateCount === 1 ? 'template' : 'templates'}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}

        {grouped['other'] && grouped['other'].length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-xl font-550 text-ln-gray-900">
              Other Categories
            </h2>
            <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 xl:grid-cols-5">
              {grouped['other'].map((cat) => (
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
                      {cat.templateCount || 0}{' '}
                      {cat.templateCount === 1 ? 'template' : 'templates'}
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
