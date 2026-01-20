# 🚀 Portfolio Aziz Messaoud - Transformation Cinématique

Portfolio de Data Science Engineer avec animations avancées, effets de parallaxe, et expérience utilisateur premium.

## ✨ Fonctionnalités

### 🎨 Design & UX
- **Smooth Scrolling Premium** avec Lenis (désactivé si `prefers-reduced-motion`)
- **Animations GSAP** complexes avec ScrollTrigger
- **Neural Network Canvas** avec particules interactives et symboles quantiques
- **Custom Cursor** avec trail et états contextuels
- **Glassmorphism** et effets 3D sur cartes
- **Microinteractions** sur tous éléments interactifs

### 📧 Backend
- **Service Email** via Resend API
- **Validation** robuste avec Zod schemas
- **CORS** configuré pour déploiement split (frontend static + backend séparé)

### ♿ Accessibilité
- Respect de `prefers-reduced-motion`
- Focus visible sur tous éléments interactifs
- Navigation au clavier
- ARIA labels appropriés

### ⚡ Performance
- **Code splitting** avec React.lazy
- **Lazy loading** des sections lourdes
- **Optimisation canvas** avec object pooling
- **Throttling** des événements scroll/mouse
- **Page Visibility API** pour pause animations

## 📁 Structure du Projet

```
portfolio/
├── client/                      # Frontend React + TypeScript
│   ├── src/
│   │   ├── animations/          # 🆕 Helpers GSAP et timelines
│   │   │   ├── constants.ts     # Constantes d'animation
│   │   │   ├── helpers.ts       # Fonctions utilitaires GSAP
│   │   │   ├── timelines.ts     # Timelines prédéfinies
│   │   │   └── index.ts
│   │   ├── components/
│   │   │   ├── sections/        # Hero, About, Projects, etc.
│   │   │   ├── layout/          # Navbar, Footer
│   │   │   └── ui/              # Composants réutilisables
│   │   ├── hooks/               # 🆕 Hooks personnalisés
│   │   │   ├── use-gsap.ts                    # Hook GSAP avec cleanup
│   │   │   ├── use-scroll-progress.ts         # Progression scroll
│   │   │   ├── use-mouse-position.ts          # Position souris
│   │   │   ├── use-reduced-motion-safe.ts     # A11y animations
│   │   │   ├── use-count-up.ts                # Compteurs animés
│   │   │   ├── use-mobile.tsx                 # Détection mobile
│   │   │   └── use-toast.ts                   # Notifications
│   │   ├── lib/                 # Utilitaires
│   │   ├── pages/               # Routes
│   │   ├── App.tsx
│   │   ├── main.tsx             # 🆕 + Lenis initialization
│   │   └── index.css
│   ├── public/
│   └── index.html
├── server/                      # 🆕 Backend Node.js + Express
│   ├── index.ts                 # 🆕 + CORS config
│   ├── routes.ts                # 🆕 Réécrit avec Resend SDK standard
│   ├── static.ts
│   └── vite.ts
├── shared/
│   └── schema.ts                # Zod validation schemas
├── azizmessaoud.github.io/      # Build output pour GitHub Pages
├── vite.config.ts               # 🆕 Nettoyé (plus de Replit)
├── package.json                 # 🆕 Dépendances Replit retirées
├── GITHUB_PAGES_DEPLOY.md       # 🆕 Guide déploiement complet
└── README.md
```

## 🛠️ Technologies

### Frontend
- **React 19** avec TypeScript
- **Framer Motion** pour animations React
- **GSAP + ScrollTrigger** pour animations complexes
- **Lenis** pour smooth scrolling
- **Tailwind CSS** avec design system custom
- **Radix UI** pour composants accessibles
- **Recharts** pour data visualizations

### Backend
- **Express 5** (Node.js)
- **Resend** pour service email
- **Zod** pour validation
- **TypeScript** strict mode

### Build Tools
- **Vite** pour bundling ultra-rapide
- **ESBuild** pour transpilation

## 🚀 Installation & Développement

### Prérequis
- Node.js 18+
- npm ou pnpm

### Installation

```bash
# Cloner le repo
git clone https://github.com/azizmessaoud/potfolio.git
cd potfolio

# Installer dépendances
npm install
```

### Développement Local

**Option 1: Full-stack (recommandé)**

```bash
# Terminal 1: Backend + Frontend (proxy Vite)
npm run dev

# Ouvrir http://localhost:5000
```

**Option 2: Frontend seul (si backend déjà déployé)**

```bash
cd client
npm run dev:client

# Ouvrir http://localhost:5001
```

### Variables d'Environnement

Créer `.env` à la racine :

```env
# Backend (pour npm run dev)
RESEND_API_KEY=re_your_resend_api_key_here
NODE_ENV=development

# Frontend (optionnel, pour build)
VITE_API_URL=http://localhost:5000
VITE_DEPLOY_URL=http://localhost:5000
```

## 📦 Build & Déploiement

### Build Frontend

```bash
npm run build
```

Génère `dist/public/` optimisé pour production.

### Déploiement

Voir [GITHUB_PAGES_DEPLOY.md](./GITHUB_PAGES_DEPLOY.md) pour guide complet :

1. **Frontend** → GitHub Pages (static)
2. **Backend** → Vercel/Render/Railway
3. **Email Service** → Resend (API key)

