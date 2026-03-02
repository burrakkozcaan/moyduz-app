'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ToolsPageShell, TOOLS_CARD_CLASS, TOOLS_BTN_PRIMARY_CLASS, TOOLS_BTN_SECONDARY_CLASS } from '@/components/ToolsPageShell'
import { ToolAIAnalysis } from '@/components/ToolAIAnalysis'

// Approximate 2026 rates per desi for major Turkish cargo companies (standard commercial)
const CARGO_COMPANIES: Array<{
  name: string
  pricePerDesi: number
  minCharge: number
  note: string
  color: string
}> = [
  { name: 'Sendeo', pricePerDesi: 11.5, minCharge: 35, note: 'E-ticaret odaklı', color: 'text-purple-600' },
  { name: 'PTT Kargo', pricePerDesi: 12.5, minCharge: 38, note: 'Devlet güvencesi', color: 'text-red-600' },
  { name: 'Aras Kargo', pricePerDesi: 13.5, minCharge: 42, note: 'Yaygın ağ', color: 'text-orange-600' },
  { name: 'Sürat Kargo', pricePerDesi: 14.0, minCharge: 44, note: 'Hızlı teslimat', color: 'text-blue-600' },
  { name: 'MNG Kargo', pricePerDesi: 14.5, minCharge: 45, note: 'Geniş ağ', color: 'text-yellow-700' },
  { name: 'Yurtiçi Kargo', pricePerDesi: 15.0, minCharge: 48, note: 'Köklü marka', color: 'text-green-700' },
]

const DESI_DIVISOR = 3000

