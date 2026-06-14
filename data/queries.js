// All database access for the app lives here. Routes call these functions
// instead of touching SQL directly. Each query joins tools → categories so
// the category name comes back alongside every tool.

import { pool } from "../config/database.js";

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

// All tools, newest categories first then alphabetical — stable display order.
export async function getAllTools() {
  const { rows } = await pool.query(
    `${SELECT_WITH_CATEGORY} ORDER BY t.id ASC`
  );
  return rows;
}

// A single tool by its slug, or undefined if none matches.
export async function getToolBySlug(slug) {
  const { rows } = await pool.query(
    `${SELECT_WITH_CATEGORY} WHERE t.slug = $1`,
    [slug]
  );
  return rows[0];
}
