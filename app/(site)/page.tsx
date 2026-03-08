import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Moyduz — E-Ticaret & Yazılım Geliştirme Şirketi',
  description:
    'Moyduz ile özel e-ticaret altyapısı, web tasarım ve yazılım geliştirme hizmetleri alın. Türkiye\'nin büyüyen işletmeleri için performans odaklı dijital çözümler.',
  keywords: [
    'e-ticaret yazılımı',
    'özel e-ticaret altyapısı',
    'web tasarım şirketi',
    'yazılım geliştirme',
    'e-ticaret sitesi yaptırma',
    'dijital altyapı',
    'moyduz',
  ],
  alternates: { canonical: 'https://moyduz.com' },
  openGraph: {
    title: 'Moyduz — E-Ticaret & Yazılım Geliştirme Şirketi',
    description:
      'Özel e-ticaret altyapısı, web tasarım ve yazılım geliştirme. Türkiye\'nin büyüyen işletmeleri için performans odaklı dijital çözümler.',
    url: 'https://moyduz.com',
    locale: 'tr_TR',
    siteName: 'Moyduz',
    type: 'website',
    images: [{ url: 'https://moyduz.com/opengraph-image', width: 1200, height: 630, alt: 'Moyduz — E-Ticaret & Yazılım' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moyduz — E-Ticaret & Yazılım Geliştirme Şirketi',
    description: 'Özel e-ticaret altyapısı, web tasarım ve yazılım geliştirme. Türkiye\'nin büyüyen işletmeleri için performans odaklı dijital çözümler.',
    images: ['https://moyduz.com/opengraph-image'],
  },
};

import Hero from '@/components/Hero';
import VerticalMarqueeHero from '@/components/VerticalMarqueeHero';
import Intro from '@/components/Intro';
import EffortlessSection from '@/components/EffortlessSection';
import RapidDevelopment from '@/components/RapidDevelopment';
import FeaturesSection from '@/components/FeaturesSection';
import { BuildFasterSection } from '@/components/BuildFasterSection';
import { BuiltForTeamsSection } from '@/components/BuiltForTeamsSection';
import { EndlessPossibilitiesSection } from '@/components/EndlessPossibilitiesSection';
import Stats from '@/components/Stats';
import EcosystemMarqueeSection from '@/components/EcosystemMarqueeSection';
import PlatformPillars from '@/components/PlatformPillars';
import HomePricingCards from '@/components/HomePricingCards';
import Faqs from '@/components/Faqs';
import { CTASectionNew } from '@/components/CTASectionNew';
import { r2cdn } from '@/lib/cdn';
import {
  DeferredElectronBento,
  DeferredSectorTemplates,
  DeferredTestimonials,
} from '@/components/home/DeferredSections';

export default function Home() {
  return (
    <>
      {/* Preload above-fold hero images to improve LCP */}
      <link rel="preload" as="image" href={r2cdn('/images/hero/3.webp')} fetchPriority="high" />
      <link rel="preload" as="image" href={r2cdn('/images/hero/2.webp')} />
      <link rel="preload" as="image" href={r2cdn('/images/hero/4.webp')} />

      {/* Hero: announcement pill, headline, CTA, decorative visual */}
      <div className='relative left-1/2 w-screen max-w-none -translate-x-1/2 dark:bg-ln-gray-900'>
        <Hero />
      </div>
      <div className='relative left-1/2 w-screen max-w-none -translate-x-1/2'>
        <VerticalMarqueeHero />
      </div>
      {/* <Gallery /> */}
      <div className='container mx-auto flex h-min w-full flex-col items-center justify-center text-center'>
        <Intro />
        <EffortlessSection />
        

        <RapidDevelopment />



     


        <DeferredElectronBento />


        {/* Moyduz Engine: altyapı, performans, ticari, global, güvenlik */}
        <FeaturesSection />

        <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2 bg-transparent mx-auto">
          <BuildFasterSection />
        </div>

        <BuiltForTeamsSection />

        <EndlessPossibilitiesSection />

        {/* <TestimonialsSection /> */}

        <Stats />

      

          <div className="w-full overflow-x-hidden">
            <EcosystemMarqueeSection />
          </div>
          <PlatformPillars />

        {/* pricing */}
        <div id="pricing" className='md:px-2.5'>
          <div className='overflow-hidden rounded-3xl bg-ln-gray-0 shadow-ln-xs xl:rounded-[28px]'>
            <div className='relative px-2.5 '>
              <div className='bleed-ln-gray-100 bleed-border-b mac:block absolute -left-8 hidden rotate-90' />
              <div className='bleed-ln-gray-100 bleed-border-b mac:block absolute -right-8 hidden rotate-90' />
              <div className='ruler-ticks mac:flex absolute -left-[4.5rem] top-[122px] hidden h-full flex-col gap-10 [&>*]:text-ln-gray-200'>
                <p>0</p>
                <p>50</p>
                <p>100</p>
                <p>150</p>
                <p>200</p>
                <p>250</p>
                <p>300</p>
                <p>350</p>
                <p>400</p>
                <p>450</p>
                <p>500</p>
                <p>550</p>
                <p>600</p>
                <p>650</p>
                <p>700</p>
                <p>750</p>
                <p>800</p>
              </div>
              <div className='ruler-ticks ruler-ticks-right mac:flex absolute -right-[4.5rem] top-[122px] hidden h-full flex-col gap-10 [&>*]:text-ln-gray-200'>
                <p>0</p>
                <p>50</p>
                <p>100</p>
                <p>150</p>
                <p>200</p>
                <p>250</p>
                <p>300</p>
                <p>350</p>
                <p>400</p>
                <p>450</p>
                <p>500</p>
                <p>550</p>
                <p>600</p>
                <p>650</p>
                <p>700</p>
                <p>750</p>
                <p>800</p>
              </div>
              <div className='mac:flex pointer-events-none absolute -inset-x-16 top-24 hidden'>
                <img
                  src={r2cdn('/images/landing/dot.png')}
                  width={9}
                  height={9}
                  alt=''
                  loading='lazy'
                  decoding='async'
                  className='absolute left-8 top-1/2 z-30 min-h-[9px] min-w-[9px] -translate-x-1/2 -translate-y-1/2'
                />
                <img
                  src={r2cdn('/images/landing/dot.png')}
                  width={9}
                  height={9}
                  alt=''
                  loading='lazy'
                  decoding='async'
                  className='absolute left-auto right-8 top-1/2 z-30 min-h-[9px] min-w-[9px] -translate-y-1/2 translate-x-1/2'
                />
              </div>
              <div className='mac:flex pointer-events-none absolute -inset-x-8 inset-y-0 hidden justify-between'>
                <div
                  className='h-[300px] w-px delay-1000'
                  style={{
                    background:
                      'linear-gradient(rgba(240, 80, 35, 0), rgb(240, 80, 35))',
                  }}
                />
                <div
                  className='h-[300px] w-px'
                  style={{
                    background:
                      'linear-gradient(rgba(240, 80, 35, 0), rgb(240, 80, 35))',
                  }}
                />
              </div>
              <div className='mx-auto w-full max-w-[872px] pb-6 pt-8 md:py-12 xl:max-w-[1200px] xl:py-20 2xl:max-w-[1400px]'>
                <div className='relative flex items-center px-3.5 xl:px-6'>
                  <div className='bleed-bg-l bleed-ln-gray-100 relative -left-10 hidden h-px bg-ln-gray-100 xl:flex'>
                    <img
                      src={r2cdn('/images/landing/dot.png')}
                      width={9}
                      height={9}
                      alt=''
                      loading='lazy'
                      decoding='async'
                      className='absolute -right-px -top-1 z-30 min-h-[9px] min-w-[9px]'
                    />
                  </div>
                  <div className='flex h-7 items-center gap-1.5 rounded-[9px] bg-ln-gray-0 pl-1.5 pr-2.5 text-ln-label-sm text-ln-gray-700 shadow-ln-subheading xl:h-8 xl:pl-2 xl:pr-3'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 18 18'
                      className='size-[18px] text-ln-gray-400'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinejoin='round'
                        strokeWidth='1.125'
                        d='M2.063 8.371V3.562a1.5 1.5 0 0 1 1.5-1.5H8.37a1.5 1.5 0 0 1 1.06.44l6.008 6.007a1.5 1.5 0 0 1 0 2.122l-4.808 4.808a1.5 1.5 0 0 1-2.122 0L2.502 9.432a1.5 1.5 0 0 1-.44-1.06Z'
                      />
                      <path
                        stroke='currentColor'
                        strokeLinejoin='round'
                        strokeWidth='1.125'
                        d='M6.188 5.625a.563.563 0 1 1-1.126 0 .563.563 0 0 1 1.125 0Z'
                      />
                    </svg>
                    Fiyatlandırma
                    <div className='rounded-[5px] bg-ln-orange/[.12] px-[5px] py-[3px] text-ln-subheading-xs text-ln-orange shadow-ln-badge-orange'>
                      Özel
                    </div>
                  </div>
                  <div className='bleed-bg-r bleed-ln-gray-100 relative -right-10 hidden h-px flex-1 bg-ln-gray-100 xl:flex'>
                    <img
                      src={r2cdn('/images/landing/dot.png')}
                      width={9}
                      height={9}
                      alt=''
                      loading='lazy'
                      decoding='async'
                      className='absolute -left-px -top-1 z-30 min-h-[9px] min-w-[9px]'
                    />
                  </div>
                </div>
                <div className=''>
                  <div className='mt-4 px-3.5 md:mt-5 xl:px-6'>
                    <h2 className='font-550 md:text-ln-title-h4 text-balance text-[28px]/[36px] -tracking-[0.02em] text-ln-gray-900 xl:text-[48px]/[56px] xl:-tracking-wide'>
                      Her sektör için doğru sistem.
                    </h2>
                    <p className='mt-2 text-balance text-[15px]/[24px] text-ln-gray-500 xl:mt-4 xl:text-ln-paragraph-lg'>
                      <span className='font-medium text-ln-gray-700'>Modüler</span> yapı.{' '}
                      <span className='font-medium text-ln-gray-700'>Performans</span> odaklı.{' '}
                      <span className='font-medium text-ln-gray-700'>Her sektör</span> için.{' '}
                      <span className='font-medium text-ln-gray-700'>Tek</span> altyapı.
                    </p>
                  </div>
                  <HomePricingCards />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mx-auto my-12 flex h-8 w-full max-w-[596px] items-center gap-6 px-4 md:my-24'>
          <div className='relative h-px w-full flex-1 bg-ln-gray-200'>
            <img
              src={r2cdn('/images/landing/dot-gray-25.png')}
              width={9}
              height={9}
              alt=''
              loading='lazy'
              decoding='async'
              className='absolute left-0 top-1/2 z-30 min-h-[9px] min-w-[9px] -translate-x-1/2 -translate-y-1/2'
            />
            <img
              src={r2cdn('/images/landing/dot-gray-25.png')}
              width={9}
              height={9}
              alt=''
              loading='lazy'
              decoding='async'
              className='absolute right-0 top-1/2 z-30 min-h-[9px] min-w-[9px] -translate-y-1/2 translate-x-1/2'
            />
          </div>
          <img
            src={r2cdn('/images/landing/section-separator-icon.png')}
            alt=''
            width={34}
            height={26}
            loading='lazy'
            decoding='async'
            className='shrink-0 object-contain'
          />
          <div className='relative h-px w-full flex-1 bg-ln-gray-200'>
            <img
              src={r2cdn('/images/landing/dot-gray-25.png')}
              width={9}
              height={9}
              alt=''
              loading='lazy'
              decoding='async'
              className='absolute left-0 top-1/2 z-30 min-h-[9px] min-w-[9px] -translate-x-1/2 -translate-y-1/2'
            />
            <img
              src={r2cdn('/images/landing/dot-gray-25.png')}
              width={9}
              height={9}
              alt=''
              loading='lazy'
              decoding='async'
              className='absolute right-0 top-1/2 z-30 min-h-[9px] min-w-[9px] -translate-y-1/2 translate-x-1/2'
            />
          </div>
        </div>
        <DeferredSectorTemplates />

        <DeferredTestimonials />

        <Faqs />
        <CTASectionNew />
      </div>
    </>
  );
}
