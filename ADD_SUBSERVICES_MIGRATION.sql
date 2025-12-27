-- ============================================
-- BRIDGE55 SUB-SERVICES MIGRATION
-- Adds sub-service support to existing schema
-- Safe for existing data - won't break anything!
-- ============================================

-- ============================================
-- STEP 1: Add new columns to listings table
-- ============================================

-- Add service classification columns
ALTER TABLE listings 
  ADD COLUMN IF NOT EXISTS service_type TEXT DEFAULT 'accommodation',
  ADD COLUMN IF NOT EXISTS car_subtype TEXT,
  ADD COLUMN IF NOT EXISTS experience_subtype TEXT,
  ADD COLUMN IF NOT EXISTS type TEXT;

-- Add additional fields for all service types
ALTER TABLE listings
  ADD COLUMN IF NOT EXISTS location TEXT,
  ADD COLUMN IF NOT EXISTS country_code TEXT,
  ADD COLUMN IF NOT EXISTS price NUMERIC,
  ADD COLUMN IF NOT EXISTS price_unit TEXT DEFAULT 'per_night',
  ADD COLUMN IF NOT EXISTS contact_name TEXT,
  ADD COLUMN IF NOT EXISTS contact_phone TEXT,
  ADD COLUMN IF NOT EXISTS contact_email TEXT,
  ADD COLUMN IF NOT EXISTS contact_whatsapp TEXT,
  ADD COLUMN IF NOT EXISTS website_url TEXT,
  ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS operator_name TEXT,
  ADD COLUMN IF NOT EXISTS video_url TEXT,
  ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS service_data JSONB DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';

-- ============================================
-- STEP 2: Migrate existing data
-- ============================================

-- Copy data from old columns to new standardized columns
UPDATE listings SET
  location = COALESCE(city || ', ' || country, city, country),
  country_code = CASE 
    WHEN country = 'Kenya' THEN 'KE'
    WHEN country = 'Côte d''Ivoire' THEN 'CI'
    WHEN country = 'South Africa' THEN 'ZA'
    WHEN country = 'Nigeria' THEN 'NG'
    WHEN country = 'Ghana' THEN 'GH'
    WHEN country = 'Morocco' THEN 'MA'
    WHEN country = 'Egypt' THEN 'EG'
    WHEN country = 'Tanzania' THEN 'TZ'
    ELSE 'XX'
  END,
  price = price_per_night,
  active = is_active,
  service_type = 'accommodation',
  type = property_type
WHERE location IS NULL;

-- ============================================
-- STEP 3: Create indexes for performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_listings_service_type ON listings(service_type);
CREATE INDEX IF NOT EXISTS idx_listings_type ON listings(type);
CREATE INDEX IF NOT EXISTS idx_listings_car_subtype ON listings(car_subtype) WHERE car_subtype IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_listings_experience_subtype ON listings(experience_subtype) WHERE experience_subtype IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_listings_location ON listings(location);
CREATE INDEX IF NOT EXISTS idx_listings_country_code ON listings(country_code);
CREATE INDEX IF NOT EXISTS idx_listings_price ON listings(price);
CREATE INDEX IF NOT EXISTS idx_listings_active ON listings(active) WHERE active = TRUE;
CREATE INDEX IF NOT EXISTS idx_listings_featured ON listings(featured) WHERE featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_listings_verified ON listings(verified) WHERE verified = TRUE;

-- ============================================
-- STEP 4: Add sample sub-service data
-- ============================================

-- Insert sample Cars data (Rental Cars)
INSERT INTO listings (
  title, description, service_type, type, car_subtype,
  property_type,
  city, country, country_code, location,
  price, price_unit, currency,
  images, rating, review_count,
  contact_phone, contact_whatsapp,
  verified, featured, active,
  service_data,
  max_guests, bedrooms, bathrooms, price_per_night,
  created_at, updated_at
) VALUES
(
  'Toyota Land Cruiser 4x4',
  'Perfect for safari adventures, seats 7, fully insured',
  'car', 'car', 'rental_car',
  'vehicle',
  'Nairobi', 'Kenya', 'KE', 'Nairobi, Kenya',
  80.00, 'per_day', 'USD',
  ARRAY['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800'],
  4.7, 45,
  '+254745678901', '+254745678901',
  TRUE, TRUE, TRUE,
  '{"capacity": 7, "transmission": "automatic", "fuel_type": "diesel", "insurance_included": true}'::jsonb,
  7, 0, 0, 0,
  NOW(), NOW()
),
(
  'Airport Taxi Service',
  'Licensed airport taxi service, 24/7 availability',
  'car', 'car', 'taxi',
  'vehicle',
  'Nairobi', 'Kenya', 'KE', 'Jomo Kenyatta Airport, Kenya',
  25.00, 'per_hour', 'USD',
  ARRAY['https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800'],
  4.5, 23,
  '+254767890123', '+254767890123',
  TRUE, FALSE, TRUE,
  '{"capacity": 4, "airport_pickup": true, "luggage_capacity": 3}'::jsonb,
  4, 0, 0, 0,
  NOW(), NOW()
);

