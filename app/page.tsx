import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SignalsDashboard from "@/components/SignalsDashboard";
import HowItWorks from "@/components/HowItWorks";
import AntiExploitation from "@/components/AntiExploitation";
import Testimonials from "@/components/Testimonials";
import PricingSection from "@/components/PricingSection";
import TelegramCTA from "@/components/TelegramCTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <SignalsDashboard />
      <HowItWorks />
      <AntiExploitation />
      <Testimonials />
      <PricingSection />
      <TelegramCTA />
      <FAQ />
      <Footer />
    </main>
  );
}
