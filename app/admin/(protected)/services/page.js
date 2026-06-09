import AdminServicesClient from "@/components/admin/AdminServicesClient";
import prisma from "@/lib/prisma";

export const metadata = { title: "Services — Admin ISL" };

async function getServices() {
  try {
    return await prisma.service.findMany({ orderBy: { order: "asc" } });
  } catch {
    return [];
  }
}

export default async function AdminServicesPage() {
  const services = await getServices();
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-brand-blue">
          Gestion des services
        </h1>
        <p className="text-brand-gray-500 mt-1">
          Ajoutez, modifiez ou supprimez les services affichés sur le site.
        </p>
      </div>
      <AdminServicesClient initialServices={services} />
    </div>
  );
}
