-- ============================================
-- BRIDGE55 - ADD SAMPLE FLIGHT DATA
-- Add realistic flight listings for testing
-- ============================================

-- Insert sample flight listings
INSERT INTO listings (
  title, 
  description, 
  service_type, 
  type,
  
  -- Location fields
  city, 
  country, 
  country_code, 
  location,
  
  -- Pricing
  price, 
  price_unit, 
  currency,
  
  -- Media
  images,
  
  -- Ratings
  rating, 
  review_count,
  
  -- Status
  active, 
  verified, 
  featured,
  
  -- Flight-specific data in metadata
  service_data,
  metadata,
  
  -- Required accommodation fields (set to 0 for flights)
  property_type,
  max_guests,
  bedrooms,
  bathrooms,
  price_per_night,
  
  -- Timestamps
  created_at, 
  updated_at
) VALUES

-- ============================================
-- NAIROBI ↔ ADDIS ABABA ROUTES
-- ============================================

(
  'Ethiopian Airlines - Nairobi to Addis Ababa',
  'Direct flight with Ethiopian Airlines, complimentary meals and entertainment',
  'flight',
  'flight',
  
  'Nairobi',
  'Kenya',
  'KE',
  'Jomo Kenyatta International Airport (NBO), Nairobi',
  
  185.00,
  'per_person',
  'USD',
  
  ARRAY['https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800'],
  
  4.6,
  342,
  
  TRUE,
  TRUE,
  TRUE,
  
  '{
    "airline": "Ethiopian Airlines",
    "flight_number": "ET308",
    "aircraft": "Boeing 737-800",
    "departure_airport": "NBO",
    "departure_airport_name": "Jomo Kenyatta International",
    "arrival_airport": "ADD",
    "arrival_airport_name": "Addis Ababa Bole International",
    "departure_time": "10:00",
    "arrival_time": "12:30",
    "duration_minutes": 150,
    "stops": 0,
    "cabin_class": "Economy",
    "baggage_allowance": "23kg checked, 7kg carry-on",
    "amenities": ["WiFi", "Meals", "Entertainment", "USB Charging"],
    "booking_url": "https://www.ethiopianairlines.com"
  }'::jsonb,
  '{
    "route": "NBO-ADD",
    "frequency": "Daily",
    "popularity": "high"
  }'::jsonb,
  
  'flight',
  1,
  0,
  0,
  0,
  
  NOW(),
  NOW()
),

(
  'Kenya Airways - Nairobi to Addis Ababa',
  'Daily non-stop service with Kenya Airways, Star Alliance member',
  'flight',
  'flight',
  
  'Nairobi',
  'Kenya',
  'KE',
  'Jomo Kenyatta International Airport (NBO), Nairobi',
  
  195.00,
  'per_person',
  'USD',
  
  ARRAY['https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800'],
  
  4.5,
  289,
  
  TRUE,
  TRUE,
  TRUE,
  
  '{
    "airline": "Kenya Airways",
    "flight_number": "KQ534",
    "aircraft": "Embraer E190",
    "departure_airport": "NBO",
    "departure_airport_name": "Jomo Kenyatta International",
    "arrival_airport": "ADD",
    "arrival_airport_name": "Addis Ababa Bole International",
    "departure_time": "15:30",
    "arrival_time": "18:00",
    "duration_minutes": 150,
    "stops": 0,
    "cabin_class": "Economy",
    "baggage_allowance": "23kg checked, 7kg carry-on",
    "amenities": ["Meals", "Entertainment", "Power Outlets"],
    "booking_url": "https://www.kenya-airways.com"
  }'::jsonb,
  '{
    "route": "NBO-ADD",
    "frequency": "Daily",
    "alliance": "Star Alliance"
  }'::jsonb,
  
  'flight',
  1,
  0,
  0,
  0,
  
  NOW(),
  NOW()
),

-- ============================================
-- NAIROBI ↔ JOHANNESBURG ROUTES
-- ============================================

(
  'South African Airways - Nairobi to Johannesburg',
  'Premium service to South Africa with complimentary meals and beverages',
  'flight',
  'flight',
  
  'Nairobi',
  'Kenya',
  'KE',
  'Jomo Kenyatta International Airport (NBO), Nairobi',
  
  285.00,
  'per_person',
  'USD',
  
  ARRAY['https://images.unsplash.com/photo-1583079449485-323c8e3e1088?w=800'],
  
  4.7,
  456,
  
  TRUE,
  TRUE,
  TRUE,
  
  '{
    "airline": "South African Airways",
    "flight_number": "SA132",
    "aircraft": "Airbus A330-300",
    "departure_airport": "NBO",
    "departure_airport_name": "Jomo Kenyatta International",
    "arrival_airport": "JNB",
    "arrival_airport_name": "O.R. Tambo International",
    "departure_time": "09:15",
    "arrival_time": "13:45",
    "duration_minutes": 270,
    "stops": 0,
    "cabin_class": "Economy",
    "baggage_allowance": "23kg checked, 7kg carry-on",
    "amenities": ["WiFi", "Meals", "Entertainment", "USB Charging", "Power Outlets"],
    "booking_url": "https://www.flysaa.com"
  }'::jsonb,
  '{
    "route": "NBO-JNB",
    "frequency": "Daily",
    "popularity": "very_high"
  }'::jsonb,
  
  'flight',
  1,
  0,
  0,
  0,
  
  NOW(),
  NOW()
),

