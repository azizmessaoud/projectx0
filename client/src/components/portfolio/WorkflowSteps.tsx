import { workflow } from "@/lib/portfolioData";

export default function WorkflowSteps() {
  return (
    <ol className="workflow">
      {workflow.map((step, index) => (
        <li key={step.title} className="workflow__step">
          <span className="workflow__index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
          <p className="workflow__example">
            <span className="mono-label">In practice</span> {step.example}
          </p>
        </li>
      ))}
    </ol>
  );
}
