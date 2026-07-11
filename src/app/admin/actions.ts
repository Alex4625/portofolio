"use server";

import { login, logout } from "@/../lib/auth";
import { supabase } from "@/../lib/db";
import { uploadToR2, deleteFromR2 } from "@/../lib/r2";
import { revalidatePath } from "next/cache";

export async function loginAction(password: string) {
  return await login(password);
}

export async function logoutAction() {
  await logout();
}

// PROFILE ACTIONS
export async function updateProfileAction(formData: FormData): Promise<void> {
  const name = formData.get("name") as string;
  const profession = formData.get("profession") as string;
  const bio = formData.get("bio") as string;
  const email = formData.get("email") as string;
  const github_url = formData.get("github_url") as string;
  const linkedin_url = formData.get("linkedin_url") as string;
  
  const avatarFile = formData.get("avatar") as File;
  const cvFile = formData.get("cv") as File;
  const oldAvatar = formData.get("old_avatar") as string;
  const oldCv = formData.get("old_cv") as string;

  let avatarPath = oldAvatar;
  let cvPath = oldCv;

  if (avatarFile && avatarFile.size > 0) {
    if (oldAvatar) await deleteFromR2(oldAvatar);
    avatarPath = await uploadToR2(avatarFile, "profiles");
  }

  if (cvFile && cvFile.size > 0) {
    if (oldCv) await deleteFromR2(oldCv);
    cvPath = await uploadToR2(cvFile, "profiles");
  }

  const { data: existingProfile } = await supabase.from('profiles').select('id').limit(1).single();

  if (existingProfile) {
    await supabase.from('profiles').update({
      name, profession, bio, email, github_url, linkedin_url,
      avatar_path: avatarPath, cv_pdf_path: cvPath, updated_at: new Date().toISOString()
    }).eq('id', existingProfile.id);
  } else {
    await supabase.from('profiles').insert({
      name, profession, bio, email, github_url, linkedin_url,
      avatar_path: avatarPath, cv_pdf_path: cvPath
    });
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

// PROJECT ACTIONS
export async function createProjectAction(formData: FormData): Promise<void> {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const technologies = formData.get("technologies") as string;
  const url = formData.get("url") as string;
  const is_published = formData.get("is_published") === "true";
  
  const imageFile = formData.get("image") as File;
  let imagePath = "";

  if (imageFile && imageFile.size > 0) {
    imagePath = await uploadToR2(imageFile, "projects");
  }

  await supabase.from('projects').insert({
    title, description, technologies, url, image_path: imagePath, is_published
  });

  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function deleteProjectAction(id: string, imagePath?: string): Promise<void> {
  if (imagePath) await deleteFromR2(imagePath);
  await supabase.from('projects').delete().eq('id', id);
  
  revalidatePath("/");
  revalidatePath("/admin/projects");
}
