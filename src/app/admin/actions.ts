"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { login, logout, assertAdminAction } from "@/../lib/auth";
import { supabase } from "@/../lib/db";
import { uploadToR2, deleteFromR2 } from "@/../lib/r2";
import { resourceConfigs, type FieldKind, type ResourceConfig } from "@/../lib/adminResources";

function getConfig(resource: string) {
  const config = resourceConfigs[resource];
  if (!config) throw new Error("Resource tidak dikenal");
  return config;
}

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function parseField(formData: FormData, key: string, kind: FieldKind) {
  if (kind === "checkbox") return formData.get(key) === "on" || formData.get(key) === "true";
  if (kind === "number") {
    const value = getString(formData, key);
    return value ? Number(value) : 0;
  }
  if (kind === "json") {
    const value = getString(formData, key);
    if (!value) return [];
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }
  return getString(formData, key) || null;
}

async function applyUploads(config: ResourceConfig, formData: FormData, payload: Record<string, unknown>) {
  for (const [column, folder] of Object.entries(config.files)) {
    const file = formData.get(column) as File | null;
    const oldPath = getString(formData, `old_${column}`);
    payload[column] = oldPath || null;

    if (file && file.size > 0) {
      if (oldPath) await deleteFromR2(oldPath);
      payload[column] = await uploadToR2(file, folder);
    }
  }
}

export async function loginAction(password: string) {
  return await login(password);
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}

export async function updateProfileAction(formData: FormData): Promise<void> {
  await assertAdminAction();

  const fields = [
    "name",
    "full_name",
    "profession",
    "hero_badge",
    "bio",
    "about_text",
    "email",
    "phone",
    "whatsapp_url",
    "location",
    "github_url",
    "linkedin_url",
    "instagram_url",
  ];

  const payload: Record<string, unknown> = {};
  for (const field of fields) payload[field] = getString(formData, field) || null;

  const statsText = getString(formData, "stats_json");
  if (statsText) {
    try {
      payload.stats_json = JSON.parse(statsText);
    } catch {
      payload.stats_json = [];
    }
  }

  for (const [column, folder] of Object.entries({
    avatar_path: "profiles",
    hero_image_path: "profiles",
    about_image_path: "profiles",
    cv_pdf_path: "profiles",
  })) {
    const file = formData.get(column) as File | null;
    const oldPath = getString(formData, `old_${column}`);
    payload[column] = oldPath || null;
    if (file && file.size > 0) {
      if (oldPath) await deleteFromR2(oldPath);
      payload[column] = await uploadToR2(file, folder);
    }
  }

  payload.updated_at = new Date().toISOString();

  const { data: existingProfile } = await supabase.from("profiles").select("id").limit(1).single();

  if (existingProfile) {
    const { error } = await supabase.from("profiles").update(payload).eq("id", existingProfile.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("profiles").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function upsertResourceAction(resource: string, formData: FormData): Promise<void> {
  await assertAdminAction();
  const config = getConfig(resource);
  const id = getString(formData, "id");
  const payload: Record<string, unknown> = {};

  for (const [key, kind] of Object.entries(config.fields)) {
    payload[key] = parseField(formData, key, kind);
  }
  await applyUploads(config, formData, payload);
  payload.updated_at = new Date().toISOString();

  if (id) {
    const { error } = await supabase.from(config.table).update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from(config.table).insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath(config.path);
  revalidatePath("/admin");
}

export async function deleteResourceAction(resource: string, id: string, filePaths: string[] = []): Promise<void> {
  await assertAdminAction();
  const config = getConfig(resource);
  for (const filePath of filePaths) {
    if (filePath) await deleteFromR2(filePath);
  }
  const { error } = await supabase.from(config.table).delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath(config.path);
  revalidatePath("/admin");
}

export async function createProjectAction(formData: FormData): Promise<void> {
  return upsertResourceAction("projects", formData);
}

export async function deleteProjectAction(id: string, imagePath?: string): Promise<void> {
  return deleteResourceAction("projects", id, imagePath ? [imagePath] : []);
}
