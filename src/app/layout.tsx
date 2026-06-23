import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Marcelo Lloveras — Cirugía de cataratas",
  description: "Información pre y post quirúrgica para pacientes del Dr. Marcelo Lloveras",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
