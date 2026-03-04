import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'E-Ticaret Paketleri & Fiyatları 2026 | Moyduz',
  description:
    'Türkiye\'ye özel e-ticaret paketleri. Komisyonsuz, hızlı teslim, tam özelleştirme. Başlangıç, Business, Commerce ve Marketplace paket seçenekleri ve fiyatları.',
  keywords: [
    'e-ticaret paketleri',
    'e-ticaret fiyatları',
    'e-ticaret sitesi kurma fiyatı',
    'hazır e-ticaret sitesi fiyatları',
    'özel e-ticaret yazılımı fiyat',
    'e-ticaret sitesi yaptırma',
    'e-ticaret paket karşılaştırma',
    'komisyonsuz e-ticaret',
    'e-ticaret altyapısı fiyat',
    'moyduz e-ticaret paketi',
  ],
  alternates: { canonical: 'https://moyduz.com/e-ticaret-paketleri' },
  openGraph: {
    title: 'E-Ticaret Paketleri & Fiyatları 2026 | Moyduz',
    description:
      'Komisyonsuz, Türkiye\'ye özel e-ticaret paketleri. Başlangıç\'tan Marketplace\'e fiyat ve özellik karşılaştırması.',
    url: 'https://moyduz.com/e-ticaret-paketleri',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Moyduz',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Ticaret Paketleri & Fiyatları 2026',
    description: 'Komisyonsuz, Türkiye\'ye özel e-ticaret paketleri. Başlangıç\'tan Marketplace\'e.',
  },
}

const packages = [
  {
    name: 'Başlangıç',
    subtitle: 'Yeni işletmeler için',
    price: '$2,250+',
    priceTry: '≈ ₺75.000+',
    delivery: '4–6 hafta',
    highlight: false,
    features: [
      'Özel tasarım (Mobile-first)',
      'Sınırsız ürün ve kategori',
      'Sanal POS entegrasyonu (PayTR / iyzico)',
      'Kargo entegrasyonu (MNG, Yurtiçi, Aras)',
      'Stok ve sipariş yönetimi',
      'Temel SEO altyapısı',
      'Google Analytics 4 (GA4) Altyapısı',
      'SSL, KVKK metinleri',
      '3 ay ücretsiz teknik destek',
      'e-Fatura entegrasyonu',
    ],
    notIncluded: ['Çoklu satıcı', 'B2B modülü', 'Abonelik sistemi', 'Meta Pixel & Dönüşüm API'],
    cta: 'Teklif Al',
    ctaHref: '/contact',
  },
  {
    name: 'Business',
    subtitle: 'Büyüyen işletmeler için',
    price: '$3,750+',
    priceTry: '≈ ₺125.000+',
    delivery: '6–8 hafta',
    highlight: false,
    features: [
      'Başlangıç paketi özellikleri +',
      'Kupon, kampanya ve indirim motoru',
      'Terk edilen sepet e-posta otomasyonu',
      'Sadakat & puan sistemi',
      'B2B / toptan satış modülü',
      'Bayi paneli ve cari hesap yönetimi',
      'Gelişmiş analitik dashboard',
      '6 ay ücretsiz teknik destek',
      'Performans optimizasyonu (Core Web Vitals)',
      'WhatsApp Business entegrasyonu',
    ],
    notIncluded: ['Çoklu satıcı marketplace', 'Meta Pixel & Dönüşüm API', 'Çoklu dil'],
    cta: 'Teklif Al',
    ctaHref: '/contact',
  },
  {
    name: 'Commerce',
    subtitle: 'Hızla ölçeklenmek isteyenler için',
    price: '$4,750+',
    priceTry: '≈ ₺159.000+',
    delivery: '8–12 hafta',
    highlight: true,
    features: [
      'Business paketi özellikleri +',
      'Gelişmiş ürün filtreleme & arama',
      'Meta (Facebook) Pixel & Dönüşüm API',
      'Çoklu dil & para birimi',
      'E-ihracat & mikro ihracat desteği',
      'Stripe & PayPal entegrasyonu',
      'Özel raporlama & BI dashboard',
      '9 ay ücretsiz teknik destek',
    ],
    notIncluded: ['Çoklu satıcı marketplace', 'Özel ERP entegrasyonu'],
    cta: 'Teklif Al',
    ctaHref: '/contact',
  },
  {
    name: 'Marketplace',
    subtitle: 'Çok satıcılı platformlar için',
    price: '$8,500+',
    priceTry: '≈ ₺285.000+',
    delivery: '12–20 hafta',
    highlight: false,
    features: [
      'Commerce paketi özellikleri +',
      'Çoklu satıcı (Multi-vendor) marketplace',
      'Komisyon motoru ve otomatik ödeme dağıtımı',
      'Satıcı onboarding & bayi paneli',
      'Abonelik ve tekrarlayan ödeme sistemi',
      'ERP / CRM entegrasyonu',
      'Headless mimari seçeneği',
      'SLA garantili destek',
      '12 ay bakım ve destek',
      'Sınırsız özelleştirme',
    ],
    notIncluded: [],
    cta: 'Görüşme Talep Et',
    ctaHref: '/contact',
  },
]

