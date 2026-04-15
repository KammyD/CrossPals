# CrossPals Website v3

Official website — redesigned with a bold **Organic Editorial** aesthetic.

## Design Philosophy

**Aesthetic direction**: Organic × Editorial × Trusted Trade  
**Conceptual core**: Like a premium trade magazine — authoritative, warm, memorable  
**What makes it unforgettable**: The split-panel hero (dark forest left / light ivory right), oversized serif numerals as decoration, handcrafted grain texture on key sections, and Playfair Display giving everything editorial gravitas

### Typography
- **Playfair Display** — display serif for headings. Authoritative, editorial, distinctive. Used heavily for large decorative numbers.
- **Instrument Sans** — refined sans-serif for body. Modern, clean, legible.
- **DM Mono** — monospace for labels, overlines, metadata. Technical credibility.

### Color System
| Token | Value | Usage |
|-------|-------|-------|
| `--forest-deep` | `#152e15` | Hero backgrounds, footer |
| `--forest` | `#1f4a1f` | CTAs, dark sections |
| `--forest-mid` | `#2d6a2d` | Primary brand green (Logo match) |
| `--sage` | `#8fbc8f` | Italic accents on dark BGs |
| `--ivory` | `#f8f4ed` | Main page background |
| `--ivory-deep` | `#f0ebe0` | Alternating sections |
| `--parchment` | `#e8dfc8` | Borders, card stripes |

---

## Project Structure

```
src/
├── styles/global.css          ← All design tokens, shared components, animations
├── i18n/{en,es,utils}.ts      ← Translation system
├── layouts/BaseLayout.astro   ← Universal layout (scroll reveal script included)
├── components/
│   ├── Logo.astro             ← SVG logo (dark/light variants)
│   ├── Header.astro           ← Transparent → frosted-glass on scroll
│   ├── Footer.astro           ← Deep forest footer
│   ├── PageHero.astro         ← Inner-page hero with diagonal clip
│   └── ContactForm.astro      ← EN/ES bilingual form
└── pages/
    ├── index.astro            ← Homepage: split hero, stats, cards, timeline, CTA
    ├── about.astro            ← About: story, values, team
    ├── services.astro         ← Services: alternating rows, timeline, FAQ
    ├── contact.astro          ← Contact: form + sidebar
    ├── blog/
    │   ├── index.astro        ← Blog: featured + filtered grid
    │   └── [slug].astro       ← Article: prose + sticky sidebar
    └── es/                    ← Spanish mirror of all pages
```

---

## Commands

```bash
npm install      # Install dependencies
npm run dev      # Dev server at http://localhost:4321
npm run build    # Production build → /dist
npm run preview  # Preview production build
```

---

## Deploy to Cloudflare Pages

1. Push repo to GitHub
2. Cloudflare Pages → Create project → Connect Git
3. Build command: `npm run build`
4. Output directory: `dist`
5. Environment variable: `NODE_VERSION = 20`

---

## Launch Checklist

- [ ] `ContactForm.astro` → replace `YOUR_WEB3FORMS_KEY` (free at web3forms.com)
- [ ] Footer & pages → replace `yourwhatsapp` with real number (e.g. `8613800000000`)
- [ ] Replace `hello@crosspals.com` with real email
- [ ] `astro.config.mjs` → update `site` with real domain
- [ ] Update social links in `Footer.astro`
- [ ] Replace placeholder testimonials with real client stories
- [ ] Upload logo files to `/public/logo-dark.svg` and `/public/logo-light.svg`
- [ ] Update blog posts with real content

## Add Your Real Logo

In `src/components/Logo.astro`, replace the inline SVG paths with:

```astro
<!-- Use your actual logo files -->
<img src={variant === 'dark' ? '/logo-dark.svg' : '/logo-light.svg'} 
     alt="CrossPals" height={h} />
```

Place files in `/public/`: `logo-dark.svg` (on light backgrounds) and `logo-light.svg` (on dark/green backgrounds).
