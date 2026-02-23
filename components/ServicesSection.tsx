'use client';

import React from 'react';
import Link from 'next/link';
import {
  Palette,
  Code2,
  ShoppingCart,
  Layout,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const CARD_SERVICES: {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}[] = [
  {
    icon: Palette,
    title: 'Web Tasarım',
    description: 'Markanıza özel, dönüşüm odaklı web sitesi tasarımı ve arayüz geliştirme.',
    href: '/services/web-design',
  },
  {
    icon: Code2,
    title: 'Web Geliştirme',
    description: 'Modern teknoloji ile ölçeklenebilir, hızlı ve güvenilir web uygulamaları.',
    href: '/services/web-development-company',
  },
  {
    icon: Layout,
    title: 'Kurumsal Site',
    description: 'Kurumsal kimliğinize uygun, profesyonel kurumsal web siteleri.',
    href: '/services/web-design-company',
  },
  {
    icon: ShoppingCart,
    title: 'E-Ticaret',
    description: 'Online mağaza ve pazar yeri projeleri; ödeme ve kargo entegrasyonları.',
    href: '/services/ecommerce-website-development',
  },
];

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

function ServiceCard({ icon: Icon, title, description, href }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex h-full flex-col gap-3 rounded-[20px] border border-ln-gray-200 bg-white p-4 transition-[100ms] ease-in-out dark:border-ln-gray-800 dark:bg-ln-gray-900/50 md:p-5',
        'hover:border-ln-orange/30 hover:bg-ln-gray-50 dark:hover:border-ln-orange/30 dark:hover:bg-ln-gray-800/50'
      )}
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ln-orange text-white">
        <Icon className="size-5" aria-hidden strokeWidth={2} />
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-left text-sm font-medium leading-snug text-ln-gray-900 dark:text-ln-gray-0 md:text-base">
          {title}
        </h3>
        <p className="text-left text-xs leading-relaxed text-ln-gray-600 dark:text-ln-gray-400 md:text-sm">
          {description}
        </p>
      </div>
    </Link>
  );
}

export function ServicesSection() {
  return (
    <section
      id="hizmetler"
      className="relative flex w-full items-center justify-center overflow-hidden  py-16 px-6 md:py-20 md:px-8 dark:bg-ln-gray-950"
    >
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-14 md:gap-16">
        {/* Başlık */}
        <div className="flex max-w-[540px] flex-col items-center gap-5 text-center">
          <h2 className="text-2xl font-bold leading-tight text-ln-gray-900 dark:text-ln-gray-0 md:text-3xl lg:text-4xl xl:text-5xl">
            Hizmetlerimiz
          </h2>
          <p className="text-base leading-relaxed text-ln-gray-600 dark:text-ln-gray-400 md:text-lg">
            Web sitesi, e-ticaret ve yazılım projeleriniz için ihtiyacınız olan tüm çözümleri sunuyoruz.
          </p>
        </div>

        {/* 3 kolon: Kartlar | Görsel | Kartlar */}
        <div className="flex w-full flex-col items-center gap-6 md:flex-row md:gap-6 lg:gap-8">
          {/* Sol: 2 kart */}
          <div className="flex w-full flex-col gap-5 md:w-1/3">
            <ServiceCard
              icon={CARD_SERVICES[0].icon}
              title={CARD_SERVICES[0].title}
              description={CARD_SERVICES[0].description}
              href={CARD_SERVICES[0].href}
            />
            <ServiceCard
              icon={CARD_SERVICES[1].icon}
              title={CARD_SERVICES[1].title}
              description={CARD_SERVICES[1].description}
              href={CARD_SERVICES[1].href}
            />
          </div>

          {/* Orta: Görsel — /hizmetlerimiz.png veya istediğiniz görseli buraya ekleyebilirsiniz */}
          <div className="relative h-[280px] w-full md:h-[360px] lg:h-[440px] md:w-1/3">
            <div className="flex size-full items-center justify-center overflow-hidden rounded-2xl bg-ln-gray-100 dark:bg-ln-gray-800">
              <span className="text-sm font-medium text-ln-gray-400 dark:text-ln-gray-500">
                Görsel alanı
              </span>
            </div>
          </div>

          {/* Sağ: 2 kart */}
          <div className="flex w-full flex-col gap-5 md:w-1/3">
            <ServiceCard
              icon={CARD_SERVICES[2].icon}
              title={CARD_SERVICES[2].title}
              description={CARD_SERVICES[2].description}
              href={CARD_SERVICES[2].href}
            />
            <ServiceCard
              icon={CARD_SERVICES[3].icon}
              title={CARD_SERVICES[3].title}
              description={CARD_SERVICES[3].description}
              href={CARD_SERVICES[3].href}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
