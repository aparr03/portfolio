import type { VercelRequest, VercelResponse } from '@vercel/node';

async function handler(req: VercelRequest, res: VercelResponse) {
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

    const debugInfo = {
      timestamp: new Date().toISOString(),
      environment: process.env.VERCEL_ENV || 'unknown',
      region: process.env.VERCEL_REGION || 'unknown',
      nodeVersion: process.version,
      environmentVariables: {
        GMAIL_USER: gmailUser ? 'SET' : 'MISSING',
        GMAIL_PASS: gmailPass ? 'SET' : 'MISSING', 
        CONTACT_EMAIL: contactEmail ? 'SET' : 'MISSING'
      },
      status: {
        allVariablesPresent: !!(gmailUser && gmailPass && contactEmail),
        gmailUserHasAt: gmailUser ? gmailUser.includes('@') : false,
        gmailUserHasGmail: gmailUser ? gmailUser.includes('gmail.com') : false,
        contactEmailHasAt: contactEmail ? contactEmail.includes('@') : false,
      }
    };

    console.log('Debug info:', debugInfo);

    return res.status(200).json({
      success: true,
      debug: debugInfo,
      message: debugInfo.status.allVariablesPresent ? 
        'All environment variables are present - check send-email endpoint' :
        'Missing environment variables - set them in Vercel dashboard'
    });

  } catch (error) {
    console.error('Debug endpoint error:', error);
    return res.status(500).json({
      error: 'Debug endpoint failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler; 