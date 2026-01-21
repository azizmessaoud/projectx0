import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define background colors/gradients for each section
const sectionColors: Record<string, string> = {
  hero: "from-[#0a1929] via-[#0d2137] to-[#0a1929]",
  about: "from-[#0a1929] via-[#0f1b2d] to-[#0a1929]",
  personality: "from-[#0d1f33] via-[#0a1929] to-[#0d1f33]",
  experience: "from-[#0a1929] via-[#1a0f2e] to-[#0a1929]",
  "how-i-work": "from-[#120f24] via-[#0d1f33] to-[#120f24]",
  projects: "from-[#0a1929] via-[#0f2235] to-[#0a1929]",
  volunteering: "from-[#0d2137] via-[#0a1929] to-[#0d2137]",
  certifications: "from-[#0a1929] via-[#1a0f2e] to-[#0a1929]",
  contact: "from-[#120f24] via-[#0a1929] to-[#120f24]",
};

// Accent colors that add a subtle glow for each section
const sectionAccents: Record<string, string> = {
  hero: "rgba(59, 130, 246, 0.05)",
  about: "rgba(139, 92, 246, 0.04)",
  personality: "rgba(91, 33, 182, 0.05)",
  experience: "rgba(59, 130, 246, 0.06)",
  "how-i-work": "rgba(139, 92, 246, 0.05)",
  projects: "rgba(6, 182, 212, 0.04)",
  volunteering: "rgba(34, 197, 94, 0.04)",
  certifications: "rgba(139, 92, 246, 0.05)",
  contact: "rgba(59, 130, 246, 0.05)",
};

export function SectionBackground() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to ensure sections are mounted
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    const sectionIds = [
      "hero",
      "about", 
      "personality",
      "experience",
      "how-i-work",
      "projects",
      "volunteering",
      "certifications",
      "contact",
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const currentGradient = sectionColors[activeSection] || sectionColors.hero;
  const currentAccent = sectionAccents[activeSection] || sectionAccents.hero;

  return (
    <>
      {/* Main gradient background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          className={`fixed inset-0 -z-20 bg-gradient-to-br ${currentGradient}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Accent glow overlay */}
      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none"
        animate={{
          background: `radial-gradient(ellipse 80% 50% at 50% 50%, ${currentAccent}, transparent)`,
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      {/* Subtle noise texture overlay */}
      <div 
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
}
