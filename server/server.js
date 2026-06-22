import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import toolsRouter from "./routes/toolsRouter.js";
import categoriesRouter from "./routes/categoriesRouter.js";
import locationsRouter from "./routes/locationsRouter.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// The frontend lives in ../client (sibling of the server folder).
const CLIENT_DIR = path.join(__dirname, "..", "client");

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies (used by POST /api/tools).
app.use(express.json());

// Serve the static frontend (HTML, CSS, JS, assets) from the client folder.
app.use(express.static(CLIENT_DIR));

// JSON API — the frontend fetches its data from here.
app.use("/api/tools", toolsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/locations", locationsRouter);

// Home page.
app.get("/", (req, res) => {
  res.sendFile(path.join(CLIENT_DIR, "index.html"));
});

// Detail page — one unique URL per tool, e.g. /tools/vs-code.
// The client reads the slug from the URL and fetches /api/tools/:slug.
app.get("/tools/:slug", (req, res) => {
  res.sendFile(path.join(CLIENT_DIR, "detail.html"));
});

// Community tab — the visual location picker.
app.get("/community", (req, res) => {
  res.sendFile(path.join(CLIENT_DIR, "community.html"));
});

// Location detail — one unique URL per location, e.g. /locations/tech-hub-downtown.
// The client reads the slug from the URL and fetches that location + its events.
app.get("/locations/:slug", (req, res) => {
  res.sendFile(path.join(CLIENT_DIR, "location.html"));
});

// Catch-all 404 for any route that didn't match above.
app.use((req, res) => {
  res.status(404).sendFile(path.join(CLIENT_DIR, "404.html"));
});

// Error handler — if a database query fails, respond appropriately.
app.use((err, req, res, next) => {
  console.error("Request error:", err);
  if (req.path.startsWith("/api/")) {
    return res.status(500).json({ error: "Internal server error" });
  }
  res.status(500).sendFile(path.join(CLIENT_DIR, "404.html"));
});

app.listen(PORT, () => {
  console.log(`Dev Tools listicle running at http://localhost:${PORT}`);
});
