"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { getDb } from "@/db";
import { siteConfig, educations, services, portfolios, galleries, socialLinks, analytics } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { verifyToken } from "@/lib/auth";
// Assume opennextjs-cloudflare provides getCloudflareContext
// If this import fails in Next.js dev, we will handle the fallback or instruct the user to use npm run preview
import { getCloudflareContext } from "@opennextjs/cloudflare";

async function initDb() {
  const { env } = await getCloudflareContext();
  return getDb((env as any).DB);
}

async function requireAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const isValid = await verifyToken(token);
  if (!isValid) {
    throw new Error("Unauthorized access. Token invalid or missing.");
  }
}

// --- Security Sanitization Helpers ---
function sanitizeExternalUrl(url?: string) {
  if (!url) return "";
  const trimmed = url.trim();
  // Prevent javascript: and data: URI XSS attacks
  if (/^(javascript|data|vbscript):/i.test(trimmed)) return "";
  // Auto-prefix external links if missing protocol
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
    return `https://${trimmed}`;
  }
  return trimmed;
}

function sanitizePhone(phone?: string) {
  if (!phone) return "";
  // Strip everything except numbers
  return phone.replace(/[^0-9]/g, "");
}

// ==========================================
// SITE CONFIG (Profile & About)
// ==========================================
export async function getSiteConfig() {
  const db = await initDb();
  const result = await db.select().from(siteConfig).where(eq(siteConfig.id, "main")).limit(1);
  return result[0] || null;
}

export async function upsertSiteConfig(data: any) {
  await requireAuth();
  const db = await initDb();
  const existing = await getSiteConfig();
  
  // Sanitize data to prevent stored XSS
  const sanitizedData = {
    ...data,
    githubUrl: sanitizeExternalUrl(data.githubUrl),
    instagramUrl: sanitizeExternalUrl(data.instagramUrl),
    linkedinUrl: sanitizeExternalUrl(data.linkedinUrl),
    youtubeUrl: sanitizeExternalUrl(data.youtubeUrl),
    whatsappNumber: sanitizePhone(data.whatsappNumber),
  };

  if (existing) {
    await db.update(siteConfig).set(sanitizedData).where(eq(siteConfig.id, "main"));
  } else {
    await db.insert(siteConfig).values({ id: "main", ...sanitizedData });
  }
  revalidatePath("/");
  return { success: true };
}

// ==========================================
// EDUCATIONS (Resume)
// ==========================================
export async function getEducations() {
  const db = await initDb();
  return db.select().from(educations).orderBy(educations.orderIndex);
}

export async function addEducation(data: any) {
  await requireAuth();
  const db = await initDb();
  const id = crypto.randomUUID();
  await db.insert(educations).values({ id, ...data });
  revalidatePath("/");
  return { success: true };
}

export async function deleteEducation(id: string) {
  await requireAuth();
  const db = await initDb();
  await db.delete(educations).where(eq(educations.id, id));
  revalidatePath("/");
  return { success: true };
}

export async function updateEducation(id: string, data: any) {
  await requireAuth();
  const db = await initDb();
  await db.update(educations).set(data).where(eq(educations.id, id));
  revalidatePath("/");
  return { success: true };
}

// ==========================================
// SERVICES
// ==========================================
export async function getServices() {
  const db = await initDb();
  return db.select().from(services).orderBy(services.orderIndex);
}

export async function addService(data: any) {
  await requireAuth();
  const db = await initDb();
  const id = crypto.randomUUID();
  await db.insert(services).values({ id, ...data });
  revalidatePath("/");
  return { success: true };
}

export async function deleteService(id: string) {
  await requireAuth();
  const db = await initDb();
  await db.delete(services).where(eq(services.id, id));
  revalidatePath("/");
  return { success: true };
}

export async function updateService(id: string, data: any) {
  await requireAuth();
  const db = await initDb();
  await db.update(services).set(data).where(eq(services.id, id));
  revalidatePath("/");
  return { success: true };
}

// ==========================================
// PORTFOLIOS
// ==========================================
export async function getPortfolios() {
  const db = await initDb();
  return db.select().from(portfolios).orderBy(portfolios.orderIndex);
}

export async function addPortfolio(data: {
  title: string;
  description: string;
  mediaUrl: string;
  projectUrl?: string;
  isVideo: boolean;
  techStackJson: string;
  orderIndex: number;
}) {
  await requireAuth();
  const db = await initDb();
  await db.insert(portfolios).values({
    id: crypto.randomUUID(),
    title: data.title,
    description: data.description,
    mediaUrl: data.mediaUrl, // Local or trusted image URL
    projectUrl: sanitizeExternalUrl(data.projectUrl), // Sanitize external link
    isVideo: data.isVideo,
    techStackJson: data.techStackJson,
    orderIndex: data.orderIndex,
  });
  revalidatePath("/");
  return { success: true };
}

export async function deletePortfolio(id: string) {
  await requireAuth();
  const db = await initDb();
  await db.delete(portfolios).where(eq(portfolios.id, id));
  revalidatePath("/");
  return { success: true };
}

