# Restaurant App Scaffold

Reproduzierbare Monorepo-Pipeline mit `pnpm` (Server + Web) und Docker.

## Voraussetzungen

- Node.js 20+
- pnpm 9+
- Docker + Docker Compose

## Root-Skripte

Im Root-Ordner stehen folgende Kommandos zur Verfügung:

- `pnpm install`
- `pnpm dev:server`
- `pnpm dev:web`
- `pnpm -r build`
- `pnpm -r test`

## How to run (lokal)

1. Dependencies installieren:

   ```bash
   pnpm install
   ```

2. Datenbank starten:

   ```bash
   docker-compose up -d db
   ```

3. Migrationen ausführen:

   ```bash
   pnpm --filter @restaurant/server migrate:up
   ```

4. Seed-Daten einspielen:

   ```bash
   pnpm --filter @restaurant/server seed
   ```

5. Entwicklungsmodus starten:

   - Server:

     ```bash
     pnpm dev:server
     ```

   - Web:

     ```bash
     pnpm dev:web
     ```

## Docker-Workflow (statisch gebautes Web im Server-Container)

1. Datenbank hochfahren:

   ```bash
   docker-compose up -d db
   ```

2. Migration + Seed gegen lokale DB:

   ```bash
   DATABASE_URL=postgres://postgres:postgres@localhost:5432/restaurant pnpm --filter @restaurant/server migrate:up
   DATABASE_URL=postgres://postgres:postgres@localhost:5432/restaurant pnpm --filter @restaurant/server seed
   ```

3. Server-Container starten (inkl. statischem Web-Build):

   ```bash
   docker-compose up -d --build server
   ```

4. Verifizieren:

   - API Health: `http://localhost:3000/health`
   - UI-Routen: `http://localhost:3000/pos`, `http://localhost:3000/kitchen`, `http://localhost:3000/admin`

## LAN-Zugriff

Der Server bindet auf `0.0.0.0` und ist damit im LAN erreichbar:

- `http://<SERVER-IP>:3000/pos`
- `http://<SERVER-IP>:3000/kitchen`
- `http://<SERVER-IP>:3000/admin`

## Offline-/Runtime-Anforderungen

- Das Web wird mit Vite gebaut und als statische Dateien aus `apps/web/dist` vom Server ausgeliefert.
- Zur Laufzeit sind keine externen CDN- oder API-Abhängigkeiten für das UI erforderlich.
