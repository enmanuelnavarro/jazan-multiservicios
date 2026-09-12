import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { company } from "@/data/company";
import { siteMeta } from "@/data/site";
import { localBusinessSchema } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: siteMeta.title,
    template: `%s | ${company.name}`,
  },
  description: siteMeta.description,
  applicationName: company.name,
  keywords: [
    "shutters",
    "cortinas",
    "cortinas motorizadas",
    "cortinas zebra",
    "blackout",
    "toldos",
    "mallas",
    "La Vega",
    "República Dominicana",
  ],
  authors: [{ name: company.name, url: company.url }],
  creator: company.name,
  publisher: company.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_DO",
    url: company.url,
    siteName: company.name,
    title: siteMeta.title,
    description: siteMeta.description,
    images: [
      {
        url: "/images/general/og.jpg",
        width: 1200,
        height: 630,
        alt: `${company.name} — ${company.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
    images: ["/images/general/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#16181b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-DO" className={`${inter.variable} ${display.variable}`}>
      <body className="antialiased">
        <a
          href="#inicio"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-sm focus:text-paper"
        >
          Saltar al contenido
        </a>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <script
          type="application/ld+json"
          // Datos estructurados de negocio local para buscadores.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema()),
          }}
        />
      </body>
    </html>
  );
}
