"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";

const CursorIcon = ({ className }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.07106 22.3564C5.43676 22.9713 4.375 22.5219 4.375 21.6384V2.41607C4.375 1.52499 5.45249 1.0789 6.08235 1.70921L20.0314 15.668C20.6663 16.3033 20.2067 17.3886 19.3086 17.3747L11.7311 17.2577C11.4419 17.2532 11.1659 17.3783 10.9786 17.5987L6.07106 22.3564Z"
      fill="currentColor"
    />
    <path
      d="M4.375 2.41598C4.37504 1.52507 5.45215 1.07906 6.08204 1.70895L20.0314 15.6679C20.6663 16.3033 20.2068 17.3888 19.3087 17.375L11.7315 17.2578C11.4423 17.2533 11.1659 17.3782 10.9786 17.5986L6.0713 22.3564C5.43706 22.9713 4.37522 22.5219 4.375 21.6386V2.41598ZM5.70509 20.8584L10.0528 16.6435C10.4937 16.1799 11.1084 15.9178 11.752 15.9277L18.5147 16.0322L5.70509 3.21285V20.8584Z"
      fill="#FAFAFA"
      className="dark:fill-ln-gray-800"
    />
  </svg>
);

const CURSORS = [
  {
    name: "Selin",
    color: "#653D9A",
    bgClass: "bg-[#653D9A]",
    positionClass: "left-[20%] top-[6%] sm:left-[28%] sm:top-[12%] md:left-auto md:right-[80px] md:top-[18%]",
    floatDelay: 0,
  },
  {
    name: "Ahmet",
    color: "#31855F",
    bgClass: "bg-[#31855F]",
    positionClass: "left-[6%] top-[68%] sm:left-[12%] sm:top-[70%] md:left-[40px] md:top-[18%]",
    floatDelay: 0.3,
  },
  {
    name: "Murat",
    color: "#91213D",
    bgClass: "bg-[#91213D]",
    positionClass: "right-[18%] top-[58%] sm:right-[22%] sm:top-[62%] md:left-1/2 md:right-auto md:top-[78%] md:-translate-x-1/2",
    floatDelay: 0.6,
  },
] as const;

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const cursorItem = {
  hidden: { opacity: 0, scale: 0.85, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function BuiltForTeamsSection() {
  return (
    <div className="overflow-x-clip">
      <motion.section
        className="container relative mx-auto px-4 py-16 md:py-24 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2, margin: "-40px" }}
        variants={container}
      >
        {/* Cursor avatars – fixed positions, no mouse-driven transform */}
        <div className="pointer-events-none absolute inset-0 min-h-[320px] md:min-h-[380px]" aria-hidden>
          {CURSORS.map((c) => (
            <motion.div
              key={c.name}
              className={`absolute z-10 ${c.positionClass}`}
              variants={cursorItem}
              animate={{
                y: [0, -6, 0],
                transition: {
                  y: {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: c.floatDelay,
                  },
                },
              }}
            >
              <div className="relative" style={{ color: c.color }}>
                <CursorIcon />
                <div
                  className={`absolute bottom-0 right-0 flex h-[30px] translate-x-full translate-y-full items-center justify-center rounded-full px-3 font-medium text-white shadow-sm ${c.bgClass}`}
                >
                  {c.name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="relative z-20 flex flex-col items-center pt-4 md:pt-6">
          <motion.p
            variants={item}
            className="text-center text-3xl font-semibold tracking-tight text-ln-gray-900 dark:text-ln-gray-0 md:text-4xl"
          >
            Ekibinizle birlikte çalışıyoruz
          </motion.p>
          <motion.p
            variants={item}
            className="mx-auto max-w-[490px] pb-8 pt-3 text-center text-base leading-relaxed text-ln-gray-600 dark:text-ln-gray-400 md:w-full md:pb-10 md:text-lg"
          >
            Ekiplerimizle çalışacaksınız. Proje başlangıcından lansmana kadar sizi süreçten haberdar tutuyoruz. Geri bildirim paylaşın, ilerlemeyi takip edin, her kilometre taşında aynı hizada olun—tam ihtiyacınız olanı teslim ediyoruz.
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-2.5">
            <Link
              href="/#pricing"
              className="inline-flex h-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-ln-gray-100 px-[18px] py-[9px] text-base font-medium text-ln-gray-900 transition-colors duration-200 hover:bg-ln-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ln-gray-400 dark:bg-ln-gray-800 dark:text-ln-gray-0 dark:hover:bg-ln-gray-700 dark:focus-visible:ring-ln-gray-500"
            >
              Ücretsiz başlayın
            </Link>
            <Link
              href="/#pricing"
              className="inline-flex h-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#f05023] px-[18px] py-[9px] text-base font-medium text-white transition-colors duration-200 hover:bg-[#d9451a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f05023] focus-visible:ring-offset-2 disabled:opacity-60"
            >
              Fiyatlandırmayı görün
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
