/* Diagrams drawn from each project's documented architecture or published results.
 * No screenshots, sample records, or numbers beyond those in the project materials. */
import type { FlagshipProject } from "@/lib/portfolioData";

interface RailStep {
  label: string;
  detail: string;
  tag?: "mine" | "team";
  branch?: string;
}

function Rail({ steps }: { steps: RailStep[] }) {
  return (
    <ol className="rail">
      {steps.map((step) => (
        <li key={step.label} className={step.tag === "mine" ? "is-mine" : undefined}>
          <span className="rail__label">
            {step.label}
            {step.tag ? <span className={`owner-tag owner-tag--${step.tag}`}>{step.tag === "mine" ? "Mine" : "Team"}</span> : null}
          </span>
          <span className="rail__detail">{step.detail}</span>
          {step.branch ? <span className="rail__branch">{step.branch}</span> : null}
        </li>
      ))}
    </ol>
  );
}

function HierarchyVisual() {
  const networkAgents = ["Forecast", "Incidents", "Rerouting", "Emergency route", "Corridor", "Transit", "Weather", "Notification"];
  const priority = ["Safety", "Emergency", "Directive", "Transit", "Pedestrian", "Normal"];
  return (
    <figure className="visual">
      <p className="visual__title">
        Control hierarchy <span className="owner-tag owner-tag--mine">My design</span>
      </p>
      <div className="tiers">
        <div className="tier">
          <p className="tier__level">Network</p>
          <p className="tier__node">Supermaster</p>
          <ul className="chip-row" aria-label="Network agents">
            {networkAgents.map((agent) => (
              <li key={agent}>{agent}</li>
            ))}
          </ul>
        </div>
        <p className="tier__link">Directives every 5 s · never writes a light</p>
        <div className="tier tier--key">
          <p className="tier__level">Junction ×6</p>
          <p className="tier__node">Master, the only writer of its light</p>
          <ol className="chip-row chip-row--order" aria-label="Fixed priority order">
            {priority.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <p className="tier__note">Advised by 5 agents: traffic light, pedestrian, transit, emergency, sensor health</p>
        </div>
        <p className="tier__link">Writes</p>
        <div className="tier">
          <p className="tier__level">Street</p>
          <p className="tier__node">Signal in SUMO, on real Tunis streets (J1–J6)</p>
        </div>
      </div>
      <figcaption>CoFlow Synapse reads the decision log only: a verified answer, a template, or an abstention, never an action.</figcaption>
    </figure>
  );
}

function RankingVisual() {
  const metrics = [
    { label: "Precision@50", baseline: 0.76, model: 0.94 },
    { label: "R²", baseline: 0.26, model: 0.5 },
  ];
  return (
    <figure className="visual">
      <p className="visual__title">Grouped holdout, 8 unseen clients</p>
      <div className="bars">
        {metrics.map((metric) => (
          <div key={metric.label} className="bars__group">
            <p className="bars__metric">{metric.label}</p>
            <p className="bars__row">
              <span className="bars__name">Baseline</span>
              <span className="bars__track">
                <span className="bars__fill bars__fill--baseline" style={{ width: `${metric.baseline * 100}%` }} />
              </span>
              <span className="bars__value">{metric.baseline.toFixed(2)}</span>
            </p>
            <p className="bars__row">
              <span className="bars__name">Random Forest</span>
              <span className="bars__track">
                <span className="bars__fill" style={{ width: `${metric.model * 100}%` }} />
              </span>
              <span className="bars__value">{metric.model.toFixed(2)}</span>
            </p>
          </div>
        ))}
      </div>
      <div className="timeline-split" aria-label="Time boundary">
        <span>
          <strong>Mar 31, 2026</strong> features
        </span>
        <span aria-hidden="true">→</span>
        <span>
          <strong>Apr 1–7</strong> clicks to predict
        </span>
      </div>
      <figcaption>Train: 11,802 rows from 21 clients. Test: 1,583 rows from 8 other clients, zero overlap.</figcaption>
    </figure>
  );
}

function AvatarVisual() {
  return (
    <figure className="visual">
      <p className="visual__title">Training session</p>
      <Rail
        steps={[
          { label: "Trainee in the browser", detail: "Practice conversation", tag: "team" },
          { label: "Real-time session", detail: "WebSockets to the backend", tag: "team" },
          { label: "Conversation replies", detail: "Groq-hosted LLM", tag: "team" },
          { label: "Avatar fallback", detail: "TalkingHead.js + Three.js", tag: "mine" },
          { label: "Debrief deck", detail: "Agent builds a PowerPoint after the session", tag: "mine" },
        ]}
      />
      <figcaption>
        Speech components are not shown: the public materials do not document them.
      </figcaption>
    </figure>
  );
}

function DocumentVisual() {
  return (
    <figure className="visual">
      <p className="visual__title">Document pipeline</p>
      <Rail
        steps={[
          { label: "Ingest", detail: "PDF or image · pre-flight checks" },
          { label: "Extract", detail: "Docling with a confidence score", branch: "RapidOCR fallback when confidence is low" },
          { label: "Validate", detail: "Canonical HR record · format and business rules" },
          { label: "Explain", detail: "Rule, severity, remediation · values masked" },
          { label: "Human review", detail: "Nothing is written to the HR system automatically" },
        ]}
      />
      <ul className="status-row" aria-label="Possible report statuses">
        <li className="status status--ok">Accepted</li>
        <li className="status status--warn">Review required</li>
        <li className="status status--bad">Rejected</li>
        <li className="status">Failed</li>
      </ul>
    </figure>
  );
}

export default function ProjectVisual({ kind }: { kind: FlagshipProject["visual"] }) {
  if (kind === "hierarchy") return <HierarchyVisual />;
  if (kind === "ranking") return <RankingVisual />;
  if (kind === "avatar") return <AvatarVisual />;
  return <DocumentVisual />;
}
