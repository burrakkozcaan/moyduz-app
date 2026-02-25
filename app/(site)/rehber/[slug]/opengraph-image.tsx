import { ImageResponse } from 'next/og'
import { getRehberPost } from '@/lib/rehber'

export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Params = { slug: string }

export default async function Image({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const post = await getRehberPost(slug)
  const title = post?.frontmatter.title ?? 'Moyduz Rehber'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '64px',
          position: 'relative',
        }}
      >
        {/* Orange accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '6px',
            height: '100%',
            background: '#f97316',
          }}
        />
        {/* Rehber badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(249,115,22,0.15)',
            border: '1px solid rgba(249,115,22,0.4)',
            borderRadius: '8px',
            padding: '6px 16px',
            marginBottom: '24px',
          }}
        >
          <div style={{ fontSize: '16px', color: '#f97316', fontWeight: 600 }}>
            REHBER
          </div>
        </div>
        {/* Title */}
        <div
          style={{
            fontSize: title.length > 60 ? '38px' : '50px',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.2,
            maxWidth: '1000px',
          }}
        >
          {title}
        </div>
        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '32px',
            gap: '12px',
          }}
        >
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#f97316' }} />
          <div style={{ fontSize: '20px', color: '#f97316', fontWeight: 600 }}>moyduz.com</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
