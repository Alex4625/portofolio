import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export const runtime = "experimental-edge";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  const path = request.nextUrl.pathname;
  
  const isValidToken = await verifyToken(token);

  // Exact match /admin -> redirect to /admin/profile
  if (path === '/admin' || path === '/admin/') {
    if (!isValidToken) return NextResponse.redirect(new URL('/login', request.url));
    return NextResponse.redirect(new URL('/admin/profile', request.url));
  }

  // Protect /admin/* routes
  if (path.startsWith('/admin/')) {
    if (!isValidToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // Protect /api/upload route
  if (path.startsWith('/api/upload')) {
    if (!isValidToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  // If already logged in and trying to access /login, redirect to /admin/profile
  if (path === '/login') {
    if (isValidToken) {
      return NextResponse.redirect(new URL('/admin/profile', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/upload', '/login'],
};
