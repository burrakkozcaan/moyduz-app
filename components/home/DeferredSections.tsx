"use client";

import dynamic from "next/dynamic";
import DeferredMount from "@/components/DeferredMount";

const ElectronBento = dynamic(() => import("@/components/ElectronBento"), { ssr: false });
const EcosystemMarqueeSection = dynamic(() => import("@/components/EcosystemMarqueeSection"), { ssr: false });
const PlatformPillars = dynamic(() => import("@/components/PlatformPillars"), { ssr: false });
const SectorTemplates = dynamic(() => import("@/components/SectorTemplates"), { ssr: false });
const Testimional = dynamic(() => import("@/components/Testimional"), { ssr: false });

export function DeferredElectronBento() {
  return (
    <DeferredMount fallback={<div className="h-[600px] w-full" />}>
      <ElectronBento />
    </DeferredMount>
  );
}

export function DeferredEcosystemMarquee() {
  return (
    <DeferredMount fallback={<div className="h-[200px] w-full" />}>
      <EcosystemMarqueeSection />
    </DeferredMount>
  );
}

export function DeferredPlatformPillars() {
  return (
    <DeferredMount fallback={<div className="h-[300px] w-full" />}>
      <PlatformPillars />
    </DeferredMount>
  );
}

export function DeferredSectorTemplates() {
  return (
    <DeferredMount fallback={<div className="h-[400px] w-full" />}>
      <SectorTemplates />
    </DeferredMount>
  );
}

export function DeferredTestimonials() {
  return (
    <DeferredMount fallback={<div className="h-[400px] w-full" />}>
      <Testimional />
    </DeferredMount>
  );
}
