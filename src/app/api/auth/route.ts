import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getEnv } from "@/lib/env";
import { signToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const env = await getEnv();
    const adminPassword = env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    if (password === adminPassword) {
      const cookieStore = await cookies();
      const jwt = await signToken();
      cookieStore.set("admin_token", jwt, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 12 * 60 * 60, // 12 hours
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  return NextResponse.json({ success: true });
}
