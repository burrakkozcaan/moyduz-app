import Link from 'next/link';
import * as Button from '@/components/new-ui/button';
import * as Card from '@/components/new-ui/card';
import * as Modal from '@/components/new-ui/modal';
import * as Input from '@/components/new-ui/input';
import { RiGithubFill } from '@remixicon/react';
import Faqs from '@/components/Faqs';

import Hero from '@/components/Hero';
import RapidDevelopment from '@/components/RapidDevelopment';
import { CTASectionNew } from '@/components/CTASectionNew';
import SectorTemplates from '@/components/SectorTemplates';
import { Gallery } from '@/components/Gallery';
import Intro from '@/components/Intro';


import FeaturesSection from '@/components/FeaturesSection';

import { BuiltForTeamsSection } from '@/components/BuiltForTeamsSection';
import { EndlessPossibilitiesSection } from '@/components/EndlessPossibilitiesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import EffortlessSection from '@/components/EffortlessSection';
import Stats from '@/components/Stats';
import EcosystemMarqueeSection from '@/components/EcosystemMarqueeSection';
import VerticalMarqueeHero from '@/components/VerticalMarqueeHero';
import ElectronBento from '@/components/ElectronBento';
import { BuildFasterSection } from '@/components/BuildFasterSection';
import PlatformPillars from '@/components/PlatformPillars';
import DeferredTestimonials from '@/components/DeferredTestimonials';
import { DottedGlowBackground } from '@/components/ui/dotted-glow-background';

