'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import { Upload, Trash2, Loader2, Image as ImageIcon, Plus } from 'lucide-react'
import api from '@/lib/axios'

const CATEGORIES = ['general', 'maritime', 'transport', 'logistics', 'civil']

export default function AdminGalleryClient({ initialImages }) {
  const [images, setImages] = useState(initialImages)
  const [uploading, setUploading] = useState(false)
  const [filter, setFilter] = useState('all')
  const fileInputRef = useRef(null)

  const filtered = filter === 'all' ? images : images.filter((i) => i.category === filter)

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploading(true)

    for (const file of files) {
      try {
        const fd = new FormData()
        fd.append('file', file)
        fd.append('folder', 'interseas/gallery')
        const { data: uploadData } = await api.post('/upload', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })

        const { data: imageData } = await api.post('/gallery', {
          imageUrl: uploadData.url,
          publicId: uploadData.publicId,
          category: 'general',
          order: images.length,
        })
        setImages((prev) => [...prev, imageData])
      } catch {
        toast.error(`Erreur pour ${file.name}`)
      }
    }

    toast.success('Photos ajoutées !')
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cette photo ?')) return
    try {
      await api.delete(`/gallery/${id}`)
      setImages((prev) => prev.filter((i) => i.id !== id))
      toast.success('Photo supprimée')
    } catch { toast.error('Erreur suppression') }
  }

  const updateCategory = async (image, category) => {
    try {
      await api.put ? null : null // category update via general endpoint
      // Quick workaround — update via PUT to /api/gallery/:id won't exist, use POST trick
      toast.info('Catégorie mise à jour côté UI uniquement')
      setImages((prev) => prev.map((i) => i.id === image.id ? { ...i, category } : i))
    } catch { toast.error('Erreur') }
  }

  return (
    <div>
      {/* Upload zone */}
      <div className="card p-6 mb-6">
        <div
          className="border-2 border-dashed border-brand-gray-200 rounded-2xl p-8 text-center cursor-pointer hover:border-brand-blue transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? (
            <><Loader2 size={40} className="animate-spin text-brand-blue mx-auto mb-3" /><p className="text-brand-gray-500">Upload en cours...</p></>
          ) : (
            <><Upload size={40} className="text-brand-gray-300 mx-auto mb-3" />
            <p className="font-semibold text-brand-gray-600 mb-1">Cliquez pour ajouter des photos</p>
            <p className="text-brand-gray-400 text-sm">PNG, JPG, WebP — Plusieurs fichiers possibles</p></>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleUpload}
          disabled={uploading}
        />
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === cat ? 'bg-brand-blue text-white' : 'bg-white border border-brand-gray-200 text-brand-gray-600 hover:border-brand-blue'
            }`}
          >
            {cat === 'all' ? 'Tout' : cat}
          </button>
        ))}
        <span className="ml-auto text-brand-gray-400 text-sm self-center">{filtered.length} photo(s)</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((img) => (
          <div key={img.id} className="group relative rounded-2xl overflow-hidden shadow-brand bg-brand-gray-100 aspect-square">
            <Image
              src={img.imageUrl}
              alt={img.titleFr || 'Galerie'}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center">
              <button
                onClick={() => handleDelete(img.id)}
                className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-xl transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="absolute bottom-2 left-2">
              <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full">{img.category}</span>
            </div>
          </div>
        ))}

        {/* Upload card */}
        <div
          className="aspect-square rounded-2xl border-2 border-dashed border-brand-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-brand-blue transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Plus size={28} className="text-brand-gray-300 mb-2" />
          <p className="text-brand-gray-400 text-xs">Ajouter</p>
        </div>
      </div>

      {filtered.length === 0 && images.length === 0 && (
        <div className="text-center py-12 text-brand-gray-400">
          <ImageIcon size={48} className="mx-auto mb-3 opacity-30" />
          <p>Aucune photo. Uploadez vos premières images.</p>
        </div>
      )}
    </div>
  )
}
