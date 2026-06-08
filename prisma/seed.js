const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // Admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@2024!', 12)
  await prisma.user.upsert({
    where: { email: 'admin@interseaslogistic.com' },
    update: {},
    create: {
      email: 'admin@interseaslogistic.com',
      password: hashedPassword,
      name: 'Administrateur',
      role: 'admin',
    },
  })

  // Default contacts
  const contacts = [
    { type: 'phone', value: '+224664208080', label: 'Secrétariat de direction', order: 1 },
    { type: 'phone', value: '+224624300331', label: 'Standard', order: 2 },
    { type: 'email', value: 'contact@interseaslogistic.com', label: 'Email principal', order: 3 },
    { type: 'email', value: 'interseaslogistics@gmail.com', label: 'Email secondaire', order: 4 },
    { type: 'address', value: 'En ville Kaloum, en face de Pharmacie Nouvelle Coronthie, Conakry, Guinée', label: 'Adresse physique', order: 5 },
    { type: 'facebook', value: 'https://facebook.com/interseaslogistic', label: 'Facebook', order: 6 },
    { type: 'linkedin', value: 'https://linkedin.com/company/interseaslogistic', label: 'LinkedIn', order: 7 },
  ]

  for (const contact of contacts) {
    await prisma.contact.upsert({
      where: { id: contact.type + '-' + contact.order },
      update: {},
      create: { id: contact.type + '-' + contact.order, ...contact, updatedAt: new Date() },
    })
  }

  // Default services
  const services = [
    {
      titleFr: 'Logistique',
      titleEn: 'Logistics',
      descFr: 'Gestion complète de vos opérations logistiques avec une expertise reconnue en Guinée et dans la sous-région. Nous assurons le dispatching, le suivi en temps réel et la livraison sécurisée de vos marchandises.',
      descEn: 'Complete management of your logistics operations with recognized expertise in Guinea and the sub-region. We ensure dispatching, real-time tracking and secure delivery of your goods.',
      icon: 'Package',
      order: 1,
    },
    {
      titleFr: 'Transport',
      titleEn: 'Transport',
      descFr: 'Notre flotte propre de véhicules assure le transport de vos marchandises en toute sécurité sur l\'ensemble du territoire guinéen. Solutions adaptées pour tous types de cargaisons.',
      descEn: 'Our own fleet of vehicles ensures the safe transport of your goods throughout Guinea. Tailored solutions for all types of cargo.',
      icon: 'Truck',
      order: 2,
    },
    {
      titleFr: 'Consignation Maritime',
      titleEn: 'Maritime Consignment',
      descFr: 'Expert en consignation maritime, nous facilitons les procédures douanières grâce à notre excellente collaboration avec la douane guinéenne et les compagnies maritimes internationales.',
      descEn: 'Expert in maritime consignment, we facilitate customs procedures thanks to our excellent collaboration with Guinean customs and international shipping companies.',
      icon: 'Ship',
      order: 3,
    },
    {
      titleFr: 'Location',
      titleEn: 'Equipment Rental',
      descFr: 'Location d\'équipements et de véhicules lourds pour vos projets industriels et de construction. Matériel disponible immédiatement, bien entretenu et opérationnel.',
      descEn: 'Rental of heavy equipment and vehicles for your industrial and construction projects. Equipment immediately available, well maintained and operational.',
      icon: 'Wrench',
      order: 4,
    },
    {
      titleFr: 'Génie Civil',
      titleEn: 'Civil Engineering',
      descFr: 'Travaux de génie civil pour les infrastructures industrielles et commerciales. Notre équipe qualifiée intervient sur des projets d\'envergure avec des standards internationaux.',
      descEn: 'Civil engineering works for industrial and commercial infrastructure. Our qualified team works on large-scale projects with international standards.',
      icon: 'Building2',
      order: 5,
    },
  ]

  for (const service of services) {
    await prisma.service.create({ data: service }).catch(() => {})
  }

  console.log('✅ Seed completed successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
