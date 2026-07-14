"use server";

import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { siteConfig, educations, services, portfolios, galleries, socialLinks } from "@/db/schema";
import { eq } from "drizzle-orm";
// Assume opennextjs-cloudflare provides getCloudflareContext
// If this import fails in Next.js dev, we will handle the fallback or instruct the user to use npm run preview
import { getCloudflareContext } from "@opennextjs/cloudflare";

async function initDb() {
  const { env } = await getCloudflareContext();
  return getDb((env as any).DB);
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
  const db = await initDb();
  const id = crypto.randomUUID();
  await db.insert(educations).values({ id, ...data });
  revalidatePath("/");
  return { success: true };
}

export async function deleteEducation(id: string) {
  const db = await initDb();
  await db.delete(educations).where(eq(educations.id, id));
  revalidatePath("/");
  return { success: true };
}

export async function updateEducation(id: string, data: any) {
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
  const db = await initDb();
  const id = crypto.randomUUID();
  await db.insert(services).values({ id, ...data });
  revalidatePath("/");
  return { success: true };
}

export async function deleteService(id: string) {
  const db = await initDb();
  await db.delete(services).where(eq(services.id, id));
  revalidatePath("/");
  return { success: true };
}

export async function updateService(id: string, data: any) {
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
  const db = await initDb();
  await db.delete(portfolios).where(eq(portfolios.id, id));
  revalidatePath("/");
  return { success: true };
}

export async function updatePortfolio(id: string, data: any) {
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
  const db = await initDb();
  const id = crypto.randomUUID();
  await db.insert(galleries).values({ id, ...data });
  revalidatePath("/");
  return { success: true };
}

export async function deleteGallery(id: string) {
  const db = await initDb();
  await db.delete(galleries).where(eq(galleries.id, id));
  revalidatePath("/");
  return { success: true };
}

export async function updateGallery(id: string, data: any) {
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
  return db.select().from(socialLinks).orderBy(socialLinks.orderIndex);
}

export async function addSocialLink(data: any) {
  const db = await initDb();
  const id = crypto.randomUUID();
  await db.insert(socialLinks).values({ id, ...data });
  revalidatePath("/");
  return { success: true };
}

export async function deleteSocialLink(id: string) {
  const db = await initDb();
  await db.delete(socialLinks).where(eq(socialLinks.id, id));
  revalidatePath("/");
  return { success: true };
}

export async function updateSocialLink(id: string, data: any) {
  const db = await initDb();
  await db.update(socialLinks).set(data).where(eq(socialLinks.id, id));
  revalidatePath("/");
  return { success: true };
}
