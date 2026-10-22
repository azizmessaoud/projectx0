# Button

Three source variants: the solid violet hero CTA, the glass pill used for "Download CV" in the nav, and the glass outline link used for "View Certificate".

- **primary** (`.am-btn--primary`): `primary` fill, `primary-foreground` 16px bold text, `radius-lg`, padding `space-4` × `space-8`, `glow-primary`. One per view — the main action ("View My Work"). On hover the fill drops to 90% and a white shimmer sweeps across; a trailing arrow nudges 4px right.
- **pill** (`.am-btn--pill`): `glass-10` fill and border, `radius-full`, 14px medium. Secondary actions in the nav.
- **glass** (`.am-btn--glass`): `glass-5` fill, `glass-10` border, `radius-lg`. On hover: `primary` 20% fill, 50% border, `glow-violet`. Card-level links.

The consumer supplies the label (Title Case), an optional 16px trailing icon, and `href` or `onClick`. Focus shows the 2px `ring`.
