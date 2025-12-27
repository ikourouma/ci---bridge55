# 🎯 **BOOKING PAGE - IATA STANDARDS IMPLEMENTATION**

**Date**: November 30, 2025  
**Task**: Upgrade booking page with IATA pricing, passport validation, eVisa, age-based logic  
**Status**: In Progress 🚀

---

## 📋 **IMPLEMENTATION CHECKLIST**

### **1. IATA Standard Pricing** ✈️

**Age Brackets (IATA Standard):**
```javascript
INFANT (INF): 0-23 months
├─ Lap child: 10% of adult fare
└─ With seat: 50% of adult fare

CHILD (CHD): 2-11 years  
└─ With seat: 75% of adult fare

ADULT (ADT): 12+ years
└─ With seat: 100% of adult fare
```

**Implementation:**
- ✅ Calculate age from DOB
- ✅ Auto-assign passenger type
- ✅ Apply IATA pricing percentages
- ✅ Update total price dynamically

---

### **2. Enhanced Passenger Form Fields** 📝

**NEW FIELDS:**
```
BASIC INFO:
├─ Title
├─ First Name
├─ Last Name
├─ Date of Birth ← Calculate age & type
├─ Gender

PASSPORT INFO:
├─ Passport Number
├─ Issue Date ← NEW
├─ Expiry Date ← NEW (validate 6+ months)
└─ Nationality

INFANT OPTIONS (if 0-23 months):
├─ ○ Lap child (10% fare)
└─ ○ Purchase seat (50% fare)

eVISA (if required):
└─ ☑ Apply for eVisa to [Destination]
```

---

### **3. Passport Validation Logic** 🛂

**Rules:**
```javascript
1. Expiry Date Check:
   - Must be at least 6 months from travel date
   - Warning if < 6 months: "May not be valid"
   - Error if expired: "Passport expired"

2. Issue Date Check:
   - Cannot be in the future
   - Must be before expiry date

3. Visual Indicators:
   ✅ Valid for 2+ years: Green checkmark
   ⚠️ Expires in 6-12 months: Yellow warning
   ❌ Expires < 6 months or expired: Red error
```

**Example:**
```
Travel Date: Jan 15, 2024
Passport Expiry: Mar 10, 2024 (< 6 months)

⚠️ Your passport expires in 2 months. Many countries 
   require 6 months validity. Please renew before travel.
```

---

### **4. Age Calculation & Validation** 👶👧👨

**Auto-Calculate from DOB:**
```javascript
function calculateAge(dob, travelDate) {
    const age = Math.floor((travelDate - dob) / 31557600000);
    
    if (age < 2) return { type: 'INFANT', age, display: `${age} months` };
    if (age < 12) return { type: 'CHILD', age, display: `${age} years` };
    return { type: 'ADULT', age, display: `${age} years` };
}
```

**Display:**
```
Before DOB entered:
[1] Passenger 1

After DOB entered (1990-05-15):
[1] Passenger 1 (Adult, 34 years)

After DOB entered (2015-03-20):
[2] Passenger 2 (Child, 9 years)

After DOB entered (2023-06-10):
[3] Passenger 3 (Infant, 7 months)
```

---

### **5. Age Validation Modal** ⚠️

**Scenario 1: DOB doesn't match search params**

User searched for: 1 Adult, 1 Child  
User entered DOB for "Passenger 2" (expected Child): 1990-05-15 (Adult)

```html
┌──────────────────────────────────────────┐
│ ⚠️ Age Mismatch Detected                 │
├──────────────────────────────────────────┤
│ You selected 1 Child in your search, but│
│ the DOB entered (1990-05-15) indicates  │
│ this passenger is 34 years old (Adult). │
│                                          │
│ What would you like to do?               │
│                                          │
│ Pricing will change:                     │
│ • Child (75%): $315                      │
│ • Adult (100%): $420                     │
│ • Difference: +$105                      │
│                                          │
│ [ Change to Adult ] [ Re-enter DOB ]     │
└──────────────────────────────────────────┘
```

**Scenario 2: Infant too old**

```html
┌──────────────────────────────────────────┐
│ ❌ Infant Age Restriction                │
├──────────────────────────────────────────┤
│ This passenger (3 years old) is too old │
│ to be classified as an Infant.          │
│                                          │
│ Infants must be under 2 years (23       │
│ months) on the date of travel.          │
│                                          │
│ Please change traveler type to Child.   │
│                                          │
│ Pricing will update:                     │
│ • Infant (10%): $42                      │
│ • Child (75%): $315                      │
│ • Difference: +$273                      │
│                                          │
│ [ Change to Child ]                      │
└──────────────────────────────────────────┘
```

---

### **6. Infant Seat Option** 👶💺

