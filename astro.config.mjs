import { defineConfig } from 'astro/config';

// 多语言站（2026-09-24 恢复）：语言清单唯一事实源 = site.config.json → site.locales
// （CMS「品牌与站点信息 → 多语言」卡片维护），站点侧 src/i18n/utils.ts 构建时读它。
// 默认语言挂根路径，其余语言用子目录前缀（/ja/…）。加语言不用改这里，改 CMS 后台即可。
export default defineConfig({
  site: 'https://www.crosspals.com',
  server:{port:9300,},
  output: 'static',
});
