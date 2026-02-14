import HeroSection from "@/components/home/HeroSection";
import DemoSection from "@/components/home/DemoSection";
import StepsSection from "@/components/home/StepsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FinalCTA from "@/components/home/FinalCTA";
import TrustSection from "@/components/home/TrustSection";
import FeaturesSection from "@/components/home/FeaturesSection";


export default function HomePage() {
  return (
    <>
      <HeroSection />
      
      <DemoSection />
      <StepsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <FinalCTA />
       <TrustSection />
      

    </>
  );
}
