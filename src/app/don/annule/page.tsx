import Link from "next/link";

export default function AnnulePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-12 max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-[#1a1a2e] mb-4">Paiement annulé</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Votre paiement n'a pas été complété. Aucun montant n'a été débité de votre compte.
          Vous pouvez réessayer à tout moment.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/#soutenir"
            className="inline-block bg-[#C8102E] hover:bg-[#a00d26] text-white font-bold px-8 py-4 rounded-2xl transition-colors duration-200"
          >
            Réessayer
          </Link>
          <Link
            href="/"
            className="inline-block bg-gray-100 hover:bg-gray-200 text-[#1a1a2e] font-bold px-8 py-4 rounded-2xl transition-colors duration-200"
          >
            Retour à l'accueil
          </Link>
        </div>
        <p className="mt-6 text-xs text-gray-400">
          Besoin d'aide ? <a href="mailto:info.ccmav@gmail.com" className="underline">info.ccmav@gmail.com</a>
        </p>
      </div>
    </main>
  );
}
