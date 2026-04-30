"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

type Level = "A1" | "A2" | "B1" | "B2";

interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  videoId: string;
  vocabulary: { fr: string; en: string; example?: string }[];
  quiz: { question: string; options: string[]; answer: number; explanation?: string }[];
}

const levels: { code: Level; label: string; color: string; bg: string; border: string; desc: string; icon: string }[] = [
  { code: "A1", label: "Débutant",      color: "#006B3C", bg: "#006B3C12", border: "#006B3C40", desc: "Je découvre le français", icon: "🌱" },
  { code: "A2", label: "Élémentaire",   color: "#003087", bg: "#00308712", border: "#00308740", desc: "Je connais les bases",    icon: "📖" },
  { code: "B1", label: "Intermédiaire", color: "#F4A300", bg: "#F4A30012", border: "#F4A30040", desc: "Je me débrouille",        icon: "🚀" },
  { code: "B2", label: "Avancé",        color: "#C8102E", bg: "#C8102E12", border: "#C8102E40", desc: "Je maîtrise la langue",   icon: "⭐" },
];

const lessons: Record<Level, Lesson[]> = {
  A1: [
    {
      id: "a1-1",
      title: "Se présenter",
      subtitle: "Les salutations et se présenter",
      duration: "18 min",
      videoId: "hd0_GZHHWeE",
      vocabulary: [
        { fr: "Bonjour", en: "Hello / Good morning", example: "Bonjour, je m'appelle Marie." },
        { fr: "Bonsoir", en: "Good evening", example: "Bonsoir, comment allez-vous ?" },
        { fr: "Je m'appelle…", en: "My name is…", example: "Je m'appelle Pierre Dupont." },
        { fr: "Comment tu t'appelles ?", en: "What is your name?", example: "Comment tu t'appelles ? — Marie." },
        { fr: "Enchanté(e)", en: "Nice to meet you", example: "Enchanté de faire votre connaissance." },
        { fr: "Au revoir", en: "Goodbye", example: "Au revoir, à demain !" },
        { fr: "S'il vous plaît", en: "Please (formal)", example: "Un café, s'il vous plaît." },
        { fr: "Merci beaucoup", en: "Thank you very much", example: "Merci beaucoup pour votre aide." },
        { fr: "De rien", en: "You're welcome", example: "— Merci ! — De rien." },
        { fr: "Pardon / Excusez-moi", en: "Sorry / Excuse me", example: "Excusez-moi, où est la gare ?" },
      ],
      quiz: [
        { question: "Comment dit-on 'Hello' en français ?", options: ["Merci", "Bonjour", "Au revoir", "Pardon"], answer: 1, explanation: "'Bonjour' s'utilise le matin et la journée." },
        { question: "Quelle phrase signifie 'My name is' ?", options: ["J'habite à", "Je m'appelle", "Je suis", "J'ai"], answer: 1, explanation: "'Je m'appelle' vient du verbe 's'appeler'." },
        { question: "Comment dit-on 'Nice to meet you' ?", options: ["Bonsoir", "S'il vous plaît", "Enchanté(e)", "De rien"], answer: 2 },
        { question: "Que répond-on à 'Merci' ?", options: ["Pardon", "Bonjour", "De rien", "Au revoir"], answer: 2, explanation: "'De rien' = 'You're welcome' en anglais." },
        { question: "Comment dit-on 'Good evening' ?", options: ["Bonjour", "Bonsoir", "Bonne nuit", "Salut"], answer: 1 },
      ],
    },
    {
      id: "a1-2",
      title: "Les chiffres",
      subtitle: "Compter de 1 à 100",
      duration: "20 min",
      videoId: "CEx2fPn-_UE",
      vocabulary: [
        { fr: "Un / Une", en: "One", example: "J'ai un frère." },
        { fr: "Cinq", en: "Five", example: "Il a cinq ans." },
        { fr: "Dix", en: "Ten", example: "Il est dix heures." },
        { fr: "Vingt", en: "Twenty", example: "J'ai vingt euros." },
        { fr: "Trente", en: "Thirty", example: "Elle a trente ans." },
        { fr: "Cinquante", en: "Fifty", example: "C'est à cinquante kilomètres." },
        { fr: "Cent", en: "One hundred", example: "Il y a cent personnes." },
        { fr: "Mille", en: "One thousand", example: "Ça coûte mille dollars." },
        { fr: "Premier / Première", en: "First", example: "C'est le premier janvier." },
        { fr: "Combien ?", en: "How many / How much?", example: "Combien ça coûte ?" },
      ],
      quiz: [
        { question: "Comment dit-on 'Twenty' en français ?", options: ["Deux", "Douze", "Vingt", "Deux cents"], answer: 2 },
        { question: "Quel chiffre est 'Cinquante' ?", options: ["15", "50", "55", "500"], answer: 1, explanation: "Cinquante = 50. Pensez à 'fifty' en anglais." },
        { question: "Comment dit-on 'How much?' en français ?", options: ["Où ?", "Quand ?", "Combien ?", "Pourquoi ?"], answer: 2 },
        { question: "Quel est le bon ordre ? 10, 20, 30...", options: ["Dix, trente, vingt", "Dix, vingt, trente", "Vingt, dix, trente", "Trente, vingt, dix"], answer: 1 },
        { question: "Comment dit-on '1000' ?", options: ["Cent", "Mille", "Million", "Milliard"], answer: 1 },
      ],
    },
    {
      id: "a1-3",
      title: "La famille",
      subtitle: "Parler de sa famille",
      duration: "22 min",
      videoId: "O5DnyD3JAhc",
      vocabulary: [
        { fr: "La mère / Maman", en: "The mother / Mom", example: "Ma mère s'appelle Isabelle." },
        { fr: "Le père / Papa", en: "The father / Dad", example: "Mon père est médecin." },
        { fr: "Le frère", en: "The brother", example: "J'ai deux frères." },
        { fr: "La sœur", en: "The sister", example: "Ma sœur habite à Paris." },
        { fr: "Les enfants", en: "The children", example: "Ils ont trois enfants." },
        { fr: "Les grands-parents", en: "The grandparents", example: "Mes grands-parents sont italiens." },
        { fr: "Le mari / La femme", en: "The husband / The wife", example: "Mon mari travaille ici." },
        { fr: "Les jumeaux", en: "The twins", example: "Ce sont des jumeaux." },
        { fr: "Le neveu / La nièce", en: "The nephew / The niece", example: "Ma nièce a 5 ans." },
        { fr: "Le cousin / La cousine", en: "The cousin (m/f)", example: "Mon cousin habite au Canada." },
      ],
      quiz: [
        { question: "Comment dit-on 'The brother' ?", options: ["Le père", "La sœur", "Le frère", "La mère"], answer: 2 },
        { question: "Que signifie 'les enfants' ?", options: ["The parents", "The grandparents", "The children", "The cousins"], answer: 2 },
        { question: "Comment dit-on 'The husband' ?", options: ["Le père", "La femme", "Le mari", "Le fils"], answer: 2 },
        { question: "Que signifie 'les grands-parents' ?", options: ["The parents", "The grandparents", "The relatives", "The siblings"], answer: 1 },
        { question: "Comment dit-on 'The niece' ?", options: ["La cousine", "La nièce", "La sœur", "La tante"], answer: 1 },
      ],
    },
    {
      id: "a1-4",
      title: "Les couleurs",
      subtitle: "Nommer et décrire les couleurs",
      duration: "15 min",
      videoId: "U5jcu8uUIU0",
      vocabulary: [
        { fr: "Rouge", en: "Red", example: "La pomme est rouge." },
        { fr: "Bleu(e)", en: "Blue", example: "Le ciel est bleu." },
        { fr: "Vert(e)", en: "Green", example: "L'herbe est verte." },
        { fr: "Jaune", en: "Yellow", example: "Le citron est jaune." },
        { fr: "Blanc(he)", en: "White", example: "La neige est blanche." },
        { fr: "Noir(e)", en: "Black", example: "Le chat est noir." },
        { fr: "Orange", en: "Orange", example: "La carotte est orange." },
        { fr: "Rose", en: "Pink", example: "La fleur est rose." },
        { fr: "Violet(te)", en: "Purple", example: "Le raisin est violet." },
        { fr: "Gris(e)", en: "Grey", example: "Le ciel est gris aujourd'hui." },
      ],
      quiz: [
        { question: "De quelle couleur est le ciel ?", options: ["Rouge", "Jaune", "Bleu", "Vert"], answer: 2, explanation: "Le ciel est bleu !" },
        { question: "Comment dit-on 'Green' ?", options: ["Gris", "Bleu", "Jaune", "Vert"], answer: 3 },
        { question: "Quelle couleur est 'White' ?", options: ["Blanc", "Noir", "Gris", "Rose"], answer: 0 },
        { question: "De quelle couleur est une banane ?", options: ["Rouge", "Jaune", "Bleu", "Violet"], answer: 1 },
        { question: "Comment dit-on 'Pink' ?", options: ["Rouge", "Orange", "Rose", "Violet"], answer: 2 },
      ],
    },
  ],
  A2: [
    {
      id: "a2-1",
      title: "Au restaurant",
      subtitle: "Commander et dialoguer au restaurant",
      duration: "22 min",
      videoId: "3uobq2LOibE",
      vocabulary: [
        { fr: "La carte / le menu", en: "The menu", example: "Puis-je avoir la carte, s'il vous plaît ?" },
        { fr: "Je voudrais…", en: "I would like…", example: "Je voudrais une soupe et un steak." },
        { fr: "L'addition, s'il vous plaît", en: "The bill, please", example: "Garçon, l'addition s'il vous plaît !" },
        { fr: "C'est délicieux", en: "It's delicious", example: "Ce plat est vraiment délicieux." },
        { fr: "Une table pour deux", en: "A table for two", example: "Bonjour, une table pour deux, s'il vous plaît." },
        { fr: "Bon appétit !", en: "Enjoy your meal!", example: "Bon appétit à tous !" },
        { fr: "L'entrée / le plat / le dessert", en: "Starter / main / dessert", example: "Je prends l'entrée du jour." },
        { fr: "Bien cuit / saignant", en: "Well done / rare", example: "Je voudrais mon steak bien cuit." },
        { fr: "Ça me convient", en: "That suits me / That's fine", example: "Cette table me convient parfaitement." },
        { fr: "La spécialité de la maison", en: "The house specialty", example: "Quelle est la spécialité de la maison ?" },
      ],
      quiz: [
        { question: "Comment demander l'addition ?", options: ["Bon appétit !", "L'addition, s'il vous plaît", "Je voudrais du pain", "Une table pour deux"], answer: 1 },
        { question: "Que signifie 'Je voudrais' ?", options: ["I have", "I want / I would like", "I eat", "I drink"], answer: 1 },
        { question: "Comment dit-on 'The menu' ?", options: ["La boisson", "Le repas", "La carte", "Le dessert"], answer: 2 },
        { question: "Comment dit-on 'The house specialty' ?", options: ["La spécialité de la maison", "Le plat du jour", "L'entrée spéciale", "La carte du chef"], answer: 0, explanation: "'La spécialité de la maison' est le plat le plus connu du restaurant." },
        { question: "Que signifie 'Bon appétit' ?", options: ["Good morning", "Good night", "Enjoy your meal", "Thank you"], answer: 2 },
      ],
    },
    {
      id: "a2-2",
      title: "Les directions",
      subtitle: "Demander et donner son chemin",
      duration: "20 min",
      videoId: "5luGJ3cO3GY",
      vocabulary: [
        { fr: "Tournez à gauche", en: "Turn left", example: "Tournez à gauche au carrefour." },
        { fr: "Tournez à droite", en: "Turn right", example: "Tournez à droite après l'école." },
        { fr: "Allez tout droit", en: "Go straight ahead", example: "Allez tout droit pendant 200 mètres." },
        { fr: "Traversez la rue", en: "Cross the street", example: "Traversez la rue au feu rouge." },
        { fr: "Le carrefour", en: "The intersection", example: "Au prochain carrefour, tournez à droite." },
        { fr: "C'est loin ?", en: "Is it far?", example: "La gare, c'est loin d'ici ?" },
        { fr: "À côté de", en: "Next to", example: "La pharmacie est à côté de la boulangerie." },
        { fr: "En face de", en: "Across from / In front of", example: "La banque est en face de la mairie." },
        { fr: "Au bout de la rue", en: "At the end of the street", example: "C'est au bout de la rue, sur la gauche." },
        { fr: "Prenez le métro / bus", en: "Take the metro / bus", example: "Prenez le bus numéro 27." },
      ],
      quiz: [
        { question: "Comment dit-on 'Turn left' ?", options: ["Allez tout droit", "Tournez à droite", "Tournez à gauche", "Revenez en arrière"], answer: 2 },
        { question: "Que signifie 'En face de' ?", options: ["Next to", "Behind", "Across from", "Far from"], answer: 2 },
        { question: "Comment dit-on 'Go straight ahead' ?", options: ["Tournez à gauche", "Allez tout droit", "Revenez en arrière", "Montez"], answer: 1 },
        { question: "Que signifie 'Le carrefour' ?", options: ["The roundabout", "The bridge", "The intersection", "The sidewalk"], answer: 2 },
        { question: "Comment dit-on 'At the end of the street' ?", options: ["En face de la rue", "À côté de la rue", "Au bout de la rue", "Dans la rue"], answer: 2 },
      ],
    },
    {
      id: "a2-3",
      title: "Faire les courses",
      subtitle: "Acheter et négocier au marché",
      duration: "18 min",
      videoId: "BrDxJrJ-stc",
      vocabulary: [
        { fr: "Combien ça coûte ?", en: "How much does it cost?", example: "Combien coûte ce manteau ?" },
        { fr: "C'est trop cher", en: "It's too expensive", example: "Désolé, c'est trop cher pour moi." },
        { fr: "Je cherche…", en: "I'm looking for…", example: "Je cherche une chemise bleue." },
        { fr: "Quelle taille ?", en: "What size?", example: "Quelle taille faites-vous ?" },
        { fr: "La caisse", en: "The cash register / checkout", example: "Où est la caisse, s'il vous plaît ?" },
        { fr: "Je peux essayer ?", en: "Can I try it on?", example: "Puis-je essayer cette robe ?" },
        { fr: "Le marché", en: "The market", example: "Je vais au marché le samedi matin." },
        { fr: "Un kilo de…", en: "A kilo of…", example: "Je voudrais un kilo de tomates." },
        { fr: "La promotion / Les soldes", en: "The sale / discount", example: "Ces chaussures sont en promotion." },
        { fr: "Vous avez la monnaie ?", en: "Do you have change?", example: "Vous avez la monnaie pour 50€ ?" },
      ],
      quiz: [
        { question: "Comment demander le prix ?", options: ["Quelle taille ?", "Combien ça coûte ?", "Je peux essayer ?", "C'est où ?"], answer: 1 },
        { question: "Que signifie 'Les soldes' ?", options: ["The prices", "The products", "The sales / discounts", "The receipts"], answer: 2 },
        { question: "Comment dire 'I'm looking for a jacket' ?", options: ["J'achète une veste", "Je cherche une veste", "J'essaie une veste", "Je prends une veste"], answer: 1 },
        { question: "Que signifie 'La caisse' ?", options: ["The fitting room", "The entrance", "The cash register", "The shelf"], answer: 2 },
        { question: "Comment demander à essayer un vêtement ?", options: ["Je peux essayer ?", "C'est combien ?", "Où est la sortie ?", "Vous avez du rouge ?"], answer: 0 },
      ],
    },
    {
      id: "a2-4",
      title: "La météo",
      subtitle: "Parler du temps et des saisons",
      duration: "17 min",
      videoId: "ZKnn-l4mLLQ",
      vocabulary: [
        { fr: "Il fait beau", en: "The weather is nice / It's sunny", example: "Il fait beau aujourd'hui, allons au parc !" },
        { fr: "Il pleut", en: "It's raining", example: "Il pleut beaucoup en automne." },
        { fr: "Il neige", en: "It's snowing", example: "Il neige à Montréal en décembre." },
        { fr: "Il fait froid / chaud", en: "It's cold / hot", example: "Il fait très froid ce matin." },
        { fr: "Le soleil brille", en: "The sun is shining", example: "Le soleil brille, mets tes lunettes !" },
        { fr: "Un nuage / nuageux", en: "A cloud / cloudy", example: "Le ciel est nuageux aujourd'hui." },
        { fr: "Le vent souffle", en: "The wind is blowing", example: "Le vent souffle fort en novembre." },
        { fr: "L'orage / La tempête", en: "The thunderstorm / storm", example: "Il y a un orage ce soir." },
        { fr: "Les saisons", en: "The seasons", example: "Mes saisons préférées sont l'été et l'automne." },
        { fr: "La température", en: "The temperature", example: "La température est de 25 degrés." },
      ],
      quiz: [
        { question: "Comment dit-on 'It's raining' ?", options: ["Il neige", "Il fait chaud", "Il pleut", "Il fait beau"], answer: 2 },
        { question: "Que signifie 'Il fait beau' ?", options: ["It's cold", "The weather is nice", "It's windy", "It's cloudy"], answer: 1 },
        { question: "Comment dit-on 'The thunderstorm' ?", options: ["Le vent", "Le soleil", "L'orage", "La neige"], answer: 2 },
        { question: "Combien y a-t-il de saisons ?", options: ["2", "3", "4", "6"], answer: 2, explanation: "Les 4 saisons : printemps, été, automne, hiver." },
        { question: "Comment dit-on 'It's snowing' ?", options: ["Il fait froid", "Il pleut", "Il neige", "Il y a du brouillard"], answer: 2 },
      ],
    },
  ],
  B1: [
    {
      id: "b1-1",
      title: "Parler de son travail",
      subtitle: "Vocabulaire professionnel et entretien",
      duration: "25 min",
      videoId: "C3nQDGEXqpw",
      vocabulary: [
        { fr: "Le poste / l'emploi", en: "The job / position", example: "Je cherche un poste de comptable." },
        { fr: "Le salaire / la rémunération", en: "The salary", example: "Mon salaire est de 3 000 € par mois." },
        { fr: "Le collègue / la collègue", en: "The colleague", example: "Mes collègues sont très sympas." },
        { fr: "Une réunion", en: "A meeting", example: "J'ai une réunion à 9h ce matin." },
        { fr: "Travailler à temps plein / partiel", en: "To work full-time / part-time", example: "Elle travaille à temps partiel." },
        { fr: "Le curriculum vitae (CV)", en: "The résumé / CV", example: "J'ai envoyé mon CV hier." },
        { fr: "Être embauché(e)", en: "To be hired", example: "J'ai été embauché la semaine dernière." },
        { fr: "Démissionner", en: "To resign", example: "Il a démissionné après 10 ans." },
        { fr: "Les congés payés", en: "Paid vacation / leave", example: "J'ai 15 jours de congés payés." },
        { fr: "Le chef / la cheffe", en: "The boss / manager", example: "Mon chef est très exigeant." },
      ],
      quiz: [
        { question: "Que signifie 'le salaire' ?", options: ["The schedule", "The salary", "The colleague", "The meeting"], answer: 1 },
        { question: "Comment dit-on 'To be hired' ?", options: ["Être licencié", "Être embauché", "Démissionner", "Travailler"], answer: 1 },
        { question: "Que signifie 'Les congés payés' ?", options: ["Work overtime", "Paid vacation", "Work from home", "Sick leave"], answer: 1 },
        { question: "Comment dit-on 'The boss' ?", options: ["Le collègue", "Le client", "Le chef", "Le stagiaire"], answer: 2 },
        { question: "Que signifie 'travailler à temps partiel' ?", options: ["Work full-time", "Work part-time", "Work overtime", "Work remotely"], answer: 1 },
      ],
    },
    {
      id: "b1-2",
      title: "Les émotions",
      subtitle: "Exprimer et décrire ses sentiments",
      duration: "22 min",
      videoId: "caRFIXSGclo",
      vocabulary: [
        { fr: "Je suis heureux / heureuse", en: "I am happy", example: "Je suis heureux de te voir !" },
        { fr: "Je suis triste", en: "I am sad", example: "Je suis triste depuis son départ." },
        { fr: "J'ai peur de…", en: "I am afraid of…", example: "J'ai peur des araignées." },
        { fr: "Je suis en colère", en: "I am angry", example: "Je suis en colère contre lui." },
        { fr: "Je suis fatigué(e)", en: "I am tired", example: "Je suis épuisé après cette journée." },
        { fr: "Je suis fier / fière", en: "I am proud", example: "Je suis fière de mon travail." },
        { fr: "Je suis stressé(e)", en: "I am stressed", example: "Je suis très stressée avant l'examen." },
        { fr: "J'ai honte", en: "I am ashamed", example: "J'ai honte de mon erreur." },
        { fr: "Je suis soulagé(e)", en: "I am relieved", example: "Je suis soulagé que tout aille bien." },
        { fr: "Je m'ennuie", en: "I am bored", example: "Je m'ennuie pendant ce cours." },
      ],
      quiz: [
        { question: "Que signifie 'Je suis triste' ?", options: ["I am tired", "I am angry", "I am sad", "I am afraid"], answer: 2 },
        { question: "Comment dit-on 'I am angry' ?", options: ["Je suis heureux", "Je suis en colère", "J'ai peur", "Je suis fier"], answer: 1 },
        { question: "Que signifie 'J'ai honte' ?", options: ["I am tired", "I am proud", "I am ashamed", "I am happy"], answer: 2 },
        { question: "Comment dit-on 'I am stressed' ?", options: ["Je suis stressé(e)", "Je m'ennuie", "Je suis soulagé", "J'ai peur"], answer: 0 },
        { question: "Que signifie 'Je suis soulagé' ?", options: ["I am tired", "I am bored", "I am relieved", "I am proud"], answer: 2 },
      ],
    },
    {
      id: "b1-3",
      title: "Le passé composé",
      subtitle: "Raconter des événements passés",
      duration: "28 min",
      videoId: "Eu9LgpItHR0",
      vocabulary: [
        { fr: "J'ai mangé", en: "I ate / I have eaten", example: "J'ai mangé une pizza hier soir." },
        { fr: "Je suis allé(e)", en: "I went", example: "Je suis allé au cinéma samedi." },
        { fr: "Il a dit / Elle a dit", en: "He/She said", example: "Elle a dit qu'elle était fatiguée." },
        { fr: "Nous avons fait", en: "We did / made", example: "Nous avons fait une randonnée." },
        { fr: "Ils sont venus", en: "They came", example: "Ils sont venus chez moi hier." },
        { fr: "Avoir + participe passé", en: "avoir + past participle", example: "J'ai lu ce livre. (lire → lu)" },
        { fr: "Être + participe passé", en: "être + past participle", example: "Elle est née en 1990." },
        { fr: "Hier / La semaine dernière", en: "Yesterday / Last week", example: "Hier j'ai travaillé 10 heures." },
        { fr: "Déjà / Jamais", en: "Already / Never", example: "Je n'ai jamais mangé de sushi." },
        { fr: "Accord du participe passé", en: "Past participle agreement", example: "Elle est partie. (féminin → partie)" },
      ],
      quiz: [
        { question: "Quel auxiliaire utilise-t-on avec 'manger' ?", options: ["Être", "Avoir", "Faire", "Aller"], answer: 1, explanation: "La plupart des verbes utilisent 'avoir' au passé composé." },
        { question: "Comment conjuguer 'aller' au passé composé ?", options: ["J'ai allé", "Je suis allé(e)", "J'ai été", "Je vais"], answer: 1, explanation: "Les verbes de mouvement (aller, venir, partir…) utilisent 'être'." },
        { question: "Que signifie 'Ils sont venus' ?", options: ["They will come", "They came", "They are coming", "They go"], answer: 1 },
        { question: "Comment dit-on 'I have never eaten sushi' ?", options: ["J'ai toujours mangé", "Je mange du sushi", "Je n'ai jamais mangé de sushi", "Je mange rarement"], answer: 2 },
        { question: "Quelle forme est correcte ? (Elle / partir)", options: ["Elle a parti", "Elle est parti", "Elle est partie", "Elle a partie"], answer: 2, explanation: "Avec 'être', le participe s'accorde en genre : elle est parti-E." },
      ],
    },
    {
      id: "b1-4",
      title: "Ma journée",
      subtitle: "Décrire ses habitudes quotidiennes",
      duration: "20 min",
      videoId: "Mgq2wr0bwV8",
      vocabulary: [
        { fr: "Se lever / Se réveiller", en: "To get up / wake up", example: "Je me lève à 7h chaque matin." },
        { fr: "Se doucher / Se laver", en: "To shower / wash up", example: "Je me douche en 10 minutes." },
        { fr: "Prendre le petit-déjeuner", en: "To have breakfast", example: "Je prends mon café avec des tartines." },
        { fr: "Se déplacer / Prendre les transports", en: "To commute", example: "Je prends le métro pour aller au bureau." },
        { fr: "Déjeuner / Dîner", en: "To have lunch / dinner", example: "Je déjeune avec mes collègues." },
        { fr: "Se détendre / Se reposer", en: "To relax / rest", example: "Le soir, je me détends devant la télé." },
        { fr: "Se coucher", en: "To go to bed", example: "Je me couche toujours avant minuit." },
        { fr: "D'habitude / En général", en: "Usually / In general", example: "D'habitude, je mange à midi." },
        { fr: "Quelquefois / Parfois", en: "Sometimes", example: "Parfois je fais du sport le matin." },
        { fr: "Tous les jours / Chaque jour", en: "Every day", example: "Je lis tous les jours avant de dormir." },
      ],
      quiz: [
        { question: "Comment dit-on 'I get up at 7am' ?", options: ["Je dors à 7h", "Je me lève à 7h", "Je me couche à 7h", "Je pars à 7h"], answer: 1 },
        { question: "Que signifie 'se détendre' ?", options: ["To work", "To sleep", "To relax", "To eat"], answer: 2 },
        { question: "Comment dit-on 'Usually' ?", options: ["Parfois", "Jamais", "D'habitude", "Toujours"], answer: 2 },
        { question: "Que signifie 'Se coucher' ?", options: ["To wake up", "To go to bed", "To get dressed", "To shower"], answer: 1 },
        { question: "Comment dit-on 'Every day' ?", options: ["Quelquefois", "Rarement", "Tous les jours", "De temps en temps"], answer: 2 },
      ],
    },
  ],
  B2: [
    {
      id: "b2-1",
      title: "Débattre et argumenter",
      subtitle: "Exprimer son opinion avec nuance",
      duration: "28 min",
      videoId: "isfhyO9ocyk",
      vocabulary: [
        { fr: "À mon avis…", en: "In my opinion…", example: "À mon avis, ce projet est trop risqué." },
        { fr: "Je suis d'accord / en désaccord", en: "I agree / disagree", example: "Je suis tout à fait d'accord avec toi." },
        { fr: "En revanche…", en: "On the other hand…", example: "Il est compétent, en revanche il est souvent en retard." },
        { fr: "Il faut souligner que…", en: "It should be noted that…", example: "Il faut souligner que les résultats sont positifs." },
        { fr: "Néanmoins / Cependant", en: "Nevertheless / However", example: "C'est une bonne idée, néanmoins le coût est élevé." },
        { fr: "Contrairement à…", en: "Contrary to…", example: "Contrairement à ce qu'on pense, c'est faisable." },
        { fr: "D'une part… d'autre part", en: "On one hand… on the other hand", example: "D'une part c'est utile, d'autre part c'est coûteux." },
        { fr: "En ce qui concerne…", en: "Regarding… / As for…", example: "En ce qui concerne le budget, il faut revoir les chiffres." },
        { fr: "Force est de constater que…", en: "One must acknowledge that…", example: "Force est de constater que les résultats s'améliorent." },
        { fr: "Quoi qu'il en soit…", en: "Be that as it may…", example: "Quoi qu'il en soit, une décision doit être prise." },
      ],
      quiz: [
        { question: "Que signifie 'À mon avis' ?", options: ["In your opinion", "In my opinion", "According to him", "In general"], answer: 1 },
        { question: "Comment dit-on 'On the other hand' ?", options: ["Néanmoins", "En revanche", "Cependant", "Pourtant"], answer: 1 },
        { question: "Que signifie 'Je suis d'accord' ?", options: ["I disagree", "I doubt", "I agree", "I wonder"], answer: 2 },
        { question: "Comment dit-on 'Contrary to what one thinks' ?", options: ["En ce qui concerne", "D'une part", "Contrairement à ce qu'on pense", "Quoi qu'il en soit"], answer: 2 },
        { question: "Que signifie 'Force est de constater' ?", options: ["It is impossible to see", "One must acknowledge", "It is possible", "One must forget"], answer: 1 },
      ],
    },
    {
      id: "b2-2",
      title: "Le subjonctif",
      subtitle: "Comprendre et maîtriser le subjonctif",
      duration: "30 min",
      videoId: "f6GhTfztmX0",
      vocabulary: [
        { fr: "Il faut que + subjonctif", en: "It is necessary that…", example: "Il faut que tu sois à l'heure." },
        { fr: "Je veux que + subjonctif", en: "I want (someone) to…", example: "Je veux qu'il vienne demain." },
        { fr: "Bien que + subjonctif", en: "Although…", example: "Bien qu'il soit fatigué, il travaille." },
        { fr: "Avant que + subjonctif", en: "Before…", example: "Dis-moi avant que je parte." },
        { fr: "Pour que + subjonctif", en: "In order that…", example: "Je t'explique pour que tu comprennes." },
        { fr: "À moins que + subjonctif", en: "Unless…", example: "On y va, à moins qu'il pleuve." },
        { fr: "Que tu sois / viennes", en: "That you are / come", example: "Je doute qu'il vienne à temps." },
        { fr: "Douter que + subjonctif", en: "To doubt that…", example: "Je doute qu'elle ait raison." },
        { fr: "Regretter que + subjonctif", en: "To regret that…", example: "Je regrette qu'il ne soit pas là." },
        { fr: "Vouloir que / Souhaiter que", en: "To want / wish that", example: "Je souhaite que vous réussissiez." },
      ],
      quiz: [
        { question: "Après 'Il faut que', quel mode utilise-t-on ?", options: ["L'indicatif", "L'infinitif", "Le subjonctif", "Le conditionnel"], answer: 2 },
        { question: "Que signifie 'Bien que' ?", options: ["Because", "Although", "In order that", "Before"], answer: 1 },
        { question: "Que signifie 'À moins que' ?", options: ["Unless", "After", "Before", "During"], answer: 0 },
        { question: "Quelle conjonction utilise le subjonctif ? 'Je pars ___ tu arrives.'", options: ["parce que", "avant que", "depuis que", "après que"], answer: 1, explanation: "'Avant que' exige toujours le subjonctif." },
        { question: "Forme correcte : 'Je veux que tu ___' (venir)", options: ["viens", "viendra", "viennes", "es venu"], answer: 2, explanation: "Au subjonctif : je vienne, tu viennes, il vienne…" },
      ],
    },
    {
      id: "b2-3",
      title: "Le conditionnel",
      subtitle: "Hypothèses, politesse et irréel",
      duration: "26 min",
      videoId: "o4Y7BHqHdys",
      vocabulary: [
        { fr: "Je voudrais…", en: "I would like… (polite)", example: "Je voudrais réserver une chambre." },
        { fr: "Si j'avais…, je ferais…", en: "If I had…, I would do…", example: "Si j'avais le temps, je voyagerais plus." },
        { fr: "Pourriez-vous… ?", en: "Could you… ?", example: "Pourriez-vous m'aider, s'il vous plaît ?" },
        { fr: "Ce serait bien si…", en: "It would be nice if…", example: "Ce serait bien si tu venais." },
        { fr: "À ta place, je…", en: "If I were you, I would…", example: "À ta place, je lui parlerais directement." },
        { fr: "Il aurait dû…", en: "He should have…", example: "Il aurait dû prévenir avant." },
        { fr: "Au cas où + conditionnel", en: "In case (+ conditional)", example: "Au cas où tu aurais besoin, appelle-moi." },
        { fr: "Aurait-il pu… ?", en: "Could he have… ?", example: "Aurait-il pu éviter cette situation ?" },
        { fr: "J'aimerais que…", en: "I would like (someone) to…", example: "J'aimerais que tu sois plus attentif." },
        { fr: "Sous condition que…", en: "On the condition that…", example: "J'accepte, sous condition que tu sois présent." },
      ],
      quiz: [
        { question: "Quel temps exprime une hypothèse ? 'Si j'avais de l'argent, je ___ une voiture.'", options: ["achète", "achetais", "achèterais", "achèterai"], answer: 2, explanation: "Si + imparfait → conditionnel présent." },
        { question: "Comment exprimer la politesse avec 'vouloir' ?", options: ["Je veux", "Je voulais", "Je voudrais", "Je voudrai"], answer: 2 },
        { question: "Que signifie 'À ta place, je' ?", options: ["In your place, I", "If I were you, I", "At your house, I", "For you, I"], answer: 1 },
        { question: "Comment dire 'He should have called' ?", options: ["Il doit appeler", "Il devait appeler", "Il aurait dû appeler", "Il appelait"], answer: 2 },
        { question: "Que signifie 'Ce serait bien' ?", options: ["That was good", "It would be nice", "It is good", "That will be good"], answer: 1 },
      ],
    },
    {
      id: "b2-4",
      title: "Exprimer la cause et la conséquence",
      subtitle: "Connecteurs logiques avancés",
      duration: "24 min",
      videoId: "on7uuwbAHPo",
      vocabulary: [
        { fr: "En raison de…", en: "Due to… / Because of…", example: "En raison des travaux, la route est fermée." },
        { fr: "Grâce à…", en: "Thanks to…", example: "Grâce à toi, j'ai réussi l'examen." },
        { fr: "C'est pourquoi…", en: "That is why…", example: "Il était absent, c'est pourquoi je l'ai appelé." },
        { fr: "Par conséquent…", en: "As a result… / Therefore…", example: "Il a plu, par conséquent le match est annulé." },
        { fr: "Puisque…", en: "Since… / Given that…", example: "Puisque tu es là, parlons-en maintenant." },
        { fr: "Faute de…", en: "For lack of…", example: "Faute de temps, il n'a pas pu finir." },
        { fr: "D'où…", en: "Hence… / That's why…", example: "Il ne dormait pas, d'où sa fatigue." },
        { fr: "Il s'ensuit que…", en: "It follows that…", example: "Les prix ont augmenté, il s'ensuit que la demande baisse." },
        { fr: "Si bien que…", en: "So much so that…", example: "Il travaille si bien que tout le monde l'apprécie." },
        { fr: "Tellement… que…", en: "So… that…", example: "Il était tellement fatigué qu'il s'est endormi." },
      ],
      quiz: [
        { question: "Que signifie 'Grâce à' ?", options: ["Despite", "Thanks to", "Due to", "Without"], answer: 1, explanation: "'Grâce à' indique une cause positive." },
        { question: "Comment dit-on 'Therefore / As a result' ?", options: ["Puisque", "Grâce à", "Par conséquent", "En raison de"], answer: 2 },
        { question: "Que signifie 'Faute de' ?", options: ["Thanks to", "For lack of", "Despite", "Because of"], answer: 1 },
        { question: "Quelle phrase exprime une conséquence ?", options: ["Puisqu'il pleut, on reste", "Il pleut, c'est pourquoi on reste", "Grâce à la pluie", "En raison du soleil"], answer: 1 },
        { question: "Que signifie 'Tellement fatigué qu'il dort' ?", options: ["Although tired, he sleeps", "So tired that he sleeps", "Because he sleeps, he is tired", "He is tired and sleeping"], answer: 1 },
      ],
    },
  ],
};

