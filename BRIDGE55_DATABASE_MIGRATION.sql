-- ============================================
-- BRIDGE55 - COMPREHENSIVE DATABASE MIGRATION
-- Version: 1.0
-- Date: November 28, 2025
-- Purpose: Create all new tables for enhanced features
-- ============================================

-- This migration adds 5 new core tables:
-- 1. search_queries - Track all user searches
-- 2. analytics_events - Track all user events
-- 3. ai_trip_plans - Store AI-generated trip plans
-- 4. country_themes - Country-specific theming
-- 5. service_ctas - Dynamic CTA content

-- ============================================
-- TABLE 1: search_queries
-- Purpose: Log all searches for analytics
-- ============================================

CREATE TABLE IF NOT EXISTS search_queries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- User & Session
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id VARCHAR(255) NOT NULL,
  
  -- Service Information
  service_type VARCHAR(50) NOT NULL CHECK (service_type IN ('flights', 'stays', 'cars', 'experiences', 'packages', 'evisa', 'ai')),
  sub_service_type VARCHAR(50), -- 'rental-cars', 'taxis', 'rideshare', 'tours', 'events', etc.
  
  -- Search Parameters (stored as JSONB for flexibility)
  search_params JSONB NOT NULL DEFAULT '{}',
  
  -- Results
  results_count INTEGER DEFAULT 0,
  results_shown INTEGER DEFAULT 0,
  
  -- Context
  tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
  country_code CHAR(2),
  
  -- Device & Location
  device_type VARCHAR(50), -- 'mobile', 'tablet', 'desktop'
  browser VARCHAR(100),
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  
  -- Booking Outcome
  booking_id UUID, -- Will reference bookings table
  clicked_result_ids UUID[], -- Array of result IDs user clicked
  converted BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  results_viewed_at TIMESTAMPTZ,
  detail_viewed_at TIMESTAMPTZ,
  booking_created_at TIMESTAMPTZ
);

-- Indexes for search_queries
CREATE INDEX idx_search_queries_service ON search_queries(service_type);
CREATE INDEX idx_search_queries_user ON search_queries(user_id);
CREATE INDEX idx_search_queries_session ON search_queries(session_id);
CREATE INDEX idx_search_queries_tenant ON search_queries(tenant_id);
CREATE INDEX idx_search_queries_created ON search_queries(created_at DESC);
CREATE INDEX idx_search_queries_booking ON search_queries(booking_id) WHERE booking_id IS NOT NULL;
CREATE INDEX idx_search_queries_converted ON search_queries(converted) WHERE converted = TRUE;

-- GIN indexes for JSONB search_params
CREATE INDEX idx_search_params_destination ON search_queries 
  USING GIN ((search_params->'destination'));
CREATE INDEX idx_search_params_dates ON search_queries 
  USING GIN ((search_params->'departure_date'));

-- Comments
COMMENT ON TABLE search_queries IS 'Tracks all user searches for analytics and optimization';
COMMENT ON COLUMN search_queries.search_params IS 'JSONB containing all search form data (destination, dates, guests, etc.)';
COMMENT ON COLUMN search_queries.converted IS 'TRUE if search resulted in a booking';

-- ============================================
-- TABLE 2: analytics_events
-- Purpose: Track all user events for funnel analysis
-- ============================================

CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- User & Session
  session_id VARCHAR(255) NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Event Information
  event_type VARCHAR(100) NOT NULL,
  event_category VARCHAR(50), -- 'search', 'booking', 'navigation', 'engagement'
  event_data JSONB DEFAULT '{}',
  
  -- Page Context
  page_url TEXT NOT NULL,
  page_title VARCHAR(500),
  referrer TEXT,
  
  -- Device & Location
  user_agent TEXT,
  device_type VARCHAR(50),
  browser VARCHAR(100),
  os VARCHAR(100),
  ip_address INET,
  country_code CHAR(2),
  city VARCHAR(255),
  
  -- Platform Context
  tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
  service_type VARCHAR(50),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for analytics_events
