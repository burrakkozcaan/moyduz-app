"use client";

import { useState } from "react";
import { Check, ChevronRight, Calculator, AlertCircle, TrendingDown } from "lucide-react";

export function CostCalculator() {
  const [step, setStep] = useState(1);
  const [revenue, setRevenue] = useState(100000);
  const [features, setFeatures] = useState<string[]>([]);
  const [hasContract, setHasContract] = useState(false);
  const [penaltyCost, setPenaltyCost] = useState(5000);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const featureOptions = [
    { id: "marketplace", label: "Pazaryeri Entegrasyonu (Trendyol, Hepsiburada)", cost: 6000 },
    { id: "erp", label: "Muhasebe / ERP Entegrasyonu", cost: 8500 },
    { id: "export", label: "E-ihracat Modülü (Çoklu Dil / Kur)", cost: 7000 },
    { id: "b2b", label: "B2B (Bayi Modülü)", cost: 12000 },
  ];

  const handleFeatureToggle = (id: string) => {
    setFeatures(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  // Calculate Market Cost vs Moyduz Cost
  const baseMarketCost = 19900;
  const featuresCost = features.reduce((total, featureId) => {
    const feature = featureOptions.find(f => f.id === featureId);
    return total + (feature?.cost || 0);
  }, 0);
  
  const totalMarketCost = baseMarketCost + featuresCost + (hasContract ? penaltyCost : 0);
  
  const baseOurCost = 24900; // Her şey dahil paket (Moyduz / Sizin varsayılan fiyat)
  
  const effectiveOurCost = baseOurCost - (hasContract ? penaltyCost : 0);
  const totalSavings = totalMarketCost - effectiveOurCost;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-zinc-950 rounded-2xl border border-ln-gray-200 dark:border-ln-gray-800 shadow-xl overflow-hidden my-8">
      <div className="bg-indigo-600 dark:bg-indigo-900 p-6 text-white">
        <div className="flex items-center space-x-3 mb-2">
          <Calculator className="w-6 h-6" />
          <h2 className="text-xl font-bold">Gerçek Altyapı Maliyeti Hesaplayıcı</h2>
        </div>
        <p className="text-indigo-100 text-sm">
          Standart paket fiyatlarına aldanmayın. Entegrasyon ve gizli ücretlerle gerçekte ne kadar ödediğinizi hesaplayın.
        </p>
      </div>

      <div className="p-6 md:p-8">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div>
              <h3 className="text-lg font-semibold text-ln-gray-900 dark:text-gray-100 mb-2">1. Aylık Ortalama Cironuz Ne Kadar?</h3>
              <p className="text-sm text-ln-gray-500 mb-4">Bu, ihtiyaç duyacağınız sunucu ve kapasite gereksinimini tahmin etmemize yardımcı olur.</p>
              
              <div className="space-y-4">
                <input 
                  type="range" 
                  min="10000" 
                  max="2000000" 
                  step="10000"
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="text-xl font-bold text-center text-indigo-600 dark:text-indigo-400">
                  {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(revenue)}+
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-ln-gray-100 dark:border-ln-gray-800">
              <h3 className="text-lg font-semibold text-ln-gray-900 dark:text-gray-100 mb-2">2. Hangi Modüllere İhtiyacınız Var?</h3>
              <p className="text-sm text-ln-gray-500 mb-4">E-ticaret sitenizi büyütmek için şart olan araçlar.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {featureOptions.map(option => (
                  <label 
                    key={option.id}
                    className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                      features.includes(option.id) 
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' 
                        : 'border-ln-gray-200 dark:border-ln-gray-800 hover:border-indigo-300'
                    }`}
                  >
                    <input 
                      type="checkbox" 
                      className="hidden"
                      checked={features.includes(option.id)}
                      onChange={() => handleFeatureToggle(option.id)}
                    />
                    <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${
                      features.includes(option.id) ? 'bg-indigo-600 border-indigo-600' : 'border-ln-gray-300'
                    }`}>
                      {features.includes(option.id) && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-sm font-medium text-ln-gray-800 dark:text-gray-200">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setStep(2)}
              className="w-full mt-8 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl flex items-center justify-center transition-colors shadow-md"
            >
              Devam Et
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <button onClick={() => setStep(1)} className="text-sm text-indigo-600 font-medium mb-4 flex items-center hover:underline">
              ← Geri
            </button>
            
            <h3 className="text-lg font-semibold text-ln-gray-900 dark:text-gray-100 mb-2">3. Başka Bir Altyapı Kullanıyor Musunuz?</h3>
            <p className="text-sm text-ln-gray-500 mb-6">Mevcut bir taahhüdünüz varsa, başka bir platforma geçerken iptal/cayma bedeli ödemeniz gerekebilir.</p>

            <div className="space-y-4">
              <label className="flex items-center p-4 border border-ln-gray-200 dark:border-ln-gray-800 rounded-xl cursor-pointer hover:bg-ln-gray-50 dark:hover:bg-ln-gray-900/50">
                <input 
                  type="radio" 
                  name="contract" 
                  checked={!hasContract}
                  onChange={() => setHasContract(false)}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-600 border-gray-300"
                />
                <span className="ml-3 font-medium text-ln-gray-800 dark:text-gray-200">Hayır, ilk kez e-ticaret sitesi kuracağım veya taahhüdüm bitti</span>
              </label>

              <label className="flex items-center p-4 border border-ln-gray-200 dark:border-ln-gray-800 rounded-xl cursor-pointer hover:bg-ln-gray-50 dark:hover:bg-ln-gray-900/50">
                <input 
                  type="radio" 
                  name="contract" 
                  checked={hasContract}
                  onChange={() => setHasContract(true)}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-600 border-gray-300"
                />
                <span className="ml-3 font-medium text-ln-gray-800 dark:text-gray-200">Evet, başka altyapıdayım ve taahhüdüm var</span>
              </label>
            </div>

            {hasContract && (
              <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-950/30 rounded-xl border border-orange-200 dark:border-orange-800">
                <label className="block text-sm font-medium text-orange-800 dark:text-orange-200 mb-2">
                  Tahmini Çıkacak Cayma Bedeli / Lisans Kalan Ücreti (TL)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-orange-500 font-medium font-mono">₺</span>
                  <input 
                    type="number" 
                    value={penaltyCost}
                    onChange={(e) => setPenaltyCost(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2 border border-orange-300 dark:border-orange-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-black text-ln-gray-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            <button 
              onClick={() => setStep(3)}
              className="w-full mt-6 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl flex items-center justify-center transition-colors shadow-md"
            >
              Maliyet Raporumu Hesapla
              <Calculator className="ml-2 w-5 h-5" />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in zoom-in-95 duration-500">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/40 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-ln-gray-900 dark:text-white">Piyasadaki Acı Gerçek</h3>
              <p className="text-ln-gray-600 dark:text-ln-gray-400 mt-2 text-sm">
                Sadece paket ücreti ödeyeceğinizi düşünürken, ek lisanslar yüzünden karşılaşabileceğiniz potansiyel fatura:
              </p>
            </div>

            <div className="bg-red-50 dark:bg-red-950/20 rounded-2xl p-6 border border-red-100 dark:border-red-900/50">
              <div className="space-y-3 mb-6 border-b border-red-200 dark:border-red-900/50 pb-6 text-sm">
                <div className="flex justify-between text-ln-gray-700 dark:text-ln-gray-300">
                  <span>İlan Edilen "Taban" Paket Fiyatı</span>
                  <span>{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(baseMarketCost)}</span>
                </div>
                {features.map(fId => {
                  const f = featureOptions.find(opt => opt.id === fId);
                  return f ? (
                    <div key={f.id} className="flex justify-between text-ln-gray-700 dark:text-ln-gray-300">
                      <span>{f.label} *Ek Lisans*</span>
                      <span>+{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(f.cost)}</span>
                    </div>
                  ) : null;
                })}
                {hasContract && (
                  <div className="flex justify-between text-ln-gray-700 dark:text-ln-gray-300">
                    <span>Eski Firma Cayma Bedeli (Cebinizden Cıkan)</span>
                    <span>+{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(penaltyCost)}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-end">
                <span className="font-semibold text-red-900 dark:text-red-400">Piyasada 1. Yıl Toplam Yükünüz:</span>
                <span className="text-2xl md:text-3xl font-bold text-red-600 dark:text-red-500">
                  {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(totalMarketCost)}
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-ln-gray-200 dark:border-ln-gray-800" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white dark:bg-zinc-950 text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-gradient-to-r from-emerald-100 to-emerald-50 dark:from-emerald-950/50 dark:to-zinc-950 rounded-full py-1">
                  Moyduz & Özgür Çözüm Farkı
                </span>
              </div>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-900/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
               <div className="space-y-3 mb-6 border-b border-emerald-200 dark:border-emerald-900/50 pb-6 text-sm">
                <div className="flex justify-between text-ln-gray-700 dark:text-ln-gray-300">
                  <span>Limitsiz Full Tümleşik Çözüm (Her Şey Dahil)</span>
                  <span>{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(baseOurCost)}</span>
                </div>
                {features.length > 0 && (
                  <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-medium">
                    <span>Seçtiğiniz Entegrasyonlar</span>
                    <span>₺0 (Dahil)</span>
                  </div>
                )}
                {hasContract && (
                  <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-medium">
                    <span>Cayma Bedeli Kampanyası (Biz Karşılıyoruz)</span>
                    <span>-{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(penaltyCost)} İndirim</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-end mb-4">
                <span className="font-semibold text-emerald-900 dark:text-emerald-400">Bizimle Cebinizden Çıkan:</span>
                <span className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(effectiveOurCost)}
                </span>
              </div>
              <div className="bg-emerald-600 text-white rounded-xl p-4 flex items-center justify-between shadow-lg">
                <div className="flex items-center">
                  <TrendingDown className="w-6 h-6 mr-3" />
                  <span className="font-bold">Net Tasarrufunuz:</span>
                </div>
                <span className="text-xl md:text-2xl font-black tracking-tight">
                  {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(totalSavings)} <span className="text-base font-normal">/ Yıl</span>
                </span>
              </div>
            </div>

            <div className="bg-ln-gray-50 dark:bg-ln-gray-900/50 rounded-2xl p-6 border border-ln-gray-200 dark:border-ln-gray-800">
              <h4 className="font-bold text-center text-ln-gray-900 dark:text-white mb-4">Bu Raporu Dondur ve Tasarrufa Başla!</h4>
              <p className="text-xs text-center text-ln-gray-500 mb-6">Özel "Cayma Bedeli Karşılama" teklifimizi ve sürprizsiz fiyatlarımızı teyit etmek için iletişime geçin.</p>
              
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Demo talebiniz alındı!'); }}>
                <input 
                  type="text" 
                  placeholder="Adınız Soyadınız" 
                  className="w-full px-4 py-3 rounded-xl border border-ln-gray-200 dark:border-ln-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Kurumsal E-posta Adresiniz" 
                  className="w-full px-4 py-3 rounded-xl border border-ln-gray-200 dark:border-ln-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telefon Numaranız" 
                  className="w-full px-4 py-3 rounded-xl border border-ln-gray-200 dark:border-ln-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
                <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-transform hover:scale-[1.02] active:scale-95">
                  Tasarrufa Başla - Demo Talep Et
                </button>
              </form>
            </div>
            
            <button onClick={() => setStep(1)} className="text-xs text-ln-gray-400 text-center w-full hover:text-ln-gray-600 underline mt-4">
              Hesaplamayı Baştan Yap
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
