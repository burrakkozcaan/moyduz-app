'use client';

import React, { useState } from 'react';
import { DottedGlowBackground } from '@/components/ui/dotted-glow-background';

const Check = ({ dark }: { dark?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 shrink-0 text-ln-orange">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="m5.625 10.886 2.625 2.656 6.125-7.083" />
  </svg>
)

const Dash = ({ dark }: { dark?: boolean }) => (
  <span className={`text-ln-label-sm ${dark ? 'text-ln-gray-600' : 'text-ln-gray-300'}`}>—</span>
)

const Sep = ({ dark }: { dark?: boolean }) => (
  <div className="relative h-0 w-full">
    <div className={`absolute left-0 top-0 h-px w-full ${dark ? 'bg-ln-gray-800' : 'bg-ln-gray-100'}`} />
  </div>
)

const Row = ({ value, dark }: { value: string | boolean | null; dark?: boolean }) => (
  <div className="flex items-center gap-2">
    {value === true ? (
      <Check dark={dark} />
    ) : value === false || value === null ? (
      <Dash dark={dark} />
    ) : (
      <>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 shrink-0 text-ln-orange">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="m5.625 10.886 2.625 2.656 6.125-7.083" />
        </svg>
        <span className={`text-ln-label-xs sm:text-ln-label-sm ${dark ? 'text-ln-gray-0' : 'text-ln-gray-800'}`}>{value}</span>
      </>
    )}
  </div>
)

export default function ETicaretPaketleriPage() {
  const [activeTab, setActiveTab] = useState<'start' | 'basic' | 'pro' | 'advanced'>('pro')

  const tabBtnStartRef = React.useRef<HTMLButtonElement>(null)
  const tabBtnBasicRef = React.useRef<HTMLButtonElement>(null)
  const tabBtnProRef = React.useRef<HTMLButtonElement>(null)
  const tabBtnAdvancedRef = React.useRef<HTMLButtonElement>(null)
  const tabListDivRef = React.useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [indicatorStyle, setIndicatorStyle] = React.useState<React.CSSProperties>({
    transform: 'translate3d(0px,0px,0px)',
    width: '0px',
    transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)',
  })

  React.useEffect(() => { setIsLoaded(true) }, [])

  React.useEffect(() => {
    const btn =
      activeTab === 'start' ? tabBtnStartRef.current :
      activeTab === 'basic' ? tabBtnBasicRef.current :
      activeTab === 'pro' ? tabBtnProRef.current :
      tabBtnAdvancedRef.current
    const list = tabListDivRef.current
    if (btn && list) {
      const btnRect = btn.getBoundingClientRect()
      const listRect = list.getBoundingClientRect()
      setIndicatorStyle({
        transform: `translate3d(${btnRect.left - listRect.left}px, 0px, 0px)`,
        width: `${btnRect.width}px`,
        transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)',
      })
    }
  }, [activeTab, isLoaded])

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://moyduz.com' },
        { '@type': 'ListItem', position: 2, name: 'E-Ticaret Paketleri', item: 'https://moyduz.com/e-ticaret-paketleri' },
      ],
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />

      <div className="container px-5">
        <div className="container flex flex-col items-start pt-11 md:items-center md:pt-16">
          <div className="hidden md:block">
            <div className="flex h-7 items-center gap-1.5 rounded-[9px] bg-ln-gray-0 pl-1.5 pr-2.5 text-ln-label-sm text-ln-gray-700 shadow-ln-subheading xl:h-8 xl:pl-2 xl:pr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18" className="size-[18px] text-ln-gray-400">
                <path stroke="currentColor" strokeLinejoin="round" strokeWidth="1.125" d="M2.063 8.371V3.562a1.5 1.5 0 0 1 1.5-1.5H8.37a1.5 1.5 0 0 1 1.06.44l6.008 6.007a1.5 1.5 0 0 1 0 2.122l-4.808 4.808a1.5 1.5 0 0 1-2.122 0L2.502 9.432a1.5 1.5 0 0 1-.44-1.06Z" />
                <path stroke="currentColor" strokeLinejoin="round" strokeWidth="1.125" d="M6.188 5.625a.563.563 0 1 1-1.126 0 .563.563 0 0 1 1.125 0Z" />
              </svg>
              E-Ticaret Paketleri
              <div className="rounded-[5px] bg-ln-orange/[.12] px-[5px] py-[3px] text-ln-subheading-xs text-ln-orange shadow-ln-badge-orange">2026</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-ln-label-md text-ln-gray-700 md:hidden">
            E-Ticaret Paketleri
            <div className="rounded-[5px] bg-ln-orange/[.12] px-[5px] py-[3px] text-ln-subheading-xs text-ln-orange shadow-ln-badge-orange">2026</div>
          </div>
          <h1 className="mt-3 text-[34px]/[40px] font-550 -tracking-[0.02em] text-ln-gray-900 md:mt-4 md:text-center xl:text-ln-title-h2">
            Her ölçekte e-ticaret altyapısı.
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-ln-paragraph-md text-ln-gray-600 md:mt-5 md:px-2 md:text-center xl:text-ln-paragraph-lg">
            <span className="font-medium text-ln-gray-700">Komisyonsuz</span> satış.{' '}
            <span className="font-medium text-ln-gray-700">Tam kod sahipliği</span>.{' '}
            <span className="font-medium text-ln-gray-700">Türkiye&apos;ye özel</span> entegrasyonlar.{' '}
            <span className="font-medium text-ln-gray-700">Aylık</span> veya tek ödeme.
          </p>
        </div>

        {/* Mobile tabs */}
        <div dir="ltr" data-orientation="horizontal" className="-mx-5 mt-6 w-[calc(100%+40px)] md:mt-11 xl:hidden">
          <div className="relative grid overflow-x-auto overscroll-contain">
            <div
              ref={tabListDivRef}
              role="tablist"
              aria-orientation="horizontal"
              className="group/tab-list relative flex items-center gap-2 whitespace-nowrap border-b border-ln-gray-200 px-5 pb-4 pt-5"
              tabIndex={0}
              data-orientation="horizontal"
              style={{ outline: 'none' }}
            >
              {([
                { id: 'start', label: 'Start', ref: tabBtnStartRef },
                { id: 'basic', label: 'Basic', ref: tabBtnBasicRef },
                { id: 'pro', label: 'Pro', ref: tabBtnProRef },
                { id: 'advanced', label: 'Advanced', ref: tabBtnAdvancedRef },
              ] as const).map((tab) => (
                <button
                  key={tab.id}
                  ref={tab.ref}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  data-state={activeTab === tab.id ? 'active' : 'inactive'}
                  className="group/tab-item flex flex-1 h-8 items-center justify-center gap-1.5 rounded-[9px] pl-2 pr-2.5 text-ln-label-sm text-ln-gray-600 transition duration-200 ease-out focus:outline-none data-[state=active]:bg-ln-gray-0 data-[state=active]:text-ln-gray-800 data-[state=active]:shadow-ln-badge-orange"
                >
                  {tab.label}
                </button>
              ))}
              <div className="absolute -bottom-px left-0 h-0.5 bg-ln-orange transition-all duration-300" style={indicatorStyle} aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Main pricing grid */}
        <div className="relative -mx-4 w-auto pt-20 md:mx-0 md:w-full xl:pt-16">
          <div className="w-full rounded-[32px] bg-ln-gray-50 p-1 !pb-0 ring-1 ring-inset ring-ln-gray-100 md:p-2.5">
            <div className="grid grid-cols-[minmax(140px,1fr)_minmax(0,1fr)] rounded-[28px] bg-ln-gray-0 p-1 shadow-ln-xs md:gap-2 md:rounded-3xl md:p-2 xl:grid-cols-5">

              {/* Left label column */}
              <div className="relative flex flex-col gap-4 px-2.5 py-7 before:absolute before:inset-y-0 before:right-0 before:w-px before:bg-ln-gray-100 min-[480px]:pl-4 min-[480px]:pr-4 sm:gap-5 md:pl-5 md:pr-7">
                <div className="flex w-full flex-col items-start pb-2 max-[768px]:!h-72 md:px-2" style={{ height: 244 }}>
                  <div className="mt-auto">
                    <div className="text-ln-label-md text-ln-gray-800">Komisyonsuz · Türkiye&apos;ye özel</div>
                    <div className="mt-1 text-ln-paragraph-xs text-ln-gray-600">Her ödeme seçeneği mevcuttur.</div>
                  </div>
                </div>
                {[
                  { icon: 'M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z', label: 'Kapsam', size: 24 },
                  { icon: 'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z', label: 'Teslim süresi', size: 24 },
                  { icon: 'M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253M3.284 14.253A8.959 8.959 0 0 1 3 12c0-1.064.174-2.085.49-3.038', label: 'SEO & Analitik', size: 24 },
                  { icon: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z', label: 'Sanal POS & Ödeme', size: 24 },
                  { icon: 'M21 7.5l-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9', label: 'Kargo entegrasyonu', size: 24 },
                  { icon: 'M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z M6 6h.008v.008H6V6Z', label: 'Kampanya motoru', size: 24 },
                  { icon: 'M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z', label: 'Sadakat sistemi', size: 24 },
                  { icon: 'M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802', label: 'Çoklu dil & para birimi', size: 24 },
                  { icon: 'M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016 2.993 2.993 0 0 0 2.25-1.016 3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z', label: 'B2B & Marketplace', size: 24 },
                  { icon: 'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z', label: 'Bakım & destek', size: 24 },
                ].map((item, i) => (
                  <React.Fragment key={item.label}>
                    <Sep />
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox={`0 0 ${item.size} ${item.size}`} className="hidden size-5 shrink-0 text-ln-orange sm:block">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={item.size === 24 ? '1.5' : '1.25'} d={item.icon} />
                      </svg>
                      <span className="text-ln-label-xs text-ln-gray-800 sm:text-ln-label-sm">{item.label}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {/* START column */}
              <div className={`flex-col gap-4 px-2.5 py-7 min-[480px]:px-4 sm:gap-5 md:px-7 xl:!flex ${activeTab === 'start' ? 'flex' : 'hidden xl:flex'}`}>
                <div className="flex w-full flex-col items-start pb-2 max-[768px]:!h-72" style={{ height: 244 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-6 shrink-0 text-ln-orange">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
                  </svg>
                  <div className="mt-4">
                    <div className="text-ln-label-lg text-ln-gray-900">Start</div>
                    <div className="mt-1 h-10 max-w-44 text-ln-paragraph-xs text-ln-gray-600 sm:text-ln-paragraph-sm">Yeni e-ticaret işletmeleri için.</div>
                  </div>
                  <div className="my-6 flex flex-col items-start">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[36px]/[40px] font-550 text-ln-gray-800">₺9.200</span>
                      <span className="text-[13px]/[16px] text-ln-gray-500">/ay</span>
                    </div>
                    <div className="mt-1 text-[11px]/[14px] text-ln-gray-400">Tek ödemede ₺101.250 · KDV hariç</div>
                  </div>
                  <a href="https://app.moyduz.com/onboarding?package=eticaret_start" className="flex h-9 w-full shrink-0 items-center justify-center gap-1.5 rounded-10 bg-ln-gray-50 text-ln-label-sm text-ln-gray-800">
                    Hemen Başla
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 shrink-0 text-ln-gray-500">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M14.5 12.204V6m0 0H8.296M14.5 6l-8 8" />
                    </svg>
                  </a>
                </div>
                <Sep /><Row value="Sınırsız ürün & kategori" />
                <Sep /><Row value="6–8 hafta" />
                <Sep /><Row value="Temel SEO + GA4" />
                <Sep /><Row value="PayTR / iyzico" />
                <Sep /><Row value="MNG, Yurtiçi, Aras" />
                <Sep /><Row value={null} />
                <Sep /><Row value={null} />
                <Sep /><Row value={null} />
                <Sep /><Row value={null} />
                <Sep /><Row value="3 ay dahil" />
              </div>

              {/* BASIC column */}
              <div className={`flex-col gap-4 px-2.5 py-7 min-[480px]:px-4 sm:gap-5 md:px-7 xl:!flex ${activeTab === 'basic' ? 'flex' : 'hidden xl:flex'}`}>
                <div className="flex w-full flex-col items-start pb-2 max-[768px]:!h-72" style={{ height: 244 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-6 shrink-0 text-ln-orange">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                  </svg>
                  <div className="mt-4">
                    <div className="text-ln-label-lg text-ln-gray-900">Basic</div>
                    <div className="mt-1 h-10 max-w-44 text-ln-paragraph-xs text-ln-gray-600 sm:text-ln-paragraph-sm">Büyüyen mağazalar için.</div>
                  </div>
                  <div className="my-6 flex flex-col items-start">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[36px]/[40px] font-550 text-ln-gray-800">₺12.200</span>
                      <span className="text-[13px]/[16px] text-ln-gray-500">/ay</span>
                    </div>
                    <div className="mt-1 text-[11px]/[14px] text-ln-gray-400">Tek ödemede ₺135.000 · KDV hariç</div>
                  </div>
                  <a href="https://app.moyduz.com/onboarding?package=eticaret_basic" className="flex h-9 w-full shrink-0 items-center justify-center gap-1.5 rounded-10 bg-ln-gray-50 text-ln-label-sm text-ln-gray-800">
                    Hemen Başla
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 shrink-0 text-ln-gray-500">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M14.5 12.204V6m0 0H8.296M14.5 6l-8 8" />
                    </svg>
                  </a>
                </div>
                <Sep /><Row value="Sınırsız ürün & katalog" />
                <Sep /><Row value="6–8 hafta" />
                <Sep /><Row value="Gelişmiş SEO + GA4" />
                <Sep /><Row value="PayTR / iyzico" />
                <Sep /><Row value="MNG, Yurtiçi, Aras" />
                <Sep /><Row value={true} />
                <Sep /><Row value={null} />
                <Sep /><Row value={null} />
                <Sep /><Row value={null} />
                <Sep /><Row value="6 ay dahil" />
              </div>

              {/* PRO column (dark / featured) */}
              <div className={`relative flex-col gap-4 rounded-20 bg-ln-gray-925 px-2.5 py-7 shadow-ln-button-gray min-[480px]:px-4 sm:gap-5 md:rounded-2xl md:px-7 xl:!flex ${activeTab === 'pro' ? 'flex' : 'hidden xl:flex'}`}>
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
                <div className="absolute right-3 top-3 flex h-5 items-center rounded-[5px] bg-ln-orange/[.12] px-[7px] text-ln-subheading-xs text-ln-orange">
                  EN POPÜLER
                </div>
                <div className="flex w-full flex-col items-start pb-2 max-[768px]:!h-72" style={{ height: 244 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-6 shrink-0 text-ln-orange">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                  </svg>
                  <div className="mt-4">
                    <div className="text-ln-label-lg text-ln-gray-0">Pro</div>
                    <div className="mt-1 h-10 max-w-44 text-ln-paragraph-xs text-ln-gray-450 sm:text-ln-paragraph-sm">Ölçeklenmek isteyenler için.</div>
                  </div>
                  <div className="my-6 flex flex-col items-start">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[36px]/[40px] font-550 text-ln-gray-0">₺16.400</span>
                      <span className="text-[13px]/[16px] text-ln-gray-500">/ay</span>
                    </div>
                    <div className="mt-1 text-[11px]/[14px] text-ln-gray-500">Tek ödemede ₺180.000 · KDV hariç</div>
                  </div>
                  <a href="https://app.moyduz.com/onboarding?package=eticaret_pro" className="flex h-9 w-full shrink-0 items-center justify-center gap-1.5 rounded-10 bg-ln-orange text-ln-label-sm text-ln-gray-0">
                    Hemen Başla
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 shrink-0 text-ln-gray-0">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M14.5 12.204V6m0 0H8.296M14.5 6l-8 8" />
                    </svg>
                  </a>
                </div>
                <Sep dark /><Row dark value="Sınırsız ürün & katalog" />
                <Sep dark /><Row dark value="8–12 hafta" />
                <Sep dark /><Row dark value="Tam SEO + GA4" />
                <Sep dark /><Row dark value="PayTR / iyzico" />
                <Sep dark /><Row dark value="Tüm entegrasyonlar" />
                <Sep dark /><Row dark value={true} />
                <Sep dark /><Row dark value={true} />
                <Sep dark /><Row dark value={true} />
                <Sep dark /><Row dark value={null} />
                <Sep dark /><Row dark value="9 ay dahil" />
              </div>

              {/* ADVANCED column */}
              <div className={`flex-col gap-4 px-2.5 py-7 min-[480px]:px-4 sm:gap-5 md:px-7 xl:!flex ${activeTab === 'advanced' ? 'flex' : 'hidden xl:flex'}`}>
                <div className="flex w-full flex-col items-start pb-2 max-[768px]:!h-72" style={{ height: 244 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-6 shrink-0 text-ln-orange">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                  </svg>
                  <div className="mt-4">
                    <div className="text-ln-label-lg text-ln-gray-900">Advanced</div>
                    <div className="mt-1 h-10 max-w-44 text-ln-paragraph-xs text-ln-gray-600 sm:text-ln-paragraph-sm">Kurumsal ve multi-vendor için.</div>
                  </div>
                  <div className="my-6 flex flex-col items-start">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[36px]/[40px] font-550 text-ln-gray-800">₺22.900</span>
                      <span className="text-[13px]/[16px] text-ln-gray-500">/ay</span>
                    </div>
                    <div className="mt-1 text-[11px]/[14px] text-ln-gray-400">Tek ödemede ₺252.000 · KDV hariç</div>
                  </div>
                  <a href="https://app.moyduz.com/onboarding?package=eticaret_advanced" className="mt-auto flex h-9 w-full shrink-0 items-center justify-center gap-1.5 rounded-10 bg-ln-gray-0 text-ln-label-sm text-ln-gray-800 ring-1 ring-inset ring-ln-gray-100">
                    Hemen Başla
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 shrink-0 text-ln-gray-500">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M14.5 12.204V6m0 0H8.296M14.5 6l-8 8" />
                    </svg>
                  </a>
                </div>
                <Sep /><Row value="Sınırsız + multi-vendor" />
                <Sep /><Row value="10–16 hafta" />
                <Sep /><Row value="Tam SEO + GA4" />
                <Sep /><Row value="PayTR / iyzico" />
                <Sep /><Row value="Tüm entegrasyonlar" />
                <Sep /><Row value={true} />
                <Sep /><Row value={true} />
                <Sep /><Row value={true} />
                <Sep /><Row value={true} />
                <Sep /><Row value="12 ay dahil" />
              </div>

            </div>

            {/* Bottom CTA bar */}
            <div className="flex items-center gap-2.5 px-2 py-5 sm:gap-4 sm:py-6 xl:px-3.5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ln-orange/[.08] text-ln-orange sm:size-11">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-5 sm:size-6">
                  <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M12 14v-3.5m-2.706 7.984 2.065 1.73a1 1 0 0 0 1.28.004l2.099-1.738a1 1 0 0 1 .638-.23h2.874a2 2 0 0 0 2-2V5.75a2 2 0 0 0-2-2H5.75a2 2 0 0 0-2 2v10.5a2 2 0 0 0 2 2h2.902a1 1 0 0 1 .642.234Z" />
                  <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M12 8h.01" />
                </svg>
              </div>
              <div>
                <div className="text-ln-label-sm text-ln-gray-800 sm:text-ln-label-md">Özel bir e-ticaret projeniz mi var?</div>
                <p className="mt-1 text-ln-paragraph-xs text-ln-gray-600 sm:text-ln-paragraph-sm">
                  Kapsama özel teklif almak için bize yazın:{' '}
                  <a href="mailto:hi@moyduz.com" className="font-medium text-ln-orange">hi@moyduz.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mx-auto mb-16 mt-16 max-w-3xl md:mb-24 md:mt-20">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-ln-gray-900">Sık Sorulan Sorular</h2>
          <div className="space-y-4">
            {[
              {
                q: 'E-ticaret paketi fiyatına ne dahil?',
                a: 'Tüm paketlere özel tasarım, sanal POS ve kargo entegrasyonları, SEO altyapısı ve belirtilen süre kadar bakım dahildir. Aylık abonelik veya tek seferlik ödeme seçeneğiyle başlayabilirsiniz.',
              },
              {
                q: 'Moyduz e-ticaret siteleri Shopify\'dan ne farkı var?',
                a: "Shopify'da satış başına %0,5–2 işlem komisyonu ödenir ve platform kısıtlamaları içinde kalınır. Moyduz ile geliştirilen siteler tamamen size aittir: sıfır komisyon, tam kod sahipliği, sınırsız özelleştirme ve Türkiye'ye özgü entegrasyonlar.",
              },
              {
                q: 'Teslim süresi ne kadar?',
                a: 'Start ve Basic paketlerde 6–8 hafta, Pro paketinde 8–12 hafta, Advanced paketinde 10–16 haftayı baz alabilirsiniz. Acil durumlarda hızlandırılmış paket seçeneği mevcuttur.',
              },
              {
                q: 'Mevcut e-ticaret sitemi Moyduz\'a taşıyabilir miyim?',
                a: 'Evet. Ürün kataloğu, müşteri veritabanı ve sipariş geçmişi dahil komple migration yapıyoruz. Shopify, WooCommerce, Magento ve özel sistemlerden migration deneyimimiz var.',
              },
              {
                q: 'Pakete dahil olmayan özellikler sonradan eklenebilir mi?',
                a: 'Evet, tüm paketlerimiz modüler yapıdadır. Start paketiyle başlayıp büyüdükçe kampanya motoru, sadakat sistemi, çoklu dil veya marketplace özellikleri eklenebilir.',
              },
            ].map((faq) => (
              <details key={faq.q} className="group rounded-xl border border-ln-gray-100 bg-ln-gray-25">
                <summary className="flex cursor-pointer items-start justify-between gap-4 px-6 py-4 font-semibold text-ln-gray-900 marker:content-none">
                  {faq.q}
                  <span className="mt-0.5 shrink-0 text-ln-gray-400 transition-transform group-open:rotate-180">↓</span>
                </summary>
                <div className="border-t border-ln-gray-100 px-6 py-4 text-sm leading-relaxed text-ln-gray-600">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
