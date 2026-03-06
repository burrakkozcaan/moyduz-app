import { getBlogPost, getAllBlogPosts, getBlogPostsByCategory } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { markdownTablesToHtml } from '@/lib/markdown-tables-to-html'
import { mdxRemoteOptions } from '@/lib/mdx-remote-options'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXComponents } from '@/lib/mdx-components'
import { ShareArticle } from '@/components/ShareArticle'
import { TableOfContents } from '@/components/TableOfContents'
import { FeedbackWidget } from '@/components/FeedbackWidget'
import { DocPagination } from '@/components/DocPagination'
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion'
import { AudioPlayer } from '@/components/AudioPlayer'
import { AiSummaryButtons } from '@/components/AiSummaryButtons'
import { buildBlogPostingSchema } from '@/seo/json-ld/index'
import BlogFeedWithFilters from '../_components/BlogFeedWithFilters'

/** Plandaki blog pillar kategorileri — /blog/para-kazanma gibi temiz URL'ler */
const BLOG_PILLAR_CATEGORIES = ['para-kazanma', 'e-ticaret', 'teknik', 'ai-seo', 'is-kurma'] as const
const PILLAR_LABELS: Record<string, string> = {
  'para-kazanma': 'Para Kazanma',
  'e-ticaret': 'E-Ticaret',
  'teknik': 'Teknik',
  'ai-seo': 'AI & SEO',
  'is-kurma': 'İş Kurma',
}

