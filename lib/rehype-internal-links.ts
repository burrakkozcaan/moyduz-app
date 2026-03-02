/**
 * Rehype plugin: MDX paragraflarındaki anahtar kelimeleri otomatik iç bağlantıya çevirir.
 * - Yalnızca <p> içindeki ilk geçiş linklenir (başlık, kod, mevcut link atlanır).
 * - Her URL sayfada en fazla bir kez kullanılır.
 */
import type { Root, Element, Text, RootContent } from 'hast'

type HastNode = RootContent | Root

/** Anahtar kelime → dahili URL eşlemesi */
const KEYWORD_MAP: Array<{ re: RegExp; url: string }> = [
  // E-ticaret kurulum / genel
  { re: /e-ticaret\s+sitesi\s+kurmak/i,         url: '/blog/e-ticaret-sitesi-nasil-kurulur' },
  { re: /dropshipping\s+nedir/i,                url: '/blog/dropshipping-nedir-nasil-yapilir' },
  { re: /dropshipping/i,                        url: '/blog/dropshipping-nedir' },
  { re: /\bCRO\b/,                              url: '/blog/cro-nedir' },
  { re: /dönüşüm\s+oranı\s+optimizasyonu/i,     url: '/blog/cro-nedir' },
  { re: /headless\s+commerce/i,                 url: '/blog/headless-commerce-nedir' },
  { re: /\bno-?code\b/i,                        url: '/blog/no-code-nedir' },
  { re: /\bSaaS\b/,                             url: '/blog/saas-nedir' },
  { re: /\bmarketplace\b/i,                     url: '/blog/marketplace-nedir' },
  { re: /multi-?vendor/i,                       url: '/blog/multi-vendor-nedir' },
  { re: /B2B\s+e-ticaret/i,                     url: '/blog/b2b-e-ticaret-sitesi-nasil-kurulur' },
  { re: /pasif\s+gelir/i,                       url: '/blog/pasif-gelir-nedir' },
  { re: /Etsy'de\s+satış/i,                     url: '/blog/etsy-de-satis-yapmak' },
  // Ödeme
  { re: /\biyzico\b/i,                          url: '/blog/iyzico-nedir' },
  { re: /\bPayTR\b/,                            url: '/blog/paytr-nedir' },
  { re: /sanal\s+POS/i,                         url: '/blog/en-iyi-sanal-pos' },
  // Analytics & SEO
  { re: /Core\s+Web\s+Vitals/i,                 url: '/rehber/site-performansi' },
  { re: /Google\s+Analytics/i,                  url: '/blog/google-analytics-nedir' },
  { re: /e-ticaret\s+SEO/i,                     url: '/blog/e-ticaret-seo-rehberi' },
  { re: /teknik\s+SEO/i,                        url: '/rehber/seo-teknik' },
  // Finans
  { re: /\bLTV\b/,                              url: '/blog/ltv-nedir' },
  { re: /\bROI\b/,                              url: '/blog/roi-nasil-hesaplanir' },
  { re: /kâr\s+marjı/i,                        url: '/blog/kar-marji-nasil-hesaplanir' },
  // Platform
  { re: /\bShopify\b/,                          url: '/blog/shopify-mi-ozel-yazilim-mi' },
  { re: /\bikas\b/i,                            url: '/blog/ikas-mi-shopify-mi' },
  { re: /\bWebflow\b/,                          url: '/blog/webflow-nedir' },
  { re: /\bFramer\b/,                           url: '/blog/framer-nedir' },
  // Rehber
  { re: /e-ticaret\s+altyapısı/i,              url: '/rehber/e-ticaret-altyapisi' },
  { re: /ödeme\s+sistemleri/i,                  url: '/rehber/odeme-sistemleri' },
  { re: /A\/B\s+testi/i,                        url: '/blog/a-b-testi-nedir' },
]

function makeLink(text: string, url: string): Element {
  return {
    type: 'element',
    tagName: 'a',
    properties: { href: url },
    children: [{ type: 'text', value: text }],
  }
}

/** Bir text node'u link parçalarına böler */
function processText(value: string, linkedUrls: Set<string>): (Text | Element)[] {
  let remaining = value
  const result: (Text | Element)[] = []

  while (remaining.length > 0) {
    let earliest: { index: number; end: number; url: string; match: string } | null = null

    for (const { re, url } of KEYWORD_MAP) {
      if (linkedUrls.has(url)) continue
      re.lastIndex = 0
      const m = re.exec(remaining)
      if (!m) continue
      if (!earliest || m.index < earliest.index) {
        earliest = { index: m.index, end: m.index + m[0].length, url, match: m[0] }
      }
    }

    if (!earliest) {
      result.push({ type: 'text', value: remaining })
      break
    }

    if (earliest.index > 0) {
      result.push({ type: 'text', value: remaining.slice(0, earliest.index) })
    }
    result.push(makeLink(earliest.match, earliest.url))
    linkedUrls.add(earliest.url)
    remaining = remaining.slice(earliest.end)
  }

  return result
}

/** p elementinin çocuklarını işler — mevcut <a> içindeki textler atlanır */
function processElement(node: Element, linkedUrls: Set<string>): void {
  const newChildren: (Text | Element)[] = []
  for (const child of node.children) {
    if (child.type === 'text') {
      newChildren.push(...processText(child.value, linkedUrls))
    } else if (child.type === 'element' && child.tagName !== 'a' && child.tagName !== 'code') {
      // Nested inline element (strong, em, span…) — iç metin işle
      processElement(child, linkedUrls)
      newChildren.push(child)
    } else {
      newChildren.push(child as Text | Element)
    }
  }
  node.children = newChildren
}

export function rehypeInternalLinks() {
  return (tree: Root) => {
    const linkedUrls = new Set<string>()

    function walk(node: HastNode): void {
      if (node.type === 'root') {
        for (const child of (node as Root).children) walk(child)
        return
      }
      if (node.type !== 'element') return
      const el = node as Element

      // Başlık, kod, script, mevcut link — atla
      if (['a', 'code', 'pre', 'script', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(el.tagName)) return

      if (el.tagName === 'p') {
        processElement(el, linkedUrls)
        return
      }

      // div, section, article, li gibi container'lar — alt elemanlara in
      for (const child of el.children) walk(child as HastNode)
    }

    walk(tree)
  }
}
