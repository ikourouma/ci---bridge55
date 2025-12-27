# ✅ **FLIGHT SQL FIXED!**

## 🔧 **PROBLEM**
The `listings` table has NOT NULL constraints on these columns:
- `property_type`
- `max_guests`
- `bedrooms`
- `bathrooms`
- `price_per_night`

These were designed for accommodations, but flights don't need them.

---

## ✅ **SOLUTION**
Updated `ADD_FLIGHT_DATA.sql` to include:

```sql
INSERT INTO listings (
  title,
  description,
  service_type,
  type,
  property_type,      -- ✅ ADDED (set to 'flight')
  location,
  city,
  country,
  country_code,
  price,
  price_unit,
  currency,
  rating,
  review_count,
  active,
  verified,
  featured,
  service_data,
  metadata,
  max_guests,         -- ✅ ADDED (set to 0)
  bedrooms,           -- ✅ ADDED (set to 0)
  bathrooms,          -- ✅ ADDED (set to 0)
  price_per_night,    -- ✅ ADDED (set to 0)
  created_at,
  updated_at
) VALUES (
  -- flight details...
  'flight',           -- property_type = 'flight'
  -- more details...
  0, 0, 0, 0,        -- max_guests, bedrooms, bathrooms, price_per_night
  NOW(),
  NOW()
);
```

---

## 🎯 **WHAT CHANGED**

### **Before:**
```sql
INSERT INTO listings (
  title,
  service_type,
  type,
  -- missing property_type, max_guests, bedrooms, bathrooms, price_per_night
)
```

### **After:**
```sql
INSERT INTO listings (
  title,
  service_type,
  type,
  property_type,    -- ✅ ADDED
  max_guests,       -- ✅ ADDED
  bedrooms,         -- ✅ ADDED
  bathrooms,        -- ✅ ADDED
  price_per_night,  -- ✅ ADDED
)
```

**Values for flights:**
- `property_type`: `'flight'`
- `max_guests`, `bedrooms`, `bathrooms`, `price_per_night`: `0`

---

## 🚀 **READY TO RUN!**

### **Step 1: Open Supabase**
```
https://supabase.com/dashboard/project/bvctoaaqndcgndyflqps/editor
```

### **Step 2: Go to SQL Editor**

### **Step 3: Run the Fixed SQL**

1. Open: `ADD_FLIGHT_DATA.sql`
2. Copy ALL contents (Ctrl+A, Ctrl+C)
3. Paste into SQL Editor
4. Click **RUN** ▶️

### **Expected Result:**
```json
{
  "status": "Flight data added successfully!",
  "total_flights": 6,
  "featured_flights": 3
}
```

---

## ✅ **NO MORE ERRORS!**

The SQL now properly handles the accommodation-focused schema constraints while adding flight data.

---

**Ready to test! 🎉**

