import { notFound, redirect } from 'next/navigation'

const ALT_TO_COMPARE_SLUG: Record<string, string> = {
  shopify: 'shopify-alternatifleri',
  ikas: 'ikas-alternatifi',
  ideasoft: 'ideasoft-alternatifleri',
  'ticimax': 'ticimax-vs-moyduz',
  't-soft': 't-soft-vs-moyduz',
  woocommerce: 'woocommerce-vs-moyduz',
  webflow: 'webflow-vs-custom-development',
  'no-code': 'no-code-vs-custom-development',
}

type PageParams = { slug: string }

export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(ALT_TO_COMPARE_SLUG).map((slug) => ({ slug }))
}

export default function AlternativeDetailPage({
  params,
}: {
  params: PageParams
}) {
  const { slug } = params
  const compareSlug = ALT_TO_COMPARE_SLUG[slug]

  if (!compareSlug) {
    notFound()
  }

  redirect(`/compare/${compareSlug}`)
}

