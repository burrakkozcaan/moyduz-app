import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPage } from '@/lib/mdx-pages'
import { MDXComponents } from '@/lib/mdx-components'
import { mdxRemoteOptions } from '@/lib/mdx-remote-options'
import { ServicePageLayout } from '@/components/ServicePageLayout'
import { SERVICE_SLUGS } from '@/lib/mdx-pages'

export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) {
    return {
      title: `${slug} | Moyduz`,
      robots: { index: false },
    }
  }

  const { frontmatter } = page
  const title = frontmatter.title || `${slug} | Moyduz`
  const description =
    (frontmatter.meta_description as string) || 'Professional digital services.'
  const url =
    (frontmatter.canonical_url as string) ||
    `https://moyduz.com/services/${slug}`

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
      locale: 'en_US',
      siteName: 'Moyduz',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function ServiceSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) notFound()

  const { frontmatter, content } = page
  const mdxContent = <MDXRemote source={content} components={MDXComponents} options={mdxRemoteOptions} />

  return (
    <ServicePageLayout
      frontmatter={
        frontmatter as Parameters<typeof ServicePageLayout>[0]['frontmatter']
      }
      mdxContent={mdxContent}
    />
  )
}
