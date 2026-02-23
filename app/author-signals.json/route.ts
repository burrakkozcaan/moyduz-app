import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const data = {
    generated_at: new Date().toISOString(),
    source: "moyduz.com",
    authors: [
      {
        name: "Moyduz Team",
        role: "Software Development & Web Design Agency",
        organization: "Moyduz",
        url: "https://moyduz.com/about",
        expertise: [
          "Web Design",
          "Software Development",
          "E-Commerce",
          "Digital Marketing",
          "AI Automation",
        ],
        social: {
          linkedin: "https://www.linkedin.com/company/moydus",
          twitter: "https://x.com/moydus",
        },
      },
    ],
  };

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
