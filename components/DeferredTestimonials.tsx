"use client";

import dynamic from "next/dynamic";
import DeferredMount from "@/components/DeferredMount";

const loadTestimonials = () => import("@/components/Testimional");
const Testimional = dynamic(() => loadTestimonials(), {
  ssr: false,
});

export default function DeferredTestimonials() {
  return (
    <DeferredMount
      className="cv-testimonials"
      fallback={<div className="h-[520px] w-full" />}
      prefetch={loadTestimonials}
    >
      <Testimional />
    </DeferredMount>
  );
}

