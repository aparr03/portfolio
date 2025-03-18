-- =============================================================================
-- PORTFOLIO DATABASE MIGRATION
-- =============================================================================
-- This is a consolidated migration file for the Supabase database.
-- It creates all the necessary tables, functions, policies, and triggers
-- required for the contact form functionality in the portfolio website.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- EXTENSIONS
-- -----------------------------------------------------------------------------

-- Enable the http extension for making HTTP requests from PostgreSQL
-- This is required for the trigger function to send emails via the Edge Function
CREATE EXTENSION IF NOT EXISTS "http" WITH SCHEMA "extensions";

-- -----------------------------------------------------------------------------
-- TABLES
-- -----------------------------------------------------------------------------

-- Create messages table for storing contact form submissions
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL
);

-- -----------------------------------------------------------------------------
-- SECURITY POLICIES
-- -----------------------------------------------------------------------------

-- Enable Row Level Security on messages table
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert messages
-- This is needed for the contact form to work without requiring authentication
CREATE POLICY "Allow inserts for everyone" ON public.messages
  FOR INSERT WITH CHECK (true);

-- -----------------------------------------------------------------------------
-- HELPER FUNCTIONS
-- -----------------------------------------------------------------------------

-- Create function to safely retrieve service role key
-- This handles errors gracefully and provides fallback behavior
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

-- -----------------------------------------------------------------------------
-- TRIGGERS & EVENT HANDLERS
-- -----------------------------------------------------------------------------

-- Create function to send email notifications when new messages are received
-- This sends HTTP requests to the Edge Function for email delivery
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

-- Create a trigger to automatically send emails when new messages are inserted
CREATE TRIGGER on_message_created
AFTER INSERT ON public.messages
FOR EACH ROW EXECUTE FUNCTION public.send_contact_email(); 

-- =============================================================================
-- END OF MIGRATION
-- ============================================================================= 