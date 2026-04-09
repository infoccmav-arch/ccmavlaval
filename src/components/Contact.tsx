"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ nom: "", email: "", sujet: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useLanguage();
  const c = t.contact;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "contact", ...form }) });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch { setError(c.errorMsg); }
    finally { setLoading(false); }
  }

  const socials = [
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61585729761252" },
    { label: "Instagram", href: "https://www.instagram.com/ccmav_laval/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/centre-communautaire-multiculturel-d-auteuil-vimont-laval/" },
    { label: "YouTube", href: "https://www.youtube.com/channel/UChClYZDVt4e81N5uRTsp0jQ" },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-[#C8102E]/10 text-[#C8102E] text-sm font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">{c.badge}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a2e] mb-4">{c.title}</h2>
          <p className="text-gray-600 max-w-xl mx-auto text-base leading-relaxed">{c.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-7">
            {[
              { icon: "📍", title: c.address, lines: ["5785 Boul. des Laurentides, Local 207", "Laval, QC"], color: "#C8102E" },
              { icon: "📞", title: c.phone, lines: ["514-349-0635"], color: "#006B3C" },
              { icon: "✉️", title: c.email, lines: ["info.ccmav@gmail.com"], color: "#F4A300" },
              { icon: "🕐", title: c.hours, lines: c.hoursLines, color: "#003087" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: `${item.color}15` }}>{item.icon}</div>
                <div>
                  <h4 className="font-bold text-[#1a1a2e] text-sm mb-1">{item.title}</h4>
                  {item.lines.map((line) => <p key={line} className="text-gray-500 text-sm">{line}</p>)}
                </div>
              </div>
            ))}
            <div>
              <h4 className="font-bold text-[#1a1a2e] text-sm mb-3">{c.follow}</h4>
              <div className="flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="px-3 py-1 rounded-full bg-[#1a1a2e] text-white text-[11px] font-medium hover:bg-[#0f3460] transition-colors">{s.label}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12 gap-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">✅</div>
                <h3 className="text-xl font-bold text-[#1a1a2e]">{c.successTitle}</h3>
                <p className="text-gray-500 text-sm max-w-xs">{c.successMsg}</p>
                <button onClick={() => { setSubmitted(false); setForm({ nom: "", email: "", sujet: "", message: "" }); }} className="mt-2 text-sm text-[#C8102E] underline">{c.sendAnother}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">{c.nameLabel}</label>
                    <input type="text" name="nom" required value={form.nom} onChange={handleChange} placeholder={c.namePlaceholder} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">{c.emailLabel}</label>
                    <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="jean@exemple.ca" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">{c.subjectLabel}</label>
                  <select name="sujet" required value={form.sujet} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] transition bg-white">
                    <option value="">{c.subjectDefault}</option>
                    {c.subjects.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">{c.messageLabel}</label>
                  <textarea name="message" required rows={5} value={form.message} onChange={handleChange} placeholder={c.messagePlaceholder} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] transition resize-none" />
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-[#C8102E] text-white font-semibold text-sm hover:bg-[#a50d26] transition-colors shadow hover:shadow-md disabled:opacity-60">
                  {loading ? c.sending : c.send}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
