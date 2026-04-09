import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import Script from "next/script";
import { LanguageProvider } from "@/context/LanguageContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Centre Communautaire Multiculturel Auteuil Vimont — Laval",
  description: "Centre communautaire multiculturel au cœur d'Auteuil Vimont, Laval. Services d'intégration, activités culturelles, cours de français et bien plus.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="5d73a08d-f4ad-4ef0-ad28-0223fef67496"
        />
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
