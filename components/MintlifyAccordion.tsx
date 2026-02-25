'use client'

import { cn } from '@/utils/cn'
import type { ReactNode } from 'react'

/**
 * Mintlify tarzı açılır-kapanır accordion (details/summary).
 *
 * MDX içinde:
 *   <MintlifyAccordion title="Daha fazla bilgi">İçerik...</MintlifyAccordion>
 *
 * Grup olarak:
 *   <MintlifyAccordionGroup>
 *     <MintlifyAccordion title="Soru 1">Cevap 1</MintlifyAccordion>
 *     <MintlifyAccordion title="Soru 2">Cevap 2</MintlifyAccordion>
 *   </MintlifyAccordionGroup>
 */

function CaretIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 6 10"
      fill="currentColor"
      className={cn('h-3 w-3', className)}
      aria-hidden
    >
      <path d="M1.4 8.56L4.67 5 1.4 1.23a.71.71 0 011.07-.94l3.75 4.25a.71.71 0 010 .94L2.47 9.72a.71.71 0 01-1.07-.94v-.22z" />
    </svg>
  )
}

export function MintlifyAccordion({
  title,
  children,
  defaultOpen = false,
  className,
}: {
  title: ReactNode
  children?: ReactNode
  defaultOpen?: boolean
  className?: string
}) {
  return (
    <details
      open={defaultOpen || undefined}
      className={cn(
        'group/accordion my-2 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden',
        'transition-colors hover:border-gray-300 dark:hover:border-gray-700',
        className
      )}
    >
      <summary
        className={cn(
          'flex cursor-pointer select-none items-center gap-2 px-4 py-3',
          'list-none [&::-webkit-details-marker]:hidden',
          'bg-white dark:bg-gray-950',
          'hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors'
        )}
      >
        <div className="mr-0.5 text-gray-700 dark:text-gray-400 transition-transform duration-150 group-open/accordion:rotate-90">
          <CaretIcon />
        </div>
        <div className="leading-tight text-left w-full">
          <p className="m-0 font-medium text-sm text-gray-900 dark:text-gray-200">
            {title}
          </p>
        </div>
      </summary>
      <div
        className="mx-6 mt-1 mb-4 text-sm prose prose-gray dark:prose-invert overflow-x-auto [&>p:last-child]:mb-0"
        data-component-part="accordion-content"
      >
        {children}
      </div>
    </details>
  )
}

export function MintlifyAccordionGroup({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'my-5 divide-y divide-gray-200 dark:divide-gray-800 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden',
        '[&>details]:my-0 [&>details]:rounded-none [&>details]:border-0',
        className
      )}
    >
      {children}
    </div>
  )
}
