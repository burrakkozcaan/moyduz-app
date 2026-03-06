"use client";

import dynamic from "next/dynamic";

const EcosystemMarqueeSection = dynamic(
  () => import("@/components/EcosystemMarqueeSection"),
  { ssr: false }
);

export default function LazyEcosystemMarqueeSection() {
  return <EcosystemMarqueeSection />;
}
