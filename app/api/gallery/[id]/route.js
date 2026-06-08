import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { deleteFromCloudinary } from '@/lib/cloudinary'

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  try {
    const image = await prisma.galleryImage.findUnique({ where: { id: params.id } })
    if (image?.publicId) {
      await deleteFromCloudinary(image.publicId).catch(console.error)
    }
    await prisma.galleryImage.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
