# BridgeAPI Integration Catalog
## Bridge55 Partner API Reference & Integration Roadmap

**Classification:** CONFIDENTIAL - Internal Use Only  
**Version:** 2.0  
**Last Updated:** December 2025

---

## 🎯 Overview

BridgeAPI is Bridge55's unified API gateway that aggregates and normalizes data from multiple travel and fintech partners. This document catalogs all recommended APIs for integration, pricing analysis, and implementation roadmap.

---

## 📊 API Categories

### 1. ✈️ Flight APIs

| Provider | Type | Coverage | Pricing Model | Priority |
|----------|------|----------|---------------|----------|
| **Amadeus** | GDS | Global | Per-transaction ($0.50-2.00) | ⭐ High |
| **Sabre** | GDS | Global | Per-transaction ($0.40-1.80) | ⭐ High |
| **Travelport** | GDS | Global | Per-transaction ($0.45-1.90) | Medium |
| **Kiwi.com** | Aggregator | Global | Commission (3-5%) | Medium |
| **Duffel** | Modern API | 300+ Airlines | Per-segment ($0.30-0.80) | ⭐ High |
| **Skyscanner** | Metasearch | Global | CPA/CPC | Low |

**Recommended Launch Strategy:**
- Phase 1: Amadeus (widest African coverage)
- Phase 2: Duffel (modern API, better DX)
- Scale: Add Sabre for redundancy

**African Airlines Direct APIs:**
- Kenya Airways (KQ) - Direct B2B
- Ethiopian Airlines (ET) - Direct B2B
- South African Airways (SA) - Direct B2B
- RwandAir (WB) - Direct B2B
- EgyptAir (MS) - Direct B2B

---

### 2. 🏨 Hotel/Accommodation APIs

| Provider | Type | Inventory | Pricing Model | Priority |
|----------|------|-----------|---------------|----------|
| **Expedia Affiliate** | OTA | 700K+ properties | Commission (8-12%) | ⭐ High |
| **Booking.com Affiliate** | OTA | 28M+ listings | Commission (10-15%) | ⭐ High |
| **RateHawk** | B2B | 2.5M+ hotels | Net rates + markup | ⭐ High |
| **Hotelbeds** | B2B | 180K+ hotels | Net rates + markup | Medium |
| **TripAdvisor** | Metasearch | Reviews/Prices | CPA | Medium |
| **Agoda** | OTA | Asia-Pacific focus | Commission (10-12%) | Low |

**African-Specific:**
- Safari Bookings API - Safari lodges
- African Bush Camps - Luxury camps
- Jumia Travel - African inventory
- Jovago - West African focus

**Recommended Launch Strategy:**
- Phase 1: RateHawk (best B2B rates)
- Phase 2: Expedia Affiliate (brand recognition)
- Scale: Booking.com for global reach

---

### 3. 🚗 Car Rental & Mobility APIs

| Provider | Type | Coverage | Pricing Model | Priority |
|----------|------|----------|---------------|----------|
| **Rentalcars.com** | Aggregator | Global | Commission (8-10%) | ⭐ High |
| **CarTrawler** | B2B | Global | Net rates | Medium |
| **Sixt** | Direct | Global | B2B rates | Medium |
| **Avis/Budget** | Direct | Global | B2B rates | Medium |

**African Mobility:**
| Provider | Type | Markets | Integration |
|----------|------|---------|-------------|
| **Uber** | Rideshare | Pan-African | API Available |
| **Bolt** | Rideshare | Pan-African | API Available |
| **SafeBoda** | Boda-boda | Uganda, Kenya | API Available |
| **Little Cab** | Taxi | Kenya | API Available |
| **InDriver** | Rideshare | Multiple | API Available |

**Airport Transfers:**
- Welcome Pickups API
- Jayride API
- GetTransfer API

---

### 4. 🎭 Experiences & Tours APIs

| Provider | Type | Coverage | Pricing Model | Priority |
|----------|------|----------|---------------|----------|
| **Viator** | Tours | Global | Commission (8%) | ⭐ High |
| **GetYourGuide** | Tours | Global | Commission (8-10%) | ⭐ High |
| **Musement** | Tours | Europe/Africa | Commission | Medium |
| **Klook** | Tours | Asia-Pacific | Commission | Low |

**African-Specific:**
- SafariBookings API - Safari tours
- Afrochella API - Events (Ghana)
- Quicket API - Events (South Africa)
- Webtickets API - Events (South Africa)

---

### 5. 💳 Payment APIs

| Provider | Type | Coverage | Pricing | Priority |
|----------|------|----------|---------|----------|
| **Flutterwave** | Payment Gateway | Pan-African | 1.4-3.8% | ⭐ Critical |
| **Paystack** | Payment Gateway | Africa | 1.5-3.9% | ⭐ Critical |
| **Visa Cybersource** | Card Processing | Global | 0.25-0.35% | ⭐ High |
| **Mastercard Gateway** | Card Processing | Global | 0.25-0.35% | ⭐ High |
| **Stripe** | Payment Gateway | Limited Africa | 2.9% + $0.30 | Medium |

**Mobile Money APIs:**
| Provider | Markets | Integration |
|----------|---------|-------------|
| **M-Pesa** | Kenya, Tanzania | Safaricom/Vodacom APIs |
| **MTN Mobile Money** | 16 African countries | MTN MoMo API |
| **Airtel Money** | 14 African countries | Airtel API |
| **Orange Money** | 17 African countries | Orange API |
| **Chipper Cash** | Pan-African | API Available |

