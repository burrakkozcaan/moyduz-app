'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DocPaginationLink {
  title: string
  description?: string
  href: string
}

interface DocPaginationProps {
  /** Önceki sayfa (sol) */
  prev?: DocPaginationLink
  /** Sonraki sayfa (sağ) */
  next?: DocPaginationLink
  className?: string
}

/** Mintlify tarzı Prev/Next pagination. Blog veya docs sayfa altında kullanılır. */
export function DocPagination({ prev, next, className }: DocPaginationProps) {
  if (!prev && !next) return null

  return (
    <div className={cn('pb-6 empty:hidden print:pb-0', className)}>
      <div
        id="pagination"
        className={cn(
          'w-full rounded-2xl flex bg-gray-50/80 dark:bg-white/[0.03] p-1 text-sm',
          prev && next && 'grid lg:grid-cols-2 gap-4'
        )}
      >
        {prev && (
          <Link
            href={prev.href}
            className="group w-full border border-ln-gray-200 dark:border-ln-gray-800 flex items-center rounded-xl py-3 px-4 hover:border-ln-gray-300 dark:hover:border-ln-gray-700 justify-start"
            aria-label={`Önceki: ${prev.title}`}
          >
            <div className="space-y-1">
              <div className="pagination-title font-medium text-gray-900 dark:text-gray-200">
                {prev.title}
              </div>
              {prev.description && (
                <div className="hidden lg:block text-sm text-gray-500 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400 truncate max-w-[theme(spacing.96)]">
                  {prev.description}
                </div>
              )}
              <div className="flex items-center text-sm text-ln-gray-500 dark:text-ln-gray-500 group-hover:text-ln-gray-600 dark:group-hover:text-ln-gray-400 gap-x-1">
                <ChevronLeft className="size-3.5 text-gray-400 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-500 shrink-0" />
                <span className="font-medium">Önceki</span>
              </div>
            </div>
          </Link>
        )}
        {next && (
          <Link
            href={next.href}
            className="group w-full border border-ln-gray-200 dark:border-ln-gray-800 flex items-center rounded-xl py-3 px-4 hover:border-ln-gray-300 dark:hover:border-ln-gray-700 justify-end text-right"
            aria-label={`Sonraki: ${next.title}`}
          >
            <div className="space-y-1 w-full">
              <div className="pagination-title font-medium text-gray-900 dark:text-gray-200 text-right">
                {next.title}
              </div>
              {next.description && (
                <div className="hidden lg:block text-sm text-gray-500 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400 truncate max-w-[theme(spacing.96)] ml-auto">
                  {next.description}
                </div>
              )}
              <div className="flex items-center text-sm text-ln-gray-500 dark:text-ln-gray-500 group-hover:text-ln-gray-600 dark:group-hover:text-ln-gray-400 gap-x-1 flex-row-reverse justify-end">
                <ChevronRight className="size-3.5 text-gray-400 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-500 shrink-0" />
                <span className="font-medium">Sonraki</span>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}
