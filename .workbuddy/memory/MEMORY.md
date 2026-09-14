# CrossPals (Astro v4)

## 构建
- Astro 4.16 `output:'static'`，仅依赖 astro；Cloudflare Pages(`wrangler.toml`→`dist`)；dev 9300。
- **⚠️ 构建必须 PowerShell 大写盘符 `D:\`**：Git Bash(`/d/`) 会静默产出**无 CSS 链接的 HTML→全站无样式**（页面照生成还报 Complete）。自查 `grep -c stylesheet dist/index.html`=2。
- 体检 `.workbuddy/tmp/linkcheck.py`（跑 **py3.13.12 managed**，3.11.9 路径已不存在）：103 路由/41 内链/死链 0/缺图 0。溢出审计 `overflow-all.cjs`(playwright-core+Edge，需先起 8088 静态服务)。

## 内容（md 驱动）
- `src/content/config.ts` 定义 `blog`+`caseStudies`；**加内容=丢 .md 进 `src/content/blog|case-studies/`，不改代码**，slug=文件名。
- 日期 `z.string()` 存 `'2026-08-18'`（**必须带引号**，否则 YAML 转 Date 有时区偏移），显示 `new Date(d+'T00:00:00')`。
- `*Es` 字段（titleEs/problemEs/resultsEs[]…）可选西语覆盖，缺省回退英文。
- 渲染 `getCollection` + `await entry.render()` 取 `Content`（Astro5 改 `render(entry)`）；`.prose` 内 scoped CSS **必须 `:global()`**。
- `sitemap.xml.ts` 动态读 collection；`tsconfig.json`(astro/tsconfigs/base) 必须存在。
- 首页+西语首页 Resources、blog 列表/详情、es/blog 均读 collection。案例 `case-studies/index.astro`(4:3 图+3 指标+右下 Learn more)→`[slug].astro`+西语镜像。
- **⚠️ 同文件多处 Edit 必须串行**（同消息并发会互相覆盖，只留最后一处）。

## 设计系统 v5
深森林绿(avo)+象牙白/羊皮纸+**朱红 `--seal #be3a2e` 唯一强调**；Fraunces/Instrument Sans/DM Mono；锐角；发丝线。变量在 `src/styles/global.css`。
- 节奏 token `--section-y:56px` / `--section-y-sm:40px` / `--head-gap:36px`（**改版式优先用它们**）；h1≤64/h2≤46。
- 原语 `.ticker .seal .indexnum .ledger .reveal-* .announce .statband .guarantee .banner-cta .regionwall .stepsline .bento`。
- **`.lede-row`（硬性）**：正文+CTA 并排、按钮贴文字侧；≤640px 换行。新增「文字+按钮」块一律套。
- 首页 Resources=瀑布流；Blog 列表=3 列矩阵(封面 16/9)。勿混用。
- **案例卡 `.ccard__head` 是竖排**（`display:block`：序号独占一行 + 标签 `margin-top:9px` 另起一行）。**别改回 `display:flex;align-items:baseline`**：标签长短不一时会有的并排、有的折行，卡片高度参差（2026-09-14 用户指出的问题）。西语镜像 `es/case-studies/index.astro` 必须同步改。

## 页面 / 组件 / 定位
- 页面 index services about contact blog case-studies(均 index+[slug]) privacy terms 404 sitemap；`es/` 是**独立镜像（改英文须同步西语）**；法务页复用 `src/data/legal.ts`。
- `BaseLayout` canonical+hreflang(en/es/x-default)+og+JSON-LD+reveal；`Header` 左白→右墨绿渐变(`--hdr-h` 84/68)+滚动收起+移动抽屉；`Footer` 米白；另有 `PageHero ContactForm`(web3forms+邮件兜底) `Legal Logo Icon ImgPlaceholder`（照片一律传 `src`）。
- **顶栏渐变（`Header.astro` + `global.css`）**：`--hdr-wp`(白层满格终点≈logo 右缘+30px) / `--hdr-wf`(收尾长度) / `--hdr-kz`(墨绿铺满≈首个导航项) / `--hdr-w-a .64` `--hdr-k-a .72`(滚动 .84/.86)。**反面教材：实心白平台+一段线性过渡→平台尽头出现肉眼可见的硬拐点**（2026-09-14 修掉）；**也别让白层从 x=0 就开始衰减**（宽屏 logo 离左边 400px，坡头一起步 logo 就掉灰底）。正解=平台满格到 `--hdr-wp`，再用 `f(t)=1-smoothstep(t)^0.6`（首尾斜率皆 0）收尾。改完必看 1920/1440/1000/390 四档截图。
- **站点信息单一来源 `src/config/site.ts`**（改电话/域名/主体名只改它）；i18n 仅 en/es。
- 首页 Hero「The sourcing partner Amazon sellers trust」+8 品类场景+`.scen/.inspect/.pricing`+证言 FBA 格式（三头像不重复）；Services 两层（核心包 5 步+4 附加服务+定价+`#guarantees` 四展开模块）；About 真实创始人故事（河北保定·大学老师）+真实指标。
- 案例/博客各 4 篇，md 驱动。**案例数字是示意稿，上线前换真实数据**。

## 待改 / 风险 / 图片
- `ContactForm` web3forms `access_key` 仍是 `YOUR_WEB3FORMS_KEY` 占位→**表单失败，需真实 key**（有邮件兜底）；`Footer` LinkedIn/Instagram 仍 `#`；法务页仍模板；未装统计。
- **西语未同步**：`es/services`/`es/about`/`es/index`(资源区外) 仍旧泛采购文案；`es/about` 仍留 3 位虚构团队成员。
- `public/img/` 25 张 `.webp`+3 张 logo **PNG**；案例图 case-kitchen-qc / case-pet-fba / case-supplier-verify / case-relabel。**`.guarantee` 四图必须等尺寸**（`global.css` 两条规则，删任一条即不等）。ImageGen 后必查右下角水印(skill `imagegen-watermark-removal`)再转 webp。base 统一 `HeBei · BaoDing`。
