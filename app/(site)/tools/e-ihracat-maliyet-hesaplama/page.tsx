'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ToolsPageShell, TOOLS_CARD_CLASS, TOOLS_BTN_PRIMARY_CLASS, TOOLS_BTN_SECONDARY_CLASS } from '@/components/ToolsPageShell'
import { ToolAIAnalysis } from '@/components/ToolAIAnalysis'

const REGION_RATES = [
    { name: 'Avrupa (AB)', currency: '€', shippingRate: 15, vatRate: 0, customsRate: 0, desc: 'Mikro İhracat (KDV %0)' },
    { name: 'Kuzey Amerika (ABD)', currency: '$', shippingRate: 20, vatRate: 0, customsRate: 0, desc: 'Vergi Muafiyeti (800$ altı)' },
    { name: 'Orta Doğu', currency: '$', shippingRate: 18, vatRate: 0, customsRate: 5, desc: 'Ortalama %5 Gümrük' },
    { name: 'Birleşik Krallık', currency: '£', shippingRate: 16, vatRate: 0, customsRate: 0, desc: '135£ altı KDV ödenir' }
]

export default function EIhracatHesaplamaPage() {
    const [salePrice, setSalePrice] = useState(100)
    const [costPrice, setCostPrice] = useState(300) // in TRY
    const [weight, setWeight] = useState(1) // in KG
    const [exchangeRate, setExchangeRate] = useState(40) // 1 EUR/USD = 40 TRY
    const [monthlySales, setMonthlySales] = useState(50)
    const [selectedRegion, setSelectedRegion] = useState(REGION_RATES[0])

    // Conversion
    const salePriceTry = salePrice * exchangeRate

    // Costs
    const shippingCostEur = selectedRegion.shippingRate * weight
    const shippingCostTry = shippingCostEur * exchangeRate

    const customsCostTry = (salePriceTry * selectedRegion.customsRate) / 100
    const paymentGatewayFee = (salePriceTry * 2.5) / 100 // Average 2.5% for international cards

    const totalCostTry = costPrice + shippingCostTry + customsCostTry + paymentGatewayFee
    const netProfitTry = salePriceTry - totalCostTry
    const profitMargin = salePriceTry > 0 ? (netProfitTry / salePriceTry) * 100 : 0

    const monthlyProfitTry = netProfitTry * monthlySales
    const yearlyProfitTry = monthlyProfitTry * 12

    const isProfit = netProfitTry > 0

    // Domestic vs Export
    const domesticSalePrice = costPrice * 2 // example: 100% markup domestic
    const domesticCommission = (domesticSalePrice * 15) / 100 // 15% marketplace fee
    const domesticVat = (domesticSalePrice * 20) / 120 // 20% VAT
    const domesticShipping = 40 // 40 TRY
    const domesticProfit = domesticSalePrice - costPrice - domesticCommission - domesticVat - domesticShipping

    const profitDifference = netProfitTry - domesticProfit

    return (
        <ToolsPageShell
            title="E-İhracat / Mikro İhracat Kar Hesaplama"
            description="Yurtdışına yapacağınız satışların döviz kuru, kargo ve gümrük maliyetlerini hesaplayın, gerçek kar marjınızı görün."
        >
            {/* Region Quick Select */}
            <div className="mb-8 overflow-x-auto">
                <div className="flex gap-2 pb-2 min-w-max mx-auto justify-center flex-wrap">
                    {REGION_RATES.map((region) => (
                        <button
                            key={region.name}
                            onClick={() => setSelectedRegion(region)}
                            className={`rounded-full px-4 py-2 text-ln-label-sm font-medium transition-colors whitespace-nowrap ${selectedRegion.name === region.name
                                    ? 'bg-ln-orange text-ln-gray-0'
                                    : 'border border-ln-gray-300 dark:border-ln-gray-700 text-ln-gray-700 dark:text-ln-gray-300 hover:bg-ln-gray-50 dark:hover:bg-ln-gray-800'
                                }`}
                        >
                            {region.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 mt-8">
                {/* Inputs */}
                <div className={`${TOOLS_CARD_CLASS} space-y-5`}>
                    <h2 className="text-ln-label-lg font-semibold text-ln-gray-900 dark:text-ln-gray-0 flex justify-between items-center">
                        <span>Satış Bilgileri</span>
                        <span className="text-sm font-normal text-ln-gray-500">{selectedRegion.desc}</span>
                    </h2>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
                            Yurtdışı Satış Fiyatı: <span className="font-bold text-orange-600">{salePrice} {selectedRegion.currency}</span> <span className="text-xs text-ln-gray-500">({salePriceTry.toLocaleString('tr-TR')} ₺)</span>
                        </label>
                        <input
                            type="range" min={10} max={1000} step={10} value={salePrice}
                            onChange={(e) => setSalePrice(Number(e.target.value))}
                            className="w-full accent-ln-orange"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
                            Ürün Maliyeti (TR'deki): <span className="font-bold text-orange-600">{costPrice.toLocaleString('tr-TR')} ₺</span>
                        </label>
                        <input
                            type="range" min={10} max={5000} step={50} value={costPrice}
                            onChange={(e) => setCostPrice(Number(e.target.value))}
                            className="w-full accent-orange-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
                            Ürün Ağırlığı (Desi/Kg): <span className="font-bold text-orange-600">{weight} KG</span>
                        </label>
                        <input
                            type="range" min={0.5} max={30} step={0.5} value={weight}
                            onChange={(e) => setWeight(Number(e.target.value))}
                            className="w-full accent-ln-orange"
                        />
                        <p className="text-xs text-ln-gray-500 mt-1">Tahmini Yurtdışı Kargo: {shippingCostEur} {selectedRegion.currency} ({shippingCostTry.toLocaleString('tr-TR')} ₺)</p>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
                            Güncel Kur ({selectedRegion.currency}/₺): <span className="font-bold text-orange-600">{exchangeRate} ₺</span>
                        </label>
                        <input
                            type="range" min={20} max={50} step={0.5} value={exchangeRate}
                            onChange={(e) => setExchangeRate(Number(e.target.value))}
                            className="w-full accent-ln-orange"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
                            Aylık Tahmini Sipariş: <span className="font-bold text-ln-orange">{monthlySales} adet</span>
                        </label>
                        <input
                            type="range" min={1} max={500} step={5} value={monthlySales}
                            onChange={(e) => setMonthlySales(Number(e.target.value))}
                            className="w-full accent-ln-orange"
                        />
                    </div>
                </div>

                {/* Results */}
                <div className="space-y-5">
                    {/* Per Sale */}
                    <div className={TOOLS_CARD_CLASS}>
                        <h3 className="text-ln-label-lg font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-4">
                            Satış Başına İhracat Karı
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-ln-gray-600 dark:text-ln-gray-400">Brüt Gelir ({salePrice} {selectedRegion.currency})</span>
                                <span className="font-medium text-green-600">{salePriceTry.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-ln-gray-600 dark:text-ln-gray-400">TR Ürün Maliyeti</span>
                                <span className="font-medium text-red-500">-{costPrice.toLocaleString('tr-TR')} ₺</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-ln-gray-600 dark:text-ln-gray-400">Yurtdışı Kargo (PTS/DHL)</span>
                                <span className="font-medium text-red-500">-{shippingCostTry.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-ln-gray-600 dark:text-ln-gray-400">Ödeme Altyapısı (%2.5)</span>
                                <span className="font-medium text-red-500">-{paymentGatewayFee.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-ln-gray-600 dark:text-ln-gray-400">Türkiye KDV (%0 İstisna)</span>
                                <span className="font-medium text-ln-gray-400">0 ₺</span>
                            </div>

                            <div className="border-t border-ln-gray-200 dark:border-ln-gray-700 pt-3 flex justify-between">
                                <span className="font-semibold">Net Kar (Adet)</span>
                                <span className={`font-bold text-xl ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                                    {netProfitTry.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-ln-gray-600 dark:text-ln-gray-400">İhracat Kar Marjı</span>
                                <span className={`font-bold ${profitMargin >= 30 ? 'text-green-600' : profitMargin >= 15 ? 'text-orange-600' : 'text-red-600'}`}>
                                    %{profitMargin.toFixed(1)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Export vs Domestic Comparison */}
                    {profitDifference > 0 && (
                        <div className={`${TOOLS_CARD_CLASS} ring-orange-200 dark:ring-orange-800/50 bg-orange-50/50 dark:bg-orange-900/20`}>
                            <h4 className="font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-3">
                                İç Piyasa vs İhracat Farkı
                            </h4>
                            <p className="text-xs text-ln-gray-600 dark:text-ln-gray-400 mb-3">
                                Aynı ürünü Türkiye'de pazaryerinde iki katı fiyata sattığınızda ({domesticSalePrice}₺) elde edeceğiniz tahmini {domesticProfit.toFixed(0)}₺ kar ile kıyaslandığında;
                            </p>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-ln-gray-600 dark:text-ln-gray-400">İhracatın Ekstra Karı (Adet)</span>
                                    <span className="font-bold text-orange-600">+{profitDifference.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-ln-gray-600 dark:text-ln-gray-400">Aylık Döviz Getirisi</span>
                                    <span className="font-bold text-green-600">+{monthlyProfitTry.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* AI Analysis */}
                    <div className={TOOLS_CARD_CLASS}>
                        <h4 className="font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-2">AI Değerlendirme</h4>
                        <ToolAIAnalysis
                            tool="eihracat"
                            buildContext={() => `Bölge: ${selectedRegion.name}, Satış: ${salePrice}${selectedRegion.currency}, Maliyet: ${costPrice}₺, Kargo: ${shippingCostTry.toFixed(0)}₺, Adet Kar: ${netProfitTry.toFixed(0)}₺, İç piyasa farkı: +${profitDifference.toFixed(0)}₺. Aylık tahmini kazanç: ${monthlyProfitTry.toFixed(0)}₺`}
                        />
                    </div>

                    {/* CTA */}
                    <div className={TOOLS_CARD_CLASS}>
                        <p className="text-ln-paragraph-sm text-ln-gray-600 dark:text-ln-gray-400 mb-3">
                            Mikro ihracat ETGB süreçlerinizi tam entegre E-ihracat altyapısıyla otomatik yönetin.
                        </p>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <Link href="/rehber/mikro-ihracat-ve-e-ihracat-rehberi" className={`flex-1 justify-center ${TOOLS_BTN_PRIMARY_CLASS}`}>
                                Mikro İhracat Rehberi
                            </Link>
                            <Link href="/contact" className={`flex-1 justify-center ${TOOLS_BTN_SECONDARY_CLASS}`}>
                                E-İhracat Paketleri
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="mt-12 prose prose-lg max-w-none dark:prose-invert">
                <h2>E-İhracat ve Mikro İhracat Hakkında Bilmeniz Gerekenler</h2>
                <p>
                    Mikro ihracat, 300 KG ve 15.000 Euro limitini aşmayan ticari gönderilerin ETGB beyannamesiyle kolayca yurt dışına
                    satılması işlemidir. Geleneksel gümrük müşaviri maliyetlerini ortadan kaldırır.
                </p>
                <p>
                    Yurt dışı satışlarının en büyük avantajı, gönderilerin KDV'den istisna olması (%0 KDV) ve döviz kazancıdır.
                    Ayrıca Türkiye'de bir tedarikçiden ürün alırken ödediğiniz %20 KDV'yi de mikro ihracat beyannamesi sayesinde
                    devletten geri (KDV iadesi) alabilirsiniz. Bu da maliyetlerinizi %20 oranında gizlice düşürür.
                </p>
                <p>
                    Daha detaylı bilgi için{' '}
                    <Link href="/rehber/mikro-ihracat-ve-e-ihracat-rehberi">Mikro İhracat Rehberimizi</Link> okuyabilir veya{' '}
                    e-ihracat operasyonlarınızı otomatikleştirecek{' '}
                    <Link href="/blog/ozel-e-ticaret-nedir">Moyduz E-Ticaret Altyapısını</Link> inceleyebilirsiniz.
                </p>
            </div>
        </ToolsPageShell>
    )
}
