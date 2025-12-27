# Bridge55 Airport Transfers Service Specification

## Overview

The Airport Transfers service provides seamless ground transportation between airports and destinations across Africa. This service combines API providers with locally onboarded taxi businesses to create a comprehensive, federated platform.

---

## Business Model

### Dual-Source Strategy

1. **API Providers (Global Reach)**
   - Mozio - Primary partner for Africa coverage
   - Kiwitaxi - Budget segment
   - Blacklane - Premium/luxury segment
   - Welcome Pickups - Meet & greet specialists

2. **Local Business Partners (African Focus)**
   - Direct onboarding of local taxi companies
   - Verified partner program
   - Operator dashboard for inventory management
   - Revenue sharing model (commission-based)

---

## Geographic Hierarchy

### Location-Based Service Matching

```
Level 1: COUNTRY
├── Kenya → Show Kenya-based providers first
├── Ghana → Show Ghana-based providers first
└── Nigeria → Show Nigeria-based providers first

Level 2: REGIONAL (East/West/North/South Africa)
├── East Africa → Kenya, Tanzania, Uganda, Rwanda
├── West Africa → Ghana, Nigeria, Senegal, Côte d'Ivoire
├── North Africa → Egypt, Morocco
└── Southern Africa → South Africa, Zambia

Level 3: PAN-AFRICAN (Default/Fallback)
└── All available providers across Africa
```

---

## Transfer Types

| Type | Description | Use Case |
|------|-------------|----------|
| **Airport Pickup** | Airport → Hotel/Address | Arriving passengers |
| **Airport Dropoff** | Hotel/Address → Airport | Departing passengers |
| **Round Trip** | Both pickup and dropoff | Complete journey |
| **Hotel Transfer** | Hotel → Hotel | Multi-property stays |
| **City to City** | Long distance | Inter-city travel |
| **Hourly Hire** | By the hour | Business/Tourism |

---

## Vehicle Categories

| Category | Passengers | Luggage | Use Case |
|----------|------------|---------|----------|
| **Economy Sedan** | 3 | 2 bags | Budget travelers |
| **Comfort Sedan** | 3 | 3 bags | Business travelers |
| **Standard SUV** | 4 | 4 bags | Families |
| **Luxury Sedan** | 3 | 3 bags | Premium service |
| **Van/Minibus** | 6-8 | 6-8 bags | Groups |
| **Luxury SUV** | 4 | 4 bags | VIP service |

---

## Pages Implemented

### 1. Search Results (`transfers/search-results.html`)
- Dynamic filtering by vehicle type, provider, features
- Price range slider
- Rating filter
- Sort by recommended, price, rating
- Provider badges (Local, Verified, Premium)
- "No results" fallback with alternatives

### 2. Transfer Details (`transfers/transfer-details.html`)
- Vehicle specifications (passengers, luggage, duration)
- Route visualization
- Provider information and stats
- Feature list (Meet & Greet, WiFi, etc.)
- Contact options (Call, WhatsApp, Email)
- Price breakdown with platform fee

### 3. Booking Form (`transfers/booking.html`)
- Lead passenger details
- Flight lookup feature (auto-fetch arrival time)
- Pickup/dropoff location fields
- Special requests (child seat, wheelchair, signage)
- Progress steps indicator

### 4. Payment (`transfers/payment.html`)
- **Bridge Wallet** (Recommended)
  - Balance display
  - Virtual Visa card
  - Top-up functionality
- **Mobile Money**
  - M-Pesa (Kenya, Tanzania)
  - MTN MoMo (Ghana, Nigeria, Uganda)
  - Airtel Money (Kenya, Uganda, Tanzania)
  - Orange Money (Senegal, Côte d'Ivoire)
- **Credit/Debit Card**
  - Visa, Mastercard, Amex
  - Save card option
- **Bank Transfer**
  - African Bank (Local)
  - International Wire

### 5. Confirmation (`transfers/confirmation.html`)
- Success header with booking reference
- QR code voucher
- Route visualization
- Provider contact details
- Quick actions (Print, Download, Share)
- Important information section
- FAQs specific to transfers

---

## Features

### For Travelers
- ✅ Meet & Greet at arrivals
- ✅ Flight tracking (automatic delay adjustment)
- ✅ 60 minutes free waiting time
- ✅ Free cancellation (24h before)
- ✅ Door-to-door service
- ✅ Child seat available on request
- ✅ WiFi on selected vehicles
- ✅ Complimentary water

### For Local Businesses (Operator Dashboard - Future)
- Business registration & verification
- Fleet management
- Pricing configuration
- Availability calendar
- Booking management
- Revenue analytics
- Customer communication
- BridgeWallet for operators

---

## Smart Recommendations

When transfer service is unavailable in a location:

1. **Suggest Car Rental** - Self-drive option
2. **Local Taxi Info** - Phone numbers for airport taxis
3. **Hotel Pickup** - Many hotels offer airport service
4. **Partner Registration CTA** - Encourage local businesses to join

---

## API Integration Strategy

### Phase 1 (Launch)
- Mozio API (Primary) - Best Africa coverage
- Local Business Portal (Custom)
- Manual Inventory for gaps

### Phase 2 (Scale)
- Add Blacklane (Premium segment)
- Add Kiwitaxi (Budget segment)
- Expand Local Business Network

### Phase 3 (Mature)
- Full API aggregation
- Dynamic pricing engine
- AI-powered recommendations

---

## Country Branding

Full support for all 12 countries with dynamic color theming:
- Kenya (Red)
- Ghana (Red/Gold)
- Nigeria (Green)
- South Africa (Green/Gold)
- Egypt (Red/Black)
- Tanzania (Green/Blue)
- Morocco (Red/Green)
- Rwanda (Blue/Yellow)
- Uganda (Yellow/Black)
- Côte d'Ivoire (Orange/Green)
- Zambia (Green/Orange)
- Senegal (Green)

---

## Pricing Model

| Component | Description |
|-----------|-------------|
| **Base Fare** | Set by provider/operator |
| **Platform Fee** | 5% of base fare |
| **Total** | Base Fare + Platform Fee |

*No hidden fees, surge pricing, or additional charges*

---

## Integration with Other Services

- **Flights**: Auto-fetch arrival time from flight number
- **Stays**: Suggest transfers when booking hotels
- **Packages**: Include transfers in bundled offerings
- **Experiences**: Combine with tours for day trips

---

## Future Enhancements

1. **Live Driver Tracking** - Real-time GPS location
2. **In-App Chat** - Direct communication with driver
3. **Multi-Stop Routes** - Add intermediate destinations
4. **Recurring Bookings** - For business travelers
5. **Corporate Accounts** - B2B functionality
6. **Driver Rating System** - Post-trip feedback

---

*Document Version: 1.0*
*Last Updated: December 2025*
*Service Status: ✅ Complete*















