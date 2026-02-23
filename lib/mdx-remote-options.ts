import remarkGfm from 'remark-gfm'

/** Shared options for MDXRemote (tables, strikethrough, etc. via GFM) */
export const mdxRemoteOptions = {
  mdxOptions: { remarkPlugins: [remarkGfm] as const },
} as const
