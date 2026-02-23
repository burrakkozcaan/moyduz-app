import Link from 'next/link'
import type { MDXComponents } from 'mdx/types'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion'
import { Steps, Step } from 'fumadocs-ui/components/steps'
import { Tabs, Tab, TabsList, TabsTrigger, TabsContent } from 'fumadocs-ui/components/tabs'
import { InlineTOC } from 'fumadocs-ui/components/inline-toc'
import { Callout, CalloutContainer, CalloutTitle, CalloutDescription } from 'fumadocs-ui/components/callout'
import { Card, Cards } from 'fumadocs-ui/components/card'
import { KeyStatistic } from '@/components/KeyStatistic'
import { InfoBox } from '@/components/InfoBox'
import { ComparisonTable } from '@/components/ComparisonTable'
import { QuoteBlock } from '@/components/QuoteBlock'
import { Snippet } from '@/components/Snippet'
import { VideoEmbed } from '@/components/VideoEmbed'
import { DocPagination } from '@/components/DocPagination'
import { DocCardGroup, DocCard } from '@/components/DocCardGroup'
import { TableFromMarkdown } from '@/components/TableFromMarkdown'
import { MintlifyCallout } from '@/components/MintlifyCallout'

// Slugify function for generating IDs from headings (TOC uyumluluğu)
const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const getTextFromChildren = (children: React.ReactNode): string => {
  if (typeof children === 'string') return children
  if (typeof children === 'number') return String(children)
  if (Array.isArray(children)) {
    return children.map(getTextFromChildren).join('')
  }
  if (children && typeof children === 'object' && 'props' in children) {
    return getTextFromChildren((children as React.ReactElement & { props: { children?: React.ReactNode } }).props.children)
  }
  return ''
}

/**
 * MDX components: Fumadocs UI + shadcn/styling + custom Moyduz.
 *
 * FUMADOCS: Callout, Card, Cards, Steps, Step, Tabs, Tab, Accordion, Accordions,
 *   InlineTOC (items gerekir), table (default Fumadocs), CodeBlock*, pre
 *
 * OVERRIDE: a (Next Link), h2–h4 (id), blockquote
 *
 * MOYDUZ: KeyStatistic, InfoBox, ComparisonTable, QuoteBlock, Snippet, VideoEmbed
 */
export const MDXComponents: MDXComponents = {
  ...defaultMdxComponents,

  // ── Tablo: Mintlify tarzı kenarlı, hover'lı ──────────────────────────────
  table: ({ children, ...props }) => (
    <div className="not-prose my-6 w-full overflow-x-auto rounded-xl border border-ln-gray-200 dark:border-ln-gray-800 shadow-sm">
      <table className="w-full min-w-[320px] border-collapse text-left text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="border-b border-ln-gray-200 dark:border-ln-gray-800 bg-ln-gray-50 dark:bg-ln-gray-800/80" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th className="px-4 py-3 font-semibold text-ln-gray-900 dark:text-ln-gray-0 text-left whitespace-nowrap" {...props}>
      {children}
    </th>
  ),
  tbody: ({ children, ...props }) => (
    <tbody {...props}>{children}</tbody>
  ),
  tr: ({ children, ...props }) => (
    <tr className="border-b border-ln-gray-100 dark:border-ln-gray-800/60 last:border-0 hover:bg-ln-gray-50/50 dark:hover:bg-ln-gray-800/20 transition-colors" {...props}>
      {children}
    </tr>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-3 text-ln-gray-700 dark:text-ln-gray-300 align-top [&_strong]:font-semibold" {...props}>
      {children}
    </td>
  ),

  // Next.js Link (Fumadocs yerine – client-side nav)
  a: ({ href, children, ...props }) => (
    <Link href={href || '#'} {...props}>
      {children}
    </Link>
  ),
  // Başlıklara id (TableOfContents için)
  h2: ({ children, ...props }) => {
    const text = getTextFromChildren(children)
    const id = slugify(text)
    return <h2 id={id} {...props}>{children}</h2>
  },
  h3: ({ children, ...props }) => {
    const text = getTextFromChildren(children)
    const id = slugify(text)
    return <h3 id={id} {...props}>{children}</h3>
  },
  h4: ({ children, ...props }) => {
    const text = getTextFromChildren(children)
    const id = slugify(text)
    return <h4 id={id} {...props}>{children}</h4>
  },
  // Blockquote: Markdown ">" → Fumadocs Callout (info)
  blockquote: ({ children }) => (
    <Callout type="info" className="[&_a]:text-ln-orange [&_a]:font-medium">
      <CalloutDescription>{children as React.ReactNode}</CalloutDescription>
    </Callout>
  ),
  Callout,
  CalloutContainer,
  CalloutTitle,
  CalloutDescription,
  // Fumadocs UI – Tabs, Steps, Accordion (blog MDX’te kullanılabilir)
  Accordion,
  Accordions,
  Steps,
  Step,
  Tabs,
  Tab,
  TabsList,
  TabsTrigger,
  TabsContent,
  Card,
  Cards,
  InlineTOC,
  // Moyduz custom
  KeyStatistic,
  InfoBox,
  ComparisonTable,
  QuoteBlock,
  Snippet,
  VideoEmbed,
  DocPagination,
  DocCardGroup,
  DocCard,
  TableFromMarkdown,
  MintlifyCallout,
}