**UI Design:**
```html
┌──────────────────────────────────────────┐
│ [3] Passenger 3 (Infant, 8 months)       │
├──────────────────────────────────────────┤
│ ... basic info & passport ...            │
│                                          │
│ SEATING OPTION FOR INFANT                │
│ ┌────────────────────────────────────┐  │
│ │ ○ Lap child (No seat)              │  │
│ │   FREE (10% of adult fare: $42)    │  │
│ │                                    │  │
│ │   Infant sits on your lap during   │  │
│ │   the flight. No separate seat.    │  │
│ └────────────────────────────────────┘  │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ ● Purchase seat for infant         │  │
│ │   +$168 (50% of adult fare)        │  │
│ │                                    │  │
│ │   Infant gets their own seat with  │  │
│ │   car seat/harness. Recommended    │  │
│ │   for safety & comfort.            │  │
│ └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

**Logic:**
```javascript
Infant pricing:
├─ Lap child (default): Base × 10% = $42
└─ With seat (optional): Base × 50% = $210

Seat requirements:
├─ Lap child: No seat needed
└─ With seat: Must select seat on seat map
```

---

### **7. eVisa Auto-Detection** 🌍

**Rules Engine:**
```javascript
const visaRules = {
    // Ghana eVisa
    'GH': {
        required: ['US', 'UK', 'CA', 'AU', 'CN', 'IN', 'BR'],
        exempt: ['KE', 'NG', 'ZA', 'ECOWAS'], // West African neighbors
        type: 'eVisa',
        processingDays: '3-5',
        fee: 75
    },
    // Kenya eVisa
    'KE': {
        required: ['US', 'UK', 'CA', 'AU', 'CN', 'IN', 'BR', 'GH'],
        exempt: ['EAC'], // East African Community
        type: 'eVisa',
        processingDays: '2-3',
        fee: 51
    },
    // ... more countries
};

function checkVisaRequirement(nationality, destination) {
    const rules = visaRules[destination];
    if (!rules) return { required: false };
    
    if (rules.exempt.includes(nationality)) {
        return { required: false, reason: 'Regional agreement' };
    }
    
    if (rules.required.includes(nationality)) {
        return {
            required: true,
            type: rules.type,
            fee: rules.fee,
            processing: rules.processingDays
        };
    }
    
    return { required: false };
}
```

**UI Display:**
```html
┌──────────────────────────────────────────┐
│ TRAVEL AUTHORIZATION                      │
├──────────────────────────────────────────┤
│ ✓ Visa required for Ghana                │
│                                          │
│ Based on your nationality (Kenya), you  │
│ require an eVisa to enter Ghana.        │
│                                          │
│ ☑ Apply for eVisa to Ghana               │
│                                          │
│ Processing: 3-5 business days            │
│ Fee: $75 per person                      │
│ Total: $75 (added to booking total)     │
│                                          │
│ We'll submit your application after      │
│ booking confirmation using the passport  │
│ details provided above.                  │
│                                          │
│ [ Learn more about Ghana eVisa → ]      │
└──────────────────────────────────────────┘

OR (if exempt):

┌──────────────────────────────────────────┐
│ TRAVEL AUTHORIZATION                      │
├──────────────────────────────────────────┤
│ ✓ No visa required                       │
│                                          │
│ As a Kenyan citizen, you can enter      │
│ Rwanda visa-free under the East African │
│ Community (EAC) agreement.               │
│                                          │
│ Required documents:                       │
│ • Valid passport (6 months validity)     │
│ • Proof of accommodation                 │
│ • Return flight ticket                   │
└──────────────────────────────────────────┘
```

---

### **8. Dynamic Seat Requirements** 💺

**Logic:**
```javascript
Calculate required seats:

Adults: All need seats
Children: All need seats  
Infants (lap): No seats
Infants (with seat): Need seats

Example 1:
- 2 Adults
- 1 Child
- 1 Infant (lap)
= 3 seats required

Example 2:
- 1 Adult
- 0 Children
- 2 Infants (both with seats)
= 3 seats required

Example 3:
- 1 Adult
- 1 Child
- 1 Infant (lap)
- 1 Infant (with seat)
= 3 seats required
```

**Seat Map Display:**
```
Select 3 seats for:
• Passenger 1 (Adult, 34 years)
• Passenger 2 (Child, 9 years)
• Passenger 4 (Infant with seat, 8 months)

Passenger 3 (Infant lap, 8 months) - No seat required
```

---

### **9. Dynamic Price Calculation** 💰

**Formula:**
```javascript
BASE_FARE = $420

For each passenger:
  If (ADULT):     fare = BASE_FARE × 100% = $420
  If (CHILD):     fare = BASE_FARE × 75%  = $315
  If (INFANT lap): fare = BASE_FARE × 10%  = $42
  If (INFANT seat): fare = BASE_FARE × 50%  = $210

