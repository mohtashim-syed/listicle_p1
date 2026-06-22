// Frontend data layer for the Community tab: all calls to the locations/events
// API live here. Mirrors toolsAPI.js — fetch JSON from the Express server,
// which queries the Render PostgreSQL database.

const BASE_URL = "/api/locations";

// Fetch every location (each includes an event_count).
export async function fetchLocations() {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error(`Failed to load locations (HTTP ${res.status})`);
  }
  return res.json();
}

// Fetch a single location by slug. Returns null if it doesn't exist (404).
export async function fetchLocationBySlug(slug) {
  const res = await fetch(`${BASE_URL}/${encodeURIComponent(slug)}`);
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error(`Failed to load location (HTTP ${res.status})`);
  }
  return res.json();
}

// Fetch all events held at one location, soonest first.
export async function fetchEventsByLocation(slug) {
  const res = await fetch(`${BASE_URL}/${encodeURIComponent(slug)}/events`);
  if (!res.ok) {
    throw new Error(`Failed to load events (HTTP ${res.status})`);
  }
  return res.json();
}
