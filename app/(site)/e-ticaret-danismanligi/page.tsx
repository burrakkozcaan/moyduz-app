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
  const page = await getPage('e-ticaret-danismanligi')

  if (!page) {
    return {
      title: 'E-Ticaret Danışmanlığı | Strateji, Altyapı ve Büyüme | Moyduz',
      description:
        'E-ticaret danışmanlığı ile satışlarınızı büyütün. Altyapı seçimi, pazaryeri stratejisi, SEO ve dönüşüm optimizasyonu. Moyduz — sadece yazılım değil, başarıya giden yolda danışmanınız.',
      robots: { index: false },
    }
  }

  const { frontmatter } = page
  const title =
    frontmatter.title || 'E-Ticaret Danışmanlığı | Strateji, Altyapı ve Büyüme | Moyduz'
  const description =
    (frontmatter.meta_description as string) ||
    'E-ticaret danışmanlığı ile satışlarınızı büyütün. Altyapı seçimi, pazaryeri stratejisi, SEO ve dönüşüm optimizasyonu. Moyduz — sadece yazılım değil, başarıya giden yolda danışmanınız.'
  const url =
    (frontmatter.canonical_url as string) || 'https://moyduz.com/e-ticaret-danismanligi'

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

export default async function EticaretDanismanligiPage() {
  const page = await getPage('e-ticaret-danismanligi')

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
        moneyPagePath="/e-ticaret-danismanligi"
      />
    </>
  )
}
