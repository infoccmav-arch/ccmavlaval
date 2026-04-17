"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

async function redirectToCheckout(type: string, setLoading: (k: string | null) => void) {
  setLoading(type);
  try {
    const res = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type }) });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert("Erreur lors de la redirection vers le paiement.");
  } catch { alert("Erreur réseau. Veuillez réessayer."); }
  finally { setLoading(null); }
}

const planMeta = [
  {
    key: "ami",
    icon: "🌱",
    color: "#006B3C",
    bgLight: "#006B3C12",
    perks: [
      { fr: "Accès aux activités communautaires", en: "Access to community activities" },
      { fr: "Infolettre mensuelle", en: "Monthly newsletter" },
      { fr: "Reçu pour don", en: "Donation receipt" },
    ],
  },
  {
    key: "batisseur",
    icon: "🏗️",
    color: "#C8102E",
    bgLight: "#C8102E12",
    featured: true,
    perks: [
      { fr: "Tout ce qui précède", en: "Everything above" },
      { fr: "Reconnaissance sur le site web", en: "Recognition on website" },
      { fr: "Invitation aux événements spéciaux", en: "Invite to special events" },
      { fr: "Priorité aux inscriptions", en: "Priority registration" },
    ],
  },
  {
    key: "mecene",
    icon: "⭐",
    color: "#F4A300",
    bgLight: "#F4A30012",
    perks: [
      { fr: "Tout ce qui précède", en: "Everything above" },
      { fr: "Mention dans les communications", en: "Mentioned in communications" },
      { fr: "Rencontre avec l'équipe", en: "Meeting with the team" },
      { fr: "Impact majeur visible", en: "Visible major impact" },
    ],
  },
];

export default function Soutenir() {
  const [loading, setLoading] = useState<string | null>(null);
  const { t, lang } = useLanguage();
  const s = t.support;

  return (
    <section id="soutenir" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#C8102E]/4 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F4A300]/4 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-[#C8102E]/10 text-[#C8102E] text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] inline-block" />
            {s.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1a1a2e] mb-5 leading-tight">
            {s.title}
            <span className="relative inline-block ml-2">
              <span className="text-[#C8102E]">{s.titleHighlight}</span>
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                <path d="M2 6 Q50 2 100 5 Q150 8 198 3" stroke="#C8102E" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.4"/>
              </svg>
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">{s.subtitle}</p>
        </div>

        {/* Donation tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {s.plans.map((plan) => {
            const meta = planMeta.find(m => m.key === plan.key)!;
            return (
              <div
                key={plan.key}
                className={`relative rounded-3xl border-2 transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden
                  ${meta.featured
                    ? "border-[#C8102E] shadow-2xl shadow-[#C8102E]/15 bg-white scale-105"
                    : "border-gray-200 shadow-sm bg-white hover:shadow-lg hover:border-gray-300"
                  }`}
              >
                {/* Featured badge */}
                {meta.featured && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C8102E] to-[#F4A300]" />
                )}
                {meta.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#C8102E] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {lang === "fr" ? "Populaire" : "Popular"}
                    </span>
                  </div>
                )}

                <div className="p-7 flex flex-col flex-1">
                  {/* Icon + name */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: meta.bgLight }}>
                      {meta.icon}
                    </div>
                    <h3 className="font-extrabold text-[#1a1a2e] text-base leading-tight">{plan.name}</h3>
                  </div>

                  {/* Amount */}
                  <div className="mb-3">
                    <span className="text-5xl font-extrabold" style={{ color: meta.color }}>{plan.amount}</span>
                    <span className="text-gray-400 text-sm ml-2">{lang === "fr" ? "/ don" : "/ donation"}</span>
                  </div>

                  <p className="text-gray-500 text-sm mb-6">{plan.desc}</p>

                  {/* Perks */}
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {meta.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: meta.bgLight }}>
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: meta.color }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        {lang === "fr" ? perk.fr : perk.en}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => redirectToCheckout(plan.key, setLoading)}
                    disabled={loading === plan.key}
                    className={`w-full py-3.5 rounded-2xl font-extrabold text-sm transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm
                      ${meta.featured
                        ? "bg-[#C8102E] text-white hover:bg-[#a50d26] shadow-[#C8102E]/25 hover:shadow-lg"
                        : "border-2 hover:text-white"
                      }`}
                    style={meta.featured ? {} : { borderColor: meta.color, color: meta.color }}
                    onMouseEnter={e => { if (!meta.featured) (e.currentTarget as HTMLButtonElement).style.background = meta.color; }}
                    onMouseLeave={e => { if (!meta.featured) { (e.currentTarget as HTMLButtonElement).style.background = ""; } }}
                  >
                    {loading === plan.key ? (
                      <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>{s.redirecting}</>
                    ) : (
                      <>💳 {s.donateBtn}</>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secure payment note */}
        <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-2 mb-12">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          {s.secure}
        </p>

        {/* Membership CTA */}
        <div className="bg-[#1a1a2e] rounded-3xl p-8 sm:p-10 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 text-left">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">💎</span>
              <h3 className="text-2xl font-extrabold text-white">{s.memberTitle}</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">{s.memberDesc}</p>
            <div className="flex flex-wrap gap-3 mt-5">
              {[
                { fr: "Accès prioritaire aux activités", en: "Priority access to activities" },
                { fr: "Vote aux assemblées", en: "Vote at assemblies" },
                { fr: "Carte de membre officielle", en: "Official membership card" },
              ].map((b, i) => (
                <span key={i} className="flex items-center gap-1.5 text-xs text-gray-300 bg-white/8 px-3 py-1.5 rounded-full border border-white/10">
                  <span className="w-1 h-1 rounded-full bg-[#F4A300] inline-block" />
                  {lang === "fr" ? b.fr : b.en}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 flex-shrink-0">
            <div className="bg-white/10 border border-white/15 rounded-2xl px-8 py-4 text-center">
              <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">{s.memberFee}</p>
              <p className="text-4xl font-extrabold text-[#F4A300]">10$</p>
              <p className="text-gray-400 text-xs">/ {lang === "fr" ? "an" : "year"}</p>
            </div>
            <a
              href="https://www.zeffy.com/fr-CA/ticketing/devenez-membre-du-centre-communautaire-multiculturel-de-laval-ccmav"
              target="_blank" rel="noopener noreferrer"
              className="w-full bg-[#F4A300] hover:bg-[#d99000] text-[#1a1a2e] font-extrabold px-8 py-4 rounded-2xl shadow-lg shadow-[#F4A300]/20 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm whitespace-nowrap"
            >
              {s.memberCta}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
