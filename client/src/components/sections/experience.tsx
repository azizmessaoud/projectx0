import { Section } from "@/components/ui/section";
import { TiltCard } from "@/components/ui/tilt-card";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

const cardVariants = {
  hidden: (isEven: boolean) => ({
    opacity: 0,
    x: isEven ? -50 : 50,
    filter: "blur(10px)"
  }),
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)"
  }
};

const dotVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <Section id="experience">
      <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Experience</h2>
      <div className="relative max-w-3xl mx-auto" ref={containerRef}>
        {/* Animated Timeline Line */}
        <div className="absolute left-[7px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] overflow-hidden">
          <motion.div 
            className="w-full h-full"
            style={{
              background: "linear-gradient(180deg, #3b82f6 0%, #5b21b6 100%)"
            }}
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : { height: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <div 
            className="absolute inset-0 opacity-50"
            style={{
              background: "linear-gradient(180deg, #3b82f6 0%, #5b21b6 100%)",
              filter: "blur(4px)"
            }}
          />
        </div>
        
        <div className="space-y-12 md:space-y-16">
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={index} 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                custom={isEven}
                variants={cardVariants}
                className={`relative flex flex-row md:flex-row gap-6 md:gap-8 pl-10 md:pl-0 ${isEven ? "md:text-right" : "md:flex-row-reverse"}`}
              >
                {/* Timeline Dot with Pulsing Glow */}
                <motion.div 
                  className="absolute left-0 md:left-1/2 w-4 h-4 md:-translate-x-1/2 top-2 z-10"
                  variants={dotVariants}
                  initial="initial"
                  animate="animate"
                >
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #3b82f6 0%, #5b21b6 100%)",
                      boxShadow: "0 0 15px rgba(59, 130, 246, 0.6), 0 0 30px rgba(91, 33, 182, 0.4)"
                    }}
                  />
                  <motion.div 
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #3b82f6 0%, #5b21b6 100%)"
                    }}
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>

                {/* Connector Line from Dot to Card */}
                <motion.div 
                  className={`absolute top-[14px] h-[2px] hidden md:block ${
                    isEven ? "right-1/2 mr-[8px] w-8" : "left-1/2 ml-[8px] w-8"
                  }`}
                  style={{
                    background: "linear-gradient(90deg, rgba(59, 130, 246, 0.5), rgba(91, 33, 182, 0.3))"
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
                />

                {/* Mobile Connector Line */}
                <motion.div 
                  className="absolute left-[15px] top-[14px] h-[2px] w-6 md:hidden"
                  style={{
                    background: "linear-gradient(90deg, rgba(59, 130, 246, 0.5), rgba(91, 33, 182, 0.3))"
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
                />
                
                <div className={`flex-1 ${isEven ? "md:pr-12" : "md:pl-12"}`}>
                  <TiltCard className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                    <span className="text-primary font-mono text-sm mb-2 block">{exp.date}</span>
                    <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                    <div className="text-muted-foreground mb-4">{exp.company} • {exp.location}</div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {exp.description}
                    </p>
                    <div className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end" : ""}`}>
                      {exp.skills.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-white/5 rounded text-xs border border-white/5 hover:border-secondary/30 transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </TiltCard>
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
