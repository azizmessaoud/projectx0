/* Site content: projects, internships, volunteering, and certifications. */
export const cvUrl = "https://drive.google.com/file/d/1CKr7-vtf9nOOr2xX-VwpJAJxefnVPbJ0/view?usp=sharing";

export const profile = {
  name: "Aziz Messaoud",
  role: "Data Science Student",
  headline: "Data Science Engineering student at ESPRIT, looking for a 2027 PFE internship.",
  body: "I work on machine-learning projects involving documents, search, and data that is difficult to use.",
  availability: "Looking for a 2027 PFE internship in data science, ML engineering, or AI engineering.",
  email: "aziz.messaoud@esprit.tn",
  location: "Ariana, Tunisia",
  links: {
    linkedin: "https://www.linkedin.com/in/azizmessaoud/",
    github: "https://github.com/azizmessaoud/",
    portfolio: "https://azizm.me/",
    kaggle: "https://www.kaggle.com/azizmessaoud",
    leetcode: "https://leetcode.com/u/azizmessaoud/",
    codeforces: "https://codeforces.com/profile/azizmessaoud",
    zindi: "https://zindi.org/users/azizmessaoud",
    devpost: "https://devpost.com/azizmessaoud",
  },
};

export interface Project {
  number: string;
  id?: string;
  title: string;
  eyebrow: string;
  summary: string;
  details: string;
  lesson?: string;
  outcome: string;
  tags: string[];
  linkLabel: string;
  link: string;
  paperLink?: string;
  paperLabel?: string;
  secondaryLabel?: string;
  secondaryLink?: string;
  status: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    number: "01",
    id: "case-flyrank",
    title: "FlyRank Search Intelligence",
    eyebrow: "Applied ML",
    summary: "I built a model that ranks pages for review when only a limited number can be checked.",
    details: "I created the proxy label, compared the model with a simple baseline, and measured the results using Precision@50.",
    lesson: "The main challenge was deciding how to define a useful proxy label when there was no direct ground truth.",
    outcome: "Precision@50 increased from 0.24 with the baseline to 0.74 with the trained model.",
    tags: ["Python", "Feature engineering", "GBDT", "Precision@50", "Search"],
    linkLabel: "Read case study",
    link: "https://azizmessaoud.github.io/flyrank/paper/",
    secondaryLabel: "View code",
    secondaryLink: "https://github.com/azizmessaoud/flyrank",
    status: "Research prototype",
    featured: true,
  },
  {
    number: "02",
    id: "case-alia",
    title: "ALIA",
    eyebrow: "AI engineering",
    summary: "ALIA is a medical sales-training tool with a browser avatar and automatically generated debriefs.",
    details: "I worked on the TalkingHead.js / Three.js avatar fallback and built the separate agent that creates the PowerPoint debrief. Source code is NDA protected by Vital Laboratories Tunisia.",
    lesson: "The avatar fallback was necessary because browser environments did not always handle the preferred rendering path consistently.",
    outcome: "On synthetic sessions, the generated decks scored 97–99/100 in our visual checks. The system has not yet been tested in a real trainer deployment.",
    tags: ["Three.js", "WebSockets", "TalkingHead.js", "Python", "Groq LLM"],
    linkLabel: "Request details",
    link: "mailto:aziz.messaoud@esprit.tn",
    status: "NDA Protected / Prototype",
    featured: true,
  },
  {
    number: "03",
    id: "case-hr",
    title: "HR Document Intelligence",
    eyebrow: "Data science",
    summary: "I built a local prototype for processing HR documents.",
    details: "It uses OCR to extract fields, maps different documents to a common structure, and flags missing or suspicious values for human review, including the source page and why a value was marked.",
    lesson: "Scanned tables and inconsistent layouts were the main sources of OCR errors, so I kept confidence and source-page information for later review.",
    outcome: "The prototype works end to end on synthetic documents. It still needs testing with real documents before its OCR accuracy and production reliability can be judged.",
    tags: ["Python", "OCR", "NLP", "FastAPI", "Validation"],
    linkLabel: "View code",
    link: "https://github.com/azizmessaoud/hr-anomaly-scaffold",
    status: "Working prototype",
    featured: true,
  },
  {
    number: "04",
    title: "Breast Cancer ML",
    eyebrow: "Supporting project",
    summary: "A small machine-learning project covering preprocessing, model comparison, and a simple API.",
    details: "This is a technical exercise, not a clinically validated diagnostic system.",
    outcome: "The code and evaluation steps are in a public repository.",
    tags: ["Scikit-learn", "PCA", "SVM", "MLP", "Flask", "Docker"],
    
    linkLabel: "View code",
    link: "https://github.com/azizmessaoud/breast-cancer-ml",
    status: "Proof of concept",
    featured: false,
  },
  {
    number: "05",
    title: "ClusterCrew Analytics",
    eyebrow: "Supporting project",
    summary: "Healthcare analytics dashboards and reporting.",
    details: "A visual analytics project for exploring operational data.",
    outcome: "Live demo available.",
    tags: ["Power BI", "Data visualization", "Healthcare BI"],
    
    linkLabel: "Live demo",
    link: "https://clustercrew-analytics.onrender.com/overview",
    status: "Live demo",
    featured: false,
  },
  {
    number: "06",
    title: "InnoTravel",
    eyebrow: "Supporting project",
    summary: "A multi-platform travel-management system built with Java, JavaFX, Symfony, and MySQL.",
    details: "A full-stack academic project covering planning, booking, synchronization, and REST API integration.",
    outcome: "Public source repository available.",
    tags: ["JavaFX", "Symfony", "MySQL", "REST API"],
    
    linkLabel: "View code",
    link: "https://github.com/oumaymasaddouri/InnoTravel-PiDev-Symfony.git",
    status: "Academic project",
    featured: false,
  },
];

