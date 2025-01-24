const fs = require("fs");
const { create } = require("xmlbuilder2");

const urls = [
  {
    loc: "https://feliztoursegypt.savvyhost.site",
    lastmod: "2025-01-17",
    priority: 1.0,
  },
  {
    loc: "https://feliztoursegypt.savvyhost.site/wishlist",
    lastmod: "2025-01-17",
    priority: 0.8,
  },
  {
    loc: "https://feliztoursegypt.savvyhost.site/about",
    lastmod: "2025-01-17",
    priority: 0.7,
  },
  {
    loc: "https://feliztoursegypt.savvyhost.site/privacy",
    lastmod: "2025-01-17",
    priority: 0.6,
  },
  {
    loc: "https://feliztoursegypt.savvyhost.site/faq",
    lastmod: "2025-01-17",
    priority: 0.5,
  },
  {
    loc: "https://feliztoursegypt.savvyhost.site/inquire",
    lastmod: "2025-01-17",
    priority: 0.4,
  },
  {
    loc: "https://feliztoursegypt.savvyhost.site/privacy",
    lastmod: "2025-01-17",
    priority: 0.4,
  },
  {
    loc: "https://feliztoursegypt.savvyhost.site/terms",
    lastmod: "2025-01-17",
    priority: 0.4,
  },
  {
    loc: "https://feliztoursegypt.savvyhost.site/contact",
    lastmod: "2025-01-17",
    priority: 0.4,
  },
  {
    loc: "https://feliztoursegypt.savvyhost.site/blogs",
    lastmod: "2025-01-17",
    priority: 0.3,
  },
  {
    loc: "https://feliztoursegypt.savvyhost.site/nile-cruises",
    lastmod: "2025-01-17",
    priority: 0.4,
  },
  {
    loc: "https://feliztoursegypt.savvyhost.site/top-excursions",
    lastmod: "2025-01-17",
    priority: 0.2,
  },
  {
    loc: "https://feliztoursegypt.savvyhost.site/top-packages",
    lastmod: "2025-01-17",
    priority: 0.1,
  },
];

const root = create({ version: "1.0", encoding: "UTF-8" }).ele("urlset", {
  xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
});

urls.forEach(({ loc, lastmod, priority }) => {
  const urlElement = root.ele("url");
  urlElement.ele("loc").txt(loc);
  urlElement.ele("lastmod").txt(lastmod);
  urlElement.ele("priority").txt(priority);
});

const xml = root.end({ prettyPrint: true });

fs.writeFileSync("public/sitemap.xml", xml);
