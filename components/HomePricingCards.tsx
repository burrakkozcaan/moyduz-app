'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DottedGlowBackground } from '@/components/ui/dotted-glow-background';

const cards = [
  {
    icon: (
      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' className='size-5 text-ln-orange'>
        <path stroke='currentColor' strokeLinejoin='round' strokeWidth='1.25' d='M13.126 5.416a3.125 3.125 0 1 1-6.25 0 3.125 3.125 0 0 1 6.25 0ZM10 11.041c-2.825 0-4.97 1.679-5.847 4.052-.34.922.447 1.781 1.429 1.781h8.838c.982 0 1.77-.86 1.429-1.78C14.97 12.72 12.827 11.04 10 11.04Z' />
      </svg>
    ),
    name: 'Başlangıç',
    price: '$2,250+',
    try: '≈ ₺75.000+',
    desc: 'Kurumsal kimliğini dijitale kusursuz taşımak isteyenler için.',
    maintenance: '+ $125–175/ay bakım dahil',
    features: [
      { label: 'Rakiplerinize fark atın:', desc: 'Google Lighthouse 90+ ile ışık hızında açılış.' },
      { label: 'Platforma hapsolmayın:', desc: 'Kaynak kodları tamamen size teslim edilir.' },
      { label: 'Arkanızdayız:', desc: '3 ay ücretsiz teknik destek ve revizyon.' },
    ],
    dark: false,
    badge: null,
  },
  {
    icon: (
      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' className='size-5 text-ln-orange'>
        <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.25' d='M2.5 6.25h15m-15 0a1.25 1.25 0 0 1 1.25-1.25h11.25A1.25 1.25 0 0 1 17.5 6.25m-15 0v8.75A1.25 1.25 0 0 0 3.75 16.25h12.5a1.25 1.25 0 0 0 1.25-1.25V6.25M7.5 10h5' />
      </svg>
    ),
    name: 'Business',
    price: '$3,750+',
    try: '≈ ₺125.000+',
    desc: 'Büyüyen işletmeler ve operasyonunu otomatikleştiren B2B projeler için.',
    maintenance: '+ $150–225/ay bakım dahil',
    features: [
      { label: 'Zaman kazanın:', desc: 'ERP, CRM ve muhasebe programlarınızla tam otomatik veri akışı.' },
      { label: 'Müşteriye özel deneyim:', desc: 'Gelişmiş kullanıcı ve bayi panelleri.' },
      { label: 'Özgürlük sizde:', desc: 'Kaynak kodu teslimi ile yarın dilediğiniz ekiple çalışın.' },
    ],
    dark: false,
    badge: null,
  },
  {
    icon: (
      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='size-5 text-ln-orange'>
        <path stroke='currentColor' strokeLinejoin='round' strokeWidth='1.5' d='M6.861 13.25H4.935a1 1 0 0 1-.878-1.48L5.68 8.791A2 2 0 0 1 7.437 7.75h3.792m-4.368 5.5 3.889 3.889M6.861 13.25l4.368-5.5m0 0c2.593-2.828 5.402-4.675 9.021-4.96a.89.89 0 0 1 .961.96c-.286 3.62-2.133 6.428-4.961 9.02m-5.5 4.369v1.927a1 1 0 0 0 1.479.877l2.979-1.624a2 2 0 0 0 1.042-1.756V12.77m-5.5 4.368 5.5-4.368M4.806 21.25H3.75a1 1 0 0 1-1-1v-1.056a2.056 2.056 0 1 1 2.056 2.055Z' />
      </svg>
    ),
    name: 'Ticaret',
    price: '$4,750+',
    try: '≈ ₺159.000+',
    desc: 'Sınırları aşan B2C/B2B e-ticaret ve e-ihracat operasyonları için.',
    maintenance: '+ $175–275/ay bakım dahil',
    features: [
      { label: 'Kârınız cebinizde kalsın:', desc: 'Her satıştan %0 komisyon, sürpriz kesinti yok.' },
      { label: 'Veriye dayalı büyüme:', desc: 'Meta/Google reklam dönüşümleri anlık takipte.' },
      { label: 'Sizi yalnız bırakmıyoruz:', desc: 'Siparişten kargoya 9 ay boyunca birebir destek.' },
    ],
    dark: true,
    badge: 'EN ÇOK TERCİH EDİLEN',
  },
  {
    icon: (
      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='size-5 text-ln-orange'>
        <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M3.75 19.25h10.5m-10.5 0V5.75a2 2 0 0 1 2-2h6.5a2 2 0 0 1 2 2V8M3.75 19.25h-2m12.5 0V8m0 11.25h6M14.25 8h4a2 2 0 0 1 2 2v9.25m0 0h2m-12-10.5h-2.5m0 4h2.5' />
      </svg>
    ),
    name: 'Pazar Yeri',
    price: '$8,500+',
    try: '≈ ₺285.000+',
    desc: 'Kendi ekosistemini kuran vizyoner markalar ve B2B ağları için.',
    maintenance: '+ $250–450/ay bakım dahil',
    features: [
      { label: 'Siz komisyonu toplayın:', desc: 'Satıcılar kendi ürün ve kargolarını yönetir.' },
      { label: 'Finansal otomasyon:', desc: 'Ödemeler otomatik bölünür, satıcıya anında transfer.' },
      { label: '%99.9 Kesintisizlik:', desc: '7/24 proaktif izleme ile sistem yorulmadan müdahale.' },
    ],
    dark: false,
    badge: null,
  },
];

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
            <span className='inline-flex h-5 items-center rounded-[5px] bg-ln-orange/[.10] px-[7px] text-ln-subheading-xs text-ln-orange'>
              $125–$450/ay
            </span>
          )}
        </div>
      </div>

      {/* Cards grid */}
      <div className='grid items-stretch justify-center gap-4 md:grid-cols-2 xl:grid xl:grid-cols-4 xl:gap-5 xl:p-6'>
        {cards.map((card) => (
          <div key={card.name} className='w-full max-w-[390px] xl:max-w-full'>
            {card.dark ? (
              /* Dark featured card — Ticaret */
              <div
                className='relative flex h-full flex-col overflow-hidden rounded-20 bg-ln-gray-925 p-7 md:rounded-3xl'
                style={{
                  boxShadow:
                    'rgba(41,41,41,.04) 0px 12px 12px -6px,rgba(41,41,41,.04) 0px 24px 24px -12px,rgba(41,41,41,.04) 0px 48px 48px -24px,rgb(15,15,15) 0px 0px 0px 1px,rgba(255,255,255,.12) 0px 1px 2px inset',
                }}
              >
                <DottedGlowBackground
                  className='pointer-events-none mask-radial-at-center md:mask-radial-to-70 opacity-40 md:opacity-100'
                  opacity={0.8}
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

                <div className='relative z-10 flex flex-1 flex-col gap-4'>
                  <div className='flex items-start justify-between'>
                    {card.icon}
                    {card.badge && (
                      <div className='flex h-5 items-center rounded-[5px] bg-ln-orange/[.12] px-[7px] text-ln-subheading-xs text-ln-orange'>
                        {card.badge}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className='text-ln-label-md text-ln-orange'>{card.name}</div>
                    <div className='mt-1 flex items-baseline gap-1.5'>
                      <span className='text-[15px]/[20px] font-550 text-ln-gray-0'>{card.price}</span>
                      <span className='text-[11px]/[14px] text-ln-gray-500'>{card.try}</span>
                    </div>
                  </div>
                  <p className='text-sm text-ln-gray-400'>{card.desc}</p>

                  {includeMaintenance && (
                    <div className='flex items-center gap-1.5 rounded-[7px] bg-ln-orange/[.15] px-2.5 py-1.5'>
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' className='size-3.5 shrink-0 text-ln-orange'>
                        <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m5.625 10.886 2.625 2.656 6.125-7.083' />
                      </svg>
                      <span className='text-[11px]/[14px] font-medium text-ln-orange'>{card.maintenance}</span>
                    </div>
                  )}

                  <div className='relative -mt-0.5 h-0.5 w-full border-b border-white/[.06] before:absolute before:left-0 before:top-0 before:h-px before:w-full before:bg-black/[.72]' />

                  <ul className='flex flex-1 flex-col gap-3.5'>
                    {card.features.map((f) => (
                      <li key={f.label} className='flex items-start gap-2 text-[13px]/[18px] text-ln-gray-400'>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 18' className='mt-px size-5 shrink-0 text-ln-orange'>
                          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m5.063 9.797 2.362 2.39 5.513-6.374' />
                        </svg>
                        <span>
                          <span className='font-semibold text-ln-gray-200'>{f.label}</span>{' '}
                          {f.desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href='/pricing'
                  className='focus:outline-none group relative z-10 mt-6 inline-flex h-11 w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-[11px] bg-ln-orange px-3.5 text-ln-label-sm text-ln-gray-0 shadow-ln-button-orange transition duration-200 ease-linear'
                >
                  Bu Paketle Başla
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' className='-mx-1.5 size-5 shrink-0 text-ln-gray-0/80 transition duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-0.5'>
                    <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.25' d='M14.5 12.204V6m0 0H8.296M14.5 6l-8 8' />
                  </svg>
                </Link>
              </div>
            ) : (
              /* Light card */
              <div className='flex h-full flex-col rounded-20 bg-ln-gray-25 p-7 ring-1 ring-inset ring-ln-gray-100 md:rounded-3xl'>
                <div className='flex items-start justify-between'>
                  {card.icon}
                  <div className='flex flex-col items-end gap-0.5'>
                    <div className='text-[15px]/[20px] font-550 text-ln-gray-800'>{card.price}</div>
                    <div className='text-[11px]/[14px] text-ln-gray-400'>{card.try}</div>
                  </div>
                </div>

                <div className='mt-3 text-ln-label-md text-ln-gray-700'>{card.name}</div>
                <p className='mt-1.5 text-sm text-ln-gray-600'>{card.desc}</p>

                {includeMaintenance && (
                  <div className='mt-4 flex items-center gap-1.5 rounded-[7px] bg-ln-orange/[.08] px-2.5 py-1.5'>
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' className='size-3.5 shrink-0 text-ln-orange'>
                      <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m5.625 10.886 2.625 2.656 6.125-7.083' />
                    </svg>
                    <span className='text-[11px]/[14px] font-medium text-ln-orange'>{card.maintenance}</span>
                  </div>
                )}

                <div className='my-5 h-px w-full bg-ln-gray-100' />

                <ul className='flex flex-1 flex-col gap-3.5'>
                  {card.features.map((f) => (
                    <li key={f.label} className='flex items-start gap-2 text-[13px]/[18px] text-ln-gray-500'>
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 18' className='mt-px size-5 shrink-0 text-ln-gray-400'>
                        <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m5.063 9.797 2.362 2.39 5.513-6.374' />
                      </svg>
                      <span>
                        <span className='font-semibold text-ln-gray-700'>{f.label}</span>{' '}
                        {f.desc}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href='/pricing'
                  className='group mt-6 relative inline-flex h-9 w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-[11px] bg-ln-gray-0 px-3.5 text-ln-label-sm text-ln-gray-800 shadow-ln-button-white transition duration-200 ease-linear focus:outline-none'
                >
                  Projeye Başla
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' className='-mx-1.5 size-5 shrink-0 text-ln-gray-500 transition duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-0.5'>
                    <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.25' d='M14.5 12.204V6m0 0H8.296M14.5 6l-8 8' />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        ))}

        {/* Custom Panel — full-width row */}
        <div className='w-full max-w-[390px] md:col-span-2 md:max-w-full xl:col-span-4'>
          <div className='flex flex-col gap-4 rounded-20 bg-ln-gray-25 p-6 ring-1 ring-inset ring-ln-gray-100 md:rounded-3xl sm:flex-row sm:items-center sm:gap-6 sm:p-7'>
            {/* Left: icon + label */}
            <div className='flex shrink-0 items-center gap-3'>
              <div className='flex size-10 items-center justify-center rounded-full bg-ln-orange/[.08] text-ln-orange'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='size-5'>
                  <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z' />
                </svg>
              </div>
              <div>
                <div className='text-ln-label-sm font-semibold text-ln-gray-800'>Özel Panel & Uygulama</div>
                <div className='mt-0.5 text-[11px]/[14px] text-ln-gray-500'>Fiyat kapsama göre belirlenir</div>
              </div>
            </div>

            {/* Middle: use-case badges */}
            <div className='flex flex-1 flex-wrap gap-2'>
              {[
                'Klinik / Sağlık Yönetimi',
                'Randevu & Rezervasyon',
                'Burs & Öğrenci Sistemi',
                'Finans & Muhasebe Paneli',
                'CRM / Bayi Portalı',
                'İnsan Kaynakları',
                'Eğitim & LMS',
                'Emlak Yönetimi',
              ].map((tag) => (
                <span
                  key={tag}
                  className='inline-flex h-6 items-center rounded-[6px] bg-ln-gray-100 px-2.5 text-ln-subheading-xs text-ln-gray-600'
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Right: CTA */}
            <Link
              href='/contact'
              className='group shrink-0 inline-flex h-9 items-center justify-center gap-1.5 whitespace-nowrap rounded-[11px] bg-ln-gray-0 px-4 text-ln-label-sm text-ln-gray-800 shadow-ln-button-white transition duration-200 ease-linear focus:outline-none'
            >
              Teklif Al
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' className='size-4 shrink-0 text-ln-gray-500 transition duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-0.5'>
                <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.25' d='M14.5 12.204V6m0 0H8.296M14.5 6l-8 8' />
              </svg>
            </Link>
          </div>
        </div>

      </div>

      {/* "Özel bir projeniz mi var?" strip — pricing page style */}
      <div className='mx-3.5 mt-4 flex items-center gap-2.5 rounded-2xl px-4 py-4 ring-1 ring-ln-gray-100 sm:gap-4 xl:mx-6 xl:mt-5 xl:px-5'>
        <div className='flex size-9 shrink-0 items-center justify-center rounded-full bg-ln-orange/[.08] text-ln-orange sm:size-10'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='size-5'>
            <path stroke='currentColor' strokeLinecap='round' strokeWidth='1.5' d='M12 14v-3.5m-2.706 7.984 2.065 1.73a1 1 0 0 0 1.28.004l2.099-1.738a1 1 0 0 1 .638-.23h2.874a2 2 0 0 0 2-2V5.75a2 2 0 0 0-2-2H5.75a2 2 0 0 0-2 2v10.5a2 2 0 0 0 2 2h2.902a1 1 0 0 1 .642.234Z' />
            <path stroke='currentColor' strokeLinecap='round' strokeWidth={2} d='M12 8h.01' />
          </svg>
        </div>
        <div>
          <div className='text-ln-label-sm text-ln-gray-800'>Özel bir projeniz mi var?</div>
          <p className='mt-0.5 text-ln-paragraph-xs text-ln-gray-600'>
            Kapsama özel teklif almak için bize yazın:{' '}
            <a href='mailto:info@moyduz.com' className='font-medium text-ln-orange'>
              info@moyduz.com
            </a>
          </p>
        </div>
      </div>

    </div>
  );
}
