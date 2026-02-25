import { getAllRehberPosts } from '@/lib/rehber'
import Link from 'next/link'
import type { Metadata } from 'next'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Uygulama Rehberleri — E-Ticaret, SEO & Dijital İş | Moyduz',
  description:
    'E-ticaret altyapısı, teknik SEO, site performansı ve dijital iş kurma konularında adım adım uygulama rehberleri. Moyduz uzmanlarından.',
  alternates: { canonical: 'https://moyduz.com/rehber' },
  openGraph: {
    title: 'Uygulama Rehberleri | Moyduz',
    description: 'E-ticaret, SEO ve dijital iş kurma konularında adım adım rehberler.',
    url: 'https://moyduz.com/rehber',
  },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function RehberIndexPage() {
  const posts = await getAllRehberPosts()

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-20">
      {/* Header */}
      <div className="mb-12">
        <p className="text-sm font-medium text-ln-orange">Rehberler</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ln-gray-900 dark:text-white md:text-4xl">
          Kapsamlı Uygulama Rehberleri
        </h1>
        <p className="mt-4 text-lg text-ln-gray-600 dark:text-ln-gray-400">
          E-ticaret sistemi kurmaktan teknik SEO&apos;ya, site hızından GEO optimizasyonuna — adım adım, Türkiye odaklı rehberler.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.frontmatter.slug}
            href={`/rehber/${post.frontmatter.slug}`}
            className="group flex flex-col rounded-2xl border border-ln-gray-200 bg-white p-6 transition-all hover:border-ln-gray-300 hover:shadow-md dark:border-ln-gray-800 dark:bg-ln-gray-950 dark:hover:border-ln-gray-700"
          >
            <h2 className="text-lg font-semibold leading-snug text-ln-gray-900 group-hover:text-ln-orange dark:text-white dark:group-hover:text-ln-orange">
              {post.frontmatter.title}
            </h2>
            {post.frontmatter.meta_description && (
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ln-gray-600 dark:text-ln-gray-400">
                {post.frontmatter.meta_description}
              </p>
            )}
            <div className="mt-4 flex items-center justify-between">
              <time
                dateTime={post.frontmatter.published_at}
                className="text-xs text-ln-gray-400 dark:text-ln-gray-500"
              >
                {formatDate(post.frontmatter.published_at)}
              </time>
              <span className="text-sm font-medium text-ln-orange">
                Oku →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-ln-gray-500">Yakında rehberler yayınlanacak.</p>
      )}
    </main>
  )
}
