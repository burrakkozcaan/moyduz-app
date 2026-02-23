import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const data = {
    generated_at: new Date().toISOString(),
    source: "moyduz.com",
    experiences: [
      {
        type: "service",
        title: "Custom Web Design & Development",
        description:
          "Full-service web design and development agency delivering custom websites, e-commerce platforms, and SaaS products. Trusted by businesses across 150+ countries.",
        url: "https://moyduz.com",
        rating: "4.9",
      },
      {
        type: "service",
        title: "E-Commerce Platform Development",
        description:
          "Custom B2C and B2B e-commerce solutions with multi-vendor marketplace capabilities, payment processing, and inventory management.",
        url: "https://moyduz.com/services/ecommerce",
        rating: "4.9",
      },
      {
        type: "service",
        title: "Digital Marketing & SEO",
        description:
          "Data-driven digital marketing strategies including SEO, content marketing, and performance marketing for measurable growth.",
        url: "https://moyduz.com/services/digital-marketing",
        rating: "4.9",
      },
    ],
  };

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
