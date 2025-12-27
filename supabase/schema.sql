-- ============================================================================
-- BRIDGE55 SUPABASE DATABASE SCHEMA
-- Version: 1.0
-- Last Updated: December 27, 2025
-- Product: Visit Côte d'Ivoire (CI Demo) + Bridge55 Global
-- ============================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- ENUM TYPES
-- ============================================================================

CREATE TYPE operator_type AS ENUM ('company', 'individual');
CREATE TYPE operator_status AS ENUM ('pending', 'approved', 'suspended', 'rejected');
CREATE TYPE review_status AS ENUM ('pending', 'approved', 'rejected', 'flagged');
CREATE TYPE experience_category AS ENUM (
    'culture', 'adventure', 'nature', 'culinary', 'wellness', 
    'nightlife', 'beach', 'heritage', 'wildlife', 'sports'
);

-- ============================================================================
-- COUNTRIES TABLE
-- ============================================================================

CREATE TABLE countries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(2) UNIQUE NOT NULL,  -- ISO 3166-1 alpha-2 (e.g., 'CI', 'SN', 'KE')
    name VARCHAR(100) NOT NULL,
    name_local VARCHAR(100),
    flag_emoji VARCHAR(10),
    flag_url TEXT,
    currency_code VARCHAR(3) NOT NULL DEFAULT 'XOF',
    currency_symbol VARCHAR(10) DEFAULT 'CFA',
    timezone VARCHAR(50) DEFAULT 'Africa/Abidjan',
    vat_rate DECIMAL(5,2) DEFAULT 18.00,
    vat_label VARCHAR(50) DEFAULT 'VAT',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert Côte d'Ivoire as first country
INSERT INTO countries (code, name, name_local, flag_emoji, currency_code, currency_symbol, timezone, vat_rate)
VALUES ('CI', 'Côte d''Ivoire', 'Côte d''Ivoire', '🇨🇮', 'XOF', 'CFA', 'Africa/Abidjan', 18.00);

-- ============================================================================
-- REGIONS TABLE
-- ============================================================================

CREATE TABLE regions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,  -- URL-friendly: 'abidjan', 'grand-bassam'
    country_code VARCHAR(2) REFERENCES countries(code),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    hero_image TEXT,
    gallery_images TEXT[] DEFAULT '{}',
    highlights TEXT[] DEFAULT '{}',
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    is_featured BOOLEAN DEFAULT false,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert CI regions
INSERT INTO regions (slug, country_code, name, description, is_featured, display_order) VALUES
('abidjan', 'CI', 'Abidjan', 'The economic capital and largest city of Côte d''Ivoire, known for its vibrant nightlife, modern skyline, and bustling markets.', true, 1),
('grand-bassam', 'CI', 'Grand-Bassam', 'A UNESCO World Heritage Site, this historic colonial town offers beaches, cultural heritage, and artisan markets.', true, 2),
('yamoussoukro', 'CI', 'Yamoussoukro', 'The political capital, home to the magnificent Basilica of Our Lady of Peace and the Presidential Palace.', true, 3),
('bouake', 'CI', 'Bouaké', 'The second-largest city, a major commercial hub with traditional markets and cultural heritage.', true, 4),
('korhogo', 'CI', 'Korhogo', 'Gateway to the Senoufo culture, known for sacred forests, traditional crafts, and unique ceremonies.', false, 5),
('san-pedro', 'CI', 'San-Pédro', 'Major port city with beautiful beaches and gateway to western rainforests.', false, 6),
('man', 'CI', 'Man', 'Nestled in the mountainous west, known for stunning landscapes, waterfalls, and mask traditions.', false, 7),
('assinie', 'CI', 'Assinie', 'Popular beach resort destination with lagoons, luxury hotels, and water sports.', true, 8);

-- ============================================================================
-- INTERESTS TABLE (Categories/Tags)
-- ============================================================================

CREATE TABLE interests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),  -- Icon class or emoji
    hero_image TEXT,
    is_featured BOOLEAN DEFAULT false,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert CI interests
