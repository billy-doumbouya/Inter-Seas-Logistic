'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Package, Truck, Ship, Wrench, Building2 } from 'lucide-react'
import { PLACEHOLDERS } from '@/placeholders'

const ICON_MAP = {
  Package, Truck, Ship, Wrench, Building2,
}

const DEFAULT_SERVICES = [
  {
    id: '1',
    titleFr: 'Logistique',
    titleEn: 'Logistics',
    descFr: 'Gestion complète de vos opérations logistiques avec une expertise reconnue. Dispatching, suivi en temps réel et livraison sécurisée.',
    icon: 'Package',
    imageUrl: PLACEHOLDERS.services.logistics.url,
  },
  {
    id: '2',
    titleFr: 'Transport',
    titleEn: 'Transport',
    descFr: 'Notre flotte propre de véhicules assure le transport de vos marchandises sur l\'ensemble du territoire guinéen.',
    icon: 'Truck',
    imageUrl: PLACEHOLDERS.services.transport.url,
  },
  {
    id: '3',
    titleFr: 'Consignation Maritime',
    titleEn: 'Maritime Consignment',
    descFr: 'Expert en consignation maritime avec une excellente collaboration douanière et des partenariats avec les compagnies internationales.',
    icon: 'Ship',
    imageUrl: PLACEHOLDERS.services.maritime.url,
  },
]

export default function ServicesPreview({ services = [] }) {
  const displayServices = services.length > 0 ? services : DEFAULT_SERVICES

  return (
    <section className="section bg-brand-gray-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="divider mb-4" />
          <h2 className="section-title">Nos Services</h2>
          <p className="section-subtitle">
            Des solutions logistiques complètes adaptées à vos besoins en Guinée et dans la sous-région.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {displayServices.map((service, i) => {
            const Icon = ICON_MAP[service.icon] || Package
            const imageUrl = service.imageUrl || PLACEHOLDERS.services.logistics.url

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="card-hover group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={service.titleFr}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-red flex items-center justify-center">
                      <Icon size={20} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display font-bold text-xl text-brand-blue mb-3">
                    {service.titleFr}
                  </h3>
                  <p className="text-brand-gray-500 text-sm leading-relaxed mb-4">
                    {service.descFr}
                  </p>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-brand-red font-semibold text-sm hover:gap-3 transition-all"
                  >
                    En savoir plus <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* View all */}
        <div className="text-center">
          <Link href="/services" className="btn-secondary">
            Voir tous nos services <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
