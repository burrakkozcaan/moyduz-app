import { client } from '@/sanity/lib/client'
import {
  urlFor as sanityUrlFor,
  urlForOptimized,
  urlForBlurPlaceholder,
} from '@/sanity/lib/image'

export { client }

export function urlFor(source: Parameters<typeof sanityUrlFor>[0]) {
  return sanityUrlFor(source)
}

export { urlForOptimized, urlForBlurPlaceholder }
