'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Layers,
  Circle,
  Aperture,
  Sparkles,
  Bolt,
  Boxes,
} from 'lucide-react';

const logos = [
  { label: 'Wealthro', icon: ShieldCheck },
  { label: 'Finyon', icon: Layers },
  { label: 'Aegra', icon: Circle },
  { label: 'Portivio', icon: Aperture },
  { label: 'Vaultic', icon: Sparkles },
  { label: 'Altoris', icon: Bolt },
  { label: 'Quantora', icon: Boxes },
  { label: 'Fundara', icon: Layers },
];

export default function Intro() {
  const [introSeen, setIntroSeen] = useState(false);

  return (
    <section
      id='intro'
      className='container relative z-[1] mx-auto flex w-full flex-col items-center overflow-hidden'
      style={{ height: 'min-content' }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 809.98px) {
              .intro-section {  padding: 32px 20px; }
            }
          `,
        }}
      />
      <div
        className='flex flex-col items-center gap-[50px] px-4 py-8 md:gap-[120px] md:px-[100px] md:py-12'
        style={{ height: 'min-content' }}
      >
        {/* Nasıl Çalışır? anchor + Moyduz Nedir (GEO/SEO) */}
        <motion.section
          id="nasil-calisir"
          className='flex w-full flex-col items-center gap-6 scroll-mt-24'
          initial={{ y: 15 }}
          animate={introSeen ? { y: 0 } : undefined}
          whileInView={introSeen ? undefined : { y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          onViewportEnter={() => setIntroSeen(true)}
          transition={{ type: 'spring', duration: 0.6, bounce: 0.05 }}
          itemScope
          itemType="https://schema.org/ProfessionalService"
        >
          <style dangerouslySetInnerHTML={{ __html: `#nasil-calisir a { text-decoration: none !important; }` }} />
          <div className="prose prose-invert prose-lg max-w-none text-center [&_a]:no-underline [&_a]:text-ln-orange [&_a]:hover:opacity-90">
            <h2 className="text-foreground text-center text-[20px] md:text-xl font-medium mb-4" itemProp="name">
              Moyduz Nedir? Ne İşe Yarar?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base text-center leading-relaxed mb-6 max-w-2xl mx-auto" itemProp="description">
              <strong>Moyduz</strong>, Türkiye&apos;nin en çok tercih edilen{' '}
              <Link href="/ozel-e-ticaret" className="text-ln-orange hover:opacity-90 no-underline">e-ticaret</Link>
              {' '}ve{' '}
              <Link href="/services" className="text-ln-orange hover:opacity-90 no-underline">yazılım geliştirme</Link>
              {' '}şirketlerinden biridir. Özel e-ticaret altyapıları, kurumsal web siteleri, SaaS ürünleri ve dijital pazarlama çözümleri sunar; büyüyen işletmeler ve markalar için tek noktadan hizmet sağlar.
            </p>
            <div className="text-left max-w-2xl mx-auto space-y-4">
              <div>
                <h3 className="text-foreground text-base font-semibold mb-2">Moyduz Kimler İçin?</h3>
                <ul className="text-muted-foreground text-sm space-y-1 list-disc list-inside" itemProp="audience">
                  <li>E-ticaret yapmak veya mevcut mağazasını büyütmek isteyen işletmeler</li>
                  <li>Kurumsal web sitesi ve marka deneyimi arayan şirketler</li>
                  <li>SaaS veya abonelik tabanlı ürün geliştiren girişimler</li>
                  <li>Operasyonlarını otomasyon ve yazılımla güçlendirmek isteyen ekipler</li>
                  <li>Türkiye ve uluslararası pazarlara ölçeklenmek isteyen markalar</li>
                </ul>
                <p className="text-muted-foreground text-sm mt-2">
                  <Link href="/services" className="text-ln-orange hover:opacity-90 no-underline">Tüm hizmetleri inceleyin →</Link>
                </p>
              </div>
              <div itemProp="hasOfferCatalog" itemScope itemType="https://schema.org/OfferCatalog">
                <h3 className="text-foreground text-base font-semibold mb-2">Moyduz Hangi Hizmetleri Sunar?</h3>
                <ul className="text-muted-foreground text-sm space-y-1 list-disc list-inside">
                  <li itemProp="itemListElement">Özel e-ticaret altyapısı ve mağaza kurulumu</li>
                  <li itemProp="itemListElement">Web tasarım ve geliştirme (Next.js, React, TypeScript)</li>
                  <li itemProp="itemListElement">B2B e-ticaret ve çok satıcılı pazar yeri (multi-vendor)</li>
                  <li itemProp="itemListElement">SaaS ürün geliştirme, MVP&apos;den canlıya</li>
                  <li itemProp="itemListElement">Mevcut site geçişi ve performans optimizasyonu</li>
                  <li itemProp="itemListElement">Teknik SEO, Core Web Vitals ve GEO (AI aramaları) optimizasyonu</li>
                  <li itemProp="itemListElement">API entegrasyonları ve üçüncü taraf bağlantıları</li>
                </ul>
                <p className="text-muted-foreground text-sm mt-2">
                  <Link href="/services" className="text-ln-orange hover:opacity-90 no-underline">Hizmetler sayfası →</Link>
                </p>
              </div>
              <div>
                <h3 className="text-foreground text-base font-semibold mb-2">Neden Moyduz?</h3>
                <p className="text-muted-foreground text-sm">
                  Türkiye&apos;de en hızlı büyüyen dijital markaların tercihi. Komisyonsuz altyapı,{' '}
                  <Link href="/pricing" className="text-ln-orange hover:opacity-90 no-underline">şeffaf fiyatlandırma</Link>
                  {' '}ve tam kod sahipliği sunuyoruz; modern teknoloji ile ölçeklenebilir yazılım üretiyoruz. Küresel markalar, ölçeklenebilir web siteleri, SaaS platformları ve otomasyon sistemleri kurmak için Moyduz&apos;a güveniyor.{' '}
                  <Link href="/contact" className="text-ln-orange hover:opacity-90 no-underline font-medium">Ücretsiz teklif alın →</Link>
                </p>
              </div>
            </div>
          </div>
          <h2 className='text-foreground md:text-xl text-center text-[20px] font-medium mt-10'>
            Hızla Büyüyen Dijital Markaların Tercihi{' '}
          </h2>
          <p className='text-muted-foreground md:text-lg m-2 w-full px-6 text-center text-[14px] leading-[1.5] md:max-w-[700px] md:px-0 md:leading-relaxed'>
            Küresel markalar, pazarlarda başarılı olan ölçeklenebilir web siteleri, SaaS
            platformları ve otomasyon sistemleri kurmak için Moyduz&apos;a güveniyor.
          </p>
          {/* Logos Marquee */}
          <div
            className='flex w-full items-center justify-center'
            style={{
              overflow: 'visible',
              maskImage:
                'linear-gradient(to right, rgba(0,0,0,0) 0%, rgb(0,0,0) 17.5%, rgb(0,0,0) 82.5%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, rgba(0,0,0,0) 0%, rgb(0,0,0) 17.5%, rgb(0,0,0) 82.5%, rgba(0,0,0,0) 100%)',
            }}
          >
            {/* Outer container (like framer-ptb27k-container) */}
            <div
              className='logos-container'
              style={{
                flex: 'none',
                width: '100%',
                maxWidth: '1000px',
                height: '33px',
                position: 'relative',
              }}
            >
              {/* Masked viewport fills container */}
              <div
                className='logos-viewport absolute inset-0'
                style={{
                  overflow: 'hidden',
                }}
              >
                <motion.ul
                  className='logos-list relative flex h-full max-h-full w-full max-w-full list-none flex-row items-center gap-[60px]'
                  initial={{ x: 0 }}
                  animate={{ x: [0, '-50%', 0] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  aria-label='Company logos'
                  style={{ willChange: 'transform' }}
                >
                  {[...logos, ...logos].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <li
                        key={`${item.label}-${i}`}
                        className='text-foreground flex-shrink-0'
                      >
                        <div className='logo-item flex items-center gap-2 md:gap-3'>
                          <div className='text-foreground grid h-9 w-9 place-items-center md:h-11 md:w-11'>
                            <Icon
                              className='text-foreground'
                              size={24}
                              strokeWidth={1.6}
                            />
                          </div>
                          <p className='text-foreground text-sm md:text-base font-medium'>
                            {item.label}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </motion.ul>
                <style
                  dangerouslySetInnerHTML={{
                    __html: `
                    @media (max-width: 809.98px) {
                      .logos-list { gap: 30px !important; }
                        .logos-list { justify-content: center !important; }
                        .logo-item { align-items: center !important; }
                        .logo-item p { text-align: center !important; color: var(--foreground) !important; font-weight: 600 !important; }
                        .logos-viewport { overflow: hidden !important; }
                        .logos-viewport { -webkit-mask-image: none !important; mask-image: none !important; }
                    }
                  `,
                  }}
                />
              </div>
            </div>
          </div>
        </motion.section>
        {/* Main */}
        <div className='mx-auto grid w-full max-w-[1000px] grid-cols-1 items-center gap-6 px-0 md:grid-cols-[260px_minmax(0,1fr)] md:gap-8'>
          {/* Feature Visual */}
          {/* <motion.div
            className="flex flex-col items-center justify-center h-[188px] md:h-[288px]"
            initial={{ y: 15 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              type: "spring",
              duration: 0.6,
              bounce: 0.05,
              delay: 0.05,
            }}
          >
            <div
              className="flex items-center justify-between w-[242px] rounded-[22px]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(46,46,46,0.4) 12%, rgba(209,63,0,0.7) 51%, rgba(46,46,46,0.4) 91%)",
                position: "relative",
                padding: "8px 12px",
                overflow: "visible",
              }}
            >
              <motion.div
                className="rounded-full"
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: "#ffffff",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  zIndex: 0,
                  willChange: "transform",
                }}
                aria-hidden
                initial={{
                  x: -90,
                  y: -8,
                  boxShadow: "0 0 16px 1px rgba(255,77,0,0.8)",
                }}
                animate={{
                  x: 90,
                  y: [-8, -10, -8, -6, -8],
                  boxShadow: [
                    "0 0 12px 0px rgba(255,77,0,0.6)",
                    "0 0 20px 1px rgba(255,77,0,0.9)",
                    "0 0 12px 0px rgba(255,77,0,0.6)",
                    "0 0 18px 1px rgba(255,77,0,0.85)",
                    "0 0 16px 1px rgba(255,77,0,0.8)",
                  ],
                }}
                transition={{
                  x: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "linear",
                  },
                  y: {
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  },
                  boxShadow: {
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  },
                }}
              />
              <motion.div
                className="rounded-full"
                style={{
                  width: 28,
                  height: 28,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background:
                    "radial-gradient(closest-side, rgba(255,77,0,0.6), rgba(255,77,0,0))",
                  filter: "blur(8px)",
                  zIndex: -1,
                  willChange: "transform, opacity",
                }}
                aria-hidden
                initial={{ x: -90, y: -8, opacity: 0.9 }}
                animate={{
                  x: 90,
                  y: [-8, -10, -8, -6, -8],
                  opacity: [0.85, 1, 0.9, 1, 0.85],
                }}
                transition={{
                  x: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "linear",
                  },
                  y: {
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  },
                  opacity: {
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  },
                }}
              />
              <div className="h-11 w-11 grid place-items-center text-white relative z-[1]">
                <Aperture size={28} />
              </div>
              <div className="h-11 w-11 grid place-items-center text-white relative z-[1]">
                <Sparkles size={28} />
              </div>
            </div>
            <div
              className="absolute pointer-events-none"
              style={{ opacity: 0.58 }}
              aria-hidden
            />
          </motion.div> */}

          {/* Heading & Button */}
          {/* <motion.div
            className="flex flex-col items-center md:items-start gap-5 md:gap-6"
            initial={{ y: 15 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              type: "spring",
              duration: 0.6,
              bounce: 0.05,
              delay: 0.1,
            }}
          >
            <div className="flex flex-col items-center md:items-start gap-6 w-full max-w-[320px] md:max-w-[700px] px-0 mx-0">
              <h2 className="text-white text-[28px] md:text-[38px] lg:text-[42px] leading-[1.15] md:leading-[1.1] tracking-[-0.02em] font-semibold text-center md:text-left break-words">
                A Full-Service Software Company for Modern Businesses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div>
                  <h3 className="text-white text-lg md:text-xl font-semibold mb-2">
                    Custom Web Design & Development
                  </h3>
                  <p className="text-white/70 text-[15px] md:text-base leading-relaxed">
                    We design and develop modern, high-performing websites
                    focused on speed, usability, and conversion, tailored to
                    your brand, goals, and long-term growth strategy.
                  </p>
                </div>
                <div>
                  <h3 className="text-white text-lg md:text-xl font-semibold mb-2">
                    Scalable E-Commerce Platforms
                  </h3>
                  <p className="text-white/70 text-[15px] md:text-base leading-relaxed">
                    We build scalable e-commerce platforms optimized for
                    performance, growth, and global sales, using modern
                    technologies and flexible architectures that scale with your
                    business.
                  </p>
                </div>
                <div>
                  <h3 className="text-white text-lg md:text-xl font-semibold mb-2">
                    SaaS Product Development
                  </h3>
                  <p className="text-white/70 text-[15px] md:text-base leading-relaxed">
                    From MVP to production, we develop custom SaaS products with
                    secure architecture, intuitive UX, and scalable
                    infrastructure built for long-term success.
                  </p>
                </div>
                <div>
                  <h3 className="text-white text-lg md:text-xl font-semibold mb-2">
                    AI-Powered Automation Solutions
                  </h3>
                  <p className="text-white/70 text-[15px] md:text-base leading-relaxed">
                    We create AI-powered automation tools that streamline
                    workflows, reduce manual work, and help teams operate
                    faster, smarter, and more efficiently.
                  </p>
                </div>
              </div>
            </div>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
}
