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
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Volunteering & Clubs</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Community involvement and extracurricular activities
          </p>
        </motion.div>

        <div className="space-y-6">
          {volunteeringData.map((item, index) => (
            <motion.div
              key={item.organization}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <TiltCard className={`p-6 glass-card rounded-2xl group hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] transition-all ${item.borderColor}`}>
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform border ${item.borderColor}`}>
                    <Users className="w-8 h-8 text-white/80" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {item.organization}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {item.duration}
                      </div>
                    </div>
                    
                    <p className="text-primary/80 font-medium mb-3">{item.role}</p>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white/5 rounded-full text-xs border border-white/10 text-muted-foreground hover:border-primary/30 hover:text-primary transition-colors"
                        >
                          {tag}
                        </span>
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
