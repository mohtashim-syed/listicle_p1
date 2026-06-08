// Server-side HTML rendering using template literals.
// No frontend framework — just plain strings styled with Pico.css.

// Escape user/data values so they render safely as text.
function esc(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Shared page shell: <head>, nav, and footer wrap every page.
function layout({ title, body }) {
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
  />
  <link rel="stylesheet" href="/css/custom.css" />
</head>
<body>
  <header class="container">
    <nav>
      <ul>
        <li><a href="/" class="brand"><strong>🛠️ Dev Tools &amp; Resources</strong></a></li>
      </ul>
      <ul>
        <li><a href="/">Home</a></li>
      </ul>
    </nav>
  </header>
  <main class="container">
${body}
  </main>
  <footer class="container">
    <small>Built with Express &amp; Pico.css · A curated list of tools every developer should know.</small>
  </footer>
</body>
</html>`;
}

// A single card for the home page grid.
function toolCard(tool) {
  return `      <article class="tool-card">
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

// Home page: title + grid of all tools.
export function renderHome(tools) {
  const cards = tools.map(toolCard).join("\n");
  const body = `    <hgroup>
      <h1>Developer Tools &amp; Resources</h1>
      <p>A hand-picked collection of ${tools.length} tools every developer should have in their kit. Click any card for full details.</p>
    </hgroup>
    <section class="tool-grid">
${cards}
    </section>`;
  return layout({ title: "Dev Tools & Resources", body });
}

// Detail page: shows every field for one tool.
export function renderDetail(tool) {
  const body = `    <p><a href="/">&larr; Back to all tools</a></p>
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
          <tr><th scope="row">Category</th><td>${esc(tool.category)}</td></tr>
          <tr><th scope="row">Price</th><td>${esc(tool.price)}</td></tr>
          <tr><th scope="row">Platform</th><td>${esc(tool.platform)}</td></tr>
          <tr><th scope="row">Website</th><td><a href="${esc(tool.link)}" target="_blank" rel="noopener noreferrer">${esc(tool.link)}</a></td></tr>
          <tr><th scope="row">Slug</th><td><code>${esc(tool.slug)}</code></td></tr>
        </tbody>
      </table>
    </article>`;
  return layout({ title: `${tool.name} · Dev Tools`, body });
}

// 404 page served for any unmatched route.
export function render404() {
  const body = `    <article class="not-found">
      <hgroup>
        <h1>404 — Page Not Found</h1>
        <p>We couldn't find that tool or page. It may have been moved or never existed.</p>
      </hgroup>
      <a href="/" role="button">Return Home</a>
    </article>`;
  return layout({ title: "404 — Not Found", body });
}
