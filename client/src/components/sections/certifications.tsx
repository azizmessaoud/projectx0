import { Section } from "@/components/ui/section";
import { BadgeCheck, ExternalLink } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import { motion } from "framer-motion";

const certifications = [
  {
    title: "Introduction to Transformer-Based NLP",
    issuer: "NVIDIA",
    date: "2025",
    link: "https://learn.nvidia.com/certificates?id=_2SSDT3sQLis1uAoAh2SNA"
  },
  {
    title: "Getting Started with Deep Learning",
    issuer: "NVIDIA",
    date: "2025",
    link: "https://learn.nvidia.com/certificates?id=eotempvJT_-jMSt2HqvJwg"
  },
  {
    title: "Fundamentals of Deep Learning",
    issuer: "NVIDIA",
    date: "2025",
    link: "https://learn.nvidia.com/certificates?id=ThehODKqTASFT20JoM1-4w#"
  },
  {
    title: "Scrum Fundamentals Certified (SFC)",
    issuer: "SCRUMstudy",
    date: "August 2025",
    link: "https://www.scrumstudy.com/certification/verify?type=SFC&number=1098120"
  },
  {
    title: "Hashgraph Developer",
    issuer: "The Hashgraph Association",
    date: "July 2025",
    link: "#"
  },
  {
    title: "Intermediate Machine Learning",
    issuer: "Kaggle",
    date: "2025",
    link: "https://www.kaggle.com/learn/certification/azizmessaoud2002/intermediate-machine-learning"
  },
  {
    title: "AI Fundamentals with Capstone",
    issuer: "IBM SkillsBuild",
    date: "2025",
    link: "https://www.credly.com/badges/211a4060-9485-4b3a-9fb9-e2d53c08e888/"
  }
];

export function Certifications() {
  return (
    <Section id="certifications">
      <h2 className="text-3xl md:text-5xl font-bold mb-12">Certifications</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, index) => (
          <motion.a 
            key={index}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="block h-full"
          >
            <TiltCard className="flex flex-col gap-3 p-6 rounded-2xl border border-white/5 bg-card/20 hover:bg-card/40 hover:border-secondary/30 transition-all group h-full">
              <div className="flex items-start justify-between w-full">
                <div className="p-2 bg-primary/20 rounded-lg text-primary group-hover:scale-110 transition-transform">
                  <BadgeCheck className="w-6 h-6" />
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="flex flex-col justify-between flex-1">
                <h3 className="text-lg font-bold group-hover:text-secondary transition-colors leading-tight mb-2">
                  {cert.title}
                </h3>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-white/80">{cert.issuer}</span>
                  <span className="mx-2">•</span>
                  <span>{cert.date}</span>
                </div>
              </div>
            </TiltCard>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
