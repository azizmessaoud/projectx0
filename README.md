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

The repository deploys through `.github/workflows/deploy.yml`. Every push to `main` builds the application and publishes `dist/public` with GitHub Pages Actions.

The project is configured for the repository URL:

```text
https://azizmessaoud.github.io/new-ui/
```

The Vite base is relative, the HTML entry script is relative, and the artifact includes `.nojekyll` and a 404 fallback so the app works from the `/new-ui/` subpath. In the repository settings, open **Settings → Pages** and select **GitHub Actions** as the source if it is not already selected.

## Important deployment notes

Do not add a `CNAME` file if the intended URL is the GitHub Pages project URL. A `CNAME` file makes a custom domain the Pages site’s canonical host. If `azizm.me` is restored later, add the CNAME back and configure the custom domain in GitHub Pages.

The portfolio uses a single-page route and relative static assets. If additional client-side routes are added later, keep the 404 fallback and test direct navigation to each route on GitHub Pages.
