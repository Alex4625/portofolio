import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

// We define a helper that expects the D1 Database binding
// In Next.js App Router, we'll pass the binding from Cloudflare's getRequestContext()
export function getDb(dbBinding: any) {
  if (!dbBinding) {
    throw new Error("D1 database binding is missing.");
  }
  return drizzle(dbBinding, { schema });
}
