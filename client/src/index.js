// Home page: fetch all tools, render them as cards, and wire up
// search (filter), add (create), and delete.

import { fetchTools, createTool, deleteTool } from "./services/toolsAPI.js";

// Escape values before inserting into HTML to avoid breaking markup / XSS.
function esc(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Module state: the full list, kept so search can filter without re-fetching.
let allTools = [];

const grid = document.getElementById("tool-grid");
const searchInput = document.getElementById("search");
const emptyMsg = document.getElementById("empty-msg");
const addForm = document.getElementById("add-form");
const formError = document.getElementById("form-error");
const categoryOptions = document.getElementById("category-options");

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
      <footer class="card-footer">
        <button class="delete-btn outline secondary" data-slug="${esc(tool.slug)}" data-name="${esc(tool.name)}">
          🗑 Delete
        </button>
      </footer>
    </article>`;
}

// Render the cards that match the current search term.
function renderList() {
  const term = searchInput.value.trim().toLowerCase();
  const matches = term
    ? allTools.filter((t) =>
        [t.name, t.category, t.description, t.platform]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(term))
      )
    : allTools;

  grid.innerHTML = matches.map(toolCard).join("");
  emptyMsg.hidden = matches.length > 0;
}

// Fill the category autocomplete from the categories already in use.
function refreshCategoryOptions() {
  const names = [...new Set(allTools.map((t) => t.category))].sort();
  categoryOptions.innerHTML = names
    .map((name) => `<option value="${esc(name)}"></option>`)
    .join("");
}

// Load everything from the API and render.
async function load() {
  try {
    allTools = await fetchTools();
    refreshCategoryOptions();
    renderList();
  } catch (err) {
    grid.innerHTML = `<p>⚠️ Couldn't load tools. ${esc(err.message)}</p>`;
  } finally {
    grid.removeAttribute("aria-busy");
  }
}

// --- Events ---

// Search: filter live as the user types.
searchInput.addEventListener("input", renderList);

// Add: submit the form, then refresh the list.
addForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  formError.hidden = true;

  const data = Object.fromEntries(new FormData(addForm).entries());
  const submitBtn = addForm.querySelector("button[type=submit]");
  submitBtn.setAttribute("aria-busy", "true");

  try {
    const created = await createTool(data);
    allTools.push(created);
    refreshCategoryOptions();
    addForm.reset();
    addForm.closest("details").open = false;
    searchInput.value = "";
    renderList();
  } catch (err) {
    formError.textContent = `⚠️ ${err.message}`;
    formError.hidden = false;
  } finally {
    submitBtn.removeAttribute("aria-busy");
  }
});

// Delete: event delegation on the grid (cards are re-rendered often).
grid.addEventListener("click", async (event) => {
  const btn = event.target.closest(".delete-btn");
  if (!btn) return;

  const { slug, name } = btn.dataset;
  if (!confirm(`Delete "${name}"? This can't be undone.`)) return;

  btn.setAttribute("aria-busy", "true");
  try {
    await deleteTool(slug);
    allTools = allTools.filter((t) => t.slug !== slug);
    refreshCategoryOptions();
    renderList();
  } catch (err) {
    alert(`Couldn't delete: ${err.message}`);
    btn.removeAttribute("aria-busy");
  }
});

load();
