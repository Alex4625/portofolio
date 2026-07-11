const { Client } = require('pg');
const c = new Client({
  connectionString: 'postgres://postgres.rfraszmvorpyrlpqidka:DSNBLGrxzGHnj8uZ@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
  ssl: { rejectUnauthorized: false }
});
c.connect().then(async () => {
  const res = await c.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'services'");
  console.log('Columns:', res.rows.map(r => r.column_name));
  await c.end();
}).catch(console.error);
