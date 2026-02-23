'use client'

/**
 * Blog MDX’te GFM tabloları için: data prop’u JSON string (string[][]).
 * Belirgin tablo görünümü: border, header arka planı, hücre padding.
 */
export function TableFromMarkdown({ data }: { data: string }) {
  let rows: string[][]
  try {
    rows = JSON.parse(decodeURIComponent(data)) as string[][]
  } catch {
    return null
  }
  if (!Array.isArray(rows) || rows.length === 0) return null

  const [header, ...bodyRows] = rows

  return (
    <div className="not-prose my-6 overflow-x-auto rounded-xl border border-ln-gray-200 dark:border-ln-gray-800 bg-ln-gray-0 dark:bg-ln-gray-900 shadow-sm">
      <table className="w-full min-w-[320px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-ln-gray-200 dark:border-ln-gray-800 bg-ln-gray-50 dark:bg-ln-gray-800/80">
            {header.map((cell, i) => (
              <th
                key={i}
                className="px-4 py-3 font-semibold text-ln-gray-900 dark:text-ln-gray-0"
                dangerouslySetInnerHTML={{ __html: cell }}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row, ri) => (
            <tr
              key={ri}
              className="border-b border-ln-gray-100 dark:border-ln-gray-800/80 last:border-b-0 hover:bg-ln-gray-50/50 dark:hover:bg-ln-gray-800/30 transition-colors"
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-4 py-3 text-ln-gray-700 dark:text-ln-gray-300 [&_strong]:font-semibold"
                  dangerouslySetInnerHTML={{ __html: cell }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
