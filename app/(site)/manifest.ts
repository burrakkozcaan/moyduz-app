import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Moyduz – Software Company & Web Design Agency",
    short_name: "Moyduz",
    description:
      "E-Ticaret & Dijital Altyapı Çözümleri",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon.svg",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon.svg",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    categories: ["business", "productivity", "developer", "e-commerce", "digital", "al"],
    lang: "en-US",
    dir: "ltr",
    scope: "/",
    prefer_related_applications: false,
  };
}
