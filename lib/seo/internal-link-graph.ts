/**
 * MOYDUZ EXACT INTERNAL LINK GRAPH
 *
 * Şehir metaforu:
 * - BLOG = yollar
 * - MONEY PAGES = şehir merkezi
 * - TOOLS = trafik ışıkları
 * - FOOTER = otoyol
 *
 * Amaç: Google'a "Moyduz = e-ticaret kurma otoritesi" mesajı vermek.
 */

export type ClusterKey =
  | 'para-kazanma'
  | 'nedir'
  | 'e-ticaret-rehber'
  | 'tool'
  | 'trend'

export interface MoneyPage {
  path: string
  label: string
  /** Kısa açıklama (footer vb.) */
  shortLabel?: string
}

/** Core conversion pages – tüm site buraya akmalı */
export const CORE_MONEY_PAGES: MoneyPage[] = [
  { path: '/ozel-e-ticaret', label: 'Özel E-Ticaret', shortLabel: 'Özel E-Ticaret' },
  { path: '/b2b-ecommerce', label: 'B2B E-Ticaret', shortLabel: 'B2B E-Ticaret' },
  { path: '/cok-saticili-e-ticaret-altyapisi', label: 'Çok Satıcılı E-Ticaret Altyapısı', shortLabel: 'Pazaryeri' },
  { path: '/ecommerce-migration', label: 'E-Ticaret Geçişi', shortLabel: 'Geçiş & Migration' },
  { path: '/pricing', label: 'Fiyatlandırma', shortLabel: 'Pricing' },
  { path: '/marketplace/templates', label: 'Şablonlar', shortLabel: 'Şablonlar' },
]

/** Blog slug → cluster + bu yazıdan verilecek money page linkleri */
export interface BlogNode {
  slug: string
  title: string
  cluster: ClusterKey
  /** Bu yazıda mutlaka link verilecek money page path'leri */
  moneyLinks: string[]
  /** Bu yazıdan link verilecek diğer blog slug'ları (en az 3) */
  blogLinks?: string[]
}

