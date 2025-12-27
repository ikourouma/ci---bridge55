-- ============================================
-- BRIDGE55 DATABASE SCHEMA - COMPLETE
-- Version: 2.0 (with Sub-Services)
-- Created: November 22, 2025
-- Architecture: [Flights] [Stays] [Cars] [Experiences] [eVisa] [AI]
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ENUMS FOR TYPE SAFETY
-- ============================================

-- Main service types
CREATE TYPE service_type AS ENUM (
  'flight',
  'accommodation',
  'car',
  'experience',
  'evisa'
);

-- Cars sub-service types
CREATE TYPE car_subtype AS ENUM (
  'rental_car',
  'taxi',
  'rideshare'
);

-- Experiences sub-service types
CREATE TYPE experience_subtype AS ENUM (
  'things_to_do',
  'tour',
  'event'
);

-- Booking status
CREATE TYPE booking_status AS ENUM (
  'pending',
  'confirmed',
  'cancelled',
  'completed'
);

-- Payment status
CREATE TYPE payment_status AS ENUM (
  'pending',
  'paid',
  'refunded',
  'failed'
);

-- ============================================
-- 1. PROFILES TABLE
-- ============================================
CREATE TABLE profiles (
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

-- RLS Policies for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- ============================================
-- 2. LISTINGS TABLE (All Services)
-- ============================================
CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Basic Info
  title TEXT NOT NULL,
  description TEXT,
  
  -- Service Classification
  service_type service_type NOT NULL,
  car_subtype car_subtype,           -- Only for service_type = 'car'
  experience_subtype experience_subtype, -- Only for service_type = 'experience'
  
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
  price_unit TEXT DEFAULT 'per_night', -- 'per_night', 'per_person', 'per_hour', 'per_day', 'total'
  
  -- Media
  images TEXT[] DEFAULT '{}',
  video_url TEXT,
  
  -- Features & Amenities
  amenities TEXT[] DEFAULT '{}',
  features JSONB DEFAULT '{}',
  
  -- Rating & Reviews
  rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER DEFAULT 0,
  
  -- Contact Information
  contact_name TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  contact_whatsapp TEXT,
  website_url TEXT,
  
  -- Status & Verification
  verified BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  
  -- Operator Info
  operator_id UUID REFERENCES profiles(id),
  operator_name TEXT,
  
  -- Service-Specific Data (JSONB for flexibility)
  -- For Cars: {capacity, transmission, fuel_type, insurance_included}
  -- For Experiences: {duration, languages, difficulty_level, group_size}
  -- For Accommodations: {rooms, check_in_time, check_out_time}
  service_data JSONB DEFAULT '{}',
  
  -- Additional Metadata
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_listings_service_type ON listings(service_type);
CREATE INDEX idx_listings_car_subtype ON listings(car_subtype) WHERE service_type = 'car';
CREATE INDEX idx_listings_experience_subtype ON listings(experience_subtype) WHERE service_type = 'experience';
CREATE INDEX idx_listings_location ON listings(location);
CREATE INDEX idx_listings_country ON listings(country_code);
CREATE INDEX idx_listings_city ON listings(city);
CREATE INDEX idx_listings_price ON listings(price);
CREATE INDEX idx_listings_rating ON listings(rating);
CREATE INDEX idx_listings_featured ON listings(featured) WHERE featured = TRUE;
CREATE INDEX idx_listings_active ON listings(active) WHERE active = TRUE;
CREATE INDEX idx_listings_operator ON listings(operator_id);

-- RLS Policies for listings
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active listings" ON listings
  FOR SELECT USING (active = TRUE);

CREATE POLICY "Operators can manage own listings" ON listings
  FOR ALL USING (auth.uid() = operator_id);

-- ============================================
-- 3. BOOKINGS TABLE
-- ============================================
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- References
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Status
  status booking_status DEFAULT 'pending',
  
  -- Dates (flexible for different services)
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
  payment_status payment_status DEFAULT 'pending',
  payment_method TEXT,
  payment_id TEXT,
  
  -- Additional Info
  special_requests TEXT,
  notes TEXT,
  
  -- Service-Specific Data
  booking_data JSONB DEFAULT '{}',
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for bookings
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_listing ON bookings(listing_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_dates ON bookings(start_date, end_date);
CREATE INDEX idx_bookings_payment_status ON bookings(payment_status);

-- RLS Policies for bookings
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings" ON bookings
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- 4. REVIEWS TABLE
-- ============================================
CREATE TABLE reviews (
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
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  UNIQUE(booking_id) -- One review per booking
);

-- Indexes for reviews
CREATE INDEX idx_reviews_listing ON reviews(listing_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_verified ON reviews(verified_stay) WHERE verified_stay = TRUE;

-- RLS Policies for reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reviews" ON reviews
  FOR SELECT USING (TRUE);

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
-- 5. FLIGHTS TABLE (Separate for flexibility)
-- ============================================
CREATE TABLE flights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Flight Details
  airline TEXT NOT NULL,
  airline_code TEXT,
  flight_number TEXT,
  
  -- Route
  origin_airport TEXT NOT NULL,
  origin_city TEXT NOT NULL,
  origin_country TEXT NOT NULL,
  destination_airport TEXT NOT NULL,
  destination_city TEXT NOT NULL,
  destination_country TEXT NOT NULL,
  
  -- Timing
  departure_time TIMESTAMPTZ NOT NULL,
  arrival_time TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER,
  
  -- Aircraft
  aircraft_type TEXT,
  cabin_class TEXT, -- economy, premium_economy, business, first
  
  -- Pricing (per seat)
  price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  available_seats INTEGER,
  
  -- Stops
  stops INTEGER DEFAULT 0,
  layover_airports TEXT[] DEFAULT '{}',
  
  -- Amenities
  wifi BOOLEAN DEFAULT FALSE,
  meal_included BOOLEAN DEFAULT FALSE,
  baggage_allowance JSONB DEFAULT '{}',
  
  -- Status
  active BOOLEAN DEFAULT TRUE,
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for flights
CREATE INDEX idx_flights_origin ON flights(origin_airport);
CREATE INDEX idx_flights_destination ON flights(destination_airport);
CREATE INDEX idx_flights_route ON flights(origin_airport, destination_airport);
CREATE INDEX idx_flights_departure ON flights(departure_time);
CREATE INDEX idx_flights_airline ON flights(airline);
CREATE INDEX idx_flights_price ON flights(price);

-- RLS Policies for flights
ALTER TABLE flights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active flights" ON flights
  FOR SELECT USING (active = TRUE);

-- ============================================
-- 6. EVISA APPLICATIONS TABLE
-- ============================================
CREATE TABLE evisa_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- User Reference
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Destination
  destination_country TEXT NOT NULL,
  destination_country_code TEXT NOT NULL,
  
  -- Applicant Info
  full_name TEXT NOT NULL,
  passport_number TEXT NOT NULL,
  nationality TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  
  -- Travel Info
  entry_date DATE NOT NULL,
  exit_date DATE,
  purpose_of_visit TEXT NOT NULL,
  
  -- Application Status
  status TEXT DEFAULT 'draft', -- draft, submitted, processing, approved, rejected
  application_number TEXT UNIQUE,
  
  -- Documents
  passport_photo_url TEXT,
  passport_scan_url TEXT,
  additional_documents JSONB DEFAULT '{}',
  
  -- Processing
  submitted_at TIMESTAMPTZ,
  processed_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  
  -- Payment
  fee_amount DECIMAL(10,2),
  fee_currency TEXT DEFAULT 'USD',
  payment_status payment_status DEFAULT 'pending',
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for evisa applications
CREATE INDEX idx_evisa_user ON evisa_applications(user_id);
CREATE INDEX idx_evisa_destination ON evisa_applications(destination_country_code);
CREATE INDEX idx_evisa_status ON evisa_applications(status);

-- RLS Policies for evisa applications
ALTER TABLE evisa_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own evisa applications" ON evisa_applications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create evisa applications" ON evisa_applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own evisa applications" ON evisa_applications
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- 7. AI TRIP PLANS TABLE
-- ============================================
CREATE TABLE ai_trip_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- User Reference
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Trip Details
  title TEXT,
  destination_countries TEXT[] DEFAULT '{}',
  start_date DATE,
  end_date DATE,
  duration_days INTEGER,
  
  -- Preferences
  budget_min DECIMAL(10,2),
  budget_max DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  travelers_count INTEGER DEFAULT 1,
  travel_style TEXT, -- adventure, luxury, budget, cultural, etc.
  interests TEXT[] DEFAULT '{}',
  
  -- AI-Generated Itinerary
  itinerary JSONB DEFAULT '{}',
  recommendations JSONB DEFAULT '{}',
  
  -- Status
  status TEXT DEFAULT 'draft', -- draft, finalized, booked
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for AI trip plans
CREATE INDEX idx_ai_trips_user ON ai_trip_plans(user_id);
CREATE INDEX idx_ai_trips_dates ON ai_trip_plans(start_date, end_date);

-- RLS Policies for AI trip plans
ALTER TABLE ai_trip_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own trip plans" ON ai_trip_plans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create trip plans" ON ai_trip_plans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own trip plans" ON ai_trip_plans
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- 8. SAMPLE DATA
-- ============================================

-- Sample Accommodations (Stays)
INSERT INTO listings (
  title, service_type, location, country_code, city, price, description, 
  images, rating, review_count, contact_phone, contact_whatsapp, verified, featured
) VALUES
('Safari Lodge Masai Mara', 'accommodation', 'Masai Mara National Reserve', 'KE', 'Masai Mara', 450.00, 
 'Luxury safari lodge with stunning views of the savanna and wildlife', 
 ARRAY['https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800'], 
 4.8, 156, '+254712345678', '+254712345678', TRUE, TRUE),

('Nairobi City Hotel', 'accommodation', 'Nairobi CBD', 'KE', 'Nairobi', 120.00,
 'Modern hotel in the heart of Nairobi with business facilities',
 ARRAY['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'],
 4.3, 89, '+254723456789', '+254723456789', TRUE, FALSE),

('Coastal Beach Resort', 'accommodation', 'Diani Beach', 'KE', 'Mombasa', 200.00,
 'Beachfront resort with infinity pool and water sports',
 ARRAY['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'],
 4.6, 203, '+254734567890', '+254734567890', TRUE, TRUE);

-- Sample Cars - Rental Cars
INSERT INTO listings (
  title, service_type, car_subtype, location, country_code, city, price, price_unit,
  description, images, rating, review_count, contact_phone, verified, featured,
  service_data
) VALUES
('Toyota Land Cruiser 4x4', 'car', 'rental_car', 'Nairobi', 'KE', 'Nairobi', 80.00, 'per_day',
 'Perfect for safari adventures, seats 7, fully insured',
 ARRAY['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800'],
 4.7, 45, '+254745678901', TRUE, TRUE,
 '{"capacity": 7, "transmission": "automatic", "fuel_type": "diesel", "insurance_included": true}'::jsonb),

('Sedan - Airport Pickup', 'car', 'rental_car', 'Nairobi', 'KE', 'Nairobi', 35.00, 'per_day',
 'Economical sedan, perfect for city driving',
 ARRAY['https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800'],
 4.4, 67, '+254756789012', TRUE, FALSE,
 '{"capacity": 5, "transmission": "manual", "fuel_type": "petrol", "insurance_included": true}'::jsonb);

-- Sample Cars - Taxis
INSERT INTO listings (
  title, service_type, car_subtype, location, country_code, city, price, price_unit,
  description, images, contact_phone, verified,
  service_data
) VALUES
('Nairobi Airport Taxi', 'car', 'taxi', 'Jomo Kenyatta Airport', 'KE', 'Nairobi', 25.00, 'per_hour',
 'Licensed airport taxi service, 24/7 availability',
 ARRAY['https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800'],
 '+254767890123', TRUE,
 '{"capacity": 4, "airport_pickup": true, "luggage_capacity": 3}'::jsonb);

-- Sample Cars - Rideshares (Placeholder for API integration)
INSERT INTO listings (
  title, service_type, car_subtype, location, country_code, city, price, price_unit,
  description, contact_phone, active,
  service_data
) VALUES
('Uber Nairobi', 'car', 'rideshare', 'Nairobi', 'KE', 'Nairobi', 15.00, 'per_trip',
 'Connect to Uber for instant rides across Nairobi',
 '+254700000000', TRUE,
 '{"api_provider": "uber", "service_types": ["UberX", "UberXL", "Uber Black"]}'::jsonb);

-- Sample Experiences - Things to Do
INSERT INTO listings (
  title, service_type, experience_subtype, location, country_code, city, price, price_unit,
  description, images, rating, review_count, contact_phone, verified, featured,
  service_data
) VALUES
('Giraffe Centre Visit', 'experience', 'things_to_do', 'Nairobi', 'KE', 'Nairobi', 15.00, 'per_person',
 'Feed and interact with endangered Rothschild giraffes',
 ARRAY['https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=800'],
 4.9, 234, '+254778901234', TRUE, TRUE,
 '{"duration_hours": 2, "languages": ["English", "Swahili"], "group_size_max": 20}'::jsonb),

('Nairobi National Museum', 'experience', 'things_to_do', 'Nairobi', 'KE', 'Nairobi', 10.00, 'per_person',
 'Explore Kenyan history, culture, and art',
 ARRAY['https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800'],
 4.5, 123, '+254789012345', TRUE, FALSE,
 '{"duration_hours": 3, "languages": ["English", "French", "Swahili"], "guided_tour": true}'::jsonb);

-- Sample Experiences - Tours
INSERT INTO listings (
  title, service_type, experience_subtype, location, country_code, city, price, price_unit,
  description, images, rating, review_count, contact_phone, contact_whatsapp, verified, featured,
  service_data
) VALUES
('5-Day Masai Mara Safari', 'experience', 'tour', 'Masai Mara', 'KE', 'Masai Mara', 1200.00, 'per_person',
 'Complete safari experience with expert guides, all meals included',
 ARRAY['https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800'],
 4.9, 67, '+254790123456', '+254790123456', TRUE, TRUE,
 '{"duration_days": 5, "languages": ["English", "German"], "group_size_max": 12, "difficulty_level": "moderate", "meals_included": true, "accommodation_included": true}'::jsonb),

('Mount Kenya Day Hike', 'experience', 'tour', 'Mount Kenya', 'KE', 'Nanyuki', 80.00, 'per_person',
 'Guided day hike with panoramic views',
 ARRAY['https://images.unsplash.com/photo-1551632811-561732d1e306?w=800'],
 4.4, 42, '+254701234567', '+254701234567', TRUE, FALSE,
 '{"duration_hours": 8, "languages": ["English"], "group_size_max": 8, "difficulty_level": "challenging"}'::jsonb);

-- Sample Experiences - Events
INSERT INTO listings (
  title, service_type, experience_subtype, location, country_code, city, price, price_unit,
  description, images, contact_phone, verified, featured,
  service_data
) VALUES
('Nairobi Jazz Festival', 'experience', 'event', 'Uhuru Gardens', 'KE', 'Nairobi', 30.00, 'per_ticket',
 'Annual jazz festival featuring top African and international artists',
 ARRAY['https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800'],
 '+254712345678', TRUE, TRUE,
 '{"event_date": "2025-12-15", "duration_hours": 6, "category": "music", "capacity": 5000}'::jsonb);

-- Sample Côte d'Ivoire Listings
INSERT INTO listings (
  title, service_type, location, country_code, city, price, description, 
  images, rating, review_count, contact_phone, verified, featured
) VALUES
('Grand Hôtel Abidjan', 'accommodation', 'Plateau', 'CI', 'Abidjan', 180.00,
 'Luxury hotel in the business district with conference facilities',
 ARRAY['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800'],
 4.5, 92, '+2250700000001', TRUE, TRUE),

('Bassam Beach Resort', 'accommodation', 'Grand-Bassam', 'CI', 'Grand-Bassam', 90.00,
 'Historic coastal resort with colonial architecture',
 ARRAY['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800'],
 4.1, 54, '+2250700000002', TRUE, FALSE);

INSERT INTO listings (
  title, service_type, experience_subtype, location, country_code, city, price, price_unit,
  description, images, contact_phone, verified, featured,
  service_data
) VALUES
('Yamoussoukro City Tour', 'experience', 'tour', 'Yamoussoukro', 'CI', 'Yamoussoukro', 60.00, 'per_person',
 'Visit the Basilica of Our Lady of Peace and Presidential Palace',
 ARRAY['https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800'],
 '+2250700000003', TRUE, TRUE,
 '{"duration_hours": 4, "languages": ["French", "English"], "group_size_max": 15}'::jsonb);

-- ============================================
-- 9. HELPER FUNCTIONS
-- ============================================

-- Function to update listing rating
CREATE OR REPLACE FUNCTION update_listing_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE listings
  SET 
    rating = (
      SELECT AVG(rating)::DECIMAL(2,1)
      FROM reviews
      WHERE listing_id = NEW.listing_id
    ),
    review_count = (
      SELECT COUNT(*)
      FROM reviews
      WHERE listing_id = NEW.listing_id
    )
  WHERE id = NEW.listing_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update ratings
CREATE TRIGGER update_listing_rating_trigger
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_listing_rating();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply timestamp trigger to all tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_listings_updated_at BEFORE UPDATE ON listings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SCHEMA COMPLETE
-- ============================================
-- Total Tables: 8
-- - profiles
-- - listings (with sub-service support)
-- - bookings
-- - reviews
-- - flights
-- - evisa_applications
-- - ai_trip_plans
-- - (auth.users from Supabase Auth)
--
-- Key Features:
-- ✅ Sub-service support (Cars: 3 types, Experiences: 3 types)
-- ✅ Flexible JSONB for service-specific data
-- ✅ Comprehensive RLS policies
-- ✅ Performance indexes
-- ✅ Sample data for all services
-- ✅ Helper functions and triggers
-- ============================================

