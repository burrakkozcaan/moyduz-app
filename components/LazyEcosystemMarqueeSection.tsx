"use client";

import dynamic from "next/dynamic";
import DeferredMount from "@/components/DeferredMount";

const EcosystemMarqueeSection = dynamic(
  () => import("@/components/EcosystemMarqueeSection"),
  { ssr: false }
);

export default function LazyEcosystemMarqueeSection() {
  return (
    <DeferredMount fallback={<div className="h-[300px] w-full" />}>
      <EcosystemMarqueeSection />
    </DeferredMount>
  );
}
