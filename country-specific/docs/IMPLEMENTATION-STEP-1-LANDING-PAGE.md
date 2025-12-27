# 📋 Implementation Step 1: Landing Page (explore.html)

> **Status:** ✅ Complete  
> **Date:** December 25, 2025  
> **File:** `country-specific/pages/explore.html`

---

## 🎯 Objective

Create the main entry point for the Country-Specific Tourism Board platform - a Fortune 100-level landing page that:
- Showcases the country's tourism offerings
- Integrates reusable header (mega menu) and footer components
- Establishes the visual language for all subsequent pages
- Serves as a template for other country deployments

---

## 📋 Implementation Approach

### Strategy: Duplicate & Adapt from Bridge55 Core

The landing page was created by:
1. **Duplicating** the Bridge55 `explore.html` (proven, premium design)
2. **Adapting** all content and branding for Côte d'Ivoire
3. **Replacing** components with CI-specific mega menu and footer

This approach ensures:
- ✅ Consistent UX across all SaaS platforms
- ✅ Proven, tested design patterns
- ✅ Faster development with shared code
- ✅ Easy scaling to other countries

### Key Adaptations Made

| Element | Bridge55 (Original) | Côte d'Ivoire (Adapted) |
|---------|---------------------|-------------------------|
| `data-country` | `pan-african` | `ci` |
| Title | "Explore Africa" | "Visit Côte d'Ivoire" |
| Hero subtitle | "55 African countries" | "14 regions of CI" |
| Regions data | African countries | CI districts/regions |
| Experiences | Pan-African | CI-specific activities |
| Hotels | Various Africa | CI partner hotels |
| Events | Pan-African festivals | CI festivals (FEMUA, etc.) |
| Header | Global Header | Mega Menu (CI branded) |
| Footer | Global Footer | CI Ministry Footer |
| Wallet mention | M-Pesa | Orange Money |

---

## 📐 Design System Compliance

### Variables Used (from PREMIUM-SAAS-DESIGN-SYSTEM.md)

```css
/* Côte d'Ivoire Brand Colors */
--primary: #FF8C00;        /* Orange */
--primary-dark: #E67300;
--secondary: #00954A;      /* Green */
--secondary-dark: #007A3D;

/* Typography */
--font-primary: 'Inter', sans-serif;

/* Spacing (8-point grid) */
--space-1: 4px;   --space-2: 8px;   --space-3: 12px;
--space-4: 16px;  --space-5: 20px;  --space-6: 24px;
--space-8: 32px;  --space-10: 40px; --space-12: 48px;
--space-16: 64px; --space-20: 80px;

/* Border Radius */
--radius-sm: 4px;  --radius-md: 8px;  --radius-lg: 12px;
--radius-xl: 16px; --radius-2xl: 24px;

/* Shadows */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
```

---

## 🏗️ Page Structure

### Section Breakdown

| Section | Purpose | Component Type |
|---------|---------|----------------|
| Header | Navigation | External (mega-menu.html) |
| Hero | First impression, CTA | Custom section |
| Destinations | Featured regions | Card grid (masonry) |
| Experiences | Activities showcase | Card grid (4-col) |
| Hotels | Partner stays | Card grid (4-col) |
| Events | Upcoming festivals | Banner with list |
| CTA | Dia integration | Call to action |
| Footer | Links & branding | External (global-footer-ci.html) |

---

## 🔧 Implementation Details

### 1. SEO Meta Tags

```html
<title>Visit Côte d'Ivoire | Discover the Pearl of West Africa</title>
<meta name="description" content="Explore Côte d'Ivoire...">
<meta property="og:title" content="Visit Côte d'Ivoire | Official Tourism Portal">
<meta property="og:image" content="https://images.unsplash.com/...">
```

**Why:** Essential for search engine visibility and social media sharing.

### 2. Component Loading Pattern

```javascript
async function loadComponent(containerId, componentPath) {
    const response = await fetch(componentPath);
    const html = await response.text();
    document.getElementById(containerId).innerHTML = html;
    
    // Execute inline scripts from loaded component
    const scripts = container.querySelectorAll('script');
    scripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.textContent = script.textContent;
        document.body.appendChild(newScript);
    });
}
```

**Why:** Enables component reuse across all pages without duplicating code.

**Usage:**
```javascript
loadComponent('header-container', '../components/header/mega-menu.html');
loadComponent('footer-container', '../components/footer/global-footer-ci.html');
```

### 3. Hero Section Pattern

```html
<section class="hero">
    <div class="hero-background">
        <img src="..." alt="...">
    </div>
    <div class="hero-overlay"></div>
    <div class="hero-content">
        <div class="hero-badge">...</div>
        <h1 class="hero-title">...</h1>
        <p class="hero-description">...</p>
        <div class="hero-cta">...</div>
        <div class="hero-stats">...</div>
    </div>
</section>
```

**Layers:**
1. `hero-background` - Full-bleed image
2. `hero-overlay` - Gradient overlay for text readability
3. `hero-content` - Centered text and CTAs

