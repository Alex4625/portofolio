import { SignJWT, jwtVerify } from "jose";
import { getEnv } from "./env";

export async function signToken() {
  const env = await getEnv();
  const secret = new TextEncoder().encode(env.AUTH_SECRET || "fallback_secret");
  
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h") // Expires in 12 hours
    .sign(secret);
}

export async function verifyToken(token: string | undefined | null) {
  if (!token) return false;
  try {
    const env = await getEnv();
    const secret = new TextEncoder().encode(env.AUTH_SECRET || "fallback_secret");
    const { payload } = await jwtVerify(token, secret);
    return payload.role === "admin";
  } catch (error) {
    return false;
  }
}
