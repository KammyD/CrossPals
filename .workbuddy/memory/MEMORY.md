# CrossPals 采购代理网站 (Astro v4)

## 架构速查
- **框架**：Astro 4.16，纯静态站（`output: 'static'`），唯一依赖 `astro`。部署 Cloudflare Pages（`wrangler.toml` → 输出 `dist`）。
- **设计系统（v5，2026-09 重做）**：反 AI 设计方向 "Trans-Pacific Ledger"（seed 推导，不对外暴露）。色板：深森林绿(avo)+象牙白/羊皮纸 + **印章朱红 `--seal #be3a2e` 作唯一强调**；字体 Fraunces(刊头衬线,带 opsz)/Instrument Sans(正文)/DM Mono(标签/数据)；**锐角为主**（`--r1:0 --r3:0`），圆角基本清零；发丝线+刊边批注(sidenote)替代卡片分隔。新原语：`.ticker`跑马灯、`.seal`印章、`.indexnum`大号索引数字、`.ledger`账本竖线、`.reveal-up/left/right`方向性揭示。全部 CSS 变量定义在 `src/styles/global.css`。scroll-reveal 用 IntersectionObserver（`BaseLayout.astro`，已覆盖新增 reveal 类）。
- **垂直节奏（2026-09-13 压缩）**：`--section-y:56px`（section 上下留白，原 96）、`--section-y-sm:40px`（紧凑 section，配合 `.section--tight`）、`--head-gap:36px`（标题→内容）。hero 高 `min(78vh,680px)`（原 100vh）。h1 max 64 / h2 max 46。**改版式时优先用这三个 token，别再硬写 s8/s9/s10**。
- **模板原语（源自《网站基础选型样式模板集》PDF，已落地在 global.css）**：`.announce`公告提醒条、`.statband`数据证明（大号数字 b/em + `.statband__list` 事实列表）、`.guarantee`保障模块网格（4 列发丝线）、`.banner-cta`通栏行动（**flex 在 `.banner-cta__inner`，band 本身只负责 padding/border**）、`.regionwall`地区/客户墙、`.stepsline`流程连接线、`.bento`不等分网格。已用于首页（公告条/地区墙/数据证明/通栏 Banner/保障网格）与服务页（保障网格）。
- **`.lede-row`（2026-09-13 新增，硬性约定）**：**正文与 CTA 必须并排——按钮贴文字一侧，禁止单独占行**。`display:flex; align-items:center; justify-content:space-between; gap:var(--s5); flex-wrap:wrap`；`>p` = `flex:1 1 240px; margin:0`，`>a/.btn` = `flex:0 0 auto`；≤640px 按钮换行 `width:100%`。已用于 services / es/services 的 6 行服务卡、首页与西语首页的服务列表行（Learn more）及 Why 区块（Start for Free）。**以后新增任何「文字 + 按钮」区块一律套 `.lede-row`**。窄栏例外（未套）：`.testi__stat`、blog 侧栏、订阅表单。
- **页面**：`index` / `services` / `about` / `contact` / `blog`(index + `[slug]`) / `privacy` / `terms` / `404` / `sitemap.xml.ts`（Astro 端点，静态产出 sitemap）；`es/` 下是 index/services/about/contact/blog/privacy/terms 的独立西语镜像（**重复文件，非组件复用**，改英文需同步西语）。`src/data/legal.ts` + `src/components/Legal.astro` 是唯一被复用的法务页方案（英西文案集中在一个数据文件）。
- **组件**：`BaseLayout`（**canonical + hreflang(en/es/x-default，仅双语都有的路径) + og 全套 + JSON-LD（首页 Organization/WebSite、文章页 Article，用 `article={{published,section}}` prop）+ skiplink** + scroll reveal）、`Header`（**「左白 → 右黑」两层半透明渐变栏**，`--hdr-h` 84px（移动 68px）、导航 15.5px/500 右对齐、**下滚收起 / 上滚滑出**（`.hdr--hide`）、语言下拉仅 en/es、移动抽屉）、`Footer`（**米白 `--warm-100`**）、`PageHero`、`ContactForm`（web3forms + 邮件兜底）、`Legal`（法务页，配 `src/data/legal.ts` + `legalEntity`）、`Logo`（**真实图片 logo**，`variant="light"` 取米白剪影版）、`Icon`（17 个原创 SVG）、`ImgPlaceholder`（**照片一律传 `src`；`priority` prop = 首屏图 eager+fetchpriority**）。
- **站点信息单一来源 `src/config/site.ts`（2026-09-14 建）**：`SITE_URL` / `PHONE{display,tel,wa}` / `EMAIL{en,es}` / `COMPANY{nameZh,nameEn,address{en,es,zh},addressParts}`。页脚、联系页、法务页、BaseLayout 的 JSON-LD 都从这里读。**改电话/域名/主体名只改这一个文件**；唯一例外是 `astro.config.mjs`（.mjs 不能 import .ts，域名另存一份，改时同步）。
- **Logo / 品牌资产（2026-09-13 换真实图）**：源图在 `D:\BaiduSyncdisk\项目2  CrossPals出海创业\Websit\CrossPals.com\`。已落地 `public/img/logo-horizontal.png`（509×208，**顶栏**，源 `crosspals(1).png`）与 `public/img/logo-stacked.png`（954×826，**底栏**，源 `crosspals (5).png`）——都用 Pillow 按 alpha bbox 裁掉透明边距。`Logo.astro` 用 `layout="horizontal"|"stacked"` + `variant="light"`（取 `-light` 后缀的米白剪影版）+ **height 驱动**（`--logo-h` + `width:auto`），顶栏 48px（移动 36px）/ 底栏 88px。favicon 三件套 `public/favicon.png(512)` `favicon-32.png` `apple-touch-icon.png(180)`（取自竖版 logo 的鸟形）+ `public/og-image.png`(1200×630 米白底横版 logo)。`public/` 无 favicon.svg，勿再引用。
- **列表版式约定（2026-09-14）**：**首页 Resources 用瀑布流**（`column-count:2`，`.bcard{display:block;break-inside:avoid}`，精选卡图 `3/4`、小卡图 `16/9` → 两列高基本配平，避免精选卡下方大片留白，曾空出 ~500px）；**Blog 列表页用矩阵对齐**（`.posts{display:grid;repeat(3,1fr);align-items:stretch}`，封面统一 `16/9`，卡片 flex 纵向 + `.pcard__foot{margin-top:auto}` 使同排等高、脚注对齐）。用户明确区分这两个页面，勿混用。
- **居中块约定（2026-09-14）**：Our Process（services）与 What We Stand For（about）为**整块居中 + 文本左对齐**：标题 `text-align:center`（about 用内联 `margin:0 auto var(--head-gap);text-align:center`），内容列 `max-width:820px; margin:0 auto; text-align:left`。
- **`.guarantee__img`（2026-09-14）**：4 处 Our Guarantees 的 `.guarantee__item` 在 icon 与 h4 之间插入 `ratio="3/2"` 配图，映射 `guarImg = {trust:'factory',inspection:'inspection',payment:'payment',shipping:'shipping'}`（各页 frontmatter 内定义）。
- **博客页（2026-09-13 压缩+锐角化）**：`blog/index.astro` 精选卡是**编辑式左右分栏**（左图 4:3 / 右文）；`blog/[slug].astro` 头图 21:9 **且 `max-height:44vh` 限幅**，侧栏 280px。
- **i18n**：仅 `en`/`es`（`astro.config` locales + `i18n/utils.ts`）。翻译键集中 `en.ts`/`es.ts`。
- **博客**：6 篇英文文章**硬编码**在 `blog/[slug].astro` 的 `getStaticPaths`（正文内联 HTML），无 content collection，加文章要改代码。

## 上线前必改（待办 / 风险）
- `ContactForm.astro` 的 web3forms `access_key` 仍是占位 `YOUR_WEB3FORMS_KEY` → 表单提交会失败（**已在表单下方加 `hello@crosspals.com` 邮件兜底**）。需用户给真实 key。
- `Footer` 社交 LinkedIn/Instagram 仍指向 `#`（WhatsApp 已于 2026-09-14 接真实号）。
- **法务页仍是通用模板**，主体名/地址已填（`保定职航科技有限公司` / Baoding, Hebei Province, China），条款本身建议上线前让律师过一遍。
- 语言下拉只有 en/es（fr/ar/pt 已移除）；`/es/blog` 是西语文章索引，标题仍为英文（正文英文）。
- 缺少 og-image 之外的真实分享图素材、Google Analytics/统计脚本（未装）。
- **全站图片已是 AI 生成实景图 + WebP**（2026-09-13/14）：`public/img/` 20 张 `.webp`（q82，1024px，共 2.8MB，dist 3.7MB；原 PNG 归档在 `.workbuddy/tmp/img-png/`），**3 张 logo 仍为 PNG**（带 alpha，`Logo.astro` 用：`logo-horizontal` / `logo-horizontal-light` / `logo-stacked`）。原 picsum 占位已全部替换。**改图片引用时注意：照片一律 `.webp`，logo 是 `.png`，favicon/og-image 在 public 根目录（`layouts/BaseLayout.astro`）不要动**。ImageGen 产出图**右下角带「AI生成/WORKBUDDY>」水印**，用 skill `imagegen-watermark-removal`（谐波补底+纹理注入，纯 Pillow）清除；**每次新生成图都要跑一遍，并转 webp**。图片映射集中各页 frontmatter 的 `svcImg/blogImg/teamImg/galImg/guarImg`；团队成员图为 AI 代表性人像（非真实员工）。**文件名跟人名走**：`team-xizeng / team-amara / team-carlos`（`team-wei` 已于 2026-09-14 改名）。
- 已清零项：`wa.me/yourwhatsapp`（2026-09-14 接真实号）、`/privacy` `/terms`（含西语）死链（2026-09-14 建页）、语言下拉 fr/ar/pt（已砍）、**最终域名（2026-09-14 定为 `https://www.crosspals.com`）**。

