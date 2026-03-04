'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { DottedGlowBackground } from '@/components/ui/dotted-glow-background'

const features = [
  { icon: 'M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42', label: 'Özel UI/UX Tasarım' },
  { icon: 'M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016 2.993 2.993 0 0 0 2.25-1.016 3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z', label: 'Sınırsız Ürün & Kategori' },
  { icon: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z', label: 'Sanal POS (PayTR, iyzico)' },
  { icon: 'M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12', label: 'Kargo Entegrasyonu' },
  { icon: 'M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z', label: 'Kampanya & Kupon Motoru' },
  { icon: 'M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z', label: 'Terk Edilen Sepet' },
  { icon: 'M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z', label: 'Meta Pixel & Dönüşüm API' },
  { icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z', label: 'Google Analytics 4 (GA4)' },
  { icon: 'M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802', label: 'Çoklu Dil & Para Birimi' },
  { icon: 'M20.893 13.393l-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.279-2.132Z', label: 'E-ihracat & Mikro İhracat' },
  { icon: 'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z', label: 'B2B / Toptan Satış Modülü' },
  { icon: 'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z', label: '9 Ay Ücretsiz Destek' },
]

const faqs = [
  {
    question: 'E-ticaret paketi fiyatı neye göre değişiyor?',
    answer: 'Fiyat; ürün kataloğu büyüklüğüne, özelleştirme düzeyine, entegrasyon sayısına (ERP, CRM, muhasebe) ve tasarım karmaşıklığına göre değişir. Yukarıdaki fiyat baz fiyattır; proje kapsamı netleştikçe kesin fiyat teklifi sunulur.',
  },
  {
    question: "Moyduz e-ticaret siteleri Shopify'dan ne farkı var?",
    answer: "Shopify'da satış başına %0,5–2 işlem komisyonu ödenir ve platform kısıtlamaları içinde kalınır. Moyduz ile geliştirilen siteler tamamen size aittir: sıfır komisyon, tam kod sahipliği, sınırsız özelleştirme ve Türkiye'ye özgü entegrasyonlar. 3 yıllık toplam maliyet karşılaştırmasında özel yazılım genellikle daha ekonomiktir.",
  },
  {
    question: 'Teslim süresi neden 8–12 hafta?',
    answer: 'E-ticaret projelerinde tasarım, yazılım geliştirme, test ve içerik entegrasyonu aşamaları birbirini takip eder. Standart kalite kontrollerimiz ve kapsamlı test sürecimiz bu süreyi belirler. Acil durumlarda hızlandırılmış paket seçeneği mevcuttur.',
  },
  {
    question: "Mevcut e-ticaret sitemi Moyduz'a taşıyabilir miyim?",
    answer: "Evet. Ürün kataloğu, müşteri veritabanı ve sipariş geçmişi dahil komple migration yapıyoruz. Shopify, WooCommerce, Magento ve özel sistemlerden migration deneyimimiz var. <a href='/ecommerce-migration'>E-ticaret migration sayfamızı inceleyin</a>.",
  },
  {
    question: 'Bakım ve destek paketi zorunlu mu?',
    answer: 'Hayır, zorunlu değil. Paket dahilinde 9 ay ücretsiz destek sunuyoruz. Bu süre sonunda aylık bakım paketi ($175–275/ay) ile devam edebilir veya kendi teknik ekibinizle yönetebilirsiniz.',
  },
]

export default function ETicaretPaketleriPage() {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [includeMaintenance, setIncludeMaintenance] = React.useState(false)

  React.useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="container px-5">
      {/* Header */}
      <div className="flex flex-col items-start pt-11 md:items-center md:pt-16">
        <div className="hidden md:block">
          <div className="flex h-7 items-center gap-1.5 rounded-[9px] bg-ln-gray-0 pl-1.5 pr-2.5 text-ln-label-sm text-ln-gray-700 shadow-ln-subheading xl:h-8 xl:pl-2 xl:pr-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18" className="size-[18px] text-ln-gray-400">
              <path stroke="currentColor" strokeLinejoin="round" strokeWidth="1.125" d="M2.063 8.371V3.562a1.5 1.5 0 0 1 1.5-1.5H8.37a1.5 1.5 0 0 1 1.06.44l6.008 6.007a1.5 1.5 0 0 1 0 2.122l-4.808 4.808a1.5 1.5 0 0 1-2.122 0L2.502 9.432a1.5 1.5 0 0 1-.44-1.06Z" />
              <path stroke="currentColor" strokeLinejoin="round" strokeWidth="1.125" d="M6.188 5.625a.563.563 0 1 1-1.126 0 .563.563 0 0 1 1.125 0Z" />
            </svg>
            E-Ticaret Paketi
            <div className="rounded-[5px] bg-ln-orange/[.12] px-[5px] py-[3px] text-ln-subheading-xs text-ln-orange shadow-ln-badge-orange">Commerce</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-ln-label-md text-ln-gray-700 md:hidden">
          E-Ticaret Paketi
          <div className="rounded-[5px] bg-ln-orange/[.12] px-[5px] py-[3px] text-ln-subheading-xs text-ln-orange shadow-ln-badge-orange">Commerce</div>
        </div>
        <h1 className="mt-3 text-[34px]/[40px] font-550 -tracking-[0.02em] text-ln-gray-900 md:mt-4 md:text-center xl:text-ln-title-h2">
          Satışa hazır. Büyümeye hazır.
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-ln-paragraph-md text-ln-gray-600 md:mt-5 md:px-2 md:text-center xl:text-ln-paragraph-lg">
          <span className="font-medium text-ln-gray-700">Komisyonsuz.</span>{' '}
          <span className="font-medium text-ln-gray-700">Tam sahiplik.</span>{' '}
          <span className="font-medium text-ln-gray-700">Türkiye&apos;ye özel</span> entegrasyonlar.{' '}
          <span className="font-medium text-ln-gray-700">Tek</span> paket, sonsuz büyüme.
        </p>
      </div>

      {/* Commerce Card — Dijital Pazarlama Paketi style */}
      <div className="relative mt-8 w-full overflow-hidden rounded-[32px] bg-ln-gray-925 p-5 ring-1 ring-inset ring-ln-gray-800 md:mt-10 md:p-8">
        <DottedGlowBackground
          className="pointer-events-none mask-radial-at-center md:mask-radial-to-70 opacity-40 md:opacity-100"
          opacity={0.8}
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

        <div className="absolute right-4 top-4 flex h-5 items-center rounded-[5px] bg-ln-orange/[.12] px-[7px] text-ln-subheading-xs text-ln-orange">EN ÇOK TERCİH EDİLEN</div>

        {/* Top section: name + price + CTA */}
        <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-10">
          <div className="flex-1">
            <div className="flex items-center gap-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-7 shrink-0 text-ln-orange">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.861 13.25H4.935a1 1 0 0 1-.878-1.48L5.68 8.791A2 2 0 0 1 7.437 7.75h3.792m-4.368 5.5 3.889 3.889M6.861 13.25l4.368-5.5m0 0c2.593-2.828 5.402-4.675 9.021-4.96a.89.89 0 0 1 .961.96c-.286 3.62-2.133 6.428-4.961 9.02m-5.5 4.369v1.927a1 1 0 0 0 1.479.877l2.979-1.624a2 2 0 0 0 1.042-1.756V12.77m-5.5 4.368 5.5-4.368M4.806 21.25H3.75a1 1 0 0 1-1-1v-1.056a2.056 2.056 0 1 1 2.056 2.055Z" />
              </svg>
              <div className="text-ln-label-xl text-ln-gray-0">Commerce</div>
            </div>
            <div className="mt-2 max-w-md text-ln-paragraph-sm text-ln-gray-450">
              B2C + B2B e-ticaret, e-ihracat ve pazaryeri entegrasyonları dahil. Tek seferlik yatırım, %0 komisyon, tam kod sahipliği.
            </div>

            {/* Maintenance toggle */}
            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                role="switch"
                aria-checked={includeMaintenance}
                onClick={() => setIncludeMaintenance(!includeMaintenance)}
                className={`relative h-6 w-[46px] shrink-0 rounded-full transition duration-200 ease-out ${includeMaintenance ? 'bg-ln-orange' : 'bg-ln-gray-700'}`}
              >
                <span className={`absolute left-0.5 top-0.5 flex size-5 items-center justify-center rounded-full bg-ln-gray-0 transition-transform duration-500 ${includeMaintenance ? 'translate-x-[22px]' : 'translate-x-0'}`} style={{ transitionTimingFunction: 'cubic-bezier(0.6, 0.6, 0, 1)' }}>
                  <div className={`size-1.5 rounded-full transition-colors duration-200 ${includeMaintenance ? 'bg-ln-orange' : 'bg-ln-gray-400'}`} />
                </span>
              </button>
              <span className="text-ln-label-sm text-ln-orange">Bakım paketi ekle</span>
              {includeMaintenance && (
                <span className="text-[12px]/[16px] text-ln-gray-500">+ $175–275/ay</span>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-col items-start gap-4 md:items-end md:shrink-0">
            <div>
              <div className="flex items-baseline gap-1 text-[42px]/[48px] font-550 text-ln-gray-0">
                $
                <div className="grid overflow-hidden">
                  <div className="flex [grid-area:1/1]">
                    {['4', ',', '7', '5', '0'].map((char, i) => (
                      <div
                        key={i}
                        className={`transition-transform duration-700 ${isLoaded ? 'translate-y-0' : 'translate-y-full'}`}
                        style={{ transitionDelay: `${i * 50}ms`, transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)' }}
                      >
                        {char}
                      </div>
                    ))}
                  </div>
                </div>
                +
              </div>
              <div className="mt-1 text-[13px]/[16px] text-ln-gray-400">başlangıç fiyatı · KDV hariç</div>
              <div className="mt-0.5 text-[11px]/[14px] text-ln-gray-500">≈ ₺159.000+ · 8–12 hafta teslim</div>
            </div>

            <div className="flex flex-col gap-2 w-full md:items-end">
              <a
                href="/contact"
                className="flex h-10 items-center justify-center gap-1.5 rounded-[13px] bg-ln-orange px-6 text-ln-label-sm text-ln-gray-0 transition hover:bg-ln-orange/90"
                style={{ boxShadow: '0 0 0 1px rgba(26,26,26,.28), inset 0 1px 2px rgba(255,255,255,.34)' }}
              >
                Teklif Al
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 shrink-0">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M14.5 12.204V6m0 0H8.296M14.5 6l-8 8" />
                </svg>
              </a>
              <a
                href="/sizi-arayalim"
                className="flex h-10 items-center justify-center gap-1.5 rounded-[13px] bg-ln-gray-800 px-6 text-ln-label-sm text-ln-gray-200 ring-1 ring-ln-gray-700 transition hover:bg-ln-gray-750"
              >
                Demo İsteyin
              </a>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 gap-2 border-t border-ln-gray-800 pt-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {features.map(({ icon, label }) => (
            <div key={label} className="flex items-start gap-2 rounded-[12px] bg-ln-gray-800/50 px-3 py-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0 text-ln-orange">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={icon} />
              </svg>
              <span className="text-[11px]/[15px] font-medium text-ln-gray-300">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trust bar */}
      <div className="relative flex flex-col justify-center gap-6 md:flex-row md:py-7 xl:gap-8 before:absolute before:left-0 before:top-0 before:hidden before:h-px before:w-full before:bg-ln-gray-200 md:before:block after:absolute after:bottom-0 after:left-0 after:hidden after:h-px after:w-full after:bg-ln-gray-200 md:after:block mt-10 mb-6 md:mt-14 md:mb-10">
        {[
          { label: '%0 Komisyon', desc: 'Her satış tamamen size ait' },
          { label: 'Tam Kod Sahipliği', desc: 'Platform bağımlılığı yok' },
          { label: 'Cayma Bedeli Desteği', desc: 'Geçişi biz karşılıyoruz' },
          { label: '9 Ay Destek', desc: 'Lansman sonrası yanınızdayız' },
        ].map((item, i) => (
          <React.Fragment key={item.label}>
            {i > 0 && (
              <>
                <div className="hidden w-px bg-ln-gray-200 md:block" />
                <div className="h-px w-full bg-ln-gray-100 md:hidden" />
              </>
            )}
            <div className="flex flex-1 items-start gap-4 md:flex-col md:items-center md:gap-0 md:text-center">
              <div className="md:mt-2">
                <div className="text-ln-label-md text-ln-gray-800">{item.label}</div>
                <div className="mt-1 text-ln-paragraph-sm text-ln-gray-600">{item.desc}</div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* FAQ */}
      <div className="mx-auto max-w-3xl py-10 md:py-14">
        <h2 className="mb-6 text-center text-[22px]/[28px] font-550 -tracking-[0.015em] text-ln-gray-900">
          Sık Sorulan Sorular
        </h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-xl border border-ln-gray-100 bg-ln-gray-25">
              <summary className="flex cursor-pointer items-start justify-between gap-4 px-6 py-4 font-semibold text-ln-gray-900 marker:content-none list-none">
                {faq.question}
                <span className="mt-0.5 shrink-0 text-ln-gray-400 transition-transform group-open:rotate-180">↓</span>
              </summary>
              <div
                className="border-t border-ln-gray-100 px-6 py-4 text-sm leading-relaxed text-ln-gray-600"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            </details>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mb-16 rounded-2xl border border-ln-gray-100 bg-ln-gray-25 px-6 py-10 text-center md:mb-24 md:py-14">
        <h2 className="text-[22px]/[28px] font-550 -tracking-[0.015em] text-ln-gray-900 md:text-[28px]/[34px]">
          Hangi paketi seçeceğinizden emin değil misiniz?
        </h2>
        <p className="mt-3 text-ln-gray-500">
          Ücretsiz 30 dakikalık keşif görüşmesi ile projenizi değerlendiriyoruz.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/sizi-arayalim"
            className="inline-flex h-11 items-center rounded-xl bg-ln-orange px-7 text-sm font-semibold text-white transition hover:bg-ln-orange/90"
          >
            Ücretsiz Görüşme Talep Et
          </Link>
          <Link
            href="/e-ticaret-nasil-yapilir-2026-rehberi"
            className="inline-flex h-11 items-center rounded-xl border border-ln-gray-200 px-6 text-sm font-semibold text-ln-gray-700 transition hover:bg-ln-gray-50"
          >
            Rehberi Oku
          </Link>
        </div>
      </div>
    </div>
  )
}
