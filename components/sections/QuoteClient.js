"use client";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import {
  Send,
  Loader2,
  CheckCircle2,
  User,
  Briefcase,
  Package,
  FileText,
} from "lucide-react";
import { useState } from "react";
import Select from "react-select";
import api from "@/lib/axios";

const SERVICE_OPTIONS = [
  { value: "Logistique", label: "Logistique" },
  { value: "Transport", label: "Transport" },
  { value: "Consignation Maritime", label: "Consignation Maritime" },
  { value: "Location d'équipement", label: "Location d'équipement" },
  { value: "Génie Civil", label: "Génie Civil" },
  { value: "Autre", label: "Autre" },
];

const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "44px",
    borderRadius: "0.5rem",
    borderColor: state.isFocused ? "var(--color-brand-blue)" : "#e2e8f0",
    boxShadow: state.isFocused
      ? "0 0 0 3px color-mix(in srgb, var(--color-brand-blue) 15%, transparent)"
      : "none",
    backgroundColor: state.isDisabled ? "#f8fafc" : "#ffffff",
    transition: "border-color 0.15s, box-shadow 0.15s",
    "&:hover": {
      borderColor: "var(--color-brand-blue)",
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "0.5rem",
    boxShadow:
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    zIndex: 50,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "var(--color-brand-blue)"
      : state.isFocused
        ? "color-mix(in srgb, var(--color-brand-blue) 8%, transparent)"
        : "transparent",
    color: state.isSelected ? "#ffffff" : "#1e293b",
    fontWeight: state.isSelected ? "500" : "400",
    padding: "10px 16px",
    cursor: "pointer",
    "&:active": {
      backgroundColor:
        "color-mix(in srgb, var(--color-brand-blue) 20%, transparent)",
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: "#94a3b8",
    fontSize: "0.875rem",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#1e293b",
    fontSize: "0.875rem",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? "var(--color-brand-blue)" : "#94a3b8",
    transition: "color 0.15s, transform 0.2s",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
    paddingRight: "12px",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "2px 12px",
  }),
};

const schema = yup.object({
  fullName: yup.string().min(2).required("Nom requis"),
  email: yup.string().email("Email invalide").required("Email requis"),
  phone: yup.string().optional(),
  company: yup.string().optional(),
  serviceType: yup.string().required("Sélectionnez un service"),
  origin: yup.string().optional(),
  destination: yup.string().optional(),
  cargoType: yup.string().optional(),
  weight: yup.string().optional(),
  volume: yup.string().optional(),
  description: yup
    .string()
    .min(10, "Minimum 10 caractères")
    .required("Description requise"),
});

