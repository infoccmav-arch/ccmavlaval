"use client";

import { useState } from "react";

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
    <section id="rejoindre" className="py-20 bg-gradient-to-br from-[#C8102E] to-[#8b0a1e]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-widest">
            Rejoindre le CCMAV
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Faites partie de notre communauté
          </h2>
          <p className="text-red-100 max-w-xl mx-auto">
            Inscrivez-vous dès aujourd'hui et un membre de notre équipe vous contactera pour vous accueillir.
          </p>
        </div>

        {/* Contact rapide */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href="tel:5143490635"
            className="flex items-center gap-3 bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
          >
            <span className="text-xl">📞</span>
            <span>514-349-0635</span>
          </a>
          <span className="text-red-200 text-sm hidden sm:block">ou remplissez le formulaire ci-dessous</span>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold text-[#1a1a2e] mb-2">Merci, {form.prenom} !</h3>
              <p className="text-gray-500">Votre demande a été reçue. Nous vous contacterons très bientôt pour vous accueillir au sein du CCMAV.</p>
              <button
                onClick={() => { setSubmitted(false); setForm({ prenom: "", nom: "", email: "", telephone: "", message: "" }); }}
                className="mt-6 text-sm text-[#C8102E] font-semibold underline"
              >
                Soumettre une autre demande
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#1a1a2e] mb-1">Prénom <span className="text-[#C8102E]">*</span></label>
                <input
                  type="text"
                  name="prenom"
                  required
                  value={form.prenom}
                  onChange={handleChange}
                  placeholder="Votre prénom"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C8102E] text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1a1a2e] mb-1">Nom <span className="text-[#C8102E]">*</span></label>
                <input
                  type="text"
                  name="nom"
                  required
                  value={form.nom}
                  onChange={handleChange}
                  placeholder="Votre nom de famille"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C8102E] text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1a1a2e] mb-1">Courriel <span className="text-[#C8102E]">*</span></label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C8102E] text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1a1a2e] mb-1">Téléphone</label>
                <input
                  type="tel"
                  name="telephone"
                  value={form.telephone}
                  onChange={handleChange}
                  placeholder="514-000-0000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C8102E] text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-[#1a1a2e] mb-1">Message (optionnel)</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Partagez-nous vos intérêts, questions ou comment vous avez entendu parler de nous…"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C8102E] text-sm resize-none"
                />
              </div>
              <div className="sm:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-gray-400">
                  En soumettant ce formulaire, vous consentez à être contacté par le CCMAV.
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-[#C8102E] hover:bg-[#a50d26] text-white font-extrabold px-10 py-4 rounded-2xl shadow-lg transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {loading ? "Envoi en cours…" : "Envoyer ma demande"}
                </button>
              </div>
              {error && (
                <div className="sm:col-span-2">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Ou adhérer directement */}
        <p className="text-center text-red-200 text-sm mt-8">
          Prêt à devenir membre officiel ?{" "}
          <a
            href="https://www.zeffy.com/fr-CA/ticketing/devenez-membre-du-centre-communautaire-multiculturel-de-laval-ccmav"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-bold underline"
          >
            Adhérez maintenant pour 10$ / an →
          </a>
        </p>
      </div>
    </section>
  );
}
