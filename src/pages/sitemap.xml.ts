import type { APIRoute } from 'astro';

// 静态 sitemap：新增页面时把路由补进 routes 即可
const routes = [
  { path: '/',                          priority: '1.0' },
  { path: '/services/',                 priority: '0.9' },
  { path: '/about/',                    priority: '0.7' },
  { path: '/contact/',                  priority: '0.9' },
  { path: '/blog/',                     priority: '0.8' },
  { path: '/blog/find-suppliers-1688/', priority: '0.7' },
  { path: '/blog/air-vs-sea-freight/',  priority: '0.6' },
  { path: '/blog/cheap-china-products/',priority: '0.6' },
  { path: '/blog/avoid-alibaba-scams/', priority: '0.6' },
  { path: '/blog/custom-packaging-guide/', priority: '0.6' },
  { path: '/blog/payment-methods-suppliers/', priority: '0.6' },
  { path: '/privacy/',                  priority: '0.3' },
  { path: '/terms/',                    priority: '0.3' },
  { path: '/es/',                       priority: '0.9' },
  { path: '/es/services/',              priority: '0.8' },
  { path: '/es/about/',                 priority: '0.6' },
  { path: '/es/contact/',               priority: '0.8' },
  { path: '/es/blog/',                  priority: '0.6' },
  { path: '/es/privacy/',               priority: '0.3' },
  { path: '/es/terms/',                 priority: '0.3' },
];

export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL('https://crosspals.com')).href.replace(/\/$/, '');
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map(r => `  <url>\n    <loc>${base}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${r.priority}</priority>\n  </url>`)
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  );
};
