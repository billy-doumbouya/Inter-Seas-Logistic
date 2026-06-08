import GalleryClient from '@/components/sections/GalleryClient'
import prisma from '@/lib/prisma'
import { PLACEHOLDERS } from '@/placeholders'

export const metadata = {
  title: 'Galerie — Inter Seas Logistic',
  description: 'Découvrez nos réalisations en images : navires, camions, chantiers et opérations logistiques.',
}

async function getImages() {
  try {
    const images = await prisma.galleryImage.findMany({ orderBy: { order: 'asc' } })
    return images.length > 0 ? images : PLACEHOLDERS.gallery.map((p) => ({
      id: p.id,
      imageUrl: p.url,
      titleFr: p.alt,
      category: p.category,
      publicId: p.id,
    }))
  } catch {
    return PLACEHOLDERS.gallery.map((p) => ({
      id: p.id,
      imageUrl: p.url,
      titleFr: p.alt,
      category: p.category,
      publicId: p.id,
    }))
  }
}

export default async function GalleryPage() {
  const images = await getImages()
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 bg-brand-blue overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-20" />
        <div className="container-custom relative z-10 text-center">
          <div className="w-16 h-1 bg-brand-red rounded-full mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Notre Galerie</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Découvrez nos réalisations, notre flotte et nos opérations en images.
          </p>
        </div>
      </section>
      <GalleryClient images={images} />
    </>
  )
}
