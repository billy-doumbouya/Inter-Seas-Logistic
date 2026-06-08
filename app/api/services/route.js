import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(services)
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  try {
    const body = await req.json()
    const { titleFr, titleEn, descFr, descEn, icon, imageUrl, imagePublicId, order } = body

    if (!titleFr || !descFr) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    const service = await prisma.service.create({
      data: { titleFr, titleEn: titleEn || titleFr, descFr, descEn: descEn || descFr, icon: icon || 'Package', imageUrl, imagePublicId, order: order || 0 },
    })
    return NextResponse.json(service, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
