import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Inter Seas Logistic — Logistique & Transport Maritime en Guinée",
    template: "%s | Inter Seas Logistic",
  },
  description:
    "Inter Seas Logistic, votre partenaire de confiance en logistique, transport et consignation maritime en Guinée depuis 2014. Flotte propre, expertise douanière, solutions complètes.",
  keywords: [
    "logistique Guinée",
    "transport maritime Conakry",
    "consignation maritime",
    "Inter Seas Logistic",
    "transport conteneurs Guinée",
    "génie civil Conakry",
  ],
  authors: [{ name: "Inter Seas Logistic" }],
  openGraph: {
    title: "Inter Seas Logistic",
    description: "Logistique, Transport & Consignation Maritime en Guinée",
    url: "https://interseaslogistic.com",
    siteName: "Inter Seas Logistic",
    locale: "fr_GN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-body bg-white text-brand-black antialiased">
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            style: {
              fontFamily: "var(--font-body)",
            },
          }}
        />
      </body>
    </html>
  );
}
