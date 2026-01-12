# Contributing — FlowMode (Country-Specific Only)

**Owner:** Afronovation, Inc.  
**FlowMode:** v5.4  
**Scope:** /country-specific only

---

## Daily Operating Rules

1. **Declare Blast Radius + Tier** before editing
2. **Keep PRs small**; avoid refactors
3. **Verify changes** with explicit steps
4. **Include rollback notes**
5. **Use Change Manager readiness** for Radius >= 3

---

## Minimal PR Block

Copy/paste the PR template from:
- `/country-specific/.flowmode/PR_TEMPLATE.md`

---

## Hard Stops

- ❌ Do not commit secrets
- ❌ Do not disable or weaken RLS
- ❌ Do not introduce dead-end navigation
- ❌ Do not change routing without Change Manager readiness

---

## Definition of Done

A change is done only if it meets all criteria in:
- `/country-specific/.flowmode/03_DEFINITION_OF_DONE.md`

---

## Governance Reference

| Document | Purpose |
|----------|---------|
| `00_FLOWMODE_CHARTER.md` | Overall purpose and phase scope |
| `01_BLAST_RADIUS_AND_TIERS.md` | Risk classification rules |
| `02_CHANGE_MANAGER_READINESS.md` | Adoption/rollout checklist |
| `03_DEFINITION_OF_DONE.md` | Completion criteria |
| `04_ROUTING_GOVERNANCE.md` | Navigation change rules |
| `05_SHARED_JS_GOVERNANCE.md` | Shared utility rules |
| `06_SUPABASE_GOVERNANCE.md` | Database/auth rules |
| `07_TASK_BRIEF_TEMPLATE.md` | Task planning template |
| `08_REVIEWER_MATRIX.md` | Who reviews what |
| `PR_TEMPLATE.md` | Pull request template |
