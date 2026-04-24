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
              <div className="flex flex-col items-center justify-center h-full text-center py-8 gap-5">
                {/* Animated checkmark circle */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-green-50 border-4 border-green-400 flex items-center justify-center animate-[successPop_0.5s_ease-out]">
                    <svg className="w-12 h-12 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path className="animate-[checkDraw_0.6s_ease-out_0.3s_both]" d="M5 13l4 4L19 7" style={{ strokeDasharray: 30, strokeDashoffset: 0 }} />
                    </svg>
                  </div>
                  {/* Confetti dots */}
                  {["top-0 -right-2 bg-[#C8102E]", "-top-2 left-4 bg-[#F4A300]", "top-2 -left-3 bg-[#006B3C]", "-bottom-1 right-3 bg-[#003087]", "bottom-0 -left-1 bg-[#E11D78]"].map((cls, i) => (
                    <span key={i} className={`absolute w-3 h-3 rounded-full ${cls} animate-bounce`} style={{ animationDelay: `${i * 0.1}s`, animationDuration: "1s" }} />
                  ))}
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-2xl font-extrabold text-[#1a1a2e] mb-1">{c.successTitle}</h3>
                  <p className="text-gray-500 text-sm">{c.successMsg}</p>
                </div>

                {/* Info card */}
                <div className="w-full bg-gray-50 rounded-xl border border-gray-100 px-5 py-4 text-left space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-lg">👤</span>
                    <span className="font-semibold text-[#1a1a2e]">{form.nom}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-lg">✉️</span>
                    <span>{form.email}</span>
                  </div>
                  {form.sujet && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-lg">📌</span>
                      <span>{form.sujet}</span>
                    </div>
                  )}
                </div>

                {/* Response time badge */}
                <div className="flex items-center gap-2 bg-[#006B3C]/10 text-[#006B3C] text-xs font-semibold px-4 py-2 rounded-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {c.responseTime}
                </div>

                {/* Social links */}
                <div className="w-full">
                  <p className="text-xs text-gray-400 mb-2 text-center">{c.followUs}</p>
                  <div className="flex justify-center gap-2">
                    <a href="https://www.facebook.com/profile.php?id=61585729761252" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center hover:opacity-80 transition">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                    </a>
                    <a href="https://www.instagram.com/ccmav_laval/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center hover:opacity-80 transition">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => { setSubmitted(false); setForm({ nom: "", email: "", sujet: "", message: "" }); }}
                  className="text-sm text-[#C8102E] hover:underline font-medium transition"
                >
                  ← {c.sendAnother}
                </button>
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
