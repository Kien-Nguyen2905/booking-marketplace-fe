import { COOKIE_NAMES, ROUTES, ROLE_NAME } from '@/constants';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const managePaths = ['/admin', '/partner'];
const oauthPaths = ['/login-google', '/oauth-google'];
const privatePaths = [...managePaths, '/account', '/order', '/payment'];
const validRoles = Object.values(ROLE_NAME); // ['CUSTOMER', 'ADMIN', 'PARTNER',]

const getRedirectUrl = (request: NextRequest, path: string): URL => {
  try {
    return new URL(path || '/', request.url);
  } catch {
    return new URL('/', request.url);
  }
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = request.cookies.get(COOKIE_NAMES.ROLE)?.value;
  if (
    privatePaths.some((path) => pathname.startsWith(path)) &&
    (!role || !validRoles.includes(role))
  ) {
    return NextResponse.redirect(getRedirectUrl(request, ROUTES.HOME));
  }

  if (role) {
    if (oauthPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(getRedirectUrl(request, ROUTES.HOME));
    }
    if (pathname.startsWith('/admin') && role !== ROLE_NAME.ADMIN) {
      return NextResponse.redirect(getRedirectUrl(request, ROUTES.HOME));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/partner/:path*',
    '/oauth-google',
    '/login-google',
    '/account/:path*',
    '/order/:path*',
    '/payment/:path*',
  ],
};
