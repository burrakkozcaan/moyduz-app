import { ServicesSection } from '@/components/ServicesSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hizmetler — Web Tasarım, E-Ticaret & Yazılım | Moyduz',
  description:
    'Web tasarım, e-ticaret platformu geliştirme, özel yazılım ve dijital pazarlama hizmetleri. Moyduz ile projenizi hayata geçirin.',
  alternates: { canonical: 'https://moyduz.com/services' },
  openGraph: {
    title: 'Hizmetler | Moyduz',
    description: 'Web tasarım, e-ticaret ve yazılım geliştirme hizmetleri.',
    url: 'https://moyduz.com/services',
    locale: 'tr_TR',
    siteName: 'Moyduz',
    images: [{ url: 'https://moyduz.com/opengraph-image', width: 1200, height: 630, alt: 'Moyduz' }],
  },
}

export default function ServicesPage() {
  return (
    <main className="flex-1">
      <ServicesSection />
    </main>
  )
}
