import Image from 'next/image'
import Link from 'next/link'
import { PLACEHOLDERS } from '@/placeholders'
import { COMPANY } from '@/lib/company'
import CTASection from '@/components/sections/CTASection'
import PartnersSection from '@/components/sections/PartnersSection'

export const metadata = {
  title: 'À propos — Inter Seas Logistic',
  description: 'Découvrez l\'histoire, la mission et l\'équipe d\'Inter Seas Logistic, votre partenaire logistique de confiance en Guinée depuis 2014.',
}

const TIMELINE = [
  { year: '2014', event: 'Fondation d\'Inter 6 Logistique à Conakry, Guinée' },
  { year: '2018', event: 'Début du partenariat stratégique avec Sogea Satom' },
  { year: '2023', event: 'Collaboration avec Neemba — expansion des activités' },
  { year: '2024', event: 'Rebranding : Inter Seas Logistic — nouvelle identité' },
  { year: '2025', event: 'Partenariat avec Global Trading — présent à aujourd\'hui' },
]

const VALUES = [
  { icon: '🎯', title: 'Excellence', desc: 'Nous visons l\'excellence dans chaque opération logistique, sans compromis sur la qualité.' },
  { icon: '🤝', title: 'Confiance', desc: 'Des relations durables basées sur la transparence et l\'intégrité avec tous nos partenaires.' },
  { icon: '⚡', title: 'Réactivité', desc: 'Une disponibilité et une rapidité d\'intervention qui font la différence sur le terrain.' },
  { icon: '🌍', title: 'Impact local', desc: 'Fiers de contribuer au développement économique de la Guinée et de la sous-région.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 bg-brand-blue overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-20" />
        <div className="container-custom relative z-10">
          <div className="max-w-2xl">
            <div className="w-16 h-1 bg-brand-red rounded-full mb-6" />
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              À propos de nous
            </h1>
            <p className="text-white/70 text-lg">
              Une entreprise guinéenne au cœur de la logistique africaine depuis 2014.
            </p>
          </div>
        </div>
      </section>

      {/* History + image */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="divider mb-4" />
              <h2 className="section-title">Notre Histoire</h2>
              <p className="text-brand-gray-600 leading-relaxed mb-6">
                Fondée en <strong>2014</strong> sous le nom d&apos;Inter 6 Logistique, notre entreprise
                a su s&apos;imposer progressivement comme un acteur incontournable de la logistique
                en Guinée. Grâce à une vision claire et à des partenariats stratégiques,
                nous avons évolué pour devenir <strong>Inter Seas Logistic</strong> — un nom qui
                reflète notre expertise maritime et notre ambition régionale.
              </p>
              <p className="text-brand-gray-600 leading-relaxed">
                Au fil des années, nous avons collaboré avec des acteurs majeurs du secteur
                comme Sogea Satom, Neemba et Global Trading, renforçant notre réseau et
                notre capacité opérationnelle. Aujourd&apos;hui, notre propre flotte et notre
                collaboration étroite avec la douane guinéenne nous permettent d&apos;offrir
                des solutions logistiques complètes et fiables.
              </p>
            </div>
            <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-brand-lg">
              <Image
                src={PLACEHOLDERS.about.url}
                alt="Bureaux Inter Seas Logistic"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-brand-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="divider mx-auto mb-4" />
            <h2 className="section-title">Notre Parcours</h2>
          </div>
          <div className="max-w-2xl mx-auto">
            {TIMELINE.map((item, i) => (
              <div key={item.year} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-brand-blue flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{item.year}</span>
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div className="w-0.5 h-12 bg-brand-gray-200 mt-2" />
                  )}
                </div>
                <div className="pt-2.5">
                  <p className="text-brand-gray-700 leading-relaxed">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="card p-8 border-l-4 border-brand-blue">
              <h3 className="text-2xl font-display font-bold text-brand-blue mb-4">🎯 Notre Mission</h3>
              <p className="text-brand-gray-600 leading-relaxed">
                Fournir des solutions logistiques, de transport et de consignation maritime
                fiables, rapides et adaptées aux besoins de nos clients en Guinée et dans
                la sous-région, en nous appuyant sur notre flotte propre, notre expertise
                douanière et notre réseau de partenaires internationaux.
              </p>
            </div>
            <div className="card p-8 border-l-4 border-brand-red">
              <h3 className="text-2xl font-display font-bold text-brand-blue mb-4">🔭 Notre Vision</h3>
              <p className="text-brand-gray-600 leading-relaxed">
                Devenir le leader de la logistique intégrée en Afrique de l&apos;Ouest,
                en développant des infrastructures modernes, des partenariats solides
                et une expertise reconnue qui contribuent au développement économique
                durable de la Guinée.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="text-center mb-12">
            <div className="divider mx-auto mb-4" />
            <h2 className="section-title">Nos Valeurs</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="card-hover p-6 text-center">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h4 className="font-display font-bold text-brand-blue text-lg mb-3">{v.title}</h4>
                <p className="text-brand-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="section bg-brand-blue overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* CEO Photo */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-56 h-56 rounded-3xl overflow-hidden shadow-brand-lg border-4 border-white/20">
                  <Image
                    src={PLACEHOLDERS.ceo.url}
                    alt="PDG Inter Seas Logistic"
                    fill
                    className="object-cover"
                    sizes="224px"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-brand-red text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-red">
                  PDG
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="lg:col-span-2">
              <div className="w-16 h-1 bg-brand-red rounded-full mb-6" />
              <h2 className="text-3xl font-display font-bold text-white mb-6">Mot du PDG</h2>
              <blockquote className="text-white/80 text-lg leading-relaxed italic mb-6 border-l-4 border-brand-red pl-6">
                &ldquo;{COMPANY.ceo.messageFr}&rdquo;
              </blockquote>
              <div>
                <p className="text-white font-bold text-lg">PDG — Inter Seas Logistic</p>
                <p className="text-white/60 text-sm">Fondateur · 2014</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PartnersSection />
      <CTASection />
    </>
  )
}
