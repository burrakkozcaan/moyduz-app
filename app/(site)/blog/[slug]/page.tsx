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

  const ogImage = post.frontmatter.featured_image || post.frontmatter.og_image

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
    const posts = await getBlogPostsByCategory(slug)
    const list = posts.map((post) => ({
      slug: post.frontmatter.slug,
      title: post.frontmatter.title,
      meta_description: post.frontmatter.meta_description,
      published_at: post.frontmatter.published_at,
      reading_time: post.frontmatter.reading_time,
      category: post.frontmatter.category,
      author_name: post.frontmatter.author_name,
      excerpt: post.frontmatter.meta_description,
    }))
    const allPosts = await getAllBlogPosts()
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
        title: data.name || formatCategoryLabel(catSlug),
        href: `/blog/${catSlug}`,
        count: data.count,
        badge: catSlug === slug ? 'Aktif' : 'Kategori',
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

  const post = await getBlogPost(slug)
  if (!post) notFound()

  const tocItems = extractTOC(post.content)
  
  // Get featured_image (same as moydus)
  const rawFeaturedImage = post.frontmatter.featured_image || post.frontmatter.og_image
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

  // All posts for pagination + related
  const allPosts = await getAllBlogPosts()
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

  const allSchemas = [blogJsonLd, breadcrumbJsonLd, ...(faqJsonLd ? [faqJsonLd] : [])]

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(allSchemas) }}
      />
      <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-ln-gray-600 dark:text-ln-gray-400">
          {breadcrumbItems.map((item, index) => (
            <span key={index} className="flex items-center gap-2">
              {index > 0 && (
                <svg
                  className="h-4 w-4 text-ln-gray-400 dark:text-ln-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
              <Link
                href={item.href}
                className="transition hover:text-ln-gray-900 dark:hover:text-ln-gray-0"
              >
                {item.label}
              </Link>
            </span>
          ))}
        </nav>

        {/* Featured Image */}
        {featuredImage && (
          <div
            className="relative w-full rounded-2xl overflow-hidden bg-ln-gray-200 dark:bg-ln-gray-800 mb-8"
            style={{ aspectRatio: "16 / 9" }}
          >
            <Image
              src={featuredImage}
              alt={post.frontmatter.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
            />
          </div>
        )}

        <article>
          {/* Header */}
          <header className="space-y-4 border-b border-ln-gray-200 dark:border-ln-gray-800 pb-8 mb-8">
            {post.frontmatter.category && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 bg-ln-gray-900 dark:bg-ln-gray-0 text-ln-gray-0 dark:text-ln-gray-900 text-xs font-semibold uppercase tracking-wide rounded-full">
                  {typeof post.frontmatter.category === 'object' 
                    ? post.frontmatter.category.name 
                    : post.frontmatter.category}
                </span>
              </div>
            )}
            
            <h1 className="text-3xl md:text-4xl font-bold text-ln-gray-900 dark:text-ln-gray-0">
              {post.frontmatter.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-ln-gray-500 dark:text-ln-gray-400">
              {post.frontmatter.published_at && (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Yayınlandı:{' '}
                  {new Date(post.frontmatter.published_at).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              )}
              {post.frontmatter.updated_at && post.frontmatter.updated_at !== post.frontmatter.published_at && (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Güncellendi:{' '}
                  {new Date(post.frontmatter.updated_at).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              )}
              {post.frontmatter.author_name && (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  By {post.frontmatter.author_name}
                </span>
              )}
              {post.frontmatter.reading_time && (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {post.frontmatter.reading_time} min read
                </span>
              )}
            </div>
          </header>

          {/* Table of Contents */}
          {tocItems.length > 0 && (
            <div className="mb-8">
              <TableOfContents items={tocItems} title="Bu sayfada" />
            </div>
          )}

          {/* Summary */}
          {post.frontmatter.snippet && (
            <div className="relative overflow-hidden rounded-xl border border-ln-gray-200 dark:border-ln-gray-800 bg-ln-gray-0 dark:bg-ln-gray-900 p-6  mb-8">
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="h-5 w-5 text-ln-gray-900 dark:text-ln-gray-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-sm font-bold text-ln-gray-900 dark:text-ln-gray-0 uppercase tracking-wide">
                  Özet
                </p>
              </div>
              <p className="text-base text-ln-gray-700 dark:text-ln-gray-300 leading-relaxed font-medium">
                {post.frontmatter.snippet}
              </p>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none
              prose-headings:text-ln-gray-900 dark:prose-headings:text-ln-gray-0 prose-headings:font-semibold prose-headings:tracking-tight
              prose-h1:text-4xl prose-h1:mt-10 prose-h1:mb-6 prose-h1:border-b prose-h1:border-ln-gray-200 dark:prose-h1:border-ln-gray-800 prose-h1:pb-4 prose-h1:text-ln-gray-900 dark:prose-h1:text-ln-gray-0
              prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:mt-8 prose-h2:mb-6 prose-h2:text-ln-gray-900 dark:prose-h2:text-ln-gray-0 prose-h2:font-semibold
              prose-h3:text-2xl prose-h3:md:text-3xl prose-h3:mt-12 prose-h3:mb-4 prose-h3:text-ln-gray-900 dark:prose-h3:text-ln-gray-0 prose-h3:font-semibold
              prose-h4:text-xl prose-h4:md:text-2xl prose-h4:mt-8 prose-h4:mb-3 prose-h4:text-ln-gray-900 dark:prose-h4:text-ln-gray-0 prose-h4:font-semibold
              prose-p:text-ln-gray-700 dark:prose-p:text-ln-gray-300 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-base prose-p:md:text-lg prose-p:mt-0
              prose-a:text-ln-orange prose-a:no-underline hover:prose-a:underline prose-a:font-medium
              prose-strong:text-ln-gray-900 dark:prose-strong:text-ln-gray-0 prose-strong:font-bold
              prose-em:text-ln-gray-600 dark:prose-em:text-ln-gray-400 prose-em:italic
              prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:mt-4 prose-ul:space-y-2
              prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6 prose-ol:mt-4 prose-ol:space-y-2
              prose-li:text-ln-gray-700 dark:prose-li:text-ln-gray-300 prose-li:mb-2 prose-li:leading-relaxed prose-li:pl-1
              prose-blockquote:border-l-4 prose-blockquote:border-ln-orange prose-blockquote:pl-6 prose-blockquote:pr-4 prose-blockquote:py-2 prose-blockquote:italic prose-blockquote:text-ln-gray-600 dark:prose-blockquote:text-ln-gray-400 prose-blockquote:rounded-r-lg prose-blockquote:my-6
              prose-code:bg-ln-gray-100 dark:prose-code:bg-ln-gray-900 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-ln-gray-900 dark:prose-code:text-ln-gray-0 prose-code:before:content-[''] prose-code:after:content-['']
              prose-pre:bg-ln-gray-900 dark:prose-pre:bg-ln-gray-950 prose-pre:text-ln-gray-100 prose-pre:p-5 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:my-6 prose-pre:border prose-pre:border-ln-gray-800
              prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8 prose-img:border prose-img:border-ln-gray-200 dark:prose-img:border-ln-gray-800 prose-img:w-full prose-img:h-auto
              prose-table:w-full prose-table:border-collapse prose-table:mb-0 prose-table:my-0
              prose-th:bg-ln-gray-100 dark:prose-th:bg-ln-gray-900 prose-th:font-bold prose-th:text-left prose-th:p-4 prose-th:border-0 prose-th:text-ln-gray-900 dark:prose-th:text-ln-gray-0 prose-th:text-sm prose-th:uppercase prose-th:tracking-wide
              prose-td:p-4 prose-td:border-0 prose-td:text-ln-gray-700 dark:prose-td:text-ln-gray-300
              prose-tr:border-0 prose-tr:hover:bg-ln-gray-50 dark:prose-tr:hover:bg-ln-gray-900/50
              prose-hr:border-ln-gray-200 dark:prose-hr:border-ln-gray-800 prose-hr:my-8
              [&>p]:mb-6 [&>p]:mt-0
              [&>p+p]:mt-0
              [&>ul]:mb-6 [&>ul]:mt-4
              [&>ol]:mb-6 [&>ol]:mt-4
              [&>h2]:mb-6 [&>h2]:mt-8 [&>h2]:text-3xl [&>h2]:md:text-4xl [&>h2]:font-semibold
              [&>h3]:mb-4 [&>h3]:mt-12 [&>h3]:text-2xl [&>h3]:md:text-3xl [&>h3]:font-semibold
              [&>h4]:mb-3 [&>h4]:mt-8 [&>h4]:text-xl [&>h4]:md:text-2xl [&>h4]:font-semibold
              [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
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
                  const relatedImage = relatedPost.frontmatter.featured_image || relatedPost.frontmatter.og_image
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
                              {new Date(relatedPost.frontmatter.published_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          )}
                          {relatedPost.frontmatter.reading_time && (
                            <>
                              <span>•</span>
                              <span>{relatedPost.frontmatter.reading_time} min read</span>
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
