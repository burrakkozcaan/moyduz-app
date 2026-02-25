'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DottedGlowBackground } from '@/components/ui/dotted-glow-background';

export default function HomePricingCards() {
  const [includeMaintenance, setIncludeMaintenance] = useState(false);

  return (
    <div className='mt-6 flex flex-col xl:mt-10'>
      {/* Maintenance toggle */}
      <div className='flex items-center gap-3 px-3.5 xl:px-6 mb-6'>
        <button
          type='button'
          role='switch'
          aria-checked={includeMaintenance}
          onClick={() => setIncludeMaintenance(!includeMaintenance)}
          className={`relative h-6 w-[46px] shrink-0 rounded-full transition duration-200 ease-out ${includeMaintenance ? 'bg-ln-orange' : 'bg-ln-gray-200'}`}
        >
          <span
            className={`absolute left-0.5 top-0.5 flex size-5 items-center justify-center rounded-full bg-ln-gray-0 transition-transform duration-500 ${includeMaintenance ? 'translate-x-[22px]' : 'translate-x-0'}`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.6, 0.6, 0, 1)' }}
          >
            <div className={`size-1.5 rounded-full transition-colors duration-200 ${includeMaintenance ? 'bg-ln-orange' : 'bg-ln-gray-200'}`} />
          </span>
        </button>
        <div className='flex items-center gap-2'>
          <span className='text-ln-label-sm text-ln-gray-700'>Aylık bakım paketi ekle</span>
          {includeMaintenance && (
            <span className='inline-flex h-5 items-center rounded-[5px] bg-ln-orange/[.10] px-[7px] text-ln-subheading-xs text-ln-orange animate-in fade-in-0 duration-200'>
              $125–$450/ay
            </span>
          )}
        </div>
      </div>

      {/* Cards grid */}
      <div className='grid justify-center gap-4 md:grid-cols-2 xl:grid xl:grid-cols-3 xl:gap-6 xl:p-6'>

        {/* Başlangıç */}
        <div className='w-full max-w-[390px] xl:max-w-full'>
          <div className='flex flex-col gap-5 rounded-20 bg-ln-gray-25 p-7 ring-1 ring-inset ring-ln-gray-100 md:rounded-3xl'>
            <div className='flex items-start justify-between'>
              <div className='flex flex-col gap-2'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' className='size-5 text-ln-orange'>
                  <path stroke='currentColor' strokeLinejoin='round' strokeWidth='1.25' d='M13.126 5.416a3.125 3.125 0 1 1-6.25 0 3.125 3.125 0 0 1 6.25 0ZM10 11.041c-2.825 0-4.97 1.679-5.847 4.052-.34.922.447 1.781 1.429 1.781h8.838c.982 0 1.77-.86 1.429-1.78C14.97 12.72 12.827 11.04 10 11.04Z' />
                </svg>
                <div className='text-ln-label-md text-ln-gray-600'>Başlangıç</div>
              </div>
              <div className='flex flex-col items-end gap-0.5 pt-0.5'>
                <div className='text-[15px]/[20px] font-550 text-ln-gray-800'>$3,250+</div>
                <div className='text-[11px]/[14px] text-ln-gray-400'>≈ ₺109.000+</div>
              </div>
            </div>
            <p className='text-sm text-ln-gray-600'>
              Kurumsal siteler, portfolyolar ve landing page'ler için.
            </p>
            {includeMaintenance && (
              <div className='flex items-center gap-1.5 rounded-[7px] bg-ln-orange/[.08] px-2.5 py-1.5 animate-in fade-in-0 slide-in-from-top-1 duration-200'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' className='size-3.5 shrink-0 text-ln-orange'>
                  <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m5.625 10.886 2.625 2.656 6.125-7.083' />
                </svg>
                <span className='text-[11px]/[14px] font-medium text-ln-orange'>+ $125–175/ay bakım dahil</span>
              </div>
            )}
            <div className='relative -mt-0.5 h-0.5 w-full border-b border-white before:absolute before:left-0 before:top-0 before:h-px before:w-full before:bg-black/10' />
            <ul className='flex flex-col gap-4'>
              <li className='flex items-center gap-2 text-ln-label-sm text-ln-gray-600'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 18' className='size-5 text-ln-gray-500'><path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m5.063 9.797 2.362 2.39 5.513-6.374' /></svg>
                Kapsam ve teslimat süresi pakete göre
              </li>
              <li className='flex items-center gap-2 text-ln-label-sm text-ln-gray-600'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 18' className='size-5 text-ln-gray-500'><path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m5.063 9.797 2.362 2.39 5.513-6.374' /></svg>
                Core Web Vitals ve SEO odaklı altyapı
              </li>
              <li className='flex items-center gap-2 text-ln-label-sm text-ln-gray-600'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 18' className='size-5 text-ln-gray-500'><path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m5.063 9.797 2.362 2.39 5.513-6.374' /></svg>
                E-posta ve web destek
              </li>
            </ul>
            <Link
              href='/pricing'
              className='group relative inline-flex h-9 w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-[11px] bg-ln-gray-0 px-3.5 text-ln-label-sm text-ln-gray-800 shadow-ln-button-white transition duration-200 ease-linear focus:outline-none'
            >
              Fiyatlandırmaya git
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' className='-mx-1.5 size-5 shrink-0 text-ln-gray-500 transition duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-0.5'><path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.25' d='M14.5 12.204V6m0 0H8.296M14.5 6l-8 8' /></svg>
            </Link>
          </div>
        </div>

        {/* Ticaret */}
        <div className='w-full max-w-[390px] xl:max-w-full'>
          <div
            className='relative flex flex-col gap-6 overflow-hidden rounded-20 bg-ln-gray-925 p-7 md:rounded-3xl'
            style={{
              boxShadow:
                'rgba(41, 41, 41, 0.04) 0px 12px 12px -6px, rgba(41, 41, 41, 0.04) 0px 24px 24px -12px, rgba(41, 41, 41, 0.04) 0px 48px 48px -24px, rgb(15, 15, 15) 0px 0px 0px 1px, rgba(255, 255, 255, 0.12) 0px 1px 2px inset',
            }}
          >
            <DottedGlowBackground
              className='pointer-events-none mask-radial-at-center max-md:mask-radial-to-50 md:mask-radial-to-90'
              opacity={1}
              gap={8}
              radius={1.6}
              colorLightVar='--color-ln-orange'
              glowColorLightVar='--color-ln-orange'
              colorDarkVar='--color-ln-orange'
              glowColorDarkVar='--color-ln-orange'
              backgroundOpacity={0}
              speedMin={0.3}
              speedMax={1.6}
              speedScale={1}
            />
            <div className='relative z-10 flex flex-col gap-4'>
              <div className='flex items-start justify-between'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='size-5 text-ln-orange'>
                  <path stroke='currentColor' strokeLinejoin='round' strokeWidth='1.5' d='M6.861 13.25H4.935a1 1 0 0 1-.878-1.48L5.68 8.791A2 2 0 0 1 7.437 7.75h3.792m-4.368 5.5 3.889 3.889M6.861 13.25l4.368-5.5m0 0c2.593-2.828 5.402-4.675 9.021-4.96a.89.89 0 0 1 .961.96c-.286 3.62-2.133 6.428-4.961 9.02m-5.5 4.369v1.927a1 1 0 0 0 1.479.877l2.979-1.624a2 2 0 0 0 1.042-1.756V12.77m-5.5 4.368 5.5-4.368M4.806 21.25H3.75a1 1 0 0 1-1-1v-1.056a2.056 2.056 0 1 1 2.056 2.055Z' />
                </svg>
                <div className='flex h-5 items-center rounded-[5px] bg-ln-orange/[.12] px-[7px] text-ln-subheading-xs text-ln-orange'>
                  EN ÇOK TERCİH EDİLEN
                </div>
              </div>
              <div>
                <div className='text-ln-label-md text-ln-orange'>Ticaret</div>
                <div className='mt-1 flex items-baseline gap-1.5'>
                  <span className='text-[15px]/[20px] font-550 text-ln-gray-0'>$5,950+</span>
                  <span className='text-[11px]/[14px] text-ln-gray-500'>≈ ₺199.000+</span>
                </div>
              </div>
              <p className='text-sm text-ln-gray-400'>
                B2C + B2B e-ticaret projeleri için.
              </p>
            </div>
            {includeMaintenance && (
              <div className='relative z-10 flex items-center gap-1.5 rounded-[7px] bg-ln-orange/[.15] px-2.5 py-1.5 animate-in fade-in-0 slide-in-from-top-1 duration-200'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' className='size-3.5 shrink-0 text-ln-orange'>
                  <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m5.625 10.886 2.625 2.656 6.125-7.083' />
                </svg>
                <span className='text-[11px]/[14px] font-medium text-ln-orange'>+ $175–275/ay bakım dahil</span>
              </div>
            )}
            <div className='relative z-10 -mt-0.5 h-0.5 w-full border-b border-white/[.06] before:absolute before:left-0 before:top-0 before:h-px before:w-full before:bg-black/[.72]' />
            <ul className='relative z-10 flex flex-col gap-4'>
              <li className='flex items-center gap-2 text-ln-paragraph-sm text-ln-gray-500'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 18' className='size-5 shrink-0 text-ln-orange'><path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m5.063 9.797 2.362 2.39 5.513-6.374' /></svg>
                Kapsam, teslimat ve dahil özellikler pakete göre
              </li>
              <li className='flex items-center gap-2 text-ln-paragraph-sm text-ln-gray-500'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 18' className='size-5 shrink-0 text-ln-orange'><path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m5.063 9.797 2.362 2.39 5.513-6.374' /></svg>
                VPS, CDN, güvenlik ve destek kanalı
              </li>
              <li className='flex items-center gap-2 text-ln-paragraph-sm text-ln-gray-500'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 18' className='size-5 shrink-0 text-ln-orange'><path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m5.063 9.797 2.362 2.39 5.513-6.374' /></svg>
                GEO, çoklu dil ve özelleştirme seçenekleri
              </li>
            </ul>
            <Link
              href='/pricing'
              className='focus:outline-none group relative z-10 inline-flex h-11 w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-[11px] bg-ln-orange px-3.5 text-ln-label-sm text-ln-gray-0 shadow-ln-button-orange transition duration-200 ease-linear'
            >
              Fiyatlandırmaya git
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' className='-mx-1.5 size-5 shrink-0 text-ln-gray-0/80 transition duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-0.5'><path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.25' d='M14.5 12.204V6m0 0H8.296M14.5 6l-8 8' /></svg>
            </Link>
          </div>
        </div>

        {/* Pazar Yeri */}
        <div className='w-full max-w-[390px] xl:max-w-full'>
          <div className='flex flex-col gap-5 rounded-20 bg-ln-gray-25 p-7 ring-1 ring-inset ring-ln-gray-100 md:rounded-3xl'>
            <div className='flex items-start justify-between'>
              <div className='flex flex-col gap-2'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='size-5 text-ln-orange'>
                  <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M3.75 19.25h10.5m-10.5 0V5.75a2 2 0 0 1 2-2h6.5a2 2 0 0 1 2 2V8M3.75 19.25h-2m12.5 0V8m0 11.25h6M14.25 8h4a2 2 0 0 1 2 2v9.25m0 0h2m-12-10.5h-2.5m0 4h2.5' />
                </svg>
                <div className='text-ln-label-md text-ln-gray-600'>Pazar Yeri</div>
              </div>
              <div className='flex h-5 items-center rounded-[5px] bg-ln-gray-100 px-[7px] text-ln-subheading-xs text-ln-gray-500'>
                ÖZEL TEKLİF
              </div>
            </div>
            <p className='text-sm text-ln-gray-600'>
              Multi-vendor marketplace ve B2B platformları için.
            </p>
            {includeMaintenance && (
              <div className='flex items-center gap-1.5 rounded-[7px] bg-ln-orange/[.08] px-2.5 py-1.5 animate-in fade-in-0 slide-in-from-top-1 duration-200'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' className='size-3.5 shrink-0 text-ln-orange'>
                  <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m5.625 10.886 2.625 2.656 6.125-7.083' />
                </svg>
                <span className='text-[11px]/[14px] font-medium text-ln-orange'>+ $250–450/ay bakım dahil</span>
              </div>
            )}
            <div className='relative -mt-0.5 h-0.5 w-full border-b border-white before:absolute before:left-0 before:top-0 before:h-px before:w-full before:bg-black/10' />
            <ul className='flex flex-col gap-4'>
              <li className='flex items-center gap-2 text-ln-label-sm text-ln-gray-600'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 18' className='size-5 text-ln-gray-500'><path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m5.063 9.797 2.362 2.39 5.513-6.374' /></svg>
                Çok satıcılı altyapı ve komisyon yapısı
              </li>
              <li className='flex items-center gap-2 text-ln-label-sm text-ln-gray-600'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 18' className='size-5 text-ln-gray-500'><path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m5.063 9.797 2.362 2.39 5.513-6.374' /></svg>
                Tasarım, destek ve altyapı pakete göre
              </li>
              <li className='flex items-center gap-2 text-ln-label-sm text-ln-gray-600'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 18' className='size-5 text-ln-gray-500'><path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m5.063 9.797 2.362 2.39 5.513-6.374' /></svg>
                Kurumsal güvenlik ve SLA
              </li>
            </ul>
            <Link
              href='/pricing'
              className='group relative inline-flex h-9 w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-[11px] bg-ln-gray-0 px-3.5 text-ln-label-sm text-ln-gray-800 shadow-ln-button-white transition duration-200 ease-linear focus:outline-none'
            >
              Fiyatlandırmaya git
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' className='-mx-1.5 size-5 shrink-0 text-ln-gray-500 transition duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-0.5'><path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.25' d='M14.5 12.204V6m0 0H8.296M14.5 6l-8 8' /></svg>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
