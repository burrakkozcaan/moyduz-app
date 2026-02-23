import { getPage } from '@/lib/mdx-pages'
import { MdxPageLayout } from '@/components/MdxPageLayout'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers | Moyduz',
  description:
    'Join Moyduz – remote-first roles in engineering, design, and customer success.',
  alternates: { canonical: 'https://moyduz.com/careers' },
  openGraph: {
    title: 'Careers | Moyduz',
    description: 'Join Moyduz – remote-first roles in engineering, design, and customer success.',
    url: 'https://moyduz.com/careers',
  },
}

export default async function CareersPage() {
  const page = await getPage('careers')
  if (!page) notFound()
  return <MdxPageLayout page={page} />
}
