# Routing Governance — Bridge55 Country-Specific

---

## Scope

Applies to:
- `/country-specific/utils/routing.js`
- Any code that changes navigation flows

---

## Default Classification

| Attribute | Value |
|-----------|-------|
| Blast Radius | 3 (minimum) |
| Tier | 1 or 3 depending on impact |
| Change Manager | Required (Yes) |

---

## Rules

1. **No breaking route names** without a compatibility plan
2. **No dead-end routes** — Every route must render or redirect safely
3. **All route transitions must handle:**
   - Missing parameters
   - Invalid parameters
   - Unknown routes

---

## Required Verification (Minimum)

- [ ] Navigate from landing → explore → details → back
- [ ] Validate unknown route handling
- [ ] Validate at least 3 deep links (copy/paste URL)

---

## Rollback

Routing changes must be trivially revertible as a single commit.
