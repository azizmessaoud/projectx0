# Aziz Messaoud — Data Science Portfolio

This repository contains the React/Vite source for Aziz Messaoud’s portfolio.

## Local development

```bash
pnpm install
pnpm dev
```

## Production build

```bash
pnpm build
```

The build emits the static GitHub Pages artifact into `dist/public`.

## GitHub Pages deployment

`.github/workflows/deploy.yml` builds and publishes `dist/public` on every push to `main` (Settings → Pages → Source: GitHub Actions).

- The site is served from the custom domain in `client/public/CNAME` (`azizm.me`). Keep that file unless the domain changes.
- The Vite base is relative (`./`), so assets also resolve from a project subpath; `404.html` and `.nojekyll` are included.
- The CV link points to Google Drive (`cvUrl` in `client/src/lib/portfolioData.ts`).
- Analytics placeholders in `client/index.html` are filled from the workflow's `VITE_ANALYTICS_*` variables; local builds warn about them and that is expected.

## Editing content

All copy, links, metrics and credentials live in `client/src/lib/portfolioData.ts`. Keep every metric traceable to its source (paper, repository, or verification link). Components are in `client/src/components/portfolio/`; design tokens are at the top of `client/src/index.css`.
