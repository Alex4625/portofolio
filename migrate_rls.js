const { Client } = require('pg');

async function main() {
  const c = new Client({
    connectionString: 'postgres://postgres.rfraszmvorpyrlpqidka:DSNBLGrxzGHnj8uZ@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false }
  });
  await c.connect();

  const tables = ['profiles', 'services', 'skills', 'experiences', 'certifications', 'projects', 'videos', 'galleries'];
  
  for (const table of tables) {
    try {
      // First ensure RLS is enabled (just to be safe)
      await c.query(`ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY;`);
      
      // Drop existing policy if any
      try {
        await c.query(`DROP POLICY IF EXISTS "Allow public read" ON ${table};`);
      } catch (e) {}

      // Create policy to allow public select
      await c.query(`CREATE POLICY "Allow public read" ON ${table} FOR SELECT USING (true);`);
      
      console.log(`Configured public read policy for ${table}`);
    } catch (e) {
      console.error(`Error configuring RLS on ${table}:`, e.message);
    }
  }

  // Reload schema cache
  try { await c.query("NOTIFY pgrst, 'reload schema'"); } catch(e){}

  await c.end();
}
main();
