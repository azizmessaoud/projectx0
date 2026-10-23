import type { SupportingProject } from "@/lib/portfolioData";
import { ProjectLinkButton } from "./ProjectCaseCard";

export default function SupportingProjectCard({ project }: { project: SupportingProject }) {
  return (
    <article className="support-card">
      <h4>{project.title}</h4>
      <p>{project.description}</p>
      <ul className="tag-list tag-list--compact" aria-label="Technologies">
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <ProjectLinkButton link={project.link} />
    </article>
  );
}