INSERT INTO interests (slug, name, description, icon, is_featured, display_order) VALUES
('culture-heritage', 'Culture & Heritage', 'Explore rich traditions, museums, and historical sites', '🏛️', true, 1),
('beaches-islands', 'Beaches & Islands', 'Relax on pristine beaches and coastal getaways', '🏖️', true, 2),
('nature-wildlife', 'Nature & Wildlife', 'Discover national parks, reserves, and natural wonders', '🌿', true, 3),
('adventure-sports', 'Adventure & Sports', 'Thrilling outdoor activities and extreme sports', '🧗', true, 4),
('culinary', 'Food & Cuisine', 'Taste authentic Ivorian dishes and culinary experiences', '🍲', true, 5),
('nightlife', 'Nightlife & Entertainment', 'Experience vibrant clubs, bars, and live music', '🎵', false, 6),
('wellness', 'Wellness & Spa', 'Rejuvenate with spa treatments and wellness retreats', '🧘', false, 7),
('shopping', 'Shopping & Markets', 'Browse local markets, crafts, and shopping districts', '🛍️', false, 8);

-- ============================================================================
-- COMPANIES TABLE (For Company-Type Operators)
-- ============================================================================

CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    registration_number VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    legal_name VARCHAR(200),
    country_code VARCHAR(2) REFERENCES countries(code),
    address TEXT,
    phone VARCHAR(50),
    email VARCHAR(255),
    website TEXT,
    tax_id VARCHAR(100),
    founded_year INT,
    logo_url TEXT,
    is_verified BOOLEAN DEFAULT false,
    verification_date TIMESTAMPTZ,
    max_operators INT DEFAULT 10,  -- Max individual operators under company
    status operator_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- OPERATORS TABLE (Individual Tour Operators/Guides)
-- ============================================================================

