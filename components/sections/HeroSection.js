'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Ship, Truck, Package } from 'lucide-react'
import { PLACEHOLDERS } from '@/placeholders'

const SLIDES = [
  {
    image: PLACEHOLDERS.hero.url,
    alt: PLACEHOLDERS.hero.alt,
    titleFr: 'Votre partenaire de confiance en',
    titleEn: 'Your trusted partner in',
    accentFr: 'logistique maritime',
    accentEn: 'maritime logistics',
  },
  {
    image: PLACEHOLDERS.heroOverlay.url,
    alt: PLACEHOLDERS.heroOverlay.alt,
    titleFr: 'Solutions complètes de',
    titleEn: 'Complete solutions for',
    accentFr: 'transport & consignation',
    accentEn: 'transport & consignment',
  },
]

const FLOATING_ICONS = [
  { Icon: Ship, label: 'Maritime', delay: 0 },
  { Icon: Truck, label: 'Transport', delay: 0.3 },
  { Icon: Package, label: 'Logistique', delay: 0.6 },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [lang] = useState('fr')

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const slide = SLIDES[current]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background images */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={s.image}
            alt={s.alt}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,45,94,0.85)_0%,rgba(10,45,94,0.6)_60%,rgba(200,16,46,0.3)_100%)]" />
      <div className="absolute inset-0 bg-noise opacity-30" />

      {/* Decorative shapes */}
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-brand-red/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-brand-blue-light/20 blur-3xl" />

      {/* Content */}
      <div className="container-custom relative z-10 pt-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-white text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse-slow" />
            Logistique · Transport · Maritime · Génie Civil
          </motion.div>

          {/* Title */}
          <motion.h1
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight mb-4"
          >
            {lang === 'fr' ? slide.titleFr : slide.titleEn}{' '}
            <span className="text-brand-red-light">{lang === 'fr' ? slide.accentFr : slide.accentEn}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl"
          >
            12 ans d&apos;expertise au service de la Guinée et de la sous-région.
            Nous assurons chaque opération avec précision, fiabilité et professionnalisme.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/quote" className="btn-primary text-base px-7 py-3.5">
              Demander un devis
              <ArrowRight size={18} />
            </Link>
            <Link href="/services" className="btn-outline-white text-base px-7 py-3.5">
              <Play size={16} />
              Nos services
            </Link>
          </motion.div>

          {/* Floating service badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-3 mt-10"
          >
            {FLOATING_ICONS.map(({ Icon, label, delay }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + delay }}
                className="flex items-center gap-2 px-4 py-2 glass rounded-full text-white text-sm"
              >
                <Icon size={14} className="text-brand-red-light" />
                {label}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? 'w-8 h-2 bg-brand-red'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 right-8 text-white/50 text-xs flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/30" />
        <span className="rotate-90 text-[10px] tracking-widest uppercase">Scroll</span>
      </motion.div>
    </section>
  )
}
