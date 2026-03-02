'use client'

import { useState, useEffect, useRef } from 'react'

interface AudioPlayerProps {
  /** Okunacak Türkçe metin içeriği */
  text?: string
  title?: string
}

export function AudioPlayer({ text, title = 'Bu içeriği dinle' }: AudioPlayerProps) {
  const [playing, setPlaying] = useState(false)
  const [supported, setSupported] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window)
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  function toggle() {
    if (!supported || !text) return
    const synth = window.speechSynthesis

    if (playing) {
      synth.cancel()
      setPlaying(false)
      return
    }

    synth.cancel()
    const utterance = new SpeechSynthesisUtterance(text.slice(0, 4000))
    utterance.lang = 'tr-TR'
    utterance.rate = 0.95
    utteranceRef.current = utterance

    utterance.onend = () => setPlaying(false)
    utterance.onerror = () => setPlaying(false)

    // Turkish voice seç (varsa)
    const voices = synth.getVoices()
    const trVoice = voices.find(v => v.lang.startsWith('tr'))
    if (trVoice) utterance.voice = trVoice

    synth.speak(utterance)
    setPlaying(true)
  }

  if (!supported || !text) return null

  return (
    <div className="not-prose my-6 flex items-center gap-4 rounded-xl border border-ln-gray-200 bg-ln-gray-0 px-4 py-3 dark:border-ln-gray-800 dark:bg-ln-gray-950">
      <button
        onClick={toggle}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ln-orange text-white transition-opacity hover:opacity-90"
        aria-label={playing ? 'Duraklat' : 'Dinle'}
      >
        {playing ? (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg className="h-4 w-4 translate-x-px" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z" />
          </svg>
        )}
      </button>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">{title}</p>
        <p className="mt-0.5 text-xs text-ln-gray-400 dark:text-ln-gray-500">
          {playing ? 'Okunuyor...' : 'Türkçe sesli okuma'}
        </p>
      </div>
    </div>
  )
}