CREATE TABLE operators (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    external_id VARCHAR(50) UNIQUE,  -- Legacy ID (e.g., 'op-exp-1', 'co-ci-10001')
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,  -- NULL if independent
    type operator_type NOT NULL,
    
    -- Basic Info
    name VARCHAR(200) NOT NULL,
    tagline VARCHAR(300),
    about TEXT,
    
    -- Contact
    phone VARCHAR(50),
    whatsapp VARCHAR(50),
    email VARCHAR(255),
    website TEXT,
    
    -- Location
    country_code VARCHAR(2) REFERENCES countries(code) DEFAULT 'CI',
    base_city VARCHAR(100),
    regions TEXT[] DEFAULT '{}',  -- Array of region slugs
    
    -- Profile
    logo_url TEXT,
    cover_image TEXT,
    gallery_images TEXT[] DEFAULT '{}',
    
    -- Capabilities
    languages TEXT[] DEFAULT '{FR}',
    specialties TEXT[] DEFAULT '{}',
    services TEXT[] DEFAULT '{}',
    
    -- Business Info
    registration_number VARCHAR(100),
    since_year INT,
    
    -- Status & Verification
    status operator_status DEFAULT 'pending',
    is_verified BOOLEAN DEFAULT false,
    is_top_rated BOOLEAN DEFAULT false,
    is_insured BOOLEAN DEFAULT false,
    is_local_expert BOOLEAN DEFAULT false,
    approved_at TIMESTAMPTZ,
    approved_by UUID,
    
    -- Stats (denormalized for performance)
    rating_avg DECIMAL(3,2) DEFAULT 0,
    review_count INT DEFAULT 0,
    booking_count INT DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_operators_status ON operators(status);
CREATE INDEX idx_operators_country ON operators(country_code);
CREATE INDEX idx_operators_type ON operators(type);
CREATE INDEX idx_operators_rating ON operators(rating_avg DESC);
CREATE INDEX idx_operators_external_id ON operators(external_id);

-- ============================================================================
-- EXPERIENCES TABLE
-- ============================================================================

CREATE TABLE experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    external_id VARCHAR(50) UNIQUE,  -- Legacy ID (e.g., 'exp-1', 'exp-2')
    operator_id UUID REFERENCES operators(id) ON DELETE CASCADE,
    
    -- Basic Info
    name VARCHAR(300) NOT NULL,
    description TEXT,
    category experience_category,
    
    -- Location
    location VARCHAR(200),
    region_slug VARCHAR(100) REFERENCES regions(slug),
    meeting_point TEXT,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    
    -- Media
    cover_image TEXT,
    images TEXT[] DEFAULT '{}',
    video_url TEXT,
    
    -- Details
    duration VARCHAR(100),  -- e.g., '4 hours', '2 days'
    duration_minutes INT,
    group_size_min INT DEFAULT 1,
    group_size_max INT DEFAULT 20,
    
    -- Schedule
    days_of_week TEXT[] DEFAULT '{Mon,Tue,Wed,Thu,Fri,Sat,Sun}',
    start_times TEXT[] DEFAULT '{}',
    languages TEXT[] DEFAULT '{FR}',
    
    -- Pricing (in local currency, typically XOF)
    price DECIMAL(12,2) NOT NULL,
    price_child DECIMAL(12,2),
    discount_percent INT DEFAULT 0,
    
    -- Content
    highlights TEXT[] DEFAULT '{}',
    itinerary JSONB DEFAULT '[]',  -- Array of {time, activity, description}
    included TEXT[] DEFAULT '{}',
    not_included TEXT[] DEFAULT '{}',
    requirements TEXT[] DEFAULT '{}',
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    is_dia_pick BOOLEAN DEFAULT false,  -- DIA (AI Concierge) recommended
    
    -- Stats (denormalized)
    rating_avg DECIMAL(3,2) DEFAULT 0,
    review_count INT DEFAULT 0,
    booking_count INT DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_experiences_operator ON experiences(operator_id);
CREATE INDEX idx_experiences_region ON experiences(region_slug);
CREATE INDEX idx_experiences_category ON experiences(category);
CREATE INDEX idx_experiences_active ON experiences(is_active);
CREATE INDEX idx_experiences_rating ON experiences(rating_avg DESC);

-- ============================================================================
-- ITINERARIES TABLE (Multi-Day Curated Tours)
-- ============================================================================

CREATE TABLE itineraries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    external_id VARCHAR(50) UNIQUE,  -- Legacy ID (e.g., 'it-1', 'it-2')
    operator_id UUID REFERENCES operators(id) ON DELETE CASCADE,
    
    -- Basic Info
    title VARCHAR(300) NOT NULL,
    description TEXT,
    
    -- Media
    cover_image TEXT,
    images TEXT[] DEFAULT '{}',
    
    -- Details
    duration_days INT NOT NULL,
    group_size_min INT DEFAULT 2,
    group_size_max INT DEFAULT 15,
    languages TEXT[] DEFAULT '{FR,EN}',
    
    -- Route
    regions TEXT[] DEFAULT '{}',  -- Array of region slugs visited
    cities TEXT[] DEFAULT '{}',   -- Array of city names
    
    -- Pricing
    price DECIMAL(12,2) NOT NULL,
    discount_percent INT DEFAULT 0,
    price_includes TEXT[] DEFAULT '{}',
    price_excludes TEXT[] DEFAULT '{}',
    
    -- Schedule (detailed day-by-day)
    days JSONB DEFAULT '[]',  -- Array of {day, title, description, activities[], meals[], accommodation}
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    is_dia_pick BOOLEAN DEFAULT false,
    
    -- Stats
    rating_avg DECIMAL(3,2) DEFAULT 0,
    review_count INT DEFAULT 0,
    booking_count INT DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_itineraries_operator ON itineraries(operator_id);
CREATE INDEX idx_itineraries_duration ON itineraries(duration_days);
CREATE INDEX idx_itineraries_active ON itineraries(is_active);

-- ============================================================================
-- REVIEWS TABLE
-- ============================================================================

CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- What is being reviewed (one of these will be set)
    operator_id UUID REFERENCES operators(id) ON DELETE CASCADE,
    experience_id UUID REFERENCES experiences(id) ON DELETE CASCADE,
    itinerary_id UUID REFERENCES itineraries(id) ON DELETE CASCADE,
    
    -- Reviewer
    reviewer_name VARCHAR(200) NOT NULL,
    reviewer_email VARCHAR(255),
    reviewer_country VARCHAR(2),
    reviewer_avatar TEXT,
    
    -- Review Content
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(200),
    text TEXT,
    
    -- Verification
    is_verified BOOLEAN DEFAULT false,  -- Verified purchaser
    booking_id UUID,  -- Link to booking if verified
    
    -- Status
    status review_status DEFAULT 'pending',
    moderated_at TIMESTAMPTZ,
    moderated_by UUID,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Ensure only one entity is reviewed per review
    CONSTRAINT review_single_entity CHECK (
        (operator_id IS NOT NULL)::int + 
        (experience_id IS NOT NULL)::int + 
        (itinerary_id IS NOT NULL)::int = 1
    )
);

