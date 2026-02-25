'use client'

import { useState, useRef } from 'react'

interface AudioPlayerProps {
  /** MP3 path — boş string veya undefined ise "yakında" modu */
  src?: string
  title?: string
}

export function AudioPlayer({ src, title = 'Bu içeriği dinle' }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const hasAudio = Boolean(src)

  function toggle() {
    const audio = audioRef.current
    if (!audio || !hasAudio) return
    if (playing) {
      audio.pause()
    } else {
      audio.play()
    }
    setPlaying(!playing)
  }

  function onTimeUpdate() {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    setProgress((audio.currentTime / audio.duration) * 100)
  }

  function onEnded() {
    setPlaying(false)
    setProgress(0)
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audio.currentTime = ratio * audio.duration
  }

  return (
    <div className="not-prose my-6 flex items-center gap-4 rounded-xl border border-ln-gray-200 bg-ln-gray-0 px-4 py-3 dark:border-ln-gray-800 dark:bg-ln-gray-950">
      {hasAudio && <audio ref={audioRef} src={src} onTimeUpdate={onTimeUpdate} onEnded={onEnded} />}

      {/* Play/Pause */}
      <button
        onClick={toggle}
        disabled={!hasAudio}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ln-orange text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label={playing ? 'Duraklat' : 'Oynat'}
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

      {/* Label + progress */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ln-gray-700 dark:text-ln-gray-300">{title}</p>
        {hasAudio ? (
          <div
            className="mt-1.5 h-1 cursor-pointer rounded-full bg-ln-gray-200 dark:bg-ln-gray-700"
            onClick={seek}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
          >
            <div
              className="h-full rounded-full bg-ln-orange transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        ) : (
          <p className="mt-0.5 text-xs text-ln-gray-400 dark:text-ln-gray-500">Ses versiyonu yakında eklenecek</p>
        )}
      </div>
    </div>
  )
}
