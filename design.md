# Tanishq Jewellery Website — Design Document

## 1. Brand Overview

| Property | Value |
|---|---|
| Brand | Tanishq (by Tata) |
| Category | Luxury Jewellery E-commerce |
| Target Audience | Indian women & families, 25–55 age group, bridal & gifting occasions |
| Tone | Elegant, trustworthy, traditional yet modern |
| Tagline | *"A jewel for every tradition"* |

---

## 2. Color Palette

| Role | Color Name | Hex |
|---|---|---|
| Primary Brand | Deep Maroon / Burgundy | `#7B1C2E` |
| Secondary | Rich Gold | `#C9973A` |
| Accent | Warm Champagne | `#F5E6C8` |
| Background | Ivory White | `#FDFAF5` |
| Text Primary | Charcoal Black | `#1A1A1A` |
| Text Secondary | Warm Gray | `#6B6B6B` |
| CTA Button | Deep Maroon | `#7B1C2E` |
| CTA Hover | Gold | `#C9973A` |
| Border / Divider | Light Gold | `#E8D5A3` |
| Footer Background | Deep Maroon | `#5A1020` |

---

## 3. Typography

### Font Pairing

| Role | Font | Weight | Size |
|---|---|---|---|
| Display / Hero Heading | `Cormorant Garamond` | 300–600 | 48–72px |
| Section Headings | `Cormorant Garamond` | 500 | 28–40px |
| Sub-headings | `Playfair Display` | 400 | 20–24px |
| Body Text | `Lato` | 400 | 14–16px |
| Labels / Tags | `Lato` | 700 (uppercase) | 11–13px |
| Price / Numbers | `Lato` | 600 | 14–18px |
| Navigation | `Lato` | 400 | 13–15px |

### Typography Rules
- All headings use serif fonts for luxury feel
- Body text uses clean sans-serif for readability
- Letter-spacing: `0.05em` on labels and navigation
- Line-height: `1.6` for body, `1.2` for headings

---

## 4. Layout & Grid

- **Max Content Width:** `1280px`
- **Grid System:** 12-column CSS Grid
- **Gutters:** `24px` (desktop), `16px` (mobile)
- **Breakpoints:**
  - Mobile: `< 768px`
  - Tablet: `768px – 1024px`
  - Desktop: `> 1024px`

---

## 5. Page Structure & Sections

### 5.1 Header / Navigation
- **Height:** ~72px (desktop)
- **Layout:** Logo center, nav links left, icons (search, wishlist, cart, account) right
- **Sticky:** Yes, with a subtle drop shadow on scroll
- **Top Bar:** Promotional announcements (marquee/ticker) with gold background
- **Mega Menu:** On hover — shows product categories with images

### 5.2 Hero Banner
- **Type:** Full-width image carousel / video background
- **Content:** Campaign headline + CTA button ("Explore Collection")
- **Overlay:** Semi-transparent dark gradient for text readability
- **Animation:** Fade or Ken Burns slide effect
- **Aspect Ratio:** `16:5` on desktop, `4:3` on mobile

### 5.3 Shop By Category
- **Layout:** Horizontal scroll row or grid of circular/square cards
- **Items:** Rings, Necklaces, Earrings, Bangles, Pendants, Chains, etc.
- **Hover Effect:** Slight scale + gold border highlight
- **Font:** Centered label below each image

### 5.4 Shop By Gender
- **Layout:** 2-column split (Women / Men)
- **Style:** Large editorial images with text overlay
- **CTA:** "Shop Now" link in gold

### 5.5 Featured / New Arrivals Collection
- **Layout:** 4-column product card grid (desktop), 2-column (mobile)
- **Card Contents:**
  - Product image (hover: secondary image)
  - Product name
  - Price (with GST note)
  - Wishlist heart icon
  - "Add to Cart" CTA
- **Badge:** "New", "Bestseller", "Limited Edition" tags

