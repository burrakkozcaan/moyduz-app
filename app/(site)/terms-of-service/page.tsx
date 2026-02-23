import { getPage } from '@/lib/mdx-pages'
import { MdxPageLayout } from '@/components/MdxPageLayout'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Moyduz',
  description: 'Terms and conditions for using Moyduz services.',
  alternates: { canonical: 'https://moyduz.com/terms-of-service' },
  openGraph: {
    title: 'Terms of Service | Moyduz',
    description: 'Terms and conditions for using Moyduz services.',
    url: 'https://moyduz.com/terms-of-service',
  },
}

export default async function TermsOfServicePage() {
  const page = await getPage('terms-of-service')
  if (!page) notFound()
  return <MdxPageLayout page={page} showLegalFooter />
}
