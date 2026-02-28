import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { fullname, email, subject, message, product } = body

    if (!fullname || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Zorunlu alanlar eksik.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Geçersiz e-posta adresi.' },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: 'Moyduz İletişim <noreply@moyduz.com>',
      to: 'info@moyduz.com',
      replyTo: email,
      subject: `[Moyduz İletişim] ${subject} — ${fullname}`,
      text: [
        `Ad Soyad: ${fullname}`,
        `E-posta: ${email}`,
        `Konu: ${subject}`,
        product ? `Ürün / Proje: ${product}` : '',
        '',
        `Mesaj:\n${message}`,
      ]
        .filter(Boolean)
        .join('\n'),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact/route] Error:', err)
    return NextResponse.json(
      { success: false, error: 'Mesaj gönderilemedi. Lütfen tekrar deneyin.' },
      { status: 500 }
    )
  }
}
