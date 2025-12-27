# 🏨 Stays Service Documentation
## Bridge55 Hotel & Accommodation Booking System

**Version:** 1.0  
**Status:** ✅ Complete  
**Last Updated:** December 2025

---

## 📋 Overview

The Stays service provides comprehensive hotel and accommodation booking for African destinations, featuring luxury hotels, safari lodges, boutique properties, and eco-lodges.

---

## 🗂️ Page Structure

### 1. Search Results (List View)
**File:** `stays/search-results-list.html`

**Features:**
- Dynamic hotel filtering
- Ion RangeSlider for price ($100-$4000/night)
- Star rating filter (2-5 stars)
- Guest rating filter (7+, 8+, 9+)
- Property type filter (Hotels, Lodges, Apartments)
- Amenities filter (WiFi, Pool, Spa, etc.)
- Location filter by neighborhood
- Sort by: Recommended, Price, Rating

### 2. Search Results (Grid View)
**File:** `stays/search-results-grid.html`

**Features:**
- Visual card layout
- Quick view hover effects
- Toggle between list/grid views
- Mobile-responsive masonry grid

### 3. Hotel Details
**File:** `stays/hotel-details.html`

**Features:**
- Photo gallery with lightbox
- Room type selection with dynamic pricing
- Amenities showcase
- Guest reviews with ratings breakdown
- Location map placeholder
- Dynamic booking sidebar
- Check-in/Check-out date pickers
- Guest/Room selector
- Real-time price calculation
- Save to Wishlist functionality

### 4. Guest Booking
**File:** `stays/booking.html`

**Features:**
- Guest information form
- Special requests section
- Arrival time selection
- Airport pickup interest
- Dynamic price summary from sessionStorage
- Terms & conditions acceptance

### 5. Payment
**File:** `stays/payment.html`

**Features:**
- Consistent payment methods (same as Flights)
- Hotel-specific booking summary
- Bridge Wallet recommended
- Mobile Money options
- Card payments
- Bank transfers

### 6. Confirmation
**File:** `stays/confirmation.html`

**Features:**
- Booking voucher display
- Hotel contact information
- Check-in instructions
- Modification options
- FAQ section
- Share/Email/Print options

---

## 💰 Pricing System

### Dynamic Price Calculation
```javascript
subtotal = pricePerNight × nights × rooms
taxes = subtotal × 0.15 (15%)
discount = subtotal × 0.10 (Bridge55 member)
total = subtotal + taxes - discount
```

### Room Types (Example: Hemingways Nairobi)
| Room Type | Price/Night | Max Guests |
|-----------|-------------|------------|
| Deluxe Garden View | $285 | 2 |
| Executive Suite | $425 | 3 |
| Presidential Suite | $695 | 4 |

---

## 🎨 Design System

### Property Cards
- 16px border-radius
- Hover elevation effect
- Favorite heart icon
- Rating badge overlay
- Price per night display

### Booking Sidebar
- Sticky positioning
- Date selection
- Guest selector
- Real-time price updates
- Trust badges

---

## 🔌 API Integration Points

### Hotel Data
- **Primary:** RateHawk B2B API
- **Secondary:** Expedia Affiliate API
- **Reviews:** TripAdvisor API

### African-Specific
- Safari Bookings API
- Jumia Travel API
- Local tourism board integrations

---

## 📱 Mobile Considerations

- Full-width photo gallery
- Collapsible room cards
- Bottom sheet for booking
- Swipe gestures for photos
- Sticky book button

---

## 🧪 Testing Checklist

- [ ] Search → Results navigation
- [ ] All filters functional
- [ ] Price range slider ($100-$4000)
- [ ] Room selection updates sidebar
- [ ] Date picker functionality
- [ ] Guest/Room selector
- [ ] Book Now → Booking page
- [ ] Price transfers to booking page
- [ ] Continue to Payment → Payment page
- [ ] Complete Payment → Confirmation
- [ ] Voucher display

---

## 📈 Future Enhancements

1. Map view with property pins
2. Virtual tours / 360° photos
3. Price comparison across dates
4. Last-minute deals section
5. Package bundling with flights
6. Loyalty points earning

---

## 📞 Support

For technical issues:
- Email: dev@bridge55.com
- Slack: #stays-service
















