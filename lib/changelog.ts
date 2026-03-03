export const CHANGELOG_ENTRIES = [
  {
    id: '2025-11-24',
    date: '24 Kas 2025',
    readTime: '2 dk okuma',
    image: '/images/changelog/2025-11-24.svg',
    title: 'Moyduz 2.0: B2B Yetenekleri ve Gelişmiş Pazar Yeri Altyapısı',
    description:
      'Moyduz 2.0 ile B2B yeteneklerini, yeni pazar yeri entegrasyonlarını ve performans iyileştirmelerini kullanıma sunduk.',
    content: `
## Moyduz 2.0: B2B Yetenekleri ve Gelişmiş Pazar Yeri Altyapısı

Moyduz 2.0 sürümünü duyurmaktan heyecan duyuyoruz! Bu büyük güncellemeyle işinizi daha da büyütecek güçlü araçlar sunuyoruz.

### Neler Yeni?

**B2B Özellikleri**
- Toptan satış fiyatlandırmaları ve özel müşteri grupları kurma
- Gelişmiş sipariş onay mekanizmaları
- Kurumsal firmalara özel ödeme seçenekleri sağlama

**Gelişmiş Pazar Yeri Entegrasyonları**
- Amazon, Trendyol ve Hepsiburada için yeni nesil çift yönlü senkronizasyon
- Toplu ürün yükleme ve kategori eşleştirme sistemleri
- Detaylı kargo ve sipariş karşılama süreçleri

**Performans Arayüz İyileştirmeleri**
- Yönetim panelinde 2x daha hızlı yükleme süreleri
- Yenilenmiş tek sayfamlı sipariş detay ekranı
- Daha kapsamlı ve kişiselleştirilebilir raporlama

**Daha Fazlası**
- Yeni dil destekleri ve çoklu para birimi geliştirmeleri eklendi
- Pazarlama otomasyonları altyapısı güçlendirildi
    `,
  },
  {
    id: '2025-03-24',
    date: '24 Mar 2025',
    readTime: '2 dk okuma',
    image: '/images/changelog/2025-03-24.svg',
    title: 'Yeni Vitrin Temaları, SEO İyileştirmeleri ve Güçlü Tasarım Editörü',
    description:
      'Moyduz mağazanızın görünümünü özelleştirmenizi sağlayan yeni vitrin temaları eklendi, SEO ve tasarım editörü özellikleri zenginleştirildi.',
    content: `
## Yeni Vitrin Temaları, SEO İyileştirmeleri ve Güçlü Tasarım Editörü

Müşterilerinizin alışveriş deneyimini en üst seviyeye çıkaracak özellikler ve arama motorlarında kolay bulunmanızı sağlayacak SEO geliştirmeleri yayında.

### Öne Çıkanlar

**Yeni Vitrin Temaları**
- Farklı sektörler için optimize edilmiş 5 yeni ve modern tema
- Tamamen mobil uyumlu, performans odaklı tasarımlar
- Genişletilmiş renk, font ve stil seçenekleri

**SEO Geliştirmeleri**
- Tüm sayfalar için detaylı meta etiket yönetimi
- Yapılandırılmış veri (Schema.org) geliştirmeleri
- Hızlı Google indexlemesi için IndexNow API entegrasyonu

**Tasarım Editörü**
- Sezgisel sürükle ve bırak sayfa oluşturucu yapısı
- Daha pratik ve akıcı bileşen düzenleme özellikleri eklendi
- Önceden tanımlanmış pazarlama ve satış blokları oluşturuldu

**Geliştirici Odaklı**
- Mevcut API limitleri genişletildi
- Yeni dokümantasyon portalımız kullanıma açıldı
    `,
  },
  {
    id: '2024-04-01',
    date: '01 Nis 2024',
    readTime: '3 dk okuma',
    image: '/images/changelog/2024-04-01.svg',
    title: 'Moyduz 1.0 Yayında: E-ticaret Altyapısında Yeni Dönem',
    description:
      "Moyduz ile e-ticaret işinizi kolayca kurun, yönetin ve hızla büyütün. İlk kararlı sürümümüz heyecanla yayına alındı.",
    content: `
## Moyduz 1.0 Yayında: E-ticaret Altyapısında Yeni Dönem

Moyduz 1.0 nihayet kullanıcılarla buluştu! İşletmelerin dijitalleşmesine rehberlik edecek güçlü e-ticaret altyapımızı kullanıma sunmaktan gurur duyuyoruz.

### Başlıca Özellikler

**Kapsamlı Yönetim Paneli**
- Gelişmiş ürün, kategori yapısı ve akıllı stok yönetimi
- Siparişlerin tek noktadan rahatlıkla takibi ve kargo işlemleri
- Kupon, indirim ve kampanyalarla müşteri ilişkileri yönetimi

**Çoklu Satış Kanalları**
- Popüler pazar yeri entegrasyonlarının temelleri atıldı
- Sosyal medya mağazalarıyla hızlı veri akışı

**Ödeme Çözümleri**
- İyzico, PayTR, Stripe gibi yerel ve global entegrasyonlar
- Gelişmiş güvenlik standartları (PCI-DSS) ve risk değerlendirmesi

**Sonsuz Teşekkürler**
- İlk test kullanıcılarımıza ve bizimle yola çıkan markalara sonsuz teşekkürler
- Sağladığınız değerli geri bildirimlerle büyümeye devam edeceğiz
    `,
  },
] as const;

export type ChangelogId = (typeof CHANGELOG_ENTRIES)[number]['id'];
