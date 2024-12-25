import { geolocation } from '@vercel/functions';
import { type NextRequest, NextResponse } from 'next/server';

// Run on all routes
export const config = {
  matcher: '/:path*',
};

export async function middleware(req: NextRequest) {
  // Get geolocation information
  const geo = geolocation(req);
  const country = geo.country || 'US'; // Default to 'US' if country is undefined

  // Return the country as JSON
  const response = NextResponse.json({ country });

  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return response;
}
