# 🌍 Bridge55 OEM Standalone Country Demo Plan (Pilot: Côte d’Ivoire + Ghana)

**Status**: 📋 Planned (Critical)  
**Audience**: Bridge55 leadership, tourism board stakeholders, engineering  
**Goal**: Deliver **two standalone, country‑locked demos** (CI + GH) using the same Fortune‑100 UI patterns as Bridge55, but deployed on **separate domains** and **not linked** to pan‑African browsing.

---

## 1) What “Standalone OEM” Means (Non‑Negotiable)

### **Tenant by Domain**
- Each tourism board gets its **own URL/domain** (example: `ivoire.bridge55`, `ghana.bridge55`, `senegal.bridge55`).
- The tenant’s domain defines:
  - **Brand** (logo, primary colors, fonts, hero imagery)
  - **Default country context** (CI / GH)
  - **Country lock** (users can’t switch to other countries inside the tenant)

### **AfCON Hub by Domain**
- AfCON gets its own hub domain: `afcon.bridge55`
- The AfCON hub uses **Pan‑African platform patterns** (the main Bridge55 view), but applies a **host-country spotlight** for the current tournament.

### **Country‑locked browsing**
- All discovery and inventory surfaced to end users is:
  - **Only what’s relevant to the country** (cities/regions/experiences/operators)
  - Optional: “International inbound to {Country}” routing for flights (still country‑anchored)

### **Same platform patterns**
- Same design standards as Bridge55 core:
  - Global header/footer quality
  - Breadcrumb standard (title + country badge)
  - Compact hero (Booking.com style density)
  - Consistent discovery grids + filters + “Explore more →”

---

## 2) Pilot Scope: CI + GH (What we deliver first)

### Expand pilot: Senegal (SN) — AfCON host + repeatable event standard
- Senegal is added as a **priority pilot** because the next AfCON will take place there.
- This pilot is the foundation for a reusable **AfCON Event Template** that can be replicated for future host countries.

### **MVP Demo (fastest credible demo)**
- **Home / Landing** (tenant branded)
- **Explore** (country‑locked) — `Explore Côte d’Ivoire` / `Explore Ghana`
- **Destinations** (country‑locked directory layer)
- **Search Hub** (country‑locked routing + relevant services)
- **1 complete booking flow** (choose 1 service to make fully demo‑ready)
  - Recommended: **Experiences** or **Stays** (fastest to “feel real”)

#### AfCON Event Template (minimum additional capabilities for Senegal)
**Recommended placement: BOTH (hub + embedded).**

1) **AfCON hub** (`afcon.bridge55`)
- AfCON-branded event hub (the canonical “official” destination)
- Pan‑African look/feel with host-country spotlight

2) **Embedded inside host country tenant** (`senegal.bridge55`)
- Same AfCON hub content, styled to fit the host-country tenant
- Optimized for tourism conversion (stays, things to do, transfers, operator listings)

**Template capabilities (shared):**
- **Event hub page**
  - Key dates, venues, host city highlights, travel guidance
  - Sponsor/partner placements (controlled by Marketing/Admin)
- **Event-specific discovery**
  - “Where to stay near venues”
  - “Things to do between matches”
  - “Transport & airport transfers”
- **Crisis / announcement banner controls**
  - Visa/entry updates, safety alerts, match-day advisories
  - Country + time-window targeting (for event period)

### **Tier‑2 Demo (adds enterprise credibility)**
- Tourism board portal (country‑locked):
  - Basic dashboard
  - Tier gating placeholder for BridgeData/BridgeInsights
- Brand asset overrides (admin-managed):
  - Hero images
  - Featured destinations
  - “Popular things to do” cards
  - Crisis banner (optional)

---

## 3) Data Rules (to keep it coherent)

### **Country relevance filter**
All listings/content must be filterable by:
- `country_code` (required)
- Optional: `region` / `city` / `category`

### **No cross‑country leakage**
Tenant must not show:
- Other countries in “Top destinations”
- Pan‑African region browsing (unless explicitly allowed by the tourism board)
- Pan‑African marketing placements (unless contracted)

---

## 4) Technical Approach (works with current static HTML architecture)

### **Tenant Config**
Create a tenant configuration per country:
- `tenantId`
- `lockedCountryCode` (CI / GH)
- `brand` (name, logo asset, colors, fonts)
- `defaultLanguage` (CI likely FR; GH likely EN)
- `defaultCurrency` (CI XOF; GH GHS)
- `enabledModules` (flights/stays/experiences/etc.)

