'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Code, Award, Globe, Clock, Palette, Smartphone, Zap, Shield, TrendingUp, BookOpen } from 'lucide-react'
import { TableOfContents } from '@/components/TableOfContents'
import { ShareArticle } from '@/components/ShareArticle'
import { getRehberlerForMoneyPage } from '@/lib/seo/internal-link-graph'

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
}

interface ServicePageLayoutProps {
  frontmatter: {
    title: string
    meta_description?: string
    hero?: {
      title: string
      subtitle: string
      description: string
      cta_primary?: { text: string; href: string }
      cta_secondary?: { text: string; href: string }
      image?: string
    }
    faqs?: Array<{ question: string; answer: string }>
    toc?: Array<{ id: string; label: string }>
    summary?: string
    related_services?: Array<{ title: string; description: string; href: string }>
    footer_links?: Array<{ text: string; href: string }>
    features?: Array<{ icon: string; title: string; description: string }>
    datePublished?: string
    dateModified?: string
  }
  mdxContent: React.ReactNode
  /** Money page path (e.g. /ozel-e-ticaret) – enables Rehberler section from internal link graph */
  moneyPagePath?: string
}

export function ServicePageLayout({
  frontmatter,
  mdxContent,
  moneyPagePath,
}: ServicePageLayoutProps) {
  const rehberler = moneyPagePath ? getRehberlerForMoneyPage(moneyPagePath) : []
  const hero = frontmatter.hero || {
    title: frontmatter.title,
    subtitle: '',
    description: frontmatter.meta_description || '',
  }

  return (
    <section className="min-h-screen bg-ln-gray-25 dark:bg-ln-gray-950 text-ln-gray-900 dark:text-ln-gray-0 px-4 md:px-7 py-10 md:py-16 lg:py-20">
      <div className=" mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="text-center pt-8 md:pt-12 mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-ln-gray-900 dark:text-ln-gray-0">
            {hero.title}
            {hero.subtitle && (
              <>
                <br />
                <span className="text-ln-gray-600 dark:text-ln-gray-400">
                  {hero.subtitle}
                </span>
              </>
            )}
          </h1>
          {hero.description && (
            <p className="text-ln-gray-600 dark:text-ln-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
              {hero.description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                className="border border-ln-gray-300 dark:border-ln-gray-700 text-ln-gray-900 dark:text-ln-gray-0 px-8 py-3 rounded-full font-semibold hover:border-ln-gray-400 dark:hover:border-ln-gray-600 transition-colors inline-flex items-center justify-center gap-2"
              >
                {hero.cta_secondary.text}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Featured Image */}
        {hero.image && (
          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-ln-gray-200 dark:bg-ln-gray-800 mb-8 md:mb-12">
            <Image
              src={hero.image}
              alt={frontmatter.title}
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              priority
              quality={90}
              sizes="(max-width: 768px) 100vw, 1920px"
            />
          </div>
        )}

        {/* Article Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-ln-gray-500 dark:text-ln-gray-400 mb-12 border-b border-ln-gray-200 dark:border-ln-gray-800 pb-8">
          {frontmatter.datePublished && (
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
              Yayınlandı{' '}
              {new Date(frontmatter.datePublished).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          )}
          {frontmatter.dateModified && (
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
              Güncellendi{' '}
              {new Date(frontmatter.dateModified).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          )}
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
            Moyduz Ekibi
          </span>
        </div>

        {/* Main Content Section */}
        <div className="mb-20 max-w-4xl mx-auto">
          {frontmatter.toc && frontmatter.toc.length > 0 && (
            <TableOfContents items={frontmatter.toc} title="Bu sayfada" />
          )}

          {frontmatter.summary && (
            <div className="relative overflow-hidden rounded-xl border border-ln-gray-200 dark:border-ln-gray-800 bg-ln-gray-0 dark:bg-ln-gray-900 p-6 shadow-sm my-8">
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
                {frontmatter.summary}
              </p>
            </div>
          )}

          <div
            className="prose prose-lg max-w-none
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
              prose-table:w-full prose-table:border-collapse prose-table:mb-6 prose-table:rounded-lg prose-table:overflow-hidden prose-table:my-6
              prose-th:bg-ln-gray-100 dark:prose-th:bg-ln-gray-900 prose-th:font-bold prose-th:text-left prose-th:p-4 prose-th:border prose-th:border-ln-gray-200 dark:prose-th:border-ln-gray-800 prose-th:text-ln-gray-900 dark:prose-th:text-ln-gray-0 prose-th:text-sm prose-th:uppercase prose-th:tracking-wide
              prose-td:p-4 prose-td:border prose-td:border-ln-gray-200 dark:prose-td:border-ln-gray-800 prose-td:text-ln-gray-700 dark:prose-td:text-ln-gray-300
              prose-hr:border-ln-gray-200 dark:prose-hr:border-ln-gray-800 prose-hr:my-8
              [&>p]:mb-6 [&>p]:mt-0
              [&>p+p]:mt-0
              [&>ul]:mb-6 [&>ul]:mt-4
              [&>ol]:mb-6 [&>ol]:mt-4
              [&>h2]:mb-6 [&>h2]:mt-8 [&>h2]:text-3xl [&>h2]:md:text-4xl [&>h2]:font-semibold
              [&>h3]:mb-4 [&>h3]:mt-12 [&>h3]:text-2xl [&>h3]:md:text-3xl [&>h3]:font-semibold
              [&>h4]:mb-3 [&>h4]:mt-8 [&>h4]:text-xl [&>h4]:md:text-2xl [&>h4]:font-semibold
              [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
          >
            {mdxContent}
          </div>
          <ShareArticle title={frontmatter.title} />
        </div>

        {/* Features Grid */}
        {frontmatter.features && frontmatter.features.length > 0 && (
          <div id="features" className="mb-20">
            <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-ln-gray-900 dark:text-ln-gray-0 text-center">
              Neden Bizi Tercih Etmelisiniz?
            </h2>
            <div className="grid gap-10 md:grid-cols-2 px-2">
              {frontmatter.features.map((feature, index) => {
                const Icon = iconMap[feature.icon] || Code
                return (
                  <div key={index} className="flex flex-col">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-ln-gray-900 dark:bg-ln-gray-0 text-ln-gray-0 dark:text-ln-gray-900">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="mb-3 mt-2 text-xl md:text-2xl font-semibold text-ln-gray-900 dark:text-ln-gray-0">
                      {feature.title}
                    </h3>
                    <p className="text-ln-gray-600 dark:text-ln-gray-400 text-base md:text-lg">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {frontmatter.faqs && frontmatter.faqs.length > 0 && (
          <div className="mb-20">
            <div className="max-w-4xl mx-auto space-y-4 border-t border-ln-gray-200 dark:border-ln-gray-800 pt-10">
              <h2
                id="faq"
                className="text-2xl font-semibold text-ln-gray-900 dark:text-ln-gray-0"
              >
                Sık Sorulan Sorular
              </h2>
              <div className="space-y-4">
                {frontmatter.faqs.map((faq, idx) => (
                  <details
                    key={idx}
                    className="rounded-xl border border-ln-gray-200 dark:border-ln-gray-800 bg-ln-gray-0 dark:bg-ln-gray-900 p-4"
                  >
                    <summary className="cursor-pointer font-medium text-ln-gray-900 dark:text-ln-gray-0">
                      {faq.question}
                    </summary>
                    <p className="mt-2 text-sm text-ln-gray-600 dark:text-ln-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Rehberler (Money → Blog internal link, semantic loop) */}
        {rehberler.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-ln-gray-900 dark:text-ln-gray-0 flex items-center gap-2">
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

        {/* CTA Section */}
        <div className="rounded-2xl border border-ln-gray-200 dark:border-ln-gray-800 bg-ln-gray-0 dark:bg-ln-gray-900 p-8 md:p-12 text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-ln-gray-900 dark:text-ln-gray-0">
            Projene Başlamaya Hazır mısın?
          </h2>
          <p className="text-ln-gray-600 dark:text-ln-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Ölçülebilir sonuç üreten çözümleri birlikte hayata geçirelim.
            Net takvim ve şeffaf süreçle ilerleyelim.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
              href="/contact"
              className="bg-ln-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-ln-orange/90 transition-colors inline-block"
            >
              Projeni Başlat
            </Link>
          </div>
        </div>

        {/* İlgili Hizmetler */}
        {frontmatter.related_services &&
          frontmatter.related_services.length > 0 && (
            <div className="mb-20">
                <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-ln-gray-900 dark:text-ln-gray-0 text-center">
                İlgili Hizmetler ve Kaynaklar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {frontmatter.related_services.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="rounded-xl border border-ln-gray-200 dark:border-ln-gray-800 bg-ln-gray-0 dark:bg-ln-gray-900 p-6 hover:border-ln-gray-300 dark:hover:border-ln-gray-700 transition-colors block"
                  >
                    <h3 className="text-lg font-semibold mb-2 text-ln-gray-900 dark:text-ln-gray-0">
                      {item.title}
                    </h3>
                    <p className="text-ln-gray-600 dark:text-ln-gray-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

        {/* Footer Links */}
        {frontmatter.footer_links &&
          frontmatter.footer_links.length > 0 && (
            <div className="mt-16 pt-8 border-t border-ln-gray-200 dark:border-ln-gray-800 flex flex-wrap gap-4 text-sm justify-center">
              {frontmatter.footer_links.map((link, idx) => (
                <span key={idx} className="flex items-center gap-4">
                  {idx > 0 && (
                    <span className="text-ln-gray-400 dark:text-ln-gray-500">
                      |
                    </span>
                  )}
                  <Link
                    href={link.href}
                    className="text-ln-gray-600 dark:text-ln-gray-400 hover:text-ln-gray-900 dark:hover:text-ln-gray-0 transition-colors"
                  >
                    {link.text}
                  </Link>
                </span>
              ))}
            </div>
          )}
      </div>
    </section>
  )
}
