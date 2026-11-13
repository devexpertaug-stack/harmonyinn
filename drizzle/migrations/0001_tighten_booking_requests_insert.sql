DROP POLICY IF EXISTS "Anyone can submit a booking request" ON public.booking_requests;
CREATE POLICY "Anyone can submit a valid booking request" ON public.booking_requests
FOR INSERT TO anon, authenticated
WITH CHECK (
  kind IN ('room','event')
  AND char_length(item) BETWEEN 1 AND 100
  AND char_length(full_name) BETWEEN 2 AND 100
  AND phone ~ '^[+0-9 ()-]{7,20}$'
  AND (email IS NULL OR (char_length(email) <= 255 AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'))
  AND (notes IS NULL OR char_length(notes) <= 1000)
  AND guests BETWEEN 1 AND 1000
  AND check_in >= current_date - 1
  AND check_in <= current_date + 730
  AND (check_out IS NULL OR (check_out >= check_in AND check_out <= check_in + 90))
);