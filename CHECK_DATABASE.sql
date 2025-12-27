-- Check what data we actually have in the listings table

-- 1. Check all service types
SELECT 
  service_type,
  COUNT(*) as count
FROM listings
GROUP BY service_type
ORDER BY count DESC;

-- 2. Check all stays/accommodations
SELECT 
  id,
  title,
  service_type,
  type,
  property_type,
  city,
  country,
  is_active,
  active
FROM listings
WHERE service_type = 'accommodation' OR type = 'accommodation'
LIMIT 10;

-- 3. Check flights
SELECT 
  id,
  title,
  service_type,
  type,
  property_type,
  active
FROM listings
WHERE service_type = 'flight' OR type = 'flight'
LIMIT 10;

-- 4. Check ALL listings (see what we have)
SELECT 
  id,
  title,
  service_type,
  type,
  property_type,
  city,
  is_active,
  active,
  featured
FROM listings
ORDER BY created_at DESC
LIMIT 20;

