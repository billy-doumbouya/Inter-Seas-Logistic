'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { PLACEHOLDERS } from '@/placeholders'

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <Image
        src={PLACEHOLDERS.statsBg.url}
        alt="CTA background"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-brand-blue/85" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Prêt à confier vos opérations{' '}
            <span className="text-brand-red-light">logistiques</span> à des experts ?
          </h2>
          <p className="text-white/70 text-lg mb-10">
            Contactez-nous dès aujourd&apos;hui pour un devis personnalisé ou pour discuter de vos besoins spécifiques.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/quote" className="btn-primary text-base px-8 py-4">
              Demander un devis gratuit <ArrowRight size={18} />
            </Link>
            <a href="tel:+224664208080" className="btn-outline-white text-base px-8 py-4">
              <Phone size={18} />
              +224 664 20 80 80
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
