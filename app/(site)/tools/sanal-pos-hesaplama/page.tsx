'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { ToolsPageShell, TOOLS_CARD_CLASS, TOOLS_BTN_PRIMARY_CLASS, TOOLS_BTN_SECONDARY_CLASS } from '@/components/ToolsPageShell'

function trackToolUsed(toolName: string) {
  if (typeof window === 'undefined') return
  if ((window as any).gtag) {
    (window as any).gtag('event', 'tool_used', { tool_name: toolName })
  }
  if (Array.isArray((window as any).dataLayer)) {
    (window as any).dataLayer.push({ event: 'tool_used', tool_name: toolName })
  }
}

const PROVIDERS = [
  {
    name: 'iyzico Başlangıç',
    color: 'blue',
    ratePercent: 2.9,
    perTransaction: 0.25,
    monthly: 0,
    note: '%2.9 + ₺0.25/işlem',
    minRevenue: 0,
  },
  {
    name: 'iyzico Büyüme',
    color: 'blue',
    ratePercent: 2.5,
    perTransaction: 0.25,
    monthly: 199,
    note: '%2.5 + ₺0.25/işlem + ₺199/ay',
    minRevenue: 0,
  },
  {
    name: 'PayTR',
    color: 'orange',
    ratePercent: 1.99,
    perTransaction: 0,
    monthly: 0,
    note: '%1.99, sabit ücret yok',
    minRevenue: 0,
  },
  {
    name: 'Shopier',
    color: 'purple',
    ratePercent: 2.99,
    perTransaction: 0,
    monthly: 0,
    note: '%2.99, kolay kurulum',
    minRevenue: 0,
  },
  {
    name: 'Banka POS',
    color: 'green',
    ratePercent: 1.5,
    perTransaction: 0,
    monthly: 0,
    note: '%1.5 ort. — 500K+ TL ciro şartı',
    minRevenue: 500000,
  },
]

function fmt(n: number) {
  return n.toLocaleString('tr-TR', { maximumFractionDigits: 0 })
}

