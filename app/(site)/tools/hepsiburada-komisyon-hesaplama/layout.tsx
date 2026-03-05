import type { Metadata } from 'next'
import { buildWebApplicationToolSchema, buildFAQPageSchema } from '@/seo/json-ld/index'

export const metadata: Metadata = {
  title: 'Hepsiburada Komisyon Hesaplama 2026 | Net Kâr Analizi | Moyduz',
  description:
    'Hepsiburada komisyon oranlarını kategoriye göre hesaplayın. Komisyon + KDV + kargo dahil gerçek net kârınızı anında görün.',
  keywords: [
    'hepsiburada komisyon hesaplama',
    'hepsiburada komisyon oranları',
    'hepsiburada satıcı komisyon',
    'hepsiburada net kar',
    'hepsiburada satış maliyeti',
  ],
  alternates: {
    canonical: 'https://moyduz.com/tools/hepsiburada-komisyon-hesaplama',
  },
  openGraph: {
    title: 'Hepsiburada Komisyon Hesaplama | Moyduz',
    description: 'Hepsiburada komisyon + KDV + kargo dahil net kârınızı hesaplayın.',
    url: 'https://moyduz.com/tools/hepsiburada-komisyon-hesaplama',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Moyduz',
    images: [{ url: 'https://moyduz.com/opengraph-image', width: 1200, height: 630, alt: 'Hepsiburada Komisyon Hesaplama | Moyduz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hepsiburada Komisyon Hesaplama | Moyduz',
    description: 'Hepsiburada komisyon + KDV + kargo dahil net kârınızı hesaplayın.',
    images: ['https://moyduz.com/opengraph-image'],
  },
}

const FAQS = [
  { question: 'Hepsiburada komisyon oranları 2026\'da nedir?', answer: '2026 itibarıyla Hepsiburada komisyon oranları: Elektronik %7–9, Giyim & Ayakkabı %18–22, Kozmetik %13–17, Ev & Yaşam %12–16, Anne & Bebek %11–14. Komisyon tutarına %20 KDV eklenir. Kesin oranlar için kategori sayfasını kontrol edin.' },
  { question: 'Hepsiburada\'da satıcı olmak için ücret ödenir mi?', answer: 'Hepsiburada\'da mağaza açmak ücretsizdir. Yalnızca satış gerçekleştiğinde komisyon kesilir. Ancak kampanyalara katılım, öne çıkarma reklamları ve premium vitrin özellikleri ek ücrete tabidir.' },
  { question: 'Hepsiburada ile Trendyol komisyonları arasındaki fark nedir?', answer: 'Hepsiburada komisyonları genellikle Trendyol\'a yakındır ancak kategori bazında farklılıklar önemlidir. Elektronik kategorisinde Hepsiburada biraz daha düşük, giyimde benzer seviyelerdedir. Her iki platform için bu araçla karşılaştırabilirsiniz.' },
  { question: 'Hepsiburada\'da iade oranı yüksekse ne yapmalıyım?', answer: '%10 üzerinde iade oranı net kârı ciddi eritir. Her iade için gidiş+dönüş kargo ödenir. Önce ürün açıklaması ve görsellerin doğruluğunu kontrol edin. Yanlış beden bilgisi ve yanıltıcı görseller iade oranının temel sebeplerindendir.' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebApplicationToolSchema({
    name: 'Hepsiburada Komisyon Hesaplama',
    description: 'Hepsiburada komisyon oranlarını kategoriye göre hesaplayın. Komisyon + KDV + kargo dahil gerçek net kârınızı anında görün.',
    url: 'https://moyduz.com/tools/hepsiburada-komisyon-hesaplama',
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
