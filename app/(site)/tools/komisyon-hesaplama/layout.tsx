import type { Metadata } from 'next'
import { buildWebApplicationToolSchema } from '@/seo/json-ld/index'

export const metadata: Metadata = {
  title: 'Marketplace Komisyon Hesaplama | Moyduz Araçları',
  description:
    'Trendyol, Hepsiburada, Amazon ve diğer pazaryerlerindeki gerçek kar marjınızı hesaplayın. Komisyon, KDV ve kargo dahil net kâr analizi.',
  keywords: [
    'komisyon hesaplama',
    'trendyol komisyon',
    'marketplace komisyon',
    'kar marjı hesaplama',
    'pazaryeri komisyonu',
  ],
  alternates: {
    canonical: 'https://moyduz.com/tools/komisyon-hesaplama',
  },
  openGraph: {
    title: 'Marketplace Komisyon Hesaplama | Moyduz',
    description: 'Trendyol, Hepsiburada ve diğer pazaryerlerinde gerçek kar marjınızı hesaplayın.',
    url: 'https://moyduz.com/tools/komisyon-hesaplama',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Moyduz',
    images: [{ url: 'https://moyduz.com/opengraph-image', width: 1200, height: 630, alt: 'Marketplace Komisyon Hesaplama | Moyduz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketplace Komisyon Hesaplama | Moyduz',
    description: 'Trendyol, Hepsiburada ve diğer pazaryerlerinde gerçek kar marjınızı hesaplayın.',
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
