# 🔍 **DEBUG SEARCH HUB - TROUBLESHOOTING GUIDE**

**Date**: December 1, 2025  
**Issues**: 
1. Search button not redirecting
2. Country branding not working

---

## 🧪 **STEP-BY-STEP DEBUGGING**

### **Test 1: Open Browser Console**

1. **Open**: `bridge55-search-hub-FINAL.html` in Chrome/Edge/Firefox
2. **Open Developer Tools**: Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
3. **Go to Console tab**
4. **Refresh the page**: Press `F5` or `Ctrl+R`

---

### **Test 2: Check Console Logs**

**Look for these messages on page load**:

```
✅ Expected console output:
🚀 Document Ready - Bridge55 Initializing...
📋 Initial active tab: #flights (or undefined)
✅ Bridge55 Navigation System Loaded
📍 Ready to navigate to: flights/search-results-list-ENHANCED.html
```

**If you DON'T see these messages**:
- ❌ jQuery is not loading properly
- ❌ JavaScript has an error before document.ready
- ❌ Check for RED error messages in console

---

### **Test 3: Click Search Button**

1. **Click the orange "Search" button** in the Flights tab
2. **Watch console for these messages**:

```
✅ Expected console output:
🔍 Form submitted!
🎯 Active tab: #flights (or undefined)
✈️ Navigating to flight results...
🔄 handleFlightSearch() called
📋 Search params: {from: "Nairobi (NBO)", to: "Entebbe (EBB)", ...}
💾 Saved to sessionStorage
🚀 Navigating to: flights/search-results-list-ENHANCED.html
```

**Then the page should redirect!**

---

### **Test 4: If Search Button Does Nothing**

**Check in console**:

❌ **No console messages at all**:
- Form submit handler NOT attached
- Possible: `$(document).ready()` not executing
- Possible: jQuery not loaded
- **Fix**: Check if jQuery CDN is accessible

❌ **See "🔍 Form submitted!" but nothing else**:
- Active tab detection failing
- **Fix**: Check if Bootstrap tabs are working

❌ **See errors in RED**:
- JavaScript error preventing execution
- **Fix**: Read error message and identify issue

---

### **Test 5: Country Branding**

1. **Click the globe icon (🌍)** in top navigation
2. **Select a country** (e.g., 🇰🇪 Kenya)
3. **Watch console for**:

```
✅ Expected:
🌍 Theme changed to: Kenya
```

4. **Visual check**:
- Search button should turn **orange/red** (Kenya colors)
- Flag in top nav should change to 🇰🇪
- "Discover Africa" should change to "Discover Kenya"

**If branding doesn't change**:
- Check console for `setCountryTheme()` error
- Check if CSS variables are defined
- Inspect element to see if `data-country="ke"` is set on `<html>` tag

---

## 🔧 **COMMON ISSUES & FIXES**

### **Issue 1: jQuery Not Loaded**

**Symptom**: Console shows `$ is not defined` or `jQuery is not defined`

**Check**: Look for this in HTML (around line 1545):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
```

**Fix**: 
- Check internet connection
- Try different CDN: `https://code.jquery.com/jquery-3.7.1.min.js`

---

### **Issue 2: Bootstrap Not Loaded**

**Symptom**: Tabs don't work, dropdowns don't work

**Check**: Look for this in HTML (around line 1546):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/js/bootstrap.bundle.min.js"></script>
```

**Fix**: Check internet connection

---

### **Issue 3: Form Not Found**

**Symptom**: See "Document Ready" but not "Form submitted"

**Test in console**:
```javascript
$('form').length  // Should return a number > 0
```

If returns `0`:
- Forms don't exist
- Check HTML structure

---

### **Issue 4: Active Tab Not Detected**

**Test in console**:
```javascript
$('.nav-link.active').data('bs-target')  // Should return "#flights"
```

If returns `undefined`:
- Tab system not initialized
- Check Bootstrap tabs

---

## 🎯 **MANUAL NAVIGATION TEST**

**If search button doesn't work, test navigation manually**:

1. **Open Console** (`F12`)
2. **Type this and press Enter**:
```javascript
window.location.href = 'flights/search-results-list-ENHANCED.html';
```

3. **Expected**: Should navigate to flight results page

**If this WORKS**:
- Navigation path is correct ✅
- Issue is with the search button click handler ❌

**If this DOESN'T work**:
- File path is wrong
- File doesn't exist in `flights/` folder
- Check file structure

---

## 🌍 **MANUAL COUNTRY THEME TEST**

**Test country theming manually**:

1. **Open Console** (`F12`)
2. **Type this and press Enter**:
```javascript
setCountryTheme('ke');
```

3. **Expected**: Kenya branding should apply (orange/red colors)

**Then test Pan-African**:
```javascript
setCountryTheme('pan-african');
```

**If this WORKS**:
- Theme system is correct ✅
- Issue is with dropdown click handler ❌

**If this DOESN'T work**:
- CSS variables not defined
- `setCountryTheme()` function has error
- Check console for errors

---

## 📊 **DIAGNOSTIC CHECKLIST**

Run these in console and report results:

```javascript
// 1. Check jQuery loaded
typeof jQuery  // Should return: "function"

// 2. Check Bootstrap loaded
typeof bootstrap  // Should return: "object"

// 3. Check forms exist
$('form').length  // Should return: 14 (or similar)

// 4. Check active tab
$('.nav-link.active').data('bs-target')  // Should return: "#flights"

// 5. Check submit handler attached
$._data($('form')[0], 'events')  // Should show: {submit: Array(1)}

// 6. Check setCountryTheme exists
typeof setCountryTheme  // Should return: "function"

// 7. Check handleFlightSearch exists
typeof handleFlightSearch  // Should return: "function"
```

---

## 🚨 **WHAT TO REPORT BACK**

Please provide:

1. **Console output** when page loads (screenshot or copy)
2. **Console output** when clicking Search button
3. **Any RED errors** in console
4. **Results from diagnostic checklist** above
5. **Does manual navigation work?** (`window.location.href = 'flights/...'`)
6. **Does manual theming work?** (`setCountryTheme('ke')`)

---

## 💡 **LIKELY CAUSES**

### **Search Button Issue**:
1. ❌ `$(document).ready()` not executing → Check jQuery loaded
2. ❌ Form submit handler not attaching → Check forms exist
3. ❌ `handleFlightSearch()` not defined → Check function exists
4. ❌ File path wrong → Check `flights/` folder exists

### **Country Branding Issue**:
1. ❌ CSS variables not defined → Check `:root` styles
2. ❌ `setCountryTheme()` error → Check console
3. ❌ `data-country` not updating → Inspect `<html>` element
4. ❌ Dropdown not working → Check Bootstrap loaded

---

## ✅ **QUICK FIX ATTEMPTS**

### **Fix 1: Hard Refresh**
Press `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac) to clear cache

### **Fix 2: Check File Paths**
Ensure these files exist:
- `bridge55-search-hub-FINAL.html`
- `flights/search-results-list-ENHANCED.html`
- `flights/flight-details.html`
- etc.

### **Fix 3: Test in Different Browser**
Try Chrome, Firefox, Edge to isolate browser-specific issues

### **Fix 4: Check Internet Connection**
CDN links need internet to load jQuery & Bootstrap

---

**Next Steps**: 
1. Open page
2. Open console (F12)
3. Click search
4. Report console output

This will help identify the exact issue! 🔍✨

