CREATE INDEX idx_analytics_events_session ON analytics_events(session_id);
CREATE INDEX idx_analytics_events_user ON analytics_events(user_id);
CREATE INDEX idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_events_category ON analytics_events(event_category);
CREATE INDEX idx_analytics_events_created ON analytics_events(created_at DESC);
CREATE INDEX idx_analytics_events_tenant ON analytics_events(tenant_id);

-- Partitioning by date (for large scale - optional but recommended)
-- CREATE TABLE analytics_events_y2025m11 PARTITION OF analytics_events
--   FOR VALUES FROM ('2025-11-01') TO ('2025-12-01');

-- Comments
COMMENT ON TABLE analytics_events IS 'Tracks all user events for comprehensive analytics';
COMMENT ON COLUMN analytics_events.event_type IS 'Specific event: page_view, search, booking_intent, etc.';
COMMENT ON COLUMN analytics_events.event_data IS 'Additional event-specific data in JSONB format';

-- ============================================
-- TABLE 3: ai_trip_plans
-- Purpose: Store AI-generated trip plans (Dia assistant)
-- ============================================

CREATE TABLE IF NOT EXISTS ai_trip_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- User & Session
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id VARCHAR(255),
  conversation_id VARCHAR(255) UNIQUE NOT NULL,
  
  -- User Input
  user_input TEXT NOT NULL,
  user_intent VARCHAR(100), -- 'safari', 'beach', 'cultural', 'adventure', etc.
  
  -- Generated Plan
  generated_plan JSONB, -- AI-generated itinerary structure
  plan_summary TEXT,
  
  -- Trip Details
  destinations TEXT[], -- Array of destinations
  countries CHAR(2)[], -- Array of country codes
  duration_days INTEGER,
  start_date DATE,
  end_date DATE,
  
  -- Travelers
  travelers_count INTEGER DEFAULT 1,
  adults INTEGER DEFAULT 1,
  children INTEGER DEFAULT 0,
  infants INTEGER DEFAULT 0,
  
  -- Budget
  budget_range VARCHAR(50), -- '$500-1000', '$1000-2000', etc.
  estimated_cost_usd DECIMAL(10,2),
  currency CHAR(3) DEFAULT 'USD',
  
  -- AI Metadata
  ai_model VARCHAR(100), -- 'gpt-4', 'claude-3', 'simulated', etc.
  ai_confidence DECIMAL(3,2), -- 0.00 to 1.00
  message_count INTEGER DEFAULT 1,
  
  -- Status & Outcome
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'reviewed', 'confirmed', 'booked', 'abandoned')),
  booking_ids UUID[], -- Array of booking IDs if user booked
  converted BOOLEAN DEFAULT FALSE,
  
  -- User Feedback
  user_rating INTEGER CHECK (user_rating >= 1 AND user_rating <= 5),
  user_feedback TEXT,
  helpful BOOLEAN,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  booked_at TIMESTAMPTZ
);

-- Indexes for ai_trip_plans
CREATE INDEX idx_ai_trip_plans_user ON ai_trip_plans(user_id);
CREATE INDEX idx_ai_trip_plans_session ON ai_trip_plans(session_id);
CREATE INDEX idx_ai_trip_plans_conversation ON ai_trip_plans(conversation_id);
CREATE INDEX idx_ai_trip_plans_status ON ai_trip_plans(status);
CREATE INDEX idx_ai_trip_plans_converted ON ai_trip_plans(converted) WHERE converted = TRUE;
CREATE INDEX idx_ai_trip_plans_created ON ai_trip_plans(created_at DESC);
CREATE INDEX idx_ai_trip_plans_intent ON ai_trip_plans(user_intent);

-- GIN index for destinations array
CREATE INDEX idx_ai_trip_plans_destinations ON ai_trip_plans USING GIN (destinations);