/** Mevcut + planlanan blog slug'lar ve internal link hedefleri */
export const BLOG_INTERNAL_GRAPH: BlogNode[] = [
  // 🟢 PARA KAZANMA
  {
    slug: 'online-is-fikirleri-2026',
    title: "2026'da Online İş Fikirleri",
    cluster: 'para-kazanma',
    moneyLinks: ['/ozel-e-ticaret', '/ecommerce-migration', '/pricing'],
    blogLinks: ['pasif-gelir-nedir', 'e-ticaret-sitesi-nasil-kurulur', 'shopify-mi-ozel-yazilim-mi'],
  },
  {
    slug: 'pasif-gelir-nedir',
    title: 'Pasif Gelir Nedir?',
    cluster: 'para-kazanma',
    moneyLinks: ['/ozel-e-ticaret', '/ecommerce-migration', '/pricing'],
    blogLinks: ['online-is-fikirleri-2026', 'e-ticaret-mi-freelance-mi', 'e-ticaret-sitesi-nasil-kurulur'],
  },
  {
    slug: 'e-ticaret-mi-freelance-mi',
    title: 'E-Ticaret mi Freelance mi?',
    cluster: 'para-kazanma',
    moneyLinks: ['/ozel-e-ticaret', '/pricing'],
    blogLinks: ['online-is-fikirleri-2026', 'pasif-gelir-nedir', 'e-ticaret-sitesi-nasil-kurulur'],
  },
  // 🔵 NEDİR
  {
    slug: 'ozel-e-ticaret-nedir',
    title: 'Özel E-Ticaret Nedir?',
    cluster: 'nedir',
    moneyLinks: ['/marketplace/templates', '/ozel-e-ticaret'],
    blogLinks: ['e-ticaret-sitesi-nasil-kurulur', 'shopify-mi-ozel-yazilim-mi', 'multi-vendor-nedir'],
  },
  {
    slug: 'multi-vendor-nedir',
    title: 'Multi Vendor Nedir?',
    cluster: 'nedir',
    moneyLinks: ['/cok-saticili-e-ticaret-altyapisi', '/pricing'],
    blogLinks: ['ozel-e-ticaret-nedir', 'e-ticaret-sitesi-nasil-kurulur', 'saas-nedir'],
  },
  {
    slug: 'saas-nedir',
    title: 'SaaS Nedir?',
    cluster: 'nedir',
    moneyLinks: ['/marketplace/templates', '/ozel-e-ticaret'],
    blogLinks: ['ozel-e-ticaret-nedir', 'multi-vendor-nedir', 'cro-nedir'],
  },
  {
    slug: 'cro-nedir',
    title: 'CRO (Conversion Rate Optimization) Nedir?',
    cluster: 'nedir',
    moneyLinks: ['/ozel-e-ticaret'],
    blogLinks: ['satis-yapmayan-site', 'donusum-orani-nasil-artirilir', 'ozel-e-ticaret-nedir'],
  },
  // 🟣 E-TİCARET REHBER
  {
    slug: 'e-ticaret-sitesi-nasil-kurulur',
    title: 'E-Ticaret Sitesi Nasıl Kurulur?',
    cluster: 'e-ticaret-rehber',
    moneyLinks: ['/ozel-e-ticaret', '/ecommerce-migration'],
    blogLinks: ['shopify-mi-ozel-yazilim-mi', 'satis-yapmayan-site', 'online-is-fikirleri-2026'],
  },
  {
    slug: 'shopify-mi-ozel-yazilim-mi',
    title: 'Shopify mı Özel Yazılım mı?',
    cluster: 'e-ticaret-rehber',
    moneyLinks: ['/ecommerce-migration', '/pricing'],
    blogLinks: ['e-ticaret-sitesi-nasil-kurulur', 'ozel-e-ticaret-nedir', 'e-ticaret-sitesi-nasil-kurulur'],
  },
  {
    slug: 'satis-yapmayan-site',
    title: 'Satış Yapmayan E-Ticaret Sitesi Nasıl Düzeltilir?',
    cluster: 'e-ticaret-rehber',
    moneyLinks: ['/ozel-e-ticaret'],
    blogLinks: ['cro-nedir', 'donusum-orani-nasil-artirilir', 'e-ticaret-sitesi-nasil-kurulur'],
  },
  {
    slug: 'donusum-orani-nasil-artirilir',
    title: 'Dönüşüm Oranı Nasıl Artırılır?',
    cluster: 'e-ticaret-rehber',
    moneyLinks: ['/ozel-e-ticaret'],
    blogLinks: ['cro-nedir', 'satis-yapmayan-site', 'checkout-nasil-optimize-edilir'],
  },
  {
    slug: 'checkout-nasil-optimize-edilir',
    title: 'Checkout Nasıl Optimize Edilir?',
    cluster: 'e-ticaret-rehber',
    moneyLinks: ['/ozel-e-ticaret'],
    blogLinks: ['donusum-orani-nasil-artirilir', 'cro-nedir', 'e-ticaret-sitesi-nasil-kurulur'],
  },
  // 🟡 TOOL (ileride eklenecek sayfalar)
  // slug: e-ticaret-maliyet-hesaplama → /pricing, /templates, /ozel-e-ticaret
  // 🔴 TREND
  // slug: chatgpt-nedir → /templates, /ozel-e-ticaret
]

/** Money page path → o sayfada gösterilecek "Rehberler" blog listesi (MONEY → BLOG geri bağlantı) */
const MONEY_PAGE_REHBERLER: Record<string, { slug: string; title: string }[]> = {
  '/ozel-e-ticaret': [
    { slug: 'e-ticaret-sitesi-nasil-kurulur', title: 'E-Ticaret Sitesi Nasıl Kurulur?' },
    { slug: 'checkout-nasil-optimize-edilir', title: 'Checkout Optimizasyonu' },
    { slug: 'donusum-orani-nasil-artirilir', title: 'Site Hızı ve Dönüşüm' },
    { slug: 'ozel-e-ticaret-nedir', title: 'Özel E-Ticaret Nedir?' },
  ],
  '/b2b-ecommerce': [
    { slug: 'e-ticaret-sitesi-nasil-kurulur', title: 'E-Ticaret Sitesi Nasıl Kurulur?' },
    { slug: 'multi-vendor-nedir', title: 'Multi Vendor ve B2B' },
    { slug: 'ozel-e-ticaret-nedir', title: 'Özel E-Ticaret Nedir?' },
  ],
  '/cok-saticili-e-ticaret-altyapisi': [
    { slug: 'multi-vendor-nedir', title: 'Multi Vendor Nedir?' },
    { slug: 'e-ticaret-sitesi-nasil-kurulur', title: 'E-Ticaret Sitesi Nasıl Kurulur?' },
  ],
  '/ecommerce-migration': [
    { slug: 'shopify-mi-ozel-yazilim-mi', title: 'Shopify mı Özel Yazılım mı?' },
    { slug: 'e-ticaret-sitesi-nasil-kurulur', title: 'E-Ticaret Sitesi Nasıl Kurulur?' },
  ],
  '/pricing': [
    { slug: 'e-ticaret-sitesi-nasil-kurulur', title: 'E-Ticaret Sitesi Nasıl Kurulur?' },
    { slug: 'ozel-e-ticaret-nedir', title: 'Özel E-Ticaret Nedir?' },
  ],
  '/marketplace/templates': [
    { slug: 'e-ticaret-sitesi-nasil-kurulur', title: 'E-Ticaret Sitesi Nasıl Kurulur?' },
    { slug: 'ozel-e-ticaret-nedir', title: 'Özel E-Ticaret Nedir?' },
  ],
}

