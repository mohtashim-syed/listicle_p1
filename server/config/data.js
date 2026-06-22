// Seed data used by reset.js to populate the database.
// This is NOT queried at runtime — the app reads from Postgres (Render).
// Categories are normalized into their own table; each tool references one
// by its category slug.

export const categories = [
  { slug: "editor", name: "Editor" },
  { slug: "version-control", name: "Version Control" },
  { slug: "api-testing", name: "API Testing" },
  { slug: "design", name: "Design" },
  { slug: "devops", name: "DevOps" },
  { slug: "reference", name: "Reference" },
  { slug: "runtime", name: "Runtime" },
];

export const tools = [
  {
    slug: "vs-code",
    name: "Visual Studio Code",
    category_slug: "editor",
    price: "Free",
    platform: "Windows, macOS, Linux",
    image: "https://www.svgrepo.com/show/452129/vs-code.svg",
    link: "https://code.visualstudio.com",
    description:
      "A lightweight but powerful source-code editor with built-in Git support, debugging, and a massive extension marketplace. The de facto standard editor for web and full-stack development.",
  },
  {
    slug: "git",
    name: "Git",
    category_slug: "version-control",
    price: "Free",
    platform: "Windows, macOS, Linux",
    image: "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png",
    link: "https://git-scm.com",
    description:
      "The distributed version-control system that powers modern software development. Track changes, branch fearlessly, and collaborate with teams of any size.",
  },
  {
    slug: "postman",
    name: "Postman",
    category_slug: "api-testing",
    price: "Free / Paid",
    platform: "Windows, macOS, Linux, Web",
    image: "https://www.svgrepo.com/show/354202/postman-icon.svg",
    link: "https://www.postman.com",
    description:
      "An API platform for building and using APIs. Send requests, inspect responses, automate tests, and document your endpoints — all without writing a single line of client code.",
  },
  {
    slug: "figma",
    name: "Figma",
    category_slug: "design",
    price: "Free / Paid",
    platform: "macOS, Windows, Web",
    image: "https://www.svgrepo.com/show/452202/figma.svg",
    link: "https://www.figma.com",
    description:
      "A collaborative, browser-based interface design tool. Prototype, design, and hand off to developers in real time — a favorite for UI/UX work and design systems.",
  },
  {
    slug: "docker",
    name: "Docker",
    category_slug: "devops",
    price: "Free / Paid",
    platform: "Windows, macOS, Linux",
    image: "https://www.svgrepo.com/show/452192/docker.svg",
    link: "https://www.docker.com",
    description:
      "Package applications and their dependencies into portable containers that run the same everywhere. Essential for reproducible environments and modern deployment workflows.",
  },
  {
    slug: "mdn-web-docs",
    name: "MDN Web Docs",
    category_slug: "reference",
    price: "Free",
    platform: "Web",
    image: "https://cdn.simpleicons.org/mdnwebdocs/white",
    link: "https://developer.mozilla.org",
    description:
      "The most trusted reference for web standards — HTML, CSS, JavaScript, and Web APIs. Clear explanations, examples, and browser-compatibility tables maintained by Mozilla.",
  },
  {
    slug: "node-js",
    name: "Node.js",
    category_slug: "runtime",
    price: "Free",
    platform: "Windows, macOS, Linux",
    image: "https://nodejs.org/static/images/logo.svg",
    link: "https://nodejs.org",
    description:
      "A JavaScript runtime built on Chrome's V8 engine that lets you run JS outside the browser. The foundation for servers, build tools, and command-line apps across the JavaScript ecosystem.",
  },
];

// ---------------------------------------------------------------------------
// "Dev Community" feature — the events-by-location tab.
//   locations (1) ──< (many) events
// Each event happens at exactly one location (events.location_id).
// ---------------------------------------------------------------------------

export const locations = [
  {
    slug: "tech-hub-downtown",
    name: "Tech Hub Downtown",
    neighborhood: "City Center",
    image: "https://picsum.photos/seed/techhub/800/500",
    description:
      "A buzzing four-story innovation center in the heart of downtown, home to startups, an auditorium, and the city's largest free coworking floor.",
  },
  {
    slug: "riverside-coworking",
    name: "Riverside Coworking",
    neighborhood: "Harbor District",
    image: "https://picsum.photos/seed/riverside/800/500",
    description:
      "A light-filled coworking loft overlooking the river. Quiet desks by day, demo nights and lightning talks after dark.",
  },
  {
    slug: "university-innovation-lab",
    name: "University Innovation Lab",
    neighborhood: "Campus North",
    image: "https://picsum.photos/seed/innovationlab/800/500",
    description:
      "The university's open lab where students and locals mix — robotics benches, a 3D-print farm, and weekly research showcases.",
  },
  {
    slug: "maker-space-north",
    name: "Maker Space North",
    neighborhood: "Warehouse Row",
    image: "https://picsum.photos/seed/makerspace/800/500",
    description:
      "A converted warehouse packed with laser cutters, soldering stations, and a community electronics workshop open to all skill levels.",
  },
  {
    slug: "the-code-cafe",
    name: "The Code Café",
    neighborhood: "Old Town",
    image: "https://picsum.photos/seed/codecafe/800/500",
    description:
      "Part coffee bar, part classroom. Cozy corners, strong espresso, and a back room that hosts beginner-friendly coding meetups.",
  },
];

