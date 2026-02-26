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
      // ——— OPENAI ———
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      // ——— ANTHROPIC (Claude) ———
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: 'claude-web',
        allow: '/',
      },
      // ——— PERPLEXITY ———
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'Perplexity-User',
        allow: '/',
      },
      // ——— GOOGLE (Gemini / AI Overviews) ———
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      // ——— MICROSOFT (Bing / Copilot) ———
      {
        userAgent: 'BingBot',
        allow: '/',
      },
      // ——— APPLE ———
      {
        userAgent: 'Applebot',
        allow: '/',
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
      },
      // ——— META ———
      {
        userAgent: 'FacebookBot',
        allow: '/',
      },
      {
        userAgent: 'meta-externalagent',
        allow: '/',
      },
      // ——— AMAZON ———
      {
        userAgent: 'Amazonbot',
        allow: '/',
      },
      // ——— LINKEDIN ———
      {
        userAgent: 'LinkedInBot',
        allow: '/',
      },
      // ——— BYTEDANCE ———
      {
        userAgent: 'Bytespider',
        allow: '/',
      },
      // ——— DUCKDUCKGO ———
      {
        userAgent: 'DuckAssistBot',
        allow: '/',
      },
      // ——— COHERE ———
      {
        userAgent: 'cohere-ai',
        allow: '/',
      },
      // ——— RESEARCH / COMMON CRAWL ———
      {
        userAgent: 'AI2Bot',
        allow: '/',
      },
      {
        userAgent: 'CCBot',
        allow: '/',
      },
      {
        userAgent: 'Diffbot',
        allow: '/',
      },
      // ——— EMERGING ———
      {
        userAgent: 'TimpiBot',
        allow: '/',
      },
      {
        userAgent: 'YouBot',
        allow: '/',
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
    ],
    host: baseUrl,
  }
}
