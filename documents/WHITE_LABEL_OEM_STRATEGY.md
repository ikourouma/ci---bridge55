# Bridge55 White-Label & OEM Strategy

## Standalone Platform Options for Tourism Boards & Governments

---

## Executive Summary

This document outlines Bridge55's strategy for offering **standalone, white-labeled travel booking platforms** to individual countries, tourism boards, or governments who want their own branded booking experience while leveraging Bridge55's technology infrastructure.

> **Critical Pilot (Requested):** Côte d’Ivoire (CI) and Ghana (GH) tourism boards have expressed interest in **standalone country demos**.  
> **AfCON Expansion:** Senegal (SN) is added as an AfCON host pilot to create a reusable **AfCON Event Template** for future host countries.  
> This is tracked in `documents/OEM_STANDALONE_COUNTRY_DEMO_PLAN.md`.

---

## Platform Deployment Models

### Model A: Federated Platform (Default)
**Pan-African Shared Infrastructure**

```
┌─────────────────────────────────────────────────────────┐
│                    Bridge55 Platform                     │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ │
│  │  KE  │ │  NG  │ │  ZA  │ │  MA  │ │  GH  │ │ ...  │ │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ │
│           Shared: Infrastructure, Inventory, Payments    │
│           Unique: Branding, Currency, Language           │
└─────────────────────────────────────────────────────────┘
```

**Characteristics:**
- All 54 African countries on one platform
- Country-specific branding via CSS variables
- Shared booking inventory
- Unified payment processing
- Lower cost per country
- Network effects benefit all countries

**Best For:**
- Tourism boards with limited budgets
- Countries wanting quick market entry
- Organizations prioritizing Pan-African visibility

**Pricing:**
- No setup fee
- Revenue share: 8-15% per booking
- Marketing add-ons available

---

### Model B: White-Label Standalone
**Dedicated Branded Platform**

```
┌─────────────────────────┐
│   VisitKenya.travel     │ ← Custom domain
│   ┌─────────────────┐   │
│   │  Kenya Tourism  │   │ ← Full brand control
│   │  Board Platform │   │
│   └─────────────────┘   │
│   Powered by Bridge55   │ ← Hidden backend
└─────────────────────────┘
        │
        ▼
┌─────────────────────────┐
│  Bridge55 Backend       │
│  - Booking Engine       │
│  - Payment Processing   │
│  - Inventory Access     │
│  - Analytics            │
└─────────────────────────┘
```

**Characteristics:**
- Country's own branded domain
- Full UI/UX customization
- Complete data ownership
- Dedicated tenant infrastructure
- Country-specific payment methods
- Isolated analytics

**Best For:**
- Countries with strong tourism budgets
- Governments wanting full brand ownership
- Organizations with specific compliance needs
- Countries hosting major events (AFCON, World Cup qualifiers)

**Pricing:**
| Component | Price Range |
|-----------|-------------|
| Setup Fee | $25,000 - $75,000 |
| Monthly Fee | $2,500 - $10,000/mo |
| Transaction Fee | 2-5% per booking |
| Custom Development | $150/hour |

---

## Feature Comparison

| Feature | Federated | White-Label |
|---------|-----------|-------------|
| **Domain** | bridge55.com/country | visitcountry.travel |
| **Branding** | CSS variables | Full custom |
| **UI/UX** | Shared templates | Custom design |
| **Data Ownership** | Shared (anonymized) | Full ownership |
| **Analytics** | Aggregated view | Dedicated dashboard |
| **Infrastructure** | Shared multi-tenant | Dedicated tenant |
| **Payment Gateway** | Bridge55 unified | Country-specific |
| **Currency** | Multi-currency | Country default |
| **Language** | 15+ languages | Country priority |
| **SLA** | Standard (99.5%) | Premium (99.9%) |
| **Support** | Community + Email | Dedicated manager |
| **Time to Launch** | Immediate | 4-8 weeks |
| **Booking Inventory** | Full Pan-African | Country + global |

---

## Pilot Rollout (CI + GH) — Standalone Country Demos

### Why this is critical
- Validated demand from tourism board stakeholders
- Fastest path to high-value partnerships + government credibility
- Establishes a repeatable “tenant packaging” model for future OEM deals

### What we deliver first
- Standalone demos that are **country-locked** and deployed on **separate domains**
- Same Fortune‑100 UI patterns as Bridge55 core (header/footer/breadcrumb standards)
- Scope + timeline are defined in:
  - `documents/OEM_STANDALONE_COUNTRY_DEMO_PLAN.md`

