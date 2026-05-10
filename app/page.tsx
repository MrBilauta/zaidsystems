import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ArchitectureSection } from "@/components/sections/ArchitectureSection";
import { MetricsSection } from "@/components/sections/MetricsSection";
import { NowBuildingSection } from "@/components/sections/NowBuildingSection";
import { TerminalSection } from "@/components/sections/TerminalSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { InsightsSection } from "@/components/sections/InsightsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <NowBuildingSection />
      <TechStackSection />
      <MetricsSection />
      <ProjectsSection />
      <ArchitectureSection />
      <TerminalSection />
      <ExperienceSection />
      <InsightsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
