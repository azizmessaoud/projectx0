import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Code2, Database, GraduationCap } from "lucide-react";

export function About() {
  return (
    <Section id="about" className="relative">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
            <p>
              As a motivated Data Science Engineering student at ESPRIT, I am passionate about 
              leveraging the power of data and AI to solve complex problems.
            </p>
            <p>
              With a solid foundation in programming languages like Python, C++, and Java, 
              along with growing expertise in Machine Learning and Deep Learning, I am actively 
              seeking opportunities where I can apply my skills and continue to grow in the field.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <h3 className="text-3xl font-bold text-primary mb-1">2027</h3>
              <p className="text-sm text-muted-foreground">Expected Graduation</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <h3 className="text-3xl font-bold text-primary mb-1">2+</h3>
              <p className="text-sm text-muted-foreground">Years of Study</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <h3 className="text-3xl font-bold text-primary mb-1">10+</h3>
              <p className="text-sm text-muted-foreground">Certifications</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <h3 className="text-3xl font-bold text-primary mb-1">2</h3>
              <p className="text-sm text-muted-foreground">Internships Completed</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="p-6 glass-card rounded-2xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Code2 className="text-secondary" /> Technical Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Python", "C++", "Java", "TensorFlow", "PyTorch", "Scikit-learn", "SQL", "Git", "Docker"].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-white/5 rounded-full text-sm border border-white/5 hover:border-primary/30 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="p-6 glass-card rounded-2xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Brain className="text-secondary" /> Areas of Interest
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Machine Learning & Deep Learning</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Natural Language Processing (NLP)</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Computer Vision</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Predictive Analytics</li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
