'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'

const CATEGORIES = [
  { key: 'all', fr: 'Tout', en: 'All' },
  { key: 'maritime', fr: 'Maritime', en: 'Maritime' },
  { key: 'transport', fr: 'Transport', en: 'Transport' },
  { key: 'logistics', fr: 'Logistique', en: 'Logistics' },
  { key: 'civil', fr: 'Génie Civil', en: 'Civil' },
  { key: 'general', fr: 'Général', en: 'General' },
]

export default function GalleryClient({ images }) {
  const [active, setActive] = useState('all')
  const [lightbox, setLightbox] = useState(null)

  const filtered = active === 'all' ? images : images.filter((img) => img.category === active)

  return (
    <section className="section bg-white">
      <div className="container-custom">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                active === cat.key
                  ? 'bg-brand-blue text-white shadow-brand'
                  : 'bg-brand-gray-100 text-brand-gray-600 hover:bg-brand-gray-200'
              }`}
            >
              {cat.fr}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          <AnimatePresence>
            {filtered.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden shadow-brand hover:shadow-brand-lg transition-shadow"
                onClick={() => setLightbox(img)}
              >
                <div className="relative w-full h-64">
                  <Image
                    src={img.imageUrl}
                    alt={img.titleFr || 'Inter Seas Logistic'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/40 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  {img.titleFr && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-sm font-medium">{img.titleFr}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-brand-gray-400">
            <p className="text-4xl mb-4">📷</p>
            <p>Aucune image dans cette catégorie.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              onClick={() => setLightbox(null)}
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="relative max-w-4xl max-h-[85vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.imageUrl}
                alt={lightbox.titleFr || ''}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
