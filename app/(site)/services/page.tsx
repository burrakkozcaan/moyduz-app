import { ServicesSection } from '@/components/ServicesSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services | Moyduz',
  description:
    'Explore our digital services including web design, development, e-commerce, and software solutions.',
}

export default function ServicesPage() {
  return (
    <main className="flex-1">
      <ServicesSection />
    </main>
  )
}
