# Maison Aurélia — Premium Animated Jewellery Landing Page

A luxury, fully-animated jewellery landing page in **Next.js 16 (App Router) + TypeScript**, themed in **baby pink / rose gold**. Editorial, cinematic feel inspired by [Bulgari](https://www.bulgari.com/en-in/) and [Boucheron](https://www.boucheron.com/int_en/).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start   # production
```

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Animation | Framer Motion (parallax, masked text, magnetic, stagger) |
| Smooth scroll | Lenis (inertial, anchor-aware) |
| Styling | Tailwind CSS v3 + custom design tokens |
| Fonts | Cormorant Garamond (serif display) + Jost (sans) |

## Baby-pink luxury palette

`blush` (#FFF8FA → #EC97AB) · `rose-gold` #B76E79 · `champagne` #C9A86A · `ink` #2B2024. Defined in `tailwind.config.ts` and `app/globals.css`.

## Premium animation techniques used (per the `motion-design` skill)

- **Curtain preloader** with counter (first load, reduced-motion aware) — `Preloader.tsx`
- **Custom magnetic cursor** (dot + spring-trailing ring), desktop-only — `CustomCursor.tsx`
- **Lenis inertial smooth scroll** — `SmoothScroll.tsx`
- **Masked line-by-line headline reveals** (`ease-out-expo`) — `AnimatedText.tsx`
- **Scroll-triggered staggered reveals** — `Reveal.tsx`
- **Hero Ken Burns + dual-layer parallax** — `Hero.tsx`
- **Magnetic CTA buttons** with spring settle — `MagneticButton.tsx`
- **Infinite seamless marquee** ticker — `Marquee.tsx`
- **Hover: image scale, gold frame, slide-up add-to-cart** — `Categories.tsx`, `FeaturedCollection.tsx`
- **Clip-path image reveal + in-frame parallax** — `EditorialBanner.tsx`
- **Word-by-word opacity quote reveal** — `Testimonial.tsx`
- **Film grain overlay**, shimmer gold text, floating glints
- Full **`prefers-reduced-motion`** support throughout

## Sections

Navbar (scroll-reactive, mobile overlay) → Hero → Marquee → Categories → Featured Collection → Editorial (atelier) → Bridal Showcase → Maison Promises → Testimonial → Newsletter → Footer.

## Customising

- **Content / products / images:** `lib/data.ts` (currently Unsplash placeholders — swap for brand assets and update `next.config.mjs` `remotePatterns` if needed).
- **Theme colours:** `tailwind.config.ts` → `theme.extend.colors`.
- **Motion timing:** CSS tokens in `app/globals.css` (`--dur-*`, `--ease-*`).
