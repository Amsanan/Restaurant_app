import express from 'express';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { query } from './db.js';

const app = express();
const port = Number(process.env.PORT || 3000);
const webDist = resolve(process.cwd(), '../web/dist');

app.get('/health', async (_req, res) => {
  try {
    await query('SELECT 1');
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

if (existsSync(webDist)) {
  app.use(express.static(webDist));
  app.get(['/pos', '/kitchen', '/admin'], (_req, res) => {
    res.sendFile(resolve(webDist, 'index.html'));
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`server listening on ${port}`);
});
