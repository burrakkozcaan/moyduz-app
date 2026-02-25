import type { Metadata } from 'next'
import { buildFAQPageSchema } from '@/seo/json-ld/index'

export const metadata: Metadata = {
  title: 'Sık Sorulan Sorular — Hizmet, Fiyat & Süreç | Moyduz',
  description:
    'Moyduz web tasarım, e-ticaret ve yazılım hizmetleri hakkında sık sorulan sorular. Fiyatlandırma, proje süresi ve destek konularında yanıtlar.',
  alternates: { canonical: 'https://moyduz.com/faq' },
  openGraph: {
    title: 'Sık Sorulan Sorular | Moyduz',
    description: 'Moyduz hizmetleri, fiyatlandırma ve süreç hakkında sık sorulan sorular.',
    url: 'https://moyduz.com/faq',
  },
}

const faqItems = [
  { question: 'Moyduz hangi hizmetleri sunuyor?', answer: 'Moyduz; web tasarım, e-ticaret geliştirme, özel yazılım, dijital pazarlama ve yapay zeka otomasyonu dahil kurumsal dijital çözümler sunuyor.' },
  { question: 'Bir web sitesi ne kadar maliyetli?', answer: 'Starter paketimiz premium bir web sitesi için belirli bir bütçeyle başlıyor. E-ticaret ve marketplace projeleri kapsama göre fiyatlandırılıyor. Özel projeler için ücretsiz keşif görüşmesiyle teklif veriyoruz.' },
  { question: 'Proje ne kadar sürer?', answer: 'Kurumsal web siteleri genelde 2–4 hafta, e-ticaret projeleri 4–8 hafta sürebilir. İlk görüşmede kapsamı netleştirip size özel bir takvim sunuyoruz.' },
  { question: 'Devam eden bakım ve destek sunuyor musunuz?', answer: 'Evet. Aylık bakım paketlerimizle hosting, güvenlik güncellemeleri, performans izleme ve içerik güncellemeleri sunuyoruz.' },
  { question: 'Hangi teknolojileri kullanıyorsunuz?', answer: 'Web geliştirmede Next.js, React, TypeScript, Tailwind CSS ve Node.js kullanıyoruz. E-ticaret için Shopify, WooCommerce ve özel çözümlerle çalışıyoruz.' },
  { question: 'Kod ve tasarımın hakları bende mi?', answer: 'Evet. Proje tamamlanıp ödeme alındığında, projeniz için üretilen tüm kod, tasarım ve varlıkların tamamı size devredilir.' },
  { question: 'Moyduz ile nasıl iletişime geçebilirim?', answer: 'info@moyduz.com e-posta adresi, web sitemizdeki iletişim formu veya canlı destek üzerinden bize ulaşabilirsiniz.' },
]

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFAQPageSchema(faqItems)),
        }}
      />
      {children}
    </>
  )
}
