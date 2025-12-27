# Bridge55 Platform Architecture v3.0
## Fortune-50 Level Modular Deployment Strategy

> **Vision**: A unified travel technology platform that powers multiple independent products, each deployable as standalone applications while sharing a common design system, data layer, and documentation infrastructure.

---

## 1. Executive Summary

The Bridge55 platform is evolving into a **multi-product architecture** with three distinct, independently deployable products:

| Product | Domain | Purpose | Status |
|---------|--------|---------|--------|
| **Bridge55 Global** | `bridge55.co` | Pan-African SaaS travel platform | Foundation |
| **Visit Côte d'Ivoire** | `ivoire.bridge.co` | Country-specific tourism board demo | Full Demo |
| **Bridge55 Sports** | `afcon.bridge55.co` | Event-based travel (AfCON 2025) | In Development |

Each product:
- Can be deployed independently
- Shares core infrastructure (design system, data layer, utilities)
- Has its own documentation, configuration, and feature set
- Follows identical UX/UI standards for brand consistency

---

## 2. Proposed Folder Structure

```
bridge55/
│
├── 📁 .github/                    # CI/CD pipelines (shared)
│   ├── workflows/
│   │   ├── deploy-global.yml      # Deploy Bridge55 Global
│   │   ├── deploy-ci.yml          # Deploy Côte d'Ivoire
│   │   ├── deploy-afcon.yml       # Deploy AfCON Hub
│   │   └── ci-pipeline.yml        # Shared quality gates
│   └── CODEOWNERS
│
├── 📁 docs/                       # SHARED documentation
│   ├── ROADMAP.md                 # Consolidated product roadmap
│   ├── DESIGN-SYSTEM.md           # Premium SaaS design system
│   ├── API-REFERENCE.md           # Shared API contracts
│   ├── DATA-MODELS.md             # Canonical entity schemas
│   ├── DEPLOYMENT.md              # Deployment procedures
│   └── CONTRIBUTING.md            # Contribution guidelines
│
├── 📁 shared/                     # SHARED code & assets
│   ├── 📁 components/             # Reusable UI components
│   │   ├── header/
│   │   ├── footer/
│   │   ├── breadcrumb/
│   │   ├── cards/
│   │   ├── modals/
│   │   └── forms/
│   ├── 📁 css/                    # Shared stylesheets
│   │   ├── design-tokens.css      # CSS variables (colors, spacing)
│   │   ├── typography.css         # Font system
│   │   ├── layouts.css            # Grid, flexbox patterns
│   │   └── animations.css         # Shared transitions
│   ├── 📁 js/                     # Shared utilities
│   │   ├── page-shell.js          # Global layout manager
│   │   ├── routing.js             # URL/navigation helpers
│   │   ├── smart-image.js         # Image fallback system
│   │   ├── date-utils.js          # Date handling
│   │   └── analytics.js           # Tracking (future)
│   ├── 📁 data/                   # Shared data contracts
│   │   ├── schemas/               # JSON schemas for validation
│   │   └── demo-mode.js           # Demo vs Live mode config
│   └── 📁 assets/                 # Shared images, icons
│       ├── icons/
│       ├── logos/
│       └── placeholders/
│
├── 📁 products/                   # PRODUCT-SPECIFIC code
│   │
│   ├── 📁 global/                 # Bridge55 Global SaaS
│   │   ├── 📁 pages/              # Main platform pages
│   │   │   ├── index.html         # Landing/search hub
│   │   │   ├── destinations.html
│   │   │   ├── about.html
│   │   │   └── ...
│   │   ├── 📁 flights/
│   │   ├── 📁 stays/
│   │   ├── 📁 cars/
│   │   ├── 📁 experiences/
│   │   ├── 📁 transfers/
│   │   ├── 📁 insurance/
│   │   ├── 📁 user/
│   │   ├── 📁 admin/
│   │   ├── 📁 css/                # Global-specific styles
│   │   ├── 📁 js/                 # Global-specific scripts
│   │   ├── 📁 data/               # Global demo data
│   │   ├── netlify.toml           # Deployment config
│   │   ├── package.json           # Dependencies
│   │   └── README.md              # Product-specific docs
│   │
│   ├── 📁 ci/                     # Visit Côte d'Ivoire (Country Demo)
│   │   ├── 📁 pages/
│   │   │   ├── explore.html       # Main explore page
│   │   │   ├── experience-details.html
│   │   │   ├── operator-details.html
│   │   │   ├── itinerary-details.html
│   │   │   ├── region-details.html
│   │   │   ├── *-search.html      # Search pages
│   │   │   └── index.html         # Landing
│   │   ├── 📁 components/         # CI-specific components
│   │   │   ├── header/mega-menu.html
│   │   │   └── footer/global-footer-ci.html
│   │   ├── 📁 css/
│   │   │   ├── country-theme.css  # CI brand colors
│   │   │   └── global-layout.css  # CI layout overrides
│   │   ├── 📁 data/               # CI demo data (Supabase-ready)
│   │   │   ├── operators.js
│   │   │   ├── experiences.js
│   │   │   ├── itineraries.js
│   │   │   ├── regions.js
│   │   │   └── data-loader.js     # Abstraction for API/demo
│   │   ├── 📁 utils/
│   │   ├── netlify.toml
│   │   ├── package.json
│   │   └── README.md              # CI-specific docs
│   │
│   └── 📁 afcon/                  # AfCON 2025 Hub
│       ├── 📁 pages/
│       │   ├── index.html         # AfCON landing
│       │   ├── matches/
│       │   ├── stadiums/
│       │   ├── tickets/
│       │   ├── hospitality/
│       │   ├── travel/
│       │   └── community/
│       ├── 📁 components/         # AfCON-specific components
│       ├── 📁 css/                # AfCON theme (green/yellow)
│       ├── 📁 data/               # Match schedules, venues
│       ├── 📁 admin/              # Event management
│       ├── netlify.toml
│       ├── package.json
│       └── README.md              # AfCON-specific docs
│
├── 📁 schemas/                    # JSON Schema definitions (CI/CD validation)
│   ├── operator.schema.json
│   ├── experience.schema.json
│   ├── itinerary.schema.json
│   ├── region.schema.json
│   ├── interest.schema.json
│   └── company.schema.json
│
├── 📁 ci/                         # CI/CD scripts (quality gates)
│   ├── audit-demo.js
│   ├── audit-navigation.js
│   ├── audit-ui-contracts.js
│   └── pipeline.js
│
├── 📁 supabase/                   # Supabase configuration (future)
│   ├── migrations/
│   ├── seed/
│   └── functions/
│
├── .gitignore
├── package.json                   # Root workspace config
├── README.md                      # Platform overview
└── ROADMAP.md                     # Consolidated roadmap
```

