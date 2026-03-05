import type { Metadata } from 'next'
import { buildWebApplicationToolSchema, buildFAQPageSchema } from '@/seo/json-ld/index'

export const metadata: Metadata = {
  title: 'E-Ticaret Kar Hesaplama | Moyduz Araçları',
  description:
    'Ürün başına net karınızı hesaplayın. Maliyet, kargo, platform komisyonu ve vergi dahil gerçek kâr marjı analizi.',
  keywords: [
    'e-ticaret kar hesaplama',
    'net kar hesaplama',
    'kar marjı hesaplama',
    'ürün kar analizi',
    'e-ticaret kâr',
  ],
  alternates: {
    canonical: 'https://moyduz.com/tools/e-ticaret-kar-hesaplama',
  },
  openGraph: {
    title: 'E-Ticaret Kar Hesaplama | Moyduz',
    description: 'Ürün başına net karınızı hesaplayın. Maliyet, kargo ve komisyon dahil gerçek kâr analizi.',
    url: 'https://moyduz.com/tools/e-ticaret-kar-hesaplama',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Moyduz',
    images: [{ url: 'https://moyduz.com/opengraph-image', width: 1200, height: 630, alt: 'E-Ticaret Kar Hesaplama | Moyduz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Ticaret Kar Hesaplama | Moyduz',
    description: 'Ürün başına net karınızı hesaplayın. Maliyet, kargo ve komisyon dahil gerçek kâr analizi.',
    images: ['https://moyduz.com/opengraph-image'],
  },
}

const FAQS = [
  { question: 'E-ticarette iyi bir kar marjı nedir?', answer: 'E-ticarette sağlıklı net kar marjı kategoriye göre değişir: tekstil/giyim %15–35, elektronik %5–15, kozmetik %20–45, ev ürünleri %10–25. Trendyol gibi pazaryerlerinde komisyon+kargo sonrası net marj %8–15\'e düşebilir.' },
  { question: 'Net kar ile brüt kar farkı nedir?', answer: 'Brüt kar = Satış fiyatı − Ürün maliyeti. Net kar = Satış fiyatı − Ürün maliyeti − Kargo − Komisyon − Reklam − Vergiler − Genel giderler. E-ticarette brüt kar yüksek görünse de net kar %40–60 daha düşük olabilir.' },
  { question: 'Ürün fiyatı nasıl belirlenmeli?', answer: 'Minimum satış fiyatı = Ürün maliyeti + Kargo + Komisyon + Hedef net kâr. Pazaryerinde %15 komisyon, 30 TL kargo ve %20 net kâr hedefiyle: maliyeti 100 TL olan ürün için minimum fiyat ≈ 175–190 TL olmalıdır.' },
  { question: 'İade oranı kar hesabını nasıl etkiler?', answer: 'Ortalama e-ticaret iade oranı %5–12\'dir. Giyimde %20–30\'a çıkabilir. Her iade kargo maliyeti (gidiş + dönüş) ve işlem maliyeti doğurur. 100 sipariş + %10 iade = 10 sipariş için 600+ TL ek maliyet. İade oranını bu araca ekleyerek gerçekçi kar görebilirsiniz.' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebApplicationToolSchema({
    name: 'E-Ticaret Kar Hesaplama',
    description: 'Ürün başına net karınızı hesaplayın. Maliyet, kargo, platform komisyonu ve vergi dahil gerçek kâr marjı analizi.',
    url: 'https://moyduz.com/tools/e-ticaret-kar-hesaplama',
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
