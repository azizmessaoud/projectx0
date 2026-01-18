import { Section } from "@/components/ui/section";
import { TiltCard } from "@/components/ui/tilt-card";
import { motion } from "framer-motion";

const experiences = [
  {
    role: "AI Intern",
    company: "Sopra HR Software",
    date: "July 2025 - August 2025",
    location: "Tunisia",
    description: "Working on AI-powered HR solutions, implementing machine learning models, and contributing to data-driven decision-making processes.",
    skills: ["Python", "Machine Learning", "AI", "Data Analysis"]
  },
  {
    role: "IT Maintenance Intern",
    company: "Banque de Tunisie",
    date: "June 2023",
    location: "Tunis, Tunisia",
    description: "Gained hands-on experience in IT maintenance, diagnosed and resolved IT issues, installed hardware, deployed Windows using SCCM, and managed hardware inventory.",
    skills: ["IT Support", "Hardware", "Windows", "SCCM"]
  }
];

export function Experience() {
  return (
    <Section id="experience">
      <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Experience</h2>
      <div className="relative max-w-3xl mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 hidden md:block" />
        
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:text-right" : "md:flex-row-reverse"}`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-[5px] md:-translate-x-1/2 top-1.5 hidden md:block shadow-[0_0_10px_rgba(var(--color-primary),0.5)] animate-pulse" />
              
              <div className={`flex-1 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <TiltCard className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-colors">
                  <span className="text-primary font-mono text-sm mb-2 block">{exp.date}</span>
                  <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                  <div className="text-muted-foreground mb-4">{exp.company} • {exp.location}</div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {exp.description}
                  </p>
                  <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                    {exp.skills.map(skill => (
                      <span key={skill} className="px-2 py-1 bg-white/5 rounded text-xs border border-white/5">
                        {skill}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              </div>
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
