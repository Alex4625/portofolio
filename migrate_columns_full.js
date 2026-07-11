const { Client } = require('pg');
const fs = require('fs');

async function main() {
  const c = new Client({
    connectionString: 'postgres://postgres.rfraszmvorpyrlpqidka:DSNBLGrxzGHnj8uZ@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false }
  });
  await c.connect();

  const tables = ['services', 'skills', 'experiences', 'certifications', 'projects', 'videos', 'galleries'];
  
  for (const table of tables) {
    try {
      await c.query(`ALTER TABLE ${table} ADD COLUMN IF NOT EXISTS order_column integer DEFAULT 0`);
      console.log(`Ensured order_column exists on ${table}`);
    } catch (e) {
      console.error(`Error adding order_column to ${table}:`, e.message);
    }
  }

  // Reload schema cache!
  try { await c.query("NOTIFY pgrst, 'reload schema'"); } catch(e){}

  const sql = fs.readFileSync('supabase/schema.sql', 'utf8');
  const statements = sql.split(';').map(s => s.trim()).filter(Boolean);
  
  for (const stmt of statements) {
    try {
      await c.query(stmt);
    } catch (e) {
      console.error('Error executing stmt:', stmt.substring(0, 50), '->', e.message);
    }
  }
  
  // Final reload
  try { await c.query("NOTIFY pgrst, 'reload schema'"); } catch(e){}

  await c.end();
}
main();
