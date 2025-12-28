# Bridge55 Cars Payment System Specification

## Overview
The Cars payment system follows the same consistent payment flow as Flights and Stays services across the Bridge55 platform. All payment methods are available for car rentals with the same UI/UX patterns.

## Payment Methods

### 1. Bridge Wallet (Recommended)
- **Priority**: Always displayed first as the recommended option
- **Features**:
  - Instant payment with no fees
  - 2% cashback on all car rentals
  - Virtual VISA card display
  - Real-time balance check
  - Top-up functionality with multiple funding options
- **Top-up Methods**:
  - M-Pesa
  - MTN MoMo
  - Airtel Money
  - Orange Money
  - Credit/Debit Card
  - Bank Transfer

### 2. Mobile Money (Grouped)
All mobile money operators are grouped under a single "Mobile Money" option for better UX:

#### M-Pesa
- **Countries**: Kenya 🇰🇪, Tanzania 🇹🇿
- **Process**: STK Push (instant)
- **Fields**: Country selector, Phone number

#### MTN MoMo
- **Countries**: Ghana 🇬🇭, Uganda 🇺🇬, Rwanda 🇷🇼, Cameroon 🇨🇲
- **Process**: STK Push (instant)
- **Fields**: Country selector, Phone number

#### Airtel Money
- **Countries**: Kenya 🇰🇪, Uganda 🇺🇬, Tanzania 🇹🇿, Zambia 🇿🇲
- **Process**: STK Push (instant)
- **Fields**: Country selector, Phone number

#### Orange Money
- **Countries**: Côte d'Ivoire 🇨🇮, Senegal 🇸🇳, Mali 🇲🇱, Burkina Faso 🇧🇫
- **Process**: STK Push (instant)
- **Fields**: Country selector, Phone number

### 3. Credit/Debit Card
- **Supported Cards**: Visa, Mastercard, Amex
- **Security**: 3D Secure protected
- **Fields**:
  - Card Number (16 digits)
  - Expiry Date (MM/YY)
  - CVV (3-4 digits)
  - Cardholder Name
  - Save card option (tokenization)

### 4. Bank Transfer
Two transfer types available:

#### African Banks (Local Transfer)
- **Processing Time**: 2-3 business days
- **Fee**: Free
- **Banks Supported**:
  - Kenya: KCB, Equity, Co-op, Absa
  - Ghana: GCB, Ecobank, Stanbic
  - Nigeria: Zenith, GTBank, First Bank
  - South Africa: Standard Bank, Absa, FNB
- **Fields**: Bank Name, Account Type, Account Holder, Account Number, Branch

#### International Wire Transfer
- **Processing Time**: 3-5 business days
- **Fee**: $15
- **Fields**: Bank Name, SWIFT/BIC Code, Account Number, IBAN, Account Holder

## Pricing Structure

### Car Rental Pricing
```
Base Rate (per day) × Number of Days
+ Insurance
+ Add-ons
+ Platform Fee (5%)
+ Taxes (15%)
= Total Amount
```

### Platform Fee
- 5% of subtotal (base + insurance + add-ons)
- Automatically calculated and displayed

## Confirmation Page Structure

Based on industry best practices, the confirmation page includes:

### 1. Vehicle Header
- Vehicle image
- Vehicle name and category
- Pickup location
- Rating and reviews
- Booking status badge

### 2. Booking Info
- Ride type (same drop-off / different drop-off)
- From/To locations
- Number of days
- Departure date & time
- Return date & time
- Number of travellers
- Booking date

### 3. Extra Service Info
- Airport Pickup
- Full Insurance
- Unlimited Mileage
- Other add-ons

### 4. Billing Info
- Name
- Email
- Phone
- Address

### 5. Order Info
- Order ID
- Payment Method
- Payment Status
- Date of Payment
- Tax breakdown
- Platform fee
- Insurance amount
- Total Paid

### 6. Actions
- Print Voucher
- Download PDF
- Email
- Share
- Modify Booking

### 7. Help Card
- Business logo and name
- Phone number
- Email
- Call button
- WhatsApp button

## Security Features

- 256-bit SSL encryption
- PCI DSS compliant
- 3D Secure for card payments
- MFA for wallet transactions
- Secure tokenization for saved cards

## API Integration Points

### Payment Processors
- **Flutterwave**: Primary payment gateway for Africa
- **Paystack**: Secondary gateway for Nigeria/Ghana
- **Visa Cybersource**: International card processing
- **MTN MoMo API**: Direct integration
- **M-Pesa Daraja API**: Safaricom integration
- **Airtel Money API**: Direct integration
- **Orange Money API**: West Africa integration

## Consistency Checklist

✅ Bridge Wallet displayed first with RECOMMENDED badge
✅ Mobile Money operators grouped under single option
✅ All payment forms have consistent styling
✅ Country selectors for mobile money
✅ Bank transfer with African/International options
✅ Security badges displayed
✅ Help card with business info
✅ Call and WhatsApp buttons

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Dec 2025 | Initial implementation |
| 1.1 | Dec 2025 | Aligned with Flights/Stays payment flow |
| 1.2 | Dec 2025 | Enhanced confirmation page with detailed sections |
















