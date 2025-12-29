# Block 1: Hero Section v2.0

**Version:** 2.0.0  
**Last Updated:** December 29, 2025  
**Status:** ✅ Implemented  
**Block ID:** `block-1-hero`

---

## Overview

The Hero Section is a full-viewport rotating slideshow featuring high-impact marketing images and campaign messaging. It provides an immersive first impression similar to Visit Qatar's homepage design.

## Features

| Feature | Description | Status |
|---------|-------------|--------|
| Auto-rotating slides | 8-second intervals with smooth transitions | ✅ |
| Campaign tab navigation | Bottom tabs for direct slide access | ✅ |
| Ken Burns effect | Subtle zoom animation on background images | ✅ |
| Keyboard navigation | Arrow keys for slide control | ✅ |
| Touch swipe support | Mobile-friendly swipe gestures | ✅ |
| Pause on hover | Auto-play pauses when hovered | ✅ |
| Responsive design | Optimized for all device sizes | ✅ |
| Accessibility | ARIA labels, reduced motion support | ✅ |

---

## Image Specifications for Super Admin

### Background Images

| Property | Value | Notes |
|----------|-------|-------|
| **Dimensions** | 1920 × 1080px | Minimum resolution |
| **Aspect Ratio** | 16:9 | Desktop primary |
| **Format** | WebP (preferred) or JPEG | WebP for better compression |
| **Max File Size** | 500KB | Optimized for performance |
| **Color Profile** | sRGB | Web-safe colors |

### Mobile Background Images (Optional)

| Property | Value | Notes |
|----------|-------|-------|
| **Dimensions** | 768 × 1024px | Portrait orientation |
| **Aspect Ratio** | 3:4 | Mobile-optimized |
| **Format** | WebP or JPEG | Same as desktop |
| **Max File Size** | 300KB | Mobile data considerations |

### Image Guidelines

1. **Focal Point**: Keep main subject in center or left-center (text overlay is on left)
2. **Brightness**: Images should not be too dark or too light for text readability
3. **Theme**: Use `data-theme="dark"` for lighter images, `data-theme="light"` for darker images
4. **Resolution**: Always use high-resolution images (at least 1920px wide)
5. **Compression**: Use tools like TinyPNG, Squoosh, or ImageOptim

---

## Slide Content Fields

Each slide can be configured with the following fields:

| Field | Type | Max Length | Description |
|-------|------|------------|-------------|
| `image` | URL | - | Background image URL (1920×1080px) |
| `mobileImage` | URL | - | Mobile background (768×1024px) [optional] |
| `badge` | String | 30 chars | Badge text (e.g., "Featured Event") |
| `badgeIcon` | String | - | FontAwesome icon class |
| `headline` | HTML | 60 chars | Main headline (supports `<span class="accent">`) |
| `subheadline` | String | 120 chars | Subheadline/description |
| `ctaText` | String | 25 chars | CTA button text |
| `ctaUrl` | URL | - | CTA destination link |
| `theme` | Enum | - | "light" or "dark" |

---

## File Structure

```
country-specific/components/hero/
├── hero-v2.html      # Complete standalone component
├── hero-v2.css       # Styles (can be embedded or linked)
├── hero-v2.js        # JavaScript slideshow logic
└── README.md         # This documentation
```

---

## Integration

### In explore.html

Replace the existing hero section with:

```html
<!-- HERO SECTION v2.0 -->
<section class="hero-v2" id="hero-v2">
    <div class="hero-slides">
        <!-- Slides here -->
    </div>
    <div class="hero-campaign-tabs">
        <!-- Campaign tabs here -->
    </div>
</section>
```

### CSS Integration

```html
<link rel="stylesheet" href="../components/hero/hero-v2.css">
```

### JavaScript Integration

```html
<script src="../components/hero/hero-v2.js"></script>
```

---

## JavaScript API

The `HeroSlideshow` object is exposed globally and provides:

```javascript
// Go to specific slide
HeroSlideshow.goToSlide(2);

// Next/Previous slide
HeroSlideshow.nextSlide();
HeroSlideshow.prevSlide();

// Pause/Resume auto-play
HeroSlideshow.pauseAutoPlay();
HeroSlideshow.resumeAutoPlay();

// Update slide content dynamically (Super Admin)
HeroSlideshow.updateSlideContent(0, {
    image: 'https://example.com/new-image.jpg',
    headline: 'New <span class="accent">Headline</span>',
    subheadline: 'New description text',
    ctaText: 'Learn More',
    ctaUrl: '/new-page'
});

// Get current slide info
const info = HeroSlideshow.getCurrentSlide();
// { index: 0, element: HTMLElement, total: 4 }
```

