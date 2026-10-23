/* Site content: profile, projects, experience, volunteering, and credentials.
 * Every metric, date, and link here is copied from the existing site, the CV link,
 * or the public project repositories. Do not add figures that are not in those sources. */
export const cvUrl = "https://drive.google.com/file/d/1CKr7-vtf9nOOr2xX-VwpJAJxefnVPbJ0/view?usp=sharing";

export const profile = {
  name: "Aziz Messaoud",
  role: "Data Science Engineering student",
  headline: "I build practical AI systems.",
  lede: "I work across applied machine learning, AI engineering, and agentic systems, from research and experiments to measurable, testable software.",
  education: "Data Science Engineering · ESPRIT · Tunisia",
  availability: "Seeking a 2027 PFE internship",
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

export const sections = [
  { id: "top", index: "01", label: "Identity" },
  { id: "work", index: "02", label: "Work" },
  { id: "method", index: "03", label: "Method" },
  { id: "about", index: "04", label: "About" },
  { id: "experience", index: "05", label: "Experience" },
  { id: "volunteering", index: "06", label: "Volunteering" },
  { id: "certifications", index: "07", label: "Certifications" },
  { id: "contact", index: "08", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export interface ProjectLink {
  label: string;
  href: string;
  kind: "paper" | "code" | "demo" | "contact";
}

export interface Metric {
  label: string;
  baseline: number;
  model: number;
  /* Bar scale; defaults to 1 for scores in [0, 1]. */
  max?: number;
  decimals?: number;
}

export interface FlagshipProject {
  id: string;
  title: string;
  category: string;
  status: string;
  problem: string;
  contribution: string[];
  outcome: string;
  outcomeNote?: string;
  metrics?: Metric[];
  /* Column names for the metric table; defaults to Baseline / Model. */
  metricColumns?: [string, string];
  /* Heading for the contribution list; defaults to "My contribution". */
  contributionLabel?: string;
  visual: "ranking" | "avatar" | "documents" | "hierarchy";
  tags: string[];
  links: ProjectLink[];
}

export const flagshipProjects: FlagshipProject[] = [
  {
    id: "case-flyrank",
    title: "FlyRank Search Intelligence",
    category: "Applied ML · Search ranking",
    status: "Research paper · internship capstone",
    problem:
      "An editorial team has more pages than it can review in a week. Which pages should a person look at first, using only signals available at the end of one decision day?",
    contribution: [
      "Framed the task as next-7-day Google Search Console clicks, using March 31, 2026 signals as features and April 1–7 as the outcome.",
      "Fixed a transparent baseline (content age + same-day visibility) before using the label, then trained a Random Forest regressor.",
      "Validated on a grouped holdout that keeps whole clients out of training (8 unseen clients, zero overlap) and ran leakage checks; a deliberately leaked feature was caught and removed.",
    ],
    outcome: "Precision@50 of 0.94 for the Random Forest vs 0.76 for the baseline on 1,583 held-out rows.",
    outcomeNote:
      "Observational, directional evidence for prioritizing human review: one decision date and one outcome week. Not a causal or production result.",
    metrics: [
      { label: "Precision@50", baseline: 0.76, model: 0.94 },
      { label: "R² (grouped holdout)", baseline: 0.26, model: 0.5 },
    ],
    visual: "ranking",
    tags: ["Python", "scikit-learn", "Random Forest", "Grouped holdout", "Precision@50"],
    links: [
      { label: "Read the paper", href: "https://azizmessaoud.github.io/flyrank/paper/", kind: "paper" },
      { label: "View code", href: "https://github.com/azizmessaoud/flyrank", kind: "code" },
    ],
  },
  {
    id: "case-alia",
    title: "ALIA",
    category: "AI engineering · Conversational avatar",
    status: "Team prototype · NDA",
    problem:
      "Medical sales representatives need practice conversations and structured feedback. ALIA is a training tool with a browser avatar and an automatically generated debrief.",
    contribution: [
      "Built the browser avatar fallback with TalkingHead.js and Three.js, needed because browsers did not handle the preferred rendering path consistently.",
      "Built the standalone agent that turns a finished session into a PowerPoint debrief.",
    ],
    outcome: "On synthetic sessions, the generated debrief decks scored 97–99/100 in our visual checks.",
    outcomeNote:
      "Not yet tested with real trainers. Source code is NDA-protected (Vital Laboratories Tunisia); the diagram shows only the parts listed in this case study.",
    visual: "avatar",
    tags: ["Three.js", "TalkingHead.js", "WebSockets", "Python", "Groq LLM"],
    links: [{ label: "Request details", href: "mailto:aziz.messaoud@esprit.tn?subject=ALIA%20case%20study", kind: "contact" }],
  },
  {
    id: "case-hr",
    title: "HR Document Intelligence",
    category: "Document AI · Data quality",
    status: "Working prototype · synthetic data",
    problem:
      "Payroll files, contracts, and employee records arrive as scans and PDFs. Errors should be caught and explained before anything reaches the HR information system.",
    contribution: [
      "Built the extraction path: Docling as the primary local extractor, RapidOCR as a fallback when confidence or completeness is low.",
      "Mapped documents to one canonical HR record and wrote validation rules (required fields, CIN/CNSS/date/salary formats, impossible values).",
      "Wrapped it in a FastAPI service that returns a status, masked evidence for every flag, and a recommendation, and never writes to the HRIS automatically.",
    ],
    outcome: "Runs end to end on synthetic documents, returning ACCEPTED, REVIEW_REQUIRED, REJECTED, or FAILED with an explanation for each flag.",
    outcomeNote:
      "Demo mode with in-memory jobs. OCR accuracy on real documents has not been measured; worker queues and a database are planned, not built.",
    visual: "documents",
    tags: ["Python", "FastAPI", "Docling", "RapidOCR", "pytest"],
    links: [{ label: "View code", href: "https://github.com/azizmessaoud/hr-anomaly-scaffold", kind: "code" }],
  },
  {
    id: "case-traffix",
    title: "TraffiX",
    category: "Agentic AI · Multi-agent traffic control",
    status: "Team project · simulation",
    problem:
      "Traffic lights in central Tunis have to serve cars, pedestrians, buses, and ambulances through rush hours, Ramadan, rain, and incidents, while safety rules stay out of reach of any learned model.",
    contributionLabel: "Team contribution",
    contribution: [
      "A hierarchy on a simulated network of 7 junctions: per junction, 5 agents advise and a master is the only writer of its light; a supermaster runs 8 network agents and sends directives but never writes a light.",
      "Three traffic-light agents compared (max-pressure, predictive / MPC, Fitted Q-Iteration RL) over 5 controllers × 12 scenarios × 3 seeds, with models trained on 2025 dates and tested on 2026.",
      "Synapse language agents in English, French, and Arabic that explain decisions from the log with checked citations or abstain, and an operator copilot whose suggestions are recorded, never applied.",
    ],
    outcome: "In the morning-peak scenario, TraffiX cut car waiting by 10% vs actuated control (significant over 3 seeds), with zero pedestrian-clearance truncations vs 700–1,240 per hour for SUMO's plans.",
    outcomeNote:
      "Simulation on a schematic network at 2,600 vehicles/h; no deployment. Max-pressure is still the best light agent; junction-only control beat the full hierarchy in the combined scenario, and every controller congests in rain with a flooded street.",
    metricColumns: ["Actuated", "TraffiX"],
    metrics: [
      { label: "Car wait, morning peak (s)", baseline: 20.4, model: 18.3, max: 25, decimals: 1 },
      { label: "Car wait, Ramadan pre-iftar (s)", baseline: 22.3, model: 21.0, max: 25, decimals: 1 },
    ],
    visual: "hierarchy",
    tags: ["Python", "SUMO", "scikit-learn", "Fitted Q-Iteration", "FastAPI", "React", "Claude / Groq"],
    links: [{ label: "View code", href: "https://github.com/aymenhamzik/traffix3", kind: "code" }],
  },
];

export interface SupportingProject {
  title: string;
  description: string;
  tags: string[];
  link: ProjectLink;
}

export const supportingProjects: SupportingProject[] = [
  {
    title: "Breast Cancer ML",
    description:
      "Preprocessing, PCA, and a comparison of SVM, MLP, and tree models with cross-validation, served through a small Flask API. A technical exercise, not a clinical tool.",
    tags: ["scikit-learn", "PCA", "SVM", "MLP", "Flask", "Docker"],
    link: { label: "View code", href: "https://github.com/azizmessaoud/breast-cancer-ml", kind: "code" },
  },
  {
    title: "ClusterCrew Analytics",
    description: "Healthcare analytics dashboards for exploring operational data.",
    tags: ["Power BI", "Data visualization", "Healthcare BI"],
    link: { label: "Live demo", href: "https://clustercrew-analytics.onrender.com/overview", kind: "demo" },
  },
  {
    title: "InnoTravel",
    description:
      "Team academic project: a travel-management system covering planning, booking, and REST API integration across desktop and web.",
    tags: ["JavaFX", "Symfony", "MySQL", "REST API"],
    link: { label: "View code", href: "https://github.com/oumaymasaddouri/InnoTravel-PiDev-Symfony.git", kind: "code" },
  },
];

export const proofs = [
  { label: "Research paper", text: "Ranking webpages for human review", detail: "P@50 0.94 vs 0.76 baseline", anchor: "case-flyrank" },
  { label: "Internships", text: "Sopra HR Software · FlyRank AI", detail: "AI and ML engineering, 2025–2026", anchor: "experience" },
  { label: "Prototype", text: "HR document anomaly pipeline", detail: "Docling · RapidOCR · FastAPI", anchor: "case-hr" },
  { label: "Certified", text: "Oracle OCI Data Science Professional", detail: "+ Microsoft AI-901, DP-900", anchor: "certifications" },
];

export const workflow = [
  {
    title: "Understand the problem and data",
    body: "Write down the decision the system supports, who acts on it, and what a wrong call costs. Then check where the data comes from and what is missing.",
    example: "FlyRank: separated unavailable measurements from real zeros before modelling.",
  },
  {
    title: "Establish a baseline",
    body: "Fix a simple, readable rule before touching the label, so the model has something honest to beat.",
    example: "FlyRank: content age + same-day visibility, scored on the same holdout.",
  },
  {
    title: "Evaluate honestly",
    body: "Pick metrics that match the decision, hold out whole groups when they can leak, and read the largest errors.",
    example: "Grouped client holdout; a leaked feature was caught and removed.",
  },
  {
    title: "Build for review and reliability",
    body: "Ship explanations, statuses, and tests with the output, and keep a person in the loop where mistakes are costly.",
    example: "HR pipeline: masked evidence per flag, no automatic HRIS writes.",
  },
];

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  link?: { label: string; href: string };
}

export const experiences: Experience[] = [
  {
    role: "AI Intern",
    company: "Sopra HR Software",
    period: "Jul 2026 – Sep 2026",
    location: "Tunis, Tunisia",
    summary: "HR document anomaly detection before data reaches the HR system.",
    highlights: [
      "Built an anomaly-detection prototype to validate payroll files, contracts, and employee records before integration.",
      "Developed a document-processing pipeline with Docling and RapidOCR to extract structured data from scanned HR documents.",
      "Implemented a FastAPI scaffold combining validation rules and anomaly flags for automated quality checks.",
    ],
  },
  {
    role: "Machine Learning Intern",
    company: "FlyRank AI",
    period: "Jul 2026 – Aug 2026",
    location: "Remote",
    summary: "Applied search-intelligence track ending in a research paper on review prioritization.",
    highlights: [
      "Completed weekly applied-ML assignments on a pseudonymized search-analytics warehouse: framing, data contract, leakage checks, baseline, model, validation audit.",
      "Wrote the capstone paper and published the notebooks and metrics receipts in a public repository.",
    ],
    link: { label: "Verify internship", href: "https://internship.flyrank.ai/verify/FR-D11-C2CA8-72DBB?first_name=Aziz" },
  },
  {
    role: "AI Intern",
    company: "Sopra HR Software",
    period: "Jul 2025 – Aug 2025",
    location: "Tunis, Tunisia",
    summary: "First HR document-processing pipeline.",
    highlights: [
      "Built an HR document-processing pipeline with Python, spaCy, and pdfplumber.",
      "Extracted entities and parsed documents into structured HR fields; automated batch extraction for one template with regular expressions.",
    ],
  },
  {
    role: "IT Support Intern",
    company: "Banque de Tunisie",
    period: "Jun 2023 – Jul 2023",
    location: "Tunisia",
    summary: "IT operations and user support.",
    highlights: [
      "Installed and configured Windows on company servers under supervision, handled inventory data entry, and troubleshot user incidents.",
    ],
  },
];

export interface Volunteering {
  org: string;
  period: string;
  role: string;
  summary: string;
  link?: { label: string; href: string };
}

export const volunteering: Volunteering[] = [
  {
    org: "Happy City Index",
    period: "2026",
    role: "Researcher (Tunis)",
    summary: "Gathered and checked Tunis data for the 2026 Happy City Index before submission.",
    link: { label: "Our Team page", href: "https://happy-city-index.com/OurTeam" },
  },
  {
    org: "DeepFlow",
    period: "Oct 2025 – Present",
    role: "Member",
    summary: "Workshops and practical sessions on RAG, vector search, and LLM applications.",
    link: { label: "LinkedIn", href: "https://www.linkedin.com/company/deepflowesprit/" },
  },
  {
    org: "ATIA Club ESB",
    period: "Dec 2024 – Present",
    role: "Member, Learning Department",
    summary: "AI workshops and study sessions with other ESB students.",
  },
  {
    org: "IEEE Chapters",
    period: "Oct 2022 – Dec 2023",
    role: "Member (PES, IAS, Computer Society)",
    summary: "Workshops and student engineering events.",
  },
];

export interface Credential {
  title: string;
  short?: string;
  issuer: string;
  year: string;
  type: "Certification" | "Accreditation" | "Course" | "Certificate";
  link?: string;
  secondaryLink?: { label: string; href: string };
}

/* Priority credentials: proctored certifications plus the Databricks accreditation (labelled as such). */
export const priorityCredentials: Credential[] = [
  {
    title: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional",
    short: "OCI Data Science Professional",
    issuer: "Oracle",
    year: "2025",
    type: "Certification",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=1FBB758BADED7CB49AE091395139903D4B9D8463109AEBB0C2673FBC880253A9",
  },
  {
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    short: "OCI AI Foundations Associate",
    issuer: "Oracle",
    year: "2025",
    type: "Certification",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=7DA2ADAE20E6DA7233E485DD34299A910811A034BC4E981DACF9118671A3544C",
  },
  {
    title: "Microsoft Certified: Azure AI Fundamentals (AI-901)",
    short: "Azure AI Fundamentals (AI-901)",
    issuer: "Microsoft",
    year: "2026",
    type: "Certification",
    link: "https://learn.microsoft.com/fr-fr/users/azizmessaoud/credentials/1a2d218bd3b89433",
  },
  {
    title: "Microsoft Certified: Azure Data Fundamentals (DP-900)",
    short: "Azure Data Fundamentals (DP-900)",
    issuer: "Microsoft",
    year: "2026",
    type: "Certification",
    link: "https://learn.microsoft.com/fr-fr/users/azizmessaoud/credentials/9170ffe9ad85882",
  },
  {
    title: "Databricks Academy Accreditation — Generative AI Fundamentals",
    short: "Generative AI Fundamentals",
    issuer: "Databricks",
    year: "2026",
    type: "Accreditation",
    link: "https://credentials.databricks.com/ed7432c9-7444-441d-992a-9c19e81acea9#acc.CiyAfHEW",
  },
];

export const additionalCredentials: Credential[] = [
  { title: "Introduction to Transformer-Based NLP", issuer: "NVIDIA", year: "2025", type: "Course", link: "https://learn.nvidia.com/certificates?id=ThehODKqTASFT20JoM1-4w" },
  { title: "Fundamentals of Deep Learning", issuer: "NVIDIA", year: "2025", type: "Course", link: "https://learn.nvidia.com/certificates?id=_2SSDT3sQLis1uAoAh2SNA" },
  { title: "Getting Started with Deep Learning", issuer: "NVIDIA", year: "2025", type: "Course", link: "https://learn.nvidia.com/certificates?id=eotempvJT_-jMSt2HqvJwg" },
  { title: "Intermediate Machine Learning", issuer: "Kaggle", year: "2025", type: "Course", link: "https://www.kaggle.com/learn/certification/azizmessaoud2002/intermediate-machine-learning" },
  { title: "Intro to Machine Learning", issuer: "Kaggle", year: "2025", type: "Course", link: "https://www.kaggle.com/learn/certification/azizmessaoud2002/intro-to-machine-learning" },
  { title: "Neo4j Fundamentals", issuer: "Neo4j", year: "2025", type: "Course", link: "https://graphacademy.neo4j.com/c/19de2cc3-211a-4104-b685-80e20558cc4c" },
  { title: "AI Fundamentals with Capstone", issuer: "IBM SkillsBuild", year: "2025", type: "Certificate", link: "https://www.credly.com/badges/211a4060-9485-4b3a-9fb9-e2d53c08e888/" },
  { title: "Elements of AI for Business", issuer: "MinnaLearn", year: "2025", type: "Course", link: "https://courses.minnalearn.com/certificate/en/elements-of-ai-for-business/c1bde2fc-3df9-41cc-903b-f90636bb12a8" },
  { title: "Hashgraph Developer", issuer: "The Hashgraph Association", year: "2025", type: "Certificate", link: "https://badges.parchment.eu/public/assertions/FsCTKOvmS4iU4tCAbMtQmQ?identity__email=aziz.messaoud@esprit.tn" },
  { title: "Scrum Fundamentals Certified", issuer: "SCRUMstudy", year: "2025", type: "Certificate", link: "https://www.scrumstudy.com/certification/verify?type=SFC&number=1098120" },
  {
    title: "Leadership",
    issuer: "Aspire Institute",
    year: "2026",
    type: "Certificate",
    link: "https://engage.aspireleaders.org/share/certificate/did:rcw:b3551972-403a-4976-be06-bd9c68b2b605",
    secondaryLink: { label: "Letter", href: "https://engage.aspireleaders.org/share/certificate/did:rcw:aff306a7-d8da-48a8-9ed4-378da59d2512" },
  },
];

export const skills: Record<string, string[]> = {
  Languages: ["Python", "SQL", "R"],
  "ML / AI": ["scikit-learn", "PyTorch", "TensorFlow", "NLP", "LLMs"],
  Engineering: ["FastAPI", "Docker", "Git"],
  Data: ["Data visualization", "OCR / document parsing"],
};
