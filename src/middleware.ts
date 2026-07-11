import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/../lib/auth';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Hanya lindungi rute /admin (kecuali halaman login)
  const isProtectedRoute = path.startsWith('/admin') && path !== '/admin/login';

  if (isProtectedRoute) {
    const sessionCookie = request.cookies.get('session')?.value;
    
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    try {
      const parsed = await decrypt(sessionCookie);
      if (!parsed) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Arahkan admin yang sudah login menjauhi halaman login
  if (path === '/admin/login') {
    const sessionCookie = request.cookies.get('session')?.value;
    if (sessionCookie) {
      try {
        const parsed = await decrypt(sessionCookie);
        if (parsed) {
          return NextResponse.redirect(new URL('/admin', request.url));
        }
      } catch (error) {
        // Abaikan
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
