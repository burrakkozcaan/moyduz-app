import { NextResponse } from "next/server";
import { getAllBlogPosts } from "@/lib/mdx";
import { getAllRehberPosts } from "@/lib/rehber";
import { getAllComparePosts } from "@/lib/compare";

export const dynamic = "force-static";

export async function GET() {
  const [blogPosts, rehberPosts, comparePosts] = await Promise.all([
    getAllBlogPosts(),
    getAllRehberPosts(),
    getAllComparePosts(),
  ]);

  const blogLines = blogPosts
    .map((p) => {
      const title = p.frontmatter.meta_title || p.frontmatter.title;
      const desc = p.frontmatter.meta_description
        ? `: ${String(p.frontmatter.meta_description).substring(0, 120)}`
        : "";
      return `- [${title}](https://moyduz.com/blog/${p.frontmatter.slug})${desc}`;
    })
    .join("\n");

  const rehberLines = rehberPosts
    .map((p) => {
      const title = p.frontmatter.meta_title || p.frontmatter.title;
      const desc = p.frontmatter.meta_description
        ? `: ${String(p.frontmatter.meta_description).substring(0, 120)}`
        : "";
      return `- [${title}](https://moyduz.com/rehber/${p.frontmatter.slug})${desc}`;
    })
    .join("\n");

  const compareLines = comparePosts
    .map((p) => {
      const title = p.frontmatter.meta_title || p.frontmatter.title;
      const desc = p.frontmatter.meta_description
        ? `: ${String(p.frontmatter.meta_description).substring(0, 120)}`
        : "";
      return `- [${title}](https://moyduz.com/compare/${p.frontmatter.slug})${desc}`;
    })
    .join("\n");

  const llmsContent = `# Moyduz

> Moyduz; özel e-ticaret platformları, SaaS ürünleri ve yapay zeka otomasyon araçları geliştiren yazılım şirketi ve web tasarım ajansıdır. Türkiye merkezli, 150+ ülkede müşterilere hizmet vermektedir.

## Hizmetler

- [Web Tasarım Ajansı](https://moyduz.com/services/web-design): Markalara özel profesyonel web sitesi tasarımı. Özel UI/UX, mobil uyumlu tasarım ve dönüşüm optimizasyonu.
- [Web Geliştirme](https://moyduz.com/services/web-development): Next.js, React ve Node.js tabanlı full-stack web geliştirme hizmetleri.
- [E-Ticaret Geliştirme](https://moyduz.com/services/ecommerce-website-development): B2C/B2B e-ticaret yetenekleriyle online mağaza ve marketplace geliştirme.
- [Özel E-Ticaret Altyapısı](https://moyduz.com/ozel-e-ticaret): Komisyonsuz, tam özelleştirilebilir, Türkiye'ye özel e-ticaret platformu.
- [B2B E-Ticaret](https://moyduz.com/b2b-ecommerce): Kurumsal satış için B2B e-ticaret çözümleri.
- [Multi-Vendor Marketplace](https://moyduz.com/multi-vendor): Çok satıcılı pazaryeri platformu geliştirme.
- [E-Ticaret Migration](https://moyduz.com/ecommerce-migration): Mevcut e-ticaret sitenizi Moyduz altyapısına taşıma.
- [Yazılım Şirketi](https://moyduz.com/services/software-company): Karmaşık iş gereksinimleri için özel yazılım geliştirme.

## E-Ticaret Paketleri ve Fiyatlandırma

- [E-Ticaret Paketleri](https://moyduz.com/e-ticaret-paketleri): Türkiye'ye özel komisyonsuz e-ticaret paketleri ve fiyat karşılaştırması.
  - Başlangıç: $3.250+ tek seferlik kurulum, 6–8 hafta teslim
  - Büyüme: $7.500+ başlangıç, 8–12 hafta teslim
  - Kurumsal: Özel fiyat, 12–20 hafta teslim
- [Fiyatlandırma](https://moyduz.com/pricing): Tüm paketler için şeffaf fiyatlandırma.

## Temel Sayfalar

- [Ana Sayfa](https://moyduz.com): Türkiye'nin büyüyen işletmeleri için e-ticaret ve yazılım çözümleri.
- [Hakkımızda](https://moyduz.com/about): Şirket bilgileri, misyon ve ekip.
- [Hizmetler](https://moyduz.com/services): Kapsamlı dijital hizmetler rehberi.
- [Referanslar](https://moyduz.com/customers): Müşteri başarı hikayeleri ve referanslar.
- [İletişim](https://moyduz.com/contact): Ücretsiz teklif ve proje görüşmesi.
- [Kariyer](https://moyduz.com/careers): Açık pozisyonlar ve iş fırsatları.
- [Sık Sorulan Sorular](https://moyduz.com/faq): Sık sorulan sorular ve cevaplar.
- [Changelog](https://moyduz.com/changelog): Ürün güncellemeleri ve değişiklik geçmişi.
- [Partner Programı](https://moyduz.com/partner-programi): Moyduz iş ortağı programı.

## SEO ve İçerik Rehberleri

- [E-Ticaret Nasıl Yapılır? 2026 Rehberi](https://moyduz.com/e-ticaret-nasil-yapilir-2026-rehberi): Sıfırdan e-ticaret sitesi kurmanın 15 adımı, maliyet hesabı ve altyapı seçimi.
- [Tüm Rehberler](https://moyduz.com/rehber): Adım adım uygulama rehberleri.
${rehberLines}

## Blog — E-Ticaret, Yazılım ve Dijital Büyüme

- [Blog Ana Sayfa](https://moyduz.com/blog): Web tasarım, geliştirme, e-ticaret ve dijital pazarlama üzerine uzman içerikler.
- [E-Ticaret Kategorisi](https://moyduz.com/blog/e-ticaret): E-ticaret konularında tüm yazılar.
- [Teknik Kategori](https://moyduz.com/blog/teknik): Teknik yazılar ve geliştirici içerikleri.
- [AI & SEO Kategorisi](https://moyduz.com/blog/ai-seo): Yapay zeka ve SEO konularında içerikler.
- [İş Kurma Kategorisi](https://moyduz.com/blog/is-kurma): Girişimcilik ve iş kurma rehberleri.
${blogLines}

## Karşılaştırmalar

- [Alternatifler](https://moyduz.com/alternatives): Platform ve araç alternatifleri.
- [Compare](https://moyduz.com/compare): Detaylı platform karşılaştırmaları.
${compareLines}

## Ücretsiz Araçlar

- [E-Ticaret Araçları](https://moyduz.com/tools): Ücretsiz hesaplama ve analiz araçları.
- [E-Ticaret Kâr Hesaplama](https://moyduz.com/tools/e-ticaret-kar-hesaplama): Ürün başına net kâr ve kâr marjı hesaplayıcı.
- [Maliyet Hesaplama](https://moyduz.com/tools/maliyet-hesaplama): E-ticaret sitesi kurma maliyeti hesaplayıcı.
- [ROI Hesaplama](https://moyduz.com/tools/roi-hesaplama): Yatırım getirisi (ROI) hesaplayıcı.
- [Komisyon Hesaplama](https://moyduz.com/tools/komisyon-hesaplama): Pazar yeri komisyon hesaplayıcı.
- [Sanal POS Maliyet Hesaplama](https://moyduz.com/tools/sanal-pos-hesaplama): Sanal POS maliyet karşılaştırma aracı.
- [Site Sağlık Skoru](https://moyduz.com/tools/site-saglik-skoru): Web sitesi performans ve SEO sağlık skoru.

## AI Besleme Verileri

- [AI İndeks](https://moyduz.com/ai-index.json): LLM keşfi için AI arama indeksi.
- [Bilgi Grafiği](https://moyduz.com/knowledge-graph.json): Varlık ilişkileri ve hizmet bağlantıları.
- [AI İşletme](https://moyduz.com/ai-business.json): İşletme varlık bilgileri ve E-E-A-T sinyalleri.
- [Yazar Sinyalleri](https://moyduz.com/author-signals.json): Yazar itibar grafiği.
- [Deneyimler](https://moyduz.com/experiences.json): AI Overviews için kullanıcı deneyimleri.
- [Vektör Site Haritası](https://moyduz.com/vector-sitemap.json): AI motorları için semantik site haritası.

## İletişim

- E-posta: info@moyduz.com
- Telefon: +1-505-460-5392
- Web sitesi: https://moyduz.com
- İletişim Formu: https://moyduz.com/contact
- İstanbul, Türkiye
`;

  return new NextResponse(llmsContent, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
