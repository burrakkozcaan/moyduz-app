import type { Metadata } from 'next'
import { buildWebApplicationToolSchema } from '@/seo/json-ld/index'

export const metadata: Metadata = {
  title: 'KDV Hesaplama 2026 | Ücretsiz Online KDV Hesaplayıcı | Moyduz',
  description:
    'KDV hesaplama aracı: %1, %10 ve %20 KDV oranlarıyla KDV dahil / KDV hariç fiyat hesaplayın. E-ticaret satıcıları için aylık KDV yükü analizi.',
  keywords: [
    'kdv hesaplama',
    'kdv hesaplayıcı',
    'kdv dahil fiyat hesaplama',
    'kdv hariç fiyat hesaplama',
    'katma değer vergisi hesaplama',
    'kdv oranları 2026',
  ],
  alternates: {
    canonical: 'https://moyduz.com/tools/kdv-hesaplama',
  },
  openGraph: {
    title: 'KDV Hesaplama 2026 | Moyduz',
    description: 'KDV dahil / hariç fiyat hesaplayın. %1, %10, %20 KDV oranları desteklenir.',
    url: 'https://moyduz.com/tools/kdv-hesaplama',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Moyduz',
    images: [{ url: 'https://moyduz.com/opengraph-image', width: 1200, height: 630, alt: 'KDV Hesaplama | Moyduz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KDV Hesaplama 2026 | Moyduz',
    description: 'KDV dahil / hariç fiyat hesaplayın. %1, %10, %20 KDV oranları desteklenir.',
    images: ['https://moyduz.com/opengraph-image'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebApplicationToolSchema({
    name: 'KDV Hesaplama',
    description: 'KDV dahil ve KDV hariç fiyat hesaplayın. E-ticaret satıcıları için aylık KDV yükü analizi.',
    url: 'https://moyduz.com/tools/kdv-hesaplama',
  })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  )
}