export default function Home() {
  return (
    <>
      {/* Vertical marquee hero (AI headshots style) */}
   
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



     


        <ElectronBento />


        {/* Moyduz Engine: altyapı, performans, ticari, global, güvenlik */}
        <FeaturesSection />

        <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2 bg-transparent mx-auto">
          <BuildFasterSection />
        </div>

        <BuiltForTeamsSection />

        <EndlessPossibilitiesSection />

        {/* <TestimonialsSection /> */}

        <Stats />

      

          <EcosystemMarqueeSection />
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
                  src='https://alignui.com/images/landing/dot.png'
                  width={9}
                  height={9}
                  alt=''
                  className='absolute left-8 top-1/2 z-30 min-h-[9px] min-w-[9px] -translate-x-1/2 -translate-y-1/2'
                />
                <img
                  src='https://alignui.com/images/landing/dot.png'
                  width={9}
                  height={9}
                  alt=''
                  className='absolute left-auto right-8 top-1/2 z-30 min-h-[9px] min-w-[9px] -translate-y-1/2 translate-x-1/2'
                />
              </div>
              <div className='mac:flex pointer-events-none absolute -inset-x-8 inset-y-0 hidden justify-between'>
                <div
                  className='animate-spark h-[300px] w-px delay-1000'
                  style={{
                    background:
                      'linear-gradient(rgba(240, 80, 35, 0), rgb(240, 80, 35))',
                  }}
                />
                <div
                  className='animate-spark h-[300px] w-px'
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
                      src='https://alignui.com/images/landing/dot.png'
                      width={9}
                      height={9}
                      alt=''
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
                      PRO
                    </div>
                  </div>
                  <div className='bleed-bg-r bleed-ln-gray-100 relative -right-10 hidden h-px flex-1 bg-ln-gray-100 xl:flex'>
                    <img
                      src='https://alignui.com/images/landing/dot.png'
                      width={9}
                      height={9}
                      alt=''
                      className='absolute -left-px -top-1 z-30 min-h-[9px] min-w-[9px]'
                    />
                  </div>
                </div>
                <div className=''>
                  <div className='mt-4 px-3.5 md:mt-5 xl:px-6'>
                    <h2 className='font-550 md:text-ln-title-h4 text-balance text-[28px]/[36px] -tracking-[0.02em] text-ln-gray-900 xl:text-[48px]/[56px] xl:-tracking-wide'>
                      Tek proje mi, tam paket mi?
                    </h2>
                    <p className='mt-2 text-balance text-[15px]/[24px] text-ln-gray-500 xl:mt-4 xl:text-ln-paragraph-lg'>
                      Tüm şablon ve bileşenler için{' '}
                      <span className='font-medium text-ln-gray-700'>
                        ücretsiz güncellemeler
                      </span>{' '}
                      alın; kişisel ve{' '}
                      <span className='font-medium text-ln-gray-700'>
                        ticari
                      </span>{' '}
                      projelerde{' '}
                      <span className='font-medium text-ln-gray-700'>
                        sınırsız
                      </span>{' '}
                      kullanım hakkıyla.
                    </p>
                    <div className='mt-6 flex items-center md:mt-7'>
                      <div className='flex items-center gap-2 text-ln-label-sm text-ln-gray-600 xl:text-ln-label-md'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 20 20'
                          className='size-4 text-ln-gray-400 xl:size-5'
                        >
                          <path
                            fill='currentColor'
                            d='M16.444 6.834a14 14 0 0 0-.644-.205q.055-.226.1-.444c.487-2.393.168-4.321-.92-4.956-1.043-.609-2.75.026-4.473 1.543q-.248.219-.498.462-.165-.16-.331-.31C7.872 1.304 6.06.62 4.974 1.257c-1.042.61-1.35 2.422-.912 4.69q.063.33.148.67-.385.11-.74.236C1.352 7.599 0 8.769 0 9.983c0 1.254 1.452 2.511 3.657 3.274q.262.09.54.171-.09.37-.156.722c-.418 2.229-.092 3.998.948 4.605 1.074.626 2.876-.018 4.63-1.57q.209-.183.418-.388.27.264.54.499c1.7 1.48 3.38 2.077 4.418 1.468 1.072-.628 1.421-2.529.969-4.841a12 12 0 0 0-.12-.541q.19-.057.371-.118C18.508 12.496 20 11.254 20 9.983c0-1.218-1.396-2.397-3.556-3.149m-.497 5.61q-.165.055-.336.106a20 20 0 0 0-1.013-2.563c.399-.87.727-1.72.973-2.525q.308.09.595.19c1.85.644 2.98 1.597 2.98 2.331 0 .782-1.22 1.797-3.2 2.46Zm-.822 1.646c.2 1.023.229 1.948.096 2.67-.119.65-.358 1.083-.654 1.256-.63.37-1.979-.11-3.432-1.376q-.25-.218-.503-.463a20 20 0 0 0 1.676-2.154c.967-.086 1.88-.228 2.709-.422q.06.25.108.49Zm-8.307 3.863c-.615.22-1.106.226-1.402.053-.631-.368-.893-1.789-.536-3.695q.062-.327.146-.671c.82.183 1.726.315 2.696.394a21 21 0 0 0 1.716 2.146q-.19.187-.38.355c-.777.686-1.554 1.173-2.24 1.418m-2.885-5.514c-.975-.337-1.78-.775-2.332-1.254-.496-.43-.747-.856-.747-1.202 0-.737 1.086-1.676 2.897-2.315q.33-.116.688-.22c.25.824.579 1.685.975 2.556a21 21 0 0 0-.987 2.591 11 11 0 0 1-.494-.156m.968-6.659c-.376-1.943-.127-3.409.501-3.776.67-.392 2.15.166 3.709 1.567q.15.135.3.28a21 21 0 0 0-1.704 2.133 21 21 0 0 0-2.669.42q-.078-.318-.137-.624m8.627 2.155a28 28 0 0 0-.609-1.012c.639.082 1.25.19 1.824.323a19 19 0 0 1-.64 1.742 30 30 0 0 0-.575-1.053M10.009 4.47c.395.432.79.914 1.178 1.437a25 25 0 0 0-2.364 0q.584-.78 1.186-1.437M6.47 7.94a26 26 0 0 0-.565 1.046 19 19 0 0 1-.635-1.75c.57-.13 1.179-.235 1.813-.315q-.315.497-.613 1.019m.631 5.165a18 18 0 0 1-1.843-.3c.177-.577.394-1.176.648-1.786A26 26 0 0 0 7.1 13.106Zm2.933 2.452c-.405-.442-.809-.93-1.203-1.457a30 30 0 0 0 2.377-.004c-.39.535-.782 1.025-1.174 1.461m4.078-4.57q.403.927.672 1.78c-.58.134-1.206.242-1.866.322a31 31 0 0 0 1.194-2.101Zm-1.32.641a28 28 0 0 1-.96 1.566q-.892.065-1.831.065-.935 0-1.81-.058a24.4 24.4 0 0 1-1.83-3.198 24 24 0 0 1 1.82-3.193 24 24 0 0 1 3.646 0 28.5 28.5 0 0 1 1.826 3.18 26 26 0 0 1-.861 1.638m1.762-9.651c.67.39.93 1.966.51 4.032q-.04.198-.09.402a20 20 0 0 0-2.674-.427 20 20 0 0 0-1.69-2.134q.23-.225.46-.427c1.476-1.3 2.856-1.813 3.484-1.446M10 8.176c.986 0 1.786.81 1.786 1.807 0 .998-.8 1.806-1.786 1.806a1.796 1.796 0 0 1-1.786-1.806c0-.998.8-1.807 1.786-1.807'
                          />
                        </svg>
                        React
                      </div>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 20 20'
                        className='size-5 text-ln-gray-300'
                      >
                        <path
                          fill='currentColor'
                          d='M10.003 11.108a1.183 1.183 0 0 1-1.176-1.176c0-.644.532-1.176 1.176-1.176s1.176.532 1.176 1.176-.532 1.176-1.176 1.176'
                        />
                      </svg>
                      <div className='flex items-center gap-2 text-ln-label-sm text-ln-gray-600 xl:text-ln-label-md'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 20 20'
                          className='size-4 text-ln-gray-400 xl:size-5'
                        >
                          <path
                            fill='currentColor'
                            d='M14.584 2.248C8.631-1.252 1.066 3.023 1 9.926c-.064 6.74 7.069 11.093 13.009 8.126L7.524 8.511v5.906c0 .654-1.253.654-1.253 0V6.499c0-.52.965-.562 1.239-.11l7.392 11.155c5.553-3.577 5.478-11.888-.318-15.296m-.835 11.178-1.256-1.919V6.254c0-.49 1.256-.49 1.256 0z'
                          />
                        </svg>
                        Next.js
                      </div>
                    </div>
                  </div>
                  <div className='mt-6 grid justify-center gap-4 md:grid-cols-2 xl:mt-10 xl:grid xl:grid-cols-4 xl:gap-6 xl:p-6'>
                    <div className='w-full max-w-[390px] xl:max-w-full'>
                      <div className='flex flex-col gap-5 rounded-20 bg-ln-gray-25 p-7 ring-1 ring-inset ring-ln-gray-100 md:rounded-3xl'>
                        <div className='text-ln-label-md text-ln-gray-600'>
                          Web Sitesi
                        </div>
                        <div className='flex items-center gap-4 py-0.5'>
                          <div className='font-550 text-[36px] leading-none -tracking-[0.028em] text-ln-gray-800'>
                            $149
                          </div>
                          <div>
                            <div className='text-ln-label-sm text-ln-gray-800'>
                              tek seferlik ödeme
                            </div>
                            <div className='text-ln-paragraph-sm text-ln-gray-600'>
                              + vergiler hariç
                            </div>
                          </div>
                        </div>
                        <div className='relative -mt-0.5 h-0.5 w-full border-b border-white before:absolute before:left-0 before:top-0 before:h-px before:w-full before:bg-black/10' />
                        <ul className='flex flex-col gap-4'>
                          <li className='flex items-center gap-2 text-ln-label-sm text-ln-gray-600'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 18 18'
                              className='size-5 text-ln-gray-500'
                            >
                              <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                                d='m5.063 9.797 2.362 2.39 5.513-6.374'
                              />
                            </svg>
                            Sınırsız proje
                          </li>
                          <li className='flex items-center gap-2 text-ln-label-sm text-ln-gray-600'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 18 18'
                              className='size-5 text-ln-gray-500'
                            >
                              <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                                d='m5.063 9.797 2.362 2.39 5.513-6.374'
                              />
                            </svg>
                            Ücretsiz güncellemeler
                          </li>
                          <li className='flex items-center gap-2 text-ln-label-sm text-ln-gray-600'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 18 18'
                              className='size-5 text-ln-gray-500'
                            >
                              <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                                d='m5.063 9.797 2.362 2.39 5.513-6.374'
                              />
                            </svg>
                            Basit .zip dosyası
                          </li>
                        </ul>
                        <a
                          href='https://alignui.lemonsqueezy.com/checkout/buy/56bd0fad-40f6-4342-a8f6-92b456174bba'
                          target='_blank'
                          className='group relative inline-flex h-9 w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-[11px] bg-ln-gray-0 px-3.5 text-ln-label-sm text-ln-gray-800 shadow-ln-button-white transition duration-200 ease-linear focus:outline-none'
                        >
                          Paketi Al
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 20 20'
                            className='-mx-1.5 size-5 shrink-0 text-ln-gray-500 transition duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-0.5'
                          >
                            <path
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.25'
                              d='M14.5 12.204V6m0 0H8.296M14.5 6l-8 8'
                            />
                          </svg>
                        </a>
                      </div>
                      <div className='mt-4 hidden items-center gap-2 text-ln-label-sm text-ln-gray-500 md:flex'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          className='size-5 shrink-0 text-ln-gray-400'
                        >
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeWidth='1.5'
                            d='M12 14v-3.5m-2.706 7.984 2.065 1.73a1 1 0 0 0 1.28.004l2.099-1.738a1 1 0 0 1 .638-.23h2.874a2 2 0 0 0 2-2V5.75a2 2 0 0 0-2-2H5.75a2 2 0 0 0-2 2v10.5a2 2 0 0 0 2 2h2.902a1 1 0 0 1 .642.234Z'
                          />
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeWidth={2}
                            d='M12 8h.01'
                          />
                        </svg>
                        PPP indirimleri sunuyoruz.
                      </div>
                    </div>
                    <div className='w-full max-w-[390px] xl:max-w-full'>
                      <div
                        className='relative flex flex-col gap-6 overflow-hidden rounded-20 bg-ln-gray-925 p-7 md:rounded-3xl'
                        style={{
                          boxShadow:
                            'rgba(41, 41, 41, 0.04) 0px 12px 12px -6px, rgba(41, 41, 41, 0.04) 0px 24px 24px -12px, rgba(41, 41, 41, 0.04) 0px 48px 48px -24px, rgb(15, 15, 15) 0px 0px 0px 1px, rgba(255, 255, 255, 0.12) 0px 1px 2px inset',
                        }}
                      >
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
                        <div className='relative z-10 flex flex-col gap-4'>

                          <div className='text-ln-label-md text-ln-orange'>
                            Tam Erişim
                          </div>
                          <div className='flex items-center gap-4'>
                            <div
                              className='font-599 text-[48px] leading-none'
                              style={{
                                background:
                                  'linear-gradient(rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0.72) 100%) text',
                                WebkitTextFillColor: 'transparent',
                              }}
                            >
                              $299
                            </div>
                            <div>
                              <div className='text-ln-label-md text-ln-gray-300'>
                                tek seferlik ödeme
                              </div>
                              <div className='text-ln-paragraph-sm text-ln-gray-600'>
                                + vergiler hariç
                              </div>
                            </div>
                          </div>
                        </div>
                        <a
                          href='https://alignui.lemonsqueezy.com/buy/a3537cad-193b-486d-ac49-d127af2c31fd'
                          target='_blank'
                          className='focus:outline-noneone group relative z-10 inline-flex h-11 w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-[11px] bg-ln-orange px-3.5 text-ln-label-sm text-ln-gray-0 shadow-ln-button-orange transition duration-200 ease-linear'
                        >
                          Tam Erişimi Al
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 20 20'
                            className='-mx-1.5 size-5 shrink-0 text-ln-gray-0/[.72] transition duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-0.5'
                          >
                            <path
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.25'
                              d='M14.5 12.204V6m0 0H8.296M14.5 6l-8 8'
                            />
                          </svg>
                        </a>
                        <p className='relative z-10 text-ln-paragraph-sm text-ln-gray-500'>
                          Tek ödemede tüm şablon ve bileşenlere ömür boyu erişim.
                        </p>
                        <div className='relative z-10 -mt-0.5 h-0.5 w-full border-b border-white/[.06] before:absolute before:left-0 before:top-0 before:h-px before:w-full before:bg-black/[.72]' />
                        <ul className='relative z-10 flex flex-col gap-6'>
                          <li className='flex items-center gap-4 text-ln-paragraph-sm text-ln-gray-500'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              className='size-5 shrink-0 text-ln-orange'
                            >
                              <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                                d='M17.25 18.25h2.25m-15.75-1.5v-11a2 2 0 0 1 2-2h12.5a2 2 0 0 1 2 2v3m-16.5 8h-2v1.5a2 2 0 0 0 2 2h10.5m-10.5-3.5h10.5m6-8h-4a2 2 0 0 0-2 2v8.5a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-8.5a2 2 0 0 0-2-2'
                              />
                            </svg>
                            <div>
                              <span className='text-ln-label-sm text-ln-gray-200'>
                                Herkes için tasarlandı
                              </span>
                              — React ve Next.js ile geliştirilmiş esnek şablonlar.
                            </div>
                          </li>
                          <li className='flex items-center gap-4 text-ln-paragraph-sm text-ln-gray-500'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              className='size-5 shrink-0 text-ln-orange'
                            >
                              <path
                                stroke='currentColor'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                                d='m8.957 5.043 2.336-2.336a1 1 0 0 1 1.414 0l2.336 2.336a1 1 0 0 1 0 1.414l-2.336 2.336a1 1 0 0 1-1.414 0L8.957 6.457a1 1 0 0 1 0-1.414Zm0 12.5 2.336-2.336a1 1 0 0 1 1.414 0l2.336 2.336a1 1 0 0 1 0 1.414l-2.336 2.336a1 1 0 0 1-1.414 0l-2.336-2.336a1 1 0 0 1 0-1.414Zm-6.25-6.25 2.336-2.336a1 1 0 0 1 1.414 0l2.336 2.336a1 1 0 0 1 0 1.414l-2.336 2.336a1 1 0 0 1-1.414 0l-2.336-2.336a1 1 0 0 1 0-1.414Zm12.5 0 2.336-2.336a1 1 0 0 1 1.414 0l2.336 2.336a1 1 0 0 1 0 1.414l-2.336 2.336a1 1 0 0 1-1.414 0l-2.336-2.336a1 1 0 0 1 0-1.414Z'
                              />
                            </svg>
                            <div>
                              <span className='text-ln-label-sm text-ln-gray-200'>
                                100+ bileşen
                              </span>
                              — Etkileyici bloklar, şablonlar ve daha fazlası için
                              ihtiyacınız olan her şey.
                            </div>
                          </li>
                          <li className='flex items-center gap-4 text-ln-paragraph-sm text-ln-gray-500'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 20 20'
                              className='size-5 shrink-0 text-ln-orange'
                            >
                              <path
                                stroke='currentColor'
                                strokeLinecap='square'
                                strokeWidth='1.25'
                                d='m10 10 2.746 2.8a3.83 3.83 0 0 0 5.492 0 4.013 4.013 0 0 0 0-5.599 3.83 3.83 0 0 0-5.492 0zm0 0L7.254 7.201a3.83 3.83 0 0 0-5.492 0 4.013 4.013 0 0 0 0 5.598 3.83 3.83 0 0 0 5.492 0z'
                              />
                            </svg>
                            <div>
                              <span className='text-ln-label-sm text-ln-gray-200'>
                                Ömür boyu erişim
                              </span>
                              — Tüm mevcut ve gelecekteki blok ve şablonlara
                              anında erişim.
                            </div>
                          </li>
                        </ul>
                        <div className='relative z-10 -mx-5 -mb-5 flex items-center gap-4 rounded-b-2xl rounded-t-lg bg-ln-gray-0 px-6 py-4'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 20 20'
                            className='size-5 shrink-0 text-ln-orange'
                          >
                            <path
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.5'
                              d='M12.499 2.292a2.917 2.917 0 0 1 0 5.833m4.791 8.75h.417c.92 0 1.687-.763 1.409-1.64-.568-1.786-2.024-3.31-3.91-3.978m-7.5-3.132a2.917 2.917 0 1 1 0-5.833 2.917 2.917 0 0 1 0 5.833m-6.62 7.083c.81-2.582 3.467-4.583 6.62-4.583s5.812 2.001 6.622 4.583c.276.878-.492 1.641-1.413 1.641H2.5c-.92 0-1.689-.763-1.413-1.641Z'
                            />
                          </svg>
                          <div className='text-ln-label-sm text-ln-gray-600'>
                            <span className='text-ln-gray-900'>
                              Ekipler için de uygun
                            </span>{' '}
                            — Ekibiniz için tüm bileşenler, şablonlar ve gelecekteki
                            güncellemeler.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='w-full max-w-[390px] xl:max-w-full'>
                      <div className='flex flex-col gap-5 rounded-20 bg-ln-gray-25 p-7 ring-1 ring-inset ring-ln-gray-100 md:rounded-3xl'>
                        <div className='text-ln-label-md text-ln-gray-600'>
                          E-Ticaret
                        </div>
                        <div className='flex items-center gap-4 py-0.5'>
                          <div className='font-550 text-[36px] leading-none -tracking-[0.028em] text-ln-gray-800'>
                            $149
                          </div>
                          <div>
                            <div className='text-ln-label-sm text-ln-gray-800'>
                              tek seferlik ödeme
                            </div>
                            <div className='text-ln-paragraph-sm text-ln-gray-600'>
                              + vergiler hariç
                            </div>
                          </div>
                        </div>
                        <div className='relative -mt-0.5 h-0.5 w-full border-b border-white before:absolute before:left-0 before:top-0 before:h-px before:w-full before:bg-black/10' />
                        <ul className='flex flex-col gap-4'>
                          <li className='flex items-center gap-2 text-ln-label-sm text-ln-gray-600'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 18 18'
                              className='size-5 text-ln-gray-500'
                            >
                              <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                                d='m5.063 9.797 2.362 2.39 5.513-6.374'
                              />
                            </svg>
                            Sınırsız proje
                          </li>
                          <li className='flex items-center gap-2 text-ln-label-sm text-ln-gray-600'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 18 18'
                              className='size-5 text-ln-gray-500'
                            >
                              <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                                d='m5.063 9.797 2.362 2.39 5.513-6.374'
                              />
                            </svg>
                            Ücretsiz güncellemeler
                          </li>
                          <li className='flex items-center gap-2 text-ln-label-sm text-ln-gray-600'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 18 18'
                              className='size-5 text-ln-gray-500'
                            >
                              <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                                d='m5.063 9.797 2.362 2.39 5.513-6.374'
                              />
                            </svg>
                            Basit .zip dosyası
                          </li>
                        </ul>
                        <a
                          href='https://alignui.lemonsqueezy.com/buy/c81d7703-dd57-4bb0-91ff-6ebc7c25b3b6'
                          target='_blank'
                          className='group relative inline-flex h-9 w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-[11px] bg-ln-gray-0 px-3.5 text-ln-label-sm text-ln-gray-800 shadow-ln-button-white transition duration-200 ease-linear focus:outline-none'
                        >
                          Paketi Al
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 20 20'
                            className='-mx-1.5 size-5 shrink-0 text-ln-gray-500 transition duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-0.5'
                          >
                            <path
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.25'
                              d='M14.5 12.204V6m0 0H8.296M14.5 6l-8 8'
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div className='w-full max-w-[390px] xl:max-w-full'>
                      <div className='flex flex-col gap-5 rounded-20 bg-ln-gray-25 p-7 ring-1 ring-inset ring-ln-gray-100 md:rounded-3xl'>
                        <div className='text-ln-label-md text-ln-gray-600'>
                          SaaS Platform
                        </div>
                        <div className='flex items-center gap-4 py-0.5'>
                          <div className='font-550 text-[36px] leading-none -tracking-[0.028em] text-ln-gray-800'>
                            $149
                          </div>
                          <div>
                            <div className='text-ln-label-sm text-ln-gray-800'>
                              tek seferlik ödeme
                            </div>
                            <div className='text-ln-paragraph-sm text-ln-gray-600'>
                              + vergiler hariç
                            </div>
                          </div>
                        </div>
                        <div className='relative -mt-0.5 h-0.5 w-full border-b border-white before:absolute before:left-0 before:top-0 before:h-px before:w-full before:bg-black/10' />
                        <ul className='flex flex-col gap-4'>
                          <li className='flex items-center gap-2 text-ln-label-sm text-ln-gray-600'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 18 18'
                              className='size-5 text-ln-gray-500'
                            >
                              <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                                d='m5.063 9.797 2.362 2.39 5.513-6.374'
                              />
                            </svg>
                            Sınırsız proje
                          </li>
                          <li className='flex items-center gap-2 text-ln-label-sm text-ln-gray-600'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 18 18'
                              className='size-5 text-ln-gray-500'
                            >
                              <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                                d='m5.063 9.797 2.362 2.39 5.513-6.374'
                              />
                            </svg>
                            Ücretsiz güncellemeler
                          </li>
                          <li className='flex items-center gap-2 text-ln-label-sm text-ln-gray-600'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 18 18'
                              className='size-5 text-ln-gray-500'
                            >
                              <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                                d='m5.063 9.797 2.362 2.39 5.513-6.374'
                              />
                            </svg>
                            Basit .zip dosyası
                          </li>
                        </ul>
                        <a
                          href='https://alignui.lemonsqueezy.com/buy/c81d7703-dd57-4bb0-91ff-6ebc7c25b3b6'
                          target='_blank'
                          className='group relative inline-flex h-9 w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-[11px] bg-ln-gray-0 px-3.5 text-ln-label-sm text-ln-gray-800 shadow-ln-button-white transition duration-200 ease-linear focus:outline-none'
                        >
                          Paketi Al
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 20 20'
                            className='-mx-1.5 size-5 shrink-0 text-ln-gray-500 transition duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-0.5'
                          >
                            <path
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.25'
                              d='M14.5 12.204V6m0 0H8.296M14.5 6l-8 8'
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div className='mt-2 flex items-center justify-center gap-2 text-ln-label-sm text-ln-gray-500 md:hidden'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        className='size-5 shrink-0 text-ln-gray-400'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeWidth='1.5'
                          d='M12 14v-3.5m-2.706 7.984 2.065 1.73a1 1 0 0 0 1.28.004l2.099-1.738a1 1 0 0 1 .638-.23h2.874a2 2 0 0 0 2-2V5.75a2 2 0 0 0-2-2H5.75a2 2 0 0 0-2 2v10.5a2 2 0 0 0 2 2h2.902a1 1 0 0 1 .642.234Z'
                        />
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeWidth={2}
                          d='M12 8h.01'
                        />
                      </svg>
                      PPP indirimleri sunuyoruz.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mx-auto my-12 flex h-8 w-full max-w-[596px] items-center gap-6 px-4 md:my-24'>
          <div className='relative h-px w-full flex-1 bg-ln-gray-200'>
            <img
              src='https://alignui.com/images/landing/dot-gray-25.png'
              width={9}
              height={9}
              alt=''
              className='absolute left-0 top-1/2 z-30 min-h-[9px] min-w-[9px] -translate-x-1/2 -translate-y-1/2'
            />
            <img
              src='https://alignui.com/images/landing/dot-gray-25.png'
              width={9}
              height={9}
              alt=''
              className='absolute right-0 top-1/2 z-30 min-h-[9px] min-w-[9px] -translate-y-1/2 translate-x-1/2'
            />
          </div>
          <img
            src='https://alignui.com/images/landing/section-separator-icon.png'
            alt=''
            width={34}
            height={26}
            className='shrink-0 object-contain'
          />
          <div className='relative h-px w-full flex-1 bg-ln-gray-200'>
            <img
              src='https://alignui.com/images/landing/dot-gray-25.png'
              width={9}
              height={9}
              alt=''
              className='absolute left-0 top-1/2 z-30 min-h-[9px] min-w-[9px] -translate-x-1/2 -translate-y-1/2'
            />
            <img
              src='https://alignui.com/images/landing/dot-gray-25.png'
              width={9}
              height={9}
              alt=''
              className='absolute right-0 top-1/2 z-30 min-h-[9px] min-w-[9px] -translate-y-1/2 translate-x-1/2'
            />
          </div>
        </div>
        <SectorTemplates />
    
        <DeferredTestimonials />

        <Faqs />
        <CTASectionNew />
      </div>
    </>
  );
}
