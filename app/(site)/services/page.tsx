import Link from 'next/link'
import type { Metadata } from 'next'
import { getPage, SERVICE_SLUGS, type ServiceSlug } from '@/lib/mdx-pages'

export const metadata: Metadata = {
  title: 'Hizmetler — Web Tasarım, E-Ticaret & Yazılım | Moyduz',
  description:
    'Web tasarım, e-ticaret platformu geliştirme, özel yazılım ve dijital pazarlama hizmetleri. Moyduz ile projenizi hayata geçirin.',
  keywords: [
    'web tasarım hizmeti',
    'web geliştirme şirketi',
    'e-ticaret sitesi yapımı',
    'özel yazılım geliştirme',
    'kurumsal web sitesi',
    'SaaS geliştirme',
  ],
  alternates: { canonical: 'https://moyduz.com/services' },
  openGraph: {
    title: 'Hizmetler | Moyduz',
    description:
      'Web tasarım, web geliştirme, e-ticaret ve özel yazılım hizmetleri için kapsamlı servis sayfaları.',
    url: 'https://moyduz.com/services',
    locale: 'tr_TR',
    siteName: 'Moyduz',
    images: [{ url: 'https://moyduz.com/opengraph-image', width: 1200, height: 630, alt: 'Moyduz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hizmetler — Web Tasarım, E-Ticaret & Yazılım | Moyduz',
    description: 'Web tasarım, e-ticaret platformu geliştirme, özel yazılım ve dijital pazarlama hizmetleri.',
    images: ['https://moyduz.com/opengraph-image'],
  },
}

export const dynamic = 'force-static'

type ServiceListItem = {
  slug: string
  title: string
  description: string
  keyword: string
  updatedAt?: string
}

const SERVICE_COPY: Record<
  ServiceSlug,
  {
    title: string
    description: string
    keyword: string
  }
> = {
  'web-design': {
    title: 'Web Tasarım',
    description:
      'Marka kimliğinize uygun, dönüşüm odaklı ve modern web arayüzleri tasarlıyoruz.',
    keyword: 'web tasarım hizmeti',
  },
  'web-design-agency': {
    title: 'Web Tasarım Ajansı',
    description:
      'Strateji, UX ve görsel tasarımı birleştirerek uçtan uca ajans hizmeti sunuyoruz.',
    keyword: 'web tasarım ajansı',
  },
  'web-design-company': {
    title: 'Web Tasarım Şirketi',
    description:
      'Kurumsal siteler ve büyüme odaklı dijital deneyimler için profesyonel tasarım çözümleri.',
    keyword: 'web tasarım şirketi',
  },
  'web-development-company': {
    title: 'Web Geliştirme Şirketi',
    description:
      'Yüksek performanslı, ölçeklenebilir ve güvenli web uygulamaları geliştiriyoruz.',
    keyword: 'web geliştirme şirketi',
  },
  'ecommerce-website-development': {
    title: 'E-Ticaret Site Geliştirme',
    description:
      'Satış artıran e-ticaret altyapıları, ödeme-kargo entegrasyonları ve operasyon çözümleri.',
    keyword: 'e-ticaret sitesi yapımı',
  },
  'software-company': {
    title: 'Yazılım Şirketi',
    description:
      'İş süreçlerinize özel SaaS, otomasyon ve özel yazılım çözümleri geliştiriyoruz.',
    keyword: 'özel yazılım geliştirme',
  },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function ServicesPage() {
  const services = (
    await Promise.all(
      SERVICE_SLUGS.map(async (slug) => {
        const page = await getPage(slug)
        if (!page) return null

        const frontmatter = page.frontmatter
        const copy = SERVICE_COPY[slug]
        return {
          slug,
          title: copy.title,
          description: copy.description,
          keyword: copy.keyword,
          updatedAt:
            (frontmatter.dateModified as string | undefined) ||
            (frontmatter.datePublished as string | undefined),
        } satisfies ServiceListItem
      })
    )
  ).filter((service): service is ServiceListItem => service !== null)

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Moyduz Hizmetleri',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.title,
      url: `https://moyduz.com/services/${service.slug}`,
    })),
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <div className="mb-12">
        <p className="text-sm font-medium text-ln-orange">Hizmetler</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ln-gray-900 dark:text-white md:text-4xl">
          Kapsamlı Hizmet Sayfaları
        </h1>
        <p className="mt-4 text-lg text-ln-gray-600 dark:text-ln-gray-400">
          Web tasarım, yazılım geliştirme ve e-ticaret çözümlerimiz için SEO odaklı servis sayfalarını inceleyin.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group flex flex-col rounded-2xl border border-ln-gray-200 bg-white p-6 transition-all hover:border-ln-gray-300 hover:shadow-md dark:border-ln-gray-800 dark:bg-ln-gray-950 dark:hover:border-ln-gray-700"
          >
            <span className="inline-flex w-fit items-center rounded-full bg-ln-orange/10 px-2.5 py-1 text-xs font-medium text-ln-orange">
              Anahtar Kelime: {service.keyword}
            </span>
            <h2 className="text-lg font-semibold leading-snug text-ln-gray-900 group-hover:text-ln-orange dark:text-white dark:group-hover:text-ln-orange">
              {service.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ln-gray-600 dark:text-ln-gray-400">
              {service.description}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <time
                dateTime={service.updatedAt}
                className="text-xs text-ln-gray-400 dark:text-ln-gray-500"
              >
                {service.updatedAt ? formatDate(service.updatedAt) : 'Moyduz'}
              </time>
              <span className="inline-flex items-center rounded-lg bg-ln-orange px-3 py-1.5 text-xs font-semibold text-white transition group-hover:bg-ln-orange/90">
                Detayı Gör
              </span>
            </div>
          </Link>
        ))}
      </div>

      {services.length === 0 && (
        <p className="text-center text-ln-gray-500">Yakında hizmet sayfaları yayınlanacak.</p>
      )}

      <div className="mt-10 flex justify-center">
        <Link
          href="/contact"
          className="inline-flex items-center rounded-xl bg-ln-orange px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ln-orange/90"
        >
          Projeyi Konuşalım
        </Link>
      </div>
    </main>
  )
}
