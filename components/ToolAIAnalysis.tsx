'use client'

import { useState } from 'react'

interface Props {
  tool: string
  buildContext: () => string
}

export function ToolAIAnalysis({ tool, buildContext }: Props) {
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleAnalyze() {
    setLoading(true)
    setError(null)
    setAnalysis(null)

    try {
      const resp = await fetch('/api/tools/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool, context: buildContext() }),
      })

      const data = await resp.json() as { analysis?: string; error?: string }

      if (!resp.ok || data.error) {
        setError(data.error ?? 'Bir hata oluştu.')
      } else {
        setAnalysis(data.analysis ?? null)
      }
    } catch {
      setError('Bağlantı hatası. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-2">
      {!analysis && (
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-ln-gray-200 dark:border-ln-gray-700 bg-ln-gray-0 dark:bg-ln-gray-900 px-4 py-2.5 text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300 hover:bg-ln-gray-50 dark:hover:bg-ln-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="size-4 animate-spin text-ln-orange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              AI analiz yapıyor...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-ln-orange">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
              </svg>
              AI ile Analiz Et
            </>
          )}
        </button>
      )}

      {error && (
        <p className="mt-3 text-sm text-red-500">{error}</p>
      )}

      {analysis && (
        <div className="mt-4 rounded-xl border border-ln-orange/20 bg-orange-50/60 dark:bg-orange-900/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-ln-orange shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
            </svg>
            <span className="text-xs font-semibold text-ln-orange uppercase tracking-wide">AI Analiz</span>
          </div>
          <p className="text-sm text-ln-gray-700 dark:text-ln-gray-300 leading-relaxed whitespace-pre-line">{analysis}</p>
          <button
            onClick={() => { setAnalysis(null); setError(null) }}
            className="mt-3 text-xs text-ln-gray-400 hover:text-ln-gray-600 dark:hover:text-ln-gray-200 transition-colors"
          >
            Yeniden analiz et
          </button>
        </div>
      )}
    </div>
  )
}
