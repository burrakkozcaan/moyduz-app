import {
  client,
  urlFor,
  urlForOptimized,
  urlForBlurPlaceholder,
} from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { TemplatesFilterClient } from './TemplatesFilterClient'
import { TrendingUp } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Şablonlar | Moyduz Marketplace',
  description:
    'Web sitesi, e-ticaret ve SaaS projeleri için profesyonel, üretime hazır UI şablonlarını keşfedin.',
  keywords: [
    'ui şablonları',
    'hazır web şablonları',
    'e-ticaret şablonları',
    'saas şablonları',
    'marketplace templates',
  ],
  alternates: { canonical: 'https://moyduz.com/marketplace/templates' },
  openGraph: {
    title: 'Şablonlar | Moyduz Marketplace',
    description:
      'Web sitesi, e-ticaret ve SaaS projeleri için profesyonel, üretime hazır UI şablonları.',
    url: 'https://moyduz.com/marketplace/templates',
    locale: 'tr_TR',
    siteName: 'Moyduz',
  },
}

export const revalidate = 60

interface Category {
  title: string
  slug: string
  templateCount: number
  views?: number
  thumbnails?: Array<{ asset?: { url?: string } }>
  previewTemplates: Array<{
    thumbnails?: Array<{ asset?: { url?: string } }>
  }>
}

interface Template {
  title: string
  slug: string
  designer?: string
  description?: string
  thumbnails?: Array<{ asset?: { url?: string } }>
  tags?: string[]
  primaryCategory?: { title: string; slug: string }
  categories?: Array<{ title: string; slug: string }>
}

async function getCategories(): Promise<Category[]> {
  if (!client) return []
  const categories = await client.fetch(
    `*[_type == "category" && defined(group) && group != "" && group in ["business","community","creative","style"]]{
      title,
      "slug": slug.current,
      views,
      thumbnails,
      "templateCount": count(*[_type == "template" && published == true && (primaryCategory._ref == ^._id || ^._id in categories[]->_ref)]),
      "previewTemplates": *[_type == "template" && published == true && (primaryCategory._ref == ^._id || ^._id in categories[]->_ref)] | order(_createdAt desc)[0...3]{ thumbnails }
    } | order(order asc, title asc)`
  )
  const shuffled = [...categories].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 5)
}

async function getTemplates(
  categorySlug?: string | null,
  priceFilter?: string | null
): Promise<Template[]> {
  if (!client) return []
  const params: Record<string, string> = {}
  let filter = `*[_type == "template" && published == true`
  if (categorySlug) {
    filter += ` && ($categorySlug in categories[]->slug.current || primaryCategory->slug.current == $categorySlug)`
    params.categorySlug = categorySlug
  }
  if (priceFilter) {
    filter += ` && price == $priceFilter`
    params.priceFilter = priceFilter
  }
  filter += `] | order(_createdAt desc){
    title,
    "slug": slug.current,
    designer,
    description,
    thumbnails,
    tags,
    primaryCategory->{title, "slug": slug.current},
    categories[]->{title, "slug": slug.current}
  }`
  return client.fetch(filter, params)
}

