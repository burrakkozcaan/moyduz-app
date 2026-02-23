import { getPage } from '@/lib/mdx-pages'
import { MdxPageLayout } from '@/components/MdxPageLayout'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Customers | Moyduz',
  description:
    'Trusted by companies worldwide. See customer success stories and testimonials.',
  alternates: { canonical: 'https://moyduz.com/customers' },
  openGraph: {
    title: 'Customers | Moyduz',
    description: 'Trusted by companies worldwide. See customer success stories and testimonials.',
    url: 'https://moyduz.com/customers',
  },
}

export default async function CustomersPage() {
  const page = await getPage('customers')
  if (!page) notFound()
  return <MdxPageLayout page={page} />
}
