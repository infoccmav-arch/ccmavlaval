import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FlagsBanner from "@/components/FlagsBanner";
import Services from "@/components/Services";
import Activites from "@/components/Activites";
import Apropos from "@/components/Apropos";
import Soutenir from "@/components/Soutenir";
import Temoignages from "@/components/Temoignages";
import Contact from "@/components/Contact";
import Rejoindre from "@/components/Rejoindre";
import Partenaires from "@/components/Partenaires";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <FlagsBanner />
        <Services />
        <Activites />
        <Apropos />
        <Soutenir />
        <Temoignages />
        <Partenaires />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
