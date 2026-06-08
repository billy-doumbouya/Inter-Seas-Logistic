import AdminGalleryClient from '@/components/admin/AdminGalleryClient'
import prisma from '@/lib/prisma'

export const metadata = { title: 'Galerie — Admin ISL' }

async function getImages() {
  try { return await prisma.galleryImage.findMany({ orderBy: { order: 'asc' } }) }
  catch { return [] }
}

export default async function AdminGalleryPage() {
  const images = await getImages()
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-brand-blue">Gestion de la galerie</h1>
        <p className="text-brand-gray-500 mt-1">Ajoutez et organisez les photos de vos réalisations.</p>
      </div>
      <AdminGalleryClient initialImages={images} />
    </div>
  )
}
