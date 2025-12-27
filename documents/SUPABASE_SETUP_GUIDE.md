# 🚀 Bridge55 Supabase Setup Guide

**Complete backend setup in under 2 hours**

---

## 📋 Prerequisites

- [ ] Supabase account (https://supabase.com - sign up free)
- [ ] GitHub account
- [ ] Node.js 18+ installed
- [ ] Basic SQL knowledge

---

## ⚡ Quick Setup (30 minutes)

### Step 1: Create Supabase Project (5 min)

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in:
   - **Name**: `bridge55-platform`
   - **Database Password**: (generate strong password - SAVE THIS!)
   - **Region**: Choose closest to Africa (e.g., `eu-central-1` Frankfurt)
   - **Pricing Plan**: Free (50K MAU, 500MB database)

4. Wait 2 minutes for project creation
5. **SAVE THESE** (Project Settings → API):
   - `SUPABASE_URL`: `https://xxxxx.supabase.co`
   - `SUPABASE_ANON_KEY`: `eyJhbGc...`
   - `SUPABASE_SERVICE_ROLE_KEY`: `eyJhbGc...` (keep secret!)

---

### Step 2: Database Schema (15 min)

Go to **SQL Editor** in Supabase dashboard, run this complete schema:

```sql
-- ============================================
-- BRIDGE55 COMPLETE DATABASE SCHEMA
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. COUNTRIES & THEMING
-- ============================================

CREATE TABLE countries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(2) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    flag_emoji VARCHAR(10),
    primary_color VARCHAR(7) NOT NULL,
    secondary_color VARCHAR(7) NOT NULL,
    gradient_css TEXT,
    currency_code VARCHAR(3) NOT NULL,
    currency_symbol VARCHAR(10),
    is_federated BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Seed countries
INSERT INTO countries (code, name, flag_emoji, primary_color, secondary_color, gradient_css, currency_code, currency_symbol, is_federated) VALUES
('PAN', 'Pan-African', '🌍', '#FF6B35', '#004E89', 'linear-gradient(135deg, #FF6B35 0%, #004E89 100%)', 'USD', '$', true),
('CI', 'Côte d''Ivoire', '🇨🇮', '#FF8C00', '#00954A', 'linear-gradient(135deg, #FF8C00 0%, #00954A 100%)', 'XOF', 'CFA', true),
('GH', 'Ghana', '🇬🇭', '#EF3340', '#FCD116', 'linear-gradient(135deg, #EF3340 0%, #FCD116 50%, #006B3F 100%)', 'GHS', '₵', true),
('KE', 'Kenya', '🇰🇪', '#BB0000', '#006600', 'linear-gradient(135deg, #000000 0%, #BB0000 35%, #FFFFFF 50%, #006600 100%)', 'KES', 'KSh', true),
('MA', 'Morocco', '🇲🇦', '#C1272D', '#006233', 'linear-gradient(135deg, #C1272D 0%, #006233 100%)', 'MAD', 'DH', true);

-- ============================================
-- 2. SERVICE PROVIDERS (Federated Architecture)
-- ============================================

CREATE TABLE service_providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country_code VARCHAR(2) REFERENCES countries(code),
    service_type VARCHAR(50) NOT NULL, -- 'flights', 'stays', 'cars', 'experiences', 'evisa'
    provider_name VARCHAR(200) NOT NULL,
    provider_type VARCHAR(50), -- 'local', 'regional', 'pan-african', 'global'
    logo_url TEXT,
    api_endpoint TEXT,
    api_key_encrypted TEXT,
    commission_rate DECIMAL(5,2),
    priority INTEGER DEFAULT 1, -- Lower = higher priority
    is_active BOOLEAN DEFAULT true,
    metadata JSONB, -- Flexible storage for provider-specific data
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Sample providers (mock data)
INSERT INTO service_providers (country_code, service_type, provider_name, provider_type, commission_rate, priority) VALUES
-- Côte d'Ivoire
('CI', 'flights', 'Air Côte d''Ivoire', 'local', 5.00, 1),
('CI', 'stays', 'Sofitel Abidjan', 'local', 15.00, 1),
('CI', 'cars', 'Hertz CI', 'local', 10.00, 1),
-- Ghana
('GH', 'flights', 'Africa World Airlines', 'local', 5.00, 1),
('GH', 'stays', 'Kempinski Gold Coast', 'local', 15.00, 1),
-- Kenya
('KE', 'flights', 'Kenya Airways', 'regional', 4.00, 1),
('KE', 'stays', 'Serena Hotels', 'regional', 12.00, 1),
('KE', 'experiences', 'Maasai Mara Safaris', 'local', 20.00, 1),
-- Morocco
('MA', 'stays', 'Royal Mansour Marrakech', 'local', 15.00, 1),
-- Pan-African
('PAN', 'flights', 'Ethiopian Airlines', 'pan-african', 3.50, 2);

-- ============================================
-- 3. USERS & AUTHENTICATION
-- ============================================

CREATE TABLE user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(200),
    phone VARCHAR(50),
    country_code VARCHAR(2) REFERENCES countries(code),
    preferred_currency VARCHAR(3) DEFAULT 'USD',
    preferred_language VARCHAR(5) DEFAULT 'en',
    avatar_url TEXT,
    is_verified BOOLEAN DEFAULT false,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 4. SEARCH QUERIES (Analytics)
-- ============================================

CREATE TABLE search_queries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user_profiles(id),
    session_id VARCHAR(100),
    country_code VARCHAR(2) REFERENCES countries(code),
    service_type VARCHAR(50) NOT NULL,
    search_params JSONB NOT NULL, -- Flexible storage for all search parameters
    results_count INTEGER,
    user_agent TEXT,
    ip_address INET,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_search_queries_service ON search_queries(service_type, created_at);
CREATE INDEX idx_search_queries_country ON search_queries(country_code, created_at);

-- ============================================
-- 5. BOOKINGS
-- ============================================

CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_reference VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES user_profiles(id),
    country_code VARCHAR(2) REFERENCES countries(code),
    service_type VARCHAR(50) NOT NULL,
    provider_id UUID REFERENCES service_providers(id),
    
    -- Booking details
    booking_details JSONB NOT NULL,
    traveler_details JSONB NOT NULL,
    
    -- Pricing
    total_amount DECIMAL(10,2) NOT NULL,
    commission_amount DECIMAL(10,2) NOT NULL,
    currency_code VARCHAR(3) NOT NULL,
    
    -- Status
    status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, cancelled, completed
    payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, refunded
    
    -- Dates
    booking_date TIMESTAMP DEFAULT NOW(),
    travel_start_date DATE,
    travel_end_date DATE,
    
    -- Metadata
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_bookings_user ON bookings(user_id, created_at);
CREATE INDEX idx_bookings_status ON bookings(status, created_at);
CREATE INDEX idx_bookings_reference ON bookings(booking_reference);

-- ============================================
-- 6. PAYMENTS
-- ============================================

CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id),
    payment_method VARCHAR(50) NOT NULL, -- stripe, paystack, mpesa, orange_money, etc.
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed, refunded
    transaction_id VARCHAR(200),
    provider_response JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 7. AI TRIP PLANS (Dia)
-- ============================================

CREATE TABLE ai_trip_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user_profiles(id),
    session_id VARCHAR(100),
    
    -- Input
    user_query TEXT NOT NULL,
    parsed_intent JSONB, -- destination, dates, budget, travelers, interests
    
    -- Output
    generated_plan JSONB NOT NULL, -- itinerary, recommendations, bookable_items
    estimated_cost JSONB, -- breakdown by currency
    
    -- Status
    status VARCHAR(50) DEFAULT 'draft', -- draft, shared, booked
    version INTEGER DEFAULT 1,
    
    -- Metadata
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 8. MULTI-CITY FLIGHT SEGMENTS
-- ============================================

CREATE TABLE multi_city_segments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    search_query_id UUID REFERENCES search_queries(id),
    booking_id UUID REFERENCES bookings(id),
    segment_number INTEGER NOT NULL,
    from_location VARCHAR(100) NOT NULL,
    to_location VARCHAR(100) NOT NULL,
    departure_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 9. BRIDGE ANALYTICS
-- ============================================

CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(100) NOT NULL, -- 'page_view', 'search', 'booking', 'conversion'
    user_id UUID REFERENCES user_profiles(id),
    session_id VARCHAR(100),
    country_code VARCHAR(2),
    event_data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_analytics_events_type ON analytics_events(event_type, created_at);
CREATE INDEX idx_analytics_events_country ON analytics_events(country_code, created_at);

-- ============================================
-- 10. SERVICE CTAs (Dynamic Content)
-- ============================================

CREATE TABLE service_ctas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country_code VARCHAR(2) REFERENCES countries(code),
    service_type VARCHAR(50) NOT NULL,
    main_text TEXT NOT NULL,
    sub_text TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Seed CTAs
INSERT INTO service_ctas (country_code, service_type, main_text, sub_text) VALUES
('PAN', 'flights', 'Fly to Africa: Your Epic Journey Begins!', 'Exclusive flight deals to Africa''s vibrant cities & wild safaris with Bridge55.'),
('PAN', 'stays', 'Find Your Perfect African Retreat', 'Luxury lodges, boutique hotels: unforgettable African stays powered by Bridge55.'),
('PAN', 'cars', 'Explore Africa on Your Terms', 'Reliable car rentals for African safaris, city escapes & scenic routes - Bridge55.'),
('PAN', 'experiences', 'Unlock Unforgettable African Adventures', 'Authentic African safaris, cultural tours & thrilling activities across 54 countries.'),
('PAN', 'evisa', 'Your African Journey Starts Here', 'Secure your eVisa: quick, easy & hassle-free travel across Africa - Bridge55.'),
('PAN', 'ai', 'Dia: Your AI African Travel Expert', 'Dia crafts personalized, authentic & seamless African itineraries powered by Bridge55.');

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_trip_plans ENABLE ROW LEVEL SECURITY;

-- Users can only see their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- Users can only see their own bookings
CREATE POLICY "Users can view own bookings" ON bookings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings" ON bookings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Public read access to countries and providers
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Countries are viewable by everyone" ON countries
    FOR SELECT USING (true);

ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service providers are viewable by everyone" ON service_providers
    FOR SELECT USING (is_active = true);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables with updated_at
CREATE TRIGGER update_countries_updated_at BEFORE UPDATE ON countries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_service_providers_updated_at BEFORE UPDATE ON service_providers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Generate unique booking reference
CREATE OR REPLACE FUNCTION generate_booking_reference()
RETURNS TRIGGER AS $$
BEGIN
    NEW.booking_reference = 'BR55-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6));
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER set_booking_reference BEFORE INSERT ON bookings FOR EACH ROW EXECUTE FUNCTION generate_booking_reference();

-- ============================================
-- ANALYTICS VIEWS
-- ============================================

-- Daily bookings by country
CREATE VIEW daily_bookings_by_country AS
SELECT 
    country_code,
    DATE(booking_date) as date,
    COUNT(*) as total_bookings,
    SUM(total_amount) as total_revenue,
    SUM(commission_amount) as total_commission
FROM bookings
WHERE status != 'cancelled'
GROUP BY country_code, DATE(booking_date);

-- Service popularity
CREATE VIEW service_popularity AS
SELECT 
    service_type,
    COUNT(*) as search_count,
    COUNT(DISTINCT user_id) as unique_users
FROM search_queries
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY service_type
ORDER BY search_count DESC;

-- Top destinations
CREATE VIEW top_destinations AS
SELECT 
    search_params->>'destination' as destination,
    service_type,
    COUNT(*) as search_count
FROM search_queries
WHERE created_at >= NOW() - INTERVAL '30 days'
    AND search_params->>'destination' IS NOT NULL
GROUP BY destination, service_type
ORDER BY search_count DESC
LIMIT 20;

-- ============================================
-- DONE! 
-- ============================================

SELECT 'Bridge55 database schema created successfully! 🚀' as message;
```

**RUN THIS ENTIRE SCRIPT** in Supabase SQL Editor.

---

### Step 3: Set Up Storage Buckets (5 min)

Go to **Storage** in Supabase dashboard:

1. Create bucket: `avatars` (public)
2. Create bucket: `provider-logos` (public)
3. Create bucket: `booking-documents` (private)

---

### Step 4: Configure Authentication (5 min)

Go to **Authentication** → **Providers**:

1. **Enable Email** (default - for testing)
2. **Enable Google** (later - for production)
3. **Enable Facebook** (later - for production)

**Email Templates** (customize later):
- Confirmation email
- Password reset
- Magic link

---

## ⚡ Edge Functions (API Endpoints)

### Install Supabase CLI

```bash
npm install -g supabase
supabase login
supabase link --project-ref YOUR_PROJECT_ID
```

### Create Edge Functions

```bash
# Initialize functions
supabase functions new search-flights
supabase functions new search-stays
supabase functions new search-cars
supabase functions new create-booking
supabase functions new ai-plan-trip
```

I'll create the complete Edge Functions code in the next step!

---

## 📊 Verify Setup

Run this in SQL Editor to check everything:

```sql
-- Check all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Should show:
-- analytics_events
-- ai_trip_plans
-- bookings
-- countries
-- multi_city_segments
-- payments
-- search_queries
-- service_ctas
-- service_providers
-- user_profiles

-- Check countries data
SELECT code, name, is_federated FROM countries;

-- Check sample providers
SELECT provider_name, service_type, country_code FROM service_providers;
```

---

## 🔐 Environment Variables

Create `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (KEEP SECRET!)

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

---

## ✅ Success Criteria

You're done when:
- [ ] Supabase project created
- [ ] All 10 tables exist
- [ ] 5 countries seeded
- [ ] Sample providers added
- [ ] RLS policies enabled
- [ ] Storage buckets created
- [ ] Environment variables saved

**Time to complete**: 30 minutes  
**Difficulty**: Easy (copy-paste SQL)

---

## 🚀 Next Steps

1. Create Edge Functions (API endpoints)
2. Connect frontend to Supabase
3. Test authentication flow
4. Add mock data for testing

**Ready to build the Edge Functions?** Let me know!
