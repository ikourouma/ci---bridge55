# 👤 User & Operator Dashboards Specification
## Bridge55 Phase 6 - Account Management & Partner Portals

**Version:** 1.0  
**Status:** 📋 Planned  
**Target:** Phase 6  
**Last Updated:** December 2025

---

## 📋 Overview

Phase 6 delivers comprehensive dashboard experiences for both travelers (User Dashboard) and business partners (Operator Dashboard), each with integrated BridgeWallet functionality.

---

## 👤 User Dashboard (Phase 6A)

### Sections

#### 1. My Profile
**File:** `dashboard/user/profile.html`

- Personal information
- Preferences (language, currency, notifications)
- Travel documents storage
- Loyalty tier display
- Account security settings

#### 2. BridgeWallet
**File:** `dashboard/user/wallet.html`

- Current balance
- Transaction history
- Top-up options
- Auto-reload settings
- Linked payment methods
- Cashback earnings
- Transfer to bank

#### 3. My Bookings
**File:** `dashboard/user/bookings.html`

- All reservations (Flights, Stays, Cars, Experiences)
- Filter by: Upcoming, Past, Cancelled
- Quick actions: View, Modify, Cancel
- Download tickets/vouchers
- Add to calendar

#### 4. My Trips
**File:** `dashboard/user/trips.html`

- Trip timeline view
- Itinerary management
- Share with companions
- Trip documents
- Expense tracking

#### 5. Wishlist
**File:** `dashboard/user/wishlist.html`

- Saved hotels
- Saved flights
- Saved experiences
- Price alerts
- Share lists

#### 6. Rewards & Loyalty
**File:** `dashboard/user/rewards.html`

- Points balance
- Tier status (Bronze, Silver, Gold, Platinum)
- Earning history
- Redemption options
- Partner benefits

#### 7. Travel Documents
**File:** `dashboard/user/documents.html`

- Passport storage
- Visa copies
- Vaccination records
- Travel insurance
- Frequent flyer numbers

---

## 🏢 Operator Dashboard (Phase 6B)

### Sections

#### 1. Partner Registration
**File:** `dashboard/operator/onboarding.html`

- Business verification
- Document upload
- Service setup
- Pricing configuration
- Contract acceptance

#### 2. Business BridgeWallet
**File:** `dashboard/operator/wallet.html`

- Revenue balance
- Payout history
- Scheduled payouts
- Transaction details
- Tax documents
- Multi-currency support

#### 3. Inventory Management
**File:** `dashboard/operator/inventory.html`

- Listing management
- Availability calendar
- Bulk updates
- Photo management
- Description editing

#### 4. Booking Management
**File:** `dashboard/operator/bookings.html`

- Incoming reservations
- Confirmation workflow
- Modification requests
- Cancellation handling
- Guest communication

#### 5. Pricing & Calendar
**File:** `dashboard/operator/pricing.html`

- Dynamic pricing rules
- Seasonal rates
- Special offers
- Blackout dates
- Minimum stay rules

#### 6. Revenue Analytics
**File:** `dashboard/operator/analytics.html`

- Revenue overview
- Booking trends
- Occupancy rates
- Performance metrics
- Competitor insights

#### 7. Team Management
**File:** `dashboard/operator/team.html`

- Staff accounts
- Role permissions
- Activity logs
- Access controls

#### 8. Customer Messages
**File:** `dashboard/operator/messages.html`

- Guest inbox
- Review responses
- Support tickets
- Automated replies

---

## 💳 BridgeWallet Features

### User Wallet
```
┌─────────────────────────────────────┐
│ 💳 BridgeWallet                     │
├─────────────────────────────────────┤
│ Balance: $1,247.50                  │
│ Cashback: $23.40 pending            │
├─────────────────────────────────────┤
│ [+ Top Up]  [↗ Transfer]  [History] │
├─────────────────────────────────────┤
│ Recent Transactions:                │
│ • Flight KQ430      -$420.00        │
│ • Cashback (2%)     +$8.40          │
│ • Top-up M-Pesa     +$500.00        │
└─────────────────────────────────────┘
```

### Business Wallet
```
┌─────────────────────────────────────┐
│ 🏢 Business BridgeWallet            │
├─────────────────────────────────────┤
│ Available: $12,450.00               │
│ Pending: $3,200.00                  │
│ Next payout: Dec 15 ($8,500)        │
├─────────────────────────────────────┤
│ [Request Payout]  [View Statement]  │
├─────────────────────────────────────┤
│ This Month:                         │
│ • Bookings: 47                      │
│ • Revenue: $15,650.00               │
│ • Fees: -$782.50                    │
└─────────────────────────────────────┘
```

---

## 🎨 UI/UX Guidelines

### Dashboard Layout
```
┌─────────────────────────────────────────────┐
│ Bridge55 Logo    🔔 Notifications  👤 John  │
├──────────┬──────────────────────────────────┤
│ Sidebar  │                                  │
│ ───────  │   Main Content Area              │
│ 📊 Home  │                                  │
│ 👤 Profile│                                  │
│ 💳 Wallet│   Cards, Tables, Charts          │
│ 📅 Bookings                                 │
│ ✈️ Trips │                                  │
│ ❤️ Wishlist                                 │
│ 🏆 Rewards│                                  │
│ 📄 Docs  │                                  │
├──────────┴──────────────────────────────────┤
│ Footer: Help • Terms • Privacy • © 2025    │
└─────────────────────────────────────────────┘
```

### Mobile Navigation
- Bottom tab bar for main sections
- Hamburger menu for secondary
- Swipe gestures for quick actions

---

## 🔐 Security Features

### User Dashboard
- 2FA authentication
- Session management
- Login history
- Device management
- Data export (GDPR)

### Operator Dashboard
- Role-based access control
- IP whitelisting
- Audit logs
- API key management
- PCI compliance

---

## 📈 Success Metrics

### User Dashboard
- Daily active users: 40%+
- Wallet adoption: 60%+
- Repeat booking rate: 45%+

### Operator Dashboard
- Partner satisfaction: 4.5+ stars
- Booking acceptance rate: 95%+
- Average response time: <2 hours

---

## 🗓️ Implementation Timeline

### Phase 6A (User Dashboard)
| Week | Tasks |
|------|-------|
| 1 | Profile + Wallet |
| 2 | Bookings + Trips |
| 3 | Wishlist + Rewards |
| 4 | Documents + Settings |

### Phase 6B (Operator Dashboard)
| Week | Tasks |
|------|-------|
| 5 | Onboarding + Wallet |
| 6 | Inventory + Bookings |
| 7 | Pricing + Analytics |
| 8 | Team + Messages |

---

## 📞 Support

For specification questions:
- Product: product@bridge55.com
- Engineering: dev@bridge55.com
















