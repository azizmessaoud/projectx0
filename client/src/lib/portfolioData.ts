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

export interface ResultFigure {
  value?: string;
  label: string;
}

export interface FlagshipProject {
  id: string;
  title: string;
  category: string;
  status: string;
  /* One sentence. */
  problem: string;
  /* The headline evidence, always visible. */
  result: ResultFigure[];
  /* One short caveat shown with the result. */
  resultNote: string;
  /* Defaults to "My contribution". */
  contributionLabel?: string;
  contribution: string[];
  /* Shown inside the expandable "Approach and evaluation" section. */
  approach: string[];
  limitations: string[];
  visual: "ranking" | "avatar" | "documents" | "hierarchy";
  tags: string[];
  links: ProjectLink[];
}

export const flagshipProjects: FlagshipProject[] = [
  {
    id: "case-traffix",
    title: "TraffiX",
    category: "Agentic AI · Multi-agent control",
    status: "Team project · simulation",
    problem:
      "Traffic lights in central Tunis must serve cars, pedestrians, buses, and ambulances through peaks, Ramadan, and incidents, without a learned model ever overriding safety rules.",
    result: [
      { value: "−10%", label: "car waiting vs actuated signals at the morning peak (20.4 s → 18.3 s, significant over 3 seeds)" },
      { value: "0", label: "pedestrian-clearance truncations, vs 700–1,240 per hour for SUMO's default plans" },
    ],
    resultNote: "Simulation on a schematic network; no deployment.",
    contributionLabel: "What the team built",
    contribution: [
      "A control hierarchy over 7 junctions: agents advise, one master per junction is the only writer of its light, and a supermaster coordinates 8 network agents.",
      "Three light agents compared (max-pressure, predictive / MPC, Fitted Q-Iteration RL) across 12 scenarios × 3 seeds.",
      "Language agents in English, French, and Arabic that explain decisions from the log with checked citations, or abstain.",
    ],
    approach: [
      "Masters resolve requests in a fixed order: safety > emergency > supermaster directive > transit > pedestrian > normal. Safety rules and this order are never learned.",
      "Models are trained on 2025 dates and tested on 2026. The demand forecast's Ramadan 2026 error is 0.027, against 0.103 for a same-date-last-year baseline; incident detection reaches F1 0.85 vs 0.56 for the rule it replaces.",
      "Agents never read the calendar assumptions or the hidden scenario events; a check script enforces this and the hierarchy rules.",
      "In the Ramadan pre-iftar rush, car waiting is 21.0 s vs 22.3 s for actuated signals.",
    ],
    limitations: [
      "Max-pressure remains the best light agent on this network; the RL agent is close and the predictive agent behind.",
      "In the combined scenario, junction-only control beats the full hierarchy; with rain and a flooded street every controller congests, and TraffiX is worse than actuated for cars.",
      "Results above were measured at 2,600 vehicles/h; the current 4,000 vehicles/h configuration has not been re-reported.",
    ],
    visual: "hierarchy",
    tags: ["Python", "SUMO", "scikit-learn", "Fitted Q-Iteration", "FastAPI", "React"],
    links: [{ label: "View code", href: "https://github.com/aymenhamzik/traffix3", kind: "code" }],
  },
  {
    id: "case-flyrank",
    title: "FlyRank Search Intelligence",
    category: "Applied ML · Search ranking",
    status: "Research paper · internship capstone",
    problem: "An editorial team can only review some of its pages each week: which ones should a person look at first?",
    result: [
      { value: "0.94", label: "Precision@50 for the Random Forest, vs 0.76 for a transparent baseline" },
      { value: "0.50", label: "R² on 1,583 rows from 8 clients never seen in training (baseline 0.26)" },
    ],
    resultNote: "One decision date and one outcome week; observational, not a production result.",
    contribution: [
      "Framed the task: March 31, 2026 signals as features, Google Search Console clicks for April 1–7 as the outcome.",
      "Fixed a readable baseline before touching the label, then trained a Random Forest regressor.",
      "Validated on a grouped holdout with zero client overlap, and wrote the paper.",
    ],
    approach: [
      "Precision@50 is the share of the 50 top-ranked pages whose next-week clicks reach the training 75th-percentile threshold of 8 clicks. It measures whether the top of the queue is worth a reviewer's time.",
      "Baseline: 100 × (0.60 × capped content age + 0.40 × capped same-day impressions), set before the label was used.",
      "Model: Random Forest, 150 trees, depth 14, seed 42, training-median imputation, 7 same-day features from GSC, GA4, search volume, and content age.",
      "GroupShuffleSplit keeps whole clients out of training: 11,802 rows from 21 clients for training, 1,583 rows from 8 clients for testing. A deliberately leaked feature inflated the score and was removed before the honest run.",
    ],
    limitations: [
      "Observational analysis: it does not show that refreshing a page causes more traffic.",
      "One decision date and one outcome week; the sealed June 2026 period is still to be validated.",
    ],
    visual: "ranking",
    tags: ["Python", "scikit-learn", "Random Forest", "Grouped holdout"],
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
    problem: "Medical sales representatives need realistic practice conversations and structured feedback afterwards.",
    result: [{ value: "97–99", label: "out of 100 in our visual checks of the generated debrief decks, on synthetic sessions" }],
    resultNote: "Not yet tested with real trainers. Source code is under NDA (Vital Laboratories Tunisia).",
    contribution: [
      "Built the in-browser avatar fallback with TalkingHead.js and Three.js.",
      "Built the standalone agent that turns a finished session into a PowerPoint debrief.",
    ],
    approach: [
      "The fallback exists because browsers did not handle the preferred avatar rendering path consistently.",
      "The browser and backend talk over WebSockets; a Groq-hosted LLM generates the conversation replies.",
      "Debrief decks were checked visually on synthetic sessions and scored 97–99/100.",
    ],
    limitations: [
      "No evaluation with real trainers or representatives yet.",
      "Speech recognition and synthesis are not described here: the public case study does not document which components the team used.",
    ],
    visual: "avatar",
    tags: ["Three.js", "TalkingHead.js", "WebSockets", "Python", "Groq LLM"],
    links: [{ label: "Request details", href: "mailto:aziz.messaoud@esprit.tn?subject=ALIA%20case%20study", kind: "contact" }],
  },
  {
    id: "case-hr",
    title: "HR Document Intelligence",
    category: "Document AI · Data quality",
    status: "Working prototype · synthetic data",
    problem: "Scanned payroll files, contracts, and employee records need checking and explaining before anything reaches the HR system.",
    result: [
      { label: "An end-to-end FastAPI prototype: every document gets a status and an explanation for each flag, with sensitive values masked." },
    ],
    resultNote: "Runs on synthetic documents only; OCR accuracy on real documents has not been measured.",
    contribution: [
      "Built extraction with Docling, falling back to RapidOCR when confidence or completeness is low.",
      "Mapped documents to one canonical HR record and wrote the format and business validation rules.",
      "Wrapped it in a FastAPI service that never writes to the HR system automatically.",
    ],
    approach: [
      "Pre-flight checks reject bad uploads first: extension, size (10 MiB default), PDF signature, and image readability.",
      "Payroll fields (name, CIN, CNSS, hire date, gross salary) are checked for missing values, formats, impossible dates, negative salaries, and contradictory statuses; statistical detectors run once a cohort baseline exists.",
      "Each flag carries a rule, severity, expected condition, explanation, and remediation. The report never returns the original record.",
      "Tests are deterministic and run locally without network access.",
    ],
    limitations: [
      "Demo mode with in-memory jobs; worker queues (Celery, Redis) and PostgreSQL are planned, not built.",
      "CSV and Excel inputs are out of scope for the current OCR pipeline.",
    ],
    visual: "documents",
    tags: ["Python", "FastAPI", "Docling", "RapidOCR", "pytest"],
    links: [{ label: "View code", href: "https://github.com/azizmessaoud/hr-anomaly-scaffold", kind: "code" }],
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
  { label: "Agentic AI", text: "TraffiX multi-agent traffic control", detail: "Team project, in simulation", anchor: "case-traffix" },
  { label: "Research paper", text: "Ranking webpages for review", detail: "Precision@50: 0.94 vs 0.76", anchor: "case-flyrank" },
  { label: "Internships", text: "Sopra HR Software · FlyRank AI", detail: "AI and ML, 2025–2026", anchor: "experience" },
  { label: "Certified", text: "Oracle OCI Data Science Professional", detail: "+ Microsoft AI-901, DP-900", anchor: "certifications" },
];

export const workflow = [
  {
    title: "Understand the problem and data",
    body: "Write down the decision the system supports, who acts on it, and what a wrong call costs. Then check where the data comes from and what is missing.",
    example: "FlyRank: missing measurements were excluded, not treated as zeros.",
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
  links?: { label: string; href: string }[];
}

export const experiences: Experience[] = [
  {
    role: "AI Intern",
    company: "Sopra HR Software",
    period: "Jul 2026 – Sep 2026",
    location: "Tunis, Tunisia",
    summary: "Built a prototype that checks HR documents for anomalies before they reach the HR system.",
    highlights: [
      "Document extraction with Docling, with RapidOCR as the fallback for low-confidence scans.",
      "Validation rules and anomaly flags behind a FastAPI service, with explained, masked evidence for reviewers.",
    ],
    links: [{ label: "Case study", href: "#case-hr" }],
  },
  {
    role: "Machine Learning Intern",
    company: "FlyRank AI",
    period: "Jul 2026 – Aug 2026",
    location: "Remote",
    summary: "Applied search-intelligence track that ended in a research paper on ranking pages for review.",
    highlights: [
      "Weekly assignments on a pseudonymized analytics warehouse: framing, data contract, leakage checks, baseline, model, validation.",
      "Published the capstone paper with its notebooks and metrics receipts.",
    ],
    links: [
      { label: "Case study", href: "#case-flyrank" },
      { label: "Verify internship", href: "https://internship.flyrank.ai/verify/FR-D11-C2CA8-72DBB?first_name=Aziz" },
    ],
  },
  {
    role: "AI Intern",
    company: "Sopra HR Software",
    period: "Jul 2025 – Aug 2025",
    location: "Tunis, Tunisia",
    summary: "Built a first HR document-processing pipeline.",
    highlights: [
      "Extracted entities into structured HR fields with Python, spaCy, and pdfplumber.",
      "Automated batch extraction for one document template with regular expressions.",
    ],
  },
  {
    role: "IT Support Intern",
    company: "Banque de Tunisie",
    period: "Jun 2023 – Jul 2023",
    location: "Tunisia",
    summary: "Server setup under supervision, inventory data entry, and user support.",
    highlights: [],
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
