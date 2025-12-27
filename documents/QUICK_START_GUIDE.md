# 🚀 BRIDGE55 QUICK START GUIDE

**Goal:** Get your Bridge55 platform running with real data in 10 minutes!

---

## ⚡ 3-STEP QUICK START

### **Step 1: Create `.env.local` (2 minutes)**

1. Create a file named `.env.local` in this folder:
   ```
   C:\Users\ikouroum\bridge55-app\bridge55-final-fixed\
   ```

2. Add these lines (replace with your actual Supabase credentials):

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# App Configuration
VITE_APP_URL=http://localhost:5173
VITE_ENV=development
```

3. **Where to find credentials:**
   - **Option A:** Copy from `C:\Projects\bridge55-vite-app\.env.local`
   - **Option B:** Supabase Dashboard → Settings → API → Copy URL & anon key

---

### **Step 2: Setup Database (5 minutes)**

1. Go to https://app.supabase.com
2. Select your project
3. Click **SQL Editor** (left sidebar)
4. Click **New Query**
5. Open `DATABASE_SCHEMA.sql` in this folder
6. **Copy ALL contents** (Ctrl+A, Ctrl+C)
7. **Paste** into Supabase SQL Editor (Ctrl+V)
8. Click **RUN** button or press `Ctrl+Enter`

**Expected Result:**
```
Success. 0 rows returned
```

**Verify it worked:**
```sql
SELECT * FROM listings;
```

You should see 9 sample listings!

---

### **Step 3: Start Development Server (1 minute)**

```bash
cd C:\Users\ikouroum\bridge55-app\bridge55-final-fixed
npm run dev
```

Open browser: http://localhost:5173

**Expected:**
- ✅ Bridge55 homepage loads
- ✅ Service tabs work (Flights, Stays, Cars, Experiences, eVisa, AI)
- ✅ Cars shows 3 sub-tabs (🚙 Rental, 🚕 Taxi, 📱 Rideshare)
- ✅ Experiences shows 3 sub-tabs (🎯 Things to Do, 🗺️ Tours, 🎪 Events)
- ✅ Browser console shows: `✅ Supabase connected successfully`

---

## ✅ CHECKLIST

### **Before You Start:**
- [ ] Node.js installed
- [ ] Supabase account created
- [ ] Project files in place

### **Step 1 - Environment:**
- [ ] `.env.local` file created
- [ ] Supabase URL added
- [ ] Supabase anon key added

### **Step 2 - Database:**
- [ ] Opened Supabase SQL Editor
- [ ] Pasted `DATABASE_SCHEMA.sql`
- [ ] Ran query successfully
- [ ] Verified listings table has 9 rows

### **Step 3 - Development:**
- [ ] Ran `npm run dev`
- [ ] Server started on port 5173
- [ ] Browser shows homepage
- [ ] No console errors
- [ ] Service tabs work
- [ ] Sub-service tabs work

---

## 🎯 WHAT TO TEST

### **1. Service Switching**
- Click each service tab (Flights, Stays, Cars, etc.)
- Watch hero title change
- Verify correct search form appears

### **2. Cars Sub-Services**
1. Click **Cars** tab
2. Click **🚙 Rental Cars** → See rental form
3. Click **🚕 Taxis** → See taxi form
4. Click **📱 Rideshares** → See rideshare options

### **3. Experiences Sub-Services**
1. Click **Experiences** tab
2. Click **🎯 Things to Do** → See activities form
3. Click **🗺️ Tours** → See tours form
4. Click **🎪 Events** → See events form with categories

### **4. Form Validation**
- Try submitting empty forms
- See validation messages
- Fill required fields
- Click Search button
- Navigate to results page

---

## 🐛 TROUBLESHOOTING

### **Problem: "Missing Supabase environment variables"**
**Solution:**
- Check `.env.local` exists in project root
- Verify file has `VITE_` prefix
- Restart dev server (`Ctrl+C` then `npm run dev`)

---

### **Problem: "Table doesn't exist"**
**Solution:**
- Go to Supabase SQL Editor
- Run: `SELECT * FROM listings;`
- If error → Re-run `DATABASE_SCHEMA.sql`

---

### **Problem: "Supabase connection failed"**
**Solution:**
- Check Supabase URL is correct (starts with `https://`)
- Check anon key is copied correctly (long string)
- Verify project is active in Supabase dashboard

