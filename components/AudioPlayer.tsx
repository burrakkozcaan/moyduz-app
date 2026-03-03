'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface AudioPlayerProps {
  /** ElevenLabs ile üretilmiş CDN MP3 URL'si (varsa önce bu çalınır) */
  src?: string
  /** Fallback: Browser Web Speech API için Türkçe metin */
  text?: string
  title?: string
}

export function AudioPlayer({ src, text, title = 'Bu içeriği dinle' }: AudioPlayerProps) {
  const [playing, setPlaying] = useState(false)
  const [ttsReady, setTtsReady] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [progress, setProgress] = useState(0)
  const [useTTS, setUseTTS] = useState(!src) // MP3 yoksa direkt TTS

  // Web Speech API — sesler async yüklenir
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    const check = () => { if (window.speechSynthesis.getVoices().length > 0) setTtsReady(true) }
    check()
    window.speechSynthesis.addEventListener('voiceschanged', check)
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', check)
      window.speechSynthesis.cancel()
    }
  }, [])

  const getBestTrVoice = useCallback(() => {
    const voices = window.speechSynthesis.getVoices()
    return (
      voices.find(v => v.lang === 'tr-TR' && !v.localService) ||
      voices.find(v => v.lang === 'tr-TR') ||
      voices.find(v => v.lang.startsWith('tr')) ||
      null
    )
  }, [])

  function toggleTTS() {
    const synth = window.speechSynthesis
    if (playing) { synth.cancel(); setPlaying(false); return }
    synth.cancel()
    const utt = new SpeechSynthesisUtterance((text ?? '').slice(0, 4000))
    utt.lang = 'tr-TR'
    utt.rate = 0.88
    utt.pitch = 1.0
    const voice = getBestTrVoice()
    if (voice) utt.voice = voice
    utt.onend = () => setPlaying(false)
    utt.onerror = () => setPlaying(false)
    synth.speak(utt)
    setPlaying(true)
  }

  function toggleAudio() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) { audio.pause(); setPlaying(false) }
    else { audio.play(); setPlaying(true) }
  }

  function toggle() {
    if (useTTS) return toggleTTS()
    return toggleAudio()
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current
    if (!audio?.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration
  }

  // MP3 yüklenemezse TTS'e geç
  function onAudioError() {
    setUseTTS(true)
    setPlaying(false)
  }

  const hasTTS = typeof window !== 'undefined' && 'speechSynthesis' in window && !!text
  if (!src && !hasTTS) return null

  const showProgress = !useTTS && src

  return (
    <div className="not-prose my-6 flex items-center gap-4 rounded-xl border border-ln-gray-200 bg-ln-gray-0 px-4 py-3 dark:border-ln-gray-800 dark:bg-ln-gray-950">
      {/* Gizli audio element */}
      {src && !useTTS && (
        <audio
          ref={audioRef}
          src={src}
          onTimeUpdate={() => {
            const a = audioRef.current
            if (a?.duration) setProgress((a.currentTime / a.duration) * 100)
          }}
          onEnded={() => { setPlaying(false); setProgress(0) }}
          onError={onAudioError}
        />
      )}

      <button
        onClick={toggle}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ln-orange text-white transition-opacity hover:opacity-90"
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
        {showProgress ? (
          <div
            className="mt-1.5 h-1 cursor-pointer rounded-full bg-ln-gray-200 dark:bg-ln-gray-700"
            onClick={seek}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
          >
            <div className="h-full rounded-full bg-ln-orange transition-all" style={{ width: `${progress}%` }} />
          </div>
        ) : (
          <p className="mt-0.5 text-xs text-ln-gray-400 dark:text-ln-gray-500">
            {playing ? 'Okunuyor…' : useTTS ? (ttsReady ? 'Türkçe sesli okuma' : 'Yükleniyor…') : 'ElevenLabs · Türkçe'}
          </p>
        )}
      </div>
    </div>
  )
}
