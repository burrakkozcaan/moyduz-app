import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

export interface CompareFrontmatter {
  title: string
  meta_title?: string
  meta_description?: string
  slug: string
  published_at?: string
  updated_at?: string
  author_name?: string
  reading_time?: number
  snippet?: string
  [key: string]: unknown
}

export interface ComparePost {
  frontmatter: CompareFrontmatter
  content: string
}

const COMPARE_DIR = path.join(process.cwd(), 'content', 'compare')

export async function getComparePost(slug: string): Promise<ComparePost | null> {
  try {
    const filePath = path.join(COMPARE_DIR, `${slug}.mdx`)
    if (!fs.existsSync(filePath)) return null

    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    return {
      frontmatter: { ...data, slug } as CompareFrontmatter,
      content,
    }
  } catch {
    return null
  }
}

export async function getAllComparePosts(): Promise<ComparePost[]> {
  try {
    if (!fs.existsSync(COMPARE_DIR)) return []

    const files = fs.readdirSync(COMPARE_DIR).filter((f) => f.endsWith('.mdx'))

    const posts = await Promise.all(
      files.map((f) => getComparePost(f.replace('.mdx', '')))
    )

    return posts
      .filter((p): p is ComparePost => p !== null)
      .sort((a, b) => {
        const da = a.frontmatter.published_at
          ? new Date(a.frontmatter.published_at).getTime()
          : 0
        const db = b.frontmatter.published_at
          ? new Date(b.frontmatter.published_at).getTime()
          : 0
        return db - da
      })
  } catch {
    return []
  }
}
