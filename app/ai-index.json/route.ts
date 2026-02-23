import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const data = {
    generated_at: new Date().toISOString(),
    source: "moyduz.com",
    total: 10,
    items: [
      {
        title: "Moyduz – Software Company & Web Design Agency",
        snippet: "Full-service software company and web design agency delivering scalable e-commerce platforms, custom SaaS products, and AI automation solutions.",
        url: "https://moyduz.com",
        category: "homepage",
        keywords: ["software company", "web design agency", "digital agency"],
      },
      {
        title: "Services",
        snippet: "Explore comprehensive digital services including web design, development, e-commerce, and software solutions.",
        url: "https://moyduz.com/services",
        category: "services",
        keywords: ["digital services", "web design services", "development services"],
      },
      {
        title: "Pricing",
        snippet: "Transparent pricing for premium websites ($3,250+), B2B/B2C commerce ($5,950+), and multi-vendor marketplaces ($8,000+).",
        url: "https://moyduz.com/pricing",
        category: "pricing",
        keywords: ["web design pricing", "e-commerce pricing", "marketplace pricing"],
      },
      {
        title: "Blog",
        snippet: "Expert insights on web design, development, e-commerce, and digital marketing trends.",
        url: "https://moyduz.com/blog",
        category: "blog",
        keywords: ["web design blog", "development insights", "digital marketing tips"],
      },
      {
        title: "About",
        snippet: "Learn about Moyduz, a US-based software company and web design agency serving businesses worldwide.",
        url: "https://moyduz.com/about",
        category: "about",
        keywords: ["about moyduz", "company info", "web design agency"],
      },
      {
        title: "Contact",
        snippet: "Get in touch with Moyduz for custom web design, e-commerce, and software development projects.",
        url: "https://moyduz.com/contact",
        category: "contact",
        keywords: ["contact moyduz", "get a quote", "web design consultation"],
      },
      {
        title: "Customers",
        snippet: "Trusted by companies worldwide. See customer success stories and testimonials.",
        url: "https://moyduz.com/customers",
        category: "customers",
        keywords: ["customer stories", "testimonials", "case studies"],
      },
      {
        title: "Careers",
        snippet: "Join Moyduz – remote-first roles in engineering, design, and customer success.",
        url: "https://moyduz.com/careers",
        category: "careers",
        keywords: ["jobs", "careers", "remote work"],
      },
      {
        title: "FAQ",
        snippet: "Frequently asked questions about Moyduz services, pricing, and process.",
        url: "https://moyduz.com/faq",
        category: "faq",
        keywords: ["faq", "questions", "support"],
      },
      {
        title: "Marketplace Templates",
        snippet: "Pre-built marketplace templates for e-commerce, SaaS, and multi-vendor platforms.",
        url: "https://moyduz.com/marketplace/templates",
        category: "marketplace",
        keywords: ["templates", "marketplace", "e-commerce templates"],
      },
    ],
  };

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
