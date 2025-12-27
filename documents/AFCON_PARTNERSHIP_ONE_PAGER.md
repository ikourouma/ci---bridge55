# 🤝 Bridge55 × AfCON Partnership One‑Pager (Event Hub + Booking Platform)

**Version:** 1.0 (Draft)  
**Purpose:** Position Bridge55 as the **official event publishing + travel booking partner** for AfCON host countries, with a repeatable template for every tournament.

---

## 1) Executive Summary

Bridge55 proposes a dual-surface AfCON experience:
- **AfCON Hub (canonical):** `afcon.bridge55` — pan‑African look/feel with **host‑country spotlight**
- **Host‑Country Embedded Hub (conversion):** `{host}.bridge55/afcon` — same AfCON template, optimized to convert into **stays, transfers, flights, experiences, visa/insurance** for the host country.

This creates a repeatable standard so Bridge55 becomes the platform used for AfCON events **across Africa**, while host countries gain a measurable tourism funnel.

---

## 2) What AfCON Gets (Immediate Value)

- **Official event publishing platform** (fixtures, venues, host cities, content, announcements)
- **Operator approval program** (AfCON‑approved suppliers across modules; policy configurable)
- **Monetization-ready partner surfaces** (sponsor placements, “host country partner” spotlight pages)
- **Analytics & attribution**: measurable tourism impact (city nights, conversion, origin markets, spend)

---

## 3) What Host Countries Get (Tourism Conversion)

- “Match week itinerary” flows (venue → city → book stays/transfers/things-to-do)
- Host city guides & tourism content under official event context
- Real-time announcement banners (visa/entry updates, match-day advisories)
- A reusable template to scale for future events and national campaigns

---

## 4) Tickets + BridgeWallet (recommended integration)

Bridge55 supports ticketing as an **official-payment-partner integration**:
- Ticket checkout uses the AfCON ticket partner payment rails
- Bridge55 users can pay using **BridgeWallet**:
  - Top-up → ticket payment → ledger record → receipts inside wallet

This reduces friction, increases repeat usage, and makes “travel + tickets” a unified commerce journey.

---

## 5) Event Data: How we load the tournament schedule (manual first, API later)

### Source (example)
AfCON publishes a match schedule PDF (2025 example):  
[`match-schedule_totalenergies-caf-africa-cup-of-nations_morocco25.pdf`](https://www.cafonline.com/media/epqkudrg/match-schedule_totalenergies-caf-africa-cup-of-nations_morocco25.pdf)

### Phase 1 (fastest): manual event creation (AfCON event admins)
AfCON’s programming team gets a delegated admin permission set (recommended: `comms_admin` with **Event Publishing** permissions).

They can create:
- tournament season metadata (start/end dates, host country)
- stadiums + cities
- matches (teams, date/time, venue, group/stage)

### Phase 2 (preferred): partner feed or API ingestion
If AfCON later provides an API or structured feed (CSV/JSON), BridgeEvents can ingest and reconcile updates (kickoff time changes, venue changes, etc.).

**Key principle:** do not block on APIs. Manual publishing is enough to demo and launch.

---

## 6) AfCON Operator Approval (two supported modes)

Until AfCON finalizes policy, Bridge55 supports both:

- **Mode A (Strict):** AfCON approval required across **all modules**
- **Mode B (Pragmatic):** AfCON approval required for **event-critical modules only**
  - stays, transfers/mobility, experiences

Both modes are demoable as a configuration switch.

---

## 7) Deliverables (what we ship)

### AfCON Hub (`afcon.bridge55`)
- Tournament homepage + schedule/results UX (BridgeEvents)
- Stadiums + host cities pages
- News/video aggregation blocks
- “Book your trip” bundles per match/city
- Sponsor placement slots + analytics

### Official Hospitality (partner integration)
Bridge55 can integrate “Official Hospitality” as a first-class, bookable module (packages, lounges, suites), based on AfCON’s hospitality partner program experience:
- Hospitality reference site: [`hospitality.cafonline.com`](https://hospitality.cafonline.com/)
- Bridge55 value add:
  - hospitality packages appear in match/city/venue pages as “premium experiences”
  - bundle options (ticket + hospitality + transfers + stays)
  - approvals and entitlements aligned to AfCON partner governance
  - measurable attribution for partners (conversion, spend, city impact)

### Host‑Country Embedded Hub (`{host}.bridge55/afcon`)
- Same AfCON template, localized to host country
- Conversion modules (stays/transfers/things-to-do) tied to venues/cities
- Country-locked browsing

### Admin tools
- AfCON event publishing admin (manual first; API later)
- Sponsor placement manager (Marketing/Admin)
- Announcement/Crisis banner manager (time-window + country targeting)

### Governance / RBAC (1-page)
- `documents/AFCON_ADMIN_PERMISSIONS.md`

---

## 8) Why Bridge55 is better than a content-only event site

AfCON’s current public experience is strong on content/navigation, but Bridge55 adds the missing **commerce + itinerary + measurable partner value** layer:
- Fixtures become actionable travel plans
- Official partners get attribution and measurable ROI
- Host country tourism is promoted through direct booking flows

Reference inspiration: AfCON hub structure and host-city/stadium content blocks  
[`cafonline.com/afcon2025`](https://www.cafonline.com/afcon2025/) and schedule/results section  
[`cafonline.com/afcon2025/schedule-results`](https://www.cafonline.com/afcon2025/schedule-results/)

---

## 9) Execution Timeline (demo-first)

- **Week 1:** AfCON template skeleton + event publishing admin (manual input)
- **Week 2:** Senegal pilot + embedded host-country hub + operator approval mode toggle
- **Week 3:** Ticket partner integration stub + BridgeWallet payment UX
- **Week 4+:** Analytics dashboards, sponsor slots, automation, data ingestion improvements


