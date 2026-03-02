import type { Metadata } from 'next'
import Link from 'next/link'
import { TableOfContents } from '@/components/TableOfContents'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'E-Ticaret Nasıl Yapılır? (2026 Güncel 15 Adımlı Rehber) | Moyduz',
  description:
    'E-ticaret nasıl yapılır? Sıfırdan e-ticaret sitesi kurmanın 15 adımı, maliyet hesabı, altyapı seçimi ve paket karşılaştırması. 2026 yılına özel kapsamlı rehber.',
  keywords: [
    'e-ticaret nasıl yapılır',
    'e-ticaret nasıl kurulur',
    'e-ticaret sitesi kurma',
    'e-ticaret başlangıç rehberi',
    'e-ticaret sitesi açma',
    'e-ticaret maliyeti 2026',
    'e-ticaret paketleri',
    'kendi e-ticaret sitemi kurmak',
    'özel e-ticaret altyapısı',
    'e-ticaret altyapısı seçimi',
  ],
  alternates: { canonical: 'https://moyduz.com/e-ticaret-nasil-yapilir-2026-rehberi' },
  openGraph: {
    title: 'E-Ticaret Nasıl Yapılır? (2026 Güncel 15 Adımlı Rehber)',
    description:
      'E-ticaret sitesi kurmak için gereken her şey: 15 adım, maliyet hesabı, altyapı karşılaştırması ve Türkiye\'ye özel ipuçları.',
    url: 'https://moyduz.com/e-ticaret-nasil-yapilir-2026-rehberi',
    type: 'article',
    locale: 'tr_TR',
    siteName: 'Moyduz',
    publishedTime: '2025-01-10T00:00:00Z',
    modifiedTime: '2026-02-01T00:00:00Z',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Ticaret Nasıl Yapılır? 2026 Rehberi',
    description: '15 adımda e-ticaret sitesi kurma, maliyet hesabı ve altyapı seçimi.',
  },
}

const tocItems = [
  { id: 'e-ticaret-nedir', label: 'E-Ticaret Nedir?', depth: 2 },
  { id: 'e-ticaret-turleri', label: 'E-Ticaret Türleri', depth: 2 },
  { id: 'gerekenler', label: 'Başlamak İçin Gerekenler', depth: 2 },
  { id: '15-adim', label: '15 Adımda E-Ticaret Sitesi Kurma', depth: 2 },
  { id: 'maliyet', label: 'E-Ticaret Sitesi Maliyeti 2026', depth: 2 },
  { id: 'altyapi-karsilastirma', label: 'Altyapı Karşılaştırması', depth: 2 },
  { id: 'turkiyede-e-ticaret', label: "Türkiye'de E-Ticaret", depth: 2 },
  { id: 'sss', label: 'Sık Sorulan Sorular', depth: 2 },
]

