// 'use client';
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SeeMoreButton } from '@/components/SeeMoreButton';
import Header from '@/components/header';
import { Root as AccordionRoot, Content as AccordionContent, Item as AccordionItem, Trigger as AccordionTrigger, Arrow as AccordionArrow } from '@/components/new-ui/accordion';
import { DottedGlowBackground } from '@/components/ui/dotted-glow-background';

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<'personal' | 'startup' | 'enterprise'>('startup');
  const [includeFigma, setIncludeFigma] = useState(false);
  const [showSaveBadge, setShowSaveBadge] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const tabBtnPersonalRef = React.useRef<HTMLButtonElement>(null);
  const tabBtnStartupRef = React.useRef<HTMLButtonElement>(null);
  const tabBtnEnterpriseRef = React.useRef<HTMLButtonElement>(null);
  const tabListDivRef = React.useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = React.useState<React.CSSProperties>({ transform: 'translate3d(0px,0px,0px)', width: '0px', transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)' });
  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  React.useEffect(() => {
    const btn = activeTab === 'personal' ? tabBtnPersonalRef.current : activeTab === 'startup' ? tabBtnStartupRef.current : tabBtnEnterpriseRef.current;
    const list = tabListDivRef.current;
    if (btn && list) {
      const btnRect = btn.getBoundingClientRect();
      const listRect = list.getBoundingClientRect();
      setIndicatorStyle({
        transform: `translate3d(${btnRect.left - listRect.left}px, 0px, 0px)`,
        width: `${btnRect.width}px`,
        transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)',
      });
    }
  }, [activeTab, isLoaded]);

  return (
    <>
      {/* Background decorative elements */}
      <div className="mac:block container pointer-events-none absolute inset-0 -z-10 hidden select-none" aria-hidden="true">
        <div className="ruler-ticks absolute -left-[4.5rem] top-[144px] flex flex-col gap-10">
          <div>0</div><div>50</div><div>100</div><div>150</div><div>200</div><div>250</div><div>300</div><div>350</div><div>400</div><div>450</div><div>500</div><div>550</div><div>600</div><div>650</div><div>700</div><div>750</div>
        </div>
        <div className="ruler-ticks ruler-ticks-right absolute -right-[4.5rem] top-[144px] flex flex-col gap-10">
          <div>0</div><div>50</div><div>100</div><div>150</div><div>200</div><div>250</div><div>300</div><div>350</div><div>400</div><div>450</div><div>500</div><div>550</div><div>600</div><div>650</div><div>700</div><div>750</div>
        </div>
        <div className="pointer-events-none isolate h-[755px] absolute -inset-x-16 top-[520px] w-auto">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(247, 247, 247, 0) 0%, #F7F7F7 72%)' }} />
          <div className="progressive-blur-mask absolute bottom-0 z-10 h-[75px]" style={{ '--blur': 11, transform: 'translate3d(0, 37.5px, 0)' } as React.CSSProperties} />
          <div className="progressive-blur-mask absolute bottom-0 z-10 h-[75px]" style={{ '--blur': 10, transform: 'translate3d(0, 0px, 0)' } as React.CSSProperties} />
          <div className="progressive-blur-mask absolute bottom-0 z-10 h-[75px]" style={{ '--blur': 9, transform: 'translate3d(0, -37.5px, 0)' } as React.CSSProperties} />
          <div className="progressive-blur-mask absolute bottom-0 z-10 h-[75px]" style={{ '--blur': 8, transform: 'translate3d(0, -75px, 0)' } as React.CSSProperties} />
          <div className="progressive-blur-mask absolute bottom-0 z-10 h-[75px]" style={{ '--blur': 7, transform: 'translate3d(0, -112.5px, 0)' } as React.CSSProperties} />
          <div className="progressive-blur-mask absolute bottom-0 z-10 h-[75px]" style={{ '--blur': 6, transform: 'translate3d(0, -150px, 0)' } as React.CSSProperties} />
          <div className="progressive-blur-mask absolute bottom-0 z-10 h-[75px]" style={{ '--blur': 5, transform: 'translate3d(0, -187.5px, 0)' } as React.CSSProperties} />
          <div className="progressive-blur-mask absolute bottom-0 z-10 h-[75px]" style={{ '--blur': 4, transform: 'translate3d(0, -225px, 0)' } as React.CSSProperties} />
          <div className="progressive-blur-mask absolute bottom-0 z-10 h-[75px]" style={{ '--blur': 3, transform: 'translate3d(0, -262.5px, 0)' } as React.CSSProperties} />
          <div className="progressive-blur-mask absolute bottom-0 z-10 h-[75px]" style={{ '--blur': 2, transform: 'translate3d(0, -300px, 0)' } as React.CSSProperties} />
          <div className="progressive-blur-mask absolute bottom-0 z-10 h-[75px]" style={{ '--blur': 1, transform: 'translate3d(0, -337.5px, 0)' } as React.CSSProperties} />
        </div>
        <div className="bleed-ln-gray-200 bleed-border-b absolute -left-8 rotate-90" />
        <div className="bleed-ln-gray-200 bleed-border-b absolute -right-8 rotate-90" />
      </div>

      {/* Header */}
   
   <div className="container px-5">
      {/* Main Content */}
      <div className="container  flex flex-col items-start pt-11 md:items-center md:pt-16">
            <div className="hidden md:block">
              <div className="flex h-7 items-center gap-1.5 rounded-[9px] bg-ln-gray-0 pl-1.5 pr-2.5 text-ln-label-sm text-ln-gray-700 shadow-ln-subheading xl:h-8 xl:pl-2 xl:pr-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18" className="size-[18px] text-ln-gray-400">
                  <path stroke="currentColor" strokeLinejoin="round" strokeWidth="1.125" d="M2.063 8.371V3.562a1.5 1.5 0 0 1 1.5-1.5H8.37a1.5 1.5 0 0 1 1.06.44l6.008 6.007a1.5 1.5 0 0 1 0 2.122l-4.808 4.808a1.5 1.5 0 0 1-2.122 0L2.502 9.432a1.5 1.5 0 0 1-.44-1.06Z" />
                  <path stroke="currentColor" strokeLinejoin="round" strokeWidth="1.125" d="M6.188 5.625a.563.563 0 1 1-1.126 0 .563.563 0 0 1 1.125 0Z" />
                </svg>
                Get-all-access
                <div className="rounded-[5px] bg-ln-orange/[.12] px-[5px] py-[3px] text-ln-subheading-xs text-ln-orange shadow-ln-badge-orange">PRO</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-ln-label-md text-ln-gray-700 md:hidden">
              Get-all-access
              <div className="rounded-[5px] bg-ln-orange/[.12] px-[5px] py-[3px] text-ln-subheading-xs text-ln-orange shadow-ln-badge-orange">PRO</div>
            </div>
            <h1 className="mt-3 text-[34px]/[40px] font-550 -tracking-[0.02em] text-ln-gray-900 md:mt-4 md:text-center xl:text-ln-title-h2">
              Get everything, forever.
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-ln-paragraph-md text-ln-gray-600 md:mt-5 md:px-2 md:text-center xl:text-ln-paragraph-lg">
              <span className="font-medium text-ln-gray-700">One-time</span> payment grants you <span className="font-medium text-ln-gray-700">lifetime access</span> and <span className="font-medium text-ln-gray-700">continuous updates</span>, with <span className="font-medium text-ln-gray-700">unlimited</span> projects.
            </p>
          </div>
          <div dir="ltr" data-orientation="horizontal" className="-mx-5 mt-6 w-[calc(100%+40px)] md:mt-11 xl:hidden">
            <div className="relative grid overflow-x-auto overscroll-contain">
              <div ref={tabListDivRef} role="tablist" aria-orientation="horizontal" className="group/tab-list relative flex items-center gap-2 whitespace-nowrap border-b pb-4 border-ln-gray-200 px-5 pt-5" tabIndex={0} data-orientation="horizontal" style={{ outline: 'none' }}>
                <button ref={tabBtnPersonalRef} type="button" role="tab" aria-selected={activeTab === 'personal'} onClick={() => setActiveTab('personal')} data-state={activeTab === 'personal' ? 'active' : 'inactive'} className="group/tab-item h-8 rounded-[9px] pl-2 pr-2.5 text-ln-label-sm text-ln-gray-600 flex items-center justify-center gap-1.5 transition duration-200 ease-out focus:outline-none data-[state=active]:text-ln-gray-800 data-[state=active]:shadow-ln-badge-orange flex-1 data-[state=active]:bg-ln-gray-0">
                  Personal
                </button>
              
{/* <Link
  href="/faq"
  className="group relative inline-flex items-center justify-center whitespace-nowrap transition duration-200 ease-out outline-none focus:outline-none disabled:pointer-events-none bg-ln-gray-900 text-ln-gray-0 shadow-ln-button-gray hover:bg-ln-gray-800 disabled:bg-ln-gray-25 disabled:text-ln-gray-450 disabled:shadow-none h-11 gap-3.5 rounded-[13px] px-[18px] text-ln-label-sm"
>
  see more
</Link> */}
                <button ref={tabBtnStartupRef} type="button" role="tab" aria-selected={activeTab === 'startup'} onClick={() => setActiveTab('startup')} data-state={activeTab === 'startup' ? 'active' : 'inactive'} className="group/tab-item h-8  rounded-[9px] pl-2 pr-2.5 text-ln-label-sm text-ln-gray-600 flex items-center justify-center gap-1.5 transition duration-200 ease-out focus:outline-none data-[state=active]:text-ln-gray-800 data-[state=active]:shadow-ln-badge-orange  flex-1 data-[state=active]:bg-ln-gray-0">
                  Startup
                </button>
                <button ref={tabBtnEnterpriseRef} type="button" role="tab" aria-selected={activeTab === 'enterprise'} onClick={() => setActiveTab('enterprise')} data-state={activeTab === 'enterprise' ? 'active' : 'inactive'} className="group/tab-item h-8 rounded-[9px] pl-2 pr-2.5 text-ln-label-sm text-ln-gray-600 flex items-center justify-center gap-1.5 transition duration-200 ease-out focus:outline-none data-[state=active]:text-ln-gray-800 data-[state=active]:shadow-ln-badge-orange flex-1 data-[state=active]:bg-ln-gray-0">
                  Enterprise
                </button>
                <div className="absolute -bottom-px left-0 h-0.5 bg-ln-orange transition-all duration-300" style={indicatorStyle} aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="relative -mx-4 w-auto pt-20 md:mx-0 md:w-full xl:pt-16">
  <div className="w-full rounded-[32px] bg-ln-gray-50 p-1 !pb-0 ring-1 ring-inset ring-ln-gray-100 md:p-2.5">
    <div className="grid grid-cols-[minmax(160px,1fr)_minmax(0,1fr)] rounded-[28px] bg-ln-gray-0 p-1 shadow-ln-xs md:gap-2 md:rounded-3xl md:p-2 xl:grid-cols-4">
      <div className="relative flex flex-col gap-4 px-2.5 py-7 before:absolute before:inset-y-0 before:right-0 before:w-px before:bg-ln-gray-100 min-[480px]:pl-4 min-[480px]:pr-4 sm:gap-5 md:pl-5 md:pr-7">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={74}
          height={66}
          fill="none"
          viewBox="0 0 74 66"
          className="absolute -top-[39px] left-[75px]"
        >
          <path
            stroke="#F05023"
            strokeLinecap="round"
            strokeWidth={2}
            d="M1 65  C8.216 60.786 14.135 55.827 17.788 49.387 C20.38 44.817 21.832 39.503 21.798 33.18 C21.77 28.052 18.841 21.427 13.852 27.926 C9.252 33.918 11.836 45.036 17.788 49.387 L17.923 49.485 C27 55.907 37.406 49.542 43.869 42.187 C53.868 30.807 65.018 15.475 71.594 1.707 C71.594 1.707 59.533 7.857 59.533 7.857 C64.007 6.543 67.398 4.28 71.242 1.701 C74.009 -0.156 72.853 1.99 72.159 4.488 C71.029 8.548 70.855 13.998 72.243 18.042"
            pathLength={1}
            strokeDashoffset="0px"
            strokeDasharray="1px 1px"
          />
        </svg>
        <div className="absolute -top-[45px] left-[95px] flex whitespace-nowrap font-kalam text-[20px]/[24px] -tracking-[0.01em] text-ln-orange">
          {['S','a','v','e','\u00A0','u','p','\u00A0','t','o','\u00A0','2','0','%','\u00A0','t','o','d','a','y','!'].map((char, i) => (
            <span 
              key={i} 
              className={`transition-all duration-500 ${showSaveBadge ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {char === '\u00A0' ? <span>&nbsp;</span> : char}
            </span>
          ))}
        </div>
        <div
          className="flex w-full flex-col items-start pb-2 max-[768px]:!h-72 md:px-2"
          style={{ height: 244 }}
          ref={(el) => {
            if (el && !showSaveBadge) {
              setTimeout(() => setShowSaveBadge(true), 500);
            }
          }}
        >
          <button
            type="button"
            role="switch"
            aria-checked={includeFigma}
            data-state={includeFigma ? 'checked' : 'unchecked'}
            value="on"
            onClick={() => setIncludeFigma(!includeFigma)}
            className={`group relative h-6 w-[46px] shrink-0 rounded-full transition duration-200 ease-out ${includeFigma ? 'bg-ln-orange' : 'bg-ln-gray-200'}`}
          >
            <span
              data-state={includeFigma ? 'checked' : 'unchecked'}
              className={`price-switch-thumb absolute left-0.5 top-0.5 flex size-5 items-center justify-center rounded-full bg-ln-gray-0 transition-transform duration-500 ${includeFigma ? 'translate-x-[22px]' : 'translate-x-0'}`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.6, 0.6, 0, 1)' }}
            >
              <div className={`size-1.5 rounded-full transition-colors duration-200 ${includeFigma ? 'bg-ln-orange' : 'bg-ln-gray-200'}`} />
            </span>
          </button>
          <div className="mt-5">
            <div className="text-ln-label-md text-ln-orange">
              Get the full package!
            </div>
            <div className="mt-1 text-[18px]/[26px] font-medium text-ln-gray-900">
              Include the Figma file to save time on your projects!
            </div>
          </div>
          <a
            className="mt-4 flex h-7 items-center gap-1 rounded-[7px] bg-ln-gray-0 pl-2.5 pr-2 text-ln-label-sm text-ln-gray-800 ring-1 ring-ln-gray-100"
            href="/"
          >
            Learn more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              className="size-4 shrink-0 text-ln-gray-500"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
                d="M14.5 12.204V6m0 0H8.296M14.5 6l-8 8"
              />
            </svg>
          </a>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-100" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="hidden size-5 shrink-0 text-ln-orange sm:block"
          >
            <path
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="M13.126 5.416a3.125 3.125 0 1 1-6.25 0 3.125 3.125 0 0 1 6.25 0ZM10 11.041c-2.825 0-4.97 1.679-5.847 4.052-.34.922.447 1.781 1.429 1.781h8.838c.982 0 1.77-.86 1.429-1.78C14.97 12.72 12.827 11.04 10 11.04Z"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-800 sm:text-ln-label-sm">
              Developer Seats
            </span>
            <button data-state="closed">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                className="size-5 text-ln-gray-300"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M10 16.25a6.25 6.25 0 1 0 0-12.5 6.25 6.25 0 0 0 0 12.5m1.116-3.041.1-.408a2 2 0 0 1-.25.083 1.2 1.2 0 0 1-.308.048q-.29 0-.407-.095-.118-.096-.118-.359a3.5 3.5 0 0 1 .118-.672l.373-1.318q.055-.182.075-.4a4 4 0 0 0 .02-.304.87.87 0 0 0-.292-.678q-.293-.26-.833-.26-.3 0-.636.106a9 9 0 0 0-.704.256l-.1.409a4 4 0 0 1 .262-.087q.151-.045.297-.045.297 0 .4.1.105.1.105.354.001.14-.034.31a6 6 0 0 1-.084.36l-.374 1.325q-.05.21-.073.374a2.4 2.4 0 0 0-.022.325q0 .408.301.673.302.265.846.265.354 0 .621-.092c.267-.092.417-.152.717-.27M11.05 7.85a.77.77 0 0 0 .26-.587.78.78 0 0 0-.26-.59.89.89 0 0 0-.628-.244.9.9 0 0 0-.63.244.78.78 0 0 0-.264.59q0 .345.263.587a.9.9 0 0 0 .63.243.9.9 0 0 0 .629-.243"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-100" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="hidden size-5 shrink-0 text-ln-orange sm:block"
          >
            <path
              stroke="currentColor"
              strokeLinecap="square"
              strokeWidth="1.25"
              d="m10 10 2.746 2.798a3.83 3.83 0 0 0 5.492 0 4.013 4.013 0 0 0 0-5.598 3.83 3.83 0 0 0-5.492 0zm0 0L7.254 7.2a3.83 3.83 0 0 0-5.492 0 4.013 4.013 0 0 0 0 5.598 3.83 3.83 0 0 0 5.492 0z"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-800 sm:text-ln-label-sm">
              Updates Time
            </span>
            <button data-state="closed">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                className="size-5 text-ln-gray-300"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M10 16.25a6.25 6.25 0 1 0 0-12.5 6.25 6.25 0 0 0 0 12.5m1.116-3.041.1-.408a2 2 0 0 1-.25.083 1.2 1.2 0 0 1-.308.048q-.29 0-.407-.095-.118-.096-.118-.359a3.5 3.5 0 0 1 .118-.672l.373-1.318q.055-.182.075-.4a4 4 0 0 0 .02-.304.87.87 0 0 0-.292-.678q-.293-.26-.833-.26-.3 0-.636.106a9 9 0 0 0-.704.256l-.1.409a4 4 0 0 1 .262-.087q.151-.045.297-.045.297 0 .4.1.105.1.105.354.001.14-.034.31a6 6 0 0 1-.084.36l-.374 1.325q-.05.21-.073.374a2.4 2.4 0 0 0-.022.325q0 .408.301.673.302.265.846.265.354 0 .621-.092c.267-.092.417-.152.717-.27M11.05 7.85a.77.77 0 0 0 .26-.587.78.78 0 0 0-.26-.59.89.89 0 0 0-.628-.244.9.9 0 0 0-.63.244.78.78 0 0 0-.264.59q0 .345.263.587a.9.9 0 0 0 .63.243.9.9 0 0 0 .629-.243"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-100" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="hidden size-5 shrink-0 text-ln-orange sm:block"
          >
            <path
              fill="currentColor"
              d="M2.917 14.375v-8.75h-1.25v8.75zm14.166-8.75v8.75h1.25v-8.75zm-1.041 9.792H3.958v1.25h12.084zM3.958 4.583h12.084v-1.25H3.958zm13.125 9.792c0 .575-.466 1.042-1.041 1.042v1.25a2.29 2.29 0 0 0 2.291-2.292zm1.25-8.75a2.29 2.29 0 0 0-2.291-2.292v1.25c.575 0 1.041.467 1.041 1.042zm-15.416 0c0-.575.466-1.042 1.041-1.042v-1.25a2.29 2.29 0 0 0-2.291 2.292zm-1.25 8.75a2.29 2.29 0 0 0 2.291 2.292v-1.25a1.04 1.04 0 0 1-1.041-1.042z"
            />
            <path
              fill="currentColor"
              d="M9.375 16.042v.625h1.25v-.625zm1.25-12.084v-.625h-1.25v.625zm0 12.084V3.958h-1.25v12.084z"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-800 sm:text-ln-label-sm">
              Blocks &amp; Components
            </span>
            <button data-state="closed">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                className="size-5 text-ln-gray-300"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M10 16.25a6.25 6.25 0 1 0 0-12.5 6.25 6.25 0 0 0 0 12.5m1.116-3.041.1-.408a2 2 0 0 1-.25.083 1.2 1.2 0 0 1-.308.048q-.29 0-.407-.095-.118-.096-.118-.359a3.5 3.5 0 0 1 .118-.672l.373-1.318q.055-.182.075-.4a4 4 0 0 0 .02-.304.87.87 0 0 0-.292-.678q-.293-.26-.833-.26-.3 0-.636.106a9 9 0 0 0-.704.256l-.1.409a4 4 0 0 1 .262-.087q.151-.045.297-.045.297 0 .4.1.105.1.105.354.001.14-.034.31a6 6 0 0 1-.084.36l-.374 1.325q-.05.21-.073.374a2.4 2.4 0 0 0-.022.325q0 .408.301.673.302.265.846.265.354 0 .621-.092c.267-.092.417-.152.717-.27M11.05 7.85a.77.77 0 0 0 .26-.587.78.78 0 0 0-.26-.59.89.89 0 0 0-.628-.244.9.9 0 0 0-.63.244.78.78 0 0 0-.264.59q0 .345.263.587a.9.9 0 0 0 .63.243.9.9 0 0 0 .629-.243"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-100" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="hidden size-5 shrink-0 text-ln-orange sm:block"
          >
            <path
              fill="currentColor"
              d="M16.25 5.792v8.416h1.25V5.792zM14.208 16.25H5.792v1.25h8.416zM3.75 14.208V5.792H2.5v8.416zM5.792 3.75h8.416V2.5H5.792zm0 12.5c-.477 0-.798 0-1.044-.02-.24-.02-.354-.055-.43-.093l-.567 1.113c.281.143.579.2.895.225.31.025.69.025 1.146.025zM2.5 14.208c0 .457 0 .837.025 1.146.026.317.082.614.225.895l1.114-.568c-.039-.075-.074-.19-.093-.429-.02-.247-.021-.567-.021-1.044zm1.819 1.929a1.04 1.04 0 0 1-.455-.456l-1.114.568c.22.43.57.782 1.001 1.001zm11.931-1.929c0 .477 0 .797-.02 1.044-.02.24-.055.354-.093.43l1.113.567c.143-.281.2-.578.225-.895.025-.31.025-.69.025-1.146zM14.208 17.5c.457 0 .837 0 1.146-.025.317-.026.614-.082.895-.225l-.568-1.113c-.075.038-.19.073-.429.092-.247.02-.567.021-1.044.021zm1.929-1.819c-.1.196-.26.356-.456.456l.568 1.113c.43-.22.782-.57 1.001-1.001zm1.363-9.89c0-.456 0-.836-.025-1.145-.026-.316-.082-.614-.225-.895l-1.113.568c.038.075.073.19.092.429.02.246.021.567.021 1.044h1.25ZM14.208 3.75c.477 0 .797 0 1.044.02.24.02.354.055.43.094l.567-1.114c-.281-.143-.578-.2-.895-.225-.31-.025-.69-.025-1.146-.025zm3.042.001a2.3 2.3 0 0 0-1-1.001l-.568 1.114c.196.1.356.259.456.455l1.113-.568Zm-13.5 2.04c0-.476 0-.797.02-1.043.02-.24.055-.354.094-.43L2.75 3.752c-.143.281-.2.579-.225.895-.025.31-.025.69-.025 1.146h1.25ZM5.792 2.5c-.457 0-.837 0-1.146.025-.316.026-.614.082-.895.225l.568 1.114c.075-.039.19-.074.429-.093.246-.02.567-.021 1.044-.021zM3.864 4.319c.1-.196.259-.356.455-.455L3.75 2.75c-.43.22-.782.57-1.001 1.001z"
            />
            <path
              fill="currentColor"
              d="M8.75 3.125V2.5H7.5v.625zM7.5 16.875v.625h1.25v-.625zM8.75 10V3.125H7.5V10zM7.5 10v6.875h1.25V10z"
            />
            <path
              stroke="currentColor"
              strokeWidth="1.25"
              d="M8.333 10h8.334"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-800 sm:text-ln-label-sm">
              Sectoral Template
            </span>
            <button data-state="closed">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                className="size-5 text-ln-gray-300"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M10 16.25a6.25 6.25 0 1 0 0-12.5 6.25 6.25 0 0 0 0 12.5m1.116-3.041.1-.408a2 2 0 0 1-.25.083 1.2 1.2 0 0 1-.308.048q-.29 0-.407-.095-.118-.096-.118-.359a3.5 3.5 0 0 1 .118-.672l.373-1.318q.055-.182.075-.4a4 4 0 0 0 .02-.304.87.87 0 0 0-.292-.678q-.293-.26-.833-.26-.3 0-.636.106a9 9 0 0 0-.704.256l-.1.409a4 4 0 0 1 .262-.087q.151-.045.297-.045.297 0 .4.1.105.1.105.354.001.14-.034.31a6 6 0 0 1-.084.36l-.374 1.325q-.05.21-.073.374a2.4 2.4 0 0 0-.022.325q0 .408.301.673.302.265.846.265.354 0 .621-.092c.267-.092.417-.152.717-.27M11.05 7.85a.77.77 0 0 0 .26-.587.78.78 0 0 0-.26-.59.89.89 0 0 0-.628-.244.9.9 0 0 0-.63.244.78.78 0 0 0-.264.59q0 .345.263.587a.9.9 0 0 0 .63.243.9.9 0 0 0 .629-.243"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-100" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="hidden size-5 shrink-0 text-ln-orange sm:block"
          >
            <path
              fill="currentColor"
              d="M21.588 8.67a.75.75 0 1 0-.675-1.34zm-18.5-1.34a.75.75 0 1 0-.675 1.34zM20.5 6.75v10.5H22V6.75zM19.25 18.5H4.75V20h14.5zM3.5 17.25V6.75H2v10.5zM4.75 5.5h14.5V4H4.75zm16.163 1.83-8.35 4.207.675 1.34 8.35-4.207zm-9.475 4.207L3.088 7.33l-.675 1.34 8.35 4.207zM3.5 6.75c0-.69.56-1.25 1.25-1.25V4A2.75 2.75 0 0 0 2 6.75zM4.75 18.5c-.69 0-1.25-.56-1.25-1.25H2A2.75 2.75 0 0 0 4.75 20zm15.75-1.25c0 .69-.56 1.25-1.25 1.25V20A2.75 2.75 0 0 0 22 17.25zm-7.937-5.713a1.25 1.25 0 0 1-1.125 0l-.675 1.34a2.75 2.75 0 0 0 2.475 0zM22 6.75A2.75 2.75 0 0 0 19.25 4v1.5c.69 0 1.25.56 1.25 1.25z"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-800 sm:text-ln-label-sm">
              Communication Methods
            </span>
            <button data-state="closed">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                className="size-5 text-ln-gray-300"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M10 16.25a6.25 6.25 0 1 0 0-12.5 6.25 6.25 0 0 0 0 12.5m1.116-3.041.1-.408a2 2 0 0 1-.25.083 1.2 1.2 0 0 1-.308.048q-.29 0-.407-.095-.118-.096-.118-.359a3.5 3.5 0 0 1 .118-.672l.373-1.318q.055-.182.075-.4a4 4 0 0 0 .02-.304.87.87 0 0 0-.292-.678q-.293-.26-.833-.26-.3 0-.636.106a9 9 0 0 0-.704.256l-.1.409a4 4 0 0 1 .262-.087q.151-.045.297-.045.297 0 .4.1.105.1.105.354.001.14-.034.31a6 6 0 0 1-.084.36l-.374 1.325q-.05.21-.073.374a2.4 2.4 0 0 0-.022.325q0 .408.301.673.302.265.846.265.354 0 .621-.092c.267-.092.417-.152.717-.27M11.05 7.85a.77.77 0 0 0 .26-.587.78.78 0 0 0-.26-.59.89.89 0 0 0-.628-.244.9.9 0 0 0-.63.244.78.78 0 0 0-.264.59q0 .345.263.587a.9.9 0 0 0 .63.243.9.9 0 0 0 .629-.243"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-100" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="hidden size-5 shrink-0 text-ln-orange sm:block"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="M10 6.458V10l2.917 2.917M2.293 3.958v3.334h3.333"
            />
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="M2.707 12.57a7.72 7.72 0 0 0 7.28 5.138c4.264 0 7.72-3.45 7.72-7.708 0-4.257-3.456-7.708-7.72-7.708a7.72 7.72 0 0 0-7.114 4.71"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-800 sm:text-ln-label-sm">
              Support Response
            </span>
            <button data-state="closed">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                className="size-5 text-ln-gray-300"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M10 16.25a6.25 6.25 0 1 0 0-12.5 6.25 6.25 0 0 0 0 12.5m1.116-3.041.1-.408a2 2 0 0 1-.25.083 1.2 1.2 0 0 1-.308.048q-.29 0-.407-.095-.118-.096-.118-.359a3.5 3.5 0 0 1 .118-.672l.373-1.318q.055-.182.075-.4a4 4 0 0 0 .02-.304.87.87 0 0 0-.292-.678q-.293-.26-.833-.26-.3 0-.636.106a9 9 0 0 0-.704.256l-.1.409a4 4 0 0 1 .262-.087q.151-.045.297-.045.297 0 .4.1.105.1.105.354.001.14-.034.31a6 6 0 0 1-.084.36l-.374 1.325q-.05.21-.073.374a2.4 2.4 0 0 0-.022.325q0 .408.301.673.302.265.846.265.354 0 .621-.092c.267-.092.417-.152.717-.27M11.05 7.85a.77.77 0 0 0 .26-.587.78.78 0 0 0-.26-.59.89.89 0 0 0-.628-.244.9.9 0 0 0-.63.244.78.78 0 0 0-.264.59q0 .345.263.587a.9.9 0 0 0 .63.243.9.9 0 0 0 .629-.243"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-100" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="hidden size-5 shrink-0 text-ln-orange sm:block"
          >
            <path
              stroke="currentColor"
              strokeLinecap="square"
              strokeLinejoin="round"
              strokeMiterlimit="1.5"
              strokeWidth="1.25"
              d="M5.625 12.9V4.79a1.66 1.66 0 0 1 1.667-1.664h8.124"
            />
            <path
              stroke="currentColor"
              strokeLinecap="square"
              strokeLinejoin="round"
              strokeMiterlimit="1.5"
              strokeWidth="1.25"
              d="M12.083 16.874H4.82a1.695 1.695 0 0 1-1.694-1.693v-.807c0-.69.56-1.25 1.25-1.25h5.416c.69 0 1.25.56 1.25 1.25v.835c0 .92.746 1.665 1.666 1.665h.003c.92 0 1.665-.745 1.665-1.665V7.916"
            />
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="1.5"
              strokeWidth="1.25"
              d="M16.042 3.125c.907 0 1.666.759 1.666 1.667v1.666c0 .69-.56 1.25-1.25 1.25h-2.083V4.792a1.667 1.667 0 0 1 1.667-1.667"
              clipRule="evenodd"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-800 sm:text-ln-label-sm">
              Commercial Usage
            </span>
            <button data-state="closed">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                className="size-5 text-ln-gray-300"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M10 16.25a6.25 6.25 0 1 0 0-12.5 6.25 6.25 0 0 0 0 12.5m1.116-3.041.1-.408a2 2 0 0 1-.25.083 1.2 1.2 0 0 1-.308.048q-.29 0-.407-.095-.118-.096-.118-.359a3.5 3.5 0 0 1 .118-.672l.373-1.318q.055-.182.075-.4a4 4 0 0 0 .02-.304.87.87 0 0 0-.292-.678q-.293-.26-.833-.26-.3 0-.636.106a9 9 0 0 0-.704.256l-.1.409a4 4 0 0 1 .262-.087q.151-.045.297-.045.297 0 .4.1.105.1.105.354.001.14-.034.31a6 6 0 0 1-.084.36l-.374 1.325q-.05.21-.073.374a2.4 2.4 0 0 0-.022.325q0 .408.301.673.302.265.846.265.354 0 .621-.092c.267-.092.417-.152.717-.27M11.05 7.85a.77.77 0 0 0 .26-.587.78.78 0 0 0-.26-.59.89.89 0 0 0-.628-.244.9.9 0 0 0-.63.244.78.78 0 0 0-.264.59q0 .345.263.587a.9.9 0 0 0 .63.243.9.9 0 0 0 .629-.243"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`flex-col gap-4 px-2.5 py-7 min-[480px]:px-4 sm:gap-5 md:px-7 xl:!flex ${activeTab === 'personal' ? 'flex duration-300 animate-in fade-in-0 xl:animate-none' : 'hidden xl:flex'}`}>
        <div
          className="flex w-full flex-col items-start pb-2 max-[768px]:!h-72"
          style={{ height: 244 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="size-6 shrink-0 text-ln-orange"
          >
            <path
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="M13.126 5.416a3.125 3.125 0 1 1-6.25 0 3.125 3.125 0 0 1 6.25 0ZM10 11.041c-2.825 0-4.97 1.679-5.847 4.052-.34.922.447 1.781 1.429 1.781h8.838c.982 0 1.77-.86 1.429-1.78C14.97 12.72 12.827 11.04 10 11.04Z"
            />
          </svg>
          <div className="mt-4">
            <div className="text-ln-label-lg text-ln-gray-900">Personal</div>
            <div className="mt-1 h-10 max-w-44 text-ln-paragraph-xs text-ln-gray-600 sm:text-ln-paragraph-sm">
              Perfect for freelancers and indie developers.
            </div>
          </div>
          <div className="my-6 flex flex-col items-start">
            <div className="hidden items-center gap-2.5 xl:flex">
              <div className="text-[36px]/[40px] font-550 text-ln-gray-800">
                <div className="relative flex">
                  $
                  <div className="grid overflow-hidden">
                    <div className="flex [grid-area:1/1]">
                      <div className={`transition-transform duration-700 ${isLoaded ? 'translate-y-0' : 'translate-y-full'}`} style={{ transitionDelay: '0ms', transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)' }}>2</div>
                      <div className={`transition-transform duration-700 ${isLoaded ? 'translate-y-0' : 'translate-y-full'}`} style={{ transitionDelay: '50ms', transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)' }}>9</div>
                      <div className={`transition-transform duration-700 ${isLoaded ? 'translate-y-0' : 'translate-y-full'}`} style={{ transitionDelay: '100ms', transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)' }}>9</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-[13px]/[16px] font-medium -tracking-[0.006em] text-ln-gray-700">
                  one-time payment
                </div>
                <div className="mt-1 text-[13px]/[16px] -tracking-[0.006em] text-ln-gray-500">
                  plus local taxes
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-1 xl:hidden">
              <div className="text-[36px]/[40px] font-550 text-ln-gray-800">
                <div className="relative flex">
                  $
                  <div className="grid overflow-hidden">
                    <div className="flex [grid-area:1/1]">
                      <div className={`transition-transform duration-700 ${isLoaded ? 'translate-y-0' : 'translate-y-full'}`} style={{ transitionDelay: '0ms', transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)' }}>2</div>
                      <div className={`transition-transform duration-700 ${isLoaded ? 'translate-y-0' : 'translate-y-full'}`} style={{ transitionDelay: '50ms', transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)' }}>9</div>
                      <div className={`transition-transform duration-700 ${isLoaded ? 'translate-y-0' : 'translate-y-full'}`} style={{ transitionDelay: '100ms', transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)' }}>9</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-[13px]/[16px] font-medium -tracking-[0.006em] text-ln-gray-700">
                  one-time payment
                </div>
                <div className="mt-1 text-[13px]/[16px] -tracking-[0.006em] text-ln-gray-500">
                  plus local taxes
                </div>
              </div>
            </div>
          </div>
          <a
            href="https://alignui.lemonsqueezy.com/buy/a3537cad-193b-486d-ac49-d127af2c31fd"
            target="_blank"
            rel="noopener nofollow"
            className="flex h-9 w-full shrink-0 items-center justify-center gap-1.5 rounded-10 bg-ln-gray-50 text-ln-label-sm text-ln-gray-800"
          >
            Buy now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              className="size-5 shrink-0 text-ln-gray-500"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
                d="M14.5 12.204V6m0 0H8.296M14.5 6l-8 8"
              />
            </svg>
          </a>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-100" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="size-5 shrink-0 text-ln-orange"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="m5.625 10.886 2.625 2.656 6.125-7.083"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-800 sm:text-ln-label-sm">
              Single user license
            </span>
          </div>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-100" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="size-5 shrink-0 text-ln-orange"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="m5.625 10.886 2.625 2.656 6.125-7.083"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-800 sm:text-ln-label-sm">
              Life-time
            </span>
          </div>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-100" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="size-5 shrink-0 text-ln-orange"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="m5.625 10.886 2.625 2.656 6.125-7.083"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-800 sm:text-ln-label-sm">
              Includes all blocks
            </span>
          </div>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-100" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="size-5 shrink-0 text-ln-orange"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="m5.625 10.886 2.625 2.656 6.125-7.083"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-800 sm:text-ln-label-sm">
              Included all templates
            </span>
          </div>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-100" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="size-5 shrink-0 text-ln-orange"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="m5.625 10.886 2.625 2.656 6.125-7.083"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-800 sm:text-ln-label-sm">
              Email address
            </span>
          </div>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-100" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="size-5 shrink-0 text-ln-orange"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="m5.625 10.886 2.625 2.656 6.125-7.083"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-800 sm:text-ln-label-sm">
              24 hours
            </span>
          </div>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-100" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="size-5 shrink-0 text-ln-orange"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="m5.625 10.886 2.625 2.656 6.125-7.083"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-800 sm:text-ln-label-sm">
              Use in unlimited projects
            </span>
          </div>
        </div>
      </div>
      <div className={`relative flex-col gap-4 rounded-20 bg-ln-gray-925 px-2.5 py-7 shadow-ln-button-gray min-[480px]:px-4 sm:gap-5 md:rounded-2xl md:px-7 xl:!flex ${activeTab === 'startup' ? 'flex duration-300 animate-in fade-in-0 xl:animate-none' : 'hidden xl:flex'}`}>
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
          MOST POPULAR
        </div>
        <div
          className="flex w-full flex-col items-start pb-2 max-[768px]:!h-72"
          style={{ height: 244 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="size-6 shrink-0 text-ln-orange"
          >
            <path
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M6.861 13.25H4.935a1 1 0 0 1-.878-1.48L5.68 8.791A2 2 0 0 1 7.437 7.75h3.792m-4.368 5.5 3.889 3.889M6.861 13.25l4.368-5.5m0 0c2.593-2.828 5.402-4.675 9.021-4.96a.89.89 0 0 1 .961.96c-.286 3.62-2.133 6.428-4.961 9.02m-5.5 4.369v1.927a1 1 0 0 0 1.479.877l2.979-1.624a2 2 0 0 0 1.042-1.756V12.77m-5.5 4.368 5.5-4.368M4.806 21.25H3.75a1 1 0 0 1-1-1v-1.056a2.056 2.056 0 1 1 2.056 2.055Z"
            />
          </svg>
          <div className="mt-4">
            <div className="text-ln-label-lg text-ln-gray-0">Startups</div>
            <div className="mt-1 h-10 text-ln-paragraph-xs text-ln-gray-450 sm:text-ln-paragraph-sm">
              Ideal for small teams and growing companies.
            </div>
          </div>
          <div className="my-6 flex flex-col items-start">
            <div className="hidden items-center gap-2.5 xl:flex">
              <div className="text-[36px]/[40px] font-550 text-ln-gray-0">
                <div className="relative flex">
                  $
                  <div className="grid overflow-hidden">
                    <div className="flex [grid-area:1/1]">
                      <div className={`transition-transform duration-700 ${isLoaded ? 'translate-y-0' : 'translate-y-full'}`} style={{ transitionDelay: '150ms', transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)' }}>3</div>
                      <div className={`transition-transform duration-700 ${isLoaded ? 'translate-y-0' : 'translate-y-full'}`} style={{ transitionDelay: '200ms', transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)' }}>9</div>
                      <div className={`transition-transform duration-700 ${isLoaded ? 'translate-y-0' : 'translate-y-full'}`} style={{ transitionDelay: '250ms', transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)' }}>9</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-[13px]/[16px] font-medium -tracking-[0.006em] text-ln-gray-400">
                  one-time payment
                </div>
                <div className="mt-1 text-[13px]/[16px] -tracking-[0.006em] text-ln-gray-600">
                  plus local taxes
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-1 xl:hidden">
              <div className="text-[36px]/[40px] font-550 text-ln-gray-0">
                <div className="relative flex">
                  $
                  <div className="grid overflow-hidden">
                    <div className="flex [grid-area:1/1]">
                      <div className={`transition-transform duration-700 ${isLoaded ? 'translate-y-0' : 'translate-y-full'}`} style={{ transitionDelay: '150ms', transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)' }}>3</div>
                      <div className={`transition-transform duration-700 ${isLoaded ? 'translate-y-0' : 'translate-y-full'}`} style={{ transitionDelay: '200ms', transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)' }}>9</div>
                      <div className={`transition-transform duration-700 ${isLoaded ? 'translate-y-0' : 'translate-y-full'}`} style={{ transitionDelay: '250ms', transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)' }}>9</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-[13px]/[16px] font-medium -tracking-[0.006em] text-ln-gray-400">
                  one-time payment
                </div>
                <div className="mt-1 text-[13px]/[16px] -tracking-[0.006em] text-ln-gray-600">
                  plus local taxes
                </div>
              </div>
            </div>
          </div>
          <a
            href="https://alignui.lemonsqueezy.com/buy/15cfcce7-8c96-45f0-8217-b7eb1297fcae"
            target="_blank"
            rel="noopener nofollow"
            className="flex h-9 w-full shrink-0 items-center justify-center gap-1.5 rounded-10 bg-ln-orange text-ln-label-sm text-ln-gray-0"
            style={{
              boxShadow:
                "0 19px 8px rgba(31, 31, 31, 0.01), 0 11px 6px rgba(31, 31, 31, 0.04), 0 5px 5px rgba(31, 31, 31, 0.07), 0 1px 3px rgba(31, 31, 31, 0.08), 0 0 0 1px rgba(26, 26, 26, 0.28), inset 0 1px 2px rgba(255, 255, 255, 0.34)"
            }}
          >
            Buy now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              className="size-5 shrink-0 text-ln-gray-0"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
                d="M14.5 12.204V6m0 0H8.296M14.5 6l-8 8"
              />
            </svg>
          </a>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-800" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="size-5 shrink-0 text-ln-orange"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="m5.625 10.886 2.625 2.656 6.125-7.083"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-300 sm:text-ln-label-sm">
              5-user license
            </span>
          </div>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-800" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="size-5 shrink-0 text-ln-orange"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="m5.625 10.886 2.625 2.656 6.125-7.083"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-300 sm:text-ln-label-sm">
              Life-time
            </span>
          </div>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-800" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="size-5 shrink-0 text-ln-orange"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="m5.625 10.886 2.625 2.656 6.125-7.083"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-300 sm:text-ln-label-sm">
              Includes all blocks
            </span>
          </div>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-800" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="size-5 shrink-0 text-ln-orange"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="m5.625 10.886 2.625 2.656 6.125-7.083"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-300 sm:text-ln-label-sm">
              Included all templates
            </span>
          </div>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-800" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="size-5 shrink-0 text-ln-orange"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="m5.625 10.886 2.625 2.656 6.125-7.083"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-300 sm:text-ln-label-sm">
              Discord
            </span>
          </div>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-800" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="size-5 shrink-0 text-ln-orange"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="m5.625 10.886 2.625 2.656 6.125-7.083"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-300 sm:text-ln-label-sm">
              24 hours
            </span>
          </div>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-800" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="size-5 shrink-0 text-ln-orange"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="m5.625 10.886 2.625 2.656 6.125-7.083"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-300 sm:text-ln-label-sm">
              Use in unlimited projects
            </span>
          </div>
        </div>
      </div>
      <div className={`flex-col gap-4 px-2.5 py-7 min-[480px]:px-4 sm:gap-5 md:px-7 xl:!flex ${activeTab === 'enterprise' ? 'flex duration-300 animate-in fade-in-0 xl:animate-none' : 'hidden xl:flex'}`}>
        <div
          className="flex w-full flex-col items-start pb-2 max-[768px]:!h-72"
          style={{ height: 244 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="size-6 shrink-0 text-ln-orange"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M3.75 19.25h10.5m-10.5 0V5.75a2 2 0 0 1 2-2h6.5a2 2 0 0 1 2 2V8M3.75 19.25h-2m12.5 0V8m0 11.25h6M14.25 8h4a2 2 0 0 1 2 2v9.25m0 0h2m-12-10.5h-2.5m0 4h2.5"
            />
          </svg>
          <div className="mt-4">
            <div className="text-ln-label-lg text-ln-gray-900">Enterprise</div>
            <div className="mt-1 h-10 max-w-44 text-ln-paragraph-xs text-ln-gray-600 sm:text-ln-paragraph-sm">
              Best for enterprises with unique challenges.
            </div>
          </div>
          <a
            className="mt-auto flex h-9 w-full shrink-0 items-center justify-center gap-1.5 rounded-10 bg-ln-gray-0 text-ln-label-sm text-ln-gray-800 ring-1 ring-inset ring-ln-gray-100"
            href="https://alignui.com/contact"
          >
            Contact us
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 21 20"
              className="size-5 shrink-0 text-ln-gray-500"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
                d="M14.873 11.875h1.669c.92 0 1.666-.746 1.666-1.667V4.792c0-.92-.746-1.667-1.666-1.667H8c-.92 0-1.667.746-1.667 1.667v1.666m6.875 0h-8.75c-.92 0-1.666.747-1.666 1.667v5.417c0 .92.746 1.666 1.666 1.666H5.5v2.084l3.75-2.084h3.958c.92 0 1.667-.746 1.667-1.666V8.125c0-.92-.746-1.667-1.667-1.667"
              />
            </svg>
          </a>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-100" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="size-5 shrink-0 text-ln-orange"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="m5.625 10.886 2.625 2.656 6.125-7.083"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-800 sm:text-ln-label-sm">
              Custom user license
            </span>
          </div>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-100" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="size-5 shrink-0 text-ln-orange"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="m5.625 10.886 2.625 2.656 6.125-7.083"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-800 sm:text-ln-label-sm">
              Life-time
            </span>
          </div>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-100" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="size-5 shrink-0 text-ln-orange"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="m5.625 10.886 2.625 2.656 6.125-7.083"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-800 sm:text-ln-label-sm">
              Includes all blocks
            </span>
          </div>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-100" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="size-5 shrink-0 text-ln-orange"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="m5.625 10.886 2.625 2.656 6.125-7.083"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-800 sm:text-ln-label-sm">
              Included all templates
            </span>
          </div>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-100" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="size-5 shrink-0 text-ln-orange"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="m5.625 10.886 2.625 2.656 6.125-7.083"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-800 sm:text-ln-label-sm">
              Private Slack channel
            </span>
          </div>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-100" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="size-5 shrink-0 text-ln-orange"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="m5.625 10.886 2.625 2.656 6.125-7.083"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-800 sm:text-ln-label-sm">
              12 hours
            </span>
          </div>
        </div>
        <div className="relative h-0 w-full">
          <div className="absolute left-0 top-0 h-px w-full bg-ln-gray-100" />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="size-5 shrink-0 text-ln-orange"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="m5.625 10.886 2.625 2.656 6.125-7.083"
            />
          </svg>
          <div className="flex items-center gap-0.5">
            <span className="text-ln-label-xs text-ln-gray-800 sm:text-ln-label-sm">
              Use in unlimited projects
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-2.5 px-2 py-5 sm:gap-4 sm:py-6 xl:px-3.5">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ln-orange/[.08] text-ln-orange sm:size-11">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="size-5 sm:size-6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            d="M12 14v-3.5m-2.706 7.984 2.065 1.73a1 1 0 0 0 1.28.004l2.099-1.738a1 1 0 0 1 .638-.23h2.874a2 2 0 0 0 2-2V5.75a2 2 0 0 0-2-2H5.75a2 2 0 0 0-2 2v10.5a2 2 0 0 0 2 2h2.902a1 1 0 0 1 .642.234Z"
          />
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth={2}
            d="M12 8h.01"
          />
        </svg>
      </div>
      <div>
        <div className="text-ln-label-sm text-ln-gray-800 sm:text-ln-label-md">
          We value PPP and offer discounts.
        </div>
        <p className="mt-1 text-ln-paragraph-xs text-ln-gray-600 sm:text-ln-paragraph-sm">
          Verify your eligibility with a student ID, license, or similar proof
          by contacting us at{/* */}{" "}
          <a
            href="mailto:hi@alignui.com"
            className="font-medium text-ln-orange"
          >
            hi@alignui.com
          </a>
        </p>
      </div>
    </div>
    
  </div>



         
         </div>

<div className="relative flex flex-col justify-center gap-6 md:flex-row md:py-7 xl:gap-8 before:absolute before:left-0 before:top-0 before:hidden before:h-px before:w-full before:bg-ln-gray-200 md:before:block after:absolute after:bottom-0 after:left-0 after:hidden after:h-px after:w-full after:bg-ln-gray-200 md:after:block mb-16 mt-10 md:mb-24 md:mt-20">
  <img
    src="https://alignui.com/images/landing/dot.png"
    width={9}
    height={9}
    alt=""
    className="absolute z-30 min-h-[9px] min-w-[9px] -top-1 -left-px hidden md:block"
  />
  <img
    src="https://alignui.com/images/landing/dot.png"
    width={9}
    height={9}
    alt=""
    className="absolute z-30 min-h-[9px] min-w-[9px] -right-px -top-1 hidden md:block"
  />
  <img
    src="https://alignui.com/images/landing/dot.png"
    width={9}
    height={9}
    alt=""
    className="absolute z-30 min-h-[9px] min-w-[9px] -bottom-1 -left-px hidden md:block"
  />
  <img
    src="https://alignui.com/images/landing/dot.png"
    width={9}
    height={9}
    alt=""
    className="absolute z-30 min-h-[9px] min-w-[9px] -bottom-1 -right-px hidden md:block"
  />
  <div className="flex flex-1 items-start gap-4 md:flex-col md:items-center md:gap-0 md:text-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="size-6 shrink-0 text-template-ai"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M10 10 5.5 5.5m6.5-.25v-2.5A9.25 9.25 0 1 1 3.657 8m11.093 4a2.75 2.75 0 1 1-5.5 0 2.75 2.75 0 0 1 5.5 0"
      />
    </svg>
    <div className="md:mt-4">
      <div className="text-ln-label-md text-ln-gray-800">
        All-Inclusive Access
      </div>
      <div className="mt-1 text-ln-paragraph-sm text-ln-gray-600 md:max-w-64">
        Buy an all-access license to get all components, templates, and updates.
      </div>
    </div>
  </div>
  <div className="hidden w-px bg-ln-gray-200 md:block" />
  <div
    className="h-px w-full text-ln-gray-300 md:hidden"
    style={{
      background:
        "linear-gradient(90deg, currentColor 4px, transparent 4px) 50% 50% / 8px 1px repeat no-repeat"
    }}
  />
  <div className="flex flex-1 items-start gap-4 md:flex-col md:items-center md:gap-0 md:text-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="size-6 shrink-0 text-template-crypto"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15 8a3 3 0 0 1-6 0m10.766 4.254-.402-6.625a2 2 0 0 0-1.996-1.879H6.633a2 2 0 0 0-1.997 1.879l-.757 12.5a2 2 0 0 0 1.996 2.121h6.378M18 21.278c.271 0 3.25-1.535 3.25-3.611 0-1.445-.903-2.167-1.805-2.167-.903 0-1.445.542-1.445.542s-.541-.542-1.444-.542-1.806.722-1.806 2.167c0 2.076 2.98 3.61 3.25 3.61Z"
      />
    </svg>
    <div className="md:mt-4">
      <div className="text-ln-label-md text-ln-gray-800">One-Time Payment</div>
      <div className="mt-1 text-ln-paragraph-sm text-ln-gray-600 md:max-w-64">
        No subscriptions or extra fees. Pay once, get updates forever.
      </div>
    </div>
  </div>
  <div className="hidden w-px bg-ln-gray-200 md:block" />
  <div
    className="h-px w-full text-ln-gray-300 md:hidden"
    style={{
      background:
        "linear-gradient(90deg, currentColor 4px, transparent 4px) 50% 50% / 8px 1px repeat no-repeat"
    }}
  />
  <div className="flex flex-1 items-start gap-4 md:flex-col md:items-center md:gap-0 md:text-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 25 24"
      className="size-6 shrink-0 text-template-finance"
    >
      <path
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="1.5"
        d="m12.336 12 3.295 3.359a4.6 4.6 0 0 0 6.59 0c1.82-1.855 1.82-4.863 0-6.718a4.6 4.6 0 0 0-6.59 0zm0 0L9.04 8.641a4.6 4.6 0 0 0-6.59 0c-1.82 1.855-1.82 4.863 0 6.718a4.6 4.6 0 0 0 6.59 0z"
      />
    </svg>
    <div className="md:mt-4">
      <div className="text-ln-label-md text-ln-gray-800">Forever Access</div>
      <div className="mt-1 text-ln-paragraph-sm text-ln-gray-600 md:max-w-64">
        One payment gives you lifetime access to all premium AlignUI resources.
      </div>
    </div>
  </div>
  <div
    className="h-px w-full text-ln-gray-300 md:hidden"
    style={{
      background:
        "linear-gradient(90deg, currentColor 4px, transparent 4px) 50% 50% / 8px 1px repeat no-repeat"
    }}
  />
</div>

          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-center text-[28px]/[34px] font-550 -tracking-[0.02em] text-ln-gray-900 mb-8">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  question: "Bu gerçekten tek seferlik bir ödeme mi?",
                  answer: "Evet. Bir kez ödeyip sonsuza kadar kullanıyorsunuz — yıllık abonelik yok, gizli ücret yok. Planınız kapsamındaki tüm güncellemeler de ömür boyu ücretsiz."
                },
                {
                  question: "Planlar arasındaki fark nedir?",
                  answer: "Personal plan bireysel projeler için; Startup plan büyüyen ekipler ve ticari projeler için; Enterprise plan ise çok sayıda proje ve kurumsal ihtiyaçlar için tasarlanmıştır. Her planın sağ tarafındaki özellik listesinden detaylı karşılaştırmayı görebilirsiniz."
                },
                {
                  question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
                  answer: "Visa, Mastercard ve American Express başta olmak üzere tüm büyük kredi/banka kartlarını kabul ediyoruz. Ödemeler Stripe altyapısıyla güvenli şekilde işleniyor."
                },
                {
                  question: "Satın aldıktan sonra gelecek güncellemeler ücretli mi?",
                  answer: "Hayır. Sahip olduğunuz plan için yayınlanan tüm güncellemeler ve yeni özellikler ek ücret olmaksızın hesabınıza eklenir."
                },
                {
                  question: "Kaç projede kullanabilirim?",
                  answer: "Personal planda tek proje, Startup ve Enterprise planlarda sınırsız proje kullanımı mevcuttur. Proje limitleri satın alma ekranında her plan için açıkça belirtilmiştir."
                },
                {
                  question: "İade politikanız nedir?",
                  answer: "Satın alma tarihinden itibaren 14 gün içinde herhangi bir neden göstermeksizin tam iade talep edebilirsiniz. İade için info@moyduz.com adresine mail göndermeniz yeterlidir."
                },
              ].map((faq, idx) => (
                <details
                  key={idx}
                  className="rounded-xl border border-ln-gray-200 dark:border-ln-gray-800 bg-ln-gray-0 dark:bg-ln-gray-900 p-4"
                >
                  <summary className="cursor-pointer font-medium text-ln-gray-900 dark:text-ln-gray-0">
                    {faq.question}
                  </summary>
                  <p className="mt-2 text-sm text-ln-gray-600 dark:text-ln-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>

        <div className="mx-auto flex h-8 w-full max-w-[596px] items-center gap-6 px-4 my-12 md:my-24">
  <div className="relative h-px w-full flex-1 bg-ln-gray-200">
    <img
      src="https://alignui.com/images/landing/dot-gray-25.png"
      width={9}
      height={9}
      alt=""
      className="absolute z-30 min-h-[9px] min-w-[9px] left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
    />
    <img
      src="https://alignui.com/images/landing/dot-gray-25.png"
      width={9}
      height={9}
      alt=""
      className="absolute z-30 min-h-[9px] min-w-[9px] right-0 top-1/2 -translate-y-1/2 translate-x-1/2"
    />
  </div>
  <img
    src="https://alignui.com/images/landing/section-separator-icon.png"
    alt=""
    width={34}
    height={26}
    className="shrink-0 object-contain"
  />
  <div className="relative h-px w-full flex-1 bg-ln-gray-200">
    <img
      src="https://alignui.com/images/landing/dot-gray-25.png"
      width={9}
      height={9}
      alt=""
      className="absolute z-30 min-h-[9px] min-w-[9px] left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
    />
    <img
      src="https://alignui.com/images/landing/dot-gray-25.png"
      width={9}
      height={9}
      alt=""
      className="absolute z-30 min-h-[9px] min-w-[9px] right-0 top-1/2 -translate-y-1/2 translate-x-1/2"
    />
  </div>
</div>

        
        
          <div className="container pt-10 bleed-ln-gray-200 bleed-border-t md:pt-14 xl:pt-[70px] xl:bleed-none">
            <div className="flex flex-col items-start md:items-center">
    <div className="flex h-7 items-center gap-1.5 rounded-[9px] bg-ln-gray-0 pl-1.5 pr-2.5 text-ln-label-sm text-ln-gray-700 shadow-ln-subheading xl:h-8 xl:pl-2 xl:pr-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 19 18"
        className="size-[18px] text-ln-gray-400"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.125"
          d="m9.5 4.735-5.111-1.14A1.5 1.5 0 0 0 2.562 5.06v7.755a1.5 1.5 0 0 0 1.174 1.464L9.5 15.563m0-10.828 5.111-1.14a1.5 1.5 0 0 1 1.826 1.464v7.755a1.5 1.5 0 0 1-1.173 1.464L9.5 15.563m0-10.828v10.828"
        />
      </svg>
      Stay Informed
    </div>
    <h4 className="mt-4 text-[28px]/[36px] font-550 -tracking-[0.02em] text-ln-gray-900 md:text-center md:text-ln-title-h4 xl:text-[32px]/[40px] xl:-tracking-[0.028em]">
      Subscribe to our newsletter
    </h4>
    <p className="mt-2 text-ln-paragraph-md text-ln-gray-600 md:text-center xl:text-ln-paragraph-lg">
      Get the{/* */}{" "}
      <span className="font-medium text-ln-gray-800">latest updates</span>,
      {/* */} <span className="font-medium text-ln-gray-800">tips</span>, and
      {/* */} <span className="font-medium text-ln-gray-800">exclusive</span>{" "}
      offers from AlignUI.
    </p>
    <form className="mt-5 flex w-full flex-col gap-2 md:w-auto xl:mt-8 xl:gap-3">
      <div className="group relative flex h-12 w-full items-center gap-2 rounded-[13px] bg-ln-gray-25 px-3 shadow-[0_4px_8px_-1.5px_rgba(51,51,51,.06)] ring-1 transition md:w-[416px] ring-ln-gray-200 focus-within:ring-[1.5px] focus-within:ring-ln-orange">
        <div
          className="flex flex-1 items-center gap-2 xl:gap-3"
          style={{ opacity: 1, filter: "blur(0)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="size-6 shrink-0 text-ln-gray-400 transition group-focus-within:text-ln-gray-500"
          >
            <path
              fill="currentColor"
              d="M21.588 8.67a.75.75 0 1 0-.675-1.34zm-18.5-1.34a.75.75 0 1 0-.675 1.34zM20.5 6.75v10.5H22V6.75zM19.25 18.5H4.75V20h14.5zM3.5 17.25V6.75H2v10.5zM4.75 5.5h14.5V4H4.75zm16.163 1.83-8.35 4.207.675 1.34 8.35-4.207zm-9.475 4.207L3.088 7.33l-.675 1.34 8.35 4.207zM3.5 6.75c0-.69.56-1.25 1.25-1.25V4A2.75 2.75 0 0 0 2 6.75zM4.75 18.5c-.69 0-1.25-.56-1.25-1.25H2A2.75 2.75 0 0 0 4.75 20zm15.75-1.25c0 .69-.56 1.25-1.25 1.25V20A2.75 2.75 0 0 0 22 17.25zm-7.937-5.713a1.25 1.25 0 0 1-1.125 0l-.675 1.34a2.75 2.75 0 0 0 2.475 0zM22 6.75A2.75 2.75 0 0 0 19.25 4v1.5c.69 0 1.25.56 1.25 1.25z"
            />
          </svg>
          <input
            type="email"
            required
            className="w-full bg-transparent bg-none text-ln-label-md text-ln-gray-925 caret-ln-orange placeholder:text-ln-paragraph-md placeholder:text-ln-gray-500 focus:outline-none"
            placeholder="Enter your email..."
            defaultValue=""
          />
          <button
            type="submit"
            aria-label="Submit form"
            className="relative isolate flex h-5 w-8 shrink-0 items-center justify-center rounded-[5px] transition before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:opacity-0 before:shadow-ln-button-orange before:transition bg-ln-gray-0 text-[#bbb] shadow-ln-button-white"
            disabled
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 12 12"
              className="size-3"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
                d="m4.552 9 2.47-2.47a.75.75 0 0 0 0-1.06L4.551 3"
              />
            </svg>
          </button>
        </div>
      </div>
      <p className="text-ln-paragraph-sm text-ln-gray-450 md:text-center">
        We respect your privacy
      </p>
    </form>
    <div className="mt-5 flex flex-wrap gap-4 md:justify-center xl:mt-8 xl:gap-7">
      <div className="flex items-center gap-2 text-ln-label-sm text-ln-gray-600 xl:text-ln-paragraph-sm xl:text-ln-gray-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 19 18"
          className="size-[18px] text-template-ai"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.24"
            d="M11.75 7.125 8.375 11.25l-1.5-1.5M16.438 9A6.937 6.937 0 1 1 2.563 9a6.937 6.937 0 0 1 13.874 0Z"
          />
        </svg>
        Weekly updates
      </div>
      <div className="flex items-center gap-2 text-ln-label-sm text-ln-gray-600 xl:text-ln-paragraph-sm xl:text-ln-gray-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 19 18"
          className="size-[18px] text-template-ai"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.24"
            d="M11.75 7.125 8.375 11.25l-1.5-1.5M16.438 9A6.937 6.937 0 1 1 2.563 9a6.937 6.937 0 0 1 13.874 0Z"
          />
        </svg>
        Exclusive content
      </div>
      <div className="flex items-center gap-2 text-ln-label-sm text-ln-gray-600 xl:text-ln-paragraph-sm xl:text-ln-gray-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 19 18"
          className="size-[18px] text-template-ai"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.24"
            d="M11.75 7.125 8.375 11.25l-1.5-1.5M16.438 9A6.937 6.937 0 1 1 2.563 9a6.937 6.937 0 0 1 13.874 0Z"
          />
        </svg>
        Early access for features
      </div>
    </div>
    </div>
  </div>

  

      {/* Footer */}
   
    </div>
    </>
  );
}