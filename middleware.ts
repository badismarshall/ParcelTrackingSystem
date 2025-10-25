import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const handleI18nRouting = createMiddleware(routing)

export async function middleware(request: NextRequest) {
  // First check if the request is for a protected route
  const pathname = request.nextUrl.pathname;
  // Check if the route is protected
  const isProtectedRoute = pathname.includes('/dashboard');
  
  // Get the locale from the pathname
  const locale = pathname.split('/')[1] || routing.defaultLocale;

  if (isProtectedRoute) {
    const sessionCookie = getSessionCookie(request);
    if (!sessionCookie) {
      // Redirect to sign-in page while preserving the locale
      return NextResponse.redirect(new URL(`/${locale}/sign-in`, request.url));
    }
  }

  // Handle i18n routing after auth check
  const response = handleI18nRouting(request);
  if (response.ok) {
    return response;
  }

  // If i18n routing fails, redirect to default locale
  return NextResponse.redirect(new URL(`/${routing.defaultLocale}${pathname}`, request.url));
}

export const config = {
	matcher: 
    [
      '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
      '/fr/dashboard/:path*', 
      '/ar/dashboard/:path*'
    ], // Specify the routes the middleware applies to
};