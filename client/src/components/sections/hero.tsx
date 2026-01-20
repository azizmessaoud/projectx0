import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, FileText, Terminal } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useGSAP } from "@/hooks/use-gsap";
import { createHeroTimeline } from "@/animations";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gradientRef = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotionSafe();

  useGSAP(() => {
    if (prefersReduced) return;
    const ctx = createHeroTimeline();
    return () => ctx.kill();
  }, [prefersReduced]);

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="max-w-4xl">
          <motion.div
            ref={badgeRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <Terminal className="w-4 h-4 animate-pulse" />
            <span>Data Science Engineer</span>
          </motion.div>
          
          <div className="mb-6">
            <motion.h1
              ref={titleRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold font-heading leading-[1.1] tracking-tight"
            >
              Transforming data into <br/>
              <motion.span 
                ref={gradientRef}
                className="hero-gradient-text text-gradient inline-block"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                actionable insights
              </motion.span>
            </motion.h1>
          </div>

          <motion.div
            ref={descriptionRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="hero-description text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed"
          >
            <p>
              I help organizations unlock the power of data science to make smarter decisions, 
              optimize operations, and drive growth through AI & Machine Learning.
            </p>
          </motion.div>

          <motion.div 
            ref={ctasRef}
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <MagneticButton 
              className="group relative hero-cta"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-bold transition-all flex items-center gap-2 shadow-lg shadow-primary/25 overflow-hidden relative">
                <span className="relative z-10 flex items-center gap-2">
                  View My Work 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              </div>
            </MagneticButton>

            <MagneticButton
              className="group relative hero-cta"
               onClick={() => window.open("https://drive.google.com/file/d/194Evas7Gb53EXbZagF6yxcRne-FokIHB/view?usp=sharing", "_blank")}
            >
              <div className="px-8 py-4 bg-card/50 border border-border hover:bg-card/80 rounded-lg font-bold transition-all backdrop-blur-sm flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Download CV
              </div>
            </MagneticButton>
          </motion.div>

          <motion.div
            ref={socialsRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
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
                  aria-label={`Open ${item.label} profile`}
                  className="hero-social hover:text-secondary transition-colors flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                >
                  <item.icon className="w-5 h-5" /> <span className="text-sm">{item.label}</span>
                </motion.a>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="pt-6 border-t border-border/30 flex flex-wrap gap-4 text-sm text-muted-foreground"
            >
              <a href="https://www.kaggle.com/azizmessaoud2002" target="_blank" className="hover:text-primary transition-colors hover:underline decoration-secondary underline-offset-4">Kaggle</a>
              <span className="text-border">•</span>
              <a href="https://leetcode.com/u/azizmessaoud/" target="_blank" className="hover:text-primary transition-colors hover:underline decoration-secondary underline-offset-4">LeetCode</a>
              <span className="text-border">•</span>
              <a href="https://codeforces.com/profile/rebellion2002" target="_blank" className="hover:text-primary transition-colors hover:underline decoration-secondary underline-offset-4">Codeforces</a>
              <span className="text-border">•</span>
              <a href="https://zindi.africa/users/REBELLION123" target="_blank" className="hover:text-primary transition-colors hover:underline decoration-secondary underline-offset-4">Zindi</a>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        ref={scrollRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="hero-scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-secondary to-transparent" />
      </motion.div>
    </section>
  );
}
