"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function Apropos() {
  const { t } = useLanguage();
  const a = t.about;
  return (
    <section id="apropos" className="py-20 bg-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-[#F4A300]/15 text-[#F4A300] text-sm font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wide">{a.badge}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
              {a.title} <span className="text-[#F4A300]">{a.titleHighlight}</span>
            </h2>
            <p className="text-gray-300 text-base leading-relaxed mb-5">{a.p1}</p>
            <p className="text-gray-300 text-base leading-relaxed mb-8">{a.p2}</p>
            <div className="flex flex-wrap gap-4 mb-8">
              {a.highlights.map(({ num, label }) => (
                <div key={label} className="bg-white/10 border border-white/15 rounded-xl px-5 py-3">
                  <p className="text-[#F4A300] font-extrabold text-lg">{num}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
            <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C8102E] text-white font-semibold text-sm hover:bg-[#a50d26] transition-colors shadow">
              {a.cta}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <img src="https://loremflickr.com/500/300/community,people?lock=10" alt="Communauté" className="w-full h-40 object-cover rounded-xl" />
              <img src="https://loremflickr.com/500/300/family,diversity?lock=11" alt="Familles" className="w-full h-40 object-cover rounded-xl" />
              <img src="https://loremflickr.com/500/300/volunteer,help?lock=12" alt="Entraide" className="w-full h-40 object-cover rounded-xl" />
              <img src="https://loremflickr.com/500/300/children,youth?lock=13" alt="Intégration" className="w-full h-40 object-cover rounded-xl" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {a.values.map((v) => (
                <div key={v.title} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-200">
                  <span className="text-3xl block mb-2">{v.icon}</span>
                  <h3 className="text-white font-bold text-sm mb-1">{v.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16">
          <h3 className="text-center text-white font-extrabold text-2xl mb-10">{a.caTitle}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {a.caMembers.map((m) => (
              <div key={m.nom} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-200">
                <div className="w-14 h-14 rounded-full bg-[#C8102E]/20 border-2 border-[#C8102E]/40 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#F4A300] text-2xl font-extrabold">{m.nom.charAt(0)}</span>
                </div>
                <p className="text-white font-bold text-base">{m.nom}</p>
                <p className="text-[#F4A300] text-xs font-semibold mt-1 uppercase tracking-wide">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-wrap justify-center gap-3">
          {["🇭🇦🇲🇦🇩🇿🇹🇳🇸🇳🇨🇮🇨🇲🇨🇩🇨🇻🇻🇳🇵🇭🇱🇧🇸🇾🇮🇶🇮🇷🇵🇰🇧🇩🇨🇳🇧🇷🇨🇴🇵🇪🇨🇦"].join("").match(/.{1,4}/g)?.map((flag, i) => (
            <span key={i} className="text-2xl">{flag}</span>
          ))}
        </div>
        <p className="text-center text-gray-500 text-sm mt-4">{a.flagsDesc}</p>
      </div>
    </section>
  );
}
