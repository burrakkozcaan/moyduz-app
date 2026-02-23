'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ComparisonTableProps {
  title?: string
  headers: string[]
  rows: Array<{
    label: string
    values: string[]
  }>
  highlight?: 'first' | 'last' | 'none'
}

export function ComparisonTable({
  title,
  headers,
  rows,
  highlight = 'none',
}: ComparisonTableProps) {
  return (
    <Card className="my-8">
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-ln-gray-100 dark:bg-ln-gray-900 border-b border-ln-gray-200 dark:border-ln-gray-800">
                <th className="px-4 py-3 text-left text-sm font-semibold text-ln-gray-900 dark:text-ln-gray-0">
                  Criteria
                </th>
                {headers.map((header, index) => {
                  const isHighlighted =
                    (highlight === 'first' && index === 0) ||
                    (highlight === 'last' && index === headers.length - 1)
                  return (
                    <th
                      key={index}
                      className={cn(
                        "px-4 py-3 text-center text-sm font-semibold text-ln-gray-900 dark:text-ln-gray-0",
                        isHighlighted && "bg-ln-orange/10 dark:bg-ln-orange/20"
                      )}
                    >
                      {header}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-ln-gray-200 dark:divide-ln-gray-800">
              {rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-ln-gray-50 dark:hover:bg-ln-gray-900/50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-medium text-ln-gray-900 dark:text-ln-gray-0">
                    {row.label}
                  </td>
                  {row.values.map((value, colIndex) => {
                    const isHighlighted =
                      (highlight === 'first' && colIndex === 0) ||
                      (highlight === 'last' && colIndex === headers.length - 1)
                    return (
                      <td
                        key={colIndex}
                        className={cn(
                          "px-4 py-3 text-center text-sm text-ln-gray-700 dark:text-ln-gray-300",
                          isHighlighted && "bg-ln-orange/5 dark:bg-ln-orange/10 font-medium"
                        )}
                      >
                        {value}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