-- Create indexes
CREATE INDEX idx_reviews_operator ON reviews(operator_id);
CREATE INDEX idx_reviews_experience ON reviews(experience_id);
CREATE INDEX idx_reviews_itinerary ON reviews(itinerary_id);
CREATE INDEX idx_reviews_status ON reviews(status);

-- ============================================================================
-- USER FAVORITES TABLE
-- ============================================================================

CREATE TABLE user_favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,  -- Will link to auth.users when Supabase Auth is configured
    
    -- What is favorited (one of these will be set)
    operator_id UUID REFERENCES operators(id) ON DELETE CASCADE,
    experience_id UUID REFERENCES experiences(id) ON DELETE CASCADE,
    itinerary_id UUID REFERENCES itineraries(id) ON DELETE CASCADE,
    region_id UUID REFERENCES regions(id) ON DELETE CASCADE,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Unique constraint per user per entity
    UNIQUE (user_id, operator_id),
    UNIQUE (user_id, experience_id),
    UNIQUE (user_id, itinerary_id),
    UNIQUE (user_id, region_id)
);

-- ============================================================================
-- EXPERIENCE_INTERESTS JUNCTION TABLE
-- ============================================================================

CREATE TABLE experience_interests (
    experience_id UUID REFERENCES experiences(id) ON DELETE CASCADE,
    interest_id UUID REFERENCES interests(id) ON DELETE CASCADE,
    PRIMARY KEY (experience_id, interest_id)
);

-- ============================================================================
-- OPERATOR_REGIONS JUNCTION TABLE
-- ============================================================================

