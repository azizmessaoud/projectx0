 import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, FileText, Terminal } from "lucide-react";
import SplitType from 'split-type';
import gsap from 'gsap';
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useGSAP } from "@/hooks/use-gsap";
import { createHeroTimeline } from "@/animations";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";

const roles = [
  { text: "Data Science Engineer", delay: 4000 },
  { text: "Machine Learning Developer", delay: 3000 },
  { text: "AI Enthusiast", delay: 2500 },
  { text: "Problem Solver", delay: 3000 },
];

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
  
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  
  useEffect(() => {
    if (prefersReduced) return;
    
    // Dynamic delay based on current role
    const currentDelay = roles[currentRoleIndex].delay;
    
    const timeout = setTimeout(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, currentDelay);
    
    return () => clearTimeout(timeout);
  }, [prefersReduced, currentRoleIndex]);

  useGSAP(() => {
    if (prefersReduced) return;
    const ctx = createHeroTimeline();
    
    // SplitType animation for title - only animate the static part, not the gradient span
    if (titleRef.current) {
      const split = new SplitType(titleRef.current, { types: 'words' });
      
      const tl = gsap.timeline({
        onComplete: () => {
          // Restore original H1 markup after timeline finishes
          split.revert();
        }
      });
      
      tl.from(split.words, {
        opacity: 0,
        y: 50,
        rotateX: 90,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3,
      });
      
      ctx.add(tl);
    }
    
    return () => ctx.kill();
  }, [prefersReduced]);

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 md:px-6 overflow-hidden">
      <div className="container mx-auto max-w-5xl relative z-20">
        <div className="flex flex-col items-start gap-6">
          
          {/* 1. GREETING - Smaller, subtle introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-20"
          >
            <h2 className="text-2xl md:text-3xl font-medium text-slate-300">
              Hi, I'm{" "}
              <span 
                className="inline-block font-bold"
                style={{
                  background: 'linear-gradient(90deg, #8b5cf6, #06b6d4, #3b82f6, #8b5cf6)',
                  backgroundSize: '300% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'gradient 4s ease infinite',
                }}
              >
                Aziz Messaoud
              </span>
            </h2>
          </motion.div>

          {/* 2. BADGE - Role context after name */}
          <motion.div
            ref={badgeRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative z-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm">
              <Terminal className="w-4 h-4 text-primary animate-pulse" />
              <span className="relative">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentRoleIndex}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="inline-block text-primary text-sm md:text-base font-medium tracking-wide"
                  >
                    {roles[currentRoleIndex].text}
                  </motion.span>
                </AnimatePresence>
                <motion.span 
                  className="ml-1 inline-block w-0.5 h-4 bg-primary"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </span>
            </div>
          </motion.div>

          {/* 3. MAIN TAGLINE - Hero statement, largest and most prominent */}
          <motion.h1
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="hero-title relative z-20 text-white text-4xl md:text-6xl lg:text-7xl font-bold font-heading leading-[1.1] tracking-tight max-w-[900px]"
          >
            Transforming data into{" "}
            <span 
              ref={gradientRef}
              className="inline-block"
              style={{
                background: 'linear-gradient(90deg, #8b5cf6, #06b6d4, #3b82f6, #8b5cf6)',
                backgroundSize: '300% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient 4s ease infinite',
              }}
            >
              actionable insights
            </span>
          </motion.h1>

          {/* 4. DESCRIPTION - Supporting text */}
          <motion.div
            ref={descriptionRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="hero-description relative z-20 text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            <p>
              I help organizations unlock the power of data science to make smarter decisions, 
              optimize operations, and drive growth through AI & Machine Learning.
            </p>
          </motion.div>

          {/* 5. CTAs - Action buttons */}
          <motion.div 
            ref={ctasRef}
            className="flex flex-wrap gap-4 relative z-20 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
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

          {/* 6. SOCIAL LINKS - Smaller, tertiary info */}
          <motion.div
            ref={socialsRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
            className="relative z-20 flex items-center gap-6 mt-2"
          >
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
                className="hero-social text-slate-300 hover:text-white transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <item.icon className="w-5 h-5" /> 
                <span className="text-sm">{item.label}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* 7. COMPETITIVE SITES - Smallest, least prominent */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            className="relative z-20 flex flex-wrap items-center gap-4 text-sm text-slate-400 pt-4 border-t border-white/10"
          >
            <a href="https://www.kaggle.com/azizmessaoud2002" target="_blank" className="hover:text-white transition-colors hover:underline decoration-secondary underline-offset-4">Kaggle</a>
            <span className="text-white/30">•</span>
            <a href="https://leetcode.com/u/azizmessaoud/" target="_blank" className="hover:text-white transition-colors hover:underline decoration-secondary underline-offset-4">LeetCode</a>
            <span className="text-white/30">•</span>
            <a href="https://codeforces.com/profile/rebellion2002" target="_blank" className="hover:text-white transition-colors hover:underline decoration-secondary underline-offset-4">Codeforces</a>
            <span className="text-white/30">•</span>
            <a href="https://zindi.africa/users/REBELLION123" target="_blank" className="hover:text-white transition-colors hover:underline decoration-secondary underline-offset-4">Zindi</a>
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
        <span className="text-xs uppercase tracking-widest text-slate-400">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-secondary to-transparent" />
      </motion.div>
    </section>
  );
}
