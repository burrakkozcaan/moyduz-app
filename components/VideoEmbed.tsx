'use client'

import { cn } from '@/lib/utils'

interface VideoEmbedProps {
  /** YouTube embed URL (örn. https://www.youtube.com/embed/4KzFe50RQkQ) veya video ID */
  src: string
  title?: string
  className?: string
}

/** YouTube / iframe video embed. MDX içinde <VideoEmbed src="https://www.youtube.com/embed/VIDEO_ID" /> */
export function VideoEmbed({
  src,
  title = 'Video oynatıcı',
  className,
}: VideoEmbedProps) {
  const embedUrl = src.startsWith('http') ? src : `https://www.youtube.com/embed/${src}`

  return (
    <div className={cn('flex justify-center w-full my-6', className)} data-as="iframe">
      <iframe
        title={title}
        src={embedUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg border-0 w-full max-w-[560px] aspect-video"
        style={{ aspectRatio: '560 / 315' }}
      />
    </div>
  )
}
