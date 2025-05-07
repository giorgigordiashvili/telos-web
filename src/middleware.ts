import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Allow Netlify Git Gateway requests to pass through
  if (request.nextUrl.pathname.startsWith('/.netlify')) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Configure the middleware to match all paths except static files and images
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (public image files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images/).*)',
  ],
};
