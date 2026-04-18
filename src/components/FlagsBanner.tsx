"use client";

const flags = [
  { code: "ht", name: "Haïti" },
  { code: "ma", name: "Maroc" },
  { code: "dz", name: "Algérie" },
  { code: "tn", name: "Tunisie" },
  { code: "sn", name: "Sénégal" },
  { code: "ci", name: "Côte d'Ivoire" },
  { code: "cm", name: "Cameroun" },
  { code: "cd", name: "Congo RD" },
  { code: "cv", name: "Cap-Vert" },
  { code: "bj", name: "Bénin" },
  { code: "vn", name: "Vietnam" },
  { code: "ph", name: "Philippines" },
  { code: "lb", name: "Liban" },
  { code: "sy", name: "Syrie" },
  { code: "pk", name: "Pakistan" },
  { code: "bd", name: "Bangladesh" },
  { code: "cn", name: "Chine" },
  { code: "br", name: "Brésil" },
  { code: "co", name: "Colombie" },
  { code: "pe", name: "Pérou" },
  { code: "mx", name: "Mexique" },
  { code: "gh", name: "Ghana" },
  { code: "ng", name: "Nigeria" },
  { code: "et", name: "Éthiopie" },
  { code: "in", name: "Inde" },
  { code: "ro", name: "Roumanie" },
  { code: "ua", name: "Ukraine" },
  { code: "pl", name: "Pologne" },
  { code: "pt", name: "Portugal" },
  { code: "ca", name: "Canada" },
];

export default function FlagsBanner() {
  const doubled = [...flags, ...flags];

  return (
    <div className="bg-[#1a1a2e] py-5 overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#1a1a2e] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#1a1a2e] to-transparent z-10 pointer-events-none" />

      <div
        className="flex gap-10 animate-marquee whitespace-nowrap"
        style={{ width: "max-content" }}
      >
        {doubled.map((flag, i) => (
          <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0">
            <img
              src={`https://flagcdn.com/w40/${flag.code}.png`}
              srcSet={`https://flagcdn.com/w80/${flag.code}.png 2x`}
              alt={flag.name}
              width={40}
              height={27}
              className="rounded-sm shadow-md object-cover"
              style={{ width: 40, height: 27 }}
            />
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
          animation: marquee 45s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
