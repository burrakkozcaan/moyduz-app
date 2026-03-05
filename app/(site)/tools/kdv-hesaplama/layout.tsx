import type { Metadata } from 'next'
import { buildWebApplicationToolSchema, buildFAQPageSchema } from '@/seo/json-ld/index'

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

const FAQS = [
  { question: 'KDV nasıl hesaplanır?', answer: 'KDV dahil fiyattan KDV hariç fiyat bulmak için: Fiyat / (1 + KDV oranı). Örnek: 1.180 TL KDV dahil fiyat ÷ 1,20 = 983,33 TL KDV hariç. KDV tutarı: 1.180 - 983,33 = 196,67 TL.' },
  { question: 'Türkiye\'de KDV oranları 2026\'da nedir?', answer: '2026 itibarıyla Türkiye\'de geçerli KDV oranları: %1 (temel gıda, tarım ürünleri), %10 (bazı gıda, sağlık hizmetleri), %20 (genel oran, çoğu ürün ve hizmet). E-ticarette çoğu ürün %20 KDV\'ye tabidir.' },
  { question: 'E-ticarette KDV beyan zorunluluğu nedir?', answer: 'Türkiye\'de e-ticaret yapan işletmeler yıllık 500.000 TL üzeri ciroda KDV mükellefiyeti altına girer ve aylık KDV beyannamesi vermek zorundadır. Mikro ihracatta (ETGB ile yurt dışı satış) KDV %0 uygulanır.' },
  { question: 'KDV dahil fiyatla hariç fiyat arasındaki fark nedir?', answer: 'KDV dahil fiyat tüketicinin ödediği son fiyattır. KDV hariç fiyat ise verginin çıkarıldığı net satış fiyatıdır. B2B faturalarda genellikle KDV hariç fiyat gösterilir, tüketiciye (B2C) satışlarda KDV dahil belirtilir.' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebApplicationToolSchema({
    name: 'KDV Hesaplama',
    description: 'KDV dahil ve KDV hariç fiyat hesaplayın. E-ticaret satıcıları için aylık KDV yükü analizi.',
    url: 'https://moyduz.com/tools/kdv-hesaplama',
  })
  const faqSchema = buildFAQPageSchema(FAQS)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  )
}
