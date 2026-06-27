# BMC Frontend

Next.js frontend for the **Businessman Development Council (BMC)**.

## Brand Colors

- Blue (primary): `#1a4683`
- Orange (accent): `#f58432`

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Hero Video

Place your hero video at `public/videos/hero.mp4`. The Coming Soon page uses `public/images/hero-poster.jpg` as a fallback poster.

## Project Structure

```
src/
├── app/              # App Router pages
├── actions/          # Server actions
├── components/
│   ├── ui/           # shadcn-style primitives
│   ├── common/       # Shared components
│   └── coming-soon/  # Coming Soon landing
├── hooks/
├── lib/
│   ├── constants/    # Routes, content, assets, colors
│   ├── config/       # Environment config
│   └── utils/        # cn() and helpers
├── services/         # API client
└── types/
```

## Backend

API runs at `http://localhost:3001`. Set `NEXT_PUBLIC_API_BASE_URL` in `.env.local`.
