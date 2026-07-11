import { createClient } from '@supabase/supabase-js';

// Pastikan untuk menambahkan SUPABASE_URL dan SUPABASE_ANON_KEY di environment variables Cloudflare Workers
const supabaseUrl = process.env.SUPABASE_URL || 'https://dummy.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'dummy';

export const supabase = createClient(supabaseUrl, supabaseKey);
