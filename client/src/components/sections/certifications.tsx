import { Section } from "@/components/ui/section";
import { BadgeCheck, ExternalLink, Award } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import { motion } from "framer-motion";

const certifications = [
  {
    title: "Introduction to Transformer-Based NLP",
    issuer: "NVIDIA",
    date: "2025",
    link: "https://learn.nvidia.com/certificates?id=_2SSDT3sQLis1uAoAh2SNA",
    category: "AI/ML"
  },
  {
    title: "Getting Started with Deep Learning",
    issuer: "NVIDIA",
    date: "2025",
    link: "https://learn.nvidia.com/certificates?id=eotempvJT_-jMSt2HqvJwg",
    category: "AI/ML"
  },
  {
    title: "Fundamentals of Deep Learning",
    issuer: "NVIDIA",
    date: "2025",
    link: "https://learn.nvidia.com/certificates?id=ThehODKqTASFT20JoM1-4w#",
    category: "AI/ML"
  },
  {
    title: "Scrum Fundamentals Certified (SFC)",
    issuer: "SCRUMstudy",
    date: "August 2025",
    link: "https://www.scrumstudy.com/certification/verify?type=SFC&number=1098120",
    category: "Agile"
  },
  {
    title: "Hashgraph Developer",
    issuer: "The Hashgraph Association",
    date: "July 2025",
    link: "#",
    category: "Blockchain"
  },
  {
    title: "Intermediate Machine Learning",
    issuer: "Kaggle",
    date: "2025",
    link: "https://www.kaggle.com/learn/certification/azizmessaoud2002/intermediate-machine-learning",
    category: "AI/ML"
  },
  {
    title: "AI Fundamentals with Capstone",
    issuer: "IBM SkillsBuild",
    date: "2025",
    link: "https://www.credly.com/badges/211a4060-9485-4b3a-9fb9-e2d53c08e888/",
    category: "AI/ML"
  }
];

const issuerColors: Record<string, string> = {
  "NVIDIA": "from-green-500/20 to-emerald-500/20 border-green-500/30",
  "Kaggle": "from-cyan-500/20 to-blue-500/20 border-cyan-500/30",
  "IBM SkillsBuild": "from-blue-500/20 to-indigo-500/20 border-blue-500/30",
  "SCRUMstudy": "from-orange-500/20 to-amber-500/20 border-orange-500/30",
  "The Hashgraph Association": "from-purple-500/20 to-violet-500/20 border-purple-500/30"
};

export function Certifications() {
  return (
    <Section id="certifications">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Certifications</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Professional certifications and credentials
        </p>
      </motion.div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, index) => {
          const colorClass = issuerColors[cert.issuer] || "from-primary/20 to-secondary/20 border-primary/30";
          
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="h-full"
            >
              <TiltCard className="flex flex-col gap-4 p-6 rounded-2xl border border-white/5 bg-card/20 hover:bg-card/40 hover:border-secondary/30 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] transition-all group h-full">
                <div className="flex items-start justify-between w-full">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClass} group-hover:scale-110 transition-transform`}>
                    <Award className="w-6 h-6 text-white/80" />
                  </div>
                  <span className="px-2 py-1 bg-white/5 rounded-full text-xs text-muted-foreground border border-white/10">
                    {cert.category}
                  </span>
                </div>
                
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-secondary transition-colors leading-tight mb-3">
                      {cert.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <BadgeCheck className="w-4 h-4 text-primary" />
                      <span className="font-medium text-white/80">{cert.issuer}</span>
                      <span className="text-white/30">|</span>
                      <span>{cert.date}</span>
                    </div>
                  </div>
                  
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 rounded-lg text-sm font-medium transition-all group/btn w-fit"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