// Events reference their location by slug (resolved to location_id on seed).
// Dates straddle "today" (2026-06-21) so the UI has both past and upcoming.
export const events = [
  // Tech Hub Downtown
  {
    location_slug: "tech-hub-downtown",
    title: "City Hackathon 2026",
    starts_at: "2026-07-18T09:00:00-07:00",
    host: "Downtown Founders Collective",
    description:
      "A 24-hour hackathon with mentors, free meals, and prizes for the best civic-tech build. Teams of up to four.",
  },
  {
    location_slug: "tech-hub-downtown",
    title: "Intro to TypeScript Workshop",
    starts_at: "2026-08-05T18:30:00-07:00",
    host: "Frontend Guild",
    description: "Hands-on evening session moving a JavaScript app to TypeScript, one type at a time.",
  },
  {
    location_slug: "tech-hub-downtown",
    title: "Spring Startup Showcase",
    starts_at: "2026-03-12T17:00:00-07:00",
    host: "Tech Hub Downtown",
    description: "Twelve local startups pitched to investors and the community. Recordings available.",
  },
  // Riverside Coworking
  {
    location_slug: "riverside-coworking",
    title: "Friday Demo Night",
    starts_at: "2026-06-26T19:00:00-07:00",
    host: "Riverside Makers",
    description: "Five-minute show-and-tell of whatever you built this week. Pizza provided.",
  },
  {
    location_slug: "riverside-coworking",
    title: "Women Who Code Meetup",
    starts_at: "2026-07-09T18:00:00-07:00",
    host: "WWCode Harbor",
    description: "Networking and a fireside chat with senior engineers from local product teams.",
  },
  {
    location_slug: "riverside-coworking",
    title: "Open Source Contribution Day",
    starts_at: "2026-02-21T10:00:00-08:00",
    host: "Riverside Coworking",
    description: "A full day pairing newcomers with maintainers to land their first pull request.",
  },
  // University Innovation Lab
  {
    location_slug: "university-innovation-lab",
    title: "Robotics Open House",
    starts_at: "2026-09-14T13:00:00-07:00",
    host: "Robotics Society",
    description: "Tour the lab, drive the bots, and see senior capstone projects in action.",
  },
  {
    location_slug: "university-innovation-lab",
    title: "AI Research Showcase",
    starts_at: "2026-05-30T15:00:00-07:00",
    host: "Innovation Lab",
    description: "Graduate students present posters on this term's machine-learning research.",
  },
  // Maker Space North
  {
    location_slug: "maker-space-north",
    title: "Soldering 101",
    starts_at: "2026-07-02T18:00:00-07:00",
    host: "Maker Space North",
    description: "Build a blinking LED badge from scratch. All tools and parts included.",
  },
  {
    location_slug: "maker-space-north",
    title: "Laser-Cut Coasters Workshop",
    starts_at: "2026-08-16T11:00:00-07:00",
    host: "Maker Space North",
    description: "Design in the browser, cut on the laser, take home a set of custom coasters.",
  },
  {
    location_slug: "maker-space-north",
    title: "Winter Repair Café",
    starts_at: "2026-01-25T12:00:00-08:00",
    host: "Fixers Collective",
    description: "Bring broken electronics and small appliances — volunteers help you fix them for free.",
  },
  // The Code Café
  {
    location_slug: "the-code-cafe",
    title: "Beginner Python Mornings",
    starts_at: "2026-06-28T09:30:00-07:00",
    host: "The Code Café",
    description: "A relaxed weekend intro to Python over coffee. No experience required.",
  },
  {
    location_slug: "the-code-cafe",
    title: "CSS Layout Clinic",
    starts_at: "2026-07-22T18:00:00-07:00",
    host: "Frontend Guild",
    description: "Bring a layout that's fighting you — we'll debug flexbox and grid together.",
  },
  {
    location_slug: "the-code-cafe",
    title: "New Year Code & Coffee",
    starts_at: "2026-01-10T10:00:00-08:00",
    host: "The Code Café",
    description: "Kicked off the year with casual pairing, resolutions, and a lot of espresso.",
  },
];
