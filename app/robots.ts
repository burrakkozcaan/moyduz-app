import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://moyduz.com'
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/api/', '/admin/'],
      },
      {
        userAgent: 'GPTBot',
        allow: [
          '/llms.txt',
          '/ai-index.json',
          '/knowledge-graph.json',
          '/ai-business.json',
          '/author-signals.json',
          '/experiences.json',
          '/vector-sitemap.json',
        ],
      },
      {
        userAgent: 'ClaudeBot',
        allow: [
          '/llms.txt',
          '/ai-index.json',
          '/knowledge-graph.json',
          '/ai-business.json',
          '/author-signals.json',
          '/experiences.json',
          '/vector-sitemap.json',
        ],
      },
      {
        userAgent: 'PerplexityBot',
        allow: [
          '/llms.txt',
          '/ai-index.json',
          '/knowledge-graph.json',
          '/ai-business.json',
          '/author-signals.json',
          '/experiences.json',
          '/vector-sitemap.json',
        ],
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: [
          '/llms.txt',
          '/ai-index.json',
          '/knowledge-graph.json',
        ],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/ai-index.json`,
      `${baseUrl}/knowledge-graph.json`,
      `${baseUrl}/vector-sitemap.json`,
    ],
  }
}
