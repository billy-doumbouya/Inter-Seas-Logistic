import AdminContactsClient from '@/components/admin/AdminContactsClient'
import prisma from '@/lib/prisma'

export const metadata = { title: 'Contacts — Admin ISL' }

async function getContacts() {
  try { return await prisma.contact.findMany({ orderBy: { order: 'asc' } }) }
  catch { return [] }
}

export default async function AdminContactsPage() {
  const contacts = await getContacts()
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-brand-blue">Gestion des contacts</h1>
        <p className="text-brand-gray-500 mt-1">Modifiez les coordonnées affichées sur le site.</p>
      </div>
      <AdminContactsClient initialContacts={contacts} />
    </div>
  )
}
