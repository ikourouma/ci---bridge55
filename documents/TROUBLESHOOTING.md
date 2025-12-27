# 🔧 BRIDGE55 - TROUBLESHOOTING GUIDE

## ✅ COMMON ISSUES & FIXES

### **Issue 1: "No routes matched location /ai-planner"**
**Error:** `No routes matched location "/ai-planner"`

**Cause:** Route path mismatch

**Fix:** ✅ Already fixed!
- Changed all `/ai-planner` links to `/ai-trip-planner`
- Route is defined as `/ai-trip-planner` in main.tsx

**Files Updated:**
- `src/App.tsx` - All 5 links corrected

**Test:**
1. Click "Plan My Trip" button
2. Should navigate to AI chat page
3. No error in console

---

### **Issue 2: Browser Extension Error**
**Error:** `TypeError: can't access property "control", t is undefined`
**Location:** `content_script.js`

**Cause:** Browser extension (not our code)

**Fix:** **IGNORE THIS ERROR**
- This is from a browser extension
- Not related to Bridge55 code
- Does not affect functionality
- Common with ad blockers, password managers, etc.

**Optional Fix:**
- Disable browser extensions temporarily
- Test in Incognito mode
- Use different browser

---

### **Issue 3: Blank Page on Load**
**Symptoms:**
- White screen
- Nothing loads
- Console errors

**Fixes:**

**Solution 1: Install Dependencies**
```bash
npm install
npm run dev
```

**Solution 2: Clear Cache**
```bash
rm -rf node_modules dist
npm install
npm run dev
```

**Solution 3: Check Port**
```bash
# Kill process on port 5173
npx kill-port 5173
npm run dev
```

---

### **Issue 4: TypeScript Errors**
**Symptoms:**
- Build fails
- Many red errors
- "Cannot find module"

**Fixes:**

**Solution 1: Skip Type Checking**
```bash
npm run dev -- --no-type-check
```

**Solution 2: Rebuild**
```bash
rm -rf node_modules
npm install
npm run dev
```

---

### **Issue 5: Images Not Loading**
**Symptoms:**
- Logo doesn't show
- Favicon missing
- Broken image icons

**Fixes:**

**Check Files Exist:**
```bash
ls -la public/
# Should show:
# - favicon.png
# - logo.png
```

**Verify Paths:**
```tsx
// Correct paths
<img src="/logo.png" />      ✅
<img src="/favicon.png" />   ✅

// Wrong paths
<img src="logo.png" />       ❌
<img src="./logo.png" />     ❌
```

**Hard Refresh:**
- Chrome/Edge: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Firefox: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)

---

### **Issue 6: Routes Don't Work**
**Symptoms:**
- Clicking links does nothing
- 404 errors
- "Page not found"

**Fixes:**

**Check Route Definitions:**
```tsx
// main.tsx - All routes defined
<Route path="/ai-trip-planner" element={<AiTripPlanner />} />
<Route path="/dia-search" element={<DiaSearchResults />} />
```

**Check Link Paths:**
```tsx
// Must match route definition exactly
<Link to="/ai-trip-planner">   ✅
<Link to="/ai-planner">        ❌
```

**Restart Server:**
```bash
# Stop dev server (Ctrl+C)
npm run dev
```

---

### **Issue 7: Sidebar Not Expanding**
**Symptoms:**
- Hover doesn't work
- Sidebar stays collapsed
- No transition

**Fixes:**

**Check Browser:**
- Works in modern browsers only
- Requires CSS transitions support
- Try Chrome/Firefox/Safari

**Check Code:**
```tsx
// DiaSearchResults.tsx
onMouseEnter={() => setSidebarExpanded(true)}
onMouseLeave={() => setSidebarExpanded(false)}
```

**Clear Cache:**
```bash
# Hard refresh browser
Ctrl+Shift+R (Windows)
Cmd+Shift+R (Mac)
```

---

### **Issue 8: Checkout Button Always Gray**
**Symptoms:**
- Can't complete booking
- Button stays disabled
- No color change

**Fixes:**

**Check All Three Conditions:**
1. Select payment method
2. Check "Terms and Conditions"
3. Check "Privacy Policy"

**Verify in Code:**
```tsx
// All three must be true
const canCompleteBooking = 
  agreedToTerms && 
  agreedToPolicy && 
  paymentReady;
```

