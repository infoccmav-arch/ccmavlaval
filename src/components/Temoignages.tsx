"use client";
import { useLanguage } from "@/context/LanguageContext";

const reviews = [
  { name: "Immacula Boucard", stars: 5, text: "", date: "Il y a 2 jours" },
  { name: "Rodvert Cyril",    stars: 5, text: "", date: "Il y a 2 jours" },
  { name: "Lorcile Felix",    stars: 5, text: "", date: "Il y a 2 jours" },
  { name: "Payoute Obed",     stars: 5, text: "", date: "Il y a 2 jours" },
  { name: "Job Fenelon",      stars: 5, text: "", date: "Il y a 2 jours" },
  { name: "Eveque Guillauville", stars: 5, text: "", date: "Il y a 2 jours" },
  { name: "Majisteck Nnico",  stars: 5, text: "", date: "Il y a 2 jours" },
  { name: "Joseph Junior",    stars: 5, text: "C'est un bon centre…", date: "Il y a 2 jours" },
];

const COLORS = ["#C8102E","#1a1a2e","#006B3C","#F4A300","#003087","#7C3AED","#0891B2","#E11D78"];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < count ? "text-[#FBBC04]" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Temoignages() {
  const { lang } = useLanguage();
  const avg = (reviews.reduce((s, r) => s + r.stars, 0) / reviews.length).toFixed(1);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-[#F4A300]/15 text-[#F4A300] text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F4A300] inline-block" />
            {lang === "fr" ? "Avis Google" : "Google Reviews"}
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1a1a2e] mb-4">
            {lang === "fr" ? "Ce qu'ils disent " : "What they say "}
            <span className="text-[#C8102E]">{lang === "fr" ? "de nous" : "about us"}</span>
          </h2>

          {/* Global rating */}
          <div className="inline-flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 mt-4">
            <div className="text-center">
              <p className="text-5xl font-extrabold text-[#1a1a2e] leading-none">{avg}</p>
              <Stars count={5} />
              <p className="text-xs text-gray-500 mt-1">{reviews.length} {lang === "fr" ? "avis" : "reviews"}</p>
            </div>
            <div className="w-px h-14 bg-gray-200" />
            {/* Google logo */}
            <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col gap-3">
              {/* Reviewer */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }}>
                  {review.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-[#1a1a2e] text-sm truncate">{review.name}</p>
                  <p className="text-gray-400 text-xs">{review.date}</p>
                </div>
              </div>

              {/* Stars */}
              <Stars count={review.stars} />

              {/* Text */}
              {review.text ? (
                <p className="text-gray-600 text-sm italic leading-relaxed">"{review.text}"</p>
              ) : (
                <p className="text-gray-300 text-xs italic">{lang === "fr" ? "Avis sans commentaire" : "No comment"}</p>
              )}

              {/* Google logo small */}
              <div className="mt-auto pt-2 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] text-gray-400 uppercase tracking-wide">Google</span>
                <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Google */}
        <div className="text-center mt-10">
          <a
            href="https://www.google.com/search?q=centre+communautaire+multiculturel+d%27auteuil+vimont+laval"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gray-200 text-gray-600 text-sm font-semibold hover:border-[#4285F4] hover:text-[#4285F4] transition-all duration-200"
          >
            {lang === "fr" ? "Voir tous les avis sur Google" : "See all reviews on Google"}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
