import { Section } from "@/components/ui/section";
import { BadgeCheck, ExternalLink } from "lucide-react";

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
      <div className="grid md:grid-cols-2 gap-4">
        {certifications.map((cert, index) => (
          <a 
            key={index}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-4 rounded-xl border border-white/5 hover:bg-white/5 hover:border-primary/30 transition-all group"
          >
            <div className="mt-1 p-2 bg-primary/10 rounded-lg text-primary">
              <BadgeCheck className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold group-hover:text-primary transition-colors pr-6">{cert.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{cert.issuer} • {cert.date}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>
    </Section>
  );
}
