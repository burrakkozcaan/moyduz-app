'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Map as MapIcon,
  MessageCircle,
  Signature,
  Activity,
  X,
  Apple,
  CornerDownLeft,
  Shield,
} from 'lucide-react';
import DottedMap from 'dotted-map';
import Bucket from '@/components/Bucket';
import OnboardCard from '@/components/forgeui/onboard-card';
import { Logo } from '@/components/logo';

/* ─── 1. Güvenli Teslimat Card ───────────────────────────────────────────────── */
function SecureDeliveryCard() {
  return (
    <motion.div
      className="bg-gradient-to-br from-ln-gray-50 to-ln-gray-50 rounded-3xl relative overflow-hidden border border-ln-gray-100 dark:border-ln-gray-800"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4 }}
    >
      {/* visual: grid layout (5 cols, center card prominent) */}
      <div className="h-60 relative flex items-center justify-center overflow-hidden select-none px-4 py-6">
        <div className="grid w-full max-w-md grid-cols-5 items-center gap-2">
          {/* sol boşluk */}
          <div className="grid grid-rows-[1fr_auto_1fr] gap-2">
            <div className="rounded-xl ring-1 ring-ln-gray-200/60 bg-ln-gray-50/50 dark:ring-ln-gray-700/60 dark:bg-ln-gray-800/30" />
            <motion.div
              className="h-28 rounded-xl ring-1 ring-ln-gray-200/60 bg-transparent dark:ring-ln-gray-700/60"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.35 }}
            />
            <div className="rounded-xl ring-1 ring-ln-gray-200/60 bg-ln-gray-50/50 dark:ring-ln-gray-700/60 dark:bg-ln-gray-800/30" />
          </div>

          {/* orta: ana kart */}
          <div className="col-span-3 grid grid-rows-[1fr_auto_1fr] gap-2">
            <div className="rounded-b-xl rounded-t-lg ring-1 ring-ln-gray-200/80 bg-transparent/60 p-3 dark:ring-ln-gray-700/80" />
            <div className="relative">
              <div className="absolute inset-2 bg-gradient-to-r from-emerald-500/20 via-ln-gray-100 to-indigo-500/20 dark:from-emerald-500/10 dark:via-ln-gray-800/50 dark:to-indigo-500/10 rounded-xl opacity-60 blur-sm pointer-events-none" />
              <motion.div
                className="relative rounded-xl ring-1 ring-ln-gray-200/80 bg-transparent dark:ring-ln-gray-700/80 shadow-lg aspect-video p-4 flex flex-col justify-between"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div className="flex items-start justify-between gap-2">
                  <motion.span
                    className="rounded-md border border-emerald-600/30 bg-emerald-500 px-1.5 py-0.5 text-[10px] font-medium text-white shadow-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    SSL
                  </motion.span>
                  <span className="text-[10px] text-ln-gray-400 font-medium">Aktif</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-ln-gray-900 dark:text-ln-gray-0">Güvenli bağlantı</p>
                  <p className="text-xs text-ln-gray-500 dark:text-ln-gray-400 mt-0.5">Sertifika geçerli · HTTPS</p>
                </div>
                <div className="flex -space-x-1.5">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="size-6 rounded-full border-2 border-white dark:border-ln-gray-900 bg-ln-gray-200 dark:bg-ln-gray-700"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.06, duration: 0.25 }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="rounded-t-xl rounded-b-lg ring-1 ring-ln-gray-200/80 bg-transparent/60 p-3 dark:ring-ln-gray-700/80" />
          </div>

          {/* sağ boşluk */}
          <div className="grid grid-rows-[1fr_auto_1fr] gap-2">
            <div className="rounded-xl ring-1 ring-ln-gray-200/60 bg-ln-gray-50/50 dark:ring-ln-gray-700/60 dark:bg-ln-gray-800/30" />
            <motion.div
              className="h-28 rounded-xl ring-1 ring-ln-gray-200/60 bg-transparent dark:ring-ln-gray-700/60"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.35 }}
            />
            <div className="rounded-xl ring-1 ring-ln-gray-200/60 bg-ln-gray-50/50 dark:ring-ln-gray-700/60 dark:bg-ln-gray-800/30" />
          </div>
        </div>
      </div>

      {/* text */}
      <div className="pb-12 text-center px-10">
        <p className="text-sm font-semibold text-ln-gray-900 dark:text-ln-gray-0">Güvenli Teslimat</p>
        <div className="max-w-[272px] mx-auto h-px my-5 bg-ln-gray-200 dark:bg-ln-gray-700" />
        <p className="text-sm text-ln-gray-500 dark:text-ln-gray-400 leading-relaxed">
          Teslimat sürecimiz rehberli; SSL ve güvenlik kurulumunu biz hallederiz. Güvenli barındırma ve süre bildirimleriyle gönül rahatlığı.
        </p>
      </div>
    </motion.div>
  );
}

