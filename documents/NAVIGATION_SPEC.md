# 🧭 Bridge55 Navigation System Specification

## Overview

Complete specifications for the adaptive, federated navigation system that changes based on platform mode (Pan-African vs. Country-Specific).

---

## 🎯 Navigation Principles

### 1. Context-Aware
- Adapts to platform mode automatically
- Changes language based on location
- Adjusts content priorities

### 2. Mobile-First
- Bottom navigation on mobile
- Touch-optimized interactions
- Offline capability

### 3. Accessible
- WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader support
- Focus management

### 4. Performant
- Lazy loading
- Code splitting
- Optimized icons
- Minimal JavaScript

---

## 📐 Navigation Structure

### Top Navigation (All Devices)

```
┌──────────────────────────────────────────────────┐
│ [☰] Bridge55 [Country]    [🔍 Search bar]        │
│                                                  │
│     [Discover] [Deals] [BridgeAI] [Support]     │ ← Desktop only
│                                                  │
│     [🌐 EN] [💱 USD] [🔔 3] [👤 Sign In]        │
└──────────────────────────────────────────────────┘
```

**Components:**
- **Hamburger Menu** (☰): Opens side menu
- **Logo**: Links to home, shows country if applicable
- **Center Links**: Desktop navigation
- **Language Selector**: Dropdown
- **Currency Selector**: Dropdown
- **Notifications**: Badge with count
- **User Button**: Sign in or profile

---

## 🗂️ Side Menu Structure

### Pan-African Mode (bridge55.com)

```
┌─────────────────────────────────────────────┐
│  Bridge55                             [×]   │
├─────────────────────────────────────────────┤
│                                             │
│  🎯 BOOK YOUR EXPERIENCE                    │
├─────────────────────────────────────────────┤
│  ✈️  Flights                                │
│  🏨 Stays                                   │
│  🚗 Cars & Transport                        │
│  🗺️  Tours & Safaris                        │
│  🎭 Things to Do                            │
│  🎪 Events & Festivals                      │
│  🛂 Visa & Travel Docs                      │
│  📦 Vacation Packages                       │
├─────────────────────────────────────────────┤
│  🤖 BRIDGEAI                                │
├─────────────────────────────────────────────┤
│  ✨ Plan My Trip                            │
│  💡 Destination Ideas                       │
│  📊 Price Intelligence                      │
│  🧳 Smart Itineraries                       │
├─────────────────────────────────────────────┤
│  🌍 DISCOVER AFRICA                         │
├─────────────────────────────────────────────┤
│  🦁 Safari Adventures                       │
│     ├─ East Africa Safaris                  │
│     ├─ Southern Africa Wildlife             │
│     └─ West Africa Parks                    │
│                                             │
│  🏖️  Beach & Islands                         │
│     ├─ Zanzibar & East Coast                │
│     ├─ Seychelles & Mauritius               │
│     ├─ Cape Verde Islands                   │
│     └─ West African Coast                   │
│                                             │
│  🏔️  Adventure & Nature                     │
│     ├─ Mount Kilimanjaro                    │
│     ├─ Atlas Mountains                      │
│     ├─ Drakensberg                          │
│     └─ Simien Mountains                     │
│                                             │
│  🏛️  Culture & Heritage                     │
│     ├─ Ancient Egypt                        │
│     ├─ Great Zimbabwe                       │
│     ├─ Ethiopian History                    │
│     └─ West African Kingdoms                │
│                                             │
│  🍽️  Food & Culinary                        │
│     ├─ North African Cuisine                │
│     ├─ West African Flavors                 │
│     ├─ East African Dishes                  │
│     └─ Southern African BBQ                 │
│                                             │
│  🎉 Festivals & Events                      │
│     ├─ Music Festivals                      │
│     ├─ Cultural Celebrations                │
│     ├─ Sports Events                        │
│     └─ Art & Film Festivals                 │
│                                             │
│  🌆 Top Cities                              │
│     ├─ Cairo                                │
│     ├─ Cape Town                            │
│     ├─ Marrakech                            │
│     ├─ Nairobi                              │
│     ├─ Lagos                                │
│     └─ More Cities...                       │
│                                             │
│  🗺️  Travel by Region                       │
│     ├─ 🌍 East Africa                       │
│     ├─ 🌍 West Africa                       │
│     ├─ 🌍 Southern Africa                   │
│     ├─ 🌍 North Africa                      │
│     ├─ 🌍 Central Africa                    │
│     └─ 🌍 Island Nations                    │
├─────────────────────────────────────────────┤
│  💼 FOR TRAVEL OPERATORS                    │
├─────────────────────────────────────────────┤
│  📊 Operator Dashboard                      │
│  ➕ List Your Business                      │
│  📈 Analytics & Insights                    │
│  💰 Earnings & Payouts                      │
│  ⚙️  Manage Listings                        │
│  📚 Resources & Help                        │
├─────────────────────────────────────────────┤
│  🛠️ TOOLS & RESOURCES                       │
├─────────────────────────────────────────────┤
│  💱 Currency Converter                      │
│  🗓️  Travel Calendar                        │
│  🧭 Trip Planner                            │
│  📚 Country Guides                          │
│  ☁️  Weather & Climate                      │
│  💉 Health & Vaccinations                   │
│  🗣️  Language Guides                        │
│  🚨 Travel Alerts                           │
├─────────────────────────────────────────────┤
│  👥 MY ACCOUNT                              │
├─────────────────────────────────────────────┤
│  📅 My Bookings                             │
│  ❤️  Saved & Favorites                      │
│  ⭐ My Reviews                              │
│  🔔 Notifications (3)                       │
│  💳 Payment Methods                         │
│  👤 Profile Settings                        │
│  🔒 Privacy & Security                      │
├─────────────────────────────────────────────┤
│  💬 HELP & SUPPORT                          │
├─────────────────────────────────────────────┤
│  📞 24/7 Support                            │
│  💬 WhatsApp Help                           │
│  📧 Email Support                           │
│  ❓ Help Center                             │
│  💬 Live Chat                               │
│  🛡️  Travel Insurance                       │
│  📖 FAQs                                    │
│  🗺️  Site Map                               │
├─────────────────────────────────────────────┤
│  ℹ️ ABOUT BRIDGE55                          │
├─────────────────────────────────────────────┤
│  🏢 About Us                                │
│  🌍 Our Mission                             │
│  🤝 Partner With Us                         │
│  💼 Careers                                 │
│  📰 Press & Media                           │
│  🎓 Travel Blog                             │
│  📄 Terms of Service                        │
│  🔒 Privacy Policy                          │
│  🍪 Cookie Settings                         │
└─────────────────────────────────────────────┘
```

