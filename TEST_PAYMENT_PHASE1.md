# 🧪 **QUICK TEST GUIDE - PAYMENT PHASE 1**

**File**: `flights/payment-PHASE1-COMPLETE.html`  
**Time**: 5 minutes  
**Status**: Ready to test!

---

## 🎯 **5-MINUTE QUICK TEST**

### **Test 1: M-Pesa Payment (2 min)**

1. Open `flights/payment-PHASE1-COMPLETE.html` in browser
2. Scroll to M-Pesa section
3. Click to expand
4. Select country code: **+254 (Kenya)**
5. Enter phone: **712345678**
6. Wait for "Account Verified" badge
7. Click **"Pay KES 125,000 ($948) via M-Pesa"** button
8. ✅ See loading spinner (1 sec)
9. ✅ MFA modal opens
10. ✅ SMS option pre-selected
11. Click **"Send Verification Code"**
12. ✅ See OTP input screen
13. ✅ Green toast: "Code sent to +254 712 345 678"
14. Enter: **123456** (any 6 digits work)
15. ✅ Auto-focus between inputs
16. ✅ "Verify & Continue" button enables
17. Click **"Verify & Continue"**
18. ✅ See success checkmark animation
19. ✅ Progress bar fills (0% → 100%)
20. ✅ Alert: "M-Pesa STK Push sent!"
21. ✅ Alert: "Payment Successful!"

**Expected Result**: Complete flow with MFA ✅

---

### **Test 2: Card Payment (1.5 min)**

1. Scroll to **Credit/Debit Card** section
2. Click to expand
3. Enter card number: **4111 1111 1111 1111**
4. Expiry: **12/25**
5. CVV: **123**
6. Name: **John Doe**
7. Click **"Pay $948 via Card"** button
8. ✅ Modal opens
9. Select **Email Verification**
10. Click **"Send Verification Code"**
11. ✅ Destination shows: "j***@gmail.com"
12. Enter: **654321**
13. Click **"Verify & Continue"**
14. ✅ Success animation
15. ✅ Alert: "Card payment processing..."
16. ✅ Alert: "Payment Successful!"

**Expected Result**: Email MFA flow works ✅

---

### **Test 3: OTP Features (1 min)**

1. Click any payment submit button
2. Open MFA modal
3. Send code
4. **Test Auto-Focus**:
   - Type **1** in first box
   - ✅ Cursor moves to box 2
   - Type **2**, then **3**, etc.
   - ✅ Auto-focuses through all 6

5. **Test Backspace**:
   - Clear last digit
   - Press backspace
   - ✅ Moves to previous box

6. **Test Paste**:
   - Copy: **123456**
   - Click first box
   - Paste (Ctrl+V)
   - ✅ All 6 boxes fill
   - ✅ Verify button enables

7. **Test Resend Timer**:
   - ✅ Shows "in 0:45"
   - ✅ Counts down to 0:00
   - ✅ "Resend" link enables
   - Click "Resend"
   - ✅ Toast: "New code sent!"
   - ✅ Timer resets to 0:45

**Expected Result**: All OTP features work ✅

---

### **Test 4: Modal Interactions (30 sec)**

1. Open MFA modal
2. Click **backdrop** (dark area)
   - ✅ Modal closes
3. Reopen modal
4. Click **X button**
   - ✅ Modal closes
5. Reopen modal
6. Enter OTP: **123456**
7. Close modal
8. Reopen modal
   - ✅ OTP fields are empty (reset)
   - ✅ Back to step 1

**Expected Result**: Modal resets properly ✅

---

## ✅ **WHAT TO VERIFY**

### **Visual**
- [ ] Submit buttons have Bridge55 orange (#FF6B35)
- [ ] Hover effects work (darker orange + shadow)
- [ ] Loading spinner is white & centered
- [ ] Modal has blur backdrop
- [ ] OTP inputs have orange border on focus
- [ ] Success checkmark is green
- [ ] Progress bar is orange

### **Functional**
- [ ] All 6 submit buttons work
- [ ] MFA modal opens/closes smoothly
- [ ] SMS/Email selection works
- [ ] OTP auto-focus works
- [ ] OTP paste works
- [ ] Resend timer counts down
- [ ] Verify button enables at 6 digits
- [ ] Success animation plays
- [ ] Payment alerts show

### **Mobile** (Optional)
- [ ] Open on phone/tablet
- [ ] Modal fits screen
- [ ] OTP inputs are tap-friendly
- [ ] Toast notifications visible

---

## 🐛 **IF SOMETHING BREAKS**

### **Submit button doesn't work**
- Check browser console (F12)
- Ensure JavaScript loaded
- Try different payment method

### **Modal doesn't open**
- Refresh page
- Check console for errors
- Ensure Bootstrap CSS loaded

### **OTP doesn't auto-focus**
- Check if JavaScript ran
- Try typing manually
- Refresh and retry

### **Resend timer stuck**
- Check console
- Refresh page
- Timer should auto-start

---

## 📸 **DEMO SCREENSHOTS** (Optional)

Take screenshots for investors:
1. M-Pesa submit button
2. MFA modal - Step 1 (method selection)
3. MFA modal - Step 2 (OTP input)
4. MFA modal - Step 3 (success)
5. Payment success alert

---

## 🎯 **SUCCESS CRITERIA**

✅ **PASS** if:
- All 6 submit buttons work
- MFA modal opens & closes
- OTP can be entered
- Payment completes with success message

❌ **FAIL** if:
- Buttons don't respond
- Modal doesn't open
- OTP doesn't work
- No success message

---

## 🚀 **NEXT STEPS AFTER TESTING**

If all tests pass:
1. ✅ Mark Phase 1 complete
2. 🔄 Move to Phase 2 (Top-Up Modal)
3. 📧 Share demo with investors

If tests fail:
1. Document the issue
2. Share console errors
3. I'll fix immediately

---

**Ready to test? Open the file and start with Test 1!** 🎉

**File**: `flights/payment-PHASE1-COMPLETE.html`

















