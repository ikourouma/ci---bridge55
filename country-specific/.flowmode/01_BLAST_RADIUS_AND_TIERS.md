# Blast Radius & Tier Rules — Country-Specific

---

## Blast Radius (Required)

| Level | Description |
|-------|-------------|
| **0** | Read-only |
| **1** | Local single-file change |
| **2** | Local multi-file change |
| **3** | Workflow/state change (routing, navigation flows, user journey, shared utilities) |
| **4** | Shared data/external impact (Supabase schema/RLS, auth boundary, multi-tenant data) |
| **5** | Irreversible/financial/legal impact (payments, identity, compliance) |

---

## Default Classifications (Bridge55 Country-Specific)

| Change Type | Default Blast Radius |
|-------------|---------------------|
| Static page copy / minor CSS tweaks | 1–2 |
| Component used across multiple pages | 3 |
| Routing (`/utils/routing.js`) changes | 3 (minimum) |
| Supabase schema/RLS/auth changes | 4 (minimum) |
| Payments / booking with money movement (future) | 5 |

---

## Tier Rules

| Tier | Action |
|------|--------|
| **Tier 1** | Auto-proceed |
| **Tier 2** | Hard-blocked (unsafe by definition; do not run) |
| **Tier 3** | Human approval required |

---

## Tier 2 (Hard-Blocked Examples)

- ❌ Destructive shell actions (rm -rf, mkfs, mass deletes)
- ❌ Force-pushing protected branches
- ❌ Disabling RLS or broadening policies without justification
- ❌ Committing secrets into repo

---

## Tier 3 (Human Approval Required)

- Blast Radius >= 4
- Anything affecting auth/session boundaries
- Any Supabase schema or RLS changes
- Any fintech/payment behavior (future)
- Any cross-trust-boundary behavior changes

**Tier-3 approval must include:**
- Intent
- Blast radius rationale
- Technical rollback
- Human/operational rollback
