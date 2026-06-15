// JSON API routes for tools. Mounted at /api/tools by server.js.
// The frontend (client/src/services) fetches from these endpoints.

import express from "express";
import { pool } from "../config/database.js";

const router = express.Router();

// Shared SELECT that joins each tool to its category so the category name
// comes back alongside every tool.
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

// GET /api/tools — all tools.
router.get("/", async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `${SELECT_WITH_CATEGORY} ORDER BY t.id ASC`
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// GET /api/tools/:slug — a single tool, or 404 JSON if not found.
router.get("/:slug", async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `${SELECT_WITH_CATEGORY} WHERE t.slug = $1`,
      [req.params.slug]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Tool not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

export default router;
