import { Section } from "@/components/ui/section";
import { Mail, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

export function Contact() {
  return (
    <Section id="contact" className="pb-32">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Get In Touch</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            
            <div className="space-y-6">
              <a href="mailto:aziz.messaoud@esprit.tn" className="flex items-center gap-4 text-lg hover:text-primary transition-colors group">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email Me</div>
                  <div className="font-medium">aziz.messaoud@esprit.tn</div>
                </div>
              </a>
              
              <div className="flex items-center gap-4 text-lg">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div className="font-medium">Nabeul, Tunisia</div>
                </div>
              </div>
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 group">
                <label htmlFor="name" className="text-sm font-medium group-focus-within:text-primary transition-colors">Name</label>
                <input id="name" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-primary focus:bg-white/10 transition-all" placeholder="John Doe" />
              </div>
              <div className="space-y-2 group">
                <label htmlFor="email" className="text-sm font-medium group-focus-within:text-primary transition-colors">Email</label>
                <input id="email" type="email" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-primary focus:bg-white/10 transition-all" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2 group">
              <label htmlFor="subject" className="text-sm font-medium group-focus-within:text-primary transition-colors">Subject</label>
              <input id="subject" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-primary focus:bg-white/10 transition-all" placeholder="Project Inquiry" />
            </div>
            <div className="space-y-2 group">
              <label htmlFor="message" className="text-sm font-medium group-focus-within:text-primary transition-colors">Message</label>
              <textarea id="message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-primary focus:bg-white/10 transition-all" placeholder="Hello..." />
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Send Message <Send className="w-4 h-4" />
            </motion.button>
          </form>
        </div>
      </div>
    </Section>
  );
}
