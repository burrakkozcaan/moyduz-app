'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ToolsPageShell, TOOLS_CARD_CLASS, TOOLS_BTN_PRIMARY_CLASS, TOOLS_BTN_SECONDARY_CLASS } from '@/components/ToolsPageShell'

const KDV_RATES = [1, 10, 20] as const

const PRODUCT_CATEGORIES: Array<{ label: string; rate: 1 | 10 | 20 }> = [
  { label: 'Gıda (temel)', rate: 1 },
  { label: 'Kitap / Gazete', rate: 1 },
  { label: 'Gıda (işlenmiş)', rate: 10 },
  { label: 'İlaç / Sağlık', rate: 10 },
  { label: 'Tekstil / Giyim', rate: 20 },
  { label: 'Elektronik', rate: 20 },
  { label: 'Mobilya / Ev', rate: 20 },
  { label: 'Kozmetik', rate: 20 },
]

type CalcMode = 'dahil' | 'haric'

export default function KdvHesaplamaPage() {
  const [price, setPrice] = useState(1000)
  const [kdvRate, setKdvRate] = useState<1 | 10 | 20>(20)
  const [mode, setMode] = useState<CalcMode>('dahil') // KDV dahil mi giriliyor?
  const [monthlySales, setMonthlySales] = useState(100)

  // If input is KDV-inclusive (dahil):
  //   KDV hariç = price / (1 + rate/100)
  //   KDV tutar = price - KDV hariç
  // If input is KDV-exclusive (haric):
  //   KDV tutar = price * rate / 100
  //   KDV dahil = price + KDV tutar

  const kdvMultiplier = 1 + kdvRate / 100

  const priceDahil = mode === 'dahil' ? price : price * kdvMultiplier
  const priceHaric = mode === 'dahil' ? price / kdvMultiplier : price
  const kdvAmount = priceDahil - priceHaric

  const monthlyKdv = kdvAmount * monthlySales
  const yearlyKdv = monthlyKdv * 12

  return (
    <ToolsPageShell
      title="KDV Hesaplama"
      description="KDV dahil ve KDV hariç fiyat hesaplayın. %1, %10 ve %20 KDV oranları desteklenir."
    >
      {/* Product category quick select */}
      <div className="mb-8">
        <p className="mb-3 text-center text-sm font-medium text-ln-gray-600 dark:text-ln-gray-400">Ürün kategorisine göre hızlı seç</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setKdvRate(cat.rate)}
              className={`rounded-full px-4 py-2 text-ln-label-sm font-medium transition-colors whitespace-nowrap ${
                kdvRate === cat.rate
                  ? 'bg-ln-orange text-ln-gray-0'
                  : 'border border-ln-gray-300 dark:border-ln-gray-700 text-ln-gray-700 dark:text-ln-gray-300 hover:bg-ln-gray-50 dark:hover:bg-ln-gray-800'
              }`}
            >
              {cat.label} %{cat.rate}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className={`${TOOLS_CARD_CLASS} space-y-6`}>
          <h2 className="text-ln-label-lg font-semibold text-ln-gray-900 dark:text-ln-gray-0">
            Hesaplama Girişi
          </h2>

          {/* Mode toggle */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
              Girilen fiyat
            </label>
            <div className="flex rounded-10 border border-ln-gray-300 dark:border-ln-gray-700 overflow-hidden">
              <button
                onClick={() => setMode('dahil')}
                className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                  mode === 'dahil'
                    ? 'bg-ln-orange text-white'
                    : 'text-ln-gray-700 dark:text-ln-gray-300 hover:bg-ln-gray-50 dark:hover:bg-ln-gray-800'
                }`}
              >
                KDV Dahil
              </button>
              <button
                onClick={() => setMode('haric')}
                className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                  mode === 'haric'
                    ? 'bg-ln-orange text-white'
                    : 'text-ln-gray-700 dark:text-ln-gray-300 hover:bg-ln-gray-50 dark:hover:bg-ln-gray-800'
                }`}
              >
                KDV Hariç
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
              Fiyat ({mode === 'dahil' ? 'KDV dahil' : 'KDV hariç'}): <span className="font-bold text-orange-600">{price.toLocaleString('tr-TR')} ₺</span>
            </label>
            <input
              type="range" min={10} max={50000} step={10} value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-xs text-ln-gray-500"><span>10 ₺</span><span>50.000 ₺</span></div>
          </div>

          {/* KDV Rate */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
              KDV Oranı: <span className="font-bold text-orange-600">%{kdvRate}</span>
            </label>
            <div className="flex gap-2">
              {KDV_RATES.map((r) => (
                <button
                  key={r}
                  onClick={() => setKdvRate(r)}
                  className={`flex-1 rounded-10 py-2.5 text-ln-label-sm font-medium transition-colors ${
                    kdvRate === r
                      ? 'bg-ln-orange text-ln-gray-0'
                      : 'border border-ln-gray-300 dark:border-ln-gray-700 text-ln-gray-700 dark:text-ln-gray-300 hover:bg-ln-gray-50 dark:hover:bg-ln-gray-800'
                  }`}
                >
                  %{r}
                </button>
              ))}
            </div>
          </div>

          {/* Monthly sales */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
              Aylık Satış Adedi: <span className="font-bold text-orange-600">{monthlySales} adet</span>
            </label>
            <input
              type="range" min={1} max={10000} step={10} value={monthlySales}
              onChange={(e) => setMonthlySales(Number(e.target.value))}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-xs text-ln-gray-500"><span>1</span><span>10.000</span></div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-5">
          {/* Fiyat dönüşümü */}
          <div className={TOOLS_CARD_CLASS}>
            <h3 className="text-ln-label-lg font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-4">
              Fiyat Dönüşümü
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-ln-gray-600 dark:text-ln-gray-400">KDV Hariç Fiyat</span>
                <span className="font-semibold text-ln-gray-900 dark:text-ln-gray-0">
                  {priceHaric.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ln-gray-600 dark:text-ln-gray-400">KDV Tutarı (%{kdvRate})</span>
                <span className="font-semibold text-orange-600">
                  +{kdvAmount.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺
                </span>
              </div>
              <div className="border-t border-ln-gray-200 dark:border-ln-gray-700 pt-3 flex justify-between">
                <span className="font-semibold">KDV Dahil Fiyat</span>
                <span className="font-bold text-xl text-ln-gray-900 dark:text-ln-gray-0">
                  {priceDahil.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺
                </span>
              </div>
              <div className="flex justify-between text-sm text-ln-gray-500">
                <span>KDV oranı etkisi</span>
                <span className="font-medium">
                  %{((kdvAmount / priceHaric) * 100).toFixed(1)} fiyat artışı
                </span>
              </div>
            </div>
          </div>

          {/* B2B / B2C Karşılaştırma */}
          <div className={TOOLS_CARD_CLASS}>
            <h4 className="font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-3">B2B vs B2C Karşılaştırma</h4>
            <div className="space-y-3">
              <div className="rounded-xl border border-ln-gray-200 dark:border-ln-gray-700 p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">B2C (Bireysel Müşteri)</span>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">KDV dahil öder</span>
                </div>
                <p className="text-lg font-bold text-ln-gray-900 dark:text-ln-gray-0">
                  {priceDahil.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺
                </p>
              </div>
              <div className="rounded-xl border border-green-200 dark:border-green-800/50 bg-green-50/50 dark:bg-green-900/20 p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">B2B (Kurumsal Müşteri)</span>
                  <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">KDV iade alır</span>
                </div>
                <p className="text-lg font-bold text-green-700 dark:text-green-400">
                  {priceHaric.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺ <span className="text-sm font-normal">(net maliyet)</span>
                </p>
              </div>
            </div>
          </div>

          {/* Aylık KDV yükü */}
          <div className={TOOLS_CARD_CLASS}>
            <h4 className="font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-3">
              Aylık KDV Yükü ({monthlySales} adet)
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-ln-gray-600 dark:text-ln-gray-400">Aylık toplam KDV</span>
                <span className="font-semibold text-orange-600">
                  {monthlyKdv.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺
                </span>
              </div>
              <div className="flex justify-between border-t border-ln-gray-200 dark:border-ln-gray-700 pt-2">
                <span className="text-ln-gray-600 dark:text-ln-gray-400">Yıllık toplam KDV</span>
                <span className="font-bold text-orange-600">
                  {yearlyKdv.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺
                </span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className={TOOLS_CARD_CLASS}>
            <p className="text-ln-paragraph-sm text-ln-gray-600 dark:text-ln-gray-400 mb-3">
              E-ticaret kârlılığınızı KDV dahil doğru hesaplayın
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link href="/tools/komisyon-hesaplama" className={`flex-1 justify-center ${TOOLS_BTN_PRIMARY_CLASS}`}>
                Komisyon Hesapla
              </Link>
              <Link href="/tools/e-ticaret-kar-hesaplama" className={`flex-1 justify-center ${TOOLS_BTN_SECONDARY_CLASS}`}>
                Kâr Marjı Hesapla
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Info section */}
      <div className="mt-12 prose prose-lg max-w-none dark:prose-invert">
        <h2>KDV Hesaplama Rehberi — 2026</h2>
        <p>
          Türkiye'de Katma Değer Vergisi (KDV) üç farklı oranda uygulanmaktadır: <strong>%1, %10 ve %20.</strong>{' '}
          E-ticaret satıcıları için doğru KDV hesaplaması; fiyatlandırma, kar marjı ve muhasebe süreçlerinin temelidir.
        </p>

        <h3>KDV Dahil / KDV Hariç Fiyat Formülleri</h3>
        <p>
          <strong>KDV Dahil → KDV Hariç:</strong> Fiyat ÷ (1 + KDV Oranı / 100)
          <br />Örnek: 1.200 ₺ ÷ 1,20 = <strong>1.000 ₺</strong>
        </p>
        <p>
          <strong>KDV Hariç → KDV Dahil:</strong> Fiyat × (1 + KDV Oranı / 100)
          <br />Örnek: 1.000 ₺ × 1,20 = <strong>1.200 ₺</strong>
        </p>

        <h3>2026 KDV Oranları Hangi Ürünlere Uygulanır?</h3>
        <ul>
          <li><strong>%1 KDV:</strong> Temel gıda maddeleri, ekmek, taze sebze-meyve, kitap, gazete, dergi</li>
          <li><strong>%10 KDV:</strong> İşlenmiş gıda, ilaç, tıbbi malzeme, bazı tarım ürünleri</li>
          <li><strong>%20 KDV:</strong> Elektronik, tekstil, kozmetik, mobilya, spor malzemeleri ve genel ürünler</li>
        </ul>

        <h3>Pazaryeri Satıcıları İçin KDV İpuçları</h3>
        <p>
          Trendyol, Hepsiburada ve diğer pazaryerlerinde satış yapıyorsanız dikkat etmeniz gereken birkaç nokta var:
          Pazaryerleri komisyonu <em>KDV dahil satış fiyatı</em> üzerinden hesaplar. Bu nedenle net kâr marjınızı
          hesaplarken hem komisyon hem de KDV etkisini birlikte değerlendirmelisiniz.
        </p>
        <p>
          Detaylı komisyon analizi için{' '}
          <Link href="/tools/komisyon-hesaplama">Marketplace Komisyon Hesaplama</Link> aracımızı,
          genel kâr analizi için{' '}
          <Link href="/tools/e-ticaret-kar-hesaplama">E-Ticaret Kâr Hesaplama</Link> aracımızı kullanabilirsiniz.
        </p>
      </div>
    </ToolsPageShell>
  )
}
