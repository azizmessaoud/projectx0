import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Personality } from "@/components/sections/personality";
import { Experience } from "@/components/sections/experience";
import { HowIWork } from "@/components/sections/how-i-work";
import { Projects } from "@/components/sections/projects";
import { Volunteering } from "@/components/sections/volunteering";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { HeroBackground } from "@/components/ui/hero-background";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { BackToTop } from "@/components/ui/back-to-top";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-secondary/30 relative z-10">
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <HeroBackground />
      <BackToTop />
      
      <Navbar />
      <Hero />
      <About />
      <Personality />
      <Experience />
      <HowIWork />
      <Projects />
      <Volunteering />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}
