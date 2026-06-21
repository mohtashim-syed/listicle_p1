// Controller for the `tools` table (this project's equivalent of the
// course's "events" table — the main list of items).
// Holds the database logic so routes stay thin.

import { pool } from "../config/database.js";

// Join each tool to its category so the category name/slug come back too.
const SELECT_WITH_CATEGORY = `
  SELECT
    t.id,
    t.slug,
    t.name,
    t.price,
    t.platform,
    t.image,
    t.link,
    t.description,
    t.created_at,
    c.name AS category,
    c.slug AS category_slug
  FROM tools t
  JOIN categories c ON c.id = t.category_id
`;

// Get every tool, ordered by id.
export async function getTools(req, res, next) {
  try {
    const { rows } = await pool.query(
      `${SELECT_WITH_CATEGORY} ORDER BY t.id ASC`
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}
