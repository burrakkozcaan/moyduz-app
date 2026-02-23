'use client'

import { cn } from '@/lib/utils'
import { Info, AlertTriangle, Lightbulb } from 'lucide-react'

type SnippetType = 'note' | 'warning' | 'tip'

const typeStyles: Record<
  SnippetType,
  { container: string; icon: string; iconComponent: React.ComponentType<{ className?: string }> }
> = {
  note: {
    container:
      'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-600/20 text-blue-800 dark:text-blue-300',
    icon: 'text-blue-800 dark:text-blue-300',
    iconComponent: Info,
  },
  warning: {
    container:
      'border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-600/20 text-yellow-800 dark:text-yellow-300',
    icon: 'text-yellow-800 dark:text-yellow-300',
    iconComponent: AlertTriangle,
  },
  tip: {
    container:
      'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-600/20 text-green-800 dark:text-green-300',
    icon: 'text-green-800 dark:text-green-300',
    iconComponent: Lightbulb,
  },
}

interface SnippetProps {
  type?: SnippetType
  title?: string
  children: React.ReactNode
  className?: string
}

/** Callout/snippet kutusu: note (mavi), warning (sarı), tip (yeşil). Mintlify tarzı. */
export function Snippet({ type = 'note', title, children, className }: SnippetProps) {
  const { container, icon, iconComponent: Icon } = typeStyles[type]

  return (
    <div
      className={cn(
        'callout my-4 px-5 py-4 overflow-hidden rounded-2xl flex gap-3 border',
        container,
        className
      )}
      data-callout-type={type}
    >
      <div className="mt-0.5 w-4 shrink-0" data-component-part="callout-icon" aria-hidden>
        <Icon className={cn('size-4', icon)} aria-label={type} />
      </div>
      <div
        className={cn(
          'text-sm prose dark:prose-invert min-w-0 w-full [&_code]:!text-current [&_a]:!text-current [&_strong]:!text-current',
          icon
        )}
        data-component-part="callout-content"
      >
        {title && <p className="font-semibold mb-1">{title}</p>}
        <span data-as="p">{children}</span>
      </div>
    </div>
  )
}
