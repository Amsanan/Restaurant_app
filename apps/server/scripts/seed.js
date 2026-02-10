import { pool } from '../src/db.js';

async function seed() {
  await pool.query(`
    INSERT INTO menu_items (name, price_cents)
    VALUES
      ('Pizza Margherita', 1090),
      ('Pasta Arrabbiata', 990),
      ('Tiramisu', 590)
    ON CONFLICT (name) DO UPDATE SET price_cents = EXCLUDED.price_cents
  `);

  console.log('seed complete');
  await pool.end();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
