// Database reset script: drops, (re)creates, and seeds all tables.
// Run with:  npm run db:reset
//
// This is what makes adding/updating items "10000x easier" — change the
// arrays in data/tools.js and re-run this script to rebuild the database.

import { pool } from "./database.js";
import { categories, tools } from "../data/tools.js";

// Schema: a normalized two-table design.
//   categories (1) ──< (many) tools
// Each tool belongs to exactly one category via category_id (a foreign key).
async function createTables() {
  await pool.query(`
    DROP TABLE IF EXISTS tools CASCADE;
    DROP TABLE IF EXISTS categories CASCADE;

    CREATE TABLE categories (
      id   SERIAL PRIMARY KEY,
      slug VARCHAR(50)  NOT NULL UNIQUE,
      name VARCHAR(100) NOT NULL UNIQUE
    );

    CREATE TABLE tools (
      id          SERIAL PRIMARY KEY,
      slug        VARCHAR(100) NOT NULL UNIQUE,
      name        VARCHAR(150) NOT NULL,
      category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
      price       VARCHAR(50),
      platform    VARCHAR(150),
      image       TEXT,
      link        TEXT,
      description TEXT,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  console.log("✓ Tables created (categories, tools)");
}

async function seedCategories() {
  for (const category of categories) {
    await pool.query(
      `INSERT INTO categories (slug, name) VALUES ($1, $2)`,
      [category.slug, category.name]
    );
  }
  console.log(`✓ Seeded ${categories.length} categories`);
}

async function seedTools() {
  for (const tool of tools) {
    await pool.query(
      `INSERT INTO tools
         (slug, name, category_id, price, platform, image, link, description)
       VALUES
         ($1, $2, (SELECT id FROM categories WHERE slug = $3), $4, $5, $6, $7, $8)`,
      [
        tool.slug,
        tool.name,
        tool.category_slug,
        tool.price,
        tool.platform,
        tool.image,
        tool.link,
        tool.description,
      ]
    );
  }
  console.log(`✓ Seeded ${tools.length} tools`);
}

async function reset() {
  try {
    await createTables();
    await seedCategories();
    await seedTools();
    console.log("✅ Database reset complete.");
  } catch (err) {
    console.error("❌ Database reset failed:", err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

reset();
