import ContactClient from '@/components/sections/ContactClient'
import { Phone, Mail, MapPin, Facebook, Linkedin } from 'lucide-react'
import prisma from '@/lib/prisma'

export const metadata = {
  title: 'Contact — Inter Seas Logistic',
  description: 'Contactez Inter Seas Logistic à Conakry. Secrétariat, standard, email et adresse physique.',
}

async function getContacts() {
  try {
    const contacts = await prisma.contact.findMany({ where: { active: true }, orderBy: { order: 'asc' } })
    return contacts.length > 0 ? contacts : null
  } catch {
    return null
  }
}

const DEFAULT_CONTACTS = {
  phones: [
    { label: 'Secrétariat de direction', value: '+224 664 20 80 80' },
    { label: 'Standard', value: '+224 624 30 03 31' },
  ],
  emails: [
    { label: 'Email principal', value: 'contact@interseaslogistic.com' },
    { label: 'Email secondaire', value: 'interseaslogistics@gmail.com' },
  ],
  address: 'En ville Kaloum, en face de Pharmacie Nouvelle Coronthie, Conakry, Guinée',
  social: [
    { label: 'Facebook', href: 'https://facebook.com/interseaslogistic', Icon: Facebook },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/interseaslogistic', Icon: Linkedin },
  ],
}

export default async function ContactPage() {
  const rawContacts = await getContacts()

  const contacts = rawContacts
    ? {
        phones: rawContacts.filter((c) => c.type === 'phone').map((c) => ({ label: c.label, value: c.value })),
        emails: rawContacts.filter((c) => c.type === 'email').map((c) => ({ label: c.label, value: c.value })),
        address: rawContacts.find((c) => c.type === 'address')?.value || DEFAULT_CONTACTS.address,
        social: [
          rawContacts.find((c) => c.type === 'facebook') && { label: 'Facebook', href: rawContacts.find((c) => c.type === 'facebook').value, Icon: Facebook },
          rawContacts.find((c) => c.type === 'linkedin') && { label: 'LinkedIn', href: rawContacts.find((c) => c.type === 'linkedin').value, Icon: Linkedin },
        ].filter(Boolean),
      }
    : DEFAULT_CONTACTS

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 bg-brand-blue overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-20" />
        <div className="container-custom relative z-10 text-center">
          <div className="w-16 h-1 bg-brand-red rounded-full mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Contactez-nous</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Notre équipe est disponible pour répondre à toutes vos questions.
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Info panel */}
            <div className="lg:col-span-2 space-y-8">
              {/* Phones */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                    <Phone size={18} className="text-brand-blue" />
                  </div>
                  <h3 className="font-display font-bold text-brand-blue text-lg">Téléphone</h3>
                </div>
                {contacts.phones.map((p) => (
                  <div key={p.value} className="mb-2 pl-14">
                    <p className="text-brand-gray-400 text-xs">{p.label}</p>
                    <a href={`tel:${p.value.replace(/\s/g, '')}`} className="text-brand-gray-700 font-semibold hover:text-brand-red transition-colors">
                      {p.value}
                    </a>
                  </div>
                ))}
              </div>

              {/* Emails */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center">
                    <Mail size={18} className="text-brand-red" />
                  </div>
                  <h3 className="font-display font-bold text-brand-blue text-lg">Email</h3>
                </div>
                {contacts.emails.map((e) => (
                  <div key={e.value} className="mb-2 pl-14">
                    <p className="text-brand-gray-400 text-xs">{e.label}</p>
                    <a href={`mailto:${e.value}`} className="text-brand-gray-700 font-semibold hover:text-brand-red transition-colors break-all">
                      {e.value}
                    </a>
                  </div>
                ))}
              </div>

              {/* Address */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                    <MapPin size={18} className="text-brand-blue" />
                  </div>
                  <h3 className="font-display font-bold text-brand-blue text-lg">Adresse</h3>
                </div>
                <p className="text-brand-gray-600 pl-14 leading-relaxed">{contacts.address}</p>
              </div>

              {/* Social */}
              <div>
                <h3 className="font-display font-bold text-brand-blue text-lg mb-4">Réseaux sociaux</h3>
                <div className="flex gap-3">
                  {contacts.social.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-gray-200 text-brand-gray-600 hover:border-brand-blue hover:text-brand-blue transition-all text-sm font-medium"
                    >
                      <s.Icon size={16} /> {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <ContactClient />
            </div>
          </div>
        </div>
      </section>

      {/* Map embed placeholder */}
      <section className="bg-brand-gray-50 py-12">
        <div className="container-custom">
          <div className="rounded-3xl overflow-hidden shadow-brand h-72 bg-brand-gray-200 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={48} className="text-brand-blue mx-auto mb-3" />
              <p className="text-brand-gray-600 font-semibold">Kaloum, Conakry, Guinée</p>
              <p className="text-brand-gray-400 text-sm">En face de Pharmacie Nouvelle Coronthie</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
