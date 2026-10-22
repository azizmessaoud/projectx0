/* Terminal Slate dossier: Framer petrol/amber system with a recruiter-first hero. */
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, ExternalLink, Github, Linkedin, Mail, MapPin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { certificates, cvUrl, profile, projects, recruiter, skills, experiences, volunteering } from "@/lib/portfolioData";

const navItems = [
  ["Work", "work"],
  ["Experience", "experience"],
  ["Method", "method"],
  ["Contact", "contact"],
] as const;

const NeuralField = lazy(() => import("@/components/NeuralField"));

const skillList = Object.values(skills).flat();
const plannedCerts = certificates.filter((cert) => cert.status === "planned");
const earnedCerts = certificates.filter((cert) => cert.status !== "planned");
const flagshipProjects = projects.filter((project) => project.featured);
const supportingProjects = projects.filter((project) => !project.featured);

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "flagship" | "supporting">("all");
  const pendingSection = useRef<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen || !pendingSection.current) return;
    const id = pendingSection.current;
    pendingSection.current = null;
    const timer = window.setTimeout(() => scrollToId(id), 30);
    return () => window.clearTimeout(timer);
  }, [menuOpen]);

  const goToSection = (id: string) => {
    if (menuOpen) {
      pendingSection.current = id;
      setMenuOpen(false);
      return;
    }
    scrollToId(id);
  };

  const visibleFlagship = useMemo(
    () => (filter === "supporting" ? [] : flagshipProjects),
    [filter],
  );
  const visibleSupporting = useMemo(
    () => (filter === "flagship" ? [] : supportingProjects),
    [filter],
  );

  return (
    <div className={`site-shell${menuOpen ? " is-menu-open" : ""}`}>
      <div className="site-network">
        <p className="sr-only">Decorative background animation.</p>
        <Suspense fallback={null}><NeuralField /></Suspense>
      </div>
      <header className="topbar">
        <button className="brand-lockup" onClick={() => goToSection("top")} aria-label="Back to top">
          <span className="brand-am" aria-hidden="true">AM</span>
          <span className="brand-name">AZIZ MESSAOUD</span>
        </button>
        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={(event) => { event.preventDefault(); goToSection(id); }}>{label}</a>
          ))}
          <a href={cvUrl} target="_blank" rel="noreferrer" className="nav-cv">View CV <Download size={14} /></a>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <div className="status-bar">
        <span className="live-dot" />
        <p>Seeking a 2027 PFE internship · Data Science · AI/ML Engineering · Ariana, Tunisia</p>
      </div>

      <main>
        <section id="top" className="hero-section container">
          <div className="hero-copy">
            <p className="section-index">01 / Identity</p>
            <h1>I build software for data that is difficult to use.</h1>
            <p className="hero-lede">
              I am a Data Science Engineering student at ESPRIT. My recent work includes HR document processing, search ranking, and browser-based AI tools.
            </p>
            <div className="hero-actions">
              <Button className="signal-button" asChild>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </Button>
              <a className="text-link" href={cvUrl} target="_blank" rel="noreferrer">
                <Download size={15} /> Download CV
              </a>
            </div>
            <div className="proof-grid">
              {recruiter.proofs.map((proof) => (
                <button key={proof.anchor} className="proof-chip" onClick={() => scrollToId(proof.anchor)}>
                  <span className="mono-label">{proof.label}</span>
                  <p>{proof.note}</p>
                </button>
              ))}
            </div>
            <p className="hero-internships">
              Internships: Sopra HR Software · FlyRank AI · Banque de Tunisie{" "}
              <button type="button" className="inline-jump" onClick={() => scrollToId("experience")}>Jump to experience</button>
            </p>
          </div>
          <aside className="hero-proof">
            <img className="hero-portrait" src={`${import.meta.env.BASE_URL}portrait.jpg`} width={640} height={640} alt="Aziz Messaoud" />
            <span className="proof-label">/ Current direction</span>
            <ol className="proof-chain">
              <li><span>01</span> Data Science</li>
              <li><span>02</span> Machine Learning</li>
              <li><span>03</span> AI Engineering</li>
              <li><span>04</span> Applications</li>
            </ol>
            <div className="hero-note">
              <span className="mono-label">01</span>
              <p>I usually start with a simple question: what should the system improve, and how will I measure it?</p>
            </div>
          </aside>
        </section>

        <section id="work" className="work-section container section-block">
          <div className="section-heading">
            <div>
              <p className="section-index">02 / Selected work</p>
              <h2>Selected work</h2>
            </div>
            <p className="section-intro">A few projects I have worked on. I have included the decisions, results, and limitations where they matter.</p>
          </div>
          <div className="filter-row" role="tablist" aria-label="Project filters">
            {([["all", "All work"], ["flagship", "Main projects"], ["supporting", "Other projects"]] as const).map(([value, label]) => (
              <button key={value} role="tab" aria-selected={filter === value} className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{label}</button>
            ))}
          </div>
          <div className="case-list">
            {visibleFlagship.map((project) => (
              <motion.article
                key={project.title}
                id={project.id}
                className="case-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45 }}
              >
                <div>
                  <p className="project-eyebrow">{project.eyebrow}</p>
                  <h3>{project.title}</h3>
                  <p className="project-summary">{project.summary} {project.details}</p>
                  {project.lesson ? <p className="project-summary">{project.lesson}</p> : null}
                  <div className="project-links">
                    <a className="project-link" href={project.link} target={project.link.startsWith("http") ? "_blank" : undefined} rel={project.link.startsWith("http") ? "noreferrer" : undefined}>
                      {project.linkLabel} <ExternalLink size={14} />
                    </a>
                    {(project.paperLink || project.secondaryLink) && (
                      <a className="project-link" href={(project.paperLink || project.secondaryLink)!} target="_blank" rel="noreferrer">
                        {project.paperLabel ?? project.secondaryLabel ?? "Read paper"} <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
                <div className="outcome-panel">
                  <span className="mono-label">Result</span>
                  <p>{project.outcome}</p>
                  <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              </motion.article>
            ))}
          </div>
          {visibleSupporting.length > 0 && (
            <div className="support-grid">
              {visibleSupporting.map((project) => (
                <article key={project.title} className="support-card">
                  <p className="project-eyebrow">{project.eyebrow}</p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <a className="project-link" href={project.link} target="_blank" rel="noreferrer">{project.linkLabel} <ExternalLink size={14} /></a>
                </article>
              ))}
            </div>
          )}
        </section>

        <section id="experience" className="exp-section section-block">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="section-index">03 / Experience</p>
                <h2>Internships</h2>
              </div>
              <p className="section-intro">HR document processing, applied ML, and IT support.</p>
            </div>
            <div className="exp-grid">
              {experiences.map((exp, index) => (
                <article className="exp-item" key={`${exp.company}-${exp.period}`}>
                  <div className="exp-header">
                    <span className="exp-number">0{index + 1}</span>
                    <div>
                      <h3>{exp.role}</h3>
                      <p className="exp-company">{exp.company} · {exp.period}</p>
                    </div>
                    <span className="exp-location">{exp.location}</span>
                  </div>
                  <ul className="exp-desc">{exp.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="method" className="approach-section section-block">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="section-index">04 / Method</p>
                <h2>How I usually work</h2>
              </div>
            </div>
            <div className="approach-grid">
              <div className="approach-step"><span>01</span><h3>Ask</h3><p>What should the system improve, and how will I measure it?</p></div>
              <div className="approach-step"><span>02</span><h3>Build</h3><p>Start with something simple enough to test against real constraints.</p></div>
              <div className="approach-step"><span>03</span><h3>Compare</h3><p>Check the result against a baseline and write down what still fails.</p></div>
              <div className="approach-step"><span>04</span><h3>Share</h3><p>Leave notes another person can follow, rerun, and disagree with.</p></div>
            </div>
          </div>
        </section>

        <section id="about" className="about-section container section-block">
          <div className="about-grid">
            <div>
              <p className="section-index">05 / About</p>
              <h2>About</h2>
              <p className="about-copy">I started with data analysis and machine learning and have gradually moved toward building complete AI applications.</p>
              <p className="about-copy">I am currently improving my foundations in statistics, algorithms, and system design. My recent projects have focused mainly on NLP, document processing, and search.</p>
            </div>
            <div className="skill-panel">
              <span className="mono-label">/ Working toolkit</span>
              <div className="skill-cloud">{skillList.map((skill) => <span key={skill}>{skill}</span>)}</div>
              <div className="about-facts">
                <dl>
                  <div className="fact-row"><dt>Education</dt><dd>Data Science Engineering<br />ESPRIT · Expected 2027</dd></div>
                  <div className="fact-row"><dt>Focus</dt><dd>NLP · document processing · search</dd></div>
                  <div className="fact-row"><dt>Location</dt><dd>{profile.location}</dd></div>
                  <div className="fact-row"><dt>Languages</dt><dd>Arabic · French · English</dd></div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section id="volunteering" className="vol-section section-block">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="section-index">06 / Volunteering</p>
                <h2>Volunteering</h2>
              </div>
              <p className="section-intro">Research contribution, clubs, and IEEE chapters.</p>
            </div>
            <div className="exp-grid">
              {volunteering.map((item, index) => (
                <article className="exp-item" key={item.org}>
                  <div className="exp-header">
                    <span className="exp-number">0{index + 1}</span>
                    <div>
                      <h3>{item.org}</h3>
                      <p className="exp-company">{item.role} · {item.period}</p>
                    </div>
                    {item.link && <a className="vol-link" href={item.link} target="_blank" rel="noreferrer">{item.linkLabel ?? "Link"} <ExternalLink size={13} /></a>}
                  </div>
                  <p className="exp-desc">{item.summary}</p>
                  <div className="vol-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="certifications" className="cert-section section-block">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="section-index">07 / Certifications</p>
                <h2>Certifications</h2>
              </div>
              <p className="section-intro">{plannedCerts.length ? "Courses I have completed, plus the ones I plan to take next." : "Certifications and courses I have completed."}</p>
            </div>
            {plannedCerts.length > 0 && (
            <div className="planned-cert-row">
              <p className="planned-label">Next</p>
              <div className="planned-cert-list">
                {plannedCerts.map((cert) => (
                  <div className="cert-item planned" key={cert.title}>
                    <span className="cert-badge">Planned</span>
                    <div>
                      <h3>{cert.title}</h3>
                      <p>{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            )}
            <div className="cert-grid">
              {earnedCerts.map((cert, index) => {
                const meta = (
                  <>
                    <span className="cert-number">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{cert.title}</h3>
                      <p>{[cert.issuer, cert.year].filter(Boolean).join(" · ")}</p>
                    </div>
                  </>
                );
                if (cert.link && cert.secondaryLink) {
                  return (
                    <div className="cert-item" key={cert.title}>
                      {meta}
                      <span className="cert-link-group">
                        <a href={cert.link} target="_blank" rel="noreferrer">{cert.linkLabel ?? "Certificate"} <ArrowUpRight size={13} /></a>
                        <a href={cert.secondaryLink} target="_blank" rel="noreferrer">{cert.secondaryLabel ?? "Letter"} <ArrowUpRight size={13} /></a>
                      </span>
                    </div>
                  );
                }
                const content = (
                  <>
                    {meta}
                    {cert.link ? <ArrowUpRight size={15} /> : null}
                  </>
                );
                return cert.link ? (
                  <a href={cert.link} target="_blank" rel="noreferrer" className="cert-item" key={cert.title}>{content}</a>
                ) : (
                  <div className="cert-item" key={cert.title}>{content}</div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section section-block">
          <div className="container contact-inner">
            <div>
              <p className="section-index">08 / Contact</p>
              <h2>Get in touch</h2>
              <p className="contact-copy">I am looking for a 2027 PFE internship in data science or machine learning. Hybrid or remote.</p>
              <Button className="signal-button hire-button" asChild>
                <a href={`mailto:${profile.email}`}>Email me</a>
              </Button>
            </div>
            <div className="contact-card">
              <a href={`mailto:${profile.email}`} className="contact-email">{profile.email} <ArrowUpRight size={18} /></a>
              <div className="contact-links">
                <a href={profile.links.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
                <a href={profile.links.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
                <a href={`mailto:${profile.email}`}><Mail size={16} /> Email</a>
                <a href={profile.links.kaggle} target="_blank" rel="noreferrer"><span className="platform-icon">K</span> Kaggle</a>
                <a href={profile.links.leetcode} target="_blank" rel="noreferrer"><span className="platform-icon">LC</span> LeetCode</a>
                <a href={profile.links.codeforces} target="_blank" rel="noreferrer"><span className="platform-icon">CF</span> Codeforces</a>
                <a href={profile.links.zindi} target="_blank" rel="noreferrer"><span className="platform-icon">Z</span> Zindi</a>
                <a href={profile.links.devpost} target="_blank" rel="noreferrer"><span className="platform-icon">D</span> Devpost</a>
              </div>
              <p className="contact-location"><MapPin size={15} /> {profile.location} · Hybrid or remote</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer container">
        <span>© 2026 Aziz Messaoud</span>
        <span>Data Science Engineering · ESPRIT</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}
