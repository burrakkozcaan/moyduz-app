import { getPage } from '@/lib/mdx-pages'
import { buildImageObject } from '@/seo/json-ld'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxRemoteOptions } from '@/lib/mdx-remote-options'
import { MDXComponents } from '@/lib/mdx-components'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { AiSummaryButtons } from '@/components/AiSummaryButtons'
import { AudioPlayer } from '@/components/AudioPlayer'
import { TableOfContents } from '@/components/TableOfContents'
import { ShareArticle } from '@/components/ShareArticle'
import { DocPagination } from '@/components/DocPagination'
import { FeedbackWidget } from '@/components/FeedbackWidget'
import { SERVICE_SLUGS } from '@/lib/mdx-pages'
import { getRehberlerForMoneyPage } from '@/lib/seo/internal-link-graph'
import {
  ArrowRight,
  Code,
  Award,
  Globe,
  Clock,
  Palette,
  Smartphone,
  Zap,
  Shield,
  TrendingUp,
  BookOpen,
  BarChart3,
  Cpu,
  Database,
  FileCode,
  Layers,
  Lock,
  Mail,
  MessageSquare,
  Server,
  Settings,
  Target,
  Rocket,
  Headphones,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }))
}

export const dynamicParams = false

type PageParams = { slug: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) return { title: 'Bulunamadı | Moyduz', robots: { index: false } }

  const title = page.frontmatter.title || `${slug} | Moyduz`
  const metaTitle = (page.frontmatter.meta_title as string | undefined) || title
  const description = (page.frontmatter.meta_description as string) || 'Profesyonel dijital hizmetler.'
  const url = (page.frontmatter.canonical_url as string) || `https://moyduz.com/services/${slug}`
  const ogImage = page.frontmatter.hero_image as string | undefined

  return {
    title: `${metaTitle} | Moyduz`,
    description,
    keywords: page.frontmatter.keywords as string[] | undefined,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      locale: 'tr_TR',
      siteName: 'Moyduz',
      publishedTime: page.frontmatter.datePublished as string | undefined,
      modifiedTime: (page.frontmatter.dateModified || page.frontmatter.datePublished) as string | undefined,
      authors: ['Moyduz Team'],
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  Award,
  Globe,
  Clock,
  Palette,
  Smartphone,
  Zap,
  Shield,
  TrendingUp,
  BookOpen,
  BarChart3,
  Cpu,
  Database,
  FileCode,
  Layers,
  Lock,
  Mail,
  MessageSquare,
  Server,
  Settings,
  Target,
  Rocket,
  Headphones,
  CheckCircle2,
  Sparkles,
}

const relatedServiceIcons = [
  ArrowRight,
  FileCode,
  Globe,
  Rocket,
  Target,
  Zap,
  Layers,
  Server,
]

const fallbackIcons = [
  Code,
  Zap,
  Shield,
  Rocket,
  Target,
  Cpu,
  Sparkles,
  Layers,
  BarChart3,
  CheckCircle2,
]