-- Comments
COMMENT ON TABLE ai_trip_plans IS 'Stores AI-generated trip plans from Dia assistant';
COMMENT ON COLUMN ai_trip_plans.generated_plan IS 'JSONB structure with full itinerary details';
COMMENT ON COLUMN ai_trip_plans.ai_model IS 'AI model used: gpt-4, claude-3, or simulated for MVP';
COMMENT ON COLUMN ai_trip_plans.converted IS 'TRUE if user made a booking from this plan';

-- ============================================
-- TABLE 4: country_themes
-- Purpose: Store country-specific theming and configuration
-- ============================================

CREATE TABLE IF NOT EXISTS country_themes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Country Information
  country_code CHAR(2) UNIQUE NOT NULL,
  country_name VARCHAR(255) NOT NULL,
  country_name_local VARCHAR(255),
  flag_emoji VARCHAR(10),
  region VARCHAR(100), -- 'West Africa', 'East Africa', etc.
  
  -- Currency & Language
  currency CHAR(3) NOT NULL,
  currency_name VARCHAR(255),
  currency_symbol VARCHAR(10),
  languages TEXT[] NOT NULL DEFAULT ARRAY['en'],
  primary_language CHAR(2) DEFAULT 'en',
  
  -- Contact & Location
  timezone VARCHAR(100),
  calling_code VARCHAR(10),
  domain VARCHAR(255) UNIQUE,
  
  -- Theme Configuration (Colors derived from flag)
  theme_config JSONB NOT NULL DEFAULT '{}',
  
  -- Platform Integration
  tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT TRUE,
  is_launched BOOLEAN DEFAULT FALSE,
  launch_priority INTEGER DEFAULT 999,
  launch_date DATE,
  
  -- Tourism Information
  featured_destinations TEXT[],
  payment_methods TEXT[], -- ['mpesa', 'orange_money', 'card', etc.]
  tourist_highlights TEXT[],
  visa_policy TEXT,
  best_time_to_visit TEXT,
  travel_advisories TEXT[],
  
  -- SEO & Marketing
  meta_title VARCHAR(255),
  meta_description TEXT,
  keywords TEXT[],
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for country_themes
CREATE INDEX idx_country_themes_code ON country_themes(country_code);
CREATE INDEX idx_country_themes_tenant ON country_themes(tenant_id);
CREATE INDEX idx_country_themes_active ON country_themes(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_country_themes_launched ON country_themes(is_launched) WHERE is_launched = TRUE;
CREATE INDEX idx_country_themes_priority ON country_themes(launch_priority);

-- Comments
COMMENT ON TABLE country_themes IS 'Country-specific theming and configuration for white-label instances';
COMMENT ON COLUMN country_themes.theme_config IS 'JSONB with color palette: primary, secondary, gradient, etc.';
COMMENT ON COLUMN country_themes.launch_priority IS '1-54, determines order of country launches';

-- ============================================
-- TABLE 5: service_ctas
-- Purpose: Dynamic CTA (Call-to-Action) content per service
-- ============================================

CREATE TABLE IF NOT EXISTS service_ctas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Service & Context
  service_type VARCHAR(50) NOT NULL CHECK (service_type IN ('flights', 'stays', 'cars', 'experiences', 'packages', 'evisa', 'ai')),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  country_code CHAR(2),
  
  -- CTA Content
  main_cta TEXT NOT NULL,
  sub_cta TEXT NOT NULL,
  
  -- Localization
  language_code CHAR(2) DEFAULT 'en',
  
  -- A/B Testing
  variant_name VARCHAR(50) DEFAULT 'default',
  is_active BOOLEAN DEFAULT TRUE,
  weight INTEGER DEFAULT 100, -- For weighted A/B testing
  
  -- Performance Metrics
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure uniqueness per service/tenant/language/variant
  UNIQUE(service_type, tenant_id, language_code, variant_name)
);

