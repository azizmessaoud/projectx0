import { Section } from "@/components/ui/section";
import { TiltCard } from "@/components/ui/tilt-card";
import { motion } from "framer-motion";
import { Brain, Lightbulb, Languages, GraduationCap, Code, Sparkles } from "lucide-react";

const funFacts = [
  {
    icon: GraduationCap,
    title: "4th Year Student",
    description: "Currently pursuing Data Science Engineering at ESPRIT"
  },
  {
    icon: Code,
    title: "Algorithm Enthusiast",
    description: "Love solving complex algorithmic challenges"
  },
  {
    icon: Languages,
    title: "Multilingual",
    description: "Fluent in Arabic, French & English"
  },
  {
    icon: Sparkles,
    title: "Lifelong Learner",
    description: "Always exploring new technologies and frameworks"
  }
];

export function Personality() {
  return (
    <Section id="personality" className="relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3 text-white">
            <motion.span
              className="text-3xl"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              🧠
            </motion.span>
            <span>Who I Am</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Beyond the code and data - a glimpse into my personality and what drives me
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group"
          >
            <TiltCard className="p-8 glass-card rounded-2xl h-full relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30 group-hover:border-primary/60 transition-all"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Brain className="w-8 h-8 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">INTJ</h3>
                    <p className="text-muted-foreground">The Architect</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  As an INTJ, I'm a strategic problem solver who thrives on turning complex challenges 
                  into elegant solutions. I approach data science with both analytical precision and 
                  creative innovation.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Strategic Thinker", "Independent", "Curious", "Determined"].map((trait, i) => (
                    <motion.span
                      key={trait}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-3 py-1 bg-primary/10 rounded-full text-sm border border-primary/20 text-primary hover:border-primary/50 hover:shadow-[0_0_12px_rgba(139,92,246,0.4)] transition-all cursor-default"
                    >
                      {trait}
                    </motion.span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group"
          >
            <TiltCard className="p-8 glass-card rounded-2xl h-full relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center border border-secondary/30 group-hover:border-secondary/60 transition-all"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <Lightbulb className="w-8 h-8 text-secondary" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold group-hover:text-secondary transition-colors">My Philosophy</h3>
                    <p className="text-muted-foreground">How I Approach Problems</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I believe in the power of data to transform decisions and create impact. Every dataset 
                  tells a story, and my mission is to uncover those insights and translate them into 
                  actionable solutions.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Data-Driven", "Detail-Oriented", "Results-Focused", "Innovative"].map((trait, i) => (
                    <motion.span
                      key={trait}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-3 py-1 bg-secondary/10 rounded-full text-sm border border-secondary/20 text-secondary hover:border-secondary/50 hover:shadow-[0_0_12px_rgba(59,130,246,0.4)] transition-all cursor-default"
                    >
                      {trait}
                    </motion.span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {funFacts.map((fact, index) => (
            <motion.div
              key={fact.title}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
            >
              <TiltCard className="p-6 glass-card rounded-xl h-full group hover:border-primary/30 transition-all">
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-4 border border-white/5 group-hover:border-primary/20"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <fact.icon className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
                </motion.div>
                <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">{fact.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{fact.description}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
