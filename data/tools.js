// Seed data used by config/reset.js to populate the database.
// This is NOT queried at runtime anymore — the app reads from Postgres.
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
