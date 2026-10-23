/* Signal Atelier: dark editorial research layout, one page with numbered sections. */
import CertificationBadge from "@/components/portfolio/CertificationBadge";
import ContactSection from "@/components/portfolio/ContactSection";
import CourseChip from "@/components/portfolio/CourseChip";
import ExperienceEntry from "@/components/portfolio/ExperienceEntry";
import HeroSection from "@/components/portfolio/HeroSection";
import ProjectCaseCard from "@/components/portfolio/ProjectCaseCard";
import SectionHeader from "@/components/portfolio/SectionHeader";
import SiteFooter from "@/components/portfolio/SiteFooter";
import SiteHeader from "@/components/portfolio/SiteHeader";
import SupportingProjectCard from "@/components/portfolio/SupportingProjectCard";
import VolunteeringEntry from "@/components/portfolio/VolunteeringEntry";
import WorkflowSteps from "@/components/portfolio/WorkflowSteps";
import { useActiveSection } from "@/hooks/useActiveSection";
import {
  additionalCredentials,
  experiences,
  flagshipProjects,
  priorityCredentials,
  sections,
  skills,
  supportingProjects,
  volunteering,
} from "@/lib/portfolioData";

const sectionIds = sections.map((section) => section.id);

export default function Home() {
  const active = useActiveSection(sectionIds);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#work">
        Skip to selected work
      </a>
      <SiteHeader active={active} />

      <main>
        <HeroSection />

        <section id="work" className="section" aria-labelledby="work-title" tabIndex={-1}>
          <div className="container">
            <SectionHeader
              id="work"
              index="02"
              label="Selected work"
              title="Selected work"
              intro="Four systems with the problem, who built what, and the evidence. Limitations are stated where they matter."
            />
            <div className="case-list">
              {flagshipProjects.map((project, index) => (
                <ProjectCaseCard key={project.id} project={project} index={index} />
              ))}
            </div>
            <h3 className="subsection-title">Supporting projects</h3>
            <div className="support-grid">
              {supportingProjects.map((project) => (
                <SupportingProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section id="method" className="section section--band" aria-labelledby="method-title" tabIndex={-1}>
          <div className="container">
            <SectionHeader
              id="method"
              index="03"
              label="How I work"
              title="Measure first, then build what holds up."
              intro="The same four steps run through the projects above."
            />
            <WorkflowSteps />
          </div>
        </section>

        <section id="about" className="section" aria-labelledby="about-title" tabIndex={-1}>
          <div className="container about">
            <div className="about__copy">
              <SectionHeader id="about" index="04" label="About" title="About" />
              <p>
                I study Data Science Engineering at ESPRIT in Tunisia and graduate in 2027. I am looking for a final-year (PFE)
                internship where I can work on applied machine learning or AI engineering.
              </p>
              <p>
                Most of my recent work sits between an experiment and a working tool: ranking pages for human review, extracting
                and validating fields from HR documents, and building parts of a conversational training avatar.
              </p>
              <p>
                I try to connect the two halves. An experiment should end with a baseline, a metric, and a stated limit; software
                should keep the evidence that lets a person check its output.
              </p>
            </div>
            <aside className="about__panel" aria-label="Profile summary">
              <img
                className="about__portrait"
                src={`${import.meta.env.BASE_URL}portrait.jpg`}
                width={640}
                height={640}
                loading="lazy"
                decoding="async"
                alt="Portrait of Aziz Messaoud"
              />
              <dl className="fact-list">
                <div>
                  <dt>Education</dt>
                  <dd>Data Science Engineering, ESPRIT · expected 2027</dd>
                </div>
                <div>
                  <dt>Looking for</dt>
                  <dd>2027 PFE · Data Science, ML / AI Engineering, Applied AI</dd>
                </div>
                <div>
                  <dt>Languages</dt>
                  <dd>Arabic · French · English</dd>
                </div>
              </dl>
              <p className="mono-label about__toolkit-label">Working toolkit</p>
              <ul className="tag-list" aria-label="Working toolkit">
                {Object.values(skills)
                  .flat()
                  .map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
              </ul>
            </aside>
          </div>
        </section>

        <section id="experience" className="section section--band" aria-labelledby="experience-title" tabIndex={-1}>
          <div className="container">
            <SectionHeader id="experience" index="05" label="Experience" title="Experience" intro="Internships, most recent first." />
            <ol className="timeline">
              {experiences.map((entry) => (
                <ExperienceEntry key={`${entry.company}-${entry.period}`} entry={entry} />
              ))}
            </ol>
          </div>
        </section>

        <section id="volunteering" className="section" aria-labelledby="volunteering-title" tabIndex={-1}>
          <div className="container">
            <SectionHeader id="volunteering" index="06" label="Volunteering" title="Volunteering & clubs" />
            <ol className="timeline">
              {volunteering.map((entry) => (
                <VolunteeringEntry key={entry.org} entry={entry} />
              ))}
            </ol>
          </div>
        </section>

        <section id="certifications" className="section section--band" aria-labelledby="certifications-title" tabIndex={-1}>
          <div className="container">
            <SectionHeader
              id="certifications"
              index="07"
              label="Certifications"
              title="Certifications & learning"
              intro="Each item links to its issuer's verification page."
            />
            <h3 className="subsection-title">Priority credentials</h3>
            <ul className="cert-grid">
              {priorityCredentials.map((credential) => (
                <CertificationBadge key={credential.title} credential={credential} />
              ))}
            </ul>
            <h3 className="subsection-title">Additional learning</h3>
            <ul className="course-list">
              {additionalCredentials.map((credential) => (
                <CourseChip key={credential.title} credential={credential} />
              ))}
            </ul>
          </div>
        </section>

        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
