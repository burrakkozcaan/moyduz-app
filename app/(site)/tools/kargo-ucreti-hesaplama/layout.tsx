import type { Metadata } from 'next'
import { buildWebApplicationToolSchema, buildFAQPageSchema } from '@/seo/json-ld/index'

export const metadata: Metadata = {
  title: 'Kargo Ücreti Hesaplama 2026 | MNG, Yurtiçi, Aras Karşılaştır | Moyduz',
  description:
    'Kargo ücreti hesaplama: MNG Kargo, Yurtiçi Kargo, Aras Kargo, PTT Kargo ve Sürat Kargo fiyatlarını karşılaştırın. Aylık gönderim sayınıza göre en ucuz kargoyu bulun.',
  keywords: [
    'kargo ücreti hesaplama',
    'kargo fiyatları 2026',
    'mng kargo hesaplama',
    'yurtiçi kargo hesaplama',
    'aras kargo hesaplama',
    'en ucuz kargo',
  ],
  alternates: {
    canonical: 'https://moyduz.com/tools/kargo-ucreti-hesaplama',
  },
  openGraph: {
    title: 'Kargo Ücreti Hesaplama 2026 | Moyduz',
    description: 'MNG, Yurtiçi, Aras, PTT kargo fiyatlarını karşılaştırın. En ucuz kargo firmasını bulun.',
    url: 'https://moyduz.com/tools/kargo-ucreti-hesaplama',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Moyduz',
    images: [{ url: 'https://moyduz.com/opengraph-image', width: 1200, height: 630, alt: 'Kargo Ücreti Hesaplama | Moyduz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kargo Ücreti Hesaplama 2026 | Moyduz',
    description: 'MNG, Yurtiçi, Aras, PTT kargo fiyatlarını karşılaştırın.',
    images: ['https://moyduz.com/opengraph-image'],
  },
}

const FAQS = [
  { question: 'Hangi kargo firması en ucuz?', answer: '2026\'da aylık 100–500 gönderi bandında Yurtiçi Kargo anlaşmalı fiyatıyla genellikle en avantajlıdır. Daha düşük hacimde MNG ve Aras rekabetçidir. 1000+ gönderide özel anlaşma şarttır; bu araçla desine ve hacme göre karşılaştırabilirsiniz.' },
  { question: 'Kargo ücreti desi mi yoksa kg\'a göre mi hesaplanır?', answer: 'Tüm büyük kargo firmaları gerçek ağırlık ile desi ağırlığından büyük olanı esas alır. Desi formülü: (En × Boy × Yükseklik) / 3000. Hafif ama hacimli paketlerde desi devreye girer ve fatura beklenenden yüksek çıkabilir.' },
  { question: 'E-ticaret kargo anlaşması nasıl yapılır?', answer: 'Aylık 200 gönderinin üzerinde hacminiz varsa kargo firmalarının kurumsal satış ekibiyle görüşerek indirimli tarife alabilirsiniz. Genellikle %15–40 arasında indirim mümkündür. Birden fazla firmadan teklif alarak müzakere edin.' },
  { question: 'Kapıdan ödeme seçeneği kargo maliyetini artırır mı?', answer: 'Evet. Kapıdan ödeme (nakit veya kartlı) kargo firmaları tarafından ek hizmet bedeli ile faturalandırılır. Ortalama ek maliyet gönderi başına 3–8 TL arasındadır. Ön ödemeli siparişlerde bu maliyet ortadan kalkar.' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebApplicationToolSchema({
    name: 'Kargo Ücreti Hesaplama',
    description: 'Farklı kargo firmalarının fiyatlarını karşılaştırın. Aylık gönderim hacminize göre en avantajlı seçeneği bulun.',
    url: 'https://moyduz.com/tools/kargo-ucreti-hesaplama',
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
