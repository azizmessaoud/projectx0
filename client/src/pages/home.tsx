import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { NeuralBackground } from "@/components/ui/neural-background";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { CustomCursor } from "@/components/ui/custom-cursor";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-secondary/30 relative">
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <NeuralBackground />
      
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Certifications />
      <Contact />
      
      <footer className="py-8 text-center text-muted-foreground border-t border-white/5 text-sm glass relative z-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            © {new Date().getFullYear()} Aziz Messaoud.
          </div>
          <div className="flex gap-6">
             <a href="#projects" className="hover:text-secondary transition-colors">Projects</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
