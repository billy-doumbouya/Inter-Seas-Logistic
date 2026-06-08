import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import ServicesPreview from '@/components/sections/ServicesPreview'
import PartnersSection from '@/components/sections/PartnersSection'
import CTASection from '@/components/sections/CTASection'
import WhyUsSection from '@/components/sections/WhyUsSection'
import prisma from '@/lib/prisma'

export const metadata = {
  title: 'Accueil — Logistique & Transport Maritime en Guinée',
}

async function getServices() {
  try {
    return await prisma.service.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      take: 3,
    })
  } catch {
    return []
  }
}

export default async function HomePage() {
  const services = await getServices()

  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesPreview services={services} />
      <WhyUsSection />
      <PartnersSection />
      <CTASection />
    </>
  )
}
