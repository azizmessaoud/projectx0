import { Menu, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { goToSection } from "@/hooks/useActiveSection";
import { profile, sections } from "@/lib/portfolioData";
import MobileNavigation from "./MobileNavigation";
import Monogram from "./Monogram";

const navSections = sections.filter((section) => section.id !== "top");

export default function SiteHeader({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  const navigate = useCallback((id: string) => {
    setOpen(false);
    // Wait for the menu to unmount and the scroll lock to lift before scrolling.
    requestAnimationFrame(() => goToSection(id));
  }, []);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a
          className="brand"
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            navigate("top");
          }}
        >
          <Monogram />
          <span className="brand__name">{profile.name}</span>
        </a>

        <nav className="desktop-nav" aria-label="Sections">
          <ol>
            {navSections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={active === section.id ? "true" : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(section.id);
                  }}
                >
                  <span className="nav-index">{section.index}</span>
                  {section.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <span className="availability-pill">
          <span className="status-dot" aria-hidden="true" />
          <span>
            <span className="availability-pill__lead">Open to </span>
            <abbr title="Projet de fin d'études: final-year internship">PFE</abbr> 2027
          </span>
        </span>

        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
      <MobileNavigation open={open} active={active} onNavigate={navigate} onClose={close} />
    </header>
  );
}
