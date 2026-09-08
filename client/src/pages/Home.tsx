/* Signal Atelier style: evidence-first editorial layout with a technical rail, restrained motion, and a living neural field behind the hero. */
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, ExternalLink, Github, Linkedin, Mail, MapPin, Menu, X } from "lucide-react";
import NeuralField from "@/components/NeuralField";
import { Button } from "@/components/ui/button";
import { certificates, cvUrl, profile, projects, skills } from "@/lib/portfolioData";

const navItems = [
  ["Work", "work"],
  ["Approach", "approach"],
  ["About", "about"],
  ["Contact", "contact"],
] as const;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "flagship" | "supporting">("all");
  const [activeSection, setActiveSection] = useState("01 / PROFILE");

  useEffect(() => {
    const sections = [
      ["top", "01 / PROFILE"],
      ["work", "02 / SELECTED WORK"],
      ["approach", "03 / HOW I WORK"],
      ["about", "04 / ABOUT"],
      ["certifications", "05 / CERTIFICATIONS"],
      ["contact", "06 / CONTACT"],
    ] as const;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(sections.find(([id]) => id === visible.target.id)?.[1] ?? "01 / PROFILE");
    }, { rootMargin: "-24% 0px -58% 0px", threshold: [0.1, 0.35, 0.7] });
    sections.forEach(([id]) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);
  const visibleProjects = useMemo(() => filter === "all" ? projects : projects.filter((project) => filter === "flagship" ? project.number < "04" : project.number >= "04"), [filter]);

  return (
    <div className="site-shell">
      <header className="topbar">
        <button className="brand-lockup" onClick={() => scrollToId("top")} aria-label="Back to top">
          <span className="brand-mark"><img src="/manus-storage/aziz-signal-mark_a419c9f0.png" alt="" /><span /></span>
          <span className="brand-name">AZIZ MESSAOUD</span>
        </button>
        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          {navItems.map(([label, id]) => <button key={id} onClick={() => { scrollToId(id); setMenuOpen(false); }}>{label}</button>)}
          <a href={cvUrl} download="Aziz_Messaoud_CV.pdf" className="nav-cv">Download CV <Download size={14} /></a>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </header>

      <main id="top"><div className="ledger-rail" aria-live="polite"><span className="ledger-current">{activeSection}</span><i /><span>DATA → MODEL → SYSTEM</span></div>
        <section className="hero-section">
          <div className="hero-network"><NeuralField /><div className="network-scanline" /><div className="network-hint"><span className="live-dot" /> Move to wake · click to send signal</div></div>
          <div className="hero-content container">
            <div className="hero-kicker"><span className="live-dot" /> Available for a 2027 PFE · Ariana, Tunisia</div>
            <div className="hero-grid">
              <div className="hero-copy">
                <p className="section-index">01 / PROFILE</p>
                <h1>Data Science<br /><em>student</em> building<br />practical AI systems.</h1>
                <p className="hero-lede">I turn data and models into useful, reliable applications—moving from exploration and evaluation to intelligent interfaces, APIs, and workflows.</p>
                <div className="hero-actions">
                  <Button className="signal-button" onClick={() => scrollToId("work")}>Inspect selected work <ArrowUpRight size={17} /></Button>
                  <a className="text-link" href={cvUrl} download="Aziz_Messaoud_CV.pdf"><Download size={15} /> Download CV</a>
                </div>
              </div>
              <div className="hero-proof">
                <span className="proof-label">/ CURRENT DIRECTION</span>
                <div className="proof-chain"><span>DATA SCIENCE</span><i /> <span>MACHINE LEARNING</span><i /> <span>AI ENGINEERING</span><i /> <span>PRODUCTION AI</span></div>
                <div className="hero-note"><span className="mono-label">01</span><p>AI Research is the method: hypothesis, experiment, baseline, evaluation, analysis.</p></div>
              </div>
            </div>
            <div className="hero-footer"><span>Scroll to inspect the work</span><span className="scroll-line" /><span className="mono-label">01—06</span></div>
          </div>
        </section>

        <section id="work" className="work-section container section-block">
          <div className="section-heading"><div><p className="section-index">02 / SELECTED WORK</p><h2>Proof over promises.</h2></div><p className="section-intro">Three flagship cases show the path from data and model decisions to working systems. Supporting projects add breadth without diluting the signal.</p></div>
          <div className="filter-row" role="tablist" aria-label="Project filters">
            {[['all', 'All work'], ['flagship', 'Flagship cases'], ['supporting', 'Supporting work']].map(([value, label]) => <button key={value} role="tab" aria-selected={filter === value} className={filter === value ? "active" : ""} onClick={() => setFilter(value as typeof filter)}>{label}</button>)}
          </div>
          <div className="project-list">
            {visibleProjects.map((project, index) => <motion.article key={project.title} id={project.number === "01" ? "case-alia" : project.number === "02" ? "case-hr" : undefined} className={`project-row ${index % 2 ? "reverse" : ""}`} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55 }}>
              <div className={`project-art ${project.featured ? "featured-art" : "supporting-art"}`}><img src={project.visual} alt={`Abstract visual for ${project.title}`} /><span className="art-index">{project.number}</span><span className="art-status">{project.status}</span>{project.featured && <span className="art-feature">FLAGSHIP EVIDENCE</span>}</div>
              <div className="project-copy"><p className="project-eyebrow">{project.eyebrow}</p><h3>{project.title}</h3><p className="project-summary">{project.summary}</p><div className="project-meta"><div><span className="mono-label">MY CONTRIBUTION</span><p>{project.details}</p></div><div><span className="mono-label">WHAT CAME OF IT</span><p>{project.outcome}</p></div></div><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="project-link" href={project.link} target={project.link.startsWith("#") ? undefined : "_blank"} rel={project.link.startsWith("#") ? undefined : "noreferrer"}>{project.linkLabel} <ExternalLink size={15} /></a></div>
            </motion.article>)}
          </div>
        </section>

        <section id="approach" className="approach-section section-block">
          <div className="container"><div className="section-heading"><div><p className="section-index">03 / HOW I WORK</p><h2>From signal<br /><em>to system.</em></h2></div><p className="section-intro">The through-line is simple: understand the data, make the decision explicit, test the system, and explain what remains uncertain.</p></div><div className="approach-grid"><div className="approach-step"><span>01</span><h3>Frame</h3><p>Turn an ambiguous goal into a measurable research or product question.</p></div><div className="approach-step"><span>02</span><h3>Build</h3><p>Use models, APIs, agents, and interfaces that fit the actual constraints.</p></div><div className="approach-step"><span>03</span><h3>Evaluate</h3><p>Compare against a baseline, document the metric, and make the limitation visible.</p></div><div className="approach-step"><span>04</span><h3>Explain</h3><p>Leave behind a case another person can inspect, reproduce, and challenge.</p></div></div></div>
        </section>

        <section id="about" className="about-section container section-block"><div className="about-grid"><div><p className="section-index">04 / ABOUT</p><h2>Curious by default.<br /><em>Rigorous by practice.</em></h2><p className="about-copy">I am a Computer Engineering student at ESPRIT specializing in Data Science. My direction follows a clear progression from data science foundations and machine learning to AI engineering, production systems, and agentic workflows.</p><p className="about-copy">I am strengthening probability and statistics, algorithms, system design, microservices, and MLOps while continuing to build practical projects in NLP, generative AI, document intelligence, search intelligence, and analytics.</p></div><div className="skill-panel"><span className="mono-label">/ WORKING TOOLKIT</span><div className="skill-cloud">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div><div className="about-details"><div><span className="mono-label">EDUCATION</span><p>Data Science Engineering<br />ESPRIT · Expected 2027</p></div><div><span className="mono-label">LANGUAGES</span><p>Arabic · French · English</p></div></div></div></div></section>

        <section id="certifications" className="cert-section section-block"><div className="container"><div className="section-heading"><div><p className="section-index">05 / CERTIFICATIONS</p><h2>Learning, indexed.</h2></div><p className="section-intro">A living record of the foundations supporting the work—not a substitute for the work itself.</p></div><div className="cert-grid">{certificates.map((cert, index) => <div className="cert-item" key={cert.title}><span className="cert-number">0{index + 1}</span><div><h3>{cert.title}</h3><p>{cert.issuer} · {cert.year}</p></div><ArrowUpRight size={15} /></div>)}</div></div></section>

        <section id="contact" className="contact-section section-block"><div className="container contact-inner"><div><p className="section-index">06 / CONTACT</p><h2>Have a real problem<br /><em>worth investigating?</em></h2><p className="contact-copy">I am looking for a PFE where I can contribute to a serious Data Science, ML engineering, AI engineering, agentic AI, or research project.</p></div><div className="contact-card"><a href={`mailto:${profile.email}`} className="contact-email">{profile.email} <ArrowUpRight size={18} /></a><div className="contact-links"><a href={profile.links.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a><a href={profile.links.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a><a href={cvUrl} download="Aziz_Messaoud_CV.pdf"><Download size={16} /> Download CV</a></div><p className="contact-location"><MapPin size={15} /> {profile.location}</p></div></div></section>
      </main>
      <footer className="footer container"><span>© 2026 Aziz Messaoud</span><span>Built with React · TypeScript · signal, not noise</span><a href="#top">Back to top ↑</a></footer>
    </div>
  );
}
