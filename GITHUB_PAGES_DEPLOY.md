# Deploying to GitHub Pages

This portfolio is designed to work as a static site on GitHub Pages with your custom domain.

## Quick Deploy Steps

### 1. Build the Static Site

Run this command in your terminal:

```bash
cd client && npx vite build --outDir ../docs --base ./
```

This creates a `docs` folder with your static portfolio.

### 2. Push to GitHub

1. Create a new GitHub repository (e.g., `azizmessaoud.github.io` or `portfolio`)
2. Push your code including the `docs` folder:

```bash
git add .
git commit -m "Deploy portfolio"
git push origin main
```

### 3. Enable GitHub Pages

1. Go to your repository Settings → Pages
2. Set Source to "Deploy from a branch"
3. Select `main` branch and `/docs` folder
4. Click Save

### 4. Custom Domain (Optional)

1. In GitHub Pages settings, enter your custom domain (e.g., `azizm.me`)
2. Create a CNAME record with your DNS provider pointing to `yourusername.github.io`
3. Add a `CNAME` file in the `docs` folder with your domain:

```bash
echo "azizm.me" > docs/CNAME
```

## Contact Form Setup

The contact form uses [Formspree](https://formspree.io) for handling submissions:

1. Sign up at https://formspree.io
2. Create a new form and get your form ID
3. Update the form endpoint in `client/src/components/sections/contact.tsx`:

```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
```

Replace `xovdjqzj` with your actual Formspree form ID.

## Files You Can Delete (Server-only)

For a pure static deployment, you can optionally remove these server-related files:
- `server/` folder
- `drizzle.config.ts`
- `script/` folder

The portfolio will work perfectly without them on GitHub Pages.
