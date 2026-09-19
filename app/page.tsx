import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { CapabilitiesSectionAccordion } from "@/components/landing/capabilities-section-accordion";
import { SolutionsSectionAccordion } from "@/components/landing/solutions-section-accordion";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { InfrastructureSection } from "@/components/landing/infrastructure-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { SecuritySection } from "@/components/landing/security-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <CapabilitiesSectionAccordion />
      <SolutionsSectionAccordion />
      <HowItWorksSection />
      <InfrastructureSection />
      <IntegrationsSection />
      <SecuritySection />
      <TestimonialsSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
