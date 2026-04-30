"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

/* ──────────────────────────────────────────────────────
   TYPES
────────────────────────────────────────────────────── */
interface CVData {
  prenom: string; nom: string; titre: string; email: string;
  telephone: string; ville: string; linkedin: string; profil: string;
  experiences: { poste: string; entreprise: string; lieu: string; debut: string; fin: string; taches: string }[];
  formations: { diplome: string; etablissement: string; annee: string; mention: string }[];
  competences: string; langues: { langue: string; niveau: string }[]; loisirs: string;
}

const emptyCV: CVData = {
  prenom: "", nom: "", titre: "", email: "", telephone: "", ville: "", linkedin: "", profil: "",
  experiences: [{ poste: "", entreprise: "", lieu: "", debut: "", fin: "", taches: "" }],
  formations: [{ diplome: "", etablissement: "", annee: "", mention: "" }],
  competences: "", langues: [{ langue: "", niveau: "" }], loisirs: "",
};

/* ──────────────────────────────────────────────────────
   CV PREVIEW (printable)
────────────────────────────────────────────────────── */
function CVPreview({ cv }: { cv: CVData }) {
  const hasExp = cv.experiences.some(e => e.poste || e.entreprise);
  const hasFmt = cv.formations.some(f => f.diplome || f.etablissement);
  const hasLang = cv.langues.some(l => l.langue);
  return (
    <div className="bg-white text-[#1a1a2e] font-sans text-sm leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
      {/* Header */}
      <div className="bg-[#003087] text-white px-8 py-6">
        <h1 className="text-2xl font-bold tracking-wide">{cv.prenom || "Prénom"} {cv.nom || "Nom"}</h1>
        {cv.titre && <p className="text-blue-200 text-sm mt-1 font-medium">{cv.titre}</p>}
        <div className="flex flex-wrap gap-4 mt-3 text-xs text-blue-100">
          {cv.email && <span>✉ {cv.email}</span>}
          {cv.telephone && <span>📞 {cv.telephone}</span>}
          {cv.ville && <span>📍 {cv.ville}</span>}
          {cv.linkedin && <span>🔗 {cv.linkedin}</span>}
        </div>
      </div>

      <div className="px-8 py-6 space-y-5">
        {/* Profil */}
        {cv.profil && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#C8102E] border-b border-[#C8102E]/30 pb-1 mb-2">Profil professionnel</h2>
            <p className="text-gray-700 text-xs leading-relaxed">{cv.profil}</p>
          </div>
        )}

        {/* Expériences */}
        {hasExp && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#C8102E] border-b border-[#C8102E]/30 pb-1 mb-3">Expériences professionnelles</h2>
            {cv.experiences.filter(e => e.poste || e.entreprise).map((exp, i) => (
              <div key={i} className="mb-3 pl-3 border-l-2 border-[#003087]/20">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-[#1a1a2e] text-xs">{exp.poste}</p>
                    <p className="text-[#003087] text-xs font-medium">{exp.entreprise}{exp.lieu ? ` — ${exp.lieu}` : ""}</p>
                  </div>
                  {(exp.debut || exp.fin) && <p className="text-gray-400 text-xs whitespace-nowrap ml-2">{exp.debut}{exp.fin ? ` – ${exp.fin}` : ""}</p>}
                </div>
                {exp.taches && <p className="text-gray-600 text-xs mt-1 leading-relaxed">{exp.taches}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Formation */}
        {hasFmt && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#C8102E] border-b border-[#C8102E]/30 pb-1 mb-3">Formation</h2>
            {cv.formations.filter(f => f.diplome || f.etablissement).map((fm, i) => (
              <div key={i} className="mb-2 flex justify-between items-start">
                <div>
                  <p className="font-bold text-xs text-[#1a1a2e]">{fm.diplome}</p>
                  <p className="text-[#003087] text-xs">{fm.etablissement}{fm.mention ? ` — ${fm.mention}` : ""}</p>
                </div>
                {fm.annee && <p className="text-gray-400 text-xs ml-2">{fm.annee}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Compétences + Langues */}
        <div className="grid grid-cols-2 gap-4">
          {cv.competences && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#C8102E] border-b border-[#C8102E]/30 pb-1 mb-2">Compétences</h2>
              <div className="flex flex-wrap gap-1">
                {cv.competences.split(",").map(c => c.trim()).filter(Boolean).map((comp, i) => (
                  <span key={i} className="bg-[#003087]/10 text-[#003087] text-[10px] px-2 py-0.5 rounded-full font-medium">{comp}</span>
                ))}
              </div>
            </div>
          )}
          {hasLang && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#C8102E] border-b border-[#C8102E]/30 pb-1 mb-2">Langues</h2>
              {cv.langues.filter(l => l.langue).map((l, i) => (
                <div key={i} className="flex justify-between text-xs mb-0.5">
                  <span className="font-medium text-[#1a1a2e]">{l.langue}</span>
                  <span className="text-gray-400">{l.niveau}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Loisirs */}
        {cv.loisirs && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#C8102E] border-b border-[#C8102E]/30 pb-1 mb-2">Centres d'intérêt</h2>
            <p className="text-gray-600 text-xs">{cv.loisirs}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   CV BUILDER
────────────────────────────────────────────────────── */
function CVBuilder() {
  const [cv, setCV] = useState<CVData>(emptyCV);
  const [step, setStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const steps = ["Infos", "Expériences", "Formation", "Compétences", "Aperçu"];

  function setField(field: keyof CVData, value: string) {
    setCV(prev => ({ ...prev, [field]: value }));
  }

  function setExp(i: number, field: keyof CVData["experiences"][0], value: string) {
    const exps = [...cv.experiences];
    exps[i] = { ...exps[i], [field]: value };
    setCV(prev => ({ ...prev, experiences: exps }));
  }

  function setFmt(i: number, field: keyof CVData["formations"][0], value: string) {
    const fmts = [...cv.formations];
    fmts[i] = { ...fmts[i], [field]: value };
    setCV(prev => ({ ...prev, formations: fmts }));
  }

  function setLang(i: number, field: keyof CVData["langues"][0], value: string) {
    const langs = [...cv.langues];
    langs[i] = { ...langs[i], [field]: value };
    setCV(prev => ({ ...prev, langues: langs }));
  }

  function printCV() {
    const el = printRef.current;
    if (!el) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`<html><head><title>CV — ${cv.prenom} ${cv.nom}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Georgia, serif; font-size: 11px; color: #1a1a2e; }
        @page { margin: 1cm; size: A4; }
      </style></head><body>${el.innerHTML}</body></html>`);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 400);
  }

  const inputCls = "w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30 focus:border-[#003087] transition bg-white";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Step indicators */}
      <div className="flex border-b border-gray-100">
        {steps.map((s, i) => (
          <button key={s} onClick={() => setStep(i)}
            className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 ${step === i ? "border-[#003087] text-[#003087] bg-[#003087]/5" : "border-transparent text-gray-400 hover:text-gray-600"}`}>
            <span className={`inline-flex w-5 h-5 rounded-full text-[10px] items-center justify-center mr-1 ${step === i ? "bg-[#003087] text-white" : "bg-gray-100 text-gray-400"}`}>{i + 1}</span>
            <span className="hidden sm:inline">{s}</span>
          </button>
        ))}
      </div>

      <div className="p-5">
        {/* STEP 0 — Infos perso */}
        {step === 0 && (
          <div className="space-y-4">
            <h3 className="font-bold text-[#1a1a2e] text-sm mb-3">👤 Informations personnelles</h3>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Prénom *</label><input className={inputCls} value={cv.prenom} onChange={e => setField("prenom", e.target.value)} placeholder="Marie" /></div>
              <div><label className={labelCls}>Nom *</label><input className={inputCls} value={cv.nom} onChange={e => setField("nom", e.target.value)} placeholder="Dupont" /></div>
            </div>
            <div><label className={labelCls}>Titre / Poste recherché</label><input className={inputCls} value={cv.titre} onChange={e => setField("titre", e.target.value)} placeholder="Comptable / Caissière / Éducatrice…" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Courriel</label><input className={inputCls} type="email" value={cv.email} onChange={e => setField("email", e.target.value)} placeholder="marie@email.com" /></div>
              <div><label className={labelCls}>Téléphone</label><input className={inputCls} value={cv.telephone} onChange={e => setField("telephone", e.target.value)} placeholder="514-000-0000" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Ville</label><input className={inputCls} value={cv.ville} onChange={e => setField("ville", e.target.value)} placeholder="Laval, QC" /></div>
              <div><label className={labelCls}>LinkedIn (optionnel)</label><input className={inputCls} value={cv.linkedin} onChange={e => setField("linkedin", e.target.value)} placeholder="linkedin.com/in/…" /></div>
            </div>
            <div>
              <label className={labelCls}>Profil professionnel <span className="text-gray-400 font-normal">(2-3 phrases)</span></label>
              <textarea className={inputCls} rows={3} value={cv.profil} onChange={e => setField("profil", e.target.value)} placeholder="Professionnelle dynamique avec 5 ans d'expérience en service à la clientèle, reconnue pour son sens de l'organisation et sa capacité à travailler en équipe…" />
            </div>
          </div>
        )}

        {/* STEP 1 — Expériences */}
        {step === 1 && (
          <div className="space-y-5">
            <h3 className="font-bold text-[#1a1a2e] text-sm">💼 Expériences professionnelles</h3>
            {cv.experiences.map((exp, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-3 bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#003087]">Expérience {i + 1}</span>
                  {cv.experiences.length > 1 && (
                    <button onClick={() => setCV(p => ({ ...p, experiences: p.experiences.filter((_, j) => j !== i) }))}
                      className="text-xs text-red-400 hover:text-red-600">Supprimer</button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className={labelCls}>Poste occupé</label><input className={inputCls} value={exp.poste} onChange={e => setExp(i, "poste", e.target.value)} placeholder="Caissier / Commis…" /></div>
                  <div><label className={labelCls}>Entreprise</label><input className={inputCls} value={exp.entreprise} onChange={e => setExp(i, "entreprise", e.target.value)} placeholder="IGA, Metro, H&M…" /></div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div><label className={labelCls}>Ville</label><input className={inputCls} value={exp.lieu} onChange={e => setExp(i, "lieu", e.target.value)} placeholder="Laval" /></div>
                  <div><label className={labelCls}>Date début</label><input className={inputCls} value={exp.debut} onChange={e => setExp(i, "debut", e.target.value)} placeholder="Jan. 2022" /></div>
                  <div><label className={labelCls}>Date fin</label><input className={inputCls} value={exp.fin} onChange={e => setExp(i, "fin", e.target.value)} placeholder="Présent" /></div>
                </div>
                <div>
                  <label className={labelCls}>Tâches & réalisations</label>
                  <textarea className={inputCls} rows={2} value={exp.taches} onChange={e => setExp(i, "taches", e.target.value)} placeholder="• Service à la clientèle en français et anglais • Gestion de caisse • Formation de nouveaux employés…" />
                </div>
              </div>
            ))}
            <button onClick={() => setCV(p => ({ ...p, experiences: [...p.experiences, { poste: "", entreprise: "", lieu: "", debut: "", fin: "", taches: "" }] }))}
              className="text-xs font-bold text-[#003087] border border-[#003087]/30 px-3 py-2 rounded-lg hover:bg-[#003087]/5 transition">
              + Ajouter une expérience
            </button>
          </div>
        )}

        {/* STEP 2 — Formation */}
        {step === 2 && (
          <div className="space-y-5">
            <h3 className="font-bold text-[#1a1a2e] text-sm">🎓 Formation</h3>
            {cv.formations.map((fm, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-3 bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#003087]">Formation {i + 1}</span>
                  {cv.formations.length > 1 && (
                    <button onClick={() => setCV(p => ({ ...p, formations: p.formations.filter((_, j) => j !== i) }))}
                      className="text-xs text-red-400 hover:text-red-600">Supprimer</button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className={labelCls}>Diplôme / Certification</label><input className={inputCls} value={fm.diplome} onChange={e => setFmt(i, "diplome", e.target.value)} placeholder="DEC en comptabilité…" /></div>
                  <div><label className={labelCls}>Établissement</label><input className={inputCls} value={fm.etablissement} onChange={e => setFmt(i, "etablissement", e.target.value)} placeholder="Cégep Montmorency…" /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className={labelCls}>Année</label><input className={inputCls} value={fm.annee} onChange={e => setFmt(i, "annee", e.target.value)} placeholder="2020" /></div>
                  <div><label className={labelCls}>Mention (optionnel)</label><input className={inputCls} value={fm.mention} onChange={e => setFmt(i, "mention", e.target.value)} placeholder="Avec distinction" /></div>
                </div>
              </div>
            ))}
            <button onClick={() => setCV(p => ({ ...p, formations: [...p.formations, { diplome: "", etablissement: "", annee: "", mention: "" }] }))}
              className="text-xs font-bold text-[#003087] border border-[#003087]/30 px-3 py-2 rounded-lg hover:bg-[#003087]/5 transition">
              + Ajouter une formation
            </button>
          </div>
        )}

        {/* STEP 3 — Compétences */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-bold text-[#1a1a2e] text-sm">⚡ Compétences & Langues</h3>
            <div>
              <label className={labelCls}>Compétences <span className="text-gray-400 font-normal">(séparées par des virgules)</span></label>
              <textarea className={inputCls} rows={3} value={cv.competences} onChange={e => setField("competences", e.target.value)} placeholder="Microsoft Office, Service client, Travail d'équipe, Caisse enregistreuse, Bilingue…" />
              {cv.competences && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {cv.competences.split(",").map(c => c.trim()).filter(Boolean).map((comp, i) => (
                    <span key={i} className="bg-[#003087]/10 text-[#003087] text-xs px-2 py-0.5 rounded-full">{comp}</span>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className={labelCls}>Langues</label>
              {cv.langues.map((l, i) => (
                <div key={i} className="flex gap-2 mb-2 items-center">
                  <input className={inputCls} value={l.langue} onChange={e => setLang(i, "langue", e.target.value)} placeholder="Français" />
                  <select className={inputCls} value={l.niveau} onChange={e => setLang(i, "niveau", e.target.value)}>
                    <option value="">Niveau</option>
                    <option>Langue maternelle</option>
                    <option>Courant (C1-C2)</option>
                    <option>Avancé (B2)</option>
                    <option>Intermédiaire (B1)</option>
                    <option>Débutant (A1-A2)</option>
                    <option>Notions</option>
                  </select>
                  {cv.langues.length > 1 && <button onClick={() => setCV(p => ({ ...p, langues: p.langues.filter((_, j) => j !== i) }))} className="text-red-400 hover:text-red-600 text-xs">✕</button>}
                </div>
              ))}
              <button onClick={() => setCV(p => ({ ...p, langues: [...p.langues, { langue: "", niveau: "" }] }))}
                className="text-xs font-bold text-[#003087] border border-[#003087]/30 px-3 py-1.5 rounded-lg hover:bg-[#003087]/5 transition">
                + Langue
              </button>
            </div>
            <div>
              <label className={labelCls}>Centres d'intérêt (optionnel)</label>
              <input className={inputCls} value={cv.loisirs} onChange={e => setField("loisirs", e.target.value)} placeholder="Bénévolat, lecture, sport d'équipe, cuisine internationale…" />
            </div>
          </div>
        )}

        {/* STEP 4 — Aperçu */}
        {step === 4 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#1a1a2e] text-sm">📄 Aperçu de votre CV</h3>
              <button onClick={printCV}
                className="flex items-center gap-1.5 bg-[#C8102E] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#a50d26] transition shadow">
                🖨️ Imprimer / Télécharger
              </button>
            </div>
            <div ref={printRef} className="border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <CVPreview cv={cv} />
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">Cliquez sur "Imprimer" pour sauvegarder en PDF via votre navigateur (Enregistrer en PDF)</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
          <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
            className="px-4 py-2 text-sm font-semibold text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-30">
            ← Précédent
          </button>
          <button onClick={() => setStep(s => Math.min(4, s + 1))} disabled={step === 4}
            className="px-5 py-2 text-sm font-bold bg-[#003087] text-white rounded-lg hover:bg-[#002060] transition disabled:opacity-30">
            Suivant →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   INTERVIEW PREP
────────────────────────────────────────────────────── */
const interviewQuestions = [
  {
    q: "Parlez-moi de vous.",
    conseil: "Préparez un résumé de 2 minutes : votre parcours, vos compétences clés et pourquoi vous postulez. Restez professionnel.",
    exemple: "Je m'appelle [prénom], j'ai [X] ans d'expérience en [domaine]. Dans mon dernier poste chez [entreprise], j'ai [réalisation]. Je cherche maintenant à [objectif].",
    icon: "👤"
  },
  {
    q: "Quelles sont vos forces et vos faiblesses ?",
    conseil: "Citez 2-3 forces avec des exemples concrets. Pour les faiblesses, choisissez quelque chose que vous travaillez à améliorer.",
    exemple: "Mes forces : rigueur et sens de l'organisation. Ma faiblesse : je voulais tout parfaire — j'apprends à déléguer davantage.",
    icon: "💪"
  },
  {
    q: "Pourquoi voulez-vous travailler ici ?",
    conseil: "Renseignez-vous sur l'entreprise avant. Montrez que vous connaissez leurs valeurs et que le poste correspond à vos objectifs.",
    exemple: "Votre réputation pour l'accueil de la diversité m'a attiré. Le poste correspond exactement à mon expérience en [domaine] et je veux contribuer à [mission].",
    icon: "🏢"
  },
  {
    q: "Décrivez une situation difficile au travail et comment vous l'avez résolue.",
    conseil: "Utilisez la méthode STAR : Situation, Tâche, Action, Résultat. Choisissez un exemple positif.",
    exemple: "Situation : client mécontent. Tâche : résoudre le problème. Action : écouté, proposé solution. Résultat : client reparti satisfait et fidélisé.",
    icon: "🔧"
  },
  {
    q: "Où vous voyez-vous dans 5 ans ?",
    conseil: "Montrez ambition et loyauté. Mentionnez évoluer dans l'entreprise ou votre domaine, pas changer d'employeur.",
    exemple: "Je me vois avoir maîtrisé ce poste, pris de nouvelles responsabilités et peut-être encadrer de nouveaux collègues au sein de votre équipe.",
    icon: "🎯"
  },
  {
    q: "Quelles sont vos attentes salariales ?",
    conseil: "Renseignez-vous sur les salaires du secteur au Québec. Donnez une fourchette et mentionnez que c'est négociable.",
    exemple: "Selon mes recherches et mon expérience, j'envisage entre [X]$ et [Y]$ par heure/an. Je suis ouvert(e) à en discuter selon les avantages offerts.",
    icon: "💰"
  },
  {
    q: "Avez-vous des questions pour nous ?",
    conseil: "Toujours préparer 2-3 questions ! Cela montre votre intérêt. Ne demandez pas le salaire en premier.",
    exemple: "Quelles sont les possibilités d'avancement ? Comment décririez-vous la culture d'entreprise ? Quels défis attend le prochain titulaire du poste ?",
    icon: "❓"
  },
];

const tipsAvant = [
  { icon: "🔍", title: "Recherchez l'entreprise", desc: "Site web, médias sociaux, nouvelles récentes. Connaître leur mission et valeurs." },
  { icon: "👔", title: "Préparez votre tenue", desc: "Habillez-vous professionnellement, proprement. Mieux vaut être trop habillé que pas assez." },
  { icon: "🗺️", title: "Repérez le trajet", desc: "Arrivez 10-15 minutes en avance. Testez l'itinéraire la veille si possible." },
  { icon: "📝", title: "Apportez vos documents", desc: "Plusieurs copies de votre CV, vos diplômes, vos lettres de référence." },
];

const tipsPendant = [
  { icon: "😊", title: "Souriez et regardez dans les yeux", desc: "La première impression se fait en 7 secondes. Poignée de main ferme et souriez." },
  { icon: "🎧", title: "Écoutez attentivement", desc: "Ne coupez pas la parole. Si vous ne comprenez pas, demandez poliment de répéter." },
  { icon: "📖", title: "Donnez des exemples concrets", desc: "Pour chaque qualité, donnez une situation réelle vécue. Soyez précis et bref." },
  { icon: "⏱️", title: "Gérez le temps de parole", desc: "Réponses de 1-3 minutes max. Restez pertinent et ne vous perdez pas." },
];

const ressources = [
  { icon: "💻", title: "Emploi-Québec", desc: "Offres d'emploi, formation, aide financière", url: "https://www.emploiquebec.gouv.qc.ca", color: "#003087" },
  { icon: "🔗", title: "LinkedIn", desc: "Réseau professionnel, offres d'emploi ciblées", url: "https://www.linkedin.com", color: "#0077B5" },
  { icon: "📋", title: "Indeed Québec", desc: "Moteur de recherche d'emploi #1 au Québec", url: "https://ca.indeed.com", color: "#2557A7" },
  { icon: "🏛️", title: "Portail emploi Laval", desc: "Offres d'emploi locales à Laval et banlieue", url: "https://www.laval.ca/emplois", color: "#C8102E" },
  { icon: "📱", title: "Jobillico", desc: "Plateforme québécoise spécialisée", url: "https://www.jobillico.com", color: "#006B3C" },
  { icon: "🤝", title: "CCMAV — Nous contacter", desc: "Accompagnement personnalisé gratuit au centre", url: "/#contact", color: "#F4A300" },
];

/* ──────────────────────────────────────────────────────
   MAIN PAGE
────────────────────────────────────────────────────── */
type Section = "cv" | "entrevue" | "recherche";

export default function AideEmploiPage() {
  const [section, setSection] = useState<Section>("cv");
  const [openQ, setOpenQ] = useState<number | null>(null);

  const navItems: { id: Section; icon: string; label: string }[] = [
    { id: "cv",        icon: "📄", label: "Rédacteur de CV" },
    { id: "entrevue",  icon: "🎤", label: "Préparation entrevue" },
    { id: "recherche", icon: "🔍", label: "Recherche d'emploi" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#C8102E] transition font-medium flex-shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Retour
          </Link>
          <div className="flex items-center gap-2">
            <Image src="/logo-ccma.png" alt="CCMAV" width={30} height={30} className="rounded-full" />
            <span className="font-extrabold text-[#1a1a2e] text-sm hidden sm:block">Aide à l'emploi — CCMAV</span>
          </div>
          <Link href="/#contact" className="text-xs font-bold text-white bg-[#C8102E] px-3 py-1.5 rounded-full hover:bg-[#a50d26] transition flex-shrink-0">
            Nous contacter
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Hero */}
        <div className="text-center mb-10">
          <span className="inline-block bg-[#7C3AED]/10 text-[#7C3AED] text-sm font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            💼 Service gratuit CCMAV
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1a1a2e] mb-4">
            Votre <span className="text-[#7C3AED]">emploi</span> au Québec
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto text-base leading-relaxed">
            Créez votre CV professionnel, préparez votre entrevue et découvrez les meilleures ressources pour trouver un emploi à Laval.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {[
              { icon: "📄", val: "CV", label: "Générateur gratuit" },
              { icon: "🎤", val: "7", label: "Questions d'entrevue" },
              { icon: "🔗", val: "6", label: "Ressources emploi" },
              { icon: "🤝", val: "100%", label: "Gratuit & accessible" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl mb-0.5">{s.icon}</div>
                <div className="text-xl font-extrabold text-[#1a1a2e]">{s.val}</div>
                <div className="text-xs text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section nav */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {navItems.map(n => (
            <button key={n.id} onClick={() => setSection(n.id)}
              className={`rounded-2xl border-2 py-4 px-3 text-center transition-all hover:shadow-md ${section === n.id ? "border-[#7C3AED] bg-[#7C3AED]/5 shadow-md" : "bg-white border-gray-100"}`}>
              <div className="text-2xl mb-1">{n.icon}</div>
              <div className={`text-xs font-bold ${section === n.id ? "text-[#7C3AED]" : "text-gray-500"}`}>{n.label}</div>
            </button>
          ))}
        </div>

        {/* ── CV BUILDER ── */}
        {section === "cv" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center text-xl">📄</div>
              <div>
                <h2 className="font-extrabold text-[#1a1a2e] text-lg">Rédacteur de CV</h2>
                <p className="text-gray-400 text-xs">Créez un CV professionnel en quelques minutes, imprimable en PDF</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CVBuilder />
              {/* Tips */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <h3 className="font-bold text-sm text-[#1a1a2e] mb-4">💡 Conseils pour un bon CV</h3>
                  <div className="space-y-3">
                    {[
                      { icon: "✅", tip: "Maximum 1-2 pages", detail: "Les recruteurs lisent votre CV en 30 secondes. Soyez concis." },
                      { icon: "✅", tip: "Adaptez-le à chaque offre", detail: "Lisez bien l'offre et utilisez les mêmes mots-clés." },
                      { icon: "✅", tip: "Commencez par vos réalisations", detail: "Ex : « Géré une équipe de 5 personnes » plutôt que « Responsable de l'équipe »." },
                      { icon: "✅", tip: "Pas de photo obligatoire au Québec", detail: "Au Québec, la photo n'est pas requise et rarement demandée." },
                      { icon: "✅", tip: "Incluez vos expériences bénévoles", detail: "Le bénévolat est très valorisé au Québec, comme au CCMAV !" },
                      { icon: "✅", tip: "Relisez pour les fautes", detail: "Faites relire par quelqu'un de confiance ou utilisez Antidote." },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-2.5">
                        <span className="text-sm flex-shrink-0">{item.icon}</span>
                        <div>
                          <p className="text-xs font-bold text-[#1a1a2e]">{item.tip}</p>
                          <p className="text-xs text-gray-400">{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-[#7C3AED]/5 border border-[#7C3AED]/20 rounded-2xl p-5">
                  <p className="text-sm font-bold text-[#7C3AED] mb-1">🤝 Besoin d'aide personnalisée ?</p>
                  <p className="text-xs text-gray-600 mb-3">Nos bénévoles au CCMAV peuvent vous aider à rédiger et corriger votre CV gratuitement.</p>
                  <Link href="/#contact" className="inline-block text-xs font-bold bg-[#7C3AED] text-white px-4 py-2 rounded-lg hover:bg-[#6d28d9] transition">
                    Prendre rendez-vous →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── ENTREVUE ── */}
        {section === "entrevue" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center text-xl">🎤</div>
              <div>
                <h2 className="font-extrabold text-[#1a1a2e] text-lg">Préparation à l'entrevue</h2>
                <p className="text-gray-400 text-xs">Questions fréquentes, conseils pratiques et exemples de réponses</p>
              </div>
            </div>

            {/* Tips avant / pendant */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="font-bold text-sm text-[#003087] mb-4 flex items-center gap-2"><span className="text-lg">🗓️</span> Avant l'entrevue</h3>
                <div className="space-y-3">
                  {tipsAvant.map((t, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span className="text-xl flex-shrink-0">{t.icon}</span>
                      <div><p className="text-xs font-bold text-[#1a1a2e]">{t.title}</p><p className="text-xs text-gray-400">{t.desc}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="font-bold text-sm text-[#006B3C] mb-4 flex items-center gap-2"><span className="text-lg">💬</span> Pendant l'entrevue</h3>
                <div className="space-y-3">
                  {tipsPendant.map((t, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span className="text-xl flex-shrink-0">{t.icon}</span>
                      <div><p className="text-xs font-bold text-[#1a1a2e]">{t.title}</p><p className="text-xs text-gray-400">{t.desc}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Questions accordéon */}
            <h3 className="font-extrabold text-[#1a1a2e] text-base mb-4">❓ Questions fréquentes — avec exemples de réponses</h3>
            <div className="space-y-3">
              {interviewQuestions.map((q, i) => (
                <div key={i} className={`rounded-2xl border-2 overflow-hidden transition-all ${openQ === i ? "border-[#7C3AED]" : "border-gray-100 bg-white"}`}>
                  <button className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition"
                    onClick={() => setOpenQ(openQ === i ? null : i)}>
                    <div className="flex items-center gap-3">
                      <span className="text-xl flex-shrink-0">{q.icon}</span>
                      <span className="font-bold text-sm text-[#1a1a2e]">{q.q}</span>
                    </div>
                    <span className={`text-gray-400 text-lg transition-transform flex-shrink-0 ml-2 ${openQ === i ? "rotate-180" : ""}`}>⌄</span>
                  </button>
                  {openQ === i && (
                    <div className="px-5 pb-5 space-y-3 border-t border-gray-100">
                      <div className="bg-[#7C3AED]/5 rounded-xl p-3">
                        <p className="text-xs font-bold text-[#7C3AED] mb-1">💡 Conseil</p>
                        <p className="text-xs text-gray-600 leading-relaxed">{q.conseil}</p>
                      </div>
                      <div className="bg-green-50 rounded-xl p-3 border border-green-100">
                        <p className="text-xs font-bold text-[#006B3C] mb-1">✅ Exemple de réponse</p>
                        <p className="text-xs text-gray-600 leading-relaxed italic">"{q.exemple}"</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm">
              <p className="text-base font-bold text-[#1a1a2e] mb-2">🎭 Pratiquez avec un bénévole CCMAV</p>
              <p className="text-sm text-gray-500 mb-4">Simulez une vraie entrevue avec un membre de notre équipe. Service gratuit, en français.</p>
              <Link href="/#contact" className="inline-flex items-center gap-2 bg-[#7C3AED] text-white font-bold px-6 py-2.5 rounded-xl hover:bg-[#6d28d9] transition shadow">
                Réserver une simulation →
              </Link>
            </div>
          </div>
        )}

        {/* ── RECHERCHE ── */}
        {section === "recherche" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center text-xl">🔍</div>
              <div>
                <h2 className="font-extrabold text-[#1a1a2e] text-lg">Recherche d'emploi au Québec</h2>
                <p className="text-gray-400 text-xs">Étapes, stratégies et plateformes pour trouver un emploi à Laval</p>
              </div>
            </div>

            {/* Étapes */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-6">
              <h3 className="font-bold text-sm text-[#1a1a2e] mb-5">📋 Les 6 étapes pour trouver un emploi</h3>
              <div className="space-y-4">
                {[
                  { step: "01", title: "Définir votre objectif", desc: "Quel type d'emploi cherchez-vous ? Temps plein / partiel ? Secteur ? Salaire minimum ? Soyez précis.", color: "#7C3AED" },
                  { step: "02", title: "Préparer votre CV et lettre de motivation", desc: "Créez un CV clair en 1-2 pages. Adaptez votre lettre à chaque poste. Faites-les relire au CCMAV.", color: "#003087" },
                  { step: "03", title: "Activer votre réseau", desc: "Parlez à vos connaissances, à votre communauté. 70% des emplois se trouvent par le réseau, pas les annonces.", color: "#006B3C" },
                  { step: "04", title: "Chercher sur les bonnes plateformes", desc: "Indeed, LinkedIn, Emploi-Québec, Jobillico, le site des entreprises directement. Consultez chaque jour.", color: "#F4A300" },
                  { step: "05", title: "Postuler et faire un suivi", desc: "Envoyez votre candidature. 1 semaine plus tard, relancez par courriel : 'Je voulais confirmer que vous avez bien reçu ma candidature.'", color: "#C8102E" },
                  { step: "06", title: "Préparer et réussir l'entrevue", desc: "Utilisez notre guide de préparation à l'entrevue. Arrivez en avance, souriez et soyez authentique.", color: "#0891B2" },
                ].map(s => (
                  <div key={s.step} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold text-white flex-shrink-0" style={{ background: s.color }}>
                      {s.step}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1a1a2e]">{s.title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ressources */}
            <h3 className="font-extrabold text-[#1a1a2e] text-base mb-4">🔗 Plateformes et ressources utiles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {ressources.map(r => (
                <a key={r.title} href={r.url} target={r.url.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  className="bg-white rounded-2xl border-2 border-gray-100 p-5 hover:shadow-lg transition hover:-translate-y-0.5 group"
                  style={{} }
                  onMouseEnter={e => e.currentTarget.style.borderColor = `${r.color}50`}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#e5e7eb"}>
                  <div className="text-2xl mb-2">{r.icon}</div>
                  <h4 className="font-bold text-sm text-[#1a1a2e] group-hover:text-[#7C3AED] transition">{r.title}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">{r.desc}</p>
                  <div className="mt-3 text-xs font-bold flex items-center gap-1" style={{ color: r.color }}>
                    Visiter <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </a>
              ))}
            </div>

            {/* Droits des travailleurs */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h3 className="font-bold text-amber-800 text-sm mb-3">⚖️ Vos droits en tant que travailleur au Québec</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { droit: "Salaire minimum", info: "19,00 $/h en 2025 au Québec" },
                  { droit: "Semaine de travail", info: "40h max sans heures supplémentaires" },
                  { droit: "Vacances", info: "2 semaines après 1 an (4% du salaire)" },
                  { droit: "Discrimination interdite", info: "L'employeur ne peut refuser selon l'origine ou la langue" },
                ].map(d => (
                  <div key={d.droit} className="flex gap-2 items-start">
                    <span className="text-amber-600 font-bold text-xs mt-0.5">✓</span>
                    <div><p className="text-xs font-bold text-amber-800">{d.droit}</p><p className="text-xs text-amber-600">{d.info}</p></div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-amber-600 mt-3">Plus d'infos : <a href="https://www.cnesst.gouv.qc.ca" target="_blank" rel="noopener noreferrer" className="underline font-bold">CNESST.gouv.qc.ca</a></p>
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-12 rounded-2xl p-8 text-center text-white" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #7C3AED 100%)" }}>
          <p className="text-2xl font-extrabold mb-2">Accompagnement personnalisé gratuit</p>
          <p className="text-purple-200 text-sm mb-5 max-w-sm mx-auto">Rencontrez un conseiller bénévole au CCMAV pour vous aider dans vos démarches d'emploi à Laval.</p>
          <Link href="/#contact" className="inline-flex items-center gap-2 bg-white text-[#7C3AED] font-bold px-7 py-3 rounded-xl hover:bg-purple-50 transition shadow-lg">
            📞 Prendre rendez-vous →
          </Link>
        </div>
      </div>
    </div>
  );
}
