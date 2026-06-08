'use client'

import { motion } from 'framer-motion'

const PARTNERS = [
  { name: 'Sogea Satom', period: '2018–2024', initials: 'SS' },
  { name: 'Neemba', period: '2023–2025', initials: 'NB' },
  { name: 'Global Trading', period: '2025–présent', initials: 'GT' },
  { name: 'Rose Kondiano', period: 'Conteneurs', initials: 'RK' },
  { name: 'Ritco', period: 'Partenaire', initials: 'RT' },
  { name: 'Aline Global Trading', period: 'Partenaire', initials: 'AG' },
]

export default function PartnersSection() {
  return (
    <section className="section bg-brand-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="divider mx-auto mb-4" />
          <h2 className="section-title">Nos Partenaires & Clients</h2>
          <p className="section-subtitle mx-auto">
            Des collaborations solides qui témoignent de notre expertise et de notre fiabilité.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {PARTNERS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card p-5 text-center hover:shadow-brand-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[linear-gradient(135deg,#0A2D5E_0%,#1B4F8A_50%,#C8102E_100%)] flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform">
                <span className="text-white font-display font-bold text-lg">{p.initials}</span>
              </div>
              <p className="font-semibold text-brand-blue text-sm">{p.name}</p>
              <p className="text-brand-gray-400 text-xs mt-1">{p.period}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