/** Footer'da kullanılacak link grupları – authority dağıtımı (her sayfada bu linkler taşınır) */
export interface FooterLinkGroup {
  title: string
  links: { label: string; href: string }[]
}

/** Geçiş & Destek – mevcut sayfalara yönlendirme */
const MIGRATION_SUPPORT_LINKS: FooterLinkGroup['links'] = [
  { label: 'İletişim & Teknik Destek', href: '/contact' },
  { label: 'Hizmetler', href: '/services' },
  { label: 'E-Ticaret Geçişi', href: '/ecommerce-migration' },
]

export function getFooterLinkGroups(): FooterLinkGroup[] {
  return [
    {
      title: 'Platform',
      links: [
        { label: 'Moyduz Nedir?', href: '/about' },
        { label: 'Hizmetler', href: '/services' },
        { label: 'Şablonlar', href: '/marketplace/templates' },
        { label: 'Fiyatlandırma', href: '/pricing' },
        { label: 'Referanslar', href: '/customers' },
        { label: 'İletişim', href: '/contact' },
      ],
    },
    {
      title: 'Çözümler',
      links: CORE_MONEY_PAGES.map((p) => ({
        label: p.shortLabel || p.label,
        href: p.path,
      })),
    },
    {
      title: 'Geçiş & Destek',
      links: MIGRATION_SUPPORT_LINKS,
    },
    {
      title: 'Kaynaklar',
      links: [
        { label: 'Blog', href: '/blog' },
        { label: 'Rehber', href: '/rehber' },
        { label: 'SSS', href: '/faq' },
        { label: 'Referanslar', href: '/customers' },
        { label: 'Changelog', href: '/changelog' },
      ],
    },
    {
      title: 'Ücretsiz Araçlar',
      links: [
        { label: 'ROI Hesaplama', href: '/tools/roi-hesaplama' },
        { label: 'Maliyet Hesaplama', href: '/tools/maliyet-hesaplama' },
        { label: 'Komisyon Hesaplama', href: '/tools/komisyon-hesaplama' },
        { label: 'Site Sağlık Skoru', href: '/tools/site-saglik-skoru' },
        { label: 'Sanal Pos Hesaplama', href: '/tools/sanal-pos-hesaplama' },
        { label: 'Araçlar', href: '/tools' },
      ],
    },
  ]
}

/** Money page'de "Rehberler" bölümü için blog linkleri */
export function getRehberlerForMoneyPage(moneyPath: string): { text: string; href: string }[] {
  const rehberler = MONEY_PAGE_REHBERLER[moneyPath]
  if (!rehberler?.length) return []
  return rehberler.map((r) => ({
    text: r.title,
    href: `/blog/${r.slug}`,
  }))
}

/** Blog yazısı için önerilen internal linkler (içerik editörü / otomasyon) */
export function getInternalLinksForBlog(blogSlug: string): {
  moneyLinks: { path: string; label: string }[]
  blogLinks: { slug: string; title: string }[]
} {
  const node = BLOG_INTERNAL_GRAPH.find((n) => n.slug === blogSlug)
  if (!node) {
    return { moneyLinks: [], blogLinks: [] }
  }
  const moneyLinks = node.moneyLinks
    .map((path) => {
      const p = CORE_MONEY_PAGES.find((m) => m.path === path)
      return p ? { path: p.path, label: p.label } : null
    })
    .filter(Boolean) as { path: string; label: string }[]
  const blogLinks = (node.blogLinks || []).map((slug) => {
    const other = BLOG_INTERNAL_GRAPH.find((n) => n.slug === slug)
    return other ? { slug: other.slug, title: other.title } : null
  }).filter(Boolean) as { slug: string; title: string }[]
  return { moneyLinks, blogLinks }
}

/** Tüm money page path'leri (footer / breadcrumb vb.) */
export function getMoneyPagePaths(): string[] {
  return CORE_MONEY_PAGES.map((p) => p.path)
}