TAXES (per passenger):
  ADULT:  $80
  CHILD:  $60 (75% of adult tax)
  INFANT: $8  (10% of adult tax)

SEAT_FEES:
  Extra legroom: +$25 per seat (if selected)
  Infant seat: Included in 50% fare

eVISA_FEES:
  If checkbox checked: +$75 per passenger

EXTRAS:
  Extra baggage: +$45
  Insurance: +$28
  Priority boarding: +$15
  Lounge access: +$35

TOTAL = Sum(Passenger Fares) + Sum(Taxes) + Seat Fees + eVisa Fees + Extras
```

**Example Calculation:**
```
Passengers:
1. Adult (34 years):          $420 + $80 = $500
2. Child (9 years):           $315 + $60 = $375
3. Infant lap (8 months):     $42  + $8  = $50

Seat Selection:
- 2 extra legroom seats:      2 × $25 = $50

eVisa (Ghana):
- 3 passengers:               3 × $75 = $225

Extras:
- Travel insurance:           $28
- Lounge access:              $35

SUBTOTAL:                     $500 + $375 + $50 = $925
SEAT FEES:                    $50
eVISA FEES:                   $225
EXTRAS:                       $63
─────────────────────────────
GRAND TOTAL:                  $1,263
```

---

### **10. Price Summary Card Updates** 📊

**Enhanced Display:**
```html
┌──────────────────────────────────────────┐
│ 📄 Price Summary                          │
├──────────────────────────────────────────┤
│ BASE FARES                                │
│ • Adult (34 years)           $420         │
│ • Child (9 years)            $315         │
│ • Infant (lap, 8 months)     $42          │
│                              ────         │
│ Subtotal                     $777         │
│                                           │
│ TAXES & FEES                              │
│ • Adult tax                  $80          │
│ • Child tax                  $60          │
│ • Infant tax                 $8           │
│                              ────         │
│ Subtotal                     $148         │
│                                           │
│ SEAT SELECTION                            │
│ • 2 × Extra legroom          $50          │
│                                           │
│ eVISA APPLICATIONS                        │
│ • 3 × Ghana eVisa            $225         │
│                                           │
│ ADD-ONS & EXTRAS                          │
│ • Travel insurance           $28          │
│ • Lounge access              $35          │
│                              ────         │
│ Subtotal                     $63          │
├──────────────────────────────────────────┤
│ TOTAL                        $1,263       │
├──────────────────────────────────────────┤
│ [ Continue to Payment → ]                 │
│                                           │
│ 🔒 Secure • Free cancel 24h               │
└──────────────────────────────────────────┘
```

---

## 🔧 **TECHNICAL IMPLEMENTATION**

### **JavaScript Functions:**

```javascript
// 1. Calculate age from DOB
function calculateAge(dob, travelDate = new Date('2024-01-15')) {
    const diff = travelDate - new Date(dob);
    const ageInYears = Math.floor(diff / 31557600000); // milliseconds in year
    const ageInMonths = Math.floor(diff / 2629800000); // milliseconds in month
    
    if (ageInMonths < 24) {
        return { 
            type: 'INFANT', 
            years: 0,
            months: ageInMonths,
            display: `${ageInMonths} months`,
            priceMultiplier: 0.10 // lap child default
        };
    } else if (ageInYears < 12) {
        return { 
            type: 'CHILD', 
            years: ageInYears,
            months: 0,
            display: `${ageInYears} years`,
            priceMultiplier: 0.75
        };
    } else {
        return { 
            type: 'ADULT', 
            years: ageInYears,
            months: 0,
            display: `${ageInYears} years`,
            priceMultiplier: 1.00
        };
    }
}

// 2. Validate passport expiry
function validatePassport(expiryDate, travelDate = new Date('2024-01-15')) {
    const expiry = new Date(expiryDate);
    const sixMonthsLater = new Date(travelDate);
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
    
    const monthsUntilExpiry = Math.floor((expiry - travelDate) / 2629800000);
    
    if (expiry < travelDate) {
        return {
            valid: false,
            status: 'expired',
            message: '❌ Passport expired. Please renew before booking.',
            icon: '❌',
            color: '#dc3545'
        };
    } else if (expiry < sixMonthsLater) {
        return {
            valid: false,
            status: 'warning',
            message: `⚠️ Expires in ${monthsUntilExpiry} months. Many countries require 6 months validity.`,
            icon: '⚠️',
            color: '#ffc107'
        };
    } else {
        return {
            valid: true,
            status: 'valid',
            message: `✅ Valid for ${monthsUntilExpiry} months`,
            icon: '✅',
            color: '#28a745'
        };
    }
}

