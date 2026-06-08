"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Phone } from "lucide-react";

const NAV_LINKS = [
  { href: "/", labelFr: "Accueil", labelEn: "Home" },
  { href: "/about", labelFr: "À propos", labelEn: "About" },
  { href: "/services", labelFr: "Services", labelEn: "Services" },
  { href: "/gallery", labelFr: "Galerie", labelEn: "Gallery" },
  { href: "/contact", labelFr: "Contact", labelEn: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState("fr");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("isl-lang");
    if (saved) setLang(saved);
  }, []);

  const toggleLang = () => {
    const next = lang === "fr" ? "en" : "fr";
    setLang(next);
    localStorage.setItem("isl-lang", next);
  };

  const label = (item) => (lang === "fr" ? item.labelFr : item.labelEn);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-brand-blue shadow-brand-lg py-3" : "bg-transparent py-4"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-brand-blue font-display font-bold text-sm">
                ISL
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-display font-bold text-lg leading-tight">
                Inter Seas
              </p>
              <p className="text-brand-gray-300 text-xs font-medium tracking-widest uppercase">
                Logistic
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? "bg-brand-red text-white"
                    : "text-brand-gray-200 hover:text-white hover:bg-white/10"
                }`}
              >
                {label(link)}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Lang toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white border border-white/20 hover:bg-white/10 transition-all"
            >
              <Globe size={14} />
              {lang.toUpperCase()}
            </button>

            {/* Phone */}
            <a
              href="tel:+224664208080"
              className="hidden md:flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors"
            >
              <Phone size={14} />
              <span className="hidden xl:inline">+224 664 20 80 80</span>
            </a>

            {/* CTA */}
            <Link
              href="/quote"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-brand-red text-white text-sm font-semibold rounded-lg hover:bg-brand-red-dark transition-all active:scale-95"
            >
              {lang === "fr" ? "Devis" : "Quote"}
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-brand-blue-dark border-t border-white/10 overflow-hidden"
          >
            <div className="container-custom py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(link.href)
                      ? "bg-brand-red text-white"
                      : "text-brand-gray-200 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {label(link)}
                </Link>
              ))}
              <Link
                href="/quote"
                onClick={() => setIsOpen(false)}
                className="mt-2 btn-primary justify-center"
              >
                {lang === "fr" ? "Demander un devis" : "Request a Quote"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