-- Indexes for service_ctas
CREATE INDEX idx_service_ctas_service ON service_ctas(service_type);
CREATE INDEX idx_service_ctas_tenant ON service_ctas(tenant_id);
CREATE INDEX idx_service_ctas_active ON service_ctas(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_service_ctas_language ON service_ctas(language_code);

-- Comments
COMMENT ON TABLE service_ctas IS 'Dynamic CTA content for each service, supports A/B testing and localization';
COMMENT ON COLUMN service_ctas.variant_name IS 'For A/B testing: default, variant_a, variant_b, etc.';
COMMENT ON COLUMN service_ctas.weight IS 'Weight for weighted A/B testing (higher = more frequent)';

-- ============================================
-- SEED DATA: Initial Country Themes
-- ============================================

INSERT INTO country_themes (
  country_code,
  country_name,
  country_name_local,
  flag_emoji,
  region,
  currency,
  currency_name,
  languages,
  primary_language,
  timezone,
  calling_code,
  domain,
  theme_config,
  is_active,
  is_launched,
  launch_priority,
  featured_destinations,
  payment_methods,
  visa_policy,
  best_time_to_visit
) VALUES
-- Côte d'Ivoire
(
  'CI',
  'Côte d''Ivoire',
  'Côte d''Ivoire',
  '🇨🇮',
  'West Africa',
  'XOF',
  'West African CFA franc',
  ARRAY['fr', 'en'],
  'fr',
  'Africa/Abidjan',
  '+225',
  'bridge55.ci',
  '{
    "primary": "#FF8C00",
    "primaryDark": "#E67300",
    "primaryLight": "#FFB347",
    "secondary": "#00954A",
    "secondaryDark": "#006633",
    "secondaryLight": "#00B359",
    "accent": "#FFFFFF",
    "gradient": "linear-gradient(135deg, #FF8C00 0%, #00954A 100%)"
  }'::jsonb,
  true,
  false,
  1,
  ARRAY['Abidjan', 'Yamoussoukro', 'Grand-Bassam', 'Man', 'Sassandra'],
  ARRAY['orange_money', 'mtn_money', 'moov_money', 'wave', 'card'],
  'eVisa available',
  'November to March (Dry season)'
),

-- Ghana
(
  'GH',
  'Ghana',
  'Ghana',
  '🇬🇭',
  'West Africa',
  'GHS',
  'Ghanaian cedi',
  ARRAY['en'],
  'en',
  'Africa/Accra',
  '+233',
  'bridge55.gh',
  '{
    "primary": "#EF3340",
    "primaryDark": "#CE1126",
    "primaryLight": "#FF5C67",
    "secondary": "#FCD116",
    "secondaryDark": "#E6BE00",
    "secondaryLight": "#FFDB4D",
    "accent": "#006B3F",
    "gradient": "linear-gradient(135deg, #EF3340 0%, #FCD116 50%, #006B3F 100%)"
  }'::jsonb,
  true,
  false,
  2,
  ARRAY['Accra', 'Kumasi', 'Cape Coast', 'Elmina', 'Tamale', 'Mole National Park'],
  ARRAY['mtn_money', 'vodafone_cash', 'airtel_tigo_money', 'card'],
  'eVisa available',
  'November to April (Dry season)'
),

-- Kenya
(
  'KE',
  'Kenya',
  'Kenya',
  '🇰🇪',
  'East Africa',
  'KES',
  'Kenyan shilling',
  ARRAY['en', 'sw'],
  'en',
  'Africa/Nairobi',
  '+254',
  'bridge55.ke',
  '{
    "primary": "#BB0000",
    "primaryDark": "#8B0000",
    "primaryLight": "#DD0000",
    "secondary": "#006600",
    "secondaryDark": "#004D00",
    "secondaryLight": "#008000",
    "accent": "#000000",
    "gradient": "linear-gradient(135deg, #000000 0%, #BB0000 35%, #FFFFFF 50%, #006600 100%)"
  }'::jsonb,
  true,
  false,
  3,
  ARRAY['Nairobi', 'Mombasa', 'Masai Mara', 'Amboseli', 'Diani Beach', 'Lake Nakuru', 'Tsavo', 'Lamu'],
  ARRAY['mpesa', 'airtel_money', 'tkash', 'card'],
  'eVisa required (eTA)',
  'June to October (Great Migration), January to February'
)
ON CONFLICT (country_code) DO NOTHING;

