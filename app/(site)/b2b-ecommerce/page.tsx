import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPage } from '@/lib/mdx-pages'
import { MDXComponents } from '@/lib/mdx-components'
import { mdxRemoteOptions } from '@/lib/mdx-remote-options'
import { ServicePageLayout } from '@/components/ServicePageLayout'

export const dynamic = 'force-static'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('b2b-ecommerce')

  if (!page) {
    return { title: 'B2B E-Ticaret | Moyduz', robots: { index: false } }
  }

  const { frontmatter } = page
  const title = frontmatter.title || 'B2B E-Ticaret | Moyduz'
  const description =
    (frontmatter.meta_description as string) ||
    'B2B e-ticaret platformu ile kurumsal satışlarınızı dijitalleştirin.'
  const url =
    (frontmatter.canonical_url as string) || 'https://moyduz.com/b2b-ecommerce'

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

export default async function B2BEcommercePage() {
  const page = await getPage('b2b-ecommerce')

  if (!page) notFound()

  const { frontmatter, content } = page
  const mdxContent = <MDXRemote source={content} components={MDXComponents} options={mdxRemoteOptions} />

  return (
    <ServicePageLayout
      frontmatter={
        frontmatter as Parameters<typeof ServicePageLayout>[0]['frontmatter']
      }
      mdxContent={mdxContent}
      moneyPagePath="/b2b-ecommerce"
    />
  )
}