---

## 3. Deployment Strategy

### 3.1 Independent Deployments

Each product has its own `netlify.toml` and can be deployed independently:

| Product | Netlify Site | GitHub Trigger | Domain |
|---------|--------------|----------------|--------|
| Global | `bridge55-global` | `products/global/**` | `bridge55.co` |
| CI Demo | `ivoirebridge55` | `products/ci/**` | `ivoire.bridge.co` |
| AfCON | `afcon-bridge55` | `products/afcon/**` | `afcon.bridge55.co` |

### 3.2 Shared Asset CDN

Shared assets are deployed to a CDN and referenced by all products:

```html
<!-- In each product's HTML -->
<link rel="stylesheet" href="https://cdn.bridge55.co/shared/css/design-tokens.css">
<script src="https://cdn.bridge55.co/shared/js/page-shell.js"></script>
```

For demo/development, relative paths work:
```html
<link rel="stylesheet" href="../../shared/css/design-tokens.css">
```

### 3.3 Environment Configuration

Each product has environment-specific config:

```javascript
// products/ci/js/config.js
export const CONFIG = {
    mode: 'demo', // 'demo' | 'live'
    supabase: {
        url: process.env.SUPABASE_URL || null,
        key: process.env.SUPABASE_ANON_KEY || null
    },
    api: {
        base: 'https://api.bridge55.co/v1',
        country: 'ci'
    }
};
```

---

## 4. Documentation Strategy

### 4.1 Shared Documentation (`/docs/`)

| Document | Purpose | Audience |
|----------|---------|----------|
| `ROADMAP.md` | Consolidated product roadmap | All stakeholders |
| `DESIGN-SYSTEM.md` | UI/UX standards, components | Developers, Designers |
| `API-REFERENCE.md` | Shared API contracts | Developers |
| `DATA-MODELS.md` | Entity schemas, relationships | Developers, DBAs |
| `DEPLOYMENT.md` | Deployment procedures | DevOps |
| `CONTRIBUTING.md` | How to contribute | All developers |

### 4.2 Product-Specific Documentation

Each product has its own `README.md`:

```markdown
# Visit Côte d'Ivoire - Tourism Portal

## Quick Start
1. `cd products/ci`
2. `npx serve .` or use Live Server
3. Open `http://localhost:5000`

## Configuration
- Demo Mode: Uses local data files
- Live Mode: Connects to Supabase

## Key Pages
- `/pages/explore.html` - Main explore page
- `/pages/operator-details.html?id=xxx` - Operator profiles
...
```

### 4.3 Documentation Deployment

- **Shared docs**: Published to `docs.bridge55.co`
- **Product docs**: Published as part of each product site
- **API docs**: Auto-generated from schemas at `api.bridge55.co/docs`

---

## 5. Data Layer Architecture

### 5.1 Centralized Data Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐   │
│   │  Demo Mode  │     │ Supabase    │     │ Future API  │   │
│   │  (Local JS) │     │ (PostgreSQL)│     │ (REST/GQL)  │   │
│   └──────┬──────┘     └──────┬──────┘     └──────┬──────┘   │
│          │                   │                   │           │
│          └───────────────────┼───────────────────┘           │
│                              │                               │
│                    ┌─────────▼─────────┐                     │
│                    │   DataLoader.js   │                     │
│                    │   (Abstraction)   │                     │
│                    └─────────┬─────────┘                     │
│                              │                               │
├──────────────────────────────┼──────────────────────────────┤
│                              │                               │
│   ┌──────────────────────────▼──────────────────────────┐   │
│   │              Application Layer                        │   │
│   │   - window.OperatorsDB.getById('op-1')               │   │
│   │   - window.ExperiencesDB.getAll()                    │   │
│   │   - window.ItinerariesDB.search({ region: 'man' })   │   │
│   └──────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Schema Validation

Every entity is validated against JSON Schema before rendering:

```json
// schemas/operator.schema.json
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "required": ["id", "name", "type", "rating"],
    "properties": {
        "id": { "type": "string", "pattern": "^(co|op)-" },
        "name": { "type": "string", "minLength": 2 },
        "type": { "enum": ["company", "individual"] },
        "rating": { "type": "number", "minimum": 0, "maximum": 5 }
    }
}
```

---

## 6. Migration Plan

### Phase 1: Foundation (Current → Week 1)
- [x] Centralized data files created
- [x] operators-search.html using centralized data
- [x] explore.html using centralized data
- [ ] Create shared/ directory structure
- [ ] Move common CSS to shared/css/
- [ ] Move common JS to shared/js/

### Phase 2: Restructure (Week 2)
- [ ] Create products/ directory
- [ ] Move current code to products/ci/
- [ ] Extract Bridge55 Global to products/global/
- [ ] Extract AfCON to products/afcon/
- [ ] Update all import paths

### Phase 3: Independent Deployment (Week 3)
- [ ] Configure Netlify for each product
- [ ] Set up domain routing
- [ ] Implement shared asset CDN
- [ ] Create product-specific CI/CD workflows

### Phase 4: Supabase Integration (Week 4+)
- [ ] Create Supabase tables from schemas
- [ ] Update DataLoader.js to use Supabase
- [ ] Migrate demo data to Supabase
- [ ] Test live data flow

---

## 7. Quality Gates

### 7.1 Pre-Commit Checks
- ESLint (JavaScript)
- Prettier (formatting)
- HTML validation
- Schema validation

### 7.2 CI Pipeline
- Build all products
- Run unit tests
- Validate JSON schemas
- Audit navigation integrity
- Audit demo completeness
- Lighthouse scores (performance, accessibility)

### 7.3 Pre-Deployment
- Visual regression tests
- Cross-browser testing
- Mobile responsiveness check
- Security headers validation

---

## 8. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Lighthouse Performance | > 90 | CI pipeline |
| Lighthouse Accessibility | > 95 | CI pipeline |
| Zero broken links | 100% | Navigation audit |
| Schema compliance | 100% | Schema validation |
| Code coverage | > 80% | Unit tests |
| Deployment time | < 2 min | Netlify logs |

---

## 9. Next Steps

1. **Approve this architecture** - Review and finalize structure
2. **Create migration script** - Automated file reorganization
3. **Update imports** - Fix all path references
4. **Configure deployments** - Set up independent Netlify sites
5. **Document thoroughly** - Complete all README files

---

**Document Version**: 3.0  
**Last Updated**: December 27, 2025  
**Author**: Bridge55 Platform Team  
**Status**: Draft - Pending Approval