---

### Country-Specific Mode (e.g., bridge55.ci)

```
┌─────────────────────────────────────────────┐
│  Bridge55 Côte d'Ivoire              [×]    │
├─────────────────────────────────────────────┤
│                                             │
│  🎯 RÉSERVER VOTRE EXPÉRIENCE               │ ← French
├─────────────────────────────────────────────┤
│  ✈️  Vols                                   │
│  🏨 Hébergements                            │
│  🚗 Voitures                                │
│  🗺️  Tours                                  │
│  🎭 Activités                               │
│  🎪 Événements                              │
│  🛂 Visa                                    │
│  📦 Forfaits vacances                       │
├─────────────────────────────────────────────┤
│  🤖 BRIDGEAI - ASSISTANT VOYAGE             │
├─────────────────────────────────────────────┤
│  ✨ Planifier mon voyage                    │
│  💡 Idées de destination                    │
│  📊 Intelligence des prix                   │
│  🧳 Itinéraires intelligents                │
├─────────────────────────────────────────────┤
│  🇨🇮 DÉCOUVRIR CÔTE D'IVOIRE                │ ← PRIMARY
├─────────────────────────────────────────────┤
│  🏖️  Plages d'Abidjan                       │
│  🏛️  Yamoussoukro - Capitale politique      │
│  🌴 Grand-Bassam - UNESCO                   │
│  🏞️  Parc National de Taï                   │
│  🎭 Culture Baoulé                          │
│  🍽️  Cuisine Ivoirienne                     │
│  🎉 Festivals de musique                    │
│  🌆 Abidjan by Night                        │
│  🎵 Coupé-Décalé & Zouglou                  │
│  🏺 Artisanat local                         │
│  ⛪ Basilique Notre-Dame                    │
│  🌊 Côte atlantique                         │
├─────────────────────────────────────────────┤
│  🌍 EXPLORER L'AFRIQUE                      │ ← SECONDARY
├─────────────────────────────────────────────┤
│  🦁 Safaris (Kenya, Tanzania)               │
│  🏖️  Îles (Maurice, Seychelles)             │
│  🏔️  Montagnes (Kilimandjaro)               │
│  🏛️  Patrimoine (Égypte, Mali)              │
│  🗺️  Par Région                             │
│     ├─ Afrique de l'Ouest                   │
│     ├─ Afrique de l'Est                     │
│     ├─ Afrique Australe                     │
│     └─ Afrique du Nord                      │
├─────────────────────────────────────────────┤
│  💼 POUR LES OPÉRATEURS                     │
├─────────────────────────────────────────────┤
│  📊 Tableau de bord                         │
│  ➕ Ajouter votre entreprise                │
│  📈 Analyses                                │
│  💰 Revenus                                 │
│  ⚙️  Gérer les annonces                     │
├─────────────────────────────────────────────┤
│  🛠️ OUTILS                                  │
├─────────────────────────────────────────────┤
│  💱 Convertisseur (XOF)                     │
│  ☁️  Météo Abidjan                          │
│  🗓️  Calendrier                             │
│  📚 Guides de voyage                        │
│  💉 Santé & Vaccinations                    │
│  🗣️  Guide linguistique                     │
├─────────────────────────────────────────────┤
│  ... (Rest similar to pan-African)         │
└─────────────────────────────────────────────┘
```

