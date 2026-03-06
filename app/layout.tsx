import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans, Kalam } from 'next/font/google';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/utils/cn';
import { Provider as TooltipProvider } from '@/components/new-ui/tooltip';
import { NotificationProvider } from '@/components/new-ui/notification-provider';
import LenisScrollProvider from '@/components/providers/lenis-provider';
import { MotionConfig } from 'motion/react';
import Script from 'next/script';
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

  title: "Yazılım Şirketi & Web Tasarım Ajansı | Moyduz",
  description:
    "E-ticaret platformları, SaaS ürünleri ve yapay zeka otomasyon çözümleri sunan yazılım şirketi ve web tasarım ajansı. Dünya genelinde işletmelerin güvendiği çözüm ortağı.",

  keywords: [
    "yazılım şirketi",
    "web tasarım ajansı",
    "web geliştirme şirketi",
    "e-ticaret ajansı",
    "e-ticaret geliştirme",
    "saas geliştirme",
    "web tasarımcı",
    "dijital ajans",
    "web tasarım şirketi",
  ],

  authors: [{ name: "Moyduz Team", url: "https://moyduz.com" }],
  creator: "Moyduz",
  publisher: "Moyduz",
  category: "Teknoloji",

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

  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",

  openGraph: {
    title: "Moyduz – Yazılım Şirketi & Web Tasarım Ajansı",
    description:
      "Önde gelen yazılım şirketi ve web tasarım ajansı tarafından sunulan özel e-ticaret platformları, SaaS ürünleri ve yapay zeka otomasyon araçları.",
    url: "https://moyduz.com",
    siteName: "Moyduz",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Moyduz – Yazılım Şirketi & Web Tasarım Ajansı",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Moyduz – Yazılım Şirketi & Web Tasarım Ajansı",
    description: "E-Ticaret, SaaS, Yapay Zeka Otomasyonu & Web Tasarımı",
    images: ["/opengraph-image"],
  },

  alternates: {
    canonical: "https://moyduz.com",
    languages: {
      "tr-TR": "https://moyduz.com",
      "x-default": "https://moyduz.com",
    },
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
    "geo.region": "TR-34",
    "geo.placename": "Istanbul",
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
      lang='tr'
      suppressHydrationWarning
      className={cn(
        inter.variable,
        geistMono.variable,
        kalam.variable,
        'antialiased',
      )}
    >
      <head>
        <link rel="preconnect" href="https://cdn.moyduz.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.moyduz.com" />

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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RS0YYVJ21H"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-RS0YYVJ21H');
        `}
        </Script>
        <div className='relative isolate flex min-h-screen flex-col overflow-x-hidden bg-[#f7f7f7] dark:bg-ln-gray-900'>
          <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
            <MotionConfig initial={false}>
              <TooltipProvider>
                <LenisScrollProvider>
                  {children}
                </LenisScrollProvider>
              </TooltipProvider>
            </MotionConfig>
          </ThemeProvider>
        </div>
        <NotificationProvider />
      </body>
    </html>
  );
}
