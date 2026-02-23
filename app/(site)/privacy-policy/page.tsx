import { getPage } from '@/lib/mdx-pages'
import { MdxPageLayout } from '@/components/MdxPageLayout'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Moyduz',
  description: 'Learn how we protect your data and ensure privacy compliance.',
  alternates: { canonical: 'https://moyduz.com/privacy-policy' },
  openGraph: {
    title: 'Privacy Policy | Moyduz',
    description: 'Learn how we protect your data and ensure privacy compliance.',
    url: 'https://moyduz.com/privacy-policy',
  },
}

export default async function PrivacyPolicyPage() {
  const page = await getPage('privacy-policy')
  if (!page) notFound()
  return <MdxPageLayout page={page} showLegalFooter />
}
