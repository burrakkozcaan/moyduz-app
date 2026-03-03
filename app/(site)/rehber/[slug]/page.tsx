import { getRehberPost, getAllRehberPosts } from '@/lib/rehber'
import { buildImageObject } from '@/seo/json-ld'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxRemoteOptions } from '@/lib/mdx-remote-options'
import { MDXComponents } from '@/lib/mdx-components'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { AiSummaryButtons } from '@/components/AiSummaryButtons'
import { ToolCTA } from '@/components/ToolCTA'
import { AudioPlayer } from '@/components/AudioPlayer'
import { TableOfContents } from '@/components/TableOfContents'
import { ShareArticle } from '@/components/ShareArticle'
import { DocPagination } from '@/components/DocPagination'
import { FeedbackWidget } from '@/components/FeedbackWidget'

const TOOL_LABELS: Record<string, string> = {
  '/tools/maliyet-hesaplama': 'Maliyet Hesaplama',
  '/tools/roi-hesaplama': 'ROI Hesaplama',
  '/tools/komisyon-hesaplama': 'Komisyon Hesaplama',
  '/tools/site-saglik-skoru': 'Site Sağlık Skoru',
  '/tools/e-ticaret-kar-hesaplama': 'E-Ticaret Kâr Hesaplama',
  '/tools/site-maliyet-hesaplama': 'Site Maliyet Hesaplama',
  '/tools/dijital-sistem-planlayici': 'Dijital Sistem Planlayıcı',
  '/tools/sanal-pos-hesaplama': 'Sanal POS Maliyet Hesaplayıcı',
}

export const dynamic = 'force-static'

