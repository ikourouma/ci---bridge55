# Supabase Governance — Bridge55 Country-Specific

---

## Scope

Applies to any Supabase work:
- Schema / migrations
- RLS policies
- Auth and roles
- Storage buckets and access
- Edge functions

---

## Default Classification

| Attribute | Value |
|-----------|-------|
| Blast Radius | 4 (minimum) |
| Tier | 3 (mandatory) |
| Change Manager | Required if workflows change |

---

## Non-Negotiables

1. ✅ **RLS is ON** for any table storing user/partner data
2. ❌ **Never ship service role keys** to client code
3. ✅ **Policies must be explicit** and least-privilege
4. ✅ **Migrations must be reversible** or have rollback guidance

---

## Required Evidence (Minimum)

- [ ] SQL diff / migration script included
- [ ] RLS policies listed with explanation
- [ ] Test users/roles described
- [ ] Verification steps include reading + writing under correct roles