const comparison = [
  { feature: 'Özel Tasarım', baslangic: true, business: true, commerce: true, marketplace: true },
  { feature: 'Sınırsız Ürün', baslangic: true, business: true, commerce: true, marketplace: true },
  { feature: 'Komisyon', baslangic: 'Yok', business: 'Yok', commerce: 'Yok', marketplace: 'Yok' },
  { feature: 'Sanal POS Entegrasyonu', baslangic: true, business: true, commerce: true, marketplace: true },
  { feature: 'Kargo Entegrasyonu', baslangic: true, business: true, commerce: true, marketplace: true },
  { feature: 'SEO Altyapısı', baslangic: 'Temel', business: 'Gelişmiş', commerce: 'Tam', marketplace: 'Tam' },
  { feature: 'Kampanya Motoru', baslangic: false, business: true, commerce: true, marketplace: true },
  { feature: 'Google Analytics 4 (GA4)', baslangic: true, business: true, commerce: true, marketplace: true },
  { feature: 'Meta Pixel Dönüşüm API', baslangic: false, business: false, commerce: true, marketplace: true },
  { feature: 'Çoklu Dil/Para Birimi', baslangic: false, business: false, commerce: true, marketplace: true },
  { feature: 'B2B Modülü', baslangic: false, business: true, commerce: false, marketplace: true },
  { feature: 'Multi-vendor Marketplace', baslangic: false, business: false, commerce: false, marketplace: true },
  { feature: 'Abonelik Sistemi', baslangic: false, business: false, commerce: false, marketplace: true },
  { feature: 'Teknik Destek', baslangic: '3 ay', business: '6 ay', commerce: '9 ay', marketplace: '12 ay' },
]

const faqs = [
  {
    question: 'E-ticaret paketi fiyatı neye göre değişiyor?',
    answer:
      'Fiyat; ürün kataloğu büyüklüğüne, özelleştirme düzeyine, entegrasyon sayısına (ERP, CRM, muhasebe) ve tasarım karmaşıklığına göre değişir. Yukarıdaki fiyatlar baz fiyatlardır; proje kapsamı netleştikçe kesin fiyat teklifi sunulur.',
  },
  {
    question: 'Moyduz e-ticaret siteleri Shopify\'dan ne farkı var?',
    answer:
      'Shopify\'da satış başına %0,5–2 işlem komisyonu ödenir ve platform kısıtlamaları içinde kalınır. Moyduz ile geliştirilen siteler tamamen size aittir: sıfır komisyon, tam kod sahipliği, sınırsız özelleştirme ve Türkiye\'ye özgü entegrasyonlar. 3 yıllık toplam maliyet karşılaştırmasında özel yazılım genellikle daha ekonomiktir.',
  },
  {
    question: 'Teslim süresi neden 6–20 hafta?',
    answer:
      'E-ticaret projelerinde tasarım, yazılım geliştirme, test ve içerik entegrasyonu aşamaları birbirini takip eder. Standart kalite kontrollerimiz ve kapsamlı test sürecimiz bu süreyi belirler. Acil durumlarda hızlandırılmış paket seçeneği mevcuttur.',
  },
  {
    question: 'Mevcut e-ticaret sitemi Moyduz\'a taşıyabilir miyim?',
    answer:
      'Evet. Ürün kataloğu, müşteri veritabanı ve sipariş geçmişi dahil komple migration yapıyoruz. Shopify, WooCommerce, Magento ve özel sistemlerden migration deneyimimiz var. <a href="/ecommerce-migration">E-ticaret migration sayfamızı inceleyin</a>.',
  },
  {
    question: 'Pakete dahil olmayan özellikler sonradan eklenebilir mi?',
    answer:
      'Evet, tüm paketlerimiz modüler yapıdadır. Başlangıç paketiyle başlayıp büyüdükçe B2B modülü, abonelik sistemi veya marketplace özellikleri eklenebilir. Her ek modül için ayrı fiyatlama yapılır.',
  },
  {
    question: 'Bakım ve destek paketi zorunlu mu?',
    answer:
      'Hayır, zorunlu değil. Her paket dahilinde ücretsiz destek süresi belirtilmiştir. Bu süre sonunda aylık bakım paketi ($125–450/ay) ile devam edebilir veya kendi teknik ekibinizle yönetebilirsiniz.',
  },
]

