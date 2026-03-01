"use client";

import dynamic from "next/dynamic";
import DeferredMount from "@/components/DeferredMount";

const VerticalMarqueeHero = dynamic(
  () => import("@/components/VerticalMarqueeHero"),
  { ssr: false }
);

export default function LazyVerticalMarqueeHero() {
  return (
    <DeferredMount
      fallback={<div className="min-h-[420px] w-full bg-[#f7f7f7] sm:min-h-[520px] md:min-h-screen" />}
      rootMargin="0px"
    >
      <VerticalMarqueeHero />
    </DeferredMount>
  );
}
