# Shared JS Governance — Bridge55 Country-Specific

---

## Scope

Applies to any utility or component JS used across multiple pages (commonly under `/utils` or `/components`).

---

## Default Classification

| Attribute | Value |
|-----------|-------|
| Blast Radius | 3 (minimum) if shared usage exists |
| Change Manager | Required if behavior changes affect user flow |

---

## Rules

1. **No silent behavior changes** — If behavior changes, document it in the PR
2. **Prefer additive changes** — Avoid breaking existing callers
3. **Keep side effects explicit** — DOM mutations, navigation, storage
4. **When touching shared functions** — Verify at least 2 pages that use them

---

## Required Verification (Minimum)

- [ ] Identify pages impacted by the utility
- [ ] Verify each impacted page renders correctly
- [ ] Verify error and empty-state behavior is unchanged unless intended
