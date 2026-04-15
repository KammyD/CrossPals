import { en } from './en'; import { es } from './es';
import type { TranslationKey } from './en';
export type Lang = 'en' | 'es';
export { type TranslationKey };
const translations = { en, es } as const;
export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first === 'es' ? 'es' : 'en';
}
export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    return (translations[lang] as Record<string,string>)[key] ?? (translations['en'] as Record<string,string>)[key] ?? key;
  };
}
export function localePath(lang: Lang, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === 'en' ? clean : `/es${clean}`;
}
export const languages: Record<Lang, string> = { en: 'English', es: 'Español' };
