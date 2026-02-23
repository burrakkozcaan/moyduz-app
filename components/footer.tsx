'use client';

import Link from 'next/link';
import { TrendingUp } from 'lucide-react';
import FlickeringFooter from './flickering-footer';
import { getFooterLinkGroups } from '@/lib/seo/internal-link-graph';
import Image from 'next/image';

// Footer link groups from internal link graph (authority dağıtımı: her sayfada bu linkler taşınır)
const footerGroups = getFooterLinkGroups();

// Şirket (Company) — trust & legal (graph dışı)
const companyLinks = [
  { label: 'Hakkımızda', href: '/about' },
  { label: 'Kariyer', href: '/careers' },
  { label: 'Partner Programı', href: '/partner-programi' },
  { label: 'İletişim', href: '/contact' },
  { label: 'Sizi Arayalım', href: '/sizi-arayalim' },
  { label: 'Basında Biz', href: '/basinda-biz' },
  { label: 'Gizlilik Politikası', href: '/privacy-policy' },
  { label: 'KVKK', href: '/kvkk' },
  { label: 'Kullanım Şartları', href: '/terms-of-service' },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div className="space-y-4">
      <p className="text-ln-label-md font-medium text-ln-gray-900 dark:text-white">
        {title}
      </p>
      <nav className="flex flex-col gap-2" aria-label={title}>
        {links.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="block text-ln-paragraph-sm text-ln-gray-600 transition-colors hover:text-ln-gray-900 dark:text-ln-gray-400 dark:hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default function Footer() {
  return (
    <div className="mt-10 overflow-hidden border-t border-ln-gray-200 xl:mt-[108px]">
      <footer className="container relative flex flex-col gap-12 overflow-hidden xl:pt-[68px]">
        <div className="mx-auto flex w-full flex-col gap-10 py-12 md:py-16">
          {/* Top: Logo + intro */}
          <div className="col-span-2 mb-8 lg:mb-0">
            <div className="flex items-center gap-2 lg:justify-start">
              <Link
                href="/"
                className="flex max-h-8 items-center gap-3 focus:outline-none"
                aria-label="Moyduz Ana Sayfa"
              >
                <div className="relative size-9">
                  <Image
                    src="/favicon.svg"
                    alt="Moyduz Logo"
                    className="absolute -top-0.5 left-1/2 max-w-none -translate-x-1/2 object-contain"
                    width={42}
                    height={42}
                  />
                </div>
              </Link>
              <span className="text-ln-title-h6 font-bold text-ln-gray-900 dark:text-ln-gray-0">
                Moyduz
              </span>
            </div>
            <p className="font-550 mt-4 max-w-lg text-[28px]/[36px] -tracking-[0.02em] text-ln-gray-900 dark:text-white">
              Her yerdeyiz,{' '}
              <span className="text-ln-gray-500 dark:text-ln-gray-400">
                şehriniz dahil
              </span>{' '}
              — Operatörler için büyüme stratejileri, teknik teslimat ve analizler.
            </p>
            <div className="mb-4 mt-4 space-y-7 sm:mb-0">
              <div>
                <p className="mb-2 text-ln-paragraph-sm text-ln-gray-600 dark:text-ln-gray-400">
                  <strong className="text-ln-gray-900 dark:text-ln-gray-100">
                    Ofis Adresi:
                  </strong>
                  <br />
                  İstanbul, Türkiye
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-ln-label-sm text-ln-orange transition-colors hover:text-ln-orange/80"
                >
                  📍 Google Haritalar'da konumumuzu görüntüle
                </a>
              </div>
            </div>
          </div>

          {/* Link grid: 6 columns on large (Şirket + newsletter span 2) — from internal link graph */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-8 lg:gap-y-12">
            {footerGroups.map((group) => (
              <FooterColumn key={group.title} title={group.title} links={group.links} />
            ))}
            <div className="space-y-6 sm:col-span-2 lg:col-span-1 lg:min-w-0">
              <FooterColumn title="Şirket" links={companyLinks} />
              {/* Newsletter */}
              <div className="mt-6 space-y-4">
                <p className="text-ln-label-md text-ln-gray-900 dark:text-white">
                  Ürün güncellemeleri ve sistem bilgileri
                </p>
                <form
                  className="flex flex-col gap-3"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    required
                    placeholder="siz@sirketiniz.com"
                    className="w-full rounded-xl border border-ln-gray-200 bg-ln-gray-50 px-3 py-2.5 text-ln-label-sm text-ln-gray-900 outline-none transition-colors placeholder:text-ln-gray-400 focus:border-ln-orange focus:ring-2 focus:ring-ln-orange/20 dark:border-ln-gray-800 dark:bg-ln-gray-900 dark:text-ln-gray-100"
                  />
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-lg bg-ln-gray-900 py-2.5 text-ln-label-sm font-medium text-ln-gray-0 transition-colors hover:bg-ln-gray-800 dark:bg-ln-gray-0 dark:text-ln-gray-900 dark:hover:bg-ln-gray-100"
                  >
                    Abone Ol
                    <TrendingUp className="ml-2 size-4" />
                  </button>
                </form>
                <p className="text-xs leading-relaxed text-ln-gray-500 dark:text-ln-gray-400">
                  Abone olarak{' '}
                  <Link
                    href="/privacy-policy"
                    className="text-ln-gray-700 underline decoration-ln-gray-300 underline-offset-2 hover:text-ln-gray-900 dark:text-ln-gray-300 dark:hover:text-ln-gray-0"
                  >
                    Gizlilik Politikamızı
                  </Link>
                  {' '}kabul etmiş olursunuz.
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-ln-gray-200 dark:bg-ln-gray-800" />

          {/* Bottom row: SEO tagline + copyright */}
          <div className="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
            <p className="text-sm text-ln-gray-600 dark:text-ln-gray-400 max-w-2xl">
              Türkiye&apos;de özel e-ticaret yazılımı, SaaS platform geliştirme
              ve yüksek performanslı web sistemleri için{' '}
              <Link
                href="/"
                className="font-medium text-ln-gray-900 dark:text-ln-gray-100 hover:text-ln-orange"
              >
                Moyduz
              </Link>
              .
            </p>
            <p className="text-xs text-ln-gray-500 dark:text-ln-gray-400 shrink-0">
              © {new Date().getFullYear()} Moyduz. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
        <FlickeringFooter />
      </footer>
    </div>
  );
}
