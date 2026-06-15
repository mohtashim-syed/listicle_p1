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

- **Architecture:** The app is split into a `client/` frontend and a `server/` backend. The backend is an Express server that exposes a **JSON API** and queries a **Render-hosted PostgreSQL** database; the frontend is plain HTML/CSS/JS that `fetch`es from that API and renders the page in the browser — no frontend framework.
- **Image hosting:** A couple of official logo URLs (VS Code, MDN) were unreliable or hotlink-blocked, so I switched to stable CDN sources (SVGRepo and simpleicons.org).
- **Why a JSON API:** Separating data (API) from presentation (client) keeps the frontend framework-free while making the data reusable; the detail page just fetches `/api/tools/:slug`.

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

Each query joins `tools` to `categories` so the category name comes back with every tool. Adding or editing a tool is now a single SQL `INSERT`/`UPDATE` (or an edit to the seed data + `npm run db:reset`) — no code changes required.

### Project structure

```
client/                       # FRONTEND — vanilla HTML/CSS/JS, no framework
  index.html                  #   home page shell
  detail.html                 #   detail page shell (one per tool via /tools/:slug)
  404.html                    #   not-found page
  src/
    assets/favicon.svg        #   images / assets
    css/style.css             #   styles (layered on Pico.css)
    services/toolsAPI.js      #   fetches data from the backend API
    index.js                  #   renders the home grid
    detail.js                 #   renders a single tool

server/                       # BACKEND — Express + Postgres
  server.js                   #   sets up the server, static files, routes
  config/
    database.js               #   pg pool (Render DATABASE_URL + SSL, or local PG*)
    data.js                   #   seed data (categories + tools)
    reset.js                  #   drops/creates/seeds tables → npm run db:reset
  routes/
    toolsRouter.js            #   JSON API: GET /api/tools, GET /api/tools/:slug
```

### Connecting to Render PostgreSQL

1. In the [Render dashboard](https://dashboard.render.com): **New + → PostgreSQL**, pick the Free tier, **Create Database**, wait for **Available**.
2. Copy the **External Database URL** from the database's **Connections** section.
3. In `.env`, set `DATABASE_URL=<that URL>` and `PGSSL=true` (Render requires SSL).

### Running locally

```bash
cp .env.example .env   # then paste your Render DATABASE_URL + set PGSSL=true
npm install
npm run db:reset       # create tables + seed data on Render
npm start              # or: npm run dev  (auto-restarts on file changes)
```

Then open <http://localhost:3000>.

| Endpoint                | Description                                       |
| ----------------------- | ------------------------------------------------- |
| `GET /`                 | Home page (HTML shell; JS fetches the list)       |
| `GET /tools/:slug`      | Detail page (HTML shell; JS fetches the tool)     |
| `GET /api/tools`        | JSON — all tools (queries Render Postgres)        |
| `GET /api/tools/:slug`  | JSON — one tool, or 404                            |
| `*`                     | Custom 404 page                                   |

## License

Copyright 2026 Mohtashim Syed

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.