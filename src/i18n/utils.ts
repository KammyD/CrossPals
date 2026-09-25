/**
 * 语言门面 —— 语言清单的唯一事实源是项目根的 site.config.json → site.locales
 * （CMS「品牌与站点信息 → 多语言」卡片维护）。改后台语言清单 → 重新构建 → 本站全跟随。
 *
 * 2026-09-24：词典与「已本地化页面清单」改为数据驱动（src/data/i18n/*.json + manifest.json），
 * 不再硬编码 `dictionaries` / `localizedPages`。
 * 加语言流程 = CMS 生成该语言的页面骨架 + 填一份 <code>.json 词典，
 * 再让 scaffold 把页面清单写进 manifest.json —— 本文件零改动。
 */
import siteConfig from '../../site.config.json';

/* ── 动态加载词典与清单：加语言零代码改动 ─────────────────────── */
const dictModules = import.meta.glob('../data/i18n/*.json', { eager: true }) as Record<string, any>;
const dictionaries: Record<string, Record<string, string>> = {};
let manifest: Record<string, { prefix?: string; pages?: string[] }> = {};
for (const [p, mod] of Object.entries(dictModules)) {
  const file = p.split('/').pop()!;
  const data = mod && mod.default ? mod.default : mod;
  if (file === 'manifest.json') { manifest = data || {}; continue; }
  const code = file.replace(/\.json$/, '');
  if (code) dictionaries[code] = data || {};
}
const en: Record<string, string> = dictionaries['en'] ?? {};
export type TranslationKey = keyof typeof en;
export { type TranslationKey };

/* ── 从 site.config.json 读语言清单 ───────────────────────────── */
interface LocaleConf {
  code: string;
  label?: string;
  default?: boolean;
  prefix?: string;
  dir?: 'ltr' | 'rtl';
  enabled?: boolean;
  reviewed?: boolean;
}

const confs: LocaleConf[] = ((siteConfig as any)?.site?.locales ?? [])
  .filter((l: any) => l && typeof l.code === 'string' && l.code && l.enabled !== false);

/** 默认语言（挂根路径的那个）；没标 default 就取第一个 */
export const defaultLang: string =
  confs.find((l) => l.default === true)?.code ?? confs[0]?.code ?? 'en';

/** 是否真的存在 ≥2 种启用语言（单语站很多 UI 要隐藏） */
export const isMultilingual = confs.length >= 2;

function prefixOf(code: string): string {
  const l = confs.find((c) => c.code === code);
  if (!l) return '';
  if (typeof l.prefix === 'string') return l.prefix;
  return code === defaultLang ? '' : code; // 非默认语言没写 prefix 时，约定用语言码本身
}

function dirOf(code: string): 'ltr' | 'rtl' {
  return confs.find((c) => c.code === code)?.dir === 'rtl' ? 'rtl' : 'ltr';
}

/** 本地化的语言自称（ja → 日本語）；配置里写了 label 就尊重配置 */
function nativeName(code: string, label?: string): string {
  if (label) return label;
  try {
    return new Intl.DisplayNames([code], { type: 'language' }).of(code) || code;
  } catch {
    return code;
  }
}

/** 英语视角的语言名（ja → Japanese），作下拉里的辅助行 */
function englishName(code: string): string {
  try {
    return new Intl.DisplayNames(['en'], { type: 'language' }).of(code) || code;
  } catch {
    return code;
  }
}

/** 常用语言旗帜；没收录的回退地球 */
const FLAGS: Record<string, string> = {
  en: '🇺🇸', ja: '🇯🇵', es: '🇪🇸', fr: '🇫🇷', de: '🇩🇪', pt: '🇵🇹',
  zh: '🇨🇳', ko: '🇰🇷', it: '🇮🇹', ar: '🇸🇦', id: '🇮🇩', vi: '🇻🇳', th: '🇹🇭',
};

export interface LanguageOption {
  code: string;
  /** 下拉主行（配置 label 优先，否则英语名） */
  label: string;
  /** 下拉辅助行（该语言的自称） */
  native: string;
  flag: string;
  isDefault: boolean;
}

/** 切换器要渲染的语言清单（顺序 = 配置顺序） */
export const languageList: LanguageOption[] = confs.map((l) => ({
  code: l.code,
  label: l.label || englishName(l.code),
  native: nativeName(l.code, l.label),
  flag: FLAGS[l.code] ?? '🌐',
  isDefault: l.code === defaultLang,
}));

export function isRtl(code: string): boolean {
  return dirOf(code) === 'rtl';
}

/* ── 词典 ──────────────────────────────────────────────────────── */

/**
 * 按语言取翻译函数：命中该语言词典则用之，否则回落英语，再否则回落键名本身
 * （保持原来的容错行为，缺键不会白屏）。
 */
export function useTranslations(lang?: string): (key: TranslationKey) => string {
  const dict = (lang && dictionaries[lang]) || dictionaries[defaultLang] || en;
  return (key: TranslationKey) => dict[key as string] ?? en[key as string] ?? (key as string);
}

