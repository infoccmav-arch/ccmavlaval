"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "next-themes";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-8 h-8" />;
  const dark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label="Changer le thème"
      className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-gray-200 hover:border-[#C8102E] transition-colors duration-200"
    >
      {dark ? (
        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
}

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
            <Link href="/cours-de-francais" className="flex items-center gap-1.5 text-sm font-semibold text-[#003087] hover:text-[#C8102E] transition-colors duration-200 border border-[#003087]/30 px-3 py-1.5 rounded-full hover:border-[#C8102E]">
              🇫🇷 {lang === "fr" ? "Cours de français" : "French Courses"}
            </Link>
            <a href="#contact" className="ml-2 px-4 py-2 rounded-full bg-[#C8102E] text-white text-sm font-semibold hover:bg-[#a50d26] transition-colors duration-200 shadow">
              {t.nav.join}
            </a>
            <button onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className="px-3 py-1.5 rounded-full border-2 border-[#1a1a2e] text-[#1a1a2e] text-xs font-bold hover:bg-[#1a1a2e] hover:text-white transition-colors duration-200">
              {lang === "fr" ? "EN" : "FR"}
            </button>
            <ThemeToggle />
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
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
            <Link href="/cours-de-francais" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-base font-semibold text-[#003087] hover:text-[#C8102E] py-1 transition-colors">
              🇫🇷 {lang === "fr" ? "Cours de français" : "French Courses"}
            </Link>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-2 px-4 py-2 rounded-full bg-[#C8102E] text-white text-sm font-semibold text-center hover:bg-[#a50d26] transition-colors shadow">
              {t.nav.join}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
