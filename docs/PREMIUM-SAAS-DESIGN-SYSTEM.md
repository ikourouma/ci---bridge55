# Bridge55 Premium SaaS Design System

> **Version:** 2.0 (v9 Master Instruction Compliant)  
> **Last Updated:** December 2025  
> **Status:** Active Living Document — Non-Negotiable Standard

Build distinctive, production-grade SaaS interfaces with the design quality of Stripe, Linear, and Vercel—tailored for Africa's premier travel platform. This platform must behave like a **Fortune-100, enterprise SaaS booking system**.

---

## Table of Contents

1. [Core Philosophy](#core-philosophy)
2. [Visual Design System](#visual-design-system)
3. [Typography System](#typography-system)
4. [Spacing System](#spacing-system)
5. [Component Patterns](#component-patterns)
6. [Country Branding Registry](#country-branding-registry)
7. [Page Patterns](#page-patterns)
8. [Animation & Interaction](#animation--interaction)
9. [Implementation Standards](#implementation-standards)
10. [Platform Integrity Standards (v9)](#platform-integrity-standards-v9) ⭐ NEW
11. [Routing & Navigation Contract](#routing--navigation-contract) ⭐ NEW
12. [Operator Enterprise Model](#operator-enterprise-model) ⭐ NEW
13. [Auto-Audit Compliance](#auto-audit-compliance) ⭐ NEW
14. [Quality Checklist](#quality-checklist)

---

## Core Philosophy

**Every pixel serves a purpose.** Premium design isn't decoration—it's strategic clarity that builds trust and drives conversion. The difference between generic and exceptional comes from:

1. **Intentional constraints** - Systematic spacing, limited color palettes, precise typography
2. **Functional beauty** - Animations that communicate state, not just delight
3. **Content clarity** - Writing that respects user intelligence
4. **Technical polish** - Performance, accessibility, responsiveness as design features

---

## Visual Design System

### Pan-African Brand (Default)

The Bridge55 pan-African brand represents the unified identity across all 54 African nations plus the diaspora.

```css
:root {
  /* Primary Brand */
  --primary: #FF6B35;           /* Bridge55 Orange */
  --primary-dark: #E55A2B;      /* Hover/Active state */
  --primary-light: #FFF5EB;     /* Background tint */
  
  /* Secondary Brand */
  --secondary: #004E89;         /* Deep Blue */
  --navy-dark: #051b2e;         /* Hero backgrounds */
  --navy-card: #0A1F35;         /* Card backgrounds */
  
  /* Accent */
  --accent: #FFD700;            /* Gold accent */
  --accent-green: #22c55e;      /* Success states */
  
  /* Neutrals */
  --text-primary: #0a2540;      /* Deep navy, not pure black */
  --text-secondary: #425466;    /* Medium gray for supporting text */
  --text-tertiary: #8898aa;     /* Muted text */
  --bg-light: #f6f9fc;          /* Surface background */
  --border-color: rgba(0, 0, 0, 0.08);
  
  /* Gradients */
  --bridge-gradient: linear-gradient(135deg, #FF6B35 0%, #f5576c 100%);
  --bridge-dark-gradient: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  --dia-gradient: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
}
```

### Color Application Rules

- **Background**: 90% white/neutral, 10% color
- **Brand color**: CTAs, active states, key highlights only
- **Text**: Never pure black (#000000), always navy/dark gray
- **Borders**: `rgba(0, 0, 0, 0.08)` for subtle division
- **Hover states**: Darken brand color 10%, don't use opacity

---

## Typography System

### Font Stack

```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--font-display: 'Jost', 'Inter', sans-serif;  /* Headlines */
```

### Type Scale (Major Second - 1.125 ratio, 16px base)

```css
--font-size-xs: 0.75rem;    /* 12px - labels, captions */
--font-size-sm: 0.875rem;   /* 14px - body small, UI text */
--font-size-base: 1rem;     /* 16px - body text */
--font-size-lg: 1.125rem;   /* 18px - large body */
--font-size-xl: 1.266rem;   /* 20px - section headings */
--font-size-2xl: 1.424rem;  /* 23px - card titles */
--font-size-3xl: 1.602rem;  /* 26px - page headings */
--font-size-4xl: 2.027rem;  /* 32px - hero headlines */
--font-size-5xl: 2.566rem;  /* 41px - major headlines */

/* Font weights */
--font-weight-normal: 400;
--font-weight-medium: 500;   /* UI elements, emphasis */
--font-weight-semibold: 600; /* Headings */
--font-weight-bold: 700;     /* Rare, high-emphasis only */

/* Line heights */
--line-height-tight: 1.2;    /* Headlines */
--line-height-normal: 1.5;   /* Body text (WCAG minimum) */
--line-height-relaxed: 1.75; /* Marketing copy */

/* Letter spacing */
--letter-spacing-tight: -0.02em;  /* Large headlines */
--letter-spacing-normal: 0;
--letter-spacing-wide: 0.05em;    /* All-caps labels */
```

### Typography Rules

- **Headlines**: Semibold (600), tight line-height (1.2), slightly negative tracking
- **Body**: Normal weight (400), 1.5 line-height minimum
- **UI labels**: Medium weight (500), 12-14px, often uppercase with wide tracking
- **Never use pure black text** - always #0a2540 or similar deep tone

---

## Spacing System

### 8-Point Grid

```css
--space-1: 0.25rem;   /* 4px - fine-tuning only */
--space-2: 0.5rem;    /* 8px - tight spacing */
--space-3: 0.75rem;   /* 12px - compact elements */
--space-4: 1rem;      /* 16px - standard gap */
--space-6: 1.5rem;    /* 24px - section padding */
--space-8: 2rem;      /* 32px - component separation */
--space-12: 3rem;     /* 48px - major sections */
--space-16: 4rem;     /* 64px - page sections */
--space-24: 6rem;     /* 96px - hero spacing */
--space-32: 8rem;     /* 128px - major page divisions */
```

### Spacing Application

| Context | Spacing |
|---------|---------|
| Component internal padding | 16-24px |
| Between components | 32-48px |
| Between page sections | 64-96px |
| Container max-width | 1200-1440px |
| Content max-width (readability) | 680-720px |

### Border and Shadow System

```css
/* Border radius */
--radius-sm: 4px;     /* Buttons, inputs */
--radius-md: 8px;     /* Cards, containers */
--radius-lg: 12px;    /* Large cards */
--radius-xl: 16px;    /* Hero elements */
--radius-2xl: 24px;   /* Major containers */

/* Elevation (use sparingly) */
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.08);
--shadow-xl: 0 20px 48px rgba(0, 0, 0, 0.10);

/* Borders (subtle) */
--border-width: 1px;
--border-color: rgba(0, 0, 0, 0.08);
--border-color-strong: rgba(0, 0, 0, 0.12);
```

---

## Component Patterns

### Button Styles

```css
/* Primary Button */
.btn-primary {
  background: var(--primary);
  color: white;
  padding: 14px 36px;
  border-radius: 50px;
  font-weight: 600;
  border: none;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 20px rgba(255, 107, 53, 0.3);
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(255, 107, 53, 0.4);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 14px 36px;
  border-radius: 50px;
  font-weight: 600;
}

.btn-secondary:hover {
  background: var(--bg-light);
}
```

### Card Patterns

```css
.card {
  background: white;
  border-radius: var(--radius-xl);
  padding: 40px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  transition: all 200ms ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

---

## Country Branding Registry

> **⚠️ Living Document**: Update this section each time a new country is added to Bridge55.

### How Country Branding Works

1. **CSS Variables**: Each country has its own color palette defined via CSS custom properties
2. **Data Attribute**: Apply `data-country="xx"` to the `<body>` element
3. **Automatic Theming**: All components using CSS variables automatically adapt
4. **Localized Payments**: Each country shows relevant payment methods

### Implementation Pattern

```css
/* Country theme applied via data attribute */
[data-country="ke"] {
  --primary: #BB0000;
  --primary-dark: #8B0000;
  --secondary: #006600;
  --accent: #FFFFFF;
}
```

```html
<!-- Apply country theme -->
<body data-country="ke">
  <!-- All components now use Kenya's colors -->
</body>
```

---

### Registered Countries

#### Pan-African (Default)
| Property | Value | Description |
|----------|-------|-------------|
| Code | `pan-african` | Default brand |
| Flag | 🌍 | Global/Africa |
| Primary | `#FF6B35` | Bridge55 Orange |
| Primary Dark | `#E55A2B` | Hover state |
| Secondary | `#004E89` | Deep Blue |
| Accent | `#FFD700` | Gold |
| Mobile Payment | Mobile Money | Generic |

---

#### 🇰🇪 Kenya
| Property | Value |
|----------|-------|
| Code | `ke` |
| Flag | 🇰🇪 |
| Primary | `#BB0000` |
| Primary Dark | `#8B0000` |
| Secondary | `#006600` |
| Accent | `#FFFFFF` |
| Mobile Payment | M-Pesa |
| Currency | KES |
| Languages | en, sw |

---

#### 🇳🇬 Nigeria
| Property | Value |
|----------|-------|
| Code | `ng` |
| Flag | 🇳🇬 |
| Primary | `#008751` |
| Primary Dark | `#006B3F` |
| Secondary | `#FFFFFF` |
| Accent | `#008751` |
| Mobile Payment | Flutterwave |
| Currency | NGN |
| Languages | en |

---

#### 🇬🇭 Ghana
| Property | Value |
|----------|-------|
| Code | `gh` |
| Flag | 🇬🇭 |
| Primary | `#EF3340` |
| Primary Dark | `#CE1126` |
| Secondary | `#FCD116` |
| Accent | `#006B3F` |
| Mobile Payment | MTN MoMo |
| Currency | GHS |
| Languages | en |

---

#### 🇿🇦 South Africa
| Property | Value |
|----------|-------|
| Code | `za` |
| Flag | 🇿🇦 |
| Primary | `#007749` |
| Primary Dark | `#005C38` |
| Secondary | `#FFB81C` |
| Accent | `#DE3831` |
| Mobile Payment | SnapScan |
| Currency | ZAR |
| Languages | en, af, zu |

---

#### 🇪🇬 Egypt
| Property | Value |
|----------|-------|
| Code | `eg` |
| Flag | 🇪🇬 |
| Primary | `#C8102E` |
| Primary Dark | `#A00D24` |
| Secondary | `#000000` |
| Accent | `#C09A5B` |
| Mobile Payment | Fawry |
| Currency | EGP |
| Languages | ar, en |

---

#### 🇹🇿 Tanzania
| Property | Value |
|----------|-------|
| Code | `tz` |
| Flag | 🇹🇿 |
| Primary | `#1EB53A` |
| Primary Dark | `#169030` |
| Secondary | `#00A3DD` |
| Accent | `#FCD116` |
| Mobile Payment | M-Pesa |
| Currency | TZS |
| Languages | sw, en |

---

#### 🇷🇼 Rwanda
| Property | Value |
|----------|-------|
| Code | `rw` |
| Flag | 🇷🇼 |
| Primary | `#00A1DE` |
| Primary Dark | `#0080B0` |
| Secondary | `#FAD201` |
| Accent | `#20603D` |
| Mobile Payment | MTN MoMo |
| Currency | RWF |
| Languages | en, fr, rw |

---

#### 🇺🇬 Uganda
| Property | Value |
|----------|-------|
| Code | `ug` |
| Flag | 🇺🇬 |
| Primary | `#D4B800` |
| Primary Dark | `#B39B00` |
| Secondary | `#000000` |
| Accent | `#DE3831` |
| Mobile Payment | MTN MoMo |
| Currency | UGX |
| Languages | en, sw |

---

#### 🇲🇦 Morocco
| Property | Value |
|----------|-------|
| Code | `ma` |
| Flag | 🇲🇦 |
| Primary | `#C1272D` |
| Primary Dark | `#A01F24` |
| Secondary | `#006233` |
| Accent | `#FFD700` |
| Mobile Payment | inwi money |
| Currency | MAD |
| Languages | ar, fr |

---

#### 🇨🇮 Côte d'Ivoire
| Property | Value |
|----------|-------|
| Code | `ci` |
| Flag | 🇨🇮 |
| Primary | `#FF8C00` |
| Primary Dark | `#E67300` |
| Secondary | `#00954A` |
| Accent | `#FFFFFF` |
| Mobile Payment | Orange Money |
| Currency | XOF |
| Languages | fr |

---

#### 🇿🇲 Zambia
| Property | Value |
|----------|-------|
| Code | `zm` |
| Flag | 🇿🇲 |
| Primary | `#198754` |
| Primary Dark | `#146C43` |
| Secondary | `#EF7D00` |
| Accent | `#000000` |
| Mobile Payment | MTN MoMo |
| Currency | ZMW |
| Languages | en |

---

### Adding a New Country

When adding a new country to Bridge55, follow these steps:

#### Step 1: Define CSS Variables

Add to `country-branding-demo.html` or create a shared CSS file:

```css
[data-country="XX"] {
  --primary: #XXXXXX;
  --primary-dark: #XXXXXX;
  --secondary: #XXXXXX;
  --accent: #XXXXXX;
  --flag: "🇽🇽";
  --country-name: "Country Name";
}
```

#### Step 2: Add to JavaScript Country Data

```javascript
'XX': {
  name: 'Country Name',
  flag: '🇽🇽',
  primary: '#XXXXXX',
  primaryDark: '#XXXXXX',
  secondary: '#XXXXXX',
  accent: '#XXXXXX',
  mobile: 'Local Payment Method'
}
```

#### Step 3: Update TypeScript Config

Add to `src/config/countries.ts`:

```typescript
export const COUNTRY_XX_CONFIG: CountryConfig = {
  code: 'XX',
  name: 'Country Name',
  localName: 'Nom Local',
  flag: '🇽🇽',
  currency: 'XXX',
  languages: ['en'],
  primaryLanguage: 'en',
  timezone: 'Africa/City',
  region: 'region',
  neighboringCountries: [],
  featuredDestinations: [],
  popularExperiences: [],
  discoveryTitle: 'Discover Country',
  heroImages: [],
  marketingCopy: {
    tagline: 'Tagline',
    description: 'Description'
  }
};
```

#### Step 4: Update This Document

Add a new country section to the [Registered Countries](#registered-countries) section above.

---

## Page Patterns

### Page Architecture Overview

Bridge55 follows a **Hub & Spoke** information architecture for optimal user experience and white-label scalability:

| Page Type | URL Pattern | Example | Purpose |
|-----------|-------------|---------|---------|
| **Explore (Pan-African)** | `/explore` or `/pages/explore.html` | bridge55.africa/explore | Continental hub - all 54 countries |
| **Explore (Country)** | `/explore/{country}` | bridge55.africa/explore/kenya | Country-specific landing page |
| **About** | `/pages/about.html` | bridge55.africa/about | Company manifesto & features |
| **Search Results** | `/search?type={type}` | bridge55.africa/search?type=flights | Unified search results |
| **Booking Flow** | `/book/{type}/{id}` | bridge55.africa/book/hotel/123 | Conversion flow |

### White-Label Architecture

For tourism boards and government partners who want their own custom Bridge55 platform:

```
# URL Structure Examples:
visitkenya.bridge55.africa     → Kenya-branded explore page (data-country="ke")
explore.nigerianoverseas.gov   → Nigeria-branded explore page (data-country="ng")
travel.southafrica.net         → South Africa-branded (data-country="za")
```

**Key Implementation:**
1. Set `data-country` attribute on `<html>` element
2. CSS variables automatically apply country branding
3. Content is filtered/curated for that specific country
4. Same premium design system, different color palette

### Hero Section

```html
<header class="hero-section">
  <div class="hero-bg-img"></div>
  <div class="container position-relative z-2">
    <div class="row align-items-center">
      <div class="col-lg-7">
        <div class="manifesto-pill">
          <span class="badge">Label</span>
          <span class="small text-white-50">Subtext</span>
        </div>
        <h1 class="display-3 fw-bold mb-4">
          Headline with <span class="text-gradient">Accent</span>
        </h1>
        <p class="lead text-white-50 mb-5">
          Supporting description text.
        </p>
        <div class="d-flex gap-3">
          <button class="btn btn-primary">Primary CTA</button>
          <button class="btn btn-secondary">Secondary CTA</button>
        </div>
      </div>
      <div class="col-lg-5">
        <!-- Hero image -->
      </div>
    </div>
  </div>
</header>
```

### Stats Strip

```html
<section class="stats-strip">
  <div class="container">
    <div class="row align-items-center">
      <div class="col stat-col">
        <div class="stat-num">54</div>
        <div class="stat-label">NATIONS</div>
      </div>
      <!-- More stats -->
    </div>
  </div>
</section>
```

### Bento Grid

```html
<div class="row g-4">
  <div class="col-lg-8">
    <div class="bento-card card-dia">
      <!-- Featured content -->
    </div>
  </div>
  <div class="col-lg-4">
    <div class="bento-card">
      <!-- Secondary content -->
    </div>
  </div>
</div>
```

---

## Animation & Interaction

### Animation Principles

- **Duration**: 150-300ms for UI, 500-800ms for page transitions
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` - smooth "ease-in-out" feel
- **Purpose**: Communicate state change, not entertain
- **Accessibility**: Respect `prefers-reduced-motion`

### Common Patterns

```css
/* Hover lift effect */
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Fade in on scroll (with AOS) */
[data-aos="fade-up"] {
  opacity: 0;
  transform: translateY(20px);
  transition: all 600ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Typewriter cursor */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.cursor {
  animation: blink 1s infinite;
}
```

---

## Implementation Standards

### Responsive Breakpoints

```css
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Laptop */
--breakpoint-xl: 1280px;  /* Desktop */
```

### Mobile-First Approach

- Base styles for mobile
- Progressive enhancement for larger screens
- Touch targets minimum 44x44px
- Readable font sizes (16px minimum for body)

### Accessibility Requirements

- Color contrast: 4.5:1 minimum for text
- Focus indicators: Visible, 2px outline
- Keyboard navigation: Full access without mouse
- ARIA labels: For icon buttons, complex components
- Semantic HTML: Use proper heading hierarchy

---

## Explore Page Reference

The Explore page (`pages/explore.html`) is the primary discovery hub for Bridge55. It demonstrates all premium SaaS patterns.

### Key Sections

| Section | Component | Data Source |
|---------|-----------|-------------|
| **Hero** | Search bar (Airbnb-style), badge, headline | Static |
| **Explore by Interest** | 4-column interest card grid | Static images |
| **Explore by Region** | Tabs + horizontal scroll city cards | `regionCities` object |
| **Explore by Country** | Tabs + horizontal scroll country cards | `partnerCountries` array |
| **Smart Routes** | Horizontal scroll route cards with Dia CTA | `smartRoutes` array |
| **Value Props** | 4-column value card grid | Static |
| **Recommended** | Filter tabs + 4-column feed cards | `recommendedData` array |
| **SEO Links** | 3-column link lists | Static |

### Country Theming Implementation

```html
<!-- Pan-African (Default) -->
<html lang="en" data-country="pan-african">

<!-- Kenya-specific -->
<html lang="en" data-country="ke">

<!-- Nigeria-specific -->
<html lang="en" data-country="ng">
```

CSS variables automatically cascade based on `data-country` attribute:

```css
[data-country="ke"] { 
    --primary: #BB0000; 
    --primary-hover: #8B0000; 
    --secondary: #006600; 
}
```

### Breadcrumb Branding (Pan‑African vs Country‑Specific)

- Breadcrumbs are **country-aware** and **react to live theme changes**.
- When `data-country="pan-african"`:
  - Breadcrumb label stays **Explore Africa**
  - Country badge stays hidden
- When `data-country="<country>"`:
  - Breadcrumb label stays the **page name** (ex: **Explore**, **Destinations**)
  - Country badge appears (flag + country name)

**Implementation note**: Use a `MutationObserver` on `<html data-country>` so breadcrumbs stay correct when the user changes country via the Global Header dropdown.

### Adding New Countries

1. Add CSS variables block in explore.html `<style>` section
2. Add to `partnerCountries` array in JavaScript
3. Update `docs/PREMIUM-SAAS-DESIGN-SYSTEM.md` Country Branding Registry
4. Create country-specific explore page (optional): `pages/explore/[code].html`

---

## Destinations Page Reference

The Destinations page (`pages/destinations.html`) is the **directory layer** of discovery:
- **Pan‑African mode** (`data-country="pan-african"`): browse countries by region + featured countries.
- **Country mode** (`data-country="ke"` etc.): browse top cities/regions within the selected country.

### Theming Contract (Non‑Negotiable)
- Country selection and geolocation are applied by the Global Header (`components/global-header.html`) via `data-country`.
- All UI (buttons, badges, links, icon accents) must follow CSS variables:
  - `--primary`, `--secondary`, `--accent`, `--primary-light`, `--icon-accent`
- If a country is not supported → **fallback to Pan‑African**.

### Discovery Sections Standard (Consistency Rule)

For **Top Destinations** and **Popular things to do**:
- **Desktop**: grid layout (scan-first)
- **Mobile**: **2-column grid** (keep even at ≤480px)
- **Content cap**: render **max 12 cards** per section at once
  - **11 real items + 1 sponsored/marketing placeholder**
  - Filtering changes *which* 11 are shown; the rest remain hidden until filters narrow results
- **CTA**: include a consistent **Explore more →** link in the section header (routes to the appropriate results page/section).

---

## Platform Integrity Standards (v9)

> **⚠️ NON-NEGOTIABLE**: These standards apply to ALL pages — existing and future.

### Core Principle

If something **looks clickable**, it **must work** and **must lead somewhere meaningful**.

**Forbidden behaviors:**
- ❌ Broken navigation
- ❌ Fake or generic pages
- ❌ Incomplete demo data
- ❌ Visual regressions
- ❌ Inconsistencies between cards and details
- ❌ "We'll fix later" attitude

### Global Header (A1) — REQUIRED

Every page must:
- Load the **same global header** via `PageShell.loadGlobalShell()`
- Support: Mega menu, Hamburger menu (mobile), Keyboard navigation
- Be injected via JS (not duplicated inline)

**Rules:**
- Header must be loaded once
- No page may hardcode its own header
- Header height must be measured dynamically

### Global Footer (A2) — REQUIRED

Every page must:
- Load the **same global footer** via `PageShell.loadFooter()`
- Footer links must be clickable and valid
- Footer must render even if fetch fails (fallback)

**Rules:**
- Only one footer per page
- Never append footers directly to `<body>`
- Always inject into a placeholder (`#global-footer`)

### Global Breadcrumb (A3) — ABSOLUTELY NON-NEGOTIABLE

**Every page must show a breadcrumb. Period.**

Required pages (non-exhaustive):
- `explore.html`
- `itineraries-search.html`, `itinerary-details.html`
- `experiences-search.html`, `experience-details.html`
- `regions-search.html`, `region-details.html`
- `operators-search.html`, `operator-details.html`
- `interest-details.html`
- Any future page

**Breadcrumb Behavior:**
- Appears directly under the header
- Never overlaps header or hero
- Sticky positioning allowed
- Responsive on mobile
- Accessible (`aria-label="Breadcrumb"`)

**Rendering Contract:**

```js
PageShell.renderBreadcrumb({
  items: [
    { label: "Home", href: "../index.html" },
    { label: "Côte d'Ivoire", href: "explore.html" },
    { label: "Current Page" }  // No href = current page
  ]
});
```

### Global Layout Contract (B1) — No Hardcoded Values

Hardcoded offsets are **FORBIDDEN**. Layout spacing must be computed dynamically.

**Required CSS Variables:**

```css
:root {
  --header-height: 0px;
  --breadcrumb-height: 0px;
  --header-total-height: 0px;
}
```

**Required Layout Rules:**

```css
body {
  padding-top: calc(var(--header-height) + var(--breadcrumb-height));
}

.breadcrumb-bar {
  top: var(--header-height);
}

.sticky-element {
  top: calc(var(--header-height) + var(--breadcrumb-height) + 24px);
}
```

**Required JS Sync:**
- Measure header height after injection
- Measure breadcrumb height after render
- Update variables on resize

**Forbidden:**
- ❌ `top: 120px`
- ❌ `margin-top: 60px`
- ❌ Guessing header height

---

## Routing & Navigation Contract

> **ZERO TOLERANCE**: Every card must link to its own unique details page.

### Forbidden (Instant FAIL)

- ❌ Generic detail pages
- ❌ Placeholder pages
- ❌ Cards linking to search pages
- ❌ Cards without IDs
- ❌ Multiple cards pointing to the same "generic" page

### Mandatory Routing Relationship

```
CARD (data-id)
  → DETAILS PAGE (?id=...)
    → DATA OBJECT (same id)
```

This applies to:
- Itineraries
- Experiences
- Regions
- Interests
- Operators
- AI (Dia) cards
- Curated sections

### Routing Helper Module

All navigation must use centralized routing helpers from `routing.js` or `page-shell.js`:

| Helper | Purpose | Example Output |
|--------|---------|----------------|
| `getOperatorUrl(operator)` | Operator profile | `operator-details.html?id=op-ci-001` |
| `getServiceUrl(service)` | Experience/service detail | `experience-details.html?id=exp-001` |
| `getItineraryUrl(itinerary)` | Itinerary detail | `itinerary-details.html?id=it-1` |
| `getRegionUrl(region)` | Region detail | `region-details.html?id=reg-001` |
| `getInterestUrl(interest)` | Interest detail | `interest-details.html?id=int-001` |
| `getDetailUrl(entity)` | Auto-detect by type | Based on `entity.type` |

**Usage:**

```js
// Good
const url = window.RoutingHelpers.getOperatorUrl(operator);

// Bad - hardcoded
const url = `operator-details.html?id=${operator.id}`;
```

### Safety Rules

If an entity link cannot be computed (missing ID/slug):
1. Disable the CTA
2. Show clear fallback text
3. Log/report the issue (do not crash)

---

## Operator Enterprise Model

### Operator Types

An operator can be:
- **Individual** — Solo guide/service provider
- **Company** — Business entity with multiple operators

### Company Rules

- One company profile
- Company has:
  - Tourism Board Company ID
  - Primary admin
  - Backup admin
- Company may register up to **10 operators**

### Individual Operator Rules

Each operator has:
- Unique Operator ID
- Registration Number
- Linked Company ID (if applicable)
- Approval status (super admin controlled)

**Unapproved operators must not appear anywhere in UI.**

### Canonical Demo Operator Schema

All demo operators use this schema (file: `/data/demo-operators.canonical.js`):

```js
{
  id: "op-ci-001",
  country: "ci",
  type: "company",
  companyId: "CI-TB-2024-001",
  name: "Heritage & Nature Côte d'Ivoire",
  description: "...",
  verified: true,
  rating: 4.9,
  reviews: 312,
  since: 2017,
  registrationNumber: "MTI-CI-000231",
  badges: ["Verified", "Insured", "Top Rated"],
  logo: "/assets/operators/heritage-ci.png",
  contact: {
    phone: "+2252721456789",
    whatsapp: "+2250708091011",
    email: "contact@heritageci.ci",
    website: "https://heritageci.ci"
  },
  services: ["Itineraries", "Experiences", "Private Tours"],
  regions: ["Abidjan", "Grand-Bassam", "Man"],
  languages: ["French", "English", "Dioula"],
  images: [...],
  operators: [
    {
      operatorId: "op-ci-001-a",
      name: "Jean Kouamé",
      role: "Lead Cultural Guide",
      registrationNumber: "CI-GUIDE-88921",
      languages: ["French", "English"]
    }
  ]
}
```

### Operator Profile Access

Every itinerary/experience details page must show:
- Operator card section
- "View Operator Profile" button linking to `operator-details.html?id=...`

**Missing operator profile button = FAIL**

---

## Auto-Audit Compliance

### Purpose

The auto-audit script validates platform compliance with v9 requirements. It must be run after any implementation to verify correctness.

### File Location

```
/utils/autoAudit.js
```

### What It Checks

| Category | Validation |
|----------|------------|
| A1 | Global header present |
| A2 | Global footer present |
| A3 | Breadcrumb container exists and has content |
| B1 | CSS variables set (`--header-height`, `--breadcrumb-height`) |
| D | Card → Details routing (no generic pages) |
| F/G | Operator data completeness |
| I | Operator profile links on detail pages |

### Usage

Include the script on any page to audit:

```html
<script src="../utils/autoAudit.js"></script>
```

Open browser console to see results. **All checks must pass.**

### Expected Output

```
═══════════════════════════════════════════════════════════════
  BRIDGE55 AUTO-AUDIT v9 - Platform Compliance Check
═══════════════════════════════════════════════════════════════
  ✅ [A1] Global header found
  ✅ [A2] Global footer found
  ✅ [A3] Breadcrumb container found
  ✅ [B1] --header-height set: 120px
  ✅ [B1] --breadcrumb-height set: 44px
───────────────────────────────────────────────────────────────
 ✅ AUTO-AUDIT PASSED 
═══════════════════════════════════════════════════════════════
```

### Failure = No Ship

If auto-audit shows **any errors**, the work is not complete.

---

## Quality Checklist

Before shipping any page, verify:

### Design Standards
- [ ] Uses systematic spacing (no random 13px, 27px values)
- [ ] Typography hierarchy clear without relying on color
- [ ] Interactive elements have hover/focus/active states
- [ ] Mobile responsive without horizontal scroll
- [ ] Passes WCAG AA contrast requirements
- [ ] No Lorem Ipsum - real or realistic content
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Loading states designed, not just spinners
- [ ] Error states helpful and specific
- [ ] Works with both pan-African and country-specific themes
- [ ] Country color variables used instead of hardcoded colors

### Platform Integrity (v9) — NON-NEGOTIABLE
- [ ] Global header present and functional via `PageShell`
- [ ] Global footer present and functional via `PageShell`
- [ ] Breadcrumb present and rendered via `PageShell.renderBreadcrumb()`
- [ ] No hardcoded layout offsets (uses CSS variables)
- [ ] Every card links to a unique details page (not generic)
- [ ] All cards have `data-id` attributes
- [ ] All demo entities fully populated
- [ ] Operator profiles accessible everywhere
- [ ] Dia references real entities only
- [ ] Auto-audit passes with zero errors

### Cursor Final Checklist (Before Marking Complete)
Cursor may not mark work "complete" unless all are true:
- [ ] Header present & functional
- [ ] Footer present & functional  
- [ ] Breadcrumb present & correct
- [ ] No hardcoded layout offsets
- [ ] Every card links to a unique details page
- [ ] All demo entities fully populated
- [ ] Operator profiles accessible everywhere
- [ ] Dia references real entities only
- [ ] Auto-audit passes with zero errors

---

## Anti-Patterns to Avoid

### Visual
- ❌ Gradients everywhere (use sparingly, subtly)
- ❌ Too many colors (stick to 3-4 max)
- ❌ Centered everything (mix alignment strategically)
- ❌ Inconsistent spacing (use the spacing system)
- ❌ Pure black text (#000000)

### Content
- ❌ Lorem ipsum text
- ❌ "Seamlessly", "revolutionary", marketing buzzwords
- ❌ Vague benefits ("Best solution ever")
- ❌ Generic CTAs ("Learn more", "Click here")

### Technical
- ❌ Non-responsive design
- ❌ Missing hover states
- ❌ No loading states
- ❌ Inaccessible color contrast
- ❌ Hardcoded colors instead of CSS variables

---

## Files Reference

### Core Design Files

| File | Purpose |
|------|---------|
| `css/global-layout.css` | Global container and grid styles |
| `country-branding-demo.html` | Country color definitions and demo |
| `src/config/countries.ts` | TypeScript country configurations |
| `src/config/countries-full.ts` | Full list of 54 African countries |
| `src/types/country.ts` | TypeScript interfaces for countries |

### Platform Integrity Files (v9)

| File | Purpose |
|------|---------|
| `country-specific/utils/page-shell.js` | Global shell loader, breadcrumb renderer, layout sync |
| `country-specific/utils/routing.js` | Centralized routing helpers |
| `country-specific/css/global-layout.css` | CSS variables for header/breadcrumb heights |
| `country-specific/css/country-theme.css` | Country-specific theme variables |
| `components/breadcrumb/breadcrumb-snippet.html` | Reusable breadcrumb HTML snippet |
| `data/demo-operators.canonical.js` | Canonical demo operator dataset |
| `utils/autoAudit.js` | Platform compliance auto-audit script |

### Component Files

| File | Purpose |
|------|---------|
| `country-specific/components/header/mega-menu.html` | Global header with mega menu |
| `country-specific/components/footer/global-footer-ci.html` | Global footer (Côte d'Ivoire) |
| `country-specific/utils/smart-image.js` | Image fallback handling |
| `country-specific/utils/date-range.js` | Date range field component |
| `country-specific/utils/tax-config.js` | Country tax configuration |
| `country-specific/utils/reviews.js` | Verified review display |
| `country-specific/utils/search-filters.js` | Search filter shell |

---

## Changelog

| Date | Version | Changes |
|------|---------|---------|
| Dec 2025 | 2.0 | **v9 Master Instruction Integration**: Added Platform Integrity Standards, Routing & Navigation Contract, Operator Enterprise Model, Auto-Audit Compliance sections. Updated Quality Checklist with v9 requirements. Added new Files Reference entries. |
| Dec 2025 | 1.0 | Initial documentation created |

---

## Enforcement Statement

**If any of the following occurs, the work is FAILED:**

- ❌ Missing breadcrumb
- ❌ Broken card → details relationship
- ❌ Generic pages
- ❌ Incomplete demo data
- ❌ Missing operator profile button
- ❌ Auto-audit error

---

*This document is maintained by the Bridge55 Design Team. Update whenever design patterns change or new countries are added. This document is the single source of truth for platform standards.*

