import { type NextRequest, NextResponse } from 'next/server';

const BUYER_ROUTES = '/buyer';
const FARMER_ROUTES = '/farmer';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = request.cookies.get('fb_role')?.value;

  // ─── Protect /buyer/* ──────────────────────────────────────────────────────
  if (pathname.startsWith(BUYER_ROUTES)) {
    if (!role || role !== 'BUYER') {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // ─── Protect /farmer/* ─────────────────────────────────────────────────────
  if (pathname.startsWith(FARMER_ROUTES)) {
    if (!role || role !== 'FARMER') {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // ─── Redirect authenticated users away from /auth/* ────────────────────────
  if (pathname.startsWith('/auth') && role) {
    // Farmers must be able to reach the profile-completion page (Step 2 of signup)
    if (pathname.startsWith('/auth/farmer/profile')) return NextResponse.next();
    const dashboard =
      role === 'BUYER' ? '/buyer/marketplace' : '/farmer/dashboard';
    return NextResponse.redirect(new URL(dashboard, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/buyer/:path*', '/farmer/:path*', '/auth/:path*'],
};
