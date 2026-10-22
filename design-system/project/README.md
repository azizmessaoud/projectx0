AzizM is the personal brand of a data-science engineer's portfolio: a deep-navy night sky, a violet-to-blue signal running through it, and glass panels floating above. Build every screen dark; there is no light theme.

## Content fundamentals

- **Voice:** first person, confident and plain. "I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions." Speak as "I"; address the reader as "you" only in calls to action.
- **Headlines** state an outcome, not a job title: "Transforming data into actionable insights". Highlight the payoff phrase with the animated violet → cyan → blue gradient (`violet-400`, `cyan-500`, `blue-500`); the rest stays white.
- **Casing:** Title Case for section titles and buttons ("Featured Projects", "View My Work", "Download CV", "View Certificate"); sentence case for intros ("A glimpse into my personality and what drives me").
- **Emoji:** one emoji leads each section title (💻 Featured Projects). Never inside body copy or buttons.
- **Numbers** appear as counters with a suffix: "10+ Certifications", "2+ Years of Study".

## Colour

- Ground is `background`, with the body's fixed radial glows: `primary` at 15% top-centre and `secondary` at 10% bottom-right, over a vertical gradient to `background-deep`. Alternate section bands start from `surface-900`, `surface-850` or `surface-violet`.
- Text is `foreground`; secondary copy is `muted-foreground`. Both pass AA on every surface here.
- `primary` (violet) is for fills: the main CTA, active-nav underline, bullets. Do not set small text in `primary` on `background` (1.96:1). For violet text use `violet-400` at 24px+, or `foreground`.
- `secondary` (blue) is for icons, focus rings and links; it reads as text on `background` (4.9:1).
- Pair `primary` and `secondary` as the brand gradient (`to right` or `to bottom right`), e.g. the nav "AM" monogram and the 20% icon tiles.
- `destructive` is a fill only, with `foreground` text.

## Type

- Headings in Space Grotesk (`heading` family) for the hero, logo and wordmark; everything else in Inter (`sans`); status lines and code in JetBrains Mono (`mono`). All three load from Google Fonts (weights 300–700; mono 400–500).
- Hero: `hero` (72px at lg, scaling 36 → 60 → 72), tight tracking. Section titles: `section-title`. Glass-card headings: `card-heading`. Intros: `body-lg` in `muted-foreground`, max width `container-2xl`.

## Surfaces, borders, depth

- **Glass card** is the house surface: `glass-5` fill, 1px `glass-5` border, `blur-sm` backdrop, `radius-2xl`, `space-6` padding. On hover the border becomes `secondary` at 50%.
- **Solid Card** (`card`, `border`, `radius-xl`, `shadow-sm`) is for dense content.
- Depth comes from glows, not drop shadows: `glow-primary` under the CTA, `glow-violet` on hovered chips and buttons.
- Borders are `border` or `glass-10`; they are decorative, so pair any control border with a fill or label.

## Shape and spacing

- Spacing follows Tailwind's 4px step (`space-1` … `space-12`). Page gutter `space-4`, `space-6` from md.
- Radii: `radius-lg` for buttons, `radius-2xl` for cards and tiles, `radius-full` for chips, pills and icon circles.

## Motion

- Elements fade and rise into view (opacity 0 → 1, y 20–30px → 0, 0.6–0.8s, ease-out), staggered 80–100ms per item.
- Hover: chips scale to 1.05–1.08 and lift 4px; buttons scale 1.03; arrows nudge 4px right. Colour transitions take 150ms (`cubic-bezier(.4,0,.2,1)`).
- The CTA has a white 20% shimmer sweeping across on hover; the headline gradient pans over 4s.
- On fine pointers a custom cursor ring snaps magnetically to chips and buttons. Respect `prefers-reduced-motion`.

## Focus

- Focus is a 2px `ring` with a 2px `background` offset. It passes 3:1 on `background` and `card`.

## Iconography

- Lucide-style 24px outline icons (via lucide-react in the source), sized 16–20px inline (w-4 / w-5) and 32px in icon tiles. Colour them `secondary` in headings, `primary` in tiles, `foreground` in contact circles.
- The monogram is **AM** in Space Grotesk 700 with the `violet-400` → `violet-700` → `blue-500` gradient on a `background` rounded square (see Logos).

## Not synced

- Values come from the compiled build (`assets/index-bpezMFQy.css`, `assets/index-CN0bSe7-.js`); the repository holds no source, Tailwind config or component files.
- Tailwind's default palette entries used only for one-off tints (red, orange, amber, green, emerald, teal, indigo, purple, slate, gray) were left out; `calc()`-based line heights were converted to px.
- Fonts are Google-hosted, so no font files were copied.
- Components are hand-written static renditions from the compiled classes (no bundle was built): Button, Card, GlassCard, TechChip, SectionHeading, ContactLink.
