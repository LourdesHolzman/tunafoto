import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impresiones Fotográficas | Tuna Fotografía",
  description:
    "Fotolibros premium, fotografías impresas, bastidores y cuadros personalizados. Impresiones de calidad profesional para conservar tus recuerdos.",
  keywords: [
    "fotolibros",
    "impresiones fotográficas",
    "cuadros personalizados",
    "bastidores",
    "fotografía impresa",
    "Tuna Fotografía",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}