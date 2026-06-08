import QuoteClient from '@/components/sections/QuoteClient'

export const metadata = {
  title: 'Demande de devis — Inter Seas Logistic',
  description: 'Demandez un devis personnalisé pour vos besoins logistiques, transport ou consignation maritime.',
}

export default function QuotePage() {
  return (
    <>
      <section className="relative py-24 bg-brand-blue overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-20" />
        <div className="container-custom relative z-10 text-center">
          <div className="w-16 h-1 bg-brand-red rounded-full mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Demande de Devis</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Remplissez ce formulaire et notre équipe vous contactera sous 24–48 heures ouvrées.
          </p>
        </div>
      </section>
      <section className="section bg-brand-gray-50">
        <div className="container-custom max-w-3xl">
          <QuoteClient />
        </div>
      </section>
    </>
  )
}
