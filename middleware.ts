import { geolocation } from '@vercel/functions';
import { type NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: '/:path*',
};

export async function middleware(req: NextRequest) {
  // Get the client IP from the X-Forwarded-For header
  const forwardedFor = req.headers.get('X-Forwarded-For');
  const clientIP = forwardedFor ? forwardedFor.split(',')[0].trim() : 'Unknown';

  console.log('Client IP from header:', clientIP);

  // Use Vercel's geolocation function
  const geo = geolocation(req);
  const country = geo.country || 'Unknown';

  console.log('Detected country:', country);
  console.log('Client IP used for geolocation:', clientIP);

  // Return the country and IP as JSON
  const response = NextResponse.json({ country, clientIP });

  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Forwarded-For');

  return response;
}