// 3. Check visa requirement
function checkVisaRequirement(nationality, destination) {
    const visaRules = {
        'GH': {
            required: ['US', 'UK', 'CA', 'AU'],
            exempt: ['KE', 'NG', 'ECOWAS'],
            fee: 75,
            processing: '3-5 business days'
        },
        // ... more
    };
    
    const rules = visaRules[destination];
    if (!rules) return { required: false };
    
    if (rules.exempt.includes(nationality)) {
        return { required: false, exempt: true };
    }
    
    return {
        required: rules.required.includes(nationality),
        fee: rules.fee,
        processing: rules.processing
    };
}

// 4. Calculate total price
function calculateTotalPrice() {
    let total = 0;
    const passengers = getAllPassengers();
    
    // Base fares
    passengers.forEach(p => {
        const age = calculateAge(p.dob);
        let multiplier = age.priceMultiplier;
        
        // If infant with seat, use 50% instead of 10%
        if (age.type === 'INFANT' && p.infantSeatOption === 'with-seat') {
            multiplier = 0.50;
        }
        
        total += BASE_FARE * multiplier;
        total += TAXES_PER_PASSENGER * multiplier;
    });
    
    // Seat fees
    total += selectedSeats.filter(s => s.extraLegroom).length * 25;
    
    // eVisa fees
    const visaCount = passengers.filter(p => p.applyForVisa).length;
    total += visaCount * 75;
    
    // Extras
    if (document.getElementById('extra-baggage').checked) total += 45;
    if (document.getElementById('travel-insurance').checked) total += 28;
    if (document.getElementById('priority-boarding').checked) total += 15;
    if (document.getElementById('lounge-access').checked) total += 35;
    
    return total;
}
```

---

## 🎨 **UI/UX ENHANCEMENTS**

### **Visual Indicators:**

```css
/* Age badge */
.age-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
    margin-left: 0.5rem;
}

.age-badge.adult {
    background: #e7f3ff;
    color: #0066cc;
}

.age-badge.child {
    background: #fff3cd;
    color: #856404;
}

.age-badge.infant {
    background: #d4edda;
    color: #155724;
}

/* Passport validity */
.passport-status {
    padding: 0.75rem;
    border-radius: 8px;
    margin-top: 0.5rem;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.passport-status.valid {
    background: #d4edda;
    border: 1px solid #c3e6cb;
    color: #155724;
}

.passport-status.warning {
    background: #fff3cd;
    border: 1px solid #ffeaa7;
    color: #856404;
}

.passport-status.expired {
    background: #f8d7da;
    border: 1px solid #f5c6cb;
    color: #721c24;
}
```

---

## ✅ **TESTING CHECKLIST**

### **Age Calculation:**
- [ ] Enter DOB 1990-05-15 → Shows "Adult, 34 years"
- [ ] Enter DOB 2015-03-20 → Shows "Child, 9 years"
- [ ] Enter DOB 2023-06-10 → Shows "Infant, 7 months"
- [ ] Pricing updates correctly (100%, 75%, 10%)

### **Passport Validation:**
- [ ] Expiry in 2 years → Green "Valid"
- [ ] Expiry in 4 months → Yellow "Warning"
- [ ] Expiry in past → Red "Expired"
- [ ] Issue date after expiry → Error

### **Infant Seat Option:**
- [ ] Infant passenger → Shows seat option
- [ ] Select "Lap child" → 10% pricing
- [ ] Select "With seat" → 50% pricing
- [ ] Seat map requires seat only if "with seat" selected

### **eVisa Detection:**
- [ ] KE → GH → Shows "Visa required"
- [ ] KE → RW → Shows "No visa required (EAC)"
- [ ] Checkbox adds $75 per passenger
- [ ] Total updates correctly

### **Age Validation:**
- [ ] Search: 1 Adult, enter child DOB → Modal shows
- [ ] Modal offers "Change to Child" or "Re-enter DOB"
- [ ] Selecting "Change to Child" → Updates type & pricing

### **Price Summary:**
- [ ] Shows breakdown by passenger type
- [ ] Shows age-adjusted taxes
- [ ] Shows eVisa fees (if checked)
- [ ] Grand total correct

---

## 🚀 **DEPLOYMENT**

**Files to Update:**
1. ✅ `flights/booking-ENHANCED.html` (main file)
2. ⏳ `bridge55-search-hub-FINAL.html` (add traveler picker)
3. ⏳ `flights/search-results-list-ENHANCED.html` (pass params)
4. ⏳ `flights/flight-details-ENHANCED.html` (pass params)

**Backup Created:**
✅ `flights/booking-ENHANCED-BACKUP.html`

---

**Ready to implement!** 🎉
















