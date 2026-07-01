import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { CertificatesSection } from "@/components/sections/CertificatesSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { BuildPhilosophySection } from "@/components/sections/BuildPhilosophySection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <div className="container" style={{ paddingTop: '16px' }}>
          <main>
            <HeroSection />
            <ProjectsSection />
            <CertificatesSection />
            <TechStackSection />
            <BuildPhilosophySection />
            <ContactSection />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
