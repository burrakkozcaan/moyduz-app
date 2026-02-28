import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bize Ulaşın — Proje Teklifi & Görüşme | Moyduz',
  description:
    'Web tasarım, e-ticaret ve yazılım geliştirme projeniz için Moyduz ile iletişime geçin. Ücretsiz keşif görüşmesi için hemen yazın.',
  alternates: { canonical: 'https://moyduz.com/contact' },
  openGraph: {
    title: 'İletişim | Moyduz',
    description: 'Web tasarım, e-ticaret ve yazılım geliştirme projeniz için Moyduz ile iletişime geçin.',
    url: 'https://moyduz.com/contact',
    locale: 'tr_TR',
    siteName: 'Moyduz',
    images: [{ url: 'https://moyduz.com/opengraph-image', width: 1200, height: 630, alt: 'Moyduz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'İletişim | Moyduz',
    description: 'Web tasarım, e-ticaret ve yazılım geliştirme projeniz için Moyduz ile iletişime geçin. 1 iş günü içinde yanıt vereceğiz.',
    images: ['https://moyduz.com/opengraph-image'],
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
