import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const data = {
    generated_at: new Date().toISOString(),
    source: "moyduz.com",
    business: {
      name: "Moyduz",
      legalName: "Moyduz",
      type: "Software Company & Web Design Agency",
      founded: "2020",
      location: {
        street: "1209 Mountain Road Place Northeast, Ste N",
        city: "Albuquerque",
        state: "New Mexico",
        zip: "87110",
        country: "US",
      },
      contact: {
        email: "info@moyduz.com",
        phone: "+1-505-460-5392",
        website: "https://moyduz.com",
      },
      expertise: [
        "Web Design",
        "Software Development",
        "E-commerce Development",
        "Search Engine Optimization",
        "Artificial Intelligence",
        "Digital Marketing",
        "SaaS Development",
      ],
      areaServed: "Worldwide (150+ countries)",
      employees: "10-50",
      rating: { value: "4.9", count: "850", platform: "Aggregated" },
    },
  };

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
