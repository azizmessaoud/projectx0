import { Section } from "@/components/ui/section";
import { Github, ExternalLink, RotateCcw } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import { motion } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    title: "ClusterCrew Analytics",
    description: "Interactive healthcare analytics dashboard and BI presentation.",
    detailedDescription: "A comprehensive healthcare analytics platform featuring interactive dashboards, real-time data visualization, and business intelligence reporting for healthcare professionals.",
    tech: ["PowerBI", "Data Visualization", "Analytics", "Healthcare BI", "Dashboard Design"],
    links: {
      demo: "https://clustercrew-analytics.onrender.com/overview",
      presentation: "https://www.canva.com/design/DAG2umiwwmA/9XGhwnkapx-IqTNMT1k8Dg/edit"
    }
  },
  {
    title: "InnoTravel",
    description: "Multi-platform travel management system built with Java and JavaFX.",
    detailedDescription: "A full-stack travel management solution enabling users to plan, book, and manage trips across multiple platforms with seamless synchronization and user-friendly interfaces.",
    tech: ["JavaFX", "Java", "Full-stack", "Symfony", "MySQL", "REST API"],
    links: {
      github: "https://github.com/oumaymasaddouri/InnoTravel-PiDev-Symfony.git"
    }
  },
  {
    title: "Smart Nautical Sports Club",
    description: "Qt/C++ desktop management system for club operations.",
    detailedDescription: "A robust desktop application for managing nautical sports club operations including member management, equipment tracking, event scheduling, and financial reporting.",
    tech: ["C++", "Qt", "Desktop", "SQLite", "UI/UX Design", "OOP"],
    links: {
      github: "https://github.com/2A1-CPP-Project-23-24/2a1-smart-nautical-sports-club.git"
    }
  }
];

export function Projects() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (index: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <Section id="projects">
      <h2 className="text-3xl md:text-5xl font-bold mb-12">Featured Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{ perspective: "1000px" }}
          >
            <TiltCard className="h-[320px]">
              <div
                onClick={() => toggleFlip(index)}
                className="relative w-full h-full cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: flippedCards[index] ? "rotateY(180deg)" : "rotateY(0deg)"
                }}
                data-testid={`card-project-${index}`}
              >
                {/* Front Side */}
                <div
                  className="absolute inset-0 glass-card p-6 rounded-2xl flex flex-col hover:shadow-[0_0_30px_rgba(var(--color-primary),0.15)] transition-shadow"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="mb-4 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold hover:text-primary transition-colors">{project.title}</h3>
                      <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                        {project.links.github && (
                          <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:scale-110 transform duration-200">
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                        {(project.links.demo || project.links.presentation) && (
                          <a href={project.links.demo || project.links.presentation} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:scale-110 transform duration-200">
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map(t => (
                      <span key={t} className="text-xs font-mono text-secondary px-2 py-1 bg-secondary/10 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-muted-foreground opacity-60">
                    <RotateCcw className="w-3 h-3" />
                    <span>Click to flip</span>
                  </div>
                </div>

                {/* Back Side */}
                <div
                  className="absolute inset-0 glass-card p-6 rounded-2xl flex flex-col bg-card/50 backdrop-blur-lg border border-secondary/20"
                  style={{ 
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)"
                  }}
                >
                  <h3 className="text-lg font-bold text-primary mb-3">{project.title}</h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {project.detailedDescription}
                  </p>
                  
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-secondary mb-2">Technologies:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map(t => (
                        <span key={t} className="text-xs font-mono text-secondary px-2 py-0.5 bg-secondary/10 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-auto" onClick={(e) => e.stopPropagation()}>
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-secondary/50 transition-all text-sm font-medium"
                        data-testid={`button-github-${index}`}
                      >
                        <Github className="w-4 h-4" />
                        View Code
                      </a>
                    )}
                    {(project.links.demo || project.links.presentation) && (
                      <a
                        href={project.links.demo || project.links.presentation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-secondary/20 border border-secondary/30 hover:bg-secondary/30 transition-all text-sm font-medium text-secondary"
                        data-testid={`button-demo-${index}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Project
                      </a>
                    )}
                  </div>
                  
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-muted-foreground opacity-60">
                    <RotateCcw className="w-3 h-3" />
                    <span>Click to flip back</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
