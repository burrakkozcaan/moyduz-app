import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Site Sağlık Skoru | Moyduz Araçları',
  description:
    'E-ticaret sitenizin performans ve teknik sağlık skoru. Yakında.',
  alternates: {
    canonical: 'https://moyduz.com/tools/site-saglik-skoru',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