-- ============================================
-- SEED DATA: Initial Service CTAs
-- ============================================

INSERT INTO service_ctas (service_type, tenant_id, main_cta, sub_cta, language_code) VALUES
('flights', NULL, 'Fly to Africa: Your Epic Journey Begins!', 'Exclusive flight deals to Africa''s vibrant cities & wild safaris', 'en'),
('stays', NULL, 'Find Your Perfect African Retreat', 'Luxury lodges, boutique hotels: unforgettable African stays, tailored for you', 'en'),
('cars', NULL, 'Explore Africa on Your Terms', 'Reliable car rentals for African safaris, city escapes & scenic routes', 'en'),
('experiences', NULL, 'Unlock Unforgettable African Adventures', 'Authentic African safaris, cultural tours & thrilling activities', 'en'),
('packages', NULL, 'Dream African Vacations, Simplified', 'All-inclusive African packages: flights, hotels & tours for your escape', 'en'),
('evisa', NULL, 'Your African Journey Starts Here', 'Secure your eVisa: quick, easy & hassle-free travel to Africa', 'en'),
('ai', NULL, 'Dia: Your AI African Travel Expert', 'Dia crafts personalized, authentic & seamless African itineraries', 'en')
ON CONFLICT (service_type, tenant_id, language_code, variant_name) DO NOTHING;

-- ============================================
-- HELPER VIEWS FOR ANALYTICS
-- ============================================

-- View: Daily search metrics
CREATE OR REPLACE VIEW v_daily_search_metrics AS
SELECT 
  DATE(created_at) as date,
  service_type,
  COUNT(*) as total_searches,
  COUNT(DISTINCT user_id) as unique_users,
  COUNT(DISTINCT session_id) as unique_sessions,
  COUNT(*) FILTER (WHERE converted = TRUE) as conversions,
  ROUND(
    COUNT(*) FILTER (WHERE converted = TRUE) * 100.0 / NULLIF(COUNT(*), 0),
    2
  ) as conversion_rate,
  AVG(results_count) as avg_results_count
FROM search_queries
GROUP BY DATE(created_at), service_type
ORDER BY date DESC, service_type;

COMMENT ON VIEW v_daily_search_metrics IS 'Daily aggregated search metrics by service';

-- View: AI trip plan performance
CREATE OR REPLACE VIEW v_ai_performance AS
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_conversations,
  COUNT(DISTINCT user_id) as unique_users,
  AVG(message_count) as avg_messages_per_conversation,
  COUNT(*) FILTER (WHERE status = 'booked') as bookings,
  ROUND(
    COUNT(*) FILTER (WHERE status = 'booked') * 100.0 / NULLIF(COUNT(*), 0),
    2
  ) as booking_rate,
  AVG(user_rating) as avg_rating,
  COUNT(*) FILTER (WHERE helpful = TRUE) as helpful_count
FROM ai_trip_plans
GROUP BY DATE(created_at)
ORDER BY date DESC;

COMMENT ON VIEW v_ai_performance IS 'Daily AI trip planner performance metrics';

-- View: Country theme summary
CREATE OR REPLACE VIEW v_country_themes_summary AS
SELECT 
  country_code,
  country_name,
  flag_emoji,
  region,
  domain,
  is_active,
  is_launched,
  launch_priority,
  array_length(featured_destinations, 1) as destinations_count,
  array_length(payment_methods, 1) as payment_methods_count
FROM country_themes
ORDER BY launch_priority, country_name;

