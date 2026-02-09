CREATE TABLE IF NOT EXISTS menu_items (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  price_cents INTEGER NOT NULL CHECK (price_cents > 0)
);
