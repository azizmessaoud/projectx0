import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, FileText, Code2, Database, Terminal } from "lucide-react";
import heroBg from "@assets/generated_images/abstract_dark_data_science_background_with_nodes_and_connections.png";
import { TextReveal } from "@/components/ui/text-reveal";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay - Fallback for non-canvas */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/80 md:bg-background/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
        <img 
          src={heroBg} 
          alt="Abstract Data Background" 
          className="w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <Terminal className="w-4 h-4" />
            <span>Data Science Engineer</span>
          </motion.div>
          
          <div className="mb-6 overflow-hidden">
             <motion.h1
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0 0 0)" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading leading-[1.1] tracking-tight text-white"
            >
              Transforming data into <br/>
              <span className="text-gradient animate-pulse-slow">actionable insights</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ filter: "blur(10px)", opacity: 0 }}
            animate={{ filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed"
          >
            <p>
              I help organizations unlock the power of data science to make smarter decisions, 
              optimize operations, and drive growth through AI & Machine Learning.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-4">
            <motion.a 
              href="#projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold transition-all flex items-center gap-2 group shadow-lg shadow-primary/25 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">View My Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </motion.a>
            <motion.a 
              href="https://drive.google.com/file/d/194Evas7Gb53EXbZagF6yxcRne-FokIHB/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg font-bold transition-all backdrop-blur-sm flex items-center gap-2 text-white"
            >
              <FileText className="w-4 h-4" />
              Download CV
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mt-12 space-y-4"
          >
            <div className="flex flex-wrap gap-6 text-muted-foreground">
              {[
                { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/azizmessaoud" },
                { icon: Github, label: "GitHub", href: "https://github.com/azizmessaoud" },
                { icon: Mail, label: "Email", href: "mailto:aziz.messaoud@esprit.tn" }
              ].map((item, i) => (
                <motion.a 
                  key={i}
                  href={item.href} 
                  target="_blank" 
                  className="hover:text-secondary transition-colors flex items-center gap-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 1.2 + i * 0.1 }}
                >
                  <item.icon className="w-5 h-5" /> <span className="text-sm">{item.label}</span>
                </motion.a>
              ))}
            </div>

            <div className="pt-6 border-t border-white/5 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <a href="https://www.kaggle.com/azizmessaoud2002" target="_blank" className="hover:text-white transition-colors">Kaggle</a>
              <span>•</span>
              <a href="https://leetcode.com/u/azizmessaoud/" target="_blank" className="hover:text-white transition-colors">LeetCode</a>
              <span>•</span>
              <a href="https://codeforces.com/profile/rebellion2002" target="_blank" className="hover:text-white transition-colors">Codeforces</a>
              <span>•</span>
              <a href="https://zindi.africa/users/REBELLION123" target="_blank" className="hover:text-white transition-colors">Zindi</a>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-secondary to-transparent" />
      </motion.div>
    </section>
  );
}