---

### **Problem: Sub-service tabs not showing**
**Solution:**
- Check browser console for errors
- Clear browser cache (`Ctrl+Shift+R`)
- Verify `SearchInterface.tsx` exists in `src/components/`

---

### **Problem: Forms look broken**
**Solution:**
- Run: `npm install` (ensure all dependencies installed)
- Check for console errors
- Verify TailwindCSS is working (check other elements)

---

## 📚 DOCUMENTATION REFERENCE

### **For Setup:**
- `ENV_SETUP.md` - Environment configuration
- `SUPABASE_SETUP_GUIDE.md` - Detailed database setup
- `DATABASE_SCHEMA.sql` - Complete schema

### **For Development:**
- `INTEGRATION_COMPLETE.md` - What's been built
- `INTEGRATION_EXECUTION_PLAN.md` - Full implementation plan
- `DUAL_PROJECT_ANALYSIS.md` - Technical decisions

### **For Database:**
- Example queries in `SUPABASE_SETUP_GUIDE.md`
- Schema documentation in `DATABASE_SCHEMA.sql`
- RLS policies documented in schema

---

## 🎨 UI FEATURES TO EXPLORE

### **Service Tabs:**
- Smooth color transitions
- Icon + text labels
- Active state highlighting
- AI tab has gradient border (✨)

### **Sub-Service Tabs:**
- Color-coded by service type
- Icons for each type
- Active state border
- Hover effects

### **Search Forms:**
- Responsive grid layouts
- Icon-labeled fields
- Date + time pickers
- Dropdown selectors
- Gradient search buttons

---

## 🚀 NEXT STEPS AFTER SETUP

### **Phase 3: Connect Data**
1. Update results pages to fetch from Supabase
2. Add loading states
3. Implement error handling
4. Test search functionality

### **Additional Features:**
1. User authentication (Supabase Auth)
2. Booking flow
3. Payment integration
4. Reviews system
5. AI trip planning (Dia assistant)

---

## 💡 PRO TIPS

### **Development Workflow:**
```bash
# Terminal 1: Dev Server
npm run dev

# Terminal 2: Watch for changes
# (Vite auto-reloads on file changes)

# Browser: Open DevTools (F12)
# Watch console for errors/logs
```

### **Database Queries:**
Use Supabase SQL Editor to test queries before adding to code

### **Form Testing:**
Use browser DevTools → Network tab to see API calls

---

## 📞 NEED HELP?

### **Common Commands:**
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### **File Locations:**
```
src/
├── lib/supabase.ts           → Supabase client
├── components/
│   ├── SearchInterface.tsx   → Main search router
│   └── forms/
│       ├── CarsSearchForm.tsx
│       └── ExperiencesSearchForm.tsx
└── pages/
    └── Home.tsx              → Homepage with service tabs
```

---

## ✅ SUCCESS CRITERIA

**You're ready to proceed when:**
- ✅ Dev server runs without errors
- ✅ Homepage loads correctly
- ✅ All service tabs work
- ✅ Sub-service tabs switch properly
- ✅ Console shows Supabase connected
- ✅ Database has sample data
- ✅ Forms validate correctly

---

**Time to Complete:** 10 minutes  
**Difficulty:** Easy  
**Support:** See documentation files listed above  

**Let's build Africa's best travel platform!** 🌍✨

---

**Created:** November 22, 2025  
**Status:** Ready to Use  
**Last Updated:** Now

