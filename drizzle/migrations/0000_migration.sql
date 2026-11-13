CREATE TABLE public.booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  kind text NOT NULL DEFAULT 'room' CHECK (kind IN ('room','event')),
  item text NOT NULL CHECK (char_length(item) <= 100),
  check_in date NOT NULL,
  check_out date,
  guests integer NOT NULL CHECK (guests BETWEEN 1 AND 1000),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 100),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 20),
  email text CHECK (email IS NULL OR char_length(email) <= 255),
  notes text CHECK (notes IS NULL OR char_length(notes) <= 1000)
);
GRANT INSERT ON public.booking_requests TO anon, authenticated;
GRANT ALL ON public.booking_requests TO service_role;
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a booking request" ON public.booking_requests FOR INSERT TO anon, authenticated WITH CHECK (true);