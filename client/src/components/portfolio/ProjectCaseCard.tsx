import { ArrowUpRight, ChevronDown, FileText, Github, Globe, Mail } from "lucide-react";
import type { FlagshipProject, ProjectLink } from "@/lib/portfolioData";
import ProjectVisual from "./ProjectVisuals";

const linkIcons = { paper: FileText, code: Github, demo: Globe, contact: Mail } as const;

export function ProjectLinkButton({ link, prominent = false }: { link: ProjectLink; prominent?: boolean }) {
  const Icon = linkIcons[link.kind];
  const external = link.href.startsWith("http");
  return (
    <a
      className={prominent ? "button button--secondary button--compact" : "text-link"}
      href={link.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <Icon size={16} aria-hidden="true" />
      {link.label}
      {external ? <ArrowUpRight size={14} aria-hidden="true" /> : null}
    </a>
  );
}

export default function ProjectCaseCard({ project, index }: { project: FlagshipProject; index: number }) {
  return (
    <article id={project.id} className="case-card" aria-labelledby={`${project.id}-title`}>
      <header className="case-card__head">
        <p className="case-card__category">
          <span className="case-card__index">{String(index + 1).padStart(2, "0")}</span>
          {project.category}
          <span className="case-card__status">{project.status}</span>
        </p>
        <h3 id={`${project.id}-title`}>{project.title}</h3>
        <p className="case-card__problem">{project.problem}</p>
      </header>

      <div className="case-card__visual">
        <ProjectVisual kind={project.visual} />
      </div>

      <div className="case-card__result">
        <p className="mono-label">Result</p>
        <ul className="result-figures">
          {project.result.map((figure) => (
            <li key={figure.label} className={figure.value ? undefined : "is-text"}>
              {figure.value ? <span className="result-figures__value">{figure.value}</span> : null}
              <span className="result-figures__label">
                {figure.label}
                {figure.conditions ? <span className="result-figures__conditions">{figure.conditions}</span> : null}
              </span>
            </li>
          ))}
        </ul>
        <p className="case-card__note">{project.resultNote}</p>
        {project.evidence ? (
          <a className="text-link case-card__evidence" href={project.evidence.href} target="_blank" rel="noreferrer">
            Evidence: {project.evidence.label} <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        ) : null}
      </div>

      <div className="case-card__contribution">
        <p className="mono-label">{project.contributionLabel ?? "My contribution"}</p>
        <ul className="bullet-list">
          {project.contribution.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {project.teamContribution ? (
          <>
            <p className="mono-label case-card__team-label">Rest of the team</p>
            <ul className="bullet-list">
              {project.teamContribution.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        ) : null}
      </div>

      <details className="case-card__details">
        <summary>
          Approach and evaluation <ChevronDown size={16} aria-hidden="true" />
        </summary>
        <ul className="bullet-list">
          {project.approach.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mono-label case-card__limits-label">Limitations</p>
        <ul className="bullet-list">
          {project.limitations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </details>

      <footer className="case-card__foot">
        <ul className="tag-list" aria-label="Technologies">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <div className="link-row">
          {project.links.map((link) => (
            <ProjectLinkButton key={link.href} link={link} prominent />
          ))}
        </div>
      </footer>
    </article>
  );
}
