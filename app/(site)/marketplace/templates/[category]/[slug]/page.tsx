import { client, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/lib/portableTextComponents'
import type { Metadata } from 'next'
import { cache } from 'react'
import {
  Cpu, Briefcase, Shirt, Users, ShoppingCart, Heart, Target, FileText,
  Home, UserCheck, Mail, HelpCircle, ArrowLeft, Megaphone,
} from 'lucide-react'

export const revalidate = 60

interface Template {
  title: string
  slug: string
  description?: string
  designer?: string
  about?: unknown
  perfectFor?: unknown
  features?: unknown
  thumbnails?: Array<{ asset?: { url?: string } }>
  tags?: string[]
  demoUrl?: string
  templateType?: string
  difficulty?: string
  pages?: number
  views?: number
  updatedAt?: string
  primaryCategory?: { title: string; slug: string }
  categories?: Array<{ title: string; slug: string }>
}

const getTemplate = cache(async (categorySlug: string, templateSlug: string): Promise<Template | null> => {
  if (!client) return null
  const withCategory = await client.fetch(
    `*[_type == "template" && slug.current == $templateSlug && published == true && ($categorySlug in categories[]->slug.current || primaryCategory->slug.current == $categorySlug)][0]{
      title,
      "slug": slug.current,
      designer,
      description,
      about,
      perfectFor,
      features,
      thumbnails,
      tags,
      demoUrl,
      templateType,
      difficulty,
      pages,
      views,
      updatedAt,
      primaryCategory->{title, "slug": slug.current},
      categories[]->{title, "slug": slug.current}
    }`,
    { categorySlug, templateSlug },
  )
  if (withCategory) return withCategory
  return client.fetch(
    `*[_type == "template" && slug.current == $templateSlug && published == true][0]{
      title,
      "slug": slug.current,
      designer,
      description,
      about,
      perfectFor,
      features,
      thumbnails,
      tags,
      demoUrl,
      templateType,
      difficulty,
      pages,
      views,
      updatedAt,
      primaryCategory->{title, "slug": slug.current},
      categories[]->{title, "slug": slug.current}
    }`,
    { templateSlug },
  )
})

async function getRelatedTemplates(categorySlug: string, excludeSlug: string) {
  if (!client) return []
  return client.fetch(
    `*[_type == "template" && published == true && ($categorySlug in categories[]->slug.current || primaryCategory->slug.current == $categorySlug) && slug.current != $excludeSlug] | order(_createdAt desc)[0...8]{
      title,
      "slug": slug.current,
      designer,
      thumbnails,
      primaryCategory->{title, "slug": slug.current},
      categories[]->{title, "slug": slug.current}
    }`,
    { categorySlug, excludeSlug },
  )
}

async function getMoreFromCreator(designer: string, excludeSlug: string, categorySlug: string) {
  if (!client) return []
  return client.fetch(
    `*[_type == "template" && published == true && designer == $designer && slug.current != $excludeSlug] | order(_createdAt desc)[0...8]{
      title,
      "slug": slug.current,
      designer,
      thumbnails,
      primaryCategory->{title, "slug": slug.current},
      categories[]->{title, "slug": slug.current}
    }`,
    { designer, excludeSlug, categorySlug },
  )
}

async function getAllCategories() {
  if (!client) return []
  return client.fetch(
    `*[_type == "category"] | order(title asc){
      title,
      "slug": slug.current
    }`,
  )
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  ai: Cpu,
  business: Briefcase,
  clothing: Shirt,
  community: Users,
  ecommerce: ShoppingCart,
  health: Heart,
  'landing-page': Target,
  default: FileText,
}

function formatDate(dateStr?: string) {
  if (!dateStr) return 'Recently'
  const d = new Date(dateStr)
  const now = new Date()
  const diffDays = Math.floor(Math.abs(now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))
  const diffMonths = Math.floor(diffDays / 30)
  if (diffMonths === 0) return 'Recently'
  if (diffMonths === 1) return '1 month ago'
  if (diffMonths < 12) return `${diffMonths} months ago`
  const diffYears = Math.floor(diffMonths / 12)
  return diffYears === 1 ? '1 year ago' : `${diffYears} years ago`
}

function formatViews(views?: number) {
  if (!views) return '0'
  if (views >= 1000) {
    const k = (views / 1000).toFixed(1)
    return k.endsWith('.0') ? `${parseInt(k)}K` : `${k}K`
  }
  return views.toString()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}): Promise<Metadata> {
  const { category: categorySlug, slug: templateSlug } = await params
  const template = await getTemplate(categorySlug, templateSlug)
  if (!template) return { title: 'Template Not Found' }
  return {
    title: `${template.title} | Moyduz Templates`,
    description: template.description || `Professional ${template.title} template.`,
  }
}

