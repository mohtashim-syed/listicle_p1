// JSON API routes for categories (this project's "locations" equivalent —
// the related lookup table). Mounted at /api/categories by server.js.

import express from "express";
import { getCategories } from "../controllers/categoriesController.js";

const router = express.Router();

// GET /api/categories — all categories.
router.get("/", getCategories);

export default router;