### AfCON Hub + Host-Country Embedding (Recommended)
For AfCON partnerships, we will use a **dual-surface pattern**:
- **AfCON hub** (`afcon.bridge55`): the canonical “official” event destination with pan‑African patterns and a host-country spotlight.
- **Embedded event hub** inside the host country tenant (e.g., `senegal.bridge55`): conversion-optimized tourism experience using the same template (stays/things-to-do/transfers).


## Technical Architecture

### White-Label Implementation

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ VisitKenya  │  │ VisitMorocco│  │ VisitSA     │          │
│  │   .travel   │  │   .travel   │  │   .travel   │          │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘          │
└─────────┼────────────────┼────────────────┼─────────────────┘
          │                │                │
          ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────┐
│                   API GATEWAY LAYER                          │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Tenant Identification                   │    │
│  │         (Domain → Tenant Config Lookup)              │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────┐
│                   SERVICE LAYER                              │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌────────┐│
│  │BridgeAir│ │BridgeStay│ │BridgeMove│ │BridgePay│ │ ...   ││
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └────────┘│
└─────────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────┐
│                   DATA LAYER                                 │
│  ┌───────────────────┐  ┌───────────────────┐              │
│  │ Shared Inventory  │  │ Tenant-Specific   │              │
│  │ (Flights, Hotels) │  │ (Users, Bookings) │              │
│  └───────────────────┘  └───────────────────┘              │
└─────────────────────────────────────────────────────────────┘
```

### Tenant Configuration

```json
{
  "tenant_id": "visit-kenya-travel",
  "domain": "visitkenya.travel",
  "country_code": "KE",
  "organization": "Kenya Tourism Board",
  "branding": {
    "logo_url": "https://visitkenya.travel/assets/logo.png",
    "primary_color": "#BB0000",
    "secondary_color": "#006600",
    "font_family": "Lato, sans-serif",
    "favicon": "https://visitkenya.travel/favicon.ico"
  },
  "localization": {
    "default_language": "en",
    "supported_languages": ["en", "sw", "fr"],
    "default_currency": "KES",
    "supported_currencies": ["KES", "USD", "EUR", "GBP"]
  },
  "payments": {
    "gateway": "custom",
    "providers": ["mpesa", "airtel_money", "visa", "mastercard"],
    "settlement_currency": "KES",
    "bank_account": "XXXX-XXXX-XXXX-1234"
  },
  "features": {
    "flights": true,
    "stays": true,
    "experiences": true,
    "cars": true,
    "transfers": true,
    "packages": true,
    "visa": true,
    "insurance": true
  },
  "analytics": {
    "google_analytics_id": "UA-XXXXXX-X",
    "custom_dashboard": true,
    "data_export_enabled": true
  },
  "sla": {
    "uptime_target": 99.9,
    "support_tier": "premium",
    "dedicated_manager": true
  }
}
```

---

## Revenue Models

### Model A: Federated (Revenue Share)

| Booking Type | Bridge55 Share | Country Share |
|--------------|----------------|---------------|
| Flights | 3% | 5-7% |
| Stays | 5% | 8-12% |
| Experiences | 8% | 12-18% |
| Cars | 5% | 8-12% |
| Transfers | 5% | 10-15% |

### Model B: White-Label (SaaS + Commission)

| Component | Fee Structure |
|-----------|---------------|
| Platform License | $2,500 - $10,000/mo |
| Transaction Fee | 2-5% of GMV |
| Payment Processing | Pass-through + 0.5% |
| Support | Included in license |
| Custom Development | $150/hour |

### Model C: Hybrid (For Large Markets)

For countries with significant tourism volume (>$100M GMV):

| Component | Fee Structure |
|-----------|---------------|
| Minimum Guarantee | $25,000/mo |
| Transaction Fee | 1-2% above minimum |
| Revenue Share Above Threshold | 50/50 split |

---

## Onboarding Process

### Phase 1: Discovery (Week 1-2)
- Requirements gathering
- Technical assessment
- Brand guidelines collection
- Payment provider selection
- Compliance review

### Phase 2: Configuration (Week 2-4)
- Tenant setup
- Branding implementation
- Payment integration
- Language/currency setup
- Analytics configuration

### Phase 3: Testing (Week 4-6)
- UAT with client team
- Payment flow testing
- Performance testing
- Security audit
- Mobile responsiveness

### Phase 4: Launch (Week 6-8)
- DNS configuration
- SSL certificate
- Soft launch (beta users)
- Marketing support
- Go-live celebration

### Phase 5: Ongoing Support
- 24/7 monitoring
- Monthly performance reviews
- Quarterly strategy sessions
- Annual contract renewal

---

## Compliance & Data Residency

### Data Sovereignty Requirements

| Country/Region | Requirements | Bridge55 Solution |
|----------------|--------------|-------------------|
| EU Citizens | GDPR | EU data centers option |
| Nigeria | NDPR | Nigerian hosting available |
| South Africa | POPIA | SA data centers |
| Kenya | DPA 2019 | Local data storage |
| Morocco | Law 09-08 | MENA region hosting |

### Security Measures

- **Encryption**: AES-256 at rest, TLS 1.3 in transit
- **Access Control**: Role-based, MFA required
- **Audit Logs**: 7-year retention
- **Penetration Testing**: Annual, results shared
- **SOC 2 Type II**: Certified

---

## Case Studies (Conceptual)

### Case Study 1: VisitKenya.travel
**Kenya Tourism Board - White-Label Implementation**

**Situation:**
- Kenya wanted full brand ownership
- Required M-Pesa as primary payment
- Needed Swahili language support

**Solution:**
- Custom domain and branding
- Integrated Safaricom M-Pesa API
- Swahili as default language
- Safari-focused homepage

**Results (Projected):**
- 150% increase in online bookings
- 45% reduction in booking costs
- 89% mobile user satisfaction

### Case Study 2: Federated Country - Ghana
**Ghana Tourism Authority - Federated Model**

**Situation:**
- Limited budget for standalone platform
- Wanted quick market entry
- Needed diaspora outreach (US, UK)

**Solution:**
- Enabled on Bridge55 with Ghana branding
- Multi-currency (GHS, USD, GBP)
- Integrated cultural tourism packages

**Results (Projected):**
- Live within 2 weeks
- 40% of bookings from diaspora
- $0 upfront investment

---

## Competitive Analysis

### How Bridge55 White-Label Compares

| Feature | Bridge55 | Amadeus | Travelport |
|---------|----------|---------|------------|
| Africa-Focus | ✅ Core | ❌ Global | ❌ Global |
| Mobile Money | ✅ Native | ❌ Add-on | ❌ Add-on |
| Local Languages | ✅ 15+ African | ⚠️ Limited | ⚠️ Limited |
| Tourism Board Portal | ✅ Included | ❌ Extra | ❌ Extra |
| Pricing | ✅ Flexible | ❌ Enterprise only | ❌ Enterprise only |
| Time to Launch | ✅ 4-8 weeks | ❌ 6-12 months | ❌ 6-12 months |

---

## Next Steps for Interested Countries

### 1. Express Interest
- Contact: partnerships@bridge55.com
- Schedule discovery call

### 2. Requirements Workshop
- Define scope and features
- Agree on timeline and budget

### 3. Proposal & Contract
- Custom proposal based on needs
- MSA and SLA negotiation

### 4. Kickoff
- Assign dedicated team
- Begin implementation

---

## Appendix: Pricing Calculator

### White-Label Standalone Estimate

```
Base Setup: $50,000
Customization Level:
  - Basic (template-based): +$0
  - Standard (moderate custom): +$15,000
  - Premium (full custom): +$35,000

