import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ success: true });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check environment variables
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_PASS;
    const contactEmail = process.env.CONTACT_EMAIL;

    const envStatus = {
      GMAIL_USER: gmailUser ? `${gmailUser.substring(0, 3)}***@${gmailUser.split('@')[1]}` : 'MISSING',
      GMAIL_PASS: gmailPass ? `${gmailPass.substring(0, 4)}${'*'.repeat(gmailPass.length - 4)}` : 'MISSING',
      CONTACT_EMAIL: contactEmail ? `${contactEmail.substring(0, 3)}***@${contactEmail.split('@')[1]}` : 'MISSING',
    };

    const debugInfo = {
      timestamp: new Date().toISOString(),
      environment: process.env.VERCEL_ENV || 'unknown',
      region: process.env.VERCEL_REGION || 'unknown',
      nodeVersion: process.version,
      environmentVariables: envStatus,
      status: {
        allVariablesPresent: !!(gmailUser && gmailPass && contactEmail),
        gmailUserValid: gmailUser?.includes('@gmail.com') || false,
        contactEmailValid: contactEmail?.includes('@') || false,
      }
    };

    console.log('Debug info:', debugInfo);

    return res.status(200).json({
      success: true,
      debug: debugInfo,
      recommendations: debugInfo.status.allVariablesPresent ? 
        ['All environment variables are present'] :
        [
          !gmailUser ? 'Set GMAIL_USER environment variable' : null,
          !gmailPass ? 'Set GMAIL_PASS environment variable' : null,
          !contactEmail ? 'Set CONTACT_EMAIL environment variable' : null,
          !debugInfo.status.gmailUserValid ? 'GMAIL_USER should be a @gmail.com address' : null,
        ].filter(Boolean)
    });

  } catch (error) {
    console.error('Debug endpoint error:', error);
    return res.status(500).json({
      error: 'Debug endpoint failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 