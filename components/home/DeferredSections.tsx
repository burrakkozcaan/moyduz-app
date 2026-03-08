"use client";

import dynamic from "next/dynamic";
import DeferredMount from "@/components/DeferredMount";

const loadElectronBento = () => import("@/components/ElectronBento");
const ElectronBento = dynamic(() => loadElectronBento(), { ssr: false });

export function DeferredElectronBento() {
  return (
    <DeferredMount
      fallback={<div className="h-[600px] w-full" />}
      rootMargin="800px 0px"
      prefetch={loadElectronBento}
      prefetchMargin="1200px 0px"
    >
      <ElectronBento />
    </DeferredMount>
  );
}