function formatCategoryLabel(slug: string) {
  return PILLAR_LABELS[slug] || slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

/** Blog içeriğinden otomatik FAQ üretir: ## / ### başlıkları soru, altındaki ilk paragraf cevap */
function extractFaqFromContent(content: string): Array<{ question: string; answer: string }> {
  const faqs: Array<{ question: string; answer: string }> = []
  const lines = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n')

  const stripMarkdown = (s: string): string =>
    s
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/^#+\s*/, '')
      .replace(/\s+/g, ' ')
      .trim()

  const toQuestion = (heading: string): string => {
    const t = heading.trim()
    if (t.endsWith('?')) return t
    if (/^(nedir|nelerdir|nasıl|ne kadar|kim|hangi)\s/i.test(t) || / (mi\??|mı\??|mu\??|mü\?)$/i.test(t))
      return t
    return `${t} nedir?`
  }

  let i = 0
  const maxFaqs = 6

  while (i < lines.length && faqs.length < maxFaqs) {
    const line = lines[i]
    const h2 = line.match(/^##\s+(.+)$/)
    const h3 = line.match(/^###\s+(.+)$/)
    const headingMatch = h2 || h3
    if (!headingMatch) {
      i += 1
      continue
    }
    const question = toQuestion(stripMarkdown(headingMatch[1]))
    i += 1
    const paragraphLines: string[] = []
    while (i < lines.length) {
      const next = lines[i]
      if (next.match(/^#{2,6}\s+/)) break
      if (next.trim() === '') {
        if (paragraphLines.length > 0) break
        i += 1
        continue
      }
      paragraphLines.push(next)
      i += 1
    }
    const raw = paragraphLines.join(' ').trim()
    const plain = stripMarkdown(raw)
    const answer = plain.length > 280 ? plain.slice(0, 280) + '…' : plain
    if (answer.length >= 20) faqs.push({ question, answer })
  }

  return faqs
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  const categoryParams = BLOG_PILLAR_CATEGORIES.map((slug) => ({ slug }))
  const postParams = posts.map((p) => ({ slug: p.frontmatter.slug }))
  return [...categoryParams, ...postParams]
}

export const dynamicParams = false

type PageParams = { slug: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { slug } = await params

  if (BLOG_PILLAR_CATEGORIES.includes(slug as (typeof BLOG_PILLAR_CATEGORIES)[number])) {
    const label = formatCategoryLabel(slug)
    const title = `${label} | Moyduz Blog`
    const description = `${label.toLowerCase()} ile ilgili rehberler, içgörüler ve büyüme stratejileri.`
    return {
      title,
      description,
      alternates: { canonical: `https://moyduz.com/blog/${slug}` },
      openGraph: { title, description, url: `https://moyduz.com/blog/${slug}` },
      twitter: { card: 'summary', title, description },
    }
  }

  const post = await getBlogPost(slug)
  if (!post) return { title: 'Not Found' }

  const title = post.frontmatter.meta_title || post.frontmatter.title
  const description = post.frontmatter.meta_description

  const ogImage = post.frontmatter.featured_image || post.frontmatter.og_image || (post.frontmatter.hero_image as string | undefined)

  return {
    title: `${title} | Moyduz`,
    description,
    alternates: {
      canonical: `https://moyduz.com/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://moyduz.com/blog/${slug}`,
      type: 'article',
      locale: 'tr_TR',
      siteName: 'Moyduz',
      publishedTime: post.frontmatter.published_at,
      modifiedTime: post.frontmatter.updated_at || post.frontmatter.published_at,
      authors: [post.frontmatter.author_name || 'Moyduz Team'],
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  }
}

// Extract TOC items from MDX content
function extractTOC(content: string): Array<{ id: string; label: string; depth: number }> {
  const toc: Array<{ id: string; label: string; depth: number }> = []
  const lines = content.split('\n')
  
  const slugify = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }
  
  for (const line of lines) {
    // Match h2, h3, h4 headings
    const h2Match = line.match(/^##\s+(.+)$/)
    const h3Match = line.match(/^###\s+(.+)$/)
    const h4Match = line.match(/^####\s+(.+)$/)
    
    if (h2Match) {
      const label = h2Match[1].trim().replace(/#/g, '').trim()
      const id = slugify(label)
      if (id) toc.push({ id, label, depth: 2 })
    } else if (h3Match) {
      const label = h3Match[1].trim().replace(/#/g, '').trim()
      const id = slugify(label)
      if (id) toc.push({ id, label, depth: 3 })
    } else if (h4Match) {
      const label = h4Match[1].trim().replace(/#/g, '').trim()
      const id = slugify(label)
      if (id) toc.push({ id, label, depth: 4 })
    }
  }
  
  return toc
}

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { slug } = await params

  if (BLOG_PILLAR_CATEGORIES.includes(slug as (typeof BLOG_PILLAR_CATEGORIES)[number])) {
    const [posts, allPosts] = await Promise.all([
      getBlogPostsByCategory(slug),
      getAllBlogPosts(),
    ])
    const list = posts.map((post) => ({
      slug: post.frontmatter.slug,
      title: post.frontmatter.title,
      meta_description: post.frontmatter.meta_description,
      published_at: post.frontmatter.published_at,
      reading_time: post.frontmatter.reading_time,
      category: post.frontmatter.category,
      author_name: post.frontmatter.author_name,
      excerpt: post.frontmatter.meta_description,
      hero_image: post.frontmatter.hero_image as string | undefined,
      featured_image: post.frontmatter.featured_image,
    }))
    const categoryMap = new Map<string, { count: number; name?: string }>()
    allPosts.forEach((p) => {
      const cs = typeof p.frontmatter.category === 'object' ? p.frontmatter.category?.slug : p.frontmatter.category
      const name = typeof p.frontmatter.category === 'object' ? p.frontmatter.category?.name : p.frontmatter.category
      if (cs) {
        const cur = categoryMap.get(cs) || { count: 0 }
        categoryMap.set(cs, { count: cur.count + 1, name: name as string })
      }
    })
    const categoryItems = Array.from(categoryMap.entries())
      .map(([catSlug, data]) => ({
        slug: catSlug,
        title: data.name || formatCategoryLabel(catSlug),
        count: data.count,
      }))
      .sort((a, b) => b.count - a.count)
    const label = formatCategoryLabel(slug)
    return (
      <BlogFeedWithFilters
        blogList={list}
        title={`${label} Insights`}
        description={`${label.toLowerCase()} ile ilgili rehberler ve içgörüler.`}
        categoryFilters={categoryItems}
        showCategoryFilters={categoryItems.length > 0}
        totalCount={list.length}
      />
    )
  }

  const [post, allPosts] = await Promise.all([
    getBlogPost(slug),
    getAllBlogPosts(),
  ])
  if (!post) notFound()

  const tocItems = extractTOC(post.content)
  
  // Get featured_image (same as moydus)
  const rawFeaturedImage = post.frontmatter.featured_image || post.frontmatter.og_image || (post.frontmatter.hero_image as string | undefined)
  const featuredImage = rawFeaturedImage

  // Build breadcrumb items (same as moydus)
  const categoryName = typeof post.frontmatter.category === 'object' 
    ? post.frontmatter.category?.name 
    : typeof post.frontmatter.category === 'string'
      ? post.frontmatter.category
      : undefined

  const categorySlug = typeof post.frontmatter.category === 'object' 
    ? post.frontmatter.category?.slug 
    : post.frontmatter.category

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
  ]

  if (categorySlug) {
    const categoryHref = BLOG_PILLAR_CATEGORIES.includes(categorySlug as (typeof BLOG_PILLAR_CATEGORIES)[number])
      ? `/blog/${categorySlug}`
      : `/blog?category=${categorySlug}`
    breadcrumbItems.push({
      label: categoryName || "Category",
      href: categoryHref,
    })
  }

  breadcrumbItems.push({ label: post.frontmatter.title, href: `/blog/${slug}` })

  // All posts for pagination + related (fetched in parallel above)
  const currentIndex = allPosts.findIndex((p) => p.frontmatter.slug === slug)

  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : undefined
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : undefined

  // Get related blog posts from same category
  const relatedPosts = categorySlug
    ? allPosts
        .filter((p) => {
          if (p.frontmatter.slug === slug) return false
          const cs =
            typeof p.frontmatter.category === 'object'
              ? p.frontmatter.category?.slug
              : p.frontmatter.category
          return (cs || '').toLowerCase() === categorySlug.toLowerCase()
        })
        .slice(0, 4)
    : []

  const blogJsonLd = buildBlogPostingSchema({
    url: `https://moyduz.com/blog/${slug}`,
    title: post.frontmatter.title,
    description: post.frontmatter.meta_description || post.frontmatter.title,
    author: {
      name: post.frontmatter.author_name || 'Moyduz Team',
      url: 'https://moyduz.com/about',
    },
    datePublished: post.frontmatter.published_at,
    dateModified: post.frontmatter.updated_at,
    readTimeMinutes: post.frontmatter.reading_time,
    image: {
      url: featuredImage || `https://moyduz.com/blog/${slug}/opengraph-image`,
      width: 1200,
      height: 630,
    },
  })

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: `https://moyduz.com${item.href}`,
    })),
  }

  const autoFaqs = Array.isArray(post.frontmatter.faqs)
    ? post.frontmatter.faqs as Array<{ question: string; answer: string }>
    : extractFaqFromContent(post.content)

  const faqJsonLd = autoFaqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: autoFaqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null

  // MP3 varsa CDN'den çal (ElevenLabs), yoksa browser TTS
  const audioSrc = post.frontmatter.audio_src as string | undefined
  // Plain text for browser TTS fallback
  const audioText = [post.frontmatter.title, post.content]
    .join('\n\n')
    .replace(/^---[\s\S]*?---\n?/, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`[^`]+`/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  const allSchemas = [blogJsonLd, breadcrumbJsonLd, ...(faqJsonLd ? [faqJsonLd] : [])]

  const keyPoints = post.frontmatter.key_points as string[] | undefined

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(allSchemas) }}
      />
      <div className="container mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        {/* Breadcrumb — / separator like rehber */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-ln-gray-500 dark:text-ln-gray-400">
          <Link href="/" className="hover:text-ln-gray-900 dark:hover:text-white">Ana Sayfa</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-ln-gray-900 dark:hover:text-white">Blog</Link>
          {categorySlug && (
            <>
              <span>/</span>
              <Link
                href={
                  BLOG_PILLAR_CATEGORIES.includes(categorySlug as (typeof BLOG_PILLAR_CATEGORIES)[number])
                    ? `/blog/${categorySlug}`
                    : `/blog?category=${categorySlug}`
                }
                className="hover:text-ln-gray-900 dark:hover:text-white"
              >
                {categoryName || formatCategoryLabel(categorySlug)}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-ln-gray-700 dark:text-ln-gray-300 line-clamp-1">{post.frontmatter.title}</span>
        </nav>

        <article>
          {/* Header — orange "Blog" badge + title + date (rehber style) */}
          <header className="mb-8">
            <div className="mb-3 text-sm font-medium text-ln-orange">
              {categoryName || 'Blog'}
            </div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-ln-gray-900 dark:text-white md:text-4xl">
              {post.frontmatter.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-ln-gray-400 dark:text-ln-gray-500">
              {post.frontmatter.published_at && (
                <time dateTime={post.frontmatter.published_at}>
                  {new Date(post.frontmatter.published_at).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              )}
              {post.frontmatter.updated_at && post.frontmatter.updated_at !== post.frontmatter.published_at && (
                <>
                  <span>·</span>
                  <span>
                    Güncellendi:{' '}
                    {new Date(post.frontmatter.updated_at).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'short',
                    })}
                  </span>
                </>
              )}
              {post.frontmatter.reading_time && (
                <>
                  <span>·</span>
                  <span>{post.frontmatter.reading_time} dk okuma</span>
                </>
              )}
              {post.frontmatter.author_name && (
                <>
                  <span>·</span>
                  <span>{post.frontmatter.author_name}</span>
                </>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {featuredImage && typeof featuredImage === 'string' && (
            <div className="not-prose mb-8 w-full overflow-hidden rounded-2xl">
              <Image
                src={featuredImage}
                alt={post.frontmatter.title}
                width={1200}
                height={630}
                priority
                className="w-full h-auto object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          {/* Summary card — meta_description in quotes + key_points "Öne Çıkanlar" */}
          {(post.frontmatter.meta_description || (keyPoints && keyPoints.length > 0)) && (
            <div className="not-prose mb-6 rounded-2xl border border-ln-gray-200 bg-ln-gray-0 dark:border-ln-gray-800 dark:bg-ln-gray-950 overflow-hidden">
              {post.frontmatter.meta_description && (
                <div className="relative px-6 pt-6 pb-4 border-b border-ln-gray-100 dark:border-ln-gray-800/60">
                  <span className="absolute top-4 left-4 text-5xl leading-none text-ln-orange/20 font-serif select-none" aria-hidden>&ldquo;</span>
                  <p className="relative z-10 pl-5 text-base font-medium italic leading-relaxed text-ln-gray-800 dark:text-ln-gray-200">
                    {post.frontmatter.meta_description}
                  </p>
                  <span className="absolute bottom-3 right-5 text-5xl leading-none text-ln-orange/20 font-serif select-none rotate-180" aria-hidden>&ldquo;</span>
                </div>
              )}
              {keyPoints && keyPoints.length > 0 && (
                <div className="px-6 py-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-ln-orange">Öne Çıkanlar</p>
                  <ul className="space-y-2">
                    {keyPoints.map((point, i) => (
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

          {/* Table of Contents */}
          {tocItems.length > 0 && (
            <div className="not-prose mb-6">
              <TableOfContents items={tocItems} title="Bu Sayfada" />
            </div>
          )}

          {/* AI Summary Buttons */}
          <AiSummaryButtons
            title="Bu yazıyı AI ile özetle"
            url={`https://moyduz.com/blog/${slug}`}
            pageTitle={post.frontmatter.title}
            sections={tocItems.filter(t => t.depth === 2).map(t => t.label)}
          />

          {/* Audio Player */}
          <AudioPlayer src={audioSrc} text={audioText} title={`Dinle: ${post.frontmatter.title}`} />

          {/* Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-ln-orange prose-a:no-underline hover:prose-a:underline">
            <MDXRemote
              source={markdownTablesToHtml(post.content)}
              components={MDXComponents}
              options={mdxRemoteOptions}
            />
          </div>

          {/* FAQ: Her blog detayında otomatik — içerikten ##/### başlık + ilk paragraf; istersen frontmatter.faqs ile ezebilirsin */}
          {(() => {
            const faqs =
              post.frontmatter.faqs && post.frontmatter.faqs.length > 0
                ? post.frontmatter.faqs
                : extractFaqFromContent(post.content)
            if (faqs.length === 0) return null
            return (
              <section className="mt-12 pt-8 border-t border-ln-gray-200 dark:border-ln-gray-800" id="faq">
                <h2 className="text-2xl md:text-3xl font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-6">
                  Sıkça Sorulan Sorular
                </h2>
                <Accordions type="single" className="space-y-2">
                  {faqs.map((faq, idx) => (
                    <Accordion key={idx} title={faq.question} id={idx === 0 ? 'faq' : undefined}>
                      <p className="text-ln-gray-700 dark:text-ln-gray-300 leading-relaxed">{faq.answer}</p>
                    </Accordion>
                  ))}
                </Accordions>
              </section>
            )
          })()}

          {/* Conversion CTA — plandaki "Sitenizi analiz edin" */}
          <section className="mt-12 pt-8 border-t border-ln-gray-200 dark:border-ln-gray-800">
            <div className="rounded-2xl border border-ln-orange/30 dark:border-ln-orange/30 bg-ln-orange/5 dark:bg-ln-orange/10 p-6 md:p-8">
              <h3 className="text-xl font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-2">
                Sitenizi analiz ettirin
              </h3>
              <p className="text-ln-gray-600 dark:text-ln-gray-400 mb-4 max-w-xl">
                E-ticaret altyapınızı, performansı ve büyüme fırsatlarını ücretsiz değerlendirelim. Uzman ekibimiz size özel öneri sunar.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-ln-orange px-5 py-2.5 text-sm font-medium text-white hover:bg-ln-orange/90 transition-colors"
              >
                Ücretsiz analiz talep et
              </Link>
            </div>
          </section>
          
          <ShareArticle title={post.frontmatter.title} />

          {/* Prev/Next Navigation */}
          <div className="mt-10">
            <DocPagination
              prev={
                prevPost
                  ? {
                      title: prevPost.frontmatter.title,
                      href: `/blog/${prevPost.frontmatter.slug}`,
                      description: prevPost.frontmatter.meta_description,
                    }
                  : undefined
              }
              next={
                nextPost
                  ? {
                      title: nextPost.frontmatter.title,
                      href: `/blog/${nextPost.frontmatter.slug}`,
                      description: nextPost.frontmatter.meta_description,
                    }
                  : undefined
              }
            />
          </div>

          {/* Feedback Widget */}
          <div className="mt-8 pt-8 border-t border-ln-gray-200 dark:border-ln-gray-800">
            <FeedbackWidget />
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-12 pt-8 border-t border-ln-gray-200 dark:border-ln-gray-800">
              <h2 className="text-2xl md:text-3xl font-bold text-ln-gray-900 dark:text-ln-gray-0 mb-6">
                İlgili Yazılar
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedPosts.map((relatedPost) => {
                  const relatedImage = relatedPost.frontmatter.featured_image || relatedPost.frontmatter.og_image || (relatedPost.frontmatter.hero_image as string | undefined)
                  return (
                    <Link
                      key={relatedPost.frontmatter.slug}
                      href={`/blog/${relatedPost.frontmatter.slug}`}
                      className="group rounded-xl border border-ln-gray-200 dark:border-ln-gray-800 bg-ln-gray-0 dark:bg-ln-gray-900 overflow-hidden hover:border-ln-gray-300 dark:hover:border-ln-gray-700 transition-all"
                    >
                      {relatedImage && (
                        <div className="w-full aspect-video overflow-hidden bg-ln-gray-200 dark:bg-ln-gray-800">
                          <Image
                            src={relatedImage}
                            alt={relatedPost.frontmatter.title}
                            width={600}
                            height={400}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        {relatedPost.frontmatter.category && (
                          <span className="inline-block px-2 py-1 text-xs font-semibold uppercase tracking-wide text-ln-gray-500 dark:text-ln-gray-400 mb-2">
                            {typeof relatedPost.frontmatter.category === 'object' 
                              ? relatedPost.frontmatter.category.name 
                              : relatedPost.frontmatter.category}
                          </span>
                        )}
                        <h3 className="text-lg font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-2 group-hover:text-ln-orange transition-colors">
                          {relatedPost.frontmatter.title}
                        </h3>
                        {relatedPost.frontmatter.meta_description && (
                          <p className="text-sm text-ln-gray-600 dark:text-ln-gray-400 line-clamp-2">
                            {relatedPost.frontmatter.meta_description}
                          </p>
                        )}
                        <div className="mt-4 flex items-center gap-3 text-xs text-ln-gray-500 dark:text-ln-gray-400">
                          {relatedPost.frontmatter.published_at && (
                            <span>
                              {new Date(relatedPost.frontmatter.published_at).toLocaleDateString('tr-TR', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          )}
                          {relatedPost.frontmatter.reading_time && (
                            <>
                              <span>·</span>
                              <span>{relatedPost.frontmatter.reading_time} dk okuma</span>
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          )}
        </article>
      </div>
    </main>
  )
}
