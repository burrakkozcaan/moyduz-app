import remarkGfm from 'remark-gfm'
import { rehypeCode } from 'fumadocs-core/mdx-plugins'

/** Shared options for MDXRemote (tables, GFM, syntax highlighting via Shiki) */
export const mdxRemoteOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypeCode, { themes: { light: 'github-light', dark: 'github-dark' } }]],
  },
}
