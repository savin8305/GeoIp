import { geolocation } from '@vercel/functions'
import { type NextRequest, NextResponse } from "next/server";
import countries from './lib/countries.json'

// Run on all routes
export const config = {
  matcher: '/:path*',
}

export async function middleware(req: NextRequest) {
  const geo = geolocation(req)
  const country = geo.country || 'US'
  const city = geo.city || 'San Francisco'
  const region = geo.region || 'CA'

  const countryInfo = countries.find((x) => x.cca2 === country)

  if (!countryInfo) {
    return NextResponse.json({ error: 'Country not found' }, { status: 404 })
  }

  const currencyCode = Object.keys(countryInfo.currencies)[0]
  const currency = countryInfo.currencies[currencyCode]
  const languages = Object.values(countryInfo.languages).join(', ')

  const geoData = {
    country,
    city,
    region,
    currencyCode,
    currencySymbol: currency.symbol,
    currencyName: currency.name,
    languages,
  }

  // Set CORS headers
  const response = NextResponse.json(geoData)
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  return response
}

