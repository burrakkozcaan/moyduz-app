"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";
import {
  Search,
  FileText,
  Layout,
  Bot,
  Globe,
  Settings,
  Gauge,
  Code,
  BarChart3,
  Zap,
  Link,
  Eye,
  Cloud,
  Database,
  ShieldCheck,
} from "lucide-react";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";
import { cn } from "@/lib/utils";

const TAG_ROWS: { id: string; icon: LucideIcon; label: string }[][] = [
  [
    { id: "keywords", icon: Search, label: "Anahtar Kelimeler" },
    { id: "meta-tags", icon: FileText, label: "Meta Etiketler" },
    { id: "schema", icon: Layout, label: "Schema İşaretleme" },
    { id: "ai-overviews", icon: Bot, label: "AI Özetleri (GEO)" },
    { id: "indexing", icon: Globe, label: "İndeksleme" },
  ],
  [
    { id: "technical-seo", icon: Settings, label: "Teknik SEO" },
    { id: "core-web-vitals", icon: Gauge, label: "Temel Web Metrikleri" },
    { id: "llms-txt", icon: Code, label: "llms.txt" },
    { id: "analytics", icon: BarChart3, label: "Analitik" },
    { id: "visibility", icon: Zap, label: "Görünürlük" },
  ],
  [
    { id: "backlinks", icon: Link, label: "Backlink" },
    { id: "e-e-a-t", icon: Eye, label: "E-E-A-T" },
    { id: "sitemap", icon: Cloud, label: "Sitemap" },
    { id: "content-seo", icon: Database, label: "İçerik SEO" },
    { id: "citation", icon: ShieldCheck, label: "AI Alıntıları" },
  ],
];

const CONFIG = {
  title: "Görünürlük, SEO & GEO",
  description:
    "Arama motoru ve yapay zeka sonuçlarında sitenizin görünürlüğünü artırın: teknik SEO, Schema, Core Web Vitals ve AI özetleri (GEO) tek çatı altında.",
  containerHeight: "h-[200px] sm:h-[240px]",
  lensSize: 92,
};

