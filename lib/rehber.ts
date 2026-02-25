import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

export interface RehberFrontmatter {
  title: string
  meta_description?: string
  slug: string
  published_at: string
  updated_at?: string
  draft?: boolean
  related_tools?: string[]
  related_blogs?: string[]
  key_points?: string[]
  [key: string]: unknown
}

export interface RehberPost {
  frontmatter: RehberFrontmatter
  content: string
}

const REHBER_DIR = path.join(process.cwd(), 'content', 'rehber')

export async function getRehberPost(slug: string): Promise<RehberPost | null> {
  try {
    const filePath = path.join(REHBER_DIR, `${slug}.mdx`)
    if (!fs.existsSync(filePath)) return null

    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    return {
      frontmatter: { ...data, slug } as RehberFrontmatter,
      content,
    }
  } catch {
    return null
  }
}

export async function getAllRehberPosts(): Promise<RehberPost[]> {
  try {
    if (!fs.existsSync(REHBER_DIR)) return []

    const files = fs.readdirSync(REHBER_DIR).filter((f) => f.endsWith('.mdx'))
    const now = new Date()

    const posts = await Promise.all(
      files.map((f) => getRehberPost(f.replace('.mdx', '')))
    )

    return posts
      .filter((p): p is RehberPost => p !== null)
      .filter((p) => !p.frontmatter.draft)
      .filter((p) => {
        const v = p.frontmatter.published_at
        if (!v) return false
        const d = new Date(v)
        if (Number.isNaN(+d)) return false
        return d <= now
      })
      .sort((a, b) => {
        const da = new Date(a.frontmatter.published_at).getTime()
        const db = new Date(b.frontmatter.published_at).getTime()
        return db - da
      })
  } catch {
    return []
  }
}
