-- Create messages table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert
CREATE POLICY "Allow inserts for everyone" ON public.messages
  FOR INSERT WITH CHECK (true);

-- Create Edge Function hook to send emails
-- This will be used by the database trigger
-- 
-- NOTE: You'll need to create this function in the Supabase dashboard
-- under Edge Functions. The SQL below just sets up the trigger.

-- Add the database trigger function
CREATE OR REPLACE FUNCTION public.send_contact_email()
RETURNS TRIGGER AS $$
BEGIN
  -- Make a request to our Edge Function
  PERFORM
    net.http_post(
      'https://<your-supabase-project-id>.supabase.co/functions/v1/send-email',
      jsonb_build_object(
        'name', NEW.name,
        'email', NEW.email,
        'subject', NEW.subject,
        'message', NEW.message
      ),
      jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('request.jwt.claim.service_role')
      )
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call the function on insert
CREATE TRIGGER on_message_created
AFTER INSERT ON public.messages
FOR EACH ROW EXECUTE FUNCTION public.send_contact_email(); 