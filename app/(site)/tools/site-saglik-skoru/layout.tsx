import type { Metadata } from 'next'
import { buildWebApplicationToolSchema, buildFAQPageSchema } from '@/seo/json-ld/index'

export const metadata: Metadata = {
  title: 'Site Sağlık Skoru | Moyduz Araçları',
  description:
    'E-ticaret sitenizin performans, SEO ve teknik sağlık skorunu ölçün. Ücretsiz analiz aracı.',
  alternates: {
    canonical: 'https://moyduz.com/tools/site-saglik-skoru',
  },
  openGraph: {
    title: 'Site Sağlık Skoru | Moyduz',
    description: 'E-ticaret sitenizin performans, SEO ve teknik sağlık skorunu ölçün.',
    url: 'https://moyduz.com/tools/site-saglik-skoru',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Moyduz',
    images: [{ url: 'https://moyduz.com/opengraph-image', width: 1200, height: 630, alt: 'Site Sağlık Skoru | Moyduz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Site Sağlık Skoru | Moyduz',
    description: 'E-ticaret sitenizin performans, SEO ve teknik sağlık skorunu ölçün.',
    images: ['https://moyduz.com/opengraph-image'],
  },
}

const FAQS = [
  { question: 'Site sağlık skoru ne anlama gelir?', answer: 'Site sağlık skoru; sayfa hızı (Core Web Vitals), SEO yapısı (meta etiketler, başlıklar, canonical), teknik doğruluk (robots, sitemap, HTTPS) ve erişilebilirlik kriterlerini 100 üzerinden puanlar. 80+ iyi, 60–79 orta, 60 altı kritik sorun anlamına gelir.' },
  { question: 'Düşük site sağlık skoru satışları etkiler mi?', answer: 'Evet. LCP > 3s olan siteler %53 daha fazla ziyaretçi kaybeder (Google verisi). Google, Core Web Vitals\'ı doğrudan ranking faktörü olarak kullanır. Teknik SEO hataları (canonical yok, robots engeli) sayfaların Google\'a indexlenmesini tamamen engelleyebilir.' },
  { question: 'Site sağlık skorumu artırmak için önce ne yapmalıyım?', answer: 'Öncelik sırası: 1) HTTPS ve güvenlik kontrolü, 2) Sayfa hızı (LCP < 2,5s hedefi), 3) Meta başlıklar ve açıklamaların doldurulması, 4) Canonical URL kontrolü, 5) Sitemap ve robots.txt. Bu araç hangi alanda sorun olduğunu gösterir.' },
  { question: 'PageSpeed ile site sağlık skoru aynı şey midir?', answer: 'Hayır. PageSpeed Insights yalnızca sayfa hızını (Core Web Vitals) ölçer. Site sağlık skoru daha kapsamlıdır: SEO yapısı, teknik doğruluk, güvenlik, erişilebilirlik ve içerik kalitesi kriterlerini de içerir.' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebApplicationToolSchema({
    name: 'Site Sağlık Skoru',
    description: 'E-ticaret sitenizin performans, SEO ve teknik sağlık skorunu ölçün. Ücretsiz analiz aracı.',
    url: 'https://moyduz.com/tools/site-saglik-skoru',
    applicationCategory: 'UtilityApplication',
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
