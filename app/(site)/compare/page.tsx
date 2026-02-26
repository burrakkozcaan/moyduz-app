import { getPage } from '@/lib/mdx-pages'
import { getAllComparePosts } from '@/lib/compare'
import { MdxPageLayout } from '@/components/MdxPageLayout'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Karşılaştır | Moyduz',
  description: "Moyduz'u Webflow, Shopify, ikas, T-Soft, Ticimax, Ideasoft, Softr ve özel yazılımla karşılaştırın.",
  keywords: [
    'karşılaştır',
    'shopify alternatif',
    'ikas vs shopify',
    'ticimax alternatif',
    't-soft alternatif',
    'ideasoft alternatif',
    'webflow vs özel yazılım',
    'no-code vs custom development',
    'e-ticaret altyapı karşılaştırma',
  ],
  alternates: { canonical: 'https://moyduz.com/compare' },
  openGraph: {
    title: 'Karşılaştır | Moyduz',
    description: "Moyduz'u Webflow, Shopify, ikas, T-Soft, Ticimax, Ideasoft, Softr ve özel yazılımla karşılaştırın.",
    url: 'https://moyduz.com/compare',
    locale: 'tr_TR',
    siteName: 'Moyduz',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karşılaştır | Moyduz',
    description: "Moyduz'u Webflow, Shopify, ikas, T-Soft, Ticimax ve diğer platformlarla karşılaştırın.",
  },
}

export default async function ComparePage() {
  const [page, comparePosts] = await Promise.all([
    getPage('compare'),
    getAllComparePosts(),
  ])

  if (!page) notFound()

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Moyduz Karşılaştırma Sayfaları',
    itemListElement: comparePosts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: post.frontmatter.title,
      url: `https://moyduz.com/compare/${post.frontmatter.slug}`,
    })),
  }

  return (
    <>
      <MdxPageLayout page={page} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
    </>
  )
}