const faqs = [
  {
    question: 'E-ticaret yapmak için ne kadar sermaye gerekir?',
    answer:
      'Türkiye\'de hazır altyapıyla başlangıç için 10.000–30.000 TL yeterlidir. Özel yazılım ile profesyonel bir e-ticaret sitesi kurmak ise 100.000–400.000 TL arasında değişir. Komisyon, kargo ve pazarlama bütçesini de hesaba katarak toplam başlangıç sermayenizi 50.000–100.000 TL olarak planlayın.',
  },
  {
    question: 'Trendyol veya pazar yeri mi, yoksa kendi sitem mi daha karlı?',
    answer:
      'Pazar yerleri hızlı başlangıç için avantajlıdır; ancak %15–25 komisyon, marka kısıtlamaları ve müşteri verisine erişim engeli uzun vadede karlılığı düşürür. Kendi e-ticaret siteniz sıfır komisyon, tam marka kontrolü ve müşteri veri tabanı inşası sağlar. İdeal strateji: pazar yeriyle başlayın, ayda 50+ sipariş alırken kendi sitenizi açın.',
  },
  {
    question: 'E-ticaret için şirket kurmak zorunlu mu?',
    answer:
      'Evet, Türkiye\'de yasal olarak e-ticaret yapabilmek için en az şahıs şirketi kurmanız gerekir. Şahıs şirketi en hızlı ve düşük maliyetli seçenek (yaklaşık 1.000–2.000 TL). Yıllık 500.000 TL üzeri ciroyu hedefliyorsanız limited şirket avantajlıdır.',
  },
  {
    question: 'E-ticaret sitesi kurmak kaç gün sürer?',
    answer:
      'Hazır şablon tabanlı bir e-ticaret sitesi 1–2 haftada yayına alınabilir. Özel tasarım + özel yazılım ile kurumsal bir e-ticaret platformu 6–16 hafta sürer. Moyduz olarak ortalama 8–12 haftada teslim ediyoruz.',
  },
  {
    question: 'Türkiye\'de en çok hangi ürünler çevrimiçi satılır?',
    answer:
      'Türkiye e-ticaret pazarında en çok satılan kategoriler: giyim & aksesuar (%28), elektronik (%22), ev & yaşam (%16), kozmetik (%12), spor & outdoor (%8). Gıda & market kategorisi ise pandemi sonrası hızla büyümektedir.',
  },
  {
    question: 'Sanal POS almak için hangi bankayı seçmeliyim?',
    answer:
      'Türkiye\'de en yaygın sanal POS sağlayıcıları: Garanti, İş Bankası, Yapı Kredi, PayTR ve iyzico. Küçük hacimler için PayTR veya iyzico (entegrasyon kolaylığı, düşük sabit maliyet), büyük hacimler için banka sanal POS\'u (düşük komisyon) önerilir. Komisyon oranları %1,8–3,5 arasında değişir.',
  },
  {
    question: 'SEO mu yoksa ücretli reklamlar mı daha etkili e-ticarette?',
    answer:
      'İkisi birbirini tamamlar. SEO uzun vadeli, düşük maliyetli trafik sağlar (6–12 ay); ücretli reklamlar (Google Ads, Meta) anında trafik getirir ama bütçe kesilince durur. Başlangıçta %60 ücretli reklam + %40 SEO, olgunluk döneminde %30 ücretli + %70 organik ideal denge.',
  },
]

