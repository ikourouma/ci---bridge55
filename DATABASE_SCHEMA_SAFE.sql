-- ============================================
-- BRIDGE55 DATABASE SCHEMA - SAFE UPDATE
-- Version: 2.0 (Safe for existing databases)
-- Created: November 22, 2025
-- This version won't break if tables already exist
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ENUMS FOR TYPE SAFETY (Create only if not exists)
-- ============================================

-- Main service types
DO $$ BEGIN
  CREATE TYPE service_type AS ENUM (
    'flight',
    'accommodation',
    'car',
    'experience',
    'evisa'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Cars sub-service types
DO $$ BEGIN
  CREATE TYPE car_subtype AS ENUM (
    'rental_car',
    'taxi',
    'rideshare'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Experiences sub-service types
DO $$ BEGIN
  CREATE TYPE experience_subtype AS ENUM (
    'things_to_do',
    'tour',
    'event'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Booking status
DO $$ BEGIN
  CREATE TYPE booking_status AS ENUM (
    'pending',
    'confirmed',
    'cancelled',
    'completed'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Payment status
DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM (
    'pending',
    'paid',
    'refunded',
    'failed'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- 1. PROFILES TABLE (Create if not exists)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  country_code TEXT,
  avatar_url TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add columns if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='preferences') THEN
    ALTER TABLE profiles ADD COLUMN preferences JSONB DEFAULT '{}';
  END IF;
END $$;

-- RLS Policies for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- ============================================
-- 2. LISTINGS TABLE (Create if not exists, add new columns)
-- ============================================
CREATE TABLE IF NOT EXISTS listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Basic Info
  title TEXT NOT NULL,
  description TEXT,
  
  -- Service Classification (will be added if not exists)
  service_type TEXT,
  
  -- Location
  location TEXT NOT NULL,
  country_code TEXT NOT NULL,
  city TEXT,
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Pricing
  price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  
  -- Media
  images TEXT[] DEFAULT '{}',
  
  -- Features & Amenities
  amenities TEXT[] DEFAULT '{}',
  
  -- Rating & Reviews
  rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER DEFAULT 0,
  
  -- Contact Information
  contact_name TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  contact_whatsapp TEXT,
  
  -- Status & Verification
  verified BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  
  -- Operator Info
  operator_id UUID,
  
  -- Additional Metadata
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add NEW columns to existing listings table
DO $$ 
BEGIN
  -- Add service_type column first (critical for sub-services)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='listings' AND column_name='service_type') THEN
    ALTER TABLE listings ADD COLUMN service_type TEXT;
    RAISE NOTICE 'Added service_type column';
  END IF;
  
  -- Add sub-service columns if they don't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='listings' AND column_name='car_subtype') THEN
    ALTER TABLE listings ADD COLUMN car_subtype TEXT;
    RAISE NOTICE 'Added car_subtype column';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='listings' AND column_name='experience_subtype') THEN
    ALTER TABLE listings ADD COLUMN experience_subtype TEXT;
    RAISE NOTICE 'Added experience_subtype column';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='listings' AND column_name='type') THEN
    ALTER TABLE listings ADD COLUMN type TEXT;
    RAISE NOTICE 'Added type column';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='listings' AND column_name='price_unit') THEN
    ALTER TABLE listings ADD COLUMN price_unit TEXT DEFAULT 'per_night';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='listings' AND column_name='video_url') THEN
    ALTER TABLE listings ADD COLUMN video_url TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='listings' AND column_name='features') THEN
    ALTER TABLE listings ADD COLUMN features JSONB DEFAULT '{}';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='listings' AND column_name='website_url') THEN
    ALTER TABLE listings ADD COLUMN website_url TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='listings' AND column_name='operator_name') THEN
    ALTER TABLE listings ADD COLUMN operator_name TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='listings' AND column_name='service_data') THEN
    ALTER TABLE listings ADD COLUMN service_data JSONB DEFAULT '{}';
  END IF;
END $$;