CREATE TABLE operator_regions (
    operator_id UUID REFERENCES operators(id) ON DELETE CASCADE,
    region_id UUID REFERENCES regions(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT false,
    PRIMARY KEY (operator_id, region_id)
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE operators ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- Public read access for countries, regions, interests
CREATE POLICY "Public read access" ON countries FOR SELECT USING (true);
CREATE POLICY "Public read access" ON regions FOR SELECT USING (true);
CREATE POLICY "Public read access" ON interests FOR SELECT USING (true);

-- Only approved operators visible publicly
CREATE POLICY "Public read approved operators" ON operators 
    FOR SELECT USING (status = 'approved');

-- Only active experiences visible publicly
CREATE POLICY "Public read active experiences" ON experiences 
    FOR SELECT USING (is_active = true);

-- Only active itineraries visible publicly
CREATE POLICY "Public read active itineraries" ON itineraries 
    FOR SELECT USING (is_active = true);

-- Only approved and verified reviews visible publicly
CREATE POLICY "Public read approved reviews" ON reviews 
    FOR SELECT USING (status = 'approved' AND is_verified = true);

-- Users can only see their own favorites
CREATE POLICY "Users read own favorites" ON user_favorites 
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own favorites" ON user_favorites 
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own favorites" ON user_favorites 
    FOR DELETE USING (auth.uid() = user_id);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_countries_updated_at BEFORE UPDATE ON countries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_regions_updated_at BEFORE UPDATE ON regions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_operators_updated_at BEFORE UPDATE ON operators
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON experiences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_itineraries_updated_at BEFORE UPDATE ON itineraries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Function to recalculate operator rating
CREATE OR REPLACE FUNCTION recalculate_operator_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE operators SET
        rating_avg = COALESCE((
            SELECT AVG(rating)::DECIMAL(3,2) 
            FROM reviews 
            WHERE operator_id = COALESCE(NEW.operator_id, OLD.operator_id)
            AND status = 'approved'
        ), 0),
        review_count = (
            SELECT COUNT(*) 
            FROM reviews 
            WHERE operator_id = COALESCE(NEW.operator_id, OLD.operator_id)
            AND status = 'approved'
        )
    WHERE id = COALESCE(NEW.operator_id, OLD.operator_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update operator rating when review changes
CREATE TRIGGER update_operator_rating AFTER INSERT OR UPDATE OR DELETE ON reviews
    FOR EACH ROW EXECUTE FUNCTION recalculate_operator_rating();

-- ============================================================================
-- VIEWS FOR COMMON QUERIES
-- ============================================================================

-- Featured operators with all details
CREATE VIEW v_featured_operators AS
SELECT 
    o.*,
    c.name as company_name,
    c.logo_url as company_logo
FROM operators o
LEFT JOIN companies c ON o.company_id = c.id
WHERE o.status = 'approved'
AND (o.is_verified = true OR o.is_top_rated = true)
ORDER BY o.rating_avg DESC, o.review_count DESC;

-- Featured experiences with operator info
CREATE VIEW v_featured_experiences AS
SELECT 
    e.*,
    o.name as operator_name,
    o.logo_url as operator_logo,
    o.external_id as operator_external_id,
    r.name as region_name
FROM experiences e
JOIN operators o ON e.operator_id = o.id
LEFT JOIN regions r ON e.region_slug = r.slug
WHERE e.is_active = true
AND o.status = 'approved'
ORDER BY e.is_featured DESC, e.rating_avg DESC;

-- Featured itineraries with operator info
CREATE VIEW v_featured_itineraries AS
SELECT 
    i.*,
    o.name as operator_name,
    o.logo_url as operator_logo,
    o.external_id as operator_external_id
FROM itineraries i
JOIN operators o ON i.operator_id = o.id
WHERE i.is_active = true
AND o.status = 'approved'
ORDER BY i.is_featured DESC, i.rating_avg DESC;

-- ============================================================================
-- SEED DATA MIGRATION HELPER
-- ============================================================================

-- This function helps migrate demo data from JS files to Supabase
-- Run this after inserting operators to link experiences/itineraries
CREATE OR REPLACE FUNCTION link_operator_by_external_id(
    p_operator_external_id VARCHAR,
    p_experience_external_id VARCHAR DEFAULT NULL,
    p_itinerary_external_id VARCHAR DEFAULT NULL
) RETURNS VOID AS $$
DECLARE
    v_operator_id UUID;
BEGIN
    SELECT id INTO v_operator_id FROM operators WHERE external_id = p_operator_external_id;
    
    IF v_operator_id IS NULL THEN
        RAISE EXCEPTION 'Operator with external_id % not found', p_operator_external_id;
    END IF;
    
    IF p_experience_external_id IS NOT NULL THEN
        UPDATE experiences SET operator_id = v_operator_id 
        WHERE external_id = p_experience_external_id;
    END IF;
    
    IF p_itinerary_external_id IS NOT NULL THEN
        UPDATE itineraries SET operator_id = v_operator_id 
        WHERE external_id = p_itinerary_external_id;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- GRANT PERMISSIONS (for Supabase anon role)
-- ============================================================================

GRANT SELECT ON countries TO anon;
GRANT SELECT ON regions TO anon;
GRANT SELECT ON interests TO anon;
GRANT SELECT ON operators TO anon;
GRANT SELECT ON experiences TO anon;
GRANT SELECT ON itineraries TO anon;
GRANT SELECT ON reviews TO anon;
GRANT SELECT ON v_featured_operators TO anon;
GRANT SELECT ON v_featured_experiences TO anon;
GRANT SELECT ON v_featured_itineraries TO anon;

-- Authenticated users can manage favorites
GRANT SELECT, INSERT, DELETE ON user_favorites TO authenticated;

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================

