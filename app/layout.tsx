import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from '@next/third-parties/google'
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://tunafoto.com"),
  title: {
    default: "Tuna - Fotografía y video",
    template: "%s | Tuna - Fotografía y video",
  },
  description: "Naturales, atemporales y espontáneas, capturando la esencia de cada historia. Sesiones de familia, infantil, embarazo, recién nacido, parejas, retratos y eventos.",
  keywords: ["fotógrafa", "fotografía profesional", "sesiones de fotos", "fotografía de familia", "fotografía de embarazo", "fotografía infantil", "Argentina"],
  verification: { 
      google: "8eL7HJex6fdLJctyDnrOEjaGWZiFVGT4XfUKhnmiGXs"
    },
  openGraph: {
    siteName: "Tuna - Fotografía y video",
    locale: "es_AR",
    type: "website",
    title: "Tuna - Fotografía y video",
    description: "Naturales, atemporales y espontáneas, capturando la esencia de cada historia. Sesiones de familia, infantil, embarazo, recién nacido, parejas, retratos y eventos.",
    url: "https://tunafoto.com",
    images: [
      {
        url: "/emmaa.jpg",
        width: 1200,
        height: 630,
        alt: "Tuna - Fotografía y video",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tuna - Fotografía y video",
    description: "Naturales, atemporales y espontáneas, capturando la esencia de cada historia. Sesiones de familia, infantil, embarazo, recién nacido, parejas, retratos y eventos.",
    images: ["/emmaa.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-svh`}>
      <Navbar />
      <main className="flex-1 relative overflow-hidden bg-white">
            {children}
      </main>
     <Footer />
     <ScrollToTop />
     <Analytics />
     <SpeedInsights />
     <GoogleAnalytics gaId="G-5TGZXKLLKJ" />
     </body>
    </html>
  );
}