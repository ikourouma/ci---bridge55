# Visit Côte d'Ivoire - Tourism Portal

> **Product**: Country-Specific Tourism Board Demo  
> **Domain**: `ivoire.bridge.co`  
> **Status**: Full Demo Ready

## Overview

This is the official tourism portal for Côte d'Ivoire, powered by Bridge55. It serves as:
- A complete demonstration of the country-specific tourism board product
- A template for other African countries to deploy their own portals
- A live demo for stakeholder presentations

## Quick Start

### Local Development

```bash
cd products/ci
npx serve .
# Open http://localhost:3000
```

### Using Live Server (VS Code)
1. Open `pages/explore.html`
2. Right-click → "Open with Live Server"

## Key Pages

| Page | Path | Description |
|------|------|-------------|
| **Explore** | `/pages/explore.html` | Main landing page |
| **Experiences** | `/pages/experiences-search.html` | Browse experiences |
| **Operators** | `/pages/operators-search.html` | Tour operator directory |
| **Itineraries** | `/pages/itineraries-search.html` | Curated multi-day tours |
| **Regions** | `/pages/regions-search.html` | Explore by region |
| **Experience Details** | `/pages/experience-details.html?id=exp-1` | Single experience |
| **Operator Profile** | `/pages/operator-details.html?id=op-exp-1` | Operator storefront |
| **Itinerary Details** | `/pages/itinerary-details.html?id=it-1` | Itinerary breakdown |

## Data Architecture

All demo data is centralized in the `/data/` directory:

```
data/
├── operators.js      # 12 tour operators
├── experiences.js    # 8 experiences
├── itineraries.js    # 6 curated itineraries
└── data-loader.js    # Abstraction layer (Supabase-ready)
```

### Accessing Data

```javascript
// Get all operators
const operators = window.OperatorsDB.getAll();

// Get operator by ID
const operator = window.OperatorsDB.getById('op-exp-1');

// Get all experiences
const experiences = window.ExperiencesDB.getAll();
```

## Configuration

### Demo Mode (Default)
- Uses local JavaScript data files
- No external dependencies
- Works offline

### Live Mode (Future)
- Connects to Supabase
- Update `data/data-loader.js`:
```javascript
const USE_SUPABASE = true;
const SUPABASE_URL = 'your-project-url';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

## Deployment

### Netlify (Current)
- Auto-deploys on push to `main`
- Config: `netlify.toml`

### Manual
```bash
# Build not required - static HTML
# Just deploy the products/ci folder
```

## Brand Guidelines

- **Primary Color**: `#FF8C00` (Côte d'Ivoire Orange)
- **Secondary Color**: `#00954A` (CI Green)
- **Font**: Jost (headings), Inter (body)

## Related Documentation

- [Platform Architecture v3.0](../../docs/PLATFORM-ARCHITECTURE-v3.md)
- [Design System](../../docs/PREMIUM-SAAS-DESIGN-SYSTEM.md)
- [Data Models](../../schemas/)

---

**Version**: 1.0  
**Last Updated**: December 27, 2025  
**Maintainer**: Bridge55 Platform Team

