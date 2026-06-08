'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'sonner'
import { Send, Loader2, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import api from '@/lib/axios'

const SERVICE_OPTIONS = [
  { value: 'Logistique', label: 'Logistique' },
  { value: 'Transport', label: 'Transport' },
  { value: 'Consignation Maritime', label: 'Consignation Maritime' },
  { value: 'Location d\'équipement', label: 'Location d\'équipement' },
  { value: 'Génie Civil', label: 'Génie Civil' },
  { value: 'Autre', label: 'Autre' },
]

const schema = yup.object({
  fullName: yup.string().min(2).required('Nom requis'),
  email: yup.string().email('Email invalide').required('Email requis'),
  phone: yup.string().optional(),
  company: yup.string().optional(),
  serviceType: yup.string().required('Sélectionnez un service'),
  origin: yup.string().optional(),
  destination: yup.string().optional(),
  cargoType: yup.string().optional(),
  weight: yup.string().optional(),
  volume: yup.string().optional(),
  description: yup.string().min(10, 'Minimum 10 caractères').required('Description requise'),
})

export default function QuoteClient() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) })

  const serviceType = watch('serviceType')
  const showLogisticsFields = ['Logistique', 'Transport', 'Consignation Maritime'].includes(serviceType)

  const onSubmit = async (data) => {
    try {
      await api.post('/quotes', data)
      setSubmitted(true)
      toast.success('Demande envoyée ! Nous vous contactons sous 24–48h.')
    } catch (err) {
      toast.error(err.message || 'Erreur lors de l\'envoi.')
    }
  }

  if (submitted) {
    return (
      <div className="card p-12 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-display font-bold text-brand-blue mb-3">Demande envoyée !</h2>
        <p className="text-brand-gray-500 mb-6">
          Merci pour votre confiance. Notre équipe va analyser votre demande et vous contactera
          dans les <strong>24 à 48 heures</strong> ouvrées.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => setSubmitted(false)} className="btn-outline">
            Nouvelle demande
          </button>
          <a href="tel:+224664208080" className="btn-primary">
            Appeler maintenant
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="card p-8">
      <h2 className="text-2xl font-display font-bold text-brand-blue mb-2">Formulaire de devis</h2>
      <p className="text-brand-gray-500 text-sm mb-8">
        Les champs marqués d&apos;un <span className="text-brand-red font-bold">*</span> sont obligatoires.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {/* Personal info */}
        <div>
          <p className="text-xs font-bold text-brand-gray-400 uppercase tracking-widest mb-4">Vos informations</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Nom complet *</label>
              <input {...register('fullName')} placeholder="Votre nom complet" className={`input-field ${errors.fullName ? 'input-error' : ''}`} />
              {errors.fullName && <p className="error-text">{errors.fullName.message}</p>}
            </div>
            <div>
              <label className="label">Email *</label>
              <input {...register('email')} type="email" placeholder="votre@email.com" className={`input-field ${errors.email ? 'input-error' : ''}`} />
              {errors.email && <p className="error-text">{errors.email.message}</p>}
            </div>
            <div>
              <label className="label">Téléphone</label>
              <input {...register('phone')} placeholder="+224 6XX XX XX XX" className="input-field" />
            </div>
            <div>
              <label className="label">Entreprise / Organisation</label>
              <input {...register('company')} placeholder="Nom de votre société" className="input-field" />
            </div>
          </div>
        </div>

        {/* Service */}
        <div>
          <p className="text-xs font-bold text-brand-gray-400 uppercase tracking-widest mb-4">Détails du service</p>
          <div>
            <label className="label">Type de service *</label>
            <select {...register('serviceType')} className={`input-field ${errors.serviceType ? 'input-error' : ''}`}>
              <option value="">Sélectionnez un service...</option>
              {SERVICE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            {errors.serviceType && <p className="error-text">{errors.serviceType.message}</p>}
          </div>
        </div>

        {/* Logistics fields (conditional) */}
        {showLogisticsFields && (
          <div>
            <p className="text-xs font-bold text-brand-gray-400 uppercase tracking-widest mb-4">Informations logistiques</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Lieu d&apos;origine</label>
                <input {...register('origin')} placeholder="Ex: Port de Conakry" className="input-field" />
              </div>
              <div>
                <label className="label">Destination</label>
                <input {...register('destination')} placeholder="Ex: Kindia, Labé..." className="input-field" />
              </div>
              <div>
                <label className="label">Type de cargaison</label>
                <input {...register('cargoType')} placeholder="Ex: Conteneurs, matériaux..." className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="label">Poids (t)</label>
                  <input {...register('weight')} placeholder="Tonnes" className="input-field" />
                </div>
                <div>
                  <label className="label">Volume (m³)</label>
                  <input {...register('volume')} placeholder="Mètres cubes" className="input-field" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Description */}
        <div>
          <label className="label">Description détaillée *</label>
          <textarea
            {...register('description')}
            rows={5}
            placeholder="Décrivez votre besoin en détail : nature de la marchandise, contraintes particulières, délais souhaités..."
            className={`input-field resize-none ${errors.description ? 'input-error' : ''}`}
          />
          {errors.description && <p className="error-text">{errors.description.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <><Loader2 size={20} className="animate-spin" /> Envoi en cours...</>
          ) : (
            <><Send size={20} /> Envoyer la demande de devis</>
          )}
        </button>
      </form>
    </div>
  )
}
