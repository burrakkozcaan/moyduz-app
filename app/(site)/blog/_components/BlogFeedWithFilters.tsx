'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

type CategoryFilter = {
  title: string
  slug: string
  count: number
}

type BlogPost = {
  slug?: string
  title: string
  meta_description?: string
  excerpt?: string
  published_at?: string
  author_name?: string
  reading_time?: number
  category?: string | { slug?: string; name?: string } | null
  hero_image?: string
  featured_image?: string
}

type BlogFeedWithFiltersProps = {
  blogList: BlogPost[]
  title: string
  description?: string
  categoryFilters?: CategoryFilter[]
  showCategoryFilters?: boolean
  totalCount?: number
}

function getCategorySlug(category?: string | { slug?: string; name?: string } | null): string {
  if (!category) return ''
  if (typeof category === 'string') return category
  return category.slug || ''
}

function getCategoryLabel(category?: string | { slug?: string; name?: string } | null): string {
  if (!category) return ''
  if (typeof category === 'string') {
    return category.replace(/_/g, '-').split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  }
  if (category.name) return category.name
  return (category.slug || '').replace(/_/g, '-').split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

function BlogFeedContent({
  blogList,
  title,
  description,
  categoryFilters = [],
  showCategoryFilters = false,
}: BlogFeedWithFiltersProps) {
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') || ''

  const filteredPosts = activeCategory
    ? blogList.filter((post) => getCategorySlug(post.category) === activeCategory)
    : blogList

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-20">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm font-medium text-ln-orange">Blog</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ln-gray-900 dark:text-white md:text-4xl">
          {activeCategory
            ? categoryFilters.find((c) => c.slug === activeCategory)?.title || title
            : title}
        </h1>
        {description && (
          <p className="mt-4 text-lg text-ln-gray-600 dark:text-ln-gray-400 max-w-2xl">
            {description}
          </p>
        )}
        {/* SEO/GEO paragraph — static listing page */}
        {!activeCategory && (
          <p className="mt-3 text-sm text-ln-gray-500 dark:text-ln-gray-400 max-w-2xl leading-relaxed">
            Moyduz ekibi; e-ticaret altyapısı, teknik SEO, dijital pazarlama ve iş kurma
            konularında kapsamlı Türkçe rehberler yazar. Her yazı, arama motorları ve AI
            asistanları (ChatGPT, Gemini, Perplexity) tarafından kolayca anlaşılabilecek
            şekilde yapılandırılmıştır. Türkiye e-ticaret ekosistemi, pazaryeri komisyonları,
            maliyet karşılaştırmaları ve büyüme stratejileri hakkında güncel bilgiye buradan
            ulaşabilirsiniz.
          </p>
        )}
      </div>

      {/* Category filter chips */}
      {showCategoryFilters && categoryFilters.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href="/blog"
            className={`inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
              !activeCategory
                ? 'border-ln-orange bg-ln-orange/5 text-ln-orange dark:bg-ln-orange/10'
                : 'border-ln-gray-200 bg-white text-ln-gray-700 hover:border-ln-gray-300 dark:border-ln-gray-700 dark:bg-ln-gray-900 dark:text-ln-gray-300'
            }`}
          >
            Tümü
            <span className="ml-1.5 text-xs text-ln-gray-400 dark:text-ln-gray-500">{blogList.length}</span>
          </Link>
          {categoryFilters.map((item) => {
            const isActive = activeCategory === item.slug
            return (
              <Link
                key={item.slug}
                href={isActive ? '/blog' : `/blog?category=${item.slug}`}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'border-ln-orange bg-ln-orange/5 text-ln-orange dark:bg-ln-orange/10'
                    : 'border-ln-gray-200 bg-white text-ln-gray-700 hover:border-ln-gray-300 dark:border-ln-gray-700 dark:bg-ln-gray-900 dark:text-ln-gray-300 dark:hover:border-ln-gray-600'
                }`}
              >
                {item.title}
                <span className="text-xs text-ln-gray-400 dark:text-ln-gray-500">{item.count}</span>
              </Link>
            )
          })}
        </div>
      )}

      {/* Grid */}
      {filteredPosts.length === 0 ? (
        <p className="text-center text-ln-gray-500">Bu kategoride henüz yazı yok.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {filteredPosts.map((post, index) => {
            const href = post.slug ? `/blog/${post.slug}` : '/blog'
            const categoryLabel = getCategoryLabel(post.category)
            const image = post.featured_image || post.hero_image

            return (
              <Link
                key={post.slug || index}
                href={href}
                className="group flex flex-col rounded-2xl border border-ln-gray-200 bg-white transition-all hover:border-ln-gray-300 hover:shadow-md dark:border-ln-gray-800 dark:bg-ln-gray-950 dark:hover:border-ln-gray-700 overflow-hidden"
              >
                {/* Card image */}
                {image && (
                  <div className="w-full aspect-video overflow-hidden bg-ln-gray-100 dark:bg-ln-gray-800">
                    <Image
                      src={image}
                      alt={post.title}
                      width={600}
                      height={338}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="flex flex-col flex-1 p-6">
                  {categoryLabel && (
                    <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-ln-orange">
                      {categoryLabel}
                    </span>
                  )}
                  <h2 className="text-lg font-semibold leading-snug text-ln-gray-900 group-hover:text-ln-orange dark:text-white dark:group-hover:text-ln-orange">
                    {post.title}
                  </h2>
                  {(post.meta_description || post.excerpt) && (
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ln-gray-600 dark:text-ln-gray-400 line-clamp-3">
                      {post.meta_description || post.excerpt}
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-ln-gray-400 dark:text-ln-gray-500">
                      {post.published_at && (
                        <time dateTime={post.published_at}>
                          {new Date(post.published_at).toLocaleDateString('tr-TR', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                      )}
                      {post.reading_time && (
                        <>
                          <span>·</span>
                          <span>{post.reading_time} dk</span>
                        </>
                      )}
                    </div>
                    <span className="text-sm font-medium text-ln-orange">Oku →</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </main>
  )
}

export default function BlogFeedWithFilters(props: BlogFeedWithFiltersProps) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-20">
          <div className="mb-10 h-16 w-64 animate-pulse rounded-lg bg-ln-gray-100 dark:bg-ln-gray-800" />
          <div className="grid gap-6 sm:grid-cols-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-ln-gray-200 dark:border-ln-gray-800 h-64 animate-pulse bg-ln-gray-50 dark:bg-ln-gray-900" />
            ))}
          </div>
        </main>
      }
    >
      <BlogFeedContent {...props} />
    </Suspense>
  )
}
