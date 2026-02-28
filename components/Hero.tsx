'use client';

import Link from 'next/link';
import { DottedGlowBackground } from '@/components/ui/dotted-glow-background';
import { ArrowRight } from 'lucide-react';

const borderIllustrationOpacity = '0.12';

export default function Hero() {
  return (
    <div className="relative overflow-hidden pt-20 md:pt-28 lg:pt-44">
      <div className="absolute inset-0  dark:bg-ln-gray-900" aria-hidden />
      <DottedGlowBackground
        className="pointer-events-none mask-radial-at-center max-md:mask-radial-to-50 md:mask-radial-to-90"
        opacity={1}
        gap={8}
        radius={1.6}
        colorLightVar="--color-ln-orange"
        glowColorLightVar="--color-ln-orange"
        colorDarkVar="--color-ln-orange"
        glowColorDarkVar="--color-ln-orange"
        backgroundOpacity={0}
        speedMin={0.3}
        speedMax={1.6}
        speedScale={1}
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6 lg:px-12">
        {/* Announcement pill + decorative lines – mobilde desktoptaki gibi; badge ferah */}
        <div className="relative p-2 md:p-3">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 flex items-center justify-between"
            style={{ ['--color-border-illustration' as string]: `color-mix(in oklab, var(--color-foreground) ${borderIllustrationOpacity})` }}
          >
            <div className="space-y-2 px-4 py-2 sm:px-8 md:px-12">
              <div
                className="h-2 w-32 bg-[repeating-linear-gradient(90deg,var(--color-foreground),var(--color-foreground)_1.5px,transparent_1.5px,transparent_4px)] opacity-20"
              />
              <div
                className="h-2 w-20 bg-[repeating-linear-gradient(90deg,var(--color-foreground),var(--color-foreground)_1.5px,transparent_1.5px,transparent_4px)] opacity-20"
              />
            </div>
            <div className="space-y-2 px-4 py-2 sm:px-8 md:px-12">
              <div
                className="h-2 w-32 bg-[repeating-linear-gradient(90deg,var(--color-foreground),var(--color-foreground)_1.5px,transparent_1.5px,transparent_4px)] opacity-20"
              />
              <div
                className="ml-auto h-2 w-20 bg-[repeating-linear-gradient(90deg,var(--color-foreground),var(--color-foreground)_1.5px,transparent_1.5px,transparent_4px)] opacity-20"
              />
            </div>
          </div>
          <div className="relative z-10 mx-auto flex w-fit max-w-full items-center justify-center gap-3 md:gap-4">
            <div aria-hidden className="flex shrink-0 items-center gap-2 md:gap-3">
              <div className="h-px w-4 bg-foreground/15 md:w-6" />
              <div className="size-2 rounded-full border border-foreground/15" />
              <div
                className="ml-auto h-3 w-5 bg-[repeating-linear-gradient(45deg,var(--color-foreground),var(--color-foreground)_1px,transparent_1px,transparent_6px)] opacity-20 md:h-4 md:w-6"
              />
            </div>
            <div className="relative shrink-0 p-2 before:pointer-events-none before:absolute before:-inset-x-3 before:inset-y-0 before:border-y before:border-foreground/10 after:pointer-events-none after:absolute after:-inset-y-2 after:inset-x-0 after:border-x after:border-foreground/10 bg-foreground/[0.03] md:before:-inset-x-6 md:after:-inset-y-3">
              <div className="relative mx-auto flex h-fit w-fit min-w-0 items-center gap-3 rounded-full border border-border bg-card/80 px-5 py-2.5 shadow-md ring-1 ring-border md:gap-2 md:px-4 md:py-2">
                <span className="whitespace-nowrap text-sm font-medium text-foreground">
                  Türkiye'nin büyüyen işletmeleri için
                </span>
                <span className="block h-4 w-px shrink-0 bg-foreground/10" />
                <Link
                  href="/#nasil-calisir"
                  className="shrink-0 text-sm text-ln-orange hover:underline"
                >
                  Nasıl Çalışır?
                </Link>
              </div>
            </div>
            <div aria-hidden className="flex shrink-0 items-center gap-2 md:gap-3">
              <div className="size-2 rotate-45 border border-foreground/15" />
              <div
                className="ml-auto h-3 w-5 bg-[repeating-linear-gradient(0deg,var(--color-foreground),var(--color-foreground)_1px,transparent_1px,transparent_6px)] opacity-20 md:h-4 md:w-6"
              />
              <div className="h-px w-4 bg-foreground/15 md:w-6" />
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="relative z-10 mt-6 px-2 text-center md:mt-10 lg:px-12">
          <h1 className="mx-auto mb-0 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl xl:text-7xl xl:tracking-tight">
            <span className="max-sm:hidden">Yeni nesil yazılım </span>
            İhtiyacını Anlat.
            <br />
            <span className="text-ln-orange">Sistemini Üretelim.</span>
          </h1>

          <div className="mx-auto mb-0 mt-6 max-w-lg md:mb-0 md:mt-8">
            <p className="mb-6 text-balance text-base text-muted-foreground lg:text-lg xl:text-xl">
              Özel e-ticaret altyapısı. Komisyonsuz, hızlı, Türkiye'ye özel.
            </p>
            <div className="mx-auto flex w-fit flex-wrap items-center justify-center gap-3">
              <Link
                href="/#nasil-calisir"
                data-cta-location="hero-secondary"
                className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-ln-gray-200 bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-ln-gray-100 hover:border-ln-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ln-gray-300 focus-visible:ring-offset-2 dark:border-ln-gray-700 dark:hover:bg-ln-gray-800"
              >
                Nasıl Çalışır?
              </Link>
              <Link
                href="/contact"
                data-cta-location="hero-primary"
                className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-transparent bg-ln-orange px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ln-orange/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ln-orange focus-visible:ring-offset-2"
              >
                Ücretsiz Teklif Alın
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        </div>

     
      </div>
    </div>
  );
}
