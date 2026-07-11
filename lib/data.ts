import { supabase } from './db';

export async function getProfile() {
  const { data } = await supabase.from('profiles').select('*').limit(1).single();
  return data || null;
}

export async function getProjects() {
  const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
  return data || [];
}

export async function getSkills() {
  const { data } = await supabase.from('skills').select('*').order('name', { ascending: true });
  return data || [];
}

export async function getExperiences() {
  const { data } = await supabase.from('experiences').select('*').order('start_date', { ascending: false });
  return data || [];
}
