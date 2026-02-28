import type { Metadata } from 'next'
import { buildWebApplicationToolSchema } from '@/seo/json-ld/index'

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
    siteName: 'Moyduz',
    images: [{ url: 'https://moyduz.com/opengraph-image', width: 1200, height: 630, alt: 'E-Ticaret ROI Hesaplama | Moyduz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Ticaret ROI Hesaplama | Moyduz',
    description: 'Yeni e-ticaret sisteminizin yatırım getirisini hesaplayın.',
    images: ['https://moyduz.com/opengraph-image'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebApplicationToolSchema({
    name: 'E-Ticaret ROI Hesaplama',
    description: 'Yeni e-ticaret sisteminizin yatırım getirisini (ROI) hesaplayın. Ne zaman amorti edeceğini ve toplam kazancınızı görün.',
    url: 'https://moyduz.com/tools/roi-hesaplama',
  })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  )
}
