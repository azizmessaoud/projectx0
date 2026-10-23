import { ArrowUp } from "lucide-react";
import { goToSection } from "@/hooks/useActiveSection";
import { profile } from "@/lib/portfolioData";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <span>© 2026 {profile.name}</span>
        <span>{profile.education}</span>
        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            goToSection("top");
          }}
        >
          Back to top <ArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
