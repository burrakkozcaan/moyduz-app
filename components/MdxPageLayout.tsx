import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { MDXComponents } from '@/lib/mdx-components'
import type { PageContent } from '@/lib/mdx-pages'

interface MdxPageLayoutProps {
  page: PageContent
  showLegalFooter?: boolean
}

export function MdxPageLayout({ page, showLegalFooter }: MdxPageLayoutProps) {
  return (
    <main className="flex-1">
      <div className="container mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <article>
          <h1 className="text-[34px] font-550 leading-[40px] -tracking-[0.02em] text-ln-gray-800 md:text-5xl md:text-ln-gray-900">
            {page.frontmatter.title}
          </h1>

          <div className="prose prose-lg mt-8 max-w-none prose-headings:text-ln-gray-900 prose-p:text-ln-gray-700 prose-a:text-ln-orange prose-a:no-underline hover:prose-a:underline prose-li:text-ln-gray-700 dark:prose-invert">
            <MDXRemote source={page.content} components={MDXComponents} />
          </div>
        </article>

        {showLegalFooter && (
          <div className="mt-12 flex flex-wrap gap-4 border-t border-ln-gray-200 pt-8 text-sm">
            <Link
              href="/privacy-policy"
              className="text-ln-gray-600 transition hover:text-ln-gray-900"
            >
              Privacy Policy
            </Link>
            <span className="text-ln-gray-400">|</span>
            <Link
              href="/terms-of-service"
              className="text-ln-gray-600 transition hover:text-ln-gray-900"
            >
              Terms of Service
            </Link>
            <span className="text-ln-gray-400">|</span>
            <Link
              href="/refund-policy"
              className="text-ln-gray-600 transition hover:text-ln-gray-900"
            >
              Refund Policy
            </Link>
            <span className="text-ln-gray-400">|</span>
            <Link
              href="/contact"
              className="text-ln-gray-600 transition hover:text-ln-gray-900"
            >
              Contact Us
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
