// In Unit 2 this in-memory array will be replaced by a real database.
// For now it acts as our "database" of developer tools & resources.
// Every item shares the same set of attributes so the schema is consistent.

export const tools = [
  {
    slug: "vs-code",
    name: "Visual Studio Code",
    category: "Editor",
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
    category: "Version Control",
    price: "Free",
    platform: "Windows, macOS, Linux",
    image:
      "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png",
    link: "https://git-scm.com",
    description:
      "The distributed version-control system that powers modern software development. Track changes, branch fearlessly, and collaborate with teams of any size.",
  },
  {
    slug: "postman",
    name: "Postman",
    category: "API Testing",
    price: "Free / Paid",
    platform: "Windows, macOS, Linux, Web",
    image:
      "https://www.svgrepo.com/show/354202/postman-icon.svg",
    link: "https://www.postman.com",
    description:
      "An API platform for building and using APIs. Send requests, inspect responses, automate tests, and document your endpoints — all without writing a single line of client code.",
  },
  {
    slug: "figma",
    name: "Figma",
    category: "Design",
    price: "Free / Paid",
    platform: "macOS, Windows, Web",
    image:
      "https://www.svgrepo.com/show/452202/figma.svg",
    link: "https://www.figma.com",
    description:
      "A collaborative, browser-based interface design tool. Prototype, design, and hand off to developers in real time — a favorite for UI/UX work and design systems.",
  },
  {
    slug: "docker",
    name: "Docker",
    category: "DevOps",
    price: "Free / Paid",
    platform: "Windows, macOS, Linux",
    image:
      "https://www.svgrepo.com/show/452192/docker.svg",
    link: "https://www.docker.com",
    description:
      "Package applications and their dependencies into portable containers that run the same everywhere. Essential for reproducible environments and modern deployment workflows.",
  },
  {
    slug: "mdn-web-docs",
    name: "MDN Web Docs",
    category: "Reference",
    price: "Free",
    platform: "Web",
    image:
      "https://cdn.simpleicons.org/mdnwebdocs/white",
    link: "https://developer.mozilla.org",
    description:
      "The most trusted reference for web standards — HTML, CSS, JavaScript, and Web APIs. Clear explanations, examples, and browser-compatibility tables maintained by Mozilla.",
  },
  {
    slug: "node-js",
    name: "Node.js",
    category: "Runtime",
    price: "Free",
    platform: "Windows, macOS, Linux",
    image:
      "https://nodejs.org/static/images/logo.svg",
    link: "https://nodejs.org",
    description:
      "A JavaScript runtime built on Chrome's V8 engine that lets you run JS outside the browser. The foundation for servers, build tools, and command-line apps across the JavaScript ecosystem.",
  },
];

// Helper used by the routes to fetch a single item by its slug.
export function getToolBySlug(slug) {
  return tools.find((tool) => tool.slug === slug);
}
