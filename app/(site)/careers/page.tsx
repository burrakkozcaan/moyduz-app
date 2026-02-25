import { getPage } from '@/lib/mdx-pages'
import { MdxPageLayout } from '@/components/MdxPageLayout'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kariyer — Moyduz Ekibine Katılın | Açık Pozisyonlar',
  description:
    'Moyduz ekibine katılın — mühendislik, tasarım ve müşteri başarısı alanında uzaktan öncelikli açık pozisyonları keşfedin.',
  alternates: { canonical: 'https://moyduz.com/careers' },
  openGraph: {
    title: 'Kariyer | Moyduz',
    description: 'Mühendislik, tasarım ve müşteri başarısı alanında uzaktan öncelikli açık pozisyonlar.',
    url: 'https://moyduz.com/careers',
  },
}

export default async function CareersPage() {
  const page = await getPage('careers')
  if (!page) notFound()
  return <MdxPageLayout page={page} />
}
