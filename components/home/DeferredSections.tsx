"use client";

import dynamic from "next/dynamic";
import DeferredMount from "@/components/DeferredMount";

const ElectronBento = dynamic(() => import("@/components/ElectronBento"), { ssr: false });
export function DeferredElectronBento() {
  return (
    <DeferredMount fallback={<div className="h-[600px] w-full" />} rootMargin="800px 0px">
      <ElectronBento />
    </DeferredMount>
  );
}
