import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing | Moyduz',
  description:
    'Transparent pricing for premium websites, e-commerce platforms, and multi-vendor marketplaces. Starting from $3,250.',
  alternates: { canonical: 'https://moyduz.com/pricing' },
  openGraph: {
    title: 'Pricing | Moyduz',
    description: 'Transparent pricing for premium websites, e-commerce platforms, and multi-vendor marketplaces.',
    url: 'https://moyduz.com/pricing',
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