COMMENT ON VIEW v_country_themes_summary IS 'Summary of all country themes';

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_ai_trip_plans_updated_at
    BEFORE UPDATE ON ai_trip_plans
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_country_themes_updated_at
    BEFORE UPDATE ON country_themes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_ctas_updated_at
    BEFORE UPDATE ON service_ctas
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function: Track CTA impression
CREATE OR REPLACE FUNCTION track_cta_impression(
  p_service_type VARCHAR,
  p_tenant_id UUID DEFAULT NULL,
  p_language_code CHAR(2) DEFAULT 'en'
)
RETURNS VOID AS $$
BEGIN
  UPDATE service_ctas
  SET impressions = impressions + 1
  WHERE service_type = p_service_type
    AND (tenant_id = p_tenant_id OR (tenant_id IS NULL AND p_tenant_id IS NULL))
    AND language_code = p_language_code
    AND is_active = TRUE;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION track_cta_impression IS 'Increment CTA impression count';

-- Function: Track CTA click
CREATE OR REPLACE FUNCTION track_cta_click(
  p_service_type VARCHAR,
  p_tenant_id UUID DEFAULT NULL,
  p_language_code CHAR(2) DEFAULT 'en'
)
RETURNS VOID AS $$
BEGIN
  UPDATE service_ctas
  SET clicks = clicks + 1
  WHERE service_type = p_service_type
    AND (tenant_id = p_tenant_id OR (tenant_id IS NULL AND p_tenant_id IS NULL))
    AND language_code = p_language_code
    AND is_active = TRUE;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION track_cta_click IS 'Increment CTA click count';

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on new tables
ALTER TABLE search_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_trip_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE country_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_ctas ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own search queries
CREATE POLICY "Users can view own searches"
  ON search_queries FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own search queries
CREATE POLICY "Users can insert own searches"
  ON search_queries FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Policy: Users can view their own AI trip plans
CREATE POLICY "Users can view own AI plans"
  ON ai_trip_plans FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert/update their own AI trip plans
CREATE POLICY "Users can manage own AI plans"
  ON ai_trip_plans FOR ALL
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Policy: Country themes are publicly readable
CREATE POLICY "Country themes are public"
  ON country_themes FOR SELECT
  TO public
  USING (is_active = TRUE);

-- Policy: Service CTAs are publicly readable
CREATE POLICY "Service CTAs are public"
  ON service_ctas FOR SELECT
  TO public
  USING (is_active = TRUE);

-- Policy: Analytics events can be inserted by authenticated users
CREATE POLICY "Authenticated users can log events"
  ON analytics_events FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- ============================================
-- GRANTS (Permissions)
-- ============================================

-- Grant SELECT on views to authenticated users
GRANT SELECT ON v_daily_search_metrics TO authenticated;
GRANT SELECT ON v_ai_performance TO authenticated;
GRANT SELECT ON v_country_themes_summary TO public;

-- ============================================
-- MIGRATION COMPLETE
-- ============================================

-- Verify tables were created
DO $$
DECLARE
  table_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO table_count
  FROM information_schema.tables
  WHERE table_schema = 'public'
    AND table_name IN ('search_queries', 'analytics_events', 'ai_trip_plans', 'country_themes', 'service_ctas');
  
  IF table_count = 5 THEN
    RAISE NOTICE '✅ Migration successful! All 5 tables created.';
  ELSE
    RAISE WARNING '⚠️ Migration incomplete. Only % of 5 tables created.', table_count;
  END IF;
END $$;

-- Log migration
CREATE TABLE IF NOT EXISTS schema_migrations (
  version VARCHAR(50) PRIMARY KEY,
  description TEXT,
  executed_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO schema_migrations (version, description) 
VALUES ('1.0_bridge55_enhanced', 'Added search_queries, analytics_events, ai_trip_plans, country_themes, service_ctas tables')
ON CONFLICT (version) DO NOTHING;

RAISE NOTICE '🎉 Bridge55 database migration completed successfully!';
RAISE NOTICE '📊 Created tables: search_queries, analytics_events, ai_trip_plans, country_themes, service_ctas';
RAISE NOTICE '🌍 Seeded data: 3 countries (CI, GH, KE) and 7 service CTAs';
RAISE NOTICE '👀 Created views: v_daily_search_metrics, v_ai_performance, v_country_themes_summary';

