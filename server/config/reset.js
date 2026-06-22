// Database reset script: drops, (re)creates, and seeds all tables.
// Run with:  npm run db:reset
//
// Point this at your Render database (DATABASE_URL in .env) to create and seed
// the tables in the cloud. Changing the arrays in config/data.js and re-running
// this is all it takes to update the app's content.

import { pool } from "./database.js";
import { categories, tools, locations, events } from "./data.js";

// Schema: two independent feature areas sharing one database.
//   Dev Tools tab:   categories (1) ──< (many) tools
//   Community tab:   locations  (1) ──< (many) events
// Each child row points at its parent via a foreign key.
async function createTables() {
  await pool.query(`
    DROP TABLE IF EXISTS tools CASCADE;
    DROP TABLE IF EXISTS categories CASCADE;
    DROP TABLE IF EXISTS events CASCADE;
    DROP TABLE IF EXISTS locations CASCADE;

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

    CREATE TABLE locations (
      id           SERIAL PRIMARY KEY,
      slug         VARCHAR(100) NOT NULL UNIQUE,
      name         VARCHAR(150) NOT NULL,
      neighborhood VARCHAR(150),
      image        TEXT,
      description  TEXT
    );

    CREATE TABLE events (
      id          SERIAL PRIMARY KEY,
      title       VARCHAR(200) NOT NULL,
      location_id INTEGER NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
      starts_at   TIMESTAMPTZ NOT NULL,
      host        VARCHAR(150),
      description TEXT
    );
  `);
  console.log("✓ Tables created (categories, tools, locations, events)");
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

async function seedLocations() {
  for (const location of locations) {
    await pool.query(
      `INSERT INTO locations (slug, name, neighborhood, image, description)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        location.slug,
        location.name,
        location.neighborhood,
        location.image,
        location.description,
      ]
    );
  }
  console.log(`✓ Seeded ${locations.length} locations`);
}

async function seedEvents() {
  for (const event of events) {
    await pool.query(
      `INSERT INTO events (title, location_id, starts_at, host, description)
       VALUES
         ($1, (SELECT id FROM locations WHERE slug = $2), $3, $4, $5)`,
      [
        event.title,
        event.location_slug,
        event.starts_at,
        event.host,
        event.description,
      ]
    );
  }
  console.log(`✓ Seeded ${events.length} events`);
}

async function reset() {
  try {
    await createTables();
    await seedCategories();
    await seedTools();
    await seedLocations();
    await seedEvents();
    console.log("✅ Database reset complete.");
  } catch (err) {
    console.error("❌ Database reset failed:", err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

reset();
