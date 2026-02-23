import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'E-Ticaret ROI Hesaplama | Moyduz Araçları',
  description:
    'Yeni e-ticaret sisteminizin yatırım getirisini (ROI) hesaplayın. Ne zaman amorti edeceğini ve toplam kazancınızı görün.',
  keywords: [
    'roi hesaplama',
    'e-ticaret roi',
    'yatırım getirisi hesaplama',
    'e-ticaret yatırım',
  ],
  alternates: {
    canonical: 'https://moyduz.com/tools/roi-hesaplama',
  },
  openGraph: {
    title: 'E-Ticaret ROI Hesaplama | Moyduz',
    description: 'Yeni e-ticaret sisteminizin yatırım getirisini hesaplayın.',
    url: 'https://moyduz.com/tools/roi-hesaplama',
    type: 'website',
    locale: 'tr_TR',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
