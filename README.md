# 🌍 Bridge55 - Pan-African Travel Technology Platform

> **The ultimate travel companion for exploring Africa.**  
> Flights, Hotels, Experiences, and More - All in One Platform.

[![Netlify Status](https://api.netlify.com/api/v1/badges/xxxxx/deploy-status)](https://app.netlify.com/sites/ivoirebridge55/deploys)

---

## 🏗️ Platform Architecture

Bridge55 is a modular multi-product platform with three independently deployable products:

```
bridge55/
├── 📁 products/
│   ├── 📁 global/          → bridge55.co (Core SaaS Platform)
│   ├── 📁 ci/              → ivoire.bridge.co (Côte d'Ivoire Demo)
│   └── 📁 afcon/           → afcon.bridge55.co (AfCON 2025 Hub)
├── 📁 shared/              → Shared components, CSS, JS
├── 📁 docs/                → Documentation
├── 📁 schemas/             → JSON validation schemas
└── 📁 supabase/            → Database (future)
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (for React components)
- Any static file server (npx serve, Live Server, etc.)

### Run Côte d'Ivoire Demo

```bash
# Option 1: From root
npx serve .
# Open: http://localhost:3000/country-specific/pages/explore.html

# Option 2: From products/ci
cd products/ci
npx serve .
# Open: http://localhost:3000/pages/explore.html
```

### Run Bridge55 Global

```bash
cd products/global
npx serve .
# Open: http://localhost:3000
```

---

## 📦 Products

| Product | Domain | Description | Status |
|---------|--------|-------------|--------|
| **Bridge55 Global** | `bridge55.co` | Core travel platform (flights, hotels, cars) | 🟡 Active |
| **Visit Côte d'Ivoire** | `ivoire.bridge.co` | Country-specific tourism portal | ✅ Demo Ready |
| **AfCON Hub** | `afcon.bridge55.co` | Africa Cup of Nations 2025 travel | 🟠 In Progress |

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla + React) |
| **Styling** | Tailwind CSS, Custom Design System |
| **Database** | Supabase (PostgreSQL) - *in progress* |
| **Hosting** | Netlify (auto-deploy from GitHub) |
| **CI/CD** | GitHub Actions |
| **Version Control** | Git + GitHub |

---

## 📁 Key Directories

| Directory | Purpose |
|-----------|---------|
| `products/` | Product-specific code (deployable independently) |
| `shared/` | Reusable components, CSS, JS |
| `docs/` | Architecture, design system, API docs |
| `schemas/` | JSON schemas for data validation |
| `prd/` | Product requirement documents |
| `wireframes/` | Design wireframes |

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [ROADMAP.md](ROADMAP.md) | Consolidated product roadmap |
| [Platform Architecture v3.0](docs/PLATFORM-ARCHITECTURE-v3.md) | Technical architecture |
| [Design System](docs/PREMIUM-SAAS-DESIGN-SYSTEM.md) | UI/UX standards |
| [CI Product README](products/ci/README.md) | Côte d'Ivoire demo guide |
| [Global Product README](products/global/README.md) | Global platform guide |
| [AfCON Product README](products/afcon/README.md) | AfCON hub guide |

---

## 🔗 Live Links

| Environment | URL |
|-------------|-----|
| **CI Demo (Netlify)** | [ivoirebridge55.netlify.app](https://ivoirebridge55.netlify.app) |
| **CI Demo (Custom Domain)** | [ivoire.bridge.co](https://ivoire.bridge.co) *(pending DNS)* |
| **GitHub Repository** | [github.com/ikourouma/ci---bridge55](https://github.com/ikourouma/ci---bridge55) |

---

## 🧪 Development

### Install Dependencies

```bash
npm install
```

### Start React Dev Server (for React components)

```bash
npm run dev
# Opens at http://localhost:5173
```

### Run Linting

```bash
npm run lint
```

### Build for Production

```bash
npm run build
```

---

## 📊 Data Architecture

All demo data is centralized and Supabase-ready:

```javascript
// Access operators
const operators = window.OperatorsDB.getAll();
const operator = window.OperatorsDB.getById('op-exp-1');

// Access experiences
const experiences = window.ExperiencesDB.getAll();

// Access itineraries
const itineraries = window.ItinerariesDB.getAll();
```

Data files:
- `products/ci/data/operators.js` - 12 tour operators
- `products/ci/data/experiences.js` - 8 experiences
- `products/ci/data/itineraries.js` - 6 curated itineraries
- `products/ci/data/data-loader.js` - Supabase abstraction

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes and commit: `git commit -m "Add my feature"`
3. Push to branch: `git push origin feature/my-feature`
4. Open a Pull Request

---

## 📄 License

Proprietary - All Rights Reserved  
© 2025 Bridge55 / Afronovation

---

## 👥 Team

- **Platform**: Bridge55 Engineering Team
- **Design**: Afronovation Design Studio
- **Product**: Bridge55 Product Team

---

**Made with ❤️ for Africa**
