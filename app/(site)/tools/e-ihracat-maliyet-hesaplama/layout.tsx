import type { Metadata } from 'next'
import { buildWebApplicationToolSchema, buildFAQPageSchema } from '@/seo/json-ld/index'

export const metadata: Metadata = {
  title: 'E-İhracat Maliyet Hesaplama 2026 | Mikro İhracat Kar Analizi | Moyduz',
  description:
    'E-ihracat maliyet hesaplama aracı: kargo, gümrük, komisyon ve kur farkı dahil net kârınızı hesaplayın. Mikro ihracat (ETGB) ile standart ihracat karşılaştırması.',
  keywords: [
    'e-ihracat maliyet hesaplama',
    'mikro ihracat maliyet',
    'e-ihracat kar hesaplama',
    'yurt dışı satış maliyeti',
    'etgb maliyet',
    'e-ihracat hesaplayıcı',
  ],
  alternates: {
    canonical: 'https://moyduz.com/tools/e-ihracat-maliyet-hesaplama',
  },
  openGraph: {
    title: 'E-İhracat Maliyet Hesaplama | Moyduz',
    description: 'Kargo, gümrük, komisyon ve kur farkı dahil e-ihracat net kârınızı hesaplayın.',
    url: 'https://moyduz.com/tools/e-ihracat-maliyet-hesaplama',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Moyduz',
    images: [{ url: 'https://moyduz.com/opengraph-image', width: 1200, height: 630, alt: 'E-İhracat Maliyet Hesaplama | Moyduz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-İhracat Maliyet Hesaplama | Moyduz',
    description: 'Kargo, gümrük, komisyon ve kur farkı dahil e-ihracat net kârınızı hesaplayın.',
    images: ['https://moyduz.com/opengraph-image'],
  },
}

const FAQS = [
  { question: 'E-ihracatta KDV nasıl uygulanır?', answer: 'Türkiye\'den yurt dışına yapılan e-ihracatta KDV oranı %0\'dır (sıfır oranlı KDV). Mikro ihracatta (ETGB ile 300 kg veya 15.000 EUR altı gönderiler) KDV iade hakkı doğar. Yanlış beyan cezası yüksek olduğundan mali müşavirle teyit edin.' },
  { question: 'Mikro ihracat ile standart ihracat arasındaki maliyet farkı nedir?', answer: 'Mikro ihracat (ETGB): basit gümrük işlemi, hızlı teslimat, tek paket için uygun. Standart ihracat: A.TR veya EUR.1 belgesi gerektirir, maliyeti yüksek ama çok sayıda paketle birim maliyet düşer. 300 kg altı ve 15.000 EUR altı siparişlerde mikro ihracat avantajlıdır.' },
  { question: 'E-ihracatta kargo maliyetleri nasıl hesaplanır?', answer: 'Yurt dışı kargo maliyeti desi ağırlığı, hedef ülke ve servis tipine göre değişir. DHL Express, UPS ve FedEx desilik fiyatlandırma uygular. Orta mesafe Avrupa\'ya standart kargo: 0,5 kg ürün için 180–350 TL arasında değişir. Toplu gönderimde birim maliyet yarıya düşebilir.' },
  { question: 'E-ihracatta döviz kuru riski nasıl yönetilir?', answer: 'EUR veya USD bazlı fiyatlandırma yapıyorsanız kur dalgalanması gelir belirsizliği yaratır. Fiyat listelerini döviz kuruna göre periyodik güncelleyin. 1 EUR = 40–45 TL baz alarak hesap yapın ve %10 kur tamponu bırakın.' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebApplicationToolSchema({
    name: 'E-İhracat Maliyet Hesaplama',
    description: 'Kargo, gümrük, komisyon ve kur farkı dahil e-ihracat net kârınızı hesaplayın. Mikro ihracat ile standart ihracat karşılaştırması.',
    url: 'https://moyduz.com/tools/e-ihracat-maliyet-hesaplama',
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
