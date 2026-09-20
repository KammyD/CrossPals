/**
 * 站点真实信息 —— 全站唯一来源。
 *
 * 数据存在 src/data/site.json（CMS 可写），本文件只做「读取门面」：
 *   · 保持 PHONE / EMAIL / COMPANY 的导出形状不变，7 个引用方无需改动
 *   · 在 CMS「品牌与站点信息」页修改 → 写入 site.json → 全站生效
 *   · 每个字段都带兜底值：site.json 缺项时站点照常渲染，不会白屏
 *
 * ⚠️ astro.config.mjs 是 .mjs，不能 import .ts，站点域名在那边另有一份（改时两处保持同步）。
 */
import site from '../data/site.json';

type Json = Record<string, any>;
const d = site as unknown as Json;

/** 按 dotted path 取值，取不到或不是非空字符串就用兜底 */
function get(path: string, fallback: string): string {
  const v = path
    .split('.')
    .reduce<any>((o, k) => (o && typeof o === 'object' ? o[k] : undefined), d);
  return typeof v === 'string' && v.trim() ? v.trim() : fallback;
}

export const SITE_URL = get('branding.domain', 'https://www.crosspals.com');

export const PHONE = {
  /** 页面上显示的格式 */
  display: get('contact.phone', '+86 151 0026 8521'),
  /** tel: 链接用的纯数字 */
  tel: get('contact.phoneTel', '+8615100268521'),
  /** WhatsApp 直达链接 */
  wa: get('contact.whatsapp', 'https://wa.me/8615100268521'),
};

export const EMAIL = {
  en: get('contact.email', 'hello@crosspals.com'),
  es: get('contact.emailEs', 'hola@crosspals.com'),
};

export const COMPANY = {
  /** 营业执照上的中文主体名 */
  nameZh: get('company.nameZh', '保定职航科技有限公司'),
  /** 英文主体名（用于结构化数据 / 英文法务页） */
  nameEn: get(
    'company.nameEn',
    'Baoding Zhihang Technology Co., Ltd.',
  ),
  address: {
    en: get('contact.address', 'Baoding, Hebei Province, China'),
    es: get('contact.addressEs', 'Baoding, provincia de Hebei, China'),
    zh: get('contact.addressZh', '中国 河北省 保定市'),
  },
  /** 结构化数据用 */
  addressParts: {
    locality: 'Baoding',
    region: 'Hebei',
    country: 'CN',
  },
};
