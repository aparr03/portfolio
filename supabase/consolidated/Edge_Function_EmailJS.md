# Email Sending Edge Function

This Supabase Edge Function uses EmailJS to handle contact form submissions.

## About TypeScript Errors

If you're seeing TypeScript errors in your editor for this function, don't worry! These errors occur because Supabase Edge Functions use Deno, but most editors are configured for Node.js development by default.

### Understanding the Errors

Common errors include:
- `Cannot find module 'https://deno.land/std.../http/server.ts'` 
- `Cannot find name 'Deno'`
- Type issues with arrays or objects

### How to Fix TypeScript Errors

#### Option 1: Use Deno for Development (Recommended)

Follow the setup guide: https://deno.land/manual/getting_started/setup_your_environment

For VS Code:
1. Install the Deno extension
2. Add this to your `.vscode/settings.json`:
   ```json
   {
     "deno.enable": true,
     "deno.lint": true,
     "deno.unstable": false,
     "deno.importMap": "./import_map.json"
   }
   ```

#### Option 2: Use the TypeScript Declaration Files

We've included TypeScript declaration files to help with editor integration:
- `deno.d.ts`: Contains type definitions for Deno and its modules
- `tsconfig.json`: TypeScript configuration that includes Deno compatibility

These files will help suppress linter errors without affecting the functionality.

## Environment Variables

The function requires these environment variables to be set in your Supabase project:

| Variable | Description |
|----------|-------------|
| `EMAILJS_PUBLIC_KEY` | Your EmailJS public key |
| `EMAILJS_SERVICE_ID` | Your EmailJS service ID |
| `EMAILJS_TEMPLATE_ID` | Template ID for notification emails to site owner |
| `EMAILJS_CONFIRMATION_TEMPLATE_ID` | (Optional) Template ID for confirmation emails to users |
| `YOUR_EMAIL` | Email address to receive contact form notifications |
| `SEND_CONFIRMATION` | Set to "true" to enable confirmation emails |

## Deployment

```bash
supabase functions deploy send-email --no-verify-jwt
``` 