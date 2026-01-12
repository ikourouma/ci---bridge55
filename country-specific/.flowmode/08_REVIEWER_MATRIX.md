# Reviewer Matrix — Bridge55 Country-Specific

---

## Purpose

Ensure the right reviewers are involved only when needed.

---

## Reviewer Types

| Reviewer | Focus |
|----------|-------|
| **UX Reviewer** | Navigation, states, dead ends, SaaS integrity |
| **Platform Reviewer** | Routing, shared JS coupling, performance, structure |
| **Security Reviewer** | Auth boundaries, data leakage, secrets handling |
| **Fintech Reviewer** (future) | Payments, ledgering, dispute/refund logic |
| **Change Manager** | Adoption/readiness for Radius >= 3 |

---

## Required Reviewers by Change Type

### 1) UI-only, local component (Radius 1–2)
- UX Reviewer (recommended)
- Change Manager: **No**

### 2) Routing or workflow changes (Radius 3)
- UX Reviewer (required)
- Platform Reviewer (required)
- Change Manager (required)

### 3) Shared utility changes used by multiple pages (Radius 3)
- Platform Reviewer (required)
- UX Reviewer (required if user-visible)
- Change Manager (required if workflow shifts)

### 4) Supabase schema / RLS / auth boundary (Radius 4)
- Security Reviewer (required)
- Platform Reviewer (required)
- Change Manager (required if workflow changes)
- **Tier 3 required**

### 5) Payments / money movement (Radius 5, future)
- Fintech Reviewer (required)
- Security Reviewer (required)
- Change Manager (required)
- **Tier 3 required**
