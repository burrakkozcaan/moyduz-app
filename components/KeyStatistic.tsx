'use client'

import { TrendingUp } from 'lucide-react'

interface KeyStatisticProps {
  value: string
  label: string
  source?: string
  description: string
}

export function KeyStatistic({
  value,
  label,
  source,
  description,
}: KeyStatisticProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-ln-gray-200 bg-ln-gray-50 p-6 md:p-8 my-10 group hover:border-ln-gray-300 transition-all duration-300 dark:border-ln-gray-800 dark:bg-ln-gray-900">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <TrendingUp className="w-24 h-24 text-ln-gray-900 dark:text-ln-gray-0" />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4 mb-4">
          <span className="text-4xl md:text-5xl font-bold text-ln-gray-900 dark:text-ln-gray-0">
            {value}
          </span>
          <span className="text-lg md:text-xl font-medium text-ln-gray-700 dark:text-ln-gray-300 pb-1.5 md:pb-2">
            {label}
          </span>
        </div>

        <p className="text-ln-gray-600 dark:text-ln-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mb-4">
          {description}
        </p>

        {source && (
          <div className="flex items-center gap-2 pt-4 border-t border-ln-gray-200 dark:border-ln-gray-800">
            <span className="text-xs font-semibold text-ln-gray-500 dark:text-ln-gray-500 uppercase tracking-wider">
              Source
            </span>
            <span className="text-xs text-ln-gray-600 dark:text-ln-gray-400 font-medium">
              {source}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