/** 曾按 URL 首段判定语言；现在按「已配置语言的前缀」判定，配置驱动 */
export function getLangFromUrl(url?: URL): string {
  const seg = url ? (url.pathname.split('/').filter(Boolean)[0] ?? '') : '';
  const hit = confs.find((l) => l.code !== defaultLang && prefixOf(l.code) === seg);
  return hit ? hit.code : defaultLang;
}

/** 非默认语言加 `/{prefix}` 前缀；默认语言恒返回规范化后的原路径 */
export function localePath(lang: string, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const prefix = prefixOf(lang);
  return prefix ? `/${prefix}${clean === '/' ? '/' : clean}` : clean;
}

/** 把带语言前缀的路径剥回默认语言的基准路径（/ja/blog/x → /blog/x，/ja → /） */
export function basePathOf(pathname: string): string {
  const seg = pathname.split('/').filter(Boolean)[0] ?? '';
  const hit = confs.find((l) => l.code !== defaultLang && prefixOf(l.code) === seg);
  if (!hit) return pathname.startsWith('/') ? pathname : `/${pathname}`;
  const rest = pathname.slice(seg.length + 1);
  return rest.startsWith('/') ? rest : `/${rest}`;
}

/* ── 已本地化页面清单（来自 manifest.json，由 CMS 脚手架自动登记） ──
 * 非默认语言只对「确实有该语言版」的页面加前缀，其余回落默认语言页面，
 * 绝不渲染会 404 的链接。加语言时 scaffold 把页面路径写进 manifest，本文件零改动。 */
function localizedPagesFor(lang: string): Set<string> {
  const m = manifest[lang];
  if (!m || !Array.isArray(m.pages)) return new Set();
  return new Set(m.pages as string[]);
}
export function navPath(lang: string, href: string): string {
  const clean = href.startsWith('/') ? href : `/${href}`;
  if (lang === defaultLang) return clean;
  return localizedPagesFor(lang).has(clean) ? localePath(lang, clean) : clean;
}

/* ── 内容条目的多语言挑选（2026-09-25 新增）──────────────────────
 * 译文布局唯一：同目录 + 文件名 `-<语言码>` 后缀，frontmatter 带 lang。
 * 页面只要用 PAGE_LANG 调这两个函数，就天然适配任意语言 ——
 * 脚手架复制出 /xx/blog/[slug].astro 时只需把 `const PAGE_LANG = defaultLang;`
 * 改成 `const PAGE_LANG = 'xx';`（scaffold 已自动做），取数与链接都自动正确。
 */
/** 按页面语言挑内容条目：默认语言取「未标 lang 或 lang=默认」的原文；其他语言只取该语言的译文 */
export function entriesForLang<T extends { data?: { lang?: string } }>(items: T[], lang: string): T[] {
  return items.filter((it) => {
    const l = (it && it.data && it.data.lang) || '';
    return l ? l === lang : lang === defaultLang;
  });
}

/** 译文 slug 去掉 `-<语言码>` 后缀得到基准 slug（默认语言的 slug 原样返回） */
export function baseSlug(slug: unknown, lang: string): string {
  const s = String(slug ?? '');
  if (lang === defaultLang) return s;
  return s.replace(new RegExp(`-${lang}$`), '');
}

/** 文章内容里的图片/链接不翻，但相对路径在子语言下不变 —— 保留此函数便于将来统一处理 */
export function contentPath(lang: string, path: string): string {
  return path;
}

/** 内容详情链接：/blog/{基准slug} —— 非默认语言自动加语言前缀，译文的 -<语言码> 后缀自动剥掉 */
export function contentLink(lang: string, base: string, slug: unknown): string {
  return localePath(lang, `/${base}/${baseSlug(slug, lang)}`);
}

/* ── 日期本地化 ──────────────────────────────────────────────────
 * 语言标签不写在页面里（AI 翻译页面时会把 'en-US' 当成文案翻掉，踩过），
 * 统一由这里按语言码给出完整 BCP-47 标签。加语言只需补一行。 */
const LOCALE_TAG: Record<string, string> = {
  en: 'en-US', ja: 'ja-JP', hi: 'hi-IN', zh: 'zh-CN', es: 'es-ES',
  fr: 'fr-FR', de: 'de-DE', ar: 'ar', pt: 'pt-BR', ko: 'ko-KR', it: 'it-IT',
};

/** long = 2026年1月1日式全写；short = 缩写月名；monthYear = 仅月+年 */
export function fmtDate(lang: string, d: string, style: 'long' | 'short' | 'monthYear' = 'long'): string {
  const tag = LOCALE_TAG[lang] || lang;
  const raw = String(d ?? '');
  const date = /^\d{4}-\d{2}-\d{2}$/.test(raw) ? new Date(`${raw}T00:00:00`) : new Date(raw);
  const opts: Intl.DateTimeFormatOptions =
    style === 'short' ? { month: 'short', day: 'numeric', year: 'numeric' }
    : style === 'monthYear' ? { month: 'short', year: 'numeric' }
    : { month: 'long', day: 'numeric', year: 'numeric' };
  try {
    return date.toLocaleDateString(tag, opts);
  } catch {
    return date.toLocaleDateString('en-US', opts);
  }
}