**Debug:**
```tsx
// Add console.log in Checkout.tsx
console.log({
  agreedToTerms,
  agreedToPolicy,
  paymentReady,
  canCompleteBooking
});
```

---

### **Issue 9: Payment Flow Not Working**
**Symptoms:**
- Payment cards don't show
- Can't select payment
- Button stays gray

**Fixes:**

**Check PaymentFlow Component:**
```tsx
// Should call onComplete when payment selected
<PaymentFlow 
  amount={totalAmount}
  onComplete={handlePaymentComplete}
/>
```

**Check State:**
```tsx
const [paymentReady, setPaymentReady] = useState(false);

const handlePaymentComplete = (details) => {
  setPaymentReady(true);  // This must be called
};
```

---

### **Issue 10: Filters Don't Work**
**Symptoms:**
- Can't remove filters
- Clicking X does nothing
- Filters stay active

**Fixes:**

**Check State Management:**
```tsx
const [activeFilters, setActiveFilters] = useState(['Under $3,359']);

const removeFilter = (filter) => {
  setActiveFilters(activeFilters.filter(f => f !== filter));
};
```

**Verify Click Handler:**
```tsx
<button onClick={() => removeFilter(filter)}>
  <X className="w-4 h-4" />
</button>
```

---

## 🐛 DEBUGGING TIPS

### **1. Check Console**
```
Press F12 → Console tab
Look for red errors
Copy exact error message
```

### **2. Check Network**
```
F12 → Network tab
Look for failed requests (red)
Check status codes
```

### **3. Check React DevTools**
```
Install React DevTools extension
F12 → Components tab
Inspect state and props
```

### **4. Clear Everything**
```bash
# Nuclear option - clears all cache
rm -rf node_modules dist
npm cache clean --force
npm install
npm run dev
```

---

## 📊 ERROR REFERENCE

### **Route Errors**
| Error | Cause | Fix |
|-------|-------|-----|
| No routes matched | Path mismatch | Check route definitions |
| 404 Not Found | Wrong path | Verify Link to="..." |
| Cannot read property | Component missing | Check imports |

### **Build Errors**
| Error | Cause | Fix |
|-------|-------|-----|
| Module not found | Missing dependency | npm install |
| Unexpected token | Syntax error | Check file syntax |
| Cannot find type | TypeScript issue | Skip with --no-type-check |

### **Runtime Errors**
| Error | Cause | Fix |
|-------|-------|-----|
| Blank screen | JS error | Check console |
| State undefined | Not initialized | Check useState |
| Cannot read of undefined | Null reference | Add optional chaining ?. |

---

## ✅ VERIFICATION CHECKLIST

### **After Each Fix:**
- [ ] Clear browser cache
- [ ] Restart dev server
- [ ] Hard refresh (Ctrl+Shift+R)
- [ ] Check console for errors
- [ ] Test the specific feature
- [ ] Test on different browser

### **Before Asking for Help:**
- [ ] Read this troubleshooting guide
- [ ] Checked console for errors
- [ ] Tried clearing cache
- [ ] Tried restarting server
- [ ] Tested in incognito mode
- [ ] Have exact error message ready

---

## 🆘 STILL STUCK?

### **Provide This Info:**
1. **Exact error message** (from console)
2. **What you were doing** (steps to reproduce)
3. **Browser & version** (Chrome 120, etc.)
4. **Operating system** (Windows, Mac, Linux)
5. **What you've tried** (from this guide)

### **Quick Checks:**
```bash
# 1. Verify installation
npm --version
node --version

# 2. Check port
lsof -i :5173

# 3. Verify files
ls -la public/
ls -la src/pages/

# 4. Clean install
rm -rf node_modules
npm install
npm run dev
```

---

## 🎯 COMMON SOLUTIONS SUMMARY

### **90% of Issues Fixed By:**
1. `npm install` - Installs dependencies
2. Hard refresh - Clears cache
3. Restart server - Reloads code
4. Check paths - Fixes routing
5. Clear cache - Removes old files

### **Quick Fix Command:**
```bash
# The "try this first" command
rm -rf node_modules dist && npm install && npm run dev
```

---

**Most issues are quick to fix - this guide has you covered!** 🔧✨
