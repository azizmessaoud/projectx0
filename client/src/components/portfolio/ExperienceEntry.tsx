import { ArrowUpRight } from "lucide-react";
import type { Experience } from "@/lib/portfolioData";

export default function ExperienceEntry({ entry }: { entry: Experience }) {
  return (
    <li className="timeline-entry">
      <p className="timeline-entry__period mono-label">{entry.period}</p>
      <div className="timeline-entry__body">
        <h3>
          {entry.role} <span className="timeline-entry__org">· {entry.company}</span>
        </h3>
        <p className="timeline-entry__meta">{entry.location}</p>
        <p className="timeline-entry__summary">{entry.summary}</p>
        <ul className="bullet-list">
          {entry.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        {entry.link ? (
          <a className="text-link" href={entry.link.href} target="_blank" rel="noreferrer">
            {entry.link.label} <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </li>
  );
}
