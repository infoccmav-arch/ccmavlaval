"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { label: t.nav.home, href: "#accueil" },
    { label: t.nav.about, href: "#apropos" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.activities, href: "#activites" },
    { label: t.nav.support, href: "#soutenir" },
    { label: t.nav.partners, href: "#partenaires" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link href="#accueil" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <Image src="/logo-ccma.png" alt="CCMA" width={280} height={140} className="h-20 w-auto object-contain" priority />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-[#C8102E] font-bold text-sm uppercase tracking-wide">Centre Communautaire Multiculturel</span>
              <span className="text-[#1a1a2e] font-bold text-sm uppercase tracking-wide">d'Auteuil Vimont Laval</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-gray-700 hover:text-[#C8102E] transition-colors duration-200">
                {link.label}
              </a>
            ))}
            <a href="#contact" className="ml-2 px-4 py-2 rounded-full bg-[#C8102E] text-white text-sm font-semibold hover:bg-[#a50d26] transition-colors duration-200 shadow">
              {t.nav.join}
            </a>
            <button onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className="ml-1 px-3 py-1.5 rounded-full border-2 border-[#1a1a2e] text-[#1a1a2e] text-xs font-bold hover:bg-[#1a1a2e] hover:text-white transition-colors duration-200">
              {lang === "fr" ? "EN" : "FR"}
            </button>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className="px-2.5 py-1 rounded-full border-2 border-[#1a1a2e] text-[#1a1a2e] text-xs font-bold hover:bg-[#1a1a2e] hover:text-white transition-colors">
              {lang === "fr" ? "EN" : "FR"}
            </button>
            <button className="flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col px-4 py-4 gap-3">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-base font-medium text-gray-700 hover:text-[#C8102E] py-1 transition-colors">
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-2 px-4 py-2 rounded-full bg-[#C8102E] text-white text-sm font-semibold text-center hover:bg-[#a50d26] transition-colors shadow">
              {t.nav.join}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