export interface Certificate {
  title: string;
  issuer: string;
  year: string;
  link?: string;
  linkLabel?: string;
  secondaryLink?: string;
  secondaryLabel?: string;
  status?: "earned" | "planned";
}

export const certificates: Certificate[] = [
  { title: "Microsoft Certified: Azure AI Fundamentals (AI-901)", issuer: "Microsoft", year: "2026", link: "https://learn.microsoft.com/fr-fr/users/azizmessaoud/credentials/1a2d218bd3b89433" },
  { title: "Microsoft Certified: Azure Data Fundamentals (DP-900)", issuer: "Microsoft", year: "2026", link: "https://learn.microsoft.com/fr-fr/users/azizmessaoud/credentials/9170ffe9ad85882" },
  { title: "Leadership", issuer: "Aspire Institute", year: "2026", link: "https://engage.aspireleaders.org/share/certificate/did:rcw:b3551972-403a-4976-be06-bd9c68b2b605", linkLabel: "Certificate", secondaryLink: "https://engage.aspireleaders.org/share/certificate/did:rcw:aff306a7-d8da-48a8-9ed4-378da59d2512", secondaryLabel: "Letter" },
  { title: "Databricks Academy Accreditation — Generative AI Fundamentals", issuer: "Databricks", year: "2026", link: "https://credentials.databricks.com/ed7432c9-7444-441d-992a-9c19e81acea9#acc.CiyAfHEW" },
  { title: "ML Engineering Internship", issuer: "FlyRank AI", year: "2026", link: "https://internship.flyrank.ai/verify/FR-D11-C2CA8-72DBB?first_name=Aziz" },
  { title: "Neo4j Fundamentals", issuer: "Neo4j", year: "2025", link: "https://graphacademy.neo4j.com/c/19de2cc3-211a-4104-b685-80e20558cc4c" },
  { title: "Elements of AI for Business", issuer: "MinnaLearn", year: "2025", link: "https://courses.minnalearn.com/certificate/en/elements-of-ai-for-business/c1bde2fc-3df9-41cc-903b-f90636bb12a8" },
  { title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate", issuer: "Oracle", year: "2025", link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=7DA2ADAE20E6DA7233E485DD34299A910811A034BC4E981DACF9118671A3544C" },
  { title: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional", issuer: "Oracle", year: "2025", link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=1FBB758BADED7CB49AE091395139903D4B9D8463109AEBB0C2673FBC880253A9" },
  { title: "Hashgraph Developer", issuer: "The Hashgraph Association", year: "2025", link: "https://badges.parchment.eu/public/assertions/FsCTKOvmS4iU4tCAbMtQmQ?identity__email=aziz.messaoud@esprit.tn" },
  { title: "Introduction to Transformer-Based NLP", issuer: "NVIDIA", year: "2025", link: "https://learn.nvidia.com/certificates?id=ThehODKqTASFT20JoM1-4w" },
  { title: "Getting Started with Deep Learning", issuer: "NVIDIA", year: "2025", link: "https://learn.nvidia.com/certificates?id=eotempvJT_-jMSt2HqvJwg" },
  { title: "Fundamentals of Deep Learning", issuer: "NVIDIA", year: "2025", link: "https://learn.nvidia.com/certificates?id=_2SSDT3sQLis1uAoAh2SNA" },
  { title: "Intermediate Machine Learning", issuer: "Kaggle", year: "2025", link: "https://www.kaggle.com/learn/certification/azizmessaoud2002/intermediate-machine-learning" },
  { title: "Intro to Machine Learning", issuer: "Kaggle", year: "2025", link: "https://www.kaggle.com/learn/certification/azizmessaoud2002/intro-to-machine-learning" },
  { title: "AI Fundamentals with Capstone", issuer: "IBM SkillsBuild", year: "2025", link: "https://www.credly.com/badges/211a4060-9485-4b3a-9fb9-e2d53c08e888/" },
  { title: "Scrum Fundamentals Certified", issuer: "SCRUMstudy", year: "2025", link: "https://www.scrumstudy.com/certification/verify?type=SFC&number=1098120" },
];

