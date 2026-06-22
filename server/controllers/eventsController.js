// Controller for the `events` table (the Community tab).
// Events are always viewed in the context of their location.

import { pool } from "../config/database.js";

// Get all events held at one location (by location slug), soonest first.
// Returns 404 if the location itself doesn't exist.
export async function getEventsByLocation(req, res, next) {
  try {
    const location = await pool.query(
      `SELECT id FROM locations WHERE slug = $1`,
      [req.params.slug]
    );
    if (location.rows.length === 0) {
      return res.status(404).json({ error: "Location not found" });
    }

    const { rows } = await pool.query(
      `SELECT id, title, starts_at, host, description
       FROM events
       WHERE location_id = $1
       ORDER BY starts_at ASC`,
      [location.rows[0].id]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}
