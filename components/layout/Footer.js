import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import ISLLogo from "../ui/logo";

const LINKS = [
  { href: "/", fr: "Accueil", en: "Home" },
  { href: "/about", fr: "À propos", en: "About" },
  { href: "/services", fr: "Services", en: "Services" },
  { href: "/gallery", fr: "Galerie", en: "Gallery" },
  { href: "/contact", fr: "Contact", en: "Contact" },
  { href: "/quote", fr: "Demande de devis", en: "Request a Quote" },
];

const SERVICES = [
  { fr: "Logistique", en: "Logistics" },
  { fr: "Transport", en: "Transport" },
  { fr: "Consignation Maritime", en: "Maritime Consignment" },
  { fr: "Location d'équipement", en: "Equipment Rental" },
  { fr: "Génie Civil", en: "Civil Engineering" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-blue-dark text-white">
      {/* Main footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <ISLLogo variant="compact" theme="light" size="sm" />
              </div>
              <div>
                <p className="font-display font-bold text-xl">Inter Seas</p>
                <p className="text-brand-gray-400 text-xs tracking-widest uppercase">
                  Logistic
                </p>
              </div>
            </div>
            <p className="text-brand-gray-400 text-sm leading-relaxed mb-6">
              Votre partenaire de confiance en logistique, transport et
              consignation maritime en Guinée depuis 2014.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com/interseaslogistic"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-red flex items-center justify-center transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://linkedin.com/company/interseaslogistic"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-red flex items-center justify-center transition-colors"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-5">
              Liens rapides
            </h4>
            <ul className="space-y-3">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-brand-gray-400 hover:text-white text-sm transition-colors group"
                  >
                    <ArrowRight
                      size={12}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                    {link.fr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-lg mb-5">
              Nos services
            </h4>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.fr}>
                  <Link
                    href="/services"
                    className="flex items-center gap-2 text-brand-gray-400 hover:text-white text-sm transition-colors group"
                  >
                    <ArrowRight
                      size={12}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                    {s.fr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-lg mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone
                  size={16}
                  className="text-brand-red mt-0.5 flex-shrink-0"
                />
                <div>
                  <a
                    href="tel:+224664208080"
                    className="text-brand-gray-300 hover:text-white text-sm block transition-colors"
                  >
                    +224 664 20 80 80
                  </a>
                  <a
                    href="tel:+224624300331"
                    className="text-brand-gray-400 hover:text-white text-xs block transition-colors"
                  >
                    +224 624 30 03 31
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail
                  size={16}
                  className="text-brand-red mt-0.5 flex-shrink-0"
                />
                <div>
                  <a
                    href="mailto:contact@interseaslogistic.com"
                    className="text-brand-gray-300 hover:text-white text-sm block transition-colors"
                  >
                    contact@interseaslogistic.com
                  </a>
                  <a
                    href="mailto:interseaslogistics@gmail.com"
                    className="text-brand-gray-400 hover:text-white text-xs block transition-colors"
                  >
                    interseaslogistics@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="text-brand-red mt-0.5 flex-shrink-0"
                />
                <p className="text-brand-gray-400 text-sm">
                  Kaloum, face à Pharmacie Nouvelle Coronthie, Conakry, Guinée
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-brand-gray-500 text-sm">
            &copy; {year} Inter Seas Logistic. Tous droits réservés.
          </p>
          <p className="text-brand-gray-500 text-sm">Fait en Guinée 🇬🇳</p>
        </div>
      </div>
    </footer>
  );
}
