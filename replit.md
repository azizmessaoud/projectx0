# Aziz Messaoud Portfolio

## Overview

A personal portfolio website for Aziz Messaoud, a Data Science Engineering student. The site showcases projects, certifications, experience, and provides a contact form. Built as a modern, animated single-page application with a dark theme featuring neural network visuals and data science aesthetics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 19 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS v4 with custom theme variables
- **UI Components**: Shadcn/ui component library (New York style)
- **Animations**: Framer Motion for scroll effects, transitions, and microinteractions
- **Fonts**: Inter (body), Space Grotesk (headings), JetBrains Mono (code)
- **Theme**: Dark-only "Dark Future" aesthetic (no light mode)

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript with ESM modules
- **Build Tool**: esbuild for server bundling, Vite for client
- **API Design**: RESTful endpoints under `/api/*` prefix

### Key Design Patterns
- **Section-based Layout**: Each portfolio section is a separate component:
  - Hero, About, Personality, Experience, How I Work, Projects, Volunteering, Certifications, Contact, Footer
- **Glass Morphism UI**: Cards use backdrop blur and transparency effects
- **Custom UI Effects**: Neural network background with orbital particles, custom cursor with trail, scroll progress indicator, loading screen, back-to-top button
- **Form Validation**: Zod schemas with Formspree for static hosting
- **Scroll Animations**: Framer Motion whileInView animations on all sections

### Project Structure
```
client/           # React frontend
  src/
    components/   # UI components (ui/ for shadcn, sections/ for page sections)
    hooks/        # Custom React hooks
    lib/          # Utilities and query client
    pages/        # Page components
server/           # Express backend
shared/           # Shared types and schemas
```

## External Dependencies

### Contact Form
- **Formspree**: Contact form submissions via Formspree (static-hosting compatible)
- Form ID: xovdjqzj (can be replaced with your own Formspree form ID)
- Emails sent to aziz.messaoud@esprit.tn

### Database
- **PostgreSQL**: Configured via Drizzle ORM (drizzle.config.ts)
- **Schema Location**: `shared/schema.ts`
- **Migrations**: `./migrations` directory
- Currently minimal schema (user model available but not actively used)

### Third-Party Services
- **Google Fonts**: Inter, Space Grotesk, JetBrains Mono
- **Replit Plugins**: Dev banner, cartographer, runtime error overlay (dev only)

### Key NPM Packages
- Radix UI primitives for accessible components
- class-variance-authority for component variants
- date-fns for date formatting
- embla-carousel-react for carousels
- react-day-picker for calendar
- vaul for drawer component