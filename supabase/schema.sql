-- Supabase Database Schema for whosbax portfolio
-- Run this in Supabase SQL Editor

-- =============================================
-- TIMELINE TABLE
-- =============================================
CREATE TABLE timeline (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date VARCHAR(20) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('music', 'featuring', 'career', 'gap', 'activity')),
  tag VARCHAR(20) NOT NULL,
  title VARCHAR(200) NOT NULL,
  cover VARCHAR(500),
  artist VARCHAR(100),
  album VARCHAR(100),
  role VARCHAR(100),
  description TEXT,
  link VARCHAR(500),
  is_title BOOLEAN DEFAULT FALSE,
  sort_order INT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- TIMELINE TRACKS TABLE (for music albums and featuring)
-- =============================================
CREATE TABLE timeline_tracks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  timeline_id UUID NOT NULL REFERENCES timeline(id) ON DELETE CASCADE,
  track_num INT NOT NULL,
  name VARCHAR(200) NOT NULL,
  is_title BOOLEAN DEFAULT FALSE,
  sort_order INT NOT NULL
);

-- =============================================
-- EXPERIENCE SUMMARY TABLE
-- =============================================
CREATE TABLE experience_summary (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  link VARCHAR(500),
  description TEXT,
  is_break_time BOOLEAN DEFAULT FALSE,
  sort_order INT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- EXPERIENCE SUMMARY POSITIONS TABLE
-- =============================================
CREATE TABLE experience_positions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  summary_id UUID NOT NULL REFERENCES experience_summary(id) ON DELETE CASCADE,
  position VARCHAR(100) NOT NULL,
  sort_order INT NOT NULL
);

-- =============================================
-- EXPERIENCE POSITION TASKS TABLE
-- =============================================
CREATE TABLE experience_position_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  position_id UUID NOT NULL REFERENCES experience_positions(id) ON DELETE CASCADE,
  task TEXT NOT NULL,
  sort_order INT NOT NULL
);

-- =============================================
-- EXPERIENCE DETAIL TABLE
-- =============================================
CREATE TABLE experience_detail (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name VARCHAR(100) NOT NULL,
  project_title VARCHAR(200) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  description TEXT,
  is_break_time BOOLEAN DEFAULT FALSE,
  sort_order INT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- EXPERIENCE DETAIL LINKS TABLE
-- =============================================
CREATE TABLE experience_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  detail_id UUID NOT NULL REFERENCES experience_detail(id) ON DELETE CASCADE,
  label VARCHAR(100) NOT NULL,
  url VARCHAR(500) NOT NULL,
  sort_order INT NOT NULL
);

-- =============================================
-- EXPERIENCE DETAIL SKILLS TABLE
-- =============================================
CREATE TABLE experience_skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  detail_id UUID NOT NULL REFERENCES experience_detail(id) ON DELETE CASCADE,
  skill VARCHAR(100) NOT NULL,
  sort_order INT NOT NULL
);

-- =============================================
-- EXPERIENCE DETAIL SUMMARY ITEMS TABLE
-- =============================================
CREATE TABLE experience_summary_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  detail_id UUID NOT NULL REFERENCES experience_detail(id) ON DELETE CASCADE,
  item TEXT NOT NULL,
  sort_order INT NOT NULL
);

-- =============================================
-- SKILLS TABLE
-- =============================================
CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  sort_order INT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- ROW LEVEL SECURITY (RLS) - Enable for all tables
-- =============================================
ALTER TABLE timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience_summary ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience_position_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience_detail ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience_summary_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS POLICIES - Allow public read access (anon)
-- =============================================
CREATE POLICY "Allow public read access" ON timeline FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON timeline_tracks FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON experience_summary FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON experience_positions FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON experience_position_tasks FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON experience_detail FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON experience_links FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON experience_skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON experience_summary_items FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON skills FOR SELECT USING (true);

-- =============================================
-- PAGE VIEWS TABLE
-- =============================================
CREATE TABLE page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path VARCHAR(200) NOT NULL,
  session_id VARCHAR(100) NOT NULL,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Allow public read and insert access
CREATE POLICY "Allow public read access" ON page_views FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON page_views FOR INSERT WITH CHECK (true);

-- =============================================
-- INDEXES for better query performance
-- =============================================
CREATE INDEX idx_timeline_type ON timeline(type);
CREATE INDEX idx_timeline_sort ON timeline(sort_order);
CREATE INDEX idx_timeline_tracks_timeline ON timeline_tracks(timeline_id);
CREATE INDEX idx_experience_summary_sort ON experience_summary(sort_order);
CREATE INDEX idx_experience_detail_company ON experience_detail(company_name);
CREATE INDEX idx_experience_detail_sort ON experience_detail(sort_order);
CREATE INDEX idx_skills_sort ON skills(sort_order);
CREATE INDEX idx_page_views_path ON page_views(page_path);
CREATE INDEX idx_page_views_viewed_at ON page_views(viewed_at);
CREATE INDEX idx_page_views_session ON page_views(session_id);
