import type { ReactNode } from "react";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: string;
  id: string;
  intro?: ReactNode;
}

export default function SectionHeader({ index, label, title, id, intro }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <p className="section-index">
        <span>{index}</span> / {label}
      </p>
      <h2 id={`${id}-title`}>{title}</h2>
      {intro ? <p className="section-intro">{intro}</p> : null}
    </div>
  );
}
