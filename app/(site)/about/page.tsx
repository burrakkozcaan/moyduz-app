import { AboutContent } from './AboutContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Moyduz',
  description: 'Learn about Moyduz – building modern software for operators worldwide.',
}

export default function AboutPage() {
  return <AboutContent />
}
