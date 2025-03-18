// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment

// This Edge Function uses EmailJS to send emails
// EmailJS is a free service that lets you send emails directly from JavaScript

/// <reference path="./deno.d.ts" />
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// EmailJS configuration - using public key instead of user ID
const EMAILJS_PUBLIC_KEY = Deno.env.get("EMAILJS_PUBLIC_KEY");
const EMAILJS_SERVICE_ID = Deno.env.get("EMAILJS_SERVICE_ID");
const EMAILJS_TEMPLATE_ID = Deno.env.get("EMAILJS_TEMPLATE_ID");
const EMAILJS_CONFIRMATION_TEMPLATE_ID = Deno.env.get("EMAILJS_CONFIRMATION_TEMPLATE_ID");
const YOUR_EMAIL = Deno.env.get("YOUR_EMAIL") || "aparr3@hotmail.com";
const SEND_CONFIRMATION = Deno.env.get("SEND_CONFIRMATION") === "true";

// Validate required environment variables
function validateEnvVars(): string[] {
  const missingVars: string[] = [];
  if (!EMAILJS_PUBLIC_KEY) missingVars.push("EMAILJS_PUBLIC_KEY");
  if (!EMAILJS_SERVICE_ID) missingVars.push("EMAILJS_SERVICE_ID");
  if (!EMAILJS_TEMPLATE_ID) missingVars.push("EMAILJS_TEMPLATE_ID");
  
  if (SEND_CONFIRMATION && !EMAILJS_CONFIRMATION_TEMPLATE_ID) {
    missingVars.push("EMAILJS_CONFIRMATION_TEMPLATE_ID");
  }
  
  return missingVars;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Validate environment variables
    const missingVars = validateEnvVars();
    if (missingVars.length > 0) {
      console.error(`Missing environment variables: ${missingVars.join(", ")}`);
      return new Response(
        JSON.stringify({ 
          error: "Server configuration error", 
          details: `Missing environment variables: ${missingVars.join(", ")}` 
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

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
      // Send notification email to site owner
      const notificationResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          public_key: EMAILJS_PUBLIC_KEY,
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

      if (!notificationResponse.ok) {
        const text = await notificationResponse.text();
        console.error(`EmailJS error (notification): ${text}`);
        throw new Error(`Failed to send notification email: ${text}`);
      }
      
      console.log(`Notification email sent successfully to ${YOUR_EMAIL}`);
      
      // Send confirmation email to user if enabled
      if (SEND_CONFIRMATION && EMAILJS_CONFIRMATION_TEMPLATE_ID) {
        try {
          const confirmationResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              service_id: EMAILJS_SERVICE_ID,
              template_id: EMAILJS_CONFIRMATION_TEMPLATE_ID,
              public_key: EMAILJS_PUBLIC_KEY,
              template_params: {
                to_name: name,
                to_email: email,
                subject: `Confirmation: ${subject}`,
                message: message,
              }
            }),
          });
          
          if (!confirmationResponse.ok) {
            const text = await confirmationResponse.text();
            console.error(`EmailJS error (confirmation): ${text}`);
            // Don't throw here, just log the error since the main notification was sent
          } else {
            console.log(`Confirmation email sent successfully to ${email}`);
          }
        } catch (confirmationError) {
          console.error(`Error sending confirmation email: ${confirmationError}`);
          // Don't throw here, just log the error since the main notification was sent
        }
      }
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