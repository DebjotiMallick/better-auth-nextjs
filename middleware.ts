import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Use regex to protect all routes except specific public ones, including the root path
  matcher: [
    /*
     * Match all request paths except:
     * - / (root path)
     * - /signin, /signup, /forgot-password, /reset-password (auth pages)
     * - /api/auth/* (auth API routes)
     * - /_next/static (static files)
     * - /_next/image (image optimization files)
     * - /favicon.ico, /robots.txt, /sitemap.xml (common public files)
     */
    "/((?!$|signin|signup|forgot-password|reset-password|api/auth|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
