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

  return {
    title: label
      ? `${label} Rehberleri & İçgörüler | Moyduz Blog`
      : 'Moyduz Blog — E-Ticaret, SEO ve Dijital Büyüme Rehberleri',
    description: label
      ? `Moyduz uzmanlarından ${formatLabel(label).toLowerCase()} konusunda kapsamlı rehberler, stratejiler ve uygulama ipuçları.`
      : 'E-ticaret altyapısı, teknik SEO, dijital pazarlama ve iş kurma konularında Moyduz uzmanlarından kapsamlı rehberler ve stratejiler.',
    alternates: {
      canonical: label
        ? `https://moyduz.com/blog?category=${activeCategory}`
        : 'https://moyduz.com/blog',
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
    ? `${formatLabel(activeCategory)} Insights`
    : 'Blog'

  const heroDescription = activeCategory
    ? `${formatLabel(activeCategory).toLowerCase()} ile ilgili rehberler ve içgörüler.`
    : 'Moyduz uzman görüşleri, rehberler ve büyüme stratejileri.'

  return (
    <BlogFeedWithFilters
      blogList={posts}
      title={heroTitle}
      description={heroDescription}
      categoryFilters={categoryItems}
      showCategoryFilters={categoryItems.length > 0}
      totalCount={posts.length}
    />
  )
}