export async function generateStaticParams() {
  const posts = await getAllRehberPosts()
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
  const post = await getRehberPost(slug)
  if (!post) return { title: 'Bulunamadı' }

  const title = post.frontmatter.title
  const metaTitle = (post.frontmatter.meta_title as string | undefined) || title
  const description = post.frontmatter.meta_description
  const ogImage = post.frontmatter.hero_image as string | undefined

  return {
    title: `${metaTitle} | Moyduz`,
    description,
    alternates: { canonical: `https://moyduz.com/rehber/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://moyduz.com/rehber/${slug}`,
      type: 'article',
      locale: 'tr_TR',
      siteName: 'Moyduz',
      publishedTime: post.frontmatter.published_at,
      modifiedTime: post.frontmatter.updated_at || post.frontmatter.published_at,
      authors: ['Moyduz Team'],
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function RehberSlugPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { slug } = await params
  const post = await getRehberPost(slug)
  if (!post) notFound()

  const { frontmatter, content } = post

  // JSON-LD schemas
  const heroImage = frontmatter.hero_image as string | undefined
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.meta_description,
    url: `https://moyduz.com/rehber/${slug}`,
    datePublished: frontmatter.published_at,
    dateModified: frontmatter.updated_at || frontmatter.published_at,
    author: { '@type': 'Organization', name: 'Moyduz', url: 'https://moyduz.com' },
    publisher: { '@type': 'Organization', name: 'Moyduz', url: 'https://moyduz.com' },
    ...(heroImage ? {
      image: buildImageObject({
        url: heroImage,
        width: 1200,
        height: 630,
        caption: frontmatter.title as string,
        creator: { '@type': 'Organization', name: 'Moyduz' },
        copyrightHolder: { '@type': 'Organization', name: 'Moyduz' },
      }),
    } : {}),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://moyduz.com' },
      { '@type': 'ListItem', position: 2, name: 'Rehberler', item: 'https://moyduz.com/rehber' },
      { '@type': 'ListItem', position: 3, name: frontmatter.title, item: `https://moyduz.com/rehber/${slug}` },
    ],
  }

  // Auto-extract FAQs from ## headings + first paragraph
  const faqItems: Array<{ question: string; answer: string }> = []
  if (frontmatter.faqs && Array.isArray(frontmatter.faqs)) {
    frontmatter.faqs.forEach((f: { question: string; answer: string }) => {
      faqItems.push(f)
    })
  } else {
    const lines = content.split('\n')
    for (let i = 0; i < lines.length; i++) {
      const h = lines[i].match(/^#{2,3}\s+(.+)$/)
      if (h) {
        const question = h[1].replace(/\*\*/g, '').trim()
        // find first non-empty paragraph after heading
        for (let j = i + 1; j < Math.min(i + 6, lines.length); j++) {
          const line = lines[j].trim()
          if (line && !line.startsWith('#') && !line.startsWith('|') && !line.startsWith('-')) {
            faqItems.push({ question, answer: line.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') })
            break
          }
        }
      }
    }
  }

  const faqSchema = faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null

  // All posts for prev/next pagination + related posts
  const allPosts = await getAllRehberPosts()
  const currentIndex = allPosts.findIndex((p) => p.frontmatter.slug === slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : undefined
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : undefined

  // Related posts — same category
  const postCategory = frontmatter.category as string | undefined
  const relatedPosts = postCategory
    ? allPosts
        .filter((p) => {
          if (p.frontmatter.slug === slug) return false
          return (p.frontmatter.category as string | undefined)?.toLowerCase() === postCategory.toLowerCase()
        })
        .slice(0, 4)
    : []

  const audioSrc = frontmatter.audio_src as string | undefined
  // Plain text for browser TTS fallback
  const audioText = [frontmatter.title, content]
    .join('\n\n')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`[^`]+`/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  const schemas = [articleSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])]

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <div className="container mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-ln-gray-500 dark:text-ln-gray-400">
          <Link href="/" className="hover:text-ln-gray-900 dark:hover:text-white">Ana Sayfa</Link>
          <span>/</span>
          <Link href="/rehber" className="hover:text-ln-gray-900 dark:hover:text-white">Rehberler</Link>
          <span>/</span>
          <span className="text-ln-gray-700 dark:text-ln-gray-300">{frontmatter.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="mb-3 text-sm font-medium text-ln-orange">Rehber</div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-ln-gray-900 dark:text-white md:text-4xl">
            {frontmatter.title}
          </h1>
          {frontmatter.meta_description && (
            <p className="mt-4 text-lg text-ln-gray-600 dark:text-ln-gray-400">
              {frontmatter.meta_description}
            </p>
          )}
          <div className="mt-4 flex items-center gap-3 text-sm text-ln-gray-400 dark:text-ln-gray-500">
            <time dateTime={frontmatter.published_at}>
              {new Date(frontmatter.published_at).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {frontmatter.updated_at && frontmatter.updated_at !== frontmatter.published_at && (
              <>
                <span>·</span>
                <span>
                  Güncellendi:{' '}
                  {new Date(frontmatter.updated_at).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'short',
                  })}
                </span>
              </>
            )}
          </div>
        </header>

        {/* Hero image */}
        {frontmatter.hero_image && (
          <div className="not-prose mb-8 w-full overflow-hidden rounded-2xl">
            <Image
              src={frontmatter.hero_image as string}
              alt={frontmatter.title}
              width={1200}
              height={630}
              className="w-full h-auto object-cover"
              priority
              quality={85}
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        {/* Summary card */}
        {(frontmatter.meta_description || (frontmatter.key_points && frontmatter.key_points.length > 0)) && (
          <div className="not-prose mb-6 rounded-2xl border border-ln-gray-200 bg-ln-gray-0 dark:border-ln-gray-800 dark:bg-ln-gray-950 overflow-hidden">
            {frontmatter.meta_description && (
              <div className="relative px-6 pt-6 pb-4 border-b border-ln-gray-100 dark:border-ln-gray-800/60">
                <span className="absolute top-4 left-4 text-5xl leading-none text-ln-orange/20 font-serif select-none" aria-hidden>"</span>
                <p className="relative z-10 pl-5 text-base font-medium italic leading-relaxed text-ln-gray-800 dark:text-ln-gray-200">
                  {frontmatter.meta_description}
                </p>
                <span className="absolute bottom-3 right-5 text-5xl leading-none text-ln-orange/20 font-serif select-none rotate-180" aria-hidden>"</span>
              </div>
            )}
            {frontmatter.key_points && frontmatter.key_points.length > 0 && (
              <div className="px-6 py-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-ln-orange">Öne Çıkanlar</p>
                <ul className="space-y-2">
                  {(frontmatter.key_points as string[]).map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-ln-gray-700 dark:text-ln-gray-300">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ln-orange" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* On this page — TOC */}
        {(() => {
          const headings = [...content.matchAll(/^## (.+)$/gm)].map(m => ({
            id: m[1].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
            label: m[1].replace(/\*\*/g, '').trim(),
            depth: 2,
          }))
          return headings.length > 0 ? (
            <div className="not-prose mb-6">
              <TableOfContents items={headings} title="Bu Sayfada" />
            </div>
          ) : null
        })()}

        {/* AI Summary + Audio */}
        <AiSummaryButtons
          title="Bu rehberi AI ile özetle"
          url={`https://moyduz.com/rehber/${slug}`}
          pageTitle={frontmatter.title}
          sections={
            [...content.matchAll(/^## (.+)$/gm)].map(m => m[1].replace(/\*\*/g, '').trim())
          }
        />

        {/* Audio player — dosya varsa çalar, yoksa "yakında" gösterir */}
        <AudioPlayer
          src={audioSrc}
          text={audioText}
          title={`Dinle: ${frontmatter.title}`}
        />

        {/* MDX Content */}
        <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-ln-orange prose-a:no-underline hover:prose-a:underline">
          <MDXRemote
            source={content}
            options={mdxRemoteOptions}
            components={{
              ...MDXComponents,
            }}
          />
        </article>

        {/* Related tools */}
        {frontmatter.related_tools && frontmatter.related_tools.length > 0 && (
          <aside className="mt-12 rounded-xl border border-ln-gray-200 bg-ln-gray-0 p-6 dark:border-ln-gray-800 dark:bg-ln-gray-950">
            <h2 className="text-base font-semibold text-ln-gray-900 dark:text-white">
              İlgili Araçlar
            </h2>
            <ul className="mt-3 flex flex-col gap-2">
              {(frontmatter.related_tools as string[]).map((href) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-ln-orange hover:underline"
                  >
                    {TOOL_LABELS[href] ?? href} →
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Share Article */}
        <ShareArticle title={frontmatter.title} />

        {/* Prev/Next Pagination */}
        <div className="mt-10">
          <DocPagination
            prev={
              prevPost
                ? {
                    title: prevPost.frontmatter.title,
                    href: `/rehber/${prevPost.frontmatter.slug}`,
                    description: prevPost.frontmatter.meta_description,
                  }
                : undefined
            }
            next={
              nextPost
                ? {
                    title: nextPost.frontmatter.title,
                    href: `/rehber/${nextPost.frontmatter.slug}`,
                    description: nextPost.frontmatter.meta_description,
                  }
                : undefined
            }
          />
        </div>

        {/* Related Rehber Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-12 pt-8 border-t border-ln-gray-200 dark:border-ln-gray-800">
            <h2 className="text-2xl font-semibold text-ln-gray-900 dark:text-white mb-6">
              İlgili Rehberler
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {relatedPosts.map((relatedPost) => {
                const relatedImage = relatedPost.frontmatter.hero_image as string | undefined
                return (
                  <Link
                    key={relatedPost.frontmatter.slug}
                    href={`/rehber/${relatedPost.frontmatter.slug}`}
                    className="group rounded-xl border border-ln-gray-200 dark:border-ln-gray-800 bg-ln-gray-0 dark:bg-ln-gray-900 overflow-hidden hover:border-ln-gray-300 dark:hover:border-ln-gray-700 transition-all"
                  >
                    {relatedImage && (
                      <div className="w-full aspect-video overflow-hidden bg-ln-gray-200 dark:bg-ln-gray-800">
                        <Image
                          src={relatedImage}
                          alt={relatedPost.frontmatter.title}
                          width={600}
                          height={338}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="text-base font-semibold text-ln-gray-900 dark:text-white mb-2 group-hover:text-ln-orange transition-colors">
                        {relatedPost.frontmatter.title}
                      </h3>
                      {relatedPost.frontmatter.meta_description && (
                        <p className="text-sm text-ln-gray-600 dark:text-ln-gray-400 line-clamp-2">
                          {relatedPost.frontmatter.meta_description}
                        </p>
                      )}
                      {relatedPost.frontmatter.published_at && (
                        <div className="mt-3 text-xs text-ln-gray-400 dark:text-ln-gray-500">
                          {new Date(relatedPost.frontmatter.published_at).toLocaleDateString('tr-TR', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* Feedback */}
        <div className="mt-8 pt-8 border-t border-ln-gray-200 dark:border-ln-gray-800">
          <FeedbackWidget />
        </div>

        {/* Back link */}
        <div className="mt-8">
          <Link
            href="/rehber"
            className="text-sm font-medium text-ln-gray-600 hover:text-ln-gray-900 dark:text-ln-gray-400 dark:hover:text-white"
          >
            ← Tüm Rehberler
          </Link>
        </div>
      </div>
    </main>
  )
}
