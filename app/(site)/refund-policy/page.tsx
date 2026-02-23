import { getPage } from '@/lib/mdx-pages'
import { MdxPageLayout } from '@/components/MdxPageLayout'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund Policy | Moyduz',
  description: 'Learn about our refund terms and process.',
  alternates: { canonical: 'https://moyduz.com/refund-policy' },
  openGraph: {
    title: 'Refund Policy | Moyduz',
    description: 'Learn about our refund terms and process.',
    url: 'https://moyduz.com/refund-policy',
  },
}

export default async function RefundPolicyPage() {
  const page = await getPage('refund-policy')
  if (!page) notFound()
  return <MdxPageLayout page={page} showLegalFooter />
}
