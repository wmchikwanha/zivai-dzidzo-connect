
-- Create mentors table
CREATE TABLE public.mentors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  bio TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'suspended')),
  subscription_tier TEXT NOT NULL DEFAULT 'basic' CHECK (subscription_tier IN ('basic', 'premium', 'enterprise')),
  subscription_end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mentor_id UUID REFERENCES public.mentors(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE NOT NULL,
  mentee_user_id UUID REFERENCES auth.users NOT NULL,
  mentor_user_id UUID REFERENCES auth.users NOT NULL,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  contact_email TEXT NOT NULL,
  message TEXT,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for mentors table
CREATE POLICY "Users can view approved mentors" ON public.mentors
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Users can view their own mentor profile" ON public.mentors
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own mentor profile" ON public.mentors
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own mentor profile" ON public.mentors
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for services table
CREATE POLICY "Anyone can view active services of approved mentors" ON public.services
  FOR SELECT USING (
    is_active = true AND 
    EXISTS (
      SELECT 1 FROM public.mentors 
      WHERE mentors.id = services.mentor_id 
      AND mentors.status = 'approved'
    )
  );

CREATE POLICY "Mentors can manage their own services" ON public.services
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.mentors 
      WHERE mentors.id = services.mentor_id 
      AND mentors.user_id = auth.uid()
    )
  );

-- RLS Policies for bookings table
CREATE POLICY "Users can view their own bookings as mentee" ON public.bookings
  FOR SELECT USING (auth.uid() = mentee_user_id);

CREATE POLICY "Users can view their own bookings as mentor" ON public.bookings
  FOR SELECT USING (auth.uid() = mentor_user_id);

CREATE POLICY "Users can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = mentee_user_id);

CREATE POLICY "Mentors can update their bookings" ON public.bookings
  FOR UPDATE USING (auth.uid() = mentor_user_id);
