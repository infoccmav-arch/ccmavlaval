"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function Services() {
  const { t, lang } = useLanguage();

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8102E]/4 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#003087]/4 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-[#C8102E]/10 text-[#C8102E] text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] inline-block" />
            {t.services.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1a1a2e] mb-5 leading-tight">
            {t.services.title}
            <span className="relative inline-block ml-2">
              <span className="text-[#C8102E]">{t.services.titleHighlight}</span>
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 6 Q50 2 100 5 Q150 8 198 3" stroke="#C8102E" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.4"/>
              </svg>
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">{t.services.subtitle}</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.items.map((service, i) => (
            <div
              key={service.title}
              className="group relative bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Hover background fill */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 rounded-2xl"
                style={{ backgroundColor: service.color }}
              />

              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{ backgroundColor: service.color }}
              />

              {/* Number badge */}
              <span
                className="absolute top-5 right-5 text-xs font-bold opacity-15 group-hover:opacity-30 transition-opacity"
                style={{ color: service.color }}
              >
                0{i + 1}
              </span>

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${service.color}15` }}
              >
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="font-bold text-lg text-[#1a1a2e] mb-3 leading-snug">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>

              {/* Bottom CTA link */}
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0" style={{ color: service.color }}>
                <span>{t.services.cta}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 bg-[#1a1a2e] rounded-2xl px-8 py-8">
          {[
            { num: "7", label: lang === "fr" ? "Services offerts" : "Services offered", icon: "🎯" },
            { num: "30+", label: lang === "fr" ? "Nationalités" : "Nationalities", icon: "🌍" },
            { num: "50+", label: lang === "fr" ? "Bénévoles" : "Volunteers", icon: "🤝" },
            { num: "100%", label: lang === "fr" ? "Engagement communautaire" : "Community commitment", icon: "❤️" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-3xl font-extrabold text-white mb-1">{stat.num}</div>
              <div className="text-gray-400 text-xs font-medium uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C8102E] text-white font-semibold text-sm hover:bg-[#a50d24] transition-all duration-200 shadow-lg shadow-[#C8102E]/25 hover:shadow-xl hover:shadow-[#C8102E]/30 hover:-translate-y-0.5"
          >
            {lang === "fr" ? "Nous contacter" : "Contact us"}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
