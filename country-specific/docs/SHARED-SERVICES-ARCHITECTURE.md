# 🔗 Shared Services Architecture

> **Code Reuse Strategy Across Bridge55 SaaS Platforms**

---

## 🎯 Objective

Maximize code reuse and maintain consistency across all three Bridge55 SaaS platforms while allowing platform-specific customizations.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    SHARED LAYER (shared/)                        │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────────┐ │
│  │   Auth      │ │  Countries  │ │   Themes    │ │    Dia     │ │
│  │  Component  │ │   Config    │ │    CSS      │ │    AI      │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └────────────┘ │
└─────────────────────────────────────────────────────────────────┘
          │                │                │                │
    ┌─────┴────┐     ┌─────┴────┐     ┌─────┴────┐     ┌─────┴────┐
    ▼          ▼     ▼          ▼     ▼          ▼     ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│Bridge55│ │ AfCON  │ │Country │ │Bridge55│ │ AfCON  │ │Country │
│  Core  │ │Platform│ │Specific│ │  Core  │ │Platform│ │Specific│
└────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘
   SaaS #1    SaaS #2    SaaS #3    SaaS #1    SaaS #2    SaaS #3
```

---

## 📦 Shared Components

### 1. Authentication System (`shared/components/auth.js`)

**Status:** ✅ Extracted & Ready

| Feature | Bridge55 Core | AfCON | Country-Specific |
|---------|---------------|-------|------------------|
| User Login | ✅ | ✅ | ✅ |
| Session Management | ✅ | ✅ | ✅ |
| Role-Based Access | ✅ | ✅ (Fan, Admin) | ✅ (Visitor, Partner, Admin) |
| BridgeWallet | ✅ | ✅ | ✅ |
| Demo Users | ✅ | ✅ (modified) | ✅ (modified) |
| Social Login | ✅ | ✅ | ✅ |

**Usage:**
```javascript
// Import in any platform
import { getSession, setSession, hasRole } from '../shared/components/auth.js';

// Or use global (non-module)
<script src="../shared/components/auth.js"></script>
Bridge55Auth.loginAsDemo('user');
```

---

### 2. Country Configuration (`shared/config/countries.js`)

**Status:** ✅ Extracted & Ready

| Feature | Bridge55 Core | AfCON | Country-Specific |
|---------|---------------|-------|------------------|
| 19 Countries | ✅ | ✅ (host focus) | ✅ (single country) |
| Flag Images | ✅ | ✅ | ✅ |
| Primary Colors | ✅ | ✅ | ✅ |
| Currency | ✅ | ✅ | ✅ |
| Timezone | ✅ | ✅ | ✅ |
| Mobile Payment | ✅ | ✅ | ✅ |
| Language | ✅ | ✅ | ✅ |

**Usage:**
```javascript
import { getCountry, applyCountryTheme } from '../shared/config/countries.js';

// Get Côte d'Ivoire config
const ci = getCountry('ci');
console.log(ci.primary); // #FF8C00

// Apply theme
applyCountryTheme('ci');
```

---

### 3. Country Themes CSS (`shared/css/country-themes.css`)

**Status:** ✅ Extracted & Ready

| Feature | Bridge55 Core | AfCON | Country-Specific |
|---------|---------------|-------|------------------|
| CSS Variables | ✅ | ✅ | ✅ |
| Auto-Theme | ✅ | ✅ | ✅ (locked to country) |
| Utility Classes | ✅ | ✅ | ✅ |
| Gradient Presets | ✅ | ✅ | ✅ |

**Usage:**
```html
<link rel="stylesheet" href="../shared/css/country-themes.css">
<html data-country="ci">
```

---

### 4. Dia AI Assistant (Planned)

**Status:** 🔜 To Be Extracted

| Feature | Bridge55 Core | AfCON | Country-Specific |
|---------|---------------|-------|------------------|
| Travel Recommendations | ✅ | ✅ (tournament focus) | ✅ (destination focus) |
| Booking Assistance | ✅ | ✅ | ✅ |
| Local Tips | ✅ | ✅ (match cities) | ✅ (country-wide) |
| Language Support | ✅ | ✅ | ✅ |

---

## 🔄 Reuse Patterns

### Pattern 1: Direct Import
For components that work identically across platforms.

```javascript
// In any platform
import { getCountry } from '../../shared/config/countries.js';
```

### Pattern 2: Configuration Override
For components that need platform-specific behavior.

```javascript
import { renderLoginForm } from '../../shared/components/auth.js';

