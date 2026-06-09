"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  Loader2,
  Package,
  Truck,
  Ship,
  Wrench,
  Building2,
  Eye,
  EyeOff,
} from "lucide-react";
import api from "@/lib/axios";

const ICONS = ["Package", "Truck", "Ship", "Wrench", "Building2"];
const ICON_MAP = { Package, Truck, Ship, Wrench, Building2 };

const schema = yup.object({
  titleFr: yup.string().required("Titre (FR) requis"),
  titleEn: yup.string().required("Titre (EN) requis"),
  descFr: yup
    .string()
    .min(10, "Min 10 caractères")
    .required("Description (FR) requise"),
  descEn: yup
    .string()
    .min(10, "Min 10 caractères")
    .required("Description (EN) requise"),
  icon: yup.string().required("Icône requise"),
  order: yup.number().min(0).default(0),
});

export default function AdminServicesClient({ initialServices }) {
  const [services, setServices] = useState(initialServices);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageData, setImageData] = useState({ url: "", publicId: "" });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { icon: "Package", order: 0 },
  });

  const selectedIcon = watch("icon");

  const openCreate = () => {
    setEditing(null);
    reset({ icon: "Package", order: services.length });
    setImageData({ url: "", publicId: "" });
    setShowForm(true);
  };

  const openEdit = (service) => {
    setEditing(service);
    reset({
      titleFr: service.titleFr,
      titleEn: service.titleEn,
      descFr: service.descFr,
      descEn: service.descEn,
      icon: service.icon,
      order: service.order,
    });
    setImageData({
      url: service.imageUrl || "",
      publicId: service.imagePublicId || "",
    });
    setShowForm(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "interseas/services");
      const { data } = await api.post("/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImageData({ url: data.url, publicId: data.publicId });
      toast.success("Image uploadée !");
    } catch {
      toast.error("Erreur lors de l'upload");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      imageUrl: imageData.url || null,
      imagePublicId: imageData.publicId || null,
    };
    try {
      if (editing) {
        const { data: updated } = await api.put(
          `/services/${editing.id}`,
          payload,
        );
        setServices((prev) =>
          prev.map((s) => (s.id === editing.id ? updated : s)),
        );
        toast.success("Service mis à jour !");
      } else {
        const { data: created } = await api.post("/services", payload);
        setServices((prev) => [...prev, created]);
        toast.success("Service créé !");
      }
      setShowForm(false);
      reset();
    } catch {
      toast.error("Erreur lors de la sauvegarde");
    }
  };

  const handleDelete = async (id) => {
    setDeleteTarget(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await api.delete(`/services/${deleteTarget}`);
      setServices((prev) => prev.filter((s) => s.id !== deleteTarget));
      toast.success("Service supprimé");
      setShowDeleteConfirm(false);
      setDeleteTarget(null);
    } catch {
      toast.error("Erreur suppression");
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleActive = async (service) => {
    try {
      const { data } = await api.put(`/services/${service.id}`, {
        active: !service.active,
      });
      setServices((prev) => prev.map((s) => (s.id === service.id ? data : s)));
      toast.success(data.active ? "Service activé" : "Service masqué");
    } catch {
      toast.error("Erreur");
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button onClick={openCreate} className="btn-primary">
          <Plus size={18} /> Ajouter un service
        </button>
      </div>

      {/* Services list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {services.map((service) => {
          const Icon = ICON_MAP[service.icon] || Package;
          return (
            <div
              key={service.id}
              className={`card p-5 flex gap-4 items-start ${!service.active ? "opacity-60" : ""}`}
            >
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                <Icon size={22} className="text-brand-blue" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-brand-blue truncate">
                  {service.titleFr}
                </p>
                <p className="text-brand-gray-500 text-sm mt-1 line-clamp-2">
                  {service.descFr}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => toggleActive(service)}
                  className="p-2 rounded-lg hover:bg-brand-gray-100 text-brand-gray-500 hover:text-brand-blue transition-colors"
                  title={service.active ? "Masquer" : "Afficher"}
                >
                  {service.active ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button
                  onClick={() => openEdit(service)}
                  className="p-2 rounded-lg hover:bg-brand-gray-100 text-brand-gray-500 hover:text-brand-blue transition-colors"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-2 rounded-lg hover:bg-red-50 text-brand-gray-500 hover:text-brand-red transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
        {services.length === 0 && (
          <div className="col-span-2 card p-12 text-center text-brand-gray-400">
            <Package size={40} className="mx-auto mb-3 opacity-40" />
            <p>
              Aucun service. Cliquez sur &quot;Ajouter&quot; pour commencer.
            </p>
          </div>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-brand-blue">
              Confirmer la suppression
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Voulez-vous vraiment supprimer ce service ? Cette action est
              irréversible.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
              >
                Annuler
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-brand-red-light px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-red-400"
                onClick={confirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 size={18} className="animate-spin" />
                    Suppression...
                  </span>
                ) : (
                  "Supprimer"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-gray-100">
              <h2 className="font-display font-bold text-brand-blue text-lg">
                {editing ? "Modifier le service" : "Nouveau service"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 rounded-lg hover:bg-brand-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
              {/* Titles */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Titre (FR) *</label>
                  <input
                    {...register("titleFr")}
                    placeholder="Ex: Logistique"
                    className={`input-field ${errors.titleFr ? "input-error" : ""}`}
                  />
                  {errors.titleFr && (
                    <p className="error-text">{errors.titleFr.message}</p>
                  )}
                </div>
                <div>
                  <label className="label">Titre (EN) *</label>
                  <input
                    {...register("titleEn")}
                    placeholder="Ex: Logistics"
                    className={`input-field ${errors.titleEn ? "input-error" : ""}`}
                  />
                  {errors.titleEn && (
                    <p className="error-text">{errors.titleEn.message}</p>
                  )}
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="label">Description (FR) *</label>
                <textarea
                  {...register("descFr")}
                  rows={3}
                  className={`input-field resize-none ${errors.descFr ? "input-error" : ""}`}
                />
                {errors.descFr && (
                  <p className="error-text">{errors.descFr.message}</p>
                )}
              </div>
              <div>
                <label className="label">Description (EN) *</label>
                <textarea
                  {...register("descEn")}
                  rows={3}
                  className={`input-field resize-none ${errors.descEn ? "input-error" : ""}`}
                />
                {errors.descEn && (
                  <p className="error-text">{errors.descEn.message}</p>
                )}
              </div>

              {/* Icon + Order */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Icône</label>
                  <div className="flex gap-2 flex-wrap">
                    {ICONS.map((iconName) => {
                      const Icon = ICON_MAP[iconName];
                      return (
                        <button
                          key={iconName}
                          type="button"
                          onClick={() => setValue("icon", iconName)}
                          className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all ${selectedIcon === iconName ? "border-brand-blue bg-brand-blue text-white" : "border-brand-gray-200 hover:border-brand-blue"}`}
                        >
                          <Icon size={18} />
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="label">Ordre d&apos;affichage</label>
                  <input
                    type="number"
                    {...register("order")}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Image upload */}
              <div>
                <label className="label">Image du service</label>
                {imageData.url ? (
                  <div className="relative h-40 rounded-xl overflow-hidden mb-2">
                    <Image
                      src={imageData.url}
                      alt="Service"
                      fill
                      className="object-cover"
                      sizes="400px"
                    />
                    <button
                      type="button"
                      onClick={() => setImageData({ url: "", publicId: "" })}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-brand-gray-200 rounded-xl cursor-pointer hover:border-brand-blue transition-colors">
                    {uploading ? (
                      <Loader2
                        size={24}
                        className="animate-spin text-brand-gray-400"
                      />
                    ) : (
                      <>
                        <Upload
                          size={24}
                          className="text-brand-gray-400 mb-2"
                        />
                        <span className="text-sm text-brand-gray-400">
                          Cliquez pour uploader
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                  </label>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-outline flex-1 justify-center"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || uploading}
                  className="btn-primary flex-1 justify-center disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : editing ? (
                    "Mettre à jour"
                  ) : (
                    "Créer le service"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
