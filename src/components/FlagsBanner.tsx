"use client";

const flags = [
  { emoji: "🇭🇹", name: "Haïti" },
  { emoji: "🇲🇦", name: "Maroc" },
  { emoji: "🇩🇿", name: "Algérie" },
  { emoji: "🇹🇳", name: "Tunisie" },
  { emoji: "🇸🇳", name: "Sénégal" },
  { emoji: "🇨🇮", name: "Côte d'Ivoire" },
  { emoji: "🇨🇲", name: "Cameroun" },
  { emoji: "🇨🇩", name: "Congo RD" },
  { emoji: "🇨🇻", name: "Cap-Vert" },
  { emoji: "🇧🇯", name: "Bénin" },
  { emoji: "🇻🇳", name: "Vietnam" },
  { emoji: "🇵🇭", name: "Philippines" },
  { emoji: "🇱🇧", name: "Liban" },
  { emoji: "🇸🇾", name: "Syrie" },
  { emoji: "🇵🇰", name: "Pakistan" },
  { emoji: "🇧🇩", name: "Bangladesh" },
  { emoji: "🇨🇳", name: "Chine" },
  { emoji: "🇧🇷", name: "Brésil" },
  { emoji: "🇨🇴", name: "Colombie" },
  { emoji: "🇵🇪", name: "Pérou" },
  { emoji: "🇲🇽", name: "Mexique" },
  { emoji: "🇬🇭", name: "Ghana" },
  { emoji: "🇳🇬", name: "Nigeria" },
  { emoji: "🇪🇹", name: "Éthiopie" },
  { emoji: "🇮🇳", name: "Inde" },
  { emoji: "🇷🇴", name: "Roumanie" },
  { emoji: "🇺🇦", name: "Ukraine" },
  { emoji: "🇵🇱", name: "Pologne" },
  { emoji: "🇵🇹", name: "Portugal" },
  { emoji: "🇨🇦", name: "Canada" },
];

export default function FlagsBanner() {
  // Duplicate for seamless loop
  const doubled = [...flags, ...flags];

  return (
    <div className="bg-[#1a1a2e] py-4 overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#1a1a2e] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#1a1a2e] to-transparent z-10 pointer-events-none" />

      <div
        className="flex gap-8 animate-marquee whitespace-nowrap"
        style={{ width: "max-content" }}
      >
        {doubled.map((flag, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0">
            <span className="text-3xl leading-none">{flag.emoji}</span>
            <span className="text-gray-400 text-[10px] font-medium uppercase tracking-wide">{flag.name}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
