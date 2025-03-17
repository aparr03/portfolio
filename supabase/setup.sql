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

-- Create function to get service key (safe way)
CREATE OR REPLACE FUNCTION get_service_role()
RETURNS TEXT AS $$
DECLARE
  service_role TEXT;
BEGIN
  -- Safer approach to get service role
  BEGIN
    service_role := current_setting('supabase_functions.service_role_key');
  EXCEPTION
    WHEN OTHERS THEN
      service_role := NULL;
  END;
  
  RETURN service_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add the database trigger function
CREATE OR REPLACE FUNCTION public.send_contact_email()
RETURNS TRIGGER AS $$
DECLARE
  service_key TEXT;
BEGIN
  -- Get service role key safely
  service_key := get_service_role();
  
  -- Make a request to our Edge Function
  PERFORM
    net.http_post(
      'https://ikkpkkfzjvmshbaleazq.supabase.co/functions/v1/send-email',
      jsonb_build_object(
        'name', NEW.name,
        'email', NEW.email,
        'subject', NEW.subject,
        'message', NEW.message
      ),
      jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || service_key
      )
    );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the transaction
    RAISE WARNING 'Error sending email: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call the function on insert
CREATE TRIGGER on_message_created
AFTER INSERT ON public.messages
FOR EACH ROW EXECUTE FUNCTION public.send_contact_email(); 