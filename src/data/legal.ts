/**
 * 法务页文案（隐私政策 / 服务条款），仅英语。
 * 西语版已于 2026-09-23 随西语站点一并移除（原版在 git 历史里）。
 * ⚠️ 通用模板，上线前建议律师复核；公司主体名称、地址、注册信息按需补充。
 */

export type LegalKind = 'privacy' | 'terms';

import { COMPANY, PHONE, EMAIL } from '../config/site';

interface LegalSection { h: string; p: string[] }
export interface LegalDoc {
  title: string;
  overline: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}

const UPDATED = 'Last updated: September 2026';

export const legalContent: Record<'en', Record<LegalKind, LegalDoc>> = {
  en: {
    privacy: {
      title: 'Privacy Policy',
      overline: 'Legal',
      intro: 'How CrossPals collects, uses, and protects the information you share with us.',
      updated: UPDATED,
      sections: [
        {
          h: '1. Who we are',
          p: [
            `CrossPals is the trading name of ${COMPANY.nameEn} (${COMPANY.nameZh}), registered at ${COMPANY.address.en}. We help overseas entrepreneurs find, verify, and ship products from Chinese suppliers. In this policy, "we", "us", and "CrossPals" refer to that company and the service it operates.`,
            `For any privacy question, or to exercise the rights described below, write to ${EMAIL.en} or reach us on ${PHONE.display}.`,
          ],
        },
        {
          h: '2. Information we collect',
          p: [
            'Information you give us: your name, email address, country, messaging handle, and the product or order details you submit through our forms or by email.',
            'Information collected automatically: pages viewed, referring source, approximate location at country level, device and browser type, and timestamps.',
            'Information from third parties: payment confirmations, supplier or logistics updates, and inspection reports relating to your order.',
          ],
        },
        {
          h: '3. Why we use it',
          p: [
            'To answer your inquiry and prepare a quote; to source, purchase, inspect, and ship goods on your instructions; to keep you updated on order status; to keep accounting records; to improve our site and services; and to detect and prevent fraud or abuse.',
            'We rely on your consent for marketing messages, on the performance of our agreement with you for order handling, and on our legitimate interest in running and securing the service.',
          ],
        },
        {
          h: '4. Who we share it with',
          p: [
            'We share only what is needed: suppliers and factories that quote or produce your goods, freight forwarders and couriers, inspection providers, and service providers that host our site or send our email. We may disclose information where the law requires it.',
            'We do not sell your personal information, and we do not share your contact details with suppliers for their own marketing.',
          ],
        },
        {
          h: '5. How long we keep it',
          p: [
            'Inquiry records are kept for up to 24 months after the last contact. Order, payment, and shipping records are kept as long as accounting and customs rules require. You may ask us to delete data we no longer need.',
          ],
        },
        {
          h: '6. Your rights',
          p: [
            `You can ask us for a copy of your data, ask us to correct it, ask us to delete it, or object to certain uses such as marketing. Email ${EMAIL.en} or call ${PHONE.display} and we will respond within 30 days.`,
          ],
        },
        {
          h: '7. Cookies and analytics',
          p: [
            'Our site uses essential cookies to remember your language and basic preferences, and may use privacy-friendly analytics to understand which pages are useful. You can block or delete cookies in your browser settings; essential site functions may stop working if you do.',
          ],
        },
        {
          h: '8. Changes to this policy',
          p: [
            'We may update this policy as our services change. The date at the top of this page always shows the current version. Material changes will be announced on this site.',
          ],
        },
      ],
    },
    terms: {
      title: 'Terms of Service',
      overline: 'Legal',
      intro: 'The terms that govern our website and the sourcing services we provide.',
      updated: UPDATED,
      sections: [
        {
          h: '1. Scope',
          p: [
            `These terms are between you and ${COMPANY.nameEn} (${COMPANY.nameZh}), registered at ${COMPANY.address.en}, which operates the CrossPals service. By using crosspals.com or instructing us to source, purchase, inspect, or ship goods, you agree to these terms. If you do not agree, please do not use the service.`,
          ],
        },
        {
          h: '2. Our role',
          p: [
            'We act as your sourcing and purchasing agent. We negotiate with independent Chinese suppliers on your behalf; we are not the manufacturer and do not own the factories we work with. Product quality, compliance, and intellectual property of the goods remain the responsibility of the manufacturer and of the buyer\u2019s specifications.',
          ],
        },
        {
          h: '3. Quotes and pricing',
          p: [
            'Quotes state the supplier price, shipping cost, and our service fee separately, and are normally valid for 7 days. Prices can change with exchange rates, raw material costs, and supplier availability; we confirm the final figure with you before any payment is made.',
          ],
        },
        {
          h: '4. Orders and payment',
          p: [
            'Production normally starts after a deposit (typically 30% of the supplier cost). The balance is payable before shipment once your order passes inspection. We pay suppliers and forwarders directly; we do not ask buyers to wire money to unknown accounts.',
          ],
        },
        {
          h: '5. Inspection',
          p: [
            'Before shipment we inspect the goods and send you a photo report with a clear pass/fail. Inspection covers quantity, appearance, function, and packaging against the agreed specification. Buyers remain responsible for confirming that the goods meet their own country\u2019s import, safety, and labelling rules.',
          ],
        },
        {
          h: '6. Shipping, risk, and delays',
          p: [
            'Shipping is arranged on the Incoterms shown in your quote. Risk passes as stated in those terms. Delays caused by customs, carrier capacity, weather, or force majeure are outside our control, but we will keep you informed and help resolve them.',
          ],
        },
        {
          h: '7. Claims',
          p: [
            'Tell us about any shortage or defect within 7 days of delivery, with photos or video of the goods and packaging. Where the claim is accepted we will arrange replacement, credit, or refund at our discretion. Transit damage, misuse, and goods seized by customs are excluded.',
          ],
        },
        {
          h: '8. Your brand and content',
          p: [
            'If you send us logos, artwork, or packaging files, you confirm you have the right to use them. We keep your files confidential and use them only to fulfil your order.',
          ],
        },
        {
          h: '9. Liability',
          p: [
            'Our total liability for a given order is limited to the service fee we charged for that order. We are not liable for indirect or consequential losses, including lost profit or lost sales opportunity.',
          ],
        },
        {
          h: '10. Changes and contact',
          p: [
            `We may update these terms; the version published on this page applies from the date shown at the top. Questions about these terms: ${EMAIL.en} · ${PHONE.display}.`,
          ],
        },
      ],
    },
  },
};

/**
 * 主体信息块 —— 法务页顶部展示（公司主体 / 注册地址 / 联系方式）。
 * 数据来自 src/config/site.ts，改那一处即可。
 */
export const legalEntity: Record<'en', { h: string; lines: string[] }> = {
  en: {
    h: 'Registered company',
    lines: [
      `${COMPANY.nameEn} — ${COMPANY.nameZh}`,
      COMPANY.address.en,
      `${PHONE.display} · ${EMAIL.en}`,
    ],
  },
};
