'use client';

import { ArrowRight } from 'lucide-react';
import { useTheme } from 'next-themes';

import dynamic from 'next/dynamic';

const Warp = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.Warp),
  { ssr: false },
);

export function CTASectionNew() {
  const { resolvedTheme } = useTheme();

  const warpColors =
    resolvedTheme === 'dark'
      ? ['#1c1c1c', '#f05023', '#1c1c1c']
      : ['#ffffff', '#f05023', '#ffffff'];

  return (
    <section className='flex w-full items-center justify-center py-12 md:px-6'>
      <div className='relative w-full max-w-7xl'>
        <div className='relative flex min-h-[600px] flex-col items-center justify-center overflow-hidden rounded-[48px] duration-500 md:min-h-[600px]'>
          <div className='pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[48px] bg-[radial-gradient(circle_at_50%_40%,rgba(240,80,35,0.24),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.95),rgba(240,80,35,0.14),rgba(255,255,255,0.95))] opacity-80 dark:bg-[radial-gradient(circle_at_50%_40%,rgba(240,80,35,0.3),transparent_34%),linear-gradient(135deg,rgba(28,28,28,0.96),rgba(240,80,35,0.18),rgba(28,28,28,0.96))]'>
            <Warp
              width={1280}
              height={720}
              colors={warpColors}
              proportion={0.24}
              softness={1}
              distortion={0.21}
              swirl={0.57}
              swirlIterations={10}
              shape='edge'
              shapeScale={0.75}
              speed={4.2}
              scale={2}
            />
          </div>

          <div className='relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center'>
            <div className='mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-ln-orange/[.12] px-4 py-1.5 text-label-sm font-medium text-white backdrop-blur-sm dark:text-white'>
              <span className='relative flex h-2 w-2'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-ln-orange opacity-75'></span>
                <span className='relative inline-flex h-2 w-2 rounded-full bg-ln-orange'></span>
              </span>
              Büyümeyi Hızlandır
            </div>

            {/* Headline */}
            <h2 className='text-5xl md:text-7xl lg:text-8xl mb-8 font-sans font-medium leading-[1.05] tracking-tight text-ln-gray-950 dark:text-white'>
              Dijital varlığınız, <br />
              <span className='text-white/70 dark:text-ln-gray-300'>
                mükemmel şekilde teslim.
              </span>
            </h2>

            {/* Description */}
            <p className='mb-12 max-w-2xl text-paragraph-lg leading-relaxed text-white/70 dark:text-ln-gray-300 md:text-paragraph-xl'>
              Binlerce işletmenin büyümesine katkıda bulunan Moyduz ile siz de büyüyün. Hızlı, güvenilir ve size özel çözümler.
            </p>

            {/* Button */}
            <button className='hover:bg-ln-orange/10 group border-ln-orange border-2 relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full border border-white/10 bg-white/5 px-12 text-paragraph-md font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-primary-darker hover:ring-4 active:scale-95'>
              <span className='relative z-10'>Hemen Başla</span>
              <ArrowRight className='relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
