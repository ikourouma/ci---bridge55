# Block 0: Top Nav & Mega Menu

## 📋 Specification Document
**Version:** 1.1.0  
**Last Updated:** December 29, 2025  
**Status:** ✅ Implemented  
**Priority:** Critical (Foundation Block)

### v1.1.0 Changelog
- Changed mega menu from hover-based to **click-based toggle** (similar to Visit Qatar)
- Menu stays open until user clicks elsewhere or selects another menu item
- Renamed "About CI" to "About Côte d'Ivoire" in the Discover mega menu
- Improved click handling with `menuJustOpened` flag to prevent immediate close

---

## 🎯 Overview

Block 0 establishes the global navigation system for the CI-Bridge55 platform. This includes the utility bar, main navigation, mega menus, mobile drawer, and all interactive header components.

### Key Deliverables
| File | Description | Location |
|------|-------------|----------|
| `mega-menu-v2.html` | Complete HTML structure | `/components/header/` |
| `mega-menu-v2.css` | Extracted CSS styles | `/components/header/` |
| `mega-menu-v2.js` | JavaScript controller | `/components/header/` |
| `BLOCK-0-TOP-NAV-MEGA-MENU.md` | This documentation | `/docs/` |

---

## 🏗️ Architecture

### Component Hierarchy

```
site-header
├── utility-bar
│   ├── utility-left (Ministry link, B2B links)
│   ├── weather-time-widget
│   └── utility-actions (Settings pill, Ask Dia)
├── main-nav
│   ├── nav-left (Hamburger, Logo + Tagline)
│   ├── nav-links (Desktop navigation)
│   └── nav-actions (eVisa, Cart, Notifications, Profile, Search)
├── mega-menus
│   ├── mega-discover (Discover Côte d'Ivoire)
│   ├── mega-plan (Plan Your Trip)
│   ├── mega-things (Things to Do)
│   └── mega-events (Events)
└── mobile-menu (Full drawer navigation)
```

---

## 📐 Design Specifications

### Layout Heights (CSS Variables)

```css
--utility-bar-height: 44px;
--main-nav-height: 72px;
--header-total-height: 116px;
--breadcrumb-height: 48px;
```

### Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| > 1280px | Full desktop experience |
| 1024-1279px | Compact nav, mega menus work |
| 768-1023px | Hide desktop links, utility bar compact |
| < 768px | Hide utility bar, mobile-first |

---

## 🎨 Branding Elements

### Logo

```
┌─────────────────────────┐
│  🇨🇮  CÔTE D'IVOIRE     │
│      Land of Hospitality │
└─────────────────────────┘
```

**Logo Text:** "CÔTE D'IVOIRE" (uppercase, 17px, font-weight: 800)  
**Tagline:** "Land of Hospitality" (11px, italic, green)

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--ci-orange` | #FF8C00 | Primary brand color |
| `--ci-green` | #00954A | Secondary, CTAs |
| `--bg-dark` | #111827 | Utility bar background |
| `--bg-white` | #FFFFFF | Main nav background |

---

## 🧭 Navigation Structure

### Discover Côte d'Ivoire (Mega Menu)

#### About Côte d'Ivoire
| Link | URL | SEO Title |
|------|-----|-----------|
| About CI | `/about-cote-divoire` | About Côte d'Ivoire |
| Geography | `/geography` | Geography of Côte d'Ivoire |
| History & Heritage | `/history-heritage` | History and Heritage |
| Towns & Cities | `/towns-cities` | Towns and Cities |

#### Capitals
| Link | URL | Badge |
|------|-----|-------|
| Yamoussoukro | `/yamoussoukro` | Political Capital |
| Abidjan | `/abidjan` | Economic Capital |

#### Themes
| Link | URL | Icon |
|------|-----|------|
| Traditions & Masks | `/traditions-masks` | 🎭 |
| Music & Dance | `/music-dance` | 🎵 |
| Gastronomy | `/gastronomy` | 🍲 |
| Wildlife | `/wildlife` | 🦁 |

### Plan Your Trip (Mega Menu)

#### Before You Go
- Visa & Entry (`/visa`) - E-Visa badge
- Health & Safety (`/health-safety`)
- Currency (`/currency-money`)
- Travel Tips (`/travel-tips`)

#### Book Services
- Flights (`/flights`)
- Hotels & Stays (`/stays`)
- Car Rentals (`/cars`)
- Airport Transfers (`/transfers`)
- Travel Insurance (`/insurance`)

### Things to Do (Mega Menu)

#### Activities
- Beaches & Resorts (`/beaches`)
- Safari & Wildlife (`/safari`)
- Water Sports (`/water-sports`)
- Markets & Shopping (`/shopping`)

#### Experiences
- Food Tours (`/food-tours`)
- Cultural Tours (`/cultural-tours`)
- Nightlife (`/nightlife`)
- Wellness & Spa (`/wellness-spa`)

### Events (Mega Menu)

#### By Category
- Festivals (`/events/festivals`)
- Music & Concerts (`/events/music`)
- Sports Events (`/events/sports`)
- Business & Expos (`/events/business`)

#### By Time
- Today (`/events/today`)
- This Weekend (`/events/this-weekend`)
- This Month (`/events/this-month`)

---

## 🔧 Super Admin Management

### Configurable Elements

| Element | Super Admin Field | Type |
|---------|-------------------|------|
| Languages | `settings.languages` | Array |
| Currency | `settings.currency` | String |
| Country | `settings.country` | String |
| Taglines | `branding.taglines` | Array |
| B2B Links | `navigation.b2bLinks` | Array |
| Menu Links | `navigation.megaMenus` | Object |

### Adding New Languages

```javascript
// In Super Admin Dashboard
CONFIG.languages.push({
    code: 'es',
    name: 'Español',
    flag: 'es'
});
```

### Dynamic Link Management

All mega menu links are SEO-optimized with:
- `title` attribute for accessibility
- `data-img` for dynamic hero images
- `data-title`, `data-desc` for content
- `data-cta` for call-to-action text
- `data-badge` for category badge

---

## 🖼️ Dynamic Hero Images

Each mega menu link includes data attributes for the hero panel:

```html
<a href="/abidjan" class="mega-link"
   data-img="https://images.unsplash.com/..."
   data-title="Abidjan"
   data-desc="The vibrant economic capital..."
   data-cta="Explore Abidjan"
   data-badge="Economic Capital">
   Abidjan
