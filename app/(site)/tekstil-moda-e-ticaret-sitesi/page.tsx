import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPage } from '@/lib/mdx-pages'
import { MDXComponents } from '@/lib/mdx-components'
import { mdxRemoteOptions } from '@/lib/mdx-remote-options'
import { ServicePageLayout } from '@/components/ServicePageLayout'
import { buildFAQPageSchema } from '@/seo/json-ld/index'

export const dynamic = 'force-static'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('tekstil-moda-e-ticaret-sitesi')

  if (!page) {
    return {
      title: 'Tekstil ve Moda E-Ticaret Sitesi | Özel Yazılım | Moyduz',
      description:
        'Tekstil, giyim ve moda markaları için özel e-ticaret sitesi. Beden rehberi, renk filtresi, koleksiyon yönetimi, B2B toptan satış portalı. Komisyonsuz altyapı.',
      robots: { index: false },
    }
  }

  const { frontmatter } = page
  const title =
    frontmatter.title || 'Tekstil ve Moda E-Ticaret Sitesi | Özel Yazılım | Moyduz'
  const description =
    (frontmatter.meta_description as string) ||
    'Tekstil, giyim ve moda markaları için özel e-ticaret sitesi. Beden rehberi, renk filtresi, koleksiyon yönetimi, B2B toptan satış portalı. Komisyonsuz altyapı.'
  const url =
    (frontmatter.canonical_url as string) || 'https://moyduz.com/tekstil-moda-e-ticaret-sitesi'

  return {
    title,
    description,
    keywords: frontmatter.keywords as string[] | undefined,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
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

export default async function TekstilModaEticaretSitesiPage() {
  const page = await getPage('tekstil-moda-e-ticaret-sitesi')

  if (!page) notFound()

  const { frontmatter, content } = page
  const mdxContent = (
    <MDXRemote source={content} components={MDXComponents} options={mdxRemoteOptions} />
  )

  return (
    <>
      {frontmatter.faqs && frontmatter.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildFAQPageSchema(frontmatter.faqs)),
          }}
        />
      )}
      <ServicePageLayout
        frontmatter={
          frontmatter as Parameters<typeof ServicePageLayout>[0]['frontmatter']
        }
        mdxContent={mdxContent}
        moneyPagePath="/tekstil-moda-e-ticaret-sitesi"
      />
    </>
  )
}
