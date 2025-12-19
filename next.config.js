/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  images: { unoptimized: true },     // <-- key fix for static /out
  // optional but recommended if you use trailing slashes in links
  // trailingSlash: true,
};
module.exports = nextConfig;
