const { Client } = require('pg');
const c = new Client({
  connectionString: 'postgres://postgres.rfraszmvorpyrlpqidka:DSNBLGrxzGHnj8uZ@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
  ssl: { rejectUnauthorized: false }
});

async function main() {
  await c.connect();
  const tables = ['services', 'skills', 'experiences', 'certifications', 'projects', 'videos', 'galleries'];
  for (const table of tables) {
    try {
      await c.query(`ALTER TABLE ${table} ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT true`);
      console.log(`Added is_published to ${table}`);
    } catch (e) {
      console.error(e.message);
    }
  }
  
  // Specific columns that might be missing
  try { await c.query("ALTER TABLE services ADD COLUMN IF NOT EXISTS order_num integer DEFAULT 0"); } catch(e){}
  try { await c.query("ALTER TABLE skills ADD COLUMN IF NOT EXISTS value text"); } catch(e){}
  try { await c.query("ALTER TABLE skills ADD COLUMN IF NOT EXISTS icon_image text"); } catch(e){}
  try { await c.query("ALTER TABLE projects ADD COLUMN IF NOT EXISTS tech_stack jsonb DEFAULT '[]'::jsonb"); } catch(e){}
  try { await c.query("ALTER TABLE projects ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false"); } catch(e){}
  
  // Reload schema cache!
  try { await c.query("NOTIFY pgrst, 'reload schema'"); console.log("Reloaded schema cache"); } catch(e){}
  
  await c.end();
}
main();
