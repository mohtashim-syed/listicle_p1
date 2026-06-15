// Centralized Postgres connection pool.
// Works against a hosted Render database (via DATABASE_URL + SSL) or a local
// Postgres instance (via the individual PG* variables) — just change .env.

import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

// A full DATABASE_URL (Render / other hosted providers) takes precedence.
const useConnectionString = Boolean(process.env.DATABASE_URL);

const config = useConnectionString
  ? {
      connectionString: process.env.DATABASE_URL,
      // Render requires SSL. Set PGSSL=false in .env to disable (e.g. local URL).
      ssl:
        process.env.PGSSL === "false"
          ? false
          : { rejectUnauthorized: false },
    }
  : {
      host: process.env.PGHOST || "localhost",
      port: Number(process.env.PGPORT) || 5432,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD || undefined,
      database: process.env.PGDATABASE,
      ssl: process.env.PGSSL === "true" ? { rejectUnauthorized: false } : false,
    };

export const pool = new Pool(config);
