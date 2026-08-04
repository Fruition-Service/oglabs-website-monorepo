# AGENTS.md — OG Labs Website

OG Labs is a digital transformation partner for APAC SMBs, specialising in HubSpot, ClickUp, and AI-driven automation.

## Stack
- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Deployment**: Cloudflare Workers via @opennextjs/cloudflare
- **Fonts**: Poppins (headings/body) + JetBrains Mono (accent)
- **Icons**: Lucide React

## Getting Started
```bash
npm install
npm run dev
```

## Deployment
```bash
npm run deploy
```

## Conventions
- All pages use App Router (src/app)
- Shared components live in src/components
- UI primitives from shadcn/ui in src/components/ui
- Utility functions in src/lib
