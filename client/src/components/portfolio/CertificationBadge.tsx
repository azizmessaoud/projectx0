import { ArrowUpRight } from "lucide-react";
import type { Credential } from "@/lib/portfolioData";

export default function CertificationBadge({ credential }: { credential: Credential }) {
  return (
    <li className="cert-badge">
      <p className="mono-label cert-badge__issuer">{credential.issuer}</p>
      <h3>{credential.short ?? credential.title}</h3>
      {credential.short ? <p className="cert-badge__official">{credential.title}</p> : null}
      <div className="cert-badge__foot">
        <span className="cert-badge__type">
          {credential.type} · {credential.year}
        </span>
        {credential.link ? (
          <a className="text-link" href={credential.link} target="_blank" rel="noreferrer">
            Verify <ArrowUpRight size={14} aria-hidden="true" />
            <span className="sr-only"> {credential.title}</span>
          </a>
        ) : (
          <span className="cert-badge__type">Link unavailable</span>
        )}
      </div>
    </li>
  );
}
