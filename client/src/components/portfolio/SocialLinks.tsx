import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/portfolioData";

const secondaryProfiles = [
  { label: "Kaggle", href: profile.links.kaggle },
  { label: "LeetCode", href: profile.links.leetcode },
  { label: "Codeforces", href: profile.links.codeforces },
  { label: "Zindi", href: profile.links.zindi },
  { label: "Devpost", href: profile.links.devpost },
];

export default function SocialLinks() {
  return (
    <ul className="social-links" aria-label="Other profiles">
      {secondaryProfiles.map((item) => (
        <li key={item.label}>
          <a href={item.href} target="_blank" rel="noreferrer">
            {item.label} <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
