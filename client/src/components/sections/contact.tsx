import { Section } from "@/components/ui/section";
import { Mail, MapPin, Send, Loader2, Check, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { TiltCard } from "@/components/ui/tilt-card";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  size: number;
  opacity: number;
}

const CONFETTI_COLORS = ['#3b82f6', '#8b5cf6', '#5b21b6', '#ffffff'];

function Confetti({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);

  const createParticles = useCallback(() => {
    const particles: Particle[] = [];
    const count = 75;
    
    for (let i = 0; i < count; i++) {
      particles.push({
        x: 0,
        y: 0,
        vx: (Math.random() - 0.5) * 15,
        vy: Math.random() * -15 - 5,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        size: Math.random() * 8 + 4,
        opacity: 1,
      });
    }
    return particles;
  }, []);

  useEffect(() => {
    if (!active || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    particlesRef.current = createParticles();
    const startX = canvas.width / 2;
    const startY = canvas.height / 2;
    
    particlesRef.current.forEach(p => {
      p.x = startX;
      p.y = startY;
    });

    let startTime = Date.now();
    const duration = 2500;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.4;
        p.rotation += p.rotationSpeed;
        p.opacity = Math.max(0, 1 - progress);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size / 2);
        ctx.restore();
      });

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [active, createParticles]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-50"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

interface FocusParticle {
  id: number;
  x: number;
  y: number;
  color: string;
}

function AnimatedInput({ 
  id, 
  name, 
  type = "text", 
  required, 
  disabled, 
  placeholder,
  isTextarea = false,
  rows,
  autoComplete,
  minLength,
}: {
  id: string;
  name: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  isTextarea?: boolean;
  rows?: number;
  autoComplete?: string;
  minLength?: number;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [particles, setParticles] = useState<FocusParticle[]>([]);
  const particleIdRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const spawnParticles = () => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const count = Math.floor(Math.random() * 3) + 3;
    const newParticles: FocusParticle[] = [];
    const colors = ['#3b82f6', '#8b5cf6', '#5b21b6'];

    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: particleIdRef.current++,
        x: Math.random() * rect.width,
        y: Math.random() < 0.5 ? -5 : rect.height + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 800);
  };

  const handleFocus = () => {
    setIsFocused(true);
    spawnParticles();
  };

  const baseClasses = "w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-primary focus:bg-white/10 transition-all focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50";

  const InputComponent = isTextarea ? 'textarea' : 'input';

  return (
    <div ref={containerRef} className="relative">
      <div 
        className={`absolute -inset-[2px] rounded-lg transition-opacity duration-300 ${isFocused ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #5b21b6, #3b82f6)',
          backgroundSize: '300% 100%',
          animation: isFocused ? 'gradient-border 3s ease infinite' : 'none',
        }}
      />
      <InputComponent
        id={id}
        name={name}
        type={type}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        autoComplete={autoComplete}
        minLength={minLength}
        className={`${baseClasses} relative z-10`}
        onFocus={handleFocus}
        onBlur={() => setIsFocused(false)}
      />
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ 
              opacity: 0, 
              scale: 0,
              y: (Math.random() - 0.5) * 40,
              x: (Math.random() - 0.5) * 30,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute w-2 h-2 rounded-full pointer-events-none z-20"
            style={{ 
              left: p.x,
              top: p.y,
              backgroundColor: p.color,
              boxShadow: `0 0 8px ${p.color}`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export function Contact() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [shouldShake, setShouldShake] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('loading');
    setErrorMessage("");
    
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      honeypot: (formData.get('honeypot') as string) || "",
    };
    
    const apiBase = import.meta.env.VITE_API_URL || window.location.origin;

    try {
      const response = await fetch(`${apiBase}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setFormState('success');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setFormState('idle'), 4000);
      } else {
        setFormState('error');
        setErrorMessage(result.message || "Failed to send message");
        setShouldShake(true);
        setTimeout(() => setShouldShake(false), 500);
        setTimeout(() => setFormState('idle'), 4000);
      }
    } catch (error) {
      setFormState('error');
      setErrorMessage("Network error. Please try again.");
      setShouldShake(true);
      setTimeout(() => setShouldShake(false), 500);
      setTimeout(() => setFormState('idle'), 4000);
    }
  };

  return (
    <Section id="contact" className="pb-32 relative">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2 
          className="text-3xl md:text-5xl font-bold mb-12 text-center flex items-center justify-center gap-3 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="text-3xl"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            📬
          </motion.span>
          <span>Get In Touch</span>
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            
            <div className="space-y-6">
              <a href="mailto:aziz.messaoud@esprit.tn" className="flex items-center gap-4 text-lg hover:text-primary transition-colors group">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors border border-white/10 group-hover:border-primary/50">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email Me</div>
                  <div className="font-medium">aziz.messaoud@esprit.tn</div>
                </div>
              </a>
              
              <div className="flex items-center gap-4 text-lg">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div className="font-medium">ariana, Tunisia</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TiltCard className="p-6 glass-card rounded-2xl relative overflow-hidden">
              <Confetti active={formState === 'success'} />
              <form 
                ref={formRef}
                className="space-y-4" 
                onSubmit={handleSubmit}
                style={{
                  animation: shouldShake ? 'shake 0.5s ease-in-out' : 'none',
                }}
              >
                {/* Honeypot field to deter bots */}
                <input
                  type="text"
                  name="honeypot"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 group">
                    <label htmlFor="name" className="text-sm font-medium group-focus-within:text-primary transition-colors inline-block transform group-focus-within:-translate-y-1 duration-200">Name</label>
                    <AnimatedInput
                      id="name"
                      name="name"
                      required
                      disabled={formState === 'loading'}
                      placeholder="John Doe"
                      autoComplete="name"
                    />
                  </div>
                  <div className="space-y-2 group">
                    <label htmlFor="email" className="text-sm font-medium group-focus-within:text-primary transition-colors inline-block transform group-focus-within:-translate-y-1 duration-200">Email</label>
                    <AnimatedInput
                      id="email"
                      name="email"
                      type="email"
                      required
                      disabled={formState === 'loading'}
                      placeholder="john@example.com"
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div className="space-y-2 group">
                  <label htmlFor="subject" className="text-sm font-medium group-focus-within:text-primary transition-colors inline-block transform group-focus-within:-translate-y-1 duration-200">Subject</label>
                  <AnimatedInput
                    id="subject"
                    name="subject"
                    required
                    disabled={formState === 'loading'}
                    placeholder="Project Inquiry"
                  />
                </div>
                <div className="space-y-2 group">
                  <label htmlFor="message" className="text-sm font-medium group-focus-within:text-primary transition-colors inline-block transform group-focus-within:-translate-y-1 duration-200">Message</label>
                  <AnimatedInput
                    id="message"
                    name="message"
                    isTextarea
                    rows={4}
                    minLength={5}
                    required
                    disabled={formState === 'loading'}
                    placeholder="Hello..."
                  />
                </div>
                
                <AnimatePresence>
                  {formState === 'error' && errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <motion.button 
                  type="submit"
                  whileHover={{ scale: formState === 'idle' ? 1.02 : 1 }}
                  whileTap={{ scale: formState === 'idle' ? 0.98 : 1 }}
                  disabled={formState !== 'idle'}
                  className={`w-full font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all relative overflow-hidden ${
                    formState === 'success' 
                      ? 'bg-green-500 text-white' 
                      : formState === 'error'
                      ? 'bg-red-500 text-white'
                      : 'bg-primary text-primary-foreground hover:opacity-90'
                  } disabled:cursor-not-allowed`}
                >
                  <AnimatePresence mode="wait">
                    {formState === 'idle' && (
                      <motion.div 
                        key="idle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        Send Message <Send className="w-4 h-4" />
                      </motion.div>
                    )}
                    {formState === 'loading' && (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Loader2 className="w-5 h-5 animate-spin" />
                      </motion.div>
                    )}
                    {formState === 'success' && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2"
                      >
                        Sent Successfully <Check className="w-5 h-5" />
                      </motion.div>
                    )}
                    {formState === 'error' && (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2"
                      >
                        Failed to Send <AlertCircle className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
