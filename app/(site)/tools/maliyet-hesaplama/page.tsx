'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ToolsPageShell, TOOLS_CARD_CLASS, TOOLS_BTN_PRIMARY_CLASS, TOOLS_BTN_SECONDARY_CLASS } from '@/components/ToolsPageShell'
import { ToolAIAnalysis } from '@/components/ToolAIAnalysis'

const PLATFORM_COSTS: Record<string, { monthly: number; commission: number; label: string }> = {
  shopify_basic: { monthly: 899, commission: 2.0, label: 'Shopify Basic' },
  shopify_pro: { monthly: 2499, commission: 1.0, label: 'Shopify Pro' },
  ikas_starter: { monthly: 499, commission: 0, label: 'ikas Starter' },
  ikas_pro: { monthly: 1299, commission: 0, label: 'ikas Pro' },
  woocommerce: { monthly: 300, commission: 0, label: 'WooCommerce (hosting)' },
  custom: { monthly: 0, commission: 0, label: 'Özel Yazılım (Moyduz)' },
}

export default function MaliyetHesaplamaPage() {
  const [platform, setPlatform] = useState('shopify_basic')
  const [monthlySales, setMonthlySales] = useState(50000)
  const [products, setProducts] = useState(500)
  const [plugins, setPlugins] = useState(3)
  const [years, setYears] = useState(3)

  const p = PLATFORM_COSTS[platform]
  const pluginCost = plugins * 150
  const commissionCost = (monthlySales * p.commission) / 100
  const monthlyTotal = p.monthly + pluginCost + commissionCost
  const yearlyTotal = monthlyTotal * 12
  const totalOverYears = yearlyTotal * years

  const customDevCost = products > 1000 ? 45000 : products > 200 ? 28000 : 18000
  const customMonthlyCost = 500 // hosting + maintenance
  const customTotalOverYears = customDevCost + customMonthlyCost * 12 * years

  const savings = totalOverYears - customTotalOverYears
  const savingsPerMonth = savings / (years * 12)

  return (
    <ToolsPageShell
      title="E-Ticaret Maliyet Hesaplama"
      description="Platform maliyetlerinizi hesaplayın ve özel yazılımla ne kadar tasarruf edebileceğinizi görün."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Calculator Input */}
        <div className={`${TOOLS_CARD_CLASS} space-y-6`}>
          <h2 className="text-ln-label-lg font-semibold text-ln-gray-900 dark:text-ln-gray-0">
              Parametrelerinizi Girin
            </h2>

            {/* Platform */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
                Mevcut / Planlanan Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full rounded-lg border border-ln-gray-300 dark:border-ln-gray-700 bg-white dark:bg-ln-gray-800 px-3 py-2 text-ln-gray-900 dark:text-ln-gray-0 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {Object.entries(PLATFORM_COSTS).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
            </div>

            {/* Monthly Sales */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
                Aylık Satış Cirosu: <span className="font-bold text-ln-orange">{monthlySales.toLocaleString('tr-TR')} ₺</span>
              </label>
              <input
                type="range"
                min={5000}
                max={500000}
                step={5000}
                value={monthlySales}
                onChange={(e) => setMonthlySales(Number(e.target.value))}
                className="w-full accent-ln-orange"
              />
              <div className="flex justify-between text-xs text-ln-gray-500">
                <span>5.000 ₺</span>
                <span>500.000 ₺</span>
              </div>
            </div>

            {/* Products */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
                Ürün Sayısı: <span className="font-bold text-ln-orange">{products}</span>
              </label>
              <input
                type="range"
                min={10}
                max={10000}
                step={10}
                value={products}
                onChange={(e) => setProducts(Number(e.target.value))}
                className="w-full accent-ln-orange"
              />
              <div className="flex justify-between text-xs text-ln-gray-500">
                <span>10</span>
                <span>10.000+</span>
              </div>
            </div>

            {/* Plugins */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
                Eklenti Sayısı: <span className="font-bold text-ln-orange">{plugins}</span>
              </label>
              <input
                type="range"
                min={0}
                max={20}
                step={1}
                value={plugins}
                onChange={(e) => setPlugins(Number(e.target.value))}
                className="w-full accent-ln-orange"
              />
              <div className="flex justify-between text-xs text-ln-gray-500">
                <span>0</span>
                <span>20+</span>
              </div>
            </div>

            {/* Years */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
                Hesaplama Periyodu: <span className="font-bold text-ln-orange">{years} yıl</span>
              </label>
              <input
                type="range"
                min={1}
                max={5}
                step={1}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full accent-ln-orange"
              />
              <div className="flex justify-between text-xs text-ln-gray-500">
                <span>1 yıl</span>
                <span>5 yıl</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Current Platform Cost */}
            <div className={TOOLS_CARD_CLASS}>
              <h3 className="text-ln-label-lg font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-4">
                {PLATFORM_COSTS[platform].label} Maliyeti
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-ln-gray-600 dark:text-ln-gray-400">Aylık lisans ücreti</span>
                  <span className="font-medium text-ln-gray-900 dark:text-ln-gray-0">{p.monthly.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ln-gray-600 dark:text-ln-gray-400">Eklentiler ({plugins} adet)</span>
                  <span className="font-medium text-ln-gray-900 dark:text-ln-gray-0">{pluginCost.toLocaleString('tr-TR')} ₺</span>
                </div>
                {p.commission > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-ln-gray-600 dark:text-ln-gray-400">Satış komisyonu (%{p.commission})</span>
                    <span className="font-medium text-ln-red">{commissionCost.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺/ay</span>
                  </div>
                )}
                <div className="border-t border-ln-gray-200 dark:border-ln-gray-700 pt-3 flex justify-between text-sm">
                  <span className="font-medium text-ln-gray-700 dark:text-ln-gray-300">Aylık toplam</span>
                  <span className="font-bold text-ln-gray-900 dark:text-ln-gray-0">{monthlyTotal.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-ln-gray-700 dark:text-ln-gray-300">Yıllık toplam</span>
                  <span className="font-bold text-ln-gray-900 dark:text-ln-gray-0">{yearlyTotal.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-ln-gray-700 dark:text-ln-gray-300">{years} yıllık toplam</span>
                  <span className="font-bold text-xl text-ln-red">{totalOverYears.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                </div>
              </div>
            </div>

            {/* Custom Software Cost */}
            <div className={`${TOOLS_CARD_CLASS} ring-green-200 dark:ring-green-800/50 bg-green-50/50 dark:bg-green-900/20`}>
              <h3 className="text-lg font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-4">
                Moyduz Özel Yazılım
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-ln-gray-600 dark:text-ln-gray-400">Geliştirme (tek seferlik)</span>
                  <span className="font-medium text-ln-gray-900 dark:text-ln-gray-0">{customDevCost.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ln-gray-600 dark:text-ln-gray-400">Aylık hosting + bakım</span>
                  <span className="font-medium text-ln-gray-900 dark:text-ln-gray-0">{customMonthlyCost.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ln-gray-600 dark:text-ln-gray-400">Satış komisyonu</span>
                  <span className="font-medium text-green-600">0 ₺</span>
                </div>
                <div className="border-t border-green-200 dark:border-green-700 pt-3 flex justify-between">
                  <span className="font-semibold text-ln-gray-700 dark:text-ln-gray-300">{years} yıllık toplam</span>
                  <span className="font-bold text-xl text-green-600">{customTotalOverYears.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                </div>
              </div>
            </div>

            {/* Savings */}
            {savings > 0 && platform !== 'custom' && (
              <div className="rounded-2xl bg-ln-orange p-6 text-ln-gray-0 text-center shadow-ln-xs">
                <div className="text-sm font-medium mb-1 opacity-90">Özel yazılımla {years} yılda tasarruf</div>
                <div className="text-4xl font-bold mb-2">{savings.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</div>
                <div className="text-sm opacity-80">({savingsPerMonth.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺/ay)</div>
              </div>
            )}

            {/* AI Analysis */}
            <div className={TOOLS_CARD_CLASS}>
              <h4 className="font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-2">AI Değerlendirme</h4>
              <ToolAIAnalysis
                tool="maliyet"
                buildContext={() => `Platform: ${PLATFORM_COSTS[platform].label}, Aylık ciro: ${monthlySales.toLocaleString('tr-TR')}₺, Ürün sayısı: ${products}, Eklenti: ${plugins} adet, ${years} yıllık platform maliyeti: ${totalOverYears.toLocaleString('tr-TR')}₺, Moyduz özel yazılım ${years} yıllık: ${customTotalOverYears.toLocaleString('tr-TR')}₺, ${savings > 0 && platform !== 'custom' ? `Özel yazılımla tasarruf: ${savings.toLocaleString('tr-TR')}₺ (${savingsPerMonth.toFixed(0)}₺/ay)` : 'Zaten özel yazılım seçilmiş'}`}
              />
            </div>

            {/* CTA */}
            <div className={TOOLS_CARD_CLASS}>
              <p className="text-ln-paragraph-sm text-ln-gray-600 dark:text-ln-gray-400 mb-4">
                Hesaplama sonuçlarını bir uzmanla değerlendirmek ister misiniz?
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/pricing" className={`flex-1 justify-center ${TOOLS_BTN_PRIMARY_CLASS}`}>
                  Fiyatları Gör
                </Link>
                <Link href="/contact" className={`flex-1 justify-center ${TOOLS_BTN_SECONDARY_CLASS}`}>
                  Ücretsiz Danışmanlık
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 prose prose-lg max-w-none dark:prose-invert">
          <h2>E-Ticaret Maliyet Hesaplama Hakkında</h2>
          <p>
            E-ticaret platformu seçimi, gizli maliyetleri nedeniyle çoğu zaman yanlış hesaplanır.
            Aylık lisans ücretinin yanı sıra satış komisyonları, zorunlu eklentiler ve geliştirici
            maliyetleri zamanla önemli rakamlara ulaşır.
          </p>
          <p>
            Bu hesaplama aracı, mevcut platformunuzun{' '}
            <Link href="/ozel-e-ticaret">özel e-ticaret yazılımıyla</Link> karşılaştırmalı toplam
            sahip olma maliyetini (TCO - Total Cost of Ownership) görmenizi sağlar.
          </p>
          <h3>Hesaplamada Neler Dahil?</h3>
          <ul>
            <li><strong>Platform lisans ücreti:</strong> Aylık abonelik ücreti</li>
            <li><strong>Satış komisyonu:</strong> Her satıştan kesilen yüzde</li>
            <li><strong>Eklenti maliyetleri:</strong> Ortalama eklenti başına ~150 ₺/ay</li>
            <li><strong>Geliştirme maliyeti:</strong> Özel yazılım için tek seferlik bedel</li>
          </ul>
          <p>
            Daha detaylı analiz için{' '}
            <Link href="/blog/e-ticaret-maliyet-hesaplama">E-Ticaret Maliyet Rehberi</Link> yazımızı
            okuyabilir ya da{' '}
            <Link href="/tools/roi-hesaplama">ROI Hesaplama Aracımızı</Link> deneyebilirsiniz.
          </p>
        </div>
    </ToolsPageShell>
  )
}
