import type { Metadata } from 'next'
import { buildWebApplicationToolSchema, buildFAQPageSchema } from '@/seo/json-ld/index'

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

const FAQS = [
  { question: 'E-ticarette ROI nasıl hesaplanır?', answer: 'ROI = ((Toplam Gelir - Toplam Maliyet) / Toplam Maliyet) × 100. Örnek: 50.000 TL yatırım, 120.000 TL yıllık gelir → ROI = ((120.000 - 50.000) / 50.000) × 100 = %140. Maliyet hesabına platform kurulum + aylık abonelik + kargo + komisyon dahil edilmeli.' },
  { question: 'E-ticaret yatırımı ne zaman amorti eder?', answer: 'Amortisman süresi = Yatırım Maliyeti / Aylık Net Kâr. Örnek: 30.000 TL kurulum + aylık 1.500 TL bakım = ayda 5.000 TL net kâr → 7,5 ayda amorti. Ortalama bir e-ticaret projesi 6–18 ay içinde amorti eder.' },
  { question: 'Yüksek ROI için hangi e-ticaret kanalları daha iyi?', answer: 'Kendi web sitesi (komisyonsuz) uzun vadede en yüksek ROI\'yi sağlar. Trendyol/Hepsiburada gibi pazaryerleri hızlı satış ama düşük marj sunar (%8–22 komisyon). Hybrid model — kendi site + pazaryeri — en dengeli yaklaşımdır.' },
  { question: 'E-ticaret ROI hesabında gözden kaçan maliyetler neler?', answer: 'Sık atlanan kalemler: iade maliyeti (%3–8 ortalama), depo ve paketleme giderleri, müşteri hizmetleri maliyeti, kötü yorum riski, reklam maliyeti (CPC artışı) ve platform komisyon KDV\'si. Bu araç temel ROI\'yi hesaplar; tam analiz için tüm kalemleri ekleyin.' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebApplicationToolSchema({
    name: 'E-Ticaret ROI Hesaplama',
    description: 'Yeni e-ticaret sisteminizin yatırım getirisini (ROI) hesaplayın. Ne zaman amorti edeceğini ve toplam kazancınızı görün.',
    url: 'https://moyduz.com/tools/roi-hesaplama',
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
