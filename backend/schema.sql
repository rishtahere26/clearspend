-- Run this in your Supabase SQL editor

-- Receipts table
CREATE TABLE receipts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  vendor TEXT NOT NULL,
  date DATE,
  total NUMERIC(10,2),
  currency TEXT DEFAULT 'USD',
  items JSONB DEFAULT '[]',
  payment_method TEXT,
  raw_type TEXT, -- photo | pdf | csv
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE receipts ENABLE ROW LEVEL SECURITY;

-- Policy: users can only see their own receipts
CREATE POLICY "Users see own receipts" ON receipts
  FOR ALL USING (auth.uid() = user_id);

-- Index for fast vendor queries
CREATE INDEX idx_receipts_user_vendor ON receipts(user_id, vendor);
CREATE INDEX idx_receipts_date ON receipts(user_id, date DESC);
