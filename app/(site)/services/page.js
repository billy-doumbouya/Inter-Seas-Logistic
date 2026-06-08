import Image from 'next/image'
import Link from 'next/link'
import { Package, Truck, Ship, Wrench, Building2, ArrowRight } from 'lucide-react'
import prisma from '@/lib/prisma'
import { PLACEHOLDERS } from '@/placeholders'
import CTASection from '@/components/sections/CTASection'

export const metadata = {
  title: 'Nos Services — Inter Seas Logistic',
  description: 'Logistique, transport, consignation maritime, location et génie civil en Guinée.',
}

const ICON_MAP = { Package, Truck, Ship, Wrench, Building2 }

const FALLBACK_IMAGES = {
  Package: PLACEHOLDERS.services.logistics.url,
  Truck: PLACEHOLDERS.services.transport.url,
  Ship: PLACEHOLDERS.services.maritime.url,
  Wrench: PLACEHOLDERS.services.rental.url,
  Building2: PLACEHOLDERS.services.civil.url,
}

async function getServices() {
  try {
    return await prisma.service.findMany({ where: { active: true }, orderBy: { order: 'asc' } })
  } catch {
    return []
  }
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 bg-brand-blue overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-20" />
        <div className="container-custom relative z-10 text-center">
          <div className="w-16 h-1 bg-brand-red rounded-full mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Nos Services</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Des solutions logistiques complètes adaptées à vos besoins en Guinée et dans la sous-région.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="section bg-white">
        <div className="container-custom space-y-20">
          {services.map((service, i) => {
            const Icon = ICON_MAP[service.icon] || Package
            const imageUrl = service.imageUrl || FALLBACK_IMAGES[service.icon] || PLACEHOLDERS.services.logistics.url
            const isEven = i % 2 === 0

            return (
              <div
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image */}
                <div className={`relative h-80 rounded-3xl overflow-hidden shadow-brand-lg ${!isEven ? 'lg:order-2' : ''}`}>
                  <Image
                    src={imageUrl}
                    alt={service.titleFr}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-brand-blue/20" />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-red flex items-center justify-center shadow-red">
                      <Icon size={22} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={!isEven ? 'lg:order-1' : ''}>
                  <span className="badge-red mb-4">Service #{i + 1}</span>
                  <h2 className="text-3xl font-display font-bold text-brand-blue mb-4">{service.titleFr}</h2>
                  <p className="text-brand-gray-500 leading-relaxed mb-6">{service.descFr}</p>
                  <Link href="/quote" className="btn-primary">
                    Demander un devis <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Dispatch info box */}
      <section className="section bg-brand-gray-50">
        <div className="container-custom">
          <div className="card p-8 md:p-12 bg-gradient-to-br from-brand-blue to-brand-blue-light text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                  Dispatching Logistique & Transport
                </h3>
                <p className="text-white/80 leading-relaxed mb-6">
                  Nous proposons un service de dispatching structuré pour l&apos;acheminement de vos
                  marchandises. Chaque devis est personnalisé selon la nature de la cargaison,
                  l&apos;origine, la destination et les délais souhaités.
                </p>
                <ul className="space-y-2 text-white/80 text-sm mb-6">
                  <li className="flex items-center gap-2">✅ Transport de conteneurs</li>
                  <li className="flex items-center gap-2">✅ Livraison Rose Kondiano</li>
                  <li className="flex items-center gap-2">✅ Fret lourd et spécial</li>
                  <li className="flex items-center gap-2">✅ Groupage et consolidation</li>
                </ul>
                <Link href="/quote" className="btn-outline-white">
                  Demander un devis <ArrowRight size={16} />
                </Link>
              </div>
              <div className="hidden md:flex flex-col gap-4">
                {[
                  { label: 'Délai de réponse', value: '24–48h' },
                  { label: 'Couverture', value: 'Guinée & sous-région' },
                  { label: 'Flotte propre', value: 'Disponible immédiatement' },
                ].map((item) => (
                  <div key={item.label} className="bg-white/10 rounded-2xl p-4">
                    <p className="text-white/60 text-sm">{item.label}</p>
                    <p className="text-white font-bold text-lg">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
