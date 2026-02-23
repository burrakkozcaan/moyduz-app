import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const llmsContent = `# Moyduz

> Moyduz is a US-based software company and web design agency delivering custom e-commerce platforms, SaaS products, and AI automation tools. Serving businesses worldwide across 150+ countries.

## Services

- [Web Design Agency](https://moyduz.com/services/web-design): Professional website design services for brands worldwide. Custom UI/UX, responsive design, and conversion optimization.
- [Web Development](https://moyduz.com/services/web-development): Full-stack web development services including Next.js, React, and Node.js applications.
- [E-Commerce Development](https://moyduz.com/services/ecommerce): Online store and marketplace development with B2C/B2B commerce capabilities.
- [Digital Marketing](https://moyduz.com/services/digital-marketing): SEO, content marketing, and performance marketing to drive growth and visibility.
- [Custom Software Development](https://moyduz.com/services/custom-software): Tailored software solutions for complex business requirements and integrations.

## Pricing

- [Pricing](https://moyduz.com/pricing): Transparent pricing for all packages.
  - Starter: $3,250+ one-time setup, $125-$175/month maintenance, 5-10 business days delivery
  - Commerce Suite: $5,950+ starting, $175-$275/month, 3-6 weeks delivery
  - Marketplace Suite: $8,000+ starting, $250-$450/month, 6-10 weeks delivery
  - Custom: Scoped per project, ongoing development, 8-12+ weeks delivery

## Authority Pages

- [Services Hub](https://moyduz.com/services): Comprehensive digital services directory.
- [Blog](https://moyduz.com/blog): Expert insights on web design, development, e-commerce, and digital marketing.
- [About](https://moyduz.com/about): Company information, mission, and team.
- [Customers](https://moyduz.com/customers): Customer success stories and testimonials.

## AI Feeds

- [AI Index](https://moyduz.com/ai-index.json): AI search index for LLM discovery.
- [Knowledge Graph](https://moyduz.com/knowledge-graph.json): Entity relationships and service connections.
- [AI Business](https://moyduz.com/ai-business.json): Business entity information and E-E-A-T signals.
- [Author Signals](https://moyduz.com/author-signals.json): Author reputation graph.
- [Experiences](https://moyduz.com/experiences.json): User experiences feed for AI Overviews.
- [Vector Sitemap](https://moyduz.com/vector-sitemap.json): Semantic sitemap for AI engines.

## Contact

- Email: info@moyduz.com
- Phone: +1-505-460-5392
- Website: https://moyduz.com
- Contact Form: https://moyduz.com/contact
`;

  return new NextResponse(llmsContent, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
