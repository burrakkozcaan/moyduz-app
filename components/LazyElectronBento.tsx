"use client";

import dynamic from "next/dynamic";
import DeferredMount from "@/components/DeferredMount";

const ElectronBento = dynamic(
  () => import("@/components/ElectronBento"),
  { ssr: false }
);

export default function LazyElectronBento() {
  return (
    <DeferredMount fallback={<div className="h-[600px] w-full" />}>
      <ElectronBento />
    </DeferredMount>
  );
}
