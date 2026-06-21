// Frontend data layer for categories (this project's "locations" equivalent).
// Mirrors toolsAPI.js: fetch JSON from the Express server, which queries the
// Render PostgreSQL database.

const BASE_URL = "/api/categories";

// Fetch the full list of categories.
export async function fetchCategories() {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error(`Failed to load categories (HTTP ${res.status})`);
  }
  return res.json();
}