export default function SanalPosHesaplamaPage() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(50000)
  const [transactionCount, setTransactionCount] = useState(100)
  const [avgBasket, setAvgBasket] = useState(500)
  const tracked = useRef(false)

  function onInteract() {
    if (!tracked.current) {
      tracked.current = true
      trackToolUsed('sanal-pos-hesaplama')
    }
  }

  // Derived inputs (avgBasket × txCount ≈ revenue, but we let user control all 3)
  const costs = PROVIDERS.map((p) => {
    const rateCost = (monthlyRevenue * p.ratePercent) / 100
    const txCost = transactionCount * p.perTransaction
    const total = rateCost + txCost + p.monthly
    const annualTotal = total * 12
    return { ...p, rateCost, txCost, total, annualTotal }
  })

  const sorted = [...costs].sort((a, b) => a.total - b.total)
  const cheapest = sorted[0]
  const mostExpensive = sorted[sorted.length - 1]
  const annualSaving = mostExpensive.annualTotal - cheapest.annualTotal

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  }

  const barColorMap: Record<string, string> = {
    blue: 'bg-blue-400',
    orange: 'bg-ln-orange',
    purple: 'bg-purple-400',
    green: 'bg-green-500',
  }

  const maxCost = Math.max(...costs.map((c) => c.total))

  return (
    <ToolsPageShell
      title="Sanal POS Maliyet Hesaplayıcı"
      description="iyzico, PayTR, Shopier ve Banka POS'u gerçek cirona göre karşılaştır. Yıllık tasarrufunu gör."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className={`${TOOLS_CARD_CLASS} space-y-6`}>
          <h2 className="text-base font-semibold text-ln-gray-900 dark:text-ln-gray-0">
            İşletme Bilgileri
          </h2>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
              Aylık Ciro:{' '}
              <span className="font-bold text-ln-orange">{fmt(monthlyRevenue)} ₺</span>
            </label>
            <input
              type="range" min={5000} max={2000000} step={5000}
              value={monthlyRevenue}
              onChange={(e) => { onInteract(); setMonthlyRevenue(Number(e.target.value)) }}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-xs text-ln-gray-400">
              <span>5K ₺</span><span>2M ₺</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
              Aylık İşlem Sayısı:{' '}
              <span className="font-bold text-ln-orange">{transactionCount} işlem</span>
            </label>
            <input
              type="range" min={10} max={5000} step={10}
              value={transactionCount}
              onChange={(e) => setTransactionCount(Number(e.target.value))}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-xs text-ln-gray-400">
              <span>10</span><span>5.000</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
              Ortalama Sepet Tutarı:{' '}
              <span className="font-bold text-ln-orange">{fmt(avgBasket)} ₺</span>
            </label>
            <input
              type="range" min={50} max={10000} step={50}
              value={avgBasket}
              onChange={(e) => setAvgBasket(Number(e.target.value))}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-xs text-ln-gray-400">
              <span>50 ₺</span><span>10.000 ₺</span>
            </div>
          </div>

          {/* Summary stats */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="rounded-xl bg-ln-gray-50 dark:bg-ln-gray-800/50 p-3 text-center">
              <p className="text-xs text-ln-gray-500 dark:text-ln-gray-400">Hesaplanan ort. sepet</p>
              <p className="mt-0.5 text-base font-bold text-ln-gray-900 dark:text-ln-gray-0">
                {transactionCount > 0 ? fmt(monthlyRevenue / transactionCount) : 0} ₺
              </p>
            </div>
            <div className="rounded-xl bg-ln-gray-50 dark:bg-ln-gray-800/50 p-3 text-center">
              <p className="text-xs text-ln-gray-500 dark:text-ln-gray-400">Yıllık ciro</p>
              <p className="mt-0.5 text-base font-bold text-ln-gray-900 dark:text-ln-gray-0">
                {fmt(monthlyRevenue * 12)} ₺
              </p>
            </div>
          </div>

          {monthlyRevenue < 500000 && (
            <p className="rounded-lg border border-yellow-200 bg-yellow-50/60 dark:border-yellow-800/40 dark:bg-yellow-950/20 px-3 py-2 text-xs text-yellow-800 dark:text-yellow-300">
              ⚡ Banka POS genellikle 500K+ TL/ay ciro şartı arar — karşılaştırmada referans olarak gösterilir.
            </p>
          )}
        </div>

        {/* Results */}
        <div className="space-y-4">
          {/* Best/Worst highlight */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-green-200 bg-green-50/60 dark:border-green-800/40 dark:bg-green-950/20 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-green-700 dark:text-green-400">En Uygun</p>
              <p className="mt-1 text-base font-bold text-green-800 dark:text-green-300">{cheapest.name}</p>
              <p className="text-xl font-bold text-green-700 dark:text-green-400">{fmt(cheapest.total)} ₺/ay</p>
            </div>
            <div className="rounded-xl border border-ln-gray-200 bg-ln-gray-50 dark:border-ln-gray-800 dark:bg-ln-gray-900 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ln-orange">Yıllık Tasarruf</p>
              <p className="mt-1 text-xs text-ln-gray-500 dark:text-ln-gray-400">En ucuz vs en pahalı</p>
              <p className="text-xl font-bold text-ln-orange">{fmt(annualSaving)} ₺</p>
            </div>
          </div>

          {/* Provider breakdown */}
          <div className={`${TOOLS_CARD_CLASS} space-y-4`}>
            <h3 className="text-sm font-semibold text-ln-gray-900 dark:text-ln-gray-0">
              Aylık Maliyet Karşılaştırması
            </h3>
            {sorted.map((p) => {
              const barWidth = maxCost > 0 ? (p.total / maxCost) * 100 : 0
              const isCheapest = p.name === cheapest.name
              return (
                <div key={p.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-md px-2 py-0.5 text-xs font-medium ${colorMap[p.color]}`}
                      >
                        {p.name}
                      </span>
                      {isCheapest && (
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium">✓ En ucuz</span>
                      )}
                    </div>
                    <span className="font-semibold text-ln-gray-900 dark:text-ln-gray-0">
                      {fmt(p.total)} ₺/ay
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-ln-gray-100 dark:bg-ln-gray-800">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${barColorMap[p.color]}`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                  <p className="text-xs text-ln-gray-400 dark:text-ln-gray-500">{p.note}</p>
                </div>
              )
            })}
          </div>

          {/* Annual table */}
          <div className={TOOLS_CARD_CLASS}>
            <h3 className="mb-3 text-sm font-semibold text-ln-gray-900 dark:text-ln-gray-0">
              Yıllık Maliyet Tablosu
            </h3>
            <div className="space-y-2">
              {sorted.map((p) => (
                <div key={p.name} className="flex justify-between text-sm">
                  <span className="text-ln-gray-600 dark:text-ln-gray-400">{p.name}</span>
                  <span className="font-semibold text-ln-gray-900 dark:text-ln-gray-0">
                    {fmt(p.annualTotal)} ₺/yıl
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className={TOOLS_CARD_CLASS}>
            <p className="text-sm text-ln-gray-600 dark:text-ln-gray-400 mb-3">
              Ödeme altyapınızı Moyduz ile kurun — doğru sağlayıcı seçimi, entegrasyon ve optimizasyon.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link href="/rehber/odeme-sistemleri" className={`flex-1 justify-center ${TOOLS_BTN_PRIMARY_CLASS}`}>
                Ödeme Rehberi →
              </Link>
              <Link href="/blog/paytr-vs-iyzico" className={`flex-1 justify-center ${TOOLS_BTN_SECONDARY_CLASS}`}>
                iyzico vs PayTR
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ToolsPageShell>
  )
}
