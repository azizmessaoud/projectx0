import { goToSection } from "@/hooks/useActiveSection";
import { proofs } from "@/lib/portfolioData";

export default function ProofStrip() {
  return (
    <ul className="proof-strip" aria-label="Evidence at a glance">
      {proofs.map((proof) => (
        <li key={proof.label}>
          <a
            href={`#${proof.anchor}`}
            onClick={(event) => {
              event.preventDefault();
              goToSection(proof.anchor);
            }}
          >
            <span className="mono-label">{proof.label}</span>
            <span className="proof-strip__text">{proof.text}</span>
            <span className="proof-strip__detail">{proof.detail}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
