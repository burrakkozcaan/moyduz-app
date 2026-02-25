import Link from 'next/link'

interface ToolCTAProps {
  title: string
  description: string
  href: string
  /** Button label — default "Aracı Kullan →" */
  label?: string
}

export function ToolCTA({ title, description, href, label = 'Aracı Kullan →' }: ToolCTAProps) {
  return (
    <div className="not-prose my-6 flex flex-col gap-3 rounded-xl border border-ln-orange/20 bg-ln-orange/5 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-semibold text-ln-gray-900 dark:text-white">{title}</p>
        <p className="mt-1 text-sm text-ln-gray-600 dark:text-ln-gray-400">{description}</p>
      </div>
      <Link
        href={href}
        className="inline-flex shrink-0 items-center rounded-lg bg-ln-orange px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        {label}
      </Link>
    </div>
  )
}
