import { defineCollection, z } from 'astro:content';

/**
 * 内容集合（Content Collections）
 * ────────────────────────────────
 * 加内容 = 往对应目录丢一个 .md 文件，不需要改任何 .astro 代码。
 *
 * 目录：
 *   src/content/blog/*.md           →  /blog/<文件名>/   （英文详情页；西语列表 es/blog 复用它）
 *   src/content/case-studies/*.md   →  /case-studies/<文件名>/ 与 /es/case-studies/<文件名>/
 *
 * 命名规则：
 *   - 文件名即 URL slug，用英文小写 + 连字符（例：avoid-fba-rejections.md）
 *   - frontmatter 里的 *Es 字段是可选的西语覆盖，留空则西语页回退显示英文
 *   - draft: true 的文章不会进列表、不会被构建
 */

/** 日期统一用 'YYYY-MM-DD' 字符串（引号包起来，避免 YAML 自动转成日期对象产生时区偏移） */
const dateStr = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '日期格式必须是 YYYY-MM-DD，例如 2026-08-18');

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
    // 西语覆盖（可选）
    titleEs: z.string().optional(),
    descriptionEs: z.string().optional(),
    categoryEs: z.string().optional(),
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
    // 西语覆盖（可选）
    titleEs: z.string().optional(),
    clientEs: z.string().optional(),
    summaryEs: z.string().optional(),
    problemEs: z.string().optional(),
    actionEs: z.string().optional(),
    resultsEs: z.array(z.string()).optional(), // 只覆盖每条指标的说明文字，顺序对应
  }),
});

export const collections = { blog, caseStudies };
