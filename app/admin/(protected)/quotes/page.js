import AdminQuotesClient from '@/components/admin/AdminQuotesClient'
import prisma from '@/lib/prisma'

export const metadata = { title: 'Devis — Admin ISL' }

async function getQuotes() {
  try { return await prisma.quote.findMany({ orderBy: { createdAt: 'desc' } }) }
  catch { return [] }
}

export default async function AdminQuotesPage() {
  const quotes = await getQuotes()
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-brand-blue">Demandes de devis</h1>
        <p className="text-brand-gray-500 mt-1">Gérez et suivez toutes les demandes reçues.</p>
      </div>
      <AdminQuotesClient initialQuotes={quotes} />
    </div>
  )
}
