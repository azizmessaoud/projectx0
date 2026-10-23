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
  targets: "AI/ML engineering · applied data science · AI research",
  email: "aziz.messaoud@esprit.tn",
  location: "Ariana, Tunisia",
  links: {
    linkedin: "https://www.linkedin.com/in/azizmessaoud/",
    github: "https://github.com/azizmessaoud/",
    portfolio: "https://azizm.me/",
    kaggle: "https://www.kaggle.com/azizmessaoud",
    leetcode: "https://leetcode.com/u/azizmessaoud/",
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
  /* What was measured and under which conditions. */
  conditions?: string;
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
  /* Where the result can be checked (notebook output, report section, repository). */
  evidence?: ProjectLink;
  /* Defaults to "My contribution". */
  contributionLabel?: string;
  contribution: string[];
  /* Work by teammates, listed separately from mine. */
  teamContribution?: string[];
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
    status: "In progress · team of 6 · simulation",
    problem: "Run six Tunis traffic lights for cars, pedestrians, buses, and ambulances, without a learned model overriding safety.",
    result: [
      {
        value: "−95%",
        label: "car greens started while pedestrians were crossing",
        conditions: "≈18 per run vs 331–405 with actuated signals · 3 scenarios × 3 seeds",
      },
      {
        value: "−19%",
        label: "pedestrian wait at the morning peak",
        conditions: "116.3 s vs 144.1 s actuated · 3 seeds",
      },
    ],
    resultNote: "Simulated, synthetic demand; not yet significant. Ambulances are 13% slower.",
    evidence: {
      label: "Validation report, §5.3",
      href: "https://github.com/azizmessaoud/traffix/blob/main/docs/presentation/prototype-validation.md#53-controller-results-tunis-map-3-seeds",
      kind: "paper",
    },
    contribution: [
      "Owned the agentic AI architecture: one master writes each light; a supermaster coordinates them.",
      "Control pair: SUMO integration, signal controller, safety rules.",
    ],
    teamContribution: ["Synapse explanations, scenarios, evidence store, KPIs, and the OpenStreetMap network."],
    approach: [
      "Masters resolve requests in a fixed order (safety > emergency > directive > transit > pedestrian > normal); safety rules are never learned.",
      "Evaluation on the real six-junction map, 20 Oct 2026: SUMO fixed-time and actuated plans vs TraffiX with rules and with trained models, 3 scenarios × 3 seeds, paired t-tests.",
      "115 automated tests and the architecture check pass in CI; 7 of 11 trained models beat the rule they replace.",
      "On stale data, a master falls back from max-pressure to actuated, then fixed-time control.",
      "On traffix3's earlier schematic network, the same hierarchy cut morning-peak car waiting by 10% vs actuated signals (2,600 vehicles/h, 3 seeds).",
    ],
    limitations: [
      "None of the differences is significant at p < 0.05 with 3 seeds; ambulance trips take 240 s vs 213 s with actuated signals.",
      "Road demand is synthetic, and 18 of 21 junction roads use unverified lane counts.",
      "Course project running until December 2026; results will change as models are retrained.",
    ],
    visual: "hierarchy",
    tags: ["Python", "SUMO", "OpenStreetMap", "FastAPI", "DuckDB"],
    links: [{ label: "View code", href: "https://github.com/azizmessaoud/traffix", kind: "code" }],
  },
  {
    id: "case-flyrank",
    title: "FlyRank Search Intelligence",
    category: "Applied ML · Search ranking",
    status: "Research paper · internship capstone",
    problem: "Which pages should an editorial team review first when it cannot check them all?",
    result: [
      {
        value: "0.94",
        label: "Precision@50, vs 0.76 for a fixed baseline",
        conditions: "Top 50 of 1,583 held-out pages, 8 unseen clients · hit = ≥ 8 clicks next week",
      },
    ],
    resultNote: "One decision date, one outcome week; observational, not production.",
    evidence: {
      label: "Metric receipt: w05_model.ipynb, cell 8",
      href: "https://github.com/azizmessaoud/flyrank/blob/main/work/notebooks/w05_model.ipynb",
      kind: "code",
    },
    contribution: [
      "Framed the task and its time boundary.",
      "Set a readable baseline first, then trained a Random Forest.",
      "Validated on unseen clients; wrote the paper.",
    ],
    approach: [
      "Precision@50: among the 50 top-ranked test pages, the share whose next-week Search Console clicks reach 8, the 75th percentile of the training outcome. It asks whether the top of the queue is worth a reviewer's time.",
      "Baseline, fixed before the label was used: 100 × (0.60 × capped content age + 0.40 × capped same-day impressions), scored on the same test rows.",
      "Model: Random Forest, 150 trees, depth 14, min leaf 3, seed 42, training-median imputation, 7 same-day features (GSC, GA4, search volume, content age).",
      "Split: GroupShuffleSplit by client, 25% of clients held out (11,802 train rows / 21 clients, 1,583 test rows / 8 clients, zero overlap). R² 0.50 vs 0.26 on the same rows.",
      "Reproduce: run work/notebooks/w05_model.ipynb with approved access to the gated FlyRank warehouse on Hugging Face (HF_TOKEN). Library versions are lower-bounded, not pinned, in requirements.txt.",
    ],
    limitations: [
      "Observational: it does not show that refreshing a page causes more traffic.",
      "One decision date and one outcome week; the sealed June 2026 period is still to be validated.",
    ],
    visual: "ranking",
    tags: ["Python", "scikit-learn", "DuckDB", "Grouped holdout"],
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
    problem: "Sales representatives need realistic practice conversations and structured feedback.",
    result: [
      {
        value: "97–99",
        label: "out of 100 on visual checks of the generated debrief decks",
        conditions: "Synthetic sessions · internal visual QA",
      },
    ],
    resultNote: "Not tested with real trainers yet. Code under NDA (Vital Laboratories Tunisia).",
    contribution: ["Browser avatar fallback (TalkingHead.js + Three.js).", "Agent that turns a session into a PowerPoint debrief."],
    approach: [
      "The fallback exists because browsers did not handle the preferred avatar rendering path consistently.",
      "The browser and backend talk over WebSockets; a Groq-hosted LLM generates the conversation replies.",
    ],
    limitations: [
      "No evaluation with real trainers or representatives yet.",
    ],
    visual: "avatar",
    tags: ["Three.js", "TalkingHead.js", "WebSockets", "Groq LLM"],
    links: [{ label: "Request details", href: "mailto:aziz.messaoud@esprit.tn?subject=ALIA%20case%20study", kind: "contact" }],
  },
  {
    id: "case-hr",
    title: "HR Document Intelligence",
    category: "Document AI · Data quality",
    status: "Working prototype · synthetic data",
    problem: "Scanned HR documents need checking and explaining before they reach the HR system.",
    result: [
      {
        label: "FastAPI prototype: each document gets a status and an explained, masked flag per problem.",
        conditions: "Synthetic PDFs and images · deterministic local tests",
      },
    ],
    resultNote: "OCR accuracy on real documents has not been measured.",
    evidence: {
      label: "Synthetic sample documents",
      href: "https://github.com/azizmessaoud/hr-anomaly-scaffold/tree/main/data/synthetic",
      kind: "code",
    },
    contribution: [
      "Docling extraction with a RapidOCR fallback.",
      "Canonical HR record and validation rules.",
      "FastAPI service; never writes to the HR system.",
    ],
    approach: [
      "Pre-flight checks reject bad uploads first: extension, size (10 MiB default), PDF signature, and image readability.",
      "Payroll fields (name, CIN, CNSS, hire date, gross salary) are checked for missing values, formats, impossible dates, negative salaries, and contradictory statuses; statistical detectors run once a cohort baseline exists.",
      "Each flag carries a rule, severity, expected condition, explanation, and remediation. The report never returns the original record.",
    ],
    limitations: [
      "Demo mode with in-memory jobs; worker queues (Celery, Redis) and PostgreSQL are planned, not built.",
      "CSV and Excel inputs are out of scope for the current OCR pipeline.",
    ],
    visual: "documents",
    tags: ["Python", "FastAPI", "Docling", "RapidOCR"],
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
    link: { label: "Live demo (wakes in about a minute)", href: "https://clustercrew-analytics.onrender.com/overview", kind: "demo" },
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
  { label: "Agentic AI", text: "TraffiX multi-agent traffic control", detail: "Owned the agent architecture", anchor: "case-traffix" },
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
  { title: "Introduction to Transformer-Based NLP", issuer: "NVIDIA", year: "2025", type: "Course", link: "https://learn.nvidia.com/certificates?id=_2SSDT3sQLis1uAoAh2SNA" },
  { title: "Fundamentals of Deep Learning", issuer: "NVIDIA", year: "2025", type: "Course", link: "https://learn.nvidia.com/certificates?id=ThehODKqTASFT20JoM1-4w" },
  { title: "Getting Started with Deep Learning", issuer: "NVIDIA", year: "2025", type: "Course", link: "https://learn.nvidia.com/certificates?id=eotempvJT_-jMSt2HqvJwg" },
  { title: "Intermediate Machine Learning", issuer: "Kaggle", year: "2025", type: "Course", link: "https://www.kaggle.com/learn/certification/azizmessaoud2002/intermediate-machine-learning" },
  { title: "Intro to Machine Learning", issuer: "Kaggle", year: "2024", type: "Course", link: "https://www.kaggle.com/learn/certification/azizmessaoud2002/intro-to-machine-learning" },
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
  "ML / AI": ["scikit-learn", "PyTorch", "TensorFlow", "NLP", "LLMs", "Multi-agent systems"],
  Engineering: ["FastAPI", "Docker", "Git"],
  Data: ["Data visualization", "OCR / document parsing"],
};