export async function updatePortfolio(id: string, data: any) {
  await requireAuth();
  const db = await initDb();
  const sanitizedData = { ...data };
  if (data.projectUrl !== undefined) {
    sanitizedData.projectUrl = sanitizeExternalUrl(data.projectUrl);
  }
  await db.update(portfolios).set(sanitizedData).where(eq(portfolios.id, id));
  revalidatePath("/");
  return { success: true };
}

// ==========================================
// GALLERIES
// ==========================================
export async function getGalleries() {
  const db = await initDb();
  return db.select().from(galleries).orderBy(galleries.orderIndex);
}

export async function addGallery(data: any) {
  await requireAuth();
  const db = await initDb();
  const id = crypto.randomUUID();
  await db.insert(galleries).values({ id, ...data });
  revalidatePath("/");
  return { success: true };
}

export async function deleteGallery(id: string) {
  await requireAuth();
  const db = await initDb();
  await db.delete(galleries).where(eq(galleries.id, id));
  revalidatePath("/");
  return { success: true };
}

export async function updateGallery(id: string, data: any) {
  await requireAuth();
  const db = await initDb();
  await db.update(galleries).set(data).where(eq(galleries.id, id));
  revalidatePath("/");
  return { success: true };
}

// ==========================================
// SOCIAL LINKS
// ==========================================
export async function getSocialLinks() {
  const db = await initDb();
  if (!db) return [];
  const result = await db.select().from(socialLinks).orderBy(asc(socialLinks.orderIndex));
  return result;
}

export async function addSocialLink(data: Omit<typeof socialLinks.$inferInsert, "id">) {
  await requireAuth();
  const db = await initDb();
  if (!db) throw new Error("Database not initialized");
  await db.insert(socialLinks).values({ ...data, id: crypto.randomUUID() });
  revalidatePath("/");
  revalidatePath("/admin/profile");
}

export async function updateSocialLink(id: string, data: Partial<Omit<typeof socialLinks.$inferInsert, "id">>) {
  await requireAuth();
  const db = await initDb();
  if (!db) throw new Error("Database not initialized");
  await db.update(socialLinks).set(data).where(eq(socialLinks.id, id));
  revalidatePath("/");
  revalidatePath("/admin/profile");
}

export async function deleteSocialLink(id: string) {
  await requireAuth();
  const db = await initDb();
  if (!db) throw new Error("Database not initialized");
  await db.delete(socialLinks).where(eq(socialLinks.id, id));
  revalidatePath("/");
  revalidatePath("/admin/profile");
}

// ANALYTICS ACTIONS
export async function recordPageView() {
  try {
    // Anti-spam protection using cookies
    const cookieStore = await cookies();
    if (cookieStore.has("view_tracked")) {
      return; // Already tracked for this session/user
    }

    const db = await initDb();
    if (!db) return;
    
    // We'll track total page views under the ID 'page_views_total'
    const viewId = "page_views_total";
    const existing = await db.select().from(analytics).where(eq(analytics.id, viewId));
    
    if (existing && existing.length > 0) {
      await db.update(analytics)
        .set({ count: existing[0].count + 1 })
        .where(eq(analytics.id, viewId));
    } else {
      await db.insert(analytics).values({
        id: viewId,
        type: "page_view",
        count: 1
      });
    }

    // Set cookie so we don't track again for 1 hour
    cookieStore.set("view_tracked", "1", { maxAge: 3600, httpOnly: true });
  } catch (error) {
    console.error("Failed to record page view", error);
  }
}

export async function recordPortfolioClick(portfolioId: string) {
  try {
    const cookieStore = await cookies();
    const cookieName = `click_${portfolioId}`;
    if (cookieStore.has(cookieName)) {
      return; // Already clicked recently
    }

    const db = await initDb();
    if (!db) return;
    
    const clickId = `portfolio_click_${portfolioId}`;
    const existing = await db.select().from(analytics).where(eq(analytics.id, clickId));
    
    if (existing && existing.length > 0) {
      await db.update(analytics)
        .set({ count: existing[0].count + 1 })
        .where(eq(analytics.id, clickId));
    } else {
      await db.insert(analytics).values({
        id: clickId,
        type: "portfolio_click",
        targetId: portfolioId,
        count: 1
      });
    }

    // Set cookie to prevent spamming for 1 hour
    cookieStore.set(cookieName, "1", { maxAge: 3600, httpOnly: true });
  } catch (error) {
    console.error("Failed to record portfolio click", error);
  }
}

export async function getAnalyticsData() {
  const db = await initDb();
  if (!db) return { pageViews: 0, portfolioClicks: [] };
  
  const allAnalytics = await db.select().from(analytics);
  
  const pageViewsRecord = allAnalytics.find(a => a.id === "page_views_total");
  const pageViews = pageViewsRecord ? pageViewsRecord.count : 0;
  
  const portfolioClicks = allAnalytics
    .filter(a => a.type === "portfolio_click" && a.targetId)
    .map(a => ({ portfolioId: a.targetId!, count: a.count }))
    .sort((a, b) => b.count - a.count); // sort descending by count
    
  return {
    pageViews,
    portfolioClicks
  };
}
