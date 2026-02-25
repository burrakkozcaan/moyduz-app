import { getPage } from '@/lib/mdx-pages'
import { MdxPageLayout } from '@/components/MdxPageLayout'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gizlilik Politikası ve KVKK | Moyduz',
  description: 'Kişisel verilerinizin korunması ve KVKK kapsamındaki haklarınız hakkında bilgi.',
  alternates: { canonical: 'https://moyduz.com/privacy-policy' },
  openGraph: {
    title: 'Gizlilik Politikası ve KVKK | Moyduz',
    description: 'Kişisel verilerinizin korunması ve KVKK kapsamındaki haklarınız.',
    url: 'https://moyduz.com/privacy-policy',
  },
}

export default async function PrivacyPolicyPage() {
  const page = await getPage('privacy-policy')
  if (!page) notFound()
  return <MdxPageLayout page={page} showLegalFooter />
}
