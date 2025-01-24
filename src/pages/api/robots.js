// /pages/api/robots.ts

const SITE_URL = "https://www.feliztoursegypt.com";
export default function handler(req, res) {
  const robots = `
  User-agent: *
  Disallow: 
  Sitemap: ${SITE_URL}/sitemap.xml
  `;

  res.send(robots);
}
