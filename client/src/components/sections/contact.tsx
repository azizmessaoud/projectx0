import { Section } from "@/components/ui/section";
import { Mail, MapPin, Send, Loader2, Check, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { TiltCard } from "@/components/ui/tilt-card";

export function Contact() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('loading');
    setErrorMessage("");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setFormState('success');
        // Reset form
        (e.target as HTMLFormElement).reset();
        // Reset to idle after 4 seconds
        setTimeout(() => setFormState('idle'), 4000);
      } else {
        setFormState('error');
        setErrorMessage(result.message || "Failed to send message");
        setTimeout(() => setFormState('idle'), 4000);
      }
    } catch (error) {
      setFormState('error');
      setErrorMessage("Network error. Please try again.");
      setTimeout(() => setFormState('idle'), 4000);
    }
  };

  return (
    <Section id="contact" className="pb-32 relative">
      {/* Spotlight effect background */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Get In Touch</h2>
        
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
                  <div className="font-medium">Nabeul, Tunisia</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TiltCard className="p-6 glass-card rounded-2xl">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 group">
                    <label htmlFor="name" className="text-sm font-medium group-focus-within:text-primary transition-colors inline-block transform group-focus-within:-translate-y-1 duration-200">Name</label>
                    <input 
                      id="name" 
                      name="name"
                      required 
                      disabled={formState === 'loading'}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-primary focus:bg-white/10 transition-all focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="space-y-2 group">
                    <label htmlFor="email" className="text-sm font-medium group-focus-within:text-primary transition-colors inline-block transform group-focus-within:-translate-y-1 duration-200">Email</label>
                    <input 
                      id="email" 
                      name="email"
                      type="email" 
                      required 
                      disabled={formState === 'loading'}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-primary focus:bg-white/10 transition-all focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>
                <div className="space-y-2 group">
                  <label htmlFor="subject" className="text-sm font-medium group-focus-within:text-primary transition-colors inline-block transform group-focus-within:-translate-y-1 duration-200">Subject</label>
                  <input 
                    id="subject" 
                    name="subject"
                    required 
                    disabled={formState === 'loading'}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-primary focus:bg-white/10 transition-all focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50" 
                    placeholder="Project Inquiry" 
                  />
                </div>
                <div className="space-y-2 group">
                  <label htmlFor="message" className="text-sm font-medium group-focus-within:text-primary transition-colors inline-block transform group-focus-within:-translate-y-1 duration-200">Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    rows={4} 
                    required 
                    disabled={formState === 'loading'}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-primary focus:bg-white/10 transition-all focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50" 
                    placeholder="Hello..." 
                  />
                </div>
                
                {/* Error message */}
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
