import type { Metadata } from 'next'
import { buildWebApplicationToolSchema, buildFAQPageSchema } from '@/seo/json-ld/index'

export const metadata: Metadata = {
  title: 'E-Ticaret Maliyet Hesaplama | Moyduz Araçları',
  description:
    'Platform maliyetlerinizi hesaplayın. Shopify, ikas ve WooCommerce ile özel yazılım maliyetlerini karşılaştırın. Ücretsiz hesaplama aracı.',
  keywords: [
    'e-ticaret maliyet hesaplama',
    'shopify maliyet',
    'e-ticaret platform maliyeti',
    'özel yazılım maliyet hesabı',
  ],
  alternates: {
    canonical: 'https://moyduz.com/tools/maliyet-hesaplama',
  },
  openGraph: {
    title: 'E-Ticaret Maliyet Hesaplama | Moyduz',
    description: 'Platform maliyetlerinizi hesaplayın ve özel yazılımla ne kadar tasarruf edeceğinizi görün.',
    url: 'https://moyduz.com/tools/maliyet-hesaplama',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Moyduz',
    images: [{ url: 'https://moyduz.com/opengraph-image', width: 1200, height: 630, alt: 'E-Ticaret Maliyet Hesaplama | Moyduz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Ticaret Maliyet Hesaplama | Moyduz',
    description: 'Platform maliyetlerinizi hesaplayın ve özel yazılımla ne kadar tasarruf edeceğinizi görün.',
    images: ['https://moyduz.com/opengraph-image'],
  },
}

const FAQS = [
  { question: 'Shopify ile özel e-ticaret yazılımının maliyet farkı nedir?', answer: 'Shopify\'da aylık 300–800 TL platform ücreti + %2–3 işlem komisyonu ödersiniz. Aylık 500.000 TL ciroda komisyon maliyeti yılda 120.000 TL\'ye ulaşabilir. Özel yazılımda kurulum maliyeti 50.000–150.000 TL ama komisyon sıfır — çoğunlukla 12–18 ayda amorti eder.' },
  { question: 'ikas ve Shopify arasındaki maliyet farkı nedir?', answer: 'ikas\'ta paket fiyatları 1.200–4.500 TL/ay arasında değişir ve işlem komisyonu alınmaz. Shopify\'da ek olarak işlem komisyonu ödenir (kendi ödeme altyapısı kullanılmıyorsa). Yüksek ciroda ikas daha avantajlıdır.' },
  { question: 'E-ticaret platformunun toplam yıllık maliyeti nasıl hesaplanır?', answer: 'Yıllık toplam maliyet = (Aylık platform ücreti × 12) + (Yıllık ciro × komisyon oranı) + (Aylık ek uygulama ücretleri × 12) + domain/SSL. Bu araç bu hesabı otomatik yapar ve platformları karşılaştırır.' },
  { question: 'WooCommerce gerçekten ücretsiz midir?', answer: 'WooCommerce eklentisi ücretsizdir, ancak hosting (200–600 TL/ay), SSL (genellikle dahil), ödeme eklentileri ve güvenlik için ek harcama şarttır. Bakım ve güvenceleme dahil gerçek aylık maliyet 500–2.000 TL arasındadır.' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebApplicationToolSchema({
    name: 'E-Ticaret Maliyet Hesaplama',
    description: 'Platform maliyetlerinizi hesaplayın. Shopify, ikas ve WooCommerce ile özel yazılım maliyetlerini karşılaştırın.',
    url: 'https://moyduz.com/tools/maliyet-hesaplama',
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
