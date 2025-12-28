# 🚗 Cars & Transportation Service Specification
## Bridge55 Phase 3A - Cars, Transfers & Rideshare

**Version:** 1.0  
**Status:** 📋 Planned  
**Target:** Phase 3A  
**Last Updated:** December 2025

---

## 📋 Overview

The Cars & Transportation service will provide comprehensive ground transportation options across Africa, including rental cars, airport transfers, and rideshare integration.

---

## 🚙 Sub-Service 1: Rental Cars

### Pages to Build
1. **Car Search Results** (`cars/search-results.html`)
2. **Car Details** (`cars/car-details.html`)
3. **Rental Booking** (`cars/booking.html`)
4. **Payment** (`cars/payment.html`)
5. **Confirmation** (`cars/confirmation.html`)

### Features
- Filter by: Car type, transmission, fuel, features
- Price range: $20-$500/day
- Insurance options (Basic, Premium, Full)
- Add-ons: GPS, child seat, additional driver
- Pickup/Drop-off location selection
- One-way rental support

### Car Categories
| Category | Examples | Price Range |
|----------|----------|-------------|
| Economy | Toyota Yaris, Suzuki Swift | $25-40/day |
| Compact | VW Polo, Toyota Corolla | $35-55/day |
| SUV | Toyota RAV4, Nissan X-Trail | $60-100/day |
| Luxury | Mercedes E-Class, BMW 5 | $150-300/day |
| 4x4 Safari | Land Cruiser, Land Rover | $120-250/day |

### API Partners
- Rentalcars.com API
- CarTrawler API
- Local partners: Avis Kenya, Budget SA, Europcar

---

## 🚕 Sub-Service 2: Airport Transfers

### Pages to Build
1. **Transfer Search** (`transfers/search.html`)
2. **Vehicle Selection** (`transfers/select.html`)
3. **Booking** (`transfers/booking.html`)
4. **Confirmation** (`transfers/confirmation.html`)

### Features
- Airport to hotel routes
- Meet & greet service
- Flight tracking integration
- Vehicle options (Sedan, SUV, Van, Luxury)
- Fixed pricing (no surge)
- 24/7 availability

### Vehicle Types
| Type | Capacity | Use Case |
|------|----------|----------|
| Sedan | 3 pax, 2 bags | Solo/Couple |
| SUV | 4 pax, 4 bags | Family |
| Van | 7 pax, 7 bags | Group |
| Luxury | 3 pax, 2 bags | VIP/Business |

### Major Airports Covered
- Jomo Kenyatta (NBO) - Nairobi
- O.R. Tambo (JNB) - Johannesburg
- Murtala Muhammed (LOS) - Lagos
- Kotoka (ACC) - Accra
- Cairo (CAI) - Cairo

### API Partners
- Welcome Pickups API
- Jayride API
- GetTransfer API

---

## 📱 Sub-Service 3: Rideshare

### Pages to Build
1. **Ride Request** (`rideshare/request.html`)
2. **Driver Matching** (`rideshare/matching.html`)
3. **Live Tracking** (`rideshare/tracking.html`)
4. **Ride Complete** (`rideshare/complete.html`)

### Features
- Real-time driver matching
- Live GPS tracking
- In-app messaging
- Fare estimation
- Multiple ride types
- Rating system

### Rideshare Partners by Country
| Country | Partners |
|---------|----------|
| Kenya | Uber, Bolt, Little Cab |
| Nigeria | Uber, Bolt, InDriver |
| South Africa | Uber, Bolt, InDriver |
| Ghana | Uber, Bolt, Yango |
| Uganda | Uber, Bolt, SafeBoda |
| Egypt | Uber, Careem, Swvl |

### API Integration
- Uber for Business API
- Bolt Business API
- Deep linking for consumer apps

---

## 🎨 UI/UX Guidelines

### Car Cards
```
┌─────────────────────────────────────┐
│ [Car Image]                         │
├─────────────────────────────────────┤
│ Toyota RAV4 or similar              │
│ ⭐ 4.5 (234 reviews)                │
│ 🚗 SUV • ⚙️ Auto • 👥 5 seats      │
│ ✓ A/C  ✓ GPS  ✓ Unlimited km       │
├─────────────────────────────────────┤
│ $65/day          [Select →]         │
│ Total: $325 for 5 days              │
└─────────────────────────────────────┘
```

### Transfer Cards
```
┌─────────────────────────────────────┐
│ 🚐 Private SUV Transfer             │
│ NBO Airport → Nairobi City          │
├─────────────────────────────────────┤
│ 👥 4 passengers • 🧳 4 bags         │
│ ⏱️ ~45 min • 📍 Meet & Greet       │
├─────────────────────────────────────┤
│ $45 fixed price    [Book Now →]     │
└─────────────────────────────────────┘
```

---

## 💳 Payment Integration

Same payment system as Flights/Stays:
- Bridge Wallet (recommended)
- Mobile Money (M-Pesa, MTN, Airtel, Orange)
- Credit/Debit Cards
- Bank Transfer

### Pricing Model
- Rental Cars: Daily rate + insurance + extras
- Transfers: Fixed price per route
- Rideshare: Dynamic (pass-through from provider)

---

## 📱 Mobile-First Design

- Large touch targets for vehicle selection
- Swipeable car galleries
- Map integration for pickup/dropoff
- Real-time tracking with animations
- Push notifications for driver updates

---

## 🧪 Testing Scenarios

### Rental Cars
1. Search NBO → 5 days → SUV
2. Filter by automatic transmission
3. Add GPS and insurance
4. Complete booking flow

### Transfers
1. Search NBO Airport → Hemingways Nairobi
2. Select SUV for 4 passengers
3. Add flight details
4. Complete booking

### Rideshare
1. Request ride in Nairobi
2. View driver matching
3. Track driver en route
4. Complete and rate ride

---

## 📈 Success Metrics

- Conversion rate: 8-12%
- Average booking value: $150
- Customer satisfaction: 4.5+ stars
- Partner integration uptime: 99.9%

---

## 🗓️ Implementation Timeline

| Week | Tasks |
|------|-------|
| 1 | Rental car search + results |
| 2 | Car details + booking |
| 3 | Payment + confirmation |
| 4 | Airport transfers flow |
| 5 | Rideshare integration |
| 6 | Testing + polish |

---

## 📞 Support

For specification questions:
- Product: product@bridge55.com
- Engineering: dev@bridge55.com

















