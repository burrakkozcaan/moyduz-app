import type { Metadata } from "next";
import Header from '@/components/header';
import Footer from "@/components/footer";

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

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className='relative bg-ln-gray-25 z-50 flex flex-1 flex-col items-center xl:container dark:bg-ln-gray-900 lg:mt-6 lg:flex xl:mx-auto'>
        <Header />
        <main className='w-full flex-1 overflow-x-hidden'>{children}</main>
      </div>
      <Footer />
    </>
  );
}