// Override platform name
const html = renderLoginForm({
    platform: 'Côte d\'Ivoire Tourism',
    showSocial: false, // Disable for government sites
    redirectUrl: '/explore.html'
});
```

### Pattern 3: Extension
For components that need additional functionality.

```javascript
import * as BaseAuth from '../../shared/components/auth.js';

// Extend for Country-Specific
export function requireTourismBoardRole() {
    return BaseAuth.requireRole(['tourism-admin', 'super-admin']);
}
```

---

## 📊 Code Reuse Matrix

### Estimated Reuse Percentages

| Component | Bridge55 → AfCON | Bridge55 → Country-Specific |
|-----------|------------------|----------------------------|
| Authentication | 95% | 90% |
| Country Branding | 100% | 100% |
| Theme CSS | 100% | 100% |
| Dia AI Core | 80% | 85% |
| Stays Integration | 70% | 75% |
| Flights Integration | 80% | 60% |
| Experiences | 60% | 80% |
| Mobility | 50% | 40% |
| Payment/Wallet | 90% | 90% |
| Header/Footer | 60% | 70% |

**Average Reuse: ~75-80%**

---

## 🚫 Platform-Specific Code

### AfCON Only
- Match schedules & live scores
- Stadium management
- Hospitality packages
- Fan hub / community
- Tournament countdowns
- Ticket sales integration

### Country-Specific Only
- Visa requirement calculator
- Embassy directory
- Cultural heritage showcases
- Government partner portal
- Tourism statistics dashboard
- Multi-region exploration

### Bridge55 Core Only
- Full booking engine
- Complete inventory management
- Operator management
- Marketing admin
- Revenue analytics

---

## 📁 Folder Structure

```
bridge55-final-fixed/
├── shared/                      # SHARED ACROSS ALL PLATFORMS
│   ├── components/
│   │   ├── auth.js              # ✅ Authentication
│   │   ├── header.html          # 🔜 Global header
│   │   ├── footer.html          # 🔜 Global footer
│   │   └── dia-widget.html      # 🔜 Dia AI widget
│   ├── config/
│   │   ├── countries.js         # ✅ Country registry
│   │   ├── api.js               # 🔜 API endpoints
│   │   └── constants.js         # 🔜 Global constants
│   ├── css/
│   │   ├── country-themes.css   # ✅ Theme variables
│   │   ├── premium-base.css     # 🔜 Base design system
│   │   └── utilities.css        # 🔜 Utility classes
│   ├── js/
│   │   ├── utils.js             # 🔜 Utility functions
│   │   └── analytics.js         # 🔜 Tracking
│   └── README.md                # ✅ Documentation
│
├── index.html                   # Bridge55 Core (SaaS #1)
├── pages/                       # Bridge55 Core pages
│
├── afcon/                       # AfCON Platform (SaaS #2)
│   └── pages/
│       └── index.html           # AfCON roadmap
│
├── country-specific/            # Tourism Board (SaaS #3)
│   └── pages/
│       └── index.html           # Country-Specific roadmap
│
└── docs/                        # Shared documentation
```

---

## 🔧 Integration Guidelines

### For New Features

1. **Check if shared:** Does this feature apply to 2+ platforms?
2. **Extract to shared:** If yes, build in `/shared/`
3. **Configure per platform:** Use configuration patterns
4. **Document:** Update this file

### For Existing Features

1. **Identify duplication:** Find code repeated across platforms
2. **Abstract commonality:** Extract shared logic
3. **Test all platforms:** Ensure nothing breaks
4. **Update imports:** Point to shared version

---

## 📝 Changelog

| Date | Component | Change |
|------|-----------|--------|
| Dec 25, 2025 | auth.js | Extracted from Bridge55 Core |
| Dec 25, 2025 | countries.js | Extracted with AfCON helpers |
| Dec 25, 2025 | country-themes.css | Extracted with 19 themes |

---

## 🎯 Next Extraction Priorities

| Priority | Component | Effort | Impact |
|----------|-----------|--------|--------|
| P0 | Dia AI Widget | Medium | High |
| P0 | Global Header | Low | High |
| P0 | Global Footer | Low | High |
| P1 | Stays API Client | Medium | Medium |
| P1 | Payment Integration | High | High |
| P2 | Analytics Tracking | Low | Medium |

---

*Document Version: 1.0*  
*Last Updated: December 25, 2025*