/* ─── 2. Uygulama Başarısını Ölçün ───────────────────────────────────────────── */
const CHART_DATA = [
  { a: 54, b: 14, c: 8 },
  { a: 23, b: 8, c: 18 },
  { a: 67, b: 8, c: 6 },
  { a: 38, b: 14, c: 14 },
];
const CHART_LABELS = [
  { key: 'a', label: 'Trafik', color: 'bg-ln-gray-900 dark:bg-ln-gray-100' },
  { key: 'b', label: 'Dönüşüm', color: 'bg-[#f05023]' },
  { key: 'c', label: 'Etkileşim', color: 'bg-emerald-500' },
];

function MeasureCard() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % CHART_DATA.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="bg-transparent rounded-3xl relative overflow-hidden border border-ln-gray-100 dark:border-ln-gray-800"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4 }}
    >
      <div className="h-60 relative flex items-center justify-center overflow-hidden select-none p-4">
        {/* arka plan ışık */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ln-gray-100/50 to-transparent dark:from-ln-gray-800/30" />
        {/* chart panel — kart içinde, taşma yok */}
        <div className="relative z-10 mx-auto w-full max-w-[260px] min-w-0 shrink rounded-2xl bg-transparent dark:bg-ln-gray-800/80 shadow-lg border border-ln-gray-200 dark:border-ln-gray-700 px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-3 text-[11px] font-medium text-ln-gray-600 dark:text-ln-gray-400">
            {CHART_LABELS.map(({ label, color }) => (
              <span key={label} className="flex items-center gap-1.5 shrink-0">
                <span className={`w-2 h-2 rounded-full ${color}`} />
                <span>{label}</span>
              </span>
            ))}
          </div>
          <div className="flex items-end justify-center gap-2 sm:gap-3 h-16 min-h-0">
            {CHART_DATA.map((bar, i) => (
              <div
                key={i}
                className={`flex gap-1 items-end cursor-pointer transition-all duration-300 shrink-0 ${i === active ? 'opacity-100 scale-100' : 'opacity-50 scale-[0.98]'}`}
                onClick={() => setActive(i)}
              >
                <motion.div
                  className="w-3 rounded-sm bg-ln-gray-900 dark:bg-ln-gray-100 min-h-[4px] max-h-[64px]"
                  animate={{ height: Math.min(bar.a * 0.85, 64) }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                />
                <motion.div
                  className="w-3 rounded-sm bg-[#f05023] min-h-[4px] max-h-[64px]"
                  animate={{ height: Math.min(bar.b * 0.85, 64) }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                />
                <motion.div
                  className="w-3 rounded-sm bg-emerald-500 min-h-[4px] max-h-[64px]"
                  animate={{ height: Math.min(bar.c * 0.85, 64) }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pb-12 text-center px-10">
        <p className="text-sm font-semibold text-ln-gray-900 dark:text-ln-gray-0">Proje Performansını Takip Edin</p>
        <div className="max-w-[272px] mx-auto h-px my-5 bg-ln-gray-200 dark:bg-ln-gray-700" />
        <p className="text-sm text-ln-gray-500 dark:text-ln-gray-400 leading-relaxed">
          Teslim ettiğimiz projelerde trafik, dönüşüm ve etkileşim metriklerini tek panelden takip edersiniz.
        </p>
      </div>
    </motion.div>
  );
}

/* Cloud path (Heroicons) */
const CLOUD_PATH = 'M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z';

/* ─── 3. Distribution Card (Bulutta dağıtım) ─────────────────────────────────── */
function DistributionCard() {
  return (
    <motion.div
      className="bg-transparent rounded-3xl relative overflow-hidden border border-ln-gray-100 dark:border-ln-gray-800 shadow ring-1 ring-ln-gray-200/50 dark:ring-ln-gray-700/50"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid grid-rows-[auto_1fr] gap-6 sm:gap-8 overflow-hidden rounded-3xl p-6 sm:p-8">
        {/* Başlık + açıklama */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-ln-gray-900 dark:text-ln-gray-0">
            Bulutta dağıtım
          </h3>
          <p className="text-ln-gray-500 dark:text-ln-gray-400 mt-3 text-sm leading-relaxed">
            Yayınları planlıyoruz; CDN ve kendi alan adınızda tek yerden dağıtım sunuyoruz.
          </p>
        </div>

        {/* Bulut SVG katmanları — belirgin */}
        <div className="relative mb-2 flex min-h-[160px] items-center justify-center">
          {/* Merkez: dolu bulut — net görünsün */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="stroke-ln-gray-300 dark:stroke-ln-gray-600 fill-white dark:fill-ln-gray-800 m-auto size-24 sm:size-28 drop-shadow-md stroke-[0.15]"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={CLOUD_PATH} />
          </svg>
          {/* Katman: orta halka */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="absolute inset-0 m-auto size-32 sm:size-36 stroke-ln-gray-900/20 dark:stroke-ln-gray-0/20 stroke-[0.2]"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={CLOUD_PATH} />
          </svg>
          {/* Katman: brand (turuncu) — belirgin */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="absolute inset-0 m-auto size-24 sm:size-28 fill-[#f05023]/20 stroke-[#f05023]/50 dark:stroke-[#f05023]/40 stroke-[0.2]"
            style={{ maskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)' }}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={CLOUD_PATH} />
          </svg>
          {/* Katman: kesikli */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="absolute inset-0 m-auto size-40 sm:size-44 stroke-ln-gray-900/15 dark:stroke-ln-gray-0/15 stroke-[0.15]"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeDasharray="0.2 0.2" d={CLOUD_PATH} />
          </svg>
          {/* Katman: dış halka */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="absolute inset-0 m-auto size-48 sm:size-52 stroke-ln-gray-900/10 dark:stroke-ln-gray-0/10 stroke-[0.15]"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeDasharray="0.2 0.2" d={CLOUD_PATH} />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── 4. Performance Card ───────────────────────────────────────────────────── */
const MS_NUMBERS = [
  '99MS','108MS','115MS','98MS','100MS','93MS','87MS','97MS','79MS','101MS',
  '105MS','92MS','96MS','100MS','92MS','96MS','97MS','89MS','98MS','102MS',
  '93MS','117MS','121MS','114MS','102MS','106MS','98MS','90MS','99MS','82MS',
];

function PerformanceCard() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const TARGET = 87;
    const DURATION = 1600;
    const startTs = performance.now();

    const animate = (now: number) => {
      const t = Math.min((now - startTs) / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * TARGET));
      if (t < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  // Needle angle: -135° at 0%, +135° at 100%
  const angle = -135 + (value / 100) * 270;
  const radians = (angle - 90) * (Math.PI / 180);
  const needleX = 80 + 52 * Math.cos(radians);
  const needleY = 100 + 52 * Math.sin(radians);

  return (
    <div className="bg-transparent rounded-3xl relative overflow-hidden border border-ln-gray-100 dark:border-ln-gray-800">
      {/* visual */}
      <div className="h-60 relative flex items-center justify-center overflow-hidden select-none">
        {/* bg numbers */}
        <div className="pointer-events-none absolute inset-0 flex flex-wrap content-start gap-x-3 gap-y-1.5 p-4 overflow-hidden font-mono text-[9px] text-ln-gray-400 opacity-40">
          {MS_NUMBERS.map((v, i) => <span key={i}>{v}</span>)}
        </div>

        {/* gauge panel */}
        <div className="relative z-10 rounded-2xl bg-transparent shadow-xl border border-ln-gray-100 flex items-center justify-center w-[200px] h-[156px]">
          <svg width="160" height="110" viewBox="0 0 160 110">
            <defs>
              <linearGradient id="perfGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#ef4444" />
                <stop offset="45%"  stopColor="#f97316" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
            {/* track */}
            <path d="M 18 100 A 62 62 0 0 1 142 100" fill="none" stroke="#e5e7eb" strokeWidth="10" strokeLinecap="round" />
            {/* fill */}
            <path
              d="M 18 100 A 62 62 0 0 1 142 100"
              fill="none"
              stroke="url(#perfGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${(value / 100) * 195} 195`}
            />
            {/* needle */}
            <line x1="80" y1="100" x2={needleX} y2={needleY} stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="80" cy="100" r="5" fill="#1f2937" />
            {/* value */}
            <text x="80" y="78" textAnchor="middle" fontSize="22" fontWeight="700" fill="#1f2937">{value}</text>
            <text x="80" y="93" textAnchor="middle" fontSize="9" fill="#9ca3af">ms</text>
          </svg>
        </div>
      </div>

      {/* text */}
      <div className="pb-12 text-center px-10">
        <p className="text-sm font-semibold text-ln-gray-900 dark:text-ln-gray-0">Performans, Karşılaştırmalı</p>
        <div className="max-w-[272px] mx-auto h-px my-5 bg-ln-gray-200 dark:bg-ln-gray-700" />
        <p className="text-sm text-ln-gray-500 dark:text-ln-gray-400 leading-relaxed">
          Sayfa hızı, bellek ve yükleme sürelerini ölçüyoruz; sürümler ve sektör standartlarıyla karşılaştırıyoruz.
        </p>
      </div>
    </div>
  );
}

/* ─── 5. Özellikler (Bucket) ─────────────────────────────────────────────────── */
function FeaturesBucketCard() {
  return (
    <motion.div
      className="bg-transparent border border-ln-gray-100 dark:border-ln-gray-800 flex flex-col gap-2 overflow-hidden rounded-3xl py-5 min-h-[220px] justify-center"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-1 items-center justify-center min-h-[140px] px-2">
        <Bucket />
      </div>
      <div className="space-y-4 px-6 sm:px-8">
        <h3 className="text-xl sm:text-2xl font-semibold text-ln-gray-900 dark:text-ln-gray-0">
          Özellikler
        </h3>
        <p className="text-sm text-ln-gray-500 dark:text-ln-gray-400 leading-relaxed">
          Sitemap analizi, toplu WhatsApp entegrasyonu, marka tanıtımı, yayına hazır altyapı, akıcı animasyonlar, erişilebilirlik ve modern tasarım—hepsini projelerinize entegre ediyoruz.
        </p>
      </div>
    </motion.div>
  );
}

/* ─── 6. Web Sitesi Performans Optimizasyonu (içerik: PageSpeed kartları) ──────── */
const CONTRAST_CARDS = [
  {
    device: 'Masaüstü',
    pageSpeed: '99',
    lcp: '1.2s',
    fid: '8ms',
    cls: '0.05',
    status: 'success' as const,
    bgColor: 'bg-[#f05023]',
    textColor: 'text-primary-foreground',
  },
  {
    device: 'Mobil',
    pageSpeed: '72',
    lcp: '2.8s',
    fid: '120ms',
    cls: '0.15',
    status: 'orange' as const,
    bgColor: 'bg-[#f05023]',
    textColor: 'text-secondary-foreground',
  },
  {
    device: 'Mobil',
    pageSpeed: '45',
    lcp: '4.2s',
    fid: '280ms',
    cls: '0.25',
    status: 'warning' as const,
    bgColor: 'bg-[#f05023]',
    textColor: 'text-white',
  },
];

function PerformanceOptimizationCard() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % CONTRAST_CARDS.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="bg-transparent rounded-3xl border border-ln-gray-100 dark:border-ln-gray-800 flex flex-col overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-1 flex-col rounded-3xl overflow-hidden border-0">
        <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 py-4 sm:px-8 sm:py-5 rounded-t-3xl bg-transparent dark:border-ln-gray-800">
          <h3 className="text-xl font-semibold text-ln-gray-900 dark:text-ln-gray-0 sm:text-2xl">
            Sayfa hızı ve Core Web Vitals
          </h3>
          <p className="text-sm text-ln-gray-500 dark:text-ln-gray-400 leading-relaxed">
            PageSpeed ve Core Web Vitals ile sitenizi ölçüyor, daha hızlı yükleme ve akıcı kullanıcı deneyimi için optimize ediyoruz.
          </p>
        </div>
        <div className="relative mx-auto flex h-62 w-88  max-w-sm items-end ">
          {CONTRAST_CARDS.map((card, index) => {
            const position =
              (index - currentIndex + CONTRAST_CARDS.length) % CONTRAST_CARDS.length;
            const isActive = position === 0;
            const isNext = position === 1;
            let zIndex = 1;
            let scale = 0.8;
            let bottom = 24;
            if (isActive) {
              zIndex = 3;
              scale = 1;
              bottom = 0;
            } else if (isNext) {
              zIndex = 2;
              scale = 0.9;
              bottom = 12;
            }
            return (
              <motion.div
                key={index}
                className="absolute inset-x-2 h-48"
                style={{ transformOrigin: 'center top', zIndex, bottom: `${bottom}px` }}
                animate={{ opacity: 1, scale, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className="bg-ln-gray-50 dark:bg-ln-gray-900 flex flex-col rounded-lg gap-0 border border-ln-gray-200 dark:border-ln-gray-800 p-0 shadow-sm"
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="overflow-hidden rounded-md">
                    <div className="flex items-center justify-between border-b border-ln-gray-200 dark:border-ln-gray-800 px-3 py-1.5">
                      <h3 className="text-xs font-medium text-ln-gray-900 dark:text-ln-gray-0">
                        {card.device}
                      </h3>
                      <div
                        className={`flex items-center gap-1 ${
                          card.status === 'success'
                            ? 'text-green-500'
                            : card.status === 'orange'
                              ? 'text-orange-500'
                              : 'text-red-500'
                        }`}
                      >
                        <span className="text-xs font-medium">{card.pageSpeed}</span>
                        <span>
                          {card.status === 'success' ? '✓' : card.status === 'orange' ? '△' : '⚠'}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3">
                      <div className="flex grow items-center justify-center bg-transparent py-1.5">
                        <div className="flex flex-col items-center justify-center gap-1.5">
                          <div className="relative flex items-center justify-center w-20 h-20">
                            <svg
                              width="80"
                              height="80"
                              viewBox="0 0 128 128"
                              className="absolute inset-0 w-full h-full"
                              aria-hidden
                            >
                              <circle
                                cx="64"
                                cy="64"
                                r="56"
                                fill="none"
                                stroke="#a3a3a3"
                                strokeWidth="8"
                              />
                              <circle
                                cx="64"
                                cy="64"
                                r="56"
                                fill="none"
                                stroke={
                                  card.status === 'success'
                                    ? '#22c55e'
                                    : card.status === 'orange'
                                      ? '#f97316'
                                      : '#ef4444'
                                }
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray={`${(parseInt(card.pageSpeed, 10) / 100) * 351.86} 351.86`}
                                strokeDashoffset="87.965"
                                transform="rotate(-90 64 64)"
                                className="transition-all duration-700 ease-out"
                              />
                            </svg>
                            <div
                              className={`text-3xl font-bold ${
                                card.status === 'success'
                                  ? 'text-green-500'
                                  : card.status === 'orange'
                                    ? 'text-orange-500'
                                    : 'text-red-500'
                              }`}
                            >
                              {card.pageSpeed}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-[10px]">
                            <div className="flex items-center gap-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                              <span className="text-ln-gray-900 dark:text-ln-gray-0">0-49</span>
                            </div>
                            <div className="flex items-center gap-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                              <span className="text-ln-gray-900 dark:text-ln-gray-0">50-89</span>
                            </div>
                            <div className="flex items-center gap-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                              <span className="text-ln-gray-900 dark:text-ln-gray-0">90-100</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 border-l border-ln-gray-200 dark:border-ln-gray-800">
                        <div className="border-b border-ln-gray-200 dark:border-ln-gray-800 p-2">
                          <div className="text-ln-gray-600 dark:text-ln-gray-400 mb-1 text-[10px] font-medium uppercase">
                            Temel Web Metrikleri
                          </div>
                          <div className="mb-1 flex items-center gap-1.5">
                            <div
                              className={`size-4 rounded border border-ln-gray-200 dark:border-ln-gray-800 ${card.bgColor}`}
                            />
                            <div className="grow truncate text-[10px] font-medium text-ln-gray-900 dark:text-ln-gray-0">
                              LCP: {card.lcp}
                            </div>
                          </div>
                          <div className="bg-ln-gray-100 dark:bg-ln-gray-900 rounded px-1 py-0.5 font-mono text-[10px] whitespace-nowrap text-ln-gray-700 dark:text-ln-gray-300">
                            FID: {card.fid}
                          </div>
                        </div>
                        <div className="p-2">
                          <div className="text-ln-gray-600 dark:text-ln-gray-400 mb-1 text-[10px] font-medium uppercase">
                            CLS Puanı
                          </div>
                          <div className="mb-1 flex items-center gap-1.5">
                            <div
                              className={`size-4 rounded border border-ln-gray-200 dark:border-ln-gray-800 bg-current ${card.textColor}`}
                            />
                            <div className="grow truncate text-[10px] font-medium text-ln-gray-900 dark:text-ln-gray-0">
                              CLS: {card.cls}
                            </div>
                          </div>
                          <div className="bg-ln-gray-100 dark:bg-ln-gray-900 rounded px-1 py-0.5 font-mono text-[10px] whitespace-nowrap text-ln-gray-700 dark:text-ln-gray-300">
                            {card.device}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
          <div className="from-ln-gray-25 dark:from-ln-gray-900/30 pointer-events-none absolute inset-x-0 -bottom-px z-10 h-4 bg-gradient-to-t to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── 7. Kurulum adımları ───────────────────────────────────────────────────── */
function KurulumStepsCard() {
  return (
    <motion.div
      className="bg-transparent rounded-3xl border border-ln-gray-100 dark:border-ln-gray-800 flex flex-col overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-1 items-center justify-center min-h-[200px] px-4 py-4">
        <OnboardCard
          duration={3000}
          step1="Kayıt ve hesap oluşturma"
          step2="Site Analizi"
          step3="Paket Seçimi"
        />
      </div>
      <div className="space-y-2 px-6 pb-6 sm:px-8">
        <h3 className="text-xl font-semibold text-ln-gray-900 dark:text-ln-gray-0 sm:text-2xl">
          Kurulum adımları
        </h3>
        <p className="text-sm text-ln-gray-500 dark:text-ln-gray-400 leading-relaxed">
          İlk adım kayıt ve hesap; ardından sitenizi tarayıp analiz ediyoruz, sonrasında paket seçimiyle devam ediyoruz.
        </p>
      </div>
    </motion.div>
  );
}

/* ─── 8. Sesli destek ───────────────────────────────────────────────────────── */
function VoiceSupportCard() {
  return (
    <motion.div
      className="bg-transparent rounded-3xl border border-ln-gray-100 dark:border-ln-gray-800 flex flex-col overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-1 items-center justify-center min-h-[200px] px-4 py-4">
        <div className="relative flex w-full max-w-[200px] flex-col items-center gap-3">
          <button
            type="button"
            className="group hover:bg-accent bg-transparent dark:bg-ln-gray-800 flex size-12 cursor-pointer items-center justify-center rounded-xl border border-ln-gray-200 dark:border-ln-gray-700 transition-colors"
          >
            <div
              className="bg-[#f05023] pointer-events-none size-4 animate-spin rounded-sm"
              style={{ animationDuration: '3s' }}
            />
          </button>
          <span className="text-ln-gray-600 dark:text-ln-gray-400 font-mono text-xs font-light">
            00:02
          </span>
          <div className="flex h-3 w-full max-w-[180px] items-center justify-center gap-0.5 px-1 py-0.5">
            {Array.from({ length: 32 }).map((_, i) => {
              const height = 20 + ((i * 13) % 80);
              return (
                <div
                  key={`bar-${i}`}
                  className="w-0.5 rounded-full bg-[#f05023]/80 animate-pulse transition-all duration-300"
                  style={{
                    height: `${height}%`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              );
            })}
          </div>
          <p className="text-xs text-ln-gray-500 dark:text-ln-gray-400">Dinleniyor...</p>
        </div>
      </div>
      <div className="space-y-2 px-6 pb-6 sm:px-8">
        <h3 className="text-xl font-semibold text-ln-gray-900 dark:text-ln-gray-0 sm:text-2xl">
          Sesli destek
        </h3>
        <p className="text-sm text-ln-gray-500 dark:text-ln-gray-400 leading-relaxed">
          Komut veya soru; anında yanıt. Canlı destek ve isteğe bağlı sesli asistan ile yanınızdayız.
        </p>
      </div>
    </motion.div>
  );
}

/* ─── 9. Real time location tracking (DottedMap + badge) ───────────────────── */
function RealtimeLocationCard() {
  const points = useMemo(() => {
    const map = new DottedMap({ height: 55, grid: 'diagonal' });
    return map.getPoints();
  }, []);
  return (
    <motion.div
      className="bg-transparent rounded-3xl border border-ln-gray-100 dark:border-ln-gray-800 flex flex-col overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col">
        <div className="p-6 sm:p-8">
          <span className="text-ln-gray-500 dark:text-ln-gray-400 flex items-center gap-2 text-sm">
            <MapIcon className="size-4" aria-hidden />
            Gerçek zamanlı konum takibi
          </span>
          <p className="mt-4 text-lg font-semibold text-ln-gray-900 dark:text-ln-gray-0 sm:text-xl leading-snug">
            Sunucu ve hizmet durumunu anlık takip edin.
          </p>
        </div>
        <div className="relative w-full overflow-hidden bg-transparent" style={{ aspectRatio: '120/60' }}>
          <div className="absolute inset-0 z-[1] pointer-events-none" />
          <svg
            viewBox="0 0 120 60"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 h-full w-full text-ln-gray-300 dark:text-ln-gray-600"
            
            aria-hidden
          >
            {points.map((point, i) => (
              <circle key={i} cx={point.x} cy={point.y} r="0.15" fill="currentColor" />
            ))}
          </svg>
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <div className="rounded-xl bg-transparent border border-ln-gray-200 dark:border-ln-gray-700 px-3 py-1.5 text-xs font-medium shadow-md flex items-center gap-1.5">
              <span className="text-base">🇹🇷</span>
              Son bağlantı: Türkiye
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── 10. Email and web support ─────────────────────────────────────────────── */
function EmailWebSupportCard() {
  return (
    <motion.div
      className="bg-transparent rounded-3xl border border-ln-gray-100 dark:border-ln-gray-800 flex flex-col overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-6 sm:p-8">
        <span className="text-ln-gray-500 dark:text-ln-gray-400 flex items-center gap-2 text-sm">
          <MessageCircle className="size-4" aria-hidden />
          E-posta ve web destek
        </span>
        <p className="mt-4 text-lg font-semibold text-ln-gray-900 dark:text-ln-gray-0 sm:text-xl">
          Her türlü sorunuz için e-posta veya web üzerinden bize ulaşın; hızlı yanıt veriyoruz.
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-4 px-6 pb-6 sm:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-5 shrink-0 rounded-full border border-ln-gray-200 dark:border-ln-gray-700 overflow-hidden bg-ln-gray-100 dark:bg-ln-gray-800 items-center justify-center">
              <Logo className="m-auto size-3" />
            </span>
            <span className="text-ln-gray-500 dark:text-ln-gray-400 text-xs">Cmt 22 Şub</span>
          </div>
          <div className="mt-1.5 w-3/5 rounded-xl border border-ln-gray-200 dark:border-ln-gray-700 bg-transparent dark:bg-ln-gray-800 p-3 text-xs text-ln-gray-900 dark:text-ln-gray-0">
            Faturalama ile ilgili bir sorum var.
          </div>
        </div>
        <div>
          <div className="ml-auto w-3/5 rounded-xl bg-[#f05023] p-3 text-xs text-white">
            Fatura geçmişiniz Hesap ayarları → Faturalandırma bölümünden görüntülenebilir. İsterseniz PDF indirebilirsiniz.
          </div>
          <span className="text-ln-gray-500 dark:text-ln-gray-400 block text-right text-xs">Şimdi</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── 11. Destek / imza grid kartı (referans HTML ile aynı yapı) ───────────────── */
function SupportSignatureCard() {
  return (
    <motion.div
      className="bg-transparent rounded-3xl border border-ln-gray-100 dark:border-ln-gray-800 flex flex-col overflow-hidden min-h-[220px]"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4 }}
    >
      <div
        aria-hidden
        className="grid h-full grid-cols-6 gap-px [--color-primary:var(--color-indigo-500)] min-h-[220px]"
      >
        <div className="grid grid-rows-3 gap-y-px *:!p-2">
          <div data-grid-content />
          <div data-grid-content />
          <div data-grid-content />
        </div>
        <div className="col-span-4 grid grid-rows-3 gap-y-px">
          <div data-grid-content className="flex items-center justify-center gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                aria-hidden
                className="bg-transparent ring-foreground/5 w-16 space-y-2 rounded-md p-2 shadow-md shadow-black/5 ring-1 [--color-border:color-mix(in_oklab,var(--color-foreground)_15%,transparent)]"
              >
                <div className="flex items-center gap-1">
                  <div className="bg-foreground/15 size-2.5 rounded-full" />
                  <div className="bg-foreground/15 h-[3px] w-4 rounded-full" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1">
                    <div className="bg-foreground/15 h-[3px] w-2.5 rounded-full" />
                    <div className="bg-foreground/15 h-[3px] w-6 rounded-full" />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="bg-foreground/15 h-[3px] w-2.5 rounded-full" />
                    <div className="bg-foreground/15 h-[3px] w-6 rounded-full" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="bg-foreground/15 h-[3px] w-full rounded-full" />
                  <div className="flex items-center gap-1">
                    <div className="bg-foreground/15 h-[3px] w-2/3 rounded-full" />
                    <div className="bg-foreground/15 h-[3px] w-1/3 rounded-full" />
                  </div>
                </div>
                <Signature className="lucide lucide-signature ml-auto size-3" aria-hidden />
              </div>
            ))}
          </div>
          <div data-grid-content className="flex flex-col justify-center !p-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-xs">Kullanıcı</span>
              </div>
              <div className="rounded-lg bg-transparent ring-foreground/5 mt-1.5 w-4/5 rounded-tl p-3 text-xs shadow-md shadow-black/5 ring-1">
                İlk kurulum adımlarını nereden takip edebilirim?
              </div>
            </div>
          </div>
          <div data-grid-content className="flex flex-col justify-center !p-4">
            <div>
              <div className="rounded-lg bg-primary ring-foreground/10 mb-1 ml-auto w-4/5 rounded-br p-3 text-xs text-white shadow-md shadow-black/5 ring-1 ring-inset">
                Dashboard’da “Başlarken” bölümüne gidin; adım adım rehber sizi yönlendirecek.
              </div>
              <span className="text-muted-foreground block text-right text-xs">Şimdi</span>
            </div>
          </div>
        </div>
        <div className="grid grid-rows-3 gap-y-px *:!p-2">
          <div data-grid-content />
          <div data-grid-content />
          <div data-grid-content />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── 12. Uptime Monitoring card ────────────────────────────────────────────── */
function UptimeMonitoringCard() {
  return (
    <motion.div
      data-slot="card"
      className="ring-border bg-transparent text-card-foreground shadow-black/6.5 rounded-2xl p-8 shadow ring-1 grid grid-rows-[auto_1fr] gap-8 border-0"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <Activity className="text-muted-foreground size-4" aria-hidden />
        <h3 className="text-foreground mb-2 mt-4 font-medium">Genel site durumu</h3>
        <p className="text-muted-foreground text-balance text-sm">
          Teslim ettiğimiz sitenin ve hizmetlerin anlık durumunu buradan takip edersiniz.
        </p>
      </div>
      <div className="flex flex-col justify-end">
        <div aria-hidden className="min-w-xs relative pb-16">
          <div className="absolute inset-x-6 top-5 translate-x-2">
            <div className="absolute inset-0 scale-100 opacity-75 blur-lg transition-all duration-300 dark:opacity-50">
              <div className="bg-gradient-to-r from-pink-400 to-purple-400 absolute inset-x-6 bottom-0 top-12 -translate-y-3 animate-pulse" />
            </div>
            <div className="ring-border rounded-xl shadow-lg ring-1 relative border border-ln-gray-200 dark:border-ln-gray-700">
              <X className="absolute right-2 top-2 size-3 text-muted-foreground" aria-hidden />
              <span className="text-muted-foreground block p-3 text-xs">Komut veya soru yazın</span>
              <div className="flex justify-between border-t border-ln-gray-200 dark:border-ln-gray-700 p-2">
                <span className="text-muted-foreground hover:text-foreground flex h-6 cursor-pointer items-center gap-1.5 rounded-md p-2 hover:bg-foreground/5 duration-100">
                  <Apple className="size-3.5 opacity-75" aria-hidden />
                  <span className="text-xs">Kurumsal</span>
                </span>
                <div className="bg-[#f05023] relative flex size-6 rounded-md text-white shadow before:absolute before:inset-0 before:rounded-md before:border before:border-foreground/20">
                  <CornerDownLeft className="m-auto size-3.5 drop-shadow" aria-hidden />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4 pt-24">
            <div className="space-y-1.5">
              <div className="bg-border h-1 w-4/5 rounded-full" />
              <div className="flex items-center gap-1">
                <div className="bg-border h-1 w-2/5 rounded-full" />
                <div className="bg-[#f05023] h-1 w-1/5 rounded-full" />
                <div className="bg-border h-1 w-1/5 rounded-full" />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1">
                <div className="bg-border h-1 w-2/5 rounded-full" />
                <div className="bg-border h-1 w-1/5 rounded-full" />
              </div>
              <div className="flex w-3/4 items-center gap-1">
                <div className="bg-border h-1 w-1/5 rounded-full" />
                <div className="bg-border h-1 w-4/5 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── 13. Service Reliability card (uptime bars) ─────────────────────────────── */
function ServiceReliabilityCard() {
  return (
    <motion.div
      data-slot="card"
      className="ring-border bg-transparent text-card-foreground shadow-black/6.5 rounded-2xl p-8 shadow ring-1 border-0 grid grid-rows-[auto_1fr] gap-8"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4 }}
    >
      <div className="space-y-8">
        <div aria-hidden className="flex flex-col justify-center">
          <div aria-hidden className="ring-border shadow-black/6.5 space-y-2.5 rounded-2xl p-4 shadow ring-1 border border-ln-gray-200 dark:border-ln-gray-700">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Çalışma süresi</span>
              <span className="text-foreground">99.9%</span>
            </div>
            <div className="flex justify-between gap-px">
              {Array.from({ length: 32 }).map((_, i) => {
                const dim = [9, 10, 21, 22, 23, 31].includes(i);
                return (
                  <div
                    key={i}
                    className={`h-7 w-1 rounded ${dim ? 'bg-foreground/25' : 'bg-[#f05023]'}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-foreground font-semibold">Hizmet güvenilirliği</h3>
          <p className="text-muted-foreground mt-2 text-sm">
            Hedeflediğimiz <span className="text-foreground font-medium">%99,9</span> çalışma süresi ile kesintisiz erişim sunuyoruz.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── 14. Enterprise-grade security ──────────────────────────────────────────── */
function EnterpriseSecurityCard() {
  return (
    <motion.div
      data-slot="card"
      className="ring-foreground/6.5 bg-transparent text-card-foreground shadow ring-1 group overflow-hidden rounded-2xl p-8 grid grid-rows-[auto_1fr] gap-8 border-0"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <h3 className="text-foreground font-semibold">Kurumsal düzeyde güvenlik</h3>
        <p className="text-muted-foreground mt-3 text-sm">
          Rol tabanlı erişim, denetim kayıtları ve ayrıntılı kontrollerle verilerinizi güvende tutuyoruz.
        </p>
      </div>
      <div className="relative mb-6 flex">
        <Shield className="stroke-[#f05023] fill-[#f05023]/20 m-auto size-24 drop-shadow-2xl [filter:drop-shadow(0_0_12px_rgba(240,80,35,0.25))]" aria-hidden />
        <Shield className="absolute inset-0 m-auto size-32 stroke-[#f05023]/25 stroke-[0.1]" aria-hidden />
        <Shield className="absolute inset-0 m-auto size-24 fill-orange-100/50 stroke-[#f05023] stroke-[0.1] [mask-image:linear-gradient(to_bottom,black_35%,transparent_100%)]" aria-hidden />
        <Shield className="absolute inset-0 m-auto size-40 stroke-[#f05023]/15 stroke-[0.1]" strokeDasharray="0.2 0.2" aria-hidden />
        <Shield className="absolute inset-0 m-auto size-48 stroke-[#f05023]/10 stroke-[0.1]" strokeDasharray="0.2 0.2" aria-hidden />
      </div>
    </motion.div>
  );
}

/* ─── Export ────────────────────────────────────────────────────────────────── */
export default function ElectronBento() {
  return (
    <div className="grid md:grid-cols-2 gap-6 my-24 max-w-5xl mx-auto  sm:px-12 w-full">
      <SecureDeliveryCard />
      <MeasureCard />
      <DistributionCard />
      <PerformanceCard />
      <FeaturesBucketCard />
      <PerformanceOptimizationCard />
      <KurulumStepsCard />
      <VoiceSupportCard />
      <RealtimeLocationCard />
      <EmailWebSupportCard />
      <SupportSignatureCard />
      <UptimeMonitoringCard />
      <ServiceReliabilityCard />
      <EnterpriseSecurityCard />
    </div>
  );
}
