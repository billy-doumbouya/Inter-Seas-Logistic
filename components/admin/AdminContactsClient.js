'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Save, Loader2, Phone, Mail, MapPin, Facebook, Linkedin, Globe } from 'lucide-react'
import api from '@/lib/axios'

const ICONS = {
  phone: Phone, email: Mail, address: MapPin,
  facebook: Facebook, linkedin: Linkedin, website: Globe,
}

const TYPE_LABELS = {
  phone: 'Téléphone', email: 'Email', address: 'Adresse',
  facebook: 'Facebook', linkedin: 'LinkedIn', website: 'Site web',
}

export default function AdminContactsClient({ initialContacts }) {
  const [contacts, setContacts] = useState(initialContacts)
  const [saving, setSaving] = useState(false)

  const updateContact = (id, field, value) => {
    setContacts((prev) => prev.map((c) => c.id === id ? { ...c, [field]: value } : c))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await api.put('/contacts', { contacts })
      toast.success('Contacts sauvegardés !')
    } catch {
      toast.error('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="card overflow-hidden mb-6">
        <div className="divide-y divide-brand-gray-100">
          {contacts.map((contact) => {
            const Icon = ICONS[contact.type] || Globe
            return (
              <div key={contact.id} className="px-6 py-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon size={18} className="text-brand-blue" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-brand-gray-400 uppercase tracking-wide mb-2">
                    {TYPE_LABELS[contact.type] || contact.type} · {contact.label}
                  </p>
                  <input
                    value={contact.value}
                    onChange={(e) => updateContact(contact.id, 'value', e.target.value)}
                    className="input-field text-sm"
                    placeholder={`Valeur pour ${contact.label}`}
                  />
                </div>
                <label className="flex items-center gap-2 mt-2 cursor-pointer">
                  <div
                    onClick={() => updateContact(contact.id, 'active', !contact.active)}
                    className={`w-10 h-5 rounded-full transition-colors relative ${contact.active ? 'bg-brand-blue' : 'bg-brand-gray-300'}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${contact.active ? 'left-5' : 'left-0.5'}`} />
                  </div>
                  <span className="text-xs text-brand-gray-500">{contact.active ? 'Actif' : 'Masqué'}</span>
                </label>
              </div>
            )
          })}
          {contacts.length === 0 && (
            <div className="p-12 text-center text-brand-gray-400">
              <p>Aucun contact configuré. Lancez le seed pour initialiser.</p>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {saving ? <><Loader2 size={18} className="animate-spin" /> Sauvegarde...</> : <><Save size={18} /> Sauvegarder les modifications</>}
      </button>
    </div>
  )
}
