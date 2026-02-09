import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pool } from '../src/db.js';

const migrationsDir = resolve(process.cwd(), 'migrations');

async function migrateUp() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id SERIAL PRIMARY KEY,
      filename TEXT UNIQUE NOT NULL,
      executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  const files = (await readdir(migrationsDir)).filter((f) => f.endsWith('.sql')).sort();

  for (const file of files) {
    const already = await pool.query('SELECT 1 FROM schema_migrations WHERE filename = $1', [file]);
    if (already.rowCount > 0) continue;

    const sql = await readFile(resolve(migrationsDir, file), 'utf8');
    await pool.query('BEGIN');
    try {
      await pool.query(sql);
      await pool.query('INSERT INTO schema_migrations(filename) VALUES ($1)', [file]);
      await pool.query('COMMIT');
      console.log(`applied migration: ${file}`);
    } catch (error) {
      await pool.query('ROLLBACK');
      throw error;
    }
  }

  await pool.end();
}

migrateUp().catch((error) => {
  console.error(error);
  process.exit(1);
});
