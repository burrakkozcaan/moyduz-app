import BlogFeedWithFilters from '@/app/(site)/blog/_components/BlogFeedWithFilters'
import { getAllBlogPosts } from '@/lib/mdx'
import type { Metadata } from 'next'

export const dynamic = 'force-static'

function formatLabel(slug?: string | null) {
  if (!slug) return ''
  return slug
    .replace(/_/g, '-')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const metadata: Metadata = {
  title: 'Moyduz Blog — E-Ticaret, SEO ve Dijital Büyüme Rehberleri',
  description:
    'E-ticaret altyapısı, teknik SEO, dijital pazarlama ve iş kurma konularında Moyduz uzmanlarından kapsamlı Türkçe rehberler. Pazaryeri komisyon analizleri, maliyet karşılaştırmaları ve büyüme stratejileri.',
  alternates: {
    canonical: 'https://moyduz.com/blog',
  },
  keywords: [
    'e-ticaret blog',
    'seo rehberi',
    'dijital pazarlama',
    'e-ticaret altyapı karşılaştırması',
    'pazaryeri komisyon',
    'dijital büyüme',
    'moyduz blog',
  ],
  openGraph: {
    title: 'Moyduz Blog — E-Ticaret, SEO ve Dijital Büyüme Rehberleri',
    description:
      'Türkiye e-ticaret ekosistemi, teknik SEO, dijital pazarlama ve iş kurma konularında kapsamlı Türkçe rehberler.',
    url: 'https://moyduz.com/blog',
    locale: 'tr_TR',
    siteName: 'Moyduz',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moyduz Blog — E-Ticaret, SEO ve Dijital Büyüme Rehberleri',
    description: 'E-ticaret, teknik SEO ve dijital büyüme rehberleri.',
  },
}

export default async function BlogPage() {
  const allPosts = await getAllBlogPosts()

  const posts = allPosts.map((post) => ({
    slug: post.frontmatter.slug,
    title: post.frontmatter.title,
    meta_description: post.frontmatter.meta_description,
    published_at: post.frontmatter.published_at,
    reading_time: post.frontmatter.reading_time,
    category: post.frontmatter.category,
    author_name: post.frontmatter.author_name,
    excerpt: post.frontmatter.meta_description,
    hero_image: post.frontmatter.hero_image as string | undefined,
    featured_image: post.frontmatter.featured_image as string | undefined,
  }))

  // Build category list from all posts
  const categoryMap = new Map<string, { count: number; name: string }>()
  posts.forEach((post) => {
    const categorySlug =
      typeof post.category === 'object' ? post.category?.slug : post.category
    const categoryName =
      typeof post.category === 'object'
        ? post.category?.name || post.category?.slug
        : post.category

    if (categorySlug) {
      const existing = categoryMap.get(categorySlug) || { count: 0, name: '' }
      categoryMap.set(categorySlug, {
        count: existing.count + 1,
        name: categoryName || formatLabel(categorySlug),
      })
    }
  })

  const categoryFilters = Array.from(categoryMap.entries())
    .map(([slug, data]) => ({
      slug,
      title: data.name || formatLabel(slug),
      count: data.count,
    }))
    .sort((a, b) => b.count - a.count)

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Moyduz Blog Yazıları',
    description:
      'E-ticaret, SEO ve dijital büyüme konularında Türkçe rehberler',
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
        title="Blog"
        description="Moyduz uzman görüşleri, rehberler ve büyüme stratejileri."
        categoryFilters={categoryFilters}
        showCategoryFilters={categoryFilters.length > 0}
        totalCount={posts.length}
      />
    </>
  )
}
