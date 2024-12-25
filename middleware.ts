import { type NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: '/:path*',
};

export async function middleware(req: NextRequest) {
  // Get the client's IP address
  const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0] || 'Unknown';

  console.log('Client IP:', clientIP);

  // Use a geolocation API to get the country based on IP
  let country = 'Unknown';
  try {
    const response = await fetch(`https://ipapi.co/${clientIP}/json/`);
    if (response.ok) {
      const data = await response.json();
      country = data.country_code;
    }
  } catch (error) {
    console.error('Error fetching geolocation:', error);
  }

  console.log('Detected country:', country);

  // Return the country as JSON
  const response = NextResponse.json({ country });

  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return response;
}

