"use client";

import { motion } from "framer-motion";

const PARTNERS = [
  {
    name: "Sogea Satom",
    period: "2018–2024",
    logo: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <rect width="56" height="56" rx="12" fill="#1A1A2E" />
        <rect x="8" y="24" width="40" height="5" rx="1" fill="#E63329" />
        <text
          x="28"
          y="20"
          textAnchor="middle"
          fill="white"
          fontSize="8"
          fontWeight="700"
          fontFamily="Arial, sans-serif"
          letterSpacing="0.5"
        >
          SOGEA
        </text>
        <text
          x="28"
          y="37"
          textAnchor="middle"
          fill="white"
          fontSize="7"
          fontFamily="Arial, sans-serif"
          letterSpacing="1"
        >
          SATOM
        </text>
        <rect
          x="8"
          y="40"
          width="40"
          height="2"
          rx="1"
          fill="#E63329"
          opacity="0.5"
        />
      </svg>
    ),
  },
  {
    name: "Neemba",
    period: "2023–2025",
    logo: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <rect width="56" height="56" rx="12" fill="#1C1C1C" />
        <polygon points="10,42 22,18 28,30" fill="#F0A500" />
        <polygon points="22,42 34,18 40,30" fill="#F0A500" opacity="0.7" />
        <polygon points="34,42 46,18 46,42" fill="#F0A500" opacity="0.4" />
        <text
          x="28"
          y="51"
          textAnchor="middle"
          fill="#F0A500"
          fontSize="7.5"
          fontWeight="700"
          fontFamily="Arial, sans-serif"
          letterSpacing="1.5"
        >
          NEEMBA
        </text>
      </svg>
    ),
  },
  {
    name: "Global Trading",
    period: "2025–présent",
    logo: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <rect width="56" height="56" rx="12" fill="#0A4FA8" />
        <circle
          cx="28"
          cy="27"
          r="13"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
        />
        <ellipse
          cx="28"
          cy="27"
          rx="6"
          ry="13"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
        />
        <line
          x1="15"
          y1="27"
          x2="41"
          y2="27"
          stroke="white"
          strokeWidth="1.5"
        />
        <line x1="17" y1="21" x2="39" y2="21" stroke="white" strokeWidth="1" />
        <line x1="17" y1="33" x2="39" y2="33" stroke="white" strokeWidth="1" />
        <text
          x="28"
          y="48"
          textAnchor="middle"
          fill="white"
          fontSize="5.5"
          fontWeight="700"
          fontFamily="Arial, sans-serif"
          letterSpacing="0.3"
        >
          GLOBAL TRADING
        </text>
      </svg>
    ),
  },
  {
    name: "Rose Kondiano",
    period: "Conteneurs",
    logo: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <rect width="56" height="56" rx="12" fill="#8B1A4A" />
        <circle
          cx="28"
          cy="28"
          r="18"
          stroke="#E8A0BF"
          strokeWidth="1"
          fill="none"
          strokeDasharray="3 2"
        />
        <text
          x="22"
          y="33"
          textAnchor="middle"
          fill="white"
          fontSize="15"
          fontWeight="700"
          fontFamily="Georgia, serif"
        >
          R
        </text>
        <text
          x="34"
          y="33"
          textAnchor="middle"
          fill="#E8A0BF"
          fontSize="15"
          fontWeight="700"
          fontFamily="Georgia, serif"
        >
          K
        </text>
        <text
          x="28"
          y="48"
          textAnchor="middle"
          fill="#E8A0BF"
          fontSize="5.5"
          fontFamily="Arial, sans-serif"
          letterSpacing="1"
        >
          KONDIANO
        </text>
      </svg>
    ),
  },
  {
    name: "Ritco",
    period: "Partenaire",
    logo: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <rect width="56" height="56" rx="12" fill="#0D2137" />
        <rect x="8" y="30" width="40" height="2.5" rx="1" fill="#00C4CC" />
        <text
          x="28"
          y="27"
          textAnchor="middle"
          fill="white"
          fontSize="16"
          fontWeight="700"
          fontFamily="Arial, sans-serif"
          letterSpacing="2"
        >
          RITCO
        </text>
        <text
          x="28"
          y="42"
          textAnchor="middle"
          fill="#00C4CC"
          fontSize="5.5"
          fontFamily="Arial, sans-serif"
          letterSpacing="1.2"
        >
          TRANSPORT
        </text>
      </svg>
    ),
  },
  {
    name: "Aline Global Trading",
    period: "Partenaire",
    logo: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <rect width="56" height="56" rx="12" fill="#0F3D2E" />
        <rect x="8" y="8" width="18" height="18" rx="3" fill="#1FAD7A" />
        <rect
          x="30"
          y="8"
          width="18"
          height="18"
          rx="3"
          fill="#1FAD7A"
          opacity="0.6"
        />
        <rect
          x="8"
          y="30"
          width="18"
          height="18"
          rx="3"
          fill="#1FAD7A"
          opacity="0.6"
        />
        <rect
          x="30"
          y="30"
          width="18"
          height="18"
          rx="3"
          fill="#1FAD7A"
          opacity="0.3"
        />
        <text
          x="17"
          y="22"
          textAnchor="middle"
          fill="white"
          fontSize="11"
          fontWeight="700"
          fontFamily="Arial, sans-serif"
        >
          A
        </text>
        <text
          x="39"
          y="22"
          textAnchor="middle"
          fill="white"
          fontSize="11"
          fontWeight="700"
          fontFamily="Arial, sans-serif"
        >
          G
        </text>
        <text
          x="17"
          y="44"
          textAnchor="middle"
          fill="#1FAD7A"
          fontSize="11"
          fontWeight="700"
          fontFamily="Arial, sans-serif"
        >
          T
        </text>
      </svg>
    ),
  },
];

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
            Des collaborations solides qui témoignent de notre expertise et de
            notre fiabilité.
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
              <div className="flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform w-14 h-14">
                {p.logo}
              </div>
              <p className="font-semibold text-brand-blue text-sm">{p.name}</p>
              <p className="text-brand-gray-400 text-xs mt-1">{p.period}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
