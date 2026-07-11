import postgres from 'postgres';

const globalForPostgres = global as unknown as { sql: postgres.Sql };

// Kita menggunakan format objek agar tidak terjadi TypeError: Invalid URL
// saat Next.js melakukan proses build di lingkungan yang belum memiliki .env
export const sql = globalForPostgres.sql || postgres({
  host: process.env.DB_HOST || 'dummy.supabase.com',
  port: Number(process.env.DB_PORT || 6543),
  database: process.env.DB_DATABASE || 'postgres',
  username: process.env.DB_USERNAME || 'dummy',
  password: process.env.DB_PASSWORD || 'dummy',
  ssl: 'require',
  prepare: false,
});

if (process.env.NODE_ENV !== 'production') globalForPostgres.sql = sql;
