import { client, urlFor } from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const groupLabels: Record<string, string> = {
  business: 'Business Templates',
  community: 'Community Templates',
  creative: 'Creative Templates',
  style: 'Style Templates',
}

const validGroups = ['business', 'community', 'creative', 'style']

interface Category {
  title: string
  slug: string
  description?: string
  thumbnail?: { asset?: { url?: string } }
  thumbnails?: Array<{ asset?: { url?: string } }>
  parent?: { title: string; slug: string; parent?: { title: string; slug: string } } | null
}

interface Template {
  title: string
  slug: string
  price?: string
  designer?: string
  description?: string
  thumbnails?: Array<{ asset?: { url?: string } }>
  tags?: string[]
  categories: Array<{ title: string; slug: string }>
}

interface Subcategory {
  title: string
  slug: string
  thumbnails?: Array<{ asset?: { url?: string } }>
}

async function getCategory(slug: string) {
  if (!client) return null
  return client.fetch<Category | null>(
    `*[_type == "category" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      description,
      thumbnail,
      thumbnails,
      parent->{title, "slug": slug.current, parent->{title, "slug": slug.current}}
    }`,
    { slug }
  )
}

async function getSubcategories(slug: string) {
  if (!client) return []
  return client.fetch<Subcategory[]>(
    `*[_type == "category" && parent->slug.current == $slug] | order(title asc){
      title,
      parent->{title, "slug": slug.current},
      "slug": slug.current,
      thumbnails
    }`,
    { slug }
  )
}

async function getCategoriesByGroup(group: string) {
  if (!client) return []
  return client.fetch<Subcategory[]>(
    `*[_type == "category" && group == $group && (!defined(parent) || parent == null)] | order(order asc, title asc){
      title,
      "slug": slug.current,
      description,
      thumbnails,
      group,
      parent
    }`,
    { group }
  )
}

async function getTemplatesByCategory(slug: string, selectedTag?: string | null) {
  if (!client) return []
  const params: Record<string, string> = { slug }
  let filter = `*[_type == "template" && published == true && ($slug in categories[]->slug.current || primaryCategory->slug.current == $slug)`
  if (selectedTag) {
    filter += ` && $selectedTag in tags`
    params.selectedTag = selectedTag
  }
  filter += `] | order(featured desc, _updatedAt desc){
    title,
    "slug": slug.current,
    price,
    designer,
    description,
    thumbnails,
    tags,
    primaryCategory->{title, "slug": slug.current},
    categories[]->{title, "slug": slug.current}
  }`
  return client.fetch<Template[]>(filter, params)
}

async function getTemplatesByGroup(group: string, selectedTag?: string | null) {
  if (!client) return []
  const categories = await client.fetch<{ slug: string }[]>(
    `*[_type == "category" && group == $group && (!defined(parent) || parent == null)]{ "slug": slug.current }`,
    { group }
  )
  const slugs = categories.map((c) => c.slug)
  if (slugs.length === 0) return []
  const primary = slugs.map((s, i) => `primaryCategory->slug.current == $slug${i}`).join(' || ')
  const cats = slugs.map((s, i) => `$slug${i} in categories[]->slug.current`).join(' || ')
  const params: Record<string, string> = {}
  slugs.forEach((s, i) => { params[`slug${i}`] = s })
  if (selectedTag) { params.selectedTag = selectedTag }
  let filter = `*[_type == "template" && published == true && (${primary} || ${cats})`
  if (selectedTag) filter += ` && $selectedTag in tags`
  filter += `] | order(featured desc, _updatedAt desc){
    title,
    "slug": slug.current,
    price,
    designer,
    description,
    thumbnails,
    tags,
    primaryCategory->{title, "slug": slug.current},
    categories[]->{title, "slug": slug.current}
  }`
  return client.fetch<Template[]>(filter, params)
}

function buildBreadcrumbs(category: Category) {
  const out: Array<{ title: string; slug: string }> = []
  if (category.parent?.parent) out.push({ title: category.parent.parent.title, slug: category.parent.parent.slug })
  if (category.parent) out.push({ title: category.parent.title, slug: category.parent.slug })
  out.push({ title: category.title, slug: category.slug })
  return out
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category: categorySlug } = await params
  const category = await getCategory(categorySlug)
  if (!category) return { title: 'Category Not Found' }
  const title = (category as { seo?: { metaTitle?: string } }).seo?.metaTitle || `${category.title} Templates | Moyduz`
  const desc = (category as { seo?: { metaDescription?: string } }).seo?.metaDescription || category.description || `Browse ${category.title} templates.`
  return { title, description: desc }
}

