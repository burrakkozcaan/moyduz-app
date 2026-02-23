import Link from 'next/link'
import { FileText } from 'lucide-react'

type BlogPost = {
  slug?: string
  title: string
  excerpt?: string
  meta_description?: string
  published_at?: string
  author_name?: string
  reading_time?: number
  category?: string | { slug?: string; name?: string } | null
}

type BlogClientProps = {
  blogList: BlogPost[]
  title?: string
  description?: string
}

const getCategoryLabel = (category?: string | { slug?: string; name?: string } | null) => {
  if (!category) return ''
  if (typeof category === 'string') {
    return category
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  }
  return (
    (category.name || category.slug || '')
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ') || ''
  )
}

export default function BlogClient({
  blogList,
  title = 'Blog',
  description,
}: BlogClientProps) {
  const posts = Array.isArray(blogList) ? blogList : []
  const showHeader = title && title.trim() !== ''

  if (posts.length === 0) {
    return (
      <main className="min-h-screen px-6 py-10">
        <div className="mx-auto max-w-5xl space-y-10 py-16">
          <h1 className="text-3xl font-semibold text-ln-gray-900 md:text-4xl dark:text-ln-gray-100">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-ln-gray-600 dark:text-ln-gray-400">
              {description}
            </p>
          )}
          <p className="text-ln-gray-600 dark:text-ln-gray-400">
            Henüz blog yazısı yok.
          </p>
        </div>
      </main>
    )
  }

  return (
    <div className={showHeader ? 'min-h-screen px-6 py-10' : ''}>
      {showHeader && (
        <div className="mx-auto max-w-5xl space-y-6 py-16">
          <h1 className="text-balance text-3xl font-semibold text-ln-gray-900 md:text-4xl dark:text-ln-gray-100">
            {title}
          </h1>
          {description && (
            <p className="text-lg leading-relaxed text-ln-gray-600 dark:text-ln-gray-400">
              {description}
            </p>
          )}
        </div>
      )}

      <div
        className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ${showHeader ? 'mx-auto max-w-5xl' : ''}`}
      >
        {posts.map((post, index) => {
          const safeSlug = post.slug || ''
          const href = safeSlug ? `/blog/${safeSlug}` : '/blog'
          const categoryLabel = getCategoryLabel(post.category)
          const readTime = post.reading_time

          return (
            <Link
              key={`${post.slug || index}`}
              href={href}
              className="group flex flex-col gap-6 rounded-[28px] bg-ln-gray-50 p-6 shadow-ln-badge-gray transition hover:shadow-md xl:gap-7 xl:p-8 dark:bg-ln-gray-900 dark:shadow-none dark:ring-1 dark:ring-ln-gray-800"
            >
              <div className="flex size-11 items-center justify-center rounded-[13px] bg-ln-gray-0 shadow-ln-badge-gray dark:bg-ln-gray-800 dark:shadow-none">
                <FileText className="size-6 text-ln-gray-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-ln-title-h5 text-ln-gray-800 dark:text-ln-gray-100">
                    {post.title}
                  </span>
                  {categoryLabel && (
                    <div className="flex h-5 items-center rounded-md px-[7px] text-[11px] font-semibold text-ln-gray-600 shadow-ln-badge-gray dark:bg-ln-gray-800 dark:text-ln-gray-400 dark:shadow-none">
                      {categoryLabel.toUpperCase()}
                    </div>
                  )}
                </div>
                {(post.excerpt || post.meta_description) && (
                  <p className="mt-4 line-clamp-3 text-ln-label-lg text-ln-gray-700 dark:text-ln-gray-300">
                    {post.excerpt || post.meta_description}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-balance text-ln-paragraph-sm text-ln-gray-450 dark:text-ln-gray-500">
                {post.published_at && (
                  <span>
                    {new Date(post.published_at).toLocaleDateString('tr-TR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                )}
                {post.author_name && (
                  <span>{post.author_name} tarafından</span>
                )}
                {readTime && <span>{readTime} dk okuma</span>}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
