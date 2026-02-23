import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

/**
 * Optimized Sanity image URL builder with best practices for Next.js
 * - Auto format conversion (WebP/AVIF)
 * - Quality optimization
 * - Responsive sizing
 * - Blur placeholder support
 */
export function urlForOptimized(
  source: SanityImageSource,
  options?: {
    width?: number
    height?: number
    quality?: number
    format?: 'webp' | 'avif' | 'auto'
    blur?: number
  }
) {
  const { width, height, quality = 85, format = 'auto', blur } = options || {}

  let imageBuilder = builder.image(source)

  if (width) imageBuilder = imageBuilder.width(width)
  if (height) imageBuilder = imageBuilder.height(height)
  imageBuilder = imageBuilder.quality(quality)

  if (format === 'auto') {
    imageBuilder = imageBuilder.auto('format')
  } else {
    imageBuilder = imageBuilder.format(format)
  }

  if (blur) {
    imageBuilder = imageBuilder.blur(blur)
  }

  return imageBuilder
}

/**
 * Generate blur placeholder data URL for Sanity images
 */
export function urlForBlurPlaceholder(source: SanityImageSource): string {
  return builder
    .image(source)
    .width(20)
    .height(20)
    .quality(20)
    .blur(50)
    .format('webp')
    .url()
}
