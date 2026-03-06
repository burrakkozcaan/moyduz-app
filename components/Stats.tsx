"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { DottedMapWithMarkers } from "@/components/DottedMapWithMarkers";

const viewportOnce = { once: true, amount: 0.15 };

export default function Stats() {
  return (
    <motion.section
      id="metrics"
      className="flex flex-col items-center gap-[70px] w-full relative overflow-hidden z-[1] px-5 md:px-[100px] py-8 md:py-12"
      style={{ height: "min-content" }}
      initial={{ opacity: 0, y: 50, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={viewportOnce}
      transition={{ type: "spring", duration: 0.8, bounce: 0.01 }}
    >
      <div className="flex flex-col items-center gap-[43px] w-full max-w-[1100px]">
        <div className="w-full max-w-[600px]  overflow-hidden bg-gradient-to-b from-ln-gray-50/50 to-transparent">
          <DottedMapWithMarkers className="w-full" />
        </div>
        <div className="text-center">
          <Badge
            variant="outline"
            className="mb-4 rounded-full border-ln-gray-200 bg-ln-gray-50 px-3 py-1 text-xs font-medium text-ln-gray-700"
          >
            Küresel güven
          </Badge>
          <h2 className="text-black text-[32px] md:text-[40px] lg:text-4xl leading-[1.1] tracking-[-0.02em] font-semibold md:leading-tight">
            Dünya genelinde{" "}
            <span className="text-ln-orange">1.200&apos;den fazla</span> işletmenin tercihi
          </h2>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full border border-ln-gray-200 bg-ln-gray-50 px-3 py-1 text-xs font-medium text-ln-gray-700">
              Girişimler
            </span>
            <span className="rounded-full border border-[#ff4d00]/20 bg-ln-orange/10 px-3 py-1 text-xs font-medium text-[#ff4d00]">
              Kurumsal
            </span>
            <span className="rounded-full border border-ln-gray-200 bg-ln-gray-50 px-3 py-1 text-xs font-medium text-ln-gray-700">
              Ajanslar
            </span>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[800px]">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ type: "spring", duration: 0.6, bounce: 0.05 }}
            >
              <h3 className="text-black text-lg md:text-xl font-semibold mb-2">
                Uzun Vadeli Ortaklıklar
              </h3>
              <p className="text-ln-gray-700 text-sm md:text-base">
                Güven, tutarlılık ve yüksek kaliteli teslimat ile uzun vadeli ortaklıklar kurmaya odaklanıyoruz.
              </p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ type: "spring", duration: 0.6, bounce: 0.05, delay: 0.1 }}
            >
              <h3 className="text-black text-lg md:text-xl font-semibold mb-2">
                Yüksek Performanslı Dijital Ürünler
              </h3>
              <p className="text-ln-gray-700 text-sm md:text-base">
                Çalışmalarımız, yüksek performanslı dijital ürünler sunmak için hız, güvenilirlik ve ölçeklenebilirliği ön planda tutar.
              </p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ type: "spring", duration: 0.6, bounce: 0.05, delay: 0.2 }}
            >
              <h3 className="text-black text-lg md:text-xl font-semibold mb-2">
                Ölçülebilir İş Sonuçları
              </h3>
              <p className="text-ln-gray-700 text-sm md:text-base">
                Başarıyı gerçek sonuçlar, performans artışları ve iş etkisi üzerinden ölçüyoruz.
              </p>
            </motion.div>
          </div>
        </div>
        <div className="flex w-full items-stretch md:items-center justify-between flex-col md:flex-row gap-8 md:gap-0">
          <motion.div
            className="flex flex-col items-start gap-[5px] w-min h-min"
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={viewportOnce}
            transition={{ type: "spring", duration: 0.8, bounce: 0.01 }}
          >
            <p className="text-black text-[52px] md:text-[65px] leading-[1.2] tracking-[-0.05em] font-semibold text-left">
              99.7%
            </p>
            <p className="text-ln-gray-700 text-base md:text-lg text-left">Teslim Edilen Proje</p>
          </motion.div>
          <motion.div
            className="flex flex-col items-start gap-[5px] w-min h-min"
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={viewportOnce}
            transition={{ type: "spring", duration: 0.8, bounce: 0.01, delay: 0.1 }}
          >
            <p className="text-black text-[52px] md:text-[65px] leading-[1.2] tracking-[-0.05em] font-semibold text-left">
              $250M+
            </p>
            <p className="text-ln-gray-700 text-base md:text-lg text-left">Müşteri Etkileşimi</p>
          </motion.div>
          <motion.div
            className="flex flex-col items-start gap-[5px] w-min h-min"
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={viewportOnce}
            transition={{ type: "spring", duration: 0.8, bounce: 0.01, delay: 0.2 }}
          >
            <p className="text-black text-[52px] md:text-[65px] leading-[1.2] tracking-[-0.05em] font-semibold text-left">
              120+
            </p>
            <p className="text-ln-gray-700 text-base md:text-lg text-left">Otomatik İş Akışı</p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
