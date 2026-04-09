export default function Partenaires() {
  return (
    <section id="partenaires" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#1a1a2e]/10 text-[#1a1a2e] text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-widest">
            Partenariat
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a2e] mb-6">
            Ensemble, nous sommes <span className="text-[#C8102E]">plus forts</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Le CCMAV est à la recherche de partenaires institutionnels, communautaires et privés pour développer ses services et maximiser son impact sur la communauté multiculturelle d'Auteuil Vimont.
          </p>
        </div>

        {/* Zones partenaires vides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { label: "Partenaires institutionnels", couleur: "#C8102E" },
            { label: "Partenaires communautaires", couleur: "#006B3C" },
            { label: "Entreprises & Fondations", couleur: "#F4A300" },
          ].map((cat) => (
            <div key={cat.label} className="rounded-3xl border-2 border-dashed border-gray-200 overflow-hidden">
              <div className="px-6 py-4" style={{ backgroundColor: cat.couleur }}>
                <h3 className="text-white font-bold text-lg">{cat.label}</h3>
              </div>
              <div className="p-10 flex flex-col items-center justify-center text-center bg-gray-50 min-h-[160px]">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm font-medium">Votre organisation ici</p>
                <p className="text-gray-300 text-xs mt-1">Place disponible</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA devenir partenaire */}
        <div className="bg-gradient-to-r from-[#1a1a2e] to-[#0f3460] rounded-3xl p-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-white">
          <div>
            <h3 className="text-2xl font-extrabold mb-3">Devenez le premier partenaire du CCMAV</h3>
            <p className="text-gray-300 max-w-xl">
              Nous sommes en démarrage et cherchons des partenaires engagés qui partagent nos valeurs d'inclusion et de diversité. Contactez-nous pour explorer les opportunités de collaboration.
            </p>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 bg-[#F4A300] hover:bg-[#d99000] text-[#1a1a2e] font-extrabold px-8 py-4 rounded-2xl shadow-lg transition-transform hover:-translate-y-1 whitespace-nowrap"
          >
            Nous contacter
          </a>
        </div>
      </div>
    </section>
  );
}