export default function ETicaretNasilYapilirPage() {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'E-Ticaret Nasıl Yapılır? (2026 Güncel 15 Adımlı Rehber)',
      description:
        'E-ticaret sitesi kurmak için gereken her şey: 15 adım, maliyet hesabı, altyapı karşılaştırması ve Türkiye\'ye özel ipuçları.',
      url: 'https://moyduz.com/e-ticaret-nasil-yapilir-2026-rehberi',
      datePublished: '2025-01-10T00:00:00Z',
      dateModified: '2026-02-01T00:00:00Z',
      author: { '@type': 'Organization', name: 'Moyduz', url: 'https://moyduz.com' },
      publisher: {
        '@type': 'Organization',
        name: 'Moyduz',
        url: 'https://moyduz.com',
        logo: { '@type': 'ImageObject', url: 'https://moyduz.com/logo.png' },
      },
      wordCount: 3800,
      inLanguage: 'tr-TR',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://moyduz.com' },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'E-Ticaret Nasıl Yapılır? 2026 Rehberi',
          item: 'https://moyduz.com/e-ticaret-nasil-yapilir-2026-rehberi',
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
  ]

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-ln-gray-500">
          <Link href="/" className="hover:text-ln-gray-900">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-ln-gray-700">E-Ticaret Rehberi 2026</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-ln-orange/10 px-3 py-1 text-sm font-medium text-ln-orange">
            <span>Güncel · 2026</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-ln-gray-900 md:text-4xl lg:text-5xl">
            E-Ticaret Nasıl Yapılır?
            <br />
            <span className="text-ln-orange">2026 Güncel 15 Adımlı Rehber</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ln-gray-600">
            Sıfırdan e-ticaret sitesi kurmak istiyorsunuz ama nereden başlayacağınızı bilmiyorsunuz. Bu kapsamlı rehberde; e-ticaret nedir, hangi altyapıyı seçmelisiniz, ne kadar maliyet çıkar ve Türkiye&apos;de başarılı olmak için ne yapmalısınız — hepsini adım adım anlatıyoruz.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-ln-gray-400">
            <time dateTime="2026-02-01">1 Şubat 2026 güncellendi</time>
            <span>·</span>
            <span>~18 dakika okuma süresi</span>
            <span>·</span>
            <span>Moyduz Ekibi</span>
          </div>
        </header>

        {/* Key Stats */}
        <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { value: '₺1,2 Trilyon', label: 'Türkiye e-ticaret hacmi (2025)' },
            { value: '%28', label: 'Yıllık büyüme oranı' },
            { value: '56 Milyon', label: 'Online alışveriş yapan kişi' },
            { value: '15 Adım', label: 'Bu rehberde ele alınan adımlar' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-ln-gray-100 bg-ln-gray-25 p-4 text-center">
              <div className="text-2xl font-bold text-ln-orange">{stat.value}</div>
              <div className="mt-1 text-xs text-ln-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* TOC */}
        <div className="mb-10 not-prose">
          <TableOfContents items={tocItems} title="Bu Rehberde" />
        </div>

        {/* Content */}
        <article className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-ln-orange prose-a:no-underline hover:prose-a:underline prose-strong:text-ln-gray-900">

          {/* Section 1 */}
          <h2 id="e-ticaret-nedir">E-Ticaret Nedir?</h2>
          <p>
            E-ticaret (elektronik ticaret), ürün ve hizmetlerin internet üzerinden alınıp satılmasıdır. Bir müşterinin akıllı telefonundan kıyafet sipariş etmesinden, bir şirketin çevrimiçi yazılım lisansı satın almasına kadar her türlü dijital ticaret e-ticaret kapsamına girer.
          </p>
          <p>
            Türkiye&apos;de e-ticaret sektörü 2025 yılında 1,2 trilyon TL hacme ulaşmış, küresel ortalamanın iki katı hızda büyümektedir. Bu büyüme, yeni girişimciler için olağanüstü bir fırsat penceresi açıyor.
          </p>
          <p>
            E-ticaretin geleneksel perakendeden temel farkları şunlardır: <strong>7/24 açık mağaza</strong>, coğrafi sınırsız satış alanı, <strong>düşük sabit gider</strong> (kira, personel), müşteri davranışlarını anlık takip edebilme ve <strong>kişiselleştirilmiş deneyim</strong> sunabilme.
          </p>

          {/* Section 2 */}
          <h2 id="e-ticaret-turleri">E-Ticaret Türleri: Hangisi Size Uygun?</h2>
          <p>E-ticaret modelini doğru seçmek, iş planınızın temelini oluşturur. Başlıca modeller:</p>

          <h3>B2C (İşletmeden Tüketiciye)</h3>
          <p>
            En yaygın model. Bir şirket, ürün veya hizmetini doğrudan bireysel tüketiciye satar. Türkiye&apos;de e-ticaret satışlarının <strong>%72&apos;si</strong> B2C modelinde gerçekleşiyor. Giyim, elektronik, kozmetik, ev eşyası bu modelin en güçlü kategorileri.
          </p>

          <h3>B2B (İşletmeden İşletmeye)</h3>
          <p>
            Şirketlerin birbirlerine ürün veya hizmet satması. Toptan satış, yazılım lisansları, hammadde tedariği B2B e-ticarete girer. Ortalama sipariş değeri B2C&apos;nin 5–10 katı olup uzun vadeli müşteri ilişkisi esastır. <Link href="/b2b-ecommerce">B2B e-ticaret çözümlerimizi inceleyin →</Link>
          </p>

          <h3>D2C (Üreticiden Tüketiciye)</h3>
          <p>
            Üretici firmanın aracısız olarak son tüketiciye satış yapması. Marka kontrolü yüksek, marj daha geniş; ancak lojistik ve müşteri hizmetleri sorumluluğu da üreticide.
          </p>

          <h3>C2C (Tüketiciden Tüketiciye)</h3>
          <p>
            Bireyler arası alışveriş. Sahibinden, Letgo gibi platformlar bu modele örnek. İkinci el ürünler, el yapımı ürünler (Etsy modeli) burada öne çıkar.
          </p>

          {/* Section 3 */}
          <h2 id="gerekenler">E-Ticarete Başlamak İçin Gerekenler</h2>
          <p>E-ticaret sitesi açmadan önce hazırlamanız gereken temel unsurlar:</p>
          <ul>
            <li><strong>Yasal yapı:</strong> Şahıs, limited veya anonim şirket kurulumu + vergi kaydı</li>
            <li><strong>Alan adı (domain):</strong> Markanızı yansıtan, kısa ve akılda kalıcı bir .com.tr veya .com uzantısı</li>
            <li><strong>Hosting / sunucu:</strong> E-ticaret altyapınıza göre değişen barındırma çözümü</li>
            <li><strong>Sanal POS:</strong> Kredi kartı ve banka kartı ödemelerini kabul edebilmek için banka veya ödeme sistemi sağlayıcısıyla anlaşma</li>
            <li><strong>Kargo anlaşması:</strong> MNG, Yurtiçi, Aras, PTT veya diğer kargo şirketleriyle hacim bazlı fiyat müzakeresi</li>
            <li><strong>Ürün fotoğrafları:</strong> Beyaz fon üzeri yüksek çözünürlüklü ürün görselleri (SEO ve dönüşüm için kritik)</li>
            <li><strong>Hukuki metinler:</strong> Gizlilik politikası, mesafeli satış sözleşmesi, iade politikası (KVKK zorunlu)</li>
            <li><strong>Muhasebe / fatura sistemi:</strong> e-Fatura veya e-Arşiv entegrasyonu</li>
          </ul>

          {/* Section 4 */}
          <h2 id="15-adim">15 Adımda E-Ticaret Sitesi Kurma</h2>

          {[
            {
              n: 1,
              title: 'Pazar ve Rakip Araştırması Yapın',
              body: 'Hangi ürünleri satacağınızı belirlemeden önce Google Trends, SEMrush veya Ahrefs ile arama hacimlerini inceleyin. Rakiplerinizin güçlü/zayıf yönlerini, fiyatlandırmalarını ve müşteri yorumlarını analiz edin. Niş bir pazar bulmak, büyük rakiplerle rekabet yerine hedef kitlenize daha hızlı ulaşmanızı sağlar.',
            },
            {
              n: 2,
              title: 'İş Modeli ve Ürün Stratejisi Belirleyin',
              body: 'Kendi ürününüzü mü üreteceksiniz, tedarikçiden mi alacaksınız, yoksa dropshipping mi yapacaksınız? Her modelin karlılık, risk ve operasyon yükü farklıdır. Başlangıçta 10–30 ürün SKU\'su ile odaklı bir katalogla başlamak, operasyonel karmaşıklığı azaltır.',
            },
            {
              n: 3,
              title: 'Şirket Kurun ve Vergi Kaydı Yaptırın',
              body: 'Türkiye\'de e-ticaret için en hızlı seçenek şahıs şirketidir (1–3 iş günü, ~1.500 TL). Yıllık 500.000 TL+ ciro hedefliyorsanız limited şirket daha avantajlıdır (kurumlar vergisi %25 vs gelir vergisi %40). Odanız ve Vergi Dairesi\'ne başvurun.',
            },
            {
              n: 4,
              title: 'Alan Adı ve Marka Tescili',
              body: 'Markanızı yansıtan, yazımı kolay bir domain seçin. Türkiye hedefliyorsanız .com.tr uzantısı (NIC.tr üzerinden, kimlik/şirket belgesi gerekli); küresel hedefliyorsanız .com. Domain tesciliyle birlikte marka tescili için Türk Patent Enstitüsü\'ne başvurmanızı öneririz.',
            },
            {
              n: 5,
              title: 'E-Ticaret Altyapısını Seçin',
              body: 'Bu karar en kritik adımdır. Hazır SaaS platformlar (Shopify, ikas, ideasoft) hızlı kurulum, düşük başlangıç maliyeti sunar; ancak işlem bazlı komisyon, özelleştirme kısıtları ve veri sahipliği sorunları beraberinde gelir. Özel yazılım daha yüksek başlangıç yatırımı gerektirse de uzun vadede sıfır komisyon, tam esneklik ve rekabetçi üstünlük sağlar.',
            },
            {
              n: 6,
              title: 'Tasarım ve Kullanıcı Deneyimi',
              body: 'E-ticaret sitelerinde %70 mobil trafik göz önüne alındığında, mobile-first tasarım zorunludur. Ana sayfa 3 saniyede yüklenmeli, ürün sayfası net fotoğraf + açıklama + fiyat + CTA barındırmalı, ödeme süreci maksimum 3 adımda tamamlanmalıdır. UX\'e yapılan her 1 TL yatırım ortalama 100 TL geri döner.',
            },
            {
              n: 7,
              title: 'Ürün Kataloğu ve İçerikler',
              body: 'Her ürün sayfası benzersiz içerik, anahtar kelime odaklı başlık ve meta açıklama içermelidir. Ürün fotoğrafları 1000x1000px+ çözünürlükte, beyaz arka planlı olmalı. Boyut/renk/varyant seçenekleri açık gösterilmeli. İçerik kalitesi hem SEO hem dönüşüm oranını doğrudan etkiler.',
            },
            {
              n: 8,
              title: 'Ödeme Sistemleri Entegrasyonu',
              body: 'Minimum: kredi kartı (visa/mastercard), banka havalesi ve kapıda ödeme seçeneği sunun. Sanal POS için PayTR, iyzico veya banka sanal POS\'u değerlendirin. 3D Secure zorunlu olsa da tek tıkla ödeme ve kayıtlı kart özelliği dönüşüm oranını %15–25 artırır.',
            },
            {
              n: 9,
              title: 'Kargo ve Lojistik Kurulumu',
              body: 'İlk 3 ayda tek kargo firmasıyla başlayın (MNG veya Yurtiçi). Günlük 20+ gönderi hacmine ulaşınca bölgesel kargo firmalarını da ekleyerek maliyet optimize edin. Kargo takip bildirimlerini otomatikleştirin, iade sürecini müşteri dostu hale getirin. Ücretsiz kargo eşiği (örn. 500 TL üzeri) ortalama sepet tutarını artırır.',
            },
            {
              n: 10,
              title: 'SEO Altyapısı Kurulumu',
              body: 'Teknik SEO: site hızı (Core Web Vitals), HTTPS, canonical URL\'ler, XML sitemap, yapılandırılmış veri (Schema.org). İçerik SEO: kategori ve ürün sayfaları için anahtar kelime araştırması, blog ve rehber içerikleri. Yerel SEO için Google Business Profile\'ı aktif edin. İlk 6 ayda organik trafik yatırımına odaklanın.',
            },
            {
              n: 11,
              title: 'Analitik ve Takip Araçları',
              body: 'Google Analytics 4, Google Search Console ve Microsoft Clarity\'yi kurun. Dönüşüm hunisini (ürün sayfası → sepet → ödeme → sipariş) izleyin. Hangi ürünlerin sepete eklendiğini ama satın alınmadığını analiz edin; bu "terkedilmiş sepet" oranı e-ticarette ortalama %70\'dir ve e-posta otomasyonuyla %10–15 geri kazanılabilir.',
            },
            {
              n: 12,
              title: 'Pazarlama Stratejisi Oluşturun',
              body: 'Başlangıç pazarlama karması: Google Ads (Alışveriş Reklamları) %40, Instagram/TikTok reklamları %30, e-posta pazarlaması %15, SEO %15. İlk 3 ayda müşteri edinme maliyetinizi (CAC) ve müşteri yaşam boyu değerinizi (LTV) ölçün. LTV/CAC oranı 3\'ün üzerindeyse ölçeklendirme zamanı.',
            },
            {
              n: 13,
              title: 'Müşteri Hizmetleri ve CRM',
              body: 'Canlı destek (WhatsApp Business, canlı sohbet), e-posta desteği ve SSS sayfası kurun. İlk 100 müşterinize kişisel ilgi gösterin; her yoruma yanıt verin. Müşteri memnuniyeti skoru (CSAT) %85\'in üzerinde tutmak, yeniden satın alma oranını %30–40 artırır.',
            },
            {
              n: 14,
              title: 'Yasal Uyum ve KVKK',
              body: 'Siteye mutlaka: Gizlilik Politikası, KVKK Aydınlatma Metni, Çerez Politikası, Mesafeli Satış Sözleşmesi ekleyin. Cookie consent banner\'ı zorunlu. ETBIS\'e kayıt olun (Ticaret Bakanlığı zorunluluğu). KVKK ihlali 50.000–5.000.000 TL idari para cezasına yol açabilir.',
            },
            {
              n: 15,
              title: 'Test, Yayın ve İlk Büyüme',
              body: 'Canlıya geçmeden önce: ödeme akışını test edin, tüm sayfalarda mobil görünümü kontrol edin, sipariş-kargo-iade sürecini simüle edin. İlk haftada 10 test siparişi verin. Yayın sonrası ilk 30 gün verilerini analiz edin, düşük performanslı ürünleri listeden çıkarın veya fiyatlandırmayı revize edin.',
            },
          ].map((step) => (
            <div key={step.n} className="not-prose mb-6 flex gap-4 rounded-xl border border-ln-gray-100 bg-ln-gray-25 p-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ln-orange text-base font-bold text-white">
                {step.n}
              </div>
              <div>
                <h3 className="mb-1 text-base font-semibold text-ln-gray-900">{step.title}</h3>
                <p className="text-sm leading-relaxed text-ln-gray-600">{step.body}</p>
              </div>
            </div>
          ))}

          {/* Section 5 */}
          <h2 id="maliyet">E-Ticaret Sitesi Kurma Maliyeti 2026</h2>
          <p>
            E-ticaret sitesi kurma maliyeti; altyapı türüne, özelleştirme düzeyine ve entegrasyon sayısına göre büyük farklılık gösterir. Aşağıdaki tablo, 2026 yılı Türkiye piyasa fiyatlarını yansıtmaktadır:
          </p>

          <div className="not-prose overflow-x-auto rounded-xl border border-ln-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ln-gray-100 bg-ln-gray-50">
                  <th className="px-4 py-3 text-left font-semibold text-ln-gray-700">Paket / Yöntem</th>
                  <th className="px-4 py-3 text-left font-semibold text-ln-gray-700">Başlangıç Maliyeti</th>
                  <th className="px-4 py-3 text-left font-semibold text-ln-gray-700">Aylık Gider</th>
                  <th className="px-4 py-3 text-left font-semibold text-ln-gray-700">Komisyon</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Hazır SaaS (Shopify, ikas)', '₺5.000–15.000', '₺500–3.000', '%1,5–2,5'],
                  ['Açık Kaynak (WooCommerce)', '₺15.000–50.000', '₺300–1.500', 'Yok'],
                  ['Özel Yazılım — Başlangıç', '₺100.000–200.000', '₺2.000–5.000', 'Yok'],
                  ['Özel Yazılım — Kurumsal', '₺300.000–800.000+', '₺5.000–20.000', 'Yok'],
                ].map(([name, start, monthly, comm]) => (
                  <tr key={name} className="border-b border-ln-gray-50 hover:bg-ln-gray-25">
                    <td className="px-4 py-3 font-medium text-ln-gray-800">{name}</td>
                    <td className="px-4 py-3 text-ln-gray-600">{start}</td>
                    <td className="px-4 py-3 text-ln-gray-600">{monthly}</td>
                    <td className="px-4 py-3 text-ln-gray-600">{comm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4">
            <strong>Gizli maliyetleri unutmayın:</strong> ödeme komisyonları (%1,8–3,5), kargo giderleri (sipariş başı ₺25–80), pazarlama bütçesi (aylık cironun %10–20&apos;si), muhasebe ve KDV yönetimi.
          </p>
          <p>
            Uzun vadede bakıldığında, <strong>yıllık 500.000 TL+ ciro hedefleyen işletmeler için özel yazılım</strong> genellikle SaaS platformlara göre 3–5 yılda %40–60 daha düşük toplam sahip olma maliyeti (TCO) sunar.
          </p>

          {/* Section 6 */}
          <h2 id="altyapi-karsilastirma">Altyapı Seçimi: Hazır SaaS mı, Özel Yazılım mı?</h2>
          <p>
            Bu soruyu cevaplamak için işletmenizin ölçeğine, büyüme hedeflerine ve özelleştirme ihtiyacına bakmanız gerekir.
          </p>

          <h3>Hazır SaaS Platformlarını Seçin, Eğer…</h3>
          <ul>
            <li>Aylık &lt;100 sipariş hacmiyle başlıyorsanız</li>
            <li>Teknik geliştirme ekibiniz yoksa ve hız öncelikliyse</li>
            <li>Standart ürün katalogları ve ödeme akışı yeterliyse</li>
            <li>Bütçeniz 50.000 TL altındaysa</li>
          </ul>

          <h3>Özel Yazılımı Seçin, Eğer…</h3>
          <ul>
            <li>Aylık 200+ sipariş veya yıllık 2 Milyon TL+ ciro hedefliyorsanız</li>
            <li>Çoklu satıcı (multi-vendor), abonelik veya B2B modeli kuruyorsanız</li>
            <li>Sektöre özgü iş akışları ve entegrasyonlar gerekiyorsa</li>
            <li>Müşteri verisinin tam kontrolünü istiyorsanız</li>
            <li>Uzun vadede komisyon ödemeden kurtulmak istiyorsanız</li>
          </ul>

          <div className="not-prose rounded-xl border border-ln-orange/20 bg-ln-orange/5 p-6">
            <p className="font-semibold text-ln-gray-900">Moyduz&apos;un Yaklaşımı</p>
            <p className="mt-2 text-sm leading-relaxed text-ln-gray-600">
              Moyduz olarak her işletmeye özel, komisyonsuz ve tam ölçeklenebilir e-ticaret altyapıları geliştiriyoruz. Başlangıç paketimiz 8–12 haftada teslim, Türkiye&apos;ye özel ödeme ve kargo entegrasyonları dahil.{' '}
              <Link href="/e-ticaret-paketleri" className="font-medium text-ln-orange hover:underline">
                E-ticaret paketlerimizi inceleyin →
              </Link>
            </p>
          </div>

          {/* Section 7 */}
          <h2 id="turkiyede-e-ticaret">Türkiye&apos;de E-Ticaret: Rakamlar ve Fırsatlar</h2>
          <p>
            Türkiye&apos;nin 85 milyonluk nüfusu ve genç demografisiyle e-ticaret pazarı, Avrupa&apos;nın en hızlı büyüyen pazarlarından biri. İşte 2025 verilerine göre temel göstergeler:
          </p>
          <ul>
            <li><strong>Pazar büyüklüğü:</strong> ₺1,2 trilyon (2024 yılına göre %28 büyüme)</li>
            <li><strong>Online alışveriş yapan nüfus:</strong> 56 milyon kişi (%65 internet penetrasyonu)</li>
            <li><strong>Mobil e-ticaret payı:</strong> toplam e-ticaret işlemlerinin %74&apos;ü</li>
            <li><strong>Ortalama sipariş değeri:</strong> ₺385 (2023 vs 2024: +%22 enflasyon etkisiyle)</li>
            <li><strong>En büyük kategoriler:</strong> giyim (%28), elektronik (%22), ev & yaşam (%16)</li>
            <li><strong>Ödeme tercihleri:</strong> kredi kartı %61, havale %14, kapıda ödeme %12, dijital cüzdan %13</li>
          </ul>
          <p>
            <strong>Fırsat alanları:</strong> B2B e-ticaret (hâlâ dijitalleşme sürecinde), gıda & market kategorisi, abonelik kutuları, D2C marka modeli ve uluslararası satış (özellikle MENA bölgesi).
          </p>

        </article>

        {/* FAQ */}
        <section className="mt-16" id="sss">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-ln-gray-900">Sık Sorulan Sorular</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-ln-gray-100 bg-ln-gray-25"
              >
                <summary className="flex cursor-pointer items-start justify-between gap-4 px-6 py-4 font-semibold text-ln-gray-900 marker:content-none">
                  {faq.question}
                  <span className="mt-0.5 shrink-0 text-ln-gray-400 transition-transform group-open:rotate-180">↓</span>
                </summary>
                <div className="border-t border-ln-gray-100 px-6 py-4 text-sm leading-relaxed text-ln-gray-600">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-ln-gray-900 px-8 py-10 text-center">
          <h2 className="text-2xl font-bold text-white">E-Ticaret Sitenizi Birlikte Kuralım</h2>
          <p className="mt-3 text-ln-gray-400">
            Komisyonsuz, hızlı, Türkiye&apos;ye özel. Ücretsiz keşif görüşmesi ile başlayın.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/e-ticaret-paketleri"
              className="inline-flex h-11 items-center rounded-xl bg-ln-orange px-6 text-sm font-semibold text-white hover:bg-ln-orange/90"
            >
              Paketleri İncele
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center rounded-xl border border-ln-gray-700 px-6 text-sm font-semibold text-white hover:bg-ln-gray-800"
            >
              Ücretsiz Teklif Al
            </Link>
          </div>
        </div>

        {/* Internal links */}
        <div className="mt-12 border-t border-ln-gray-100 pt-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-ln-gray-400">İlgili Sayfalar</p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/e-ticaret-paketleri', label: 'E-Ticaret Paketleri' },
              { href: '/ozel-e-ticaret', label: 'Özel E-Ticaret Altyapısı' },
              { href: '/b2b-ecommerce', label: 'B2B E-Ticaret' },
              { href: '/cok-saticili-e-ticaret-altyapisi', label: 'Çok Satıcılı E-Ticaret Altyapısı' },
              { href: '/tools/e-ticaret-kar-hesaplama', label: 'E-Ticaret Kâr Hesaplama' },
              { href: '/tools/maliyet-hesaplama', label: 'Maliyet Hesaplama' },
              { href: '/rehber', label: 'Tüm Rehberler' },
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
