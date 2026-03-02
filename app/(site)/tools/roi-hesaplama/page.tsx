'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ToolsPageShell, TOOLS_CARD_CLASS, TOOLS_BTN_PRIMARY_CLASS, TOOLS_BTN_SECONDARY_CLASS } from '@/components/ToolsPageShell'
import { ToolAIAnalysis } from '@/components/ToolAIAnalysis'

export default function ROIHesaplamaPage() {
  const [investment, setInvestment] = useState(30000)
  const [currentMonthlyRevenue, setCurrentMonthlyRevenue] = useState(50000)
  const [expectedGrowth, setExpectedGrowth] = useState(30)
  const [conversionImprovement, setConversionImprovement] = useState(20)
  const [months, setMonths] = useState(12)

  const monthlyRevenueIncrease = currentMonthlyRevenue * (expectedGrowth / 100)
  const conversionRevenue = currentMonthlyRevenue * (conversionImprovement / 100)
  const totalMonthlyGain = monthlyRevenueIncrease + conversionRevenue

  const totalGainOverPeriod = totalMonthlyGain * months
  const netGain = totalGainOverPeriod - investment
  const roi = investment > 0 ? ((netGain / investment) * 100) : 0
  const paybackMonths = totalMonthlyGain > 0 ? Math.ceil(investment / totalMonthlyGain) : 0

  const roiColor = roi >= 100 ? 'text-green-600' : roi >= 0 ? 'text-orange-600' : 'text-red-600'

  return (
    <ToolsPageShell
      title="E-Ticaret ROI Hesaplama"
      description="Yeni e-ticaret sisteminizin ne zaman kendini amorti edeceğini ve toplam getirisini hesaplayın."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Input */}
        <div className={`${TOOLS_CARD_CLASS} space-y-6`}>
          <h2 className="text-ln-label-lg font-semibold text-ln-gray-900 dark:text-ln-gray-0">
              Parametrelerinizi Girin
            </h2>

            {/* Investment */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
                Yatırım Tutarı: <span className="font-bold text-orange-600">{investment.toLocaleString('tr-TR')} ₺</span>
              </label>
              <input
                type="range"
                min={5000}
                max={200000}
                step={5000}
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
              <div className="flex justify-between text-xs text-ln-gray-500">
                <span>5.000 ₺</span>
                <span>200.000 ₺</span>
              </div>
            </div>

            {/* Current Revenue */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
                Mevcut Aylık Ciro: <span className="font-bold text-orange-600">{currentMonthlyRevenue.toLocaleString('tr-TR')} ₺</span>
              </label>
              <input
                type="range"
                min={10000}
                max={1000000}
                step={10000}
                value={currentMonthlyRevenue}
                onChange={(e) => setCurrentMonthlyRevenue(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
              <div className="flex justify-between text-xs text-ln-gray-500">
                <span>10.000 ₺</span>
                <span>1.000.000 ₺</span>
              </div>
            </div>

            {/* Expected Growth */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
                Beklenen Büyüme (yıllık): <span className="font-bold text-orange-600">%{expectedGrowth}</span>
              </label>
              <input
                type="range"
                min={5}
                max={100}
                step={5}
                value={expectedGrowth}
                onChange={(e) => setExpectedGrowth(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
              <div className="flex justify-between text-xs text-ln-gray-500">
                <span>%5</span>
                <span>%100</span>
              </div>
            </div>

            {/* Conversion Improvement */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
                Dönüşüm Artışı Beklentisi: <span className="font-bold text-orange-600">%{conversionImprovement}</span>
              </label>
              <input
                type="range"
                min={0}
                max={50}
                step={5}
                value={conversionImprovement}
                onChange={(e) => setConversionImprovement(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
              <div className="flex justify-between text-xs text-ln-gray-500">
                <span>%0</span>
                <span>%50</span>
              </div>
            </div>

            {/* Period */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
                Hesaplama Dönemi: <span className="font-bold text-orange-600">{months} ay</span>
              </label>
              <input
                type="range"
                min={6}
                max={36}
                step={6}
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
              <div className="flex justify-between text-xs text-ln-gray-500">
                <span>6 ay</span>
                <span>36 ay</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-5">
            {/* Main ROI Card */}
            <div className={TOOLS_CARD_CLASS}>
              <h3 className="text-ln-label-lg font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-5">
                Hesaplama Sonuçları
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-ln-gray-600 dark:text-ln-gray-400">Büyümeden kazanç ({months} ay)</span>
                  <span className="font-semibold text-ln-gray-900 dark:text-ln-gray-0">
                    {(monthlyRevenueIncrease * months).toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-ln-gray-600 dark:text-ln-gray-400">Dönüşüm artışından kazanç ({months} ay)</span>
                  <span className="font-semibold text-ln-gray-900 dark:text-ln-gray-0">
                    {(conversionRevenue * months).toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-ln-gray-200 dark:border-ln-gray-700 pt-3">
                  <span className="text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">Toplam Kazanç</span>
                  <span className="font-bold text-green-600">
                    +{totalGainOverPeriod.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">Yatırım</span>
                  <span className="font-bold text-red-600">
                    -{investment.toLocaleString('tr-TR')} ₺
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-ln-gray-200 dark:border-ln-gray-700 pt-3">
                  <span className="font-semibold text-ln-gray-700 dark:text-ln-gray-300">Net Kazanç</span>
                  <span className={`font-bold text-xl ${netGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {netGain >= 0 ? '+' : ''}{netGain.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺
                  </span>
                </div>
              </div>
            </div>

            {/* ROI Highlight */}
            <div className={`rounded-2xl p-6 text-center shadow-ln-xs ${roi >= 100 ? 'bg-green-600' : roi >= 0 ? 'bg-ln-orange' : 'bg-red-600'} text-ln-gray-0`}>
              <div className="text-sm font-medium mb-1 opacity-90">ROI (Yatırım Getirisi)</div>
              <div className="text-5xl font-bold mb-2">%{Math.round(roi)}</div>
              <div className="text-sm opacity-80">
                {paybackMonths > 0 && paybackMonths <= 36
                  ? `${paybackMonths} ayda amorti`
                  : paybackMonths === 0 ? 'Anında pozitif' : '36 aydan uzun amorti süresi'}
              </div>
            </div>

            {/* Monthly Summary */}
            <div className={TOOLS_CARD_CLASS}>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-ln-gray-600 dark:text-ln-gray-400">Aylık ek kazanç</span>
                <span className="font-semibold text-green-600">+{totalMonthlyGain.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺/ay</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ln-gray-600 dark:text-ln-gray-400">Geri ödeme süresi</span>
                <span className="font-semibold text-ln-gray-900 dark:text-ln-gray-0">{paybackMonths} ay</span>
              </div>
            </div>

            {/* AI Analysis */}
            <div className={TOOLS_CARD_CLASS}>
              <h4 className="font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-2">AI Değerlendirme</h4>
              <ToolAIAnalysis
                tool="roi"
                buildContext={() => `Yatırım: ${investment.toLocaleString('tr-TR')}₺, Mevcut aylık ciro: ${currentMonthlyRevenue.toLocaleString('tr-TR')}₺, Beklenen büyüme: %${expectedGrowth}, Dönüşüm artışı beklentisi: %${conversionImprovement}, Hesaplama dönemi: ${months} ay, Aylık ek kazanç: ${totalMonthlyGain.toFixed(0)}₺, Net kazanç: ${netGain.toFixed(0)}₺, ROI: %${Math.round(roi)}, Geri ödeme süresi: ${paybackMonths} ay`}
              />
            </div>

            {/* CTA */}
            <div className={TOOLS_CARD_CLASS}>
              <p className="text-ln-paragraph-sm text-ln-gray-600 dark:text-ln-gray-400 mb-4">
                Bu hesabı uzmanlarımızla değerlendirmek ister misiniz?
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/ozel-e-ticaret" className={`flex-1 justify-center ${TOOLS_BTN_PRIMARY_CLASS}`}>
                  Özel E-Ticaret
                </Link>
                <Link href="/contact" className={`flex-1 justify-center ${TOOLS_BTN_SECONDARY_CLASS}`}>
                  İletişime Geç
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-12 prose prose-lg max-w-none dark:prose-invert">
          <h2>ROI Hesaplama Nasıl Yapılır?</h2>
          <p>
            ROI (Return on Investment / Yatırım Getirisi), bir yatırımın ne kadar karlı olduğunu
            ölçen temel finansal metriktir. Formül şu şekildedir:
          </p>
          <blockquote>
            <strong>ROI = (Net Kazanç / Yatırım Tutarı) × 100</strong>
          </blockquote>
          <p>
            E-ticaret projeleri için ROI hesaplanırken büyüme artışı ve dönüşüm oranı iyileşmesi
            birlikte değerlendirilir. Daha detaylı okuma için{' '}
            <Link href="/blog/roi-nasil-hesaplanir">ROI Nasıl Hesaplanır?</Link> yazımızı inceleyin.
          </p>
          <p>
            Platform maliyetlerinizi de hesaplamak için{' '}
            <Link href="/tools/maliyet-hesaplama">E-Ticaret Maliyet Hesaplama Aracımızı</Link>{' '}
            kullanabilirsiniz.
          </p>
        </div>
    </ToolsPageShell>
  )
}
