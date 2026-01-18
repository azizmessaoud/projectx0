import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Certifications />
      <Contact />
      
      <footer className="py-8 text-center text-muted-foreground border-t border-white/5 text-sm">
        <div className="container mx-auto px-4">
          © {new Date().getFullYear()} Aziz Messaoud. Built with React & Tailwind.
        </div>
      </footer>
    </div>
  );
}
