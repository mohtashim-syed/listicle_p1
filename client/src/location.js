// Location detail page: read the slug from the URL (/locations/:slug), fetch
// that location and all of its events, and render them. Events are split into
// upcoming and past relative to now.

import {
  fetchLocationBySlug,
  fetchEventsByLocation,
} from "./services/locationsAPI.js";

function esc(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// "Saturday, July 18, 2026 · 9:00 AM"
function formatDateTime(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

// The URL looks like /locations/tech-hub-downtown — grab the last segment.
function getSlugFromUrl() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  return parts[parts.length - 1] || "";
}

function eventRow(event, isPast) {
  return `
    <article class="event-card${isPast ? " is-past" : ""}">
      <div class="event-when">
        <span class="event-badge ${isPast ? "past" : "upcoming"}">${isPast ? "Past" : "Upcoming"}</span>
        <time datetime="${esc(event.starts_at)}">${esc(formatDateTime(event.starts_at))}</time>
      </div>
      <div class="event-info">
        <h3>${esc(event.title)}</h3>
        ${event.host ? `<p class="event-host">Hosted by ${esc(event.host)}</p>` : ""}
        <p>${esc(event.description)}</p>
      </div>
    </article>`;
}

function detailMarkup(location, events, now) {
  const upcoming = events.filter((e) => new Date(e.starts_at) >= now);
  const past = events.filter((e) => new Date(e.starts_at) < now);

  const section = (title, list, isPast) =>
    list.length
      ? `<h2 class="events-heading">${title}</h2>
         <div class="event-list">${list.map((e) => eventRow(e, isPast)).join("")}</div>`
      : "";

  const eventsHtml =
    events.length === 0
      ? `<p class="empty">No events scheduled here yet — check back soon!</p>`
      : section("Upcoming events", upcoming, false) +
        section("Past events", past, true);

  return `
    <article class="location-detail">
      <div class="location-hero">
        <img src="${esc(location.image)}" alt="${esc(location.name)}" class="location-hero-img" />
        <div>
          <span class="badge">${esc(location.neighborhood)}</span>
          <h1>${esc(location.name)}</h1>
          <p>${esc(location.description)}</p>
        </div>
      </div>
      <section class="events">${eventsHtml}</section>
    </article>`;
}

async function render() {
  const container = document.getElementById("location-detail");
  const slug = getSlugFromUrl();
  try {
    const location = await fetchLocationBySlug(slug);
    if (!location) {
      document.title = "404 — Location Not Found";
      container.innerHTML = `
        <article class="not-found">
          <hgroup>
            <h1>404 — Location Not Found</h1>
            <p>There's no location with the slug <code>${esc(slug)}</code>.</p>
          </hgroup>
          <a href="/community" role="button">Back to Community</a>
        </article>`;
      return;
    }

    const events = await fetchEventsByLocation(slug);
    document.title = `${location.name} · Dev Community`;
    // Compute "now" once so upcoming/past splits are consistent.
    container.innerHTML = detailMarkup(location, events, new Date());
  } catch (err) {
    container.innerHTML = `<p>⚠️ Couldn't load this location. ${esc(err.message)}</p>`;
  } finally {
    container.removeAttribute("aria-busy");
  }
}

render();
