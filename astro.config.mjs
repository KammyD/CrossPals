import { defineConfig } from 'astro/config';

// 单语言站点（英语）。西语已于 2026-09-23 移除：
// 删掉了 i18n 块里的 'es' 与 src/pages/es、src/content/*-es、src/i18n/es.ts。
// 将来要恢复多语言，把 i18n 块连同页面目录一起加回来即可（原版在 git 历史里）。
export default defineConfig({
  site: 'https://www.crosspals.com',
  server:{port:9300,},
  output: 'static',
});
