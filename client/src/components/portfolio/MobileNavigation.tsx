import { Download } from "lucide-react";
import { useEffect, useRef } from "react";
import { cvUrl, sections } from "@/lib/portfolioData";

interface MobileNavigationProps {
  open: boolean;
  active: string;
  onNavigate: (id: string) => void;
  onClose: () => void;
}

export default function MobileNavigation({ open, active, onNavigate, onClose }: MobileNavigationProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div id="mobile-navigation" ref={panelRef} className="mobile-nav" hidden={!open}>
      <nav aria-label="Sections">
        <ol>
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={active === section.id ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(section.id);
                }}
              >
                <span className="nav-index">{section.index}</span>
                {section.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <a className="button button--secondary mobile-nav__cv" href={cvUrl} target="_blank" rel="noreferrer">
        <Download size={16} aria-hidden="true" /> Download CV
      </a>
    </div>
  );
}
