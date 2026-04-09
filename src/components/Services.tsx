"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function Services() {
  const { t } = useLanguage();
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-[#C8102E]/10 text-[#C8102E] text-sm font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">{t.services.badge}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a2e] mb-4">{t.services.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">{t.services.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {t.services.items.map((service) => (
            <div key={service.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5" style={{ background: `${service.color}18` }}>{service.icon}</div>
              <h3 className="font-bold text-lg text-[#1a1a2e] mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              <div className="mt-5 h-0.5 w-10 rounded-full" style={{ background: service.color }} />
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#1a1a2e] text-white font-semibold text-sm hover:bg-[#0f3460] transition-colors shadow">
            {t.services.cta}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