---

## Slide Configuration Examples

### Beach/Coastal Slide

```html
<div class="hero-slide" data-slide="0" data-theme="light">
    <div class="hero-slide-bg" style="background-image: url('beach-1920x1080.jpg');"></div>
    <div class="hero-slide-overlay"></div>
    <div class="hero-content-wrapper">
        <div class="hero-content-inner">
            <div class="hero-badge-v2">
                <i class="fa-solid fa-umbrella-beach"></i>
                <span>Coastal Paradise</span>
            </div>
            <h1 class="hero-headline-v2">
                Discover the <span class="accent">Ivory Coast</span>
            </h1>
            <p class="hero-subheadline-v2">
                From pristine beaches to vibrant cities...
            </p>
            <a href="#explore" class="hero-cta-v2">
                Start Exploring <i class="fa-solid fa-arrow-right"></i>
            </a>
        </div>
    </div>
</div>
```

### Event/Campaign Slide (AFCON)

```html
<div class="hero-slide" data-slide="2" data-theme="light">
    <div class="hero-slide-bg" style="background-image: url('afcon-stadium-1920x1080.jpg');"></div>
    <div class="hero-slide-overlay"></div>
    <div class="hero-content-wrapper">
        <div class="hero-content-inner">
            <div class="hero-badge-v2">
                <i class="fa-solid fa-futbol"></i>
                <span>AFCON 2025</span>
            </div>
            <h1 class="hero-headline-v2">
                The <span class="accent">Cup of Nations</span> Awaits
            </h1>
            <p class="hero-subheadline-v2">
                Book stadiums, stays, and exclusive fan packages.
            </p>
            <a href="/afcon" class="hero-cta-v2">
                Get Tickets <i class="fa-solid fa-arrow-right"></i>
            </a>
        </div>
    </div>
</div>
```

---

## Responsive Breakpoints

| Breakpoint | Hero Height | Content Alignment |
|------------|-------------|-------------------|
| Desktop (>1200px) | 85vh (max 800px) | Center-left |
| Tablet (992-1200px) | 75vh (max 650px) | Center-left |
| Mobile (768-992px) | 80vh (max 600px) | Bottom-left |
| Small (<768px) | 80vh (max 600px) | Bottom-left |
| XSmall (<480px) | 80vh (min 450px) | Bottom-left |

---

## Accessibility

- **ARIA Labels**: All slides have `aria-hidden` attributes
- **Tab Navigation**: Campaign tabs support keyboard focus
- **Reduced Motion**: Respects `prefers-reduced-motion` preference
- **Focus Visible**: Clear focus indicators on interactive elements
- **Screen Reader**: Semantic HTML structure

---

## Performance

- **Lazy Loading**: Implement for non-visible slides
- **Image Optimization**: WebP format with JPEG fallback
- **CSS-only Ken Burns**: No JavaScript for zoom animation
- **Visibility API**: Pauses when tab is hidden

---

## Super Admin Dashboard Integration

The Super Admin can manage slides through the dashboard with fields for:

1. **Slide Order**: Drag-and-drop reordering
2. **Image Upload**: Direct image upload with size validation
3. **Content Editing**: WYSIWYG for headline/subheadline
4. **CTA Configuration**: Button text and destination
5. **Theme Selection**: Light/Dark overlay toggle
6. **Active/Inactive**: Toggle slide visibility
7. **Schedule**: Set start/end dates for campaigns

---

## Changelog

### v2.0.0 (2025-12-29)
- Initial implementation
- 4 demo slides: Beaches, Culture, AFCON 2025, Nature
- Auto-rotating slideshow with 8s intervals
- Campaign tab navigation
- Ken Burns zoom effect
- Full responsive design
- Accessibility compliance

---

## Testing Checklist

- [x] Slides rotate automatically every 8 seconds
- [x] Campaign tabs switch slides correctly
- [x] Keyboard navigation (Arrow keys) works
- [x] Touch swipe works on mobile
- [x] Pause on hover works
- [x] Animations reset on slide change
- [x] Responsive on all breakpoints
- [x] Works with reduced motion preference
- [x] All images load correctly
- [x] CTAs link to correct pages

---

## Related Documentation

- [Block 0: Top Nav & Mega Menu](./BLOCK-0-TOP-NAV-MEGA-MENU.md)
- [Block 0.5: Search Popup](./BLOCK-0.5-SEARCH-POPUP.md)
- [Premium SaaS Design System](../../documents/PREMIUM-SAAS-DESIGN-SYSTEM.md)

