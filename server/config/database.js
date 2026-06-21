// Centralized Postgres connection pool.
// Works against a hosted Render database (via DATABASE_URL + SSL) or a local
// Postgres instance (via the individual PG* variables) — just change .env.

import path from "node:path";
import { fileURLToPath } from "node:url";

import pg from "pg";
import dotenv from "dotenv";

// Load server/.env regardless of where node is started from. npm scripts run
// node from the repo root, so a bare dotenv.config() would miss server/.env.
// __dirname here is server/config, so ../.env resolves to server/.env.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const { Pool } = pg;

// A full DATABASE_URL (Render / other hosted providers) takes precedence.
const useConnectionString = Boolean(process.env.DATABASE_URL);

const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: {
      rejectUnauthorized: false
    }
}

export const pool = new pg.Pool(config)
