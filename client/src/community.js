// Community landing page: fetch all locations and render them as a visual
// grid of image cards. Each card links to that location's detail page.

import { fetchLocations } from "./services/locationsAPI.js";

function esc(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const grid = document.getElementById("location-grid");
const errorMsg = document.getElementById("locations-error");

function locationCard(location) {
  const count = location.event_count;
  const countLabel = count === 1 ? "1 event" : `${count} events`;
  return `
    <a href="/locations/${esc(location.slug)}" class="location-card">
      <img src="${esc(location.image)}" alt="${esc(location.name)}" class="location-img" loading="lazy" />
      <div class="location-body">
        <span class="badge">${esc(location.neighborhood)}</span>
        <h3>${esc(location.name)}</h3>
        <p>${esc(location.description)}</p>
        <span class="event-count">📅 ${esc(countLabel)}</span>
      </div>
    </a>`;
}

async function load() {
  try {
    const locations = await fetchLocations();
    grid.innerHTML = locations.map(locationCard).join("");
  } catch (err) {
    errorMsg.textContent = `⚠️ Couldn't load locations. ${err.message}`;
    errorMsg.hidden = false;
  } finally {
    grid.removeAttribute("aria-busy");
  }
}

load();
