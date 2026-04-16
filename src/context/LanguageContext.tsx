"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "fr" | "en";

const translations = {
  fr: {
    nav: {
      home: "Accueil", services: "Services", activities: "Activités",
      about: "À propos", support: "Soutenir", contact: "Contact",
    },
    hero: {
      badge: "Centre communautaire multiculturel — Laval",
      title1: "Bienvenue au", title2: "CCMAV", title3: "Auteuil Vimont Laval",
      subtitle: "Un espace inclusif pour tous. Intégration, culture, sport et entraide pour les familles et nouveaux arrivants de Laval.",
      cta1: "Nos services", cta2: "Nos événements",
      stat1: "Nationalités représentées", stat2: "Services offerts", stat3: "Bénévoles actifs", stat4: "Année de fondation",
      scroll: "Défiler",
    },
    services: {
      badge: "Ce que nous offrons",
      title: "Nos ", titleHighlight: "Services",
      subtitle: "Des services adaptés aux besoins des immigrants et des familles de Laval.",
      cta: "En savoir plus →",
      items: [
        { icon: "🇫🇷", color: "#003087", title: "Cours de français", description: "Apprentissage du français pour adultes et enfants, tous niveaux confondus, dans un cadre bienveillant." },
        { icon: "🤝", color: "#006B3C", title: "Intégration sociale", description: "Accompagnement personnalisé pour faciliter l'installation et l'intégration dans la société québécoise." },
        { icon: "⚽", color: "#F4A300", title: "Intégration par le sport", description: "Programmes sportifs pour jeunes de 12 à 30 ans favorisant l'inclusion et le dépassement de soi." },
        { icon: "👨‍👩‍👧", color: "#C8102E", title: "Soutien aux familles", description: "Ressources et ateliers pour les familles nouvellement arrivées, guidance parentale et soutien scolaire." },
        { icon: "💼", color: "#7C3AED", title: "Aide à l'emploi", description: "Accompagnement dans la recherche d'emploi, rédaction de CV et préparation aux entrevues." },
        { icon: "🌍", color: "#0891B2", title: "Échanges culturels", description: "Événements et activités pour célébrer la diversité culturelle et tisser des liens entre communautés." },
      ],
    },
    activities: {
      badge: "Rejoignez-nous",
      title: "Activités & Événements",
      subtitle: "Des activités enrichissantes pour toute la famille, toute l'année.",
      upcomingTitle: "Prochains événements",
      seeAll: "Voir tous les événements",
      items: [
        { photo: "https://loremflickr.com/500/300/soccer,sport?lock=1", icon: "⚽", tag: "Sport", color: "#006B3C", title: "Tournoi de soccer", desc: "Ligue de soccer pour jeunes de 12 à 18 ans." },
        { photo: "https://loremflickr.com/500/300/cooking,food?lock=2", icon: "🍽️", tag: "Culture", color: "#F4A300", title: "Cuisine du monde", desc: "Atelier culinaire multiculturel." },
        { photo: "https://loremflickr.com/500/300/music,dance?lock=3", icon: "🎵", tag: "Art", color: "#C8102E", title: "Soirée culturelle", desc: "Musique, danse et traditions du monde." },
        { photo: "https://loremflickr.com/500/300/french,language?lock=4", icon: "🇫🇷", tag: "Éducation", color: "#003087", title: "Cours de français", desc: "Cours gratuits pour adultes, tous niveaux." },
      ],
      events: [
        { date: { day: "15", month: "Avr" }, type: "Sport", typeColor: "#006B3C", title: "Tournoi de soccer — Printemps 2026", location: "Parc Auteuil, Laval", time: "10h00 – 17h00" },
        { date: { day: "22", month: "Avr" }, type: "Culture", typeColor: "#F4A300", title: "Soirée cuisine du monde", location: "Centre CCMAV", time: "18h00 – 21h00" },
        { date: { day: "03", month: "Mai" }, type: "Éducation", typeColor: "#003087", title: "Atelier CV et recherche d'emploi", location: "Centre CCMAV", time: "14h00 – 16h00" },
        { date: { day: "10", month: "Mai" }, type: "Art", typeColor: "#C8102E", title: "Spectacle multiculturel de printemps", location: "Salle communautaire, Laval", time: "19h00 – 22h00" },
      ],
    },
    about: {
      badge: "Notre histoire",
      title: "À propos du ", titleHighlight: "CCMAV",
      p1: "Le Centre Communautaire Multiculturel Auteuil Vimont Laval (CCMAV) est un organisme à but non lucratif fondé pour répondre aux besoins des immigrants et des familles multiculturelles de Laval.",
      p2: "Notre mission est de favoriser l'intégration, le vivre-ensemble et l'épanouissement de tous les membres de notre communauté à travers des services, des activités et un soutien personnalisé.",
      highlights: [
        { num: "30+", label: "Nationalités" },
        { num: "50+", label: "Bénévoles" },
        { num: "2026", label: "Fondé en" },
      ],
      cta: "Nous contacter",
      values: [
        { icon: "🤝", title: "Inclusion", desc: "Accueil de toutes les cultures et origines sans discrimination." },
        { icon: "❤️", title: "Solidarité", desc: "Soutien mutuel entre les membres de la communauté." },
        { icon: "🌱", title: "Épanouissement", desc: "Développement personnel et collectif de chaque individu." },
        { icon: "🌍", title: "Diversité", desc: "Célébration des différences comme une richesse collective." },
      ],
      caTitle: "Notre conseil d'administration",
      caMembers: [
        { nom: "Midley Bien-Aimé", role: "Président(e)" },
        { nom: "Jeannot Bien-Aimé", role: "Vice-président(e)" },
        { nom: "Jean-Merlet Dorsainvil", role: "Administrateur" },
      ],
      flagsDesc: "Des dizaines de nationalités représentées dans notre communauté",
    },
    support: {
      badge: "Faites la différence",
      title: "Soutenez le ", titleHighlight: "CCMAV",
      subtitle: "Votre soutien nous permet d'offrir des services essentiels à notre communauté.",
      plans: [
        { key: "ami", name: "Ami(e) du CCMAV", amount: "25 $", desc: "Soutien ponctuel pour nos activités" },
        { key: "batisseur", name: "Bâtisseur/se", amount: "50 $", desc: "Aide au démarrage du centre" },
        { key: "mecene", name: "Mécène", amount: "100 $", desc: "Soutien majeur à long terme" },
      ],
      donateBtn: "Faire un don",
      redirecting: "Redirection...",
      memberTitle: "Devenir membre",
      memberDesc: "Rejoignez notre communauté en tant que membre officiel et accédez à des avantages exclusifs.",
      memberFee: "Cotisation annuelle",
      memberCta: "Adhérer maintenant",
      secure: "Paiement sécurisé via Stripe",
    },
    testimonials: {
      badge: "Témoignages",
      title: "Ce qu'ils disent ", titleHighlight: "de nous",
      items: [
        { name: "Maria S.", origin: "Colombie", text: "Le CCMAV m'a aidé à m'intégrer rapidement. Les cours de français et l'accueil chaleureux ont changé ma vie à Laval.", avatar: "https://i.pravatar.cc/150?u=maria" },
        { name: "Ahmed B.", origin: "Maroc", text: "Grâce au CCMAV, j'ai trouvé un emploi en moins de 3 mois. L'équipe est incroyable et toujours disponible.", avatar: "https://i.pravatar.cc/150?u=ahmed" },
        { name: "Li Wei", origin: "Chine", text: "Les activités culturelles m'ont permis de me faire des amis de partout dans le monde. C'est une vraie famille.", avatar: "https://i.pravatar.cc/150?u=li" },
      ],
    },
    partners: {
      badge: "Ils nous font confiance",
      title: "Nos ", titleHighlight: "Partenaires",
    },
    newsletter: {
      badge: "Restez informé",
      title: "Abonnez-vous à notre ", titleHighlight: "infolettre",
      subtitle: "Recevez les dernières nouvelles, événements et activités du CCMAV directement dans votre boîte courriel.",
      namePlaceholder: "Votre prénom (optionnel)",
      emailPlaceholder: "Votre adresse courriel",
      cta: "S'abonner",
      sending: "Envoi...",
      success: "Merci ! Vérifiez votre courriel pour confirmer.",
      error: "Une erreur est survenue. Réessayez.",
    },
    contact: {
      badge: "Écrivez-nous",
      title: "Nous contacter",
      subtitle: "Une question ? Besoin d'aide ? Notre équipe est là pour vous.",
      address: "Adresse",
      phone: "Téléphone",
      email: "Courriel",
      hours: "Heures d'ouverture",
      hoursLines: ["Lun – Ven : 9h00 – 17h00", "Sam : 10h00 – 14h00"],
      follow: "Suivez-nous",
      nameLabel: "Nom complet",
      namePlaceholder: "Votre nom complet",
      emailLabel: "Courriel",
      subjectLabel: "Sujet",
      subjectDefault: "Choisir un sujet...",
      subjects: ["Renseignements généraux", "Inscription à un service", "Bénévolat", "Partenariat", "Autre"],
      messageLabel: "Message",
      messagePlaceholder: "Votre message...",
      send: "Envoyer",
      sending: "Envoi...",
      successTitle: "Message envoyé !",
      successMsg: "Nous vous répondrons dans les plus brefs délais.",
      sendAnother: "Envoyer un autre message",
      errorMsg: "Erreur lors de l'envoi. Réessayez.",
    },
    footer: {
      description: "Centre communautaire multiculturel au cœur d'Auteuil Vimont, Laval. Intégration, culture et entraide pour tous.",
      links: "Liens rapides",
      followUs: "Suivez-nous",
      rights: "Tous droits réservés.",
    },
  },
  en: {
    nav: {
      home: "Home", services: "Services", activities: "Activities",
      about: "About", support: "Support", contact: "Contact",
    },
    hero: {
      badge: "Multicultural community centre — Laval",
      title1: "Welcome to", title2: "CCMAV", title3: "Auteuil Vimont Laval",
      subtitle: "An inclusive space for everyone. Integration, culture, sport and mutual aid for families and newcomers in Laval.",
      cta1: "Our services", cta2: "Our events",
      stat1: "Nationalities represented", stat2: "Services offered", stat3: "Active volunteers", stat4: "Year founded",
      scroll: "Scroll",
    },
    services: {
      badge: "What we offer",
      title: "Our ", titleHighlight: "Services",
      subtitle: "Services tailored to the needs of immigrants and families in Laval.",
      cta: "Learn more →",
      items: [
        { icon: "🇫🇷", color: "#003087", title: "French classes", description: "French language learning for adults and children at all levels, in a welcoming environment." },
        { icon: "🤝", color: "#006B3C", title: "Social integration", description: "Personalized support to ease settlement and integration into Quebec society." },
        { icon: "⚽", color: "#F4A300", title: "Sport integration", description: "Sports programs for youth aged 12 to 30 promoting inclusion and personal growth." },
        { icon: "👨‍👩‍👧", color: "#C8102E", title: "Family support", description: "Resources and workshops for newly arrived families, parental guidance and academic support." },
        { icon: "💼", color: "#7C3AED", title: "Employment help", description: "Support for job searching, resume writing and interview preparation." },
        { icon: "🌍", color: "#0891B2", title: "Cultural exchanges", description: "Events and activities to celebrate cultural diversity and build bridges between communities." },
      ],
    },
    activities: {
      badge: "Join us",
      title: "Activities & Events",
      subtitle: "Enriching activities for the whole family, all year round.",
      upcomingTitle: "Upcoming events",
      seeAll: "See all events",
      items: [
        { photo: "https://loremflickr.com/500/300/soccer,sport?lock=1", icon: "⚽", tag: "Sport", color: "#006B3C", title: "Soccer tournament", desc: "Soccer league for youth aged 12 to 18." },
        { photo: "https://loremflickr.com/500/300/cooking,food?lock=2", icon: "🍽️", tag: "Culture", color: "#F4A300", title: "World cuisine", desc: "Multicultural cooking workshop." },
        { photo: "https://loremflickr.com/500/300/music,dance?lock=3", icon: "🎵", tag: "Art", color: "#C8102E", title: "Cultural evening", desc: "Music, dance and world traditions." },
        { photo: "https://loremflickr.com/500/300/french,language?lock=4", icon: "🇫🇷", tag: "Education", color: "#003087", title: "French classes", desc: "Free classes for adults, all levels." },
      ],
      events: [
        { date: { day: "15", month: "Apr" }, type: "Sport", typeColor: "#006B3C", title: "Soccer Tournament — Spring 2026", location: "Parc Auteuil, Laval", time: "10am – 5pm" },
        { date: { day: "22", month: "Apr" }, type: "Culture", typeColor: "#F4A300", title: "World cuisine evening", location: "CCMAV Centre", time: "6pm – 9pm" },
        { date: { day: "03", month: "May" }, type: "Education", typeColor: "#003087", title: "Resume & job search workshop", location: "CCMAV Centre", time: "2pm – 4pm" },
        { date: { day: "10", month: "May" }, type: "Art", typeColor: "#C8102E", title: "Multicultural spring show", location: "Community Hall, Laval", time: "7pm – 10pm" },
      ],
    },
    about: {
      badge: "Our story",
      title: "About ", titleHighlight: "CCMAV",
      p1: "The Centre Communautaire Multiculturel Auteuil Vimont Laval (CCMAV) is a non-profit organization founded to meet the needs of immigrants and multicultural families in Laval.",
      p2: "Our mission is to promote integration, social cohesion and the fulfillment of all community members through services, activities and personalized support.",
      highlights: [
        { num: "30+", label: "Nationalities" },
        { num: "50+", label: "Volunteers" },
        { num: "2026", label: "Founded in" },
      ],
      cta: "Contact us",
      values: [
        { icon: "🤝", title: "Inclusion", desc: "Welcoming all cultures and backgrounds without discrimination." },
        { icon: "❤️", title: "Solidarity", desc: "Mutual support among community members." },
        { icon: "🌱", title: "Fulfillment", desc: "Personal and collective development of each individual." },
        { icon: "🌍", title: "Diversity", desc: "Celebrating differences as a collective strength." },
      ],
      caTitle: "Our board of directors",
      caMembers: [
        { nom: "Midley Bien-Aimé", role: "President" },
        { nom: "Jeannot Bien-Aimé", role: "Vice-president" },
        { nom: "Jean-Merlet Dorsainvil", role: "Administrator" },
      ],
      flagsDesc: "Dozens of nationalities represented in our community",
    },
    support: {
      badge: "Make a difference",
      title: "Support ", titleHighlight: "CCMAV",
      subtitle: "Your support allows us to provide essential services to our community.",
      plans: [
        { key: "ami", name: "Friend of CCMAV", amount: "$25", desc: "One-time support for our activities" },
        { key: "batisseur", name: "Builder", amount: "$50", desc: "Help launching the centre" },
        { key: "mecene", name: "Patron", amount: "$100", desc: "Major long-term support" },
      ],
      donateBtn: "Donate",
      redirecting: "Redirecting...",
      memberTitle: "Become a member",
      memberDesc: "Join our community as an official member and access exclusive benefits.",
      memberFee: "Annual fee",
      memberCta: "Join now",
      secure: "Secure payment via Stripe",
    },
    testimonials: {
      badge: "Testimonials",
      title: "What they say ", titleHighlight: "about us",
      items: [
        { name: "Maria S.", origin: "Colombia", text: "CCMAV helped me integrate quickly. The French classes and warm welcome changed my life in Laval.", avatar: "https://i.pravatar.cc/150?u=maria" },
        { name: "Ahmed B.", origin: "Morocco", text: "Thanks to CCMAV, I found a job in less than 3 months. The team is incredible and always available.", avatar: "https://i.pravatar.cc/150?u=ahmed" },
        { name: "Li Wei", origin: "China", text: "The cultural activities allowed me to make friends from around the world. It's a real family.", avatar: "https://i.pravatar.cc/150?u=li" },
      ],
    },
    partners: {
      badge: "They trust us",
      title: "Our ", titleHighlight: "Partners",
    },
    newsletter: {
      badge: "Stay informed",
      title: "Subscribe to our ", titleHighlight: "newsletter",
      subtitle: "Receive the latest news, events and activities from CCMAV directly in your inbox.",
      namePlaceholder: "Your first name (optional)",
      emailPlaceholder: "Your email address",
      cta: "Subscribe",
      sending: "Sending...",
      success: "Thank you! Check your email to confirm.",
      error: "An error occurred. Please try again.",
    },
    contact: {
      badge: "Write to us",
      title: "Contact us",
      subtitle: "A question? Need help? Our team is here for you.",
      address: "Address",
      phone: "Phone",
      email: "Email",
      hours: "Opening hours",
      hoursLines: ["Mon – Fri: 9am – 5pm", "Sat: 10am – 2pm"],
      follow: "Follow us",
      nameLabel: "Full name",
      namePlaceholder: "Your full name",
      emailLabel: "Email",
      subjectLabel: "Subject",
      subjectDefault: "Choose a subject...",
      subjects: ["General information", "Service registration", "Volunteering", "Partnership", "Other"],
      messageLabel: "Message",
      messagePlaceholder: "Your message...",
      send: "Send",
      sending: "Sending...",
      successTitle: "Message sent!",
      successMsg: "We will get back to you as soon as possible.",
      sendAnother: "Send another message",
      errorMsg: "Error sending. Please try again.",
    },
    footer: {
      description: "Multicultural community centre in the heart of Auteuil Vimont, Laval. Integration, culture and mutual aid for all.",
      links: "Quick links",
      followUs: "Follow us",
      rights: "All rights reserved.",
    },
  },
};

type Translations = typeof translations.fr;
const LanguageContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Translations }>({
  lang: "fr", setLang: () => {}, t: translations.fr,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
