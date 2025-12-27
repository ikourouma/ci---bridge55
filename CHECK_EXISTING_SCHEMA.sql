-- ============================================
-- CHECK EXISTING SCHEMA
-- Run this first to see what columns exist
-- ============================================

-- Check what columns exist in listings table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'listings'
ORDER BY ordinal_position;

-- Check what tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

