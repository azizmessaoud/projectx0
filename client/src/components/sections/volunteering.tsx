import { Section } from "@/components/ui/section";
import { TiltCard } from "@/components/ui/tilt-card";
import { motion } from "framer-motion";
import { Users, Calendar, ExternalLink } from "lucide-react";

const volunteeringData = [
  {
    organization: "DeepFlow",
    role: "Member",
    duration: "Oct 2025 - Present",
    description: "Member of DeepFlow community dedicated to deep learning and ML innovation. Actively participating in research discussions and collaborative projects.",
    tags: ["Deep Learning", "Machine Learning", "Research"],
    color: "from-violet-500/20 to-purple-500/20",
    borderColor: "border-violet-500/30"
  },
  {
    organization: "ATIA Club ESB",
    role: "Member, Learning Department",
    duration: "Dec 2024 - Present",
    description: "Organize AI workshops and contribute to AI knowledge dissemination. Help create educational content and mentor junior members in AI fundamentals.",
    tags: ["AI & Technology", "Workshops", "Learning"],
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30"
  },
  {
    organization: "IEEE Chapters",
    role: "Member (PES, IAS, Computer Society)",
    duration: "Oct 2022 - Dec 2023",
    description: "Active participation in technical workshops and engineering projects. Engaged with professionals and students in advancing technology innovation.",
    tags: ["IEEE", "Engineering", "Technology"],
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/30"
  }
];

export function Volunteering() {
  return (
    <Section id="volunteering" className="relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3 text-white">
            <motion.span
              className="text-3xl"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              🤝
            </motion.span>
            <span>Volunteering & Clubs</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Community involvement and extracurricular activities
          </p>
        </motion.div>

        <div className="space-y-6">
          {volunteeringData.map((item, index) => (
            <motion.div
              key={item.organization}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.15, 
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
            >
              <TiltCard className={`p-6 glass-card rounded-2xl group hover:shadow-[0_0_50px_rgba(139,92,246,0.2)] transition-all ${item.borderColor} hover:border-primary/50`}>
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <motion.div 
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 border ${item.borderColor} group-hover:border-primary/50`}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Users className="w-8 h-8 text-white/90" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <motion.h3 
                        className="text-xl font-bold group-hover:text-primary transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.2 }}
                      >
                        {item.organization}
                      </motion.h3>
                      <motion.div 
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.3 }}
                      >
                        <Calendar className="w-4 h-4" />
                        {item.duration}
                      </motion.div>
                    </div>
                    
                    <motion.p 
                      className="text-primary/80 font-medium mb-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.4 }}
                    >
                      {item.role}
                    </motion.p>
                    
                    <motion.p 
                      className="text-muted-foreground mb-4 leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.5 }}
                    >
                      {item.description}
                    </motion.p>
                    
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 + 0.6 + tagIndex * 0.05 }}
                          whileHover={{ scale: 1.08, y: -2 }}
                          className="px-3 py-1 bg-white/5 rounded-full text-xs border border-white/10 text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all cursor-default"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
