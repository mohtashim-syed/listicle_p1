# WEB103 Project 1 - *Dev Tools & Resources*

Submitted by: Mohtashim Syed

About this web app: **A curated listicle of essential developer tools and resources. The home page displays each tool as a card with its logo, category, and description, and clicking any card opens a detail page showing all of its fields (price, platform, website, and more). Built with a Node.js + Express backend that serves server-rendered HTML, styled with Pico.css — no frontend framework.**

Time spent: **3** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->
- [x] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**
- [x] **The web app displays a title**
- [x] **The web app displays at least five unique list items, each with at least three displayed attributes (such as title, text, and image)**
- [x] **The user can click on each item in the list to see a detailed view of it, including all database fields**
  - [x] **Each detail view should be a unique endpoint, such as as `localhost:3000/bosses/crystalguardian` and `localhost:3000/mantislords`**
  - [ ] *Note: When showing this feature in the video walkthrough, please show the unique URL for each detailed view. We will not be able to give points if we cannot see the implementation* 
- [x] **The web app serves an appropriate 404 page when no matching route is defined**
- [x] **The web app is styled using Picocss**

The following **optional** features are implemented:

- [x] The web app displays items in a unique format, such as cards rather than lists or animated list items

The following **additional** features are implemented:

- [x] Cards have a hover lift/shadow animation for visual feedback
- [x] All data flows through a single `getToolBySlug()` helper and `tools` array, so the in-memory data can be swapped for a real database in Unit 2 without touching the routes
- [x] All dynamic values are HTML-escaped before rendering to prevent injection

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='demo.gif' title='Video Walkthrough' width='600' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF compressed with [gifsicle](https://www.lcdf.org/gifsicle/).
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

- **Rendering approach:** Instead of a templating engine, I render HTML with plain template-literal functions in `views.js` (a shared `layout()` plus `renderHome`, `renderDetail`, and `render404`). This keeps the project framework-free while staying organized.
- **Image hosting:** A couple of official logo URLs (VS Code, MDN) were unreliable or hotlink-blocked, so I switched to stable CDN sources (SVGRepo and simpleicons.org).
- **Data layer (Unit 2):** Pages are now rendered dynamically from a **PostgreSQL** database instead of a static array. Every request runs a live SQL query.

### Database design

A normalized two-table schema (`categories` ──< `tools`, one-to-many via a foreign key):

```
categories                 tools
----------                 -----
id    SERIAL PK            id          SERIAL PK
slug  VARCHAR UNIQUE       slug        VARCHAR UNIQUE
name  VARCHAR UNIQUE       name        VARCHAR
                           category_id INTEGER  → categories(id)  (FK)
                           price       VARCHAR
                           platform    VARCHAR
                           image       TEXT
                           link        TEXT
                           description TEXT
                           created_at  TIMESTAMPTZ DEFAULT now()
```

Each page joins `tools` to `categories` so the category name comes back with every tool. Adding or editing a tool is now a single SQL `INSERT`/`UPDATE` (or an edit to the seed data + `npm run db:reset`) — no code changes required.

### Project structure

```
config/database.js   # pg connection pool (reads .env; supports DATABASE_URL or PG* vars)
config/reset.js      # drops, recreates, and seeds the tables  → npm run db:reset
data/tools.js        # seed data (categories + tools)
data/queries.js      # all SQL the app runs (getAllTools, getToolBySlug)
views.js             # server-rendered HTML (layout, home, detail, 404, 500)
server.js            # Express routes (async, DB-backed)
```

### Running locally

```bash
# 1. Install Postgres (macOS): brew install postgresql@16 && brew services start postgresql@16
# 2. Create the database:      createdb listicle
# 3. Configure connection:     cp .env.example .env   (then edit values)
npm install
npm run db:reset   # create tables + seed data
npm start          # or: npm run dev  (auto-restarts on file changes)
```

Then open <http://localhost:3000>.

| Route              | Description                            |
| ------------------ | -------------------------------------- |
| `GET /`            | Home page — grid of all tools (DB query) |
| `GET /tools/:slug` | Detail page for one tool (DB query)    |
| `*`                | Custom 404 page                        |

## License

Copyright 2026 Mohtashim Syed

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.