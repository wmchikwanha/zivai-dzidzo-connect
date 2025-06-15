
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE mentor_status AS ENUM ('pending', 'approved', 'suspended');
CREATE TYPE subscription_tier AS ENUM ('basic', 'premium', 'enterprise');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- Create mentors table
CREATE TABLE public.mentors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  bio TEXT,
  expertise TEXT[],
  years_experience INTEGER,
  hourly_rate DECIMAL(10,2),
  profile_image_url TEXT,
  linkedin_url TEXT,
  website_url TEXT,
  status mentor_status DEFAULT 'pending',
  subscription_tier subscription_tier DEFAULT 'basic',
  subscription_end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create services table
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mentor_id UUID REFERENCES public.mentors(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  mentor_id UUID REFERENCES public.mentors(id) ON DELETE CASCADE,
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status booking_status DEFAULT 'pending',
  notes TEXT,
  meeting_link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  mentor_id UUID REFERENCES public.mentors(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  mentor_id UUID REFERENCES public.mentors(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  stripe_payment_intent_id TEXT,
  status payment_status DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for mentors
CREATE POLICY "mentors_select_all" ON public.mentors FOR SELECT USING (true);
CREATE POLICY "mentors_insert_own" ON public.mentors FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "mentors_update_own" ON public.mentors FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for services
CREATE POLICY "services_select_all" ON public.services FOR SELECT USING (true);
CREATE POLICY "services_insert_own" ON public.services FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.mentors WHERE id = mentor_id AND user_id = auth.uid())
);
CREATE POLICY "services_update_own" ON public.services FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.mentors WHERE id = mentor_id AND user_id = auth.uid())
);

-- RLS Policies for bookings
CREATE POLICY "bookings_select_own" ON public.bookings FOR SELECT USING (
  auth.uid() = student_id OR 
  EXISTS (SELECT 1 FROM public.mentors WHERE id = mentor_id AND user_id = auth.uid())
);
CREATE POLICY "bookings_insert_student" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "bookings_update_participants" ON public.bookings FOR UPDATE USING (
  auth.uid() = student_id OR 
  EXISTS (SELECT 1 FROM public.mentors WHERE id = mentor_id AND user_id = auth.uid())
);

-- RLS Policies for reviews
CREATE POLICY "reviews_select_all" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "reviews_insert_student" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = student_id);

-- RLS Policies for payments
CREATE POLICY "payments_select_own" ON public.payments FOR SELECT USING (
  auth.uid() = student_id OR 
  EXISTS (SELECT 1 FROM public.mentors WHERE id = mentor_id AND user_id = auth.uid())
);
CREATE POLICY "payments_insert_student" ON public.payments FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Create indexes for better performance
CREATE INDEX idx_mentors_user_id ON public.mentors(user_id);
CREATE INDEX idx_mentors_status ON public.mentors(status);
CREATE INDEX idx_services_mentor_id ON public.services(mentor_id);
CREATE INDEX idx_bookings_student_id ON public.bookings(student_id);
CREATE INDEX idx_bookings_mentor_id ON public.bookings(mentor_id);
CREATE INDEX idx_bookings_scheduled_at ON public.bookings(scheduled_at);
CREATE INDEX idx_reviews_mentor_id ON public.reviews(mentor_id);
CREATE INDEX idx_payments_booking_id ON public.payments(booking_id);
