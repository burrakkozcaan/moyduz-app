"use client";

import { cn } from "@/lib/utils";
import { motion, Variants } from "motion/react";
import { CircleDot } from "lucide-react";
import { Cross } from "lucide-react";

type BlockedEmail = {
  email: string;
  time: string;
};

type FraudCardProps = {
  blockedEmails: BlockedEmail[];
};

const FraudCard = ({ blockedEmails }: FraudCardProps) => {
  const parentvariant = {
    open: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
    close: {
      transition: {
        staggerChildren: 0.075,
        delayChildren: 0.15,
      },
    },
  };

  const emailvariant = {
    open: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.3 },
    },
    close: {
      opacity: 0,
      filter: "blur(10px)",
      y: 5,
      transition: { duration: 0.3 },
    },
  };

  const iconvariant = {
    open: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    close: {
      opacity: 0,
      scale: 0.85,
      transition: { duration: 0.3 },
    },
  };

  const timevariant = {
    open: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.3 },
    },
    close: {
      opacity: 0,
      filter: "blur(5px)",
      y: 10,
      transition: { duration: 0.3 },
    },
  };

  const circlevariant: Variants = {
    open: {
      rotate: 360,
      transition: {
        ease: "linear",
        duration: 2.5,
        repeat: Number.POSITIVE_INFINITY,
      },
    },
    close: {
      rotate: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.1,
        repeat: 0,
      },
    },
  };

  return (
    <motion.div
      variants={parentvariant}
      animate="open"
      initial="open"
      className={cn(
        "h-full min-h-[34rem] w-full max-w-[450px]",
        "group overflow-hidden border  ",
        "clbeam-container relative flex flex-col items-center",
        "rounded-xl bg-ln-gray-25 text-ln-gray-900 dark:bg-ln-gray-900 dark:text-ln-gray-0",
      )}
    >
      <div className={cn("flex flex-col gap-2 px-4 pt-4")}>
        <h2 className="text-sm font-bold text-ln-gray-900 dark:text-ln-gray-0">
          E-posta Güvenliği
        </h2>
        <p className="text-[11px] text-ln-gray-600 dark:text-ln-gray-400 sm:text-xs">
          Geçici e-posta adreslerini tespit ederek ve kullanılan e-posta
          adreslerindeki şüpheli desenleri filtreleyerek hesap bütünlüğünü
          artırın, sahte kayıtları azaltın.
        </p>
      </div>
      <div className="relative flex h-full w-[300px] flex-col">
        <div className="mt-8 py-3">
          <div className="relative z-[10] flex items-center justify-center gap-2 rounded-[6px] bg-ln-gray-25 p-0.5  dark:bg-ln-gray-950">
            <div className="flex rounded-xl p-2 m-2 h-full w-full items-center justify-between gap-3 rounded-[4px] bg-ln-gray-100 p-3 dark:bg-ln-gray-800">
              <div className="flex items-center justify-center gap-4">
                <motion.div variants={circlevariant} className="h-4 w-4">
                  <CircleDot className="h-full w-full text-ln-gray-900 dark:text-ln-gray-0" />
                </motion.div>
                <p className="font-mono text-[10px] text-ln-gray-600 transition-all duration-300 group-hover:text-ln-gray-900 dark:text-ln-gray-400 dark:group-hover:text-ln-gray-100">
                  Şüpheli e-posta etkinliği işaretlendi
                </p>
              </div>
              <p className="text-[10px] text-ln-gray-500">
                {new Date().toLocaleTimeString("tr-TR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 h-full w-full">
          <svg
            className="h-full w-full stroke-current text-ln-gray-400 dark:text-ln-gray-700"
            width="100%"
            height="100%"
            viewBox="0 0 52 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g strokeWidth="0.1">
              <path d="M 3.7 0 v 5.8 l 6.7 5.9 v 60" />
            </g>
            <g mask="url(#clbeam-mask-1)">
              <circle
                className="clbeam clbeam-line-1"
                cx="0"
                cy="0"
                r="12"
                fill="url(#clbeam-red-grad)"
              />
            </g>
            <defs>
              <mask id="clbeam-mask-1">
                <path
                  d="M 3.7 0 v 5.8 l 6.7 5.9 v 60"
                  stroke="white"
                  strokeWidth="0.15"
                />
              </mask>
              <radialGradient id="clbeam-red-grad" fx="1">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute inset-x-12 top-[130px] flex w-fit flex-col items-center justify-center">
          <div className="flex h-full w-full flex-col items-center justify-center gap-9">
            {blockedEmails.map(({ email, time }) => (
              <div key={email} className="flex h-full w-full justify-start">
                <div className="relative mr-2 mt-1.5 h-6 w-6">
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/10 dark:bg-white/10">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-current text-ln-gray-400 dark:text-ln-gray-500" />
                  </div>
                  <motion.div
                    variants={iconvariant}
                    className="absolute inset-0 flex items-center justify-center rounded-full bg-red-500 p-1"
                  >
                    <Cross className="h-4 w-4 text-neutral-100 dark:text-neutral-800" />
                  </motion.div>
                </div>
                <div className="flex flex-col items-start justify-center gap-1 p-1">
                  <motion.h2
                    variants={emailvariant}
                    className="text-[10px] font-semibold text-ln-gray-800 dark:text-ln-gray-200 sm:text-xs"
                  >
                    {email}
                  </motion.h2>
                  <motion.p
                    variants={timevariant}
                    className="font-mono text-[9px] text-ln-gray-500"
                  >
                    Engellendi {time}
                  </motion.p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FraudCard;
