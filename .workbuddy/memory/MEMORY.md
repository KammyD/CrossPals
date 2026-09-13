# CrossPals 采购代理网站 (Astro v4)

## 架构速查
- **框架**：Astro 4.16，纯静态站（`output: 'static'`），唯一依赖 `astro`。部署 Cloudflare Pages（`wrangler.toml` → 输出 `dist`）。
- **设计系统（v5，2026-09 重做）**：反 AI 设计方向 "Trans-Pacific Ledger"（seed 推导，不对外暴露）。色板：深森林绿(avo)+象牙白/羊皮纸 + **印章朱红 `--seal #be3a2e` 作唯一强调**；字体 Fraunces(刊头衬线,带 opsz)/Instrument Sans(正文)/DM Mono(标签/数据)；**锐角为主**（`--r1:0 --r3:0`），圆角基本清零；发丝线+刊边批注(sidenote)替代卡片分隔。新原语：`.ticker`跑马灯、`.seal`印章、`.indexnum`大号索引数字、`.ledger`账本竖线、`.reveal-up/left/right`方向性揭示。全部 CSS 变量定义在 `src/styles/global.css`。scroll-reveal 用 IntersectionObserver（`BaseLayout.astro`，已覆盖新增 reveal 类）。
- **页面**：`index` / `services` / `about` / `contact` / `blog`(index + `[slug]`)。`es/` 下是 index/services/about/contact 的独立西语镜像（**重复文件，非组件复用**，改英文需同步西语）。
- **组件**：`BaseLayout`（OG meta + scroll reveal）、`Header`（透明→毛玻璃、语言下拉、移动抽屉）、`Footer`、`PageHero`、`ContactForm`（web3forms）、`Logo`、`Icon`（17 个原创 SVG）、`ImgPlaceholder`（picsum 占位图 + `hint` 注释）。
- **i18n**：仅 `en`/`es`（`astro.config` locales + `i18n/utils.ts`）。翻译键集中 `en.ts`/`es.ts`。
- **博客**：6 篇英文文章**硬编码**在 `blog/[slug].astro` 的 `getStaticPaths`（正文内联 HTML），无 content collection，加文章要改代码。

## 上线前必改（待办 / 风险）
- `ContactForm.astro` 的 web3forms `access_key` 仍是占位 `YOUR_WEB3FORMS_KEY` → 表单无法真正提交。
- 全站 WhatsApp 链接 `wa.me/yourwhatsapp` 占位 → 需真实号。
- `Logo.astro` 已改为**文字 wordmark + SVG 方章标记**（Fraunces `Cross`+`Pals`，朱红方章），不再引用缺失 png。如需真实图片 logo 再替换。favicon 仍待补。
- 全站图片用 `picsum.photos` 占位（`ImgPlaceholder` 的 `hint` 标注了每处该放什么图）。
- `Footer` 法律链接 `/privacy` `/terms` 页面不存在（404）。
- `Header` 语言下拉列出 en/es/fr/ar/pt，但 fr/ar/pt 无页面（点击 404）；es 下也无 blog。
- `Footer` 社交 LinkedIn/Instagram 指向 `#`。
- **域名不一致**：`astro.config` 的 `site = crosspals.com`；项目历史提及 web-crosspals.com / www.CrossPals.com，需确认最终域名（影响 canonical/部署）。

## 注意
- 版本号不一致：`package.json` 写 `v4.0.0`，`README` 写 "v3"。
- 编辑入口：`npm run dev`（端口 9300，astro.config 改了）、`npm run build` → `dist`。
