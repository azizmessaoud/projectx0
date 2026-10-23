/* Diagrams drawn from each project's documented architecture. No screenshots or sample data are invented. */
import type { FlagshipProject } from "@/lib/portfolioData";

interface Step {
  label: string;
  detail: string;
  mine?: boolean;
  branch?: boolean;
}

function Pipeline({ steps, caption }: { steps: Step[]; caption: string }) {
  return (
    <figure className="diagram">
      <ol className="diagram__steps">
        {steps.map((step, index) => (
          <li key={step.label} className={[step.mine ? "is-mine" : "", step.branch ? "is-branch" : ""].join(" ").trim() || undefined}>
            <span className="diagram__index">{String(index + 1).padStart(2, "0")}</span>
            <span className="diagram__label">{step.label}</span>
            <span className="diagram__detail">{step.detail}</span>
          </li>
        ))}
      </ol>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function RankingVisual() {
  return (
    <div className="visual">
      <p className="visual__title mono-label">Evaluation design</p>
      <Pipeline
        caption="Features are fixed at the decision date; the label is only used after the baseline is set."
        steps={[
          { label: "Signals · Mar 31, 2026", detail: "7 same-day GSC, GA4, search-volume and age features" },
          { label: "Baseline rule", detail: "60% staleness + 40% visibility, fixed before the label" },
          { label: "Random Forest regressor", detail: "Predicts GSC clicks for Apr 1–7", mine: true },
          { label: "Ranked review queue", detail: "Top 50 go to a person, with reason codes" },
        ]}
      />
      <div className="holdout" role="img" aria-label="Grouped holdout: 11,802 training rows from 21 clients, 1,583 test rows from 8 unseen clients, zero client overlap.">
        <div className="holdout__bar">
          <span className="holdout__train" style={{ flexGrow: 21 }}>
            Train · 21 clients
          </span>
          <span className="holdout__test" style={{ flexGrow: 8 }}>
            Test · 8 unseen
          </span>
        </div>
        <p className="holdout__note">11,802 train rows · 1,583 test rows · 0 client overlap</p>
      </div>
    </div>
  );
}

function AvatarVisual() {
  return (
    <div className="visual">
      <p className="visual__title mono-label">Session flow</p>
      <Pipeline
        caption="Highlighted steps are my parts. Other steps were built by the team; speech components are not shown because they are not described in the public case study."
        steps={[
          { label: "Trainee in the browser", detail: "Practice conversation with the avatar" },
          { label: "Real-time session", detail: "WebSockets between the browser and the backend" },
          { label: "Conversation model", detail: "Groq LLM generates the conversation replies" },
          { label: "Avatar fallback", detail: "TalkingHead.js + Three.js in the browser", mine: true },
          { label: "Debrief agent", detail: "Turns the finished session into a PowerPoint deck", mine: true },
        ]}
      />
      <p className="visual__legend">
        <span className="legend-swatch is-mine" aria-hidden="true" /> My contribution
        <span className="legend-swatch" aria-hidden="true" /> Team component
      </p>
    </div>
  );
}

function DocumentVisual() {
  return (
    <div className="visual">
      <p className="visual__title mono-label">Pipeline</p>
      <Pipeline
        caption="Every document ends with a status and a human decision; nothing is written to the HR system automatically."
        steps={[
          { label: "Upload · PDF or image", detail: "Pre-flight: type, size, signature, readability" },
          { label: "Docling extraction", detail: "Primary local extractor with a confidence score", mine: true },
          { label: "RapidOCR fallback", detail: "Only when confidence or completeness is low", mine: true, branch: true },
          { label: "Field validation", detail: "Canonical HR record + format and business rules", mine: true },
          { label: "Anomaly evidence", detail: "Rule, severity, explanation; sensitive values masked", mine: true },
          { label: "Human review", detail: "ACCEPTED · REVIEW_REQUIRED · REJECTED · FAILED" },
        ]}
      />
      <div className="sample-flag" aria-label="Synthetic example of an anomaly flag">
        <p className="mono-label">Synthetic example</p>
        <dl>
          <div>
            <dt>Field</dt>
            <dd>date_embauche</dd>
          </div>
          <div>
            <dt>Rule</dt>
            <dd>Invalid date ordering</dd>
          </div>
          <div>
            <dt>Value</dt>
            <dd>••••-••-••</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd className="status-amber">REVIEW_REQUIRED</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default function ProjectVisual({ kind }: { kind: FlagshipProject["visual"] }) {
  if (kind === "ranking") return <RankingVisual />;
  if (kind === "avatar") return <AvatarVisual />;
  return <DocumentVisual />;
}