export default async function CategoryTemplatesPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category: categorySlug } = await params
  if (!categorySlug) notFound()

  const isGroup = validGroups.includes(categorySlug.toLowerCase())
  const group = categorySlug.toLowerCase()

  const Chevron = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="none" className="text-ln-gray-400">
      <path d="M 2.5 7 L 5.5 4 L 2.5 1" fill="transparent" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" />
    </svg>
  )

  if (isGroup) {
    const groupTitle = groupLabels[group] || `${group.charAt(0).toUpperCase() + group.slice(1)} Templates`
    let categories: Subcategory[] = []
    let templates: Template[] = []
    try {
      ;[categories, templates] = await Promise.all([getCategoriesByGroup(group), getTemplatesByGroup(group)])
    } catch {
      // fallback
    }

    return (
      <main className="flex-1">
        <div className="container">
          <div className="mb-8 flex items-center gap-2 text-sm text-ln-gray-600">
            <Link href="/marketplace/templates/category" className="transition hover:text-ln-gray-900">
              Categories
            </Link>
            <span className="flex items-center gap-2">
              <Chevron />
              <span className="text-ln-gray-900">{groupTitle}</span>
            </span>
          </div>
          <div className="mb-12">
            <h1 className="text-[34px]/[40px] font-550 -tracking-[0.02em] text-ln-gray-800 xl:text-ln-title-h4 xl:text-ln-gray-900">
              {groupTitle}
            </h1>
            <p className="mt-5 text-ln-paragraph-md text-ln-gray-600">
              Give your small business a professional edge with our business templates.
            </p>
          </div>
          {categories.length > 0 && (
            <div className="mb-12 overflow-x-auto">
              <div className="flex min-w-max gap-2.5">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/marketplace/templates/category/${cat.slug}`}
                    className="flex h-[50px] shrink-0 items-center gap-4 rounded-lg bg-ln-gray-50 pl-0.5 pr-3.5 py-0.5 transition hover:bg-ln-gray-100"
                  >
                    {cat.thumbnails?.[0] && (
                      <div className="relative h-full w-[80px] shrink-0 overflow-hidden rounded-md bg-ln-gray-200">
                        <Image
                          src={urlFor(cat.thumbnails[0]).width(200).height(120).url()}
                          alt={cat.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span className="text-ln-label-sm font-500 text-ln-gray-800">{cat.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {templates.map((t) => {
              const pc = t.categories?.find((c) => categories.some((cat) => cat.slug === c.slug)) || t.categories?.[0]
              return (
                <Link
                  key={t.slug}
                  href={`/marketplace/templates/${pc?.slug || group}/${t.slug}`}
                  className="group overflow-hidden rounded-[10px] transition"
                >
                  {t.thumbnails?.[0] && (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-ln-gray-100">
                      <Image
                        src={urlFor(t.thumbnails[0]).width(800).height(600).url()}
                        alt={t.title}
                        fill
                        className="object-cover transition group-hover:opacity-95"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="line-clamp-1 text-ln-label-md font-550 text-ln-gray-900">{t.title}</h3>
                    {t.designer && <p className="text-ln-paragraph-xs text-ln-gray-600">by {t.designer}</p>}
                    {t.tags && t.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {t.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="rounded bg-ln-gray-100 px-2 py-0.5 text-[10px] text-ln-gray-600">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
          {templates.length === 0 && (
            <div className="py-16 text-center text-ln-paragraph-md text-ln-gray-600">No templates in this group.</div>
          )}
        </div>
      </main>
    )
  }

  const [category, templates, subcategories] = await Promise.all([
    getCategory(categorySlug),
    getTemplatesByCategory(categorySlug),
    getSubcategories(categorySlug),
  ])

  if (!category) notFound()
  const breadcrumbs = buildBreadcrumbs(category)

  return (
    <main className="flex-1">
      <div className="container">
        <div className="mb-8 flex items-center gap-2 text-sm text-ln-gray-600">
          <Link href="/marketplace/templates" className="transition hover:text-ln-gray-900">
            Templates
          </Link>
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.slug} className="flex items-center gap-2">
              <Chevron />
              {i === breadcrumbs.length - 1 ? (
                <span className="text-ln-gray-900">{crumb.title}</span>
              ) : (
                <Link href={`/marketplace/templates/category/${crumb.slug}`} className="transition hover:text-ln-gray-900">
                  {crumb.title}
                </Link>
              )}
            </span>
          ))}
        </div>
        <div className="mb-12">
          {category.thumbnail && (
            <div className="relative mb-6 h-64 w-full overflow-hidden rounded-2xl">
              <Image
                src={urlFor(category.thumbnail).width(1200).height(400).url()}
                alt={category.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <h1 className="text-[34px]/[40px] font-550 -tracking-[0.02em] text-ln-gray-800 xl:text-ln-title-h4 xl:text-ln-gray-900">
            {category.title}
          </h1>
          {category.description && <p className="mt-5 text-ln-paragraph-md text-ln-gray-600">{category.description}</p>}
        </div>
        {subcategories.length > 0 && (
          <div className="mb-12 overflow-x-auto">
            <div className="flex min-w-max gap-2.5">
              {subcategories.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/marketplace/templates/category/${sub.slug}`}
                  className="flex h-[50px] shrink-0 items-center gap-4 rounded-lg bg-ln-gray-50 pl-0.5 pr-3.5 py-0.5 transition hover:bg-ln-gray-100"
                >
                  {sub.thumbnails?.[0] && (
                    <div className="relative h-full w-[80px] shrink-0 overflow-hidden rounded-md bg-ln-gray-200">
                      <Image
                        src={urlFor(sub.thumbnails[0]).width(200).height(120).url()}
                        alt={sub.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span className="text-ln-label-sm font-500 text-ln-gray-800">{sub.title}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {templates.map((t) => (
            <Link
              key={t.slug}
              href={`/marketplace/templates/${categorySlug}/${t.slug}`}
              className="group overflow-hidden rounded-[10px] transition"
            >
              {t.thumbnails?.[0] && (
                <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-ln-gray-100">
                  <Image
                    src={urlFor(t.thumbnails[0]).width(800).height(600).url()}
                    alt={t.title}
                    fill
                    className="object-cover transition group-hover:opacity-95"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="line-clamp-1 text-ln-label-md font-550 text-ln-gray-900">{t.title}</h3>
                {t.designer && <p className="text-ln-paragraph-xs text-ln-gray-600">by {t.designer}</p>}
                {t.tags && t.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {t.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="rounded bg-ln-gray-100 px-2 py-0.5 text-[10px] text-ln-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
        {templates.length === 0 && (
          <div className="py-16 text-center text-ln-paragraph-md text-ln-gray-600">No templates in this category.</div>
        )}
      </div>
    </main>
  )
}
