import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Ücretsiz ve Kayıpsız E-Ticaret Taşıma Kampanyası | Moyduz",
    description:
        "Eski e-ticaret altyapınızın limitlerine ve gizli maliyetlerine takılmayın. Cayma bedelinizi biz ödüyoruz, SEO sıralamalarınızı kaybetmeden Moyduz'a geçin.",
};

export default function MigrationCampaignPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section - Ads Traffic Lands Here */}
            <section className="relative px-6 pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-950 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-slate-950"></div>
                <div className="container relative max-w-5xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300 backdrop-blur-sm">
                        🚀 Başka altyapıdan geçiş yapanlara özel
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                        Eski Altyapınızın Limitlerine<br />Mahkum Değilsiniz
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        Gizli komisyonlar, trafik limitleri ve sürpriz yenileme faturalarıyla uğraşmayın.
                        Mevcut e-ticaret sitenizi <strong className="text-white">Moyduz'a kayıpsız taşıyoruz</strong>, üstelik eski sözleşmenizin
                        <strong className="text-blue-400"> cayma bedelini biz karşılıyoruz.</strong>
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                        <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20" asChild>
                            <Link href="/contact">
                                Taşıma Başvurusu Yapın <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base border-slate-700 text-slate-300 hover:bg-slate-800" asChild>
                            <Link href="#karsilastirma">
                                Rakiplerle Karşılaştırın
                            </Link>
                        </Button>
                    </div>
                    <div className="flex items-center justify-center gap-6 pt-8 text-sm text-slate-400">
                        <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Ücretsiz Veri Taşıma</div>
                        <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> %100 SEO Koruması</div>
                        <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> 0 Kesinti Süresi</div>
                    </div>
                </div>
            </section>

            {/* Pain Points vs Soluton (Competitor Analysis) */}
            <section id="karsilastirma" className="py-24 bg-white">
                <div className="container max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">Neden Mevcut Altyapınızı Değiştirmelisiniz?</h2>
                        <p className="text-slate-600 mt-4 max-w-2xl mx-auto">Sektördeki diğer yazılımların gizli maliyet ve kotaları e-ticaret büyümenizi yavaşlatır.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* The Competitor Reality */}
                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 space-y-6">
                            <h3 className="text-xl font-bold text-slate-800 border-b pb-4">Diğer Altyapıların Gerçekleri 📉</h3>
                            <ul className="space-y-5">
                                <li className="flex items-start gap-3">
                                    <div className="shrink-0 mt-1 bg-red-100 p-1 rounded-full"><span className="text-red-600 font-bold block w-4 h-4 text-center leading-none">X</span></div>
                                    <div>
                                        <strong className="block text-slate-900">Yüksek Trafik Sınırları ve Ek Ücretler</strong>
                                        <span className="text-slate-600 text-sm">Satışlarınız arttığında trafik kotasına takılır (örn: 500GB sınırı) ve ek sunucu parası ödersiniz.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="shrink-0 mt-1 bg-red-100 p-1 rounded-full"><span className="text-red-600 font-bold block w-4 h-4 text-center leading-none">X</span></div>
                                    <div>
                                        <strong className="block text-slate-900">Gecikmeli Tahsilat ve Altyapı Komisyonu</strong>
                                        <span className="text-slate-600 text-sm">"Sıfır komisyon" reklamlarına rağmen paranızı ertesi gün almak istediğinizde oranlar artar.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="shrink-0 mt-1 bg-red-100 p-1 rounded-full"><span className="text-red-600 font-bold block w-4 h-4 text-center leading-none">X</span></div>
                                    <div>
                                        <strong className="block text-slate-900">Tasarım Kısıtlamaları (Kapalı Kod)</strong>
                                        <span className="text-slate-600 text-sm">Sitenizi özelleştirmek istediğinizde en üst paketlere geçmeniz veya ekstra ücret ödemeniz istenir.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* The Moyduz Solution */}
                        <div className="bg-blue-600 text-white rounded-2xl p-8 space-y-6 shadow-xl shadow-blue-900/10">
                            <h3 className="text-xl font-bold border-b border-blue-500 pb-4">Moyduz ile Gerçek Özgürlük 🚀</h3>
                            <ul className="space-y-5">
                                <li className="flex items-start gap-3">
                                    <div className="shrink-0 mt-1"><CheckCircle2 className="h-6 w-6 text-blue-200" /></div>
                                    <div>
                                        <strong className="block text-white">Limitsiz Trafik ve Bant Genişliği</strong>
                                        <span className="text-blue-100 text-sm">Hiçbir paketimizde trafik kısıtlaması yoktur. Ziyaretçi sayınız milyonu bulsa da ek ücret ödemezsiniz.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="shrink-0 mt-1"><CheckCircle2 className="h-6 w-6 text-blue-200" /></div>
                                    <div>
                                        <strong className="block text-white">%0 Gizli Komisyon & Ertesi Gün Ödeme</strong>
                                        <span className="text-blue-100 text-sm">Gerçek anlamda komisyon ödemezsiniz ve ödeme altyapımızla ertesi gün tahsilat kullanırsınız.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="shrink-0 mt-1"><CheckCircle2 className="h-6 w-6 text-blue-200" /></div>
                                    <div>
                                        <strong className="block text-white">Tam Kod Erişimi ve Açık Mimari</strong>
                                        <span className="text-blue-100 text-sm">Hangi pakette olursanız olun HTML/CSS erişimi ve full entegrasyon API sınırınız yoktur.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Migration Feature Focus */}
            <section className="py-24 bg-slate-50 border-y border-slate-200">
                <div className="container max-w-4xl mx-auto px-6">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200/60">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <ShieldCheck className="h-12 w-12 text-blue-600 mb-6" />
                                <h3 className="text-2xl font-bold text-slate-800 mb-4">"SEO Kaybederim" Korkusuna Son</h3>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    Mevcut sitenizin Google'daki tüm indexleri, ürün URL yapısı ve blog içerikleri özel yönlendirme botlarımızla (301) birebir taşınır.
                                    Geçiş sırasında siteniz asla kapanmaz.
                                </p>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-slate-700 font-medium">
                                        <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm">1</span> Ürünler & Kategoriler Taşıması
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-700 font-medium">
                                        <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm">2</span> Üye & Sipariş Verileri Transferi
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-700 font-medium">
                                        <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm">3</span> Eksiksiz SEO (URL) Eşleştirmesi
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
                                <div className="absolute -right-10 -top-10 opacity-10"><Zap className="w-40 h-40" /></div>
                                <h4 className="font-bold text-xl mb-2 relative z-10 text-white">Cayma Bedeli Güvencesi</h4>
                                <p className="text-slate-300 text-sm mb-6 relative z-10">Mevcut sözleşmenizin bitmesine aylar kalmış olabilir. İstifa etmeyin, Moyduz bedeli karşılasın.</p>
                                <div className="bg-slate-800 p-4 rounded-xl relative z-10">
                                    <div className="text-xs text-slate-400 mb-1">Maksimum Destek Tutarı</div>
                                    <div className="text-2xl font-black text-emerald-400">10.000 TL'ye Kadar</div>
                                    <p className="text-xs text-slate-400 mt-2">*Eski firmanızın keseceği iptal faturası veya kalan kullanım bedelleri Moyduz bakiyenize eklenir.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-blue-600 text-white text-center">
                <div className="container max-w-3xl mx-auto px-6 space-y-8">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Hemen Geçiş Yapın, Büyümenizi Hızlandırın</h2>
                    <p className="text-lg text-blue-100">
                        Uzman hediye kargo bakiyeleriyle değil, doğrudan en düşük komisyon oranlarıyla gerçek kârınızı artırın. Bugün başvurun, 12 iş gününde sitenizi canlıya alalım.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Button size="lg" className="h-14 px-10 text-lg bg-white text-blue-600 hover:bg-slate-50" asChild>
                            <Link href="/contact">
                                Ücretsiz Taşıma Formu Doldur
                            </Link>
                        </Button>
                        <p className="text-sm mt-4 sm:mt-0 text-blue-200">veya 0850 XXX XX XX arayın</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
