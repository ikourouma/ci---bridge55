# 🚨 **URGENT: We Need Your Table Schema!**

## ❌ **THE PROBLEM**

Your `listings` table doesn't have the columns we expected:

### **Columns That DON'T Exist:**
- ❌ `service_type` (error said it doesn't exist)
- ❌ `max_guests` (error said it doesn't exist)

### **What This Means:**
Your database schema is DIFFERENT from what we've been coding for!

---

## 🔍 **PLEASE RUN THIS NOW**

### **In Supabase SQL Editor, run:**

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'listings'
ORDER BY ordinal_position;
```

### **Copy ALL the results and paste them here!**

This will show us your ACTUAL table structure so I can fix the queries properly.

---

## ✅ **TEMPORARY FIX APPLIED**

I've updated `StaysResults.tsx` to:
- ✅ Remove `max_guests` filter (column doesn't exist)
- ✅ Make all fields optional in TypeScript
- ✅ Add fallbacks for missing data
- ✅ Handle `price` OR `price_per_night`
- ✅ Handle `type` OR `property_type`

---

## 🧪 **TEST NOW (After Refresh)**

1. **Hard refresh:** `Ctrl + Shift + R`
2. **Search Stays:** Leave destination EMPTY, just click "Search"
3. **This should show ALL stays** (no filters)

**If you see stays now:** ✅ Great! The fix worked!
**If you still see errors:** Copy the new error message

---

## 📊 **MEANWHILE, RUN THESE QUERIES**

### **Query 1: See ALL column names**
```sql
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'listings'
ORDER BY column_name;
```

### **Query 2: See a sample stay record**
```sql
SELECT *
FROM listings
WHERE type IN ('hotel', 'guesthouse', 'resort')
LIMIT 1;
```

### **Query 3: See all columns with data types**
```sql
SELECT column_name, data_type, character_maximum_length
FROM information_schema.columns
WHERE table_name = 'listings'
ORDER BY ordinal_position;
```

---

## 🎯 **PASTE THE RESULTS**

Once you paste the column list, I'll:
1. Update ALL query files to match your schema
2. Fix ALL interfaces
3. Make everything work properly

---

**Run the schema query and paste results! This is critical! 🚀**

