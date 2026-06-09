"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Lock, Mail } from "lucide-react";

const schema = yup.object({
  email: yup.string().email("Email invalide").required("Email requis"),
  password: yup
    .string()
    .min(6, "Minimum 6 caractères")
    .required("Mot de passe requis"),
});

export default function LoginClient() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Email ou mot de passe incorrect.");
    } else {
      toast.success("Connexion réussie !");
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="card p-8">
      <h2 className="text-xl font-display font-bold text-brand-blue mb-6 text-center">
        Connexion
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div>
          <label className="label">Email</label>
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-400"
            />
            <input
              {...register("email")}
              type="email"
              placeholder="admin@interseaslogistic.com"
              className={`input-field pl-10 ${errors.email ? "input-error" : ""}`}
            />
          </div>
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>

        <div>
          <label className="label">Mot de passe</label>
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-400"
            />
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className={`input-field pl-10 ${errors.password ? "input-error" : ""}`}
            />
          </div>
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Connexion...
            </>
          ) : (
            <>Se connecter</>
          )}
        </button>
      </form>
    </div>
  );
}
