-- Add missing columns to mentors table for mentor registration
ALTER TABLE public.mentors 
ADD COLUMN email TEXT,
ADD COLUMN phone TEXT,
ADD COLUMN expertise TEXT[],
ADD COLUMN years_experience INTEGER DEFAULT 0,
ADD COLUMN hourly_rate NUMERIC DEFAULT 0.00,
ADD COLUMN linkedin_url TEXT,
ADD COLUMN website_url TEXT;