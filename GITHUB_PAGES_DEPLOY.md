# Deploying Portfolio to GitHub Pages + Backend

This portfolio uses a split deployment strategy:
- **Frontend (Static)**: Deployed to GitHub Pages
- **Backend (Email Service)**: Deployed to Vercel/Render/Railway/etc.

## Architecture Overview

```
┌─────────────────────┐
│  GitHub Pages       │
│  (Static Frontend)  │
│  azizmessaoud.      │
│  github.io          │
└──────────┬──────────┘
           │
           │ API Calls
           ↓
┌─────────────────────┐
│  Backend Server     │
│  (Vercel/Render)    │
│  - Email Service    │
│  - CORS Enabled     │
└─────────────────────┘
```

---

## Part 1: Deploy Frontend to GitHub Pages

### 1. Build the Static Site

```bash
npm run build
```

This creates a `dist/public` folder with your optimized frontend.

### 2. Copy to GitHub Pages Directory

```bash
# Copy build output to azizmessaoud.github.io folder
Copy-Item -Path "dist/public/*" -Destination "azizmessaoud.github.io/" -Recurse -Force
```

### 3. Push to GitHub

```bash
cd azizmessaoud.github.io
git add .
git commit -m "Deploy portfolio frontend"
git push origin main
```

### 4. Enable GitHub Pages

1. Go to repository Settings → Pages
2. Set Source to "Deploy from a branch"
3. Select `main` branch and `/` (root) folder
4. Click Save
5. Your site will be live at `https://azizmessaoud.github.io`

### 5. Custom Domain (Optional)

1. In GitHub Pages settings, enter your custom domain (e.g., `azizmessaoud.me`)
2. Create a CNAME record with your DNS provider pointing to `azizmessaoud.github.io`
3. GitHub will automatically create a `CNAME` file in your repo

---

## Part 2: Deploy Backend Server

Your backend handles contact form emails via Resend API.

### Option A: Deploy to Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Create `vercel.json`** in project root:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server/index.ts",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "server/index.ts"
       }
     ]
   }
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables** in Vercel Dashboard:
   - `RESEND_API_KEY`: Your Resend API key (get from https://resend.com/api-keys)
   - `NODE_ENV`: `production`

5. **Note your backend URL** (e.g., `https://your-app.vercel.app`)

### Option B: Deploy to Render

1. Go to [Render Dashboard](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `RESEND_API_KEY`: Your Resend API key
     - `NODE_ENV`: production

### Option C: Deploy to Railway

1. Go to [Railway Dashboard](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variable:
   - `RESEND_API_KEY`: Your Resend API key
5. Railway auto-detects Node.js and deploys

---

## Part 3: Connect Frontend to Backend

### Update API Endpoint in Frontend

Since GitHub Pages serves static files, you need to update the contact form to call your deployed backend.

**Option 1: Environment Variable (Build Time)**

Create `.env.production` in `client/`:
```env
VITE_API_URL=https://your-backend.vercel.app
```

Update `client/src/components/sections/contact.tsx`:
```typescript
const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
  method: 'POST',
  // ...
});
```

**Option 2: Hardcode Backend URL**

Directly in `contact.tsx`:
```typescript
const response = await fetch('https://your-backend.vercel.app/api/contact', {
  method: 'POST',
  // ...
});
```

### Enable CORS on Backend

Your backend must allow requests from GitHub Pages.

Update `server/index.ts`:
```typescript
import cors from 'cors';

app.use(cors({
  origin: [
    'https://azizmessaoud.github.io',
    'http://localhost:5000', // For local dev
  ],
  credentials: true,
}));
```

Install cors:
```bash
npm install cors
npm install --save-dev @types/cors
```

---

## Part 4: Resend Email Service Setup

### 1. Create Resend Account

1. Go to https://resend.com
2. Sign up (free tier: 100 emails/day)
3. Verify your email

### 2. Get API Key

1. Go to **API Keys** section
2. Click "Create API Key"
3. Name it (e.g., "Portfolio Contact Form")
4. Copy the key (starts with `re_`)

### 3. Verify Domain (Optional but Recommended)

**For custom sender email (instead of `onboarding@resend.dev`):**

1. Go to **Domains** section
2. Add your domain (e.g., `azizmessaoud.me`)
3. Add DNS records provided by Resend
4. Wait for verification (can take a few hours)
5. Update `from` in `server/routes.ts`:
   ```typescript
   from: "Aziz Messaoud <contact@azizmessaoud.me>",
   ```

**Without domain verification:**
- Resend uses `onboarding@resend.dev` as sender
- Still works fine, but looks less professional

---

## Part 5: Testing Full Stack

### Local Development

1. **Start Backend**:
   ```bash
   npm run dev
   ```
   Backend runs on `http://localhost:5000`

2. **Start Frontend** (separate terminal):
   ```bash
   cd client
   npm run dev:client
   ```
   Frontend runs on `http://localhost:5000` (Vite dev server)

3. **Test Contact Form**:
   - Fill out form at `http://localhost:5000/#contact`
   - Should send email to `aziz.messaoud@esprit.tn`

### Production Testing

1. Open `https://azizmessaoud.github.io`
2. Navigate to Contact section
3. Submit form
4. Check email at `aziz.messaoud@esprit.tn`
5. Check browser console for errors (CORS issues, etc.)

---

## Part 6: Environment Variables Summary

### Backend (Vercel/Render/Railway)

| Variable | Value | Required |
|----------|-------|----------|
| `RESEND_API_KEY` | Your Resend API key (e.g., `re_123...`) | ✅ Yes |
| `NODE_ENV` | `production` | Recommended |

### Frontend (Build Time)

| Variable | Value | Required |
|----------|-------|----------|
| `VITE_API_URL` | Your backend URL (e.g., `https://your-app.vercel.app`) | Optional* |
| `VITE_DEPLOY_URL` | `https://azizmessaoud.github.io` | Optional** |

\* If not set, hardcode backend URL in `contact.tsx`  
\** Used by `vite-plugin-meta-images` for OG images

---

## Troubleshooting

### Contact Form Not Working

1. **Check Browser Console**: Look for CORS errors or 404s
2. **Check Backend Logs**: Vercel/Render dashboard → Logs
3. **Verify RESEND_API_KEY**: Make sure it's set in backend env vars
4. **Test Backend Directly**: 
   ```bash
   curl -X POST https://your-backend.vercel.app/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Testing"}'
   ```

### CORS Errors

Add your GitHub Pages URL to `server/index.ts` CORS config:
```typescript
origin: ['https://azizmessaoud.github.io'],
```

### Emails Not Arriving

1. Check spam folder
2. Verify `RESEND_API_KEY` is correct
3. Check Resend dashboard → Emails (shows send status)
4. Ensure `to:` email is correct in `server/routes.ts`

---

## Quick Commands Cheat Sheet

```bash
# Build frontend
npm run build

# Deploy to GitHub Pages (copy files)
Copy-Item -Path "dist/public/*" -Destination "azizmessaoud.github.io/" -Recurse -Force

# Deploy backend to Vercel
vercel --prod

# Install dependencies after Replit cleanup
npm install

# Run local dev
npm run dev  # Backend
npm run dev:client  # Frontend (separate terminal)
```

---

## Next Steps

- [ ] Get Resend API key
- [ ] Deploy backend to Vercel/Render
- [ ] Update `contact.tsx` with backend URL
- [ ] Add CORS config to `server/index.ts`
- [ ] Test contact form end-to-end
- [ ] (Optional) Verify custom domain on Resend
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