/* ─── Icons ─── */

function ArrowIcon({ light }: { light?: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className={`-mx-1 size-5 shrink-0 transition duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-0.5 ${light ? 'text-white/[.72]' : 'text-ln-gray-500'}`}>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M14.5 12.204V6m0 0H8.296M14.5 6l-8 8" />
    </svg>
  )
}

function DottedSep() {
  return (
    <div
      className="h-1 w-full text-ln-gray-400 opacity-80"
      role="separator"
      style={{ background: 'linear-gradient(90deg, currentColor 4px, transparent 4px) 50% 50% / 10px 1px repeat no-repeat' }}
    />
  )
}

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category: categorySlug, slug: templateSlug } = await params
  const template = await getTemplate(categorySlug, templateSlug)
  if (!template) notFound()

  const primaryCategory =
    template.primaryCategory?.slug === categorySlug
      ? template.primaryCategory
      : template.categories?.find((c) => c.slug === categorySlug) || template.primaryCategory || template.categories?.[0]

  const [moreFromCreator, relatedTemplates, allCategories] = await Promise.all([
    template.designer ? getMoreFromCreator(template.designer, template.slug, categorySlug) : [],
    getRelatedTemplates(categorySlug, template.slug),
    getAllCategories(),
  ])

  return (
    <main className="flex-1">
      <div className="container">
        {/* ── Breadcrumbs ── */}
        <div className="flex items-center gap-2 pt-8 text-ln-label-sm text-ln-gray-500">
          <Link href="/marketplace/templates" className="transition-colors hover:text-ln-gray-800">
            Templates
          </Link>
          {primaryCategory && (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-4 text-ln-gray-300">
                <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.25" d="M8.333 13.333 11.667 10 8.333 6.667" />
              </svg>
              <Link href={`/marketplace/templates/category/${primaryCategory.slug}`} className="transition-colors hover:text-ln-gray-800">
                {primaryCategory.title}
              </Link>
            </>
          )}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-4 text-ln-gray-300">
            <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.25" d="M8.333 13.333 11.667 10 8.333 6.667" />
          </svg>
          <span className="text-ln-gray-800">{template.title}</span>
        </div>

        {/* ── Hero ── */}
        <div className="mx-auto w-full max-w-[956px] grid-cols-2 items-center gap-6 pt-11 xl:mt-8 xl:grid">
          <div>
            {template.designer && (
              <Link href={`/marketplace/templates?designer=${encodeURIComponent(template.designer)}`} className="flex items-center gap-1.5 xl:gap-2">
                <div className="flex size-4 items-center justify-center rounded-full bg-ln-gray-200 xl:size-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" className="size-3 text-ln-gray-500">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 0c-3.3 0-6 1.8-6 4v1h12v-1c0-2.2-2.7-4-6-4Z" />
                  </svg>
                </div>
                <div className="text-ln-label-md text-ln-gray-600 xl:text-ln-label-lg">{template.designer}</div>
              </Link>
            )}
            <h1 className="mt-3 text-[34px]/[40px] font-550 -tracking-[0.02em] text-ln-gray-800 xl:text-ln-title-h4 xl:text-ln-gray-900">
              {template.title}
            </h1>
          </div>
          <div className="mt-4 flex flex-col xl:mt-0 xl:gap-7">
            {template.description && (
              <div className="text-pretty text-ln-paragraph-md text-ln-gray-700 xl:text-ln-paragraph-lg xl:-tracking-[0.01em] xl:text-ln-gray-600">
                {template.description}
              </div>
            )}
            <div className="mt-6 grid gap-4 sm:flex xl:mt-0">
              <a href={template.demoUrl || '#'} target="_blank" rel="noopener noreferrer" className="group relative inline-flex h-10 items-center justify-center gap-2.5 whitespace-nowrap rounded-[11px] bg-ln-gray-0 px-4 text-ln-label-sm text-ln-gray-800 shadow-ln-button-white transition duration-200 ease-linear focus:outline-none">
                Live Preview
                <ArrowIcon />
              </a>
              <Link href="https://app.moydus.com/" target="_blank" className="group relative inline-flex h-10 items-center justify-center gap-2.5 whitespace-nowrap rounded-[11px] bg-ln-gray-900 px-4 text-ln-label-sm text-ln-gray-0 shadow-ln-button-gray transition duration-200 ease-linear focus:outline-none">
                Get Template
                <ArrowIcon light />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Details Bar ── */}
        <div className="mx-auto mt-10 flex w-full max-w-[956px] flex-wrap items-center justify-center gap-6 border-t border-ln-gray-200 pt-6 md:gap-10">
          {template.designer && (
            <Link href={`/marketplace/templates?designer=${encodeURIComponent(template.designer)}`} className="flex flex-col items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-ln-gray-400">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M10 10a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Zm0 0c-4.142 0-7.5 2.239-7.5 5v1.25h15V15c0-2.761-3.358-5-7.5-5Z" />
              </svg>
              <div className="text-ln-label-sm text-ln-gray-800">{template.designer}</div>
              <div className="text-[11px] text-ln-gray-450">Creator</div>
            </Link>
          )}
          {template.updatedAt && (
            <div className="flex flex-col items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-ln-gray-400">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M10 6.25V10l2.5 2.5m5-2.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />
              </svg>
              <div className="text-ln-label-sm text-ln-gray-800">{formatDate(template.updatedAt)}</div>
              <div className="text-[11px] text-ln-gray-450">Updated</div>
            </div>
          )}
          {template.pages != null && (
            <div className="hidden flex-col items-center gap-1.5 md:flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-ln-gray-400">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M6.25 2.5h7.5A1.25 1.25 0 0 1 15 3.75v12.5a1.25 1.25 0 0 1-1.25 1.25h-7.5A1.25 1.25 0 0 1 5 16.25V3.75A1.25 1.25 0 0 1 6.25 2.5Zm1.25 5h5m-5 2.5h5m-5 2.5h2.5" />
              </svg>
              <div className="text-ln-label-sm text-ln-gray-800">{template.pages}</div>
              <div className="text-[11px] text-ln-gray-450">Pages</div>
            </div>
          )}
          {template.views !== undefined && template.views > 0 && (
            <div className="flex flex-col items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-ln-gray-400">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M2.5 10s3.125-5 7.5-5 7.5 5 7.5 5-3.125 5-7.5 5-7.5-5-7.5-5Z" />
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
              </svg>
              <div className="text-ln-label-sm text-ln-gray-800">{formatViews(template.views)}</div>
              <div className="text-[11px] text-ln-gray-450">Views</div>
            </div>
          )}
          {template.difficulty && (
            <div className="hidden flex-col items-center gap-1.5 md:flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-ln-gray-400">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M5 15v-3.75m5 3.75V8.75m5 6.25v-7.5" />
              </svg>
              <div className="text-ln-label-sm text-ln-gray-800 capitalize">{template.difficulty}</div>
              <div className="text-[11px] text-ln-gray-450">Difficulty</div>
            </div>
          )}
        </div>
      </div>

      {/* ── Gallery ── */}
      {template.thumbnails && template.thumbnails.length > 0 && (
        <div className="container mt-10 mb-16">
          <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-2.5 md:grid-cols-2">
            {template.thumbnails.slice(0, 4).map((thumbnail, index) => (
              <div
                key={index}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#E6E6E6] ring-1 ring-inset ring-ln-gray-200"
              >
                <Image
                  src={urlFor(thumbnail).width(1600).height(1200).url()}
                  alt={`${template.title} screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index < 2}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Content + Sidebar ── */}
      <div className="container">
        <div className="mx-auto flex w-full max-w-[956px] flex-col gap-8 pb-12 lg:flex-row lg:gap-16 xl:pb-20">
          {/* Main Content */}
          <div className="flex-1 space-y-10">
            {template.about && (
              <div>
                <h2 className="text-ln-title-h5 text-ln-gray-900 xl:text-[28px]/[36px]">About</h2>
                <div className="mt-4 text-[16px]/[26px] font-medium -tracking-[0.01em] text-ln-gray-600 xl:mt-6 xl:text-[18px]/[30px]">
                  <PortableText value={template.about as Parameters<typeof PortableText>[0]['value']} components={portableTextComponents} />
                </div>
              </div>
            )}

            {template.about && (template.perfectFor || template.features) && <DottedSep />}

            {template.perfectFor && (
              <div>
                <h2 className="text-ln-title-h5 text-ln-gray-900 xl:text-[28px]/[36px]">Perfect For</h2>
                <div className="mt-4 text-[16px]/[26px] font-medium -tracking-[0.01em] text-ln-gray-600 xl:mt-6 xl:text-[18px]/[30px]">
                  <PortableText value={template.perfectFor as Parameters<typeof PortableText>[0]['value']} components={portableTextComponents} />
                </div>
              </div>
            )}

            {template.perfectFor && template.features && <DottedSep />}

            {template.features && (
              <div>
                <h2 className="text-ln-title-h5 text-ln-gray-900 xl:text-[28px]/[36px]">Features</h2>
                <div className="mt-4 text-[16px]/[26px] font-medium -tracking-[0.01em] text-ln-gray-600 xl:mt-6 xl:text-[18px]/[30px]">
                  <PortableText value={template.features as Parameters<typeof PortableText>[0]['value']} components={portableTextComponents} />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-64 space-y-8" style={{ height: 'fit-content' }}>
            {/* Categories */}
            <section>
              <h6 className="text-ln-label-sm font-semibold mb-4 text-ln-gray-500">Categories</h6>
              <div className="space-y-2">
                {(allCategories as Array<{ slug: string; title: string }>).slice(0, 8).map((cat) => {
                  const Icon = categoryIcons[cat.slug] || categoryIcons.default || FileText
                  return (
                    <Link
                      key={cat.slug}
                      href={`/marketplace/templates/category/${cat.slug}`}
                      className="flex items-center gap-3 text-sm text-ln-gray-500 transition-colors hover:text-ln-gray-900 py-1"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{cat.title}</span>
                    </Link>
                  )
                })}
              </div>
            </section>

            {/* Quick Links */}
            <section>
              <h6 className="text-ln-label-sm font-semibold mb-4 text-ln-gray-500">Quick Links</h6>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-ln-gray-500 py-1">
                  <Home className="w-4 h-4" />
                  <Link href="/" className="hover:text-ln-gray-900 transition-colors">Home</Link>
                </div>
                <div className="flex items-center gap-3 text-sm text-ln-gray-500 py-1">
                  <UserCheck className="w-4 h-4" />
                  <Link href="/about" className="hover:text-ln-gray-900 transition-colors">About Us</Link>
                </div>
                <div className="flex items-center gap-3 text-sm text-ln-gray-500 py-1">
                  <Mail className="w-4 h-4" />
                  <Link href="/contact" className="hover:text-ln-gray-900 transition-colors">Contact</Link>
                </div>
              </div>
            </section>

            {/* Support */}
            <section>
              <h6 className="text-ln-label-sm font-semibold mb-4 text-ln-gray-500">Support</h6>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-ln-gray-500 hover:text-ln-gray-900 transition-colors py-1">
                  <HelpCircle className="w-4 h-4" />
                  <span>About Template</span>
                </div>
                <Link href="/refund-policy" className="flex items-center gap-3 text-sm text-ln-gray-500 hover:text-ln-gray-900 transition-colors py-1">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Refund Policy</span>
                </Link>
                {template.designer && (
                  <Link href="mailto:info@moydus.com" className="flex items-center gap-3 text-sm text-ln-gray-500 hover:text-ln-gray-900 transition-colors py-1">
                    <Mail className="w-4 h-4" />
                    <span>Contact Creator</span>
                  </Link>
                )}
                <Link href="/contact" className="flex items-center gap-3 text-sm text-ln-gray-500 hover:text-ln-gray-900 transition-colors py-1 w-full text-left">
                  <Megaphone className="w-4 h-4" />
                  <span>Report Template</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      {(moreFromCreator.length > 0 || relatedTemplates.length > 0) && (
        <div className="container">
          <div className="mx-auto h-px w-full max-w-[956px] bg-ln-gray-200" />
        </div>
      )}

      {/* ── More from Creator ── */}
      {moreFromCreator.length > 0 && (
        <div className="container py-12 xl:py-16">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-ln-title-h5 text-ln-gray-900">More from {template.designer}</h2>
              <Link
                href={`/marketplace/templates?designer=${encodeURIComponent(template.designer || '')}`}
                className="group flex items-center gap-1 text-ln-label-sm text-ln-gray-600 transition-colors hover:text-ln-gray-900"
              >
                See All
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-4 transition-transform group-hover:translate-x-0.5">
                  <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.25" d="M8.333 13.333 11.667 10 8.333 6.667" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {(moreFromCreator as Template[]).map((item) => {
                const itemCategory = item.categories?.[0]?.slug || categorySlug
                return (
                  <Link key={item.slug} href={`/marketplace/templates/${itemCategory}/${item.slug}`} className="group overflow-hidden rounded-2xl bg-ln-gray-0 shadow-ln-xs transition-shadow hover:shadow-lg">
                    {item.thumbnails?.[0] && (
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E6E6E6]">
                        <Image
                          src={urlFor(item.thumbnails[0]).width(800).height(600).url()}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-ln-label-md text-ln-gray-900 line-clamp-1">{item.title}</h3>
                      {item.designer && (
                        <p className="mt-1 text-ln-paragraph-xs text-ln-gray-500">by {item.designer}</p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Related Templates ── */}
      {relatedTemplates.length > 0 && (
        <div className="container pb-12 xl:pb-20">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-ln-title-h5 text-ln-gray-900">Related Templates</h2>
              {primaryCategory && (
                <Link
                  href={`/marketplace/templates/category/${primaryCategory.slug}`}
                  className="group flex items-center gap-1 text-ln-label-sm text-ln-gray-600 transition-colors hover:text-ln-gray-900"
                >
                  More from {primaryCategory.title}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-4 transition-transform group-hover:translate-x-0.5">
                    <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.25" d="M8.333 13.333 11.667 10 8.333 6.667" />
                  </svg>
                </Link>
              )}
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {(relatedTemplates as Template[]).map((item) => {
                const itemCategory = item.categories?.[0]?.slug || categorySlug
                return (
                  <Link key={item.slug} href={`/marketplace/templates/${itemCategory}/${item.slug}`} className="group overflow-hidden rounded-2xl bg-ln-gray-0 shadow-ln-xs transition-shadow hover:shadow-lg">
                    {item.thumbnails?.[0] && (
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E6E6E6]">
                        <Image
                          src={urlFor(item.thumbnails[0]).width(800).height(600).url()}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-ln-label-md text-ln-gray-900 line-clamp-1">{item.title}</h3>
                      {item.designer && (
                        <p className="mt-1 text-ln-paragraph-xs text-ln-gray-500">by {item.designer}</p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
