'use client'

import { useId, useState } from 'react'

interface TocItem {
  id: string
  label: string
  depth?: number
}

interface TableOfContentsProps {
  items: TocItem[]
  title?: string
}

export function TableOfContents({
  items,
  title = 'Bu sayfada',
}: TableOfContentsProps) {
  const [open, setOpen] = useState(false)
  const contentId = useId()

  if (!items.length) return null

  return (
    <div
      data-state={open ? 'open' : 'closed'}
      className="not-prose rounded-xl border border-ln-gray-200 bg-ln-gray-50 text-ln-gray-900 dark:border-ln-gray-800 dark:bg-ln-gray-900 dark:text-ln-gray-0"
    >
      <button
        type="button"
        aria-controls={contentId}
        aria-expanded={open}
        data-state={open ? 'open' : 'closed'}
        onClick={() => setOpen((prev) => !prev)}
        className="group inline-flex w-full items-center justify-between px-4 py-2.5 font-medium"
      >
        {title}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div
        data-state={open ? 'open' : 'closed'}
        id={contentId}
        className={`overflow-hidden transition-[max-height] duration-200 ${
          open ? 'max-h-[2000px]' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col p-4 pt-0 text-sm text-ln-gray-600 dark:text-ln-gray-400">
          {items.map((item) => {
            const depth = item.depth ?? 2
            const padding = Math.max(12, (depth - 1) * 12)

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="border-s border-ln-gray-200 dark:border-ln-gray-700 py-1.5 pl-3 hover:text-ln-gray-900 dark:hover:text-ln-gray-0 transition-colors"
                style={{ paddingInlineStart: `${padding}px` }}
              >
                {item.label}
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
