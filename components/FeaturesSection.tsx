'use client';

import React from 'react';
import {
  ShieldCheck,
  Cloud,
  MessageSquare,
  MousePointer2,
  Clock,
  Puzzle,
} from 'lucide-react';

const FEATURES: { title: string; description: string; icon: React.ReactNode }[] = [
  {
    title: 'Yapay Zeka Destekli Analitik',
    description: 'Makine öğrenimi ile daha derin içgörüler ve anlık optimizasyon.',
    icon: (
      <div className="relative mx-auto flex size-12 items-center justify-center rounded-xl border border-white bg-[#f05023]/10 shadow-md" aria-hidden style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
        <ShieldCheck className="absolute inset-0 m-auto size-10 opacity-25 text-ln-orange" strokeWidth={0.25} />
        <ShieldCheck className="absolute inset-0 m-auto size-8 opacity-40 text-ln-orange" strokeWidth={0.5} />
        <ShieldCheck className="relative z-10 size-6 text-ln-orange drop-shadow-[0_4px_16px_rgba(240,80,35,0.45)]" strokeWidth={1.5} />
      </div>
    ),
  },
  {
    title: 'Akıllı Otomasyon',
    description: 'Tekrarlayan işleri otomatikleştirin, ekibiniz stratejiye odaklansın.',
    icon: (
      <div className="relative mx-auto flex size-12 items-center justify-center rounded-xl border border-white bg-[#f05023]/10 shadow-md" aria-hidden style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
        <Cloud className="absolute inset-0 m-auto size-10 opacity-25 text-ln-orange" strokeWidth={0.25} />
        <Cloud className="absolute inset-0 m-auto size-8 opacity-40 text-ln-orange" strokeWidth={0.5} />
        <Cloud className="relative z-10 size-6 text-ln-orange drop-shadow-[0_4px_16px_rgba(240,80,35,0.45)]" strokeWidth={1.5} />
      </div>
    ),
  },
  {
    title: 'Tahmine Dayalı Hedefleme',
    description: 'Gelişmiş modelleme ile yüksek değerli kitleleri belirleyin.',
    icon: (
      <div className="relative mx-auto flex size-12 items-center justify-center rounded-xl border border-white bg-[#f05023]/10 shadow-md" aria-hidden style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
        <MessageSquare className="relative z-10 size-6 text-ln-orange drop-shadow-[0_3px_12px_rgba(240,80,35,0.4)]" strokeWidth={1.25} />
      </div>
    ),
  },
  {
    title: 'Akıllı Kişiselleştirme',
    description: 'Kullanıcı davranışı ve tercihlerine göre özelleştirilmiş içerik sunun.',
    icon: (
      <div className="relative mx-auto flex size-12 items-center justify-center rounded-xl border border-white bg-[#f05023]/10 shadow-md" aria-hidden style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
        <div className="border-border/50 absolute inset-1 rotate-45 rounded-full border [mask:linear-gradient(to_right,transparent_35%,black_35%,black_75%,transparent_75%)]" />
        <MousePointer2 className="relative z-10 size-5 fill-ln-orange/20 text-ln-orange drop-shadow-[0_3px_10px_rgba(240,80,35,0.4)]" strokeWidth={1} />
      </div>
    ),
  },
  {
    title: 'Anlık İçgörüler',
    description: 'Canlı panolar ve anında bildirimlerle kampanyaları izleyin.',
    icon: (
      <div className="relative mx-auto flex size-12 items-center justify-center rounded-xl border border-white bg-[#f05023]/10 shadow-md" aria-hidden style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
        <div className=" shadow-md border-ln-gray-200 absolute  rounded-full border before:absolute before:inset-1 before:rounded-full before:border before:content-['']" />
        <Clock className="relative z-10 size-6 text-ln-orange drop-shadow-[0_3px_12px_rgba(240,80,35,0.4)]" strokeWidth={1.25} />
      </div>
    ),
  },
  {
    title: 'Çok Kanallı Entegrasyon',
    description: 'Tüm pazarlama kanallarını tek raporlama ve kampanyalarda birleştirin.',
    icon: (
      <div className="relative mx-auto flex size-12 items-center justify-center rounded-xl border border-white bg-[#f05023]/10 shadow-md" aria-hidden style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
        <div className="border-border/50 absolute border before:absolute before:-inset-x-1 before:inset-y-0 before:border-x before:content-['']" />
        <Puzzle className="relative z-10 size-6 text-ln-orange drop-shadow-[0_4px_16px_rgba(240,80,35,0.45)]" strokeWidth={1.5} />
      </div>
    ),
  },
];

export default function FeaturesSection() {
  return (
    <section
      className="relative flex w-full items-center justify-center overflow-hidden  py-16 px-4 md:py-32 md:px-6"
      id="ozellikler"
    >
      <div className="mx-auto max-w-5xl w-full px-6">
        <div className="@container">
          <div
            className="flex max-w-3xl flex-col items-center gap-4 text-center mb-12 md:mb-16"
          >
            <h2 className="text-2xl font-bold leading-tight text-ln-gray-900 dark:text-ln-gray-0 md:text-3xl lg:text-4xl">
              Moyduz Engine İçinde Neler Var?
            </h2>
            <p className="text-base leading-relaxed text-ln-gray-600 dark:text-ln-gray-400 md:text-lg">
              Teknik altyapı ile güven veriyoruz: modüler, ölçeklenebilir, güvenli.
            </p>
          </div>

          <dl
            className="grid gap-6 *:space-y-2 *:text-balance *:text-center *:text-sm @md:grid-cols-2 @2xl:grid-cols-3 @2xl:gap-12"
          >
            {FEATURES.map((item) => (
              <div key={item.title}>
                {item.icon}
                <dt className="mt-4 font-medium ">{item.title}</dt>
                <dd className="text-muted-foreground">{item.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
