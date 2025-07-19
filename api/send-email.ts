import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers first
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ success: true });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('API called - checking environment variables...');
    
    // Validate environment variables first with detailed logging
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_PASS;
    const contactEmail = process.env.CONTACT_EMAIL;

    console.log('Environment check:', { 
      gmailUser: gmailUser ? `${gmailUser.substring(0, 3)}***` : 'MISSING',
      gmailPass: gmailPass ? `${gmailPass.substring(0, 4)}***` : 'MISSING',
      contactEmail: contactEmail ? `${contactEmail.substring(0, 3)}***` : 'MISSING'
    });

    if (!gmailUser || !gmailPass || !contactEmail) {
      console.error('Missing environment variables:', { gmailUser: !!gmailUser, gmailPass: !!gmailPass, contactEmail: !!contactEmail });
      return res.status(500).json({ error: 'Server configuration error: Missing email credentials' });
    }

    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log('Missing required fields in request body');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log('Creating Gmail transporter...');

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    console.log('Testing SMTP connection...');
    
    // Test the connection
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (error) {
      console.error('SMTP connection failed:', error);
      return res.status(500).json({ 
        error: 'Email server connection failed',
        details: error instanceof Error ? error.message : 'Unknown SMTP error'
      });
    }

    console.log('Preparing notification email...');
    
    // Email to you (notification)
    const notificationMailOptions = {
      from: gmailUser,
      to: contactEmail,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5;">New Contact Form Submission</h2>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #6b7280;">${message}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background: #f3f4f6; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #6b7280;">
              Reply to: <a href="mailto:${email}" style="color: #4f46e5;">${email}</a>
            </p>
          </div>
        </div>
      `,
      replyTo: email,
    };

    // Confirmation email to sender
    const confirmationMailOptions = {
      from: gmailUser,
      to: email,
      subject: `Thank you for contacting me - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5;">Thank You for Your Message!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for reaching out through my portfolio website. I've received your message and will get back to you as soon as possible.</p>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Your Message:</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            <p style="line-height: 1.6; color: #6b7280;">${message}</p>
          </div>
          
                     <p>I typically respond within 24-48 hours. If you need to reach me urgently, you can also email me directly at ${contactEmail}.</p>
          
          <p>Best regards,<br>Andrew Parr</p>
          
          <div style="margin-top: 30px; padding: 15px; background: #f3f4f6; border-radius: 8px; font-size: 14px; color: #6b7280;">
            <p style="margin: 0;">This is an automated confirmation email from my portfolio contact form.</p>
          </div>
        </div>
      `,
    };

    console.log('Sending emails...');
    
    // Send both emails with better error handling
    try {
      const [notificationResult, confirmationResult] = await Promise.all([
        transporter.sendMail(notificationMailOptions),
        transporter.sendMail(confirmationMailOptions),
      ]);

      console.log('Notification email sent:', notificationResult.messageId);
      console.log('Confirmation email sent:', confirmationResult.messageId);
      console.log(`Email sent successfully from ${name} (${email})`);
      
      return res.status(200).json({ 
        success: true, 
        message: 'Email sent successfully!' 
      });
    } catch (emailError) {
      console.error('Error sending emails:', emailError);
      return res.status(500).json({ 
        error: 'Failed to send email', 
        details: emailError instanceof Error ? emailError.message : 'Unknown email error' 
      });
    }

  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
} 