/** @type {import('next').MetadataRoute.Sitemap} */
export default function sitemap() {
  const base = 'https://www.pdenterprise.co.za';
  const pages = [
    '/',
    '/about',
    '/services',
    '/contact',
    '/avrame',
    '/avrame-details',
  ];
  const now = new Date();

  return pages.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: p === '/' ? 'weekly' : 'monthly',
    priority: p === '/' ? 1 : 0.7,
  }));
}