### 5.6 Campaign / Editorial Banner
- **Type:** Full-width or split (50/50) image with text
- **Content:** Collection highlights like Bridal, Solitaire, Gold Exchange
- **Style:** Luxury editorial — large serif text over rich imagery

### 5.7 Tanishq Promises Section
- **Layout:** 4-column icon row
- **Items:**
  - BIS Hallmarked Gold
  - Lifetime Exchange
  - Certified Diamonds
  - EMI Options
- **Style:** Icon + short heading + 1-line description

### 5.8 Wedding / Bridal Section
- **Full-width rich banner** with CTA to bridal collection
- **Lead Capture Form:** "Share details for expert consultation"

### 5.9 Footer
- **Background:** Deep Maroon `#5A1020`
- **Text:** Ivory / light gold
- **Columns:**
  - Company (About, Careers, Press)
  - Customer Service (FAQs, Track Order, Returns)
  - Stores (Store Locator, Franchise)
  - Connect (Social links, App download)
- **Bottom Bar:** Copyright, Privacy Policy, Terms

---

## 6. Component Styles

### Buttons

| Type | Style |
|---|---|
| Primary CTA | Filled Maroon bg, white text, rounded `4px`, padding `12px 32px` |
| Secondary CTA | Transparent with Maroon border, Maroon text |
| Ghost / Link | No border, gold underline on hover |
| Hover State | Background lightens or inverts to gold |

### Product Cards

```
┌────────────────────┐
│   Product Image    │  ← Hover: zoom + second image
│  [New Badge]  [♡]  │  ← Wishlist icon top-right
├────────────────────┤
│ Product Name       │  ← Playfair Display, 14px
│ ₹ 24,500           │  ← Lato Bold
│ [Add to Cart]      │  ← Appears on hover
└────────────────────┘
```

### Navigation Mega Menu
- White background with gold dividers
- Category image thumbnails on the right
- Clean column layout with bold category headers

### Form Fields
- Border: `1px solid #E8D5A3`
- Focus: `2px solid #C9973A` (gold)
- Rounded: `4px`
- Label: above the field, `Lato 12px uppercase`

---

## 7. Iconography & Imagery

- **Icons:** Custom thin-line icons or Phosphor Icons library (outline style)
- **Icon Color:** Maroon or Gold depending on context
- **Product Images:** Clean white/ivory background, high resolution, multiple angles
- **Lifestyle Images:** Rich, warm-toned photography — traditional Indian settings, brides, families
- **Image Ratio:** Product `1:1`, Hero `16:5`, Editorial `3:2`

---

## 8. Motion & Interactions

| Element | Animation |
|---|---|
| Hero Carousel | Auto-slide every 5s, fade transition |
| Category Cards | Scale `1.03` on hover, `200ms ease` |
| Product Cards | Image swap on hover + "Add to Cart" slide up |
| Navigation Mega Menu | Fade-in `150ms` on hover |
| Page Load | Staggered fade-in of sections from bottom |
| Add to Cart | Button pulse + mini cart count increment |
| Scroll | Smooth scroll, parallax on hero |

---

## 9. Spacing System

| Token | Value |
|---|---|
| `--space-xs` | `4px` |
| `--space-sm` | `8px` |
| `--space-md` | `16px` |
| `--space-lg` | `24px` |
| `--space-xl` | `40px` |
| `--space-2xl` | `64px` |
| `--space-3xl` | `96px` |

---

## 10. Accessibility

- Color contrast ratio: minimum **4.5:1** for body text
- Focus states visible on all interactive elements (gold outline)
- Alt text on all product and banner images
- ARIA labels on icon-only buttons (search, wishlist, cart)
- Keyboard navigable mega menu

---

## 11. Key Design Principles

1. **Luxury through restraint** — ample whitespace, never cluttered
2. **Gold as the emotional anchor** — used sparingly but impactfully
3. **Trust signals prominent** — hallmark, certification, exchange policy visible everywhere
4. **Mobile-first product browsing** — product cards designed for thumb scrolling
5. **Cultural richness** — imagery and campaigns reflect Indian traditions and celebrations
