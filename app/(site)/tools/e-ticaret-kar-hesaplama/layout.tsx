import type { Metadata } from 'next'
import { buildWebApplicationToolSchema } from '@/seo/json-ld/index'

export const metadata: Metadata = {
  title: 'E-Ticaret Kar Hesaplama | Moyduz Araçları',
  description:
    'Ürün başına net karınızı hesaplayın. Maliyet, kargo, platform komisyonu ve vergi dahil gerçek kâr marjı analizi.',
  keywords: [
    'e-ticaret kar hesaplama',
    'net kar hesaplama',
    'kar marjı hesaplama',
    'ürün kar analizi',
    'e-ticaret kâr',
  ],
  alternates: {
    canonical: 'https://moyduz.com/tools/e-ticaret-kar-hesaplama',
  },
  openGraph: {
    title: 'E-Ticaret Kar Hesaplama | Moyduz',
    description: 'Ürün başına net karınızı hesaplayın. Maliyet, kargo ve komisyon dahil gerçek kâr analizi.',
    url: 'https://moyduz.com/tools/e-ticaret-kar-hesaplama',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Moyduz',
    images: [{ url: 'https://moyduz.com/opengraph-image', width: 1200, height: 630, alt: 'E-Ticaret Kar Hesaplama | Moyduz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Ticaret Kar Hesaplama | Moyduz',
    description: 'Ürün başına net karınızı hesaplayın. Maliyet, kargo ve komisyon dahil gerçek kâr analizi.',
    images: ['https://moyduz.com/opengraph-image'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebApplicationToolSchema({
    name: 'E-Ticaret Kar Hesaplama',
    description: 'Ürün başına net karınızı hesaplayın. Maliyet, kargo, platform komisyonu ve vergi dahil gerçek kâr marjı analizi.',
    url: 'https://moyduz.com/tools/e-ticaret-kar-hesaplama',
  })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  )
}
