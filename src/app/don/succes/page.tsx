import Link from "next/link";

export default function SuccesPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-12 max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-[#1a1a2e] mb-4">Merci pour votre soutien !</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Votre contribution au <strong>Centre Communautaire Multiculturel Auteuil Vimont Laval</strong> a bien été reçue.
          Ensemble, nous bâtissons une communauté plus forte et inclusive.
        </p>
        <div className="bg-[#C8102E]/5 border border-[#C8102E]/20 rounded-2xl p-5 mb-8">
          <p className="text-sm text-[#C8102E] font-semibold">
            Un reçu de confirmation vous sera envoyé par courriel.
          </p>
        </div>
        <Link
          href="/"
          className="inline-block bg-[#C8102E] hover:bg-[#a00d26] text-white font-bold px-8 py-4 rounded-2xl transition-colors duration-200"
        >
          Retour à l'accueil
        </Link>
        <p className="mt-6 text-xs text-gray-400">
          Questions ? Contactez-nous : <a href="mailto:info.ccmav@gmail.com" className="underline">info.ccmav@gmail.com</a>
        </p>
      </div>
    </main>
  );
}
