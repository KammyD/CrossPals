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

/** 可空取值：空/缺失返回 undefined，供「有值才渲染」的 present-only 逻辑使用 */
function raw(path: string): string | undefined {
  const v = path
    .split('.')
    .reduce<any>((o, k) => (o && typeof o === 'object' ? o[k] : undefined), d);
  const s = typeof v === 'string' ? v.trim() : (typeof v === 'number' ? String(v) : '');
  return s || undefined;
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
  /** 邮箱本身语言无关；日语页也用同一地址 */
  ja: get('contact.email', 'hello@crosspals.com'),
};

/** 联系方式（present-only）：仅在 site.json 有值时填充，空值不进对象 → 前端据此决定是否渲染 */
export const CONTACT = {
  email: raw('contact.email') ?? 'hello@crosspals.com',
  phone: raw('contact.phone'),
  phoneTel: raw('contact.phoneTel'),
  whatsapp: raw('contact.whatsapp'),
  wechat: raw('contact.wechat'),
  telegram: raw('contact.telegram'),
  address: raw('contact.address'),
  hours: raw('contact.hours'),
};

/** 社媒链接（present-only）：每个平台独立读取，空值不进入数组 → 页脚不渲染对应图标 */
const socialRaw = {
  facebook: raw('social.facebook'),
  instagram: raw('social.instagram'),
  linkedin: raw('social.linkedin'),
  youtube: raw('social.youtube'),
  x: raw('social.x'),
  tiktok: raw('social.tiktok'),
  weibo: raw('social.weibo'),
  zhihu: raw('social.zhihu'),
  github: raw('social.github'),
};
const SOCIAL_LABELS: Record<string, string> = {
  facebook: 'Facebook', instagram: 'Instagram', linkedin: 'LinkedIn', youtube: 'YouTube',
  x: 'X', tiktok: 'TikTok', weibo: 'Weibo', zhihu: 'Zhihu', github: 'GitHub',
};
export const SOCIAL = Object.entries(socialRaw)
  .filter(([, href]) => !!href)
  .map(([key, href]) => ({ key, label: SOCIAL_LABELS[key], href }));

export const COMPANY = {
  /** CMS 公司全称（无兜底：没填就让页脚/结构化数据自然留白） */
  name: raw('company.name') ?? 'CrossPals',
  nameZh: get('company.nameZh', '保定职航科技有限公司'),
  nameEn: get(
    'company.nameEn',
    'Baoding Zhihang Technology Co., Ltd.',
  ),
  nameJa: get('company.nameJa', '保定職航科技有限公司'),
  shortName: raw('company.shortName') ?? 'CrossPals',
  tagline: raw('company.tagline'),
  description: raw('company.description'),
  founded: raw('company.founded'),
  address: {
    en: get('contact.address', 'Baoding, Hebei Province, China'),
    ja: get('contact.addressJa', '中国 河北省保定市'),
  },
  /** 结构化数据用 */
  addressParts: {
    locality: 'Baoding',
    region: 'Hebei',
    country: 'CN',
  },
};
