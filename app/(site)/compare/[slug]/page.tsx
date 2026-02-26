import { getComparePost, getAllComparePosts } from '@/lib/compare'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXComponents } from '@/lib/mdx-components'

export async function generateStaticParams() {
  const posts = await getAllComparePosts()
  return posts.map((p) => ({ slug: p.frontmatter.slug }))
}

export const dynamicParams = false

type PageParams = { slug: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getComparePost(slug)
  if (!post) return { title: 'Karşılaştırma bulunamadı' }

  const title = post.frontmatter.meta_title || post.frontmatter.title
  const description = post.frontmatter.meta_description || post.frontmatter.snippet
  const keywords = [
    post.frontmatter.title,
    'karşılaştırma',
    'e-ticaret altyapı karşılaştırma',
    ...(post.frontmatter.tags || []),
  ]

  return {
    title: `${title} | Karşılaştır | Moyduz`,
    description,
    keywords,
    alternates: {
      canonical: `https://moyduz.com/compare/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://moyduz.com/compare/${slug}`,
      type: 'article',
      locale: 'tr_TR',
      siteName: 'Moyduz',
      publishedTime: post.frontmatter.published_at,
      modifiedTime: post.frontmatter.updated_at || post.frontmatter.published_at,
      ...(post.frontmatter.author_name
        ? { authors: [post.frontmatter.author_name] }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function CompareSlugPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { slug } = await params
  const [post, allPosts] = await Promise.all([
    getComparePost(slug),
    getAllComparePosts(),
  ])

  if (!post) notFound()
  const relatedPosts = allPosts
    .filter((p) => p.frontmatter.slug !== slug)
    .slice(0, 4)

  const currentIndex = allPosts.findIndex((p) => p.frontmatter.slug === slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : undefined
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : undefined

  return (
    <main className="flex-1">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-ln-gray-600 dark:text-ln-gray-400">
          <Link href="/" className="transition hover:text-ln-gray-900 dark:hover:text-ln-gray-0">
            Ana sayfa
          </Link>
          <span className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-ln-gray-400 dark:text-ln-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link
              href="/compare"
              className="transition hover:text-ln-gray-900 dark:hover:text-ln-gray-0"
            >
              Karşılaştır
            </Link>
          </span>
          <span className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-ln-gray-400 dark:text-ln-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-ln-gray-900 dark:text-ln-gray-0">
              {post.frontmatter.title}
            </span>
          </span>
        </nav>

        <article>
          <header className="space-y-4 border-b border-ln-gray-200 dark:border-ln-gray-800 pb-8 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-ln-gray-900 dark:text-ln-gray-0">
              {post.frontmatter.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-ln-gray-500 dark:text-ln-gray-400">
              {post.frontmatter.published_at && (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {new Date(post.frontmatter.published_at).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              )}
              {post.frontmatter.author_name && (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  {post.frontmatter.author_name}
                </span>
              )}
              {post.frontmatter.reading_time && (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {post.frontmatter.reading_time} dk okuma
                </span>
              )}
            </div>

            {post.frontmatter.snippet && (
              <p className="text-ln-gray-700 dark:text-ln-gray-300 text-base md:text-lg leading-relaxed mt-4">
                {post.frontmatter.snippet}
              </p>
            )}
          </header>

          {/* Content - no remark-gfm; use HTML tables in MDX */}
          <div
            className="prose prose-lg max-w-none
              prose-headings:text-ln-gray-900 dark:prose-headings:text-ln-gray-0 prose-headings:font-semibold
              prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-ln-gray-700 dark:prose-p:text-ln-gray-300 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-ln-orange prose-a:no-underline hover:prose-a:underline
              prose-ul:pl-6 prose-ol:pl-6 prose-li:text-ln-gray-700 dark:prose-li:text-ln-gray-300
              [&_.not-prose]:my-6"
          >
            <MDXRemote source={post.content} components={MDXComponents} />
          </div>

          {/* Prev/Next */}
          <nav className="mt-12 pt-8 border-t border-ln-gray-200 dark:border-ln-gray-800 flex flex-wrap gap-4 justify-between">
            {prevPost ? (
              <Link
                href={`/compare/${prevPost.frontmatter.slug}`}
                className="text-sm font-medium text-ln-orange hover:underline"
              >
                ← {prevPost.frontmatter.title}
              </Link>
            ) : (
              <span />
            )}
            {nextPost ? (
              <Link
                href={`/compare/${nextPost.frontmatter.slug}`}
                className="text-sm font-medium text-ln-orange hover:underline"
              >
                {nextPost.frontmatter.title} →
              </Link>
            ) : (
              <span />
            )}
          </nav>

          {/* Related */}
          {relatedPosts.length > 0 && (
            <section className="mt-12 pt-8 border-t border-ln-gray-200 dark:border-ln-gray-800">
              <h2 className="text-xl font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-4">
                Diğer karşılaştırmalar
              </h2>
              <ul className="space-y-2">
                {relatedPosts.map((p) => (
                  <li key={p.frontmatter.slug}>
                    <Link
                      href={`/compare/${p.frontmatter.slug}`}
                      className="text-ln-orange hover:underline font-medium"
                    >
                      {p.frontmatter.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <p className="mt-8">
            <Link
              href="/compare"
              className="text-sm font-medium text-ln-gray-600 dark:text-ln-gray-400 hover:text-ln-orange"
            >
              ← Tüm karşılaştırmalara dön
            </Link>
          </p>
        </article>
      </div>
    </main>
  )
}
