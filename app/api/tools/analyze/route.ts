import { NextRequest, NextResponse } from 'next/server'

const WORKER_URL = process.env.CONTENT_WORKER_URL || 'https://moyduz-content-ai.burhanburakozcaan.workers.dev'
const AUTH_SECRET = process.env.AUTH_SECRET || ''

const SYSTEM_PROMPTS: Record<string, string> = {
  komisyon: 'Sen deneyimli bir Türk e-ticaret danışmanısın. Marketplace komisyon analizini inceleyip satıcıya kısa, somut ve uygulanabilir Türkçe tavsiyeler ver. Marj düşükse nedenini açıkla ve iyileştirme yollarını öner. Cevabın 3-4 cümle olsun.',
  kdv:      'Sen bir Türk e-ticaret muhasebecisisin. KDV hesaplamasını incele ve işletme için pratik vergi yönetimi tavsiyeleri ver. Cevabın 3 cümle olsun.',
  desi:     'Sen bir Türk kargo ve lojistik uzmanısın. Desi hesaplamasını incele ve kargo maliyetini düşürmek için somut öneriler ver. Cevabın 3 cümle olsun.',
  kargo:    'Sen bir Türk kargo uzmanısın. Kargo maliyet karşılaştırmasını incele ve en karlı seçim için somut tavsiye ver. Cevabın 3 cümle olsun.',
  maliyet:  'Sen bir Türk e-ticaret danışmanısın. Platform maliyet analizini incele ve işletme maliyetlerini düşürmek için somut öneriler ver. Cevabın 3-4 cümle olsun.',
  roi:      'Sen bir Türk e-ticaret yatırım danışmanısın. ROI analizini incele ve yatırımın değerini artırmak için somut tavsiyeler ver. Cevabın 3-4 cümle olsun.',
  'sanal-pos': 'Sen bir Türk fintech danışmanısın. Sanal POS maliyet karşılaştırmasını incele ve en uygun ödeme çözümü için somut tavsiye ver. Cevabın 3 cümle olsun.',
}

export async function POST(req: NextRequest) {
  try {
    const { tool, context } = await req.json()

    if (!tool || !context) {
      return NextResponse.json({ error: 'tool ve context zorunlu' }, { status: 400 })
    }

    const systemPrompt = SYSTEM_PROMPTS[tool] ?? 'Sen bir e-ticaret danışmanısın. Aşağıdaki verileri incele ve Türkçe tavsiye ver. Cevabın 3-4 cümle olsun.'

    const resp = await fetch(`${WORKER_URL}/content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_SECRET}`,
      },
      body: JSON.stringify({
        system: systemPrompt,
        prompt: context,
        max_tokens: 400,
      }),
    })

    if (!resp.ok) {
      const err = await resp.text()
      return NextResponse.json({ error: err }, { status: resp.status })
    }

    const data = await resp.json() as { text?: string; error?: string }
    if (data.error) return NextResponse.json({ error: data.error }, { status: 503 })

    return NextResponse.json({ analysis: data.text })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
