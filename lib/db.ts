import postgres from 'postgres';

const connectionString = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?sslmode=require`;

// Di lingkungan Serverless (Vercel/Next.js), sangat penting untuk mencegah
// pembuatan koneksi berlebih (connection pooling exhaust) saat hot-reload.
const globalForPostgres = global as unknown as { sql: postgres.Sql };

export const sql = globalForPostgres.sql || postgres(connectionString, { prepare: false });

if (process.env.NODE_ENV !== 'production') globalForPostgres.sql = sql;
