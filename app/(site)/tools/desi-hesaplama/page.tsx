'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ToolsPageShell, TOOLS_CARD_CLASS, TOOLS_BTN_PRIMARY_CLASS, TOOLS_BTN_SECONDARY_CLASS } from '@/components/ToolsPageShell'
import { ToolAIAnalysis } from '@/components/ToolAIAnalysis'

// Approximate 2026 desi rates for major Turkish cargo companies (per desi, standard)
const CARGO_RATES: Array<{ name: string; pricePerDesi: number; minCharge: number }> = [
  { name: 'MNG Kargo', pricePerDesi: 14.5, minCharge: 45 },
  { name: 'Yurtiçi Kargo', pricePerDesi: 15.0, minCharge: 48 },
  { name: 'Aras Kargo', pricePerDesi: 13.5, minCharge: 42 },
  { name: 'PTT Kargo', pricePerDesi: 12.5, minCharge: 38 },
  { name: 'Sürat Kargo', pricePerDesi: 14.0, minCharge: 44 },
  { name: 'Sendeo', pricePerDesi: 11.5, minCharge: 35 },
]

const DESI_DIVISOR = 3000 // Standard for Turkey domestic shipping

export default function DesiHesaplamaPage() {
  const [length, setLength] = useState(30)   // cm - boy
  const [width, setWidth] = useState(20)    // cm - en
  const [height, setHeight] = useState(15)  // cm - yükseklik
  const [weight, setWeight] = useState(1.5) // kg - gerçek ağırlık
  const [monthlySales, setMonthlySales] = useState(100)

  const volumetricWeight = (length * width * height) / DESI_DIVISOR // in kg (desi)
  const billedWeight = Math.max(volumetricWeight, weight)
  const isDesiHeavier = volumetricWeight > weight

  // Per shipment costs
  const cargoComparisons = CARGO_RATES.map((c) => {
    const cost = Math.max(billedWeight * c.pricePerDesi, c.minCharge)
    return { ...c, cost }
  }).sort((a, b) => a.cost - b.cost)

  const cheapestCargo = cargoComparisons[0]
  const mostExpensiveCargo = cargoComparisons[cargoComparisons.length - 1]
  const maxSavings = mostExpensiveCargo.cost - cheapestCargo.cost
  const monthlyMaxSavings = maxSavings * monthlySales

  return (
    <ToolsPageShell
      title="Desi Hesaplama"
      description="Kargo hacimsel ağırlığını (desi) hesaplayın. Gerçek ağırlıkla karşılaştırın, hangi kargonun daha uygun olduğunu görün."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className={`${TOOLS_CARD_CLASS} space-y-5`}>
          <h2 className="text-ln-label-lg font-semibold text-ln-gray-900 dark:text-ln-gray-0">
            Paket Ölçüleri
          </h2>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
              Boy (uzunluk): <span className="font-bold text-orange-600">{length} cm</span>
            </label>
            <input
              type="range" min={1} max={200} step={1} value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-xs text-ln-gray-500"><span>1 cm</span><span>200 cm</span></div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
              En (genişlik): <span className="font-bold text-orange-600">{width} cm</span>
            </label>
            <input
              type="range" min={1} max={200} step={1} value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-xs text-ln-gray-500"><span>1 cm</span><span>200 cm</span></div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
              Yükseklik: <span className="font-bold text-orange-600">{height} cm</span>
            </label>
            <input
              type="range" min={1} max={200} step={1} value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-xs text-ln-gray-500"><span>1 cm</span><span>200 cm</span></div>
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
              type="range" min={1} max={5000} step={10} value={monthlySales}
              onChange={(e) => setMonthlySales(Number(e.target.value))}
              className="w-full accent-orange-500"
            />
          </div>

          {/* Formula display */}
          <div className="rounded-xl bg-ln-gray-50 dark:bg-ln-gray-800 p-4 text-sm">
            <p className="font-medium text-ln-gray-700 dark:text-ln-gray-300 mb-1">Desi Formülü</p>
            <p className="font-mono text-ln-gray-600 dark:text-ln-gray-400">
              ({length} × {width} × {height}) ÷ 3000 = <strong className="text-ln-orange">{volumetricWeight.toFixed(2)} desi</strong>
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-5">
          {/* Ağırlık karşılaştırma */}
          <div className={TOOLS_CARD_CLASS}>
            <h3 className="text-ln-label-lg font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-4">
              Ağırlık Analizi
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-ln-gray-600 dark:text-ln-gray-400">Gerçek Ağırlık</span>
                <span className={`font-semibold ${!isDesiHeavier ? 'text-orange-600' : 'text-ln-gray-700 dark:text-ln-gray-300'}`}>
                  {weight.toFixed(2)} kg {!isDesiHeavier && '← faturalanır'}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-ln-gray-600 dark:text-ln-gray-400">Hacimsel Ağırlık (Desi)</span>
                <span className={`font-semibold ${isDesiHeavier ? 'text-orange-600' : 'text-ln-gray-700 dark:text-ln-gray-300'}`}>
                  {volumetricWeight.toFixed(2)} kg {isDesiHeavier && '← faturalanır'}
                </span>
              </div>
              <div className={`border-t border-ln-gray-200 dark:border-ln-gray-700 pt-3 rounded-xl p-3 mt-1 ${
                isDesiHeavier ? 'bg-orange-50 dark:bg-orange-900/20' : 'bg-green-50 dark:bg-green-900/20'
              }`}>
                <p className={`text-sm font-semibold ${isDesiHeavier ? 'text-orange-700 dark:text-orange-300' : 'text-green-700 dark:text-green-300'}`}>
                  {isDesiHeavier
                    ? `⚠️ Desi ağırlığı daha yüksek! ${(volumetricWeight - weight).toFixed(2)} kg fazla faturalanırsınız.`
                    : `✓ Gerçek ağırlık baz alınır. Paket yoğun, desi avantajlı.`}
                </p>
                <p className="text-xs mt-1 text-ln-gray-500 dark:text-ln-gray-400">
                  Faturalanan ağırlık: <strong>{billedWeight.toFixed(2)} kg</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Kargo fiyat karşılaştırması */}
          <div className={TOOLS_CARD_CLASS}>
            <h3 className="font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-4">
              Kargo Firma Karşılaştırması
            </h3>
            <div className="space-y-2">
              {cargoComparisons.map((c, i) => (
                <div
                  key={c.name}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm ${
                    i === 0
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                      : 'bg-ln-gray-50 dark:bg-ln-gray-800'
                  }`}
                >
                  <span className={`font-medium ${i === 0 ? 'text-green-700 dark:text-green-300' : 'text-ln-gray-700 dark:text-ln-gray-300'}`}>
                    {i === 0 && '🏆 '}{c.name}
                  </span>
                  <span className={`font-bold ${i === 0 ? 'text-green-700 dark:text-green-300' : 'text-ln-gray-900 dark:text-ln-gray-0'}`}>
                    {c.cost.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺
                  </span>
                </div>
              ))}
            </div>
            {maxSavings > 0 && (
              <div className="mt-4 text-sm text-ln-gray-600 dark:text-ln-gray-400">
                En ucuz ile en pahalı arasındaki fark: <strong className="text-green-600">{maxSavings.toFixed(0)} ₺/gönderi</strong>
              </div>
            )}
          </div>

          {/* Aylık tasarruf */}
          {maxSavings > 0 && (
            <div className={`${TOOLS_CARD_CLASS} bg-green-50/50 dark:bg-green-900/20 ring-green-200 dark:ring-green-800/50`}>
              <h4 className="font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-3">
                Aylık Tasarruf Potansiyeli ({monthlySales} gönderi)
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-ln-gray-600 dark:text-ln-gray-400">En ucuz kargo ({cheapestCargo.name})</span>
                  <span className="font-semibold text-green-600">
                    {(cheapestCargo.cost * monthlySales).toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺/ay
                  </span>
                </div>
                <div className="flex justify-between border-t border-ln-gray-200 dark:border-ln-gray-700 pt-2">
                  <span className="text-ln-gray-600 dark:text-ln-gray-400">Doğru firmayı seçerek tasarruf</span>
                  <span className="font-bold text-green-600">
                    +{monthlyMaxSavings.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺/ay
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* AI Analysis */}
          <div className={TOOLS_CARD_CLASS}>
            <h4 className="font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-2">AI Değerlendirme</h4>
            <ToolAIAnalysis
              tool="desi"
              buildContext={() => `Paket: ${length}x${width}x${height} cm, Gerçek ağırlık: ${weight}kg, Desi (hacimsel): ${volumetricWeight.toFixed(2)}kg, Faturalanacak: ${billedWeight.toFixed(2)}kg, ${isDesiHeavier ? 'Desi ağırlığı daha yüksek — fazla ödeme riski' : 'Gerçek ağırlık baz alınıyor — avantajlı'}, En ucuz kargo: ${cheapestCargo.name} (${cheapestCargo.cost.toFixed(0)}₺/gönderi), Aylık gönderi: ${monthlySales}, Aylık tasarruf potansiyeli: ${monthlyMaxSavings.toFixed(0)}₺`}
            />
          </div>

          {/* CTA */}
          <div className={TOOLS_CARD_CLASS}>
            <p className="text-ln-paragraph-sm text-ln-gray-600 dark:text-ln-gray-400 mb-3">
              Kargo maliyetlerinizi e-ticaret kâr hesabına ekleyin
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link href="/tools/kargo-ucreti-hesaplama" className={`flex-1 justify-center ${TOOLS_BTN_PRIMARY_CLASS}`}>
                Kargo Ücreti Hesapla
              </Link>
              <Link href="/tools/e-ticaret-kar-hesaplama" className={`flex-1 justify-center ${TOOLS_BTN_SECONDARY_CLASS}`}>
                Kâr Marjı Hesapla
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-12 prose prose-lg max-w-none dark:prose-invert">
        <h2>Desi Nedir? Nasıl Hesaplanır?</h2>
        <p>
          <strong>Desi</strong>, kargo firmaları tarafından kullanılan hacimsel ağırlık birimidir. Kargonun fiziksel
          ağırlığı az olsa bile büyük hacim kaplıyorsa, kargo firmaları daha fazla ücret talep edebilir.
          Türkiye'de yurt içi gönderilerde standart bölme katsayısı <strong>3.000</strong> olarak kullanılmaktadır.
        </p>

        <h3>Desi Hesaplama Formülü</h3>
        <p>
          <strong>Desi = (Boy × En × Yükseklik) ÷ 3000</strong>
          <br />
          Ölçüler santimetre (cm), sonuç kilogram (kg) cinsindendir.
        </p>
        <p>
          Kargo firmaları <em>gerçek ağırlık</em> ile <em>desi ağırlığı</em>ndan büyük olanı baz alır.
          Bu nedenle büyük ama hafif ürünlerde (örneğin köpük veya plastik ürünler) beklenmedik yüksek
          kargo ücretleriyle karşılaşabilirsiniz.
        </p>

        <h3>E-Ticaret Satıcıları İçin Desi Optimizasyonu</h3>
        <ul>
          <li>Ürünlerinizi mümkün olduğunca sıkıştırılmış veya küçük paketlerde gönderin</li>
          <li>Kargo firmasıyla anlaşma yaparken minimum desi ücretini de müzakere edin</li>
          <li>Hacimli ürünlerde kargo maliyetini fiyatlandırmaya dahil etmeyi unutmayın</li>
          <li>Yurt dışı gönderimlerde bölme katsayısı 5.000 veya 6.000 olabilir</li>
        </ul>

        <p>
          Kargo maliyeti dahil kâr marjınızı hesaplamak için{' '}
          <Link href="/tools/komisyon-hesaplama">Komisyon Hesaplama</Link> aracımıza göz atın.
          Farklı kargo firmalarının tam fiyat karşılaştırması için{' '}
          <Link href="/tools/kargo-ucreti-hesaplama">Kargo Ücreti Hesaplama</Link> aracımızı kullanın.
        </p>
      </div>
    </ToolsPageShell>
  )
}
