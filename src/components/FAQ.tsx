"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const faqFr = [
  {
    q: "Est-ce que les services du CCMAV sont payants ?",
    a: "La plupart de nos services sont gratuits ou à faible coût. Certains ateliers spéciaux peuvent avoir des frais minimes. N'hésitez pas à nous contacter pour plus d'informations sur un service en particulier.",
  },
  {
    q: "Qui peut bénéficier des services du CCMAV ?",
    a: "Tout le monde est le bienvenu ! Nos services s'adressent principalement aux immigrants, nouveaux arrivants et familles multiculturelles de Laval, mais nous accueillons toute personne souhaitant s'impliquer dans notre communauté.",
  },
  {
    q: "Comment s'inscrire à un service ou une activité ?",
    a: "Vous pouvez vous inscrire en remplissant le formulaire de contact sur notre site, en nous appelant au 514-349-0635, ou en nous écrivant à info.ccmav@gmail.com. Un membre de notre équipe vous répondra rapidement.",
  },
  {
    q: "Où se trouve le centre CCMAV ?",
    a: "Nous sommes situés au 5785 Boul. des Laurentides, Local 207, Laval, QC. Nous sommes accessibles en transport en commun et disposons de stationnement à proximité.",
  },
  {
    q: "Quelles sont vos heures d'ouverture ?",
    a: "Nos bureaux sont ouverts du lundi au vendredi de 9h00 à 17h00, et le samedi de 10h00 à 14h00. Pour les événements spéciaux, les horaires peuvent varier.",
  },
  {
    q: "Comment devenir bénévole au CCMAV ?",
    a: "Nous sommes toujours à la recherche de bénévoles motivés ! Contactez-nous via le formulaire ou par téléphone. Aucune expérience particulière n'est requise — votre bonne volonté suffit.",
  },
  {
    q: "Comment soutenir financièrement le CCMAV ?",
    a: "Vous pouvez faire un don ponctuel ou devenir membre officiel pour 10$/an via notre page Zeffy. Chaque contribution, grande ou petite, nous aide à offrir davantage de services à la communauté.",
  },
];

const faqEn = [
  {
    q: "Are CCMAV services free?",
    a: "Most of our services are free or low-cost. Some special workshops may have minimal fees. Feel free to contact us for more information about a specific service.",
  },
  {
    q: "Who can benefit from CCMAV services?",
    a: "Everyone is welcome! Our services are primarily aimed at immigrants, newcomers and multicultural families in Laval, but we welcome anyone who wants to get involved in our community.",
  },
  {
    q: "How do I register for a service or activity?",
    a: "You can register by filling out the contact form on our website, calling us at 514-349-0635, or emailing us at info.ccmav@gmail.com. A team member will get back to you quickly.",
  },
  {
    q: "Where is the CCMAV centre located?",
    a: "We are located at 5785 Boul. des Laurentides, Suite 207, Laval, QC. We are accessible by public transit and have nearby parking.",
  },
  {
    q: "What are your opening hours?",
    a: "Our offices are open Monday to Friday from 9am to 5pm, and Saturday from 10am to 2pm. Hours may vary for special events.",
  },
  {
    q: "How can I volunteer at CCMAV?",
    a: "We are always looking for motivated volunteers! Contact us via the form or by phone. No specific experience is required — your goodwill is enough.",
  },
  {
    q: "How can I financially support CCMAV?",
    a: "You can make a one-time donation or become an official member for $10/year via our Zeffy page. Every contribution, large or small, helps us offer more services to the community.",
  },
];

export default function FAQ() {
  const { lang } = useLanguage();
  const faqs = lang === "fr" ? faqFr : faqEn;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#F4A300]/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C8102E]/4 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-[#F4A300]/15 text-[#F4A300] text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F4A300] inline-block" />
            {lang === "fr" ? "Questions fréquentes" : "Frequently asked questions"}
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1a1a2e] mb-5 leading-tight">
            {lang === "fr" ? "Vous avez des " : "Got any "}
            <span className="text-[#F4A300]">{lang === "fr" ? "questions ?" : "questions?"}</span>
          </h2>
          <p className="text-gray-500 text-base">
            {lang === "fr"
              ? "Retrouvez les réponses aux questions les plus fréquentes sur le CCMAV."
              : "Find answers to the most common questions about CCMAV."}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((item, i) => (
            <div
              key={i}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                open === i
                  ? "border-[#F4A300]/40 bg-white shadow-md"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className={`font-bold text-sm sm:text-base leading-snug transition-colors ${open === i ? "text-[#1a1a2e]" : "text-gray-700"}`}>
                  {item.q}
                </span>
                <span
                  className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                    open === i ? "bg-[#F4A300] text-white rotate-45" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  open === i ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center bg-[#1a1a2e] rounded-2xl px-8 py-8">
          <p className="text-white font-bold text-lg mb-2">
            {lang === "fr" ? "Vous ne trouvez pas votre réponse ?" : "Can't find your answer?"}
          </p>
          <p className="text-gray-400 text-sm mb-5">
            {lang === "fr"
              ? "Notre équipe est disponible pour répondre à toutes vos questions."
              : "Our team is available to answer all your questions."}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#F4A300] text-[#1a1a2e] font-extrabold text-sm hover:bg-[#d99000] transition-all duration-200 shadow-lg hover:-translate-y-0.5"
          >
            {lang === "fr" ? "Nous écrire" : "Contact us"}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
