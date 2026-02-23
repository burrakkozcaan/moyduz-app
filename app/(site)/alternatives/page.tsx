import { getPage } from '@/lib/mdx-pages'
import { MdxPageLayout } from '@/components/MdxPageLayout'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Alternatifler | Moyduz',
  description:
    "Shopify, ikas, Webflow, T-Soft, Ideasoft, Ticimax ve no-code alternatifleri. E-ticaret ve pazar yeri için doğru alternatifi seçin.",
  alternates: { canonical: 'https://moyduz.com/alternatives' },
  openGraph: {
    title: 'Alternatifler | Moyduz',
    description:
      "Shopify, ikas, Webflow, T-Soft, Ideasoft, Ticimax ve no-code alternatifleri. E-ticaret ve pazar yeri için doğru alternatifi seçin.",
    url: 'https://moyduz.com/alternatives',
  },
}

export default async function AlternativesPage() {
  const page = await getPage('alternatives')
  if (!page) notFound()
  return <MdxPageLayout page={page} />
}