export default function KargoUcretiHesaplamaPage() {
  const [length, setLength] = useState(30)
  const [width, setWidth] = useState(20)
  const [height, setHeight] = useState(15)
  const [weight, setWeight] = useState(2)
  const [monthlySales, setMonthlySales] = useState(200)
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)

  const volumetricWeight = (length * width * height) / DESI_DIVISOR
  const billedWeight = Math.max(volumetricWeight, weight)

  const comparisons = CARGO_COMPANIES.map((c) => {
    const cost = Math.max(billedWeight * c.pricePerDesi, c.minCharge)
    const monthlyCost = cost * monthlySales
    const yearlyCost = monthlyCost * 12
    return { ...c, cost, monthlyCost, yearlyCost }
  }).sort((a, b) => a.cost - b.cost)

  const cheapest = comparisons[0]
  const mostExpensive = comparisons[comparisons.length - 1]
  const maxSavingsPerShipment = mostExpensive.cost - cheapest.cost
  const maxMonthlySavings = maxSavingsPerShipment * monthlySales
  const maxYearlySavings = maxMonthlySavings * 12

  const selected = selectedCompany
    ? comparisons.find((c) => c.name === selectedCompany)
    : cheapest

  return (
    <ToolsPageShell
      title="Kargo Ücreti Hesaplama"
      description="MNG, Yurtiçi, Aras, PTT, Sürat ve Sendeo kargo fiyatlarını karşılaştırın. Aylık gönderim hacminize göre en ucuz kargoyu bulun."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className={`${TOOLS_CARD_CLASS} space-y-5`}>
          <h2 className="text-ln-label-lg font-semibold text-ln-gray-900 dark:text-ln-gray-0">
            Gönderi Bilgileri
          </h2>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-ln-gray-600 dark:text-ln-gray-400">Boy (cm)</label>
              <input
                type="number" min={1} max={200} value={length}
                onChange={(e) => setLength(Math.max(1, Number(e.target.value)))}
                className="w-full rounded-10 border border-ln-gray-300 dark:border-ln-gray-700 bg-transparent px-3 py-2 text-sm text-ln-gray-900 dark:text-ln-gray-0 focus:outline-none focus:ring-2 focus:ring-ln-orange"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-ln-gray-600 dark:text-ln-gray-400">En (cm)</label>
              <input
                type="number" min={1} max={200} value={width}
                onChange={(e) => setWidth(Math.max(1, Number(e.target.value)))}
                className="w-full rounded-10 border border-ln-gray-300 dark:border-ln-gray-700 bg-transparent px-3 py-2 text-sm text-ln-gray-900 dark:text-ln-gray-0 focus:outline-none focus:ring-2 focus:ring-ln-orange"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-ln-gray-600 dark:text-ln-gray-400">Yükseklik (cm)</label>
              <input
                type="number" min={1} max={200} value={height}
                onChange={(e) => setHeight(Math.max(1, Number(e.target.value)))}
                className="w-full rounded-10 border border-ln-gray-300 dark:border-ln-gray-700 bg-transparent px-3 py-2 text-sm text-ln-gray-900 dark:text-ln-gray-0 focus:outline-none focus:ring-2 focus:ring-ln-orange"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
              Gerçek Ağırlık: <span className="font-bold text-orange-600">{weight.toFixed(1)} kg</span>
            </label>
            <input
              type="range" min={0.1} max={50} step={0.1} value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-xs text-ln-gray-500"><span>0.1 kg</span><span>50 kg</span></div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
              Aylık Gönderi Adedi: <span className="font-bold text-orange-600">{monthlySales} adet</span>
            </label>
            <input
              type="range" min={1} max={10000} step={10} value={monthlySales}
              onChange={(e) => setMonthlySales(Number(e.target.value))}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-xs text-ln-gray-500"><span>1</span><span>10.000</span></div>
          </div>

          {/* Desi info box */}
          <div className="rounded-xl bg-ln-gray-50 dark:bg-ln-gray-800 p-4 text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-ln-gray-600 dark:text-ln-gray-400">Hacimsel ağırlık (desi)</span>
              <span className="font-mono font-semibold text-ln-gray-900 dark:text-ln-gray-0">{volumetricWeight.toFixed(2)} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ln-gray-600 dark:text-ln-gray-400">Gerçek ağırlık</span>
              <span className="font-mono font-semibold text-ln-gray-900 dark:text-ln-gray-0">{weight.toFixed(2)} kg</span>
            </div>
            <div className="flex justify-between border-t border-ln-gray-200 dark:border-ln-gray-700 pt-1">
              <span className="font-medium text-ln-gray-700 dark:text-ln-gray-300">Faturalanan ağırlık</span>
              <span className="font-mono font-bold text-ln-orange">{billedWeight.toFixed(2)} kg</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-5">
          {/* Comparison table */}
          <div className={TOOLS_CARD_CLASS}>
            <h3 className="text-ln-label-lg font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-4">
              Kargo Firma Karşılaştırması
            </h3>
            <div className="space-y-2">
              {comparisons.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedCompany(c.name === selectedCompany ? null : c.name)}
                  className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-colors text-left ${
                    i === 0
                      ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-700'
                      : selectedCompany === c.name
                      ? 'bg-ln-orange/10 border-2 border-ln-orange'
                      : 'bg-ln-gray-50 dark:bg-ln-gray-800 border-2 border-transparent hover:border-ln-gray-300 dark:hover:border-ln-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {i === 0 && <span className="text-base">🏆</span>}
                    <div>
                      <span className={`font-medium ${c.color}`}>{c.name}</span>
                      <span className="ml-2 text-xs text-ln-gray-400">{c.note}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`font-bold ${i === 0 ? 'text-green-700 dark:text-green-300' : 'text-ln-gray-900 dark:text-ln-gray-0'}`}>
                      {c.cost.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺
                    </span>
                    <span className="block text-xs text-ln-gray-400">{c.pricePerDesi} ₺/desi</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Monthly/Yearly for selected */}
          {selected && (
            <div className={TOOLS_CARD_CLASS}>
              <h4 className="font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-3">
                {selected.name} — Aylık / Yıllık Maliyet
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-ln-gray-600 dark:text-ln-gray-400">Tek gönderi</span>
                  <span className="font-semibold">{selected.cost.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ln-gray-600 dark:text-ln-gray-400">Aylık toplam ({monthlySales} adet)</span>
                  <span className="font-semibold text-orange-600">{selected.monthlyCost.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                </div>
                <div className="flex justify-between border-t border-ln-gray-200 dark:border-ln-gray-700 pt-2">
                  <span className="text-ln-gray-600 dark:text-ln-gray-400">Yıllık toplam</span>
                  <span className="font-bold text-orange-600">{selected.yearlyCost.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                </div>
              </div>
            </div>
          )}

          {/* Max savings */}
          {maxSavingsPerShipment > 0 && (
            <div className={`${TOOLS_CARD_CLASS} bg-green-50/50 dark:bg-green-900/20 ring-green-200 dark:ring-green-800/50`}>
              <h4 className="font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-3">
                En Ucuz Firma ile Maksimum Tasarruf
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-ln-gray-600 dark:text-ln-gray-400">Gönderi başına tasarruf</span>
                  <span className="font-semibold text-green-600">+{maxSavingsPerShipment.toFixed(0)} ₺</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ln-gray-600 dark:text-ln-gray-400">Aylık tasarruf</span>
                  <span className="font-semibold text-green-600">+{maxMonthlySavings.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                </div>
                <div className="flex justify-between border-t border-ln-gray-200 dark:border-ln-gray-700 pt-2">
                  <span className="text-ln-gray-600 dark:text-ln-gray-400">Yıllık tasarruf</span>
                  <span className="font-bold text-green-600">+{maxYearlySavings.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                </div>
              </div>
            </div>
          )}

          {/* AI Analysis */}
          <div className={TOOLS_CARD_CLASS}>
            <h4 className="font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-2">AI Değerlendirme</h4>
            <ToolAIAnalysis
              tool="kargo"
              buildContext={() => `Paket: ${length}x${width}x${height} cm, Gerçek ağırlık: ${weight}kg, Faturalanacak ağırlık: ${billedWeight.toFixed(2)}kg, En ucuz kargo: ${cheapest.name} (${cheapest.cost.toFixed(0)}₺/gönderi), En pahalı: ${mostExpensive.name} (${mostExpensive.cost.toFixed(0)}₺/gönderi), Aylık gönderi: ${monthlySales}, Doğru seçimle aylık tasarruf: ${maxMonthlySavings.toFixed(0)}₺, Yıllık tasarruf: ${maxYearlySavings.toFixed(0)}₺${selectedCompany ? `, Seçilen firma: ${selectedCompany}` : ''}`}
            />
          </div>

          {/* CTA */}
          <div className={TOOLS_CARD_CLASS}>
            <p className="text-ln-paragraph-sm text-ln-gray-600 dark:text-ln-gray-400 mb-3">
              Kargo maliyetinizi kâr hesabına dahil edin
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link href="/tools/desi-hesaplama" className={`flex-1 justify-center ${TOOLS_BTN_PRIMARY_CLASS}`}>
                Desi Hesapla
              </Link>
              <Link href="/tools/komisyon-hesaplama" className={`flex-1 justify-center ${TOOLS_BTN_SECONDARY_CLASS}`}>
                Komisyon Hesapla
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-12 prose prose-lg max-w-none dark:prose-invert">
        <h2>Kargo Ücreti Nasıl Hesaplanır? — 2026</h2>
        <p>
          Türkiye'de kargo ücretleri <strong>desi (hacimsel ağırlık)</strong> veya <strong>gerçek ağırlık</strong>tan
          büyük olanına göre hesaplanır. Her kargo firmasının farklı desi birim ücreti ve minimum ücret tutarı
          bulunmaktadır.
        </p>

        <h3>Kargo Firmalarını Karşılaştırırken Dikkat Edilmesi Gerekenler</h3>
        <ul>
          <li><strong>Birim desi ücreti:</strong> Her desi başına ne kadar ödediğiniz</li>
          <li><strong>Minimum ücret:</strong> Küçük paketlerde taban fiyat devreye girer</li>
          <li><strong>Anlaşmalı fiyatlar:</strong> Hacimli gönderim yapıyorsanız özel indirimler mümkündür</li>
          <li><strong>Teslimat süresi:</strong> Fiyat dışı faktörleri de göz önünde bulundurun</li>
        </ul>

        <h3>E-Ticaret Satıcıları için Kargo Maliyeti Optimizasyonu</h3>
        <p>
          Aylık 200'den fazla gönderi yapıyorsanız kargo firmasıyla <em>toplu anlaşma</em> yaparak desi birim
          ücretini önemli ölçüde düşürebilirsiniz. Bu hesaplayıcıdaki fiyatlar genel liste fiyatlarıdır;
          gerçek anlaşma fiyatları çok daha avantajlı olabilir.
        </p>
        <p>
          Paket boyutunuzu optimize etmek için <Link href="/tools/desi-hesaplama">Desi Hesaplama</Link> aracımızı,
          toplam kâr marjınızı hesaplamak için <Link href="/tools/komisyon-hesaplama">Komisyon Hesaplama</Link> aracımızı kullanın.
        </p>

        <h3>Ücretsiz Kargo Sınırı Stratejisi</h3>
        <p>
          Müşterilere ücretsiz kargo sunmak için yaygın bir strateji: belirli bir sipariş tutarı üzerini ücretsiz
          kargo yaparak ortalama sepet değerini artırmak. Kargo maliyetinizi doğru hesaplayarak bu eşiği
          doğru belirleyebilirsiniz.
        </p>
      </div>
    </ToolsPageShell>
  )
}
