import type { Metadata } from 'next'
import { buildWebApplicationToolSchema, buildFAQPageSchema } from '@/seo/json-ld/index'

export const metadata: Metadata = {
  title: 'Desi Hesaplama 2026 | Kargo Hacimsel Ağırlık Hesaplayıcı | Moyduz',
  description:
    'Desi hesaplama aracı: kargo hacimsel ağırlığını (en × boy × yükseklik / 3000) hesaplayın. Gerçek ağırlık ile desi karşılaştırması ve kargo maliyet tahmini.',
  keywords: [
    'desi hesaplama',
    'desi hesaplayıcı',
    'hacimsel ağırlık hesaplama',
    'kargo desi hesaplama',
    'desi ne demek',
    'desi formülü',
  ],
  alternates: {
    canonical: 'https://moyduz.com/tools/desi-hesaplama',
  },
  openGraph: {
    title: 'Desi Hesaplama 2026 | Moyduz',
    description: 'Kargo hacimsel ağırlığını (desi) hesaplayın. Gerçek ağırlık ile karşılaştır.',
    url: 'https://moyduz.com/tools/desi-hesaplama',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Moyduz',
    images: [{ url: 'https://moyduz.com/opengraph-image', width: 1200, height: 630, alt: 'Desi Hesaplama | Moyduz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Desi Hesaplama 2026 | Moyduz',
    description: 'Kargo hacimsel ağırlığını (desi) hesaplayın.',
    images: ['https://moyduz.com/opengraph-image'],
  },
}

const FAQS = [
  { question: 'Desi hesaplama formülü nedir?', answer: 'Desi = (En cm × Boy cm × Yükseklik cm) / 3000. Örnek: 30×20×15 cm kutu = 9000 / 3000 = 3 desi. Kargo firmaları gerçek ağırlık ile desi ağırlığından büyük olanı esas alır.' },
  { question: '1 desi kaç kg\'a eşittir?', answer: '1 desi = 1 kg olarak kabul edilir. Hesaplama formülüne göre hacimsel yoğunluk 333 kg/m³\'tür. Yani 3000 cm³ hacim = 1 desi = 1 kg. Hafif ve hacimli ürünlerde desi ağırlığı gerçek ağırlıktan fazla çıkar.' },
  { question: 'Kargo firmaları desiyi nasıl hesaplar?', answer: 'MNG, Yurtiçi, Aras ve Sürat Kargo tamamı (En × Boy × Yükseklik) / 3000 formülünü kullanır. Gerçek ağırlık ile desi ağırlığından büyük olan tarifeden ücretlendirilir. PTT Kargo\'da tarifeler farklılık gösterebilir.' },
  { question: 'E-ticarette desi hesabı neden önemlidir?', answer: 'Kargo maliyeti ürün fiyatını doğrudan etkiler. Yanlış desi hesabı ya fazla kargo ödemesine ya da beklenmedik ek ücrete yol açar. Özellikle hacimli ürünlerde (oyuncak, mobilya parçaları) desi gerçek ağırlığın 3–5 katı olabilir.' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebApplicationToolSchema({
    name: 'Desi Hesaplama',
    description: 'Kargo hacimsel ağırlığını (desi) hesaplayın. Gerçek ağırlık ile karşılaştırın ve kargo maliyetinizi tahmin edin.',
    url: 'https://moyduz.com/tools/desi-hesaplama',
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
