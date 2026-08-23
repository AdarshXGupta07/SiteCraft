import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/hero/Hero";
import ValueProps from "@/components/sections/ValueProps";
import IndustryCarousel from "@/components/sections/IndustryCarousel";
import Process from "@/components/sections/Process";
import Portfolio from "@/components/sections/Portfolio";
import Contact from "@/components/sections/Contact";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";

export default function Home() {
  return (
    <>
      <Nav />
      <ScrollProgressBar />
      <main>
        <Hero />
        <ValueProps />
        <IndustryCarousel />
        <Process />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
