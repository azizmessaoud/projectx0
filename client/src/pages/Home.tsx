/* Signal Atelier style: evidence-first editorial layout with a technical rail, restrained motion, and a living neural field behind the hero. */
import { lazy, Suspense, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, ExternalLink, Github, Linkedin, Mail, MapPin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { certificates, cvUrl, profile, projects, skills, experiences, volunteering } from "@/lib/portfolioData";

const NeuralField = lazy(() => import("@/components/NeuralField"));

const navItems = [
  ["Work", "work"],
  ["Approach", "approach"],
  ["About", "about"],
  ["Experience", "experience"],
  ["Volunteering", "volunteering"],
  ["Certifications", "certifications"],
  ["Contact", "contact"],
] as const;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function swirlPath(seed: number): string {
  const steps = 64;
  let d = "";
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const x = t * 400;
    const y =
      150 +
      Math.sin(t * Math.PI * 2 + seed) * 62 +
      Math.sin(t * Math.PI * 6 + seed * 1.7) * 13;
    d += i === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

function ProjectSwirl({ number }: { number: string }) {
  const id = `swirl-${number}`;
  return (
    <svg className="art-swirl" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="0.55" stopColor="#42b7ff" />
          <stop offset="1" stopColor="#b09cff" />
        </linearGradient>
      </defs>
      <path className="swirl-path" d={swirlPath(parseInt(number, 10) * 37 + 11)} stroke={`url(#${id})`} />
      <path className="swirl-path swirl-echo" d={swirlPath(parseInt(number, 10) * 37 + 23)} stroke={`url(#${id})`} />
      <circle className="swirl-dot" cx="0" cy="0" r="3.4" fill="#cdeeff" />
    </svg>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "flagship" | "supporting">("all");
  const [animationPaused, setAnimationPaused] = useState(false);

  const visibleProjects = useMemo(() => filter === "all" ? projects : projects.filter((project) => filter === "flagship" ? project.featured : !project.featured), [filter]);

  return (
    <div className="site-shell">
      <header className="topbar">
        <button className="brand-lockup" onClick={() => scrollToId("top")} aria-label="Back to top">
          <span className="brand-am" aria-hidden="true">AM</span>
          <span className="brand-name">AZIZ MESSAOUD</span>
        </button>
        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          {navItems.map(([label, id]) => <button key={id} onClick={() => { scrollToId(id); setMenuOpen(false); }}>{label}</button>)}
          <a href={cvUrl} target="_blank" rel="noreferrer" className="nav-cv">View CV <Download size={14} /></a>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </header>

      <main>
        <section id="top" className="hero-section">
          <div className="hero-network">
            <Suspense fallback={<div className="network-scanline" />}><NeuralField paused={animationPaused} /></Suspense>
            <div className="network-scanline" />
            <p className="sr-only">Interactive background animation. It is decorative and can be ignored.</p>
            <div className="network-controls">
              <div className="network-hint"><span className="live-dot" /> Move to wake · click to send signal</div>
              <button className="animation-toggle" type="button" aria-pressed={animationPaused} onClick={() => setAnimationPaused((paused) => !paused)}>{animationPaused ? "Play animation" : "Pause animation"}</button>
            </div>
          </div>
          <div className="hero-content container">
            <div className="hero-kicker"><span className="live-dot" /> Available for a 2027 PFE — a 6-month end-of-studies internship · Ariana, Tunisia</div>
            <div className="hero-grid">
              <div className="hero-copy">
                <p className="section-index">01 / PROFILE</p>
                <h1>Data Science<br /><em>student</em> building<br />practical AI systems.</h1>
                <p className="hero-lede">I turn data and models into useful, reliable applications—moving from exploration and evaluation to intelligent interfaces, APIs, and workflows.</p>
                <div className="hero-actions">
                  <Button className="signal-button" onClick={() => scrollToId("work")}>Inspect selected work <ArrowUpRight size={17} /></Button>
                  <a className="text-link" href={cvUrl} target="_blank" rel="noreferrer"><Download size={15} /> View CV</a>
                </div>
              </div>
              <div className="hero-proof">
                <span className="proof-label">/ CURRENT DIRECTION</span>
                <div className="proof-chain"><span>DATA SCIENCE</span><i /> <span>MACHINE LEARNING</span><i /> <span>AI ENGINEERING</span><i /> <span>PRODUCTION AI</span></div>
                <div className="hero-note"><span className="mono-label">01</span><p>AI Research is the method: hypothesis, experiment, baseline, evaluation, analysis.</p></div>
              </div>
            </div>
            <div className="hero-footer"><span>Scroll to inspect the work</span><span className="scroll-line" /><span className="mono-label">01—08</span></div>
          </div>
        </section>

        <section id="work" className="work-section container section-block">
          <div className="section-heading"><div><p className="section-index">02 / SELECTED WORK</p><h2>Proof over promises.</h2></div><p className="section-intro">Three flagship cases show the path from data and model decisions to working systems. Supporting projects add breadth without diluting the signal.</p></div>
          <div className="filter-row" role="tablist" aria-label="Project filters">
            {[['all', 'All work'], ['flagship', 'Flagship cases'], ['supporting', 'Supporting work']].map(([value, label]) => <button key={value} role="tab" aria-selected={filter === value} className={filter === value ? "active" : ""} onClick={() => setFilter(value as typeof filter)}>{label}</button>)}
          </div>
          <div className="project-list">
            {visibleProjects.map((project, index) => <motion.article key={project.title} id={project.title === "ALIA" ? "case-alia" : project.title === "HR Document Intelligence" ? "case-hr" : undefined} className={`project-row ${index % 2 ? "reverse" : ""}`} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55 }}>
              <div className={`project-art ${project.featured ? "featured-art" : "supporting-art"}`}><ProjectSwirl number={project.number} /><span className="art-index">{project.number}</span><span className="art-status">{project.status}</span>{project.featured && <span className="art-feature">FLAGSHIP EVIDENCE</span>}</div>
              <div className="project-copy"><p className="project-eyebrow">{project.eyebrow}</p><h3>{project.title}</h3><p className="project-summary">{project.summary}</p><div className="project-meta"><div><span className="mono-label">MY CONTRIBUTION</span><p>{project.details}</p></div><div><span className="mono-label">WHAT CAME OF IT</span><p>{project.outcome}</p></div></div><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-links"><a className="project-link" href={project.link} target={project.link.startsWith("#") ? undefined : "_blank"} rel={project.link.startsWith("#") ? undefined : "noreferrer"}>{project.linkLabel} <ExternalLink size={15} /></a>{project.paperLink && <a className="project-link paper-link" href={project.paperLink} target="_blank" rel="noreferrer">{project.paperLabel ?? "Read paper"} <ExternalLink size={15} /></a>}</div></div>
            </motion.article>)}
          </div>
        </section>

        <section id="approach" className="approach-section section-block">
          <div className="container"><div className="section-heading"><div><p className="section-index">03 / HOW I WORK</p><h2>From signal<br /><em>to system.</em></h2></div><p className="section-intro">The through-line is simple: understand the data, make the decision explicit, test the system, and explain what remains uncertain.</p></div><div className="approach-grid"><div className="approach-step"><span>01</span><h3>Frame</h3><p>Turn an ambiguous goal into a measurable research or product question.</p></div><div className="approach-step"><span>02</span><h3>Build</h3><p>Use models, APIs, agents, and interfaces that fit the actual constraints.</p></div><div className="approach-step"><span>03</span><h3>Evaluate</h3><p>Compare against a baseline, document the metric, and make the limitation visible.</p></div><div className="approach-step"><span>04</span><h3>Explain</h3><p>Leave behind a case another person can inspect, reproduce, and challenge.</p></div></div></div>
        </section>

        <section id="about" className="about-section container section-block"><div className="about-grid"><div><p className="section-index">04 / ABOUT</p><h2>Curious by default.<br /><em>Rigorous by practice.</em></h2><p className="about-copy">I am a Computer Engineering student at ESPRIT specializing in Data Science. My direction follows a clear progression from data science foundations and machine learning to AI engineering, production systems, and agentic workflows.</p><p className="about-copy">I am strengthening probability and statistics, algorithms, system design, microservices, and MLOps while continuing to build practical projects in NLP, generative AI, document intelligence, search intelligence, and analytics.</p></div><div className="skill-panel"><span className="mono-label">/ WORKING TOOLKIT</span><div className="skill-cloud">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div><div className="about-details"><div><span className="mono-label">EDUCATION</span><p>Data Science Engineering<br />ESPRIT · Expected 2027</p></div><div><span className="mono-label">LANGUAGES</span><p>Arabic · French · English</p></div></div></div></div></section>

        <section id="experience" className="exp-section section-block"><div className="container"><div className="section-heading"><div><p className="section-index">05 / EXPERIENCE</p><h2>Applied expertise.</h2></div><p className="section-intro">Professional engagements focused on AI implementation, ML research, and software engineering.</p></div><div className="exp-grid">{experiences.map((exp, index) => <div className="exp-item" key={exp.company}><div className="exp-header"><span className="exp-number">0{index + 1}</span><div><h3>{exp.role}</h3><p className="exp-company">{exp.company} · {exp.period}</p></div><span className="exp-location">{exp.location}</span></div><ul className="exp-desc">{exp.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div>)}</div></div></section>

        <section id="volunteering" className="vol-section section-block"><div className="container"><div className="section-heading"><div><p className="section-index">06 / VOLUNTEERING</p><h2>🤝 Volunteering &amp; Clubs.</h2></div><p className="section-intro">Community involvement and extracurricular activities.</p></div><div className="exp-grid">{volunteering.map((item, index) => <div className="exp-item" key={item.org}><div className="exp-header"><span className="exp-number">0{index + 1}</span><div><h3>{item.org}</h3><p className="exp-company">{item.role} · {item.period}</p></div></div><p className="exp-desc">{item.summary}</p><div className="vol-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>)}</div></div></section>

        <section id="certifications" className="cert-section section-block">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="section-index">07 / CERTIFICATIONS</p>
                <h2>Learning, indexed.</h2>
              </div>
              <p className="section-intro">A living record of the foundations supporting the work—not a substitute for the work itself.</p>
            </div>
            <div className="cert-grid">
              {certificates.map((cert, index) => {
                const content = (
                  <>
                    <span className="cert-number">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{cert.title}</h3>
                      <p>{cert.issuer} · {cert.year}</p>
                    </div>
                    <ArrowUpRight size={15} />
                  </>
                );

                if (cert.link) {
                  return (
                    <a href={cert.link} target="_blank" rel="noreferrer" className="cert-item" key={cert.title}>
                      {content}
                    </a>
                  );
                }

                return (
                  <div className="cert-item" key={cert.title}>
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section section-block"><div className="container contact-inner"><div><p className="section-index">08 / CONTACT</p><h2>Have a real problem<br /><em>worth investigating?</em></h2><p className="contact-copy">I am looking for a PFE where I can contribute to a serious Data Science, ML engineering, AI engineering, agentic AI, or research project.</p></div><div className="contact-card"><a href={`mailto:${profile.email}`} className="contact-email">{profile.email} <ArrowUpRight size={18} /></a><div className="contact-links"><a href={profile.links.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a><a href={profile.links.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a><a href={`mailto:${profile.email}`}><Mail size={16} /> Email</a><a href={profile.links.kaggle} target="_blank" rel="noreferrer"><span className="platform-icon">K</span> Kaggle</a><a href={profile.links.leetcode} target="_blank" rel="noreferrer"><span className="platform-icon">LC</span> LeetCode</a><a href={profile.links.codeforces} target="_blank" rel="noreferrer"><span className="platform-icon">CF</span> Codeforces</a><a href={profile.links.zindi} target="_blank" rel="noreferrer"><span className="platform-icon">Z</span> Zindi</a><a href={profile.links.devpost} target="_blank" rel="noreferrer"><span className="platform-icon">D</span> Devpost</a></div><p className="contact-location"><MapPin size={15} /> {profile.location}</p></div></div></section>
      </main>
      <footer className="footer container"><span>© 2026 Aziz Messaoud</span><span>Built with React · TypeScript · signal, not noise</span><a href="#top">Back to top ↑</a></footer>
    </div>
  );
}
