import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { sendQuoteConfirmation, sendQuoteToAdmin } from '@/lib/mailer'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  try {
    const quotes = await prisma.quote.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(quotes)
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const { fullName, email, description, serviceType } = body

    if (!fullName || !email || !description || !serviceType) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    const quote = await prisma.quote.create({ data: body })

    // Send emails in background
    Promise.all([
      sendQuoteConfirmation(quote).catch(console.error),
      sendQuoteToAdmin(quote).catch(console.error),
    ])

    return NextResponse.json(quote, { status: 201 })
  } catch (err) {
    console.error('Quote creation error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
