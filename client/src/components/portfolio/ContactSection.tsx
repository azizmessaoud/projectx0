import { ArrowUpRight, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { cvUrl, profile } from "@/lib/portfolioData";
import SectionHeader from "./SectionHeader";
import SocialLinks from "./SocialLinks";

const primaryContacts = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}?subject=2027%20PFE%20internship`, Icon: Mail },
  { label: "LinkedIn", value: "in/azizmessaoud", href: profile.links.linkedin, Icon: Linkedin },
  { label: "GitHub", value: "azizmessaoud", href: profile.links.github, Icon: Github },
  { label: "CV", value: "Download CV", href: cvUrl, Icon: Download },
];

export default function ContactSection() {
  return (
    <section id="contact" className="section section--band" aria-labelledby="contact-title" tabIndex={-1}>
      <div className="container contact">
        <SectionHeader
          id="contact"
          index="08"
          label="Contact"
          title="Let's build something that holds up."
          intro="Available to discuss a 2027 PFE (final-year internship) in AI/ML engineering, applied data science, or AI research."
        />
        <ul className="contact-grid">
          {primaryContacts.map(({ label, value, href, Icon }) => {
            const external = href.startsWith("http");
            return (
              <li key={label}>
                <a className="contact-tile" href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
                  <Icon size={20} aria-hidden="true" />
                  <span className="contact-tile__label mono-label">{label}</span>
                  <span className="contact-tile__value">{value}</span>
                  {external ? <ArrowUpRight size={16} aria-hidden="true" className="contact-tile__arrow" /> : null}
                </a>
              </li>
            );
          })}
        </ul>
        <p className="mono-label contact__more">More profiles</p>
        <SocialLinks />
        <p className="contact__location">
          <MapPin size={16} aria-hidden="true" /> {profile.location} · open to hybrid or remote
        </p>
      </div>
    </section>
  );
}
