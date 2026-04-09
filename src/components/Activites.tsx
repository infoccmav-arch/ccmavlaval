"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function Activites() {
  const { t } = useLanguage();
  return (
    <section id="activites" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-[#006B3C]/10 text-[#006B3C] text-sm font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">{t.activities.badge}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a2e] mb-4">{t.activities.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">{t.activities.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {t.activities.items.map((a) => (
            <div key={a.title} className="rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-200 hover:-translate-y-1 bg-gray-50 overflow-hidden">
              <img src={a.photo} alt={a.title} className="w-full h-40 object-cover" />
              <div className="p-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3" style={{ background: `${a.color}18` }}>{a.icon}</div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: `${a.color}15`, color: a.color }}>{a.tag}</span>
                <h3 className="font-bold text-[#1a1a2e] mt-3 mb-1 text-base">{a.title}</h3>
                <p className="text-gray-500 text-sm">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div id="evenements">
          <h3 className="text-2xl font-bold text-[#1a1a2e] mb-7 flex items-center gap-2">
            <span className="inline-block w-1 h-6 bg-[#C8102E] rounded-full mr-1" />{t.activities.upcomingTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {t.activities.events.map((ev) => (
              <div key={ev.title} className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#1a1a2e] text-white flex flex-col items-center justify-center">
                  <span className="font-extrabold text-lg leading-none">{ev.date.day}</span>
                  <span className="text-xs text-gray-300">{ev.date.month}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${ev.typeColor}15`, color: ev.typeColor }}>{ev.type}</span>
                  </div>
                  <h4 className="font-bold text-[#1a1a2e] text-sm leading-snug mb-1">{ev.title}</h4>
                  <p className="text-gray-400 text-xs">{ev.location}</p>
                  <p className="text-gray-400 text-xs mt-0.5">🕐 {ev.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-[#1a1a2e] text-[#1a1a2e] font-semibold text-sm hover:bg-[#1a1a2e] hover:text-white transition-all duration-200">
              {t.activities.seeAll}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
