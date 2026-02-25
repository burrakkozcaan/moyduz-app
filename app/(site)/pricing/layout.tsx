import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fiyatlandırma — Web, E-Ticaret & Yazılım Projeleri | Moyduz',
  description:
    'Web tasarım, e-ticaret platformu ve özel yazılım geliştirme için şeffaf fiyatlar. Moyduz ile projenizin maliyetini öğrenin.',
  alternates: { canonical: 'https://moyduz.com/pricing' },
  openGraph: {
    title: 'Fiyatlandırma | Moyduz',
    description: 'Web tasarım, e-ticaret platformu ve özel yazılım geliştirme için şeffaf fiyatlandırma.',
    url: 'https://moyduz.com/pricing',
    locale: 'tr_TR',
    siteName: 'Moyduz',
    images: [{ url: 'https://moyduz.com/opengraph-image', width: 1200, height: 630, alt: 'Moyduz' }],
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