export default function ETicaretPaketleriPage() {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'E-Ticaret Paketleri & Fiyatları 2026',
      description: 'Türkiye\'ye özel komisyonsuz e-ticaret paketleri ve fiyat karşılaştırması.',
      url: 'https://moyduz.com/e-ticaret-paketleri',
      publisher: { '@type': 'Organization', name: 'Moyduz', url: 'https://moyduz.com' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://moyduz.com' },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'E-Ticaret Paketleri',
          item: 'https://moyduz.com/e-ticaret-paketleri',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Moyduz E-Ticaret Paketleri',
      itemListElement: packages.map((pkg, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: pkg.name,
        description: pkg.subtitle,
        url: 'https://moyduz.com/e-ticaret-paketleri',
      })),
    },
  ]

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      {/* Hero */}
      <section className="border-b border-ln-gray-100 bg-ln-gray-25 py-16 text-center md:py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <nav className="mb-6 flex items-center justify-center gap-2 text-sm text-ln-gray-500">
            <Link href="/" className="hover:text-ln-gray-900">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-ln-gray-700">E-Ticaret Paketleri</span>
          </nav>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ln-orange/20 bg-ln-orange/5 px-4 py-1.5 text-sm font-medium text-ln-orange">
            Komisyonsuz · Türkiye&apos;ye Özel · 2026
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-ln-gray-900 md:text-4xl lg:text-5xl">
            E-Ticaret Paketleri
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ln-gray-600">
            Başlangıçtan kurumsal ölçeğe, her işletme büyüklüğü için özel e-ticaret altyapısı. Sıfır komisyon, tam kod sahipliği, Türkiye&apos;ye özel entegrasyonlar.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
            {[
              { icon: '✓', text: 'Komisyon yok' },
              { icon: '✓', text: 'Tam kod sahipliği' },
              { icon: '✓', text: 'Türkiye\'ye özel entegrasyonlar' },
              { icon: '✓', text: '6–20 hafta teslim' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-1.5 text-ln-gray-600">
                <span className="text-ln-orange">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative flex flex-col rounded-2xl border p-8 ${pkg.highlight
                    ? 'border-ln-orange bg-ln-gray-900 text-white shadow-xl'
                    : 'border-ln-gray-100 bg-ln-gray-0'
                  }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-ln-orange px-4 py-1 text-xs font-bold text-white">
                    EN POPÜLER
                  </div>
                )}
                <div className="mb-6">
                  <p className={`text-sm font-medium ${pkg.highlight ? 'text-ln-gray-400' : 'text-ln-gray-500'}`}>
                    {pkg.subtitle}
                  </p>
                  <h2 className={`mt-1 text-2xl font-bold ${pkg.highlight ? 'text-white' : 'text-ln-gray-900'}`}>
                    {pkg.name}
                  </h2>
                  <div className="mt-4">
                    <span className={`text-3xl font-bold ${pkg.highlight ? 'text-white' : 'text-ln-gray-900'}`}>
                      {pkg.price}
                    </span>
                    <div className={`mt-0.5 text-sm ${pkg.highlight ? 'text-ln-gray-400' : 'text-ln-gray-500'}`}>
                      {pkg.priceTry} · Teslim: {pkg.delivery}
                    </div>
                  </div>
                </div>

                <ul className="mb-8 flex-1 space-y-2.5">
                  {pkg.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2.5 text-sm ${pkg.highlight ? 'text-ln-gray-300' : 'text-ln-gray-600'}`}>
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-ln-orange" fill="none" viewBox="0 0 16 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l3.5 3.5L13 4.5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                  {pkg.notIncluded.map((f) => (
                    <li key={f} className={`flex items-start gap-2.5 text-sm ${pkg.highlight ? 'text-ln-gray-600' : 'text-ln-gray-400'}`}>
                      <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" viewBox="0 0 16 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M4 4l8 8M12 4l-8 8" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={pkg.ctaHref}
                  className={`inline-flex h-11 w-full items-center justify-center rounded-xl text-sm font-semibold transition-colors ${pkg.highlight
                      ? 'bg-ln-orange text-white hover:bg-ln-orange/90'
                      : 'border border-ln-gray-200 bg-ln-gray-0 text-ln-gray-900 hover:bg-ln-gray-50'
                    }`}
                >
                  {pkg.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-ln-gray-400">
            Tüm fiyatlar USD bazlıdır, TL karşılıkları güncel kura göre değişir. KDV dahil değildir.
          </p>
        </div>
      </section>

      {/* Conversion Banner Section */}
      <section className="border-t border-ln-gray-100 py-12 bg-orange-50/50 dark:bg-orange-900/10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 mb-4">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-ln-gray-900 mb-2">
            Google Analytics 4 (GA4) ve Facebook Pixel Dönüşüm API'si Tek Tıkla Hazır
          </h2>
          <p className="text-ln-gray-600 max-w-2xl mx-auto">
            Satışlarınızı kör uçuşu yaparak yönetemezsiniz. Moyduz E-ticaret Paketlerinde, veri odaklı pazarlama (Performance Marketing) yapabilmeniz için gerekli tüm dönüşüm ayarlarınızı tek dokunuşla tamamlayın.
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="border-t border-ln-gray-100 py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-ln-gray-900">
            Paket Karşılaştırma
          </h2>
          <div className="overflow-x-auto rounded-xl border border-ln-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ln-gray-100 bg-ln-gray-50">
                  <th className="px-4 py-3 text-left font-semibold text-ln-gray-700">Özellik</th>
                  <th className="px-4 py-3 text-center font-semibold text-ln-gray-700">Başlangıç</th>
                  <th className="px-4 py-3 text-center font-semibold text-ln-gray-700">Business</th>
                  <th className="px-4 py-3 text-center font-semibold text-ln-orange">Commerce</th>
                  <th className="px-4 py-3 text-center font-semibold text-ln-gray-700">Marketplace</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature} className="border-b border-ln-gray-50 hover:bg-ln-gray-25">
                    <td className="px-4 py-3 font-medium text-ln-gray-700">{row.feature}</td>
                    {(['baslangic', 'business', 'commerce', 'marketplace'] as const).map((col) => (
                      <td key={col} className="px-4 py-3 text-center">
                        {row[col] === true ? (
                          <svg className="mx-auto h-4 w-4 text-ln-orange" fill="none" viewBox="0 0 16 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l3.5 3.5L13 4.5" />
                          </svg>
                        ) : row[col] === false ? (
                          <span className="text-ln-gray-300">—</span>
                        ) : (
                          <span className="text-xs text-ln-gray-600">{row[col]}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* vs section */}
      <section className="border-t border-ln-gray-100 py-16 bg-ln-gray-25">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-2 text-center text-2xl font-bold tracking-tight text-ln-gray-900">
            Moyduz vs Hazır SaaS Platformlar
          </h2>
          <p className="mb-8 text-center text-ln-gray-500">3 yıllık toplam sahip olma maliyeti karşılaştırması (yıllık ₺5M ciro varsayımı)</p>
          <div className="overflow-x-auto rounded-xl border border-ln-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ln-gray-100 bg-ln-gray-50">
                  <th className="px-4 py-3 text-left font-semibold text-ln-gray-700" />
                  <th className="px-4 py-3 text-center font-semibold text-ln-orange">Moyduz Özel</th>
                  <th className="px-4 py-3 text-center font-semibold text-ln-gray-700">Shopify Basic</th>
                  <th className="px-4 py-3 text-center font-semibold text-ln-gray-700">WooCommerce</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Başlangıç Maliyeti', '₺252.000', '₺5.000', '₺20.000'],
                  ['Aylık Platform Ücreti', '₺0', '₺1.200', '₺800'],
                  ['İşlem Komisyonu (/yıl)', '₺0', '₺75.000', '₺0'],
                  ['3 Yıl Toplam Maliyet', '~₺280.000', '~₺320.000', '~₺50.000*'],
                  ['Özelleştirme Özgürlüğü', 'Tam', 'Kısıtlı', 'Orta'],
                  ['Müşteri Veri Sahipliği', 'Tam sizin', 'Shopify\'da', 'Sizin'],
                ].map(([feat, moyduz, shopify, woo]) => (
                  <tr key={feat} className="border-b border-ln-gray-50">
                    <td className="px-4 py-3 font-medium text-ln-gray-700">{feat}</td>
                    <td className="px-4 py-3 text-center font-semibold text-ln-orange">{moyduz}</td>
                    <td className="px-4 py-3 text-center text-ln-gray-600">{shopify}</td>
                    <td className="px-4 py-3 text-center text-ln-gray-600">{woo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ln-gray-400">* WooCommerce düşük platform maliyeti ancak geliştirici bakım giderleri hesaba katılmamıştır.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-ln-gray-100 py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-ln-gray-900">
            Sık Sorulan Sorular
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-ln-gray-100 bg-ln-gray-25">
                <summary className="flex cursor-pointer items-start justify-between gap-4 px-6 py-4 font-semibold text-ln-gray-900 marker:content-none">
                  {faq.question}
                  <span className="mt-0.5 shrink-0 text-ln-gray-400 transition-transform group-open:rotate-180">↓</span>
                </summary>
                <div
                  className="border-t border-ln-gray-100 px-6 py-4 text-sm leading-relaxed text-ln-gray-600"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-ln-gray-100 py-16">
        <div className="container mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-ln-gray-900 md:text-3xl">
            Hangi Paketi Seçeceğinizden Emin Değil misiniz?
          </h2>
          <p className="mt-3 text-ln-gray-500">
            Ücretsiz 30 dakikalık keşif görüşmesi ile projenizi değerlendiriyor, size en uygun paketi öneriyoruz.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center rounded-xl bg-ln-orange px-8 text-sm font-semibold text-white hover:bg-ln-orange/90"
            >
              Ücretsiz Teklif Al
            </Link>
            <Link
              href="/e-ticaret-nasil-yapilir-2026-rehberi"
              className="inline-flex h-12 items-center rounded-xl border border-ln-gray-200 px-6 text-sm font-semibold text-ln-gray-700 hover:bg-ln-gray-50"
            >
              E-Ticaret Rehberini Oku
            </Link>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <div className="border-t border-ln-gray-100 py-10">
        <div className="container mx-auto max-w-4xl px-4">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-ln-gray-400">İlgili Sayfalar</p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/e-ticaret-nasil-yapilir-2026-rehberi', label: 'E-Ticaret Nasıl Yapılır? Rehber' },
              { href: '/ozel-e-ticaret', label: 'Özel E-Ticaret Altyapısı' },
              { href: '/b2b-ecommerce', label: 'B2B E-Ticaret' },
              { href: '/cok-saticili-e-ticaret-altyapisi', label: 'Çok Satıcılı E-Ticaret Altyapısı' },
              { href: '/ecommerce-migration', label: 'E-Ticaret Migration' },
              { href: '/services', label: 'Tüm Hizmetler' },
              { href: '/contact', label: 'İletişim' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-ln-gray-200 bg-ln-gray-25 px-3 py-1.5 text-sm text-ln-gray-700 hover:border-ln-orange/40 hover:text-ln-orange"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
