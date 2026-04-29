"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

/* ─── Types ─────────────────────────────────────────── */
type Level = "A1" | "A2" | "B1" | "B2";

interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  videoId: string;        // YouTube video ID
  vocabulary: { fr: string; en: string }[];
  quiz: { question: string; options: string[]; answer: number }[];
}

/* ─── Data ───────────────────────────────────────────── */
const levels: { code: Level; label: string; color: string; bg: string; desc: string; icon: string }[] = [
  { code: "A1", label: "Débutant",      color: "#006B3C", bg: "#006B3C15", desc: "Je débute en français", icon: "🌱" },
  { code: "A2", label: "Élémentaire",   color: "#003087", bg: "#00308715", desc: "Je connais les bases",  icon: "📖" },
  { code: "B1", label: "Intermédiaire", color: "#F4A300", bg: "#F4A30015", desc: "Je me débrouille",      icon: "🚀" },
  { code: "B2", label: "Avancé",        color: "#C8102E", bg: "#C8102E15", desc: "Je veux progresser",    icon: "⭐" },
];

const lessons: Record<Level, Lesson[]> = {
  A1: [
    {
      id: "a1-1",
      title: "Se présenter",
      subtitle: "Dire bonjour et donner son nom",
      duration: "15 min",
      videoId: "vLBJcMRCpIM",   // French basics – greetings
      vocabulary: [
        { fr: "Bonjour", en: "Hello / Good morning" },
        { fr: "Je m'appelle…", en: "My name is…" },
        { fr: "Comment tu t'appelles ?", en: "What is your name?" },
        { fr: "Enchanté(e)", en: "Nice to meet you" },
        { fr: "Au revoir", en: "Goodbye" },
        { fr: "Merci", en: "Thank you" },
      ],
      quiz: [
        { question: "Comment dit-on 'Hello' en français ?", options: ["Merci", "Bonjour", "Au revoir", "Pardon"], answer: 1 },
        { question: "Quelle phrase signifie 'My name is' ?", options: ["J'habite à", "Je m'appelle", "Je suis", "J'ai"], answer: 1 },
        { question: "Comment dit-on 'Nice to meet you' ?", options: ["Bonsoir", "S'il vous plaît", "Enchanté(e)", "De rien"], answer: 2 },
      ],
    },
    {
      id: "a1-2",
      title: "Les chiffres",
      subtitle: "Compter de 1 à 20",
      duration: "12 min",
      videoId: "OiXh4hSIFLc",   // French numbers
      vocabulary: [
        { fr: "Un / Une", en: "One" },
        { fr: "Deux", en: "Two" },
        { fr: "Trois", en: "Three" },
        { fr: "Dix", en: "Ten" },
        { fr: "Vingt", en: "Twenty" },
        { fr: "Cent", en: "One hundred" },
      ],
      quiz: [
        { question: "Comment dit-on 'Three' en français ?", options: ["Deux", "Quatre", "Trois", "Cinq"], answer: 2 },
        { question: "Quel chiffre est 'Dix' ?", options: ["5", "10", "15", "20"], answer: 1 },
        { question: "Combien font 'dix + dix' ?", options: ["Dix", "Quinze", "Vingt", "Trente"], answer: 2 },
      ],
    },
    {
      id: "a1-3",
      title: "La famille",
      subtitle: "Parler de sa famille",
      duration: "18 min",
      videoId: "E2RwkMlNeHc",   // French family vocabulary
      vocabulary: [
        { fr: "La mère", en: "The mother" },
        { fr: "Le père", en: "The father" },
        { fr: "Le frère", en: "The brother" },
        { fr: "La sœur", en: "The sister" },
        { fr: "Les enfants", en: "The children" },
        { fr: "Les grands-parents", en: "The grandparents" },
      ],
      quiz: [
        { question: "Comment dit-on 'The brother' ?", options: ["Le père", "La sœur", "Le frère", "La mère"], answer: 2 },
        { question: "Que signifie 'les enfants' ?", options: ["The parents", "The grandparents", "The children", "The cousins"], answer: 2 },
        { question: "Comment dit-on 'The mother' ?", options: ["Le père", "La mère", "La fille", "La tante"], answer: 1 },
      ],
    },
  ],
  A2: [
    {
      id: "a2-1",
      title: "Au restaurant",
      subtitle: "Commander un repas",
      duration: "20 min",
      videoId: "Bz5Gqj3Aa1c",   // French at restaurant
      vocabulary: [
        { fr: "La carte / le menu", en: "The menu" },
        { fr: "Je voudrais…", en: "I would like…" },
        { fr: "L'addition, s'il vous plaît", en: "The bill, please" },
        { fr: "C'est délicieux", en: "It's delicious" },
        { fr: "Une table pour deux", en: "A table for two" },
        { fr: "Bon appétit !", en: "Enjoy your meal!" },
      ],
      quiz: [
        { question: "Comment demander l'addition ?", options: ["Bon appétit !", "L'addition, s'il vous plaît", "Je voudrais du pain", "Une table pour deux"], answer: 1 },
        { question: "Que signifie 'Je voudrais' ?", options: ["I have", "I want / I would like", "I eat", "I drink"], answer: 1 },
        { question: "Comment dit-on 'The menu' ?", options: ["La boisson", "Le repas", "La carte", "Le dessert"], answer: 2 },
      ],
    },
    {
      id: "a2-2",
      title: "Les directions",
      subtitle: "Se repérer en ville",
      duration: "17 min",
      videoId: "VwFwsPzGbrw",   // French directions
      vocabulary: [
        { fr: "Tournez à gauche", en: "Turn left" },
        { fr: "Tournez à droite", en: "Turn right" },
        { fr: "Allez tout droit", en: "Go straight ahead" },
        { fr: "La rue", en: "The street" },
        { fr: "Le carrefour", en: "The intersection" },
        { fr: "C'est loin ?", en: "Is it far?" },
      ],
      quiz: [
        { question: "Comment dit-on 'Turn left' ?", options: ["Allez tout droit", "Tournez à droite", "Tournez à gauche", "Revenez en arrière"], answer: 2 },
        { question: "Que signifie 'Allez tout droit' ?", options: ["Turn right", "Go straight ahead", "Stop here", "Go back"], answer: 1 },
        { question: "Comment dit-on 'The street' ?", options: ["Le parc", "La rue", "Le pont", "La place"], answer: 1 },
      ],
    },
  ],
  B1: [
    {
      id: "b1-1",
      title: "Parler de son travail",
      subtitle: "Vocabulaire professionnel",
      duration: "22 min",
      videoId: "N0TKw-iWNiM",   // French work vocabulary
      vocabulary: [
        { fr: "Le poste / l'emploi", en: "The job / position" },
        { fr: "Le salaire", en: "The salary" },
        { fr: "Le collègue", en: "The colleague" },
        { fr: "Une réunion", en: "A meeting" },
        { fr: "Le bureau", en: "The office" },
        { fr: "Travailler à temps plein", en: "To work full-time" },
      ],
      quiz: [
        { question: "Que signifie 'le salaire' ?", options: ["The schedule", "The salary", "The colleague", "The meeting"], answer: 1 },
        { question: "Comment dit-on 'A meeting' ?", options: ["Un bureau", "Un poste", "Une réunion", "Un collègue"], answer: 2 },
        { question: "Que signifie 'travailler à temps plein' ?", options: ["Work part-time", "Work from home", "Work full-time", "Work overtime"], answer: 2 },
      ],
    },
    {
      id: "b1-2",
      title: "Les émotions",
      subtitle: "Exprimer ses sentiments",
      duration: "19 min",
      videoId: "eBzHPJhHJ04",   // French emotions
      vocabulary: [
        { fr: "Je suis heureux / heureuse", en: "I am happy" },
        { fr: "Je suis triste", en: "I am sad" },
        { fr: "J'ai peur", en: "I am afraid" },
        { fr: "Je suis en colère", en: "I am angry" },
        { fr: "Je suis fatigué(e)", en: "I am tired" },
        { fr: "Je suis fier / fière", en: "I am proud" },
      ],
      quiz: [
        { question: "Que signifie 'Je suis triste' ?", options: ["I am tired", "I am angry", "I am sad", "I am afraid"], answer: 2 },
        { question: "Comment dit-on 'I am angry' ?", options: ["Je suis heureux", "Je suis en colère", "J'ai peur", "Je suis fier"], answer: 1 },
        { question: "Que signifie 'J'ai peur' ?", options: ["I am tired", "I am proud", "I am afraid", "I am happy"], answer: 2 },
      ],
    },
  ],
  B2: [
    {
      id: "b2-1",
      title: "Débattre et argumenter",
      subtitle: "Exprimer son opinion",
      duration: "25 min",
      videoId: "wLRMVqFbCso",   // French advanced conversation
      vocabulary: [
        { fr: "À mon avis…", en: "In my opinion…" },
        { fr: "Je suis d'accord avec…", en: "I agree with…" },
        { fr: "En revanche…", en: "On the other hand…" },
        { fr: "Il faut souligner que…", en: "It should be noted that…" },
        { fr: "Néanmoins…", en: "Nevertheless…" },
        { fr: "En ce qui concerne…", en: "Regarding… / As for…" },
      ],
      quiz: [
        { question: "Que signifie 'À mon avis' ?", options: ["In your opinion", "In my opinion", "According to him", "In general"], answer: 1 },
        { question: "Comment dit-on 'On the other hand' ?", options: ["Néanmoins", "En revanche", "Cependant", "Pourtant"], answer: 1 },
        { question: "Que signifie 'Je suis d'accord' ?", options: ["I disagree", "I doubt", "I agree", "I wonder"], answer: 2 },
      ],
    },
    {
      id: "b2-2",
      title: "Le subjonctif",
      subtitle: "Comprendre et utiliser le subjonctif",
      duration: "28 min",
      videoId: "9nS3t9bB7Fw",   // French subjunctive
      vocabulary: [
        { fr: "Il faut que + subjonctif", en: "It is necessary that…" },
        { fr: "Je veux que + subjonctif", en: "I want that…" },
        { fr: "Bien que + subjonctif", en: "Although…" },
        { fr: "Avant que + subjonctif", en: "Before…" },
        { fr: "Pour que + subjonctif", en: "In order that…" },
        { fr: "À moins que + subjonctif", en: "Unless…" },
      ],
      quiz: [
        { question: "Après 'Il faut que', quel mode utilise-t-on ?", options: ["L'indicatif", "L'infinitif", "Le subjonctif", "Le conditionnel"], answer: 2 },
        { question: "Que signifie 'Bien que' ?", options: ["Because", "Although", "In order that", "Before"], answer: 1 },
        { question: "Que signifie 'À moins que' ?", options: ["Unless", "After", "Before", "During"], answer: 0 },
      ],
    },
  ],
};

