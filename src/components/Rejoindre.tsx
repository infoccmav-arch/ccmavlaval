"use client";

import { useState } from "react";

const avantages = [
  { icon: "🎯", title: "Accès à tous nos services", desc: "Cours de français, aide à l'emploi, soutien familial et plus." },
  { icon: "🌍", title: "Réseau multiculturel", desc: "Connectez-vous avec des membres de 30+ nationalités à Laval." },
  { icon: "🎉", title: "Événements exclusifs", desc: "Invitations prioritaires aux activités culturelles et sportives." },
  { icon: "🤝", title: "Soutien personnalisé", desc: "Un accompagnement adapté à votre situation et vos besoins." },
];

export default function Rejoindre() {
  const [form, setForm] = useState({ prenom: "", nom: "", email: "", telephone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "rejoindre", ...form }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer ou nous contacter au 514-349-0635.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rejoindre" className="py-24 bg-white relative overflow-hidden">
      {/* Background decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#C8102E]/5" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#1a1a2e]/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#F4A300]/3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-[#C8102E]/10 text-[#C8102E] text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] inline-block" />
            Rejoindre le CCMAV
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1a1a2e] mb-5 leading-tight">
            Faites partie de{" "}
            <span className="relative inline-block">
              <span className="text-[#C8102E]">notre communauté</span>
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 8" fill="none">
                <path d="M2 6 Q75 2 150 5 Q225 8 298 3" stroke="#C8102E" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.4"/>
              </svg>
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            Inscrivez-vous dès aujourd'hui et un membre de notre équipe vous contactera pour vous accueillir chaleureusement.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left — Benefits */}
          <div>
            <h3 className="text-xl font-extrabold text-[#1a1a2e] mb-8">
              Pourquoi nous rejoindre ?
            </h3>
            <div className="space-y-5">
              {avantages.map((a, i) => (
                <div key={a.title} className="flex items-start gap-4 group">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-2xl bg-[#C8102E]/8 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200">
                      {a.icon}
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#1a1a2e] text-white text-[10px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a1a2e] text-sm mb-1">{a.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Membership CTA */}
            <div className="mt-10 bg-[#1a1a2e] rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🏅</span>
                <div>
                  <p className="font-extrabold text-base">Devenez membre officiel</p>
                  <p className="text-gray-400 text-xs">Cotisation annuelle — seulement 10$ / an</p>
                </div>
              </div>
              <a
                href="https://www.zeffy.com/fr-CA/ticketing/devenez-membre-du-centre-communautaire-multiculturel-de-laval-ccmav"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 w-full justify-center mt-2 bg-[#F4A300] hover:bg-[#d99000] text-[#1a1a2e] font-extrabold text-sm px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-[#F4A300]/20"
              >
                Adhérer maintenant — 10$ / an
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            {/* Phone quick contact */}
            <a
              href="tel:5143490635"
              className="mt-4 flex items-center gap-3 border border-gray-200 hover:border-[#C8102E] text-gray-600 hover:text-[#C8102E] font-semibold px-5 py-3.5 rounded-2xl transition-all duration-200 group"
            >
              <span className="w-9 h-9 rounded-xl bg-[#C8102E]/8 group-hover:bg-[#C8102E]/15 flex items-center justify-center text-lg transition-colors">📞</span>
              <div>
                <p className="text-xs text-gray-400 font-normal">Appelez-nous directement</p>
                <p className="font-bold text-sm">514-349-0635</p>
              </div>
            </a>
          </div>

          {/* Right — Form */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Form header */}
            <div className="bg-gradient-to-r from-[#C8102E] to-[#8b0a1e] px-8 py-6">
              <h3 className="text-white font-extrabold text-lg">Formulaire d'inscription</h3>
              <p className="text-red-200 text-sm mt-1">Remplissez ce formulaire et nous vous recontacterons sous 48h.</p>
            </div>

            <div className="px-8 py-8">
              {submitted ? (
                <div className="text-center py-10 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#1a1a2e] mb-1">Merci, {form.prenom} !</h3>
                    <p className="text-gray-500 text-sm max-w-xs">Votre demande a été reçue. Nous vous contacterons très bientôt pour vous accueillir au sein du CCMAV.</p>
                  </div>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ prenom: "", nom: "", email: "", telephone: "", message: "" }); }}
                    className="mt-2 text-sm text-[#C8102E] font-semibold underline"
                  >
                    Soumettre une autre demande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Prénom <span className="text-[#C8102E]">*</span></label>
                      <input
                        type="text" name="prenom" required value={form.prenom} onChange={handleChange}
                        placeholder="Votre prénom"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Nom <span className="text-[#C8102E]">*</span></label>
                      <input
                        type="text" name="nom" required value={form.nom} onChange={handleChange}
                        placeholder="Votre nom de famille"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Courriel <span className="text-[#C8102E]">*</span></label>
                    <input
                      type="email" name="email" required value={form.email} onChange={handleChange}
                      placeholder="votre@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Téléphone <span className="text-gray-400 font-normal">(optionnel)</span></label>
                    <input
                      type="tel" name="telephone" value={form.telephone} onChange={handleChange}
                      placeholder="514-000-0000"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Message <span className="text-gray-400 font-normal">(optionnel)</span></label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange} rows={3}
                      placeholder="Partagez vos intérêts, questions ou comment vous avez entendu parler de nous…"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] transition resize-none"
                    />
                  </div>

                  {error && <p className="text-red-600 text-sm">{error}</p>}

                  <button
                    type="submit" disabled={loading}
                    className="w-full bg-[#C8102E] hover:bg-[#a50d26] text-white font-extrabold py-4 rounded-2xl shadow-lg shadow-[#C8102E]/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 text-sm"
                  >
                    {loading ? "Envoi en cours…" : "Envoyer ma demande →"}
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    En soumettant ce formulaire, vous consentez à être contacté par le CCMAV.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