export const experiences: { role: string; company: string; period: string; location: string; highlights: string[] }[] = [
  {
    role: "AI Intern",
    company: "Sopra HR Software",
    period: "Jul 2026 - Sep 2026",
    location: "Tunis, Tunisia",
    highlights: [
      "Built an HR anomaly-detection system to validate payroll files, contracts, and employee records before integration into HR systems.",
      "Developed a document-processing pipeline using Docling and RapidOCR to extract structured data from scanned HR documents.",
      "Implemented a FastAPI-based scaffold integrating validation rules and anomaly flagging for automated quality checks.",
    ],
  },
  {
    role: "Machine Learning Intern",
    company: "FlyRank AI",
    period: "Jul 2026 - Aug 2026",
    location: "Remote",
    highlights: [
      "I completed applied machine-learning and data-analysis assignments using public and synthetic datasets.",
      "I documented the work in Git repositories and improved the projects through feedback and repeated experiments.",
    ],
  },
  {
    role: "AI Intern",
    company: "Sopra HR Software",
    period: "Jul 2025 - Aug 2025",
    location: "Tunis, Tunisia",
    highlights: [
      "I built an HR document-processing pipeline with Python, spaCy, and pdfplumber.",
      "I extracted entities and parsed documents into structured HR fields.",
      "I automated batch extraction for one HR document template using Python and regular expressions.",
    ],
  },
  {
    role: "IT Support Intern",
    company: "Banque de Tunisie",
    period: "Jun 2023 - Jul 2023",
    location: "Tunisia",
    highlights: [
      "Installed and configured Windows operating systems on company servers under supervision.",
      "Scanned QR codes and manually entered inventory information into the organization's internal system.",
      "Provided technical support by troubleshooting user and system incidents and assisting with routine IT operations.",
    ],
  },
];

export const volunteering: { org: string; period: string; role: string; summary: string; tags: string[]; link?: string; linkLabel?: string }[] = [
  {
    org: "Happy City Index",
    period: "2026",
    role: "Researcher (Tunis)",
    summary: "I was the Tunis researcher for the 2026 Happy City Index. I gathered the city's data and checked it before it was submitted. They list some of the researchers on the Our Team page.",
    tags: ["Urban research", "Data collection", "Quality of life"],
    link: "https://happy-city-index.com/OurTeam",
    linkLabel: "Our Team",
  },
  {
    org: "DeepFlow",
    period: "Oct 2025 - Present",
    role: "Member",
    summary: "I attend workshops and practical sessions on RAG, vector search, and LLM applications with other members.",
    tags: ["Deep Learning", "Machine Learning", "Research"],
    link: "https://www.linkedin.com/company/deepflowesprit/",
    linkLabel: "LinkedIn",
  },
  {
    org: "ATIA Club ESB",
    period: "Dec 2024 - Present",
    role: "Member, Learning Department",
    summary: "Learning department member. I attend AI workshops and study sessions with other ESB students.",
    tags: ["AI & Technology", "Workshops", "Learning"],
  },
  {
    org: "IEEE Chapters",
    period: "Oct 2022 - Dec 2023",
    role: "Member (PES, IAS, Computer Society)",
    summary: "Member of the PES, IAS, and Computer Society chapters. Workshops and student engineering events, 2022–2023.",
    tags: ["IEEE", "Engineering", "Technology"],
  },
];

export const recruiter = {
  seeking: "2027 PFE internship in data science, ML, or AI engineering",
  education: "ESPRIT · Data Science Engineering · expected 2027",
  proofs: [
    { anchor: "case-flyrank", label: "FlyRank Search Intelligence", note: "Precision@50 0.24 → 0.74 vs baseline" },
    { anchor: "case-alia", label: "ALIA", note: "NDA-protected medical sales trainer" },
    { anchor: "case-hr", label: "HR Document Intelligence", note: "OCR + validation pipeline, local prototype" },
  ],
};

export const skills: Record<string, string[]> = {
  "Languages": ["Python", "SQL", "R"],
  "ML / AI": ["scikit-learn", "PyTorch", "TensorFlow", "NLP", "LLMs"],
  "Infrastructure": ["FastAPI", "Docker", "Git"],
  "Data": ["Data visualization"],
};
