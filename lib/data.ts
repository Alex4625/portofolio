import { supabase } from './db';

export async function getProfile() {
  try {
    const { data } = await supabase.from('profiles').select('*').limit(1).single();
    return data || null;
  } catch { return null; }
}

export async function getProjects() {
  try {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    return data || [];
  } catch { return []; }
}

export async function getSkills() {
  try {
    const { data } = await supabase.from('skills').select('*').order('name', { ascending: true });
    return data || [];
  } catch { return []; }
}

export async function getExperiences() {
  try {
    const { data } = await supabase.from('experiences').select('*').order('start_date', { ascending: false });
    return data || [];
  } catch { return []; }
}

export async function getServices() {
  try {
    const { data } = await supabase.from('services').select('*').order('order_num', { ascending: true });
    return data || [];
  } catch { return []; }
}

export async function getCertifications() {
  try {
    const { data } = await supabase.from('certifications').select('*').order('year', { ascending: false });
    return data || [];
  } catch { return []; }
}

export async function getGallery() {
  try {
    const { data } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
    return data || [];
  } catch { return []; }
}
