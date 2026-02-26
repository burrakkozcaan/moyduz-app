import { getPage } from '@/lib/mdx-pages'
import { MdxPageLayout } from '@/components/MdxPageLayout'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Alternatifler | Moyduz',
  description:
    "Shopify, ikas, Webflow, T-Soft, Ideasoft, Ticimax ve no-code alternatifleri. E-ticaret ve pazar yeri için doğru alternatifi seçin.",
  keywords: [
    'alternatifler',
    'shopify alternatif',
    'ikas alternatif',
    'webflow alternatif',
    'ticimax alternatif',
    't-soft alternatif',
    'ideasoft alternatif',
    'no-code alternatif',
    'e-ticaret altyapı alternatif',
  ],
  alternates: { canonical: 'https://moyduz.com/alternatives' },
  openGraph: {
    title: 'Alternatifler | Moyduz',
    description:
      "Shopify, ikas, Webflow, T-Soft, Ideasoft, Ticimax ve no-code alternatifleri. E-ticaret ve pazar yeri için doğru alternatifi seçin.",
    url: 'https://moyduz.com/alternatives',
    locale: 'tr_TR',
    siteName: 'Moyduz',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alternatifler | Moyduz',
    description: 'Shopify, ikas, Webflow ve diğer platformlara en iyi alternatifler.',
  },
}

export default async function AlternativesPage() {
  const page = await getPage('alternatives')
  if (!page) notFound()
  return <MdxPageLayout page={page} />
}
