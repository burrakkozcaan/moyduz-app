import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'E-Ticaret Paketleri & Fiyatları 2026 | Moyduz',
  description:
    "Türkiye'ye özel e-ticaret paketleri. Komisyonsuz, hızlı teslim, tam özelleştirme. Start, Basic, Pro ve Advanced paket seçenekleri ve fiyatları.",
  keywords: [
    'e-ticaret paketleri',
    'e-ticaret fiyatları',
    'e-ticaret sitesi kurma fiyatı',
    'hazır e-ticaret sitesi fiyatları',
    'özel e-ticaret yazılımı fiyat',
    'e-ticaret sitesi yaptırma',
    'e-ticaret paket karşılaştırma',
    'komisyonsuz e-ticaret',
    'e-ticaret altyapısı fiyat',
    'moyduz e-ticaret paketi',
  ],
  alternates: { canonical: 'https://moyduz.com/e-ticaret-paketleri' },
  openGraph: {
    title: 'E-Ticaret Paketleri & Fiyatları 2026 | Moyduz',
    description:
      "Komisyonsuz, Türkiye'ye özel e-ticaret paketleri. Start'tan Advanced'e fiyat ve özellik karşılaştırması.",
    url: 'https://moyduz.com/e-ticaret-paketleri',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Moyduz',
    images: [{ url: 'https://moyduz.com/opengraph-image', width: 1200, height: 630, alt: 'Moyduz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Ticaret Paketleri & Fiyatları 2026',
    description: "Komisyonsuz, Türkiye'ye özel e-ticaret paketleri. Start'tan Advanced'e.",
    images: ['https://moyduz.com/opengraph-image'],
  },
}

export default function ETicaretLayout({ children }: { children: React.ReactNode }) {
  return children
}
