"use client";

import React, { useMemo, memo } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs));
}

/** Resim: string URL. Video: { type: 'video', src: string }. İstersen video URL'leri buraya ekleyebilirsin. */
export type MediaItem = { type: "image"; src: string } | { type: "video"; src: string };

function toMediaItem(item: string | MediaItem): MediaItem {
  return typeof item === "string" ? { type: "image", src: item } : item;
}

const MEDIA_SETS: Record<string, (string | MediaItem)[]> = {
  set1: [
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&q=80",
  ],
  set2: [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&q=80",
  ],
  set3: [
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&q=80",
  ],
};

type MarqueeColumnProps = {
  items: (string | MediaItem)[];
  speed?: number;
  direction?: "down" | "up";
  gap?: string;
  className?: string;
  aspect?: "normal" | "tall";
};

const MarqueeColumn = memo(function MarqueeColumn({
  items,
  speed = 30,
  direction = "down",
  gap = "1rem",
  className,
  aspect = "normal",
}: MarqueeColumnProps) {
  const normalized = useMemo(() => items.map(toMediaItem), [items]);
  const content = useMemo(() => [...normalized, ...normalized, ...normalized, ...normalized], [normalized]);
  const animationClass = direction === "up" ? "animate-marquee-up" : "animate-marquee-down";
  const duration = 1500 / speed;
  const aspectClass = aspect === "tall" ? "aspect-[4/6]" : "aspect-[4/5]";

  return (
    <div
      className={cn(
        "relative h-full overflow-hidden vertical-marquee-container group",
        className
      )}
    >
      <div
        className={cn("flex flex-col w-full", animationClass)}
        style={
          {
            "--marquee-duration": `${duration}s`,
            gap: gap,
          } as React.CSSProperties
        }
      >
        {content.map((item, i) => (
          <div
            key={i}
            className={cn(
              "relative w-full rounded-2xl overflow-hidden bg-gray-100 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:z-10",
              aspectClass
            )}
          >
            {item.type === "video" ? (
              <video
                src={item.src}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                autoPlay
              />
            ) : (
              <img
                src={item.src}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

type VerticalMarqueeGridProps = {
  columns: Array<{
    items: (string | MediaItem)[];
    speed?: number;
    direction?: "down" | "up";
    gap?: string;
    className?: string;
    aspect?: "normal" | "tall";
  }>;
  backgroundLines?: boolean;
  className?: string;
};

function VerticalMarqueeGrid({
  columns,
  backgroundLines = true,
  className,
}: VerticalMarqueeGridProps) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      {backgroundLines && (
        <div className="absolute inset-0 left-0 right-0 flex justify-between w-full max-w-[92%] mx-auto pointer-events-none z-0 opacity-20" style={{ marginLeft: "auto", marginRight: "auto" }}>
          {columns.map((_, i) => (
            <div key={i} className="h-full w-px border-r border-dashed border-black dark:border-white" />
          ))}
          <div className="h-full w-px border-r border-dashed border-black dark:border-white" />
        </div>
      )}

      <div className="absolute inset-0 left-0 right-0 flex flex-row justify-center items-stretch w-full h-full relative z-10">
        <div className="flex flex-row justify-center h-full w-full max-w-[92%] gap-2 sm:gap-4" style={{ marginLeft: "auto", marginRight: "auto" }}>
          {columns.map((colConfig, idx) => (
            <MarqueeColumn
              key={idx}
              {...colConfig}
              className={cn("flex-1 min-w-0 transition-all duration-500", colConfig.className)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** 5 sütun desktop; mobilde ortadaki 3 sütun. Tümü aşağı doğru (down). */
const gridConfiguration = [
  { items: MEDIA_SETS.set1, speed: 40, direction: "down" as const, gap: "1rem", aspect: "normal" as const, className: "hidden sm:block" },
  { items: MEDIA_SETS.set2, speed: 35, direction: "down" as const, gap: "1rem", aspect: "tall" as const },
  { items: MEDIA_SETS.set3, speed: 30, direction: "down" as const, gap: "1rem", aspect: "tall" as const },
  { items: MEDIA_SETS.set2, speed: 38, direction: "down" as const, gap: "1rem", aspect: "tall" as const },
  { items: MEDIA_SETS.set1, speed: 42, direction: "down" as const, gap: "1rem", aspect: "normal" as const, className: "hidden sm:block" },
];

export default function VerticalMarqueeHero() {
  return (
    <section
      className="relative min-h-[420px] w-full overflow-hidden bg-[#f7f7f7] antialiased sm:min-h-[520px] md:min-h-screen"
      style={{
        isolation: "isolate",
        contain: "paint",
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center">
        <div className="w-full h-[38vh] min-h-[280px] sm:min-h-[320px] md:h-[45vh] md:min-h-[400px] relative flex-1">
          <VerticalMarqueeGrid columns={gridConfiguration} />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
          isolation: "isolate",
        }}
      />

      <div
        className="absolute left-0 top-0 z-50 h-[200px] w-full bg-gradient-to-b from-[#f7f7f7] via-[#f7f7f7]/80 to-transparent md:hidden"
        style={{ top: "-2px", transform: "translateZ(0)", isolation: "isolate", pointerEvents: "none" }}
      />
      <div
        className="absolute bottom-0 left-0 z-50 h-[200px] w-full bg-gradient-to-t from-[#f7f7f7] via-[#f7f7f7]/80 to-transparent md:hidden"
        style={{ bottom: "-2px", transform: "translateZ(0)", isolation: "isolate", pointerEvents: "none" }}
      />
      <div
        className="absolute left-0 top-0 z-50 hidden h-[300px] w-full bg-gradient-to-b from-[#f7f7f7] via-[#f7f7f7]/80 to-transparent md:block"
        style={{ top: "-2px", transform: "translateZ(0)", isolation: "isolate", pointerEvents: "none" }}
      />
      <div
        className="absolute bottom-0 left-0 z-50 hidden h-[300px] w-full bg-gradient-to-t from-[#f7f7f7] via-[#f7f7f7]/80 to-transparent md:block"
        style={{ bottom: "-2px", transform: "translateZ(0)", isolation: "isolate", pointerEvents: "none" }}
      />
      <div
        className="absolute left-0 top-0 z-50 h-full w-[80px] bg-gradient-to-r from-[#f7f7f7] to-transparent md:w-[120px]"
        style={{ transform: "translateZ(0)", isolation: "isolate", pointerEvents: "none" }}
      />
      <div
        className="absolute right-0 top-0 z-50 h-full w-[80px] bg-gradient-to-l from-[#f7f7f7] to-transparent md:w-[120px]"
        style={{ transform: "translateZ(0)", isolation: "isolate", pointerEvents: "none" }}
      />
    </section>
  );
}
