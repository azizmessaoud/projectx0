# Portfolio Refresh Design Direction

## Three initial approaches

### Theme Name: Signal Atelier

### Very Brief Intro
An editorial dark-mode portfolio where data signals, model traces, and project evidence are arranged like a research notebook with a precise technical grid. The mood is focused, rigorous, and quietly expressive.

### Probability
0.06

### Theme Name: Field Notes / Data Ledger

### Very Brief Intro
A warm, paper-inspired interface that treats each project as a field note: annotated, human, and evidence-led. The mood is thoughtful and approachable rather than futuristic.

### Probability
0.04

### Theme Name: Neural Observatory

### Very Brief Intro
A restrained dark observatory for practical AI systems, using a living network visual as a navigational layer rather than decoration. The mood is exploratory, technical, and controlled.

### Probability
0.08

## Chosen approach: Signal Atelier

### Design Movement
Editorial Swiss-modernism blended with technical data visualization and contemporary creative coding. The interface should feel like a carefully edited research artifact, not a generic cyberpunk landing page.

### Core Principles
1. **Evidence before spectacle.** Project decisions, ownership boundaries, metrics, and limitations must be more prominent than visual effects.
2. **Structured asymmetry.** Use a strong left-to-right reading path with offset cards, vertical markers, and a technical side rail instead of a centered stack of identical sections.
3. **Signal as hierarchy.** Blue pulses, thin rules, and activation states should explain attention and flow, not decorate every surface.
4. **Progressive enhancement.** The content must work first; the neural network is an optional visual layer that can reduce quality or disappear on mobile and reduced-motion settings.

### Color Philosophy
The base is near-black ink and deep navy, chosen to make the portfolio feel like a dark research desk. Electric blue is the signature signal color: it represents information moving from data to model to application. Violet is used sparingly for secondary system states, while cyan is reserved for rare “active” moments. Soft white and blue-gray text preserve a calm reading experience. The visual language should never become a neon gradient; the palette should feel instrument-like and deliberate.

### Layout Paradigm
Use a **research-dashboard editorial layout**: a narrow technical rail for section numbers and metadata, a wide reading column for the core story, and an offset evidence column for metrics, links, or diagrams. The hero should use an asymmetric split: identity and CTA on the left; a living network field and proof markers on the right. Project cards should alternate alignment and density to create rhythm while preserving a simple scan path.

### Signature Elements
1. **Signal rail:** thin vertical rules with small section numbers, status dots, and category labels.
2. **Evidence chips:** compact monospace labels for status, role, year, stack, and evidence type.
3. **Neural field:** a low-contrast network with a small number of deliberate pulses that activate around the hero and selected case-study moments.

### Interaction Philosophy
Interactions should feel like inspecting a system: hover states expose metadata, links reveal their destination type, and project cards make ownership and evidence boundaries visible. Motion should reward attention but never require it. A keyboard user should receive the same information as a pointer user.

### Animation
The neural field uses layered motion: faint nodes drift slowly, nearby edges remain mostly still, and occasional signal pulses travel along selected paths. The cursor influences a local neighborhood rather than the whole scene. UI entrances use short 180–280ms transitions with opacity and transform only. Staggered reveals should be subtle. The animation pauses when off-screen, reduces density on mobile, and becomes static under `prefers-reduced-motion`.

### Typography System
Use **Space Grotesk** for display headings and navigation labels, **Inter** for body copy, and **JetBrains Mono** for metrics, metadata, code, and technical tags. Headlines should use a tight 0.95–1.05 line-height and restrained letter spacing. Body copy should be 16–18px with generous line-height. Monospace labels should be uppercase or sentence-case only when they clarify status; never use monospace as decoration.

### Brand Essence
**Data Science student building practical AI systems from data, models, and software for teams that value evidence over hype.**

Personality adjectives: **curious, rigorous, grounded**.

### Brand Voice
Headlines are direct and specific. CTAs name the next action. Microcopy explains evidence and limitations plainly. Avoid filler, self-congratulation, and vague claims.

Example lines:

> I build practical AI systems from a Data Science foundation.

> Read the case: what I owned, what I measured, and what remains open.

### Wordmark & Logo
Use a compact **AM signal-mark**: two angular strokes forming an A and M, joined by one small node and a short connecting line. The mark should be geometric, legible at favicon size, and usable as a small blue active signal on dark ink. Do not render the name in a default font as the logo.

### Signature Brand Color
**Signal Blue — `#42B7FF`**. It is bright enough to guide attention but cool and precise enough to feel like a measurement signal rather than a decorative neon accent.

## Implementation guardrails

- Keep the page usable if the neural field fails to load.
- Do not use purple gradients as the main visual device.
- Do not use generic stock AI imagery.
- Do not claim production deployment, client impact, or metrics without evidence.
- Keep the three flagship cases prominent: ALIA, HR Document Intelligence, and FlyRank Search Intelligence.
- Present Breast Cancer ML, MelanoVision, InnoTravel, and IEEEXtreme as supporting work.
- Make the CV download link explicit, tested, and content-managed.
- Store project and certificate content separately from components so future updates do not require layout edits.

## Style Decisions

- Use dark Signal Atelier direction as the source of truth for all UI files.
- Prefer practical AI systems over a broad “everything AI” identity.
- Treat AI Research as a method of working rather than a separate senior title.
- Make evidence, contribution, limitations, and links visible in every project case.
