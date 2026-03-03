import { getPage } from '@/lib/mdx-pages'
import { MdxPageLayout } from '@/components/MdxPageLayout'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Müşteriler | Moyduz',
  description:
    'Dünya çapında şirketlerin güvendiği altyapı. Müşteri başarı hikayelerini ve yorumlarını inceleyin.',
  alternates: { canonical: 'https://moyduz.com/customers' },
  openGraph: {
    title: 'Müşteriler | Moyduz',
    description: 'Dünya çapında şirketlerin güvendiği altyapı. Müşteri başarı hikayelerini ve yorumlarını inceleyin.',
    url: 'https://moyduz.com/customers',
  },
}

export default async function CustomersPage() {
  const page = await getPage('customers')
  if (!page) notFound()
  return <MdxPageLayout page={page} />
}
