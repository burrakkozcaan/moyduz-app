import { getPage } from '@/lib/mdx-pages'
import { MdxPageLayout } from '@/components/MdxPageLayout'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Karşılaştır | Moyduz',
  description: "Moyduz'u Webflow, Shopify, ikas, T-Soft, Ticimax, Ideasoft, Softr ve özel yazılımla karşılaştırın.",
  alternates: { canonical: 'https://moyduz.com/compare' },
  openGraph: {
    title: 'Karşılaştır | Moyduz',
    description: "Moyduz'u Webflow, Shopify, ikas, T-Soft, Ticimax, Ideasoft, Softr ve özel yazılımla karşılaştırın.",
    url: 'https://moyduz.com/compare',
  },
}

export default async function ComparePage() {
  const page = await getPage('compare')
  if (!page) notFound()
  return <MdxPageLayout page={page} />
}
