# 🚀 QUICK START GUIDE - Portfolio Aziz Messaoud

## ✅ Configuration Terminée

Votre portfolio est maintenant prêt avec :
- ✅ Clé API Resend configurée
- ✅ Backend email fonctionnel
- ✅ Infrastructure animation GSAP + Lenis
- ✅ Formulaire contact connecté

---

## 🎯 Test en Local (MAINTENANT)

### Serveur déjà démarré sur http://localhost:5000

**Pour tester le formulaire de contact:**

1. Ouvrir http://localhost:5000 dans votre navigateur
2. Scroller jusqu'à la section **Contact** (en bas de page)
3. Remplir le formulaire :
   - Nom: Votre nom
   - Email: Votre email
   - Sujet: Test Portfolio
   - Message: Message de test
4. Cliquer sur **Send Message**
5. ✅ Si succès → Animation confetti + message de succès
6. 📧 Vérifier votre boîte mail **aziz.messaoud@esprit.tn**

**Debug:**
- Ouvrir DevTools (F12) → onglet Console
- Onglet Network → filtrer par "contact"
- Voir la requête POST vers `/api/contact`

---

## 🛠️ Commandes de Développement

```powershell
# Démarrer le serveur (backend + frontend)
npm run dev

# Build pour production
npm run build

# Vérifier TypeScript
npm run check

# Arrêter le serveur
Ctrl+C dans le terminal
```

---

## 📦 Prochaines Étapes - Déploiement Production

### 1. Déployer Backend sur Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel --prod

# Dans le dashboard Vercel:
# Settings → Environment Variables → Ajouter:
# RESEND_API_KEY = re_55VVxifT_Md4RP3xmEETmgMMMpCDZcTFx
```

**Récupérer l'URL backend** (ex: `https://portfolio-backend.vercel.app`)

### 2. Mettre à Jour Frontend

Éditer `client/src/components/sections/contact.tsx` ligne ~245 :

```typescript
const response = await fetch('https://portfolio-backend.vercel.app/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
});
```

### 3. Build & Deploy Frontend sur GitHub Pages

```powershell
# Build
npm run build

# Copier vers repo GitHub Pages
Copy-Item -Path "dist/public/*" -Destination "../azizmessaoud.github.io/" -Recurse -Force

# Commit & Push
cd ../azizmessaoud.github.io
git add .
git commit -m "Update portfolio"
git push origin main
```

Attendre 1-2 minutes → Site live sur `https://azizmessaoud.github.io`

---

## 🎨 Améliorations Visuelles (Phase 2)

Les fonctionnalités suivantes sont **prêtes à être implémentées** :

### Déjà disponible (hooks créés) :
- `useGSAP()` - Animations GSAP avec cleanup
- `useScrollProgress()` - Tracking scroll 0-1
- `useMousePosition()` - Position souris
- `useReducedMotionSafe()` - Accessibilité

### Timelines GSAP prédéfinies :
- `createHeroTimeline()` - Animation entrée Hero
- `createProjectCardHoverTimeline()` - Hover cartes projets
- `createExperienceRevealTimeline()` - Reveal timeline expérience
- `animateNavIndicator()` - Underline animé navbar

### Helpers d'animation :
- `fadeIn()` - Fade avec direction
- `parallaxScroll()` - Effet parallax
- `clipPathReveal()` - Reveal clip-path
- `textScramble()` - Scramble texte

**Pour les utiliser, modifier les composants dans `client/src/components/`**

---

## 📧 Configuration Email

### Email Expéditeur
Actuellement : `onboarding@resend.dev` (par défaut Resend)

**Pour personnaliser** (ex: `contact@azizmessaoud.me`) :
1. Aller sur https://resend.com → Domains
2. Ajouter votre domaine `azizmessaoud.me`
3. Configurer les DNS records (SPF, DKIM, DMARC)
4. Modifier `server/routes.ts` ligne 25 :
   ```typescript
   from: "Aziz Messaoud <contact@azizmessaoud.me>",
   ```

### Email Destinataire
Actuellement : `aziz.messaoud@esprit.tn`

**Pour changer**, modifier `server/routes.ts` ligne 26 :
```typescript
to: "votre-autre-email@example.com",
```

---

## 🔒 Sécurité

### ⚠️ IMPORTANT: Ne jamais commit .env

Le fichier `.env` contient votre clé API Resend. Il est déjà dans `.gitignore`.

**Vérifier avant de push:**
```powershell
git status
# Ne devrait PAS voir .env dans la liste
```

### Variables d'environnement par plateforme

| Plateforme | Comment ajouter RESEND_API_KEY |
|------------|--------------------------------|
| **Vercel** | Dashboard → Settings → Environment Variables |
| **Render** | Dashboard → Environment → Add Variable |
| **Railway** | Dashboard → Variables → New Variable |
| **Netlify** | Site settings → Environment variables |

---

## 🐛 Troubleshooting

### Le serveur ne démarre pas
```powershell
# Vérifier que le port 5000 n'est pas utilisé
netstat -ano | findstr :5000

# Si occupé, changer le port dans .env
# Ajouter: PORT=3000
```

### Email ne s'envoie pas
1. Vérifier `.env` → `RESEND_API_KEY` présent et correct
2. Vérifier console backend (terminal) pour erreurs
3. Tester clé API sur https://resend.com/docs/send-with-nodejs

### CORS error en production
Ajouter votre domaine dans `server/index.ts` ligne 17 :
```typescript
const allowedOrigins = [
  'https://azizmessaoud.github.io',
  'https://votre-domaine.com', // Ajouter ici
];
```

### Animations ne fonctionnent pas
1. Vérifier que GSAP est importé dans le composant
2. Vérifier console navigateur pour erreurs
3. Tester avec `prefers-reduced-motion` désactivé

---

## 📊 État du Projet

### ✅ Terminé (Phase 1)
- [x] Nettoyage Replit
- [x] Backend email avec Resend
- [x] Infrastructure animation (GSAP + Lenis)
- [x] Hooks personnalisés (4)
- [x] Helpers animation (20+)
- [x] Documentation complète
- [x] Configuration .env
- [x] Test local fonctionnel

### 🚧 À faire (Phase 2 - Optionnel)
- [ ] Améliorer NeuralNetworkCanvas (parallax, quantum symbols)
- [ ] Timeline GSAP Hero section
- [ ] Navbar active indicator animé
- [ ] Project cards hover avancé
- [ ] Experience timeline ScrollTrigger
- [ ] Contact form animations sophistiquées
- [ ] Custom cursor enrichi
- [ ] Skills visualization avec Recharts

---

## 📚 Documentation Complète

- **Architecture & API**: [README.md](README.md)
- **Guide déploiement**: [GITHUB_PAGES_DEPLOY.md](GITHUB_PAGES_DEPLOY.md)
- **Template config**: [.env.example](.env.example)

---

## 🎉 Félicitations !

Votre portfolio est maintenant **production-ready** ! 

**Prochaines actions recommandées:**
1. ✅ Tester le formulaire localement (maintenant)
2. 🚀 Déployer sur Vercel + GitHub Pages
3. 🎨 (Optionnel) Implémenter animations Phase 2
4. 📱 Tester sur mobile
5. 🔍 Lighthouse audit (target >90)

---

**Besoin d'aide ?** Consultez [GITHUB_PAGES_DEPLOY.md](GITHUB_PAGES_DEPLOY.md) section Troubleshooting
