import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { defaultLang, languageList, localePath } from '../i18n/utils';

// 静态 sitemap：博客与案例路由自动从 content collections 读取，
// 新增一个 md 文件即自动进 sitemap，无需改这个文件。其余页面在下面的 routes 里维护。
// 多语言：非默认语言的首页 / 博客列表 / 已翻译文章也一并列入（语言清单来自 site.config.json）。
export const GET: APIRoute = async ({ site }) => {
  const base = (site ?? new URL('https://www.crosspals.com')).href.replace(/\/$/, '');
  const today = new Date().toISOString().slice(0, 10);

  const all = await getCollection('blog');
  const posts = all
    .filter(p => !p.data.draft && (!p.data.lang || p.data.lang === defaultLang))
    .sort((a, b) => b.data.date.localeCompare(a.data.date));
  const cases = (await getCollection('case-studies'))
    .filter(c => !c.data.draft)
    .sort((a, b) => a.data.order - b.data.order);

  // 非默认语言：首页 + 博客列表 + 已翻译的文章（slug 用各语言共用的基准名）
  const altLangs = languageList.filter(l => !l.isDefault);
  const altRoutes: { path: string; priority: string }[] = [];
  for (const l of altLangs) {
    altRoutes.push({ path: localePath(l.code, '/'), priority: '0.9' });
    const translated = all.filter(p => !p.data.draft && p.data.lang === l.code);
    if (translated.length) {
      altRoutes.push({ path: localePath(l.code, '/blog/'), priority: '0.7' });
      for (const p of translated) {
        const slug = p.data.translationKey || p.slug.replace(new RegExp(`-${l.code}$`), '');
        altRoutes.push({ path: localePath(l.code, `/blog/${slug}/`), priority: '0.6' });
      }
    }
  }

  const routes = [
    { path: '/',                          priority: '1.0' },
    { path: '/services/',                 priority: '0.9' },
    { path: '/about/',                    priority: '0.7' },
    { path: '/case-studies/',             priority: '0.8' },
    { path: '/contact/',                  priority: '0.9' },
    { path: '/blog/',                     priority: '0.8' },
    ...posts.map(p => ({ path: `/blog/${p.slug}/`,            priority: '0.7' })),
    ...cases.map(c => ({ path: `/case-studies/${c.slug}/`,    priority: '0.7' })),
    ...altRoutes,
    { path: '/privacy/',                  priority: '0.3' },
    { path: '/terms/',                    priority: '0.3' },
  ];

  const urls = routes
    .map(r => `  <url>\n    <loc>${base}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${r.priority}</priority>\n  </url>`)
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  );
};
