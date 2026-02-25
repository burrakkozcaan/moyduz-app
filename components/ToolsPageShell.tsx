import Link from 'next/link'

const BADGE_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-[18px] text-ln-orange">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M7.5 4.167v2.5m5-2.5v2.5M4.167 8.333h11.666M5.833 15h8.334a1.667 1.667 0 0 0 1.667-1.667V6.667A1.667 1.667 0 0 0 14.167 5H5.833A1.667 1.667 0 0 0 4.167 6.667v6.666A1.667 1.667 0 0 0 5.833 15Z" />
  </svg>
)

export type ToolsPageShellProps = {
  title: string
  description: string
  children: React.ReactNode
}

export function ToolsPageShell({ title, description, children }: ToolsPageShellProps) {
  return (
    <main className="flex-1 bg-ln-gray-0 dark:bg-ln-gray-950">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        <Link
          href="/tools"
          className="mb-6 inline-flex items-center gap-1.5 text-ln-label-sm text-ln-gray-600 dark:text-ln-gray-400 hover:text-ln-orange"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-4">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M12.5 15.833 7.5 10l5-5.833" />
          </svg>
          Tüm araçlara dön
        </Link>

        <div className="mb-10 text-center md:mb-12">
          <div className="inline-flex h-7 items-center gap-1.5 rounded-[9px] bg-ln-gray-0 pl-1.5 pr-2.5 text-ln-label-sm text-ln-gray-700 shadow-ln-subheading dark:bg-ln-gray-900 dark:text-ln-gray-300 dark:ring-1 dark:ring-ln-gray-800 md:mb-4">
            {BADGE_ICON}
            Ücretsiz Araç
            <span className="rounded-[5px] bg-ln-orange/[.12] px-[5px] py-[3px] text-ln-subheading-xs text-ln-orange shadow-ln-badge-orange">
              PRO
            </span>
          </div>
          <h1 className="mt-3 text-[34px]/[40px] font-550 -tracking-[0.02em] text-ln-gray-900 dark:text-ln-gray-0 md:mt-4 md:text-center md:text-ln-title-h2">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-ln-paragraph-md text-ln-gray-600 dark:text-ln-gray-400 md:mt-5 md:px-2 md:text-center md:text-ln-paragraph-lg">
            {description}
          </p>
        </div>

        {children}
      </div>
    </main>
  )
}

/** Kart stili — tools index ile aynı */
export const TOOLS_CARD_CLASS =
  'rounded-2xl bg-ln-gray-0 shadow-ln-xs ring-1 ring-inset ring-ln-gray-100 dark:bg-ln-gray-900 dark:ring-ln-gray-800 p-6'

/** CTA buton — primary */
export const TOOLS_BTN_PRIMARY_CLASS =
  'inline-flex h-9 items-center justify-center gap-1.5 rounded-10 bg-ln-orange px-4 text-ln-label-sm text-ln-gray-0 shadow-[0_0_0_1px_rgba(26,26,26,.28),inset_0_1px_2px_rgba(255,255,255,.34)] hover:bg-ln-orange/90'

/** CTA buton — secondary */
export const TOOLS_BTN_SECONDARY_CLASS =
  'inline-flex h-9 items-center justify-center rounded-10 border border-ln-gray-300 dark:border-ln-gray-700 px-4 text-ln-label-sm text-ln-gray-700 dark:text-ln-gray-300 hover:bg-ln-gray-50 dark:hover:bg-ln-gray-800'
