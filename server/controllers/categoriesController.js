// Controller for the `categories` table (this project's equivalent of the
// course's "locations" table — the related lookup table that each tool
// belongs to).
// Holds the database logic so routes stay thin.

import { pool } from "../config/database.js";

// Get every category, ordered alphabetically by name.
export async function getCategories(req, res, next) {
  try {
    const { rows } = await pool.query(
      `SELECT id, slug, name FROM categories ORDER BY name ASC`
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}
