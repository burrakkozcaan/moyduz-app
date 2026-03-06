import { cache } from 'react'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

export interface PageFrontmatter {
  title: string
  description?: string
  meta_description?: string
  slug?: string
  canonical_url?: string
  keywords?: string[]
  datePublished?: string
  dateModified?: string
  hero?: {
    title: string
    subtitle: string
    description: string
    cta_primary?: { text: string; href: string }
    cta_secondary?: { text: string; href: string }
    image?: string
  }
  faqs?: Array<{ question: string; answer: string }>
  toc?: Array<{ id: string; label: string }>
  summary?: string
  related_services?: Array<{ title: string; description: string; href: string }>
  footer_links?: Array<{ text: string; href: string }>
  [key: string]: unknown
}

export interface PageContent {
  frontmatter: PageFrontmatter
  content: string
}

const PAGES_DIR = path.join(process.cwd(), 'content', 'pages')

const PAGE_SLUGS = [
  'services',
  'about',
  'compare',
  'alternatives',
  'careers',
  'customers',
  'ecommerce-website-development',
  'software-company',
  'web-design',
  'web-design-agency',
  'web-design-company',
  'web-development-company',
  'privacy-policy',
  'refund-policy',
  'terms-of-service',
  'ozel-e-ticaret',
  'b2b-ecommerce',
  'multi-vendor',
  'ecommerce-migration',
] as const

export type PageSlug = (typeof PAGE_SLUGS)[number]

export const SERVICE_SLUGS = [
  'ecommerce-website-development',
  'software-company',
  'web-design',
  'web-design-agency',
  'web-design-company',
  'web-development-company',
] as const

export type ServiceSlug = (typeof SERVICE_SLUGS)[number]

export const getPage = cache(async function getPage(slug: string): Promise<PageContent | null> {
  try {
    const filePath = path.join(PAGES_DIR, `${slug}.mdx`)
    if (!fs.existsSync(filePath)) return null

    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    return {
      frontmatter: { ...data, slug } as PageFrontmatter,
      content,
    }
  } catch {
    return null
  }
})

export function getPageSlugs(): PageSlug[] {
  return [...PAGE_SLUGS]
}
