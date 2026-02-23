'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { urlFor } from '@/lib/sanity'

interface ImageSlideCarouselProps {
  images: Array<{ asset?: { url?: string } }>
  alt: string
}

export default function ImageSlideCarousel({ images, alt }: ImageSlideCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'center', containScroll: false })
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  )

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setActiveIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi, onSelect])

  return (
    <div className="relative overflow-hidden">
      <div ref={emblaRef}>
        <div className="-ml-6 flex md:-ml-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="pl-6 md:pl-4"
              style={{ flex: '0 0 auto', minWidth: 0 }}
            >
              <div
                className="relative w-[calc(100svw-48px)] min-w-80 shrink-0 overflow-hidden rounded-2xl bg-[#E6E6E6] md:w-[664px]"
                style={{ aspectRatio: 4 / 3 }}
              >
                <Image
                  src={urlFor(img).width(1328).height(996).url()}
                  alt={`${alt} screenshot ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) calc(100vw - 48px), 664px"
                  className="absolute left-0 top-0 size-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2.5 py-4 xl:hidden">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            className={`h-1.5 rounded-full transition-all duration-200 ease-out ${
              activeIndex === i ? 'w-6 bg-template-ai shadow-ln-special-light-ai' : 'w-1.5 bg-ln-gray-100 shadow-ln-badge-gray'
            }`}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 hidden -translate-y-1/2 justify-between px-24 xl:flex">
        <button
          type="button"
          onClick={scrollPrev}
          className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-ln-gray-900 shadow-ln-button-gray"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-6 rotate-180 text-ln-gray-0">
            <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.25" d="M8.333 13.333 11.667 10 8.333 6.667" />
          </svg>
        </button>
        <button
          type="button"
          onClick={scrollNext}
          className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-ln-gray-900 shadow-ln-button-gray"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-6 text-ln-gray-0">
            <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.25" d="M8.333 13.333 11.667 10 8.333 6.667" />
          </svg>
        </button>
      </div>
    </div>
  )
}