-- Create indexes (only if they don't exist and column exists)
DO $$
BEGIN
  -- Only create indexes if columns exist
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='listings' AND column_name='service_type') THEN
    CREATE INDEX IF NOT EXISTS idx_listings_service_type ON listings(service_type);
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='listings' AND column_name='type') THEN
    CREATE INDEX IF NOT EXISTS idx_listings_type ON listings(type);
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='listings' AND column_name='car_subtype') THEN
    CREATE INDEX IF NOT EXISTS idx_listings_car_subtype ON listings(car_subtype);
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='listings' AND column_name='experience_subtype') THEN
    CREATE INDEX IF NOT EXISTS idx_listings_experience_subtype ON listings(experience_subtype);
  END IF;
END $$;

-- Create standard indexes (these columns should already exist)
CREATE INDEX IF NOT EXISTS idx_listings_location ON listings(location);
CREATE INDEX IF NOT EXISTS idx_listings_country ON listings(country_code);
CREATE INDEX IF NOT EXISTS idx_listings_city ON listings(city);
CREATE INDEX IF NOT EXISTS idx_listings_price ON listings(price);
CREATE INDEX IF NOT EXISTS idx_listings_rating ON listings(rating);
CREATE INDEX IF NOT EXISTS idx_listings_featured ON listings(featured) WHERE featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_listings_active ON listings(active) WHERE active = TRUE;
CREATE INDEX IF NOT EXISTS idx_listings_operator ON listings(operator_id);

-- RLS Policies for listings
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view active listings" ON listings;
CREATE POLICY "Anyone can view active listings" ON listings
  FOR SELECT USING (active = TRUE);

DROP POLICY IF EXISTS "Operators can manage own listings" ON listings;
CREATE POLICY "Operators can manage own listings" ON listings
  FOR ALL USING (auth.uid() = operator_id);

-- ============================================
-- 3. BOOKINGS TABLE (Create if not exists)
-- ============================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- References
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Status
  status TEXT DEFAULT 'pending',
  
  -- Dates
  start_date DATE,
  end_date DATE,
  booking_date TIMESTAMPTZ DEFAULT NOW(),
  
  -- Participants
  adults INTEGER DEFAULT 1,
  children INTEGER DEFAULT 0,
  infants INTEGER DEFAULT 0,
  
  -- Pricing
  subtotal DECIMAL(10,2) NOT NULL,
  taxes DECIMAL(10,2) DEFAULT 0,
  fees DECIMAL(10,2) DEFAULT 0,
  total_price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  
  -- Payment
  payment_status TEXT DEFAULT 'pending',
  payment_method TEXT,
  payment_id TEXT,
  
  -- Additional Info
  special_requests TEXT,
  notes TEXT,
  
  -- Metadata
  booking_data JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for bookings
CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_listing ON bookings(listing_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON bookings(payment_status);

-- RLS Policies for bookings
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own bookings" ON bookings;
CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create bookings" ON bookings;
CREATE POLICY "Users can create bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own bookings" ON bookings;
CREATE POLICY "Users can update own bookings" ON bookings
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- 4. REVIEWS TABLE (Create if not exists)
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- References
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id),
  
  -- Review Content
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  
  -- Category Ratings
  cleanliness_rating INTEGER CHECK (cleanliness_rating >= 1 AND cleanliness_rating <= 5),
  service_rating INTEGER CHECK (service_rating >= 1 AND service_rating <= 5),
  value_rating INTEGER CHECK (value_rating >= 1 AND value_rating <= 5),
  location_rating INTEGER CHECK (location_rating >= 1 AND location_rating <= 5),
  
  -- Media
  photos TEXT[] DEFAULT '{}',
  
  -- Engagement
  helpful_count INTEGER DEFAULT 0,
  
  -- Verification
  verified_stay BOOLEAN DEFAULT FALSE,
  
  -- Operator Response
  response TEXT,
  response_date TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for reviews
CREATE INDEX IF NOT EXISTS idx_reviews_listing ON reviews(listing_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_verified ON reviews(verified_stay) WHERE verified_stay = TRUE;

-- RLS Policies for reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view reviews" ON reviews;
CREATE POLICY "Anyone can view reviews" ON reviews
  FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Users can create reviews for own bookings" ON reviews;
CREATE POLICY "Users can create reviews for own bookings" ON reviews
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = booking_id
      AND bookings.user_id = auth.uid()
      AND bookings.status = 'completed'
    )
  );

