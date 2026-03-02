import type { Metadata } from 'next'
import { buildWebApplicationToolSchema } from '@/seo/json-ld/index'

export const metadata: Metadata = {
  title: 'Kargo Ücreti Hesaplama 2026 | MNG, Yurtiçi, Aras Karşılaştır | Moyduz',
  description:
    'Kargo ücreti hesaplama: MNG Kargo, Yurtiçi Kargo, Aras Kargo, PTT Kargo ve Sürat Kargo fiyatlarını karşılaştırın. Aylık gönderim sayınıza göre en ucuz kargoyu bulun.',
  keywords: [
    'kargo ücreti hesaplama',
    'kargo fiyatları 2026',
    'mng kargo hesaplama',
    'yurtiçi kargo hesaplama',
    'aras kargo hesaplama',
    'en ucuz kargo',
  ],
  alternates: {
    canonical: 'https://moyduz.com/tools/kargo-ucreti-hesaplama',
  },
  openGraph: {
    title: 'Kargo Ücreti Hesaplama 2026 | Moyduz',
    description: 'MNG, Yurtiçi, Aras, PTT kargo fiyatlarını karşılaştırın. En ucuz kargo firmasını bulun.',
    url: 'https://moyduz.com/tools/kargo-ucreti-hesaplama',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Moyduz',
    images: [{ url: 'https://moyduz.com/opengraph-image', width: 1200, height: 630, alt: 'Kargo Ücreti Hesaplama | Moyduz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kargo Ücreti Hesaplama 2026 | Moyduz',
    description: 'MNG, Yurtiçi, Aras, PTT kargo fiyatlarını karşılaştırın.',
    images: ['https://moyduz.com/opengraph-image'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebApplicationToolSchema({
    name: 'Kargo Ücreti Hesaplama',
    description: 'Farklı kargo firmalarının fiyatlarını karşılaştırın. Aylık gönderim hacminize göre en avantajlı seçeneği bulun.',
    url: 'https://moyduz.com/tools/kargo-ucreti-hesaplama',
  })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  )
}
