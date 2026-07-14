import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const runtime = "experimental-edge";

export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token');
  const path = request.nextUrl.pathname;

  // Exact match /admin -> redirect to /admin/profile
  if (path === '/admin' || path === '/admin/') {
    if (!token) return NextResponse.redirect(new URL('/login', request.url));
    return NextResponse.redirect(new URL('/admin/profile', request.url));
  }

  // Protect /admin/* routes
  if (path.startsWith('/admin/')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // Protect /api/upload route
  if (path.startsWith('/api/upload')) {
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  // If already logged in and trying to access /login, redirect to /admin/profile
  if (path === '/login') {
    if (token) {
      return NextResponse.redirect(new URL('/admin/profile', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/upload', '/login'],
};
