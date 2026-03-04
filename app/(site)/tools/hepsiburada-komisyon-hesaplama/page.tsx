'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ToolsPageShell, TOOLS_CARD_CLASS, TOOLS_BTN_PRIMARY_CLASS, TOOLS_BTN_SECONDARY_CLASS } from '@/components/ToolsPageShell'
import { ToolAIAnalysis } from '@/components/ToolAIAnalysis'

const CATEGORY_RATES: Array<{ name: string; rate: number }> = [
    { name: 'Elektronik', rate: 7 },
    { name: 'Giyim & Ayakkabı', rate: 18 },
    { name: 'Kozmetik', rate: 15 },
    { name: 'Ev & Yaşam', rate: 14 },
    { name: 'Anne & Bebek', rate: 12 },
    { name: 'Moyduz E-ticaret Paketi', rate: 0 },
]

export default function HepsiburadaKomisyonHesaplamaPage() {
    const [salePrice, setSalePrice] = useState(1000)
    const [commissionRate, setCommissionRate] = useState(15)
    const [costPrice, setCostPrice] = useState(400)
    const [shippingCost, setShippingCost] = useState(45)
    const [taxRate, setTaxRate] = useState(20)
    const [monthlySales, setMonthlySales] = useState(100)
    const [selectedCategory, setSelectedCategory] = useState('Kozmetik')

    const commissionAmount = (salePrice * commissionRate) / 100
    // Hepsiburada komisyonuna %20 KDV eklenir (İşlem Hizmet Bedeli KDV'si).
    const commissionTaxAmount = (commissionAmount * 20) / 100
    const totalCommissionDeduction = commissionAmount + commissionTaxAmount

    const taxAmount = (salePrice * taxRate) / (100 + taxRate)
    const netRevenue = salePrice - totalCommissionDeduction - taxAmount
    const grossProfit = netRevenue - costPrice - shippingCost
    const profitMargin = salePrice > 0 ? (grossProfit / salePrice) * 100 : 0

    const monthlyCommission = totalCommissionDeduction * monthlySales
    const monthlyProfit = grossProfit * monthlySales
    const yearlyCommission = monthlyCommission * 12

    const customCommissionRate = 0
    const customCommissionAmount = (salePrice * customCommissionRate) / 100
    const customTotalCommissionDeduction = customCommissionAmount * 1.2
    const customNetRevenue = salePrice - customTotalCommissionDeduction - taxAmount
    const customGrossProfit = customNetRevenue - costPrice - shippingCost
    const monthlyCommissionSavings = (totalCommissionDeduction - customTotalCommissionDeduction) * monthlySales

    const isProfit = grossProfit > 0

    return (
        <ToolsPageShell
            title="Hepsiburada Komisyon Hesaplama Aracı 2026"
            description="Hepsiburada satıcıları için net kar marjı, kesintiler ve komisyon hesaplama aracı. Ürün kategorinize göre gerçek kazancınızı görün."
        >
            {/* Category Quick Select */}
            <div className="mb-8 overflow-x-auto">
                <div className="flex gap-2 pb-2 min-w-max mx-auto justify-center flex-wrap">
                    {CATEGORY_RATES.map((c) => (
                        <button
                            key={c.name}
                            onClick={() => {
                                setSelectedCategory(c.name)
                                setCommissionRate(c.rate)
                            }}
                            className={`rounded-full px-4 py-2 text-ln-label-sm font-medium transition-colors whitespace-nowrap ${selectedCategory === c.name
                                    ? 'bg-ln-orange text-ln-gray-0'
                                    : 'border border-ln-gray-300 dark:border-ln-gray-700 text-ln-gray-700 dark:text-ln-gray-300 hover:bg-ln-gray-50 dark:hover:bg-ln-gray-800'
                                }`}
                        >
                            {c.name} %{c.rate}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 mt-8">
                {/* Inputs */}
                <div className={`${TOOLS_CARD_CLASS} space-y-5`}>
                    <h2 className="text-ln-label-lg font-semibold text-ln-gray-900 dark:text-ln-gray-0">
                        Ürün & Maliyet Bilgileri
                    </h2>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
                            Satış Fiyatı (KDV dahil): <span className="font-bold text-orange-600">{salePrice.toLocaleString('tr-TR')} ₺</span>
                        </label>
                        <input
                            type="range" min={50} max={20000} step={50} value={salePrice}
                            onChange={(e) => setSalePrice(Number(e.target.value))}
                            className="w-full accent-orange-500"
                        />
                        <div className="flex justify-between text-xs text-ln-gray-500"><span>50 ₺</span><span>20.000 ₺</span></div>
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
                            Kargo Maliyeti + KDV: <span className="font-bold text-orange-600">{shippingCost} ₺</span>
                        </label>
                        <input
                            type="range" min={0} max={300} step={5} value={shippingCost}
                            onChange={(e) => setShippingCost(Number(e.target.value))}
                            className="w-full accent-orange-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
                            Hepsiburada Komisyon Oranı: <span className="font-bold text-orange-600">%{commissionRate}</span>
                        </label>
                        <input
                            type="range" min={0} max={30} step={0.5} value={commissionRate}
                            onChange={(e) => setCommissionRate(Number(e.target.value))}
                            className="w-full accent-orange-500"
                        />
                        <p className="text-xs text-ln-gray-500">Not: Kesilen komisyona +%20 Hizmet Bedeli KDV'si yansıtılır.</p>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
                            Ürün KDV Oranı: <span className="font-bold text-orange-600">%{taxRate}</span>
                        </label>
                        <div className="flex gap-2">
                            {[0, 10, 20].map((r) => (
                                <button
                                    key={r}
                                    onClick={() => setTaxRate(r)}
                                    className={`flex-1 rounded-10 py-2 text-ln-label-sm font-medium transition-colors ${taxRate === r ? 'bg-ln-orange text-ln-gray-0' : 'border border-ln-gray-300 dark:border-ln-gray-700 text-ln-gray-700 dark:text-ln-gray-300'}`}
                                >
                                    %{r}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">
                            Tahmini Aylık Satış Adedi: <span className="font-bold text-orange-600">{monthlySales} adet</span>
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
                    <div className={TOOLS_CARD_CLASS}>
                        <h3 className="text-ln-label-lg font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-4">
                            1 Adet Satış İçin Kazanç Analizi
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-ln-gray-600 dark:text-ln-gray-400">Satış fiyatı</span>
                                <span className="font-medium text-ln-gray-900 dark:text-ln-gray-0">{salePrice.toLocaleString('tr-TR')} ₺</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-ln-gray-600 dark:text-ln-gray-400">Ürün KDV'si (%{taxRate})</span>
                                <span className="font-medium text-red-500">-{taxAmount.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-ln-gray-600 dark:text-ln-gray-400">HB Komisyon Tutarı (%{commissionRate})</span>
                                <span className="font-medium text-red-500">-{commissionAmount.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                            </div>
                            <div className="flex justify-between text-sm pl-4 border-l-2 border-dashed border-red-200 dark:border-red-900/50">
                                <span className="text-ln-gray-500 text-xs">Komisyon KDV'si (%20)</span>
                                <span className="font-medium text-xs text-red-400">-{commissionTaxAmount.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-ln-gray-600 dark:text-ln-gray-400">Ürün Maliyeti</span>
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
                    <div className={TOOLS_CARD_CLASS}>
                        <h4 className="font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-3">Aylık Özet ({monthlySales} adet)</h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-ln-gray-600 dark:text-ln-gray-400">Hepsiburada Komisyon Gideri</span>
                                <span className="font-semibold text-red-500">-{monthlyCommission.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-ln-gray-600 dark:text-ln-gray-400">Yıllık HB Komisyon Gideri</span>
                                <span className="font-semibold text-red-500">-{yearlyCommission.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                            </div>
                            <div className="flex justify-between border-t border-ln-gray-200 dark:border-ln-gray-700 pt-2">
                                <span className="text-ln-gray-600 dark:text-ln-gray-400">Aylık Net Karınız</span>
                                <span className={`font-bold ${monthlyProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {monthlyProfit.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Custom Marketplace Comparison / Moyduz */}
                    {commissionRate > 0 && (
                        <div className={`${TOOLS_CARD_CLASS} ring-orange-200 dark:ring-orange-800/50 bg-orange-50/50 dark:bg-orange-900/20`}>
                            <h4 className="font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-3">
                                Pazaryerine Değil, Kendi Sitenize Yatırım Yapın!
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-ln-gray-600 dark:text-ln-gray-400">Ürün başı kurtarılan komisyon</span>
                                    <span className="font-semibold text-green-600">+{(totalCommissionDeduction).toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-ln-gray-600 dark:text-ln-gray-400">Aylık cebinizde kalan net para</span>
                                    <span className="font-bold text-green-600">+{monthlyCommissionSavings.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* AI Analysis */}
                    <div className={TOOLS_CARD_CLASS}>
                        <h4 className="font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-2">AI Değerlendirme (Hepsiburada)</h4>
                        <ToolAIAnalysis
                            tool="komisyon"
                            buildContext={() => `Platform: Hepsiburada, Kategori: ${selectedCategory}, Komisyon oranı: %${commissionRate}, Satış fiyatı: ${salePrice}₺, Maliyet: ${costPrice}₺, Kargo: ${shippingCost}₺, Net kar: ${grossProfit.toFixed(0)}₺, Kar marjı: %${profitMargin.toFixed(1)}, Aylık HB komisyon yükü: ${monthlyCommission.toFixed(0)}₺. Yıllık HB komisyon yükü: ${yearlyCommission.toFixed(0)}₺`}
                        />
                    </div>

                    {/* CTA */}
                    <div className={TOOLS_CARD_CLASS}>
                        <h4 className="font-semibold text-ln-gray-900 dark:text-ln-gray-0 mb-2">Kendi e-ticaret sitenizi kurun</h4>
                        <p className="text-ln-paragraph-sm text-ln-gray-600 dark:text-ln-gray-400 mb-4">
                            Pazaryerlerine yüksek komisyonlar ödemek yerine, kendi alan adınızda e-ticaret yapın. Moyduz ile satış gelirlerinizin tamamı size kalsın!
                        </p>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <Link href="/e-ticaret-paketleri" className={`flex-1 justify-center ${TOOLS_BTN_PRIMARY_CLASS}`}>
                                E-ticaret Paketlerini İncele
                            </Link>
                            <Link href="/sizi-arayalim" className={`flex-1 justify-center ${TOOLS_BTN_SECONDARY_CLASS}`}>
                                Uzmanımız Sizi Arasın
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="mt-12 prose prose-lg max-w-none dark:prose-invert">
                <h2>Hepsiburada Komisyon Oranları Hakkında Bilmeniz Gerekenler</h2>
                <p>
                    Hepsiburada, ürün kategorisine göre değişen oranlarda satıcılardan komisyon kesintisi yapmaktadır. **Elektronik** kategorilerinde %5-10 bandında seyreden oranlar, **Giyim**, **Ayakkabı** ve **Kozmetik** gibi kategorilerde %15 ile %20'lere kadar çıkabilmektedir.
                </p>
                <p>
                    Komisyon hesaplamalarınızda dikkat etmeniz gereken en kritik nokta; **kesilen komisyon tutarına ek olarak %20 KDV yansıtılmasıdır.** Araç bu KDV masrafını otomatik hesaplayarak size en gerçekçi "Net Kâr" sonucunu verir.
                </p>
                <h3>Yüksek Komisyonlardan Nasıl Kurtulabilirsiniz?</h3>
                <p>
                    Hepsiburada, marka bilinirliği yaratmak için çok güçlü bir satış kanalı olsa da, uzun vadede komisyon oranları şirketinizi büyütmek yerine yerinizde saymanıza neden olabilir. Sadece pazar yerlerine bağlı kalmamak için <Link href="/e-ticaret-sitesi-nasil-kurulur">E-ticaret Sitesi Nasıl Kurulur?</Link> rehberimizi inceleyerek kendi operasyonunuzu başlatabilirsiniz.
                </p>
            </div>
        </ToolsPageShell>
    )
}
