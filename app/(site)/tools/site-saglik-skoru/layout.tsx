import type { Metadata } from 'next'
import { buildWebApplicationToolSchema } from '@/seo/json-ld/index'

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

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebApplicationToolSchema({
    name: 'Site Sağlık Skoru',
    description: 'E-ticaret sitenizin performans, SEO ve teknik sağlık skorunu ölçün. Ücretsiz analiz aracı.',
    url: 'https://moyduz.com/tools/site-saglik-skoru',
    applicationCategory: 'UtilityApplication',
  })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  )
}
