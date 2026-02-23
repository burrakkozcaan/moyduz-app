'use client'

import { Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface QuoteBlockProps {
  quote: string
  author?: string
  source?: string
}

export function QuoteBlock({ quote, author, source }: QuoteBlockProps) {
  return (
    <Card className="my-8 border-l-4 border-l-ln-orange bg-ln-gray-50 dark:bg-ln-gray-900">
      <CardContent className="pt-6">
        <div className="relative">
          <Quote className="absolute -top-2 -left-2 w-8 h-8 text-ln-orange opacity-20" />
          <p className="text-lg md:text-xl font-medium text-ln-gray-900 dark:text-ln-gray-0 italic leading-relaxed relative z-10 pl-6">
            {quote}
          </p>
          {(author || source) && (
            <footer className="mt-4 text-sm text-ln-gray-600 dark:text-ln-gray-400 pl-6">
              {author && <cite className="font-semibold not-italic">{author}</cite>}
              {author && source && <span className="mx-2">—</span>}
              {source && <span>{source}</span>}
            </footer>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
