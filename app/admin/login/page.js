import LoginClient from "@/components/admin/LoginClient";

export const metadata = { title: "Connexion Admin — Inter Seas Logistic" };

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-brand-blue flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-noise opacity-20" />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mx-auto mb-4 shadow-brand-lg">
            <span className="text-brand-blue font-display font-bold text-xl">
              ISL
            </span>
          </div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">
            Administration
          </h1>
          <p className="text-white/50 text-sm">Inter Seas Logistic</p>
        </div>
        <LoginClient />
      </div>
    </div>
  );
}
