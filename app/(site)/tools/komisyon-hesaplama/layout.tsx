import type { Metadata } from 'next'

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
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
