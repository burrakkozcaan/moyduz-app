'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const TESTIMONIALS = [
  {
    handle: '@teknolojigirisimci',
    quote:
      'Ekibimiz vizyonumuzu kusursuz, kullanıcı dostu bir uygulamaya dönüştürdü. Detaylara verilen özen ve kalite taahhüdü eşsiz!',
    name: 'Ayşe',
    image: '/images/team/ersad.svg',
    cardBg: 'bg-[#ff4500] dark:bg-[#ff4500]',
  },
  {
    handle: '@startupkurucu',
    quote:
      'Fikirden devreye almaya kadar ölçeklenebilir, sağlam bir çözüm sundular. Büyüme yolculuğumuzda gerçek bir iş ortağı.',
    name: 'Mehmet',
    image: '/images/team/moyduz.svg',
    cardBg: 'bg-[#ff4500] dark:bg-[#ff4500]',
  },
  {
    handle: '@kurumsallider',
    quote:
      'Bulut çözümlerindeki uzmanlıkları operasyonlarımızı optimize etmemize ve maliyetleri belirgin şekilde düşürmemize yardımcı oldu. Kesinlikle tavsiye ederiz!',
    name: 'Zeynep',
    image: '/images/logo.svg',
    cardBg: 'bg-[#ff4500] dark:bg-[#ff4500]',
  },
  {
    handle: '@urunyoneticisi',
    quote:
      "Karmaşık gereksinimleri anlama ve zamanında teslim etme becerisi olağanüstü. Geliştirme sürecini stressiz hale getirdiler.",
    name: 'Can',
    image: '/images/team/ersad.svg',
    cardBg: 'bg-[#ff4500] dark:bg-[#ff4500]',
  },
  {
    handle: '@cto',
    quote:
      'Yazılım geliştirmeye getirdikleri yenilikçi yaklaşım organizasyonumuz için oyun değiştirici oldu. Sonuçlardan çok memnunuz!',
    name: 'Elif',
    image: '/images/team/moyduz.svg',
    cardBg: 'bg-[#ff4500] dark:bg-[#ff4500]',
  },
] as const;

const PROGRESS_SEGMENT_PERCENT = 100 / TESTIMONIALS.length;

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    loop: true,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi, onSelect]);

  const progressStyle = {
    width: `${PROGRESS_SEGMENT_PERCENT}%`,
    transform: `translateX(${activeIndex * PROGRESS_SEGMENT_PERCENT}%)`,
  };

  return (
    <section className="w-full py-12 md:py-20 lg:py-32" id="referanslar">
      <div className="container px-4 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row">
          {/* Sol: Başlık + butonlar */}
          <div className="flex w-full flex-col justify-between lg:h-[460px] lg:max-w-[445px] lg:pr-10">
            <div className="flex flex-col gap-3 md:gap-4">
              <h2 className="text-2xl font-semibold text-ln-gray-900 dark:text-ln-gray-0 sm:text-3xl lg:text-4xl">
                Geleceği Birlikte İnşa Ediyoruz
              </h2>
              <p className="text-base text-ln-gray-600 dark:text-ln-gray-400 md:text-lg">
                Startuplardan kurumsal firmalara, işletmeleri en ileri yazılım
                çözümleriyle güçlendiriyoruz. Mutlu müşterilerimizden bazıları.
              </p>
            </div>
            <div className="hidden justify-start gap-4 lg:flex">
              <button
                type="button"
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className="inline-flex size-9 items-center justify-center rounded-full border border-ln-gray-200 bg-white text-ln-gray-700 shadow-xs transition-colors hover:bg-ln-gray-50 disabled:opacity-50 dark:border-ln-gray-700 dark:bg-ln-gray-900 dark:text-ln-gray-300 dark:hover:bg-ln-gray-800"
                aria-label="Önceki"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                disabled={!canScrollNext}
                className="inline-flex size-9 items-center justify-center rounded-full border border-ln-gray-200 bg-white text-ln-gray-700 shadow-xs transition-colors hover:bg-ln-gray-50 disabled:opacity-50 dark:border-ln-gray-700 dark:bg-ln-gray-900 dark:text-ln-gray-300 dark:hover:bg-ln-gray-800"
                aria-label="Sonraki"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

          {/* Sağ: Carousel */}
          <div className="relative w-full overflow-hidden pb-14 lg:flex-1 lg:pb-12">
            <div ref={emblaRef} className="overflow-hidden">
              <div className="-ml-4 flex md:-ml-4" style={{ minHeight: 'min(400px, 70vh)' }}>
                {TESTIMONIALS.map((item, index) => (
                  <div
                    key={index}
                    className="flex min-w-full flex-1 flex-col gap-3 pl-4 sm:min-w-[calc(100%-1rem)] md:min-w-[800px] md:flex-row md:gap-2"
                  >
                    {/* Görsel: mobilde üstte, küçük yükseklik */}
                    <div className="relative h-[200px] w-full shrink-0 overflow-hidden rounded-2xl bg-ln-gray-200 dark:bg-ln-gray-800 sm:h-[240px] md:h-[460px] md:w-[400px]">
                      <Image
                        src={item.image}
                        alt={item.handle}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                    {/* Alıntı kartı: mobilde altta, padding küçültüldü */}
                    <div
                      className={cn(
                        'relative flex min-h-[240px] w-full shrink-0 flex-col items-start justify-end rounded-2xl p-4 sm:min-h-[280px] sm:p-5 md:h-[460px] md:w-[400px] md:p-8',
                        item.cardBg
                      )}
                    >
                      <span className="mb-auto inline-flex h-5 w-fit items-center gap-1 rounded-full border border-transparent bg-white px-3 py-1.5 text-xs font-medium text-black shadow-sm dark:bg-ln-gray-900 dark:text-white">
                        {item.handle}
                      </span>
                      <span
                        className="-rotate-[4deg] text-4xl leading-none text-white sm:text-5xl md:text-7xl"
                        aria-hidden
                      >
                        "
                      </span>
                      <p className="text-sm font-semibold text-white sm:text-base md:text-xl">
                        {item.quote}
                      </p>
                      <p className="mt-3 text-base font-medium text-white/90 md:mt-4 md:text-lg">
                        {item.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-2 left-1/2 h-0.5 w-[200px] -translate-x-1/2 rounded bg-ln-gray-200 dark:bg-ln-gray-700 sm:bottom-4 sm:w-[240px]">
              <div
                className="h-0.5 rounded bg-ln-orange transition-transform duration-300 ease-out"
                style={progressStyle}
              />
            </div>
          </div>
        </div>

        {/* Mobil: ok butonları - başlığın altında veya carousel ile aynı hizada */}
        <div className="mt-6 flex justify-center gap-4 lg:hidden">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="inline-flex size-9 items-center justify-center rounded-full border border-ln-gray-200 bg-white text-ln-gray-700 shadow-xs disabled:opacity-50 dark:border-ln-gray-700 dark:bg-ln-gray-900 dark:text-ln-gray-300"
            aria-label="Önceki"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="inline-flex size-9 items-center justify-center rounded-full border border-ln-gray-200 bg-white text-ln-gray-700 shadow-xs disabled:opacity-50 dark:border-ln-gray-700 dark:bg-ln-gray-900 dark:text-ln-gray-300"
            aria-label="Sonraki"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
