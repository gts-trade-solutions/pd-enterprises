/** @type {import('next').MetadataRoute.Robots} */
export default function robots() {
  const base = 'https://www.pdenterprise.co.za';
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
