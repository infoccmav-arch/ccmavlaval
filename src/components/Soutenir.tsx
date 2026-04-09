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

export default function Soutenir() {
  const [loading, setLoading] = useState<string | null>(null);
  const { t } = useLanguage();
  const s = t.support;
  return (
    <section id="soutenir" className="py-20 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block bg-[#C8102E]/10 text-[#C8102E] text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-widest">{s.badge}</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a2e] mb-6">{s.title} <span className="text-[#C8102E]">{s.titleHighlight}</span></h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-16">{s.subtitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {s.plans.map((plan) => (
            <div key={plan.key} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-[#1a1a2e] mb-4">{plan.name}</h3>
              <p className="text-4xl font-extrabold text-[#C8102E] mb-4">{plan.amount}</p>
              <p className="text-gray-500 text-sm mb-8">{plan.desc}</p>
              <button onClick={() => redirectToCheckout(plan.key, setLoading)} disabled={loading === plan.key}
                className="w-full py-3 rounded-xl border-2 border-[#C8102E] text-[#C8102E] font-bold hover:bg-[#C8102E] hover:text-white transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading === plan.key ? (<><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>{s.redirecting}</>) : (<>💳 {s.donateBtn}</>)}
              </button>
            </div>
          ))}
        </div>
        <div className="bg-[#1a1a2e] text-white p-10 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="text-left max-w-xl">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><span className="text-[#F4A300]">💎</span> {s.memberTitle}</h3>
            <p className="text-gray-400">{s.memberDesc}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="bg-white/10 px-8 py-4 rounded-2xl text-center border border-white/10">
              <p className="text-sm text-gray-400 uppercase font-bold tracking-wider mb-1">{s.memberFee}</p>
              <p className="text-3xl font-extrabold text-[#F4A300]">10$ / an</p>
            </div>
            <a href="https://www.zeffy.com/fr-CA/ticketing/devenez-membre-du-centre-communautaire-multiculturel-de-laval-ccmav" target="_blank" rel="noopener noreferrer"
              className="bg-[#F4A300] hover:bg-[#d99000] text-[#1a1a2e] font-extrabold px-8 py-5 rounded-2xl shadow-lg transition-transform hover:-translate-y-1 flex items-center justify-center gap-2">
              {s.memberCta}
            </a>
          </div>
        </div>
        <p className="mt-8 text-xs text-gray-400 flex items-center justify-center gap-2">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
          {s.secure}
        </p>
      </div>
    </section>
  );
}
