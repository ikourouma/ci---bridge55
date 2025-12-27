# 🚀 BRIDGE55 - SETUP INSTRUCTIONS

## ⚡ QUICK START

### **Step 1: Install Dependencies**
```bash
cd bridge55-ultimate
npm install
```

### **Step 2: Run Development Server**
```bash
npm run dev
```

### **Step 3: Open Browser**
```
http://localhost:5173
```

---

## 🔧 **IF YOU SEE A BLANK PAGE:**

### **Common Causes & Fixes:**

**1. Dependencies Not Installed**
```bash
# Run this first!
npm install
```

**2. Port Already in Use**
```bash
# Kill the process on port 5173
npx kill-port 5173
# Then run again
npm run dev
```

**3. Build Errors**
```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run dev
```

**4. Browser Cache**
```bash
# Hard refresh in browser:
# - Chrome/Edge: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
# - Firefox: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
```

---

## 📦 **ALTERNATIVE: Use Lovable.dev**

Since this is designed for Lovable.dev, you can:

1. Go to https://lovable.dev
2. Create new project
3. Upload these files
4. Click "Run"
5. Everything works automatically!

---

## 🐛 **TROUBLESHOOTING**

### **Error: "Cannot find module 'react'"**
**Fix:**
```bash
npm install react react-dom react-router-dom
```

### **Error: "Cannot find module 'lucide-react'"**
**Fix:**
```bash
npm install lucide-react
```

### **Blank Page After npm run dev**
**Fix:**
1. Check console for errors (F12 in browser)
2. Look for red error messages
3. Share the error message for specific help

### **TypeScript Errors**
**Fix:**
```bash
# Skip type checking for now
npm run dev -- --no-type-check
```

---

## ✅ **VERIFICATION CHECKLIST**

After setup, verify these work:

- [ ] Homepage loads
- [ ] Top navigation visible
- [ ] Search forms work
- [ ] Can navigate between services
- [ ] Card design shows correctly
- [ ] Contact details populated
- [ ] Purple Dia bubble visible (bottom-right)

---

## 🎯 **EXPECTED RESULT**

When working correctly, you should see:

1. **Homepage**: Search forms for Stays/Flights/Cars/Experiences
2. **Top Nav**: Bridge55 logo, hamburger menu
3. **Bottom Right**: Purple chat bubble (Dia)
4. **Footer**: Links and information

---

## 📞 **NEED HELP?**

If still seeing blank page:
1. Check browser console (F12)
2. Copy any error messages
3. Share screenshot of errors
4. I'll provide specific fix!

---

## 🚀 **PRODUCTION BUILD**

When ready to deploy:

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The `dist` folder will contain production files.

---

**MOST COMMON FIX: Just run `npm install` first!** 😊
