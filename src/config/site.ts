/**
 * 站点真实信息 —— 全站唯一来源。
 * 改这里就够了：页脚、联系页、结构化数据、法务页都从这里读。
 * ⚠️ astro.config.mjs 是 .mjs，不能 import .ts，站点域名在那边另有一份（改时两处保持同步）。
 */

export const SITE_URL = 'https://www.crosspals.com';

export const PHONE = {
  /** 页面上显示的格式 */
  display: '+86 151 0026 8521',
  /** tel: 链接用的纯数字 */
  tel: '+8615100268521',
  /** WhatsApp 直达链接 */
  wa: 'https://wa.me/8615100268521',
};

export const EMAIL = {
  en: 'hello@crosspals.com',
  es: 'hola@crosspals.com',
};

export const COMPANY = {
  /** 营业执照上的中文主体名 */
  nameZh: '保定职航科技有限公司',
  /** 英文主体名（用于结构化数据 / 英文法务页） */
  nameEn: 'Baoding Zhihang Technology Co., Ltd.',
  address: {
    en: 'Baoding, Hebei Province, China',
    es: 'Baoding, provincia de Hebei, China',
    zh: '中国 河北省 保定市',
  },
  /** 结构化数据用 */
  addressParts: {
    locality: 'Baoding',
    region: 'Hebei',
    country: 'CN',
  },
};