Monthly Platform Fee:
  - Basic: $2,500/mo
  - Standard: $5,000/mo
  - Premium: $10,000/mo

Transaction Fees:
  - <$1M GMV/mo: 5%
  - $1M-$5M GMV/mo: 3%
  - >$5M GMV/mo: 2%

Example: Kenya Tourism Board (Standard)
  Setup: $65,000
  Monthly: $5,000
  Est. Annual GMV: $12M
  Est. Transaction Fees: $360,000/year
  Total First Year: ~$425,000

ROI: If platform generates $12M GMV, country retains ~$11.5M
(compared to 15% OTA commissions = $1.8M saved)
```

---

## Implementation Roadmap

### Phase 6: White-Label Foundation
*Part of Bridge55 Platform Roadmap*

| Task | Priority | Status |
|------|----------|--------|
| Multi-tenant architecture | High | ✅ Designed |
| Tenant configuration system | High | 🔄 In Progress |
| Custom branding engine | Medium | 📋 Planned |
| Payment gateway abstraction | High | 📋 Planned |
| Data isolation implementation | High | 📋 Planned |
| Country-specific dashboards | Medium | ✅ Delivered (Tourism Board) |
| White-label sales page | Low | 📋 Planned |

---

*Document Version: 1.0*
*Last Updated: December 11, 2025*
*Owner: Bridge55 Platform Team*