### **Build / Packaging**
Generate standalone builds into:
- `dist/tenants/ci/`
- `dist/tenants/gh/`

Each build:
- Forces `<html data-country>` to locked country
- Hides/disables country switch UI
- Filters datasets and navigation links to country-only pages/routes

### **Shared core + overrides**
- Reuse the same HTML pages and components
- Apply tenant overrides via:
  - `tenant.config.json` loaded early
  - CSS variable overrides
  - Asset slots (hero images, OG images, icons)

---

## 5) Timeline (Pilot)

### **Sprint 0 (0.5–1 day): Tenant contract + skeleton**
- Lock tenant-by-domain rule
- Define config schema (CI/GH)
- Define “country lock” behavior

### **Sprint 1 (2–4 days): CI demo**
- CI theme + locked country
- Explore + Destinations + Search Hub country-only
- Compact hero updates on key pages
- Footer + breadcrumb fully consistent

### **Sprint 2 (2–4 days): GH demo**
- Same as CI, GH assets + country lock

### **Sprint 3 (2–5 days): Senegal (SN) AfCON demo**
- SN theme + locked country
- Add AfCON Event Template pages/sections (event hub + event discovery + comms banner)
- Ensure the pattern is reusable for the next AfCON host countries

### **Sprint 4 (optional 3–7 days): Tourism board portal + tier gating**
- Basic insights dashboard
- Tier gating stubs (basic / country / Africa-wide)
- Asset manager MVP for hero + featured cards + crisis banner

---

## 6) Open Decisions (need stakeholder alignment)
- **Domains**: exact domain names (or subdomains) for CI + GH demos
- **Language**: CI likely French-first; confirm bilingual?
- **Payments**: demo-only vs country-specific payment methods
- **Content policy**: allow “neighbor destinations” or strictly country-only?

---

## 7) Acceptance Criteria (what “demo-ready” means)
- Tenant is clearly branded (logo, colors, imagery)
- Country is locked everywhere (header, breadcrumb badge, footer)
- Users cannot browse outside the country
- One booking flow works end-to-end visually (search → details → payment → confirmation)
- Performance + UX feels Fortune‑100 (no oversized heroes, consistent spacing)

---

## 8) AfCON Operator Approval Policy (Demo Modes)

AfCON has not finalized whether approvals should apply to **all modules** or only **event-critical modules**.  
To keep demos unblocked, we support **both modes** as a configuration switch (not hardcoded).

### Mode A — **All Modules Require AfCON Approval** (strict)
Applies approval gate to:
- Flights
- Stays
- Experiences / Things to do
- Transfers / mobility
- Visa / travel documents (if applicable)
- Insurance (if applicable)

**Why it’s good**: strongest “official AfCON platform” story + consistent quality assurance.

### Mode B — **Event-Critical Modules Only** (pragmatic)
Applies approval gate to:
- Stays (near venues)
- Transfers / mobility (match-day transport)
- Experiences / Things to do (between matches)

**Why it’s good**: easier operator onboarding and faster time-to-market while still protecting the event experience.

### Demo Switch (recommended UX)
- A simple “Policy” toggle in the AfCON admin view:
  - `All Modules` vs `Event-Critical Only`
- For early demos (no backend), this can be represented as:
  - a visible “Mode” badge and filtered sample inventory

---

## 9) AfCON Event Publishing (Admin Workflow)

To avoid blocking on external APIs, AfCON’s programming/content team should have delegated admin access to publish event data.

### Manual-first approach (recommended)
- Create tournament season (host country, start/end dates)
- Create stadiums + host cities
- Create matches (teams, kickoff time, venue, stage/group, ticket link)

### Inputs we can start from
- Official schedule PDFs can be used as a source for manual entry during the pilot:
  - Example (2025): [`Match Schedule PDF`](https://www.cafonline.com/media/epqkudrg/match-schedule_totalenergies-caf-africa-cup-of-nations_morocco25.pdf)

### Upgrade path (optional)
- If AfCON later provides an API/feed (CSV/JSON), BridgeEvents can ingest and reconcile updates.
- Manual publishing remains as a fallback and for urgent edits.

### Partnership collateral
- The concise partnership pitch is documented here:
  - `documents/AFCON_PARTNERSHIP_ONE_PAGER.md`
- AfCON governance / permissions (1-page RBAC):
  - `documents/AFCON_ADMIN_PERMISSIONS.md`



