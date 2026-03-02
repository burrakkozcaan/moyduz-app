import Link from 'next/link'
import BlogClient from './BlogClient'

type CategoryFilter = {
  title: string
  href: string
  count: number
  badge?: string
}

type BlogFeedWithFiltersProps = {
  blogList: Array<{
    slug?: string
    title: string
    meta_description?: string
    excerpt?: string
    published_at?: string
    author_name?: string
    reading_time?: number
    category?: string | { slug?: string; name?: string } | null
  }>
  title: string
  description?: string
  categoryFilters?: CategoryFilter[]
  showCategoryFilters?: boolean
  totalCount?: number
}

const GRID_CARD =
  'group flex items-center justify-between rounded-2xl border border-ln-gray-200 bg-ln-gray-50 px-4 py-3 transition-all hover:-translate-y-1 hover:shadow-md hover:border-ln-gray-300 dark:border-ln-gray-800 dark:bg-ln-gray-900 dark:shadow-none dark:ring-1 dark:ring-ln-gray-800 dark:hover:border-ln-gray-700'

export default function BlogFeedWithFilters({
  blogList,
  title,
  description,
  categoryFilters = [],
  showCategoryFilters = false,
  totalCount,
}: BlogFeedWithFiltersProps) {
  const articleCount =
    typeof totalCount === 'number'
      ? totalCount
      : Array.isArray(blogList)
        ? blogList.length
        : 0

  return (
    <main className="container mx-auto max-w-7xl px-4 py-20 ld:px-0 ">
      {/* Hero */}
      <section className="mb-10 rounded-3xl bg-ln-gray-50 p-5 shadow-ln-badge-gray dark:bg-ln-gray-900 dark:shadow-none dark:ring-1 dark:ring-ln-gray-800">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-ln-gray-600 dark:text-ln-gray-400">
              Moyduz Blog
            </p>
            <h1 className="mt-4 text-4xl font-bold text-ln-gray-900 md:text-5xl dark:text-ln-gray-100">
              {title}
            </h1>
            {description && (
              <p className="mt-4 max-w-3xl text-base text-ln-gray-600 md:text-lg dark:text-ln-gray-400">
                {description}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-5 lg:text-right">
            <div className="flex flex-col items-center justify-center rounded-2xl bg-ln-gray-0 p-4 shadow-ln-badge-gray dark:bg-ln-gray-800 dark:shadow-none">
              <p className="text-2xl font-bold text-ln-gray-900 dark:text-ln-gray-100">
                {articleCount.toLocaleString()}
              </p>
              <p className="text-xs uppercase tracking-wider text-ln-gray-600 dark:text-ln-gray-400">
                Makale
              </p>
            </div>
            {categoryFilters.length > 0 && (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-ln-gray-0 p-4 shadow-ln-badge-gray dark:bg-ln-gray-800 dark:shadow-none">
                <p className="text-2xl font-bold text-ln-gray-900 dark:text-ln-gray-100">
                  {categoryFilters.length.toLocaleString()}
                </p>
                <p className="text-xs uppercase tracking-wider text-ln-gray-600 dark:text-ln-gray-400">
                  Kategori
                </p>
              </div>
            )}
          </div>
        </div>

        {showCategoryFilters && categoryFilters.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {categoryFilters.slice(0, 8).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-2 rounded-full border border-ln-gray-200 bg-ln-gray-0 px-4 py-2 text-sm font-medium text-ln-gray-800 transition hover:bg-ln-gray-100 dark:border-ln-gray-700 dark:bg-ln-gray-800 dark:text-ln-gray-100 dark:hover:bg-ln-gray-700"
              >
                <span className="text-xs uppercase tracking-wider text-ln-gray-600 dark:text-ln-gray-400">
                  {item.badge || 'Kategori'}
                </span>
                {item.title}
              </Link>
            ))}
          </div>
        )}
      </section>

      <section
        className={
          showCategoryFilters && categoryFilters.length > 0
            ? 'grid gap-6 lg:grid-cols-[minmax(0,2.2fr)_minmax(280px,1fr)]'
            : ''
        }
      >
        <div className="space-y-12">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="mb-2 p-2 text-2xl font-semibold text-ln-gray-900 dark:text-ln-gray-100">
                Son Yazılar
              </h2>
            </div>
            <BlogClient blogList={blogList} title="" description="" />
          </div>
        </div>

        {showCategoryFilters && categoryFilters.length > 0 && (
          <aside className="space-y-8">
            <section className="rounded-3xl bg-ln-gray-50 p-6 shadow-ln-badge-gray dark:bg-ln-gray-900 dark:shadow-none dark:ring-1 dark:ring-ln-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-ln-gray-900 dark:text-ln-gray-100">
                Kategorilere Göre Göz At
              </h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {categoryFilters.slice(0, 12).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={GRID_CARD}
                  >
                    <div>
                      <p className="text-xs uppercase tracking-wide text-ln-gray-600 dark:text-ln-gray-400">
                        Kategori
                      </p>
                      <h4 className="text-base font-semibold text-ln-gray-900 dark:text-ln-gray-100">
                        {item.title}
                      </h4>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-ln-gray-900 dark:text-ln-gray-100">
                        {item.count}
                      </p>
                      <p className="text-xs text-ln-gray-600 dark:text-ln-gray-400">
                        makale
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </aside>
        )}
      </section>
    </main>
  )
}