export default async function ServiceSlugPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) notFound()

  const { frontmatter, content } = page

  // Legacy ServicePageLayout specific variables/extraction
  const hero = (frontmatter.hero as any) || {
    title: frontmatter.title,
    subtitle: '',
    description: frontmatter.meta_description || '',
  }
  const baseFooterLinks = Array.isArray(frontmatter.footer_links)
    ? (frontmatter.footer_links as Array<{ text: string; href: string }>)
    : []
  const footerLinks =
    baseFooterLinks.length > 0 &&
    !baseFooterLinks.some(
      (link) =>
        link.href?.replace(/\/+$/, '') === 'https://docs.moyduz.com' ||
        link.text?.toLowerCase() === 'dokümantasyon'
    )
      ? [...baseFooterLinks, { text: 'Dokümantasyon', href: 'https://docs.moyduz.com' }]
      : baseFooterLinks
  const pagePath = `/services/${slug}` // If needed for internal link graph / Rehberler
  const rehberler = getRehberlerForMoneyPage(pagePath)

  // JSON-LD schemas
  const heroImage = (hero.image || frontmatter.hero_image) as string | undefined
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.meta_description,
    url: `https://moyduz.com/services/${slug}`,
    datePublished: frontmatter.datePublished,
    dateModified: frontmatter.dateModified || frontmatter.datePublished,
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
      { '@type': 'ListItem', position: 2, name: 'Hizmetler', item: 'https://moyduz.com/services' },
      { '@type': 'ListItem', position: 3, name: frontmatter.title, item: `https://moyduz.com/services/${slug}` },
    ],
  }

  // Auto-extract FAQs from ## headings + first paragraph if not present in frontmatter
  const faqItems: Array<{ question: string; answer: string }> = []
  if (frontmatter.faqs && Array.isArray(frontmatter.faqs)) {
    frontmatter.faqs.forEach((f: { question: string; answer: string }) => {
      faqItems.push(f)
    })
  } else {
    // Basic extraction if needed
    const lines = content.split('\n')
    for (let i = 0; i < lines.length; i++) {
      const h = lines[i].match(/^#{2,3}\s+(.+)$/)
      if (h) {
        const question = h[1].replace(/\*\*/g, '').trim()
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

  // Prev/Next Pagination
  // Note: we can use SERVICE_SLUGS from lib/mdx-pages to figure out next/prev in the array.
  const currentIndex = SERVICE_SLUGS.findIndex((s) => s === slug)
  const prevSlug = currentIndex < SERVICE_SLUGS.length - 1 ? SERVICE_SLUGS[currentIndex + 1] : undefined
  const nextSlug = currentIndex > 0 ? SERVICE_SLUGS[currentIndex - 1] : undefined

  let prevPost, nextPost
  if (prevSlug) {
    const p = await getPage(prevSlug)
    if (p) prevPost = p
  }
  if (nextSlug) {
    const n = await getPage(nextSlug)
    if (n) nextPost = n
  }

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
          <Link href="/services" className="hover:text-ln-gray-900 dark:hover:text-white">Hizmetler</Link>
          <span>/</span>
          <span className="text-ln-gray-700 dark:text-ln-gray-300">{frontmatter.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="mb-3 text-sm font-medium text-ln-orange">Hizmet</div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-ln-gray-900 dark:text-white md:text-4xl">
            {hero.title}
          </h1>
          {hero.subtitle && (
            <h2 className="mt-2 text-xl font-medium text-ln-gray-700 dark:text-ln-gray-300">
              {hero.subtitle}
            </h2>
          )}
          {hero.description && (
            <p className="mt-4 text-lg text-ln-gray-600 dark:text-ln-gray-400">
              {hero.description}
            </p>
          )}
          <div className="mt-4 flex items-center gap-3 text-sm text-ln-gray-400 dark:text-ln-gray-500">
            {frontmatter.datePublished && (
              <time dateTime={frontmatter.datePublished as string}>
                {new Date(frontmatter.datePublished as string).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}
            {frontmatter.dateModified && frontmatter.dateModified !== frontmatter.datePublished && (
              <>
                <span>·</span>
                <span>
                  Güncellendi:{' '}
                  {new Date(frontmatter.dateModified as string).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'short',
                  })}
                </span>
              </>
            )}
            {(!frontmatter.datePublished && !frontmatter.dateModified) && (
              <span>Moyduz Ekibi</span>
            )}
          </div>

          {(hero.cta_primary || hero.cta_secondary) && (
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {hero.cta_primary && (
                <Link
                  href={hero.cta_primary.href}
                  className="bg-ln-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-ln-orange/90 transition-colors inline-flex items-center justify-center gap-2"
                >
                  {hero.cta_primary.text}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              {hero.cta_secondary && (
                <Link
                  href={hero.cta_secondary.href}
                  className="border border-ln-gray-300 dark:border-ln-gray-700 text-ln-gray-900 dark:text-white px-8 py-3 rounded-full font-semibold hover:border-ln-gray-400 dark:hover:border-ln-gray-600 transition-colors inline-flex items-center justify-center gap-2"
                >
                  {hero.cta_secondary.text}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          )}
        </header>

        {/* Hero image */}
        {heroImage && (
          <div className="not-prose mb-8 w-full overflow-hidden rounded-2xl">
            <Image
              src={heroImage}
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
        {((frontmatter.meta_description || frontmatter.summary) || (frontmatter.key_points && (frontmatter.key_points as any[]).length > 0)) && (
          <div className="not-prose mb-6 rounded-2xl border border-ln-gray-200 bg-ln-gray-0 dark:border-ln-gray-800 dark:bg-ln-gray-950 overflow-hidden">
            {(frontmatter.summary || frontmatter.meta_description) && (
              <div className="relative px-6 pt-6 pb-4 border-b border-ln-gray-100 dark:border-ln-gray-800/60">
                <span className="absolute top-4 left-4 text-5xl leading-none text-ln-orange/20 font-serif select-none" aria-hidden>"</span>
                <p className="relative z-10 pl-5 text-base font-medium italic leading-relaxed text-ln-gray-800 dark:text-ln-gray-200">
                  {frontmatter.summary || frontmatter.meta_description}
                </p>
                <span className="absolute bottom-3 right-5 text-5xl leading-none text-ln-orange/20 font-serif select-none rotate-180" aria-hidden>"</span>
              </div>
            )}
            {frontmatter.key_points && (frontmatter.key_points as any[]).length > 0 && (
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
          let headings: { id: string, label: string, depth: number }[] = []
          if (frontmatter.toc && Array.isArray(frontmatter.toc) && frontmatter.toc.length > 0) {
            headings = frontmatter.toc.map((t: any) => ({
              id: t.id,
              label: t.label,
              depth: 2
            }))
          } else {
            headings = [...content.matchAll(/^## (.+)$/gm)].map(m => ({
              id: m[1].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
              label: m[1].replace(/\*\*/g, '').trim(),
              depth: 2,
            }))
          }

          return headings.length > 0 ? (
            <div className="not-prose mb-6">
              <TableOfContents items={headings} title="Bu Sayfada" />
            </div>
          ) : null
        })()}

        {/* AI Summary + Audio */}
        <AiSummaryButtons
          title="Bu hizmeti AI ile özetle"
          url={`https://moyduz.com/services/${slug}`}
          pageTitle={frontmatter.title}
          sections={
            [...content.matchAll(/^## (.+)$/gm)].map(m => m[1].replace(/\*\*/g, '').trim())
          }
        />

        {/* Audio player */}
        <AudioPlayer
          src={audioSrc}
          text={audioText}
          title={`Dinle: ${frontmatter.title}`}
        />

        {/* MDX Content */}
        <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-ln-orange prose-a:no-underline hover:prose-a:underline mt-8">
          <MDXRemote
            source={content}
            options={mdxRemoteOptions}
            components={{
              ...MDXComponents,
            }}
          />
        </article>

        {/* Features Grid */}
        {frontmatter.features && (frontmatter.features as any[]).length > 0 && (
          <div id="features" className="mt-16 pt-8 border-t border-ln-gray-200 dark:border-ln-gray-800">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-ln-gray-900 dark:text-white">
              Neden Bizi Tercih Etmelisiniz?
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {(frontmatter.features as any[]).map((feature, index) => {
                const Icon =
                  (feature.icon && iconMap[feature.icon]) || fallbackIcons[index % fallbackIcons.length]
                return (
                  <div key={index} className="flex flex-col">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-ln-gray-900 dark:bg-ln-gray-0 text-white dark:text-ln-gray-900">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-ln-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-ln-gray-600 dark:text-ln-gray-400 text-base">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {faqItems && faqItems.length > 0 && (
          <div className="mt-16 pt-8 border-t border-ln-gray-200 dark:border-ln-gray-800 mb-8">
            <h2
              id="faq"
              className="text-2xl font-semibold text-ln-gray-900 dark:text-white mb-6"
            >
              Sık Sorulan Sorular
            </h2>
            <div className="space-y-4">
              {faqItems.map((faq, idx) => (
                <details
                  key={idx}
                  className="rounded-xl border border-ln-gray-200 dark:border-ln-gray-800 bg-ln-gray-0 dark:bg-ln-gray-900 p-4"
                >
                  <summary className="cursor-pointer font-medium text-ln-gray-900 dark:text-white">
                    {faq.question}
                  </summary>
                  <p className="mt-2 text-sm text-ln-gray-600 dark:text-ln-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* Rehberler Semantic Loop */}
        {rehberler && rehberler.length > 0 && (
          <div className="mt-16 mb-8 pt-8 border-t border-ln-gray-200 dark:border-ln-gray-800">
            <h2 className="text-2xl font-semibold mb-6 text-ln-gray-900 dark:text-white flex items-center gap-2">
              <BookOpen className="size-6 text-ln-orange" />
              Rehberler
            </h2>
            <div className="flex flex-wrap gap-3">
              {rehberler.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg border border-ln-gray-200 dark:border-ln-gray-800 bg-ln-gray-50 dark:bg-ln-gray-900 px-4 py-2.5 text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300 hover:border-ln-orange hover:text-ln-orange transition-colors"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        )}


        {/* Share Article */}
        <div className="mt-12">
          <ShareArticle title={frontmatter.title} />
        </div>

        {/* Prev/Next Pagination */}
        <div className="mt-10">
          <DocPagination
            prev={
              prevPost
                ? {
                  title: prevPost.frontmatter.title,
                  href: `/services/${prevPost.frontmatter.slug}`,
                  description: prevPost.frontmatter.meta_description,
                }
                : undefined
            }
            next={
              nextPost
                ? {
                  title: nextPost.frontmatter.title,
                  href: `/services/${nextPost.frontmatter.slug}`,
                  description: nextPost.frontmatter.meta_description,
                }
                : undefined
            }
          />
        </div>

        {/* İlgili Hizmetler */}
        {frontmatter.related_services && (frontmatter.related_services as any[]).length > 0 && (
          <section className="mt-16 pt-8 border-t border-ln-gray-200 dark:border-ln-gray-800">
            <h2 className="text-2xl font-semibold text-ln-gray-900 dark:text-white mb-6">
              İlgili Hizmetler ve Kaynaklar
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {(frontmatter.related_services as any[]).map((item, index) => {
                const RelatedIcon = relatedServiceIcons[index % relatedServiceIcons.length]
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className="group rounded-xl border border-ln-gray-200 dark:border-ln-gray-800 bg-ln-gray-0 dark:bg-ln-gray-900 p-6 hover:border-ln-gray-300 dark:hover:border-ln-gray-700 transition-colors block"
                  >
                    <div className="flex items-center gap-2 text-ln-orange mb-3">
                      <RelatedIcon className="size-5" />
                    </div>
                    <div className="p-0">
                      <h3 className="text-base font-semibold text-ln-gray-900 dark:text-white mb-2 group-hover:text-ln-orange transition-colors">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-ln-gray-600 dark:text-ln-gray-400 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* CTA Banner */}
        <div className="mt-16 rounded-2xl border border-ln-gray-200 dark:border-ln-gray-800 bg-ln-gray-0 dark:bg-ln-gray-900 p-8 md:p-12 text-center shadow-sm">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-ln-gray-900 dark:text-white">
            Projene Başlamaya Hazır mısın?
          </h2>
          <p className="text-ln-gray-600 dark:text-ln-gray-400 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Ölçülebilir sonuç üreten çözümleri birlikte hayata geçirelim.
            Net takvim ve şeffaf süreçle ilerleyelim.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-ln-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-ln-orange/90 transition-colors inline-flex items-center justify-center gap-2"
            >
              Projeni Başlat
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Feedback */}
        <div className="mt-16 pt-8 border-t border-ln-gray-200 dark:border-ln-gray-800">
          <FeedbackWidget />
        </div>

        {/* Footer Links (Extra related links) */}
        {footerLinks.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-4 text-sm justify-center">
            {footerLinks.map((link, idx) => (
              <span key={idx} className="flex items-center gap-4">
                {idx > 0 && (
                  <span className="text-ln-gray-400 dark:text-ln-gray-500">
                    |
                  </span>
                )}
                <Link
                  href={link.href}
                  className="text-ln-gray-600 dark:text-ln-gray-400 hover:text-ln-gray-900 dark:hover:text-white transition-colors"
                >
                  {link.text}
                </Link>
              </span>
            ))}
          </div>
        )}

        {/* Back link */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-ln-gray-600 hover:text-ln-gray-900 dark:text-ln-gray-400 dark:hover:text-white group"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span> Tüm Hizmetler
          </Link>
        </div>

      </div>
    </main>
  )
}
