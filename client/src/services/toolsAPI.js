// Frontend data layer: all communication with the backend API lives here.
// These functions fetch JSON from the Express server, which in turn queries
// the Render PostgreSQL database.

const BASE_URL = "/api/tools";

// Fetch the full list of tools.
export async function fetchTools() {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error(`Failed to load tools (HTTP ${res.status})`);
  }
  return res.json();
}

// Fetch a single tool by its slug. Returns null if it doesn't exist (404).
export async function fetchToolBySlug(slug) {
  const res = await fetch(`${BASE_URL}/${encodeURIComponent(slug)}`);
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error(`Failed to load tool (HTTP ${res.status})`);
  }
  return res.json();
}
