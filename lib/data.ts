import { supabase } from "./db";
import { toPublicUrl } from "./r2";

export type DbRow = Record<string, unknown>;

export type SiteData = {
  profile: DbRow | null;
  services: DbRow[];
  skills: DbRow[];
  experiences: DbRow[];
  certifications: DbRow[];
  projects: DbRow[];
  videos: DbRow[];
  galleries: DbRow[];
};

async function selectTable(table: string, orderColumn = "order_column", ascending = true) {
  try {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .or("is_published.is.null,is_published.eq.true")
      .order(orderColumn, { ascending });

    if (error) throw error;
    return data || [];
  } catch {
    try {
      const { data, error } = await supabase.from(table).select("*");
      if (error) throw error;
      return (data || [])
        .filter((row) => row.is_published !== false)
        .sort((a, b) => number(a, [orderColumn], 0) - number(b, [orderColumn], 0));
    } catch {
      return [];
    }
  }
}

async function selectTableFallback(primary: string, fallback: string, orderColumn = "order_column") {
  const primaryData = await selectTable(primary, orderColumn);
  if (primaryData.length > 0) return primaryData;
  return selectTable(fallback, orderColumn);
}

export async function getProfile() {
  try {
    const { data } = await supabase.from("profiles").select("*").limit(1).single();
    return data || null;
  } catch {
    return null;
  }
}

export async function getProjects() {
  return selectTable("projects", "order_column", true);
}

export async function getSkills() {
  return selectTable("skills", "order_column", true);
}

export async function getExperiences() {
  return selectTable("experiences", "order_column", true);
}

export async function getServices() {
  return selectTable("services", "order_column", true);
}

export async function getCertifications() {
  return selectTable("certifications", "order_column", true);
}

export async function getGallery() {
  return selectTableFallback("galleries", "gallery", "order_column");
}

export async function getVideos() {
  return selectTable("videos", "order_column", true);
}

export async function getSiteData(): Promise<SiteData> {
  const [
    profile,
    projects,
    skills,
    experiences,
    services,
    certifications,
    galleries,
    videos,
  ] = await Promise.all([
    getProfile(),
    getProjects(),
    getSkills(),
    getExperiences(),
    getServices(),
    getCertifications(),
    getGallery(),
    getVideos(),
  ]);

  return { profile, projects, skills, experiences, services, certifications, galleries, videos };
}

export function text(row: DbRow | null | undefined, keys: string[], fallback = "") {
  if (!row) return fallback;
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "string" && value.trim()) return value;
    if (typeof value === "number") return String(value);
  }
  return fallback;
}

export function bool(row: DbRow | null | undefined, key: string, fallback = false) {
  if (!row) return fallback;
  const value = row[key];
  return typeof value === "boolean" ? value : fallback;
}

export function number(row: DbRow | null | undefined, keys: string[], fallback = 0) {
  if (!row) return fallback;
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value.trim() && Number.isFinite(Number(value))) {
      return Number(value);
    }
  }
  return fallback;
}

export function imageUrl(row: DbRow | null | undefined, keys: string[], fallback = "") {
  return toPublicUrl(text(row, keys, fallback));
}

export function techList(row: DbRow | null | undefined) {
  if (!row) return [];
  const stack = row.tech_stack;
  if (Array.isArray(stack)) return stack.map(String).filter(Boolean);
  const technologies = text(row, ["technologies"]);
  return technologies
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
