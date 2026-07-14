import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function getEnv() {
  try {
    const context = await getCloudflareContext();
    if (context && context.env) {
      return context.env as Record<string, any>;
    }
  } catch (e) {
    // Ignore error, fallback to process.env
  }
  return process.env as Record<string, any>;
}
