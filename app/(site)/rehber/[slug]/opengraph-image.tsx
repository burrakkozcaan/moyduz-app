import { ImageResponse } from 'next/og'
import { getRehberPost } from '@/lib/rehber'

export const runtime = 'nodejs'
export const alt = 'Moyduz Rehber'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const ORANGE = '#f94316'

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
        {/* Orange accent bar - root/site ile aynı */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '6px',
            height: '100%',
            background: ORANGE,
          }}
        />
        {/* Rehber badge - blog [slug] ile aynı stil */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: `${ORANGE}26`,
            border: `1px solid ${ORANGE}66`,
            borderRadius: '8px',
            padding: '6px 16px',
            marginBottom: '24px',
          }}
        >
          <div style={{ fontSize: '16px', color: ORANGE, fontWeight: 600 }}>
            REHBER
          </div>
        </div>
        {/* Title - blog [slug] ile aynı font boyutu */}
        <div
          style={{
            fontSize: title.length > 60 ? '40px' : '52px',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.2,
            maxWidth: '1000px',
          }}
        >
          {title}
        </div>
        {/* Footer - blog ile aynı */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '32px',
            gap: '12px',
          }}
        >
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: ORANGE }} />
          <div style={{ fontSize: '20px', color: ORANGE, fontWeight: 600 }}>moyduz.com</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
