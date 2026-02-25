import type { Metadata } from "next";
import "fumadocs-ui/style.css";
import "./globals.css";
import { Inter as FontSans, Kalam } from 'next/font/google';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/utils/cn';
import { Provider as TooltipProvider } from '@/components/new-ui/tooltip';
import { NotificationProvider } from '@/components/new-ui/notification-provider';
import {
  buildWebsiteSchema,
  buildOrganizationSchema,
  buildSoftwareApplicationSchema,
  buildServiceSchema,
  buildLocalBusinessSchema,
} from "@/seo/json-ld/index";

const inter = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

const geistMono = localFont({
  src: './fonts/GeistMono[wght].woff2',
  variable: '--font-geist-mono',
  weight: '100 900',
  display: 'swap',
  preload: false,
});

const kalam = Kalam({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-kalam',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://moyduz.com"),

  title: "Software Company & Web Design Agency | Moyduz",
  description:
    "Software company & web design agency delivering e-commerce platforms, SaaS products, and AI automation. Trusted by businesses worldwide.",

  keywords: [
    "software company",
    "web design agency",
    "web development company",
    "e-commerce agency",
    "e-commerce development",
    "saas development",
    "web designer",
    "digital agency",
    "web design company",
  ],

  authors: [{ name: "Moyduz Team", url: "https://moyduz.com" }],
  creator: "Moyduz",
  publisher: "Moyduz",
  category: "Technology",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  appleWebApp: {
    capable: true,
    title: "Moyduz",
    statusBarStyle: "black-translucent",
  },

  openGraph: {
    title: "Moyduz – Software Company & Web Design Agency",
    description:
      "Custom e-commerce platforms, SaaS products and AI automation tools by a leading software company and web design agency.",
    url: "https://moyduz.com",
    siteName: "Moyduz",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Moyduz – Software Company & Web Design Agency",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Moyduz – Software Company & Web Design Agency",
    description: "E-Commerce, SaaS, AI Automation & Web Design",
    images: ["/opengraph-image"],
  },

  alternates: {
    canonical: "https://moyduz.com",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  other: {
    "geo.region": "US-NM",
    "geo.placename": "Albuquerque",
    areaServed: "Worldwide",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
    lang='en'
    suppressHydrationWarning
    className={cn(
      inter.variable,
      geistMono.variable,
      kalam.variable,
      'antialiased',
    )}
  >
    <head>
      <link rel="preconnect" href="https://cdn.moydus.com" />
      <link rel="dns-prefetch" href="https://cdn.moydus.com" />

      <link
        rel="alternate"
        type="application/rss+xml"
        title="Moyduz Blog RSS Feed"
        href="https://moyduz.com/feed.xml"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            buildWebsiteSchema(),
            buildOrganizationSchema(),
            buildSoftwareApplicationSchema(),
            buildServiceSchema({
              url: "https://moyduz.com/services",
              name: "Digital Services",
              description:
                "Comprehensive digital services including web design, web development, e-commerce development, custom software development, and digital marketing services.",
              category: "Digital Services",
              areaServed: "Worldwide",
            }),
            buildLocalBusinessSchema(),
          ]),
        }}
      />
    </head>
    <body>
      <div className='relative isolate flex min-h-screen flex-col overflow-x-hidden bg-ln-gray-25'>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </div>
      <NotificationProvider />
    </body>
  </html>
  );
}
