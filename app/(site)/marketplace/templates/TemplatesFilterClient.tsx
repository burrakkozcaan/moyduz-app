'use client'

import { useRouter, usePathname } from 'next/navigation'
import { AnimatedDrawer } from '@/components/new-ui/DrawerFilter'

interface Category {
  title: string
  slug: string
}

interface TemplatesFilterClientProps {
  categories: Category[]
  selectedCategory: string | null
  selectedPrice: string | null
}

export function TemplatesFilterClient({
  categories,
  selectedCategory,
  selectedPrice,
}: TemplatesFilterClientProps) {
  const router = useRouter()
  const pathname = usePathname()

  const buildUrl = (category: string | null, price: string | null) => {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (price) params.set('price', price)
    const qs = params.toString()
    return qs ? `${pathname}?${qs}` : pathname
  }

  const onCategoryChange = (category: string | null) => {
    router.push(buildUrl(category, selectedPrice))
  }

  const onPriceChange = (price: string | null) => {
    router.push(buildUrl(selectedCategory, price))
  }

  return (
    <AnimatedDrawer
      categories={categories}
      selectedCategory={selectedCategory}
      selectedPrice={selectedPrice}
      onCategoryChange={onCategoryChange}
      onPriceChange={onPriceChange}
    />
  )
}
