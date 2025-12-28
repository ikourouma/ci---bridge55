# Bridge55 Airport Transfers Service Documentation
## BridgeMove Module - Transfer Service

**Version:** 1.0  
**Last Updated:** December 2025  
**Status:** ✅ Production Ready  
**Module:** BridgeMove

---

## Table of Contents

1. [Service Overview](#service-overview)
2. [User Flow](#user-flow)
3. [Page Specifications](#page-specifications)
4. [Technical Architecture](#technical-architecture)
5. [Payment Integration](#payment-integration)
6. [Coupon & Discount System](#coupon--discount-system)
7. [Operator Integration](#operator-integration)
8. [Data Models](#data-models)
9. [API Endpoints](#api-endpoints)
10. [Testing Guide](#testing-guide)

---

## Service Overview

### Purpose
The Airport Transfers service enables users to book reliable, pre-arranged transportation between airports and destinations across Africa. This service connects travelers with verified local transfer operators.

### Key Features

| Feature | Description |
|---------|-------------|
| **Multi-Provider Search** | Compare options from multiple transfer operators |
| **Vehicle Types** | Sedan, SUV, Van, Luxury options |
| **Real-Time Pricing** | Dynamic pricing based on distance, vehicle, time |
| **Meet & Greet** | Driver meets passenger at arrivals with name sign |
| **Flight Tracking** | Auto-adjusts pickup for delayed flights |
| **Free Waiting Time** | 60 minutes included for airport pickups |
| **24/7 Support** | Round-the-clock customer assistance |
| **Flexible Payment** | Bridge Wallet, Mobile Money, Cards, Bank Transfer |
| **Promo Codes** | Operator and platform-wide discounts |

### Supported Locations

| Country | Key Airports | Status |
|---------|--------------|--------|
| 🇰🇪 Kenya | NBO (Jomo Kenyatta), MBA (Moi Intl) | ✅ Active |
| 🇬🇭 Ghana | ACC (Kotoka) | ✅ Active |
| 🇳🇬 Nigeria | LOS (Murtala Muhammed), ABV (Nnamdi Azikiwe) | ✅ Active |
| 🇿🇦 South Africa | JNB (O.R. Tambo), CPT (Cape Town) | ✅ Active |
| 🇪🇬 Egypt | CAI (Cairo), HRG (Hurghada) | ✅ Active |
| 🇹🇿 Tanzania | DAR (Julius Nyerere), JRO (Kilimanjaro) | ✅ Active |
| 🇲🇦 Morocco | CMN (Mohammed V), RAK (Marrakech) | ✅ Active |
| 🇷🇼 Rwanda | KGL (Kigali Intl) | ✅ Active |
| 🇺🇬 Uganda | EBB (Entebbe) | ✅ Active |
| 🇨🇮 Côte d'Ivoire | ABJ (Félix-Houphouët) | ✅ Active |

---

## User Flow

### Complete Booking Journey

```
┌─────────────────────────────────────────────────────────────────────┐
│                    AIRPORT TRANSFERS USER FLOW                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐      │
│  │  SEARCH  │───▶│  RESULTS │───▶│ DETAILS  │───▶│ BOOKING  │      │
│  │   HUB    │    │   PAGE   │    │   PAGE   │    │   FORM   │      │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘      │
│       │               │               │               │             │
│       ▼               ▼               ▼               ▼             │
│  • Pickup from    • Filter by    • Vehicle info  • Passenger      │
│  • Drop-off to    • Sort by      • Provider      • Flight info    │
│  • Date & time    • Price range  • Features      • Special req    │
│  • Passengers     • Vehicle type • Reviews       • Contact        │
│  • Luggage        • Provider     • Pricing       │                 │
│                                   • Edit details │                 │
│                                                   │                 │
│                                                   ▼                 │
│  ┌──────────┐    ┌──────────────────────────────────┐              │
│  │ CONFIRM  │◀───│           PAYMENT                 │              │
│  │   PAGE   │    │  ┌─────────┐ ┌─────────────────┐ │              │
│  └──────────┘    │  │ Coupon  │ │ Payment Methods │ │              │
│       │          │  │  Code   │ │ • Bridge Wallet │ │              │
│       ▼          │  └─────────┘ │ • Mobile Money  │ │              │
│  • Booking ref   │              │ • Credit Card   │ │              │
│  • E-voucher     │              │ • Bank Transfer │ │              │
│  • QR code       │              └─────────────────┘ │              │
│  • Driver info   └──────────────────────────────────┘              │
│  • Savings shown │                                                  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Transfer Types

| Type | Description | Use Case |
|------|-------------|----------|
| **Airport Pickup** | From airport to destination | Arriving travelers |
| **Airport Dropoff** | From location to airport | Departing travelers |
| **Round Trip** | Both pickup and dropoff | Full journey coverage |

---

## Page Specifications

### 1. Search Hub (bridge55-search-hub-FINAL.html)

**Location:** `bridge55-search-hub-FINAL.html` → Transfers Tab

**Features:**
- Transfer type radio buttons (Pickup, Dropoff, Round Trip)
- Pickup location dropdown with airport suggestions
- Drop-off location dropdown with hotel/address suggestions
- Date picker (datetimepicker integration)
- Time picker (12-hour format with AM/PM)
- Passengers & Luggage selector dropdown
  - Passengers: 1-8
  - Luggage: 0-10 bags
- Dynamic location selection (updates on dropdown click)

**Session Storage Output:**
```javascript
{
  pickup: "Jomo Kenyatta Airport (NBO)",
  dropoff: "Nairobi CBD",
  date: "Dec 15, 2025",
  time: "10:30 AM",
  passengers: 2,
  luggage: 2,
  timestamp: "2025-12-15T10:30:00Z"
}
```

---

### 2. Search Results (transfers/search-results.html)

**Features:**
- Filter sidebar:
  - Price range slider (Ion Range Slider)
  - Vehicle type checkboxes
  - Provider filter
  - Features filter (WiFi, Child Seat, etc.)
  - Rating filter
- Results grid/list toggle
- Sort options (Price, Rating, Duration)
- Provider cards with:
  - Vehicle image
  - Provider name & rating
  - Vehicle type
  - Features icons
  - Price display
  - "View Details" CTA

**Filter Parameters:**
```javascript
{
  minPrice: 10,
  maxPrice: 200,
  vehicleTypes: ["sedan", "suv", "van"],
  features: ["wifi", "meet_greet", "child_seat"],
  minRating: 4.0,
  sortBy: "price_low"
}
```

---

### 3. Transfer Details (transfers/transfer-details.html)

**Features:**
- Vehicle gallery/image
- Provider information:
  - Company name
  - Rating & reviews
  - Verification badge
  - Contact info
- Vehicle specifications:
  - Vehicle type
  - Max passengers
  - Luggage capacity
  - Features list
- Route information:
  - Pickup location
  - Drop-off location
  - Estimated duration
  - Distance
- Pricing breakdown:
  - Base fare
  - Platform fee (5%)
  - Total

**Editable Summary Box:**
Users can modify booking details directly:
- Date (calendar picker)
- Time (time picker)
- Passengers (quantity selector)
- Luggage (quantity selector)

Changes update in real-time and persist to session storage.

**Sticky Sidebar:**
- Transfer Summary card
- Why Book with Bridge55 card
- Need Help card (operator contact)

All sidebar cards remain visible while scrolling.

---

### 4. Booking Form (transfers/booking.html)

**Sections:**

**Passenger Information:**
- First Name (required)
- Last Name (required)
- Email (required, validated)
- Phone (required, with country code)
- Country of Residence

**Flight Information:**
- Flight Number (optional)
- Airline (dropdown)
- Arrival/Departure Terminal

**Pickup Details:**
- Specific pickup point
- Hotel/address name
- Additional instructions

**Special Requests:**
- Child seat (checkbox + age)
- Wheelchair assistance
- Extra luggage
- Special notes (textarea)

**Sidebar (Sticky):**
- Transfer Summary (route, date, time, passengers)
- Need Help card with operator contact

**Form Validation:**
- Real-time field validation
- Error highlighting
- Submit only when all required fields valid

---

### 5. Payment Page (transfers/payment.html)

**Payment Methods:**

| Method | Description | Status |
|--------|-------------|--------|
| **Bridge Wallet** | Stored value wallet | ✅ Active |
| **Mobile Money** | M-Pesa, MTN, Airtel, Orange | ✅ Active |
| **Credit/Debit Card** | Visa, Mastercard | ✅ Active |
| **Bank Transfer** | Direct bank payment | ✅ Active |

**Bridge Wallet Card:**
- Branded "Bridge55" logo (top-left)
- Visa card design
- Card number (masked)
- Cardholder name
- Top-up button

**Coupon System:**
- Expandable coupon section
- Code input field
- Apply button
- Validation feedback
- Applied coupon badge
- Remove coupon option

**Price Breakdown:**
- Base fare
- Platform fee (5%)
- Discount (if coupon applied)
- Total

**Sticky Sidebar:**
- Payment Summary card
- Need Help card

---

### 6. Confirmation Page (transfers/confirmation.html)

**Success Header:**
- Success animation
- "Booking Confirmed!" message
- Booking reference number
- Transaction ID

**Information Cards:**

**Transfer Details:**
- Route visualization (pickup → dropoff)
- Date & time
- Vehicle type
- Passengers & luggage

**Passenger Information:**
- Lead passenger name
- Email & phone
- Flight number
- Special requests

**Payment Details:**
- Payment method used
- Base fare
- Platform fee
- **Promo discount (highlighted)**
- **Savings banner (if applicable)**
- Total paid
- Payment status

**Promo Discount Display:**
```html
<!-- When coupon applied -->
<div class="promo-row">
  <span>Promo Applied <span class="promo-badge">BRIDGE10</span></span>
  <span class="promo-discount">-$4.50</span>
</div>
<div class="savings-banner">
  🐷 You saved $4.50 on this booking!
</div>
```

**Provider Card:**
- Provider logo
- Company name
- Verification badge
- Rating & reviews
- Contact options (Call, WhatsApp, Email)

**E-Voucher:**
- QR code for driver scanning
- Print voucher button
- Download PDF button
- Share booking button

**Important Information:**
- Meet & Greet instructions
- Flight tracking notice
- Free waiting time policy
- Cancellation policy

**FAQ Section:**
- Common questions accordion
- Driver contact info
- Child seat requests
- Luggage policies
- Price guarantees

---

## Technical Architecture

### Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML5, CSS3, JavaScript (jQuery) |
| UI Framework | Bootstrap 5.3 |
| Icons | Font Awesome 6.4 |
| Date/Time | Bootstrap Datetimepicker, Flatpickr |
| Slider | Ion Range Slider |
| Storage | sessionStorage (booking data) |
| Storage | localStorage (user preferences, country) |

### File Structure

```
transfers/
├── search-results.html      # Filter & browse transfers
├── transfer-details.html    # Vehicle & provider details
├── booking.html             # Passenger & trip information
├── payment.html             # Payment processing
└── confirmation.html        # Booking confirmation

bridge55-search-hub-FINAL.html  # Main search hub (Transfers tab)

documents/
└── TRANSFERS_SERVICE_DOCUMENTATION.md  # This file
```

### Session Storage Keys

| Key | Purpose | Structure |
|-----|---------|-----------|
| `transferSearch` | Search parameters | `{pickup, dropoff, date, time, passengers, luggage}` |
| `selectedTransfer` | Selected vehicle/provider | `{provider, vehicle, price, features}` |
| `transferBooking` | Complete booking data | `{search, selection, passenger, flight, pricing}` |

---

## Payment Integration

### BridgePay Module Integration

The payment page integrates with BridgePay for all transactions:

```javascript
// Payment flow
1. User selects payment method
2. Coupon validation (if code entered)
3. Price recalculation with discount
4. Payment processing
5. Confirmation data storage
6. Redirect to confirmation page
```

### Supported Payment Methods

#### Bridge Wallet
- Pre-funded wallet balance
- Instant payment
- Top-up via Mobile Money or Card
- Branded card display with "Bridge55" logo

#### Mobile Money
- M-Pesa (Kenya, Tanzania)
- MTN Mobile Money (Ghana, Uganda)
- Airtel Money (Multiple countries)
- Orange Money (West/Central Africa)

#### Credit/Debit Cards
- Visa
- Mastercard
- 3D Secure authentication

#### Bank Transfer
- Direct bank payment
- Reference number generation
- Manual confirmation

---

## Coupon & Discount System

### Valid Coupon Codes (Demo)

| Code | Type | Value | Description |
|------|------|-------|-------------|
| `BRIDGE10` | Percentage | 10% | Platform welcome offer |
| `SAVE20` | Percentage | 20% | Seasonal promotion |
| `FIRST15` | Percentage | 15% | First-time user |
| `FLAT5` | Fixed | $5 | Flat discount |

### Validation Rules

```javascript
const couponRules = {
  code: "BRIDGE10",
  type: "percent",
  value: 10,
  minOrderValue: 20,
  maxDiscount: 50,
  usageLimit: 1,
  validUntil: "2025-12-31"
};
```

### Discount Display in Confirmation

When a coupon is applied:
1. Promo row shows in Payment Details
2. Coupon code displayed as badge
3. Discount amount shown in green
4. Savings banner highlights total saved
5. Final price reflects discount

---

## Operator Integration

### BridgeBiz Connection

Operators manage their transfer services through BridgeBiz:

| Feature | Description |
|---------|-------------|
| **Vehicle Management** | Add/edit vehicles, photos, features |
| **Pricing** | Set base rates, surge pricing |
| **Availability** | Calendar-based availability |
| **Bookings** | View/manage incoming bookings |
| **Coupons** | Create operator-specific promos |
| **Analytics** | Performance dashboards |

### Operator Data in Booking Flow

```javascript
{
  operator: {
    id: "OPR-12345",
    name: "Kenya Safari Transfers",
    rating: 4.9,
    reviews: 456,
    verified: true,
    contact: {
      phone: "+254 700 123 456",
      email: "info@kenyasafaritransfers.com",
      whatsapp: "+254700123456"
    }
  }
}
```

---

## Data Models

### Transfer Search Request

```javascript
{
  pickup: {
    type: "airport", // airport, hotel, address
    code: "NBO",
    name: "Jomo Kenyatta International Airport",
    country: "KE"
  },
  dropoff: {
    type: "hotel",
    name: "Serena Hotel",
    address: "Kenyatta Avenue, Nairobi CBD"
  },
  datetime: {
    date: "2025-12-15",
    time: "10:30",
    timezone: "Africa/Nairobi"
  },
  passengers: 2,
  luggage: 2,
  transferType: "airport-pickup" // airport-pickup, airport-dropoff, round-trip
}
```

### Transfer Booking Object

```javascript
{
  bookingRef: "TRF-X8K2M9P4",
  transactionId: "TXN-1702656000",
  status: "confirmed",
  
  search: { /* search params */ },
  
  transfer: {
    provider: "Kenya Safari Transfers",
    vehicle: "Comfort SUV",
    features: ["wifi", "meet_greet", "child_seat"],
    duration: "35 min",
    distance: "25 km"
  },
  
  passenger: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+254 700 123 456",
    country: "KE"
  },
  
  flight: {
    number: "KQ 412",
    airline: "Kenya Airways",
    terminal: "1A"
  },
  
  pricing: {
    baseFare: 42.86,
    platformFee: 2.14,
    couponCode: "BRIDGE10",
    discount: 4.50,
    total: 40.50
  },
  
  payment: {
    method: "wallet",
    status: "confirmed",
    timestamp: "2025-12-15T08:00:00Z"
  }
}
```

---

## API Endpoints

### Planned API Structure

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/transfers/search` | POST | Search available transfers |
| `/api/transfers/{id}` | GET | Get transfer details |
| `/api/transfers/book` | POST | Create booking |
| `/api/transfers/booking/{ref}` | GET | Get booking details |
| `/api/transfers/booking/{ref}/cancel` | POST | Cancel booking |
| `/api/coupons/validate` | POST | Validate coupon code |
| `/api/operators/{id}` | GET | Get operator details |

---

## Testing Guide

### Manual Testing Checklist

#### Search Hub
- [ ] Select pickup location from dropdown
- [ ] Select drop-off location from dropdown
- [ ] Pick date using datetimepicker
- [ ] Select time using timepicker
- [ ] Adjust passengers (1-8)
- [ ] Adjust luggage (0-10)
- [ ] Click "Search Transfers"
- [ ] Verify redirect to search-results.html

#### Search Results
- [ ] Filter by price range
- [ ] Filter by vehicle type
- [ ] Filter by features
- [ ] Sort by price/rating
- [ ] Click "View Details" on a result
- [ ] Verify redirect to transfer-details.html

#### Transfer Details
- [ ] View vehicle information
- [ ] View provider details
- [ ] Edit date in summary (inline edit)
- [ ] Edit time in summary (inline edit)
- [ ] Adjust passengers (inline edit)
- [ ] Adjust luggage (inline edit)
- [ ] Verify sidebar is sticky on scroll
- [ ] Click "Continue to Book"

#### Booking Form
- [ ] Fill passenger information
- [ ] Add flight details
- [ ] Add special requests
- [ ] Verify form validation
- [ ] Verify sidebar is sticky
- [ ] Click "Continue to Payment"

#### Payment Page
- [ ] Select Bridge Wallet
- [ ] Verify "Bridge55" branding on card
- [ ] Enter coupon code
- [ ] Click Apply - verify discount
- [ ] Remove coupon - verify price reset
- [ ] Select Mobile Money
- [ ] Select Credit Card
- [ ] Verify sidebar is sticky
- [ ] Process payment

#### Confirmation Page
- [ ] Verify booking reference displayed
- [ ] Verify transfer details correct
- [ ] Verify passenger info correct
- [ ] Verify promo discount shown (if applied)
- [ ] Verify savings banner displayed
- [ ] Verify provider contact info
- [ ] Test print voucher
- [ ] Test download PDF
- [ ] Test share booking

### Test Coupon Codes

| Code | Expected Result |
|------|-----------------|
| `BRIDGE10` | 10% discount applied |
| `SAVE20` | 20% discount applied |
| `FIRST15` | 15% discount applied |
| `FLAT5` | $5 discount applied |
| `INVALID` | Error: Invalid code |
| `EXPIRED` | Error: Code expired |

---

## Changelog

### Version 1.0 (December 2025)
- ✅ Complete booking flow implemented
- ✅ All 5 pages functional
- ✅ Payment integration with 4 methods
- ✅ Coupon system with validation
- ✅ Discount display in confirmation
- ✅ Sticky sidebar on all pages
- ✅ Bridge55 branding on wallet card
- ✅ Editable summary fields
- ✅ Dynamic location selection
- ✅ Responsive design

---

## Support

For technical support or questions about the Transfers service:

- **Documentation:** This file
- **Architecture:** [BRIDGE55-MODULE-ARCHITECTURE.md](../BRIDGE55-MODULE-ARCHITECTURE.md)
- **Module:** BridgeMove
- **Status:** Production Ready

---

*© 2025 Bridge55 - Africa's Premier Travel Platform*














