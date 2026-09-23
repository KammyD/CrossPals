/**
 * 语言门面 —— 本站**只保留英语**（2026-09-23 移除西语）。
 *
 * 保留了函数签名（`getLangFromUrl` / `useTranslations` / `localePath`）而不是删掉，
 * 是为了不动 10 个页面里几十处 `t('key')` 与 `localePath(lang, href)` 调用 ——
 * 那些调用本身没有错，只是现在语言集合里只剩一个成员。
 *
 * 将来若要重新加语言，只需：① 恢复 `./<code>.ts` 字典 ② 这里放开 Lang 联合类型
 * ③ `localePath` 恢复加前缀 ④ 恢复 `src/pages/<code>/` 目录（原版都在 git 历史里）。
 */
import { en } from './en';
import type { TranslationKey } from './en';

export type Lang = 'en';
export { type TranslationKey };

/** 唯一的翻译函数：取英语字典，缺键时回落键名本身（保持原来的容错行为）。 */
function t(key: TranslationKey): string {
  return (en as Record<string, string>)[key] ?? key;
}

/** 曾按 URL 首段判定语言（`/es/...`）；现在只有英语，保留入参以兼容调用点。 */
export function getLangFromUrl(_url?: URL): Lang {
  return 'en';
}

export function useTranslations(_lang?: Lang) {
  return t;
}

/** 曾给非默认语言加 `/es` 前缀；现在恒返回规范化后的原路径。 */
export function localePath(_lang: Lang, path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

export const languages: Record<Lang, string> = { en: 'English' };
