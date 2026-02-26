import { AboutContent } from './AboutContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hakkımızda | Moyduz — E-Ticaret & Dijital Altyapı Şirketi',
  description: 'Moyduz; e-ticaret altyapısı, özel yazılım ve performans odaklı web çözümleri geliştiren bir dijital teknoloji şirketidir. Ekibimizi ve misyonumuzu keşfedin.',
  alternates: { canonical: 'https://moyduz.com/about' },
  openGraph: {
    title: 'Hakkımızda | Moyduz',
    description: 'E-ticaret altyapısı, özel yazılım ve performans odaklı web çözümleri geliştiren dijital teknoloji şirketi.',
    url: 'https://moyduz.com/about',
    locale: 'tr_TR',
    siteName: 'Moyduz',
    images: [{ url: 'https://moyduz.com/opengraph-image', width: 1200, height: 630, alt: 'Moyduz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hakkımızda | Moyduz — E-Ticaret & Dijital Altyapı Şirketi',
    description: 'E-ticaret altyapısı, özel yazılım ve performans odaklı web çözümleri geliştiren dijital teknoloji şirketi.',
    images: ['https://moyduz.com/opengraph-image'],
  },
}

export default function AboutPage() {
  return <AboutContent />
}
