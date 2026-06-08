'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Eye, Trash2, X, Phone, Mail, Building, MapPin, Package } from 'lucide-react'
import api from '@/lib/axios'

const STATUS_OPTIONS = [
  { value: 'pending', label: 'En attente', cls: 'badge-yellow' },
  { value: 'processing', label: 'En cours', cls: 'badge-blue' },
  { value: 'completed', label: 'Traité', cls: 'badge-green' },
  { value: 'cancelled', label: 'Annulé', cls: 'bg-red-100 text-red-700 badge' },
]

function getStatus(value) {
  return STATUS_OPTIONS.find((s) => s.value === value) || STATUS_OPTIONS[0]
}

export default function AdminQuotesClient({ initialQuotes }) {
  const [quotes, setQuotes] = useState(initialQuotes)
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? quotes : quotes.filter((q) => q.status === filter)

  const updateStatus = async (id, status) => {
    try {
      const { data } = await api.put(`/quotes/${id}`, { status })
      setQuotes((prev) => prev.map((q) => q.id === id ? data : q))
      if (selected?.id === id) setSelected(data)
      toast.success('Statut mis à jour')
    } catch { toast.error('Erreur') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cette demande ?')) return
    try {
      await api.delete(`/quotes/${id}`)
      setQuotes((prev) => prev.filter((q) => q.id !== id))
      if (selected?.id === id) setSelected(null)
      toast.success('Demande supprimée')
    } catch { toast.error('Erreur suppression') }
  }

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setFilter('all')} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filter === 'all' ? 'bg-brand-blue text-white' : 'bg-white border border-brand-gray-200 text-brand-gray-600'}`}>
          Tous ({quotes.length})
        </button>
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s.value}
            onClick={() => setFilter(s.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filter === s.value ? 'bg-brand-blue text-white' : 'bg-white border border-brand-gray-200 text-brand-gray-600'}`}
          >
            {s.label} ({quotes.filter((q) => q.status === s.value).length})
          </button>
        ))}
      </div>

      {/* Quotes list */}
      <div className="card overflow-hidden">
        <div className="divide-y divide-brand-gray-50">
          {filtered.map((quote) => {
            const s = getStatus(quote.status)
            return (
              <div key={quote.id} className="px-6 py-4 flex flex-wrap items-center gap-3 hover:bg-brand-gray-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-brand-gray-800 truncate">{quote.fullName}</p>
                    <span className="text-brand-gray-300 text-xs">#{quote.id.slice(-6).toUpperCase()}</span>
                  </div>
                  <p className="text-brand-gray-500 text-sm truncate">{quote.serviceType} · {quote.email}</p>
                  {quote.origin && quote.destination && (
                    <p className="text-brand-gray-400 text-xs mt-0.5">{quote.origin} → {quote.destination}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={quote.status}
                    onChange={(e) => updateStatus(quote.id, e.target.value)}
                    className="text-xs border border-brand-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  >
                    {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <span className="text-brand-gray-400 text-xs hidden sm:block">
                    {new Date(quote.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                  <button onClick={() => setSelected(quote)} className="p-2 rounded-lg hover:bg-brand-gray-100 text-brand-gray-500 hover:text-brand-blue transition-colors">
                    <Eye size={16} />
                  </button>
                  <button onClick={() => handleDelete(quote.id)} className="p-2 rounded-lg hover:bg-red-50 text-brand-gray-500 hover:text-brand-red transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )
          })}
          {filtered.length === 0 && (
            <div className="p-12 text-center text-brand-gray-400">
              <Package size={40} className="mx-auto mb-3 opacity-30" />
              <p>Aucune demande dans cette catégorie.</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-gray-100">
              <div>
                <h2 className="font-display font-bold text-brand-blue">{selected.fullName}</h2>
                <p className="text-brand-gray-400 text-xs">#{selected.id.slice(-8).toUpperCase()} · {new Date(selected.createdAt).toLocaleString('fr-FR')}</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 rounded-lg hover:bg-brand-gray-100">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Status */}
              <div>
                <p className="label">Statut</p>
                <select
                  value={selected.status}
                  onChange={(e) => updateStatus(selected.id, e.target.value)}
                  className="input-field"
                >
                  {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <Mail size={14} className="text-brand-gray-400 mt-0.5" />
                  <div><p className="text-xs text-brand-gray-400">Email</p><p className="text-sm font-medium break-all">{selected.email}</p></div>
                </div>
                {selected.phone && <div className="flex items-start gap-2">
                  <Phone size={14} className="text-brand-gray-400 mt-0.5" />
                  <div><p className="text-xs text-brand-gray-400">Téléphone</p><p className="text-sm font-medium">{selected.phone}</p></div>
                </div>}
                {selected.company && <div className="flex items-start gap-2">
                  <Building size={14} className="text-brand-gray-400 mt-0.5" />
                  <div><p className="text-xs text-brand-gray-400">Entreprise</p><p className="text-sm font-medium">{selected.company}</p></div>
                </div>}
                <div className="flex items-start gap-2">
                  <Package size={14} className="text-brand-gray-400 mt-0.5" />
                  <div><p className="text-xs text-brand-gray-400">Service</p><p className="text-sm font-medium">{selected.serviceType}</p></div>
                </div>
              </div>

              {/* Logistics */}
              {(selected.origin || selected.destination) && (
                <div className="bg-brand-gray-50 rounded-xl p-4">
                  <p className="text-xs font-bold text-brand-gray-400 uppercase mb-2">Informations logistiques</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {selected.origin && <div><p className="text-brand-gray-400 text-xs">Origine</p><p className="font-medium">{selected.origin}</p></div>}
                    {selected.destination && <div><p className="text-brand-gray-400 text-xs">Destination</p><p className="font-medium">{selected.destination}</p></div>}
                    {selected.cargoType && <div><p className="text-brand-gray-400 text-xs">Cargaison</p><p className="font-medium">{selected.cargoType}</p></div>}
                    {selected.weight && <div><p className="text-brand-gray-400 text-xs">Poids</p><p className="font-medium">{selected.weight} t</p></div>}
                    {selected.volume && <div><p className="text-brand-gray-400 text-xs">Volume</p><p className="font-medium">{selected.volume} m³</p></div>}
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <p className="label">Description</p>
                <div className="bg-brand-gray-50 rounded-xl p-4 text-sm text-brand-gray-700 leading-relaxed">
                  {selected.description}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <a href={`mailto:${selected.email}`} className="btn-secondary flex-1 justify-center text-sm">
                  <Mail size={16} /> Répondre par email
                </a>
                {selected.phone && (
                  <a href={`tel:${selected.phone}`} className="btn-outline flex-1 justify-center text-sm">
                    <Phone size={16} /> Appeler
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
