import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { getAllTools, getToolBySlug } from "./data/queries.js";
import { renderHome, renderDetail, render404, render500 } from "./views.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets (custom CSS, images) from /public.
app.use(express.static(path.join(__dirname, "public")));

// Home page — lists every tool, queried live from Postgres.
app.get("/", async (req, res, next) => {
  try {
    const tools = await getAllTools();
    res.send(renderHome(tools));
  } catch (err) {
    next(err);
  }
});

// Detail page — one page per tool, e.g. /tools/vs-code
app.get("/tools/:slug", async (req, res, next) => {
  try {
    const tool = await getToolBySlug(req.params.slug);
    if (!tool) {
      return res.status(404).send(render404());
    }
    res.send(renderDetail(tool));
  } catch (err) {
    next(err);
  }
});

// Catch-all 404 for any route that didn't match above.
app.use((req, res) => {
  res.status(404).send(render404());
});

// Error handler — if a database query fails, show a friendly 500 page.
app.use((err, req, res, next) => {
  console.error("Request error:", err);
  res.status(500).send(render500());
});

app.listen(PORT, () => {
  console.log(`Dev Tools listicle running at http://localhost:${PORT}`);
});