---

## 📱 Mobile Bottom Navigation

### 5-Tab Layout

```
┌─────────────────────────────────────────────┐
│  [🏠]   [🔍]   [🤖]   [📅]   [👤]          │
│  Home  Explore  AI   Trips  Account        │
└─────────────────────────────────────────────┘
```

**Tab Specifications:**

1. **Home** (🏠)
   - Main discovery feed
   - Featured destinations
   - Personalized recommendations
   - Recent searches

2. **Explore** (🔍)
   - Search interface
   - Browse by category
   - Popular destinations
   - Filters

3. **AI** (🤖)
   - BridgeAI chat interface
   - Trip planning
   - Recommendations
   - Price alerts

4. **Trips** (📅)
   - My bookings
   - Upcoming trips
   - Past trips
   - Saved itineraries

5. **Account** (👤)
   - Profile
   - Settings
   - Payment methods
   - Support

---

## 🎨 Visual Design Specifications

### Color Scheme

```css
/* Primary Colors */
--primary: #FF6B35;        /* Bridge55 Orange */
--primary-dark: #E64A19;   /* Hover state */
--primary-light: #FF8A65;  /* Light accent */

/* Secondary */
--secondary: #004E89;      /* Professional Blue */
--accent: #F7B32B;         /* Golden Yellow */

/* Neutrals */
--white: #FFFFFF;
--gray-50: #F9FAFB;
--gray-100: #F4F4F4;
--gray-200: #E5E5E5;
--gray-300: #DCDCDC;
--gray-600: #555555;
--gray-800: #1A1A1A;

/* Semantic */
--success: #00A86B;        /* Green */
--warning: #FFA500;        /* Orange */
--error: #D90000;          /* Red */
--info: #0055A4;           /* Blue */
```

### Typography

```css
/* Font Family */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             'Roboto', 'Oxygen', 'Ubuntu', sans-serif;

/* Font Sizes */
--text-xs: 12px;     /* Small labels */
--text-sm: 14px;     /* Body text, buttons */
--text-base: 16px;   /* Default */
--text-lg: 18px;     /* Headings */
--text-xl: 20px;     /* Large headings */
--text-2xl: 24px;    /* Page titles */

/* Font Weights */
--weight-normal: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
--weight-extrabold: 800;
```

### Spacing

```css
/* Spacing Scale (8px base) */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
```

### Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;
```

### Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
```

---

## 🔧 Component Specifications

### Top Navigation Height
- Desktop: 64px
- Mobile: 56px

### Side Menu Width
- Desktop: 320px
- Mobile: 85% screen width (max 320px)

### Bottom Navigation Height
- Mobile: 64px

### Icon Sizes
- Small: 16px
- Medium: 20px
- Large: 24px

### Touch Targets (Mobile)
- Minimum: 44px x 44px
- Recommended: 48px x 48px

---

## ⚡ Interaction Specifications

### Top Navigation

**Desktop:**
- Sticky on scroll
- Shadow increases on scroll
- Hover states on all interactive elements
- Dropdowns on language/currency

**Mobile:**
- Sticky on scroll
- Hamburger opens side menu
- Hide center links
- Show only essential buttons

### Side Menu

**Opening:**
- Animation: Slide in from left
- Duration: 300ms
- Easing: ease-out
- Overlay: Fade in simultaneously

**Closing:**
- Click overlay
- Click X button
- Swipe left (mobile)
- Press ESC key

**Scrolling:**
- Smooth scroll
- Sections collapsible
- Active section highlighted

### Bottom Navigation

**Tab Selection:**
- Instant switch (no animation)
- Active tab: Bold text + primary color
- Inactive tabs: Gray
- Badge on Notifications/Trips tabs

---

## 🌐 Internationalization

### Supported Languages

**Primary:**
- English (en)
- French (fr)
- Arabic (ar) - RTL support
- Portuguese (pt)
- Swahili (sw)

**Secondary:**
- Afrikaans (af)
- Amharic (am)
- Hausa (ha)
- Zulu (zu)

### RTL Support

For Arabic:
- Flip layout horizontally
- Menu slides from right
- Text alignment: right
- Icons remain in logical positions

---

## 💱 Currency Display

### Supported Currencies

**International:**
- USD, EUR, GBP

