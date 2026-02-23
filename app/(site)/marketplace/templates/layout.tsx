import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Website Templates Marketplace – Professional Templates | Moyduz',
  description:
    'Browse professional website templates for e-commerce, business, portfolios, and more. High-quality designs ready to customize. Free and premium templates available.',
  keywords: [
    'website templates',
    'web templates',
    'e-commerce templates',
    'business templates',
    'premium templates',
    'free templates',
  ],
  openGraph: {
    title: 'Website Templates Marketplace – Professional Templates | Moyduz',
    description:
      'Browse professional website templates for e-commerce, business, and more.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Templates Marketplace | Moyduz',
    description: 'Browse professional website templates.',
  },
}

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
