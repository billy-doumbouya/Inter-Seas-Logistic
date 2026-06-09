import ContactClient from "@/components/sections/ContactClient";
import { Phone, Mail, MapPin, Facebook, Linkedin } from "lucide-react";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "Contact — Inter Seas Logistic",
  description:
    "Contactez Inter Seas Logistic à Conakry. Secrétariat, standard, email et adresse physique.",
};

async function getContacts() {
  try {
    const contacts = await prisma.contact.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    });
    return contacts.length > 0 ? contacts : null;
  } catch {
    return null;
  }
}

const DEFAULT_CONTACTS = {
  phones: [
    { label: "Secrétariat de direction", value: "+224 664 20 80 80" },
    { label: "Standard", value: "+224 624 30 03 31" },
  ],
  emails: [
    { label: "Email principal", value: "contact@interseaslogistic.com" },
    { label: "Email secondaire", value: "interseaslogistics@gmail.com" },
  ],
  address:
    "En ville Kaloum, en face de Pharmacie Nouvelle Coronthie, Conakry, Guinée",
  social: [
    {
      label: "Facebook",
      href: "https://facebook.com/interseaslogistic",
      Icon: Facebook,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/company/interseaslogistic",
      Icon: Linkedin,
    },
  ],
};

export default async function ContactPage() {
  const rawContacts = await getContacts();

  const contacts = rawContacts
    ? {
        phones: rawContacts
          .filter((c) => c.type === "phone")
          .map((c) => ({ label: c.label, value: c.value })),
        emails: rawContacts
          .filter((c) => c.type === "email")
          .map((c) => ({ label: c.label, value: c.value })),
        address:
          rawContacts.find((c) => c.type === "address")?.value ||
          DEFAULT_CONTACTS.address,
        social: [
          rawContacts.find((c) => c.type === "facebook") && {
            label: "Facebook",
            href: rawContacts.find((c) => c.type === "facebook").value,
            Icon: Facebook,
          },
          rawContacts.find((c) => c.type === "linkedin") && {
            label: "LinkedIn",
            href: rawContacts.find((c) => c.type === "linkedin").value,
            Icon: Linkedin,
          },
        ].filter(Boolean),
      }
    : DEFAULT_CONTACTS;

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 bg-brand-blue overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-20" />
        <div className="container-custom relative z-10 text-center">
          <div className="w-16 h-1 bg-brand-red rounded-full mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Contactez-nous
          </h1>
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
                  <h3 className="font-display font-bold text-brand-blue text-lg">
                    Téléphone
                  </h3>
                </div>
                {contacts.phones.map((p) => (
                  <div key={p.value} className="mb-2 pl-14">
                    <p className="text-brand-gray-400 text-xs">{p.label}</p>
                    <a
                      href={`tel:${p.value.replace(/\s/g, "")}`}
                      className="text-brand-gray-700 font-semibold hover:text-brand-red transition-colors"
                    >
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
                  <h3 className="font-display font-bold text-brand-blue text-lg">
                    Email
                  </h3>
                </div>
                {contacts.emails.map((e) => (
                  <div key={e.value} className="mb-2 pl-14">
                    <p className="text-brand-gray-400 text-xs">{e.label}</p>
                    <a
                      href={`mailto:${e.value}`}
                      className="text-brand-gray-700 font-semibold hover:text-brand-red transition-colors break-all"
                    >
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
                  <h3 className="font-display font-bold text-brand-blue text-lg">
                    Adresse
                  </h3>
                </div>
                <p className="text-brand-gray-600 pl-14 leading-relaxed">
                  {contacts.address}
                </p>
              </div>

              {/* Social */}
              <div>
                <h3 className="font-display font-bold text-brand-blue text-lg mb-4">
                  Réseaux sociaux
                </h3>
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

      {/* Map Section */}
      <section className="bg-slate-50 py-20">
        <div className="container-custom">
          <div className="mb-10 text-center">
            <div className="w-12 h-1 bg-brand-blue rounded-full mx-auto mb-5" />
            <h2 className="text-3xl font-bold text-slate-900">
              Notre localisation
            </h2>
            <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
              Retrouvez-nous à Kaloum, dans le quartier Coronthie, en face de la
              Pharmacie Nouvelle Coronthie.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl bg-white shadow-xl border border-slate-100">
            <div className="grid lg:grid-cols-3">
              {/* Info Card */}
              <div className="p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-blue/10">
                    <MapPin className="w-7 h-7 text-brand-blue" />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-slate-900">
                    Inter Seas Logistic
                  </h3>

                  <div className="mt-4 space-y-2 text-slate-600 text-sm leading-relaxed">
                    <p className="font-medium text-slate-800">
                      Coronthie, Kaloum
                    </p>
                    <p>Conakry, Guinée</p>
                    <p className="text-slate-400 text-xs pt-1">
                      En face de la Pharmacie Nouvelle Coronthie
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100 space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <span className="w-2 h-2 rounded-full bg-brand-blue" />
                      Lat : 9.5163° N
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <span className="w-2 h-2 rounded-full bg-brand-blue" />
                      Lng : 13.7035° O
                    </div>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=9.5163145,-13.7034756"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-blue px-5 py-3 text-white text-sm font-semibold hover:bg-brand-blue/90 active:scale-95 transition-all shadow-md shadow-brand-blue/20"
                >
                  <MapPin size={16} />
                  Ouvrir dans Google Maps
                </a>
              </div>

              {/* Map Embed — vraies coordonnées */}
              <div className="lg:col-span-2 h-[420px] lg:h-auto relative">
                <iframe
                  title="Localisation Inter Seas Logistic"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  allowFullScreen
                  className="border-0 w-full h-full"
                  src="https://maps.google.com/maps?q=9.5163145,-13.7034756&z=17&output=embed"
                />
                {/* Badge overlay */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg flex items-center gap-2 text-xs font-semibold text-slate-700 border border-slate-100">
                  <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                  Inter Seas Logistic
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
