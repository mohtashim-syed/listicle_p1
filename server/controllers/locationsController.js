// Controller for the `locations` table (the Community tab).
// Holds the database logic so routes stay thin.

import { pool } from "../config/database.js";

// Get every location, with a count of its events (used by the picker grid).
export async function getLocations(req, res, next) {
  try {
    const { rows } = await pool.query(
      `SELECT
         l.id,
         l.slug,
         l.name,
         l.neighborhood,
         l.image,
         l.description,
         COUNT(e.id)::int AS event_count
       FROM locations l
       LEFT JOIN events e ON e.location_id = l.id
       GROUP BY l.id
       ORDER BY l.name ASC`
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

// Get a single location by slug, or 404 JSON if it doesn't exist.
export async function getLocationBySlug(req, res, next) {
  try {
    const { rows } = await pool.query(
      `SELECT id, slug, name, neighborhood, image, description
       FROM locations WHERE slug = $1`,
      [req.params.slug]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Location not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}
