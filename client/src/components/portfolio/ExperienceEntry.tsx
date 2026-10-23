import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { goToSection } from "@/hooks/useActiveSection";
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
        {entry.highlights.length ? (
          <ul className="bullet-list">
            {entry.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        ) : null}
        {entry.links?.length ? (
          <div className="link-row">
            {entry.links.map((link) =>
              link.href.startsWith("#") ? (
                <a
                  key={link.href}
                  className="text-link"
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    goToSection(link.href.slice(1));
                  }}
                >
                  {link.label} <ArrowDownRight size={14} aria-hidden="true" />
                </a>
              ) : (
                <a key={link.href} className="text-link" href={link.href} target="_blank" rel="noreferrer">
                  {link.label} <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ),
            )}
          </div>
        ) : null}
      </div>
    </li>
  );
}
