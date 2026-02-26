import { getAllBlogPosts } from '@/lib/mdx'
import { getPage, SERVICE_SLUGS } from '@/lib/mdx-pages'
import { getAllRehberPosts } from '@/lib/rehber'
import { getAllComparePosts } from '@/lib/compare'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://moyduz.com'

/** Segment id'leri — index otomatik bu listeyi kullanır; yeni segment ekleyince buraya + route'da case ekle */
export const SITEMAP_SECTIONS = [
  'static',
  'blog',
  'services',
  'rehber',
  'tools',
  'compare',
] as const

export type SitemapSectionId = (typeof SITEMAP_SECTIONS)[number]

const FETCH_TIMEOUT_MS = 3000

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), ms)
    ),
  ])
}

/** Her segment için son değişiklik tarihi — ISO-8601 (Z'li). */
export async function getSegmentLastMod(
  id: SitemapSectionId
): Promise<string> {
  try {
    const result = await withTimeout(
      (async (): Promise<string> => {
        switch (id) {
          case 'static':
            return new Date().toISOString()
          case 'blog': {
            const posts = await getAllBlogPosts()
            if (posts.length === 0) return new Date().toISOString()
            const latest = posts.reduce((acc, p) => {
              const d =
                p.frontmatter.updated_at || p.frontmatter.published_at
              const t = d ? new Date(d).getTime() : 0
              return t > acc ? t : acc
            }, 0)
            return latest ? new Date(latest).toISOString() : new Date().toISOString()
          }
          case 'services': {
            let latest = 0
            for (const slug of SERVICE_SLUGS) {
              const page = await getPage(slug)
              const d =
                page?.frontmatter.dateModified ||
                page?.frontmatter.datePublished
              if (d) {
                const t = new Date(d).getTime()
                if (t > latest) latest = t
              }
            }
            return latest
              ? new Date(latest).toISOString()
              : new Date().toISOString()
          }
          case 'rehber': {
            const posts = await getAllRehberPosts()
            if (posts.length === 0) return new Date().toISOString()
            const latest = posts.reduce((acc, p) => {
              const d = p.frontmatter.updated_at || p.frontmatter.published_at
              const t = d ? new Date(d).getTime() : 0
              return t > acc ? t : acc
            }, 0)
            return latest ? new Date(latest).toISOString() : new Date().toISOString()
          }
          case 'tools':
            return new Date().toISOString()
          case 'compare':
            return new Date().toISOString()
          default:
            return new Date().toISOString()
        }
      })(),
      FETCH_TIMEOUT_MS
    )
    return result
  } catch {
    return new Date().toISOString()
  }
}

/** Index lastmod = tüm segment lastmod'larının en büyüğü (örn. blog güncellenince index de ilerler). */
export async function getIndexLastMod(): Promise<string> {
  const dates = await Promise.all(
    SITEMAP_SECTIONS.map((id) => getSegmentLastMod(id))
  )
  const max = dates.reduce((acc, d) => {
    const t = new Date(d).getTime()
    return t > acc ? t : acc
  }, 0)
  return new Date(max).toISOString()
}

export function getSitemapSegmentUrl(segmentId: string): string {
  return `${SITE_URL}/sitemaps/${segmentId}.xml`
}

export { SITE_URL }
