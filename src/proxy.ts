import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/../lib/auth";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = path.startsWith("/admin") && path !== "/admin/login";

  if (isProtectedRoute) {
    const sessionCookie = request.cookies.get("session")?.value;

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      const parsed = await decrypt(sessionCookie);
      if (!parsed) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  if (path === "/admin/login") {
    const sessionCookie = request.cookies.get("session")?.value;
    if (sessionCookie) {
      try {
        const parsed = await decrypt(sessionCookie);
        if (parsed) {
          return NextResponse.redirect(new URL("/admin", request.url));
        }
      } catch {
        // Let the login page render when the cookie is invalid.
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
