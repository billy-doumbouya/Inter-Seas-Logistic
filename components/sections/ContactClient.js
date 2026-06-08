"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";
import api from "@/lib/axios";

const schema = yup.object({
  name: yup.string().min(2, "Minimum 2 caractères").required("Nom requis"),
  email: yup.string().email("Email invalide").required("Email requis"),
  phone: yup.string().optional(),
  subject: yup.string().min(3, "Minimum 3 caractères").required("Sujet requis"),
  message: yup
    .string()
    .min(10, "Minimum 10 caractères")
    .required("Message requis"),
});

export default function ContactClient() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await api.post("/contacts/message", data);
      toast.success(
        "Message envoyé avec succès ! Nous vous répondrons sous 24h.",
      );
      reset();
    } catch (err) {
      toast.error(err.message || "Erreur lors de l'envoi. Réessayez.");
    }
  };

  return (
    <div className="card p-8">
      <h2 className="text-2xl font-display font-bold text-brand-blue mb-2">
        Envoyez-nous un message
      </h2>
      <p className="text-brand-gray-500 text-sm mb-8">
        Réponse garantie sous 24–48 heures ouvrées.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="label">Nom complet *</label>
            <input
              {...register("name")}
              placeholder="Votre nom"
              className={`input-field ${errors.name ? "input-error" : ""}`}
            />
            {errors.name && <p className="error-text">{errors.name.message}</p>}
          </div>
          <div>
            <label className="label">Email *</label>
            <input
              {...register("email")}
              type="email"
              placeholder="votre@email.com"
              className={`input-field ${errors.email ? "input-error" : ""}`}
            />
            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="label">Téléphone</label>
            <input
              {...register("phone")}
              placeholder="+224 6XX XX XX XX"
              className="input-field"
            />
          </div>
          <div>
            <label className="label">Sujet *</label>
            <input
              {...register("subject")}
              placeholder="Objet de votre message"
              className={`input-field ${errors.subject ? "input-error" : ""}`}
            />
            {errors.subject && (
              <p className="error-text">{errors.subject.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="label">Message *</label>
          <textarea
            {...register("message")}
            rows={6}
            placeholder="Décrivez votre demande en détail..."
            className={`input-field resize-none ${errors.message ? "input-error" : ""}`}
          />
          {errors.message && (
            <p className="error-text">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Envoi en cours...
            </>
          ) : (
            <>
              <Send size={18} /> Envoyer le message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