-- ============================================
-- LAGOS ↔ ACCRA ROUTES
-- ============================================

(
  'Arik Air - Lagos to Accra',
  'Regional service between West African capitals',
  'flight',
  'flight',
  
  'Lagos',
  'Nigeria',
  'NG',
  'Murtala Muhammed International Airport (LOS), Lagos',
  
  145.00,
  'per_person',
  'USD',
  
  ARRAY['https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800'],
  
  4.3,
  187,
  
  TRUE,
  TRUE,
  FALSE,
  
  '{
    "airline": "Arik Air",
    "flight_number": "W3101",
    "aircraft": "Boeing 737-700",
    "departure_airport": "LOS",
    "departure_airport_name": "Murtala Muhammed International",
    "arrival_airport": "ACC",
    "arrival_airport_name": "Kotoka International",
    "departure_time": "07:30",
    "arrival_time": "08:30",
    "duration_minutes": 60,
    "stops": 0,
    "cabin_class": "Economy",
    "baggage_allowance": "20kg checked, 5kg carry-on",
    "amenities": ["Snacks", "Beverages"],
    "booking_url": "https://www.arikair.com"
  }'::jsonb,
  '{
    "route": "LOS-ACC",
    "frequency": "5x weekly",
    "region": "West Africa"
  }'::jsonb,
  
  'flight',
  1,
  0,
  0,
  0,
  
  NOW(),
  NOW()
),

-- ============================================
-- CAIRO ↔ CAPE TOWN ROUTES
-- ============================================

(
  'EgyptAir - Cairo to Cape Town',
  'Connect North and South Africa with EgyptAir, one-stop via Johannesburg',
  'flight',
  'flight',
  
  'Cairo',
  'Egypt',
  'EG',
  'Cairo International Airport (CAI), Cairo',
  
  425.00,
  'per_person',
  'USD',
  
  ARRAY['https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=800'],
  
  4.4,
  234,
  
  TRUE,
  TRUE,
  TRUE,
  
  '{
    "airline": "EgyptAir",
    "flight_number": "MS850",
    "aircraft": "Boeing 777-300ER",
    "departure_airport": "CAI",
    "departure_airport_name": "Cairo International",
    "arrival_airport": "CPT",
    "arrival_airport_name": "Cape Town International",
    "departure_time": "22:00",
    "arrival_time": "10:30",
    "duration_minutes": 630,
    "stops": 1,
    "stopover_airports": ["JNB"],
    "cabin_class": "Economy",
    "baggage_allowance": "23kg checked, 8kg carry-on",
    "amenities": ["WiFi", "Meals", "Entertainment", "Lie-flat seats (Business)", "Power Outlets"],
    "booking_url": "https://www.egyptair.com"
  }'::jsonb,
  '{
    "route": "CAI-CPT",
    "frequency": "4x weekly",
    "long_haul": true
  }'::jsonb,
  
  'flight',
  1,
  0,
  0,
  0,
  
  NOW(),
  NOW()
),

-- ============================================
-- NAIROBI ↔ KIGALI ROUTES
-- ============================================

(
  'RwandAir - Nairobi to Kigali',
  'Quick hop to Rwanda with RwandAir, modern fleet and great service',
  'flight',
  'flight',
  
  'Nairobi',
  'Kenya',
  'KE',
  'Jomo Kenyatta International Airport (NBO), Nairobi',
  
  125.00,
  'per_person',
  'USD',
  
  ARRAY['https://images.unsplash.com/photo-1578672301218-2ec80c5d9de0?w=800'],
  
  4.8,
  412,
  
  TRUE,
  TRUE,
  TRUE,
  
  '{
    "airline": "RwandAir",
    "flight_number": "WB101",
    "aircraft": "Airbus A330-300",
    "departure_airport": "NBO",
    "departure_airport_name": "Jomo Kenyatta International",
    "arrival_airport": "KGL",
    "arrival_airport_name": "Kigali International",
    "departure_time": "14:00",
    "arrival_time": "15:00",
    "duration_minutes": 60,
    "stops": 0,
    "cabin_class": "Economy",
    "baggage_allowance": "23kg checked, 7kg carry-on",
    "amenities": ["WiFi", "Meals", "Entertainment", "USB Charging"],
    "booking_url": "https://www.rwandair.com"
  }'::jsonb,
  '{
    "route": "NBO-KGL",
    "frequency": "Daily",
    "popularity": "high",
    "scenic_route": true
  }'::jsonb,
  
  'flight',
  1,
  0,
  0,
  0,
  
  NOW(),
  NOW()
);

-- Verify the data was inserted
SELECT 
  'Flight data added successfully!' AS status,
  COUNT(*) AS total_flights,
  COUNT(DISTINCT city) AS departure_cities,
  AVG(price) AS avg_price
FROM listings 
WHERE service_type = 'flight';

