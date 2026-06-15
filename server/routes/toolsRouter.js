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

// Turn a name into a URL-safe slug, e.g. "VS Code 2!" -> "vs-code-2".
function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// POST /api/tools — create a new tool.
// Body: { name, category, price, platform, image, link, description }
// The category is matched by name (case-insensitive) or created if new.
router.post("/", async (req, res, next) => {
  try {
    const { name, category, price, platform, image, link, description } =
      req.body ?? {};

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Name is required." });
    }
    if (!category || !category.trim()) {
      return res.status(400).json({ error: "Category is required." });
    }

    const slug = slugify(name);
    if (!slug) {
      return res.status(400).json({ error: "Name must contain letters or numbers." });
    }

    // Find the category by slug, or create it if it doesn't exist yet.
    const categorySlug = slugify(category);
    let categoryId;
    const existing = await pool.query(
      `SELECT id FROM categories WHERE slug = $1`,
      [categorySlug]
    );
    if (existing.rows.length > 0) {
      categoryId = existing.rows[0].id;
    } else {
      const created = await pool.query(
        `INSERT INTO categories (slug, name) VALUES ($1, $2) RETURNING id`,
        [categorySlug, category.trim()]
      );
      categoryId = created.rows[0].id;
    }

    // Insert the tool, then return it with its category joined in.
    const inserted = await pool.query(
      `INSERT INTO tools
         (slug, name, category_id, price, platform, image, link, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING slug`,
      [
        slug,
        name.trim(),
        categoryId,
        price?.trim() || null,
        platform?.trim() || null,
        image?.trim() || null,
        link?.trim() || null,
        description?.trim() || null,
      ]
    );

    const { rows } = await pool.query(
      `${SELECT_WITH_CATEGORY} WHERE t.slug = $1`,
      [inserted.rows[0].slug]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    // Unique-violation: a tool with this slug already exists.
    if (err.code === "23505") {
      return res
        .status(409)
        .json({ error: "A tool with that name already exists." });
    }
    next(err);
  }
});

// DELETE /api/tools/:slug — remove a tool.
router.delete("/:slug", async (req, res, next) => {
  try {
    const result = await pool.query(
      `DELETE FROM tools WHERE slug = $1 RETURNING slug`,
      [req.params.slug]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Tool not found" });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default router;
