/**
 * 法务页文案（隐私政策 / 服务条款），英西双语。
 * ⚠️ 通用模板，上线前建议律师复核；公司主体名称、地址、注册信息按需补充。
 */

export type LegalKind = 'privacy' | 'terms';

interface LegalSection { h: string; p: string[] }
export interface LegalDoc {
  title: string;
  overline: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}

const UPDATED = { en: 'Last updated: September 2026', es: 'Última actualización: septiembre de 2026' };

export const legalContent: Record<'en' | 'es', Record<LegalKind, LegalDoc>> = {
  en: {
    privacy: {
      title: 'Privacy Policy',
      overline: 'Legal',
      intro: 'How CrossPals collects, uses, and protects the information you share with us.',
      updated: UPDATED.en,
      sections: [
        {
          h: '1. Who we are',
          p: [
            'CrossPals is a sourcing partner that helps overseas entrepreneurs find, verify, and ship products from Chinese suppliers. In this policy, "we", "us", and "CrossPals" refer to that service and its operators.',
            'For any privacy question, or to exercise the rights described below, write to hello@crosspals.com.',
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
            'You can ask us for a copy of your data, ask us to correct it, ask us to delete it, or object to certain uses such as marketing. Email hello@crosspals.com and we will respond within 30 days.',
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
      updated: UPDATED.en,
      sections: [
        {
          h: '1. Scope',
          p: [
            'By using crosspals.com or instructing us to source, purchase, inspect, or ship goods, you agree to these terms. If you do not agree, please do not use the service.',
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
            'We may update these terms; the version published on this page applies from the date shown at the top. Questions about these terms: hello@crosspals.com.',
          ],
        },
      ],
    },
  },
  es: {
    privacy: {
      title: 'Política de Privacidad',
      overline: 'Legal',
      intro: 'Cómo CrossPals recopila, usa y protege la información que compartes con nosotros.',
      updated: UPDATED.es,
      sections: [
        {
          h: '1. Quiénes somos',
          p: [
            'CrossPals es un socio de abastecimiento que ayuda a emprendedores internacionales a encontrar, verificar y enviar productos de proveedores chinos. En esta política, "nosotros" se refiere a ese servicio y a sus operadores.',
            'Para cualquier consulta de privacidad, o para ejercer los derechos descritos abajo, escribe a hello@crosspals.com.',
          ],
        },
        {
          h: '2. Información que recopilamos',
          p: [
            'Información que nos das: nombre, correo electrónico, país, contacto de mensajería y los detalles de producto o pedido que envías por formulario o correo.',
            'Información recopilada automáticamente: páginas vistas, origen de referencia, ubicación aproximada a nivel de país, tipo de dispositivo y navegador, y marcas de tiempo.',
            'Información de terceros: confirmaciones de pago, actualizaciones de proveedores o logística e informes de inspección de tu pedido.',
          ],
        },
        {
          h: '3. Para qué la usamos',
          p: [
            'Para responder tu consulta y preparar una cotización; para buscar, comprar, inspeccionar y enviar mercancía según tus instrucciones; para informarte del estado del pedido; para llevar registros contables; para mejorar el sitio y el servicio; y para detectar y prevenir fraudes.',
            'Nos basamos en tu consentimiento para mensajes de marketing, en la ejecución de nuestro acuerdo para gestionar pedidos, y en nuestro interés legítimo en operar y proteger el servicio.',
          ],
        },
        {
          h: '4. Con quién la compartimos',
          p: [
            'Compartimos solo lo necesario: proveedores y fábricas que cotizan o producen tu mercancía, agentes de carga y mensajería, servicios de inspección y proveedores que alojan el sitio o envían nuestros correos. Podemos revelar información cuando la ley lo exija.',
            'No vendemos tus datos personales ni compartimos tus contactos con proveedores para su propio marketing.',
          ],
        },
        {
          h: '5. Cuánto tiempo la conservamos',
          p: [
            'Los registros de consultas se conservan hasta 24 meses después del último contacto. Los registros de pedidos, pagos y envíos se conservan mientras lo exijan las normas contables y aduaneras. Puedes pedirnos que eliminemos datos que ya no necesitemos.',
          ],
        },
        {
          h: '6. Tus derechos',
          p: [
            'Puedes pedir una copia de tus datos, solicitar su corrección o eliminación, u oponerte a ciertos usos como el marketing. Escribe a hello@crosspals.com y responderemos en un plazo de 30 días.',
          ],
        },
        {
          h: '7. Cookies y analítica',
          p: [
            'El sitio usa cookies esenciales para recordar tu idioma y preferencias básicas, y puede usar analítica respetuosa con la privacidad para entender qué páginas resultan útiles. Puedes bloquear o borrar cookies en tu navegador; algunas funciones esenciales podrían dejar de funcionar.',
          ],
        },
        {
          h: '8. Cambios en esta política',
          p: [
            'Podemos actualizar esta política cuando cambien nuestros servicios. La fecha en la parte superior muestra siempre la versión vigente. Los cambios importantes se anunciarán en este sitio.',
          ],
        },
      ],
    },
    terms: {
      title: 'Términos del Servicio',
      overline: 'Legal',
      intro: 'Las condiciones que rigen nuestro sitio web y los servicios de abastecimiento que prestamos.',
      updated: UPDATED.es,
      sections: [
        {
          h: '1. Alcance',
          p: [
            'Al usar crosspals.com o al encargarnos buscar, comprar, inspeccionar o enviar mercancía, aceptas estos términos. Si no estás de acuerdo, no utilices el servicio.',
          ],
        },
        {
          h: '2. Nuestro rol',
          p: [
            'Actuamos como tu agente de abastecimiento y compra. Negociamos con proveedores chinos independientes en tu nombre; no somos el fabricante ni somos dueños de las fábricas con las que trabajamos. La calidad, el cumplimiento y la propiedad intelectual de los productos corresponden al fabricante y a las especificaciones del comprador.',
          ],
        },
        {
          h: '3. Cotizaciones y precios',
          p: [
            'Las cotizaciones detallan por separado el precio del proveedor, el costo de envío y nuestra comisión, y suelen ser válidas por 7 días. Los precios pueden variar con el tipo de cambio, el costo de materias primas y la disponibilidad de proveedores; confirmamos el importe final contigo antes de cualquier pago.',
          ],
        },
        {
          h: '4. Pedidos y pago',
          p: [
            'La producción suele iniciar tras un anticipo (habitualmente el 30% del costo del proveedor). El saldo se paga antes del envío, una vez que el pedido pasa la inspección. Pagamos directamente a proveedores y agentes; no pedimos transferencias a cuentas desconocidas.',
          ],
        },
        {
          h: '5. Inspección',
          p: [
            'Antes del envío inspeccionamos la mercancía y te enviamos un informe fotográfico con veredicto claro. La inspección cubre cantidad, aspecto, funcionamiento y embalaje frente a la especificación acordada. El comprador sigue siendo responsable de confirmar que la mercancía cumple las normas de importación, seguridad y etiquetado de su país.',
          ],
        },
        {
          h: '6. Envío, riesgo y retrasos',
          p: [
            'El envío se organiza según los Incoterms indicados en tu cotización. El riesgo se transfiere según esos términos. Los retrasos por aduanas, capacidad de transporte, clima o fuerza mayor están fuera de nuestro control, pero te mantendremos informado y ayudaremos a resolverlos.',
          ],
        },
        {
          h: '7. Reclamaciones',
          p: [
            'Informa cualquier faltante o defecto dentro de los 7 días posteriores a la entrega, con fotos o video de la mercancía y el embalaje. Si la reclamación se acepta, gestionaremos reposición, crédito o reembolso a nuestra discreción. Se excluyen daños en tránsito, mal uso y mercancía incautada por aduanas.',
          ],
        },
        {
          h: '8. Tu marca y tus archivos',
          p: [
            'Si nos envías logos, artes o archivos de embalaje, confirmas que tienes derecho a usarlos. Tratamos tus archivos de forma confidencial y los usamos solo para cumplir tu pedido.',
          ],
        },
        {
          h: '9. Responsabilidad',
          p: [
            'Nuestra responsabilidad total por un pedido se limita a la comisión que cobramos por ese pedido. No somos responsables de pérdidas indirectas, incluidos lucro cesante u oportunidades de venta perdidas.',
          ],
        },
        {
          h: '10. Cambios y contacto',
          p: [
            'Podemos actualizar estos términos; la versión publicada en esta página aplica desde la fecha indicada arriba. Consultas: hello@crosspals.com.',
          ],
        },
      ],
    },
  },
};
