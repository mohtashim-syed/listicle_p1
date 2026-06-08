import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { tools, getToolBySlug } from "./data/tools.js";
import { renderHome, renderDetail, render404 } from "./views.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets (custom CSS, future JS/images) from /public.
app.use(express.static(path.join(__dirname, "public")));

// Home page — lists every tool.
app.get("/", (req, res) => {
  res.send(renderHome(tools));
});

// Detail page — one page per tool, e.g. /tools/vs-code
app.get("/tools/:slug", (req, res) => {
  const tool = getToolBySlug(req.params.slug);
  if (!tool) {
    return res.status(404).send(render404());
  }
  res.send(renderDetail(tool));
});

// Catch-all 404 for any route that didn't match above.
app.use((req, res) => {
  res.status(404).send(render404());
});

app.listen(PORT, () => {
  console.log(`Dev Tools listicle running at http://localhost:${PORT}`);
});
