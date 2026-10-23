import { ArrowUpRight, FileText, Github, Globe, Mail } from "lucide-react";
import type { FlagshipProject, Metric, ProjectLink } from "@/lib/portfolioData";
import ProjectVisual from "./ProjectVisuals";

const linkIcons = { paper: FileText, code: Github, demo: Globe, contact: Mail } as const;

export function ProjectLinkButton({ link }: { link: ProjectLink }) {
  const Icon = linkIcons[link.kind];
  const external = link.href.startsWith("http");
  return (
    <a className="text-link" href={link.href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
      <Icon size={16} aria-hidden="true" />
      {link.label}
      {external ? <ArrowUpRight size={14} aria-hidden="true" /> : null}
    </a>
  );
}

function MetricBars({ metrics }: { metrics: Metric[] }) {
  return (
    <table className="metric-table">
      <caption className="sr-only">Model compared with baseline on the grouped holdout</caption>
      <thead>
        <tr>
          <th scope="col">Metric</th>
          <th scope="col">Baseline</th>
          <th scope="col">Model</th>
        </tr>
      </thead>
      <tbody>
        {metrics.map((metric) => (
          <tr key={metric.label}>
            <th scope="row">{metric.label}</th>
            <td>
              <span className="metric-bar metric-bar--baseline" style={{ width: `${metric.baseline * 100}%` }} />
              <span className="metric-value">{metric.baseline.toFixed(2)}</span>
            </td>
            <td>
              <span className="metric-bar" style={{ width: `${metric.model * 100}%` }} />
              <span className="metric-value">{metric.model.toFixed(2)}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function ProjectCaseCard({ project, index }: { project: FlagshipProject; index: number }) {
  return (
    <article id={project.id} className="case-card" aria-labelledby={`${project.id}-title`}>
      <header className="case-card__head">
        <p className="mono-label case-card__category">
          <span>{String(index + 1).padStart(2, "0")}</span> {project.category}
        </p>
        <h3 id={`${project.id}-title`}>{project.title}</h3>
        <p className="status-tag">{project.status}</p>
      </header>

      <div className="case-card__outcome">
        <p className="mono-label">Verified outcome</p>
        <p className="case-card__result">{project.outcome}</p>
        {project.metrics ? <MetricBars metrics={project.metrics} /> : null}
        {project.outcomeNote ? <p className="case-card__caveat">{project.outcomeNote}</p> : null}
      </div>

      <div className="case-card__visual">
        <ProjectVisual kind={project.visual} />
      </div>

      <div className="case-card__problem">
        <p className="mono-label">Problem</p>
        <p>{project.problem}</p>
      </div>

      <div className="case-card__contribution">
        <p className="mono-label">My contribution</p>
        <ul>
          {project.contribution.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <footer className="case-card__foot">
        <ul className="tag-list" aria-label="Technologies">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <div className="link-row">
          {project.links.map((link) => (
            <ProjectLinkButton key={link.href} link={link} />
          ))}
        </div>
      </footer>
    </article>
  );
}
