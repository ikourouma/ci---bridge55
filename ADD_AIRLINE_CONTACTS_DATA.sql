-- ================================================
-- BRIDGE55 AIRLINE CONTACTS DATABASE SCHEMA
-- ================================================
-- Purpose: Store location-based airline office contacts
-- Use Case: Dynamic contact info based on traveler location
-- Date: November 30, 2025
-- ================================================

-- DROP existing table if needed (CAREFUL in production!)
-- DROP TABLE IF EXISTS airline_offices CASCADE;

-- CREATE airline_offices table
CREATE TABLE IF NOT EXISTS airline_offices (
    id SERIAL PRIMARY KEY,
    airline_code VARCHAR(3) NOT NULL,  -- IATA code (KQ, ET, WK, etc.)
    airline_name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country_code VARCHAR(2) NOT NULL,  -- ISO 3166-1 alpha-2
    country_name VARCHAR(100) NOT NULL,
    office_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    phone_international VARCHAR(50),  -- With country code
    whatsapp VARCHAR(50),
    email VARCHAR(255),
    address TEXT,
    address_line2 TEXT,
    postal_code VARCHAR(20),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    office_hours JSONB,  -- {"monday": "08:00-18:00", ...}
    languages JSONB,  -- ["English", "French", "Swahili"]
    services JSONB,  -- ["ticketing", "baggage", "visa", "wheelchair"]
    is_headquarters BOOLEAN DEFAULT false,
    is_regional_hub BOOLEAN DEFAULT false,
    is_24_7 BOOLEAN DEFAULT false,
    website_url VARCHAR(500),
    social_media JSONB,  -- {"facebook": "...", "twitter": "..."}
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

-- CREATE indexes for fast lookups
CREATE INDEX idx_airline_city ON airline_offices(airline_code, city) WHERE is_active = true;
CREATE INDEX idx_airline_country ON airline_offices(airline_code, country_code) WHERE is_active = true;
CREATE INDEX idx_country ON airline_offices(country_code) WHERE is_active = true;
CREATE INDEX idx_location ON airline_offices USING GIST (
    ll_to_earth(latitude, longitude)
);

-- CREATE function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_airline_offices_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- CREATE trigger for updated_at
CREATE TRIGGER trigger_airline_offices_updated_at
    BEFORE UPDATE ON airline_offices
    FOR EACH ROW
    EXECUTE FUNCTION update_airline_offices_updated_at();

-- ================================================
-- SEED DATA - KENYA AIRWAYS (KQ)
-- ================================================

INSERT INTO airline_offices (
    airline_code, airline_name, city, country_code, country_name,
    office_name, phone, phone_international, whatsapp, email, address,
    latitude, longitude, office_hours, languages, services,
    is_headquarters, is_regional_hub, website_url
) VALUES
-- KENYA (Headquarters)
('KQ', 'Kenya Airways', 'Nairobi', 'KE', 'Kenya',
 'Kenya Airways Headquarters', '020 327 4000', '+254 20 327 4000', '+254 711 024 000',
 'nairobi@kenya-airways.com', 'Barclays Plaza, Loita Street, Nairobi',
 -1.2864, 36.8172,
 '{"monday": "08:00-18:00", "tuesday": "08:00-18:00", "wednesday": "08:00-18:00", "thursday": "08:00-18:00", "friday": "08:00-18:00", "saturday": "09:00-13:00", "sunday": "Closed"}'::jsonb,
 '["English", "Swahili"]'::jsonb,
 '["ticketing", "baggage", "visa_assistance", "wheelchair", "special_meals", "business_lounge"]'::jsonb,
 true, true, 'https://www.kenya-airways.com'),

-- CÔTE D'IVOIRE
('KQ', 'Kenya Airways', 'Abidjan', 'CI', 'Côte d''Ivoire',
 'Kenya Airways Abidjan Office', '20 21 41 00', '+225 20 21 41 00', '+225 0700 123 456',
 'abidjan@kenya-airways.com', 'Rue du Commerce, Plateau, Abidjan',
 5.3600, -4.0083,
 '{"monday": "08:00-18:00", "tuesday": "08:00-18:00", "wednesday": "08:00-18:00", "thursday": "08:00-18:00", "friday": "08:00-18:00", "saturday": "09:00-13:00", "sunday": "Closed"}'::jsonb,
 '["French", "English"]'::jsonb,
 '["ticketing", "baggage", "visa_assistance", "wheelchair"]'::jsonb,
 false, true, 'https://www.kenya-airways.com'),

-- GHANA
('KQ', 'Kenya Airways', 'Accra', 'GH', 'Ghana',
 'Kenya Airways Accra Office', '030 277 1200', '+233 30 277 1200', '+233 50 123 4567',
 'accra@kenya-airways.com', 'Independence Avenue, Accra',
 5.5560, -0.1969,
 '{"monday": "08:00-18:00", "tuesday": "08:00-18:00", "wednesday": "08:00-18:00", "thursday": "08:00-18:00", "friday": "08:00-18:00", "saturday": "09:00-13:00", "sunday": "Closed"}'::jsonb,
 '["English", "Twi", "Ga"]'::jsonb,
 '["ticketing", "baggage", "visa_assistance", "wheelchair"]'::jsonb,
 false, true, 'https://www.kenya-airways.com'),

-- MOROCCO
('KQ', 'Kenya Airways', 'Casablanca', 'MA', 'Morocco',
 'Kenya Airways Casablanca Office', '0522 48 89 00', '+212 522 48 89 00', '+212 6 61 23 45 67',
 'casablanca@kenya-airways.com', 'Boulevard Mohammed V, Casablanca',
 33.5731, -7.5898,
 '{"monday": "08:30-18:30", "tuesday": "08:30-18:30", "wednesday": "08:30-18:30", "thursday": "08:30-18:30", "friday": "08:30-18:30", "saturday": "09:00-13:00", "sunday": "Closed"}'::jsonb,
 '["Arabic", "French", "English"]'::jsonb,
 '["ticketing", "baggage", "visa_assistance", "wheelchair"]'::jsonb,
 false, true, 'https://www.kenya-airways.com'),

-- NIGERIA
('KQ', 'Kenya Airways', 'Lagos', 'NG', 'Nigeria',
 'Kenya Airways Lagos Office', '01 448 0600', '+234 1 448 0600', '+234 802 345 6789',
 'lagos@kenya-airways.com', 'Victoria Island, Lagos',
 6.4281, 3.4219,
 '{"monday": "08:00-18:00", "tuesday": "08:00-18:00", "wednesday": "08:00-18:00", "thursday": "08:00-18:00", "friday": "08:00-18:00", "saturday": "09:00-13:00", "sunday": "Closed"}'::jsonb,
 '["English", "Yoruba", "Igbo"]'::jsonb,
 '["ticketing", "baggage", "visa_assistance", "wheelchair"]'::jsonb,
 false, true, 'https://www.kenya-airways.com'),

-- SENEGAL
('KQ', 'Kenya Airways', 'Dakar', 'SN', 'Senegal',
 'Kenya Airways Dakar Office', '33 889 98 00', '+221 33 889 98 00', '+221 77 123 45 67',
 'dakar@kenya-airways.com', 'Avenue Léopold Sédar Senghor, Dakar',
 14.7167, -17.4677,
 '{"monday": "08:00-18:00", "tuesday": "08:00-18:00", "wednesday": "08:00-18:00", "thursday": "08:00-18:00", "friday": "08:00-18:00", "saturday": "09:00-13:00", "sunday": "Closed"}'::jsonb,
 '["French", "Wolof", "English"]'::jsonb,
 '["ticketing", "baggage", "visa_assistance", "wheelchair"]'::jsonb,
 false, false, 'https://www.kenya-airways.com');

-- ================================================
-- SEED DATA - ETHIOPIAN AIRLINES (ET)
-- ================================================

INSERT INTO airline_offices (
    airline_code, airline_name, city, country_code, country_name,
    office_name, phone, phone_international, whatsapp, email, address,
    latitude, longitude, office_hours, languages, services,
    is_headquarters, is_regional_hub, website_url
) VALUES
-- ETHIOPIA (Headquarters)
('ET', 'Ethiopian Airlines', 'Addis Ababa', 'ET', 'Ethiopia',
 'Ethiopian Airlines Headquarters', '011 517 8888', '+251 11 517 8888', '+251 91 123 4567',
 'addisababa@ethiopianairlines.com', 'Bole International Airport, Addis Ababa',
 8.9806, 38.7578,
 '{"monday": "00:00-23:59", "tuesday": "00:00-23:59", "wednesday": "00:00-23:59", "thursday": "00:00-23:59", "friday": "00:00-23:59", "saturday": "00:00-23:59", "sunday": "00:00-23:59"}'::jsonb,
 '["Amharic", "English"]'::jsonb,
 '["ticketing", "baggage", "visa_assistance", "wheelchair", "special_meals", "business_lounge", "medical_assistance"]'::jsonb,
 true, true, 'https://www.ethiopianairlines.com'),

-- GHANA
('ET', 'Ethiopian Airlines', 'Accra', 'GH', 'Ghana',
 'Ethiopian Airlines Accra Office', '030 277 5200', '+233 30 277 5200', '+233 50 987 6543',
 'accra@ethiopianairlines.com', 'Liberation Road, Accra',
 5.5560, -0.1969,
 '{"monday": "08:00-18:00", "tuesday": "08:00-18:00", "wednesday": "08:00-18:00", "thursday": "08:00-18:00", "friday": "08:00-18:00", "saturday": "09:00-13:00", "sunday": "Closed"}'::jsonb,
 '["English", "Twi"]'::jsonb,
 '["ticketing", "baggage", "visa_assistance", "wheelchair"]'::jsonb,
 false, true, 'https://www.ethiopianairlines.com'),

-- KENYA
('ET', 'Ethiopian Airlines', 'Nairobi', 'KE', 'Kenya',
 'Ethiopian Airlines Nairobi Office', '020 823 5000', '+254 20 823 5000', '+254 722 345 678',
 'nairobi@ethiopianairlines.com', 'Kenyatta Avenue, Nairobi',
 -1.2864, 36.8172,
 '{"monday": "08:00-18:00", "tuesday": "08:00-18:00", "wednesday": "08:00-18:00", "thursday": "08:00-18:00", "friday": "08:00-18:00", "saturday": "09:00-13:00", "sunday": "Closed"}'::jsonb,
 '["English", "Swahili"]'::jsonb,
 '["ticketing", "baggage", "visa_assistance", "wheelchair"]'::jsonb,
 false, true, 'https://www.ethiopianairlines.com');

-- ================================================
-- SEED DATA - SOUTH AFRICAN AIRWAYS (SA)
-- ================================================

INSERT INTO airline_offices (
    airline_code, airline_name, city, country_code, country_name,
    office_name, phone, phone_international, whatsapp, email, address,
    latitude, longitude, office_hours, languages, services,
    is_headquarters, is_regional_hub, website_url
) VALUES
-- SOUTH AFRICA (Headquarters)
('SA', 'South African Airways', 'Johannesburg', 'ZA', 'South Africa',
 'SAA Airways Park', '011 978 5313', '+27 11 978 5313', '+27 82 123 4567',
 'johannesburg@flysaa.com', 'Airways Park, O.R. Tambo Airport, Johannesburg',
 -26.1367, 28.2411,
 '{"monday": "08:00-18:00", "tuesday": "08:00-18:00", "wednesday": "08:00-18:00", "thursday": "08:00-18:00", "friday": "08:00-18:00", "saturday": "09:00-13:00", "sunday": "Closed"}'::jsonb,
 '["English", "Afrikaans", "Zulu"]'::jsonb,
 '["ticketing", "baggage", "visa_assistance", "wheelchair", "special_meals", "business_lounge"]'::jsonb,
 true, true, 'https://www.flysaa.com'),

-- GHANA
('SA', 'South African Airways', 'Accra', 'GH', 'Ghana',
 'SAA Accra Office', '030 277 6000', '+233 30 277 6000', '+233 50 234 5678',
 'accra@flysaa.com', 'Osu, Accra',
 5.5560, -0.1969,
 '{"monday": "08:00-18:00", "tuesday": "08:00-18:00", "wednesday": "08:00-18:00", "thursday": "08:00-18:00", "friday": "08:00-18:00", "saturday": "09:00-13:00", "sunday": "Closed"}'::jsonb,
 '["English"]'::jsonb,
 '["ticketing", "baggage", "visa_assistance"]'::jsonb,
 false, false, 'https://www.flysaa.com');

-- ================================================
-- HELPER VIEWS
-- ================================================

-- View: Get all active offices by airline
CREATE OR REPLACE VIEW v_airline_offices_active AS
SELECT 
    airline_code,
    airline_name,
    city,
    country_code,
    country_name,
    office_name,
    phone_international as phone,
    whatsapp,
    email,
    address,
    latitude,
    longitude,
    is_headquarters,
    is_regional_hub
FROM airline_offices
WHERE is_active = true
ORDER BY airline_code, is_headquarters DESC, is_regional_hub DESC, city;

-- View: Get offices grouped by country
CREATE OR REPLACE VIEW v_offices_by_country AS
SELECT 
    country_code,
    country_name,
    COUNT(*) as office_count,
    json_agg(
        json_build_object(
            'airline', airline_name,
            'city', city,
            'phone', phone_international,
            'email', email
        )
    ) as offices
FROM airline_offices
WHERE is_active = true
GROUP BY country_code, country_name
ORDER BY office_count DESC;

-- ================================================
-- SUPABASE RLS POLICIES
-- ================================================

-- Enable RLS
ALTER TABLE airline_offices ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access
CREATE POLICY "Airline offices are publicly readable"
    ON airline_offices
    FOR SELECT
    TO public
    USING (is_active = true);

-- Policy: Only authenticated users can insert
CREATE POLICY "Authenticated users can insert airline offices"
    ON airline_offices
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Policy: Only authenticated users can update
CREATE POLICY "Authenticated users can update airline offices"
    ON airline_offices
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ================================================
-- UTILITY FUNCTIONS
-- ================================================

-- Function: Find nearest office by coordinates
CREATE OR REPLACE FUNCTION find_nearest_airline_office(
    p_airline_code VARCHAR(3),
    p_latitude DECIMAL(10, 8),
    p_longitude DECIMAL(11, 8),
    p_limit INT DEFAULT 1
)
RETURNS TABLE (
    office_id INT,
    office_name VARCHAR(255),
    city VARCHAR(100),
    country VARCHAR(100),
    phone VARCHAR(50),
    whatsapp VARCHAR(50),
    email VARCHAR(255),
    address TEXT,
    distance_km NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        id,
        airline_offices.office_name,
        airline_offices.city,
        country_name,
        phone_international,
        airline_offices.whatsapp,
        airline_offices.email,
        airline_offices.address,
        ROUND(
            earth_distance(
                ll_to_earth(p_latitude, p_longitude),
                ll_to_earth(latitude, longitude)
            ) / 1000, 2
        ) AS distance_km
    FROM airline_offices
    WHERE airline_code = p_airline_code
      AND is_active = true
    ORDER BY 
        earth_distance(
            ll_to_earth(p_latitude, p_longitude),
            ll_to_earth(latitude, longitude)
        )
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- Function: Get office by city
CREATE OR REPLACE FUNCTION get_airline_office_by_city(
    p_airline_code VARCHAR(3),
    p_city VARCHAR(100)
)
RETURNS TABLE (
    office_name VARCHAR(255),
    phone VARCHAR(50),
    whatsapp VARCHAR(50),
    email VARCHAR(255),
    address TEXT,
    office_hours JSONB,
    languages JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        airline_offices.office_name,
        phone_international,
        airline_offices.whatsapp,
        airline_offices.email,
        airline_offices.address,
        airline_offices.office_hours,
        airline_offices.languages
    FROM airline_offices
    WHERE airline_code = p_airline_code
      AND LOWER(city) = LOWER(p_city)
      AND is_active = true
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- ================================================
-- SAMPLE QUERIES
-- ================================================

-- Query 1: Get all Kenya Airways offices
-- SELECT * FROM airline_offices WHERE airline_code = 'KQ' AND is_active = true;

-- Query 2: Get office by city
-- SELECT * FROM get_airline_office_by_city('KQ', 'Abidjan');

-- Query 3: Find nearest office to coordinates (Abidjan example)
-- SELECT * FROM find_nearest_airline_office('KQ', 5.3600, -4.0083, 3);

-- Query 4: Count offices by country
-- SELECT * FROM v_offices_by_country;

-- Query 5: Get all West African offices
-- SELECT * FROM airline_offices 
-- WHERE country_code IN ('CI', 'GH', 'SN', 'NG', 'BF', 'ML', 'NE')
--   AND is_active = true
-- ORDER BY airline_code, city;

-- ================================================
-- SUCCESS MESSAGE
-- ================================================

DO $$
BEGIN
    RAISE NOTICE '✅ Airline contacts schema created successfully!';
    RAISE NOTICE '📊 Total offices: %', (SELECT COUNT(*) FROM airline_offices);
    RAISE NOTICE '✈️ Airlines covered: %', (SELECT COUNT(DISTINCT airline_code) FROM airline_offices);
    RAISE NOTICE '🌍 Countries covered: %', (SELECT COUNT(DISTINCT country_code) FROM airline_offices);
END $$;
















