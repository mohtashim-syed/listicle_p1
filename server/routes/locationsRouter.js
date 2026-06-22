// JSON API routes for the Community tab. Mounted at /api/locations by server.js.

import express from "express";
import {
  getLocations,
  getLocationBySlug,
} from "../controllers/locationsController.js";
import { getEventsByLocation } from "../controllers/eventsController.js";

const router = express.Router();

// GET /api/locations                 — all locations (with event counts).
router.get("/", getLocations);

// GET /api/locations/:slug            — a single location.
router.get("/:slug", getLocationBySlug);

// GET /api/locations/:slug/events     — all events at that location.
router.get("/:slug/events", getEventsByLocation);

export default router;
