import { defineCollection, z } from 'astro:content';

/**
 * 内容集合（Content Collections）
 * ────────────────────────────────
 * 加内容 = 往对应目录丢一个 .md 文件，不需要改任何 .astro 代码。
 *
 * 目录（**单语言站点，只有英语**）：
 *   src/content/blog/*.md           →  /blog/<文件名>/
 *   src/content/case-studies/*.md   →  /case-studies/<文件名>/
 *
 * 命名规则：
 *   - 文件名即 URL slug，用英文小写 + 连字符（例：avoid-fba-rejections.md）
 *   - draft: true 的文章不会进列表、不会被构建
 *
 * 历史：曾有一对西语镜像集合（blog-es / case-studies-es）+ 一组 *Es 覆盖字段，
 * 已于 2026-09-23 随西语站点一并移除（原版在 git 历史里）。
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
  }),
});

export const collections = { blog, caseStudies };
