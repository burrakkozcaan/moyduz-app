'use client'

import { cn } from '@/utils/cn'
import type { ReactNode } from 'react'

export type CalloutType = 'note' | 'tip' | 'warning' | 'danger' | 'info' | 'prompt' | 'general'

/* ──────────────────────────────────────────── */
/* SVG Icons (inline – no extra dep)            */
/* ──────────────────────────────────────────── */

function NoteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={cn('size-4', className)} aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm6.5-.25A.75.75 0 017.25 7h1a.75.75 0 01.75.75v2.75h.25a.75.75 0 010 1.5h-2a.75.75 0 010-1.5h.25v-2h-.25a.75.75 0 01-.75-.75zM8 6a1 1 0 100-2 1 1 0 000 2z"
      />
    </svg>
  )
}

function TipIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 11 14" fill="currentColor" className={cn('h-4 w-auto', className)} aria-hidden>
      <path d="M3.13 12.42c0 .17.05.34.14.48l.47.7c.14.22.47.39.73.39h1.69c.26 0 .59-.18.72-.39l.47-.7c.08-.12.14-.34.14-.48V11.35H3.13v1.07zM5.31 0C2.52.01.5 2.27.5 4.79c0 1.21.45 2.32 1.19 3.16.45.52 1.16 1.59 1.43 2.5.01.01.02.02.02.02h4.38l.01-.01c.27-.91.98-1.98 1.44-2.51.74-.82 1.19-1.93 1.19-3.16C10.13 2.15 7.97 0 5.31 0zm2.64 7.11c-.43.49-.96 1.27-1.34 2.08H4.02c-.38-.81-.91-1.59-1.34-2.08C2.12 6.48 1.81 5.64 1.81 4.79c0-1.69 1.32-3.47 3.48-3.48 1.96 0 3.53 1.57 3.53 3.48 0 .85-.31 1.69-.87 2.32zM4.88 2.19c-1.21 0-2.19.98-2.19 2.19 0 .24.2.43.44.43s.44-.2.44-.43c0-.72.59-1.31 1.31-1.31.24 0 .44-.2.44-.44 0-.24-.2-.44-.44-.44z" />
    </svg>
  )
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={cn('size-4', className)} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  )
}

function DangerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={cn('size-4', className)} aria-hidden>
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  )
}

function GeneralIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={cn('size-4', className)} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  )
}

function PromptIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={cn('size-4', className)} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  )
}

/* ──────────────────────────────────────────── */
/* Config                                        */
/* ──────────────────────────────────────────── */

interface Cfg {
  label: string
  Icon: React.ComponentType<{ className?: string }>
  container: string
  iconCls: string
  titleCls: string
  bodyCls: string
}

const cfgMap: Record<CalloutType, Cfg> = {
  note: {
    label: 'Not',
    Icon: NoteIcon,
    container: 'border-blue-200 bg-blue-50/60 dark:border-blue-800/50 dark:bg-blue-950/25',
    iconCls: 'text-blue-500 dark:text-blue-400',
    titleCls: 'text-blue-900 dark:text-blue-100',
    bodyCls:
      'text-blue-800 dark:text-blue-200 [&_a]:text-blue-600 dark:[&_a]:text-blue-300 [&_a]:underline',
  },
  info: {
    label: 'Bilgi',
    Icon: NoteIcon,
    container: 'border-blue-200 bg-blue-50/60 dark:border-blue-800/50 dark:bg-blue-950/25',
    iconCls: 'text-blue-500 dark:text-blue-400',
    titleCls: 'text-blue-900 dark:text-blue-100',
    bodyCls:
      'text-blue-800 dark:text-blue-200 [&_a]:text-blue-600 dark:[&_a]:text-blue-300 [&_a]:underline',
  },
  tip: {
    label: 'İpucu',
    Icon: TipIcon,
    container: 'border-green-200 bg-green-50/60 dark:border-green-800/50 dark:bg-green-950/25',
    iconCls: 'text-green-500 dark:text-green-400',
    titleCls: 'text-green-900 dark:text-green-100',
    bodyCls:
      'text-green-800 dark:text-green-200 [&_a]:text-green-700 dark:[&_a]:text-green-300 [&_a]:underline',
  },
  warning: {
    label: 'Uyarı',
    Icon: WarningIcon,
    container: 'border-yellow-200 bg-yellow-50/60 dark:border-yellow-800/50 dark:bg-yellow-950/25',
    iconCls: 'text-yellow-500 dark:text-yellow-400',
    titleCls: 'text-yellow-900 dark:text-yellow-100',
    bodyCls:
      'text-yellow-800 dark:text-yellow-200 [&_a]:text-yellow-700 dark:[&_a]:text-yellow-300 [&_a]:underline',
  },
  danger: {
    label: 'Dikkat',
    Icon: DangerIcon,
    container: 'border-red-200 bg-red-50/60 dark:border-red-800/50 dark:bg-red-950/25',
    iconCls: 'text-red-500 dark:text-red-400',
    titleCls: 'text-red-900 dark:text-red-100',
    bodyCls:
      'text-red-800 dark:text-red-200 [&_a]:text-red-700 dark:[&_a]:text-red-300 [&_a]:underline',
  },
  general: {
    label: 'Genel Bilgi',
    Icon: GeneralIcon,
    container: 'border-orange-200 bg-orange-50/60 dark:border-orange-800/50 dark:bg-orange-950/25',
    iconCls: 'text-orange-500 dark:text-orange-400',
    titleCls: 'text-orange-900 dark:text-orange-100',
    bodyCls:
      'text-orange-800 dark:text-orange-200 [&_a]:text-orange-700 dark:[&_a]:text-orange-300 [&_a]:underline',
  },
  prompt: {
    label: 'Öneri',
    Icon: PromptIcon,
    container: 'border-orange-200/80 bg-orange-50 dark:border-orange-800/50 dark:bg-orange-950/30',
    iconCls: 'text-orange-500 dark:text-orange-400',
    titleCls: 'text-orange-900 dark:text-orange-100',
    bodyCls:
      'text-orange-800 dark:text-orange-200 [&_a]:text-orange-600 dark:[&_a]:text-orange-300 [&_a]:underline [&_code]:bg-orange-100 dark:[&_code]:bg-orange-900/40 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded',
  },
}