</a>
```

On hover:
1. Image fades out (200ms)
2. New image loads
3. Image fades in
4. Title, description, badge, and CTA update

---

## 📱 Mobile Menu Structure

### Sections

1. **EXPLORE**
   - About Côte d'Ivoire
   - Discover Côte d'Ivoire
   - Plan Your Trip
   - Things to Do
   - Events

2. **BOOK SERVICES**
   - Flights
   - Hotels & Stays
   - Car Rentals
   - Transfers
   - Experiences

3. **DEALS & OFFERS**
   - Hot Deals (with count badge)
   - Travel Packages
   - Last Minute

4. **MY ACCOUNT**
   - My Trips
   - Saved / Wishlist
   - Cart
   - Profile Settings

5. **FOR BUSINESS**
   - List Your Business
   - Advertise
   - Developer API

6. **ESSENTIAL INFO**
   - Visa & Entry
   - Health & Safety
   - Currency (XOF)

7. **SUPPORT**
   - FAQ
   - Contact Us

---

## ⌨️ Accessibility

### ARIA Attributes

```html
<!-- Hamburger -->
<button class="hamburger-menu" 
        aria-label="Open menu" 
        aria-expanded="false" 
        aria-controls="mobileMenu">

<!-- Nav Links -->
<button class="nav-link" 
        aria-expanded="false" 
        aria-haspopup="true">

<!-- Mobile Menu -->
<div class="mobile-menu" 
     role="dialog" 
     aria-label="Mobile navigation" 
     aria-hidden="true">
```

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Navigate through focusable elements |
| `Enter/Space` | Activate buttons/links |
| `Escape` | Close open menus/modals |
| `Arrow Keys` | Navigate within mega menu (future) |

---

## 🔔 User State Features

### Logged-Out State
- Profile icon shows "Guest"
- Notification bell hidden
- Cart visible but empty
- Sign In / Register link visible

### Logged-In State
- Welcome message in logo area
- Notification bell visible with count
- Cart shows item count
- Profile dropdown shows user info

### Cart Functionality
```javascript
// Add to cart
window.addToCart();

// Update count
window.MegaMenuV2.updateCartCount(3);
```

### Notification System
```javascript
// Update notifications
window.MegaMenuV2.updateNotificationCount(5);
```

---

## 🧪 Testing Checklist

### Desktop (> 1024px)
- [ ] Utility bar fully visible
- [ ] All nav links visible
- [ ] Mega menus open on hover
- [ ] Dynamic images swap on hover
- [ ] CTAs are clickable
- [ ] Profile dropdown works
- [ ] Search button triggers modal

### Tablet (768-1024px)
- [ ] Utility bar compact
- [ ] Nav links hidden
- [ ] Hamburger visible
- [ ] Mega menus still work via hamburger

### Mobile (< 768px)
- [ ] Utility bar hidden
- [ ] Mobile menu opens smoothly
- [ ] All sections accessible
- [ ] Footer settings work
- [ ] Scroll works within drawer

### Cross-Browser
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

---

## 🔗 Integration with Other Blocks

### Dependencies
- **Block 6 (Breadcrumb):** Uses `--header-total-height` for positioning
- **Block 7 (Footer):** Consistent styling tokens
- **Dia AI:** Triggered via `openDia()` function

### Exposed Global Functions
```javascript
window.toggleMobileMenu()
window.toggleProfile(event)
window.toggleWeatherPopup(event)
window.openDia()
window.openSearch()
window.simulateLogin()
window.simulateLogout()
window.addToCart()
```

### Module API
```javascript
window.MegaMenuV2 = {
    init,
    toggleMobileMenu,
    openMegaMenu,
    closeMegaMenus,
    updateCartCount,
    updateNotificationCount,
    simulateLogin,
    simulateLogout,
    CONFIG,
    STATE
};
```

---

## 📝 Changelog

### v1.0.0 (December 29, 2025)
- ✅ Initial implementation
- ✅ Complete HTML structure
- ✅ Extracted CSS file
- ✅ JavaScript controller
- ✅ Discover CI restructured (About, Capitals, Themes)
- ✅ Logo tagline added
- ✅ Cart/Wishlist icon
- ✅ Notification bell for logged-in users
- ✅ Mobile menu complete
- ✅ SEO-optimized links

---

## 🚀 Future Enhancements

| Enhancement | Priority | Block |
|-------------|----------|-------|
| Sticky mini-breadcrumb on scroll | Medium | Block 0.1 |
| Full-screen search modal | High | Block 0.2 |
| Recently viewed in profile | Low | Block 5 |
| Language auto-detect | Medium | Block 0.3 |
| Seasonal announcement banner | High | Block 0.4 |

---

## 📁 File References

```
country-specific/
├── components/
│   └── header/
│       ├── mega-menu-v2.html
│       ├── mega-menu-v2.css
│       └── mega-menu-v2.js
└── docs/
    └── BLOCK-0-TOP-NAV-MEGA-MENU.md
```

---

**Approved By:** [Super Admin]  
**Implementation:** Cursor AI  
**Review Status:** Ready for Testing

