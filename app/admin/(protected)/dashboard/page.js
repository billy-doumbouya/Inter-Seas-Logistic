import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  Package,
  Image,
  FileText,
  Phone,
  ArrowRight,
  Clock,
} from "lucide-react";

export const metadata = { title: "Tableau de bord — Admin ISL" };

async function getStats() {
  try {
    const [services, gallery, quotes, pendingQuotes] = await Promise.all([
      prisma.service.count(),
      prisma.galleryImage.count(),
      prisma.quote.count(),
      prisma.quote.count({ where: { status: "pending" } }),
    ]);
    const recentQuotes = await prisma.quote.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
    return { services, gallery, quotes, pendingQuotes, recentQuotes };
  } catch {
    return {
      services: 0,
      gallery: 0,
      quotes: 0,
      pendingQuotes: 0,
      recentQuotes: [],
    };
  }
}

const STATUS_LABELS = {
  pending: { label: "En attente", cls: "badge-yellow" },
  processing: { label: "En cours", cls: "badge-blue" },
  completed: { label: "Traité", cls: "badge-green" },
  cancelled: { label: "Annulé", cls: "bg-red-100 text-red-700 badge" },
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const stats = await getStats();

  const CARDS = [
    {
      label: "Services actifs",
      value: stats.services,
      icon: Package,
      href: "/admin/services",
      color: "bg-brand-blue",
    },
    {
      label: "Photos galerie",
      value: stats.gallery,
      icon: Image,
      href: "/admin/gallery",
      color: "bg-brand-red",
    },
    {
      label: "Total devis",
      value: stats.quotes,
      icon: FileText,
      href: "/admin/quotes",
      color: "bg-emerald-600",
    },
    {
      label: "Devis en attente",
      value: stats.pendingQuotes,
      icon: Clock,
      href: "/admin/quotes",
      color: "bg-amber-500",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-brand-blue">
          Bonjour, {session?.user?.name} 👋
        </h1>
        <p className="text-brand-gray-500 mt-1">
          Voici un aperçu de votre site Inter Seas Logistic.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {CARDS.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="card p-5 hover:shadow-brand-lg transition-shadow group"
          >
            <div
              className={`w-11 h-11 rounded-xl ${card.color} flex items-center justify-center mb-3`}
            >
              <card.icon size={20} className="text-white" />
            </div>
            <p className="text-2xl font-display font-bold text-brand-blue">
              {card.value}
            </p>
            <p className="text-brand-gray-500 text-sm mt-1">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          {
            href: "/admin/services",
            label: "Gérer les services",
            icon: Package,
          },
          { href: "/admin/gallery", label: "Gérer la galerie", icon: Image },
          {
            href: "/admin/contacts",
            label: "Modifier les contacts",
            icon: Phone,
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-between p-4 card hover:shadow-brand-lg transition-shadow group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                <item.icon size={18} className="text-brand-blue" />
              </div>
              <span className="font-medium text-brand-gray-700">
                {item.label}
              </span>
            </div>
            <ArrowRight
              size={16}
              className="text-brand-gray-400 group-hover:text-brand-blue group-hover:translate-x-1 transition-all"
            />
          </Link>
        ))}
      </div>

      {/* Recent quotes */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-brand-gray-100 flex items-center justify-between">
          <h2 className="font-display font-bold text-brand-blue">
            Demandes de devis récentes
          </h2>
          <Link
            href="/admin/quotes"
            className="text-brand-red text-sm font-semibold hover:underline flex items-center gap-1"
          >
            Voir tout <ArrowRight size={14} />
          </Link>
        </div>
        <div className="divide-y divide-brand-gray-50">
          {stats.recentQuotes.length === 0 ? (
            <p className="text-brand-gray-400 text-sm p-6 text-center">
              Aucune demande de devis pour l&apos;instant.
            </p>
          ) : (
            stats.recentQuotes.map((q) => {
              const s = STATUS_LABELS[q.status] || STATUS_LABELS.pending;
              return (
                <div
                  key={q.id}
                  className="px-6 py-4 flex flex-wrap items-center justify-between gap-3"
                >
                  <div>
                    <p className="font-semibold text-brand-gray-800">
                      {q.fullName}
                    </p>
                    <p className="text-brand-gray-500 text-sm">
                      {q.serviceType} · {q.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={s.cls}>{s.label}</span>
                    <span className="text-brand-gray-400 text-xs">
                      {new Date(q.createdAt).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