// ─── Section header component ────────────────────────────────────────────────
function SectionHeader({ icon: Icon, step, title }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-blue text-white shrink-0">
        <Icon size={15} strokeWidth={2.5} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold text-brand-blue/40 uppercase tracking-[0.15em]">
          {step}
        </span>
        <span className="w-px h-3 bg-brand-blue/20" />
        <span className="text-xs font-bold text-brand-blue uppercase tracking-[0.12em]">
          {title}
        </span>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-brand-blue/20 to-transparent ml-1" />
    </div>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────
function Field({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-600 tracking-wide">
        {label}
        {required && <span className="text-brand-red ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <span className="inline-block w-1 h-1 rounded-full bg-red-500 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Input classes helper ─────────────────────────────────────────────────────
const inputCls = (hasError) =>
  [
    "w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-800 bg-white",
    "placeholder:text-slate-400",
    "transition-all duration-150 outline-none",
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10",
  ].join(" ");

// ─── Main component ───────────────────────────────────────────────────────────
export default function QuoteClient() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const serviceType = watch("serviceType");
  const showLogisticsFields = [
    "Logistique",
    "Transport",
    "Consignation Maritime",
  ].includes(serviceType);

  const onSubmit = async (data) => {
    try {
      await api.post("/quotes", data);
      setSubmitted(true);
      toast.success("Demande envoyée ! Nous vous contactons sous 24–48h.");
    } catch (err) {
      toast.error(err.message || "Erreur lors de l'envoi.");
    }
  };

  // ── Success state ───────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="card p-12 text-center">
        <div className="w-20 h-20 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={38} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-display font-bold text-brand-blue mb-3">
          Demande envoyée !
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
          Merci pour votre confiance. Notre équipe analysera votre demande et
          vous contactera dans les{" "}
          <strong className="text-slate-700">24 à 48 heures</strong> ouvrées.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => setSubmitted(false)} className="btn-outline">
            Nouvelle demande
          </button>
          <a href="tel:+224664208080" className="btn-primary">
            Appeler maintenant
          </a>
        </div>
      </div>
    );
  }

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <div className="card overflow-hidden">
      {/* Header band */}
      <div className="bg-brand-blue px-8 py-6">
        <h2 className="text-xl font-display font-bold text-white leading-snug">
          Demande de devis
        </h2>
        <p className="text-blue-200 text-sm mt-1">
          Réponse garantie sous{" "}
          <span className="text-white font-semibold">24–48h ouvrées</span>
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 space-y-8"
        noValidate
      >
        {/* ── Section 1 : Contact ─────────────────────────────────────────── */}
        <section>
          <SectionHeader icon={User} step="01" title="Vos informations" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nom complet"
              required
              error={errors.fullName?.message}
            >
              <input
                {...register("fullName")}
                placeholder="Votre nom complet"
                className={inputCls(!!errors.fullName)}
              />
            </Field>
            <Field label="Adresse email" required error={errors.email?.message}>
              <input
                {...register("email")}
                type="email"
                placeholder="votre@email.com"
                className={inputCls(!!errors.email)}
              />
            </Field>
            <Field label="Téléphone">
              <input
                {...register("phone")}
                placeholder="+224 6XX XX XX XX"
                className={inputCls(false)}
              />
            </Field>
            <Field label="Entreprise / Organisation">
              <input
                {...register("company")}
                placeholder="Nom de votre société"
                className={inputCls(false)}
              />
            </Field>
          </div>
        </section>

        {/* ── Section 2 : Service ─────────────────────────────────────────── */}
        <section>
          <SectionHeader icon={Briefcase} step="02" title="Type de service" />
          <Field
            label="Service souhaité"
            required
            error={errors.serviceType?.message}
          >
            <Controller
              name="serviceType"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={SERVICE_OPTIONS}
                  styles={selectStyles}
                  placeholder="Sélectionnez un service..."
                  noOptionsMessage={() => "Aucun service trouvé"}
                  value={
                    SERVICE_OPTIONS.find((o) => o.value === field.value) || null
                  }
                  onChange={(opt) => field.onChange(opt?.value ?? "")}
                  instanceId="service-select"
                />
              )}
            />
          </Field>
        </section>

        {/* ── Section 3 : Logistics (conditional) ─────────────────────────── */}
        {showLogisticsFields && (
          <section>
            <SectionHeader
              icon={Package}
              step="03"
              title="Informations logistiques"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Lieu d'origine">
                <input
                  {...register("origin")}
                  placeholder="Ex : Port de Conakry"
                  className={inputCls(false)}
                />
              </Field>
              <Field label="Destination">
                <input
                  {...register("destination")}
                  placeholder="Ex : Kindia, Labé…"
                  className={inputCls(false)}
                />
              </Field>
              <Field label="Type de cargaison">
                <input
                  {...register("cargoType")}
                  placeholder="Ex : Conteneurs, matériaux…"
                  className={inputCls(false)}
                />
              </Field>
              {/* Poids + Volume inline */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Poids (t)">
                  <input
                    {...register("weight")}
                    placeholder="Tonnes"
                    className={inputCls(false)}
                  />
                </Field>
                <Field label="Volume (m³)">
                  <input
                    {...register("volume")}
                    placeholder="m³"
                    className={inputCls(false)}
                  />
                </Field>
              </div>
            </div>
          </section>
        )}

        {/* ── Section 4 : Description ──────────────────────────────────────── */}
        <section>
          <SectionHeader
            icon={FileText}
            step={showLogisticsFields ? "04" : "03"}
            title="Description"
          />
          <Field
            label="Décrivez votre besoin"
            required
            error={errors.description?.message}
          >
            <textarea
              {...register("description")}
              rows={5}
              placeholder="Nature de la marchandise, contraintes particulières, délais souhaités, conditions de livraison…"
              className={`${inputCls(!!errors.description)} resize-none leading-relaxed`}
            />
          </Field>
        </section>

        {/* ── Submit ───────────────────────────────────────────────────────── */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full justify-center py-3.5 text-sm font-semibold tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Envoi en cours…
              </>
            ) : (
              <>
                <Send size={18} />
                Envoyer la demande de devis
              </>
            )}
          </button>
          <p className="text-center text-[11px] text-slate-400 mt-3">
            Les champs marqués d&apos;un{" "}
            <span className="text-brand-red font-bold">*</span> sont
            obligatoires
          </p>
        </div>
      </form>
    </div>
  );
}
