'use client';

import React from 'react';
import { Zap, Rocket, Shield, Clock, ArrowRight } from 'lucide-react';
import { Highlighter } from '@/components/ui/highlighter';
import { r2cdn } from '@/lib/cdn';

const FEATURES = [
  {
    icon: Zap,
    title: 'Hızlı Kurulum',
    desc: 'Projeleriniz dakikalar içinde hazır. Karmaşık süreçlere son.',
  },
  {
    icon: Shield,
    title: 'Güvenli Altyapı',
    desc: 'SSL, yedekleme ve güvenlik duvarı standart olarak dahil.',
  },
  {
    icon: Rocket,
    title: 'Yüksek Performans',
    desc: '%99.9 uptime garantisi ile kesintisiz hizmet sunuyoruz.',
  },
  {
    icon: Clock,
    title: '7/24 Destek',
    desc: 'Teknik ekibimiz her zaman yanınızda, anında müdahale.',
  },
];

export default function EffortlessSection() {
  return (
    <section className="w-full mb-16  md:py-24">
      <div className="mx-auto max-w-7xl ">
        {/* Header */}
        <div className="flex flex-col items-center pt-16">
          <video
            src={r2cdn('/moyduz.mp4')}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
          <span
            className="relative text-lg md:text-2xl lg:text-3xl inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent font-normal"
            style={{
              '--spread': '24px',
              '--base-color': 'var(--color-brand, #f05023)',
              '--base-gradient-color': 'var(--color-white, #fff)',
              '--bg': 'linear-gradient(90deg, #0000 calc(50% - var(--spread)), var(--base-gradient-color), #0000 calc(50% + var(--spread)))',
              backgroundImage: 'var(--bg), linear-gradient(var(--base-color), var(--base-color))',
              backgroundRepeat: 'no-repeat, padding-box',
            } as React.CSSProperties}
          >
            Neden Biz?
          </span>
          <h2
            className="text-center text-2xl font-medium tracking-tight md:text-3xl lg:text-4xl mt-4"
            style={{ color: 'var(--color-charcoal-700, #343434)' }}
          >
            Sizin için{' '}
            <Highlighter action="highlight" color="#f05023" isView>
              <span className="text-white">zahmetsiz</span>
             
            </Highlighter>{' '}
            hale getiriyoruz
          </h2>
          <p className="text-center text-sm font-medium tracking-tight text-muted-foreground md:text-sm lg:text-base mx-auto mt-6 max-w-lg">
            Manuel işlemlere veda edin;{' '}
            <Highlighter action="underline" color="#f05023" isView>
              işletmenize odaklanın
            </Highlighter>
            , gerisini bize bırakın.
          </p>
        </div>

        {/* Feature Cards - 2x2 grid with dividers */}
        <div
          className="mt-16 grid grid-cols-1  sm:grid-cols-2 "
        
        >
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="group relative overflow-hidden p-8 md:p-12"
              style={{
                borderColor: '',
                ...(i >= 2 ? {} : {}),
              }}
            >
              {/* Dot pattern background */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full"
                style={{
                  backgroundImage: 'radial-gradient(var(--color-dots, #d4d4d4) 1px, transparent 1px)',
                  backgroundSize: '10px 10px',
                  maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 70%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, black 10%, transparent 70%)',
                }}
              />

              <div className="relative z-10 text-center">
                <div className="mb-4 shadow-md inline-flex size-10 mx-auto items-center justify-center rounded-xl bg-[#f05023]/10 text-[#f05023] border border-white">
                  <f.icon className="size-5 " />
                </div>
                <h3
                  className="text-lg font-medium"
              
                >
                  {f.title}
                </h3>
                <p className="mt-2 text-base text-muted-foreground">
                  {f.desc}
                </p>
                <div className="mt-5 flex items-center justify-center  gap-1.5 text-sm font-medium text-[#f05023]  transition-opacity duration-300 group-hover:opacity-100">
                  Detaylı bilgi <ArrowRight className="size-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      
      </div>
    </section>
  );
}
