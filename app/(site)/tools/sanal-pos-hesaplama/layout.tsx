import type { Metadata } from 'next'
import { buildWebApplicationToolSchema } from '@/seo/json-ld/index'

export const metadata: Metadata = {
  title: 'Sanal POS Komisyon Hesaplayıcı | Moyduz Araçları',
  description:
    'iyzico, PayTR, Shopier ve Banka POS komisyon oranlarını gerçek cirona göre karşılaştır. Yıllık tasarrufu hesapla.',
  keywords: [
    'sanal pos hesaplama',
    'iyzico komisyon',
    'paytr komisyon',
    'sanal pos karşılaştırma',
    'ödeme altyapısı maliyet',
  ],
  alternates: {
    canonical: 'https://moyduz.com/tools/sanal-pos-hesaplama',
  },
  openGraph: {
    title: 'Sanal POS Komisyon Hesaplayıcı | Moyduz',
    description: 'iyzico, PayTR, Shopier ve Banka POS komisyon oranlarını gerçek cirona göre karşılaştır.',
    url: 'https://moyduz.com/tools/sanal-pos-hesaplama',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Moyduz',
    images: [{ url: 'https://moyduz.com/opengraph-image', width: 1200, height: 630, alt: 'Sanal POS Komisyon Hesaplayıcı | Moyduz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanal POS Komisyon Hesaplayıcı | Moyduz',
    description: 'iyzico, PayTR, Shopier ve Banka POS komisyon oranlarını gerçek cirona göre karşılaştır.',
    images: ['https://moyduz.com/opengraph-image'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebApplicationToolSchema({
    name: 'Sanal POS Komisyon Hesaplayıcı',
    description: 'iyzico, PayTR, Shopier ve Banka POS komisyon oranlarını gerçek cirona göre karşılaştır. Yıllık tasarrufu hesapla.',
    url: 'https://moyduz.com/tools/sanal-pos-hesaplama',
  })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  )
}
