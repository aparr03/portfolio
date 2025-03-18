# Supabase Database Configuration

This directory contains a consolidated database migration file for the portfolio's Supabase backend.

## Overview

The database structure supports the contact form functionality in the portfolio website:

- Stores contact form submissions in the `messages` table
- Automatically sends email notifications using Edge Functions when new messages are received
- Implements proper security policies to protect data

## File Structure

- `migration.sql` - Complete database setup script with all tables, functions, and triggers

## How to Use

### For a Fresh Database Setup

1. Navigate to the [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Open the SQL Editor
4. Copy the contents of `migration.sql` and paste it into a new SQL query
5. Run the query to apply all database changes

### Required Edge Function Environment Variables

For the Edge Function to work properly, you need to set the following environment variables:

1. In your Supabase project dashboard, go to **Settings > API > Edge Functions**
2. Set the following variables for the `send-email` function:

| Variable | Description |
|----------|-------------|
| `EMAILJS_PUBLIC_KEY` | Your EmailJS public key |
| `EMAILJS_SERVICE_ID` | Your EmailJS service ID |
| `EMAILJS_TEMPLATE_ID` | Template ID for notification emails to you |
| `EMAILJS_CONFIRMATION_TEMPLATE_ID` | Template ID for confirmation emails to users (optional) |
| `YOUR_EMAIL` | The email address to receive contact form notifications |
| `SEND_CONFIRMATION` | Set to "true" to enable confirmation emails to users (optional) |

### Required Extensions

The migration automatically installs the `http` extension, which is required for the database trigger to make HTTP requests to the Edge Function. Ensure your Supabase project allows this extension.

### For Development & Testing

You can use this file with the Supabase CLI for local development:

```bash
# Initialize Supabase locally (if not already done)
supabase init

# Start local Supabase instance
supabase start

# Apply migrations
supabase db reset
```

### Important Notes

- The trigger function assumes you have already deployed the `send-email` Edge Function
- The database URL in the function references your specific Supabase project ID
- If you recreate the database, you may need to redeploy the Edge Function using:
  ```bash
  supabase functions deploy send-email --no-verify-jwt
  ```

## Database Structure

The database consists of:

1. **Extensions**:
   - `http` - Enables making HTTP requests from PostgreSQL functions

2. **Tables**:
   - `messages` - Stores contact form submissions

3. **Functions**:
   - `get_service_role()` - Helper function to securely retrieve service role key
   - `send_contact_email()` - Trigger function that sends emails for new messages

4. **Policies**:
   - Anonymous insert permission on the `messages` table

5. **Triggers**:
   - `on_message_created` - Activates when new messages are inserted 