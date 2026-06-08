import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({ where: { active: true }, orderBy: { order: 'asc' } })
    return NextResponse.json(contacts)
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PUT(req) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  try {
    const body = await req.json()
    const { contacts } = body
    if (!Array.isArray(contacts)) return NextResponse.json({ error: 'Format invalide' }, { status: 400 })

    const updated = await Promise.all(
      contacts.map((c) =>
        prisma.contact.upsert({
          where: { id: c.id },
          update: { value: c.value, label: c.label, active: c.active, updatedAt: new Date() },
          create: { id: c.id, type: c.type, value: c.value, label: c.label, order: c.order || 0, updatedAt: new Date() },
        })
      )
    )
    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
