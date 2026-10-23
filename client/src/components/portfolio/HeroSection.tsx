import { ArrowDown, Download, Mail, Pause, Play } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { goToSection } from "@/hooks/useActiveSection";
import { cvUrl, profile } from "@/lib/portfolioData";
import ProofStrip from "./ProofStrip";

const NeuralField = lazy(() => import("@/components/NeuralField"));

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const list = window.matchMedia(query);
    const update = () => setMatches(list.matches);
    update();
    list.addEventListener("change", update);
    return () => list.removeEventListener("change", update);
  }, [query]);
  return matches;
}

export default function HeroSection() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const smallScreen = useMediaQuery("(max-width: 639px)");
  const finePointer = useMediaQuery("(pointer: fine)");
  // Small screens start with a static frame to save battery; visitors can still start it.
  const [userChoice, setUserChoice] = useState<boolean | null>(null);
  const paused = reducedMotion || (userChoice ?? smallScreen);

  return (
    <section id="top" className="hero" aria-labelledby="hero-title" tabIndex={-1}>
      <div className="hero__field" aria-hidden="true">
        <Suspense fallback={null}>
          <NeuralField paused={paused} />
        </Suspense>
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="section-index">
            <span>01</span> / Identity
          </p>
          <p className="hero__name">{profile.name}</p>
          <p className="hero__meta">{profile.education}</p>
          <h1 id="hero-title">{profile.headline}</h1>
          <p className="hero__lede">{profile.lede}</p>
          <p className="hero__availability">
            <span className="status-dot" aria-hidden="true" />
            {profile.availability}
          </p>
          <div className="hero__actions">
            <a
              className="button button--primary"
              href="#work"
              onClick={(event) => {
                event.preventDefault();
                goToSection("work");
              }}
            >
              Inspect selected work <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a className="button button--secondary" href={cvUrl} target="_blank" rel="noreferrer">
              <Download size={16} aria-hidden="true" /> Download CV
            </a>
            <a className="button button--ghost" href={`mailto:${profile.email}`}>
              <Mail size={16} aria-hidden="true" /> Contact
            </a>
          </div>
        </div>

        <ProofStrip />

        <div className="field-control">
          {reducedMotion ? (
            <p className="field-control__note">Background animation off (reduced motion)</p>
          ) : (
            <>
              {finePointer && !paused ? <p className="field-control__note">Move to wake the network · click to send a signal</p> : null}
              <button type="button" className="field-control__button" onClick={() => setUserChoice(!paused)}>
                {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
                {paused ? "Play animation" : "Pause animation"}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