**African:**
- ZAR (South Africa)
- NGN (Nigeria)
- KES (Kenya)
- EGP (Egypt)
- MAD (Morocco)
- TZS (Tanzania)
- XOF (West Africa CFA)
- XAF (Central Africa CFA)
- GHS (Ghana)
- UGX (Uganda)
... and 40+ more

### Display Format
```
Primary: KSh 45,000
Secondary: ($500 USD)
```

---

## 🎯 Navigation States

### Loading States
- Skeleton screens
- Progressive enhancement
- Graceful degradation

### Error States
- Offline mode
- Sync failures
- API timeouts
- User-friendly messages

### Empty States
- No bookings yet
- No saved items
- No notifications
- Helpful CTAs

---

## ♿ Accessibility

### WCAG 2.1 AA Compliance

**Keyboard Navigation:**
- Tab through all interactive elements
- Enter/Space to activate
- ESC to close modals/menus
- Arrow keys in dropdowns

**Screen Readers:**
- Semantic HTML
- ARIA labels on icons
- Role attributes
- Live regions for updates

**Focus Management:**
- Visible focus indicators
- Trap focus in modals
- Return focus on close
- Skip links

**Color Contrast:**
- Minimum 4.5:1 for text
- 3:1 for large text
- 3:1 for UI components

---

## 📊 Analytics Tracking

### Navigation Events to Track

```javascript
// Track these interactions
navigationEvents = {
  'menu_opened': { source: 'hamburger' },
  'menu_closed': { method: 'overlay|button|swipe' },
  'nav_item_clicked': { item: 'flights|stays|...' },
  'language_changed': { from: 'en', to: 'fr' },
  'currency_changed': { from: 'USD', to: 'KES' },
  'search_performed': { query: '...', results: 123 },
  'bottom_nav_tab_clicked': { tab: 'home|explore|...' }
};
```

---

## 🔄 Dynamic Navigation

### Menu Configuration System

```typescript
// Menu items configured per platform mode

interface MenuConfig {
  mode: 'pan-african' | 'country-specific';
  countryCode?: string;
  language: string;
  
  sections: MenuSection[];
}

interface MenuSection {
  id: string;
  title: string;               // Translated
  icon?: string;
  items: MenuItem[];
  collapsible?: boolean;
  defaultOpen?: boolean;
  visibleFor?: UserRole[];     // Filter by user type
}

interface MenuItem {
  id: string;
  label: string;               // Translated
  icon?: string;
  href?: string;
  onClick?: () => void;
  badge?: number | string;
  children?: MenuItem[];       // Sub-menu
  visibleFor?: UserRole[];
  featured?: boolean;
}
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md - Tablet */ }
@media (min-width: 1024px) { /* lg - Desktop */ }
@media (min-width: 1280px) { /* xl - Large Desktop */ }
@media (min-width: 1536px) { /* 2xl - XL Desktop */ }
```

### Navigation Behavior by Breakpoint

**< 768px (Mobile):**
- Bottom navigation visible
- Hamburger menu
- Simplified top nav
- Full-screen side menu

**768px - 1024px (Tablet):**
- No bottom navigation
- Hamburger menu
- More top nav items
- Wider side menu

**> 1024px (Desktop):**
- Full top navigation
- Optional side menu
- All features visible
- Hover interactions

---

## 🎨 Animation Specifications

```css
/* Transitions */
--transition-fast: 150ms ease;
--transition-normal: 300ms ease;
--transition-slow: 500ms ease;

/* Side Menu Animation */
.side-menu {
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Bottom Nav Active State */
.bottom-nav-item.active {
  transition: color 150ms ease, transform 150ms ease;
  transform: translateY(-2px);
}

/* Hover States */
.nav-link:hover {
  transition: background 150ms ease, color 150ms ease;
}
```

---

## 📋 Implementation Checklist

**Phase 1: Structure**
- [ ] HTML structure for all navigation components
- [ ] Semantic markup
- [ ] Accessibility attributes
- [ ] Mobile-first responsive layout

**Phase 2: Styling**
- [ ] CSS variables
- [ ] Component styles
- [ ] Responsive breakpoints
- [ ] Animations and transitions

**Phase 3: Interactivity**
- [ ] Menu toggle functionality
- [ ] Tab switching
- [ ] Dropdown interactions
- [ ] Keyboard navigation

**Phase 4: Adaptive Logic**
- [ ] Platform mode detection
- [ ] Dynamic menu generation
- [ ] Language switching
- [ ] Currency switching

**Phase 5: Integration**
- [ ] Connect to backend APIs
- [ ] User authentication
- [ ] Notification system
- [ ] Analytics tracking

---

**Version**: 1.0.0
**Last Updated**: November 12, 2025
**Status**: Ready for Implementation
