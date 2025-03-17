// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment

// This Edge Function uses EmailJS to send emails
// EmailJS is a free service that lets you send emails directly from JavaScript

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// EmailJS configuration - using public key instead of user ID
const EMAILJS_PUBLIC_KEY = Deno.env.get("EMAILJS_PUBLIC_KEY");
const EMAILJS_SERVICE_ID = Deno.env.get("EMAILJS_SERVICE_ID");
const EMAILJS_TEMPLATE_ID = Deno.env.get("EMAILJS_TEMPLATE_ID");
const YOUR_EMAIL = Deno.env.get("YOUR_EMAIL") || "aparr3@hotmail.com";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get the request payload
    const { name, email, subject, message } = await req.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Received form submission from ${name} (${email})`);

    try {
      // Send email using EmailJS with public key authentication
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          public_key: EMAILJS_PUBLIC_KEY, // Using public key instead of user_id
          template_params: {
            to_email: YOUR_EMAIL,
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            reply_to: email,
          }
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error(`EmailJS error: ${text}`);
        throw new Error(`Failed to send email: ${text}`);
      }
      
      console.log(`Email sent successfully to ${YOUR_EMAIL}`);
    } catch (emailError) {
      console.error(`Error sending email: ${emailError}`);
      throw emailError;
    }

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(`Error in Edge Function: ${error.message}`);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
}); 