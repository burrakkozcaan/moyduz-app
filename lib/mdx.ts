import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

export interface BlogFrontmatter {
  title: string
  meta_title?: string
  meta_description?: string
  slug: string
  featured_image?: string
  published_at: string
  updated_at?: string
  author_name?: string
  reading_time?: number
  category?: { name: string; slug: string }
  /** Blog detayına göre FAQ; her yazıda altında accordion ile gösterilir */
  faqs?: Array<{ question: string; answer: string }>
  [key: string]: unknown
}

export interface BlogPost {
  frontmatter: BlogFrontmatter
  content: string
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
    if (!fs.existsSync(filePath)) return null

    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    return {
      frontmatter: { ...data, slug } as BlogFrontmatter,
      content,
    }
  } catch {
    return null
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    if (!fs.existsSync(BLOG_DIR)) return []

    const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))

    const posts = await Promise.all(
      files.map((f) => getBlogPost(f.replace('.mdx', '')))
    )

    return posts
      .filter((p): p is BlogPost => p !== null)
      .sort((a, b) => {
        const da = new Date(a.frontmatter.published_at).getTime()
        const db = new Date(b.frontmatter.published_at).getTime()
        return db - da
      })
  } catch {
    return []
  }
}

export async function getBlogPostsByCategory(
  categorySlug?: string | null
): Promise<BlogPost[]> {
  const all = await getAllBlogPosts()
  if (!categorySlug) return all

  return all.filter((post) => {
    const slug =
      typeof post.frontmatter.category === 'object'
        ? post.frontmatter.category?.slug
        : post.frontmatter.category
    return (slug || '').toLowerCase() === categorySlug.toLowerCase()
  })
}
