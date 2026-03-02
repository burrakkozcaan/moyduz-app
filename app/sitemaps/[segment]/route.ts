import { getAllBlogPosts } from '@/lib/mdx'
import { getPage, SERVICE_SLUGS } from '@/lib/mdx-pages'
import { getAllRehberPosts } from '@/lib/rehber'
import { getAllComparePosts } from '@/lib/compare'
import {
  SITE_URL,
  SITEMAP_SECTIONS,
  type SitemapSectionId,
} from '@/lib/sitemap-index-lastmod'

const CACHE_CONTROL =
  's-maxage=3600, stale-while-revalidate=86400'

const STATIC_URLS: Array<{
  path: string
  lastmod?: Date
  changefreq?: string
  priority?: number
}> = [
  { path: '', changefreq: 'weekly', priority: 1.0 },
  { path: '/about', changefreq: 'monthly', priority: 0.8 },
  { path: '/services', changefreq: 'weekly', priority: 0.9 },
  { path: '/pricing', changefreq: 'weekly', priority: 0.9 },
  { path: '/blog', changefreq: 'daily', priority: 0.9 },
  { path: '/contact', changefreq: 'monthly', priority: 0.8 },
  { path: '/faq', changefreq: 'monthly', priority: 0.7 },
  { path: '/careers', changefreq: 'monthly', priority: 0.6 },
  { path: '/customers', changefreq: 'monthly', priority: 0.7 },
  { path: '/compare', changefreq: 'monthly', priority: 0.6 },
  { path: '/alternatives', changefreq: 'monthly', priority: 0.6 },
  { path: '/changelog', changefreq: 'weekly', priority: 0.6 },
  { path: '/e-ticaret-nasil-yapilir-2026-rehberi', changefreq: 'monthly', priority: 0.9 },
  { path: '/e-ticaret-paketleri', changefreq: 'weekly', priority: 0.9 },
  { path: '/ozel-e-ticaret', changefreq: 'monthly', priority: 0.7 },
  { path: '/b2b-ecommerce', changefreq: 'monthly', priority: 0.7 },
  { path: '/cok-saticili-e-ticaret-altyapisi', changefreq: 'monthly', priority: 0.7 },
  { path: '/ecommerce-migration', changefreq: 'monthly', priority: 0.7 },
  { path: '/basinda-biz', changefreq: 'yearly', priority: 0.4 },
  { path: '/partner-programi', changefreq: 'monthly', priority: 0.5 },
  { path: '/marketplace/templates', changefreq: 'weekly', priority: 0.8 },
  { path: '/privacy-policy', changefreq: 'yearly', priority: 0.3 },
  { path: '/terms-of-service', changefreq: 'yearly', priority: 0.3 },
  { path: '/refund-policy', changefreq: 'yearly', priority: 0.3 },
]

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function urlEntry(
  loc: string,
  lastmod: string,
  changefreq?: string,
  priority?: number
): string {
  let out = `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>`
  if (changefreq) out += `\n    <changefreq>${changefreq}</changefreq>`
  if (priority != null) out += `\n    <priority>${priority}</priority>`
  out += '\n  </url>'
  return out
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ segment: string }> }
) {
  const { segment: rawSegment } = await context.params
  const segmentId = rawSegment.replace(/\.xml$/i, '') as SitemapSectionId

  if (!SITEMAP_SECTIONS.includes(segmentId)) {
    return new Response('Not Found', { status: 404 })
  }

  const now = new Date().toISOString()

  let urls: string[] = []

  switch (segmentId) {
    case 'static':
      urls = STATIC_URLS.map((u) =>
        urlEntry(
          `${SITE_URL}${u.path}`,
          u.lastmod ? u.lastmod.toISOString() : now,
          u.changefreq,
          u.priority
        )
      )
      break
    case 'blog': {
      const posts = await getAllBlogPosts()
      urls = posts.map((p) => {
        const d =
          p.frontmatter.updated_at || p.frontmatter.published_at
        const lastmod = d
          ? new Date(d).toISOString()
          : now
        return urlEntry(
          `${SITE_URL}/blog/${p.frontmatter.slug}`,
          lastmod,
          'monthly',
          0.7
        )
      })
      break
    }
    case 'services':
      for (const slug of SERVICE_SLUGS) {
        const page = await getPage(slug)
        const d =
          page?.frontmatter.dateModified ||
          page?.frontmatter.datePublished
        const lastmod = d ? new Date(d).toISOString() : now
        urls.push(
          urlEntry(
            `${SITE_URL}/services/${slug}`,
            lastmod,
            'monthly',
            0.8
          )
        )
      }
      break
    case 'rehber': {
      const posts = await getAllRehberPosts()
      urls = posts.map((p) => {
        const d = p.frontmatter.updated_at || p.frontmatter.published_at
        const lastmod = d ? new Date(d).toISOString() : now
        return urlEntry(
          `${SITE_URL}/rehber/${p.frontmatter.slug}`,
          lastmod,
          'monthly',
          0.7
        )
      })
      break
    }
    case 'tools': {
      const toolPaths = [
        '/tools/maliyet-hesaplama',
        '/tools/roi-hesaplama',
        '/tools/komisyon-hesaplama',
        '/tools/sanal-pos-hesaplama',
        '/tools/site-saglik-skoru',
        '/tools',
      ]
      urls = toolPaths.map((p) =>
        urlEntry(`${SITE_URL}${p}`, now, 'monthly', 0.7)
      )
      break
    }
    case 'compare': {
      const comparePosts = await getAllComparePosts()
      urls = comparePosts.map((p) => {
        const d = p.frontmatter.updated_at || p.frontmatter.published_at
        const lastmod = d ? new Date(d).toISOString() : now
        return urlEntry(
          `${SITE_URL}/compare/${p.frontmatter.slug}`,
          lastmod,
          'monthly',
          0.7
        )
      })
      break
    }
    default:
      urls = []
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': CACHE_CONTROL,
    },
  })
}
