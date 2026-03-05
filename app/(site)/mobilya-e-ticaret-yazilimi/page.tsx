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
  const page = await getPage('mobilya-e-ticaret-yazilimi')

  if (!page) {
    return {
      title: 'Mobilya E-Ticaret Yazılımı | Özel Online Mağaza Kurulumu | Moyduz',
      description:
        'Mobilya ve ev dekorasyonu markalar için özel e-ticaret yazılımı. 360° ürün görünümü, oda planlayıcı entegrasyonu, B2B bayi portalı. Komisyonsuz, anahtar teslim.',
      robots: { index: false },
    }
  }

  const { frontmatter } = page
  const title =
    frontmatter.title || 'Mobilya E-Ticaret Yazılımı | Özel Online Mağaza Kurulumu | Moyduz'
  const description =
    (frontmatter.meta_description as string) ||
    'Mobilya ve ev dekorasyonu markalar için özel e-ticaret yazılımı. 360° ürün görünümü, oda planlayıcı entegrasyonu, B2B bayi portalı. Komisyonsuz, anahtar teslim.'
  const url =
    (frontmatter.canonical_url as string) || 'https://moyduz.com/mobilya-e-ticaret-yazilimi'

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

export default async function MobilyaEticaretYazilimiPage() {
  const page = await getPage('mobilya-e-ticaret-yazilimi')

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
        moneyPagePath="/mobilya-e-ticaret-yazilimi"
      />
    </>
  )
}
