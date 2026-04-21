import createMiddleware from "next-intl/middleware";
import { routing } from './i18n/routing';
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Create the internationalization middleware
const intlMiddleware = createMiddleware(routing);

export function middleware(req: NextRequest) {
  // First, handle internationalization
  const response = intlMiddleware(req);
  
  // Get the current pathname
  const pathname = req.nextUrl.pathname;
  
  // Extract locale from URL (e.g., 'en' from '/en/page')
  const pathParts = pathname.split('/');
  const locale = pathParts[1] && (pathParts[1] === 'en' || pathParts[1] === 'am') 
    ? pathParts[1] 
    : 'en';
  
  // Optional: Add any wedding-specific middleware logic here
  // For example, tracking page views, adding custom headers, etc.
  
  // Add security headers for better protection
  const headers = new Headers(response.headers);
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-XSS-Protection', '1; mode=block');
  
  // Create new response with updated headers
  const enhancedResponse = new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers,
  });
  
  return enhancedResponse;
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    // Match all routes except:
    // - API routes
    // - Next.js internal files (_next, _vercel)
    // - Static files (images, fonts, etc.)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};