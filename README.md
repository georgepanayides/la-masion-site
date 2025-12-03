This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# La Maison de Aesthetics

A modern luxury Japanese head spa website built with Next.js.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Brand System

- Colors: Available as CSS variables and Tailwind tokens in `app/globals.css`.
	- Primary Neutrals: `--brand-warm-white`, `--brand-silk-cream`, `--brand-rice-paper`
	- Earthy Tones: `--brand-sand-stone`, `--brand-clay`, `--brand-driftwood`, `--brand-warm-grey`
	- Deep Neutrals: `--brand-stone-grey`, `--brand-charcoal`, `--brand-sumi-ink`

- Typography: Geist Sans as primary, Geist Mono for code.
	- Luxury pairing: Cormorant Garamond (serif, display for headings) + Noto Sans (modern body). Geist Mono remains for code.
	- Base scale via tokens: `--text-xl`, `--text-2xl`, etc. Headings `h1`–`h4` use the serif display family.

### Using in Components

- Tailwind (preferred):
	- Text colors: `className="text-brand-warm-grey"`
	- Backgrounds: `className="bg-brand-silk-cream"`
	- Borders: `className="border-brand-driftwood"`
	- Fonts: body uses `--font-sans` by default; for serif display on specific elements, use `className="font-[var(--font-serif)]"` with inline style, or rely on global `h1`–`h4` styles.

- Plain CSS Utilities (optional):
	- `class="text-brand-charcoal"`
	- `class="bg-brand-warm-white"`

### Notes

- All tokens are defined in `app/globals.css` using Tailwind v4 `@theme inline`.
- Fonts are loaded in `app/layout.tsx` and exposed as CSS variables `--font-brand-sans` and `--font-brand-serif`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# la-masion-site
