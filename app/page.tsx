import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AppointmentsSection from "@/components/AppointmentsSection";
import FlightsSection from "@/components/FlightsSection";
import CountryGuide from "@/components/CountryGuide";
import BlogSection from "@/components/BlogSection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <AppointmentsSection />
      <FlightsSection />
      <CountryGuide />
      <BlogSection />
      <FAQ />
      <Footer />
    </main>
  );
}