/* ──────────────────────────────────────────── */
/* Component                                    */
/* ──────────────────────────────────────────── */

/**
 * Mintlify tarzı renkli callout kutusu.
 *
 * MDX içinde:
 *   <MintlifyCallout type="tip" title="Hızlı yol">İçerik</MintlifyCallout>
 *   <MintlifyCallout type="warning">Uyarı metni</MintlifyCallout>
 *   <MintlifyCallout type="prompt" title="Kurulum">npm install ...</MintlifyCallout>
 *
 * Tipler: note (mavi) | tip (yeşil) | warning (sarı) | danger (kırmızı) | info (mavi) | general (turuncu) | prompt (turuncu, komut kartı)
 */
export function MintlifyCallout({
  type = 'note',
  title,
  children,
  className,
}: {
  type?: CalloutType
  title?: ReactNode
  children?: ReactNode
  className?: string
}) {
  const cfg = cfgMap[type] ?? cfgMap.note
  const { Icon } = cfg
  const displayTitle = title ?? cfg.label

  // Prompt type: horizontal flex-wrap layout (like Mintlify's prompt card)
  if (type === 'prompt') {
    return (
      <div
        data-callout-type={type}
        className={cn(
          'not-prose my-6 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border p-4 text-sm/[20px] tracking-[-0.1px]',
          cfg.container,
          className
        )}
      >
        <div className="flex min-w-0 items-start gap-2">
          <div className={cn('mt-0.5 shrink-0', cfg.iconCls)}>
            <Icon />
          </div>
          <div className="space-y-2 whitespace-normal min-w-0">
            {displayTitle && (
              <p className={cn('font-semibold leading-snug', cfg.titleCls)}>{displayTitle}</p>
            )}
            <div className={cn('leading-relaxed [&>p:last-child]:mb-0', cfg.bodyCls)}>
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      data-callout-type={type}
      className={cn(
        'not-prose my-5 flex gap-3 rounded-2xl border px-4 py-3.5',
        cfg.container,
        className
      )}
    >
      <div className={cn('mt-0.5 shrink-0', cfg.iconCls)}>
        <Icon />
      </div>
      <div className="min-w-0 flex-1">
        <p className={cn('mb-1 text-sm font-semibold leading-snug', cfg.titleCls)}>
          {displayTitle}
        </p>
        <div className={cn(
          'text-sm leading-relaxed',
          '[&>p]:mb-2 [&>p:last-child]:mb-0',
          '[&>ul]:my-1.5 [&>ul]:list-disc [&>ul]:pl-4 [&>ul>li]:mb-0.5',
          '[&>ol]:my-1.5 [&>ol]:list-decimal [&>ol]:pl-4 [&>ol>li]:mb-0.5',
          cfg.bodyCls
        )}>
          {children}
        </div>
      </div>
    </div>
  )
}