/* ─── Quiz Component ─────────────────────────────────── */
function QuizBlock({ quiz, lessonId }: { quiz: Lesson["quiz"]; lessonId: string }) {
  const storageKey = `ccmav-quiz-${lessonId}`;
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quiz.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState<number | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const { answers: a, submitted: s, score: sc } = JSON.parse(saved);
        setAnswers(a); setSubmitted(s); setScore(sc);
      }
    } catch { /* ignore */ }
  }, [storageKey]);

  function submit() {
    const sc = answers.reduce((acc, a, i) => acc + (a === quiz[i].answer ? 1 : 0), 0);
    setScore(sc); setSubmitted(true);
    localStorage.setItem(storageKey, JSON.stringify({ answers, submitted: true, score: sc }));
  }

  function reset() {
    setAnswers(Array(quiz.length).fill(null)); setSubmitted(false); setScore(0); setShowExplanation(null);
    localStorage.removeItem(storageKey);
  }

  return (
    <div className="space-y-4">
      {quiz.map((q, qi) => {
        const correct = answers[qi] === q.answer;
        return (
          <div key={qi} className={`rounded-xl border-2 p-4 transition-all ${submitted ? (correct ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50") : "border-gray-200 bg-white"}`}>
            <div className="flex items-start justify-between mb-3">
              <p className="font-semibold text-sm text-[#1a1a2e] flex-1">
                <span className="inline-flex w-6 h-6 rounded-full bg-[#1a1a2e] text-white text-xs items-center justify-center mr-2 flex-shrink-0">{qi + 1}</span>
                {q.question}
              </p>
              {submitted && (
                <span className="ml-2 text-lg">{correct ? "✅" : "❌"}</span>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options.map((opt, oi) => (
                <button key={oi} disabled={submitted} onClick={() => { const a = [...answers]; a[qi] = oi; setAnswers(a); }}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm border-2 transition-all font-medium
                    ${submitted && oi === q.answer ? "border-green-500 bg-green-100 text-green-800" : ""}
                    ${submitted && oi === answers[qi] && oi !== q.answer ? "border-red-400 bg-red-100 text-red-700 line-through" : ""}
                    ${!submitted && answers[qi] === oi ? "border-[#003087] bg-[#003087]/10 text-[#003087]" : ""}
                    ${!submitted && answers[qi] !== oi ? "border-gray-200 hover:border-[#003087]/50 hover:bg-gray-50 text-gray-700" : ""}
                  `}>
                  <span className="mr-2 opacity-50 text-xs">{String.fromCharCode(65 + oi)}.</span>{opt}
                </button>
              ))}
            </div>
            {submitted && q.explanation && (
              <button onClick={() => setShowExplanation(showExplanation === qi ? null : qi)} className="mt-2 text-xs text-[#003087] hover:underline flex items-center gap-1">
                💡 {showExplanation === qi ? "Masquer" : "Voir l'explication"}
              </button>
            )}
            {submitted && showExplanation === qi && q.explanation && (
              <p className="mt-2 text-xs text-gray-600 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 italic">{q.explanation}</p>
            )}
          </div>
        );
      })}

      {!submitted ? (
        <button onClick={submit} disabled={answers.includes(null)}
          className="w-full py-3.5 rounded-xl bg-[#003087] text-white font-bold text-sm hover:bg-[#002060] transition disabled:opacity-40 disabled:cursor-not-allowed">
          {answers.includes(null) ? `Répondez à toutes les questions (${answers.filter(a => a !== null).length}/${quiz.length})` : "✓ Valider mes réponses"}
        </button>
      ) : (
        <div className={`rounded-xl p-5 text-center border-2 ${score === quiz.length ? "bg-green-50 border-green-300" : score >= Math.ceil(quiz.length / 2) ? "bg-yellow-50 border-yellow-300" : "bg-red-50 border-red-300"}`}>
          <div className="text-4xl mb-2">{score === quiz.length ? "🏆" : score >= Math.ceil(quiz.length / 2) ? "👍" : "💪"}</div>
          <p className="text-2xl font-extrabold text-[#1a1a2e] mb-1">{score} / {quiz.length}</p>
          <p className="text-sm text-gray-600 mb-1">{score === quiz.length ? "Parfait ! Leçon maîtrisée !" : score >= Math.ceil(quiz.length / 2) ? "Bon travail, continuez !" : "Relisez le vocabulaire et réessayez !"}</p>
          <div className="flex justify-center gap-1 my-2">
            {quiz.map((_, i) => <span key={i} className={`w-3 h-3 rounded-full ${answers[i] === quiz[i].answer ? "bg-green-500" : "bg-red-400"}`} />)}
          </div>
          <button onClick={reset} className="mt-2 text-xs text-[#C8102E] hover:underline font-semibold">↺ Recommencer le quiz</button>
        </div>
      )}
    </div>
  );
}

/* ─── Lesson Modal ───────────────────────────────────── */
function LessonModal({ lesson, level, onClose }: { lesson: Lesson; level: Level; onClose: () => void }) {
  const [tab, setTab] = useState<"video" | "vocab" | "quiz">("video");
  const lvl = levels.find(l => l.code === level)!;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-5 py-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-full mb-1.5" style={{ background: lvl.bg, color: lvl.color, border: `1px solid ${lvl.border}` }}>
              {lvl.icon} Niveau {level} — {lvl.label}
            </span>
            <h2 className="text-xl font-extrabold text-[#1a1a2e] leading-tight">{lesson.title}</h2>
            <p className="text-sm text-gray-400 mt-0.5">{lesson.subtitle} · ⏱ {lesson.duration}</p>
          </div>
          <button onClick={onClose} className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition text-lg font-bold">×</button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 bg-gray-50">
          {(["video", "vocab", "quiz"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-3 text-sm font-bold transition-all border-b-2 ${tab === t ? "bg-white border-[#C8102E] text-[#C8102E]" : "border-transparent text-gray-400 hover:text-gray-700"}`}>
              {t === "video" ? "🎬 Vidéo" : t === "vocab" ? `📝 Vocabulaire (${lesson.vocabulary.length})` : `❓ Quiz (${lesson.quiz.length} q.)`}
            </button>
          ))}
        </div>

        <div className="p-5">
          {/* VIDEO */}
          {tab === "video" && (
            <div>
              <div className="rounded-xl overflow-hidden aspect-video bg-black mb-4 shadow">
                <iframe src={`https://www.youtube.com/embed/${lesson.videoId}?rel=0&modestbranding=1`}
                  title={lesson.title} className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
              <p className="text-xs text-gray-400 mb-4 text-center">📺 Vidéo sélectionnée par les formateurs CCMAV</p>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setTab("vocab")} className="py-2.5 rounded-xl bg-[#003087]/10 text-[#003087] text-sm font-bold hover:bg-[#003087]/20 transition">
                  📝 Vocabulaire →
                </button>
                <button onClick={() => setTab("quiz")} className="py-2.5 rounded-xl bg-[#C8102E]/10 text-[#C8102E] text-sm font-bold hover:bg-[#C8102E]/20 transition">
                  ❓ Faire le quiz →
                </button>
              </div>
            </div>
          )}

          {/* VOCABULARY */}
          {tab === "vocab" && (
            <div>
              <p className="text-sm text-gray-500 mb-4">{lesson.vocabulary.length} mots et expressions à retenir pour cette leçon :</p>
              <div className="space-y-2.5">
                {lesson.vocabulary.map((v, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 px-4 py-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#1a1a2e] text-sm">{v.fr}</span>
                      <span className="text-xs font-medium text-gray-400 bg-white px-2 py-0.5 rounded-full border border-gray-200">{v.en}</span>
                    </div>
                    {v.example && (
                      <p className="text-xs text-gray-500 italic">→ {v.example}</p>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={() => setTab("quiz")} className="mt-5 w-full py-3 rounded-xl bg-[#C8102E] text-white font-bold text-sm hover:bg-[#a50d26] transition">
                Je suis prêt(e) pour le quiz ! →
              </button>
            </div>
          )}

          {/* QUIZ */}
          {tab === "quiz" && (
            <div>
              <p className="text-sm text-gray-500 mb-4">Répondez à toutes les questions pour valider la leçon :</p>
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

  const refreshCompleted = () => {
    const completed = new Set<string>();
    Object.values(lessons).flat().forEach(l => {
      try {
        const data = localStorage.getItem(`ccmav-quiz-${l.id}`);
        if (data && JSON.parse(data).submitted) completed.add(l.id);
      } catch { /* ignore */ }
    });
    setCompletedLessons(completed);
  };

  useEffect(() => { refreshCompleted(); }, []);
  useEffect(() => { if (!openLesson) refreshCompleted(); }, [openLesson]);

  const currentLessons = lessons[selectedLevel];
  const lvl = levels.find(l => l.code === selectedLevel)!;
  const totalLessons = Object.values(lessons).flat().length;
  const progressPct = Math.round((completedLessons.size / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#C8102E] transition font-medium flex-shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Retour
          </Link>
          <div className="flex items-center gap-2">
            <Image src="/logo-ccma.png" alt="CCMAV" width={30} height={30} className="rounded-full" />
            <span className="font-extrabold text-[#1a1a2e] text-sm hidden sm:block">Cours de français — CCMAV</span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {completedLessons.size > 0 && (
              <div className="hidden sm:flex items-center gap-2 bg-[#006B3C]/10 px-3 py-1.5 rounded-full">
                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#006B3C] rounded-full transition-all" style={{ width: `${progressPct}%` }} />
                </div>
                <span className="text-xs font-bold text-[#006B3C]">{progressPct}%</span>
              </div>
            )}
            <span className="text-xs text-gray-400 font-medium whitespace-nowrap">{completedLessons.size}/{totalLessons} ✓</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Hero */}
        <div className="text-center mb-12">
          <span className="inline-block bg-[#C8102E]/10 text-[#C8102E] text-sm font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            🇫🇷 Plateforme d'apprentissage gratuite
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1a1a2e] mb-4 leading-tight">
            Apprendre le <span className="text-[#C8102E]">français</span><br className="hidden sm:block" /> en ligne
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto text-base leading-relaxed">
            Vidéos sélectionnées, vocabulaire illustré avec exemples et quiz interactifs — apprenez à votre rythme, gratuitement.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {[
              { icon: "🎬", val: `${totalLessons}`, label: "Leçons vidéo" },
              { icon: "📝", val: `${Object.values(lessons).flat().reduce((a, l) => a + l.vocabulary.length, 0)}`, label: "Expressions" },
              { icon: "❓", val: `${Object.values(lessons).flat().reduce((a, l) => a + l.quiz.length, 0)}`, label: "Questions de quiz" },
              { icon: "🏆", val: "100%", label: "Gratuit" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl mb-0.5">{s.icon}</div>
                <div className="text-2xl font-extrabold text-[#1a1a2e]">{s.val}</div>
                <div className="text-xs text-gray-400 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Level selector */}
        <div className="mb-10">
          <h2 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-4 text-center">Choisissez votre niveau</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {levels.map(l => {
              const done = lessons[l.code].filter(le => completedLessons.has(le.id)).length;
              const total = lessons[l.code].length;
              const selected = selectedLevel === l.code;
              return (
                <button key={l.code} onClick={() => setSelectedLevel(l.code)}
                  className={`rounded-2xl border-2 px-4 py-4 text-left transition-all hover:shadow-md ${selected ? "shadow-lg scale-[1.02]" : "bg-white hover:bg-gray-50"}`}
                  style={selected ? { borderColor: l.color, background: l.bg } : { borderColor: "#e5e7eb" }}>
                  <div className="text-2xl mb-1.5">{l.icon}</div>
                  <div className="font-extrabold text-lg text-[#1a1a2e]">{l.code}</div>
                  <div className="text-xs font-bold mb-0.5" style={{ color: l.color }}>{l.label}</div>
                  <div className="text-xs text-gray-400 mb-2">{l.desc}</div>
                  <div className="flex items-center gap-1.5">
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${(done / total) * 100}%`, backgroundColor: l.color }} />
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold">{done}/{total}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Lessons grid */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-extrabold text-[#1a1a2e]">
              <span style={{ color: lvl.color }}>{lvl.icon} {lvl.label}</span>
              <span className="text-gray-300 mx-2">·</span>
              <span className="text-gray-600 text-base font-semibold">Niveau {selectedLevel}</span>
            </h2>
            <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full font-medium">{currentLessons.length} leçons</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentLessons.map((lesson, idx) => {
              const done = completedLessons.has(lesson.id);
              return (
                <button key={lesson.id} onClick={() => setOpenLesson(lesson)}
                  className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm hover:shadow-xl transition-all text-left p-5 group relative overflow-hidden hover:-translate-y-0.5"
                  style={{ borderColor: done ? "#006B3C40" : undefined }}
                  onMouseEnter={e => { if (!done) e.currentTarget.style.borderColor = `${lvl.color}50`; }}
                  onMouseLeave={e => { if (!done) e.currentTarget.style.borderColor = "#e5e7eb"; }}>
                  {/* Top bar */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl" style={{ background: done ? "#006B3C" : `linear-gradient(90deg, ${lvl.color}, ${lvl.color}80)` }} />

                  <div className="flex items-start justify-between mb-3 pt-1">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-extrabold flex-shrink-0" style={{ background: done ? "#006B3C15" : lvl.bg, color: done ? "#006B3C" : lvl.color }}>
                      {done ? "✓" : idx + 1}
                    </div>
                    <div className="flex items-center gap-1.5 ml-2">
                      {done ? (
                        <span className="text-xs font-bold text-[#006B3C] bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">Complétée ✓</span>
                      ) : (
                        <span className="text-xs text-gray-300 font-medium">⏱ {lesson.duration}</span>
                      )}
                    </div>
                  </div>

                  <h3 className="font-extrabold text-[#1a1a2e] text-base mb-1 group-hover:text-[#C8102E] transition-colors">{lesson.title}</h3>
                  <p className="text-gray-500 text-xs mb-3">{lesson.subtitle}</p>

                  <div className="flex items-center gap-3 text-xs text-gray-300 border-t border-gray-100 pt-3">
                    <span className="flex items-center gap-1">🎬 Vidéo</span>
                    <span className="flex items-center gap-1">📝 {lesson.vocabulary.length} mots</span>
                    <span className="flex items-center gap-1">❓ {lesson.quiz.length} questions</span>
                  </div>

                  <div className="mt-3 flex items-center gap-1 text-xs font-bold opacity-0 group-hover:opacity-100 transition-all" style={{ color: lvl.color }}>
                    Commencer
                    <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Global progress */}
        {completedLessons.size > 0 && (
          <div className="mt-10 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="font-extrabold text-sm text-[#1a1a2e]">🏆 Ma progression globale</span>
              <span className="text-lg font-extrabold text-[#006B3C]">{progressPct}%</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
              <div className="h-full rounded-full bg-gradient-to-r from-[#006B3C] to-[#009450] transition-all duration-700" style={{ width: `${progressPct}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>{completedLessons.size} leçon{completedLessons.size > 1 ? "s" : ""} complétée{completedLessons.size > 1 ? "s" : ""}</span>
              <span>{totalLessons - completedLessons.size} restante{totalLessons - completedLessons.size > 1 ? "s" : ""}</span>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {levels.map(l => {
                const done = lessons[l.code].filter(le => completedLessons.has(le.id)).length;
                const total = lessons[l.code].length;
                return (
                  <div key={l.code} className="text-center p-2 rounded-xl" style={{ background: l.bg }}>
                    <div className="text-base mb-0.5">{l.icon}</div>
                    <div className="text-xs font-extrabold" style={{ color: l.color }}>{l.code}</div>
                    <div className="text-xs text-gray-500">{done}/{total}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-10 rounded-2xl p-8 text-center text-white" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #003087 100%)" }}>
          <p className="text-2xl font-extrabold mb-2">Besoin d'un cours en personne ?</p>
          <p className="text-blue-200 text-sm mb-5 max-w-sm mx-auto">Nos bénévoles offrent des cours de français gratuits au centre CCMAV à Laval.</p>
          <Link href="/#contact" className="inline-flex items-center gap-2 bg-[#C8102E] text-white font-bold px-7 py-3 rounded-xl hover:bg-[#a50d26] transition shadow-lg">
            📞 Contacter le centre →
          </Link>
        </div>
      </div>

      {openLesson && <LessonModal lesson={openLesson} level={selectedLevel} onClose={() => setOpenLesson(null)} />}
    </div>
  );
}