/* ─── Sub-components ─────────────────────────────────── */
function Stars({ n, color }: { n: number; color: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-4 h-4" fill={i < n ? color : "#e5e7eb"} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function QuizBlock({ quiz, lessonId }: { quiz: Lesson["quiz"]; lessonId: string }) {
  const storageKey = `quiz-${lessonId}`;
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quiz.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const { answers: a, submitted: s, score: sc } = JSON.parse(saved);
      setAnswers(a); setSubmitted(s); setScore(sc);
    }
  }, [storageKey]);

  function submit() {
    const sc = answers.reduce((acc, a, i) => acc + (a === quiz[i].answer ? 1 : 0), 0);
    setScore(sc); setSubmitted(true);
    localStorage.setItem(storageKey, JSON.stringify({ answers, submitted: true, score: sc }));
  }

  function reset() {
    setAnswers(Array(quiz.length).fill(null)); setSubmitted(false); setScore(0);
    localStorage.removeItem(storageKey);
  }

  return (
    <div className="mt-6 space-y-5">
      {quiz.map((q, qi) => (
        <div key={qi} className={`rounded-xl border p-4 transition-colors ${submitted ? (answers[qi] === q.answer ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50") : "border-gray-200 bg-white"}`}>
          <p className="font-semibold text-sm text-[#1a1a2e] mb-3">{qi + 1}. {q.question}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {q.options.map((opt, oi) => (
              <button
                key={oi}
                disabled={submitted}
                onClick={() => { const a = [...answers]; a[qi] = oi; setAnswers(a); }}
                className={`text-left px-3 py-2 rounded-lg text-sm border transition-all
                  ${submitted && oi === q.answer ? "border-green-500 bg-green-100 font-semibold text-green-800" : ""}
                  ${submitted && oi === answers[qi] && oi !== q.answer ? "border-red-400 bg-red-100 text-red-700 line-through" : ""}
                  ${!submitted && answers[qi] === oi ? "border-[#003087] bg-[#003087]/10 font-semibold" : ""}
                  ${!submitted && answers[qi] !== oi ? "border-gray-200 hover:border-[#003087]/40 hover:bg-gray-50" : ""}
                `}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={submit}
          disabled={answers.includes(null)}
          className="w-full py-3 rounded-xl bg-[#003087] text-white font-semibold text-sm hover:bg-[#002060] transition disabled:opacity-40"
        >
          Valider mes réponses
        </button>
      ) : (
        <div className={`rounded-xl p-4 text-center ${score === quiz.length ? "bg-green-100 border border-green-300" : score >= quiz.length / 2 ? "bg-yellow-50 border border-yellow-300" : "bg-red-50 border border-red-300"}`}>
          <p className="text-2xl font-extrabold mb-1">{score === quiz.length ? "🎉" : score >= quiz.length / 2 ? "👍" : "💪"}</p>
          <p className="font-bold text-[#1a1a2e]">{score} / {quiz.length} bonnes réponses</p>
          <p className="text-sm text-gray-500 mt-0.5">
            {score === quiz.length ? "Excellent ! Leçon maîtrisée." : score >= quiz.length / 2 ? "Bon travail ! Continuez à pratiquer." : "Relisez le vocabulaire et réessayez !"}
          </p>
          <button onClick={reset} className="mt-3 text-xs text-[#C8102E] hover:underline">Recommencer le quiz</button>
        </div>
      )}
    </div>
  );
}

function LessonModal({ lesson, level, onClose }: { lesson: Lesson; level: Level; onClose: () => void }) {
  const [tab, setTab] = useState<"video" | "vocab" | "quiz">("video");
  const lvl = levels.find(l => l.code === level)!;
  const storageKey = `quiz-${lesson.id}`;
  const quizDone = typeof window !== "undefined" && !!localStorage.getItem(storageKey);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4 flex items-start justify-between">
          <div>
            <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: lvl.bg, color: lvl.color }}>
              {lvl.icon} Niveau {level}
            </span>
            <h2 className="text-xl font-extrabold text-[#1a1a2e]">{lesson.title}</h2>
            <p className="text-sm text-gray-500">{lesson.subtitle} · {lesson.duration}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition ml-4 text-2xl leading-none">×</button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          {(["video", "vocab", "quiz"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-3 text-sm font-semibold transition border-b-2 ${tab === t ? "border-[#C8102E] text-[#C8102E]" : "border-transparent text-gray-400 hover:text-gray-700"}`}>
              {t === "video" ? "🎬 Vidéo" : t === "vocab" ? "📝 Vocabulaire" : `❓ Quiz${quizDone ? " ✓" : ""}`}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* VIDEO TAB */}
          {tab === "video" && (
            <div>
              <div className="rounded-xl overflow-hidden aspect-video bg-black mb-4">
                <iframe
                  src={`https://www.youtube.com/embed/${lesson.videoId}?rel=0`}
                  title={lesson.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => setTab("vocab")} className="px-4 py-2 rounded-lg bg-[#003087]/10 text-[#003087] text-sm font-semibold hover:bg-[#003087]/20 transition">
                  Voir le vocabulaire →
                </button>
                <button onClick={() => setTab("quiz")} className="px-4 py-2 rounded-lg bg-[#C8102E]/10 text-[#C8102E] text-sm font-semibold hover:bg-[#C8102E]/20 transition">
                  Faire le quiz →
                </button>
              </div>
            </div>
          )}

          {/* VOCABULARY TAB */}
          {tab === "vocab" && (
            <div>
              <p className="text-sm text-gray-500 mb-4">Apprenez ces mots clés de la leçon :</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lesson.vocabulary.map((v, i) => (
                  <div key={i} className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                    <span className="font-bold text-[#1a1a2e] text-sm">{v.fr}</span>
                    <span className="text-gray-400 text-xs ml-3 text-right">{v.en}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setTab("quiz")} className="mt-5 w-full py-3 rounded-xl bg-[#C8102E] text-white font-semibold text-sm hover:bg-[#a50d26] transition">
                Prêt(e) pour le quiz ? →
              </button>
            </div>
          )}

          {/* QUIZ TAB */}
          {tab === "quiz" && (
            <div>
              <p className="text-sm text-gray-500 mb-2">Testez vos connaissances sur cette leçon :</p>
              <QuizBlock quiz={lesson.quiz} lessonId={lesson.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────── */
export default function CoursPage() {
  const [selectedLevel, setSelectedLevel] = useState<Level>("A1");
  const [openLesson, setOpenLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load completed lessons from localStorage
    const completed = new Set<string>();
    Object.values(lessons).flat().forEach(l => {
      if (localStorage.getItem(`quiz-${l.id}`)) {
        try {
          const data = JSON.parse(localStorage.getItem(`quiz-${l.id}`)!);
          if (data.submitted) completed.add(l.id);
        } catch { /* ignore */ }
      }
    });
    setCompletedLessons(completed);
  }, [openLesson]);

  const currentLessons = lessons[selectedLevel];
  const lvl = levels.find(l => l.code === selectedLevel)!;
  const totalLessons = Object.values(lessons).flat().length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#C8102E] transition font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Retour au site
          </Link>
          <div className="flex items-center gap-2">
            <Image src="/logo-ccma.png" alt="CCMAV" width={32} height={32} className="rounded-full" />
            <span className="font-bold text-[#1a1a2e] text-sm hidden sm:block">CCMAV — Cours de français</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <svg className="w-4 h-4 text-[#006B3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {completedLessons.size}/{totalLessons} complétées
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Hero */}
        <div className="text-center mb-12">
          <span className="inline-block bg-[#C8102E]/10 text-[#C8102E] text-sm font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            🇫🇷 Apprentissage en ligne
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1a1a2e] mb-4">
            Apprendre le <span className="text-[#C8102E]">français</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Des leçons gratuites pour tous les niveaux. Vidéos, vocabulaire illustré et quiz interactifs — apprenez à votre rythme.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {[
              { icon: "🎬", val: `${totalLessons}`, label: "Leçons vidéo" },
              { icon: "📝", val: "50+", label: "Mots de vocabulaire" },
              { icon: "❓", val: `${Object.values(lessons).flat().reduce((a, l) => a + l.quiz.length, 0)}`, label: "Questions de quiz" },
              { icon: "🏆", val: "100%", label: "Gratuit" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl mb-0.5">{s.icon}</div>
                <div className="text-xl font-extrabold text-[#1a1a2e]">{s.val}</div>
                <div className="text-xs text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Level selector */}
        <div className="mb-8">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 text-center">Choisissez votre niveau</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {levels.map(l => (
              <button
                key={l.code}
                onClick={() => setSelectedLevel(l.code)}
                className={`rounded-2xl border-2 px-4 py-4 text-left transition-all hover:shadow-md ${selectedLevel === l.code ? "shadow-md scale-[1.02]" : "bg-white border-gray-100"}`}
                style={selectedLevel === l.code ? { borderColor: l.color, background: l.bg } : {}}
              >
                <div className="text-2xl mb-1">{l.icon}</div>
                <div className="font-extrabold text-base text-[#1a1a2e]">{l.code}</div>
                <div className="text-xs font-semibold" style={{ color: l.color }}>{l.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{l.desc}</div>
                <div className="mt-2 text-xs text-gray-400">{lessons[l.code].length} leçon{lessons[l.code].length > 1 ? "s" : ""}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Lessons grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-extrabold text-[#1a1a2e]">
              <span style={{ color: lvl.color }}>{lvl.icon} Niveau {selectedLevel}</span> — {lvl.label}
            </h2>
            <span className="text-xs text-gray-400">{currentLessons.length} leçon{currentLessons.length > 1 ? "s" : ""}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentLessons.map((lesson, idx) => {
              const done = completedLessons.has(lesson.id);
              return (
                <button
                  key={lesson.id}
                  onClick={() => setOpenLesson(lesson)}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all text-left p-5 group relative overflow-hidden hover:-translate-y-0.5"
                >
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl transition-all" style={{ background: done ? "#006B3C" : lvl.color }} />

                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-black" style={{ background: lvl.bg, color: lvl.color }}>
                      {idx + 1}
                    </div>
                    {done ? (
                      <span className="text-xs font-bold text-[#006B3C] bg-green-50 border border-green-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        Complétée
                      </span>
                    ) : (
                      <span className="text-xs text-gray-300 font-medium">{lesson.duration}</span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-[#1a1a2e] text-base mb-1 group-hover:text-[#C8102E] transition-colors">{lesson.title}</h3>
                  <p className="text-gray-500 text-xs mb-4">{lesson.subtitle}</p>

                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.362a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> Vidéo</span>
                    <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> Vocab</span>
                    <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" /></svg> Quiz ({lesson.quiz.length} q.)</span>
                  </div>

                  <div className="mt-4 flex items-center gap-1.5 text-xs font-bold" style={{ color: lvl.color }}>
                    Commencer la leçon
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress bar */}
        {completedLessons.size > 0 && (
          <div className="mt-10 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-[#1a1a2e]">🏆 Ma progression globale</span>
              <span className="text-sm font-extrabold text-[#006B3C]">{Math.round((completedLessons.size / totalLessons) * 100)}%</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-[#006B3C] transition-all duration-700" style={{ width: `${(completedLessons.size / totalLessons) * 100}%` }} />
            </div>
            <p className="text-xs text-gray-400 mt-2">{completedLessons.size} leçon{completedLessons.size > 1 ? "s" : ""} complétée{completedLessons.size > 1 ? "s" : ""} sur {totalLessons}</p>
          </div>
        )}

        {/* CTA footer */}
        <div className="mt-12 rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #003087 100%)" }}>
          <p className="text-white font-extrabold text-xl mb-2">Besoin d'aide personnalisée ?</p>
          <p className="text-blue-200 text-sm mb-5">Nos bénévoles offrent des cours en personne au centre CCMAV à Laval</p>
          <Link href="/#contact" className="inline-flex items-center gap-2 bg-[#C8102E] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#a50d26] transition shadow-lg">
            Contacter le centre →
          </Link>
        </div>
      </div>

      {/* Lesson Modal */}
      {openLesson && (
        <LessonModal
          lesson={openLesson}
          level={selectedLevel}
          onClose={() => setOpenLesson(null)}
        />
      )}
    </div>
  );
}