export default async function MarketplaceTemplatesPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; price?: string }>
}) {
  const resolved = (await searchParams) as
    | { category?: string; price?: string }
    | undefined
  const selectedCategory =
    typeof resolved?.category === 'string' && resolved.category.length > 0
      ? resolved.category
      : null
  const selectedPrice =
    typeof resolved?.price === 'string' && resolved.price.length > 0
      ? resolved.price
      : null

  let categories: Category[] = []
  let templates: Template[] = []

  try {
    ;[categories, templates] = await Promise.all([
      getCategories(),
      getTemplates(selectedCategory, selectedPrice),
    ])
  } catch {
    // Fallback empty
  }

  const getCategoryImg = (cat: Category, idx: number) => {
    if (cat.thumbnails?.[idx]) return cat.thumbnails[idx]
    if (idx < (cat.previewTemplates?.length ?? 0)) {
      return cat.previewTemplates![idx]?.thumbnails?.[0]
    }
    return null
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Moyduz Şablonları',
    itemListElement: templates.map((template, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: template.title,
      url: `https://moyduz.com/marketplace/templates/${template.primaryCategory?.slug || template.categories?.[0]?.slug || 'ai'}/${template.slug}`,
    })),
  }

  return (
    <main className="min-h-screen flex-1 bg-[#000000] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-[34px] font-550 leading-[40px] -tracking-[0.02em] text-white md:text-5xl lg:text-6xl">
            Şablonlar
          </h1>
          <p className="max-w-2xl text-ln-paragraph-md text-white/70 lg:text-ln-paragraph-lg">
            Web sitesi, e-ticaret ve SaaS projeleri için profesyonel tasarlanmış
            şablonları keşfedin. Ölçeklenebilir ve üretime hazır UI sistemleriyle
            daha hızlı yayına çıkın.
          </p>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-16">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-550 text-white">Kategoriler</h2>
              <Link
                href="/marketplace/templates/category"
                className="text-ln-label-sm text-white/70 transition hover:text-white"
              >
                Tümünü Gör →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 xl:grid-cols-5">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/marketplace/templates/category/${cat.slug}`}
                  className="group flex flex-col overflow-hidden rounded-lg bg-[#1C1C1C] transition hover:bg-[#262626]"
                >
                  <div className="grid grid-cols-2 gap-[5px] p-[5px] pb-0">
                    {(() => {
                      const img0 = getCategoryImg(cat, 0)
                      const img1 = getCategoryImg(cat, 1)
                      const img2 = getCategoryImg(cat, 2)
                      return (
                        <>
                          {img0 && (
                            <>
                              <div className="relative hidden aspect-[4/3] overflow-hidden rounded-[3px] md:col-span-2 md:block">
                                <Image
                                  src={urlForOptimized(img0, {
                                    width: 800,
                                    height: 600,
                                    quality: 85,
                                    format: 'auto',
                                  }).url()}
                                  alt={`${cat.title} thumbnail 1`}
                                  fill
                                  loading="lazy"
                                  placeholder="blur"
                                  blurDataURL={urlForBlurPlaceholder(img0)}
                                  sizes="(max-width: 768px) 50vw, 66vw"
                                  className="rounded-[3px] object-cover outline outline-1 outline-white/10 outline-offset-[-1px]"
                                />
                              </div>
                              <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] md:hidden">
                                <Image
                                  src={urlForOptimized(img0, {
                                    width: 400,
                                    height: 300,
                                    quality: 85,
                                    format: 'auto',
                                  }).url()}
                                  alt={`${cat.title} thumbnail 1`}
                                  fill
                                  loading="lazy"
                                  placeholder="blur"
                                  blurDataURL={urlForBlurPlaceholder(img0)}
                                  sizes="100vw"
                                  className="rounded-[3px] object-cover outline outline-1 outline-white/10 outline-offset-[-1px]"
                                />
                              </div>
                            </>
                          )}
                          {img1 ? (
                            <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
                              <Image
                                src={urlForOptimized(img1, {
                                  width: 400,
                                  height: 300,
                                  quality: 85,
                                  format: 'auto',
                                }).url()}
                                alt={`${cat.title} thumbnail 2`}
                                fill
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL={urlForBlurPlaceholder(img1)}
                                sizes="(max-width: 768px) 50vw, 33vw"
                                className="rounded-[3px] object-cover outline outline-1 outline-white/10 outline-offset-[-1px]"
                              />
                            </div>
                          ) : (
                            <div className="aspect-[4/3] rounded-[3px] bg-white/10" />
                          )}
                          {img2 ? (
                            <div className="relative hidden aspect-[4/3] overflow-hidden rounded-[3px] md:col-span-1 md:block">
                              <Image
                                src={urlForOptimized(img2, {
                                  width: 400,
                                  height: 300,
                                  quality: 85,
                                  format: 'auto',
                                }).url()}
                                alt={`${cat.title} thumbnail 3`}
                                fill
                                className="rounded-[3px] object-cover outline outline-1 outline-white/10 outline-offset-[-1px]"
                              />
                            </div>
                          ) : (
                            <div className="hidden aspect-[4/3] rounded-[3px] bg-white/10 md:block" />
                          )}
                        </>
                      )
                    })()}
                  </div>
                  <div className="p-[15px]">
                    <h4 className="truncate text-ln-label-sm font-550 text-white">
                      {cat.title}
                    </h4>
                    <p className="mt-0 text-ln-paragraph-xs text-white/70">
                      {(() => {
                        const views = Number(cat.views) || 0
                        const count = Number(cat.templateCount) || 0
                        const value = views > 0 ? views : count
                        const label = value >= 1000 ? 'görüntüleme' : 'şablon'
                        if (value >= 1000) {
                          const k = (value / 1000).toFixed(1)
                          const fmt = k.endsWith('.0')
                            ? `${parseInt(k)}K`
                            : `${k}K`
                          return `${fmt} ${label}`
                        }
                        return `${value} ${label}`
                      })()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-between gap-3">
            <div className="flex flex-wrap gap-3">
                <Link
                  href="/marketplace/templates"
                  className={`rounded-full border px-5 py-1.5 text-ln-label-sm font-500 transition ${
                  selectedCategory === null && selectedPrice === null
                    ? 'border-white/10 bg-white text-black'
                    : 'border-white/10 bg-[#1C1C1C] text-white hover:bg-[#262626]'
                }`}
              >
                Tümü
              </Link>
            </div>
            <TemplatesFilterClient
              categories={categories.map((c) => ({ title: c.title, slug: c.slug }))}
              selectedCategory={selectedCategory}
              selectedPrice={selectedPrice}
            />
          </div>
        </div>

        {/* Templates Grid */}
        {templates.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {templates.map((t) => (
              <Link
                key={t.slug}
                href={`/marketplace/templates/${t.primaryCategory?.slug || t.categories?.[0]?.slug || 'ai'}/${t.slug}`}
                className="group relative overflow-hidden rounded-[4px] transition-all duration-300"
              >
                {t.thumbnails?.[0] && (
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px] bg-[#1C1C1C]">
                    <Image
                      src={urlFor(t.thumbnails[0]).width(800).height(600).url()}
                      alt={t.title}
                      fill
                      className="rounded-[4px] object-cover transition-opacity duration-300 group-hover:opacity-0"
                    />
                    {t.thumbnails[1] && (
                      <Image
                        src={urlFor(t.thumbnails[1])
                          .width(800)
                          .height(600)
                          .url()}
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
                <div className="p-3">
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="line-clamp-1 text-ln-label-md font-550 text-white group-hover:text-white/90">
                      {t.title}
                    </h3>
                  </div>
                  {t.designer && (
                    <p className="text-ln-paragraph-xs text-white/70">
                      Tasarımcı: {t.designer}
                    </p>
                  )}
                  {t.tags && t.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {t.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-white/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-ln-paragraph-md text-white/70">
              Bu filtrede şablon bulunamadı.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
