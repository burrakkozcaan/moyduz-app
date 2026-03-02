# SERP / Landing Page Stratejisi – Mevcut Yapı Özeti

Paylaştığın stratejiyle Moyduz’un şu anki yapısının karşılaştırması.

---

## ✅ Şu an olanlar

| Strateji maddesi | Durum |
|------------------|--------|
| **Her güçlü keyword = ayrı sayfa** | Kısmen var: `/multi-vendor`, `/ozel-e-ticaret`, `/b2b-ecommerce`, `/ecommerce-migration` ayrı money page. |
| **Title & meta** | `generateMetadata()` ile frontmatter’dan; keyword meta description’da geçiyor. |
| **Tek H1** | `ServicePageLayout` hero’dan tek H1 veriyor (`hero.title`). |
| **H2 yapısı** | MDX içinde `##` ile H2’ler var (örn. multi-vendor: Multi-Vendor Nedir?, Platform Özellikleri, Komisyon Sistemi, Teknik Altyapı). |
| **FAQ blok** | Frontmatter’da `faqs`, sayfada SSS bölümü olarak render ediliyor. |
| **İç link** | `related_services`, `footer_links`, rehberler bölümü, MDX içi linkler. |

---

## ❌ Eksik / Uyumsuz kısımlar

### 1. **Keyword-first URL**
- Strateji: hedef kelimeyi URL’e taşı → örn. `/cok-saticili-e-ticaret-altyapisi`.
- Şu an: `/multi-vendor` (İngilizce). “Çok satıcılı e-ticaret altyapısı” için ayrı bir landing URL yok.
- **Öneri:** Ya `/cok-saticili-e-ticaret-altyapisi` açıp içeriği oraya taşıyıp `/multi-vendor`’u yönlendir, ya da aynı içerikle ek bir sayfa aç (canonical / redirect ile tek kaynağa bağla).

### 2. **Title’da keyword en başta**
- Strateji: `Çok Satıcılı E-Ticaret Altyapısı | Moyduz`.
- Şu an multi-vendor: `Multi-Vendor Marketplace Yazılımı | Pazaryeri Platformu | Moyduz` → keyword “çok satıcılı e-ticaret altyapısı” title’ın başında yok.
- **Öneri:** Her money page için hedef long-tail’i title’ın ilk kısmına al (örn. “Çok Satıcılı E-Ticaret Altyapısı | Moyduz”).

### 3. **H1 = hedef keyword**
- Strateji: Sayfada tek H1, metni hedef keyword olsun.
- Şu an: H1 = `hero.title` → “Multi-Vendor Marketplace” (ürün adı).
- **Öneri:** H1’i hedef keyword yap: “Çok Satıcılı E-Ticaret Altyapısı”. Alt başlık / subtitle ile markayı vurgulayabilirsin.

### 4. **FAQ Schema (JSON-LD)**
- Strateji: FAQ bölümü + `FAQPage` schema.
- Şu an: SSS bölümü var ama **FAQPage schema çıkmıyor** (rehber/blog’da var, money page’lerde yok).
- **Öneri:** Money page’lerde (multi-vendor, ozel-e-ticaret, b2b-ecommerce, ecommerce-migration) `frontmatter.faqs` varsa `buildFAQPageSchema()` ile script tag ekle → SERP’te “People Also Ask” ve rich result şansı artar.

### 5. **SERP rakip analizi (kelime sayısı, H2 sayısı, görsel, FAQ)**
- Şu an: İçerik uzunluğu ve H2 sayısı sabit bir kurala bağlı değil; rakip sayfalarıyla karşılaştırma yok.
- **Öneri:** Her hedef keyword için ilk 3–5 SERP sonucunu inceleyip ortalama kelime sayısı, H2 sayısı, görsel/FAQ varlığını not al; yeni/revizyon sayfalarda bu hedefleri karşılayacak şekilde içerik planı yap.

---

## Konumlama sorusu (A / B / C)

Strateji metnindeki seçenekler:

- **A) Marketplace SaaS** → “Türkiye’nin en gelişmiş pazaryeri yazılımı” odaklı; hedef kelimeler: pazaryeri yazılımı, multi vendor script, komisyonlu e-ticaret sistemi, trendyol benzeri site kurma, marketplace altyapısı.
- **B) Genel dijital ajans** → Web, SaaS, e-ticaret genel; ana sayfa “biz her türlü yazılım yapıyoruz” vibe’ı.
- **C) E-ticaret altyapı firması** → Özel e-ticaret + B2B + marketplace + geçiş; “e-ticaret altyapısı” ana çatı.

Moyduz şu an **C’ye yakın**, biraz **A** karışımı: marketplace (multi-vendor), özel e-ticaret, B2B, migration sayfaları var. Ana sayfa daha genel (“yazılım, e-ticaret, SaaS”) anlatıyor.

Net konumlama seçilirse:

- Ana sayfa mesajı ve H1/meta buna göre sadeleşir.
- Hangi keyword’lerin “ana” (landing page), hangilerinin “destek” (blok veya alt başlık) olacağı netleşir.
- Yeni landing’ler (örn. “pazaryeri yazılımı”, “komisyonlu e-ticaret sistemi”) konumlamaya göre açılır.

---

## Kısa aksiyon listesi

1. **FAQ schema:** ✅ Tüm money page’lerde `faqs` varsa JSON-LD `FAQPage` eklendi.
2. **Keyword-first title & H1:** ✅ Her money page için hedef long-tail title ve H1 güncellendi (multi-vendor → çok satıcılı e-ticaret altyapısı; özel e-ticaret, B2B, migration).
3. **URL:** ✅ `/cok-saticili-e-ticaret-altyapisi` eklendi; `/multi-vendor` 301 ile buraya yönlendiriliyor. İç linkler yeni URL’e güncellendi.
4. **Konumlama:** A / B / C’den birini netleştir; ana sayfa + money page mesajlarını buna göre güncelle.
5. **İsteğe bağlı:** 10 hedef keyword için sayfa yapısı, H1–H2 planı, kelime sayısı ve iç link planı çıkar (sonraki adım).

---

## SERP & Arama Niyeti

Yeni sayfa veya içerik öncesi: **SERP’e bak → Niyeti belirle (Informational / Commercial / Transactional / Navigational) → Aynı formatta sayfa üret.**

Detaylı adımlar ve Moyduz hedef kelimelerinin niyet → sayfa eşlemesi: **[docs/SEO-SERP-INTENT-REHBERI.md](./SEO-SERP-INTENT-REHBERI.md)**.
