// Home page: fetch all tools from the API and render them as cards.

import { fetchTools } from "./services/toolsAPI.js";

// Escape values before inserting into HTML to avoid breaking markup / XSS.
function esc(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function toolCard(tool) {
  return `
    <article class="tool-card">
      <a href="/tools/${esc(tool.slug)}" class="card-link">
        <img src="${esc(tool.image)}" alt="${esc(tool.name)} logo" class="card-img" loading="lazy" />
        <div class="card-body">
          <span class="badge">${esc(tool.category)}</span>
          <h3>${esc(tool.name)}</h3>
          <p>${esc(tool.description)}</p>
        </div>
      </a>
    </article>`;
}

async function render() {
  const grid = document.getElementById("tool-grid");
  try {
    const tools = await fetchTools();
    grid.innerHTML = tools.map(toolCard).join("");
  } catch (err) {
    grid.innerHTML = `<p>⚠️ Couldn't load tools. ${esc(err.message)}</p>`;
  } finally {
    grid.removeAttribute("aria-busy");
  }
}

render();
