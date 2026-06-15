// Detail page: read the slug from the URL (/tools/:slug), fetch that one tool
// from the API, and render all of its database fields.

import { fetchToolBySlug } from "./services/toolsAPI.js";

function esc(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// The URL looks like /tools/vs-code — grab the last path segment.
function getSlugFromUrl() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  return parts[parts.length - 1] || "";
}

function detailMarkup(tool) {
  return `
    <article class="detail">
      <div class="detail-grid">
        <img src="${esc(tool.image)}" alt="${esc(tool.name)} logo" class="detail-img" />
        <div>
          <span class="badge">${esc(tool.category)}</span>
          <h1>${esc(tool.name)}</h1>
          <p>${esc(tool.description)}</p>
          <a href="${esc(tool.link)}" role="button" target="_blank" rel="noopener noreferrer">Visit Website &nearr;</a>
        </div>
      </div>
      <table>
        <tbody>
          <tr><th scope="row">ID</th><td>${esc(tool.id)}</td></tr>
          <tr><th scope="row">Category</th><td>${esc(tool.category)}</td></tr>
          <tr><th scope="row">Price</th><td>${esc(tool.price)}</td></tr>
          <tr><th scope="row">Platform</th><td>${esc(tool.platform)}</td></tr>
          <tr><th scope="row">Website</th><td><a href="${esc(tool.link)}" target="_blank" rel="noopener noreferrer">${esc(tool.link)}</a></td></tr>
          <tr><th scope="row">Slug</th><td><code>${esc(tool.slug)}</code></td></tr>
          <tr><th scope="row">Added</th><td>${esc(formatDate(tool.created_at))}</td></tr>
        </tbody>
      </table>
    </article>`;
}

async function render() {
  const container = document.getElementById("detail");
  const slug = getSlugFromUrl();
  try {
    const tool = await fetchToolBySlug(slug);
    if (!tool) {
      // No tool with this slug — show not-found content in place.
      document.title = "404 — Not Found";
      container.innerHTML = `
        <article class="not-found">
          <hgroup>
            <h1>404 — Tool Not Found</h1>
            <p>There's no tool with the slug <code>${esc(slug)}</code>.</p>
          </hgroup>
          <a href="/" role="button">Return Home</a>
        </article>`;
      return;
    }
    document.title = `${tool.name} · Dev Tools`;
    container.innerHTML = detailMarkup(tool);
  } catch (err) {
    container.innerHTML = `<p>⚠️ Couldn't load this tool. ${esc(err.message)}</p>`;
  } finally {
    container.removeAttribute("aria-busy");
  }
}

render();
