# FlowMode Charter — Bridge55 Country-Specific

**Owner:** Afronovation, Inc.  
**FlowMode Version:** v5.4  
**Scope:** This governance applies ONLY to `/country-specific`

---

## Purpose

This folder attaches Afronovation's FlowMode v5.4 to the Bridge55 Country-Specific Tourism / Travel / Booking SaaS platform to ensure safe, high-quality delivery using AI-assisted development.

---

## Non-Negotiables

1. Every change declares **Blast Radius (0–5)**
2. **Tier rules** are respected (Tier 1 auto / Tier 2 blocked / Tier 3 human approval)
3. **Change Manager readiness** is mandatory for Blast Radius >= 3 or workflow changes
4. **Design integrity** is enforced: no placeholder UI, no dead ends, explicit states

---

## What This Phase Covers

**Phase 1** is minimal attachment:
- Documentation + work-format
- Non-blocking Cursor behavior rules
- Manual PR governance block (copy/paste)

No CI blocking is introduced in Phase 1.

---

## Add-On Reviewers

These reviewers are invoked by FlowMode Master v4 Auto-Router. They never replace the core chain (Planner → Auditor → Executor → Verifier).

### A) Observability Reviewer
**Scope:** Logging, metrics, tracing, alerting  
**Triggers:** Auth flows, payments, background jobs, APIs, critical user journeys  
**Value:** Faster incident diagnosis, reduced MTTR, production confidence

### B) Privacy & Compliance Reviewer
**Scope:** PII, consent, data retention, regulatory exposure  
**Triggers:** User profiles, uploads, analytics, messaging (email/SMS), payments  
**Value:** Prevents legal and reputational risk, avoids costly retrofits

### C) Test Strategy Reviewer
**Scope:** Unit, integration, E2E, regression coverage  
**Triggers:** Business rules, auth, payments, workflows, migrations  
**Value:** Prevents regressions, improves release confidence

### D) Architecture & Consistency Reviewer
**Scope:** Codebase structure, patterns, long-term maintainability  
**Triggers:** New modules, cross-cutting features, platform code, refactors  
**Value:** Prevents codebase entropy, improves onboarding and scalability

---

## Global Rules

- Reviewers provide findings only
- No reviewer may block unless blast radius ≥ 4
- High-risk findings must be surfaced to Verifier
- Low-risk findings are advisory
