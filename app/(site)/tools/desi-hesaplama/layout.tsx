import type { Metadata } from 'next'
import { buildWebApplicationToolSchema } from '@/seo/json-ld/index'

export const metadata: Metadata = {
  title: 'Desi Hesaplama 2026 | Kargo Hacimsel Ağırlık Hesaplayıcı | Moyduz',
  description:
    'Desi hesaplama aracı: kargo hacimsel ağırlığını (en × boy × yükseklik / 3000) hesaplayın. Gerçek ağırlık ile desi karşılaştırması ve kargo maliyet tahmini.',
  keywords: [
    'desi hesaplama',
    'desi hesaplayıcı',
    'hacimsel ağırlık hesaplama',
    'kargo desi hesaplama',
    'desi ne demek',
    'desi formülü',
  ],
  alternates: {
    canonical: 'https://moyduz.com/tools/desi-hesaplama',
  },
  openGraph: {
    title: 'Desi Hesaplama 2026 | Moyduz',
    description: 'Kargo hacimsel ağırlığını (desi) hesaplayın. Gerçek ağırlık ile karşılaştır.',
    url: 'https://moyduz.com/tools/desi-hesaplama',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Moyduz',
    images: [{ url: 'https://moyduz.com/opengraph-image', width: 1200, height: 630, alt: 'Desi Hesaplama | Moyduz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Desi Hesaplama 2026 | Moyduz',
    description: 'Kargo hacimsel ağırlığını (desi) hesaplayın.',
    images: ['https://moyduz.com/opengraph-image'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebApplicationToolSchema({
    name: 'Desi Hesaplama',
    description: 'Kargo hacimsel ağırlığını (desi) hesaplayın. Gerçek ağırlık ile karşılaştırın ve kargo maliyetinizi tahmin edin.',
    url: 'https://moyduz.com/tools/desi-hesaplama',
  })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  )
}
