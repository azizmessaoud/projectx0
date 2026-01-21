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
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const toggleFlip = (index: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <Section id="projects">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center gap-3 text-white">
          <motion.span
            className="text-3xl"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            💻
          </motion.span>
          <span>Featured Projects</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl">
          A selection of my recent work showcasing full-stack development, data visualization, and problem-solving
        </p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
            style={{ perspective: "1500px" }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <TiltCard className="h-[340px]">
              <div
                onClick={() => toggleFlip(index)}
                className="relative w-full h-full cursor-pointer group"
                style={{
                  transformStyle: "preserve-3d",
                  transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: flippedCards[index] ? "rotateY(180deg)" : "rotateY(0deg)"
                }}
                data-testid={`card-project-${index}`}
              >
                {/* Front Side */}
                <div
                  className="absolute inset-0 glass-card p-6 rounded-2xl flex flex-col hover:shadow-[0_0_40px_rgba(139,92,246,0.2)] transition-all border border-white/5 hover:border-primary/30"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="mb-4 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <motion.h3 
                        className="text-xl font-bold transition-colors"
                        animate={{ 
                          color: hoveredCard === index ? 'rgb(139, 92, 246)' : 'inherit'
                        }}
                      >
                        {project.title}
                      </motion.h3>
                      <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                        {project.links.github && (
                          <motion.a 
                            href={project.links.github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:text-primary transition-colors"
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Github className="w-5 h-5" />
                          </motion.a>
                        )}
                        {(project.links.demo || project.links.presentation) && (
                          <motion.a 
                            href={project.links.demo || project.links.presentation} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:text-primary transition-colors"
                            whileHover={{ scale: 1.15, rotate: -5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ExternalLink className="w-5 h-5" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((t, i) => (
                      <motion.span 
                        key={t} 
                        className="text-xs font-mono text-secondary px-2 py-1 bg-secondary/10 rounded border border-secondary/20 hover:border-secondary/40 transition-colors"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                        whileHover={{ y: -3, scale: 1.05 }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                  
                  <motion.div 
                    className="absolute bottom-3 right-3 flex items-center gap-1.5 text-xs text-muted-foreground bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredCard === index && !flippedCards[index] ? 1 : 0,
                      scale: hoveredCard === index && !flippedCards[index] ? 1 : 0.9
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="font-medium">Click to flip</span>
                  </motion.div>
                </div>

                {/* Back Side */}
                <div
                  className="absolute inset-0 glass-card p-6 rounded-2xl flex flex-col bg-card/60 backdrop-blur-lg border-2 border-secondary/30"
                  style={{ 
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)"
                  }}
                >
                  <h3 className="text-lg font-bold text-primary mb-3 flex items-center justify-between">
                    {project.title}
                    <motion.div
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                      className="cursor-pointer"
                      onClick={(e) => { e.stopPropagation(); toggleFlip(index); }}
                    >
                      <RotateCcw className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {project.detailedDescription}
                  </p>
                  
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-secondary mb-2">Technologies:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t, i) => (
                        <motion.span 
                          key={t} 
                          className="text-xs font-mono text-secondary px-2 py-0.5 bg-secondary/10 rounded border border-secondary/20"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-auto" onClick={(e) => e.stopPropagation()}>
                    {project.links.github && (
                      <motion.a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white/5 border border-white/10 hover:bg-primary/10 hover:border-primary/50 hover:shadow-[0_0_16px_rgba(139,92,246,0.3)] transition-all text-sm font-medium"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        data-testid={`button-github-${index}`}
                      >
                        <Github className="w-4 h-4" />
                        View Code
                      </motion.a>
                    )}
                    {(project.links.demo || project.links.presentation) && (
                      <motion.a
                        href={project.links.demo || project.links.presentation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-primary/20 border border-primary/30 hover:bg-primary/30 hover:border-primary/50 hover:shadow-[0_0_16px_rgba(139,92,246,0.4)] transition-all text-sm font-medium"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        data-testid={`button-demo-${index}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        {project.links.demo ? 'Live Demo' : 'Presentation'}
                      </motion.a>
                    )}
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
