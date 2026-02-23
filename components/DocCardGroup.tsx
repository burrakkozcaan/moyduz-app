'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DocCardItem {
  title: string
  description?: string
  href: string
  external?: boolean
  icon?: React.ReactNode
}

interface DocCardGroupProps {
  /** Ya cards array (programatik) ya da children (MDX içinde DocCard) */
  cards?: DocCardItem[]
  children?: React.ReactNode
  className?: string
}

/** Tek kart: MDX içinde <DocCard title="..." href="..." description="..." /> */
export function DocCard({
  title,
  description,
  href,
  external,
  children,
}: {
  title: string
  description?: string
  href: string
  external?: boolean
  children?: React.ReactNode
}) {
  const content = description ?? (typeof children === 'string' ? children : undefined)
  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={cn(
        'card block font-normal group relative my-2 ring-2 ring-transparent rounded-2xl',
        'bg-white dark:bg-ln-gray-900 border border-gray-950/10 dark:border-white/10',
        'overflow-hidden w-full cursor-pointer',
        'hover:!border-ln-orange dark:hover:!border-ln-orange transition-colors'
      )}
    >
      <div className="px-6 py-5 relative" data-component-part="card-content-container">
        <div
          className="absolute text-gray-400 dark:text-gray-500 group-hover:text-ln-orange dark:group-hover:text-ln-orange top-5 right-5"
          aria-hidden
        >
          <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
        </div>
        <div className="w-full">
          <h2 className="not-prose font-semibold text-base text-gray-800 dark:text-white mt-2" data-component-part="card-title">
            {title}
          </h2>
          {(content || children) && (
            <div
              className="prose mt-1 font-normal text-base leading-6 text-gray-600 dark:text-gray-400"
              data-component-part="card-content"
            >
              {content ? <span data-as="p">{content}</span> : children}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

/** Mintlify tarzı card grid. MDX: <DocCardGroup><DocCard ... /><DocCard ... /></DocCardGroup> */
export function DocCardGroup({ cards, children, className }: DocCardGroupProps) {
  const hasCards = cards?.length
  const hasChildren = !!children

  if (!hasCards && !hasChildren) return null

  return (
    <div
      className={cn(
        'columns card-group prose dark:prose-invert grid gap-x-4 sm:grid-cols-2 gap-y-2 my-6',
        className
      )}
    >
      {hasCards
        ? cards!.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              target={card.external ? '_blank' : undefined}
              rel={card.external ? 'noreferrer' : undefined}
              className={cn(
                'card block font-normal group relative my-2 ring-2 ring-transparent rounded-2xl',
                'bg-white dark:bg-ln-gray-900 border border-gray-950/10 dark:border-white/10',
                'overflow-hidden w-full cursor-pointer',
                'hover:!border-ln-orange dark:hover:!border-ln-orange transition-colors'
              )}
            >
              <div className="px-6 py-5 relative" data-component-part="card-content-container">
                <div
                  className="absolute text-gray-400 dark:text-gray-500 group-hover:text-ln-orange dark:group-hover:text-ln-orange top-5 right-5"
                  aria-hidden
                >
                  <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                </div>
                {card.icon && (
                  <div className="h-6 w-6 fill-gray-800 dark:fill-gray-100 text-gray-800 dark:text-gray-100 mb-2" data-component-part="card-icon">
                    {card.icon}
                  </div>
                )}
                <div className="w-full">
                  <h2 className="not-prose font-semibold text-base text-gray-800 dark:text-white mt-2" data-component-part="card-title">
                    {card.title}
                  </h2>
                  {card.description && (
                    <div className="prose mt-1 font-normal text-base leading-6 text-gray-600 dark:text-gray-400" data-component-part="card-content">
                      <span data-as="p">{card.description}</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))
        : children}
    </div>
  )
}
