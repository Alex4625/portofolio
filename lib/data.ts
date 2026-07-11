import { sql } from './db';

export async function getProfile() {
  const profiles = await sql`SELECT * FROM profiles LIMIT 1`;
  return profiles[0] || null;
}

export async function getProjects() {
  return await sql`SELECT * FROM projects ORDER BY created_at DESC`;
}

export async function getSkills() {
  return await sql`SELECT * FROM skills ORDER BY name ASC`;
}

export async function getExperiences() {
  return await sql`SELECT * FROM experiences ORDER BY start_date DESC`;
}

export async function getEducations() {
  return await sql`SELECT * FROM education ORDER BY start_date DESC`;
}

export async function getServices() {
  return await sql`SELECT * FROM services ORDER BY created_at DESC`;
}

export async function getVideos() {
  return await sql`SELECT * FROM videos ORDER BY created_at DESC`;
}

export async function getGalleries() {
  return await sql`SELECT * FROM galleries ORDER BY created_at DESC`;
}
