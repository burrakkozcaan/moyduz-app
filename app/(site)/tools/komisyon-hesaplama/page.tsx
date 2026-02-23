'use client'

import { useState } from 'react'
import Link from 'next/link'

const MARKETPLACE_RATES: Array<{ name: string; rate: number }> = [
  { name: 'Trendyol', rate: 12 },
  { name: 'Hepsiburada', rate: 10 },
  { name: 'Amazon TR', rate: 8 },
  { name: 'n11', rate: 9 },
  { name: 'Çiçeksepeti', rate: 11 },
  { name: 'Özel Marketplace (Moyduz)', rate: 3 },
]

export default function KomisyonHesaplamaPage() {
  const [salePrice, setSalePrice] = useState(500)
  const [commissionRate, setCommissionRate] = useState(12)
  const [costPrice, setCostPrice] = useState(200)
  const [shippingCost, setShippingCost] = useState(25)
  const [taxRate, setTaxRate] = useState(20)
  const [monthlySales, setMonthlySales] = useState(100)
  const [selectedMarketplace, setSelectedMarketplace] = useState('Trendyol')

  const commissionAmount = (salePrice * commissionRate) / 100
  const taxAmount = (salePrice * taxRate) / (100 + taxRate)
  const netRevenue = salePrice - commissionAmount - taxAmount
  const grossProfit = netRevenue - costPrice - shippingCost
  const profitMargin = salePrice > 0 ? (grossProfit / salePrice) * 100 : 0

  const monthlyCommission = commissionAmount * monthlySales
  const monthlyProfit = grossProfit * monthlySales
  const yearlyCommission = monthlyCommission * 12

  const customCommissionRate = 3
  const customCommissionAmount = (salePrice * customCommissionRate) / 100
  const customNetRevenue = salePrice - customCommissionAmount - taxAmount
  const customGrossProfit = customNetRevenue - costPrice - shippingCost
  const monthlyCommissionSavings = (commissionAmount - customCommissionAmount) * monthlySales

  const isProfit = grossProfit > 0

  return (
    <main className="flex-1 bg-ln-gray-0 dark:bg-ln-gray-950">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 mb-4">
            Ücretsiz Araç
          </span>
          <h1 className="text-3xl font-bold text-ln-gray-900 dark:text-ln-gray-0 md:text-4xl mb-4">
            Marketplace Komisyon Hesaplama
          </h1>
          <p className="text-lg text-ln-gray-600 dark:text-ln-gray-400 max-w-2xl mx-auto">
            Trendyol, Hepsiburada ve diğer pazaryerlerinde gerçek kar marjınızı hesaplayın.
          </p>
        </div>

        {/* Marketplace Quick Select */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 pb-2 min-w-max mx-auto justify-center flex-wrap">
            {MARKETPLACE_RATES.map((m) => (
              <button
                key={m.name}
                onClick={() => {
                  setSelectedMarketplace(m.name)
                  setCommissionRate(m.rate)
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedMarketplace === m.name
                    ? 'bg-orange-500 text-white'
                    : 'border border-ln-gray-300 dark:border-ln-gray-700 text-ln-gray-700 dark:text-ln-gray-300 hover:bg-ln-gray-50 dark:hover:bg-ln-gray-800'
                }`}
              >
                {m.name} %{m.rate}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Inputs */}
          <div className="rounded-2xl border border-ln-gray-200 dark:border-ln-gray-800 bg-ln-gray-50 dark:bg-ln-gray-900 p-6 space-y-5">
            <h2 className="text-xl font-semibold text-ln-gray-900 dark:text-ln-gray-0">
              Ürün Bilgileri
            </h2>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
                Satış Fiyatı (KDV dahil): <span className="font-bold text-orange-600">{salePrice.toLocaleString('tr-TR')} ₺</span>
              </label>
              <input
                type="range" min={50} max={10000} step={50} value={salePrice}
                onChange={(e) => setSalePrice(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
              <div className="flex justify-between text-xs text-ln-gray-500"><span>50 ₺</span><span>10.000 ₺</span></div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
                Alış / Maliyet Fiyatı: <span className="font-bold text-orange-600">{costPrice.toLocaleString('tr-TR')} ₺</span>
              </label>
              <input
                type="range" min={0} max={salePrice} step={10} value={costPrice}
                onChange={(e) => setCostPrice(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
                Kargo Maliyeti: <span className="font-bold text-orange-600">{shippingCost} ₺</span>
              </label>
              <input
                type="range" min={0} max={200} step={5} value={shippingCost}
                onChange={(e) => setShippingCost(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
                Komisyon Oranı: <span className="font-bold text-orange-600">%{commissionRate}</span>
              </label>
              <input
                type="range" min={0} max={30} step={0.5} value={commissionRate}
                onChange={(e) => setCommissionRate(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
                KDV Oranı: <span className="font-bold text-orange-600">%{taxRate}</span>
              </label>
              <div className="flex gap-2">
                {[0, 10, 20].map((r) => (
                  <button
                    key={r}
                    onClick={() => setTaxRate(r)}
                    className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${taxRate === r ? 'bg-orange-500 text-white' : 'border border-ln-gray-300 dark:border-ln-gray-700 text-ln-gray-700 dark:text-ln-gray-300'}`}
                  >
                    %{r}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
                Aylık Satış Adedi: <span className="font-bold text-orange-600">{monthlySales} adet</span>
              </label>
              <input
                type="range" min={1} max={1000} step={10} value={monthlySales}
                onChange={(e) => setMonthlySales(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>
          </div>

          {/* Results */}
          <div className="space-y-5">
            {/* Per Sale */}
            <div className="rounded-2xl border border-ln-gray-200 dark:border-ln-gray-800 bg-white dark:bg-ln-gray-900 p-6">
              <h3 className="text-lg font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-4">
                Satış Başına Analiz — {selectedMarketplace}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-ln-gray-600 dark:text-ln-gray-400">Satış fiyatı</span>
                  <span className="font-medium text-ln-gray-900 dark:text-ln-gray-0">{salePrice.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ln-gray-600 dark:text-ln-gray-400">KDV (iade)</span>
                  <span className="font-medium text-red-500">-{taxAmount.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ln-gray-600 dark:text-ln-gray-400">Komisyon (%{commissionRate})</span>
                  <span className="font-medium text-red-500">-{commissionAmount.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ln-gray-600 dark:text-ln-gray-400">Maliyet</span>
                  <span className="font-medium text-red-500">-{costPrice.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ln-gray-600 dark:text-ln-gray-400">Kargo</span>
                  <span className="font-medium text-red-500">-{shippingCost} ₺</span>
                </div>
                <div className="border-t border-ln-gray-200 dark:border-ln-gray-700 pt-3 flex justify-between">
                  <span className="font-semibold">Net Kar</span>
                  <span className={`font-bold text-xl ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                    {grossProfit.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ln-gray-600 dark:text-ln-gray-400">Kar Marjı</span>
                  <span className={`font-bold ${profitMargin >= 20 ? 'text-green-600' : profitMargin >= 0 ? 'text-orange-600' : 'text-red-600'}`}>
                    %{profitMargin.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Monthly */}
            <div className="rounded-2xl border border-ln-gray-200 dark:border-ln-gray-800 bg-ln-gray-50 dark:bg-ln-gray-900 p-5">
              <h4 className="font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-3">Aylık Özet ({monthlySales} adet)</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-ln-gray-600 dark:text-ln-gray-400">Aylık komisyon gideri</span>
                  <span className="font-semibold text-red-500">-{monthlyCommission.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ln-gray-600 dark:text-ln-gray-400">Yıllık komisyon gideri</span>
                  <span className="font-semibold text-red-500">-{yearlyCommission.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                </div>
                <div className="flex justify-between border-t border-ln-gray-200 dark:border-ln-gray-700 pt-2">
                  <span className="text-ln-gray-600 dark:text-ln-gray-400">Aylık net kar</span>
                  <span className={`font-bold ${monthlyProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {monthlyProfit.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺
                  </span>
                </div>
              </div>
            </div>

            {/* Custom Marketplace Comparison */}
            {commissionRate > customCommissionRate && (
              <div className="rounded-2xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-5">
                <h4 className="font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-3">
                  Kendi Marketplace'iniz (%{customCommissionRate} komisyon)
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ln-gray-600 dark:text-ln-gray-400">Satış başına fark</span>
                    <span className="font-semibold text-green-600">+{(commissionAmount - customCommissionAmount).toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ln-gray-600 dark:text-ln-gray-400">Aylık komisyon tasarrufu</span>
                    <span className="font-bold text-green-600">+{monthlyCommissionSavings.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="rounded-2xl border border-ln-gray-200 dark:border-ln-gray-800 p-5 text-center">
              <p className="text-sm text-ln-gray-600 dark:text-ln-gray-400 mb-3">
                Kendi pazaryerinizi kurarak komisyon ödemekten kurtulun
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link href="/multi-vendor" className="flex-1 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white text-center hover:bg-orange-600 transition-colors">
                  Multi-Vendor Çözümü
                </Link>
                <Link href="/ozel-e-ticaret" className="flex-1 rounded-lg border border-ln-gray-300 dark:border-ln-gray-700 px-4 py-2.5 text-sm font-semibold text-ln-gray-900 dark:text-ln-gray-0 text-center hover:bg-ln-gray-50 dark:hover:bg-ln-gray-800 transition-colors">
                  Özel E-Ticaret
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-12 prose prose-lg max-w-none dark:prose-invert">
          <h2>Marketplace Komisyonları Hakkında</h2>
          <p>
            Büyük pazaryerlerinde komisyon oranları %8-15 arasında değişmektedir. Bu oranlar ilk bakışta
            küçük görünse de yüksek cirolu işletmelerde yıllık yüz binlerce liraya ulaşabilir.
          </p>
          <p>
            Daha detaylı bilgi için{' '}
            <Link href="/blog/komisyon-hesaplama-rehberi">Komisyon Hesaplama Rehberimizi</Link> okuyabilir,
            kendi marketplace'inizi kurmak için{' '}
            <Link href="/multi-vendor">Multi-Vendor Marketplace</Link> çözümümüzü inceleyebilirsiniz.
          </p>
          <p>
            Genel kar marjı hesabı için{' '}
            <Link href="/blog/kar-marji-nasil-hesaplanir">Kar Marjı Nasıl Hesaplanır?</Link> yazımıza
            bakabilirsiniz.
          </p>
        </div>
      </div>
    </main>
  )
}
