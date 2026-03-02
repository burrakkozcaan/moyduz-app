'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface AudioPlayerProps {
  text?: string
  title?: string
}

export function AudioPlayer({ text, title = 'Bu içeriği dinle' }: AudioPlayerProps) {
  const [playing, setPlaying] = useState(false)
  const [supported, setSupported] = useState(false)
  const [voiceReady, setVoiceReady] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    setSupported(true)

    // Sesler asenkron yüklenir — hem anında hem onvoiceschanged'de kontrol
    const check = () => {
      const voices = window.speechSynthesis.getVoices()
      if (voices.length > 0) setVoiceReady(true)
    }
    check()
    window.speechSynthesis.addEventListener('voiceschanged', check)

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', check)
      window.speechSynthesis.cancel()
    }
  }, [])

  const getBestTurkishVoice = useCallback(() => {
    const voices = window.speechSynthesis.getVoices()
    // Önce gerçek Türkçe ses, yoksa herhangi tr ses
    return (
      voices.find(v => v.lang === 'tr-TR' && !v.localService) ||
      voices.find(v => v.lang === 'tr-TR') ||
      voices.find(v => v.lang.startsWith('tr')) ||
      null
    )
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

    // Uzun içeriklerde 4000 karakter ile sınırla
    const utterance = new SpeechSynthesisUtterance(text.slice(0, 4000))
    utterance.lang = 'tr-TR'
    utterance.rate = 0.88    // biraz yavaş → daha doğal
    utterance.pitch = 1.0
    utterance.volume = 1.0

    const voice = getBestTurkishVoice()
    if (voice) utterance.voice = voice

    utterance.onend = () => setPlaying(false)
    utterance.onerror = () => setPlaying(false)

    synth.speak(utterance)
    setPlaying(true)
  }

  if (!supported) return null

  return (
    <div className="not-prose my-6 flex items-center gap-4 rounded-xl border border-ln-gray-200 bg-ln-gray-0 px-4 py-3 dark:border-ln-gray-800 dark:bg-ln-gray-950">
      <button
        onClick={toggle}
        disabled={!text}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ln-orange text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label={playing ? 'Durdur' : 'Dinle'}
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
          {playing ? 'Okunuyor…' : voiceReady ? 'Türkçe sesli okuma' : 'Ses yükleniyor…'}
        </p>
      </div>
    </div>
  )
}
