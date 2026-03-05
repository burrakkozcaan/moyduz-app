import type { Metadata } from 'next'
import { buildWebApplicationToolSchema, buildFAQPageSchema } from '@/seo/json-ld/index'

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

const FAQS = [
  { question: 'Hangi sanal POS en ucuz?', answer: 'Aylık 50.000 TL ciro için PayTR genellikle en uygun seçenektir (%2,69 + KDV). Yüksek ciroda banka sanal POS\'u özel anlaşmayla daha avantajlı olabilir. Gerçek cironu girerek araçla karşılaştır.' },
  { question: 'iyzico ile PayTR arasındaki fark nedir?', answer: 'iyzico taksit altyapısı ve entegrasyon kolaylığıyla öne çıkar; komisyon oranı %2,85–3,09 + KDV. PayTR daha düşük komisyon (%2,69 + KDV) sunar ancak bazı taksit seçenekleri ek ücrete tabidir. Nakit akışı vade farkı açısından benzer seviyededirler.' },
  { question: 'Sanal POS komisyon oranları nedir?', answer: '2026 itibarıyla ortalama sanal POS komisyonları: iyzico %2,85–3,09, PayTR %2,69, Shopier %2,99, Stripe %2,9 + 0,30 USD. Banka sanal POS oranları ciroya göre %1,5–3,5 arasında değişir.' },
  { question: 'Banka POS mu yoksa sanal POS mu daha uygun?', answer: 'Aylık 100.000 TL üzeri ciroda banka sanal POS\'u genellikle daha düşük komisyonla avantajlıdır. Altında, hızlı kurulum ve yazılım entegrasyonu için iyzico veya PayTR daha pratiktir.' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebApplicationToolSchema({
    name: 'Sanal POS Komisyon Hesaplayıcı',
    description: 'iyzico, PayTR, Shopier ve Banka POS komisyon oranlarını gerçek cirona göre karşılaştır. Yıllık tasarrufu hesapla.',
    url: 'https://moyduz.com/tools/sanal-pos-hesaplama',
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
