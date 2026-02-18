import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PlanningCTA from "@/components/PlanningCTA";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <PlanningCTA />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
