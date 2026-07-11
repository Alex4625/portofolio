"use server";

import { login, logout } from "@/../lib/auth";
import { sql } from "@/../lib/db";
import { uploadToR2, deleteFromR2 } from "@/../lib/r2";
import { revalidatePath } from "next/cache";

export async function loginAction(password: string) {
  return await login(password);
}

export async function logoutAction() {
  await logout();
}

// PROFILE ACTIONS
export async function updateProfileAction(formData: FormData) {
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

  const existingProfile = await sql`SELECT id FROM profiles LIMIT 1`;

  if (existingProfile.length > 0) {
    await sql`
      UPDATE profiles 
      SET name = ${name}, profession = ${profession}, bio = ${bio}, email = ${email}, 
          github_url = ${github_url}, linkedin_url = ${linkedin_url}, 
          avatar_path = ${avatarPath}, cv_pdf_path = ${cvPath}, updated_at = NOW()
      WHERE id = ${existingProfile[0].id}
    `;
  } else {
    await sql`
      INSERT INTO profiles (name, profession, bio, email, github_url, linkedin_url, avatar_path, cv_pdf_path)
      VALUES (${name}, ${profession}, ${bio}, ${email}, ${github_url}, ${linkedin_url}, ${avatarPath}, ${cvPath})
    `;
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

// PROJECT ACTIONS
export async function createProjectAction(formData: FormData) {
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

  await sql`
    INSERT INTO projects (title, description, technologies, url, image_path, is_published)
    VALUES (${title}, ${description}, ${technologies}, ${url}, ${imagePath}, ${is_published})
  `;

  revalidatePath("/");
  revalidatePath("/admin/projects");
  return { success: true };
}

export async function deleteProjectAction(id: string, imagePath?: string) {
  if (imagePath) await deleteFromR2(imagePath);
  await sql`DELETE FROM projects WHERE id = ${id}`;
  
  revalidatePath("/");
  revalidatePath("/admin/projects");
  return { success: true };
}
