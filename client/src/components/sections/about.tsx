import { Section } from "@/components/ui/section";
import { TiltCard } from "@/components/ui/tilt-card";
import { Brain, Code2, Database } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";
import { TextReveal } from "@/components/ui/text-reveal";
import { motion } from "framer-motion";

function StatCard({ label, value, suffix = "", delay = 0 }: { label: string, value: number, suffix?: string, delay?: number }) {
  const count = useCountUp(value, 2, delay);
  return (
    <TiltCard className="p-4 bg-white/5 rounded-xl border border-white/5">
      <h3 className="text-3xl font-bold text-primary mb-1">
        {count}{suffix}
      </h3>
      <p className="text-sm text-muted-foreground">{label}</p>
    </TiltCard>
  );
}

export function About() {
  return (
    <Section id="about" className="relative">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-2">
              <motion.span 
                className="text-2xl"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                📊
              </motion.span>
              About Me
            </h2>
            <div className="space-y-4 text-muted-foreground text-base leading-relaxed max-w-[65ch]">
              <TextReveal text="As a motivated Data Science Engineering student at ESPRIT, I am passionate about leveraging the power of data and AI to solve complex problems." />
              <TextReveal 
                text="With a solid foundation in programming languages like Python, C++, and Java, along with growing expertise in Machine Learning and Deep Learning, I am actively seeking opportunities where I can apply my skills and continue to grow in the field." 
                delay={0.3} 
              />
              <TextReveal 
                text="I thrive on transforming raw data into actionable insights that drive real-world impact." 
                delay={0.6} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Expected Graduation" value={2027} delay={0.8} />
            <StatCard label="Years of Study" value={2} suffix="+" delay={1.0} />
            <StatCard label="Certifications" value={10} suffix="+" delay={1.2} />
            <StatCard label="Internships" value={2} delay={1.4} />
          </div>
        </div>

        <div className="grid gap-4">
          <TiltCard className="p-6 glass-card rounded-2xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Code2 className="text-secondary" /> Technical Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Python", "C++", "Java", "TensorFlow", "PyTorch", "Scikit-learn", "SQL", "Git", "Docker"].map((tech, i) => (
                <motion.span 
                  key={tech} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ 
                    scale: 1.08, 
                    y: -4,
                    transition: { duration: 0.2, type: "spring", stiffness: 300 } 
                  }}
                  className="tech-chip px-3 py-1.5 bg-white/5 rounded-full text-sm border border-white/5 hover:border-primary/50 hover:bg-primary/10 hover:shadow-[0_0_16px_rgba(139,92,246,0.4)] transition-all inline-block relative group"
                  data-cursor-magnetic
                >
                  <span className="relative z-10">{tech}</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </motion.span>
              ))}
            </div>
          </TiltCard>
          
          <TiltCard className="p-6 glass-card rounded-2xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Brain className="text-secondary" /> Areas of Interest
            </h3>
            <ul className="space-y-2.5 text-muted-foreground">
              {[
                "Machine Learning & Deep Learning",
                "Natural Language Processing (NLP)",
                "Computer Vision",
                "Predictive Analytics"
              ].map((interest, i) => (
                <motion.li 
                  key={interest}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-150 group-hover:shadow-[0_0_8px_rgba(139,92,246,0.8)] transition-all" /> 
                  <span className="group-hover:text-foreground group-hover:translate-x-1 transition-all">{interest}</span>
                </motion.li>
              ))}
            </ul>
          </TiltCard>
        </div>
      </div>
    </Section>
  );
}
