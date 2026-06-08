/**
 * COMPANY.JS — Inter Seas Logistic
 * Toutes les informations statiques de l'entreprise centralisées ici.
 * Utilisé par le chatbot, les pages statiques et les métadonnées.
 */

export const COMPANY = {
  name: 'Inter Seas Logistic',
  nameShort: 'ISL',
  formerName: 'Inter 6 Logistique',
  slogan: {
    fr: 'Votre partenaire de confiance en logistique maritime',
    en: 'Your trusted partner in maritime logistics',
  },
  founded: 2014,
  experience: 12,
  website: 'interseaslogistic.com',
  location: {
    address: 'En ville Kaloum, en face de Pharmacie Nouvelle Coronthie',
    city: 'Conakry',
    country: 'Guinée',
    countryCode: 'GN',
    full: 'En ville Kaloum, en face de Pharmacie Nouvelle Coronthie, Conakry, Guinée',
  },
  contacts: {
    secretariat: '+224 664 20 80 80',
    standard: '+224 624 30 03 31',
    emailPrimary: 'contact@interseaslogistic.com',
    emailSecondary: 'interseaslogistics@gmail.com',
    facebook: 'https://facebook.com/interseaslogistic',
    linkedin: 'https://linkedin.com/company/interseaslogistic',
  },
  services: [
    { key: 'logistics', fr: 'Logistique', en: 'Logistics' },
    { key: 'transport', fr: 'Transport', en: 'Transport' },
    { key: 'maritime', fr: 'Consignation Maritime', en: 'Maritime Consignment' },
    { key: 'rental', fr: 'Location', en: 'Equipment Rental' },
    { key: 'civil', fr: 'Génie Civil', en: 'Civil Engineering' },
  ],
  partners: [
    { name: 'Sogea Satom', period: '2018–2024' },
    { name: 'Neemba', period: '2023–2025' },
    { name: 'Global Trading', period: '2025–présent' },
    { name: 'Rose Kondiano', description: 'Livraison des conteneurs' },
    { name: 'Ritco', description: 'Partenaire logistique' },
    { name: 'Aline Global Trading', description: 'Partenaire commercial' },
  ],
  strengths: {
    fr: [
      'Excellente collaboration avec la douane guinéenne',
      'Partenariats solides avec les compagnies maritimes',
      'Flotte propre disponible immédiatement',
      '12 ans d\'expérience en Guinée et dans la sous-région',
    ],
    en: [
      'Excellent collaboration with Guinean customs',
      'Strong partnerships with maritime companies',
      'Own fleet immediately available',
      '12 years of experience in Guinea and the sub-region',
    ],
  },
  stats: [
    { value: '12+', labelFr: 'Années d\'expérience', labelEn: 'Years of experience' },
    { value: '500+', labelFr: 'Projets réalisés', labelEn: 'Completed projects' },
    { value: '50+', labelFr: 'Clients actifs', labelEn: 'Active clients' },
    { value: '5', labelFr: 'Domaines d\'activité', labelEn: 'Areas of expertise' },
  ],
  ceo: {
    name: 'PDG — Inter Seas Logistic',
    messageFr: 'Depuis 2014, Inter Seas Logistic s\'est imposé comme un acteur incontournable de la logistique en Guinée. Notre engagement envers l\'excellence, notre collaboration étroite avec les autorités douanières et notre flotte propre nous permettent d\'offrir des solutions fiables et rapides à nos clients. Nous sommes fiers de notre parcours et déterminés à continuer à servir notre pays et ses partenaires économiques avec la plus grande rigueur.',
    messageEn: 'Since 2014, Inter Seas Logistic has established itself as a key player in logistics in Guinea. Our commitment to excellence, our close collaboration with customs authorities and our own fleet allow us to offer reliable and fast solutions to our clients. We are proud of our journey and determined to continue serving our country and its economic partners with the utmost rigor.',
  },
}

/**
 * Chatbot system prompt — full company context for Gemini
 */
export const CHATBOT_SYSTEM_PROMPT = `
You are ARIA, the intelligent virtual assistant of Inter Seas Logistic, a leading logistics, transport and maritime consignment company in Guinea, West Africa.

## Company Information
- Name: Inter Seas Logistic (formerly Inter 6 Logistique)
- Founded: 2014 (12 years of experience)
- Website: interseaslogistic.com
- Location: En ville Kaloum, en face de Pharmacie Nouvelle Coronthie, Conakry, Guinea

## Services Offered
1. **Logistics** — Complete logistics management, dispatching, real-time tracking, secure delivery
2. **Transport** — Own fleet of vehicles, transport throughout Guinea, all cargo types
3. **Maritime Consignment** — Expert in customs procedures, collaboration with Guinean customs and international shipping companies
4. **Equipment Rental** — Heavy equipment and vehicles for industrial and construction projects
5. **Civil Engineering** — Infrastructure works for industrial and commercial projects

## Key Strengths
- Excellent collaboration with Guinean customs authorities
- Strong partnerships with major maritime companies
- Own fleet immediately available
- 12 years of proven experience in Guinea and the sub-region

## Key Partners & Clients
- Sogea Satom (2018–2024)
- Neemba (2023–2025)
- Global Trading (2025–present)
- Rose Kondiano (container delivery)
- Ritco
- Aline Global Trading

## Contact Information
- Secretariat: +224 664 20 80 80
- Standard: +224 624 30 03 31
- Email: contact@interseaslogistic.com
- Email 2: interseaslogistics@gmail.com
- Address: En ville Kaloum, en face de Pharmacie Nouvelle Coronthie, Conakry, Guinea
- Social: Facebook, LinkedIn

## Instructions
- Always respond in the same language the user writes in (French or English)
- Be professional, warm, and helpful
- For price requests, explain that quotes are customized and direct them to the quote request form
- For urgent requests, provide the direct phone numbers
- Keep responses concise (3–5 sentences max unless detailed info is needed)
- Never invent prices or services not listed above
- Always end with a helpful follow-up offer
`

export default COMPANY