const MagnifiedBento = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const lensX = useMotionValue(0);
  const lensY = useMotionValue(0);

  const clipPath = useMotionTemplate`circle(30px at calc(50% + ${lensX}px - 10px) calc(50% + ${lensY}px - 10px))`;
  const inverseMask = useMotionTemplate`radial-gradient(circle 30px at calc(50% + ${lensX}px - 10px) calc(50% + ${lensY}px - 10px), transparent 100%, black 100%)`;

  return (
    <div className="flex w-full flex-col gap-6 overflow-hidden rounded-xl border border-ln-gray-100 bg-ln-gray-25 py-6 dark:border-ln-gray-800 dark:bg-ln-gray-900/50">
      <div className="flex flex-1 items-center justify-center px-4 not-prose">
        <div className="group relative w-full max-w-[380px]">
          <div
            ref={containerRef}
            className={cn(
              "relative w-full overflow-hidden rounded-xl border border-ln-gray-200 bg-ln-gray-50 dark:border-ln-gray-700 dark:bg-ln-gray-800/50",
              CONFIG.containerHeight
            )}
          >
            <div className="relative flex h-full w-full flex-col items-center justify-center">
              {/* base layer */}
              <motion.div
                style={{ WebkitMaskImage: inverseMask, maskImage: inverseMask }}
                className="flex h-full w-full flex-col justify-center gap-4"
              >
                {TAG_ROWS.map((row, rowIndex) => (
                  <motion.div
                    key={`row-${rowIndex}`}
                    className="flex w-max gap-4"
                    animate={{
                      x:
                        rowIndex % 2 === 0
                          ? ["0%", "-33.333%"]
                          : ["-33.333%", "0%"],
                    }}
                    transition={{
                      duration: 25,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  >
                    {[...row, ...row, ...row].map((item, idx) => (
                      <div
                        key={`${item.id}-${idx}`}
                        className="flex w-fit items-center gap-2 whitespace-nowrap rounded-full border border-ln-gray-200 bg-ln-gray-100/80 px-3 py-2 text-xs text-ln-gray-600 backdrop-blur-sm dark:border-ln-gray-700 dark:bg-ln-gray-800/80 dark:text-ln-gray-400"
                      >
                        <item.icon className="size-3.5 shrink-0" />
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </motion.div>
                ))}
              </motion.div>

              {/* reveal layer */}
              <motion.div
                className="pointer-events-none absolute inset-0 z-10 flex select-none flex-col justify-center gap-4"
                style={{ clipPath }}
              >
                {TAG_ROWS.map((row, rowIndex) => (
                  <motion.div
                    key={`row-reveal-${rowIndex}`}
                    className="flex w-max gap-4"
                    animate={{
                      x:
                        rowIndex % 2 === 0
                          ? ["0%", "-33.333%"]
                          : ["-33.333%", "0%"],
                    }}
                    transition={{
                      duration: 25,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  >
                    {[...row, ...row, ...row].map((item, idx) => (
                      <div
                        key={`${item.id}-${idx}-reveal`}
                        className="ml-6 flex w-fit scale-125 items-center gap-2 whitespace-nowrap rounded-full border border-primary/30 bg-white px-3 py-2 text-xs font-medium text-primary shadow-sm dark:border-primary/40 dark:bg-ln-gray-800"
                      >
                        <item.icon className="size-3.5 shrink-0 text-primary" />
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </motion.div>
                ))}
              </motion.div>

              {/* lens */}
              <motion.div
                className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 cursor-grab drop-shadow-xl active:cursor-grabbing"
                drag
                dragMomentum={false}
                dragConstraints={containerRef}
                style={{ x: lensX, y: lensY }}
              >
                <div className="relative">
                  <MagnifyingLens size={CONFIG.lensSize} />
                  <div className="pointer-events-none absolute left-[6px] top-[6px] h-[60px] w-[60px] rounded-full bg-white/10 dark:bg-black/20" />
                </div>
              </motion.div>
            </div>

            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/4 bg-gradient-to-r from-ln-gray-25 to-transparent dark:from-ln-gray-800/50"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-20 w-1/4 bg-gradient-to-l from-ln-gray-50 to-transparent dark:from-ln-gray-800/50"
              aria-hidden
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 px-6">
        <h3 className="text-2xl font-semibold text-ln-gray-900 dark:text-ln-gray-0">
          {CONFIG.title}
        </h3>
        <p className="text-lg text-ln-gray-600 dark:text-ln-gray-400">
          {CONFIG.description}
        </p>
      </div>
    </div>
  );
};

export default MagnifiedBento;

const MagnifyingLens = ({ size = 92 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none"
      aria-hidden
    >
      <path
        d="M365.424 335.392L342.24 312.192L311.68 342.736L334.88 365.936L365.424 335.392Z"
        fill="#575B5E"
      />
      <path
        d="M358.08 342.736L334.88 319.552L319.04 335.392L342.24 358.584L358.08 342.736Z"
        fill="#B0BDC6"
      />
      <path
        d="M352.368 321.808L342.752 312.192L312.208 342.752L321.824 352.36L352.368 321.808Z"
        fill="#7A858C"
      />
      <path
        d="M332 332C260 404 142.4 404 69.6001 332C-2.3999 260 -2.3999 142.4 69.6001 69.6C141.6 -3.20003 259.2 -2.40002 332 69.6C404.8 142.4 404.8 260 332 332ZM315.2 87.2C252 24 150.4 24 88.0001 87.2C24.8001 150.4 24.8001 252 88.0001 314.4C151.2 377.6 252.8 377.6 315.2 314.4C377.6 252 377.6 150.4 315.2 87.2Z"
        fill="#DFE9EF"
      />
      <path
        d="M319.2 319.2C254.4 384 148.8 384 83.2001 319.2C18.4001 254.4 18.4001 148.8 83.2001 83.2C148 18.4 253.6 18.4 319.2 83.2C384 148.8 384 254.4 319.2 319.2ZM310.4 92C250.4 32 152 32 92.0001 92C32.0001 152 32.0001 250.4 92.0001 310.4C152 370.4 250.4 370.4 310.4 310.4C370.4 250.4 370.4 152 310.4 92Z"
        fill="#7A858C"
      />
      <path
        d="M484.104 428.784L373.8 318.472L318.36 373.912L428.672 484.216L484.104 428.784Z"
        fill="#333333"
      />
      <path
        d="M471.664 441.224L361.344 330.928L330.8 361.48L441.12 471.76L471.664 441.224Z"
        fill="#333333"
      />
      <path
        d="M495.2 423.2C504 432 432.8 504 423.2 495.2L417.6 489.6C408.8 480.8 480 408.8 489.6 417.6L495.2 423.2Z"
        fill="#B0BDC6"
      />
      <path
        d="M483.2 435.2C492 444 444.8 492 435.2 483.2L429.6 477.6C420.8 468.8 468 420.8 477.6 429.6L483.2 435.2Z"
        fill="#575B5E"
      />
    </svg>
  );
};