## 注意
- **公司/创始人 base 统一为 `HeBei · BaoDing`**（2026-09-14）：about 页团队首位 = `Xizeng · Founder & CEO, HeBei · BaoDing`；首页/西语首页的 hero 图注、跑马灯、sourcing 描述、尼日利亚留言**已全部由 Yiwu 改为 HeBei · BaoDing**；图片文件名 `g-yiwu` 也已改成 `g-market`。**全站仅博客正文保留一处 Yiwu（作为中国市场名，句子需成立）**。角色名 `Founder & CEO` 由用户口述推得（原代码为 Head of Sourcing）——如需改回告诉用户。
- **内链体检脚本**：`.workbuddy/tmp/linkcheck.py`（系统 Python 311 跑）。扫 dist 全部 html 的 `href` 与 `src="/img/..."` 对比实际文件。**routes 已改为遍历 `dist/**/*` 全部文件**（`/index.html` 归一成目录），`/_astro/*.css`、`/favicon*.png` 不再被误报。2026-09-14 复验：路由 79 / 内链 31，死链 0，缺图 0。
- 版本号不一致：`package.json` 写 `v4.0.0`，`README` 写 "v3"。
- 编辑入口：`npm run dev`（端口 9300，astro.config 改了）、`npm run build` → `dist`。
- **本地预览必须加 `--host 0.0.0.0`**：`npm run dev` 默认只绑 IPv6 `[::1]`，桌面预览面板连不上（表现为「no server is running on port」）。要看实时预览用 `npx astro dev --host 0.0.0.0 --port 9400`，再用 present_files 传 `http://localhost:9400/`。另外沙箱 curl 探不到 loopback 端口时，用 `netstat -ano | grep :9400` 看 LISTENING 更可靠。