**Quick Deploy:**

```bash
# 1. Build
npm run build

# 2. Copy to GitHub Pages repo
Copy-Item -Path "dist/public/*" -Destination "azizmessaoud.github.io/" -Recurse -Force

# 3. Push
cd azizmessaoud.github.io
git add .
git commit -m "Deploy"
git push

# 4. Deploy backend to Vercel
vercel --prod
```

## 🎯 Hooks Personnalisés

### `useGSAP(callback, dependencies)`
Wrapper GSAP avec cleanup automatique.

```tsx
import { useGSAP } from '@/hooks/use-gsap';

useGSAP((ctx) => {
  gsap.from('.element', { y: 100, opacity: 0 });
}, []);
```

### `useScrollProgress()`
Track progression scroll (0-1).

```tsx
import { useScrollProgress } from '@/hooks/use-scroll-progress';

const { scrollYProgress, smoothProgress } = useScrollProgress();
```

### `useMousePosition(throttleMs?)`
Position souris avec throttling.

```tsx
import { useMousePosition } from '@/hooks/use-mouse-position';

const { x, y } = useMousePosition(16); // 60fps
```

### `useReducedMotionSafe()`
Détecte préférence utilisateur pour animations réduites.

```tsx
import { useReducedMotionSafe } from '@/hooks/use-reduced-motion-safe';

const prefersReducedMotion = useReducedMotionSafe();
if (!prefersReducedMotion) {
  // Animations complexes
}
```

## 🎨 Animations Helpers

### Fade In

```tsx
import { fadeIn } from '@/animations';

fadeIn('.element', {
  direction: 'up',
  distance: 50,
  duration: 0.6,
  ease: 'power2.out',
});
```

### Scroll Trigger

```tsx
import { scrollTriggerAnimation } from '@/animations';

scrollTriggerAnimation('.element', 
  { y: 100, opacity: 0 },
  { start: 'top 80%', end: 'bottom 20%' }
);
```

### Timelines Prédéfinis

```tsx
import { createHeroTimeline } from '@/animations/timelines';

const tl = createHeroTimeline();
tl.play();
```

## 📧 Contact Form Backend

### Route: `POST /api/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I'd like to discuss..."
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

**Response Error (400/500):**
```json
{
  "success": false,
  "message": "Invalid form data",
  "errors": [ /* Zod errors */ ]
}
```

### Configuration Email

Modifier `server/routes.ts` :

```typescript
await resend.emails.send({
  from: "Portfolio <onboarding@resend.dev>", // Changer après domain verification
  to: "aziz.messaoud@esprit.tn",             // Email destinataire
  replyTo: validatedData.email,
  subject: `Portfolio Contact: ${validatedData.subject}`,
  html: `...`
});
```

## 🔧 Scripts Disponibles

```bash
npm run dev          # Backend + Frontend (dev mode)
npm run dev:client   # Frontend seul (Vite dev)
npm run build        # Build production
npm run start        # Start backend production
npm run check        # TypeScript check
```

## 🐛 Troubleshooting

### Contact Form ne fonctionne pas

1. Vérifier `RESEND_API_KEY` dans variables d'environnement
2. Vérifier CORS dans `server/index.ts`
3. Tester backend directement :
   ```bash
   curl -X POST http://localhost:5000/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Test"}'
   ```

### Erreurs CORS en production

Ajouter votre domaine GitHub Pages dans `server/index.ts` :

```typescript
const allowedOrigins = [
  'https://azizmessaoud.github.io',
  'https://votre-domaine-custom.com', // Si custom domain
];
```

### Animations ne fonctionnent pas

1. Vérifier que GSAP est importé : `import gsap from 'gsap'`
2. Vérifier que ScrollTrigger est enregistré
3. Tester avec `prefers-reduced-motion` désactivé

## 📝 Changelog

### Version 2.0 (Janvier 2026)

#### ✨ Nouveau
- Infrastructure d'animation premium (GSAP + Lenis)
- 4 nouveaux hooks personnalisés
- Dossier `animations/` avec helpers et timelines
- Backend email avec Resend SDK
- Configuration CORS pour déploiement split
- Documentation déploiement complète

#### 🔧 Modifié
- Formulaire contact reconnecté au backend `/api/contact` (remplace Formspree)
- `main.tsx` avec initialisation Lenis
- `server/routes.ts` réécrit avec Resend standard
- Métadonnées HTML mises à jour (GitHub Pages URLs)

#### ❌ Supprimé
- Toutes références Replit (fichiers config, dépendances, plugins)
- `server/resend.ts` (dépendait infrastructure Replit)
- Dépendances `@replit/vite-plugin-*`

### Version 1.0 (Décembre 2025)
- Version initiale avec Framer Motion
- Design system complet
- Animations de base

## 📄 License

MIT License - Aziz Messaoud

## 👤 Auteur

**Aziz Messaoud**  
Data Science Engineering Student  
📧 aziz.messaoud@esprit.tn  
🌐 [azizmessaoud.github.io](https://azizmessaoud.github.io)  
💼 [LinkedIn](https://linkedin.com/in/aziz-messaoud)  
🐙 [GitHub](https://github.com/azizmessaoud)

---

⭐ Si ce projet vous aide, n'hésitez pas à lui donner une étoile sur GitHub !
