"use client";

import React from "react";
import {
  Code,
  Layout,
  Globe,
  ShoppingCart,
  Zap,
  Shield,
  Search,
  Smartphone,
  Server,
  Rocket,
  Palette,
  BarChart3,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ITEMS = [
  { icon: Code, label: "Web Geliştirme" },
  { icon: Layout, label: "Web Tasarım" },
  { icon: Globe, label: "SaaS" },
  { icon: ShoppingCart, label: "E-ticaret" },
  { icon: Zap, label: "Performans" },
  { icon: Shield, label: "Güvenlik" },
  { icon: Search, label: "SEO" },
  { icon: Smartphone, label: "Duyarlı Tasarım" },
  { icon: Server, label: "Full-stack" },
  { icon: Rocket, label: "Lansman" },
  { icon: Palette, label: "UI/UX" },
  { icon: BarChart3, label: "Analitik" },
];

export default function EcosystemMarqueeSection() {
  return (
    <section className="w-full max-w-full overflow-x-clip py-12">
      <div className="container max-w-full px-4 md:px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-6 text-center">
          <Badge
            variant="outline"
            className="rounded-full border-[#ff4d00]/30 bg-[#ff4d00]/10 px-3 py-1 text-xs font-medium text-[#ff4d00]"
          >
            Ne yapıyoruz
          </Badge>
          <h2 className="text-4xl font-semibold text-black md:text-5xl lg:text-6xl text-balance">
            Web, SaaS & Dijital
            <br />
            <span className="text-[#ff4d00]">Ölçeklenen Ürünler</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-black/60">
            Tasarımdan geliştirmeye, performanstan SEO ve güvenliğe—dijital varlığınızı inşa eder ve büyütürüz.
          </p>
        </div>

        {/* Marquee: taşma sadece bu kutuda, sayfaya yansımaz */}
        <div className="ecosystem-marquee-container relative mt-16 w-full max-w-full overflow-x-clip bg-transparent">
          <div className="relative w-full min-w-0 overflow-x-clip">
            {/* First Row - Forward */}
            <div className="flex w-full min-w-0 gap-3 overflow-x-clip py-4 sm:gap-4">
              <div className="flex shrink-0 gap-3 animate-marquee sm:gap-4">
                {[...ITEMS, ...ITEMS].map((item, i) => (
                  <div
                    key={i}
                    className="flex shrink-0 items-center gap-2 rounded-full border border-black/10 bg-transparent px-3 py-2 sm:px-4"
                  >
                    <item.icon className="h-4 w-4 shrink-0 text-[#ff4d00]" />
                    <span className="whitespace-nowrap text-sm font-medium text-black/90">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex shrink-0 gap-3 animate-marquee sm:gap-4" aria-hidden="true">
                {[...ITEMS, ...ITEMS].map((item, i) => (
                  <div
                    key={i}
                    className="flex shrink-0 items-center gap-2 rounded-full border border-black/10 bg-transparent px-3 py-2 sm:px-4"
                  >
                    <item.icon className="h-4 w-4 shrink-0 text-[#ff4d00]" />
                    <span className="whitespace-nowrap text-sm font-medium text-black/90">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Second Row - Reverse */}
            <div className="flex w-full min-w-0 gap-3 overflow-x-clip py-4 sm:gap-4">
              <div className="flex shrink-0 gap-3 animate-marquee-reverse sm:gap-4">
                {[...ITEMS, ...ITEMS]
                  .reverse()
                  .map((item, i) => (
                    <div
                      key={i}
                      className="flex shrink-0 items-center gap-2 rounded-full border border-black/10 bg-transparent px-3 py-2 sm:px-4"
                    >
                      <item.icon className="h-4 w-4 shrink-0 text-[#ff4d00]" />
                      <span className="whitespace-nowrap text-sm font-medium text-black/60">
                        {item.label}
                      </span>
                    </div>
                  ))}
              </div>
              <div
                className="flex shrink-0 gap-3 animate-marquee-reverse sm:gap-4"
                aria-hidden="true"
              >
                {[...ITEMS, ...ITEMS]
                  .reverse()
                  .map((item, i) => (
                    <div
                      key={i}
                      className="flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-transparent px-3 py-2 sm:px-4"
                    >
                      <item.icon className="h-4 w-4 shrink-0 text-white/40" />
                      <span className="whitespace-nowrap text-sm font-medium text-white/50">
                        {item.label}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Fade Gradients - dark theme */}
            <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/4 bg-gradient-to-r from-[#ffffff] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 bg-gradient-to-l from-[#ffffff] to-transparent" />
          </div>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              .ecosystem-marquee-container {
                contain: layout paint;
                overflow-x: clip;
              }
              .ecosystem-marquee-container * {
                box-sizing: border-box;
              }
              @keyframes ecosystem-marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-100%); }
              }
              @keyframes ecosystem-marquee-reverse {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(0); }
              }
              .ecosystem-marquee-container .animate-marquee {
                animation: ecosystem-marquee 40s linear infinite;
              }
              .ecosystem-marquee-container .animate-marquee-reverse {
                animation: ecosystem-marquee-reverse 40s linear infinite;
              }
            `,
          }}
        />
      </div>
    </section>
  );
}