-- ============================================
-- 5. SAMPLE DATA (Only if listings is empty or has < 5 rows)
-- ============================================

DO $$
DECLARE
  listing_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO listing_count FROM listings;
  
  -- Only insert sample data if table is nearly empty
  IF listing_count < 5 THEN
    
    -- Sample Cars - Rental Cars
    INSERT INTO listings (
      title, type, car_subtype, location, country_code, city, price, price_unit,
      description, images, rating, review_count, contact_phone, verified, featured,
      service_data, service_type, active
    ) VALUES
    ('Toyota Land Cruiser 4x4', 'car', 'rental_car', 'Nairobi', 'KE', 'Nairobi', 80.00, 'per_day',
     'Perfect for safari adventures, seats 7, fully insured',
     ARRAY['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800'],
     4.7, 45, '+254745678901', TRUE, TRUE,
     '{"capacity": 7, "transmission": "automatic", "fuel_type": "diesel", "insurance_included": true}'::jsonb,
     'car', TRUE);

    -- Sample Cars - Taxis
    INSERT INTO listings (
      title, type, car_subtype, location, country_code, city, price, price_unit,
      description, images, contact_phone, verified,
      service_data, service_type, active
    ) VALUES
    ('Nairobi Airport Taxi', 'car', 'taxi', 'Jomo Kenyatta Airport', 'KE', 'Nairobi', 25.00, 'per_hour',
     'Licensed airport taxi service, 24/7 availability',
     ARRAY['https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800'],
     '+254767890123', TRUE,
     '{"capacity": 4, "airport_pickup": true, "luggage_capacity": 3}'::jsonb,
     'car', TRUE);

    -- Sample Experiences - Things to Do
    INSERT INTO listings (
      title, type, experience_subtype, location, country_code, city, price, price_unit,
      description, images, rating, review_count, contact_phone, verified, featured,
      service_data, service_type, active
    ) VALUES
    ('Giraffe Centre Visit', 'experience', 'things_to_do', 'Nairobi', 'KE', 'Nairobi', 15.00, 'per_person',
     'Feed and interact with endangered Rothschild giraffes',
     ARRAY['https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=800'],
     4.9, 234, '+254778901234', TRUE, TRUE,
     '{"duration_hours": 2, "languages": ["English", "Swahili"], "group_size_max": 20}'::jsonb,
     'experience', TRUE);

    -- Sample Experiences - Tours
    INSERT INTO listings (
      title, type, experience_subtype, location, country_code, city, price, price_unit,
      description, images, rating, review_count, contact_phone, contact_whatsapp, verified, featured,
      service_data, service_type, active
    ) VALUES
    ('5-Day Masai Mara Safari', 'experience', 'tour', 'Masai Mara', 'KE', 'Masai Mara', 1200.00, 'per_person',
     'Complete safari experience with expert guides, all meals included',
     ARRAY['https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800'],
     4.9, 67, '+254790123456', '+254790123456', TRUE, TRUE,
     '{"duration_days": 5, "languages": ["English", "German"], "group_size_max": 12, "difficulty_level": "moderate", "meals_included": true, "accommodation_included": true}'::jsonb,
     'experience', TRUE);

    -- Sample Experiences - Events
    INSERT INTO listings (
      title, type, experience_subtype, location, country_code, city, price, price_unit,
      description, images, contact_phone, verified, featured,
      service_data, service_type, active
    ) VALUES
    ('Nairobi Jazz Festival', 'experience', 'event', 'Uhuru Gardens', 'KE', 'Nairobi', 30.00, 'per_ticket',
     'Annual jazz festival featuring top African and international artists',
     ARRAY['https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800'],
     '+254712345678', TRUE, TRUE,
     '{"event_date": "2025-12-15", "duration_hours": 6, "category": "music", "capacity": 5000}'::jsonb,
     'experience', TRUE);

  END IF;
END $$;

-- ============================================
-- SCHEMA UPDATE COMPLETE
-- ============================================

SELECT 'Schema updated successfully! Sub-service columns added to listings table.' AS status;

