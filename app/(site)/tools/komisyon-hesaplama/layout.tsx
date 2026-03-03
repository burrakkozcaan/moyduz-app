import type { Metadata } from 'next'
import { buildWebApplicationToolSchema } from '@/seo/json-ld/index'

export const metadata: Metadata = {
  title: 'Trendyol Komisyon Hesaplama — Pazaryeri Net Kâr Analizi | Moyduz',
  description:
    'Trendyol komisyon hesaplama aracı: satış fiyatı, maliyet ve kargo girerek net kârınızı anında görün. Hepsiburada, Amazon TR ve diğer pazaryerleri de dahil.',
  keywords: [
    'trendyol komisyon hesaplama',
    'trendyol komisyon oranı',
    'trendyol kar hesaplama',
    'pazaryeri komisyon hesaplama',
    'komisyon hesaplama',
    'trendyol net kar',
    'hepsiburada komisyon',
    'marketplace komisyon',
  ],
  alternates: {
    canonical: 'https://moyduz.com/tools/komisyon-hesaplama',
  },
  openGraph: {
    title: 'Trendyol Komisyon Hesaplama — Net Kâr Analizi | Moyduz',
    description: 'Trendyol komisyon, KDV ve kargo dahil net kârınızı anında hesaplayın. Hepsiburada ve Amazon TR de dahil.',
    url: 'https://moyduz.com/tools/komisyon-hesaplama',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Moyduz',
    images: [{ url: 'https://moyduz.com/opengraph-image', width: 1200, height: 630, alt: 'Trendyol Komisyon Hesaplama | Moyduz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trendyol Komisyon Hesaplama — Net Kâr Analizi | Moyduz',
    description: 'Trendyol komisyon, KDV ve kargo dahil net kârınızı anında hesaplayın.',
    images: ['https://moyduz.com/opengraph-image'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebApplicationToolSchema({
    name: 'Marketplace Komisyon Hesaplama',
    description: 'Trendyol, Hepsiburada, Amazon ve diğer pazaryerlerindeki gerçek kar marjınızı hesaplayın. Komisyon, KDV ve kargo dahil net kâr analizi.',
    url: 'https://moyduz.com/tools/komisyon-hesaplama',
  })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  )
}
