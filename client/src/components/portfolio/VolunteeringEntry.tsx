import { ArrowUpRight } from "lucide-react";
import type { Volunteering } from "@/lib/portfolioData";

export default function VolunteeringEntry({ entry }: { entry: Volunteering }) {
  return (
    <li className="timeline-entry timeline-entry--compact">
      <p className="timeline-entry__period mono-label">{entry.period}</p>
      <div className="timeline-entry__body">
        <h3>
          {entry.role} <span className="timeline-entry__org">· {entry.org}</span>
        </h3>
        <p className="timeline-entry__summary">{entry.summary}</p>
        {entry.link ? (
          <a className="text-link" href={entry.link.href} target="_blank" rel="noreferrer">
            {entry.link.label} <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </li>
  );
}