-- Insert sample Experiences data (Things to Do)
INSERT INTO listings (
  title, description, service_type, type, experience_subtype,
  property_type,
  city, country, country_code, location,
  price, price_unit, currency,
  images, rating, review_count,
  contact_phone, contact_whatsapp,
  verified, featured, active,
  service_data,
  max_guests, bedrooms, bathrooms, price_per_night,
  created_at, updated_at
) VALUES
(
  'Giraffe Centre Visit',
  'Feed and interact with endangered Rothschild giraffes',
  'experience', 'experience', 'things_to_do',
  'activity',
  'Nairobi', 'Kenya', 'KE', 'Nairobi, Kenya',
  15.00, 'per_person', 'USD',
  ARRAY['https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=800'],
  4.9, 234,
  '+254778901234', '+254778901234',
  TRUE, TRUE, TRUE,
  '{"duration_hours": 2, "languages": ["English", "Swahili"], "group_size_max": 20}'::jsonb,
  20, 0, 0, 0,
  NOW(), NOW()
),
(
  'Nairobi National Museum',
  'Explore Kenyan history, culture, and art',
  'experience', 'experience', 'things_to_do',
  'activity',
  'Nairobi', 'Kenya', 'KE', 'Nairobi, Kenya',
  10.00, 'per_person', 'USD',
  ARRAY['https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800'],
  4.5, 123,
  '+254789012345', '+254789012345',
  TRUE, FALSE, TRUE,
  '{"duration_hours": 3, "languages": ["English", "French", "Swahili"], "guided_tour": true}'::jsonb,
  50, 0, 0, 0,
  NOW(), NOW()
);

-- Insert sample Experiences data (Tours)
INSERT INTO listings (
  title, description, service_type, type, experience_subtype,
  property_type,
  city, country, country_code, location,
  price, price_unit, currency,
  images, rating, review_count,
  contact_phone, contact_whatsapp,
  verified, featured, active,
  service_data,
  max_guests, bedrooms, bathrooms, price_per_night,
  created_at, updated_at
) VALUES
(
  '5-Day Masai Mara Safari',
  'Complete safari experience with expert guides, all meals included',
  'experience', 'experience', 'tour',
  'tour',
  'Masai Mara', 'Kenya', 'KE', 'Masai Mara, Kenya',
  1200.00, 'per_person', 'USD',
  ARRAY['https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800'],
  4.9, 67,
  '+254790123456', '+254790123456',
  TRUE, TRUE, TRUE,
  '{"duration_days": 5, "languages": ["English", "German"], "group_size_max": 12, "difficulty_level": "moderate", "meals_included": true, "accommodation_included": true}'::jsonb,
  12, 0, 0, 0,
  NOW(), NOW()
),
(
  'Mount Kenya Day Hike',
  'Guided day hike with panoramic views',
  'experience', 'experience', 'tour',
  'tour',
  'Nanyuki', 'Kenya', 'KE', 'Mount Kenya, Kenya',
  80.00, 'per_person', 'USD',
  ARRAY['https://images.unsplash.com/photo-1551632811-561732d1e306?w=800'],
  4.4, 42,
  '+254701234567', '+254701234567',
  TRUE, FALSE, TRUE,
  '{"duration_hours": 8, "languages": ["English"], "group_size_max": 8, "difficulty_level": "challenging"}'::jsonb,
  8, 0, 0, 0,
  NOW(), NOW()
);

-- Insert sample Experiences data (Events)
INSERT INTO listings (
  title, description, service_type, type, experience_subtype,
  property_type,
  city, country, country_code, location,
  price, price_unit, currency,
  images, rating, review_count,
  contact_phone,
  verified, featured, active,
  service_data,
  max_guests, bedrooms, bathrooms, price_per_night,
  created_at, updated_at
) VALUES
(
  'Nairobi Jazz Festival',
  'Annual jazz festival featuring top African and international artists',
  'experience', 'experience', 'event',
  'event',
  'Nairobi', 'Kenya', 'KE', 'Uhuru Gardens, Nairobi',
  30.00, 'per_ticket', 'USD',
  ARRAY['https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800'],
  4.8, 156,
  '+254712345678',
  TRUE, TRUE, TRUE,
  '{"event_date": "2025-12-15", "duration_hours": 6, "category": "music", "capacity": 5000}'::jsonb,
  5000, 0, 0, 0,
  NOW(), NOW()
);

-- ============================================
-- STEP 5: Update RLS policies to support all service types
-- ============================================

-- Drop old policies if they exist
DROP POLICY IF EXISTS "Anyone can view active listings" ON listings;
DROP POLICY IF EXISTS "Operators can manage own listings" ON listings;

-- Create new policies that work with all service types
CREATE POLICY "Anyone can view active listings" ON listings
  FOR SELECT USING (active = TRUE OR is_active = TRUE);

CREATE POLICY "Operators can manage own listings" ON listings
  FOR ALL USING (auth.uid() = operator_id);

-- ============================================
-- MIGRATION COMPLETE!
-- ============================================

SELECT 
  'Migration complete! Sub-service columns added.' AS status,
  COUNT(*) FILTER (WHERE service_type = 'accommodation') AS accommodations,
  COUNT(*) FILTER (WHERE service_type = 'car') AS cars,
  COUNT(*) FILTER (WHERE service_type = 'experience') AS experiences,
  COUNT(*) AS total_listings
FROM listings;

