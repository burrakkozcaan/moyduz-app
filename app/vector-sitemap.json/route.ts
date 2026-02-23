import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const data = {
    generated_at: new Date().toISOString(),
    source: "moyduz.com",
    pages: [
      { url: "https://moyduz.com", title: "Moyduz – Software Company & Web Design Agency", type: "homepage", priority: 1.0 },
      { url: "https://moyduz.com/services", title: "Services Hub", type: "hub", priority: 0.9 },
      { url: "https://moyduz.com/pricing", title: "Pricing", type: "pricing", priority: 0.9 },
      { url: "https://moyduz.com/blog", title: "Blog", type: "blog", priority: 0.8 },
      { url: "https://moyduz.com/about", title: "About", type: "about", priority: 0.7 },
      { url: "https://moyduz.com/contact", title: "Contact", type: "contact", priority: 0.7 },
      { url: "https://moyduz.com/customers", title: "Customers", type: "customers", priority: 0.7 },
      { url: "https://moyduz.com/faq", title: "FAQ", type: "faq", priority: 0.6 },
      { url: "https://moyduz.com/careers", title: "Careers", type: "careers", priority: 0.5 },
      { url: "https://moyduz.com/marketplace/templates", title: "Marketplace Templates", type: "marketplace", priority: 0.8 },
      { url: "https://moyduz.com/changelog", title: "Changelog", type: "changelog", priority: 0.5 },
      { url: "https://moyduz.com/compare", title: "Karşılaştır", type: "comparison", priority: 0.6 },
      { url: "https://moyduz.com/alternatives", title: "Alternatifler", type: "alternatives", priority: 0.6 },
    ],
  };

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