**Recommended Stack:**
- Primary: Flutterwave (best African coverage)
- Secondary: Paystack (Nigeria/Ghana focus)
- Cards: Visa Cybersource
- Mobile Money: Direct integrations per country

---

### 6. 📑 Travel Services APIs

**eVisa Services:**
| Provider | Coverage | Pricing |
|----------|----------|---------|
| **iVisa** | 200+ countries | Per-application |
| **VisaHQ** | Global | Per-application |
| **Atlys** | Modern API | Per-application |

**Travel Insurance:**
| Provider | Coverage | Integration |
|----------|----------|-------------|
| **Allianz Partners** | Global | B2B API |
| **AXA Partners** | Global | B2B API |
| **World Nomads** | Travelers | Affiliate |
| **Jubilee Insurance** | East Africa | Direct |
| **Old Mutual** | Southern Africa | Direct |

---

### 7. 🔧 Utility APIs

**Maps & Location:**
- Google Maps Platform
- Mapbox
- OpenStreetMap/Nominatim
- What3Words (African addresses)

**Communication:**
- Twilio (SMS/Voice)
- Africa's Talking (African SMS)
- SendGrid (Email)
- Firebase Cloud Messaging (Push)

**Currency & FX:**
- Open Exchange Rates
- XE Currency API
- Wise Business API

**Airline Logos & Data:**
- pics.avs.io (Airline logos)
- FlightAware (Flight tracking)
- AviationStack (Flight data)

---

## 💰 Cost Analysis

### Launch Phase (0-10K transactions/month)

| Category | Provider | Est. Monthly Cost |
|----------|----------|-------------------|
| Flights | Amadeus | $500-2,000 |
| Hotels | RateHawk | $0 (commission-based) |
| Payments | Flutterwave | Transaction fees only |
| Maps | Google Maps | $200-500 |
| SMS | Africa's Talking | $100-300 |
| **Total** | | **$800-2,800/month** |

### Growth Phase (10K-100K transactions/month)

| Category | Provider | Est. Monthly Cost |
|----------|----------|-------------------|
| Flights | Amadeus + Duffel | $5,000-15,000 |
| Hotels | RateHawk + Expedia | Commission-based |
| Payments | Flutterwave + Paystack | Transaction fees |
| Maps | Google Maps | $1,000-3,000 |
| SMS | Africa's Talking | $500-1,500 |
| **Total** | | **$6,500-19,500/month** |

### Scale Phase (100K+ transactions/month)

- Negotiate enterprise rates
- Consider building direct airline/hotel connections
- Multi-provider redundancy critical

---

## 🚀 Integration Roadmap

### Phase 1: Core (Months 1-3)
- [ ] Amadeus Flight API
- [ ] RateHawk Hotel API
- [ ] Flutterwave Payment Gateway
- [ ] M-Pesa Integration
- [ ] MTN MoMo Integration
- [ ] Google Maps
- [ ] Africa's Talking SMS

### Phase 2: Expansion (Months 4-6)
- [ ] Duffel Flight API (redundancy)
- [ ] Expedia Affiliate
- [ ] Paystack (Nigeria focus)
- [ ] Airtel Money
- [ ] Orange Money
- [ ] Viator Tours API

### Phase 3: Enhancement (Months 7-9)
- [ ] Uber/Bolt Integration
- [ ] CarTrawler Rentals
- [ ] GetYourGuide Tours
- [ ] iVisa Integration
- [ ] Allianz Insurance

### Phase 4: Optimization (Months 10-12)
- [ ] Direct airline connections
- [ ] Direct hotel connections
- [ ] Custom mobile money integrations
- [ ] AI-powered pricing optimization

---

## 🔐 Security & Compliance

### Required Certifications
- PCI DSS Level 1 (Payment processing)
- ISO 27001 (Information security)
- GDPR Compliance (EU travelers)
- POPIA Compliance (South Africa)
- Kenya Data Protection Act

### API Security Standards
- OAuth 2.0 authentication
- API key rotation every 90 days
- Rate limiting per endpoint
- Request signing for sensitive operations
- Encrypted data at rest and in transit

---

## 📞 Partner Contact Directory

### Priority Partners
1. **Amadeus** - enterprise-sales@amadeus.com
2. **Flutterwave** - partnerships@flutterwave.com
3. **RateHawk** - partners@ratehawk.com
4. **Duffel** - sales@duffel.com
5. **Viator** - affiliate@viator.com

### Mobile Money
1. **Safaricom M-Pesa** - mpesa@safaricom.co.ke
2. **MTN MoMo** - momo-api@mtn.com
3. **Airtel Money** - api@airtel.com

---

## 📈 Revenue Potential via BridgeAPI

### As an Integrator (Additional Revenue Stream)
Bridge55 can offer BridgeAPI as a service to:
- Local tourism boards
- Regional travel agencies
- African startups needing travel APIs
- Corporate travel departments

**Pricing Model:**
- API calls: $0.01-0.05 per request
- Monthly subscription: $500-5,000
- Revenue share: 10-20% of transaction value

**Estimated Additional Revenue:**
- Year 1: $50,000-100,000
- Year 2: $200,000-500,000
- Year 3: $1,000,000+

---

## 📝 Notes

- All pricing is estimated and subject to negotiation
- African-specific providers often offer better rates for regional coverage
- Direct integrations with airlines/hotels yield better margins at scale
- Mobile money integration is CRITICAL for African market success
- Consider building redundancy for all critical APIs

---

**Document Owner:** Bridge55 Engineering Team  
**Review Cycle:** Quarterly  
**Next Review:** March 2026

















