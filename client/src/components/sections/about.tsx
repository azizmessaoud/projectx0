import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Code2, Database, GraduationCap } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";
import { TextReveal } from "@/components/ui/text-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
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
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
            <TextReveal text="As a motivated Data Science Engineering student at ESPRIT, I am passionate about leveraging the power of data and AI to solve complex problems." />
            <TextReveal text="With a solid foundation in programming languages like Python, C++, and Java, along with growing expertise in Machine Learning and Deep Learning, I am actively seeking opportunities where I can apply my skills and continue to grow in the field." delay={0.5} />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <StatCard label="Expected Graduation" value={2027} delay={0.2} />
            <StatCard label="Years of Study" value={2} suffix="+" delay={0.4} />
            <StatCard label="Certifications" value={10} suffix="+" delay={0.6} />
            <StatCard label="Internships Completed" value={2} delay={0.8} />
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
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 360, transition: { duration: 0.5 } }}
                  className="px-3 py-1 bg-white/5 rounded-full text-sm border border-white/5 hover:border-primary/30 transition-colors cursor-pointer inline-block"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </TiltCard>
          
          <TiltCard className="p-6 glass-card rounded-2xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Brain className="text-secondary" /> Areas of Interest
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Machine Learning & Deep Learning</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Natural Language Processing (NLP)</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Computer Vision</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Predictive Analytics</li>
            </ul>
          </TiltCard>
        </div>
      </div>
    </Section>
  );
}
