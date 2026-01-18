import { Section } from "@/components/ui/section";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "ClusterCrew Analytics",
    description: "Interactive healthcare analytics dashboard and BI presentation.",
    tech: ["PowerBI", "Data Visualization", "Analytics"],
    links: {
      demo: "https://clustercrew-analytics.onrender.com/overview",
      presentation: "https://www.canva.com/design/DAG2umiwwmA/9XGhwnkapx-IqTNMT1k8Dg/edit"
    }
  },
  {
    title: "InnoTravel",
    description: "Multi-platform travel management system built with Java and JavaFX.",
    tech: ["JavaFX", "Java", "Full-stack"],
    links: {
      github: "https://github.com/oumaymasaddouri/InnoTravel-PiDev-Symfony.git"
    }
  },
  {
    title: "Smart Nautical Sports Club",
    description: "Qt/C++ desktop management system for club operations.",
    tech: ["C++", "Qt", "Desktop"],
    links: {
      github: "https://github.com/2A1-CPP-Project-23-24/2a1-smart-nautical-sports-club.git"
    }
  }
];

export function Projects() {
  return (
    <Section id="projects">
      <h2 className="text-3xl md:text-5xl font-bold mb-12">Featured Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="group glass-card p-6 rounded-2xl flex flex-col h-full hover:shadow-[0_0_30px_rgba(var(--color-primary),0.15)] transition-all">
            <div className="mb-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                <div className="flex gap-3">
                  {project.links.github && (
                    <a href={project.links.github} target="_blank" className="hover:text-primary transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {(project.links.demo || project.links.presentation) && (
                    <a href={project.links.demo || project.links.presentation} target="_blank" className="hover:text-primary transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {project.description}
              </p>
            </div>
            
            <div className="mt-auto pt-4 border-t border-white/5 flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="text-xs font-mono text-secondary">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
