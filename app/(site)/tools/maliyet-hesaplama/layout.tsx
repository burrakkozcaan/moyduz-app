import type { Metadata } from 'next'
import { buildWebApplicationToolSchema } from '@/seo/json-ld/index'

export const metadata: Metadata = {
  title: 'E-Ticaret Maliyet Hesaplama | Moyduz Araçları',
  description:
    'Platform maliyetlerinizi hesaplayın. Shopify, ikas ve WooCommerce ile özel yazılım maliyetlerini karşılaştırın. Ücretsiz hesaplama aracı.',
  keywords: [
    'e-ticaret maliyet hesaplama',
    'shopify maliyet',
    'e-ticaret platform maliyeti',
    'özel yazılım maliyet hesabı',
  ],
  alternates: {
    canonical: 'https://moyduz.com/tools/maliyet-hesaplama',
  },
  openGraph: {
    title: 'E-Ticaret Maliyet Hesaplama | Moyduz',
    description: 'Platform maliyetlerinizi hesaplayın ve özel yazılımla ne kadar tasarruf edeceğinizi görün.',
    url: 'https://moyduz.com/tools/maliyet-hesaplama',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Moyduz',
    images: [{ url: 'https://moyduz.com/opengraph-image', width: 1200, height: 630, alt: 'E-Ticaret Maliyet Hesaplama | Moyduz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Ticaret Maliyet Hesaplama | Moyduz',
    description: 'Platform maliyetlerinizi hesaplayın ve özel yazılımla ne kadar tasarruf edeceğinizi görün.',
    images: ['https://moyduz.com/opengraph-image'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebApplicationToolSchema({
    name: 'E-Ticaret Maliyet Hesaplama',
    description: 'Platform maliyetlerinizi hesaplayın. Shopify, ikas ve WooCommerce ile özel yazılım maliyetlerini karşılaştırın.',
    url: 'https://moyduz.com/tools/maliyet-hesaplama',
  })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  )
}
