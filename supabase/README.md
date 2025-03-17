# Supabase Contact Form Setup

This directory contains everything you need to set up a contact form that sends email notifications using only Supabase - no custom Express backend required!

## Overview

The solution uses:
1. **Supabase Database**: Stores form submissions in a `messages` table
2. **Database Triggers**: Automatically fires when a new form submission is received
3. **Edge Functions**: Sends email notifications via your preferred email service

## Setup Instructions

### 1. Database Setup

Run the SQL migration script in the Supabase SQL Editor:

```sql
-- Copy and paste all contents from:
-- /supabase/migrations/20240315_messages_table.sql
```

This will:
- Create the `messages` table
- Set up Row Level Security
- Create a database function to handle form submissions
- Set up a trigger to call an Edge Function for email notifications

### 2. Edge Function Setup

1. Install the Supabase CLI if you haven't already:
   ```
   npm install -g supabase
   ```

2. Login to Supabase:
   ```
   supabase login
   ```

3. Link your project:
   ```
   supabase link --project-ref your-project-ref
   ```

4. Deploy the Edge Function:
   ```
   supabase functions deploy send-email
   ```

5. Set up your secrets for the email service:
   ```
   supabase secrets set EMAIL_API_KEY=your_api_key_here
   ```

### 3. Update the Database Trigger

After deploying your Edge Function, update the database trigger function with your Supabase project ID:

1. Go to the Supabase SQL Editor
2. Find your project URL in the dashboard (it looks like: `https://[your-project-id].supabase.co`)
3. Update the Edge Function URL in the trigger function:

```sql
CREATE OR REPLACE FUNCTION public.send_contact_email()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM
    net.http_post(
      'https://[your-project-id].supabase.co/functions/v1/send-email',
      -- Rest of the function remains the same
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 4. Update Your Contact Component

The Contact.tsx component has already been updated to use Supabase directly. Make sure:

1. The `supabase` client is properly imported
2. The form submission inserts data into the `messages` table

## Testing

To test the complete flow:

1. Open your website
2. Fill out and submit the contact form
3. Verify the data appears in your `messages` table in Supabase
4. Confirm you receive an email notification

## Troubleshooting

- **Database Permissions**: Make sure your Row Level Security (RLS) policies allow anonymous inserts
- **Edge Function Logs**: Check the logs in Supabase Dashboard > Edge Functions
- **Email Service**: Verify your email service API key and configuration

## Customizing the Email Service

The Edge Function uses a generic email API example. Replace with your preferred email service:

- SendGrid
- Mailgun
- Amazon SES
- Or any other email API

Update the Edge Function accordingly. 