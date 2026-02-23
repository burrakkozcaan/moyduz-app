'use client'

import { Info, AlertCircle, CheckCircle2, Lightbulb } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

interface InfoBoxProps {
  type?: 'info' | 'warning' | 'success' | 'tip'
  title?: string
  children: React.ReactNode
}

const iconMap = {
  info: Info,
  warning: AlertCircle,
  success: CheckCircle2,
  tip: Lightbulb,
}

const variantMap = {
  info: 'info' as const,
  warning: 'warning' as const,
  success: 'success' as const,
  tip: 'info' as const,
}

export function InfoBox({ type = 'info', title, children }: InfoBoxProps) {
  const Icon = iconMap[type]
  const variant = variantMap[type]

  return (
    <Alert variant={variant} className="my-8">
      <Icon className="h-5 w-5" />
      <div className="flex-1">
        {title && (
          <AlertTitle className="mb-2">
            {title}
          </AlertTitle>
        )}
        <AlertDescription className="prose prose-sm max-w-none dark:prose-invert">
          {children}
        </AlertDescription>
      </div>
    </Alert>
  )
}
