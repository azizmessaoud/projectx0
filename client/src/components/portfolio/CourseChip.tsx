import { ArrowUpRight } from "lucide-react";
import type { Credential } from "@/lib/portfolioData";

export default function CourseChip({ credential }: { credential: Credential }) {
  const meta = `${credential.issuer} · ${credential.type} · ${credential.year}`;
  return (
    <li className="course-chip">
      {credential.link ? (
        <a href={credential.link} target="_blank" rel="noreferrer">
          <span className="course-chip__title">{credential.title}</span>
          <span className="course-chip__meta">{meta}</span>
          <ArrowUpRight size={14} aria-hidden="true" className="course-chip__icon" />
        </a>
      ) : (
        <span className="course-chip__static">
          <span className="course-chip__title">{credential.title}</span>
          <span className="course-chip__meta">{meta}</span>
        </span>
      )}
      {credential.secondaryLink ? (
        <a className="course-chip__extra" href={credential.secondaryLink.href} target="_blank" rel="noreferrer">
          {credential.secondaryLink.label}
          <span className="sr-only"> for {credential.title}</span> <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      ) : null}
    </li>
  );
}
