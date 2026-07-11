const { Client } = require('pg');
const fs = require('fs');
const c = new Client({
  connectionString: 'postgres://postgres.rfraszmvorpyrlpqidka:DSNBLGrxzGHnj8uZ@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
  ssl: { rejectUnauthorized: false }
});

async function main() {
  await c.connect();
  const sql = fs.readFileSync('supabase/schema.sql', 'utf8');
  try {
    await c.query(sql);
    console.log('Successfully executed schema.sql');
  } catch (e) {
    console.error('Error executing schema:', e.message);
  }
  
  // Reload schema cache!
  try { await c.query("NOTIFY pgrst, 'reload schema'"); console.log("Reloaded schema cache"); } catch(e){}
  
  await c.end();
}
main();
