import type { TranslationKey } from './en';

/**
 * 日本語 UI 辞書（ナビ / フッター / CTA 等の界面文案）。
 * キーは en.ts の TranslationKey と完全に一致させること（型で強制）。
 * ページ本文のコピーは各 /ja ページにインラインで持つ（data-driven 化は今後の拡張）。
 */
export const ja: Record<TranslationKey, string> = {
  nav_home:       'ホーム',
  nav_services:   'サービス',
  nav_about:      '会社概要',
  nav_blog:       'ブログ',
  nav_cases:      '導入事例',
  nav_contact:    'お問い合わせ',
  nav_cta:        '無料見積もり',

  footer_tagline: '製品の調達・検品・FBA向け出荷準備をワンストップで支援します。',
  footer_services:'サービス',
  footer_company: '会社情報',
  footer_legal:   '法的事項',
  footer_privacy: 'プライバシーポリシー',
  footer_terms:   '利用規約',
  footer_rights:  '全著作権所有。',
};
