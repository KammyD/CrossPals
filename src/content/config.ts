import { defineCollection, z } from 'astro:content';

/**
 * 内容集合（Content Collections）
 * ────────────────────────────────
 * 加内容 = 往对应目录丢一个 .md 文件，不需要改任何 .astro 代码。
 *
 * 目录（多语言：同一目录内按文件名后缀分语言，语言清单见 site.config.json → site.locales）：
 *   src/content/blog/*.md           →  /blog/<文件名>/（默认语言 en）
 *                                      /ja/blog/<slug>/（译文，slug 各语言共用）
 *   src/content/case-studies/*.md   →  /case-studies/<文件名>/
 *
 * 命名规则：
 *   - 文件名即 URL slug，用英文小写 + 连字符（例：avoid-fba-rejections.md）
 *   - 译文文件名带语言码后缀（1688-vs-alibaba-ja.md），frontmatter 必须声明 lang
 *   - draft: true 的文章不会进列表、不会被构建
 *
 * 历史：曾有一对西语镜像集合（blog-es / case-studies-es）+ 一组 *Es 覆盖字段，
 * 已于 2026-09-23 随西语站点一并移除（原版在 git 历史里）；
 * 2026-09-24 改用「同目录 + 文件名后缀」的译文形态（CMS 翻译管线的唯一布局）。
 */

/** 日期统一用 'YYYY-MM-DD' 字符串（引号包起来，避免 YAML 自动转成日期对象产生时区偏移） */
const dateStr = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '日期格式必须是 YYYY-MM-DD，例如 2026-08-18');

/**
 * 多语言系统字段（CMS 翻译管线写入，全部可选）。
 * ★必须在 schema 里声明：zod 会剥掉未声明的键，漏了它们
 * 语言过滤、切换器找译文、hreflang 互指全部失效。
 */
const i18nSystem = {
  lang: z.string().optional(),            // 该文件的语言码；原文可不写（= 作者语言原文）
  translationKey: z.string().optional(),  // 同一篇各语言版本的关联键（= 基准 slug）
  translationStatus: z.string().optional(),
  translatedAt: z.string().optional(),
  translatedFrom: z.string().optional(),  // 源文指纹；与源文当前指纹不符 = 译文过期
};

/* ── 博客文章 ───────────────────────────────────────────── */
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    date: dateStr,
    readTime: z.string(),          // '6 min'
    cover: z.string(),             // '/img/xxx.webp'
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    ...i18nSystem,
  }),
});

/* ── 客户案例 ───────────────────────────────────────────── */
const results = z.array(z.object({ v: z.string(), l: z.string() }));

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    client: z.string(),            // 'Amazon seller · United States · Kitchen & Dining'
    summary: z.string(),           // 列表卡摘要（一两句）
    problem: z.string(),
    action: z.string(),
    results,                       // 3 条结果指标
    cover: z.string(),
    date: dateStr,
    order: z.number().default(99), // 列表排序，越小越前
    draft: z.boolean().default(false),
    ...i18nSystem,
  }),
});

export const collections = { blog, caseStudies };
