# Contact Form API

This is a simple Express.js API server that handles contact form submissions from your portfolio website. It stores the submissions in a Supabase database and sends email notifications.

## Features

- Receives form submissions from your portfolio website
- Validates input fields
- Stores submissions in Supabase database
- Sends an email notification to you when a new form is submitted
- Sends a confirmation email to the person who submitted the form
- No webhook dependency or rate limiting issues

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

Create a `.env` file in the root directory with the following variables:

```
# Supabase configuration
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key

# Email configuration
EMAIL_HOST=your-email-host (e.g., smtp.gmail.com)
EMAIL_PORT=your-email-port (e.g., 587 for TLS, 465 for SSL)
EMAIL_USER=your-email-username
EMAIL_PASS=your-email-password-or-app-password
EMAIL_FROM=your-sender-email

# Server configuration
PORT=3000
```

For Gmail, you'll need to create an "App Password" in your Google Account settings:

1. Go to your Google Account
2. Select Security
3. Under "Signing in to Google," select "App passwords"
4. Generate a new app password for "Mail" and "Other (Custom name)"
5. Use this password in your EMAIL_PASS environment variable

3. Start the server:

```bash
npm start
```

For development with auto-restart:

```bash
npm run dev
```

## API Endpoints

### POST /submit-form

Accepts form submissions and processes them.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a potential project."
}
```

**Response:**

Success (200):
```json
{
  "success": true,
  "message": "Form submitted successfully"
}
```

Error (400, 500):
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

### GET /health

Health check endpoint to verify if the API is running.

**Response:**

```json
{
  "status": "ok"
}
```

## Deployment

For production deployment, consider:

1. Using a service like Vercel, Heroku, or Render to host your API
2. Setting up proper environment variables in your hosting platform
3. Updating the API URL in your frontend Contact component
4. Implementing rate limiting for production use 