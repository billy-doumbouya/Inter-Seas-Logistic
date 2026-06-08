'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle2, Shield, Zap, Users } from 'lucide-react'
import { PLACEHOLDERS } from '@/placeholders'

const STRENGTHS = [
  {
    icon: Shield,
    titleFr: 'Collaboration douanière',
    descFr: 'Excellente collaboration avec la douane guinéenne pour des procédures fluides et rapides.',
  },
  {
    icon: Zap,
    titleFr: 'Flotte propre',
    descFr: 'Disponibilité immédiate de notre propre flotte de véhicules et équipements.',
  },
  {
    icon: Users,
    titleFr: 'Partenariats maritimes',
    descFr: 'Partenariats solides avec les grandes compagnies maritimes internationales.',
  },
  {
    icon: CheckCircle2,
    titleFr: '12 ans d\'expérience',
    descFr: 'Une décennie d\'expertise reconnue en Guinée et dans toute la sous-région.',
  },
]

export default function WhyUsSection() {
  return (
    <section className="section bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-brand-lg">
              <Image
                src={PLACEHOLDERS.statsBg.url}
                alt="Inter Seas Logistic opérations"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-brand-blue/30" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-brand-lg p-5 max-w-[200px]">
              <p className="text-3xl font-display font-bold text-brand-blue">12+</p>
              <p className="text-brand-gray-500 text-sm">Années d&apos;expérience</p>
              <div className="mt-2 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-1 rounded-full bg-brand-red" />
                ))}
              </div>
            </div>

            {/* Red accent */}
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl bg-brand-red/20" />
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="divider mb-4" />
            <h2 className="section-title mb-4">Pourquoi choisir Inter Seas Logistic ?</h2>
            <p className="text-brand-gray-500 mb-8 leading-relaxed">
              Fondée en 2014 sous le nom d&apos;Inter 6 Logistique, notre entreprise s&apos;est imposée
              comme un acteur incontournable de la logistique en Guinée grâce à notre expertise,
              notre réseau et notre engagement envers l&apos;excellence.
            </p>

            <div className="space-y-5">
              {STRENGTHS.map((s, i) => (
                <motion.div
                  key={s.titleFr}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                    <s.icon size={20} className="text-brand-red" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-blue mb-1">{s.titleFr}</h4>
                    <p className="text-brand-gray-500 text-sm leading-relaxed">{s.descFr}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
