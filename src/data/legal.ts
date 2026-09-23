/**
 * 法务页文案（隐私政策 / 服务条款）。
 * en 与 ja 双语文案；加语言时在 legalContent / legalEntity 两处同时登记。
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
const UPDATED_JA = '最終更新：2026年9月';

export const legalContent: Record<'en' | 'ja', Record<LegalKind, LegalDoc>> = {
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
            'We act as your sourcing and purchasing agent. We negotiate with independent Chinese suppliers on your behalf; we are not the manufacturer and do not own the factories we work with. Product quality, compliance, and intellectual property of the goods remain the responsibility of the manufacturer and of the buyer’s specifications.',
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
            'Before shipment we inspect the goods and send you a photo report with a clear pass/fail. Inspection covers quantity, appearance, function, and packaging against the agreed specification. Buyers remain responsible for confirming that the goods meet their own country’s import, safety, and labelling rules.',
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

  ja: {
    privacy: {
      title: 'プライバシーポリシー',
      overline: '法的事項',
      intro: 'CrossPals がお客様からお預かりする情報をどのように収集・利用・保護しているかを説明します。',
      updated: UPDATED_JA,
      sections: [
        {
          h: '1. 運営会社について',
          p: [
            `CrossPals は ${COMPANY.nameJa}（${COMPANY.nameEn}）のサービス名称であり、所在地は ${COMPANY.address.ja} です。私たちは海外の事業者が中国のサプライヤーから製品を見つけ、検証し、配送することを支援します。本ポリシーにおいて、「当社」「私たち」とは、この会社およびその運営するサービスを指します。`,
            `プライバシーに関するご質問や、後述の権利の行使については、${EMAIL.ja} までご連絡いただくか、${PHONE.display} までお電話ください。`,
          ],
        },
        {
          h: '2. 収集する情報',
          p: [
            'お客様からいただく情報：お名前、メールアドレス、国、メッセージ用の連絡先、およびフォームやメールでお送りいただいた製品や注文の詳細。',
            '自動的に収集する情報：閲覧ページ、参照元、国レベルのおおよその所在地、デバイスやブラウザの種類、タイムスタンプ。',
            '第三者からの情報：お支払いの確認、サプライヤーや物流の更新、ご注文に関する検品レポート。',
          ],
        },
        {
          h: '3. 利用目的',
          p: [
            'お問い合わせへの回答と見積りの作成、ご指示に基づく製品の調達・購入・検品・配送、ご注文状況のご案内、会計記録の保管、サイトとサービスの改善、および不正や悪用の検知・防止のため。',
            'マーケティングメッセージについてはお客様の同意に、注文処理についてはお客様との契約履行に、サービスの運営と保全については正当な利益に依拠しています。',
          ],
        },
        {
          h: '4. 情報を共有する相手',
          p: [
            '必要最小限の範囲で共有します。具体的には、お客様の製品の見積りや生産を行うサプライヤー・工場、フォワーダーや配送業者、検品業者、および当サイトのホスティングやメール配信を担うサービス提供事業者です。法令で求められる場合には、情報を開示することがあります。',
            'お客様の個人情報を販売することはなく、サプライヤーの自社マーケティング目的でお客様の連絡先を共有することもありません。',
          ],
        },
        {
          h: '5. 保管期間',
          p: [
            'お問い合わせの記録は、最後のご連絡から最大24か月間保管します。注文・お支払い・配送の記録は、会計や税関の規則が求める期間保管します。不要となったデータについては、お客様からのご依頼に応じて削除します。',
          ],
        },
        {
          h: '6. お客様の権利',
          p: [
            `ご自身のデータのコピー請求、修正の依頼、削除の依頼、マーケティングなどの特定の利用への異議申し立てが可能です。${EMAIL.ja} までメールいただくか、${PHONE.display} までお電話ください。30日以内に回答いたします。`,
          ],
        },
        {
          h: '7. Cookie とアクセス解析',
          p: [
            '当サイトでは、言語や基本的な設定を記憶するために必須の Cookie を使用し、どのページが役立っているかを把握するためにプライバシーに配慮した解析を利用する場合があります。ブラウザの設定で Cookie をブロックまたは削除できますが、その場合サイトの必須機能が動作しなくなることがあります。',
          ],
        },
        {
          h: '8. 本ポリシーの変更',
          p: [
            'サービスの変更に伴い、本ポリシーを更新することがあります。本ページ冒頭の日付が常に最新バージョンを示します。重要な変更については当サイト上でお知らせします。',
          ],
        },
      ],
    },
    terms: {
      title: '利用規約',
      overline: '法的事項',
      intro: '当ウェブサイトおよび提供する調達サービスを規定する規約です。',
      updated: UPDATED_JA,
      sections: [
        {
          h: '1. 適用範囲',
          p: [
            `本規約は、お客様と ${COMPANY.nameJa}（${COMPANY.nameEn}：所在地 ${COMPANY.address.ja}）との間のものであり、同社が CrossPals サービスを運営しています。crosspals.com を利用する、または当社に製品の調達・購入・検品・配送を指示することにより、お客様は本規約に同意したものとみなされます。同意いただけない場合は、本サービスをご利用にならないでください。`,
          ],
        },
        {
          h: '2. 当社の役割',
          p: [
            '当社はお客様の調達・購入代行業者として機能します。中国の独立系サプライヤーとお客様に代わって交渉しますが、当社が製造元であるわけでも、提携工場を所有しているわけでもありません。製品の品質・コンプライアンス・知的財産は、製造元およびお客様の仕様の責任となります。',
          ],
        },
        {
          h: '3. 見積りと料金',
          p: [
            '見積りでは、サプライヤー価格・送料・当社の手数料を明確に分けて記載し、原則として7日間有効です。為替レート・原材料費・サプライヤーの在庫状況により価格は変動する場合があり、お支払い前にお客様へ最終金額をご確認いただきます。',
          ],
        },
        {
          h: '4. ご注文とお支払い',
          p: [
            '生産は通常、内金（サプライヤー費用の概ね30%）の入金後に開始されます。残金は、ご注文が検品に合格した後の出荷前にお支払いいただきます。当社がサプライヤーおよびフォワーダーへ直接支払いを行い、お客様に不自然な口座への送金を求めることはありません。',
          ],
        },
        {
          h: '5. 検品',
          p: [
            '出荷前に製品を検品し、明確な合否を記した写真レポートをお送りします。検品は、合意仕様に対する数量・外観・機能・梱包をカバーします。製品がお客様の国の輸入・安全・表示規則を満たすことの最終確認は、バイヤーご自身の責任となります。',
          ],
        },
        {
          h: '6. 配送・リスク・遅延',
          p: [
            '配送は、お見積りに記載されたインコタームズに基づき手配します。リスクの移転は当該条件に従います。税関・運送会社の能力・天候・不可抗力による遅延は当社の管理外ですが、状況をお知らせし解決を支援します。',
          ],
        },
        {
          h: '7. クレーム',
          p: [
            '不足や不具合については、配送から7日以内に、製品と梱包の写真または動画を添えてお知らせください。クレームが認められた場合、当社の判断により交換・クレジット・返金のいずれかを手配します。輸送中の損傷、誤使用、税関で没収された商品は対象外とします。',
          ],
        },
        {
          h: '8. お客様のブランドとコンテンツ',
          p: [
            'ロゴ・アートワーク・梱包用ファイルをお送りいただく場合、お客様はそれを利用する権利を有していることを確約いただきます。お客様のファイルは秘密として保管し、ご注文の履行のみに使用します。',
          ],
        },
        {
          h: '9. 責任の制限',
          p: [
            '個別のご注文に対する当社の総責任は、その注文について当社がいただいた手数料に限定されます。逸失利益や販売機会の喪失など、間接的または派生的な損害については責任を負いません。',
          ],
        },
        {
          h: '10. 変更とお問い合わせ',
          p: [
            `本規約は随時更新されることがあり、本ページに掲載されたバージョンが冒頭の日付から適用されます。本規約に関するご質問は ${EMAIL.ja} · ${PHONE.display} まで。`,
          ],
        },
      ],
    },
  },
};

/**
 * 主体情報块 —— 法务页顶部展示（公司主体 / 注册地址 / 联系方式）。
 * 数据来自 src/config/site.ts，改那一处即可。
 */
export const legalEntity: Record<'en' | 'ja', { h: string; lines: string[] }> = {
  en: {
    h: 'Registered company',
    lines: [
      `${COMPANY.nameEn} — ${COMPANY.nameZh}`,
      COMPANY.address.en,
      `${PHONE.display} · ${EMAIL.en}`,
    ],
  },
  ja: {
    h: '運営会社',
    lines: [
      `${COMPANY.nameJa}（${COMPANY.nameEn}）`,
      COMPANY.address.ja,
      `${PHONE.display} · ${EMAIL.ja}`,
    ],
  },
};
