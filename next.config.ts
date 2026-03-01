import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for OpenNext Cloudflare Workers deployment
  output: "standalone",

  // Vercel/Google /favicon.ico istediğinde logomuz (favicon.svg) gitsin
  async rewrites() {
    return [
      { source: "/favicon.ico", destination: "/favicon.svg" },
    ];
  },

  // Source map'leri production'da kapat (reverse engineering zorlaşsın)
  productionBrowserSourceMaps: false,

  // Skip TypeScript errors during build (fix later)
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.moydus.com",
      },
      {
        protocol: "https",
        hostname: "moydus-r2.cloudflare.r2.dev",
      },
      {
        protocol: "https",
        hostname: "5e5f8a26d62e3255d96f4410baf43d73.r2.cloudflarestorage.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "deifkwefumgah.cloudfront.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.shadcnstudio.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "framerusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "imagedelivery.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "alignui.com",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
    ],
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"],
    } : false,
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: [
      "@radix-ui/react-icons",
      "lucide-react",
      "framer-motion",
      "motion",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-dialog",
      "@radix-ui/react-accordion",
      "recharts",
      "date-fns",
    ],
    esmExternals: true,
  },

  // Turbopack için boş config (Next.js 16 uyumluluğu)
  turbopack: {},
};

export default nextConfig;
