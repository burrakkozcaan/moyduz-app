"use client";

import dynamic from "next/dynamic";
import DeferredMount from "@/components/DeferredMount";

const ElectronBento = dynamic(() => import("@/components/ElectronBento"), { ssr: false });
const SectorTemplates = dynamic(() => import("@/components/SectorTemplates"), { ssr: false });
const Testimional = dynamic(() => import("@/components/Testimional"), { ssr: false });

export function DeferredElectronBento() {
  return (
    <DeferredMount fallback={<div className="h-[600px] w-full" />} rootMargin="800px 0px">
      <ElectronBento />
    </DeferredMount>
  );
}


export function DeferredSectorTemplates() {
  return (
    <DeferredMount fallback={<div className="h-[700px] w-full" />} rootMargin="800px 0px">
      <SectorTemplates />
    </DeferredMount>
  );
}

export function DeferredTestimonials() {
  return (
    <DeferredMount fallback={<div className="h-[400px] w-full" />} rootMargin="800px 0px">
      <Testimional />
    </DeferredMount>
  );
}
