export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
      }}
    >
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-10" style={{ background: "#C8102E" }} />
        <div className="absolute top-1/2 -right-32 w-80 h-80 rounded-full opacity-10" style={{ background: "#F4A300" }} />
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full opacity-10" style={{ background: "#006B3C" }} />
      </div>

      {/* Multicoloured top band */}
      <div className="absolute top-0 left-0 right-0 h-1.5 flex">
        <div className="flex-1 bg-[#C8102E]" />
        <div className="flex-1 bg-[#F4A300]" />
        <div className="flex-1 bg-[#006B3C]" />
        <div className="flex-1 bg-[#003087]" />
        <div className="flex-1 bg-[#FF6B35]" />
        <div className="flex-1 bg-[#9B1FE8]" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-8 max-w-5xl mx-auto pt-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-8 backdrop-blur-sm">
          <span className="text-2xl">🌍</span>
          <span className="text-white text-sm font-medium">Centre multiculturel · Laval, Québec</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
          Centre Communautaire
          <br />
          <span className="bg-gradient-to-r from-[#C8102E] via-[#F4A300] to-[#006B3C] bg-clip-text text-transparent">
            Multiculturel
          </span>
          <br />
          <span className="text-white/90 text-3xl sm:text-4xl lg:text-5xl font-bold">Auteuil Vimont · Laval</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed">
          Un espace de rencontre, d'entraide et de célébration des diversités culturelles pour toute la communauté lavalloise.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#services"
            className="px-8 py-3.5 rounded-full bg-[#C8102E] text-white font-semibold text-base shadow-lg hover:bg-[#a50d26] transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
          >
            Nos services
          </a>
          <a
            href="#evenements"
            className="px-8 py-3.5 rounded-full border-2 border-white/40 text-white font-semibold text-base backdrop-blur-sm hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5"
          >
            Voir les événements
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {[
            { value: "30+", label: "Nationalités" },
            { value: "10+", label: "Activités / an" },
              { value: "50+", label: "Membres actifs" },
              { value: "2026", label: "En démarrage" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="bg-white/10 border border-white/15 rounded-2xl px-4 py-5 backdrop-blur-sm"
            >
              <p className="text-3xl font-extrabold text-[#F4A300]">{value}</p>
              <p className="text-white/70 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce opacity-60">
        <span className="text-white text-xs">Défiler</span>
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
