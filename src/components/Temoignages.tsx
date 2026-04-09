"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function Temoignages() {
  const { t } = useLanguage();
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C8102E]/5 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="text-center mb-16">
          <span className="text-[#F4A300] font-bold uppercase tracking-widest text-sm mb-4 block">{t.testimonials.badge}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a2e]">
            {t.testimonials.title} <span className="text-[#C8102E]">{t.testimonials.titleHighlight}</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.testimonials.items.map((item, i) => (
            <div key={i} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
              <div className="text-[#F4A300] text-4xl mb-6">"</div>
              <p className="text-gray-600 mb-8 italic flex-grow">{item.text}</p>
              <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
                <img src={item.avatar} alt={item.author} className="w-12 h-12 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
                <div>
                  <h4 className="font-bold text-[#1a1a2e] text-sm">{item.author}</h4>
                  <p className="text-gray-500 text-xs">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
