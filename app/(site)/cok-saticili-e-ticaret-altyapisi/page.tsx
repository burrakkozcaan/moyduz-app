import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPage } from '@/lib/mdx-pages'
import { MDXComponents } from '@/lib/mdx-components'
import { mdxRemoteOptions } from '@/lib/mdx-remote-options'
import { ServicePageLayout } from '@/components/ServicePageLayout'
import { buildFAQPageSchema } from '@/seo/json-ld/index'

const CANONICAL_URL = 'https://moyduz.com/cok-saticili-e-ticaret-altyapisi'

export const dynamic = 'force-static'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('multi-vendor')

  if (!page) {
    return { title: 'Çok Satıcılı E-Ticaret Altyapısı | Moyduz', robots: { index: false } }
  }

  const { frontmatter } = page
  const title = frontmatter.title || 'Çok Satıcılı E-Ticaret Altyapısı | Moyduz'
  const description =
    (frontmatter.meta_description as string) ||
    'Çok satıcılı e-ticaret altyapısı ile kendi pazaryerinizi kurun. Komisyonlu sistem, satıcı yönetimi. Moyduz.'

  return {
    title,
    description,
    keywords: frontmatter.keywords as string[] | undefined,
    alternates: { canonical: CANONICAL_URL },
    openGraph: {
      title,
      description,
      url: CANONICAL_URL,
      type: 'website',
      locale: 'tr_TR',
      siteName: 'Moyduz',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function CokSaticiliETicaretAltyapisiPage() {
  const page = await getPage('multi-vendor')

  if (!page) notFound()

  const { frontmatter, content } = page
  const mergedFrontmatter = {
    ...frontmatter,
    canonical_url: CANONICAL_URL,
  }
  const mdxContent = <MDXRemote source={content} components={MDXComponents} options={mdxRemoteOptions} />

  return (
    <>
      {mergedFrontmatter.faqs && mergedFrontmatter.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQPageSchema(mergedFrontmatter.faqs)) }}
        />
      )}
      <ServicePageLayout
        frontmatter={mergedFrontmatter as Parameters<typeof ServicePageLayout>[0]['frontmatter']}
        mdxContent={mdxContent}
        moneyPagePath="/cok-saticili-e-ticaret-altyapisi"
      />
    </>
  )
}
