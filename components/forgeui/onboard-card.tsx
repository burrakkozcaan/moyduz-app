"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Loader } from "lucide-react";

interface OnboardCardProps {
  duration?: number;
  step1?: string;
  step2?: string;
  step3?: string;
}

const OnboardCard = ({
  duration = 3000,
  step1 = "Hoş Geldiniz",
  step2 = "Bilgiler Doğrulanıyor",
  step3 = "Hesap Oluşturuldu",
}: OnboardCardProps) => {
  const [progress, setProgress] = useState(0);
  const [animateKey, setAnimateKey] = useState(0);

  useEffect(() => {
    const forward = setTimeout(() => setProgress(100), 100);
    const reset = setTimeout(() => {
      setProgress(0);
      setAnimateKey((k) => k + 1);
    }, duration + 2000);

    return () => {
      clearTimeout(forward);
      clearTimeout(reset);
    };
  }, [animateKey, duration]);

  return (
    <div
      className={cn(
        "relative",
        "flex flex-col items-center justify-center gap-1 p-1",
      )}
    >
      <div className="flex min-w-[250px] scale-[0.9] flex-col justify-center gap-2 rounded-md border border-ln-gray-200 dark:border-ln-gray-800 bg-gradient-to-br from-ln-gray-50 to-ln-gray-100 py-2 pl-3 pr-16 opacity-80 dark:from-ln-gray-800 dark:to-ln-gray-950">
        <div className="flex items-center justify-start gap-2 text-xs text-ln-gray-900 dark:text-ln-gray-0">
          <div>
            <Loader />
          </div>
          <div>{step3}</div>
        </div>
        <div className="ml-5 h-1.5 w-[100%] overflow-hidden text-left justify-start items-start rounded-full bg-ln-gray-200 dark:bg-ln-gray-700" />
      </div>
      <div className="bg-[#f05023] border border-ln-gray-100 flex min-w-[250px] flex-col justify-center gap-2 rounded-md py-2 pl-3 pr-16">
        <div className="flex items-center justify-start gap-1.5 text-xs text-white">
          <div className="animate-spin">
            <Loader className="text-white size-4" />
          </div>
          <div>{step2}</div>
        </div>
        <div className="ml-5 h-1.5 w-[100%] overflow-hidden rounded-full bg-white/20">
          <motion.div
            key={animateKey}
            className="h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: duration / 1000, ease: "easeInOut" }}
          />
        </div>
      </div>
      <div className="flex min-w-[250px] scale-[0.9] flex-col justify-center gap-2 rounded-md border border-ln-gray-200 dark:border-ln-gray-800 bg-gradient-to-br from-ln-gray-50 to-ln-gray-100 py-2 pl-3 pr-16 opacity-80 dark:from-ln-gray-800 dark:to-ln-gray-950">
        <div className="flex items-center justify-start text-xs text-ln-gray-900 dark:text-ln-gray-0">
          <div className="relative">
            <svg width="20" height="20">
              <circle cx="10" cy="10" r="5" fill="#22c55e" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <Check className="size-2" strokeWidth={3} />
            </div>
          </div>
          <div>{step1}</div>
        </div>
        <div className="ml-5 h-1.5 w-[100%] overflow-hidden rounded-full bg-green-500" />
      </div>
      <div className="absolute top-0 h-[40%] w-full [background-image:linear-gradient(to_bottom,lab(97_0.02_0)_20%,transparent_100%)]" />
      <div className="absolute bottom-0 h-[40%] w-full [background-image:linear-gradient(to_top,lab(97_0.02_0)_20%,transparent_100%)]" />
    </div>
  );
};

export default OnboardCard;
