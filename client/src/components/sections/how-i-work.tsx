import { Section } from "@/components/ui/section";
import { TiltCard } from "@/components/ui/tilt-card";
import { motion } from "framer-motion";
import { Search, Code2, FlaskConical, Rocket } from "lucide-react";

const workSteps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Analysis",
    description: "Understand your goals, data landscape, and challenges. I conduct thorough exploratory analysis to identify opportunities and define clear objectives."
  },
  {
    number: "02",
    icon: Code2,
    title: "Design & Development",
    description: "Build robust ML models and data pipelines. I create scalable, maintainable solutions tailored to your specific requirements and constraints."
  },
  {
    number: "03",
    icon: FlaskConical,
    title: "Testing & Optimization",
    description: "Validate performance rigorously. I ensure accuracy, efficiency, and reliability through comprehensive testing and continuous optimization."
  },
  {
    number: "04",
    icon: Rocket,
    title: "Deployment & Support",
    description: "Launch solutions into production and provide ongoing support. I ensure smooth integration, monitoring, and maintenance for long-term success."
  }
];

export function HowIWork() {
  return (
    <Section id="how-i-work" className="relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How I Work</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My proven approach to delivering results
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <TiltCard className="p-6 glass-card rounded-2xl h-full group relative overflow-hidden">
                <div className="absolute top-4 right-4 text-6xl font-bold text-white/5 group-hover:text-primary/10 transition-colors">
                  {step.number}
                </div>
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all border border-primary/20">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
