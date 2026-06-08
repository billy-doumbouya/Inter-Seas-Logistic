"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Image,
  Phone,
  FileText,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";

const NAV = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Tableau de bord" },
  { href: "/admin/services", icon: Package, label: "Services" },
  { href: "/admin/gallery", icon: Image, label: "Galerie" },
  { href: "/admin/contacts", icon: Phone, label: "Contacts" },
  { href: "/admin/quotes", icon: FileText, label: "Devis" },
];

export default function AdminSidebar({ user }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="text-brand-blue font-bold text-sm">ISL</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm">Inter Seas</p>
            <p className="text-white/40 text-xs">Dashboard Admin</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {NAV.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
            className={`admin-sidebar-link ${pathname === href || pathname.startsWith(href + "/") ? "active" : ""}`}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-4 py-4 border-t border-white/10 space-y-2">
        <Link href="/" target="_blank" className="admin-sidebar-link text-sm">
          <ExternalLink size={16} /> Voir le site
        </Link>
        <div className="px-4 py-3 rounded-xl bg-white/10">
          <p className="text-white text-sm font-semibold truncate">
            {user?.name}
          </p>
          <p className="text-white/50 text-xs truncate">{user?.email}</p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="admin-sidebar-link w-full text-brand-red-light hover:text-white"
        >
          <LogOut size={16} /> Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 bottom-0 w-64 bg-brand-blue z-30">
        <SidebarContent />
      </aside>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-brand-blue text-white rounded-xl flex items-center justify-center shadow-brand"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-brand-blue z-40 flex flex-col">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
}
