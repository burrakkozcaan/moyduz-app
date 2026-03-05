import type { Metadata } from 'next'
import { buildWebApplicationToolSchema, buildFAQPageSchema } from '@/seo/json-ld/index'

export const metadata: Metadata = {
  title: 'Trendyol Komisyon Hesaplama — Pazaryeri Net Kâr Analizi | Moyduz',
  description:
    'Trendyol komisyon hesaplama aracı: satış fiyatı, maliyet ve kargo girerek net kârınızı anında görün. Hepsiburada, Amazon TR ve diğer pazaryerleri de dahil.',
  keywords: [
    'trendyol komisyon hesaplama',
    'trendyol komisyon oranı',
    'trendyol kar hesaplama',
    'pazaryeri komisyon hesaplama',
    'komisyon hesaplama',
    'trendyol net kar',
    'hepsiburada komisyon',
    'marketplace komisyon',
  ],
  alternates: {
    canonical: 'https://moyduz.com/tools/komisyon-hesaplama',
  },
  openGraph: {
    title: 'Trendyol Komisyon Hesaplama — Net Kâr Analizi | Moyduz',
    description: 'Trendyol komisyon, KDV ve kargo dahil net kârınızı anında hesaplayın. Hepsiburada ve Amazon TR de dahil.',
    url: 'https://moyduz.com/tools/komisyon-hesaplama',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Moyduz',
    images: [{ url: 'https://moyduz.com/opengraph-image', width: 1200, height: 630, alt: 'Trendyol Komisyon Hesaplama | Moyduz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trendyol Komisyon Hesaplama — Net Kâr Analizi | Moyduz',
    description: 'Trendyol komisyon, KDV ve kargo dahil net kârınızı anında hesaplayın.',
    images: ['https://moyduz.com/opengraph-image'],
  },
}

const FAQS = [
  { question: 'Trendyol komisyon oranları ne kadar?', answer: '2026 itibarıyla Trendyol komisyon oranları kategoriye göre %6–%25 arasında değişmektedir. Elektronik %6–8, giyim %18–22, kozmetik %12–15 civarındadır. Komisyon + %20 KDV üzerinden hesaplanır.' },
  { question: 'Trendyol\'da satış yapmanın aylık maliyeti nedir?', answer: 'Trendyol\'da mağaza açmak ücretsizdir. Maliyet yalnızca satış bazlı komisyondan oluşur. Ancak kargo, iade ve reklam maliyetleri eklendiğinde gerçek net kâr %10–25 arasına düşebilir.' },
  { question: 'Hepsiburada komisyon oranları Trendyol\'dan farklı mı?', answer: 'Evet, Hepsiburada komisyonları genellikle %7–%20 arasındadır ve üzerine %20 KDV eklenir. Trendyol ile yakın ama kategori bazında farklılıklar önemlidir; her iki platform için bu araçla karşılaştırma yapabilirsiniz.' },
  { question: 'Net kâr hesabına neler dahil edilmeli?', answer: 'Doğru net kâr için: satış fiyatı - ürün maliyeti - komisyon (KDV\'li) - kargo ücreti - iade oranı (%3–8 ortalama) - reklam maliyeti. Bu araç komisyon ve KDV\'yi otomatik hesaplar.' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebApplicationToolSchema({
    name: 'Marketplace Komisyon Hesaplama',
    description: 'Trendyol, Hepsiburada, Amazon ve diğer pazaryerlerindeki gerçek kar marjınızı hesaplayın. Komisyon, KDV ve kargo dahil net kâr analizi.',
    url: 'https://moyduz.com/tools/komisyon-hesaplama',
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
