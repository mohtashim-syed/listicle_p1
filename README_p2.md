# WEB103 Project 2 - *Dev Tools & Resources*

Submitted by: **Mohtashim Syed**

About this web app: **A curated listicle of essential developer tools and resources. The data lives in a PostgreSQL database hosted on Render and is served through an Express JSON API; the vanilla HTML/CSS/JS frontend fetches from that API and renders the list and per-tool detail pages. Users can search the list live, add new tools, and delete existing ones — all without a frontend framework.**

Time spent: **4** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->
- [x] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured database table for the list items**
  - [ ] **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [ ]  **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**


The following **optional** features are implemented:

- [x] The user can search for items by a specific attribute
  - The home page search box filters the list live by name, category, description, or platform.

The following **additional** features are implemented:

- [x] **Add** new tools through a UI form (`POST /api/tools`) — slug auto-generated, category matched or created
- [x] **Delete** tools from each card and the detail page (`DELETE /api/tools/:slug`) with a confirmation prompt
- [x] Normalized two-table schema (`categories` ──< `tools`) joined on every query, rather than a single flat table
- [x] Separated `client/` (frontend) and `server/` (backend) folders, with a dedicated JSON API and a `services/` data layer on the client
- [x] Each tool has its own detail page at a unique URL (`/tools/:slug`) showing all database fields
- [x] Custom 404 page for unmatched routes

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  GIF tool here
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

**Architecture.** The project is split into a `client/` frontend (vanilla HTML/CSS/JS — no framework) and a `server/` backend (Express + `pg`). The backend exposes a JSON API and queries a Render-hosted PostgreSQL database; the frontend `fetch`es from that API and renders pages in the browser.

**Database design.** A normalized two-table schema joined on every query:

```
categories                 tools
----------                 -----
id    SERIAL PK            id          SERIAL PK
slug  VARCHAR UNIQUE       slug        VARCHAR UNIQUE
name  VARCHAR UNIQUE       name        VARCHAR
                           category_id INTEGER → categories(id)  (FK)
                           price, platform, image, link, description
                           created_at  TIMESTAMPTZ DEFAULT now()
```

**Connecting to Render.** The connection string (Render's *External Database URL*) and `PGSSL=true` live in a gitignored `.env`; `server/config/database.js` reads it and falls back to local `PG*` vars for development. Run `npm run db:reset` to create and seed the tables on Render.

**Challenges.**
- A few official logo URLs were hotlink-blocked, so I switched to stable CDN sources (SVGRepo / simpleicons.org).
- Render requires SSL on external connections, which the pool config handles via `PGSSL`.
- Keeping the frontend framework-free while supporting add/delete meant building a small `services/toolsAPI.js` fetch layer and rendering with template strings + an HTML-escape helper.

**For the walkthrough**, the two required NOTE items above are demonstrated by:
- showing the Render dashboard with the database **Available**, and
- running `psql <External Database URL> -c "SELECT * FROM tools;"` to display the table contents.

## License

Copyright 2026 Mohtashim Syed

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.