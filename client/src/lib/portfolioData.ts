/* Signal Atelier style: content stays separate from layout so future project and certificate updates are fast, consistent, and auditable. */
export const cvUrl = "https://drive.google.com/file/d/1CKr7-vtf9nOOr2xX-VwpJAJxefnVPbJ0/view?usp=sharing";

export const profile = {
  name: "Aziz Messaoud",
  role: "Data Science Student",
  headline: "Building practical AI systems from data, models, and software.",
  body: "I turn data and models into useful, reliable applications—moving from exploration and evaluation to intelligent interfaces, APIs, and workflows.",
  availability: "Currently seeking a PFE internship in Data Science, AI Engineering, ML Engineering, Agentic AI, or AI Research.",
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
  title: string;
  eyebrow: string;
  summary: string;
  details: string;
  outcome: string;
  tags: string[];
  linkLabel: string;
  link: string;
  paperLink?: string;
  paperLabel?: string;
  status: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    number: "01",
    title: "FlyRank Search Intelligence",
    eyebrow: "Applied ML · Flagship case",
    summary: "A fixed-budget review queue for deciding which pages to inspect first using anonymized search data.",
    details: "I defined the proxy label, compared it with a transparent baseline, trained a gradient-boosted-tree model, and evaluated the top-50 review queue with Precision@50.",
    outcome: "The repository reports a Precision@50 improvement from approximately 0.24 with the baseline to approximately 0.74 with the learned ranking model.",
    tags: ["Python", "Feature engineering", "GBDT", "Precision@50", "Search"],
    
    linkLabel: "View code",
    link: "https://github.com/azizmessaoud/flyrank",
    paperLink: "https://azizmessaoud.github.io/flyrank/paper/",
    paperLabel: "Read paper",
    status: "Research prototype",
    featured: true,
  },
  {
    number: "02",
    title: "ALIA",
    eyebrow: "AI engineering · Flagship case",
    summary: "An AI-powered medical sales-training system with a real-time browser avatar and automated debrief generation.",
    details: "I owned the browser-based TalkingHead.js / Three.js avatar fallback and the standalone PPTX debrief agent. Note: Source code is NDA protected by Vital Laboratories Tunisia.",
    outcome: "Internal synthetic-session testing produced clean decks scoring 97–99/100 in visual QA. Real trainer deployment remains future work.",
    tags: ["Three.js", "WebSockets", "TalkingHead.js", "Python", "Groq LLM"],
    
    linkLabel: "Read case",
    link: "#case-alia",
    status: "NDA Protected / Prototype",
    featured: true,
  },
  {
    number: "03",
    title: "HR Document Intelligence",
    eyebrow: "Data science · Flagship case",
    summary: "A local-first pipeline that extracts, normalizes, validates, and routes heterogeneous HR documents for human review.",
    details: "The system combines OCR, canonical schema mapping, deterministic business rules, confidence signals, and evidence-backed anomaly flags before downstream HR integration.",
    outcome: "A working local end-to-end prototype was demonstrated with synthetic data. OCR quality and production accuracy still require broader validation.",
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
    summary: "A reproducible machine-learning proof of concept covering preprocessing, model comparison, and API scaffolding.",
    details: "A technical project for demonstrating a full evaluation and deployment path. It is not a clinically validated diagnostic system.",
    outcome: "A public repository documents the pipeline and implementation boundary.",
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
    summary: "Interactive healthcare analytics dashboards and business-intelligence reporting.",
    details: "A visual analytics project centered on decision-ready dashboards and clear communication of operational data.",
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

export const certificates = [
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
      "Building an HR anomaly detection system to validate payroll files, contracts, and employee records before integration into HR systems.",
      "Developing a document processing pipeline using Docling and RapidOCR to extract structured data from scanned HR documents.",
      "Implementing a FastAPI-based scaffold with validation rules and anomaly flagging for automated quality checks.",
    ],
  },
  {
    role: "Machine Learning Intern",
    company: "FlyRank AI",
    period: "Jul 2026 - Aug 2026",
    location: "Remote",
    highlights: [
      "Completing structured assignments in applied machine learning, data analysis, experimentation, and evidence-based technical communication.",
      "Applying machine-learning concepts through guided research, practical exercises, and project-based assignments using public or synthetic data.",
      "Producing reproducible, Git-based portfolio deliverables through independent research, experimentation, and iterative feedback.",
    ],
  },
  {
    role: "AI Intern",
    company: "Sopra HR Software",
    period: "Jul 2025 - Aug 2025",
    location: "Tunis, Tunisia",
    highlights: [
      "Developed an NLP-powered HR document-processing pipeline using Python, spaCy, and pdfplumber.",
      "Implemented entity extraction and document parsing workflows for structured HR data.",
      "Automated extraction for an HR document template using Python and regular expressions, enabling batch processing of documents.",
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

export const volunteering = [
  {
    org: "DeepFlow",
    period: "Oct 2025 - Present",
    role: "Member",
    summary: "Member of DeepFlow community dedicated to deep learning and ML innovation. Actively participating in research discussions and collaborative projects.",
    tags: ["Deep Learning", "Machine Learning", "Research"],
  },
  {
    org: "ATIA Club ESB",
    period: "Dec 2024 - Present",
    role: "Member, Learning Department",
    summary: "Active participant in community technical workshops and training sessions centered on artificial intelligence development. Engaged in peer-led discussions, group study activities, and hands-on exercises to reinforce practical AI implementation skills.",
    tags: ["AI & Technology", "Workshops", "Learning"],
  },
  {
    org: "IEEE Chapters",
    period: "Oct 2022 - Dec 2023",
    role: "Member (PES, IAS, Computer Society)",
    summary: "Active participation in technical workshops and engineering projects. Engaged with professionals and students in advancing technology innovation.",
    tags: ["IEEE", "Engineering", "Technology"],
  },
];

export const skills = ["Python", "SQL", "scikit-learn", "PyTorch", "TensorFlow", "NLP", "LLMs", "FastAPI", "Docker", "Git", "Data visualization"];
