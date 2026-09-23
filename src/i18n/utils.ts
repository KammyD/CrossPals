/**
 * 语言门面 —— 语言清单的唯一事实源是项目根的 site.config.json → site.locales
 * （CMS「品牌与站点信息 → 多语言」卡片维护）。改后台语言清单 → 重新构建 → 本站全跟随。
 *
 * 2026-09-24：恢复多语言（en 默认 + ja）。切换器、路由前缀、hreflang 全部由配置驱动，
 * 不再手写语言数组（此前 en/es 硬编码，收敛时随 es 一起删了）。
 *
 * 词典仍只有 en：非默认语言的 UI 字符串回落英语（内容正文是翻译好的，
 * 界面文案缺键时回落键名——与旧版容错行为一致）。加新语言界面翻译时：
 * ① 新建 `./<code>.ts` 字典 ② 在下面 translations 里登记。
 */
import { en } from './en';
import type { TranslationKey } from './en';
import siteConfig from '../../site.config.json';

/** 语言码（由配置驱动，不再收窄成字面量联合——加语言不用改类型） */
export type Lang = string;
export { type TranslationKey };

/* ── 从 site.config.json 读语言清单 ─────────────────────────────── */

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
export const defaultLang: Lang =
  confs.find((l) => l.default === true)?.code ?? confs[0]?.code ?? 'en';

/** 是否真的存在 ≥2 种启用语言（单语站很多 UI 要隐藏） */
export const isMultilingual = confs.length >= 2;

function prefixOf(code: Lang): string {
  const l = confs.find((c) => c.code === code);
  if (!l) return '';
  if (typeof l.prefix === 'string') return l.prefix;
  return code === defaultLang ? '' : code; // 非默认语言没写 prefix 时，约定用语言码本身
}

function dirOf(code: Lang): 'ltr' | 'rtl' {
  return confs.find((c) => c.code === code)?.dir === 'rtl' ? 'rtl' : 'ltr';
}

/** 本地化的语言自称（ja → 日本語）；配置里写了 label 就尊重配置 */
function nativeName(code: Lang, label?: string): string {
  if (label) return label;
  try {
    return new Intl.DisplayNames([code], { type: 'language' }).of(code) || code;
  } catch {
    return code;
  }
}

/** 英语视角的语言名（ja → Japanese），作下拉里的辅助行 */
function englishName(code: Lang): string {
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
  code: Lang;
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

export function isRtl(code: Lang): boolean {
  return dirOf(code) === 'rtl';
}

/* ── 词典 ──────────────────────────────────────────────────────── */

/** 唯一的翻译函数：取英语字典，缺键时回落键名本身（保持原来的容错行为） */
function t(key: TranslationKey): string {
  return (en as Record<string, string>)[key] ?? key;
}

/** 曾按 URL 首段判定语言；现在按「已配置语言的前缀」判定，配置驱动 */
export function getLangFromUrl(url?: URL): Lang {
  const seg = url ? (url.pathname.split('/').filter(Boolean)[0] ?? '') : '';
  const hit = confs.find((l) => l.code !== defaultLang && prefixOf(l.code) === seg);
  return hit ? hit.code : defaultLang;
}

export function useTranslations(_lang?: Lang) {
  return t;
}

/** 非默认语言加 `/{prefix}` 前缀；默认语言恒返回规范化后的原路径 */
export function localePath(lang: Lang, path: string): string {
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

/**
 * 导航/页脚落点：非默认语言只对「确实有该语言版」的页面加前缀，
 * 其余回落默认语言页面 —— 绝不渲染会 404 的链接。
 * 目前非默认语言只有 首页 与 博客列表 两个落点；
 * 以后补了某个页面的语言版（src/pages/<prefix>/...），把它的路径加进下面的清单即可。
 */
const localizedPages = new Set(['/', '/blog']);
export function navPath(lang: Lang, href: string): string {
  const clean = href.startsWith('/') ? href : `/${href}`;
  if (lang === defaultLang) return clean;
  return localizedPages.has(clean) ? localePath(lang, clean) : clean;
}
