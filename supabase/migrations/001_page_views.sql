-- Page Views Table Migration
-- Run this in Supabase SQL Editor

-- Drop existing table if exists
DROP TABLE IF EXISTS page_views;

-- =============================================
-- PAGE VIEWS TABLE
-- =============================================
CREATE TABLE page_views (
  id BIGSERIAL PRIMARY KEY,
  page_path VARCHAR(200) NOT NULL,
  session_id VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  viewed_at TIMESTAMP WITH TIME ZONE  -- NULL = 아직 보는 중 or 이탈 기록 실패
);

-- Enable RLS
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Allow public read, insert, and update access
CREATE POLICY "Allow public read access" ON page_views FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON page_views FOR UPDATE USING (true) WITH CHECK (true);

-- Indexes for better query performance
CREATE INDEX idx_page_views_path ON page_views(page_path);
CREATE INDEX idx_page_views_session ON page_views(session_id);
CREATE INDEX idx_page_views_created_at ON page_views(created_at);
