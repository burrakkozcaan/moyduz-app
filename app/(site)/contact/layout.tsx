import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Moyduz',
  description:
    'Get in touch with Moyduz for custom web design, e-commerce, and software development projects.',
  alternates: { canonical: 'https://moyduz.com/contact' },
  openGraph: {
    title: 'Contact | Moyduz',
    description: 'Get in touch with Moyduz for custom web design, e-commerce, and software development projects.',
    url: 'https://moyduz.com/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
