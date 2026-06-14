// Centralized Postgres connection pool.
// Reads from .env so the same code works against a local DB or a hosted one
// (Railway/Neon/Supabase) — just change the environment variables.

import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

// A full DATABASE_URL (hosted providers) takes precedence over PG* vars.
const useConnectionString = Boolean(process.env.DATABASE_URL);

const config = useConnectionString
  ? {
      connectionString: process.env.DATABASE_URL,
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
