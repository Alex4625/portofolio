import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;

function getSupabase() {
  if (!_supabase) {
    const supabaseUrl =
      process.env.SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      'https://dummy.supabase.co';
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      'dummy';
    _supabase = createClient(supabaseUrl, supabaseKey);
  }
  return _supabase;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get: (target, prop) => {
    const client = getSupabase();
    const value = client[prop as keyof SupabaseClient];
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  }
});
