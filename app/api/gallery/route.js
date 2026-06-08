import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(images)
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  try {
    const body = await req.json()
    const { imageUrl, publicId, titleFr, titleEn, category, order } = body
    if (!imageUrl || !publicId) return NextResponse.json({ error: 'Image requise' }, { status: 400 })

    const image = await prisma.galleryImage.create({
      data: { imageUrl, publicId, titleFr, titleEn, category: category || 'general', order: order || 0 },
    })
    return NextResponse.json(image, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
