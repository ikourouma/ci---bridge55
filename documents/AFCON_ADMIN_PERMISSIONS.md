# AfCON Admin Permissions (1‑page RBAC)

**Purpose:** Define who at AfCON and Bridge55 can publish tournament data, control approvals, manage partners, and handle finance—without depending on APIs.

---

## Roles (recommended)

### 1) `super_admin` (Bridge55)
**Scope:** platform-wide (all tenants + AfCON hub)  
**Can:**
- create/edit tournaments (seasons), host country, dates
- assign AfCON staff accounts + roles
- configure approval policy mode (All Modules vs Event-Critical)
- override approvals, emergency unpublish, crisis banners
- manage payment integrations + wallet rails configuration

---

### 2) `afcon_programming_admin` (AfCON)
**Scope:** AfCON hub + host embedded hubs (event publishing only)  
**Primary job:** publish and maintain the tournament program (fixtures/schedule)  
**Can:**
- create/edit:
  - tournament season metadata
  - stadiums, host cities
  - matches (teams, kickoff time, stage/group, venue, ticket link)
- publish schedule updates (time/venue changes)
- flag “high priority” matches for promotion modules
**Cannot:**
- approve/reject operators
- manage payouts/invoices
- change global branding/tenant configs

---

### 3) `afcon_comms_admin` (AfCON)
**Scope:** AfCON communications surfaces  
**Primary job:** content, announcements, and partner messaging  
**Can:**
- publish news blocks, hero announcements, and tournament notices
- manage “Global/Host” banners:
  - visa/entry updates
  - match-day advisories
  - safety/crisis notices
- manage content modules (city guides, venue guides, FAQs)
**Cannot:**
- edit match schedule core fields (unless explicitly granted)
- approve/reject operators (unless explicitly granted)
- manage finance

---

### 4) `afcon_approval_admin` (AfCON)
**Scope:** the AfCON-approved supplier program  
**Primary job:** maintain quality and compliance  
**Can:**
- approve/reject/suspend operators and listings for AfCON context
- set approval validity windows (tournament dates)
- apply approval mode:
  - **Mode A:** all modules require AfCON approval
  - **Mode B:** event-critical modules only (stays/transfers/experiences)
**Cannot:**
- change payment/wallet configuration
- edit tournament master branding

---

### 5) `marketing_admin` (Bridge55 or AfCON sponsor team—optional)
**Scope:** sponsor inventory and placements (non-fixture)  
**Can:**
- configure sponsor placements (homepage blocks, city pages, match pages)
- manage campaign start/end dates and targeting (country, city, dates)
- view campaign performance dashboards

---

### 6) `finance_admin` (Bridge55 + optional AfCON finance view)
**Scope:** payouts, invoices, reconciliation  
**Can:**
- view settlements, refunds, disputes for ticket/booking flows
- export reconciliation reports
- manage invoices for partners/sponsors (where applicable)
**Cannot:**
- edit fixtures/content (except financial metadata fields)

---

## Minimal “Manual Input” Publishing Workflow (no API required)
1) `super_admin` creates the tournament season (host, dates)  
2) `afcon_programming_admin` enters stadiums/cities and matches (from official sources like schedule PDFs)  
3) `afcon_comms_admin` publishes announcements + tourism/city content modules  
4) `afcon_approval_admin` approves operators and toggles approval mode for demos  
5) `finance_admin` monitors settlements and exports reports

---

## Notes for demos
- The same RBAC applies to:
  - **AfCON hub** (`afcon.bridge55`)
  - **Embedded host hub** (`{host}.bridge55/afcon`)
- Early demos can show a “Role badge” + “Approval mode badge” to make governance visible to stakeholders.








