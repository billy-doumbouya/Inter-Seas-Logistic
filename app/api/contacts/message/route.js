import { NextResponse } from 'next/server'
import { sendContactMessage } from '@/lib/mailer'

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, email, phone, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    await sendContactMessage({ name, email, phone, subject, message })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact message error:', err)
    return NextResponse.json({ error: 'Erreur lors de l\'envoi' }, { status: 500 })
  }
}
