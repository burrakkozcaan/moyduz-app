import {
  SITEMAP_SECTIONS,
  getSegmentLastMod,
  getSitemapSegmentUrl,
} from '@/lib/sitemap-index-lastmod'

const CACHE_CONTROL =
  's-maxage=3600, stale-while-revalidate=86400'

export async function GET() {
  const entries = await Promise.all(
    SITEMAP_SECTIONS.map(async (id) => {
      const lastmod = await getSegmentLastMod(id)
      return { loc: getSitemapSegmentUrl(id), lastmod }
    })
  )

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) =>
      `  <sitemap>\n    <loc>${escapeXml(e.loc)}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': CACHE_CONTROL,
    },
  })
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
