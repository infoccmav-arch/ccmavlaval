import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Identity */}
            <div>
              <div className="mb-4">
                <Image
                  src="/logo-ccma.png"
                  alt="CCMA"
                  width={140}
                  height={70}
                  className="h-16 w-auto object-contain"
                />
              </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Un espace chaleureux et inclusif pour toutes les communautés de Laval, favorisant l'intégration, l'entraide et le vivre-ensemble.
            </p>
          </div>

          {/* Quick links */}
            <div>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Navigation</h3>
              <ul className="space-y-2">
                {[
                  ["Accueil", "#accueil"],
                  ["À propos", "#apropos"],
                  ["Services", "#services"],
                  ["Activités", "#activites"],
                  ["Soutenir", "#soutenir"],
                  ["Partenaires", "#partenaires"],
                  ["Contact", "#contact"],
                ].map(([label, href]) => (

                <li key={href}>
                  <a href={href} className="text-gray-400 text-sm hover:text-[#F4A300] transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Coordonnées</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-[#F4A300] mt-0.5">📍</span>
                <span>5785 Boul. des Laurentides, Local 207, Laval, QC</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#F4A300]">📞</span>
                  <a href="tel:+15143490635" className="hover:text-[#F4A300] transition-colors">514-349-0635</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#F4A300]">✉️</span>
                  <a href="mailto:info.ccmav@gmail.com" className="hover:text-[#F4A300] transition-colors">info.ccmav@gmail.com</a>
              </li>
            </ul>
            <div className="flex gap-3 mt-5">
              {[
                { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61585729761252" },
                { label: "Instagram", href: "https://www.instagram.com/ccmav_laval/" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full border border-gray-600 text-xs text-gray-400 hover:border-[#F4A300] hover:text-[#F4A300] transition-colors"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Centre Communautaire Multiculturel Auteuil Vimont — Laval</p>
          <p>Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}
