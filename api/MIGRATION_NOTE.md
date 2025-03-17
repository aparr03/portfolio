# Migration from Express API to Supabase-only

This `/api` directory containing the Express API is no longer needed since we've migrated to a Supabase-only approach.

## What Changed

- Contact form submissions now go directly to Supabase
- Email notifications are handled by Supabase Edge Functions and database triggers
- No need for an Express backend or separate API hosting

## What's Next

You can safely delete this `/api` directory once you have:

1. Set up the Supabase database table (messages)
2. Deployed the Edge Function (send-email)
3. Created the database trigger
4. Tested the complete flow

See `/supabase/README.md` for detailed setup instructions. 