import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const data = {
    generated_at: new Date().toISOString(),
    source: "moyduz.com",
    entity: {
      name: "Moyduz",
      type: "Organization",
      description: "US-based web design, software development and AI-powered digital agency serving businesses worldwide across 150+ countries.",
      url: "https://moyduz.com",
      founded: "2020",
      location: "Albuquerque, New Mexico, US",
    },
    services: [
      { name: "Web Design", url: "/services/web-design", category: "web-design" },
      { name: "Web Development", url: "/services/web-development", category: "web-development" },
      { name: "E-Commerce Development", url: "/services/ecommerce", category: "ecommerce" },
      { name: "Digital Marketing", url: "/services/digital-marketing", category: "digital-marketing" },
      { name: "Custom Software", url: "/services/custom-software", category: "software" },
    ],
    relationships: {
      "web-design": {
        about: "/services/web-design",
        related_services: ["/services/web-development", "/services/ecommerce"],
      },
      "web-development": {
        about: "/services/web-development",
        related_services: ["/services/web-design", "/services/custom-software"],
      },
      "ecommerce": {
        about: "/services/ecommerce",
        related_services: ["/services/web-design", "/services/digital-marketing"],
      },
      "digital-marketing": {
        about: "/services/digital-marketing",
        related_services: ["/services/web-design", "/services/ecommerce"],
      },
      "custom-software": {
        about: "/services/custom-software",
        related_services: ["/services/web-development", "/services/ecommerce"],
      },
    },
  };

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
