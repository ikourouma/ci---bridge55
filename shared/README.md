# Bridge55 Shared Components

> **Reusable components across all Bridge55 SaaS platforms**

This folder contains shared code that is used by:
1. **Bridge55 Core** - Main travel platform
2. **Country-Specific** - Tourism board white-label solutions (SaaS #3)
3. **AfCON** - Sports & tournament platform (SaaS #2)

---

## 🎯 Philosophy

**Write once, use everywhere.** All three platforms share:
- Authentication & sessions
- Country branding system
- Global header & footer
- Payment integration (BridgeWallet)
- API connections
- Design system (PREMIUM-SAAS-DESIGN-SYSTEM.md)

---

## 📁 Structure

```
shared/
├── components/               # Reusable UI components
│   ├── global-header.html   # ✅ Full header with nav, country selector, Dia
│   ├── global-footer.html   # ✅ Footer with links, social, newsletter
│   └── auth.js              # ✅ Authentication logic & session management
├── css/                      # Shared stylesheets
│   └── country-themes.css   # ✅ 19 country themes with CSS variables
├── config/                   # Configuration files
│   └── countries.js         # ✅ Country registry & helpers
└── README.md                 # This file
```

---

## 🔧 Shared Components

### Global Header (`components/global-header.html`)

Full-featured header including:
- 🍔 Hamburger menu with fly-out navigation
- 🌍 Country selector (19 countries)
- 🤖 "Ask Dia" AI button with voice support
- 🌤️ Weather widget
- 🕐 Local time display
- 🌐 Language & currency selectors
- ♿ Accessibility toolbar
- 📱 Mobile bottom navigation

**Usage:**
```html
<!-- Load via fetch -->
<div id="global-header"></div>
<script>
    fetch('../shared/components/global-header.html')
        .then(r => r.text())
        .then(html => document.getElementById('global-header').innerHTML = html);
</script>
```

### Global Footer (`components/global-footer.html`)

Consistent footer with:
- 🔗 Quick links (About, Help, Contact)
- 📱 Social media links
- 📧 Newsletter signup
- 🏛️ Legal links (Terms, Privacy)
- 🌍 Country-aware branding

**Usage:**
```html
<div id="global-footer"></div>
<script>
    fetch('../shared/components/global-footer.html')
        .then(r => r.text())
        .then(html => document.getElementById('global-footer').innerHTML = html);
</script>
```

### Authentication (`components/auth.js`)

Complete auth system:
- 🔐 Session management (getSession, setSession, clearSession)
- 👥 Role-based access (hasRole, hasAnyRole, requireAuth)
- 💰 BridgeWallet integration (getWallet, updateWallet)
- 👤 Demo user profiles

**Usage:**
```javascript
import { getSession, requireAuth, hasRole } from '../shared/components/auth.js';

// Check if user is logged in
const session = getSession();
if (session) {
    console.log('Welcome', session.name);
}

// Require auth (redirects if not logged in)
requireAuth();

// Check roles
if (hasRole('admin')) {
    showAdminPanel();
}
```

---

## 🎨 Country Theming

### CSS Usage

```html
<!-- In your HTML file -->
<link rel="stylesheet" href="../shared/css/country-themes.css">

<!-- Set country on document -->
<html data-country="ke">
```

### JavaScript Usage

```javascript
import { 
    getCountry, 
    applyCountryTheme, 
    initCountryTheme 
} from '../shared/config/countries.js';

// Get country config
const kenya = getCountry('ke');
console.log(kenya.primary); // #BB0000

// Apply theme
applyCountryTheme('ng');

// Initialize on page load
initCountryTheme();
```

---

## 🏆 AfCON-Specific

```javascript
import { getAfconHost, afconHosts } from '../shared/config/countries.js';

// Get current tournament host
const host = getAfconHost('2025'); // Returns Morocco config
```

---

## 🔄 How to Use in Platforms

### Bridge55 Core
```html
<link rel="stylesheet" href="shared/css/country-themes.css">
<script type="module" src="shared/config/countries.js"></script>
```

### AfCON Platform
```html
<link rel="stylesheet" href="../../shared/css/country-themes.css">
<script type="module" src="../../shared/config/countries.js"></script>
```

### Country-Specific (White-Label)
```html
<link rel="stylesheet" href="../shared/css/country-themes.css">
<script type="module" src="../shared/config/countries.js"></script>
```

---

## ✅ Available Countries

| Code | Country | Region | Primary Color |
|------|---------|--------|---------------|
| `pan-african` | Pan-African (Default) | All | `#FF6B35` |
| `ma` | Morocco | North | `#C1272D` |
| `eg` | Egypt | North | `#C8102E` |
| `dz` | Algeria | North | `#006233` |
| `tn` | Tunisia | North | `#E70013` |
| `ng` | Nigeria | West | `#008751` |
| `gh` | Ghana | West | `#EF3340` |
| `ci` | Côte d'Ivoire | West | `#FF8C00` |
| `sn` | Senegal | West | `#00853F` |
| `cm` | Cameroon | West | `#007A3D` |
| `ke` | Kenya | East | `#BB0000` |
| `tz` | Tanzania | East | `#1EB53A` |
| `ug` | Uganda | East | `#D4B800` |
| `rw` | Rwanda | East | `#00A1DE` |
| `et` | Ethiopia | East | `#078930` |
| `za` | South Africa | South | `#007749` |
| `zm` | Zambia | South | `#198754` |
| `zw` | Zimbabwe | South | `#006400` |
| `bw` | Botswana | South | `#00AEEF` |

---

## 🚀 Adding New Countries

1. Add to `config/countries.js` registry
2. Add CSS theme to `css/country-themes.css`
3. Update `docs/PREMIUM-SAAS-DESIGN-SYSTEM.md`

---

## 📝 Changelog

| Date | Version | Changes |
|------|---------|---------|
| Dec 25, 2025 | 1.0.0 | Initial extraction from Bridge55 Core |

---

*Maintained by the Bridge55 Engineering Team*


