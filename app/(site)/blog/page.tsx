import BlogFeedWithFilters from '@/app/(site)/blog/_components/BlogFeedWithFilters'
import { getBlogPostsByCategory } from '@/lib/mdx'
import type { Metadata } from 'next'

export const dynamic = 'force-static'

function formatLabel(slug?: string | null) {
  if (!slug) return ''
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: { category?: string }
}): Promise<Metadata> {
  const activeCategory =
    typeof searchParams?.category === 'string' &&
    searchParams.category.length > 0
      ? searchParams.category
      : undefined

  const label = activeCategory ? formatLabel(activeCategory) : null
  const keywords = label
    ? [
        `${label.toLowerCase()} rehberi`,
        `${label.toLowerCase()} ipuçları`,
        `${label.toLowerCase()} stratejileri`,
        'moyduz blog',
      ]
    : [
        'e-ticaret blog',
        'seo rehberi',
        'dijital pazarlama',
        'dijital büyüme',
        'moyduz blog',
      ]

  return {
    title: label
      ? `${label} Rehberleri & İçgörüler | Moyduz Blog`
      : 'Moyduz Blog — E-Ticaret, SEO ve Dijital Büyüme Rehberleri',
    description: label
      ? `Moyduz uzmanlarından ${formatLabel(label).toLowerCase()} konusunda kapsamlı rehberler, stratejiler ve uygulama ipuçları.`
      : 'E-ticaret altyapısı, teknik SEO, dijital pazarlama ve iş kurma konularında Moyduz uzmanlarından kapsamlı rehberler ve stratejiler.',
    alternates: {
      canonical: 'https://moyduz.com/blog',
    },
    keywords,
    openGraph: {
      title: label
        ? `${label} Rehberleri & İçgörüler | Moyduz Blog`
        : 'Moyduz Blog — E-Ticaret, SEO ve Dijital Büyüme Rehberleri',
      description: label
        ? `Moyduz uzmanlarından ${formatLabel(label).toLowerCase()} konusunda kapsamlı rehberler, stratejiler ve uygulama ipuçları.`
        : 'E-ticaret altyapısı, teknik SEO, dijital pazarlama ve iş kurma konularında Moyduz uzmanlarından kapsamlı rehberler ve stratejiler.',
      url: 'https://moyduz.com/blog',
      locale: 'tr_TR',
      siteName: 'Moyduz',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: label
        ? `${label} Rehberleri & İçgörüler | Moyduz Blog`
        : 'Moyduz Blog — E-Ticaret, SEO ve Dijital Büyüme Rehberleri',
      description: label
        ? `Moyduz uzmanlarından ${formatLabel(label).toLowerCase()} konusunda kapsamlı rehberler.`
        : 'E-ticaret, teknik SEO ve dijital büyüme rehberleri.',
    },
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: { category?: string }
}) {
  const activeCategory =
    typeof searchParams?.category === 'string' &&
    searchParams.category.length > 0
      ? searchParams.category
      : undefined

  const allPosts = await getBlogPostsByCategory(activeCategory)

  const posts = allPosts.map((post) => ({
    slug: post.frontmatter.slug,
    title: post.frontmatter.title,
    meta_description: post.frontmatter.meta_description,
    published_at: post.frontmatter.published_at,
    reading_time: post.frontmatter.reading_time,
    category: post.frontmatter.category,
    author_name: post.frontmatter.author_name,
    excerpt: post.frontmatter.meta_description,
  }))

  const categoryMap = new Map<string, { count: number; name?: string }>()
  posts.forEach((post) => {
    const categorySlug =
      typeof post.category === 'object' ? post.category?.slug : post.category
    const categoryName =
      typeof post.category === 'object'
        ? post.category?.name || post.category?.slug
        : post.category

    if (categorySlug) {
      const existing = categoryMap.get(categorySlug) || { count: 0 }
      categoryMap.set(categorySlug, {
        count: existing.count + 1,
        name: categoryName,
      })
    }
  })

  const categoryItems = Array.from(categoryMap.entries())
    .map(([slug, data]) => ({
      title: data.name || formatLabel(slug),
      href: activeCategory === slug ? '/blog' : `/blog?category=${slug}`,
      count: data.count,
      badge: activeCategory === slug ? 'Aktif' : 'Kategori',
    }))
    .sort((a, b) => b.count - a.count)

  const heroTitle = activeCategory
    ? `${formatLabel(activeCategory)} Rehberleri`
    : 'Blog'

  const heroDescription = activeCategory
    ? `${formatLabel(activeCategory).toLowerCase()} ile ilgili rehberler ve içgörüler.`
    : 'Moyduz uzman görüşleri, rehberler ve büyüme stratejileri.'

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: activeCategory
      ? `${formatLabel(activeCategory)} Rehberleri`
      : 'Moyduz Blog Yazıları',
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: post.title,
      url: `https://moyduz.com/blog/${post.slug}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <BlogFeedWithFilters
        blogList={posts}
        title={heroTitle}
        description={heroDescription}
        categoryFilters={categoryItems}
        showCategoryFilters={categoryItems.length > 0}
        totalCount={posts.length}
      />
    </>
  )
}
