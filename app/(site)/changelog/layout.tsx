import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Changelog | Moyduz',
  description: 'Latest updates, improvements, and new features from Moyduz.',
  alternates: { canonical: 'https://moyduz.com/changelog' },
  openGraph: {
    title: 'Changelog | Moyduz',
    description: 'Latest updates, improvements, and new features from Moyduz.',
    url: 'https://moyduz.com/changelog',
  },
}

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