### 4. Card Grid Patterns

**Masonry Grid (Destinations):**
```css
.destinations-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-6);
}

.destination-card:first-child {
    grid-column: span 2;
    grid-row: span 2;
}
```

**Uniform Grid (Experiences/Hotels):**
```css
.experiences-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-6);
}
```

### 5. Responsive Breakpoints

```css
@media (max-width: 1024px) {
    .destinations-grid { grid-template-columns: repeat(2, 1fr); }
    .experiences-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
    .destinations-grid { grid-template-columns: 1fr; }
    .experiences-grid { grid-template-columns: 1fr; }
}
```

### 6. Scroll Animation Pattern

```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.destination-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    observer.observe(card);
});
```

**Why:** Adds subtle entrance animations for a premium feel.

---

## 📁 File Dependencies

```
country-specific/
├── pages/
│   └── explore.html                    ← THIS FILE
├── components/
│   ├── header/
│   │   └── mega-menu.html              ← Loaded dynamically
│   └── footer/
│       └── global-footer-ci.html       ← Loaded dynamically
```

---

## 🖼️ Image Sources

All images use Unsplash for demo purposes. In production:
- Replace with official tourism board imagery
- Host on CDN for performance
- Optimize for web (WebP format, responsive sizes)

| Section | Image Dimensions | Format |
|---------|------------------|--------|
| Hero | 1920x1080 | WebP/JPEG |
| Destination Cards | 800x600 | WebP/JPEG |
| Experience Cards | 500x350 | WebP/JPEG |
| Hotel Cards | 500x350 | WebP/JPEG |

---

## 🔄 Scaling to Other Countries

### Step 1: Copy Template
```bash
cp explore.html explore-[country].html
```

### Step 2: Update Variables
Change CSS variables to match country colors:
```css
--primary: #[COUNTRY_PRIMARY];
--secondary: #[COUNTRY_SECONDARY];
```

### Step 3: Update Content
- Hero image and text
- Destination cards (regions)
- Experience cards (activities)
- Hotel cards (partners)
- Events (festivals)

### Step 4: Update Component Paths
```javascript
loadComponent('footer-container', '../components/footer/global-footer-[country].html');
```

---

## ✅ Checklist for Other Countries

- [ ] Update page title and meta tags
- [ ] Replace hero image and text
- [ ] Add country-specific destinations (5-6)
- [ ] Add country-specific experiences (4-8)
- [ ] Add partner hotels (4-8)
- [ ] Add upcoming events (3-5)
- [ ] Create country-specific footer component
- [ ] Test responsive design
- [ ] Verify component loading
- [ ] Test all links

---

## 📊 Performance Targets

| Metric | Target | Notes |
|--------|--------|-------|
| First Contentful Paint | < 1.5s | Critical for user experience |
| Largest Contentful Paint | < 2.5s | Hero image optimization |
| Cumulative Layout Shift | < 0.1 | Prevent content jumping |
| Lighthouse Score | > 90 | Mobile and desktop |

---

## 🐛 Known Issues / TODOs

- [ ] Add loading skeletons for component loading
- [ ] Implement lazy loading for below-fold images
- [ ] Add error boundaries for component failures
- [ ] Integrate actual Dia AI assistant
- [ ] Connect booking buttons to checkout flow

---

## 📝 Changelog

| Date | Change |
|------|--------|
| Dec 25, 2025 | Initial implementation |
| Dec 25, 2025 | **MAJOR UPDATE:** Duplicated Bridge55 `explore.html` and fully adapted for Côte d'Ivoire |

### December 25, 2025 - Major Update Details

**Implementation Approach Changed:**
- Duplicated Bridge55 `explore.html` (proven premium design)
- Adapted all content for Côte d'Ivoire
- Integrated CI-specific mega menu and footer

**Changes Made:**
1. `data-country="ci"` applied throughout
2. Hero title: "Explore Côte d'Ivoire Your Way"
3. Subtitle references 14 regions, Abidjan to Yamoussoukro
4. Region tabs: All Regions, Coastal, Central, North, West, East
5. `regionCities` updated with CI cities (Abidjan, Yamoussoukro, Grand-Bassam, etc.)
6. `partnerCountries` renamed to CI regions/districts
7. `smartRoutes` updated with CI multi-day itineraries
8. `recommendedData` updated with CI stays, experiences, and events
9. Value propositions updated (Orange Money instead of M-Pesa)
10. Section headers updated ("Ivorian adventure", "Côte d'Ivoire's diverse regions")
11. Header loads from `../components/header/mega-menu.html`
12. Footer loads from `../components/footer/global-footer-ci.html`

**Files Modified:**
- `country-specific/pages/explore.html`

**Files Referenced:**
- `country-specific/components/header/mega-menu.html`
- `country-specific/components/footer/global-footer-ci.html`

---

*Documentation created for scaling purposes as part of the Country-Specific SaaS Platform.*

