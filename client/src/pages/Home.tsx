/*
 * Home - ProFence
 * Design: Modern Terrain — Contemporary Brutalist-Organic Hybrid
 * Sections: Hero → Services → Gallery → About → Testimonials → Booking → Contact/Footer
 */

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Process from "@/components/Process";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import ContactFooter from "@/components/ContactFooter";
import FloatingActions from "@/components/FloatingActions";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-parchment)" }}>
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Gallery />
      <About />
      <Testimonials />
      <ContactFooter />
      <FloatingActions />
    </div>
  );
}
